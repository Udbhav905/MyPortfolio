'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { Github, Linkedin } from '@/components/Icons';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const SpotlightCard = dynamic(() => import('@/lib/reactbits/SpotlightCard'), { ssr: false });
const ClickSpark = dynamic(() => import('@/lib/reactbits/ClickSpark'), { ssr: false });
const Bounce = dynamic(() => import('@/lib/reactbits/Bounce'), { ssr: false });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setShowToast(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      alert('Failed to send message. Please try again or email directly.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <section id="contact" className="relative py-24 px-6 md:px-12 bg-bg-dark border-t border-border-dark">
      <div className="max-w-5xl mx-auto">

        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-xs text-accent-blue uppercase tracking-widest">Get In Touch</p>
          <h2 className="text-3xl md:text-5xl font-black text-text-primary tracking-tight mt-2 select-none">
            Contact Me
          </h2>
          <p className="text-sm text-text-secondary mt-3 max-w-lg">
            Have a project in mind, looking for a frontend/full-stack intern, or just want to connect? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info Details */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-text-primary border-b border-border-dark pb-3">
              Direct Channels
            </h3>

            <div className="space-y-6">
              <a
                href="mailto:udbhavprajapati909@gmail.com"
                className="flex items-center space-x-4 p-4 border border-border-dark bg-card-dark hover:border-accent-blue/30 text-text-secondary hover:text-text-primary transition-all duration-200 group"
              >
                <div className="p-2 border border-border-dark text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary/60">Email Address</p>
                  <p className="text-sm font-semibold">udbhavprajapati909@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/Udbhav905"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 border border-border-dark bg-card-dark hover:border-accent-blue/30 text-text-secondary hover:text-text-primary transition-all duration-200 group"
              >
                <div className="p-2 border border-border-dark text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary/60">GitHub Profile</p>
                  <p className="text-sm font-semibold">github.com/udbhavprajapati</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/udbhav-prajapati-485841332"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 border border-border-dark bg-card-dark hover:border-accent-blue/30 text-text-secondary hover:text-text-primary transition-all duration-200 group"
              >
                <div className="p-2 border border-border-dark text-text-secondary group-hover:text-accent-blue group-hover:border-accent-blue/30 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-secondary/60">LinkedIn Network</p>
                  <p className="text-sm font-semibold">linkedin.com/in/udbhav-prajapati</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form wrapped in SpotlightCard */}
          <div className="lg:col-span-7">
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)" className="border border-border-dark bg-card-dark p-8 rounded-none">
              <h3 className="text-lg font-mono font-bold uppercase tracking-wider text-text-primary border-b border-border-dark/30 pb-3 mb-6">
                Write a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-bg-dark border border-border-dark focus:border-accent-blue text-text-primary px-4 py-3 text-sm focus:outline-none transition-colors rounded-none"
                      placeholder="Udbhav Prajapati"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-bg-dark border border-border-dark focus:border-accent-blue text-text-primary px-4 py-3 text-sm focus:outline-none transition-colors rounded-none"
                      placeholder="yourmail@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-bg-dark border border-border-dark focus:border-accent-blue text-text-primary px-4 py-3 text-sm focus:outline-none transition-colors rounded-none"
                    placeholder="+91"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-wider text-text-secondary">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-bg-dark border border-border-dark focus:border-accent-blue text-text-primary px-4 py-3 text-sm focus:outline-none transition-colors rounded-none resize-none"
                    placeholder="Hey Udbhav, I would like to chat about..."
                  />
                </div>

                {/* Submit button wrapped in ClickSpark */}
                <ClickSpark sparkColor="#3B82F6" sparkCount={8} sparkRadius={18}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 border border-accent-blue bg-accent-blue/10 hover:bg-accent-blue/20 disabled:bg-card-hover disabled:border-border-dark text-accent-blue hover:text-blue-400 disabled:text-text-secondary/60 font-mono text-xs uppercase tracking-widest transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed rounded-none"
                  >
                    {isSubmitting ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </ClickSpark>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* Toast Success Notification */}
      <AnimatePresence>
        {showToast && (
          <div className="fixed bottom-6 right-6 z-50">
            <Bounce>
              <div className="bg-card-dark border border-accent-blue text-text-primary px-6 py-4 flex items-center space-x-3 shadow-2xl rounded-none">
                <div className="w-5 h-5 bg-accent-blue/25 border border-accent-blue text-accent-blue flex items-center justify-center text-xs font-bold rounded-none select-none">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-text-primary font-bold">
                    Message sent successfully!
                  </p>
                  <p className="text-[10px] text-text-secondary/70 font-mono">
                    Thank you for connecting! I will reply shortly.
                  </p>
                </div>
              </div>
            </Bounce>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
