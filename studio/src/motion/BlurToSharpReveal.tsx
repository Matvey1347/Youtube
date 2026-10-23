import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
export type BlurToSharpRevealProps={children:React.ReactNode;delay?:number;duration?:number;maxBlur?:number;rise?:number};
/** Soft focus resolves while content lifts into its editorial position. */
export const BlurToSharpReveal:React.FC<BlurToSharpRevealProps>=({children,delay=0,duration=20,maxBlur=18,rise=18})=>{const f=useCurrentFrame();const p=interpolate(f-delay,[0,duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.2,.75,.2,1)});return <div style={{opacity:p,filter:`blur(${(1-p)*maxBlur}px)`,transform:`translateY(${(1-p)*rise}px)`}}>{children}</div>};
