'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Laptop, Terminal, GitBranch, Share2, Code2, Layers, Cpu, Check, Copy } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  githubUrl: string;
  demoUrl: string;
  snippet: string;
  snippetLang: string;
  diagram: React.ReactNode;
}

export default function ProjectsStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);
  const setCursorHovering = usePortfolioStore((state) => state.setCursorHovering);
  const theme = usePortfolioStore((state) => state.theme);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  // Set up Scroll-linked horizontal translate
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Map vertical scroll progress to horizontal translation percentage
  const xTranslate = useTransform(scrollYProgress, [0, 1], ['0%', '-60%']);

  useEffect(() => {
    // Listen to dissect event from Command Palette
    const handleDissect = (e: any) => {
      const pId = e.detail;
      const found = projects.find((p) => p.id === pId);
      if (found) {
        setActiveProject(found);
        incrementResonance(10);
      }
    };
    window.addEventListener('dissect-project', handleDissect);
    return () => window.removeEventListener('dissect-project', handleDissect);
  }, [incrementResonance]);

  const handleCopyClone = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    incrementResonance(5);
  };

  const projects: Project[] = [
    {
      id: 'solstice-os',
      title: 'Solstice OS',
      tagline: 'Web OS with Synthesizer Engine & WASM Core',
      description: 'A complete desktop simulation built in the browser. Features a custom multi-window manager, low-latency audio synthesizer (Web Audio API), and high-performance image processing modules powered by Rust compiled to WebAssembly.',
      stack: ['Next.js', 'Web Audio API', 'Rust', 'WASM'],
      githubUrl: 'https://github.com/aidenvance/solstice-os',
      demoUrl: 'https://solstice.aiden.dev',
      snippetLang: 'rust',
      snippet: `// WebAssembly audio processing node in Rust
#[wasm_bindgen]
pub struct SynthNode {
    oscillator: OscillatorNode,
    gain_node: GainNode,
    frequency: f32,
}

#[wasm_bindgen]
impl SynthNode {
    pub fn new(ctx: &AudioContext, freq: f32) -> Result<SynthNode, JsValue> {
        let osc = ctx.create_oscillator()?;
        let gain = ctx.create_gain()?;
        osc.frequency().set_value(freq);
        gain.gain().set_value(0.15);
        osc.connect_with_audio_node(&gain)?;
        Ok(SynthNode { oscillator: osc, gain_node: gain, frequency: freq })
    }
}`,
      diagram: (
        <svg viewBox="0 0 400 160" className="w-full h-auto text-neon-cyan">
          <rect x="10" y="55" width="80" height="50" rx="6" fill="rgba(0, 240, 255, 0.05)" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="85" fill="currentColor" fontSize="11" textAnchor="middle" fontFamily="monospace">WASM OS Core</text>
          
          <path d="M 90 80 L 120 80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <polygon points="120,80 114,76 114,84" fill="currentColor" />

          <rect x="120" y="55" width="80" height="50" rx="6" fill="rgba(143, 0, 255, 0.05)" stroke="#8F00FF" strokeWidth="1.5" />
          <text x="160" y="85" fill="#8F00FF" fontSize="11" textAnchor="middle" fontFamily="monospace">OscillatorNode</text>
          
          <path d="M 200 80 L 230 80" stroke="#8F00FF" strokeWidth="1.5" />
          <polygon points="230,80 224,76 224,84" fill="#8F00FF" />

          <rect x="230" y="55" width="80" height="50" rx="6" fill="rgba(255, 184, 0, 0.05)" stroke="#FFB800" strokeWidth="1.5" />
          <text x="270" y="85" fill="#FFB800" fontSize="11" textAnchor="middle" fontFamily="monospace">Bi-Quad Filter</text>

          <path d="M 310 80 L 340 80" stroke="#FFB800" strokeWidth="1.5" />
          <polygon points="340,80 334,76 334,84" fill="#FFB800" />

          <circle cx="360" cy="80" r="18" fill="rgba(0, 240, 255, 0.1)" stroke="currentColor" strokeWidth="1.5" />
          <text x="360" y="84" fill="currentColor" fontSize="9" textAnchor="middle" fontFamily="monospace">Speaker</text>
        </svg>
      )
    },
    {
      id: 'aetherwallet',
      title: 'AetherWallet',
      tagline: 'Biometric Cross-Platform Zero-Knowledge Wallet',
      description: 'Ultra-secure cryptographic wallet written natively for iOS and Android. Implements client-side Zero-Knowledge proofs for transactions, and integrates biometric keychain/keystore APIs alongside custom C++ cryptographic bridges.',
      stack: ['SwiftUI', 'Kotlin', 'Rust Core', 'Crypto'],
      githubUrl: 'https://github.com/aidenvance/aether-wallet',
      demoUrl: 'https://aether.aiden.dev',
      snippetLang: 'swift',
      snippet: `// Biometric enclave verification trigger in SwiftUI
import LocalAuthentication

class SecureKeypairManager {
    let context = LAContext()
    
    func signTransaction(hash: Data, completion: @escaping (Result<Data, Error>) -> Void) {
        var error: NSError?
        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, reason: "Authenticate to sign ZK Proof") { success, evalError in
                if success {
                    let signed = RustBridge.sign_payload(hash)
                    completion(.success(signed))
                } else {
                    completion(.failure(evalError ?? LAError(.authenticationFailed)))
                }
            }
        }
    }
}`,
      diagram: (
        <svg viewBox="0 0 400 160" className="w-full h-auto text-[#8F00FF]">
          <rect x="10" y="55" width="80" height="50" rx="6" fill="rgba(143, 0, 255, 0.05)" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="85" fill="currentColor" fontSize="11" textAnchor="middle" fontFamily="monospace">Secure Enclave</text>
          
          <path d="M 90 80 L 120 80" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="120,80 114,76 114,84" fill="currentColor" />

          <rect x="120" y="55" width="80" height="50" rx="6" fill="rgba(0, 240, 255, 0.05)" stroke="#00F0FF" strokeWidth="1.5" />
          <text x="160" y="85" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">ZK Proof Gen</text>
          
          <path d="M 200 80 L 230 80" stroke="#00F0FF" strokeWidth="1.5" strokeDasharray="3,3" />
          <polygon points="230,80 224,76 224,84" fill="#00F0FF" />

          <rect x="230" y="55" width="80" height="50" rx="6" fill="rgba(255, 184, 0, 0.05)" stroke="#FFB800" strokeWidth="1.5" />
          <text x="270" y="85" fill="#FFB800" fontSize="11" textAnchor="middle" fontFamily="monospace">Rust Crypt Engine</text>

          <path d="M 310 80 L 340 80" stroke="#FFB800" strokeWidth="1.5" />
          <polygon points="340,80 334,76 334,84" fill="#FFB800" />

          <rect x="340" y="55" width="50" height="50" rx="6" fill="rgba(143, 0, 255, 0.1)" stroke="currentColor" strokeWidth="1.5" />
          <text x="365" y="85" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace">L2 Ledger</text>
        </svg>
      )
    },
    {
      id: 'nexusflow',
      title: 'NexusFlow',
      tagline: 'Autonomous AI Agent System Pipeline Builder',
      description: 'An orchestration layout system that deploys auto-scaling AI workflows. Leverages LangChain and serverless Python layers to run autonomous tasks (coding, refactoring, documentation) triggered by event streams.',
      stack: ['Next.js', 'Python', 'LangChain', 'Node.js'],
      githubUrl: 'https://github.com/aidenvance/nexus-flow',
      demoUrl: 'https://nexus.aiden.dev',
      snippetLang: 'python',
      snippet: `# Python Autonomous agent routing pipeline
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain_core.prompts import ChatPromptTemplate

def spawn_autonomous_agent(tool_list, system_prompt):
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("placeholder", "{chat_history}"),
        ("human", "{input}"),
        ("placeholder", "{agent_scratchpad}")
    ])
    
    agent = create_openai_tools_agent(llm=llm, tools=tool_list, prompt=prompt)
    executor = AgentExecutor(agent=agent, tools=tool_list, verbose=True)
    return executor`,
      diagram: (
        <svg viewBox="0 0 400 160" className="w-full h-auto text-[#FFB800]">
          <rect x="10" y="55" width="80" height="50" rx="6" fill="rgba(255, 184, 0, 0.05)" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="85" fill="currentColor" fontSize="11" textAnchor="middle" fontFamily="monospace">Next.js UI</text>
          
          <path d="M 90 80 L 120 80" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="120,80 114,76 114,84" fill="currentColor" />

          <rect x="120" y="55" width="80" height="50" rx="6" fill="rgba(0, 240, 255, 0.05)" stroke="#00F0FF" strokeWidth="1.5" />
          <text x="160" y="85" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">API Gateway</text>
          
          <path d="M 200 80 L 230 80" stroke="#00F0FF" strokeWidth="1.5" />
          <polygon points="230,80 224,76 224,84" fill="#00F0FF" />

          <rect x="230" y="55" width="80" height="50" rx="6" fill="rgba(143, 0, 255, 0.05)" stroke="#8F00FF" strokeWidth="1.5" />
          <text x="270" y="85" fill="#8F00FF" fontSize="11" textAnchor="middle" fontFamily="monospace">LangChain Executor</text>

          <path d="M 310 80 L 340 80" stroke="#8F00FF" strokeWidth="1.5" strokeDasharray="3,3" />
          <polygon points="340,80 334,76 334,84" fill="#8F00FF" />

          <circle cx="360" cy="80" r="18" fill="rgba(255, 184, 0, 0.1)" stroke="currentColor" strokeWidth="1.5" />
          <text x="360" y="84" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace">LLM</text>
        </svg>
      )
    },
    {
      id: 'holocode',
      title: 'HoloCode',
      tagline: '3D WebGL Multi-User CRDT Code Workspace',
      description: 'Real-time collaborative code editor rendered inside a WebGL spatial workspace. Uses Yjs CRDT protocol over WebRTC for zero-conflict file syncing, and React Three Fiber to display files as physical floating modules.',
      stack: ['React', 'Three.js', 'WebRTC', 'Yjs'],
      githubUrl: 'https://github.com/aidenvance/holocode',
      demoUrl: 'https://holocode.aiden.dev',
      snippetLang: 'typescript',
      snippet: `// Yjs CRDT synchronization hook for editor layers
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';

export function useCrdtSync(roomName: string) {
  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(roomName, ydoc, {
    signaling: ['wss://signaling.aiden.dev']
  });
  
  const textShared = ydoc.getText('code-buffer');
  
  // Real-time remote cursors updates
  const awareness = provider.awareness;
  awareness.on('change', () => {
    console.log("Cursors active count: ", awareness.getStates().size);
  });
  
  return { textShared, awareness };
}`,
      diagram: (
        <svg viewBox="0 0 400 160" className="w-full h-auto text-neon-cyan">
          <rect x="10" y="55" width="80" height="50" rx="6" fill="rgba(0, 240, 255, 0.05)" stroke="currentColor" strokeWidth="1.5" />
          <text x="50" y="85" fill="currentColor" fontSize="11" textAnchor="middle" fontFamily="monospace">Yjs CRDT Document</text>
          
          <path d="M 90 80 L 120 80" stroke="currentColor" strokeWidth="1.5" />
          <polygon points="120,80 114,76 114,84" fill="currentColor" />

          <rect x="120" y="55" width="80" height="50" rx="6" fill="rgba(143, 0, 255, 0.05)" stroke="#8F00FF" strokeWidth="1.5" />
          <text x="160" y="85" fill="#8F00FF" fontSize="11" textAnchor="middle" fontFamily="monospace">WebRTC Peer Link</text>
          
          <path d="M 200 80 L 230 80" stroke="#8F00FF" strokeWidth="1.5" />
          <polygon points="230,80 224,76 224,84" fill="#8F00FF" />

          <rect x="230" y="55" width="80" height="50" rx="6" fill="rgba(255, 184, 0, 0.05)" stroke="#FFB800" strokeWidth="1.5" />
          <text x="270" y="85" fill="#FFB800" fontSize="11" textAnchor="middle" fontFamily="monospace">R3F Canvas Editor</text>

          <path d="M 310 80 L 340 80" stroke="#FFB800" strokeWidth="1.5" strokeDasharray="3,3" />
          <polygon points="340,80 334,76 334,84" fill="#FFB800" />

          <circle cx="360" cy="80" r="18" fill="rgba(0, 240, 255, 0.1)" stroke="currentColor" strokeWidth="1.5" />
          <text x="360" y="84" fill="currentColor" fontSize="10" textAnchor="middle" fontFamily="monospace">Users</text>
        </svg>
      )
    }
  ];

  return (
    <section 
      ref={containerRef} 
      id="projects" 
      className="relative min-h-[300vh] flex flex-col justify-start bg-transparent"
    >
      {/* Sticky screen section */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 md:px-16 py-12">
        {/* Title */}
        <div className="max-w-4xl mb-12">
          <motion.p 
            className="font-mono text-xs text-neon-cyan uppercase tracking-widest"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Showcase
          </motion.p>
          <motion.h2 
            className="text-4xl md:text-6xl font-bold tracking-tighter scroll-warp font-sans text-white mt-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Engineering Dissections
          </motion.h2>
          <p className="text-xs text-slate-500 font-mono mt-3">
            [SCROLL DOWN OR DRAG TO SCRUB HORIZONTALLY]
          </p>
        </div>

        {/* Sliding projects horizontal track */}
        <div className="relative w-full flex items-center">
          <motion.div 
            className="flex gap-8 md:gap-12"
            style={{ x: xTranslate }}
          >
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                className="w-[300px] sm:w-[420px] shrink-0 glass-panel rounded-xl border border-neon-cyan/20 p-6 flex flex-col hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all cursor-default"
                whileHover={{ y: -5 }}
                onMouseEnter={() => setCursorHovering(true)}
                onMouseLeave={() => setCursorHovering(false)}
              >
                {/* Simulated Wireframe active screen (highly futuristic) */}
                <div className="w-full h-44 bg-slate-950/80 rounded-lg border border-white/5 relative overflow-hidden flex items-center justify-center group mb-5">
                  <div className="absolute inset-0 hologram-grid opacity-20" />
                  
                  {/* Glowing moving design shapes inside */}
                  <div className="absolute w-24 h-24 rounded-full border border-neon-cyan/15 animate-ping" />
                  <div className="absolute w-16 h-16 rounded-full border border-electric-violet/20 animate-pulse" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <Laptop className="w-8 h-8 text-neon-cyan/80 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                      Simulated Live Node Grid
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <h3 className="text-xl font-mono text-white font-bold">{proj.title}</h3>
                <p className="text-xs text-neon-cyan font-mono mt-1">{proj.tagline}</p>
                <p className="text-xs text-slate-400 font-sans mt-3 line-clamp-3 leading-relaxed">
                  {proj.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {proj.stack.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[9px] font-mono border border-white/10 rounded-full bg-white/5 text-slate-300 shadow-[inset_0_0_8px_rgba(255,255,255,0.02)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* dissect button */}
                <button
                  onClick={() => {
                    setActiveProject(proj);
                    incrementResonance(8);
                  }}
                  className="mt-6 w-full py-2.5 bg-gradient-to-r from-neon-cyan/10 to-electric-violet/10 hover:from-neon-cyan/20 hover:to-electric-violet/20 border border-neon-cyan/30 hover:border-neon-cyan text-neon-cyan font-mono text-[10px] uppercase rounded-lg tracking-widest transition-all cursor-pointer"
                >
                  Dissect Core System
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Dissection Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
            />

            {/* Modal Box */}
            <motion.div
              className="w-full max-w-3xl glass-panel border border-neon-cyan/40 rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh] crt-screen"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-neon-cyan" />
                  <span className="font-mono text-xs text-white tracking-widest uppercase">
                    SYSTEM DISSECTION: {activeProject.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-neon-cyan tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Project Summary
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Architecture Diagram */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-neon-cyan tracking-wider mb-3 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" /> System Architecture Graph (Flow-Spec)
                  </h4>
                  <div className="p-4 bg-slate-950/90 border border-white/5 rounded-lg flex items-center justify-center shadow-inner">
                    {activeProject.diagram}
                  </div>
                </div>

                {/* Code Snippet */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-neon-cyan tracking-wider mb-2 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> Core Implementation Snippet
                  </h4>
                  <div className="relative">
                    <pre className="p-4 bg-slate-950 border border-white/5 rounded-lg overflow-x-auto text-[10px] font-mono text-green-400 leading-relaxed shadow-inner">
                      <code>{activeProject.snippet}</code>
                    </pre>
                    <span className="absolute top-2 right-2 text-[8px] font-mono text-slate-500 bg-slate-900 border border-white/5 px-1.5 py-0.5 rounded uppercase">
                      {activeProject.snippetLang}
                    </span>
                  </div>
                </div>

                {/* GitHub Terminal Clone Link */}
                <div>
                  <h4 className="text-xs font-mono uppercase text-neon-cyan tracking-wider mb-2 flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5" /> Clone Repository Node
                  </h4>
                  <div className="flex bg-slate-950 rounded border border-white/10 p-2.5 font-mono text-xs justify-between items-center text-slate-300 shadow-inner">
                    <code className="text-green-400 select-all">
                      git clone {activeProject.githubUrl}.git
                    </code>
                    <button
                      onClick={() => handleCopyClone(`git clone ${activeProject.githubUrl}.git`)}
                      className="ml-4 p-1.5 bg-slate-900 border border-white/10 rounded text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-slate-950/80 border-t border-white/10 flex justify-end gap-3 font-mono text-xs">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300 rounded transition-all cursor-pointer"
                >
                  GitHub Source
                </a>
                <a
                  href={activeProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-gradient-to-r from-neon-cyan to-electric-violet text-black font-semibold rounded hover:brightness-110 transition-all cursor-pointer"
                >
                  Launch Demo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
