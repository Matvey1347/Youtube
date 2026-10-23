import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame} from 'remotion';
import {KineticTypography} from '../../motion/KineticTypography';
import {BlurToSharpReveal} from '../../motion/BlurToSharpReveal';
import {MaskedTextReveal} from '../../motion/MaskedTextReveal';
import {ForegroundOcclusion} from '../../motion/ForegroundOcclusion';
import {CameraMove} from '../../motion/CameraMove';
import {OrganicLiquidWipe} from '../../motion/OrganicLiquidWipe';
import {StaggeredObjectEntrance} from '../../motion/StaggeredObjectEntrance';
import {LayeredParallax} from '../../motion/LayeredParallax';

/** 4-second visual regression composition exercises all reusable effects together. */
export const MotionLibrarySmoke:React.FC=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:'#f2eee8',overflow:'hidden'}}><OrganicLiquidWipe from={0} duration={24} amplitude={70} waves={2.4}><CameraMove duration={120} fromScale={1} toScale={1.06} panX={-28}><AbsoluteFill><div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 80% 80%,#cfc3b8,transparent 55%)'}}/><ForegroundOcclusion type={<><MaskedTextReveal text="Motion Library / 01" delay={4} fontSize={24}/><KineticTypography text="words with weight" top={190} left={130} width={1550} fontSize={150} delay={7}/><div style={{position:'absolute',left:140,top:440,width:440}}><BlurToSharpReveal delay={28}><div style={{font:'italic 32px Georgia'}}>Shape, timing, and layered depth.</div></BlurToSharpReveal></div></>} foreground={<LayeredParallax depth={1.4}><StaggeredObjectEntrance index={1} delay={16} fromY={54}><Img src={staticFile('projects/editorial-typography/assets/chess-pieces-optimized.jpg')} style={{position:'absolute',right:-30,bottom:-180,width:1030,height:650,objectFit:'cover',objectPosition:'center 56%',filter:'saturate(.7)',maskImage:'linear-gradient(0deg,#000 40%,transparent 100%)',WebkitMaskImage:'linear-gradient(0deg,#000 40%,transparent 100%)'}}/></StaggeredObjectEntrance></LayeredParallax>}/></AbsoluteFill></CameraMove></OrganicLiquidWipe><div style={{position:'absolute',left:120,bottom:80,color:'#7c6661',font:'italic 18px Georgia'}}>Deterministic frame {f}</div></AbsoluteFill>};
