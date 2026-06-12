'use client';
import React from 'react';

export default function Bounce({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'inline-block', transition: 'transform 0.15s ease' }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.15)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.9)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1.15)')}
    >
      {children}
    </div>
  );
}
