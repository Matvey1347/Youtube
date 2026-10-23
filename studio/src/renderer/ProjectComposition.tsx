import React from 'react';
import {Composition, Sequence} from 'remotion';
import type {VideoProject} from '../contracts';
import {AudioTracks} from '../audio/AudioTracks';
import {Captions} from '../captions/Captions';
import {PaperWipe} from '../motion/PaperWipe';
import {ScenePreset} from '../scenes/ScenePresets';
import {StyleProvider} from '../styles/StyleProvider';
import {getDurationInFrames} from '../timeline/timeline';

const ProjectVideo: React.FC<{project: VideoProject}> = ({project}) => <StyleProvider style={project.style}>
  {project.scenes.map((scene) => <Sequence key={scene.id} name={scene.id} from={scene.from} durationInFrames={scene.durationInFrames}>
    {scene.transition === 'paper-wipe' ? <PaperWipe><ScenePreset scene={scene} style={project.style}/></PaperWipe> : <ScenePreset scene={scene} style={project.style}/>}
  </Sequence>)}
  <Captions cues={project.captions} accent={project.style.accent}/>
  <AudioTracks tracks={project.audio}/>
</StyleProvider>;

export const ProjectComposition: React.FC<{project: VideoProject}> = ({project}) => <Composition id={project.id === 'smoke-test' ? 'StudioSmokeTest' : project.id} component={ProjectVideo} durationInFrames={getDurationInFrames(project)} fps={project.fps} width={project.width} height={project.height} defaultProps={{project}} />;
