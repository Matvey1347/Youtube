import React from 'react';
import {AbsoluteFill,Img,Sequence,staticFile,useCurrentFrame,useVideoConfig,Easing,interpolate} from 'remotion';
import {KineticTypography} from '../../motion/KineticTypography';
import {BlurToSharpReveal} from '../../motion/BlurToSharpReveal';
import {MaskedTextReveal} from '../../motion/MaskedTextReveal';
import {ForegroundOcclusion} from '../../motion/ForegroundOcclusion';
import {CameraMove} from '../../motion/CameraMove';
import {OrganicLiquidWipe} from '../../motion/OrganicLiquidWipe';
import {StaggeredObjectEntrance} from '../../motion/StaggeredObjectEntrance';
import {LayeredParallax} from '../../motion/LayeredParallax';
import {editorialProject} from './project';

const BustScene:React.FC<{headline:string;kicker:string}>=({headline,kicker})=> <AbsoluteFill style={{background:'#f4f1ec',overflow:'hidden',color:'#181416'}}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 76% 72%,#d4c8c0 0,transparent 48%),linear-gradient(120deg,#f9f7f3,#eae5df)'}}/>
  <div style={{position:'absolute',inset:0,opacity:.13,backgroundImage:'radial-gradient(#665850 0.7px,transparent 0.7px)',backgroundSize:'5px 5px'}}/>
  <ForegroundOcclusion type={<><MaskedTextReveal text={kicker} delay={2} fontSize={30} /><KineticTypography text={headline} top={300} left={160} width={1480} fontSize={220} delay={5}/></>} foreground={<LayeredParallax depth={1.5}><div style={{position:'absolute',right:-90,top:220,width:1420,height:860,filter:'contrast(1.06) sepia(.14) drop-shadow(-30px 34px 28px #251b1c55)',mixBlendMode:'multiply'}}><Img src={staticFile('projects/editorial-typography/assets/marble-david-bust.png')} style={{width:'100%',height:'100%',objectFit:'contain',objectPosition:'center bottom'}}/></div></LayeredParallax>}/>
  <div style={{position:'absolute',left:160,bottom:58,font:'italic 18px Georgia',letterSpacing:'.15em',color:'#81736e'}}>A BRAND IS BUILT IN PUBLIC</div>
</AbsoluteFill>;

const ChessScene:React.FC<{headline:string;kicker:string}>=({headline,kicker})=><AbsoluteFill style={{background:'#f4f0e8',overflow:'hidden',color:'#211c1c'}}>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,#f7f4ed 0%,#eee8dc 56%,#171416 100%)'}}/>
  <div style={{position:'absolute',left:160,top:140,font:'italic 30px Georgia',color:'#282020',zIndex:2}}><BlurToSharpReveal delay={1}>{kicker}</BlurToSharpReveal></div>
  <KineticTypography text={headline} top={260} left={145} width={1700} fontSize={194} delay={4}/>
  <CameraMove duration={120} fromScale={1.01} toScale={1.075} panX={-38} panY={-8}>
    <div style={{position:'absolute',left:375,top:462,width:1670,height:720,overflow:'hidden',clipPath:'polygon(0 13%,100% 0,100% 100%,0 100%)',filter:'drop-shadow(0 -18px 30px #17100d44)'}}><Img src={staticFile('projects/editorial-typography/assets/chess-pieces-optimized.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'center 60%',filter:'saturate(.75) contrast(1.05)'}}/></div>
  </CameraMove>
  <div style={{position:'absolute',right:0,top:0,width:540,height:1080,background:'linear-gradient(90deg,transparent,#171416ee)',pointerEvents:'none'}}/>
  <div style={{position:'absolute',left:125,bottom:38,width:280,height:22,background:'repeating-linear-gradient(90deg,#181416 0 3px,transparent 3px 7px)',opacity:.78}}/>
</AbsoluteFill>;

const DarkBeat:React.FC<{lead:string;accent:string}>=({lead,accent})=>{const f=useCurrentFrame();const glow=interpolate(f,[0,20,36],[0,.8,.35],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.2,.8,.2,1)});const drift=interpolate(f,[0,48],[-24,24],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.35,0,.65,1)});return <AbsoluteFill style={{background:'#09090b',color:'#f5f0ec',overflow:'hidden'}}><div style={{position:'absolute',inset:-160,background:`radial-gradient(ellipse at 50% 50%,rgba(153,40,62,${glow*.32}) 0,transparent 58%)`}}/><div style={{position:'absolute',left:-300+drift,top:-410,width:950,height:1120,borderRadius:'47% 53% 38% 62%',background:'radial-gradient(ellipse at 70% 70%,#a32842aa,transparent 64%)',filter:'blur(8px)',transform:`rotate(${-12+drift*.08}deg)`}}/><div style={{position:'absolute',right:-320-drift,bottom:-450,width:980,height:1080,borderRadius:'56% 44% 61% 39%',background:'radial-gradient(ellipse at 35% 35%,#76182f99,transparent 67%)',filter:'blur(10px)',transform:`rotate(${10-drift*.1}deg)`}}/><div style={{position:'absolute',left:220,right:220,top:418,textAlign:'center',font:'italic 66px Georgia',lineHeight:1.12}}><BlurToSharpReveal delay={3} maxBlur={26} rise={24}><span>{lead} </span><span style={{color:'#cf5267',fontWeight:700}}>{accent}</span></BlurToSharpReveal></div><div style={{position:'absolute',left:0,bottom:0,width:'100%',height:130,background:'linear-gradient(0deg,#310c16aa,transparent)'}}/></AbsoluteFill>};

