'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Globe, Code } from 'lucide-react';

interface CodeWord {
  text: string;
  projectId: string;
  color: string;
  pos: [number, number, number];
}

const rawWords = [
  { text: '#[wasm_bindgen]', projectId: 'solstice-os', color: '#00F0FF' },
  { text: 'func signTransaction()', projectId: 'aetherwallet', color: '#FFB800' },
  { text: 'spawn_autonomous_agent()', projectId: 'nexusflow', color: '#8F00FF' },
  { text: 'let ydoc = new Y.Doc()', projectId: 'holocode', color: '#00F0FF' },
  { text: 'import { useState }', projectId: 'solstice-os', color: '#FFB800' },
  { text: 'context.evaluatePolicy()', projectId: 'aetherwallet', color: '#8F00FF' },
  { text: 'ChatPromptTemplate', projectId: 'nexusflow', color: '#00F0FF' },
  { text: 'useFrame((state) => {})', projectId: 'holocode', color: '#FFB800' },
  { text: 'zero_knowledge_proof()', projectId: 'aetherwallet', color: '#8F00FF' },
  { text: 'AudioContext.createGain()', projectId: 'solstice-os', color: '#00F0FF' },
  { text: 'LangChain.createAgent()', projectId: 'nexusflow', color: '#FFB800' },
  { text: 'WebrtcProvider(room)', projectId: 'holocode', color: '#8F00FF' },
];

function CodeTextItem({ 
  word, 
  setCursorHovering 
}: { 
  word: CodeWord;
  setCursorHovering: (hover: boolean) => void;
}) {
  const textRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);

  useFrame((state) => {
    if (!textRef.current) return;
    // Always face the camera (billboarding)
    textRef.current.quaternion.copy(state.camera.quaternion);
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    incrementResonance(12);
    setCursorHovering(false);
    
    // Teleport to project
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Dispatch dissect event
      setTimeout(() => {
        const event = new CustomEvent('dissect-project', { detail: word.projectId });
        window.dispatchEvent(event);
      }, 800);
    }
  };

  return (
    <Text
      ref={textRef}
      position={word.pos}
      fontSize={0.24}
      color={hovered ? '#ffffff' : word.color}
      font="/fonts/GeistMonoVF.woff" // Fallback to basic font loading
      anchorX="center"
      anchorY="middle"
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        setCursorHovering(true);
      }}
      onPointerOut={() => {
        setHovered(false);
        setCursorHovering(false);
      }}
      onClick={handleClick}
    >
      {word.text}
    </Text>
  );
}

function GlobeGroup({ words }: { words: CodeWord[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const setCursorHovering = usePortfolioStore((state) => state.setCursorHovering);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Auto rotation
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {words.map((w, idx) => (
        <CodeTextItem 
          key={idx} 
          word={w} 
          setCursorHovering={setCursorHovering} 
        />
      ))}
    </group>
  );
}

export default function CodeGlobe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute spherical layout positions
  const words = useMemo(() => {
    const radius = 2.6;
    const count = rawWords.length;
    
    return rawWords.map((item, idx) => {
      // Fibonacci spiral layout on sphere
      const theta = Math.acos(2 * idx / count - 1);
      const phi = Math.sqrt(count * Math.PI) * theta;
      
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);
      
      return {
        ...item,
        pos: [x, y, z] as [number, number, number]
      };
    });
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative py-24 px-4 md:px-16 flex flex-col justify-center bg-transparent">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Explainer Details */}
        <div className="space-y-6 max-w-lg order-2 lg:order-1">
          <p className="font-mono text-xs text-neon-cyan uppercase tracking-widest flex items-center gap-2">
            <Code className="w-4 h-4 text-neon-cyan animate-pulse" /> Compilation Matrix
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter scroll-warp font-sans text-white">
            3D Interactive Code Globe
          </h2>
          <p className="text-sm text-slate-400 font-sans leading-relaxed">
            A rotating spatial sphere woven from raw snippets in Rust, Swift, TypeScript, and Python. Aiden compiles thoughts into cross-compilation binaries. 
          </p>
          <p className="text-xs text-neon-cyan font-mono border-l-2 border-neon-cyan/50 pl-3 italic">
            &ldquo;Clicking any active code node triggers a quantum leap, teleporting your screen and dissecting the project module immediately.&rdquo;
          </p>
        </div>

        {/* Right Side: R3F Canvas */}
        <div className="w-full h-[50vh] lg:h-[60vh] border border-neon-cyan/20 bg-slate-950/40 rounded-xl relative overflow-hidden flex items-center justify-center order-1 lg:order-2">
          {/* HUD Border markings */}
          <div className="absolute top-4 right-4 font-mono text-[9px] text-slate-500 flex items-center gap-1.5 z-10 select-none">
            <Globe className="w-3.5 h-3.5 text-neon-cyan animate-spin-slow" />
            <span>GLOBE_DIMS: 1024_SPHERE</span>
          </div>

          <Canvas 
            camera={{ position: [0, 0, 5], fov: 60 }}
            dpr={[1, 2]}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f0ff" />
            <GlobeGroup words={words} />
          </Canvas>
        </div>

      </div>
    </section>
  );
}
