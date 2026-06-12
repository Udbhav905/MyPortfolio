'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const FadeContent = dynamic(() => import('@/lib/reactbits/FadeContent'), { ssr: false });
const SpotlightCard = dynamic(() => import('@/lib/reactbits/SpotlightCard'), { ssr: false });
const CountUp = dynamic(() => import('@/lib/reactbits/CountUp'), { ssr: false });
const PixelTransition = dynamic(() => import('@/lib/reactbits/PixelTransition'), { ssr: false });
const VariableProximity = dynamic(() => import('@/lib/reactbits/VariableProximity'), { ssr: false });

const BIO_PARAGRAPHS = [
  "My interest in software development began when I started exploring how websites are built and how different technologies work together to create interactive user experiences. As I learned HTML, CSS, and JavaScript, I began building small projects that helped me develop a strong foundation in web development and sparked my interest in full-stack technologies.",
  "As a Full Stack MERN Developer Intern, I have gained hands-on experience working with MongoDB, Express.js, React.js, and Node.js. I have contributed to developing responsive web applications, integrating RESTful APIs, managing application state, and implementing user-focused features while following modern development practices.",
  "During my internship at Groovy Technoweb Pvt. Ltd., I collaborated with experienced developers on real-world projects, participated in debugging and testing processes, optimized UI components, and learned how software is developed within an Agile and team-oriented environment. This experience strengthened both my technical and problem-solving skills.",
  "I am passionate about continuously improving my development skills and staying up to date with modern technologies. My goal is to build scalable, maintainable, and user-friendly applications while gaining deeper expertise in full-stack development and software engineering best practices.",
];

export default function About() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark">
      <div className="max-w-6xl mx-auto">
        <FadeContent blur={true} duration={0.6} threshold={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <p className="font-mono text-xs text-accent-blue uppercase tracking-widest">About Me</p>
                <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-2 select-none">
                  My Story
                </h2>
              </div>

              {/* Photo Card wrapped in SpotlightCard */}
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.12)" className="border border-border-dark bg-card-dark p-4 overflow-hidden rounded-none">
                <div className="relative w-full h-[250px] md:h-[350px] lg:h-[200px]">
                  <PixelTransition
                    firstContent={<Image src="/my_image.jpg" alt="Udbhav Prajapati" fill className="object-cover" />}
                    secondContent={
                      <div className="w-full h-full flex flex-col items-center justify-center bg-bg-dark text-accent-blue font-mono font-bold tracking-widest uppercase border border-accent-blue/30 p-4 text-center">
                        <p className="text-xl">Hi There!</p>
                        <p className="text-xs text-text-secondary mt-2">I am Udbhav</p>
                      </div>
                    }
                    gridSize={12}
                    pixelColor="#d9e1eeff"
                    animationStepDuration={0.4}
                    aspectRatio="0"
                  />
                </div>
              </SpotlightCard>

              {/* Stat Counter wrapped in SpotlightCard */}
              <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.12)" className="border border-border-dark bg-card-dark p-6 md:p-8 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden group hover:border-accent-blue/30 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-blue to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                {/* CountUp component from ReactBits */}
                <div className="flex items-baseline text-5xl md:text-7xl font-mono font-black text-accent-blue select-none">
                  <CountUp to={4} duration={1.5} startWhen={true} />
                  <span>+</span>
                </div>

                <p className="text-xs font-mono uppercase tracking-wider text-text-secondary">
                  Months of Coding &amp; App Development
                </p>
                <p className="text-[10px] font-mono text-text-secondary/60">
                  Professionally Interned
                </p>
              </SpotlightCard>
            </div>

            {/* RIGHT COLUMN — VariableProximity bio text */}
            <div className="lg:col-span-8" ref={containerRef}>
              <div className="space-y-6 text-text-secondary leading-relaxed">
                {BIO_PARAGRAPHS.map((para, i) => (
                  <p key={i} className="text-sm md:text-base">
                    <VariableProximity
                      label={para}
                      containerRef={containerRef}
                      fromFontVariationSettings="'wght' 300, 'opsz' 9"
                      toFontVariationSettings="'wght' 800, 'opsz' 40"
                      radius={120}
                      falloff="linear"
                    />
                  </p>
                ))}

                {/* Highlight stat line */}
                <p className="text-accent-blue font-bold text-base md:text-lg">
                  <VariableProximity
                    label="2+ Years of Self-Learning Experience • 4 Months of Professional Internship Experience"
                    containerRef={containerRef}
                    fromFontVariationSettings="'wght' 500, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    radius={150}
                    falloff="gaussian"
                  />
                </p>
              </div>
            </div>

          </div>
        </FadeContent>
      </div>
    </section>
  );
}