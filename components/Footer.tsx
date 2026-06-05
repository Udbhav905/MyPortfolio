'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="relative border-t border-[#222936] bg-[#0B0E14] py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left select-none">
        
        {/* Brand & copyright */}
        <div className="space-y-1">
          <p className="font-mono text-xs text-[#EDF2F7] uppercase tracking-wider font-bold">
            Udbhav Prajapati
          </p>
          <p className="text-[10px] text-[#5A6E85] font-mono">
            &copy; {new Date().getFullYear()} UDBHAV.PRAJAPATI❤️
            </p>
        </div>

        {/* Next.js + Tailwind badge */}
        <div className="flex items-center space-x-2 border border-[#222936] bg-[#121720] px-4 py-2 text-xs font-mono text-[#A0AEC0]">
          <span className="w-1.5 h-1.5 bg-[#3B82F6] animate-pulse" />
          <span>Built with</span>
          <span className="text-[#EDF2F7] font-semibold">Next.js 14</span>
          <span>+</span>
          <span className="text-[#EDF2F7] font-semibold">Tailwind CSS</span>
        </div>

      </div>
    </footer>
  );
}
