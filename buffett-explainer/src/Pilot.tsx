import React from 'react';
import {Audio} from '@remotion/media';
import {AbsoluteFill, Composition, Img, staticFile, useCurrentFrame} from 'remotion';

const W = 1920;
const H = 1080;
const C = {paper: '#eee5d4', ink: '#292721', red: '#9e3630', blue: '#aebfca', gold: '#c6a26b'};
const ease = (t: number) => t * t * (3 - 2 * t);
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const progress = (frame: number, from: number, to: number) => ease(clamp((frame - from) / (to - from)));
const held = (frame: number, start: number, end: number, fade = 8) =>
  progress(frame, start, start + fade) * (1 - progress(frame, end - fade, end));

const Cutout: React.FC<{
  file: string;
  x: number;
  y: number;
  w: number;
  h?: number;
  frame: number;
  from: number;
  until: number;
  drift?: number;
  rotate?: number;
  scale?: number;
  z?: number;
  shadow?: boolean;
}> = ({file, x, y, w, h, frame, from, until, drift = 0, rotate = 0, scale = 1, z = 1, shadow = true}) => {
  const opacity = held(frame, from, until);
  const motion = progress(frame, from, from + 18);
  return <Img src={staticFile(`assets/pilot/${file}`)} style={{
    position: 'absolute', left: x, top: y, width: w, height: h, objectFit: 'contain',
    opacity, transform: `translate3d(${drift * motion}px, ${-drift * 0.27 * motion}px, 0) rotate(${rotate}deg) scale(${scale})`,
    transformOrigin: 'center center', zIndex: z,
    filter: shadow ? 'drop-shadow(0 5px 1px rgba(49,37,24,.17)) drop-shadow(10px 15px 10px rgba(49,37,24,.20))' : undefined,
  }} />;
};

const LedgerText: React.FC<{children: React.ReactNode; x: number; y: number; size?: number; color?: string; rotate?: number; opacity?: number; serif?: boolean}> =
  ({children, x, y, size = 34, color = C.ink, rotate = 0, opacity = 1, serif = false}) =>
    <div style={{position: 'absolute', left: x, top: y, fontSize: size, color, opacity, transform: `rotate(${rotate}deg)`,
      fontFamily: serif ? 'Georgia, Times New Roman, serif' : 'Arial Narrow, Arial, sans-serif', letterSpacing: serif ? '-.025em' : '.11em',
      fontWeight: serif ? 500 : 700, lineHeight: 1.1, whiteSpace: 'pre-line', zIndex: 30}}>{children}</div>;

const Coin: React.FC<{x: number; y: number; frame: number; appear: number; angle?: number; size?: number; value?: '5¢' | '25¢'}> = ({x, y, frame, appear, angle = 0, size = 112, value = '5¢'}) => {
  const p = progress(frame, appear, appear + 9);
  return <div style={{position: 'absolute', left: x, top: y, width: size, height: size, zIndex: 22,
    opacity: p, transform: `translateY(${(1-p)*-34}px) rotate(${angle+(1-p)*60}deg) scale(${0.75+0.25*p})`,
    borderRadius: '50%', background: 'radial-gradient(circle at 35% 25%,#e9dfc5,#b4a585 55%,#8b8068 80%)',
    border: '5px ridge #e4d6b7', boxShadow: 'inset 0 0 0 5px #afa080,inset 0 0 0 8px #d6c7a7,8px 13px 8px #0003'}}>
    <div style={{position: 'absolute', inset: 16, border: '2px solid #8c7e63', borderRadius: '50%', color: '#766a54',
      display: 'grid', placeItems: 'center', fontFamily: 'Georgia,serif', fontWeight: 700, fontSize: size*(value === '25¢' ? .28 : .32),
      textShadow: '1px 1px #efe4c9'}}>{value}</div>
  </div>;
};

