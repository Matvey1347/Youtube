import {existsSync, readFileSync} from 'node:fs';
import {isAbsolute, relative, resolve} from 'node:path';
import {projectSchema} from '../src/contracts';
import {validateStoryboard} from '../src/director/storyboard';
import {getDurationInFrames, validateTimeline} from '../src/timeline/timeline';

const projectPath = resolve(process.cwd(), process.argv[2] ?? '../projects/smoke-test/project.json');
const projectDir = resolve(projectPath, '..');
const raw = JSON.parse(readFileSync(projectPath, 'utf8'));
const project = projectSchema.parse(raw);
const errors = [...validateTimeline(project), ...validateStoryboard(project)];
const projectsDir = resolve(process.cwd(), '../projects');
const checkPath = (root: string, asset: string, label: string) => {
  const path = resolve(root, asset);
  const fromRoot = relative(root, path);
  if (isAbsolute(fromRoot) || fromRoot === '..' || fromRoot.startsWith(`..${process.platform === 'win32' ? '\\' : '/'}`)) {
    errors.push(`${label} escapes its project directory: ${asset}`);
  } else if (!existsSync(path)) {
    errors.push(`Missing ${label}: ${asset}`);
  }
};
for (const asset of project.assets) checkPath(projectDir, asset, 'project asset');
for (const scene of project.scenes) if (scene.kind === 'image-panel') checkPath(projectsDir, scene.image, 'scene asset');
for (const track of project.audio) checkPath(projectsDir, track.src, 'audio asset');
const duration = getDurationInFrames(project);
if (duration <= 0) errors.push('Composition duration must be positive.');
if (duration !== project.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0)) errors.push('Composition duration does not match the sum of scene durations.');
if (errors.length) {
  console.error(errors.map((error) => `FAIL ${error}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`PASS schema: ${project.id}`);
  console.log(`PASS timeline: ${project.scenes.length} scenes, ${duration} frames at ${project.fps} fps`);
  console.log(`PASS assets: ${project.assets.length} project assets, ${project.audio.length} audio tracks`);
}
