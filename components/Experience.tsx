'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const FadeContent = dynamic(() => import('@/lib/reactbits/FadeContent'), { ssr: false });

interface Job {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

const JOBS_DATA: Job[] = [
  {
    company: 'Groovy Technoweb Pvt. Ltd. Nadiad',
    role: 'Full Stack MERN Developer Intern',
    period: '2 December 2024 - 31 March 2025',
    achievements: [
      'Worked as a Full Stack MERN Developer Intern, contributing to the development of production-ready web applications using MongoDB, Express.js, React.js, and Node.js.',
      'Built and integrated RESTful APIs, managed database operations, and connected backend services with responsive React-based user interfaces.',
      'Implemented authentication, authorization, and state management solutions while ensuring secure and efficient data flow.',
      'Optimized application performance, fixed bugs, and improved responsiveness using Tailwind CSS and modern frontend development practices.',
      'Collaborated within an Agile development environment using Git and GitHub for version control, feature development, and code reviews.'
    ]
  },
];

export default function Experience() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="experience" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest">Career Milestones</p>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-2 select-none">
            Work Experience
          </h2>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative border-l-2 border-border-dark ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {JOBS_DATA.map((job, idx) => (
            <FadeContent key={`${job.company}-${job.role}`} blur={true} duration={0.5} delay={idx * 0.15}>
              <div className="relative">
                {/* Timeline Point Dot */}
                <div className="absolute -left-[41px] md:-left-[49px] top-1.5 w-6 h-6 border border-border-dark bg-bg-dark flex items-center justify-center rounded-none select-none">
                  <div className="w-2.5 h-2.5 bg-accent-blue rounded-none" />
                </div>

                {/* Job Header */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-accent-blue font-semibold">
                    {job.period}
                  </span>
                  
                  <h3 className="text-xl font-bold text-text-primary">
                    {job.role}
                  </h3>
                  
                  <p className="text-sm font-mono text-text-secondary uppercase tracking-wide">
                    {job.company}
                  </p>
                </div>

                {/* Achievements bullet list */}
                <ul className="mt-4 space-y-2.5">
                  {job.achievements.map((achievement, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="text-sm text-text-secondary leading-relaxed flex items-start gap-2.5"
                    >
                      <span className="text-accent-blue font-bold mt-1 select-none">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeContent>
          ))}
        </div>

      </div>
    </section>
  );
}
