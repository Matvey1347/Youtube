import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

type Direction = 'from-left' | 'from-right' | 'from-top' | 'from-bottom';

export const SceneWipe: React.FC<{children: React.ReactNode; direction: Direction; frames?: number}> = ({children, direction, frames = 9}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const progress = interpolate(frame, [0, frames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  let clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
  let edgeStyle: React.CSSProperties = {left: `${progress * 100}%`, top: 0, width: 26, height: '100%', marginLeft: -13};
  if (direction === 'from-right') {
    clipPath = `inset(0 0 0 ${100 - progress * 100}%)`;
    edgeStyle = {right: `${progress * 100}%`, top: 0, width: 26, height: '100%', marginRight: -13};
  }
  if (direction === 'from-top') {
    clipPath = `inset(0 0 ${100 - progress * 100}% 0)`;
    edgeStyle = {left: 0, top: `${progress * 100}%`, width: '100%', height: 24, marginTop: -12};
  }
  if (direction === 'from-bottom') {
    clipPath = `inset(${100 - progress * 100}% 0 0 0)`;
    edgeStyle = {left: 0, bottom: `${progress * 100}%`, width: '100%', height: 24, marginBottom: -12};
  }
  const edgeOpacity = interpolate(frame, [0, Math.max(1, frames - 2), frames], [0.85, 0.6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const edgeWidth = direction === 'from-left' || direction === 'from-right' ? width : height;
  return (
    <>
      <div style={{position: 'absolute', inset: 0, clipPath}}>{children}</div>
      {frame <= frames ? <div aria-hidden="true" style={{position: 'absolute', ...edgeStyle, opacity: edgeOpacity, pointerEvents: 'none', background: '#f4f0e7', boxShadow: direction === 'from-left' || direction === 'from-right' ? '8px 0 24px rgba(39,31,20,.23)' : '0 8px 24px rgba(39,31,20,.23)', width: direction === 'from-left' || direction === 'from-right' ? 26 : edgeWidth, height: direction === 'from-top' || direction === 'from-bottom' ? 24 : '100%'}} /> : null}
    </>
  );
};
