import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {colors, Eyebrow, Headline, SmallLabel} from '../ScenePrimitives';

export const InvestorPortrait: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 82], [1.05, 1.13], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#d8edf0'}}>
      <Img src={staticFile('assets/buffett-collage.png')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 45%', transform: `scale(${zoom})`}} />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(242,238,228,.97) 0%, rgba(242,238,228,.89) 37%, rgba(242,238,228,.18) 75%)'}} />
      <Eyebrow>УОРРЕН БАФФЕТ</Eyebrow>
      <div style={{position: 'absolute', left: 145, top: 288, width: 735}}>
        <Headline size={85} maxWidth={720}>Не угадывать.<br />Выбирать надолго.</Headline>
        <div style={{marginTop: 32}}><SmallLabel>Дисциплина вместо погони<br />за быстрым результатом</SmallLabel></div>
      </div>
      <div style={{position: 'absolute', left: 155, bottom: 93, width: 255, height: 2, background: colors.burgundy}} />
      <div style={{position: 'absolute', left: 143, bottom: 80, width: 22, height: 22, borderRadius: '50%', background: colors.burgundy}} />
      <div style={{position: 'absolute', left: 406, bottom: 80, width: 22, height: 22, borderRadius: '50%', background: colors.burgundy}} />
    </div>
  );
};
