import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const OrganicWipe: React.FC<{children: React.ReactNode; from?: number; duration?: number; invert?: boolean}> = ({children, from = 0, duration = 22, invert = false}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - from, [0, duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const edge = progress * 2200 - 140;
  const path = invert
    ? `M1920 0 L${edge + 240} 0 Q${edge + 60} 170 ${edge + 210} 350 T${edge + 170} 700 Q${edge + 40} 900 ${edge + 230} 1080 L1920 1080 Z`
    : `M0 0 L${edge - 220} 0 Q${edge - 50} 140 ${edge - 190} 330 T${edge - 120} 680 Q${edge + 40} 850 ${edge - 160} 1080 L0 1080 Z`;
  return <div style={{position: 'absolute', inset: 0, clipPath: `path('${path}')`}}>{children}</div>;
};
