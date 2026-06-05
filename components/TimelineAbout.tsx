'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Rotate3d, Calendar, Award, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  role: string;
  descFront: string;
  descBack: string;
  icon: string;
  tech: string[];
}

export default function TimelineAbout() {
  const [zoom, setZoom] = useState(1);
  const [flippedCards, setFlippedCards] = useState<{ [key: string]: boolean }>({});
  
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = usePortfolioStore((state) => state.theme);
  const isDark = theme === 'dark';
  const setCursorHovering = usePortfolioStore((state) => state.setCursorHovering);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);

  const events: TimelineEvent[] = [
    {
      id: 'childhood',
      year: '2008',
      title: 'First Compilation Node',
      role: 'Childhood Coding Curiosity',
      descFront: 'Discovered programming at age 10. Booted QBasic on an old CRT monitor, constructing text-based maze adventures and hacking config files of old games.',
      descBack: 'Acquired core fundamentals of control flow, recursion, and compiler structures. Taught self C++ by disassembly and printing book pages.',
      icon: '👾',
      tech: ['QBasic', 'C', 'DOS']
    },
    {
      id: 'stanford',
      year: '2015 - 2019',
      title: 'The Stanford Epoch',
      role: 'B.S. in Computer Science',
      descFront: 'Enrolled at Stanford University. Specialized in AI agent models and Human-Computer Interaction. Built layout engines and graph routers as research assistants.',
      descBack: 'Graduated with 3.96 GPA. Received department awards in software engineering. Contributed to early WebGL bindings and distributed database queries.',
      icon: '🎓',
      tech: ['Python', 'C++', 'WebGL', 'Algorithms']
    },
    {
      id: 'startup',
      year: '2019 - 2020',
      title: 'Genesis: Cognitive Labs',
      role: 'Co-Founder & CTO',
      descFront: 'Bootstrapped an autonomous workflow generation start-up. Built generative compiler models that converted sketch assets to production UI code.',
      descBack: 'Managed a team of 6 engineers. Secured $1.5M seed funding. The core generation architecture was acquired by a major technology enterprise in late 2020.',
      icon: '⚡',
      tech: ['React', 'Node.js', 'Python', 'Docker']
    },
    {
      id: 'stripe',
      year: '2020 - 2022',
      title: 'Global Payment Pipeline',
      role: 'Senior Mobile Engineer (L5)',
      descFront: 'Joined Stripe Terminal engineering team. Wrote zero-knowledge cryptography adapters and biometric authentication hooks for NFC payment terminals on Android and iOS.',
      descBack: 'Developed tap-to-pay transaction libraries. Successfully certified SDKs with EMV compliance. Optimized payload latencies, scaling terminal solutions across EU.',
      icon: '💳',
      tech: ['SwiftUI', 'Kotlin', 'Rust Core', 'Crypto']
    },
    {
      id: 'vercel',
      year: '2022 - PRESENT',
      title: 'Next-Gen Web Architecture',
      role: 'Senior Frontend Architect',
      descFront: 'Leads Next.js bundle compiler and Server Components compiler layers at Vercel. Focusing on hybrid server/client layout tree flattening and zero-bundle UI.',
      descBack: 'Refined compiler tree-shaking algorithms, cutting JS build sizes by 35%. Acts as a developer advocate, presenting keynotes at Next.js conferences.',
      icon: '▲',
      tech: ['React 19', 'Next.js', 'Rust', 'TypeScript']
    }
  ];

  // Handle zooming using scroll wheel over timeline
  const handleWheel = (e: React.WheelEvent) => {
    // Only zoom if hovering inside the container and pressing Ctrl
    if (e.ctrlKey) {
      e.preventDefault();
      const zoomChange = e.deltaY < 0 ? 0.1 : -0.1;
      setZoom((prev) => Math.max(0.6, Math.min(2.0, prev + zoomChange)));
      incrementResonance(1);
    }
  };

  // Prevent browser zooming
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (e.ctrlKey && containerRef.current?.contains(e.target as Node)) {
        e.preventDefault();
      }
    };
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleGlobalWheel);
  }, []);

  const handleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
    incrementResonance(4);
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      onWheel={handleWheel}
      className="relative min-h-screen py-24 px-4 md:px-16 flex flex-col justify-center"
    >
      {/* HUD Header */}
      <div className="max-w-4xl mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div>
          <p className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
            Genesis Record
          </p>
          <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter scroll-warp font-sans mt-1 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Lifetime Journey
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-3 max-w-sm">
            Interactive compiler timeline. Scroll wheel + CTRL to zoom. Click cards to spin and view underlying details.
          </p>
        </div>

        {/* Zoom HUD Controls */}
        <div className={`flex items-center space-x-3 glass-panel p-2 rounded-lg text-xs font-mono transition-colors duration-300 ${
          isDark ? 'border-neon-cyan/20 text-slate-400' : 'border-electric-violet/20 bg-white/70 text-slate-700 shadow-sm'
        }`}>
          <button 
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            className={`p-1 rounded cursor-pointer transition-colors ${
              isDark ? 'hover:text-neon-cyan hover:bg-white/5' : 'hover:text-electric-violet hover:bg-slate-100'
            }`}
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="w-16 text-center select-none">
            ZOOM: {Math.round(zoom * 100)}%
          </span>
          <button 
            onClick={() => setZoom((z) => Math.min(2.0, z + 0.2))}
            className={`p-1 rounded cursor-pointer transition-colors ${
              isDark ? 'hover:text-neon-cyan hover:bg-white/5' : 'hover:text-electric-violet hover:bg-slate-100'
            }`}
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Timeline Path Container */}
      <div className="w-full relative overflow-x-auto overflow-y-hidden py-16 scrollbar-thin">
        <motion.div 
          className="flex items-center gap-12 px-8 min-w-max"
          animate={{ scale: zoom }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
        >
          {/* Main Connector Line */}
          <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan/20 via-electric-violet/40 to-molten-gold/20 -z-10" />

          {events.map((ev, idx) => {
            const isFlipped = !!flippedCards[ev.id];
            return (
              <div 
                key={ev.id} 
                className="relative flex flex-col items-center"
              >
                {/* Event Year Tag */}
                <div className={`mb-6 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md flex items-center gap-1.5 z-10 transition-colors duration-300 border ${
                  isDark 
                    ? 'bg-slate-900 border-white/10 text-neon-cyan' 
                    : 'bg-white border-slate-200 text-electric-violet shadow-sm'
                }`}>
                  <Calendar className="w-3.5 h-3.5 text-neon-cyan" />
                  {ev.year}
                </div>

                {/* Vertical Connector Needle */}
                <div className="w-0.5 h-8 bg-neon-cyan/30 -z-10" />

                {/* 3D Flip Card */}
                <div 
                  className="perspective-container w-[280px] h-[340px] cursor-pointer"
                  onClick={() => handleFlip(ev.id)}
                  onMouseEnter={() => setCursorHovering(true)}
                  onMouseLeave={() => setCursorHovering(false)}
                >
                  <div className={`card-3d-inner w-full h-full relative ${isFlipped ? 'flipped' : ''}`}>
                    
                    {/* CARD FRONT */}
                    <div className="card-face w-full h-full absolute glass-panel border-neon-cyan/25 rounded-xl p-5 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] select-none">
                          {ev.icon}
                        </span>
                        <span className="text-[10px] font-mono text-neon-cyan/60 flex items-center gap-1 uppercase">
                          <Rotate3d className="w-3 h-3 animate-spin-slow" /> Flip
                        </span>
                      </div>
                      
                      <div className="my-4">
                        <h3 className={`font-sans font-bold text-lg leading-tight tracking-tight transition-colors duration-300 ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {ev.title}
                        </h3>
                        <p className="text-xs text-neon-cyan font-mono mt-1">{ev.role}</p>
                        <p className={`text-xs font-sans mt-3 leading-relaxed transition-colors duration-300 ${
                          isDark ? 'text-slate-400' : 'text-slate-600'
                        }`}>
                          {ev.descFront}
                        </p>
                      </div>

                      {/* Tech Stacks */}
                      <div className="flex flex-wrap gap-1 border-t border-white/5 pt-3">
                        {ev.tech.map((t, idx) => (
                          <span 
                            key={idx} 
                            className={`px-2 py-0.5 text-[9px] font-mono border rounded transition-colors duration-300 ${
                              isDark 
                                ? 'border-white/10 bg-white/5 text-slate-400' 
                                : 'border-slate-200 bg-slate-100 text-slate-600'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CARD BACK */}
                    <div className={`card-face card-back w-full h-full absolute glass-panel border-electric-violet/25 rounded-xl p-5 flex flex-col justify-between crt-screen transition-colors duration-300 ${
                      isDark ? 'bg-slate-950/90' : 'bg-white/95'
                    }`}>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-mono text-electric-violet/75 uppercase tracking-wider flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-electric-violet animate-pulse" /> Decrypted Payload
                        </span>
                        <span className="text-[10px] font-mono text-electric-violet/50 uppercase">BACK</span>
                      </div>

                      <div className="my-auto">
                        <p className={`text-xs font-mono leading-relaxed p-3 rounded border transition-colors duration-300 ${
                          isDark 
                            ? 'bg-slate-950/80 border-electric-violet/10 text-slate-300' 
                            : 'bg-slate-50 border-electric-violet/15 text-slate-700'
                        }`}>
                          {ev.descBack}
                        </p>
                      </div>

                      <div className="text-[9px] font-mono text-slate-500 flex items-center justify-between border-t border-white/5 pt-3 select-none">
                        <span>ENTANGLEMENT: OK</span>
                        <span className="flex items-center text-electric-violet"><Sparkles className="w-3 h-3 mr-1" /> SECURE</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
