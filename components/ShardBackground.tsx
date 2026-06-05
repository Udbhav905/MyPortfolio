'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function ShardBackground() {
  const theme = usePortfolioStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  // Mouse tracking for reactive fluid orb
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the background fluid orb to make it feel organic and flowing
  const springConfig = { damping: 65, stiffness: 180, mass: 1.5 };
  const fluidX = useSpring(mouseX, springConfig);
  const fluidY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the orb width to center it (500px / 2 = 250px)
      const x = e.clientX - 250;
      const y = e.clientY - 250;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none overflow-hidden transition-colors duration-700">
      {/* Base background color */}
      <div 
        className="absolute inset-0 transition-colors duration-700" 
        style={{
          backgroundColor: isDark ? '#0A0A0F' : '#F8F9FA'
        }}
      />

      {/* Subtle Holographic Grid Overlay */}
      <div 
        className={`absolute inset-0 hologram-grid transition-opacity duration-700 ${
          isDark ? 'opacity-[0.03]' : 'opacity-[0.015]'
        }`} 
      />

      {/* Organic Floating Orbs (Fluid Metaphor) */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* ORB 1: Top-Left (Teal/Cyan in Dark, Soft Lilac/Purple in Light) */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000"
          style={{
            backgroundColor: isDark ? 'rgba(0, 240, 255, 0.08)' : 'rgba(192, 132, 252, 0.07)',
          }}
        />

        {/* ORB 2: Bottom-Right (Electric Violet in Dark, Indigo in Light) */}
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-60 -right-40 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000"
          style={{
            backgroundColor: isDark ? 'rgba(143, 0, 255, 0.07)' : 'rgba(129, 140, 248, 0.06)',
          }}
        />

        {/* ORB 3: Center-Left (Gold/Orange in Dark, Peach in Light) */}
        <motion.div
          animate={{
            x: [0, 40, -50, 0],
            y: [0, 60, -40, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 -left-60 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none transition-colors duration-1000"
          style={{
            backgroundColor: isDark ? 'rgba(255, 184, 0, 0.04)' : 'rgba(253, 186, 116, 0.04)',
          }}
        />

        {/* ORB 4: Mouse-Reactive trailing glow (Cyan in Dark, Violet in Light) */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000"
          style={{
            x: fluidX,
            y: fluidY,
            backgroundColor: isDark ? 'rgba(0, 240, 255, 0.06)' : 'rgba(143, 0, 255, 0.04)',
          }}
        />
      </div>

      {/* Ambient vignette to soften screen edges */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at center, transparent 35%, rgba(10, 10, 15, 0.4) 100%)'
            : 'radial-gradient(circle at center, transparent 45%, rgba(240, 241, 244, 0.3) 100%)'
        }}
      />
    </div>
  );
}
