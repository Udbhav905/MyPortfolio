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
import PerformanceWidgets from '@/components/PerformanceWidgets';

export const metadata = {
  title: 'Udbhav Prajapati | Full-Stack Developer Portfolio',
  description: 'Explore the portfolio of Udbhav Prajapati, a Full-Stack Web & Mobile Developer specializing in React, Next.js, Node.js, MongoDB, React Native, and Flutter. View featured projects, tech stack, and experience.',
  keywords: [
    'Udbhav Prajapati',
    'Udbhav',
    'Udbhav Portfolio',
    'Udbhav Prajapati Portfolio',
    'Full-Stack Developer',
    'Web Developer',
    'Mobile App Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'React Native',
    'Flutter',
    'MERN Stack',
    'Software Engineer'
  ],
  alternates: {
    canonical: 'https://udbhavprajapati.vercel.app',
  },
  openGraph: {
    title: 'Udbhav Prajapati | Full-Stack Developer Portfolio',
    description: 'Explore the portfolio of Udbhav Prajapati, a Full-Stack Web & Mobile Developer specializing in React, Next.js, Node.js, MongoDB, React Native, and Flutter.',
    url: 'https://udbhavprajapati.vercel.app',
    siteName: 'Udbhav Prajapati Portfolio',
    images: [
      {
        url: 'https://udbhavprajapati.vercel.app/luxuria.png',
        width: 1200,
        height: 630,
        alt: 'Udbhav Prajapati Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Udbhav Prajapati | Full-Stack Developer Portfolio',
    description: 'Explore the portfolio of Udbhav Prajapati, a Full-Stack Web & Mobile Developer.',
    images: ['https://udbhavprajapati.vercel.app/luxuria.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-bg-dark text-text-primary overflow-x-hidden selection:bg-[#3B82F6]/20 selection:text-text-primary">
      {/* Dynamic background and client-side widgets */}
      <PerformanceWidgets />

      {/* Sticky Navigation Bar */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Skills Section */}
        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Experience Section */}
        <Experience />

        {/* Education Section */}
        <Education />

        {/* Certificates Section */}
        <Certificates />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer & Floating Widgets */}
      <Footer />
      <PerformanceWidgets />
    </div>
  );
}
