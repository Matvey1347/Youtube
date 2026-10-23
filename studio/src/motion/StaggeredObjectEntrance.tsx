import React from 'react';
import {Easing,interpolate,useCurrentFrame} from 'remotion';
export type StaggeredObjectEntranceProps={children:React.ReactNode;index:number;delay?:number;stagger?:number;duration?:number;fromX?:number;fromY?:number;fromScale?:number};
export const getStaggerStart=(index:number,delay:number,stagger:number)=>delay+index*stagger;
/** Reusable per-object entrance for a collage; index controls deterministic staggering. */
export const StaggeredObjectEntrance:React.FC<StaggeredObjectEntranceProps>=({children,index,delay=0,stagger=5,duration=18,fromX=0,fromY=26,fromScale=.94})=>{const f=useCurrentFrame();const p=interpolate(f-getStaggerStart(index,delay,stagger),[0,duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.18,1,.3,1)});return <div style={{opacity:p,filter:`blur(${(1-p)*10}px)`,transform:`translate3d(${fromX*(1-p)}px,${fromY*(1-p)}px,0) scale(${fromScale+(1-fromScale)*p})`}}>{children}</div>};
