import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, Eyebrow, Headline, PaperGrain, SmallLabel} from '../ScenePrimitives';

export const Patience: React.FC = () => {
  const frame = useCurrentFrame();
  const sprout = interpolate(frame, [10, 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const leaf = interpolate(frame, [35, 52], [0.2, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#e8e5d7'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 72% 48%, #f7f4e9 0%, #e8e5d7 70%)'}} />
      <PaperGrain />
      <Eyebrow>ПОКУПКА — ЭТО НАЧАЛО</Eyebrow>
      <div style={{position: 'absolute', left: 148, top: 286}}>
        <Headline size={78} maxWidth={790}>Хорошая компания.<br />Долгий горизонт.</Headline>
        <div style={{marginTop: 28}}><SmallLabel>Дать росту время<br />вместо постоянной гонки</SmallLabel></div>
      </div>
      <div style={{position: 'absolute', right: 190, bottom: 165, width: 390, height: 390}}>
        <div style={{position: 'absolute', left: 75, bottom: 0, width: 240, height: 76, borderRadius: '50%', background: '#b6a27a', boxShadow: '0 21px 36px rgba(61,51,31,.16)'}} />
        <div style={{position: 'absolute', left: 142, bottom: 62, width: 105, height: 98, borderRadius: '42% 42% 50% 50%', background: 'linear-gradient(120deg,#c7a46b,#8b6743)', transform: 'rotate(-3deg)', boxShadow: '0 16px 19px rgba(70,54,32,.18)' }} />
        <div style={{position: 'absolute', left: 193, bottom: 145, width: 10, height: 185 * sprout, background: colors.olive, transformOrigin: 'bottom', transform: `rotate(-4deg) scaleY(${sprout})`}} />
        <svg width="390" height="250" viewBox="0 0 390 250" style={{position: 'absolute', left: 0, bottom: 148, opacity: leaf}}>
          <path d="M194 204C144 160 116 104 126 54M200 180C238 136 278 114 319 109M193 142C171 112 166 83 176 50" fill="none" stroke={colors.olive} strokeWidth="9" strokeLinecap="round" />
          <path d="M125 62C73 43 48 58 54 94c32 6 54-3 71-32ZM315 111c10-42 38-59 72-43-3 32-24 50-72 43ZM177 62c-23-37-15-66 15-76 20 23 17 50-15 76Z" fill="#81885d" stroke="#666d4d" strokeWidth="4" />
        </svg>
        <div style={{position: 'absolute', right: 8, bottom: 4, color: colors.mutedInk, fontFamily: 'Georgia, serif', fontSize: 21, fontStyle: 'italic'}}>рост требует времени</div>
      </div>
    </div>
  );
};
