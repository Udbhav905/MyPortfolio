'use client';
import React from 'react';
export default function Aurora({ colorStops = ['#1e3a8a', '#581c87', '#1e1b4b'], amplitude, blend = 0.5 }: any) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      background: `linear-gradient(45deg, ${colorStops.join(', ')})`,
      opacity: blend,
      filter: 'blur(80px)',
      transform: 'scale(1.2)'
    }} />
  );
}
