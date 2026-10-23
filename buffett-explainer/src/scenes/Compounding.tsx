import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors, Eyebrow, PaperGrain} from '../ScenePrimitives';

const Coin: React.FC<{left: number; top: number; size: number; delay: number; color: string}> = ({left, top, size, delay, color}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [delay, delay + 10], [0.15, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left, top, width: size, height: size, borderRadius: '50%', border: `5px solid ${color}`, background: 'radial-gradient(circle at 34% 30%, rgba(255,255,255,.28), transparent 60%), #a9844f', boxShadow: '0 13px 24px rgba(0,0,0,.26)', scale, transformOrigin: 'bottom center'}} />;
};

export const Compounding: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = interpolate(frame, [2, 72], [1000, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', inset: 0, overflow: 'hidden', background: '#252725'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 68% 44%, #414238 0%, #252725 64%)'}} />
      <PaperGrain dark />
      <Eyebrow inverse>КЛЮЧЕВОЙ МЕХАНИЗМ</Eyebrow>
      <div style={{position: 'absolute', left: 148, top: 270, color: colors.white, fontFamily: 'Georgia, serif', fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1}}>
        СЛОЖНЫЙ<br />ПРОЦЕНТ
      </div>
      <div style={{position: 'absolute', left: 149, top: 478, color: '#d7cdbd', fontFamily: 'Avenir Next, sans-serif', fontSize: 27, letterSpacing: 1}}>МАЛЕНЬКИЙ РОСТ · ДОЛГОЕ ВРЕМЯ</div>
      <svg width="1000" height="640" viewBox="0 0 1000 640" style={{position: 'absolute', right: 45, bottom: 34}}>
        <path d="M80 550H930M80 550V40" stroke="rgba(242,238,228,.32)" strokeWidth="2" />
        <path d="M80 430H930M80 305H930M80 180H930" stroke="rgba(242,238,228,.12)" strokeWidth="2" strokeDasharray="6 14" />
        <path pathLength={1000} d="M96 510C195 500 220 462 300 466S420 395 500 398 630 330 695 286 790 155 900 68" fill="none" stroke="#d5b36f" strokeWidth="11" strokeLinecap="round" strokeDasharray={1000} strokeDashoffset={offset} />
        <circle cx="900" cy="68" r="18" fill="#f2eee4" />
        <path d="m872 86 28-18-3 31" fill="none" stroke="#f2eee4" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Coin left={1335} top={730} size={85} delay={8} color="#d9c59b" />
      <Coin left={1415} top={688} size={98} delay={14} color="#dfca9e" />
      <Coin left={1490} top={628} size={110} delay={19} color="#d4bc8c" />
      <Coin left={1580} top={540} size={128} delay={24} color="#e0ca97" />
      <Coin left={1682} top={430} size={144} delay={30} color="#ddc58b" />
      <Coin left={1785} top={286} size={158} delay={36} color="#dfca98" />
    </div>
  );
};
