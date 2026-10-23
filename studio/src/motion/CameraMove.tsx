import React from 'react';
import {Easing,interpolate,useCurrentFrame} from 'remotion';
export type CameraMoveProps={children:React.ReactNode;duration?:number;fromScale?:number;toScale?:number;panX?:number;panY?:number;delay?:number};
/** Deterministic 2.5D camera push and pan around a centered composition. */
export const CameraMove:React.FC<CameraMoveProps>=({children,duration=90,fromScale=1,toScale=1.055,panX=-22,panY=8,delay=0})=>{const f=useCurrentFrame();const p=interpolate(f-delay,[0,duration],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:Easing.bezier(.35,0,.65,1)});return <div style={{position:'absolute',inset:-36,transform:`translate3d(${panX*p}px,${panY*p}px,0) scale(${fromScale+(toScale-fromScale)*p})`,transformOrigin:'center',willChange:'transform'}}>{children}</div>};
