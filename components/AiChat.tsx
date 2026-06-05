'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Setup initial greeting message
  useEffect(() => {
    setMessages([
      {
        id: 'init-1',
        sender: 'ai',
        text: "System Online. Udbhav AI Assistant initialized. Ask me anything about my full-stack web and app developer experience, my BCA degree, my internship at Groovy Technoweb, or my projects like the Food Ordering System!",
        timestamp: new Date()
      }
    ]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    const userMessage: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: userMsg,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const responseText = getAiResponse(userMsg);
      const aiMessage: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 800);
  };

  // True answer keyword routing (No dummy answers)
  const getAiResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Greeting
    if (q.includes('hello') || q.includes('hi ') || q.includes('hey') || q.includes('greetings') || q.includes('yo ')) {
      return "Hi there! I am Udbhav's virtual assistant. I can give you accurate details about his career, stack, and academic background. What would you like to know?";
    }

    // Skills
    if (q.includes('skill') || q.includes('stack') || q.includes('technology') || q.includes('languages') || q.includes('framework') || q.includes('code') || q.includes('frontend') || q.includes('backend')) {
      return "Udbhav is skilled in Frontend development (React, Next.js, TypeScript, HTML/CSS, Tailwind) and Backend engineering (Node.js, Express, REST APIs). He also builds mobile apps (React Native, Flutter) and integrates databases (MongoDB, PostgreSQL).";
    }

    // Experience / Internship
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('intern') || q.includes('company') || q.includes('groovy')) {
      return "Udbhav worked as a Frontend Developer Intern at Groovy Technoweb Pvt. Ltd. from December 2, 2024 to March 30, 2025. There, he gained hands-on experience building responsive web pages with JavaScript libraries, refactoring CSS layouts, and collaborating in agile teams.";
    }

    // Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('built') || q.includes('movie') || q.includes('food') || q.includes('saas') || q.includes('fittrack') || q.includes('app')) {
      return "Udbhav has built several notable projects: \n1. Food Ordering System (MERN Stack with real-time shopping cart)\n2. Movie Booking FrontEnd (React with Context API & CSS Modules)\n3. FitTrack Mobile App (React Native + Expo fitness journal)\n4. TaskFlow SaaS Dashboard (Next.js 14 + Tailwind + PostgreSQL). Check them out in the Projects section!";
    }

    // Education & Certificates
    if (q.includes('education') || q.includes('degree') || q.includes('study') || q.includes('university') || q.includes('bca') || q.includes('certificate')) {
      return "Udbhav is completing his Bachelor of Computer Applications (BCA) in 2025. He also holds three major certifications:\n- DSA Problem Solving Certificate from Google (Sep 2025)\n- React & Redux Certificate from KG Coding (May 2025)\n- Fullstack Developer Certificate from OneRoadMap (May 2025).";
    }

    // Contact / Email
    if (q.includes('hire') || q.includes('contract') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('github') || q.includes('linkedin')) {
      return "You can contact Udbhav directly at udbhavprajapati909@gmail.com. His GitHub profile is github.com/udbhavprajapati and his LinkedIn network is linkedin.com/in/udbhav-prajapati. He is ready to join full-time or intern roles immediately!";
    }

    // Fallbacks
    const fallbacks = [
      "I am trained on Udbhav's real portfolio data. Ask me about his BCA coursework, his React Native skills, or his achievements during his Groovy Technoweb internship.",
      "Udbhav specializes in full-stack web and mobile application engineering. Feel free to ask about his specific projects or how to schedule an interview with him.",
      "Udbhav is active in developing high-performance interfaces. If you want to check his code, ask for his GitHub link, or ask me 'tell me about your work experience'."
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  };

  const quickQuestions = [
    { text: "What is your experience?", query: "Tell me about your internship experience" },
    { text: "List your projects", query: "What projects have you built?" },
    { text: "How to contact you?", query: "How can I contact or hire you?" },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 rounded-none bg-[#121720] border border-[#3B82F6]/50 text-[#3B82F6] shadow-xl hover:border-[#3B82F6] transition-all cursor-pointer flex items-center justify-center relative group"
          aria-label="Toggle AI Assistant"
        >
          <MessageSquare className="w-6 h-6 relative z-10" />
        </button>
      </div>

      {/* Chat Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 left-6 md:left-auto w-auto md:w-[380px] h-[480px] max-h-[calc(100vh-120px)] border border-[#222936] bg-[#121720] shadow-2xl z-40 flex flex-col rounded-none"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#222936] flex items-center justify-between bg-[#0B0E14]">
              <div className="flex items-center space-x-2.5">
                <Bot className="w-4.5 h-4.5 text-[#3B82F6] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-widest text-[#EDF2F7] uppercase">
                  UDBHAV-ASSISTANT v1.0
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#222936] text-[#A0AEC0] hover:text-[#EDF2F7] transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0B0E14]/30 scrollbar-thin">
              {messages.map((m) => {
                const isAi = m.sender === 'ai';
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isAi ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`p-1.5 border border-[#222936] ${
                      isAi ? 'bg-[#121720] text-[#3B82F6]' : 'bg-[#121720] text-[#10B981]'
                    }`}>
                      {isAi ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                    </div>
                    
                    <div className={`max-w-[80%] px-3 py-2 text-xs font-sans leading-relaxed border ${
                      isAi 
                        ? 'bg-[#121720] border-[#222936] text-[#EDF2F7]' 
                        : 'bg-[#3B82F6]/10 border-[#3B82F6]/30 text-[#EDF2F7]'
                    } whitespace-pre-line`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
              
              {isTyping && (
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 border border-[#222936] bg-[#121720] text-[#3B82F6]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-3 py-2 text-xs font-mono border border-[#222936] bg-[#121720] text-[#3B82F6] flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && !isTyping && (
              <div className="p-3 border-t border-[#222936] bg-[#0B0E14] flex gap-2 overflow-x-auto select-none">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(q.query);
                      // Trigger submit
                      setTimeout(() => handleSend(), 50);
                    }}
                    className="flex-shrink-0 px-2.5 py-1 text-[10px] font-mono border border-[#222936] bg-[#121720] text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors cursor-pointer rounded-none"
                  >
                    {q.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-[#222936] bg-[#0B0E14] flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask AI Assistant..."
                className="flex-grow bg-[#121720] border border-[#222936] focus:border-[#3B82F6] text-[#EDF2F7] px-3 py-2 text-xs focus:outline-none transition-colors rounded-none placeholder-[#5A6E85]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="p-2 border border-[#222936] bg-[#121720] text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed rounded-none"
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
