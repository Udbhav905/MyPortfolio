'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { Network, Activity } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  proficiency: number;
  years: number;
  pos: [number, number, number];
  color: string;
  connections: string[];
}

const skillsData: SkillNode[] = [
  { id: 'react', name: 'React / Next.js', proficiency: 98, years: 7, pos: [0, 2, 0], color: '#00F0FF', connections: ['node', 'rust', 'python'] },
  { id: 'node', name: 'Node.js / TS', proficiency: 95, years: 7, pos: [-2, 0.5, 1], color: '#8F00FF', connections: ['react', 'rust', 'flutter'] },
  { id: 'swiftui', name: 'SwiftUI / iOS', proficiency: 92, years: 5, pos: [2.2, 1, -0.8], color: '#FFB800', connections: ['rust', 'kotlin'] },
  { id: 'kotlin', name: 'Kotlin / Android', proficiency: 88, years: 4, pos: [3.2, -1, 0.5], color: '#00F0FF', connections: ['swiftui', 'rust'] },
  { id: 'rust', name: 'Rust / WASM', proficiency: 80, years: 3, pos: [0.5, -1.8, -1.2], color: '#FFB800', connections: ['react', 'node', 'swiftui', 'kotlin'] },
  { id: 'flutter', name: 'Flutter / Dart', proficiency: 85, years: 4, pos: [-3, 1.8, -1.5], color: '#8F00FF', connections: ['node'] },
  { id: 'python', name: 'Python / AI', proficiency: 90, years: 4, pos: [-1.2, -1.5, 1.8], color: '#00F0FF', connections: ['react'] },
];

// Interactive 3D Sphere Node
function NodeSphere({ 
  node, 
  hoveredNode, 
  setHoveredNode,
  setCursorHovering 
}: { 
  node: SkillNode;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  setCursorHovering: (hover: boolean) => void;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const theme = usePortfolioStore((state) => state.theme);

  // Slow float motion
  useFrame((state) => {
    if (!sphereRef.current) return;
    const t = state.clock.getElapsedTime();
    // Unique float offsets
    sphereRef.current.position.y = node.pos[1] + Math.sin(t + node.pos[0]) * 0.12;
    sphereRef.current.position.x = node.pos[0] + Math.cos(t * 0.8 + node.pos[2]) * 0.08;
    sphereRef.current.position.z = node.pos[2] + Math.sin(t * 0.5 + node.pos[1]) * 0.08;
  });

  const isHighlighted = hoveredNode === null || hoveredNode === node.id || node.connections.includes(hoveredNode);
  const isDirectHover = hoveredNode === node.id;

  return (
    <mesh
      ref={sphereRef}
      position={node.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredNode(node.id);
        setCursorHovering(true);
      }}
      onPointerOut={() => {
        setHoveredNode(null);
        setCursorHovering(false);
      }}
    >
      <sphereGeometry args={[isDirectHover ? 0.32 : 0.22, 32, 32]} />
      <meshPhysicalMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={isHighlighted ? (isDirectHover ? 1.5 : 0.8) : 0.15}
        roughness={0.1}
        metalness={0.8}
        transmission={0.3}
        opacity={isHighlighted ? 1.0 : 0.25}
        transparent
      />
      
      {/* HTML Label floating directly over node */}
      <Html 
        distanceFactor={6} 
        center 
        style={{ pointerEvents: 'none' }}
      >
        <div 
          className={`px-3 py-1 font-mono text-[10px] whitespace-nowrap rounded border transition-all duration-300 select-none ${
            isDirectHover 
              ? 'bg-slate-900 border-neon-cyan text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-110' 
              : isHighlighted 
                ? 'bg-slate-950/80 border-white/10 text-slate-300' 
                : 'opacity-20'
          }`}
        >
          {node.name}
        </div>

        {/* Floating Radial Stats Overlay on hover */}
        {isDirectHover && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-neon-cyan/50 p-2.5 rounded-lg shadow-xl flex flex-col items-center w-28 text-center backdrop-blur-md crt-screen z-50">
            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              Proficiency
            </span>
            <span className="text-sm font-mono font-bold text-neon-cyan">
              {node.proficiency}%
            </span>
            
            <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-1 mb-2">
              <div className="h-full bg-neon-cyan" style={{ width: `${node.proficiency}%` }} />
            </div>

            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              Experience
            </span>
            <span className="text-xs font-mono font-semibold text-white">
              {node.years} Years
            </span>
          </div>
        )}
      </Html>
    </mesh>
  );
}

