import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envCandidates = [resolve(projectRoot, '.env'), resolve(projectRoot, '..', '.env')];
const env = {};
for (const path of envCandidates) {
  try {
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match) continue;
      let value = match[2].trim();
      if (value.length >= 2 && ['"', "'"].includes(value[0]) && value.at(-1) === value[0]) value = value.slice(1, -1);
      env[match[1]] = value;
    }
  } catch {}
}
const key = process.env.LUMEAN_API_KEY?.trim().replace(/^['"]|['"]$/g, '') || env.LUMEAN_API_KEY;
if (!key) throw new Error('LUMEAN_API_KEY is missing.');
const voiceInfo = JSON.parse(readFileSync(resolve(projectRoot, 'public/assets/lumean-voice.json'), 'utf8'));
const base = 'https://api.lumean.app/api/public';
const curl = (method, path, payload) => {
  const args = ['-sS', '-w', '\n__HTTP_STATUS:%{http_code}', '-X', method, `${base}${path}`, '-H', `X-API-KEY: ${key}`];
  if (payload !== undefined) args.push('-H', 'Content-Type: application/json', '--data-binary', '@-');
  const output = execFileSync('curl', args, {encoding: 'utf8', input: payload === undefined ? undefined : JSON.stringify(payload)});
  const marker = '\n__HTTP_STATUS:';
  const at = output.lastIndexOf(marker);
  const status = Number(output.slice(at + marker.length).trim());
  if (status < 200 || status >= 300) throw new Error(`Lumean returned HTTP ${status}.`);
  return JSON.parse(output.slice(0, at)).data;
};

const order = curl('GET', `/orders/${voiceInfo.orderId}`);
const files = order.result?.service_files || [];
if (!files.length) throw new Error('No service files are available for this order.');
const outputDir = resolve(projectRoot, 'public/assets/captions');
mkdirSync(outputDir, {recursive: true});
for (const file of files) {
  const name = file.split('/').at(-1);
  const {url} = curl('POST', '/storage/url', {path: file});
  execFileSync('curl', ['-fsSL', url, '-o', resolve(outputDir, name)], {stdio: 'inherit'});
  console.log(`Saved captions/${name}`);
}
writeFileSync(resolve(outputDir, 'order.json'), JSON.stringify({orderId: order.id, files: files.map((file) => file.split('/').at(-1))}, null, 2) + '\n');
