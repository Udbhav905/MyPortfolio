'use client';

import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

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
  return (
    <section id="education" className="relative py-24 px-6 md:px-12 bg-[#0B0E14] border-t border-[#222936]">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest">Academic Credentials</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#EDF2F7] tracking-tight mt-2 select-none">
            Education
          </h2>
          <p className="text-sm text-[#A0AEC0] mt-3 max-w-lg">
            My formal academic timeline, providing a foundation in computer science principles and software engineering.
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative border-l-2 border-[#222936] ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {EDUCATION_DATA.map((item, idx) => (
            <motion.div
              key={`${item.title}-${item.period}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Point Dot */}
              <div className="absolute -left-[41px] md:-left-[49px] top-1.5 w-6 h-6 border border-[#222936] bg-[#0B0E14] flex items-center justify-center rounded-none select-none">
                <div className="w-2.5 h-2.5 bg-[#3B82F6] rounded-none animate-pulse" />
              </div>

              {/* Header Info */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-[#3B82F6]/30 text-[#3B82F6] bg-[#3B82F6]/5">
                  Degree Program
                </span>

                <h3 className="text-xl md:text-2xl font-bold text-[#EDF2F7] pt-1">
                  {item.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-2 text-xs font-mono text-[#A0AEC0]">
                  <GraduationCap className="w-4 h-4 text-[#3B82F6]" />
                  <span>{item.institution}</span>
                  <span className="text-[#5A6E85]">•</span>
                  <span className="text-[#3B82F6] font-semibold">{item.period}</span>
                </div>
              </div>

              {/* Coursework/Details list */}
              {item.details && (
                <ul className="mt-6 space-y-3">
                  {item.details.map((detail, detailIdx) => (
                    <li
                      key={detailIdx}
                      className="text-sm text-[#A0AEC0] leading-relaxed flex items-start gap-2"
                    >
                      <span className="text-[#3B82F6] mt-1 select-none">▪</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
