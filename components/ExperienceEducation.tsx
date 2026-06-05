'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, X, Award, Quote, Sparkles } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface HistoryItem {
  id: string;
  type: 'experience' | 'education';
  title: string;
  subtitle: string;
  period: string;
  achievements: string[];
  endorsement: {
    text: string;
    author: string;
    role: string;
  };
  color: string;
}

const timelineItems: HistoryItem[] = [
  {
    id: 'exp-vercel',
    type: 'experience',
    title: 'Vercel',
    subtitle: 'Senior Frontend Architect',
    period: '2022 - PRESENT',
    achievements: [
      'Led the compile-layer team in Next.js, optimizing tree-shaking algorithms and reducing global JS bundle sizes by 35%.',
      'Engineered React Server Components (RSC) hydration compilers, trimming client-side paint latencies.',
      'Represented Next.js at international conferences, presenting core developer tutorials to 20k+ viewers.'
    ],
    endorsement: {
      text: "Aiden maps visual interfaces with high-performance compilers better than anyone in the industry.",
      author: "Lee Robinson",
      role: "VP of Developer Experience, Vercel"
    },
    color: '#00F0FF'
  },
  {
    id: 'edu-stanford',
    type: 'education',
    title: 'Stanford University',
    subtitle: 'B.S. in Computer Science',
    period: '2015 - 2019',
    achievements: [
      'Specialized in Human-Computer Interaction (HCI) and AI Agent models.',
      'Built a WebGL-based collaborative research graph editor as a senior design project.',
      'Graduated with B.S. CS Honours (GPA 3.96/4.0).'
    ],
    endorsement: {
      text: "Demonstrated early brilliance in spatial graphics compilers and distributed network nodes.",
      author: "CS Dept Chair",
      role: "Professor of Systems, Stanford"
    },
    color: '#FFB800'
  },
  {
    id: 'exp-stripe',
    type: 'experience',
    title: 'Stripe',
    subtitle: 'Mobile Engineer L5',
    period: '2020 - 2022',
    achievements: [
      'Orchestrated Zero-Knowledge transaction verification logic in client-side Rust libraries for native iOS/Android apps.',
      'Co-engineered the Stripe Terminal SDK payment interfaces, integrating Secure Enclave biometric validation.',
      'Scaled NFC payment terminal solutions across 14 European markets, processing 10M+ daily requests.'
    ],
    endorsement: {
      text: "Aiden's work on Stripe terminal SDK interfaces was key in launching tap-to-pay globally.",
      author: "Director of Terminal",
      role: "Engineering VP, Stripe"
    },
    color: '#8F00FF'
  },
  {
    id: 'edu-academy',
    type: 'education',
    title: 'Science Academy',
    subtitle: 'Advanced Prep & Informatics',
    period: '2011 - 2015',
    achievements: [
      'Earned Silver Medal at National Olympiad in Informatics (Algorithm and Complexity Track).',
      'Developed school scheduling automation script in Python, managing routing tables for 800+ students.'
    ],
    endorsement: {
      text: "A natural algorithm builder and software systems enthusiast from high school years.",
      author: "Academy Board",
      role: "Director of Computer Studies"
    },
    color: '#00F0FF'
  },
  {
    id: 'exp-cognitive',
    type: 'experience',
    title: 'Cognitive Labs',
    subtitle: 'Co-Founder & CTO',
    period: '2019 - 2020',
    achievements: [
      'Engineered an autonomous workflow compiler that compiled layout drafts into pixel-perfect React trees.',
      'Secured $1.5M seed funding from leading SV angels and venture partners.',
      'Orchestrated API integrations and led 6 developers, resulting in corporate acquisition in 12 months.'
    ],
    endorsement: {
      text: "A visionary CTO who bridges the gap between deep generative models and stellar visual design.",
      author: "Lead Investor",
      role: "General Partner, NeoSeed Capital"
    },
    color: '#FFB800'
  }
];

