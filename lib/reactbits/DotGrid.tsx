'use client';
import React from 'react';
export default function DotGrid(props: any) {
  return (
    <div 
      className={props.className}
      style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${props.baseColor || 'rgba(255,255,255,0.1)'} ${props.dotSize || 1}px, transparent ${props.dotSize || 1}px)`,
        backgroundSize: `${props.gap || 24}px ${props.gap || 24}px`,
        opacity: props.opacity,
      }} 
    />
  );
}
