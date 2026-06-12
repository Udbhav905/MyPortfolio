'use client';
import React, { useCallback } from 'react';

interface Props {
  children?: React.ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

export default function ClickSpark({ children, sparkColor = '#3B82F6', sparkSize = 6, sparkRadius = 20, sparkCount = 6, duration = 400 }: Props) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('span');
      const angle = (360 / sparkCount) * i;
      const rad = (angle * Math.PI) / 180;
      const tx = Math.cos(rad) * sparkRadius;
      const ty = Math.sin(rad) * sparkRadius;

      spark.style.cssText = `
        position:absolute;pointer-events:none;border-radius:50%;
        width:${sparkSize}px;height:${sparkSize}px;
        background:${sparkColor};
        left:${x - sparkSize / 2}px;top:${y - sparkSize / 2}px;
        transform:translate(0,0);opacity:1;z-index:9999;
        transition:transform ${duration}ms ease-out,opacity ${duration}ms ease-out;
      `;
      container.style.position = 'relative';
      container.appendChild(spark);
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${tx}px,${ty}px)`;
        spark.style.opacity = '0';
      });
      setTimeout(() => spark.remove(), duration + 50);
    }
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return <div onClick={handleClick} style={{ display: 'contents' }}>{children}</div>;
}
