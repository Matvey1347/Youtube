import type {VideoProject} from '../contracts';

export const validateStoryboard = (project: VideoProject): string[] => {
  const sceneIds = new Set(project.scenes.map((scene) => scene.id));
  const errors: string[] = [];
  const linked = new Set<string>();
  for (const shot of project.storyboard) {
    if (!sceneIds.has(shot.sceneId)) errors.push(`Storyboard references missing scene: ${shot.sceneId}`);
    if (linked.has(shot.sceneId)) errors.push(`Duplicate storyboard entry: ${shot.sceneId}`);
    linked.add(shot.sceneId);
  }
  for (const sceneId of sceneIds) if (!linked.has(sceneId)) errors.push(`Scene has no storyboard entry: ${sceneId}`);
  return errors;
};
