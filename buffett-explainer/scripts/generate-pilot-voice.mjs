import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';

const project = resolve(import.meta.dirname, '..');
const env = Object.fromEntries(readFileSync(resolve(project, '..', '.env'), 'utf8').split(/\r?\n/)
  .map((line) => line.match(/^([^=]+)=(.*)$/)).filter(Boolean)
  .map((m) => [m[1], m[2].trim().replace(/^['"]|['"]$/g, '')]));
const key = process.env.LUMEAN_API_KEY || env.LUMEAN_API_KEY;
if (!key) throw new Error('LUMEAN_API_KEY missing');
const episode = JSON.parse(readFileSync(resolve(project, 'content/episode.json'), 'utf8'));
const narration = 'In 1930s Omaha, a boy bought six bottles of Coca-Cola for twenty-five cents. He sold them one by one for a nickel. Five cents profit. But the money was only part of what caught his attention.';
const voice = {id: 'xS4rWdm7XjmSzwmzOl3j', name: 'Tyler - Natural American Narrator', model: 'eleven_multilingual_v2', speed: 1.09};
const request = (method, path, payload) => {
  const args = ['-sS', '-w', '\n__HTTP_STATUS:%{http_code}', '-X', method, `https://api.lumean.app/api/public${path}`, '-H', `X-API-KEY: ${key}`];
  if (payload !== undefined) args.push('-H', 'Content-Type: application/json', '--data-binary', '@-');
  const result = execFileSync('curl', args, {encoding: 'utf8', input: payload === undefined ? undefined : JSON.stringify(payload)});
  const mark = result.lastIndexOf('\n__HTTP_STATUS:');
  const status = Number(result.slice(mark + 15));
  const json = JSON.parse(result.slice(0, mark));
  if (status < 200 || status > 299) throw new Error(`${method} ${path}: ${status} ${JSON.stringify(json.errors || json.message || json)}`);
  return json.data ?? json;
};
const order = request('POST', '/orders', {
  template_id: episode.voice.templateId,
  name: 'Buffett pilot · English · 15 seconds',
  input_text: narration,
  config_override: {tts_settings: {voice_id: voice.id, model_id: voice.model, voice_settings: {speed: voice.speed}}},
});
console.log(`Lumean order ${order.id}: ${order.status}`);
let current = order;
const deadline = Date.now() + 300000;
while (!['completed', 'result_delivered', 'failed', 'compensated', 'cancelled'].includes(current.status)) {
  if (Date.now() > deadline) throw new Error('Lumean order timeout');
  await new Promise((done) => setTimeout(done, 2500));
  current = request('GET', `/orders/${order.id}`);
  console.log(`Lumean status ${current.status}`);
}
if (!['completed', 'result_delivered'].includes(current.status)) throw new Error(`Lumean order ${current.status}: ${JSON.stringify(current.result)}`);
const path = current.result?.files?.[0];
if (!path) throw new Error('Lumean audio missing');
const {url} = request('POST', '/storage/url', {path});
const out = resolve(project, 'public/assets/pilot/narration-en.mp3');
mkdirSync(resolve(project, 'public/assets/pilot'), {recursive: true});
execFileSync('curl', ['-fsSL', url, '-o', out], {stdio: 'inherit'});
writeFileSync(resolve(project, 'public/assets/pilot/lumean.json'), JSON.stringify({provider: 'Lumean', voice, orderId: order.id, narration, output: 'narration-en.mp3'}, null, 2));
console.log(`Saved ${out}`);
