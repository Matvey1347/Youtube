import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

export const colors = {
  paper: '#f2eee4',
  ink: '#242624',
  mutedInk: '#615c52',
  blue: '#bce2ee',
  burgundy: '#a84a46',
  brass: '#b88d51',
  olive: '#737956',
  white: '#fcfaf4',
};

export const fill = (background: string): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
  background,
});

export const enter = (frame: number, delay = 4, duration = 16, lift = 38) => ({
  opacity: interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  }),
  translate: `0px ${interpolate(frame, [delay, delay + duration], [lift, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  })}px`,
});

export const Eyebrow: React.FC<{children: string; inverse?: boolean}> = ({children, inverse = false}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      ...enter(frame, 2, 13, 12),
      display: 'inline-flex',
      alignItems: 'center',
      gap: 14,
      color: inverse ? '#e8e3d7' : colors.mutedInk,
      fontFamily: 'Avenir Next, Helvetica, sans-serif',
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: 4,
      textTransform: 'uppercase',
    }}>
      <span style={{width: 35, height: 2, background: colors.burgundy}} />
      {children}
    </div>
  );
};

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  maxWidth?: number;
  delay?: number;
  align?: 'left' | 'center';
}> = ({children, size = 82, color = colors.ink, maxWidth = 900, delay = 6, align = 'left'}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      ...enter(frame, delay, 18, 42),
      color,
      fontFamily: 'Georgia, Baskerville, serif',
      fontSize: size,
      fontWeight: 700,
      lineHeight: 0.98,
      letterSpacing: -2,
      maxWidth,
      textAlign: align,
      textWrap: 'balance',
      textShadow: color === colors.white ? '0 5px 24px rgba(0,0,0,.22)' : 'none',
    }}>
      {children}
    </div>
  );
};

export const SmallLabel: React.FC<{children: React.ReactNode; inverse?: boolean}> = ({children, inverse = false}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{
      ...enter(frame, 12, 14, 18),
      color: inverse ? 'rgba(252,250,244,.82)' : colors.mutedInk,
      fontFamily: 'Avenir Next, Helvetica, sans-serif',
      fontSize: 29,
      fontWeight: 500,
      lineHeight: 1.28,
      maxWidth: 690,
      letterSpacing: 0.1,
    }}>
      {children}
    </div>
  );
};

export const PaperGrain: React.FC<{dark?: boolean}> = ({dark = false}) => (
  <div aria-hidden="true" style={{
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    opacity: dark ? 0.22 : 0.16,
    backgroundImage: dark
      ? 'radial-gradient(rgba(255,255,255,.20) .7px, transparent .7px)'
      : 'radial-gradient(rgba(55,44,28,.24) .7px, transparent .7px)',
    backgroundSize: '7px 7px',
    mixBlendMode: dark ? 'screen' : 'multiply',
  }} />
);

export const FrameBorder: React.FC = () => (
  <div aria-hidden="true" style={{
    position: 'absolute',
    inset: 23,
    border: '1px solid rgba(38,38,35,.22)',
    pointerEvents: 'none',
  }} />
);
