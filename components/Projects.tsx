'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, X, ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import { Github } from '@/components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import { usePortfolioStore } from '@/store/usePortfolioStore';

const FadeContent = dynamic(() => import('@/lib/reactbits/FadeContent'), { ssr: false });
const SpotlightCard = dynamic(() => import('@/lib/reactbits/SpotlightCard'), { ssr: false });
const GradientText = dynamic(() => import('@/lib/reactbits/GradientText'), { ssr: false });
const ClickSpark = dynamic(() => import('@/lib/reactbits/ClickSpark'), { ssr: false });
const LaserFlow = dynamic(() => import('@/lib/reactbits/LaserFlow'), { ssr: false });
const BorderGlow = dynamic(() => import('@/lib/reactbits/BorderGlow'), { ssr: false });

interface Project {
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  imageUrl: string;
  images?: string[];
}

const PROJECTS_DATA: Project[] = [
  {
    title: 'LUXURIA - Multi-Platform Luxury Commerce Suite',
    description: 'Enterprise-grade luxury fashion commerce platform comprising Customer Storefront, Admin Management Dashboard, Delivery Partner Logistics System, and RESTful Backend API. Features secure authentication, Stripe payment processing, Cloudinary-powered media storage, real-time order tracking with geolocation, advanced inventory management, customer reviews, coupon engine, PDF invoice generation, analytics dashboards, delivery route coordination, and scalable MongoDB architecture supporting thousands of concurrent users.',
    tech: [
      'React 19',
      'Node.js',
      'Express',
      'MongoDB',
      'JWT',
      'Stripe',
      'Cloudinary',
      'Zustand',
      'Leaflet',
      'Recharts',
      'Nodemailer',
      'Vite'
    ],
    demoUrl: 'https://luxuria-clothing.vercel.app',
    githubUrl: 'https://github.com/Udbhav905/Cloth-Store',
    imageUrl: '/luxuria.png'
  },
  {
    title: 'Scoory The Scorecard',
    description: 'A comprehensive real-time cricket scoring and tournament management platform built with Next.js. Features live score updates using Pusher, secure authentication with NextAuth and JWT, team and player management, match scheduling, detailed scorecards, analytics dashboards, real-time notifications, cloud-based image storage, and responsive UI with modern animations. Designed for seamless tournament organization and live match tracking with optimized performance and scalable architecture.',
    tech: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'NextAuth',
      'JWT',
      'Pusher',
      'Cloudinary',
      'Tailwind CSS',
      'Framer Motion',
      'Recharts'
    ],
    demoUrl: 'https://scory-one.vercel.app/',
    githubUrl: 'https://github.com/Udbhav905/Scory',
    imageUrl: '/Scoory_1.png',
    images: [
      '/Scoory_1.png'
    ]
  },
  {
    title: 'Estatix Real Estate App',
    description: 'A feature-rich property listing and discovery application built on React Native. It features AI-powered natural language semantic search, interactive map location markers, detailed property owner profiles, and direct chat/contact pipelines. Includes secure admin and owner listing management dashboards.',
    tech: ['React Native', 'Expo', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'AI Search'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Udbhav905/Estatix',
    imageUrl: '/estatix.png'
  },
  {
    title: 'MERN Food Ordering System',
    description: 'A comprehensive, production-ready Full Stack Food Ordering application. It features real-time shopping cart management, menu browsing, item categorization, and secure checkout. Built with MongoDB, Express.js, React.js, and Node.js with secure JWT-based user authentication, order tracking, and an administrative interface to manage menu items and orders.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Redux Toolkit', 'JWT'],
    demoUrl: 'https://web-foodies.vercel.app/',
    githubUrl: 'https://github.com/Akshay085/Foodie',
    imageUrl: '/Foof_orderSS.png'
  },
  {
    title: 'Movie Ticket Booking Portal',
    description: 'An interactive movie ticket reservation portal built with React. It includes a dynamic visual seat selection layout manager, instant price calculations, genre-based search filters, detailed movie profiles, and ticket purchase simulation. Uses React Context API for state management and CSS Modules for isolated, robust styling.',
    tech: ['React.js', 'CSS Modules', 'Context API', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://movie-booking-ruby.vercel.app/',
    githubUrl: 'https://github.com/Udbhav905/MovieBooking',
    imageUrl: '/Movie.png'
  },
  {
    title: 'Weather Forecast Dashboard',
    description: 'A fast, responsive weather dashboard providing real-time weather analytics. Users can search cities globally to view temperature, wind velocity, humidity, UV index, and 7-day outlook forecasts. Displays custom weather-themed layouts and dynamic visual graphics matching weather conditions.',
    tech: ['React.js', 'OpenWeatherMap API', 'Tailwind CSS', 'Axios', 'CSS Transitions'],
    demoUrl: 'https://weather-app-ecru-zeta-86.vercel.app/',
    githubUrl: 'https://github.com/Udbhav905/WeatherApp',
    imageUrl: '/weather_app.png'
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const theme = usePortfolioStore((state) => state.theme);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined' && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [selectedProject]);

  const isDark = theme === 'dark';

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const nextImage = (images: string[]) => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (images: string[]) => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!mounted) return null;

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark overflow-hidden group">
      {isDark && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 transition-opacity duration-700 group-hover:opacity-70">
          <LaserFlow color="#3B82F6" />
        </div>
      )}
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-16 pointer-events-none">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">Selected Works</p>
          <div className="mt-2 select-none">
            <GradientText colors={['#3B82F6', '#60A5FA', '#3B82F6']} className="text-3xl md:text-5xl font-black tracking-tight inline-block drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]">
              Featured Projects
            </GradientText>
          </div>
          <p className="text-sm text-text-secondary mt-3 max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium">
            A hand-picked selection of web applications and mobile apps that showcase my engineering skills and design aesthetics.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
          <FadeContent key={project.title} blur={true} duration={0.4} delay={idx * 0.08} threshold={0.05}>
              <BorderGlow
                backgroundColor={isDark ? 'var(--card-bg, #121720)' : '#ffffff'}
                glowColor="220 90 70"
                colors={['#3b82f6', '#60a5fa', '#818cf8']}
                borderRadius={0}
                glowRadius={36}
                glowIntensity={1.1}
                coneSpread={22}
                className="h-full"
              >
              <ClickSpark sparkColor="#3B82F6" sparkCount={6} sparkRadius={15} duration={400}>
                <div onClick={() => openProjectModal(project)} className="h-full block cursor-pointer">
                  <SpotlightCard
                    spotlightColor="rgba(59, 130, 246, 0.1)"
                    className="border-0 bg-card-dark overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-lg rounded-none h-full"
                  >
                    <div>
                      {/* Image Wrap */}
                      <div className="relative w-full h-52 bg-card-hover overflow-hidden">
                        <Image
                          src={project.imageUrl}
                          alt={`${project.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-bg-dark/30 group-hover:bg-bg-dark/10 transition-colors duration-300" />

                        {/* Hover indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                          <span className="px-4 py-2 border border-accent-blue text-xs font-mono uppercase tracking-wider text-white bg-accent-blue/20">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Project Details */}
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-accent-blue transition-colors duration-200 line-clamp-1">
                          {project.title}
                        </h3>

                        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3 h-14">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tech.slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="text-[9px] font-mono bg-card-hover text-text-secondary px-2 py-0.5 border border-border-dark"
                            >
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="text-[9px] font-mono text-accent-blue px-1 py-0.5">
                              +{project.tech.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="p-6 pt-0 border-t border-border-dark/35 flex justify-between items-center mt-4 w-full">
                      <span className="text-[10px] font-mono text-accent-blue group-hover:underline">Explore Architecture &amp; Live Node</span>
                      <span className="text-text-secondary group-hover:text-accent-blue transition-colors">→</span>
                    </div>
                  </SpotlightCard>
                </div>
              </ClickSpark>
              </BorderGlow>
            </FadeContent>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Box */}
            <motion.div
              className="w-full max-w-2xl bg-bg-dark border border-border-dark rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              data-lenis-prevent
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-border-dark flex items-center justify-between bg-card-dark">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-accent-blue" />
                  <span className="font-mono text-xs text-text-secondary tracking-widest uppercase">
                    PROJECT DISSECTION
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 hover:bg-card-hover rounded-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Images Carousel */}
                <div className="relative w-full h-64 sm:h-80 bg-card-hover border border-border-dark overflow-hidden rounded-lg group/carousel">
                  {selectedProject.images && selectedProject.images.length > 0 ? (
                    <>
                      <Image
                        src={selectedProject.images[currentImageIndex]}
                        alt={`${selectedProject.title} slide ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />

                      {selectedProject.images.length > 1 && (
                        <>
                          <button
                            onClick={() => prevImage(selectedProject.images!)}
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-bg-dark/80 border border-border-dark text-text-primary hover:bg-accent-blue transition-colors rounded-none"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => nextImage(selectedProject.images!)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-bg-dark/80 border border-border-dark text-text-primary hover:bg-accent-blue transition-colors rounded-none"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          {/* Pagination indicator */}
                          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                            {selectedProject.images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => setCurrentImageIndex(i)}
                                className={`w-2 h-2 rounded-none transition-all ${i === currentImageIndex ? 'bg-accent-blue w-4' : 'bg-white/40 hover:bg-white/70'
                                  }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Info Text */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-text-primary">
                    {selectedProject.title}
                  </h3>

                  <p className="text-sm text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-accent-blue uppercase tracking-wider">
                    Technologies Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono bg-card-dark text-text-secondary px-3 py-1 border border-border-dark"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 py-4 bg-card-dark border-t border-border-dark flex flex-col sm:flex-row justify-between gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 border border-border-dark bg-card-hover text-sm font-mono uppercase tracking-wider text-text-secondary hover:text-accent-blue hover:border-accent-blue/40 transition-colors w-full sm:w-auto"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Code</span>
                </a>

                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-accent-blue hover:bg-blue-600 text-sm font-mono uppercase tracking-wider text-white transition-colors w-full sm:w-auto"
                >
                  <span>Launch Live Demo</span>
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
