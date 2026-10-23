import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {colors, Eyebrow, SmallLabel} from '../ScenePrimitives';

export const Finale: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 79], [1.1, 1.19], {extrapolateRight: 'clamp'});
  const reveal = interpolate(frame, [8, 25], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: colors.paper}}>
      <Img src={staticFile('assets/buffett-collage.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', transform: `scale(${zoom})`}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(242,238,228,.98) 0%, rgba(242,238,228,.91) 39%, rgba(242,238,228,.06) 77%)'}} />
      <Eyebrow>ИНВЕСТИЦИОННОЕ МЫШЛЕНИЕ</Eyebrow>
      <div style={{position: 'absolute', left: 145, top: 316, maxWidth: 940, opacity: reveal, translate: `0px ${interpolate(frame, [8, 25], [42, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}px`}}>
        <div style={{color: colors.ink, fontFamily: 'Georgia, Baskerville, serif', fontSize: 88, fontWeight: 700, lineHeight: 0.98, letterSpacing: -2}}>Главное<br />преимущество —</div>
        <div style={{marginTop: 12, color: colors.burgundy, fontFamily: 'Georgia, Baskerville, serif', fontSize: 150, fontWeight: 700, lineHeight: 0.95, letterSpacing: -4}}>ВРЕМЯ</div>
        <div style={{marginTop: 34}}><SmallLabel>Оставьте сложному проценту<br />достаточно лет</SmallLabel></div>
      </div>
      <div style={{position: 'absolute', right: 60, top: 55, padding: '12px 18px', border: '1px solid rgba(36,38,36,.35)', color: colors.ink, fontFamily: 'Georgia, serif', fontSize: 20, letterSpacing: 2}}>УРОК УОРРЕНА БАФФЕТА</div>
    </div>
  );
};
