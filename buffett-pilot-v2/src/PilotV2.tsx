import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';

const ink = '#202b31';
const paper = '#f0e8d7';
const red = '#a04437';
const navy = '#172832';

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const ease = (p: number) => p * p * (3 - 2 * p);
const move = (f: number, start: number, end: number) => ease(clamp((f - start) / (end - start)));
const v2 = (name: string) => staticFile(`assets/v2/${name}`);

const Texture: React.FC<{light?: boolean}> = ({light = false}) => <AbsoluteFill style={{pointerEvents:'none',zIndex:30,
  backgroundImage:'repeating-linear-gradient(0deg,transparent 0px,rgba(52,37,24,.018) 1px,transparent 3px),radial-gradient(ellipse at 50% 48%,transparent 45%,rgba(12,17,19,.18) 100%)',
  mixBlendMode:light?'multiply':'soft-light'}}/>;

const FullFramePhoto: React.FC<{src: string; f: number; start: number; end: number; pan?: number; zoom?: number}> =
({src,f,start,end,pan=0,zoom=.035})=>{
  const p=move(f,start,end);
  return <Img src={v2(src)} style={{position:'absolute',left:-32,top:-24,width:1984,height:1128,objectFit:'cover',
    transform:`translateX(${pan*p}px) scale(${1+zoom*p})`,transformOrigin:'center center'}}/>;
};

const Kicker: React.FC<{children:React.ReactNode;top:number;left?:number;color?:string}> =
({children,top,left=132,color=ink})=><div style={{position:'absolute',left,top,color,fontFamily:'Arial Narrow,Arial,sans-serif',
  fontWeight:800,fontSize:30,letterSpacing:7,lineHeight:1,zIndex:20}}>{children}</div>;

const Head: React.FC<{children:React.ReactNode;top:number;left?:number;color?:string;size?:number;maxWidth?:number}> =
({children,top,left=132,color=ink,size=100,maxWidth=950})=><div style={{position:'absolute',left,top,maxWidth,color,
  fontFamily:'Georgia,Times New Roman,serif',fontWeight:700,fontSize:size,lineHeight:1.04,letterSpacing:-4,zIndex:20,
  textShadow:color===paper?'0 3px 12px #0006':undefined}}>{children}</div>;

const Exterior: React.FC<{f:number}> = ({f})=><AbsoluteFill style={{background:'#c4d6dc'}}>
  <Video src={v2('01-omaha-walk.mp4')} muted objectFit="cover" style={{position:'absolute',inset:0,width:1920,height:1080,transform:'scale(1.02)'}}/>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(230,238,233,.54) 0%,rgba(230,238,233,.10) 50%,transparent 70%)'}}/>
  <Kicker top={121}>OMAHA · 1930s</Kicker>
  <Head top={191} maxWidth={810} size={92}>A boy with<br/>a small plan.</Head>
  <div style={{position:'absolute',left:132,top:424,width:480,height:4,background:red,zIndex:20}}/>
  <Texture light/>
</AbsoluteFill>;

const Grocery: React.FC<{f:number}> = ({f})=><AbsoluteFill style={{background:'#a58160'}}>
  <Sequence from={90} durationInFrames={75}>
    <Video src={v2('02-grocery-dolly.mp4')} muted objectFit="cover" style={{position:'absolute',inset:0,width:1920,height:1080,transform:'scale(1.02)'}}/>
  </Sequence>
  <div style={{position:'absolute',left:110,top:694,width:820,height:236,background:'rgba(241,229,209,.94)',
    boxShadow:'13px 16px 15px #24180e48',transform:'rotate(-1deg)',zIndex:10}}/>
  <Kicker top={735} left={153} color={red}>AT THE COUNTER</Kicker>
  <Head top={782} left={151} size={75} maxWidth={790}>Six bottles. <span style={{color:red}}>25¢.</span></Head>
  <Texture light/>
</AbsoluteFill>;

const Sixpack: React.FC<{f:number}> = ({f})=>{
  const tick=move(f,184,205);
  return <AbsoluteFill style={{background:'#b9cbd0'}}>
    <FullFramePhoto src="03-six-bottle-blue.jpg" f={f} start={165} end={234} pan={-15} zoom={.025}/>
    <Kicker top={151} color={ink}>THE IDEA</Kicker>
    <Head top={215} size={86} maxWidth={690}>Sell them<br/>one by one.</Head>
    <div style={{position:'absolute',left:132,top:519,padding:'20px 28px',background:paper,color:red,
      fontFamily:'Arial Narrow,Arial,sans-serif',fontWeight:900,letterSpacing:4,fontSize:49,
      transform:`translateY(${(1-tick)*18}px)`,opacity:tick,zIndex:20,boxShadow:'7px 9px 0 #132c3030'}}>5¢ EACH</div>
    <Texture light/>
  </AbsoluteFill>;
};