const PhoneScene:React.FC<{headline:string;kicker:string;support:string}>=({headline,kicker,support})=><AbsoluteFill style={{background:'#f5f2ec',overflow:'hidden',color:'#171416'}}>
  <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 75% 50%,#dfd5ca 0,transparent 48%),linear-gradient(110deg,#faf8f4,#eee9e2)'}}/>
  <ForegroundOcclusion type={<><div style={{position:'absolute',top:165,left:185,font:'italic 30px Georgia'}}><BlurToSharpReveal delay={1}>{kicker}</BlurToSharpReveal></div><KineticTypography text={headline} top={270} left={170} width={1420} fontSize={184} delay={5}/><div style={{position:'absolute',top:805,left:185,width:600}}><MaskedTextReveal text={support} delay={54} fontSize={27} color="#6a5d58"/></div></>} foreground={<LayeredParallax depth={1.35} direction={-1}><div style={{position:'absolute',right:-82,top:105,width:1100,height:950,maskImage:'radial-gradient(ellipse at 57% 52%,#000 47%,transparent 77%)',WebkitMaskImage:'radial-gradient(ellipse at 57% 52%,#000 47%,transparent 77%)',filter:'drop-shadow(-28px 26px 30px #34251f55)'}}><Img src={staticFile('projects/editorial-typography/assets/phone-photo-optimized.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'54% 42%',transform:'rotate(-5deg)',filter:'saturate(.72) contrast(1.07)'}}/></div></LayeredParallax>}/>
</AbsoluteFill>;

const TypewriterScene:React.FC<{headline:string;kicker:string}>=({headline,kicker})=><AbsoluteFill style={{background:'#f2efe9',overflow:'hidden',color:'#151315'}}>
  <div style={{position:'absolute',inset:0,background:'linear-gradient(115deg,#f7f5f0 0,#e4ded5 100%)'}}/>
  <div style={{position:'absolute',top:100,left:170,font:'italic 29px Georgia',zIndex:2}}><MaskedTextReveal text={kicker} delay={3}/></div>
  <KineticTypography text={headline} top={220} left={145} width={1680} fontSize={154} delay={9} stagger={3}/>
  <LayeredParallax depth={.7}><StaggeredObjectEntrance index={0} delay={11} fromY={64}><div style={{position:'absolute',left:545,top:404,width:1320,height:690,overflow:'hidden',maskImage:'radial-gradient(ellipse at 61% 55%,#000 25%,rgba(0,0,0,.92) 53%,transparent 84%)',WebkitMaskImage:'radial-gradient(ellipse at 61% 55%,#000 25%,rgba(0,0,0,.92) 53%,transparent 84%)',filter:'drop-shadow(-20px 18px 26px #16121266)'}}><Img src={staticFile('projects/editorial-typography/assets/typewriter-editor-optimized.jpg')} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:'70% 55%',filter:'grayscale(1) contrast(1.12) sepia(.12)'}}/></div></StaggeredObjectEntrance></LayeredParallax>
  <div style={{position:'absolute',left:70,top:440,color:'#a8384c',fontSize:94,fontWeight:800,fontStyle:'italic',transform:'rotate(-12deg)'}}>↗</div><div style={{position:'absolute',right:95,top:360,color:'#a8384c',fontSize:84,fontWeight:800,fontStyle:'italic'}}>◎</div>
</AbsoluteFill>;

const EndScene:React.FC<{headline:string}>=({headline})=><AbsoluteFill style={{background:'#f5f1eb',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center',color:'#171416'}}><div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at center,#fff 0,#e7ded6 72%,#c9bab4 100%)'}}/><StaggeredObjectEntrance index={0} delay={2} fromY={32}><div style={{width:300,height:300,borderRadius:'50%',background:'linear-gradient(145deg,#cf3f72,#512054)',display:'grid',placeItems:'center',color:'white',fontSize:132,fontWeight:900,fontStyle:'italic',boxShadow:'0 30px 90px #49233a66'}}>M</div></StaggeredObjectEntrance><div style={{position:'absolute',left:340,right:340,top:740,textAlign:'center',font:'italic 32px Georgia'}}><BlurToSharpReveal delay={10}>{headline}</BlurToSharpReveal></div></AbsoluteFill>;

export const EditorialTypography:React.FC=()=>{
  const {fps}=useVideoConfig();const scenes=editorialProject.scenes;
  const bust=scenes.find(s=>s.kind==='bust')!, chess=scenes.find(s=>s.kind==='chess')!,growth=scenes.filter(s=>s.kind==='interstitial')[0]!,phone=scenes.find(s=>s.kind==='phone')!,action=scenes.filter(s=>s.kind==='interstitial')[1]!,typing=scenes.find(s=>s.kind==='typing')!,cta=scenes.find(s=>s.kind==='cta')!;
  const items=[{data:bust,node:<BustScene headline={bust.headline} kicker={bust.kicker}/>},{data:chess,node:<ChessScene headline={chess.headline} kicker={chess.kicker}/>},{data:growth,node:<DarkBeat lead={growth.lead} accent={growth.accent}/>},{data:phone,node:<PhoneScene headline={phone.headline} kicker={phone.kicker} support={phone.support}/>},{data:action,node:<DarkBeat lead={action.lead} accent={action.accent}/>},{data:typing,node:<TypewriterScene headline={typing.headline} kicker={typing.kicker}/>},{data:cta,node:<EndScene headline={cta.headline}/>}];
  return <AbsoluteFill style={{background:'#f5f1eb',overflow:'hidden'}}>{items.map(({data,node},i)=>{const overlap=i===0?0:18;const from=data.from-overlap;return <Sequence key={data.id} from={from} durationInFrames={data.durationInFrames+overlap} premountFor={fps}><OrganicLiquidWipe from={0} duration={22} amplitude={96} waves={2.3} direction={i%2?'right':'left'}><CameraMove duration={105} fromScale={1} toScale={1.032} panX={-8} panY={-3}><AbsoluteFill>{node}</AbsoluteFill></CameraMove></OrganicLiquidWipe></Sequence>})}<div style={{position:'absolute',right:66,bottom:36,zIndex:20,color:'#49403e',font:'italic 16px Georgia',opacity:interpolate(useCurrentFrame(),[365,380],[0,1],{extrapolateRight:'clamp',extrapolateLeft:'clamp'})}}>A system for consistent growth</div></AbsoluteFill>;
};
