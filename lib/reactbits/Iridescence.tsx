'use client';
import React from 'react';

// CSS-only iridescence background — no WebGL/ogl dependency
export default function Iridescence({ speed = 0.3, amplitude = 0.15 }: { color?: [number, number, number]; speed?: number; amplitude?: number; mouseReact?: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 0,
      background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.06) 25%, rgba(16,185,129,0.05) 50%, rgba(59,130,246,0.08) 75%, rgba(236,72,153,0.04) 100%)',
      backgroundSize: '400% 400%',
      animation: `iridescence-shift ${1 / speed}s ease infinite`,
      opacity: amplitude * 2,
    }} />
  );
}
