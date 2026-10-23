import {execFileSync} from 'node:child_process';
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

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
const apiKey = process.env.LUMEAN_API_KEY?.trim().replace(/^['"]|['"]$/g, '') || env.LUMEAN_API_KEY;
if (!apiKey) throw new Error('LUMEAN_API_KEY is missing. Put it in buffett-explainer/.env or the parent .env.');
const episode = JSON.parse(readFileSync(resolve(projectRoot, 'content/episode.json'), 'utf8'));

const BASE = 'https://api.lumean.app/api/public';
const curl = (method, path, payload) => {
  const args = ['-sS', '-w', '\n__HTTP_STATUS:%{http_code}', '-X', method, `${BASE}${path}`, '-H', `X-API-KEY: ${apiKey}`];
  if (payload !== undefined) {
    args.push('-H', 'Content-Type: application/json', '--data-binary', '@-');
  }
  const response = execFileSync('curl', args, {
    encoding: 'utf8',
    input: payload === undefined ? undefined : JSON.stringify(payload),
  });
  const marker = '\n__HTTP_STATUS:';
  const at = response.lastIndexOf(marker);
  const status = Number(response.slice(at + marker.length).trim());
  const body = response.slice(0, at);
  const json = body ? JSON.parse(body) : {};
  if (status < 200 || status >= 300) throw new Error(`Lumean ${method} ${path} returned ${status}: ${JSON.stringify(json.errors || json.message || json)}`);
  return json.data ?? json;
};

const {templateId, voiceId, voiceName, model, speed} = episode.voice;
const narration = episode.narration;

const order = curl('POST', '/orders', {
  template_id: templateId,
  name: 'Баффет — 15 секунд',
  input_text: narration,
  config_override: {
    tts_settings: {
      voice_id: voiceId,
      model_id: model,
      voice_settings: {speed},
    },
  },
});
console.log(`Lumean order ${order.id}: ${order.status}`);

let current = order;
const deadline = Date.now() + 240_000;
while (!['completed', 'result_delivered', 'failed', 'compensated', 'cancelled'].includes(current.status)) {
  if (Date.now() > deadline) throw new Error(`Timed out waiting for Lumean order ${order.id}.`);
  await new Promise((done) => setTimeout(done, 2000));
  current = curl('GET', `/orders/${order.id}`);
  console.log(`Lumean status: ${current.status}`);
}
if (!['completed', 'result_delivered'].includes(current.status)) {
  throw new Error(`Lumean order ${order.id} ended with status ${current.status}: ${current.result?.user_message || ''}`);
}

const filePath = current.result?.files?.[0];
if (!filePath) throw new Error(`Lumean order ${order.id} has no result file.`);
const download = curl('POST', '/storage/url', {path: filePath});
const audioUrl = download.url;
if (!audioUrl) throw new Error('Lumean returned no audio download URL.');
const output = resolve(projectRoot, 'public/assets/narration.mp3');
execFileSync('curl', ['-fsSL', audioUrl, '-o', output], {stdio: 'inherit'});
writeFileSync(resolve(projectRoot, 'public/assets/lumean-voice.json'), JSON.stringify({
  provider: 'Lumean API',
  templateId,
  voice: voiceName,
  voiceId,
  model,
  orderId: order.id,
  narration,
  output: 'narration.mp3',
  serviceFiles: current.result?.service_files || [],
}, null, 2) + '\n');
console.log(`Saved ${output}`);
