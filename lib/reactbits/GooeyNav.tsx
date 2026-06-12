'use client';
import React, { useState } from 'react';

interface Item { label: string; href: string; }
interface Props { items: Item[]; }

export default function GooeyNav({ items }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = (href: string) => {
    setOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Expanded menu items */}
      {open && (
        <div style={{
          position: 'absolute', bottom: '56px', right: 0,
          display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end',
        }}>
          {items.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              style={{
                padding: '8px 16px',
                background: 'rgba(11,14,20,0.95)',
                border: '1px solid #222936',
                color: '#EDF2F7',
                fontFamily: 'monospace',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Navigation menu"
        style={{
          width: '48px', height: '48px',
          background: open ? '#3B82F6' : 'rgba(11,14,20,0.95)',
          border: '1px solid #3B82F6',
          color: open ? '#fff' : '#3B82F6',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease',
        }}
      >
        {open ? '✕' : '☰'}
      </button>
    </div>
  );
}
