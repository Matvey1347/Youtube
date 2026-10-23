import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

export const KineticHeadline: React.FC<{text: string; top: number; left?: number; width?: number; fontSize?: number; color?: string; delay?: number}> = ({text, top, left = 180, width = 1500, fontSize = 150, color = '#ad3d49', delay = 0}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.16, 1, .3, 1)});
  const blur = interpolate(p, [0, 1], [24, 0]);
  return <div style={{position: 'absolute', top, left, width, color, fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize, lineHeight: .78, letterSpacing: '-.075em', textTransform: 'lowercase', opacity: p, filter: `blur(${blur}px)`, transform: `translateY(${(1-p)*34}px) scale(${.92 + p*.08})`, transformOrigin: 'left center', whiteSpace: 'pre-line'}}>{text}</div>;
};
