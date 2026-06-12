'use client';

import React, { useEffect, useState } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import dynamic from 'next/dynamic';

const DotGrid = dynamic(() => import('@/lib/reactbits/DotGrid'), { ssr: false });
const Squares = dynamic(() => import('@/lib/reactbits/Squares'), { ssr: false });

export default function ShardBackground() {
  const theme = usePortfolioStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden transition-colors duration-700">
      {isDark ? (
        <DotGrid
          className="w-full h-full opacity-60"
          dotSize={2.5}
          gap={24}
          baseColor="rgba(255, 255, 255, 0.12)"
          activeColor="#3B82F6"
          proximity={65}
          shockRadius={70}
          shockStrength={0.5}
        />
      ) : (
        <Squares
          direction="diagonal"
          speed={0.2}
          squareSize={40}
          borderColor="rgba(0, 0, 0, 0.05)"
          hoverFillColor="rgba(59, 130, 246, 0.08)"
        />
      )}
    </div>
  );
}
