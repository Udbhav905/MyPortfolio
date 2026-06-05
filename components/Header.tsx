'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Portal needs the DOM to be mounted first (no SSR)
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPosition = window.scrollY + 100;
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
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── Mobile drawer + backdrop rendered via portal directly into document.body
  // This escapes the header's CSS stacking context entirely so it can cover
  // every section (Hero, About, Skills, etc.) without z-index conflicts.
  const mobileMenu = (
    <>
      {/* Full-screen backdrop — blocks all page content */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0B0E14',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease-in-out',
          zIndex: 9998,
        }}
      />

      {/* Side drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '85%',
          maxWidth: '320px',
          backgroundColor: '#0B0E14',
          borderLeft: '1px solid #222936',
          zIndex: 9999,
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-in-out',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Drawer header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid #222936',
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 700, letterSpacing: '0.15em', color: '#EDF2F7' }}>
            UDBHAV.P
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ padding: '8px', color: '#A0AEC0', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', padding: '24px 0', flexGrow: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  borderBottom: '1px solid #1A2030',
                  borderLeft: isActive ? '3px solid #3B82F6' : '3px solid transparent',
                  paddingLeft: isActive ? '21px' : '24px',
                  backgroundColor: isActive ? 'rgba(59,130,246,0.05)' : 'transparent',
                  color: isActive ? '#3B82F6' : '#A0AEC0',
                  transition: 'all 200ms ease',
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Social links at bottom */}
        <div style={{
          display: 'flex',
          gap: '16px',
          padding: '24px',
          borderTop: '1px solid #222936',
        }}>
          <a href="https://github.com/udbhavprajapati" target="_blank" rel="noopener noreferrer"
            style={{ padding: '8px', border: '1px solid #222936', color: '#A0AEC0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="GitHub">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://linkedin.com/in/udbhav-prajapati" target="_blank" rel="noopener noreferrer"
            style={{ padding: '8px', border: '1px solid #222936', color: '#A0AEC0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="mailto:udbhavprajapati909@gmail.com"
            style={{ padding: '8px', border: '1px solid #222936', color: '#A0AEC0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Email">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* ── Sticky header bar ── */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0E14]/90 border-b border-[#222936] py-4 backdrop-blur-md'
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
            <div className="w-9 h-9 border border-[#3B82F6] flex items-center justify-center font-bold text-sm bg-gradient-to-tr from-[#3B82F6]/20 to-transparent transition-all duration-300 group-hover:bg-[#3B82F6]/20 text-[#3B82F6]">
              UP
            </div>
            <span className="font-mono text-sm tracking-widest text-[#EDF2F7] font-bold group-hover:text-[#3B82F6] transition-colors duration-300">
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
                    isActive ? 'text-[#3B82F6]' : 'text-[#A0AEC0] hover:text-[#EDF2F7]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3B82F6]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA + Mobile hamburger */}
          <div className="flex items-center space-x-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden md:inline-flex px-4 py-2 border border-[#3B82F6] text-xs font-mono uppercase tracking-wider text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors duration-200"
            >
              Hire Me
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#A0AEC0] hover:text-[#EDF2F7] focus:outline-none transition-colors"
              aria-label="Open Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Portal: render drawer + backdrop outside header into document.body */}
      {mounted && createPortal(mobileMenu, document.body)}
    </>
  );
}
