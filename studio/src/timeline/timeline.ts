import type {VideoProject} from '../contracts';

export const getDurationInFrames = (project: VideoProject): number =>
  Math.max(...project.scenes.map((scene) => scene.from + scene.durationInFrames));

export const validateTimeline = (project: VideoProject): string[] => {
  const errors: string[] = [];
  const ids = new Set<string>();
  const scenes = [...project.scenes].sort((a, b) => a.from - b.from);
  if (scenes[0]?.from !== 0) errors.push('Timeline must start at frame 0.');
  for (const scene of scenes) {
    if (ids.has(scene.id)) errors.push(`Duplicate scene id: ${scene.id}`);
    ids.add(scene.id);
  }
  for (let index = 1; index < scenes.length; index++) {
    const previous = scenes[index - 1];
    const current = scenes[index];
    const previousEnd = previous.from + previous.durationInFrames;
    if (current.from < previousEnd) errors.push(`Scenes ${previous.id} and ${current.id} overlap.`);
    if (current.from > previousEnd) errors.push(`Timeline gap between ${previous.id} and ${current.id}.`);
  }
  for (const caption of project.captions) {
    if (caption.to <= caption.from) errors.push(`Caption has non-positive duration at ${caption.from}s.`);
    if (caption.to * project.fps > getDurationInFrames(project)) errors.push(`Caption extends beyond composition at ${caption.from}s.`);
  }
  return errors;
};
