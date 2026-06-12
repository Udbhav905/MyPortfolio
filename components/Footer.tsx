'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Github, Linkedin } from '@/components/Icons';
import { Mail } from 'lucide-react';

const GradientText = dynamic(() => import('@/lib/reactbits/GradientText'), { ssr: false });

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="relative border-t border-border-dark bg-bg-dark py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left select-none">
        
        {/* Brand & copyright */}
        <div className="space-y-1">
          <GradientText
            colors={['#3B82F6', '#60A5FA', '#3B82F6']}
            animationSpeed={4}
            showBorder={false}
            className="font-mono text-xs uppercase tracking-wider font-bold inline-block"
          >
            Udbhav Prajapati
          </GradientText>
          <p className="text-[10px] text-text-secondary/60 font-mono">
            &copy; {new Date().getFullYear()} UDBHAV.PRAJAPATI ❤️
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/udbhav905"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border-dark bg-card-dark text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/udbhav-prajapati-485841332/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border border-border-dark bg-card-dark text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="mailto:udbhavprajapati909@gmail.com"
            className="p-2 border border-border-dark bg-card-dark text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all duration-200"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Next.js + Tailwind badge */}
        {/* <div className="flex items-center space-x-2 border border-border-dark bg-card-dark px-4 py-2 text-xs font-mono text-text-secondary">
          <span className="w-1.5 h-1.5 bg-accent-blue animate-pulse" />
          <span>Built with</span>
          <span className="text-text-primary font-semibold">Next.js 16</span>
          <span>+</span>
          <span className="text-text-primary font-semibold">Tailwind CSS</span>
        </div> */}

      </div>
    </footer>
  );
}
