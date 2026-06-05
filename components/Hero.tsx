'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate local coordinates inside the hero section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 overflow-hidden grid-bg"
      style={{
        // Set mouse coordinates as CSS custom properties for GPU acceleration
        // @ts-ignore
        '--x': `${mousePos.x}px`,
        '--y': `${mousePos.y}px`,
      }}
    >
      {/* Subtle Floating Cursor Shadow (Spotlight Glow) */}
      <div className="absolute inset-0 pointer-events-none spotlight-mask" />

      {/* Hero Content */}
      <div className="max-w-4xl mx-auto w-full z-10 space-y-8">
        <div className="space-y-4">
          <p className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-[#3B82F6] animate-pulse rounded-none" />
            Available for Internships | Jobs | Projects
          </p>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-[#EDF2F7] leading-none select-none">
            Hi, I am <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#EDF2F7]">
              Udbhav Prajapati
            </span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-[#A0AEC0] font-bold">
            Full-Stack Developer (Web + APP)
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#A0AEC0] max-w-2xl leading-relaxed">
          I am a skilled and passionate developer focused on turning complex problems into intuitive, responsive, and performance-optimized products. From clean APIs to fluid mobile interfaces.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <button
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="px-6 py-3 border border-[#3B82F6] bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#3B82F6] font-mono text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 group rounded-none"
          >
            View Work
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="px-6 py-3 border border-[#222936] bg-transparent hover:border-[#3B82F6] text-[#A0AEC0] hover:text-[#EDF2F7] font-mono text-xs uppercase tracking-widest transition-all duration-200 rounded-none"
          >
            Contact Me
          </button>
        </div>

        {/* Micro HUD-style Links */}
        <div className="pt-12 border-t border-[#222936] flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono text-[#5A6E85]">
          <a
            href="https://github.com/udbhavprajapati"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3B82F6] transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" /> github/udbhavprajapati
          </a>
          <a
            href="https://linkedin.com/in/udbhav-prajapati"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3B82F6] transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" /> linkedin/udbhav-prajapati
          </a>
          <a
            href="mailto:udbhavprajapati909@gmail.com"
            className="hover:text-[#3B82F6] transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" /> udbhavprajapati909@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
