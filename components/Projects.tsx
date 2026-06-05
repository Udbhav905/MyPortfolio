'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, X, ChevronLeft, ChevronRight, Code2 } from 'lucide-react';
import { Github } from '@/components/Icons';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  imageUrl: string;
  images?: string[]; // Support for multiple images/screenshots
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
      'Recharts',

    ],
    demoUrl: 'https://scory-one.vercel.app/',
    githubUrl: 'https://github.com/Udbhav905/Scory',
    imageUrl: '/Scoory_1.png',
    images: [
      '/Scoory_1.png',

    ],
  },
  {
    title: 'Estatix Real Estate App',
    description: 'A feature-rich property listing and discovery application built on React Native. It features AI-powered natural language semantic search, interactive map location markers, detailed property owner profiles, and direct chat/contact pipelines. Includes secure admin and owner listing management dashboards.',
    tech: ['React Native', 'Expo', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'AI Search'],
    demoUrl: '#',
    githubUrl: 'https://github.com/Udbhav905/Estatix',
    imageUrl: '/estatix.png',
  },
  {
    title: 'MERN Food Ordering System',
    description: 'A comprehensive, production-ready Full Stack Food Ordering application. It features real-time shopping cart management, menu browsing, item categorization, and secure checkout. Built with MongoDB, Express.js, React.js, and Node.js with secure JWT-based user authentication, order tracking, and an administrative interface to manage menu items and orders.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS', 'Redux Toolkit', 'JWT'],
    demoUrl: 'https://web-foodies.vercel.app/',
    githubUrl: 'https://github.com/Akshay085/Foodie',
    imageUrl: '/Foof_orderSS.png',
  },
  {
    title: 'Movie Ticket Booking Portal',
    description: 'An interactive movie ticket reservation portal built with React. It includes a dynamic visual seat selection layout manager, instant price calculations, genre-based search filters, detailed movie profiles, and ticket purchase simulation. Uses React Context API for state management and CSS Modules for isolated, robust styling.',
    tech: ['React.js', 'CSS Modules', 'Context API', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://movie-booking-ruby.vercel.app/',
    githubUrl: 'https://github.com/Udbhav905/MovieBooking',
    imageUrl: '/Movie.png',
  },



  {
    title: 'Weather Forecast Dashboard',
    description: 'A fast, responsive weather dashboard providing real-time weather analytics. Users can search cities globally to view temperature, wind velocity, humidity, UV index, and 7-day outlook forecasts. Displays custom weather-themed layouts and dynamic visual graphics matching weather conditions.',
    tech: ['React.js', 'OpenWeatherMap API', 'Tailwind CSS', 'Axios', 'CSS Transitions'],
    demoUrl: 'https://weather-app-ecru-zeta-86.vercel.app/',
    githubUrl: 'https://github.com/Udbhav905/WeatherApp',
    imageUrl: '/weather_app.png',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  return (
    <section id="projects" className="relative py-24 px-6 md:px-12 bg-[#0B0E14] border-t border-[#222936]">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest">Selected Works</p>
          <h2 className="text-3xl md:text-5xl font-black text-[#EDF2F7] tracking-tight mt-2 select-none">
            Featured Projects
          </h2>
          <p className="text-sm text-[#A0AEC0] mt-3 max-w-lg">
            A hand-picked selection of web applications and mobile apps that showcase my engineering skills and design aesthetics.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => openProjectModal(project)}
              className="border border-[#222936] bg-[#121720] overflow-hidden flex flex-col justify-between group hover:border-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-1.5 cursor-pointer shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.15)]"
            >
              <div>
                {/* Image Wrap */}
                <div className="relative w-full h-52 bg-[#1A202C] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#0B0E14]/30 group-hover:bg-[#0B0E14]/10 transition-colors duration-300" />

                  {/* Hover indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <span className="px-4 py-2 border border-[#3B82F6] text-xs font-mono uppercase tracking-wider text-white bg-[#3B82F6]/20">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-[#EDF2F7] group-hover:text-[#3B82F6] transition-colors duration-200 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#A0AEC0] leading-relaxed line-clamp-3 h-14">
                    {project.description}
                  </p>

                  {/* Tech stack (subset on main card to keep neat) */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono bg-[#1E2530] text-[#A0AEC0] px-2 py-0.5 border border-[#222936]"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[9px] font-mono text-[#3B82F6] px-1 py-0.5">
                        +{project.tech.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="p-6 pt-0 border-t border-[#222936]/30 flex justify-between items-center mt-4">
                <span className="text-[10px] font-mono text-[#3B82F6] group-hover:underline">Explore Architecture &amp; Live Node</span>
                <span className="text-[#A0AEC0] group-hover:text-[#3B82F6] transition-colors">→</span>
              </div>
            </motion.div>
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
              className="w-full max-w-2xl bg-[#0F1319] border border-[#222936] rounded-xl overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-[#222936] flex items-center justify-between bg-[#121720]">
                <div className="flex items-center space-x-2">
                  <Code2 className="w-4 h-4 text-[#3B82F6]" />
                  <span className="font-mono text-xs text-[#A0AEC0] tracking-widest uppercase">
                    PROJECT DISSECTION
                  </span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 hover:bg-[#1E2530] rounded-lg text-[#A0AEC0] hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Images Carousel */}
                <div className="relative w-full h-64 sm:h-80 bg-[#1A202C] border border-[#222936] overflow-hidden rounded-lg group/carousel">
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
                            className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-[#0B0E14]/80 border border-[#222936] text-white hover:bg-[#3B82F6] transition-colors rounded-none"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => nextImage(selectedProject.images!)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-[#0B0E14]/80 border border-[#222936] text-white hover:bg-[#3B82F6] transition-colors rounded-none"
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
                                className={`w-2 h-2 rounded-none transition-all ${i === currentImageIndex ? 'bg-[#3B82F6] w-4' : 'bg-white/40 hover:bg-white/70'
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
                  <h3 className="text-2xl font-black text-[#EDF2F7]">
                    {selectedProject.title}
                  </h3>

                  <p className="text-sm text-[#A0AEC0] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="space-y-2">
                  <h4 className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
                    Technologies Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono bg-[#121720] text-[#A0AEC0] px-3 py-1 border border-[#222936]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-6 py-4 bg-[#121720] border-t border-[#222936] flex flex-col sm:flex-row justify-between gap-4">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 border border-[#222936] bg-[#1A202C] text-sm font-mono uppercase tracking-wider text-[#A0AEC0] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-colors w-full sm:w-auto"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Code</span>
                </a>

                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-5 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-sm font-mono uppercase tracking-wider text-white transition-colors w-full sm:w-auto"
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
