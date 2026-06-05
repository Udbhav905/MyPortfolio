'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, ShieldAlert, Key, Clipboard, Check } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export default function TerminalConsole() {
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);
  const setCursorHovering = usePortfolioStore((state) => state.setCursorHovering);
  const theme = usePortfolioStore((state) => state.theme);

  // Terminal States
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: 'Aiden Shell Terminal v2.1.8 loaded.', type: 'success' },
    { text: 'Type "/help" or "help" to list available commands.', type: 'output' },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Contact Form States
  const [formName, setFormName] = useState('Anonymous Node');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'encrypting' | 'sent'>('idle');
  
  // Encryption scrambling hooks
  const [scrambledName, setScrambledName] = useState('');
  const [scrambledEmail, setScrambledEmail] = useState('');
  const [scrambledMsg, setScrambledMsg] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Terminal command execution
  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { text: `visitor@aiden.dev:~$ ${trimmed}`, type: 'input' as const }];
    const lowerCmd = trimmed.toLowerCase();
    
    // Add to history list
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIdx(-1);
    incrementResonance(3);

    // Command parser
    if (lowerCmd === '/help' || lowerCmd === 'help') {
      newHistory.push(
        { text: 'Available commands:', type: 'success' },
        { text: '  /about     - Print career profile metrics.', type: 'output' },
        { text: '  /email     - Show secure email address & copy to clipboard.', type: 'output' },
        { text: '  /skills    - Print ASCII skill capability chart.', type: 'output' },
        { text: '  /github    - Output GitHub repo links.', type: 'output' },
        { text: '  /linkedin  - Output professional network link.', type: 'output' },
        { text: '  /cal       - Output scheduler calendar URL.', type: 'output' },
        { text: '  /clear     - Flush terminal history buffers.', type: 'output' }
      );
    } else if (lowerCmd === '/clear' || lowerCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (lowerCmd === '/about' || lowerCmd === 'about') {
      newHistory.push(
        { text: 'PROFILE MATRIX DETECTED:', type: 'success' },
        { text: '  Name: Aiden Vance', type: 'output' },
        { text: '  Title: Full-Stack Architect (Web + Mobile)', type: 'output' },
        { text: '  Deploy Core: Next.js, Rust/WASM, SwiftUI, Kotlin', type: 'output' },
        { text: '  Status: Accepting active consultancy contract requests.', type: 'output' }
      );
    } else if (lowerCmd === '/email' || lowerCmd === 'email') {
      navigator.clipboard.writeText('aiden.vance.dev@gmail.com');
      newHistory.push(
        { text: 'SECURE MAIL DECRYPTED & COPIED TO CLIPBOARD:', type: 'success' },
        { text: '  aiden.vance.dev@gmail.com', type: 'output' }
      );
      incrementResonance(5);
    } else if (lowerCmd === '/skills' || lowerCmd === 'skills') {
      newHistory.push(
        { text: 'SKILLS CAPABILITY MATRIX:', type: 'success' },
        { text: '  React/Next.js   [====================] 98%', type: 'output' },
        { text: '  Node.js/TS      [===================-] 95%', type: 'output' },
        { text: '  SwiftUI/iOS     [=================--] 92%', type: 'output' },
        { text: '  Python/AI Agent [================---] 90%', type: 'output' },
        { text: '  Kotlin/Android  [=================--] 88%', type: 'output' },
        { text: '  Rust/WASM       [================---] 80%', type: 'output' }
      );
    } else if (lowerCmd === '/github' || lowerCmd === 'github') {
      newHistory.push(
        { text: 'GITHUB HOST ADDRESS:', type: 'success' },
        { text: '  Node URL: https://github.com/aidenvance', type: 'output' }
      );
    } else if (lowerCmd === '/linkedin' || lowerCmd === 'linkedin') {
      newHistory.push(
        { text: 'LINKEDIN NETWORK ADDRESS:', type: 'success' },
        { text: '  Node URL: https://linkedin.com/in/aidenvance', type: 'output' }
      );
    } else if (lowerCmd === '/cal' || lowerCmd === 'cal') {
      newHistory.push(
        { text: 'CALENDLY PIPELINE SCHEDULE LINK:', type: 'success' },
        { text: '  URL: https://calendly.com/aidenvance', type: 'output' }
      );
    } else {
      newHistory.push({ 
        text: `Error: Command "${trimmed}" not recognized. Type "/help" for list of valid console commands.`, 
        type: 'error' 
      });
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIdx < cmdHistory.length - 1) {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  // Text Scrambler Encryption loop for contact form submit
  const triggerEncryption = () => {
    setFormStatus('encrypting');
    incrementResonance(15);
    
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*$';
    let duration = 0;
    
    const interval = setInterval(() => {
      // Scramble name, email, msg
      setScrambledName(formName.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      setScrambledEmail(formEmail.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      setScrambledMsg(formMsg.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      
      duration += 100;
      if (duration >= 2000) {
        clearInterval(interval);
        setFormStatus('sent');
        // Log into terminal
        setHistory((prev) => [
          ...prev,
          { text: `Incoming Secure Channel connection from ${formName}...`, type: 'success' },
          { text: `Payload encrypted & cached securely in queue.`, type: 'output' }
        ]);
      }
    }, 100);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmail.trim() || !formMsg.trim()) return;
    triggerEncryption();
  };

  const handleResetForm = () => {
    setFormName('Anonymous Node');
    setFormEmail('');
    setFormMsg('');
    setFormStatus('idle');
  };

  const handleCopyBtn = () => {
    navigator.clipboard.writeText('aiden.vance.dev@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 px-4 md:px-16 flex flex-col justify-center">
      {/* Title */}
      <div className="max-w-4xl mb-12 relative z-10">
        <p className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
          Secure Tunnel
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter scroll-warp font-sans text-white mt-1">
          Live Terminal &amp; Contact
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-3 max-w-sm">
          Run queries in the active shell to extract profile nodes, or dispatch encrypted packets using the secure form.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto w-full">
        
        {/* COLUMN 1: LIVE TERMINAL CONSOLE */}
        <div 
          onClick={() => inputRef.current?.focus()}
          onMouseEnter={() => setCursorHovering(true)}
          onMouseLeave={() => setCursorHovering(false)}
          className="lg:col-span-7 bg-black border-2 border-slate-800 rounded-xl p-5 shadow-2xl flex flex-col h-[420px] crt-screen cursor-text"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 select-none">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-neon-cyan" />
              <span className="font-mono text-xs text-white uppercase tracking-widest">
                AidenShell_v2.1.8
              </span>
            </div>
            <div className="flex space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-600/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-600/60" />
            </div>
          </div>

          {/* Outputs */}
          <div className="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin">
            {history.map((line, idx) => (
              <div 
                key={idx} 
                className={
                  line.type === 'input' 
                    ? 'text-white' 
                    : line.type === 'error' 
                      ? 'text-red-500' 
                      : line.type === 'success' 
                        ? 'text-neon-cyan font-bold' 
                        : 'text-slate-400'
                }
              >
                {line.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* CommandLine Input */}
          <div className="flex items-center mt-3 pt-3 border-t border-slate-900 font-mono text-xs">
            <span className="text-neon-cyan mr-2 select-none">visitor@aiden.dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="flex-1 bg-transparent border-0 text-white focus:outline-none focus:ring-0 p-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* COLUMN 2: SECURE PACKET FORM */}
        <div 
          className="lg:col-span-5 glass-panel border border-neon-cyan/20 rounded-xl p-6 shadow-2xl flex flex-col justify-between"
          onMouseEnter={() => setCursorHovering(true)}
          onMouseLeave={() => setCursorHovering(false)}
        >
          {formStatus === 'idle' && (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-2 mb-2 select-none">
                <Key className="w-4 h-4 text-neon-cyan" />
                <span className="font-mono text-xs text-white uppercase tracking-widest">
                  Secure Packet Transfer
                </span>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Sender Identity Alias
                </label>
                <input
                  type="text"
                  required
                  className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-cyan/50"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Callback Endpoint (Email)
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-cyan/50"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-500 uppercase mb-1">
                  Message Payload
                </label>
                <textarea
                  rows={4}
                  required
                  className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neon-cyan/50 resize-none"
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-neon-cyan to-electric-violet text-black font-mono font-bold text-xs uppercase tracking-widest rounded shadow-md hover:brightness-115 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" /> Dispatch Payload
              </button>
            </form>
          )}

          {formStatus === 'encrypting' && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 crt-screen select-none">
              <ShieldAlert className="w-12 h-12 text-neon-cyan animate-pulse" />
              <div className="font-mono space-y-1.5">
                <p className="text-xs text-neon-cyan font-bold uppercase tracking-wider animate-bounce">
                  ENCRYPTING PAYLOAD PACKETS...
                </p>
                <p className="text-[10px] text-slate-500">
                  ESTABLISHING KEY EXCHANGE PROTOCOL
                </p>
              </div>
              <div className="w-full max-w-xs space-y-2 p-3 bg-slate-950 border border-slate-900 rounded font-mono text-[9px] text-green-500 text-left overflow-hidden h-24 select-all shadow-inner">
                <div>HASH: [SHA-256 SECURE ENVELOPE]</div>
                <div>FROM: {scrambledName}</div>
                <div>CALLBACK: {scrambledEmail}</div>
                <div>BODY: {scrambledMsg}</div>
              </div>
            </div>
          )}

          {formStatus === 'sent' && (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-5 select-none">
              <Check className="w-12 h-12 text-green-400 bg-green-500/10 border-2 border-green-500 rounded-full p-2 animate-pulse" />
              <div className="font-mono space-y-2">
                <p className="text-xs text-green-400 font-bold uppercase tracking-widest">
                  TRANSMISSION SUCCESSFUL
                </p>
                <p className="text-[10px] text-slate-400 leading-relaxed max-w-xs">
                  Your encrypted message was compiled successfully and queued in Aiden&apos;s primary notification buffer. Sync code receipt verified.
                </p>
              </div>
              <button
                onClick={handleResetForm}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded font-mono text-[10px] text-slate-300 transition-colors cursor-pointer"
              >
                Send New Message
              </button>
            </div>
          )}

          {/* Quick Info bar */}
          <div className="mt-6 pt-4 border-t border-white/5 font-mono text-[10px] text-slate-500 flex flex-col sm:flex-row gap-3 justify-between items-center select-none">
            <span>Primary Tunnel Node:</span>
            <div className="flex items-center gap-2">
              <code className="text-white select-all">aiden.vance.dev@gmail.com</code>
              <button 
                onClick={handleCopyBtn}
                className="p-1 bg-slate-950 border border-white/5 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Clipboard className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
