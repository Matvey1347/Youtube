import {readFileSync, writeFileSync, renameSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {fal} from '@fal-ai/client';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dir=resolve(root,'public/assets/pilot');
const raw=readFileSync(resolve(root,'..','.env'),'utf8').match(/^\s*FAL_API_KEY\s*=\s*(.+)\s*$/m)?.[1]?.trim();
const key=raw?.replace(/^['"]|['"]$/g,'');
if(!key) throw new Error('FAL_API_KEY missing');
fal.config({credentials:key});
const manifestPath=resolve(dir,'manifest.json');
const manifest=JSON.parse(readFileSync(manifestPath,'utf8'));
for(const name of ['boy-back.png','counter.png','sixpack.png','bottle.png','seller-hand.png','boy-hand.png']){
  const path=resolve(dir,name);
  if(!existsSync(path)){console.log(`Waiting for ${name}`);continue;}
  const entry=manifest.assets.find(x=>x.file===name);
  if(entry?.maskRequestId){console.log(`Skipping ${name}`);continue;}
  const sourcePath=resolve(dir,name.replace(/\.png$/,'.source.jpg'));
  renameSync(path,sourcePath);
  console.log(`Masking ${name}`);
  const imageUrl=await fal.storage.upload(new File([readFileSync(sourcePath)],name.replace(/\.png$/,'.jpg'),{type:'image/jpeg'}));
  const result=await fal.subscribe('fal-ai/bria/background/remove',{input:{image_url:imageUrl},logs:false});
  const url=result.data?.image?.url;
  if(!url) throw new Error(`No cutout for ${name}`);
  const response=await fetch(url);
  if(!response.ok) throw new Error(`Download mask failed: ${response.status}`);
  writeFileSync(path,Buffer.from(await response.arrayBuffer()));
  entry.maskModel='fal-ai/bria/background/remove';
  entry.maskRequestId=result.requestId;
  entry.sourceFile=name.replace(/\.png$/,'.source.jpg');
  entry.reviewStatus='pending visual inspection';
  writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n');
  console.log(`Saved transparent ${name}`);
}
