'use client';

import { useRef, useEffect } from 'react';
import { ChevronRight, Mail, Download } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = usePortfolioStore((state) => state.theme);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let latestEvent: MouseEvent | null = null;
    let frameId: number | null = null;
    let rect = container.getBoundingClientRect();

    const updateRect = () => {
      if (container) rect = container.getBoundingClientRect();
    };

    const flushMouse = () => {
      if (!latestEvent || !container) {
        frameId = null;
        return;
      }

      const x = latestEvent.clientX - rect.left;
      const y = latestEvent.clientY - rect.top;
      container.style.setProperty('--x', `${x}px`);
      container.style.setProperty('--y', `${y}px`);
      latestEvent = null;
      frameId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      latestEvent = e;
      if (frameId === null) {
        frameId = requestAnimationFrame(flushMouse);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateRect, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
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

  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      ref={containerRef}
      className={`relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 overflow-hidden grid-bg transition-colors duration-300 ${isDark ? 'bg-transparent' : 'bg-white'
        }`}
    >
      <div className="absolute inset-0 pointer-events-none spotlight-mask z-0" />

      <div className="">
        <div className="space-y-4">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-blue animate-pulse rounded-none" />
            Available for Internships | Jobs | Projects
          </p>

          <div className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-text-primary leading-none select-none">
            Hi, I am
            <div className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-300">
              Udbhav Prajapati
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-mono text-text-secondary font-bold">
            <span className="inline-block px-2 sm:px-3 bg-accent-blue/10 text-accent-blue py-0.5 sm:py-1 rounded-lg border border-accent-blue/30">
              Full Stack Developer
            </span>
          </h2>
        </div>

        <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
          I am a skilled and passionate developer focused on turning complex problems into intuitive, responsive, and performance-optimized products. From clean APIs to fluid mobile interfaces.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 items-center">
          <button
            onClick={(e) => handleScrollTo(e, 'projects')}
            className="px-6 py-3 bg-accent-blue/15 hover:bg-accent-blue/30 text-accent-blue font-mono text-xs uppercase tracking-widest transition-all duration-200 flex items-center gap-2 rounded-none border-0"
          >
            View Work
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

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