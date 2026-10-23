import React from 'react';
import {StudioComposition} from './renderer/StudioComposition';
import projectData from '../../projects/smoke-test/project.json';
import {projectSchema} from './contracts';
import {getDurationInFrames} from './timeline/timeline';
import {Composition} from 'remotion';
import {EditorialTypography} from './scenes/editorial-typography/EditorialTypography';
import {EditorialComparison} from './scenes/editorial-typography/EditorialComparison';
import {MotionLibrarySmoke} from './scenes/editorial-typography/MotionLibrarySmoke';
import {EditorialVersionComparison} from './scenes/editorial-typography/EditorialVersionComparison';
import {editorialProject} from './scenes/editorial-typography/project';

export const RemotionRoot: React.FC = () => <>
  <Composition id="DocumentaryStudio" component={StudioComposition} durationInFrames={getDurationInFrames(projectSchema.parse(projectData))} fps={projectData.fps} width={1920} height={1080} defaultProps={{project: projectSchema.parse(projectData)}} calculateMetadata={({props}) => { const project = projectSchema.parse(props.project); return {durationInFrames: getDurationInFrames(project), fps: project.fps, width: project.width, height: project.height}; }} />
  <Composition id="EditorialTypography" component={EditorialTypography} durationInFrames={editorialProject.format.durationInFrames} fps={editorialProject.format.fps} width={editorialProject.format.width} height={editorialProject.format.height} />
  <Composition id="EditorialComparison" component={EditorialComparison} durationInFrames={editorialProject.format.durationInFrames} fps={editorialProject.format.fps} width={editorialProject.format.width} height={editorialProject.format.height} />
  <Composition id="MotionLibrarySmoke" component={MotionLibrarySmoke} durationInFrames={120} fps={30} width={1920} height={1080} />
  <Composition id="EditorialVersionComparison" component={EditorialVersionComparison} durationInFrames={editorialProject.format.durationInFrames} fps={editorialProject.format.fps} width={1920} height={1080} />
</>;
