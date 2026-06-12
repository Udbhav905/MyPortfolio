'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({ children, className = '', colors = ['#3B82F6', '#60A5FA', '#3B82F6'], animationSpeed = 4, showBorder = false }: Props) {
  const gradient = `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`;
  return (
    <span
      className={className}
      style={{
        backgroundImage: gradient,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `gradient-shift ${animationSpeed}s linear infinite`,
        border: showBorder ? '1px solid rgba(59,130,246,0.3)' : undefined,
        padding: showBorder ? '2px 8px' : undefined,
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}