export default function ExperienceEducation() {
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const setCursorHovering = usePortfolioStore((state) => state.setCursorHovering);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);

  const handleOpenDetail = (item: HistoryItem) => {
    setSelectedItem(item);
    incrementResonance(7);
  };

  const experienceItems = timelineItems.filter((item) => item.type === 'experience');
  const educationItems = timelineItems.filter((item) => item.type === 'education');

  return (
    <section id="experience" className="relative min-h-screen py-24 px-4 md:px-16 flex flex-col justify-center">
      {/* Title */}
      <div className="max-w-4xl mb-16 relative z-10">
        <p className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
          Career Topology
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter scroll-warp font-sans text-white mt-1">
          Experience &amp; Education
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-3 max-w-sm">
          Dual timelines representing corporate Nodes (left) and educational Seeds (right). Click any item to summon holographic archives.
        </p>
      </div>

      {/* Main Timeline Grid */}
      <div className="w-full max-w-4xl mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        
        {/* Centered timeline line for desktop */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-slate-900/60 hidden md:block" />

        {/* LEFT COLUMN: EXPERIENCE */}
        <div className="space-y-8 flex flex-col">
          <div className="flex items-center space-x-3 mb-4 select-none">
            <div className="p-2 rounded bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/20">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-sm text-white uppercase tracking-widest">
              Professional Nodes
            </h3>
          </div>

          {experienceItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
              className="glass-panel border-neon-cyan/25 p-5 rounded-xl cursor-pointer hover:border-neon-cyan/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] relative"
              whileHover={{ x: -6 }}
            >
              {/* Spine connector dot for desktop */}
              <div 
                className="absolute top-6 -right-[42px] w-3 h-3 rounded-full bg-neon-cyan border-2 border-slate-950 z-10 hidden md:block"
                style={{ boxShadow: '0 0 8px #00F0FF' }}
              />
              
              <span className="font-mono text-[9px] text-neon-cyan font-semibold">
                {item.period}
              </span>
              <h4 className="text-lg font-mono font-bold text-white mt-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        {/* RIGHT COLUMN: EDUCATION */}
        <div className="space-y-8 flex flex-col md:mt-16">
          <div className="flex items-center space-x-3 mb-4 select-none">
            <div className="p-2 rounded bg-molten-gold/15 text-molten-gold border border-molten-gold/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-mono font-bold text-sm text-white uppercase tracking-widest">
              Academic Seeds
            </h3>
          </div>

          {educationItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => handleOpenDetail(item)}
              onMouseEnter={() => setCursorHovering(true)}
              onMouseLeave={() => setCursorHovering(false)}
              className="glass-panel border-molten-gold/25 p-5 rounded-xl cursor-pointer hover:border-molten-gold/60 hover:shadow-[0_0_15px_rgba(255,184,0,0.1)] relative"
              whileHover={{ x: 6 }}
            >
              {/* Spine connector dot for desktop */}
              <div 
                className="absolute top-6 -left-[42px] w-3 h-3 rounded-full bg-molten-gold border-2 border-slate-950 z-10 hidden md:block"
                style={{ boxShadow: '0 0 8px #FFB800' }}
              />

              <span className="font-mono text-[9px] text-molten-gold font-semibold">
                {item.period}
              </span>
              <h4 className="text-lg font-mono font-bold text-white mt-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Holographic Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
            />

            {/* Modal Box */}
            <motion.div
              className="w-full max-w-md glass-panel rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col crt-screen"
              style={{ borderColor: selectedItem.color }}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center space-x-2">
                  {selectedItem.type === 'experience' ? (
                    <Briefcase className="w-4 h-4" style={{ color: selectedItem.color }} />
                  ) : (
                    <GraduationCap className="w-4 h-4" style={{ color: selectedItem.color }} />
                  )}
                  <span className="font-mono text-xs text-white tracking-widest uppercase">
                    ARCHIVE: {selectedItem.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-lg font-mono font-bold text-white leading-tight">
                    {selectedItem.subtitle}
                  </h4>
                  <span className="text-[10px] font-mono font-semibold" style={{ color: selectedItem.color }}>
                    {selectedItem.period}
                  </span>
                </div>

                {/* Achievements list */}
                <div className="space-y-2.5">
                  <h5 className="text-[9px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" style={{ color: selectedItem.color }} /> Accomplishments &amp; Metrics
                  </h5>
                  <ul className="space-y-2">
                    {selectedItem.achievements.map((ach, idx) => (
                      <li key={idx} className="text-xs text-slate-300 font-sans leading-relaxed flex items-start gap-2">
                        <span className="text-neon-cyan mt-1 select-none">▪</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Endorsement quote */}
                {selectedItem.endorsement && (
                  <div className="p-4 bg-slate-950/60 rounded border border-white/5 shadow-inner space-y-2">
                    <h5 className="text-[9px] font-mono uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                      <Quote className="w-3 h-3 text-slate-400" /> Professional Endorsement
                    </h5>
                    <p className="text-xs text-slate-300 italic leading-relaxed">
                      &ldquo;{selectedItem.endorsement.text}&rdquo;
                    </p>
                    <div className="text-[10px] font-mono text-slate-400 text-right mt-1">
                      — {selectedItem.endorsement.author}, <span className="opacity-75">{selectedItem.endorsement.role}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3 bg-slate-950/80 border-t border-white/10 flex justify-end font-mono text-[9px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-neon-cyan" /> DECRYPT_STATUS: SECURE_HASH
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
