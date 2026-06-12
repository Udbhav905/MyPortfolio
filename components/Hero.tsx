'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, Mail, Download } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import dynamic from 'next/dynamic';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const Aurora = dynamic(() => import('@/lib/reactbits/Aurora'), { ssr: false });
const SplitText = dynamic(() => import('@/lib/reactbits/SplitText'), { ssr: false });
const StarBorder = dynamic(() => import('@/lib/reactbits/StarBorder'), { ssr: false });
const TextCursor = dynamic(() => import('@/lib/reactbits/TextCursor'), { ssr: false });
const RotatingText = dynamic(() => import('@/lib/reactbits/RotatingText'), { ssr: false });
const LightRays = dynamic(() => import('@/lib/reactbits/LightRays'), { ssr: false });
const GlitchText = dynamic(() => import('@/lib/reactbits/GlitchText'), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = usePortfolioStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--x', `${x}px`);
      containerRef.current.style.setProperty('--y', `${y}px`);
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

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Udbhav_FD.pdf';
    link.download = 'Udbhav_Prajapati_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      ref={containerRef}
      className={`relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 overflow-hidden grid-bg transition-colors duration-300 ${isDark ? 'bg-transparent' : 'bg-white'
        }`}
    >
      {/* Background overlay — LightRays in dark mode only (much lighter than Galaxy) */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <LightRays
            raysOrigin="top-center"
            raysColor="#3b82f6"
            raysSpeed={0.6}
            lightSpread={0.9}
            rayLength={1.4}
            followMouse={false}
            mouseInfluence={0}
            saturation={1.0}
            fadeDistance={1.0}
          />
        </div>
      )}

      <TextCursor
        text="."
        spacing={60}
        followMouseDirection={true}
        randomFloat={true}
        exitDuration={0.6}
        removalInterval={40}
        maxPoints={8}
      />

      <div className="absolute inset-0 pointer-events-none spotlight-mask z-0" />

      <div className="">
        <div className="space-y-4">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-blue animate-pulse rounded-none" />
            Available for Internships | Jobs | Projects
          </p>

          <div className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-text-primary leading-none select-none">
            <SplitText text="Hi, I am" delay={40} />
            <div className="block mt-2">
              <GlitchText speed={1.2} enableShadows={true} enableOnHover={false}>
                Udbhav Prajapati
              </GlitchText>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-text-secondary font-bold flex flex-wrap items-center gap-2">
            <RotatingText
              texts={['Full Stack Developer', 'MERN Stack Developer', 'MENN Developer', 'Web Developer', 'App Developer']}
              mainClassName="px-2 sm:px-3 bg-accent-blue/10 text-accent-blue overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg border border-accent-blue/30"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </h2>
        </div>

        <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
          I am a skilled and passionate developer focused on turning complex problems into intuitive, responsive, and performance-optimized products. From clean APIs to fluid mobile interfaces.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 items-center">
          <StarBorder color="#3B82F6" className="p-0 rounded-none bg-transparent overflow-hidden">
            <button
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="px-6 py-3 bg-accent-blue/15 hover:bg-accent-blue/30 text-accent-blue font-mono text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 group rounded-none border-0"
            >
              View Work
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </StarBorder>

          <button
            onClick={(e) => handleScrollTo(e, 'contact')}
            className="px-6 py-3 border border-border-dark bg-transparent hover:border-accent-blue text-text-secondary hover:text-text-primary font-mono text-xs uppercase tracking-widest transition-all duration-200 rounded-none"
          >
            Contact Me
          </button>

          <button
            onClick={handleDownloadResume}
            className="px-6 py-3 border border-border-dark bg-transparent hover:border-accent-blue text-text-secondary hover:text-text-primary font-mono text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 rounded-none"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </button>
        </div>

        {/* Micro HUD-style Links */}
        <div className="pt-12 border-t border-border-dark flex flex-wrap gap-x-8 gap-y-4 text-xs font-mono text-text-secondary/60">
          <a
            href="https://github.com/udbhav905"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" /> github/udbhavprajapati
          </a>
          <a
            href="https://www.linkedin.com/in/udbhav-prajapati-485841332/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent-blue transition-colors flex items-center gap-1.5"
          >
            <Linkedin className="w-3.5 h-3.5" /> linkedin/udbhav-prajapati
          </a>
          <a
            href="mailto:udbhavprajapati909@gmail.com"
            className="hover:text-accent-blue transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" /> udbhavprajapati909@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}