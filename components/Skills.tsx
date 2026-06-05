'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Smartphone, Database, Terminal as GitIcon } from 'lucide-react';

interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Database' | 'DevOps' | 'Cloud';
  years: string;
  proficiency: number;
}

const SKILLS_DATA: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', years: '2 Years', proficiency: 85 },
  { name: 'Next.js 14/15', category: 'Frontend', years: '6 months', proficiency: 80 },
  { name: 'TypeScript', category: 'Frontend', years: '6 months', proficiency: 85 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', years: '2.5 Years', proficiency: 85 },
  { name: 'Tailwind CSS', category: 'Frontend', years: '2 Years', proficiency: 90 },
  // Backend
  { name: 'Node.js', category: 'Backend', years: '2 Years', proficiency: 75 },
  { name: 'Express.js', category: 'Backend', years: '2 Years', proficiency: 80 },
  { name: 'REST APIs', category: 'Backend', years: '2 Years', proficiency: 85 },
  // Mobile
  { name: 'React Native', category: 'Mobile', years: '2 months', proficiency: 60 },
  // Database
  { name: 'MongoDB', category: 'Database', years: '2 Years', proficiency: 80 },
  { name: 'PostgreSQL', category: 'Database', years: '6 months', proficiency: 75 },
  // DevOps / Tools
  { name: 'Git & GitHub', category: 'DevOps', years: '2 Years', proficiency: 85 },
  { name: 'AZURE', category: 'Cloud', years: '3 months', proficiency: 60 },
];

const CATEGORIES = [
  { name: 'Frontend', icon: Layout, color: 'text-[#3B82F6]' },
  { name: 'Backend', icon: Server, color: 'text-[#10B981]' },
  { name: 'Mobile', icon: Smartphone, color: 'text-[#EC4899]' },
  { name: 'Database', icon: Database, color: 'text-[#F59E0B]' },
  { name: 'DevOps', icon: GitIcon, color: 'text-[#8B5CF6]' },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-12 bg-[#0B0E14] border-t border-[#222936]">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest">Stack & Competencies</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#EDF2F7] tracking-tight mt-2 select-none">
            Technical Skills
          </h2>
          <p className="text-sm text-[#A0AEC0] mt-3 max-w-lg">
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
                <div className="flex items-center space-x-3 border-b border-[#222936] pb-3">
                  <IconComponent className={`w-5 h-5 ${cat.color}`} />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#EDF2F7]">
                    {cat.name} Development
                  </h3>
                  <span className="text-[10px] font-mono text-[#5A6E85]">
                    ({categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'})
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="border border-[#222936] bg-[#121720] p-6 hover:border-[#3B82F6]/30 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-base font-bold text-[#EDF2F7] group-hover:text-[#3B82F6] transition-colors duration-200">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] font-mono bg-[#1E2530] text-[#A0AEC0] px-2 py-0.5 border border-[#222936]">
                            {skill.years}
                          </span>
                        </div>
                        <p className="text-[10px] font-mono text-[#5A6E85] uppercase tracking-wider">
                          {skill.category}
                        </p>
                      </div>

                      {/* Pure CSS/Framer Motion animated proficiency bar */}
                      <div className="mt-6 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-mono text-[#A0AEC0]">
                          <span>Proficiency</span>
                          <span>{skill.proficiency}%</span>
                        </div>
                        <div className="w-full h-[3px] bg-[#1E2530] overflow-hidden">
                          <motion.div
                            className="h-full bg-[#3B82F6]"
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
