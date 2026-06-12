'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

export default function FadeContent({ children, blur, duration = 0.6, delay = 0, threshold = 0.1, initialOpacity = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : initialOpacity,
      filter: blur ? (visible ? 'blur(0px)' : 'blur(8px)') : undefined,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity ${duration}s ease ${delay}s, filter ${duration}s ease ${delay}s, transform ${duration}s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}
