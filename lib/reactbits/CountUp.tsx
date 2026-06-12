'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
}

export default function CountUp({ to, from = 0, duration = 1.5, delay = 0, className = '', startWhen = true, separator = '' }: Props) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!startWhen || started.current) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || started.current) return;
      started.current = true;
      obs.disconnect();
      const start = performance.now() + delay * 1000;
      const tick = (now: number) => {
        const elapsed = Math.max(0, now - start);
        const progress = Math.min(elapsed / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(from + (to - from) * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [startWhen, to, from, duration, delay]);

  const display = separator ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator) : val.toString();
  return <span ref={ref} className={className}>{display}</span>;
}
