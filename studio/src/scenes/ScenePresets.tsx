import React from 'react';
import {Img, interpolate, useCurrentFrame, staticFile} from 'remotion';
import type {Scene, VideoProject} from '../contracts';

const enter = (frame: number) => interpolate(frame, [0, 14], [24, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const ScenePreset: React.FC<{scene: Scene; style: VideoProject['style']}> = ({scene, style}) => {
  const frame = useCurrentFrame();
  const textStyle: React.CSSProperties = {position: 'absolute', left: 150, top: 270, maxWidth: 1250, transform: `translateY(${enter(frame)}px)`, opacity: interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})};
  if (scene.kind === 'image-panel') return <div style={{position: 'absolute', inset: 0, background: style.background}}><Img src={staticFile(`${scene.image}`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}/>{scene.title && <div style={{...textStyle, color: style.foreground, fontSize: 88, fontWeight: 700}}>{scene.title}</div>}</div>;
  if (scene.kind === 'stat-card') return <div style={textStyle}><div style={{fontFamily: 'Arial, sans-serif', fontSize: 28, letterSpacing: 5, color: style.muted, textTransform: 'uppercase'}}>{scene.label}</div><div style={{marginTop: 26, fontSize: 176, lineHeight: 1, color: style.accent, fontWeight: 700}}>{scene.value}</div>{scene.note && <div style={{marginTop: 24, fontSize: 34, color: style.foreground}}>{scene.note}</div>}</div>;
  return <div style={textStyle}>{scene.kicker && <div style={{fontFamily: 'Arial, sans-serif', fontSize: 28, letterSpacing: 6, color: style.muted, textTransform: 'uppercase'}}>{scene.kicker}</div>}<div style={{marginTop: 24, fontSize: 96, lineHeight: 1.04, color: style.foreground, fontWeight: 700}}>{scene.title}</div>{scene.body && <div style={{marginTop: 28, fontFamily: 'Arial, sans-serif', fontSize: 38, lineHeight: 1.3, color: style.muted}}>{scene.body}</div>}</div>;
};
