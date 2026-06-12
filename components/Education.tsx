'use client';

import React, { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import dynamic from 'next/dynamic';

const FadeContent = dynamic(() => import('@/lib/reactbits/FadeContent'), { ssr: false });

interface EducationItem {
  title: string;
  institution: string;
  period: string;
  details?: string[];
}

const EDUCATION_DATA: EducationItem[] = [
  {
    title: 'Master of Computer Applications (MCA)',
    institution: 'Dharmsinh Desai University, Nadiad',
    period: '2025 - Present (CGPA: 8.2)',
    details: [
      'Currently pursuing a Master of Computer Applications with specialization in Software Development, Cloud Technologies, and Artificial Intelligence.',
      'Building expertise in Full-Stack Development, System Design, Database Architecture, and scalable application development through academic and personal projects.',
    ],
  },
  {
    title: 'Bachelor of Computer Applications (BCA)',
    institution: 'Dharmsinh Desai University, Nadiad',
    period: 'Graduated: 2025 (CGPA: 7.2)',
    details: [
      'Studied Data Structures & Algorithms, Database Management Systems, Object-Oriented Programming, and Web Development.',
      'Developed multiple full-stack applications and gained practical experience with modern web technologies and software engineering principles.',
    ],
  },
];

export default function Education() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="education" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest">Academic Credentials</p>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-2 select-none">
            Education
          </h2>
          <p className="text-sm text-text-secondary mt-3 max-w-lg">
            My formal academic timeline, providing a foundation in computer science principles and software engineering.
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative border-l-2 border-border-dark ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {EDUCATION_DATA.map((item, idx) => (
            <FadeContent key={`${item.title}-${item.period}`} blur={true} duration={0.5} delay={idx * 0.1}>
              <div className="relative">
                {/* Timeline Point Dot */}
                <div className="absolute -left-[41px] md:-left-[49px] top-1.5 w-6 h-6 border border-border-dark bg-bg-dark flex items-center justify-center rounded-none select-none">
                  <div className="w-2.5 h-2.5 bg-accent-blue rounded-none animate-pulse" />
                </div>

                {/* Header Info */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-accent-blue/30 text-accent-blue bg-accent-blue/5">
                    Degree Program
                  </span>

                  <h3 className="text-xl md:text-2xl font-bold text-text-primary pt-1">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-text-secondary">
                    <GraduationCap className="w-4 h-4 text-accent-blue" />
                    <span>{item.institution}</span>
                    <span className="text-text-secondary/60">•</span>
                    <span className="text-accent-blue font-semibold">{item.period}</span>
                  </div>
                </div>

                {/* Coursework/Details list */}
                {item.details && (
                  <ul className="mt-6 space-y-3">
                    {item.details.map((detail, detailIdx) => (
                      <li
                        key={detailIdx}
                        className="text-sm text-text-secondary leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-accent-blue mt-1 select-none">▪</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </FadeContent>
          ))}
        </div>

      </div>
    </section>
  );
}