const NeighborhoodSale: React.FC<{f:number}> = ({f})=><AbsoluteFill style={{background:'#c7b49a'}}>
  <FullFramePhoto src="04-neighborhood-sale.jpg" f={f} start={234} end={312} pan={-20} zoom={.032}/>
  <div style={{position:'absolute',inset:0,
    background:'radial-gradient(ellipse 1040px 590px at 0px 0px,rgba(245,237,218,.88) 0%,rgba(245,237,218,.42) 55%,transparent 100%)'}}/>
  <Kicker top={130} color={red}>DOOR TO DOOR</Kicker>
  <Head top={194} size={92} maxWidth={720}>A nickel<br/>per bottle.</Head>
  <Texture light/>
</AbsoluteFill>;

const CoinPhoto: React.FC<{kind:'quarter'|'nickel';x:number;y:number;size:number;frame:number;appear:number;angle?:number}> =
({kind,x,y,size,frame,appear,angle=0})=>{
  const p=move(frame,appear,appear+11);
  return <Img src={v2(`coins/${kind}-1936-obverse.jpg`)} style={{position:'absolute',left:x,top:y,width:size,height:size,
    clipPath:'circle(45.5% at 50% 50%)',objectFit:'cover',zIndex:14,
    opacity:p,transform:`translateY(${(1-p)*-24}px) rotate(${angle}deg) scale(${.92+.08*p})`,
    filter:'drop-shadow(12px 15px 6px rgba(0,0,0,.45))'}}/>;
};

const Arithmetic: React.FC<{f:number}> = ({f})=>{
  const sales=move(f,376,406);
  const profit=move(f,406,429);
  const hook=move(f,428,445);
  return <AbsoluteFill style={{background:'radial-gradient(ellipse at 48% 40%,#2b414b,#12222c 90%)'}}>
    <div style={{position:'absolute',left:110,top:111,width:1700,height:2,background:'#8c9b9a55'}}/>
    <Kicker top={135} color="#d7c7a7">THE ARITHMETIC</Kicker>
    <div style={{position:'absolute',left:132,top:196,color:paper,font:'700 77px Georgia,serif',letterSpacing:-4,zIndex:20}}>
      25¢ <span style={{color:'#aebbbc',fontSize:58}}>in</span>
      <span style={{opacity:sales}}> &nbsp;→&nbsp; 30¢ <span style={{color:'#aebbbc',fontSize:58}}>out</span></span>
      <span style={{opacity:profit}}> &nbsp;→&nbsp; <span style={{color:'#e4b38a'}}>5¢ left.</span></span>
    </div>
    <CoinPhoto kind="quarter" x={217} y={390} size={388} frame={f} appear={300} angle={-7}/>
    <div style={{position:'absolute',left:382,top:805,color:'#d3c6ae',font:'700 29px Arial,sans-serif',letterSpacing:5}}>ONE QUARTER</div>
    {[0,1,2,3,4,5].map(i=><CoinPhoto key={i} kind="nickel" x={820+(i%3)*269} y={390+Math.floor(i/3)*223}
      size={214} frame={f} appear={340+i*9} angle={[-9,5,-6,11,-4,7][i]}/>)}
    <div style={{position:'absolute',left:1050,top:849,color:'#d3c6ae',font:'700 29px Arial,sans-serif',letterSpacing:5,
      opacity:sales}}>SIX NICKELS</div>
    <div style={{position:'absolute',left:110,top:900,width:1700,height:2,background:'#8c9b9a55'}}/>
    <div style={{position:'absolute',left:112,top:922,color:'#d9c9a9',font:'italic 39px Georgia,serif',opacity:profit*hook,
      letterSpacing:-1}}>For him, the interesting part was the system.</div>
    <Texture/>
  </AbsoluteFill>;
};

export const BuffettPilotV2Video:React.FC=()=>{
  const frame=useCurrentFrame();
  const scene = frame < 90 ? <Exterior f={frame}/>
    : frame < 165 ? <Grocery f={frame}/>
    : frame < 234 ? <Sixpack f={frame}/>
    : frame < 312 ? <NeighborhoodSale f={frame}/>
    : <Arithmetic f={frame}/>;
  return <AbsoluteFill style={{overflow:'hidden',background:navy}}>
    {scene}
    <Audio src={staticFile('assets/pilot/music-original.wav')} volume={0.18}/>
    <Audio src={staticFile('assets/v2/foley-v2.wav')} volume={0.55}/>
    <Audio src={staticFile('assets/pilot/narration-en.mp3')} volume={1}/>
  </AbsoluteFill>;
};

export const BuffettPilotV2Composition:React.FC=()=>
  <Composition id="BuffettPilotV2" component={BuffettPilotV2Video} durationInFrames={450} fps={30} width={1920} height={1080}/>;