// Glowing Connected Paths (Edges)
function GraphEdges({ hoveredNode }: { hoveredNode: string | null }) {
  // Build direct connections list
  const lines = useMemo(() => {
    const list: Array<{ start: [number, number, number]; end: [number, number, number]; color: string; active: boolean }> = [];
    const processed = new Set<string>();

    skillsData.forEach((node) => {
      node.connections.forEach((connId) => {
        const target = skillsData.find((n) => n.id === connId);
        if (target) {
          const pairKey = [node.id, target.id].sort().join('-');
          if (!processed.has(pairKey)) {
            processed.add(pairKey);
            
            // Check if this path should light up
            const active = hoveredNode === null || 
              (hoveredNode === node.id && target.connections.includes(hoveredNode)) ||
              (hoveredNode === target.id && node.connections.includes(hoveredNode)) ||
              (hoveredNode === node.id || hoveredNode === target.id);

            list.push({
              start: node.pos,
              end: target.pos,
              color: node.color,
              active
            });
          }
        }
      });
    });
    return list;
  }, [hoveredNode]);

  const R3FLine = 'line' as any;

  return (
    <group>
      {lines.map((l, idx) => {
        const points = [new THREE.Vector3(...l.start), new THREE.Vector3(...l.end)];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <R3FLine key={idx} geometry={lineGeo}>
            <lineBasicMaterial 
              color={l.color} 
              linewidth={2} 
              transparent
              opacity={l.active ? 0.8 : 0.08} 
            />
          </R3FLine>
        );
      })}
    </group>
  );
}

// Orbit controller rotation hook
function GraphContainer({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the entire graph slowly in space
  useFrame((state) => {
    if (!groupRef.current) return;
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    // Auto-spin base
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    // Extra mouse drag/move displacement
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, 
      state.pointer.y * 0.4, 
      0.05
    );
    groupRef.current.rotation.y += state.pointer.x * 0.01;
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function QuantumSkillGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const setCursorHovering = usePortfolioStore((state) => state.setCursorHovering);
  const incrementResonance = usePortfolioStore((state) => state.incrementResonance);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Award resonance score if user hovers a node
  useEffect(() => {
    if (hoveredNode) {
      incrementResonance(2);
    }
  }, [hoveredNode, incrementResonance]);

  if (!mounted) return null;

  return (
    <section id="skills" className="relative min-h-screen py-24 px-4 md:px-16 flex flex-col justify-center">
      {/* Title */}
      <div className="max-w-4xl mb-12 relative z-10">
        <p className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
          Cognitive Matrix
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter scroll-warp font-sans text-white mt-1">
          Quantum Skill Graph
        </h2>
        <p className="text-xs text-slate-500 font-mono mt-3 max-w-md">
          Technologies mapping Aiden&apos;s full-stack architecture. Hover nodes to view fluency levels and connection paths.
        </p>
      </div>

      {/* R3F Canvas Container */}
      <div className="w-full h-[60vh] md:h-[70vh] border border-neon-cyan/20 bg-slate-950/40 rounded-xl relative overflow-hidden flex items-center justify-center">
        {/* Hologram panel markings */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-slate-500 flex items-center gap-1.5 z-10 select-none">
          <Network className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
          <span>3D_MATRIX_FORCE: ENGAGED</span>
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-slate-500 flex items-center gap-1.5 z-10 select-none">
          <Activity className="w-3.5 h-3.5 text-electric-violet" />
          <span>SYSTEM_LATENCY: 1.2ms</span>
        </div>
        
        <Canvas 
          camera={{ position: [0, 0, 6.5], fov: 55 }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.0} color="#00f0ff" />
          
          <GraphContainer>
            <GraphEdges hoveredNode={hoveredNode} />
            {skillsData.map((node) => (
              <NodeSphere 
                key={node.id} 
                node={node} 
                hoveredNode={hoveredNode}
                setHoveredNode={setHoveredNode}
                setCursorHovering={setCursorHovering}
              />
            ))}
          </GraphContainer>
        </Canvas>
      </div>
    </section>
  );
}
