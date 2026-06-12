'use client';
import React from 'react';
export default function LetterGlitch({ glitchSpeed, centerVignette, outerVignette, smooth }: any) {
  return <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'linear-gradient(45deg, transparent, rgba(0,0,0,0.1))' }} />;
}
