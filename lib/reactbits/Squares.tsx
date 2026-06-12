'use client';
import React from 'react';
export default function Squares({ speed, squareSize = 40, direction, borderColor = '#333', hoverFillColor }: any) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `linear-gradient(to right, ${borderColor} 1px, transparent 1px), linear-gradient(to bottom, ${borderColor} 1px, transparent 1px)`,
      backgroundSize: `${squareSize}px ${squareSize}px`,
    }} />
  );
}
