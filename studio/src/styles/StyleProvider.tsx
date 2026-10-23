import React from 'react';
import type {VideoProject} from '../contracts';

export const StyleProvider: React.FC<{style: VideoProject['style']; children: React.ReactNode}> = ({style, children}) => (
  <div style={{position: 'absolute', inset: 0, background: style.background, color: style.foreground, overflow: 'hidden', fontFamily: 'Georgia, serif', ['--accent' as string]: style.accent, ['--muted' as string]: style.muted} as React.CSSProperties}>
    {children}
  </div>
);
