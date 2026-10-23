import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {VideoProject} from '../contracts';

export const Captions: React.FC<{cues: VideoProject['captions']; accent: string}> = ({cues, accent}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cue = cues.find((item) => frame >= item.from * fps && frame < item.to * fps);
  if (!cue) return null;
  const opacity = Math.min(interpolate(frame, [cue.from * fps, cue.from * fps + 5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), interpolate(frame, [cue.to * fps - 3, cue.to * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  return <div style={{position: 'absolute', left: 150, right: 150, bottom: 64, padding: '20px 28px', borderLeft: `6px solid ${accent}`, background: 'rgba(250,248,240,.94)', color: '#20252a', fontSize: 32, lineHeight: 1.2, opacity, boxShadow: '0 10px 28px #0002'}}>{cue.text}</div>;
};
