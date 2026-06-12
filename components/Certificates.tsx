'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Award, Calendar, ExternalLink, X, FileText, ZoomIn } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { usePortfolioStore } from '@/store/usePortfolioStore';

const FadeContent = dynamic(() => import('@/lib/reactbits/FadeContent'), { ssr: false });
const SpotlightCard = dynamic(() => import('@/lib/reactbits/SpotlightCard'), { ssr: false });
const BorderGlow = dynamic(() => import('@/lib/reactbits/BorderGlow'), { ssr: false });

interface Certificate {
  title: string;
  provider: string;
  period: string;
  fileUrl: string;
  description: string;
}

const CERTIFICATES_DATA: Certificate[] = [
  {
    title: 'DSA Problem Solving Certificate',
    provider: 'Google',
    period: 'September 2025',
    fileUrl: '/goggledsa.jpg',
    description: 'Verified problem solving skills in data structures, algorithmic complexity optimization, and advanced computation paradigms.',
  },
  {
    title: 'React - Redux Certificate',
    provider: 'KG Coding (Youtube)',
    period: 'May 2025',
    fileUrl: '/reactcerty.png',
    description: 'Hands-on certification for state management, component architecture, custom hooks, and building scalable React applications.',
  },
  {
    title: 'Fullstack Certificate',
    provider: 'OneRoadMap',
    period: 'May 2025',
    fileUrl: '/fullstackdev.jpg',
    description: 'Comprehensive training in client-server architecture, database indexing, API integration, and deploying full-stack web products.',
  },
  {
    title: 'CSS & Responsive Design Certificate',
    provider: 'SoloLearn',
    period: 'April 2025',
    fileUrl: '/csscerty.png',
    description: 'Mastery of modern CSS selectors, Flexbox, Grid layouts, responsive web design principles, media queries, and cross-browser styling.',
  },
  {
    title: 'C Programming Certificate',
    provider: 'DDU',
    period: '2026',
    fileUrl: '/c_certy.png',
    description: 'Foundational programming concepts, memory management, pointers, and procedural programming using C.',
  },
  {
    title: 'Testing Certificate',
    provider: 'DDU',
    period: '2026',
    fileUrl: '/test_certy.png',
    description: 'Certificate of completion for software development Testing coursework and technical proficiency.',
  },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [mounted, setMounted] = useState(false);
  const theme = usePortfolioStore((state) => state.theme);
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="certificates" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#10B981] uppercase tracking-widest">Achievements &amp; Credentials</p>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-2 select-none">
            Certifications
          </h2>
          <p className="text-sm text-text-secondary mt-3 max-w-lg">
            Professional milestones and verified credentials verifying my skillset across algorithms, frontend libraries, and full-stack environments.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES_DATA.map((cert, idx) => {
            const isPdf = cert.fileUrl.endsWith('.pdf');
            return (
              <FadeContent key={cert.title} blur={true} duration={0.4} delay={idx * 0.08} threshold={0.05}>
                <BorderGlow
                  backgroundColor={isDark ? 'var(--card-bg, #121720)' : '#ffffff'}
                  glowColor="158 80 65"
                  colors={['#10b981', '#34d399', '#6ee7b7']}
                  borderRadius={0}
                  glowRadius={36}
                  glowIntensity={1.1}
                  coneSpread={22}
                  className="h-full"
                >
                <div onClick={() => setSelectedCert(cert)} className="h-full block cursor-pointer">
                  <SpotlightCard
                    spotlightColor="rgba(16, 185, 129, 0.1)"
                    className="border-0 bg-card-dark overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-lg rounded-none h-full"
                  >
                    <div>
                      {/* Thumbnail / Document Preview */}
                      <div className="relative w-full h-48 bg-card-hover overflow-hidden border-b border-border-dark flex items-center justify-center">
                        {isPdf ? (
                          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                            <FileText className="w-12 h-12 text-[#10B981] group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs font-mono text-text-secondary">PDF Verification Document</span>
                            <span className="text-[10px] text-text-secondary/50 uppercase">Click to open archive</span>
                          </div>
                        ) : (
                          <>
                            <Image
                              src={cert.fileUrl}
                              alt={`${cert.title} preview`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-bg-dark/40 group-hover:bg-bg-dark/20 transition-colors duration-300" />
                          </>
                        )}

                        {/* Hover zoom overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-sm">
                          <span className="inline-flex items-center space-x-1.5 px-4 py-2 border border-[#10B981] text-xs font-mono uppercase tracking-wider text-white bg-[#10B981]/20">
                            <ZoomIn className="w-4.5 h-4.5" />
                            <span>Verify Credential</span>
                          </span>
                        </div>
                      </div>

                      {/* Certificate Content */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-mono uppercase px-2 py-0.5 border border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5">
                              {cert.provider}
                            </span>
                            <span className="text-[10px] font-mono text-text-secondary flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#10B981]" />
                              {cert.period}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-text-primary pt-2 group-hover:text-[#10B981] transition-colors duration-200 line-clamp-1">
                            {cert.title}
                          </h3>
                        </div>

                        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 h-8">
                          {cert.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom line */}
                    <div className="p-6 pt-0 flex justify-between items-center text-[10px] font-mono text-text-secondary/60 group-hover:text-[#10B981] transition-colors w-full mt-4">
                      <span>DECRYPT ARCHIVE</span>
                      <span>→</span>
                    </div>
                  </SpotlightCard>
                </div>
                </BorderGlow>
              </FadeContent>
            );
          })}
        </div>

      </div>

      {/* Certificate Modal Viewer */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            />

            {/* Modal Box */}
            <motion.div
              className="w-full max-w-3xl bg-bg-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border-dark flex items-center justify-between bg-card-dark">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4 text-[#10B981]" />
                  <span className="font-mono text-xs text-text-secondary tracking-widest uppercase">
                    CREDENTIAL ARCHIVE
                  </span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1.5 hover:bg-card-hover rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Document Viewer (Image or PDF IFrame) */}
                <div className="relative w-full border border-border-dark rounded-lg overflow-hidden bg-card-hover">
                  {selectedCert.fileUrl.endsWith('.pdf') ? (
                    <iframe
                      src={selectedCert.fileUrl}
                      className="w-full h-[60vh] border-none bg-bg-dark"
                      title={selectedCert.title}
                    />
                  ) : (
                    <div className="relative w-full h-[45vh] sm:h-[55vh] flex items-center justify-center bg-card-hover">
                      <Image
                        src={selectedCert.fileUrl}
                        alt={selectedCert.title}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 border border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5">
                      Verified Provider: {selectedCert.provider}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-text-primary mt-2">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs font-mono text-text-secondary mt-1">
                      Credential Date: <span className="text-[#10B981] font-semibold">{selectedCert.period}</span>
                    </p>
                  </div>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 py-4 bg-card-dark border-t border-border-dark flex flex-col sm:flex-row justify-between gap-4">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 border border-border-dark bg-card-hover text-sm font-mono uppercase tracking-wider text-text-secondary hover:text-[#10B981] hover:border-[#10B981]/40 transition-colors w-full sm:w-auto"
                >
                  <span>Close Viewer</span>
                </button>

                <a
                  href={selectedCert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#10B981] hover:bg-[#059669] text-sm font-mono uppercase tracking-wider text-white transition-colors w-full sm:w-auto"
                >
                  <span>Open Fullscreen</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
