import React from 'react';
import {OffthreadVideo, staticFile, useCurrentFrame} from 'remotion';
import {colors, Eyebrow, FrameBorder, Headline, SmallLabel} from '../ScenePrimitives';

export const FirstShare: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: colors.blue}}>
      <OffthreadVideo
        src={staticFile('assets/buffett-paperboy.mp4')}
        muted
        style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1.035 + frame * 0.0003})`, filter: 'saturate(.82) contrast(.97)'}}
      />
      <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(242,238,228,.88) 0%, rgba(242,238,228,.70) 37%, rgba(242,238,228,.02) 78%)'}} />
      <Eyebrow>ОМАХА · 1942</Eyebrow>
      <div style={{position: 'absolute', right: 173, top: 246, width: 696, height: 104, padding: '14px 24px', boxSizing: 'border-box', background: 'rgba(247,244,236,.96)', border: '1px solid rgba(36,38,36,.28)', boxShadow: '0 10px 24px rgba(35,32,24,.18)', color: colors.ink}}>
        <div style={{fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700, letterSpacing: 1}}>CITIES SERVICE</div>
        <div style={{marginTop: 4, fontFamily: 'Avenir Next, Helvetica, sans-serif', fontSize: 17, letterSpacing: 3, color: colors.mutedInk}}>6 ПРИВИЛЕГИРОВАННЫХ АКЦИЙ</div>
      </div>
      <div style={{position: 'absolute', left: 150, top: 258}}>
        <Headline size={252} maxWidth={500} delay={4}>11</Headline>
        <div style={{marginTop: -4, color: colors.burgundy, fontFamily: 'Avenir Next, Helvetica, sans-serif', fontSize: 28, fontWeight: 700, letterSpacing: 7}}>ЛЕТ</div>
        <div style={{marginTop: 42}}>
          <SmallLabel>Первая акция —<br />и первое ожидание</SmallLabel>
        </div>
      </div>
      <div style={{position: 'absolute', right: 80, bottom: 78, padding: '15px 20px', color: colors.ink, background: 'rgba(252,250,244,.90)', borderLeft: `5px solid ${colors.burgundy}`, fontFamily: 'Georgia, serif', fontSize: 27, fontStyle: 'italic'}}>
        Warren E. Buffett
      </div>
      <FrameBorder />
    </div>
  );
};
