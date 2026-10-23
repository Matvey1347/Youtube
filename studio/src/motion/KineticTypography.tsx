import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';

export type KineticTypographyProps = {text:string; top:number; left:number; width:number; fontSize:number; color?:string; delay?:number; stagger?:number; tracking?:number};
export const splitKineticTokens=(text:string)=>text.split(/(\n|\s+)/).filter(Boolean);
/** Word-by-word editorial entrance. Frame-only timing keeps the result deterministic. */
export const KineticTypography:React.FC<KineticTypographyProps> = ({text,top,left,width,fontSize,color='#aa3045',delay=0,stagger=4,tracking=-.065})=>{
  const frame=useCurrentFrame();
  const tokens=splitKineticTokens(text);let wordIndex=0;
  return <div style={{position:'absolute',top,left,width,fontFamily:'Arial,Helvetica,sans-serif',fontSize,fontWeight:900,fontStyle:'italic',letterSpacing:`${tracking}em`,lineHeight:.81,textTransform:'lowercase',color,whiteSpace:'pre-wrap'}}>{tokens.map((token,i)=>{if(/^\s+$/.test(token))return token.includes('\n')?<br key={`break-${i}`}/>:<span key={`space-${i}`}> </span>;const index=wordIndex++;const p=interpolate(frame-delay-index*stagger,[0,16],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.16,1,.3,1)});return <span key={`${token}-${index}`} style={{display:'inline-block',marginRight:'.19em',opacity:p,filter:`blur(${(1-p)*22}px)`,transform:`translate3d(0,${(1-p)*42}px,0) scale(${.9+p*.1})`,transformOrigin:'left bottom'}}>{token}</span>})}</div>;
};
