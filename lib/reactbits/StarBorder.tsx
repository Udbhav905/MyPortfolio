'use client';
import React from 'react';
export default function StarBorder({ children, color = '#fff', className = '' }: any) {
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{ position: 'absolute', inset: 0, border: `1px solid ${color}`, borderRadius: 'inherit', pointerEvents: 'none' }} />
      {children}
    </div>
  );
}
