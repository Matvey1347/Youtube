import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, Eyebrow, enter, FrameBorder, Headline, PaperGrain, SmallLabel} from '../ScenePrimitives';

const Bicycle: React.FC = () => {
  const frame = useCurrentFrame();
  const turn = interpolate(frame, [0, 80], [-2, 2], {extrapolateRight: 'clamp'});
  return (
    <svg width="770" height="460" viewBox="0 0 770 460" style={{position: 'absolute', right: 50, bottom: 118, rotate: `${turn}deg`}}>
      <g fill="none" stroke="#473e32" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="170" cy="325" r="100" strokeWidth="9" />
        <circle cx="573" cy="325" r="100" strokeWidth="9" />
        <path d="M170 325 315 195 400 325 170 325 250 325 340 222 460 222 573 325 400 325 460 222" strokeWidth="12" />
        <path d="M287 185 346 185 M410 222 486 222 M151 211 191 211 M553 211 593 211" strokeWidth="9" />
        <path d="m309 196 19-29h42 M448 222l24-39h48" strokeWidth="8" />
        <path d="M385 325c0-21 18-38 38-38m-38 38 35-4" strokeWidth="8" />
      </g>
      <circle cx="320" cy="195" r="15" fill={colors.burgundy} />
      <circle cx="400" cy="325" r="11" fill="#473e32" />
      <path d="M78 350h580" stroke="#b9ab92" strokeWidth="2" strokeDasharray="8 12" />
    </svg>
  );
};

export const TaxReturn: React.FC = () => {
  const frame = useCurrentFrame();
  const stampScale = interpolate(frame, [18, 28, 72], [0.3, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: colors.paper}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 60% 43%, #fffdf7 0%, #f3ecdd 68%, #e8dfce 100%)'}} />
      <PaperGrain />
      <Eyebrow>ПЕРВАЯ ДЕКЛАРАЦИЯ</Eyebrow>
      <div style={{position: 'absolute', left: 128, top: 238, width: 625}}>
        <Headline size={170} maxWidth={620}>−$35</Headline>
        <div style={{marginTop: 26}}><SmallLabel>Велосипед —<br />расход для газетного маршрута</SmallLabel></div>
        <div style={{position: 'absolute', left: 2, top: 386, color: colors.mutedInk, fontFamily: 'Avenir Next, sans-serif', fontSize: 20, letterSpacing: 3}}>1944 · НАЛОГОВАЯ ФОРМА</div>
      </div>
      <Bicycle />
      <div style={{...enter(frame, 20, 12, 5), position: 'absolute', right: 149, top: 166, transform: `rotate(8deg) scale(${stampScale})`, transformOrigin: 'center', padding: '16px 25px 12px', border: `4px solid ${colors.burgundy}`, color: colors.burgundy, fontFamily: 'Georgia, serif', fontSize: 31, fontWeight: 700, letterSpacing: 4}}>
        ВЫЧЕТ
      </div>
      <FrameBorder />
    </div>
  );
};
