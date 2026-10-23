import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const PaperWipe: React.FC<{children: React.ReactNode; frames?: number}> = ({children, frames = 12}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [0, frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - progress * 100}% 0 0)`}}>{children}</div>;
};
