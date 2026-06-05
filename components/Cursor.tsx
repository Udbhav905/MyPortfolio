'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const cursorHovering = usePortfolioStore((state) => state.cursorHovering);
  const theme = usePortfolioStore((state) => state.theme);

  // Motion values for raw cursor position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Direct mapping to eliminate lag and match system speed
  const cursorX = mouseX;
  const cursorY = mouseY;

  useEffect(() => {
    setMounted(true);

    // Check if device supports hover interactions (desktop)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Enable custom cursor styles in CSS
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] border-2 mix-blend-difference hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: cursorHovering ? 1.8 : 1,
        borderColor: theme === 'dark' ? 'rgba(0, 240, 255, 0.8)' : 'rgba(143, 0, 255, 0.8)',
        backgroundColor: cursorHovering
          ? (theme === 'dark' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(143, 0, 255, 0.3)')
          : 'rgba(0, 0, 0, 0)',
        boxShadow: cursorHovering
          ? (theme === 'dark' ? '0 0 15px rgba(0, 240, 255, 0.6)' : '0 0 15px rgba(143, 0, 255, 0.6)')
          : 'none',
      }}
    />
  );
}
