'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Navigation, Zap, Terminal, Sparkles, Gamepad2, Laptop, Moon, Sun } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface CommandItem {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const isOpen = usePortfolioStore((state) => state.commandPaletteOpen);
  const setIsOpen = usePortfolioStore((state) => state.setCommandPaletteOpen);
  const toggleTheme = usePortfolioStore((state) => state.toggleTheme);
  const theme = usePortfolioStore((state) => state.theme);
  const setNesActive = usePortfolioStore((state) => state.setNesGameActive);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Jump helper
  const scrollTo = (id: string) => {
    setIsOpen(false);
    incrementResonance(5);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-hero',
      title: 'Navigate to Hero / Home',
      category: 'Navigation',
      icon: <Navigation className="w-4 h-4 text-neon-cyan" />,
      action: () => scrollTo('hero'),
    },
    {
      id: 'nav-about',
      title: 'Navigate to About (Timeline)',
      category: 'Navigation',
      icon: <Navigation className="w-4 h-4 text-neon-cyan" />,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      title: 'Navigate to Skills (Quantum Skill Graph)',
      category: 'Navigation',
      icon: <Navigation className="w-4 h-4 text-neon-cyan" />,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Navigate to Projects (Horizontal Strip)',
      category: 'Navigation',
      icon: <Navigation className="w-4 h-4 text-neon-cyan" />,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-experience',
      title: 'Navigate to Experience & Education',
      category: 'Navigation',
      icon: <Navigation className="w-4 h-4 text-neon-cyan" />,
      action: () => scrollTo('experience'),
    },
    {
      id: 'nav-contact',
      title: 'Navigate to Contact (Live Terminal)',
      category: 'Navigation',
      icon: <Navigation className="w-4 h-4 text-neon-cyan" />,
      action: () => scrollTo('contact'),
    },
    {
      id: 'action-theme',
      title: `Toggle Theme (Current: ${theme === 'dark' ? 'Dark Shards' : 'Inverse Hologram'})`,
      category: 'System Settings',
      icon: theme === 'dark' ? <Sun className="w-4 h-4 text-molten-gold" /> : <Moon className="w-4 h-4 text-electric-violet" />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
        incrementResonance(3);
      },
    },
    {
      id: 'action-nes',
      title: 'Launch 8-bit NES Side-Scroller (Cheat Code: Press R)',
      category: 'Easter Egg',
      icon: <Gamepad2 className="w-4 h-4 text-molten-gold" />,
      action: () => {
        setNesActive(true);
        setIsOpen(false);
      },
    },
    {
      id: 'action-chat',
      title: 'Chat with Aiden\'s AI Clone',
      category: 'AI Integration',
      icon: <Sparkles className="w-4 h-4 text-electric-violet" />,
      action: () => {
        setIsOpen(false);
        incrementResonance(5);
        // Dispatch custom event to trigger AI chat open
        const event = new CustomEvent('open-ai-chat');
        window.dispatchEvent(event);
      },
    },
    {
      id: 'action-project-solstice',
      title: 'View Project details: Solstice OS',
      category: 'Projects Showcase',
      icon: <Laptop className="w-4 h-4 text-molten-gold" />,
      action: () => {
        scrollTo('projects');
        setTimeout(() => {
          const event = new CustomEvent('dissect-project', { detail: 'solstice-os' });
          window.dispatchEvent(event);
        }, 800);
      },
    },
    {
      id: 'action-project-aether',
      title: 'View Project details: AetherWallet',
      category: 'Projects Showcase',
      icon: <Laptop className="w-4 h-4 text-molten-gold" />,
      action: () => {
        scrollTo('projects');
        setTimeout(() => {
          const event = new CustomEvent('dissect-project', { detail: 'aetherwallet' });
          window.dispatchEvent(event);
        }, 800);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Ctrl+K
      if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      
      // Close palette: Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }

      if (!isOpen) return;

      // Navigate options: Arrow keys
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }

      // Select option: Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, setIsOpen]);

  // Reset selection index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input automatically
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const activeEl = listRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog Panel */}
          <motion.div
            className="w-full max-w-xl glass-panel border border-neon-cyan/30 rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[70vh]"
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/* Input Wrapper */}
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-5 h-5 text-neon-cyan/70 mr-3" />
              <input
                ref={inputRef}
                type="text"
                className="w-full py-4 bg-transparent border-0 text-white placeholder-slate-500 focus:outline-none focus:ring-0 text-base"
                placeholder="Search commands or navigation shortcuts..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-neon-cyan/50 border border-neon-cyan/30 rounded bg-slate-900/50 uppercase font-mono">
                esc
              </kbd>
            </div>

            {/* List */}
            <div 
              ref={listRef}
              className="flex-1 overflow-y-auto p-2 space-y-1"
            >
              {filteredCommands.length > 0 ? (
                filteredCommands.map((cmd, idx) => {
                  const isActive = idx === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      data-active={isActive}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all ${
                        isActive 
                          ? 'bg-gradient-to-r from-neon-cyan/15 to-electric-violet/15 border-l-2 border-neon-cyan text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div className="mr-3 p-1.5 rounded-md bg-slate-950/40 border border-white/5">
                        {cmd.icon}
                      </div>
                      <div className="flex-1">
                        <p className="font-mono text-sm">{cmd.title}</p>
                        <p className="text-xs opacity-50 uppercase tracking-wider">{cmd.category}</p>
                      </div>
                      {isActive && (
                        <span className="text-[10px] text-neon-cyan font-mono animate-pulse">
                          &lt;ENTER&gt;
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center text-slate-500">
                  <p className="font-mono text-sm">No commands matched your query</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-950/40 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <div className="flex items-center space-x-2">
                <span>↑↓ Navigate</span>
                <span>•</span>
                <span>↵ Select</span>
              </div>
              <div>
                <span>Press <kbd className="border border-white/10 px-1 rounded">Ctrl</kbd>+<kbd className="border border-white/10 px-1 rounded">K</kbd> anywhere</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
