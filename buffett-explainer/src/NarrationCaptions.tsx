import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import episode from '../content/episode.json';
import {colors} from './ScenePrimitives';

export const NarrationCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cue = episode.captions.find((item) => frame >= item.from * fps && frame < item.to * fps);
  if (!cue) return null;
  const start = cue.from * fps;
  const end = cue.to * fps;
  const opacity = Math.min(
    interpolate(frame, [start, start + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    interpolate(frame, [end - 3, end], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
  );
  return (
    <div style={{
      position: 'absolute',
      left: 134,
      bottom: 63,
      maxWidth: 1430,
      padding: '18px 32px 20px 26px',
      borderLeft: `6px solid ${colors.burgundy}`,
      background: 'rgba(247,244,236,.95)',
      color: colors.ink,
      opacity,
      translate: `0px ${interpolate(frame, [start, start + 7], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`,
      boxShadow: '0 14px 30px rgba(35,32,24,.15)',
      fontFamily: 'Georgia, Baskerville, serif',
      fontSize: 31,
      lineHeight: 1.15,
      letterSpacing: -0.2,
    }}>
      {cue.text}
    </div>
  );
};
