'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Smartphone, Database, Terminal as GitIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const Bounce = dynamic(() => import('@/lib/reactbits/Bounce'), { ssr: false });
const Iridescence = dynamic(() => import('@/lib/reactbits/Iridescence'), { ssr: false });
const LetterGlitch = dynamic(() => import('@/lib/reactbits/LetterGlitch'), { ssr: false });

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'DevOps' | 'Cloud';
  years: string;
  proficiency: number;
}

const SKILLS_DATA: Skill[] = [
  { name: 'React', category: 'Frontend', years: '2 Years', proficiency: 85 },
  { name: 'Next.js 14/15', category: 'Frontend', years: '6 months', proficiency: 80 },
  { name: 'TypeScript', category: 'Frontend', years: '6 months', proficiency: 85 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', years: '2.5 Years', proficiency: 85 },
  { name: 'Tailwind CSS', category: 'Frontend', years: '2 Years', proficiency: 90 },
  { name: 'Node.js', category: 'Backend', years: '2 Years', proficiency: 75 },
  { name: 'Express.js', category: 'Backend', years: '2 Years', proficiency: 80 },
  { name: 'REST APIs', category: 'Backend', years: '2 Years', proficiency: 85 },
  { name: 'React Native', category: 'Mobile', years: '2 months', proficiency: 60 },
  { name: 'MongoDB', category: 'Database', years: '2 Years', proficiency: 80 },
  { name: 'PostgreSQL', category: 'Database', years: '6 months', proficiency: 75 },
  { name: 'Git & GitHub', category: 'DevOps', years: '2 Years', proficiency: 85 },
  { name: 'AZURE', category: 'Cloud', years: '3 months', proficiency: 60 },
];

const CATEGORIES = [
  { name: 'Frontend', icon: Layout, color: 'text-accent-blue' },
  { name: 'Backend', icon: Server, color: 'text-emerald-500' },
  { name: 'Mobile', icon: Smartphone, color: 'text-pink-500' },
  { name: 'Database', icon: Database, color: 'text-amber-500' },
  { name: 'DevOps', icon: GitIcon, color: 'text-violet-500' },
];

export default function Skills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark overflow-hidden">
      
      {/* Iridescence Shimmer Effect in the Background of the Skills section */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <Iridescence speed={0.3} amplitude={0.15} mouseReact={true} />
      </div>

      <div className="max-w-6xl mx-auto z-10 relative">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest">Stack & Competencies</p>
          
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-2 select-none flex items-center gap-4">
            Technical Skills
          </h2>
          
          <p className="text-sm text-text-secondary mt-3 max-w-lg">
            A comprehensive overview of my tech stack, development libraries, and databases grouped by specialization.
          </p>
        </div>

        {/* Categories Loop */}
        <div className="space-y-16">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            const categorySkills = SKILLS_DATA.filter((s) => s.category === cat.name);

            if (categorySkills.length === 0) return null;

            return (
              <div key={cat.name} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center space-x-3 border-b border-border-dark pb-3">
                  <Bounce>
                    <div className="p-2 glass-skill-card">
                      <IconComponent className={`w-5 h-5 ${cat.color}`} />
                    </div>
                  </Bounce>
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-text-primary">
                    {cat.name} Development
                  </h3>
                  <span className="text-[10px] font-mono text-text-secondary/60">
                    ({categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'})
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="glass-skill-card p-6 flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <Bounce>
                            <h4 className="text-base font-bold text-text-primary group-hover:text-accent-blue transition-colors duration-200 cursor-pointer">
                              {skill.name}
                            </h4>
                          </Bounce>
                          <span className="text-[10px] font-mono bg-bg-dark text-text-secondary px-2 py-0.5 border border-border-dark">
                            {skill.years}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-text-secondary/60 uppercase tracking-wider">
                          {skill.category}
                        </p>
                      </div>

                      {/* Animated proficiency bar */}
                      <div className="mt-6 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                          <span>Proficiency</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <div className="w-full h-[3px] bg-bg-dark overflow-hidden">
                          <motion.div
                            className="h-full bg-accent-blue"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