const Paper: React.FC = () => <AbsoluteFill style={{backgroundColor: C.paper,
  backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, rgba(76,54,31,.018) 1px, transparent 3px), radial-gradient(ellipse at 50% 45%, transparent 43%, rgba(70,51,26,.18) 100%)'}} />;

const Street: React.FC<{f: number}> = ({f}) => {
  const p = progress(f, 0, 65);
  return <AbsoluteFill style={{opacity: held(f, 0, 82, 10), overflow: 'hidden'}}>
    <Img src={staticFile('assets/pilot/omaha-1938-loc.jpg')} style={{width: W+110, height: H+60, objectFit: 'cover', objectPosition: 'center',
      filter: 'grayscale(1) sepia(.39) contrast(.87) brightness(1.05)', transform: `translate(${-55-25*p}px,${-30-8*p}px) scale(${1+.025*p})`}} />
    <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(238,229,212,.58),rgba(238,229,212,.02) 65%),linear-gradient(0deg,rgba(40,30,20,.4),transparent 32%)'}} />
    <Cutout file="boy-back.png" x={1150} y={125} w={650} frame={f} from={10} until={88} drift={-18} z={3}/>
    <LedgerText x={98} y={94} size={32} color="#fff8e6">OMAHA  /  1930s</LedgerText>
    <LedgerText x={96} y={744} size={85} color="#fff8e6" serif>Six bottles.<br/>One small idea.</LedgerText>
    <LedgerText x={1010} y={1006} size={18} color="#fff8e6">ARCHIVAL STREET · RECONSTRUCTED BOY</LedgerText>
  </AbsoluteFill>;
};

const Counter: React.FC<{f: number}> = ({f}) => {
  const visible = held(f, 60, 178, 12);
  const push = progress(f, 68, 155);
  return <AbsoluteFill style={{opacity: visible}}>
    <div style={{position:'absolute',left:80,top:80,width:1760,height:915,background:'#d1b99c',
      border:'22px solid #8f6b49',boxShadow:'inset 0 0 90px #69492970,22px 28px 35px #3828183b',transform:`scale(${1+.025*push})`}} />
    <Cutout file="counter.png" x={40} y={500} w={1820} frame={f} from={60} until={178} z={3}/>
    <Cutout file="sixpack.png" x={805} y={205} w={800} frame={f} from={68} until={185} drift={-60} rotate={-3} z={8}/>
    <Cutout file="boy-hand.png" x={205} y={590} w={670} frame={f} from={75} until={152} drift={170} rotate={-5} z={12}/>
    <Cutout file="seller-hand.png" x={1170} y={412} w={590} frame={f} from={84} until={159} drift={-105} z={13}/>
    <LedgerText x={145} y={150} size={52} color={C.red}>SIX FOR 25¢</LedgerText>
    <LedgerText x={145} y={214} size={29}>AN ORDINARY COUNTER. AN UNUSUAL QUESTION.</LedgerText>
  </AbsoluteFill>;
};

const Bottles: React.FC<{f: number}> = ({f}) => {
  const opacity = held(f, 155, 282, 13);
  const lift = progress(f, 174, 207);
  return <AbsoluteFill style={{opacity}}>
    <div style={{position:'absolute',left:150,top:106,width:1610,height:850,background:'#e0cfb5',border:'17px solid #a88c6a',
      transform:'rotate(-1deg)',boxShadow:'12px 18px 25px #0003'}}/>
    <div style={{position:'absolute',left:475,top:360,width:960,height:470,zIndex:5,transform:'rotate(-3deg)',
      background:'repeating-linear-gradient(0deg,#906c44 0px,#a68458 25px,#9c754a 52px)',
      border:'28px solid #755535',boxShadow:'inset 0 0 0 14px #c09b6a,16px 22px 19px #0004'}}>
      {[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',left:140+i*160,top:0,bottom:0,width:8,
        background:'#694a2d',boxShadow:'2px 0 #c19b68'}}/>)}
      {[0,1,2,3,4,5].map(i=><div key={`nail-${i}`} style={{position:'absolute',left:35+i*156,top:375,width:12,height:12,
        borderRadius:'50%',background:'#6c6557',boxShadow:'inset 1px 1px #c8bda2'}}/>)}
    </div>
    {[0,1,2,3,4,5].map((i)=><Cutout key={i} file="bottle.png" x={560+i*146} y={350-(i===0?lift*165:0)} w={128} h={470}
      frame={f} from={169+i*5} until={282} rotate={[-5,4,-3,2,-4,3][i]} z={9+i}/>) }
    <LedgerText x={125} y={118} size={45} color={C.red}>COCA-COLA · SIX BOTTLES</LedgerText>
    <LedgerText x={126} y={838} size={67} serif>Buy together. Sell separately.</LedgerText>
  </AbsoluteFill>;
};

