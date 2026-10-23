import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
import {buildOrganicWipePolygon} from '../src/motion/OrganicLiquidWipe';
import {splitKineticTokens} from '../src/motion/KineticTypography';
import {getStaggerStart} from '../src/motion/StaggeredObjectEntrance';

const root=resolve(process.cwd(),'..');
test('all motion effects have an implementation and one shared demo render',()=>{
  const effects=['KineticTypography','BlurToSharpReveal','MaskedTextReveal','ForegroundOcclusion','CameraMove','OrganicLiquidWipe','StaggeredObjectEntrance','LayeredParallax'];
  for(const effect of effects){const file=resolve(process.cwd(),`src/motion/${effect}.tsx`);assert.ok(existsSync(file),`missing ${effect}`);assert.match(readFileSync(file,'utf8'),new RegExp(`export const ${effect}`));}
  assert.ok(existsSync(resolve(process.cwd(),'src/scenes/editorial-typography/MotionLibrarySmoke.tsx')));
});
test('organic wipe is deterministic and spans the full frame at endpoints',()=>{
  const start=buildOrganicWipePolygon(0,0,24,80,2.4,'left');
  const middle=buildOrganicWipePolygon(12,0,24,80,2.4,'left');
  const end=buildOrganicWipePolygon(24,0,24,80,2.4,'left');
  assert.equal(start,buildOrganicWipePolygon(0,0,24,80,2.4,'left'));
  const middleX=middle.split(' ').filter(point=>point.includes(',')).map(point=>Number(point.split(',')[0])).filter(Number.isFinite);
  assert.ok(Math.min(...middleX)<940 && Math.max(...middleX)>980,'mid-transition edge should have visible organic variation around the half-frame boundary');
  assert.ok(end.includes('1920,'));
});
test('kinetic tokens preserve editorial line breaks and stagger order',()=>{
  assert.deepEqual(splitKineticTokens('one two\nthree'),['one',' ','two','\n','three']);
  assert.equal(getStaggerStart(3,4,5),19);
});
test('project assets, source reference and archived v1 are present',()=>{
  const files=['projects/editorial-typography/assets/marble-david-optimized.jpg','projects/editorial-typography/assets/marble-david-bust.png','projects/editorial-typography/assets/chess-pieces-optimized.jpg','projects/editorial-typography/assets/phone-photo-optimized.jpg','projects/editorial-typography/assets/typewriter-editor-optimized.jpg','references/originals/editorial-typography.mp4','projects/editorial-typography/archive/editorial-typography-v1.mp4'];
  for(const file of files){const path=resolve(root,file);assert.ok(existsSync(path),`missing ${file}`);assert.ok(statSync(path).size>1000,`empty ${file}`);}
  const timeline=JSON.parse(readFileSync(resolve(root,'projects/editorial-typography/scene-data.json'),'utf8')) as {format:{width:number;height:number;fps:number;durationInFrames:number};scenes:{from:number;durationInFrames:number}[]};
  assert.deepEqual([timeline.format.width,timeline.format.height,timeline.format.fps,timeline.format.durationInFrames],[1920,1080,30,420]);
  assert.equal(timeline.scenes.reduce((total,scene)=>total+scene.durationInFrames,0),timeline.format.durationInFrames);
});
