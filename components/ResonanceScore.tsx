'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Activity, Wifi } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

export default function ResonanceScore() {
  const score = usePortfolioStore((state) => state.resonanceScore);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);
  const theme = usePortfolioStore((state) => state.theme);
  
  const [lastMilestone, setLastMilestone] = useState(10);
  const [notification, setNotification] = useState<string | null>(null);

  // Time-based increment
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment 2 score every 15 seconds up to maximum
      incrementResonance(2);
    }, 15000);
    return () => clearInterval(interval);
  }, [incrementResonance]);

  // Scroll depth tracking
  useEffect(() => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      
      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);
      if (scrollPercent > maxScroll) {
        const diff = scrollPercent - maxScroll;
        maxScroll = scrollPercent;
        
        // Award points for every 10% scrolled
        if (Math.floor(maxScroll / 10) > Math.floor((maxScroll - diff) / 10)) {
          incrementResonance(3);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [incrementResonance]);

  // Click tracking
  useEffect(() => {
    const handleClick = () => {
      incrementResonance(1); // 1 point per click
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [incrementResonance]);

  // Check achievements
  useEffect(() => {
    if (score >= 50 && lastMilestone < 50) {
      setLastMilestone(50);
      triggerNotification('SYNERGY MATCH: 50% - Compatibility confirmed.');
    } else if (score >= 80 && lastMilestone < 80) {
      setLastMilestone(80);
      triggerNotification('QUANTUM LOCK: 80% - Core competencies aligned.');
    } else if (score === 100 && lastMilestone < 100) {
      setLastMilestone(100);
      triggerNotification('ENTANGLEMENT COMPLETE: 100% - Aiden sync ready!');
    }
  }, [score, lastMilestone]);

  const triggerNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Compute synergy status title
  const getStatusText = (score: number) => {
    if (score < 30) return 'Syncing...';
    if (score < 60) return 'Calibrated';
    if (score < 90) return 'Resonant';
    return 'Entangled';
  };

  return (
    <>
      {/* Floating HUD Widget */}
      <div className="fixed bottom-6 left-6 z-[900] hidden sm:block">
        <motion.div
          className="glass-panel p-3 border border-neon-cyan/20 rounded-lg flex items-center space-x-3 shadow-lg select-none"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Pulsing indicator */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-neon-cyan relative" />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-widest gap-4">
              <span>Resonance Lock</span>
              <span className="text-neon-cyan font-bold">{score}%</span>
            </div>
            
            {/* Fills dynamically */}
            <div className="w-28 h-1 bg-slate-950 rounded-full mt-1.5 overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-cyan to-electric-violet"
                animate={{ width: `${score}%` }}
                transition={{ type: 'spring', stiffness: 80 }}
              />
            </div>
            
            <div className="flex items-center mt-1 text-[8px] font-mono text-slate-400">
              <Activity className="w-3 h-3 text-neon-cyan mr-1" />
              <span>Status: <strong className="text-neon-cyan uppercase">{getStatusText(score)}</strong></span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Achievement Banner */}
      <AnimatePresence>
        {notification && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1001] w-full max-w-sm px-4">
            <motion.div
              className="glass-panel border-neon-cyan/50 p-4 rounded-xl shadow-2xl flex items-start space-x-3 crt-screen"
              initial={{ opacity: 0, y: -100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="p-2 rounded bg-neon-cyan/15 text-neon-cyan border border-neon-cyan/30 mt-0.5">
                <ShieldCheck className="w-5 h-5 animate-pulse" />
              </div>
              <div className="flex-1 font-mono">
                <p className="text-[10px] text-neon-cyan font-bold uppercase tracking-wider">Achievement unlocked</p>
                <p className="text-xs text-white mt-1 leading-relaxed">{notification}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
