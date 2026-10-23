import React from 'react';
import {Sequence} from 'remotion';
import type {VideoProject} from '../contracts';
import {AudioTracks} from '../audio/AudioTracks';
import {Captions} from '../captions/Captions';
import {PaperWipe} from '../motion/PaperWipe';
import {ScenePreset} from '../scenes/ScenePresets';
import {StyleProvider} from '../styles/StyleProvider';

export const StudioComposition: React.FC<{project: VideoProject}> = ({project}) => <StyleProvider style={project.style}>
  {project.scenes.map((scene) => <Sequence key={scene.id} name={scene.id} from={scene.from} durationInFrames={scene.durationInFrames}>
    {scene.transition === 'paper-wipe' ? <PaperWipe><ScenePreset scene={scene} style={project.style}/></PaperWipe> : <ScenePreset scene={scene} style={project.style}/>}</Sequence>)}
  <Captions cues={project.captions} accent={project.style.accent}/><AudioTracks tracks={project.audio}/>
</StyleProvider>;
