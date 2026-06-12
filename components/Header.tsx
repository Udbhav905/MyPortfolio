'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Sun, Moon } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import dynamic from 'next/dynamic';

const BubbleMenu = dynamic(() => import('@/lib/reactbits/BubbleMenu'), { ssr: false });

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  const theme = usePortfolioStore((state) => state.theme);
  const toggleTheme = usePortfolioStore((state) => state.toggleTheme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Scroll progress percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section calculation
      const scrollPosition = window.scrollY + 120;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) return null;

  // Map nav items to structure expected by GooeyNav
  const gooeyItems = NAV_ITEMS.map((item) => ({
    label: item.label,
    href: `#${item.id}`,
  }));

  return (
    <>
      {/* Scroll Progress Indicator Hook */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-accent-blue z-[1000] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky header bar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-navbar py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="flex items-center space-x-3 group"
            aria-label="Udbhav Prajapati Home"
          >
            <div className="w-9 h-9 border border-accent-blue flex items-center justify-center bg-white transition-all duration-300 overflow-hidden">
              <img src="/up.svg" alt="UP Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-mono text-sm tracking-widest text-text-primary font-bold group-hover:text-accent-blue transition-colors duration-300">
              UDBHAV.P
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`text-xs uppercase font-mono tracking-wider transition-colors duration-200 relative py-1 ${
                    isActive ? 'text-accent-blue font-bold' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-accent-blue" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA & Theme Switcher */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-border-dark bg-card-dark hover:border-accent-blue text-text-secondary hover:text-text-primary transition-all duration-200 rounded-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="px-4 py-2 border border-accent-blue text-xs font-mono uppercase tracking-wider text-accent-blue hover:bg-accent-blue/10 transition-colors duration-200"
            >
              Hire Me
            </a>
          </div>
        </div>
      </header>

      {/* BubbleMenu — mobile only, left side to avoid conflicting with AI assistant */}
      <div className="md:hidden">
        <BubbleMenu
          menuBg={theme === 'dark' ? '#ffffff' : '#0B0E14'}
          menuContentColor={theme === 'dark' ? '#0B0E14' : '#ffffff'}
          useFixedPosition={true}
          menuAriaLabel="Toggle navigation menu"
          animationEase="back.out(1.5)"
          animationDuration={0.45}
          staggerDelay={0.1}
          style={{ left: '1.5rem', right: 'auto', bottom: '1.5rem', top: 'auto', position: 'fixed' }}
          items={NAV_ITEMS.map((item) => ({
            label: item.label.toLowerCase(),
            href: `#${item.id}`,
            ariaLabel: item.label,
            hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' },
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault();
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            },
          }))}
        />
      </div>
    </>
  );
}
