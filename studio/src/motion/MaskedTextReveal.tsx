import React from 'react';
import {Easing,interpolate,useCurrentFrame} from 'remotion';
export type MaskedTextRevealProps={text:string;delay?:number;duration?:number;color?:string;fontSize?:number;className?:string};
/** Text is revealed through a hard editorial window with a small overshoot. */
export const MaskedTextReveal:React.FC<MaskedTextRevealProps>=({text,delay=0,duration=18,color='#171416',fontSize=28,className})=>{const f=useCurrentFrame();const p=interpolate(f-delay,[0,duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.7,0,.2,1)});return <div className={className} style={{overflow:'hidden',color,fontFamily:'Georgia,serif',fontStyle:'italic',fontSize,lineHeight:1.18}}><div style={{transform:`translate3d(0,${(1-p)*115}%,0)`,opacity:p}}>{text}</div></div>};
