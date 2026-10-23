import {readFileSync, mkdirSync, writeFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {fal} from '@fal-ai/client';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(root, 'public/assets/pilot');
mkdirSync(outputDir, {recursive: true});
const envText = readFileSync(resolve(root, '..', '.env'), 'utf8');
const raw = envText.match(/^\s*FAL_API_KEY\s*=\s*(.+)\s*$/m)?.[1]?.trim();
const key = raw?.replace(/^['"]|['"]$/g, '');
if (!key) throw new Error('FAL_API_KEY missing');
fal.config({credentials:key});

const common = 'Horizontal 16:9 composition. 1930s Omaha editorial magazine photo collage aesthetic, believable period-correct material culture, photographic halftone print grain, ivory paper, muted ink black and warm Coca-Cola red accent. Production asset for layered motion design. No readable text, no fake archival stamp, no modern objects, no extra fingers, no historical person likeness.';
const prompts = [
  {name:'omaha-street.jpg', prompt:`Wide establishing view of a modest 1936 Omaha Nebraska neighborhood grocery exterior on a residential street, early morning. Storefront left-center, wide empty sidewalk in foreground, enough clear space on right for cutout figures. View from across the street, slightly low camera, soft morning shadow. ${common}`},
  {name:'boy-back.png', prompt:`Full-body anonymous six-year-old boy in a modest 1936 American shirt, short trousers, knee socks and worn shoes. Three-quarter back view, head turned away from camera, one arm by his side and other arm naturally extended toward a counter. Single figure centered on a plain pale gray seamless studio backdrop, entirely visible, easy to isolate as a cutout. Do not carry anything. ${common}`},
  {name:'counter.png', prompt:`1936 Midwestern grocery wooden sales counter, shown as a physically plausible sturdy solid object at three-quarter angle, empty countertop, glass display front, wood worn smooth at edge. Isolated object centered on a plain pale gray studio backdrop, full counter visible, easy to cut out. ${common}`},
  {name:'sixpack.png', prompt:`One single 1930s wooden carrier containing EXACTLY SIX identical small contour-shaped dark glass cola bottles, arranged in two rows of three. Each bottle has one crown cap. Every bottle visibly countable. Carrier has one wooden handle. No loose bottles, no extra bottle silhouettes. Single product isolated against a plain pale gray studio backdrop, three-quarter view, full crate visible. Do not render any label or logo. ${common}`},
  {name:'bottle.png', prompt:`ONE SINGLE 1930s small contour-shaped dark glass cola bottle with ONE metal crown cap, no straw, no glass, no other bottle. Intact and upright, viewed in three-quarter product angle, full bottle from cap to base visible. Isolated against a plain pale gray studio backdrop, with realistic glass highlights. No label or logo. ${common}`},
  {name:'seller-hand.png', prompt:`Close-up isolated adult shopkeeper's right hand, 1930s rolled shirt sleeve, palm up ready to receive a coin, wrist and forearm included, anatomically correct five fingers. Plain pale gray studio backdrop, no other objects or hands. ${common}`},
  {name:'boy-hand.png', prompt:`Close-up isolated small child's left hand holding a SINGLE US quarter coin between thumb and forefinger, hand naturally extended to pass coin to shopkeeper, wrist and small forearm included, anatomically correct five fingers. Plain pale gray studio backdrop, no other objects or hands, coin design need not be legible. ${common}`},
];
const manifestPath=resolve(outputDir,'manifest.json');
const manifest=existsSync(manifestPath)?JSON.parse(readFileSync(manifestPath,'utf8')):{provider:'fal',model:'google/nano-banana-2.1',resolution:'2K',aspectRatio:'16:9',purpose:'Illustrative reconstructions, not archival photographs',assets:[]};
for(const item of prompts){
  const path=resolve(outputDir,item.name);
  if(existsSync(path)){console.log(`Skipping existing ${item.name}`);continue;}
  console.log(`Generating ${item.name}`);
  const result=await fal.subscribe('google/nano-banana-2.1',{input:{prompt:item.prompt,aspect_ratio:'16:9',resolution:'2K',output_format:'jpeg'},logs:false});
  const image=result.data?.images?.[0] ?? result.data?.image;
  if(!image?.url) throw new Error(`No image URL for ${item.name}; request ${result.requestId}`);
  const response=await fetch(image.url);
  if(!response.ok) throw new Error(`Download failed for ${item.name}: ${response.status}`);
  writeFileSync(path,Buffer.from(await response.arrayBuffer()));
  manifest.assets.push({file:item.name,requestId:result.requestId,prompt:item.prompt,sourceType:'generated reconstruction',reviewStatus:'pending'});
  writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
  console.log(`Saved ${item.name}; request ${result.requestId}`);
}
