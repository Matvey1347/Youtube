import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {fal} from '@fal-ai/client';

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, '..');
const envCandidates = [resolve(projectRoot, '.env'), resolve(projectRoot, '..', '.env')];

const readEnv = (path) => {
  try {
    return readFileSync(path, 'utf8').split(/\r?\n/).reduce((result, line) => {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match) return result;
      let value = match[2].trim();
      if (value.length >= 2 && ['"', "'"].includes(value[0]) && value.at(-1) === value[0]) {
        value = value.slice(1, -1);
      }
      result[match[1]] = value;
      return result;
    }, {});
  } catch {
    return {};
  }
};

const env = Object.assign({}, ...envCandidates.map(readEnv));
const key = process.env.FAL_API_KEY?.trim().replace(/^['"]|['"]$/g, '') || env.FAL_API_KEY;
if (!key) throw new Error('FAL_API_KEY is missing. Put it in buffett-explainer/.env or the parent .env.');

fal.config({credentials: key});
const episode = JSON.parse(readFileSync(resolve(projectRoot, 'content/episode.json'), 'utf8'));
const video = episode.video;

const result = await fal.subscribe(video.model, {
  input: {
    prompt: video.prompt,
    duration: video.duration,
    aspect_ratio: video.aspectRatio,
    negative_prompt: video.negativePrompt,
    cfg_scale: video.cfgScale,
  },
  logs: false,
  onQueueUpdate: (update) => {
    console.log(`Fal status: ${update.status}`);
  },
});

const videoUrl = result.data?.video?.url;
if (!videoUrl) throw new Error(`Fal returned no video URL for request ${result.requestId}.`);

const output = resolve(projectRoot, 'public/assets/buffett-paperboy.mp4');
mkdirSync(dirname(output), {recursive: true});
execFileSync('curl', ['-fsSL', videoUrl, '-o', output], {stdio: 'inherit'});
writeFileSync(resolve(projectRoot, 'public/assets/fal-clip.json'), JSON.stringify({
  provider: 'fal',
  model: video.model,
  requestId: result.requestId,
  prompt: video.prompt,
  output: 'buffett-paperboy.mp4',
}, null, 2) + '\n');
console.log(`Saved ${output}`);
