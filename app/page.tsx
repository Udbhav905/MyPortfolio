import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AiChat from '@/components/AiChat';
import BackToTop from '@/components/BackToTop';
import ScrollReveal from '@/components/ScrollReveal';
import ClientShardBackground from '@/components/ClientShardBackground';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'Udbhav Prajapati | Full-Stack Developer (Web + APP)',
  description: 'Portfolio of Udbhav Prajapati, a skilled Full-Stack Developer (Web & Mobile) specializing in React, Next.js, Node.js, React Native, and Flutter.',
  keywords: ['Udbhav Prajapati', 'Full Stack Developer', 'Portfolio', 'Web Developer', 'React Native Developer'],
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg-dark text-text-primary overflow-x-hidden selection:bg-[#3B82F6]/20 selection:text-text-primary">
      {/* Smooth scrolling handler */}
      <SmoothScroll />

      {/* Dynamic Background */}
      <ClientShardBackground />

      {/* Sticky Navigation Bar */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <ScrollReveal>
          <About />
        </ScrollReveal>

        {/* Skills Section */}
        <ScrollReveal>
          <Skills />
        </ScrollReveal>

        {/* Projects Section */}
        <ScrollReveal>
          <Projects />
        </ScrollReveal>

        {/* Experience Section */}
        <ScrollReveal>
          <Experience />
        </ScrollReveal>

        {/* Education Section */}
        <ScrollReveal>
          <Education />
        </ScrollReveal>

        {/* Certificates Section */}
        <ScrollReveal>
          <Certificates />
        </ScrollReveal>

        {/* Contact Section */}
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>

      {/* Footer & Floating Widgets */}
      <Footer />
      <AiChat />
      <BackToTop />
    </div>
  );
}
