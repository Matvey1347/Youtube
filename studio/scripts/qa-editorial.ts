import {existsSync, readFileSync} from 'node:fs';
import {resolve} from 'node:path';
const root = resolve(process.cwd(), '..');
const storyboard = JSON.parse(readFileSync(resolve(root, 'projects/editorial-typography/storyboard.json'), 'utf8')) as {format:{width:number;height:number;fps:number;durationInFrames:number};reference:{file:string;durationSeconds:number};beats:{id:string;output:string}[]};
const errors:string[]=[];
const sceneData=JSON.parse(readFileSync(resolve(root,'projects/editorial-typography/scene-data.json'),'utf8')) as {scenes:{id:string;from:number;durationInFrames:number}[]};
if (storyboard.format.width!==1920 || storyboard.format.height!==1080) errors.push('Expected 1920x1080 composition.');
if (![30,60].includes(storyboard.format.fps)) errors.push('FPS must be 30 or 60.');
if (storyboard.format.durationInFrames/storyboard.format.fps<10 || storyboard.format.durationInFrames/storyboard.format.fps>15) errors.push('Editorial duration must be 10–15 seconds.');
if (!existsSync(resolve(root,storyboard.reference.file))) errors.push(`Missing reference: ${storyboard.reference.file}`);
for(const required of ['out/editorial-typography-v2.mp4','out/editorial-typography-comparison.mp4','out/editorial-typography-v1-v2-comparison.mp4','out/motion-library-smoke.mp4']) if(!existsSync(resolve(root,required))) errors.push(`Missing rendered deliverable ${required}`);
for(const required of ['projects/editorial-typography/assets/marble-david-optimized.jpg','projects/editorial-typography/assets/marble-david-bust.png','projects/editorial-typography/assets/chess-pieces-optimized.jpg','projects/editorial-typography/assets/phone-photo-optimized.jpg','projects/editorial-typography/assets/typewriter-editor-optimized.jpg','projects/editorial-typography/archive/editorial-typography-v1.mp4']) if(!existsSync(resolve(root,required))) errors.push(`Missing project asset ${required}`);
const starts=storyboard.beats.map(b=>Number(b.output.split('–')[0].replace('s',''))).sort((a,b)=>a-b);
if(starts[0]!==0) errors.push('Timeline must start at zero.');
const ordered=[...sceneData.scenes].sort((a,b)=>a.from-b.from);
if(ordered.some((scene,index)=>index>0 && scene.from!==ordered[index-1]!.from+ordered[index-1]!.durationInFrames)) errors.push('Scene timings must be contiguous with no gaps or overlaps.');
if(ordered.reduce((sum,scene)=>sum+scene.durationInFrames,0)!==storyboard.format.durationInFrames) errors.push('Scene durations must equal composition duration.');
if(errors.length){console.error(errors.map(e=>`FAIL ${e}`).join('\n'));process.exitCode=1;}else{console.log(`PASS editorial format: ${storyboard.format.width}×${storyboard.format.height} @ ${storyboard.format.fps}fps`);console.log(`PASS editorial duration: ${storyboard.format.durationInFrames/storyboard.format.fps}s`);console.log(`PASS source, archived pilot, 4 licensed art assets and 4 rendered deliverables exist`);console.log(`PASS storyboard and scene manifest: ${storyboard.beats.length} beats, contiguous timings`);}