const Sales: React.FC<{f: number}> = ({f}) => {
  const opacity = held(f, 248, 370, 10);
  return <AbsoluteFill style={{opacity}}>
    <div style={{position:'absolute',left:80,top:165,width:1760,height:720,background:'#c9b091',border:'16px solid #8d6b4c',
      transform:'rotate(1deg)',boxShadow:'18px 23px 25px #0003'}} />
    <Cutout file="boy-hand.png" x={100} y={465} w={880} frame={f} from={249} until={364} drift={120} z={7}/>
    <Cutout file="bottle.png" x={815} y={270} w={220} h={650} frame={f} from={254} until={365} drift={110} rotate={-6} z={10}/>
    <Cutout file="seller-hand.png" x={1000} y={435} w={750} frame={f} from={261} until={365} drift={-90} z={11}/>
    {[0,1,2,3,4,5].map((i)=><Coin key={i} x={330+i*180} y={780} frame={f} appear={275+i*13} angle={i*17-30} size={106}/>) }
    <LedgerText x={135} y={100} size={56} color={C.red}>A NICKEL EACH</LedgerText>
    <LedgerText x={138} y={176} size={27}>SIX SALES · THIRTY CENTS</LedgerText>
  </AbsoluteFill>;
};

const Accounts: React.FC<{f: number}> = ({f}) => {
  const opacity = progress(f, 345, 365);
  const gain = progress(f, 380, 410);
  return <AbsoluteFill style={{opacity}}>
    <div style={{position:'absolute',left:100,top:80,width:1720,height:920,background:'#f5ecdb',transform:'rotate(-1deg)',
      boxShadow:'0 0 0 8px #d3bfa2,16px 24px 20px #36251639'}} />
    <div style={{position:'absolute',left:230,top:210,width:1450,height:2,background:'#929698'}} />
    <div style={{position:'absolute',left:230,top:360,width:1450,height:2,background:'#929698'}} />
    <div style={{position:'absolute',left:230,top:510,width:1450,height:2,background:'#929698'}} />
    <LedgerText x={238} y={99} size={60} serif>The arithmetic</LedgerText>
    <LedgerText x={268} y={242} size={38}>SIX BOTTLES · COST</LedgerText>
    <LedgerText x={1420} y={229} size={64} color={C.red}>25¢</LedgerText>
    <LedgerText x={268} y={393} size={38}>SIX SALES · RECEIVED</LedgerText>
    <LedgerText x={1420} y={382} size={64} color={C.red}>30¢</LedgerText>
    <LedgerText x={268} y={568} size={50}>LEFT AFTER THE LAST BOTTLE</LedgerText>
    <div style={{position:'absolute',left:1348,top:542,font:'bold 96px Georgia,serif',color:C.red,opacity:gain,
      transform:`rotate(-7deg) scale(${.7+.3*gain})`}}>5¢</div>
    <Coin x={780} y={698} frame={f} appear={396} size={170}/>
    <LedgerText x={249} y={867} size={27}>VISUAL RECONSTRUCTION · OMAHA, 1930s</LedgerText>
  </AbsoluteFill>;
};

const PageWipe: React.FC<{f: number}> = ({f}) => {
  const p = progress(f, 430, 449);
  if (p <= 0) return null;
  return <div style={{position:'absolute',inset:0,zIndex:99,clipPath:`polygon(${100-100*p}% 0,100% 0,100% 100%,${100-100*p}% 100%)`,
    background:'linear-gradient(90deg,#cbb99c 0%,#f0e7d8 5%,#e7d7bb 100%)',boxShadow:'-28px 0 30px #0004'}} />;
};

export const BuffettPilotVideo: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{width:W,height:H,overflow:'hidden',background:C.paper}}>
    <Paper />
    <Street f={frame}/>
    <Counter f={frame}/>
    <Bottles f={frame}/>
    <Sales f={frame}/>
    <Accounts f={frame}/>
    <PageWipe f={frame}/>
    <div style={{position:'absolute',inset:16,border:'1px solid rgba(62,48,29,.18)',pointerEvents:'none',zIndex:120}}/>
    <Audio src={staticFile('assets/pilot/music-original.wav')} volume={0.66} />
    <Audio src={staticFile('assets/pilot/foley-original.wav')} volume={0.83} />
    <Audio src={staticFile('assets/pilot/narration-en.mp3')} volume={1} />
  </AbsoluteFill>;
};

export const BuffettPilotComposition: React.FC = () => <Composition id="BuffettPilot15" component={BuffettPilotVideo}
  durationInFrames={450} fps={30} width={W} height={H}/>;
