import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
export const BlurRevealText: React.FC<{text:string; delay?:number; color?:string; size?:number; width?:number}> = ({text,delay=0,color='#171414',size=31,width=900}) => {
 const f=useCurrentFrame(); const p=interpolate(f-delay,[0,20],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.2,.8,.2,1)}); const visible=Math.max(0,Math.min(text.length,Math.ceil((f-delay)/1.2)));
 return <div style={{width,color,fontFamily:'Georgia,serif',fontStyle:'italic',fontSize:size,lineHeight:1.14,opacity:p,filter:`blur(${(1-p)*10}px)`,transform:`translateY(${(1-p)*9}px)`}}>{text.slice(0,visible)}{visible<text.length&&<span style={{opacity:.55}}>▌</span>}</div>;
};
