'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// Web Audio API Retro Sound Effects
class RetroAudio {
  ctx: AudioContext | null = null;
  muted: boolean = false;

  constructor() {
    // Lazy initialisation to prevent SSR/early-load audio warnings
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playJump() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playCoin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0.1, this.ctx!.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + i * 0.1 + 0.2);
      osc.start(this.ctx!.currentTime + i * 0.1);
      osc.stop(this.ctx!.currentTime + i * 0.1 + 0.2);
    });
  }
}

const audio = new RetroAudio();

interface Milestone {
  x: number;
  y: number;
  text: string;
  collected: boolean;
  color: string;
  label: string;
}

export default function NesGame() {
  const isActive = usePortfolioStore((state) => state.nesGameActive);
  const setActive = usePortfolioStore((state) => state.setNesGameActive);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [unlockedText, setUnlockedText] = useState<string>('Collect tokens to decrypt resume logs!');
  
  // Game states & refs
  const keysRef = useRef<{ [key: string]: boolean }>({});
  
  // Game dimensions
  const WIDTH = 640;
  const HEIGHT = 360;

  useEffect(() => {
    // Toggle active state on pressing R
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.metaKey) {
        // Prevent default browser behavior for R when not in input
        const activeEl = document.activeElement;
        const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true');
        if (!isInput) {
          e.preventDefault();
          setActive(!isActive);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, setActive]);

  useEffect(() => {
    if (!isActive || !canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    setGameOver(false);

    // Player State
    const player = {
      x: 50,
      y: 200,
      width: 16,
      height: 24,
      vx: 0,
      vy: 0,
      grounded: false,
      speed: 3.5,
      jumpForce: 7.5,
    };

    // Physics
    const gravity = 0.35;
    const friction = 0.82;

    // Hardcoded level map
    const platforms = [
      { x: 0, y: 320, w: 1200, h: 40 }, // Ground
      { x: 180, y: 240, w: 100, h: 12 },
      { x: 340, y: 170, w: 100, h: 12 },
      { x: 500, y: 120, w: 120, h: 12 },
      { x: 680, y: 200, w: 120, h: 12 },
      { x: 860, y: 140, w: 150, h: 12 },
      { x: 1050, y: 230, w: 100, h: 12 },
    ];

    // Tokens matching resume milestones
    const milestones: Milestone[] = [
      { x: 230, y: 200, label: 'BORN', text: '1998: Born. Wrote first QBasic Hello World at age 10.', collected: false, color: '#00F0FF' },
      { x: 390, y: 130, label: 'DEGREE', text: '2019: Graduated from Stanford with B.S. in Computer Science.', collected: false, color: '#FFB800' },
      { x: 560, y: 80, label: 'COGNITIVE', text: '2020: Co-founded AI workflow startup Cognitive Labs (acquired).', collected: false, color: '#8F00FF' },
      { x: 740, y: 160, label: 'STRIPE', text: '2021: Joined Stripe, built Android/iOS tap-to-pay payment systems.', collected: false, color: '#00F0FF' },
      { x: 935, y: 100, label: 'VERCEL', text: '2023: Senior Architect at Vercel. Engineered Next.js compile layers.', collected: false, color: '#8F00FF' },
      { x: 1100, y: 190, label: 'ELITE', text: 'PRESENT: Full-Stack & AI architect pushing frontiers of React/SwiftUI/Rust.', collected: false, color: '#FFB800' },
    ];

    let cameraX = 0;

    // Track active key presses
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Main Game Loop
    const update = () => {
      // 1. Controls & Player movement
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) {
        if (player.vx < player.speed) player.vx += 0.5;
      }
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) {
        if (player.vx > -player.speed) player.vx -= 0.5;
      }
      if ((keysRef.current['ArrowUp'] || keysRef.current[' '] || keysRef.current['w'] || keysRef.current['W']) && player.grounded) {
        player.vy = -player.jumpForce;
        player.grounded = false;
        audio.playJump();
      }

      // Physics application
      player.vx *= friction;
      player.vy += gravity;

      // Update positions
      player.x += player.vx;
      player.y += player.vy;

      // Restrict character bounds on left
      if (player.x < 5) player.x = 5;

      // Ground status reset
      player.grounded = false;

      // 2. Collision detection with platforms
      for (const p of platforms) {
        // Simple AABB collision
        if (
          player.x < p.x + p.w &&
          player.x + player.width > p.x &&
          player.y < p.y + p.h &&
          player.y + player.height > p.y
        ) {
          // Resolve vertical collision (landing on top)
          if (player.vy > 0 && player.y + player.height - player.vy <= p.y + 4) {
            player.y = p.y - player.height;
            player.vy = 0;
            player.grounded = true;
          }
        }
      }

      // 3. Camera horizontal scroll
      const rightBuffer = WIDTH * 0.45;
      if (player.x - cameraX > WIDTH - rightBuffer) {
        cameraX = player.x - (WIDTH - rightBuffer);
      } else if (player.x - cameraX < rightBuffer && cameraX > 0) {
        cameraX = player.x - rightBuffer;
        if (cameraX < 0) cameraX = 0;
      }

      // Keep camera inside level boundary
      const maxCameraX = 1200 - WIDTH;
      if (cameraX > maxCameraX) cameraX = maxCameraX;

      // Fall in pit check (though we have solid ground across)
      if (player.y > HEIGHT) {
        // Reset player
        player.x = 50;
        player.y = 200;
        player.vx = 0;
        player.vy = 0;
      }

      // 4. Token Collection
      milestones.forEach((m) => {
        if (!m.collected) {
          const dx = (player.x + player.width/2) - m.x;
          const dy = (player.y + player.height/2) - m.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 20) {
            m.collected = true;
            audio.playCoin();
            setScore((prev) => {
              const newScore = prev + 1;
              if (newScore === milestones.length) {
                audio.playWin();
                incrementResonance(15); // Unlocked full game milestone
              }
              return newScore;
            });
            setUnlockedText(m.text);
            incrementResonance(2); // Mini score bump
          }
        }
      });

      // 5. Drawing
      ctx.fillStyle = '#05050A';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Draw background grid lines (retro aesthetic)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = -cameraX % gridSize; x < WIDTH; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();
      }

      // Draw platforms
      ctx.fillStyle = '#1A1A2E';
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 2;
      platforms.forEach((p) => {
        const renderX = p.x - cameraX;
        ctx.fillRect(renderX, p.y, p.w, p.h);
        // Draw top glowing edge
        ctx.beginPath();
        ctx.moveTo(renderX, p.y);
        ctx.lineTo(renderX + p.w, p.y);
        ctx.stroke();
      });

      // Draw floating tokens (shards)
      milestones.forEach((m) => {
        if (!m.collected) {
          const renderX = m.x - cameraX;
          // Float bounce animation
          const floatOffset = Math.sin(Date.now() * 0.007 + m.x) * 5;
          
          ctx.save();
          ctx.shadowBlur = 10;
          ctx.shadowColor = m.color;
          ctx.fillStyle = m.color;

          // Draw small rotating quantum diamond
          ctx.translate(renderX, m.y + floatOffset);
          ctx.beginPath();
          ctx.moveTo(0, -8);
          ctx.lineTo(6, 0);
          ctx.lineTo(0, 8);
          ctx.lineTo(-6, 0);
          ctx.closePath();
          ctx.fill();
          
          // Render floating text token tag
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(m.label, 0, -14);

          ctx.restore();
        }
      });

      // Draw character (retro pixels)
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00F0FF';
      ctx.fillStyle = '#00F0FF';
      // Head
      ctx.fillRect(player.x - cameraX + 3, player.y, 10, 8);
      // Torso
      ctx.fillStyle = '#8F00FF';
      ctx.shadowColor = '#8F00FF';
      ctx.fillRect(player.x - cameraX, player.y + 8, 16, 10);
      // Legs (Simple running visual offset)
      ctx.fillStyle = '#FFB800';
      ctx.shadowColor = '#FFB800';
      const stride = Math.sin(Date.now() * 0.015) * 3;
      if (Math.abs(player.vx) > 0.2) {
        ctx.fillRect(player.x - cameraX + 1 + stride, player.y + 18, 5, 6);
        ctx.fillRect(player.x - cameraX + 10 - stride, player.y + 18, 5, 6);
      } else {
        ctx.fillRect(player.x - cameraX + 2, player.y + 18, 5, 6);
        ctx.fillRect(player.x - cameraX + 9, player.y + 18, 5, 6);
      }
      
      // Face visor
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(player.x - cameraX + 8 + (player.vx > 0.1 ? 2 : player.vx < -0.1 ? -2 : 0), player.y + 2, 4, 2);

      ctx.restore();

      // Check win state
      if (score === milestones.length) {
        setGameOver(true);
        setIsPlaying(false);
      } else {
        animationFrameId = requestAnimationFrame(update);
      }
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isActive, isPlaying, score, incrementResonance]);

  const handleStartGame = () => {
    audio.init();
    setIsPlaying(true);
    setScore(0);
    setGameOver(false);
    setUnlockedText('Use WASD/Arrows to Move and Space to Jump!');
  };

  const handleToggleMute = () => {
    audio.muted = !muted;
    setMuted(!muted);
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
        {/* Dark Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActive(false)}
        />

        {/* Console Cabinet Panel */}
        <motion.div
          className="w-full max-w-2xl bg-black border-4 border-slate-700 rounded-lg p-4 shadow-2xl relative z-10 crt-screen flex flex-col items-center"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Header Bar */}
          <div className="w-full flex items-center justify-between border-b-2 border-slate-700 pb-2 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-ping" />
              <span className="font-mono text-xs text-red-500 uppercase tracking-widest">Aiden-NES v1.02</span>
            </div>
            
            <h3 className="font-mono font-bold text-sm text-neon-cyan uppercase tracking-widest text-center">
              Aiden&apos;s Career Quest
            </h3>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleToggleMute}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              >
                {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setActive(false)} 
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative border-4 border-slate-900 bg-slate-950 w-[640px] max-w-full h-[360px] flex items-center justify-center overflow-hidden">
            {!isPlaying ? (
              <div className="text-center p-6 flex flex-col items-center select-none">
                {gameOver ? (
                  <>
                    <h2 className="font-mono font-black text-xl text-molten-gold uppercase tracking-widest mb-4 animate-bounce">
                      QUEST COMPLETE!
                    </h2>
                    <p className="font-mono text-xs text-green-400 max-w-sm mb-6 leading-relaxed">
                      You successfully retrieved all the scattered career memory cells from the grid space. Synergy established!
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-mono font-black text-2xl text-neon-cyan uppercase tracking-widest mb-4">
                      RESUME ADVENTURE
                    </h2>
                    <p className="font-mono text-[10px] text-slate-400 max-w-sm mb-8 leading-relaxed">
                      Run through the developer timeline grid, collect memory shards, and unlock Aiden&apos;s full-stack history!
                    </p>
                  </>
                )}
                <button
                  onClick={handleStartGame}
                  className="px-6 py-2.5 bg-gradient-to-r from-neon-cyan to-electric-violet hover:from-neon-cyan/90 hover:to-electric-violet/90 text-black font-mono font-extrabold text-sm uppercase rounded tracking-wider shadow-lg transform transition active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  {gameOver ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {gameOver ? 'Play Again' : 'Power Up System'}
                </button>
              </div>
            ) : (
              <canvas 
                ref={canvasRef} 
                width={WIDTH} 
                height={HEIGHT}
                className="w-full h-full block"
              />
            )}
          </div>

          {/* Control Info and Dynamic Display */}
          <div className="w-full mt-4 bg-slate-950 border border-slate-800 p-3 rounded font-mono text-center">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2 border-b border-slate-900 pb-1">
              <span>CONTROLS: WASD / ARROWS = MOVE | SPACE = JUMP</span>
              <span>SCORE: {score}/6</span>
            </div>
            
            {/* Decrypted Timeline Log */}
            <div className="min-h-[44px] flex items-center justify-center px-4">
              <p className="text-xs text-green-400 tracking-wide font-semibold text-center select-all">
                {unlockedText}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
