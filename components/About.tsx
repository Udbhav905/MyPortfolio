"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

function MonthCounter({ targetValue }: { targetValue: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 1500; // ms
      const incrementTime = Math.floor(duration / targetValue);
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= targetValue) {
          clearInterval(timer);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <span ref={ref} className="text-5xl md:text-7xl font-mono font-black text-[#3B82F6] select-none">
      {count}+
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 md:px-12 bg-[#0B0E14] border-t border-[#222936] linear-glow-top">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Header & Stats Card */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <p className="font-mono text-xs text-[#3B82F6] uppercase tracking-widest">About Me</p>
              <h2 className="text-3xl md:text-5xl font-black text-[#EDF2F7] tracking-tight mt-2 select-none">My Story</h2>
            </div>

            {/* Experience Year Counter Card */}
            <div className="border border-[#222936] bg-[#121720] p-8 flex flex-col justify-center items-center text-center space-y-2 relative overflow-hidden group hover:border-[#3B82F6]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <MonthCounter targetValue={3} />

              <p className="text-xs font-mono uppercase tracking-wider text-[#A0AEC0]">Months of Coding & App Development</p>
              <p className="text-[10px] font-mono text-[#5A6E85]">Self-Taught & Professionally Interned</p>
            </div>
          </div>

          {/* Journey paragraphs */}
          <div className="lg:col-span-8 space-y-6 text-[#A0AEC0] text-sm md:text-base leading-relaxed">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
              <p>My interest in software development began when I started exploring how websites are built and how different technologies work together to create interactive user experiences. As I learned HTML, CSS, and JavaScript, I began building small projects that helped me develop a strong foundation in web development and sparked my interest in full-stack technologies.</p>

              <p>As a Full Stack MERN Developer Intern, I have gained hands-on experience working with MongoDB, Express.js, React.js, and Node.js. I have contributed to developing responsive web applications, integrating RESTful APIs, managing application state, and implementing user-focused features while following modern development practices.</p>

              <p>During my internship at Groovy Technoweb Pvt. Ltd., I collaborated with experienced developers on real-world projects, participated in debugging and testing processes, optimized UI components, and learned how software is developed within an Agile and team-oriented environment. This experience strengthened both my technical and problem-solving skills.</p>

              <p>I am passionate about continuously improving my development skills and staying up to date with modern technologies. My goal is to build scalable, maintainable, and user-friendly applications while gaining deeper expertise in full-stack development and software engineering best practices.</p>
              <p className="text-[#3B82F6] font-bold text-lg mb-4">
  2+ Years of Self-Learning Experience • 6 Months of Professional Internship Experience
</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
