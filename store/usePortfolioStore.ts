import { create } from 'zustand';

interface PortfolioState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  
  nesGameActive: boolean;
  setNesGameActive: (active: boolean) => void;
  
  resonanceScore: number;
  incrementResonance: (amount: number) => void;
  
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  liveFingerprint: string;
  setLiveFingerprint: (activity: string) => void;
  
  cursorHovering: boolean;
  setCursorHovering: (hovering: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      if (nextTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.style.setProperty('--background', '#F4F4F6');
        document.documentElement.style.setProperty('--foreground', '#0A0A0F');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.style.setProperty('--background', '#0A0A0F');
        document.documentElement.style.setProperty('--foreground', '#E2E8F0');
      }
    }
    return { theme: nextTheme };
  }),
  setTheme: (theme) => set(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.style.setProperty('--background', '#F4F4F6');
        document.documentElement.style.setProperty('--foreground', '#0A0A0F');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.style.setProperty('--background', '#0A0A0F');
        document.documentElement.style.setProperty('--foreground', '#E2E8F0');
      }
    }
    return { theme };
  }),
  
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set(() => ({ commandPaletteOpen: open })),
  
  nesGameActive: false,
  setNesGameActive: (active) => set((state) => {
    // Increase resonance score when user finds/activates the easter egg
    const addedScore = active ? 20 : 0;
    return { 
      nesGameActive: active, 
      resonanceScore: Math.min(100, state.resonanceScore + addedScore)
    };
  }),
  
  resonanceScore: 10, // Start with a base resonance of 10
  incrementResonance: (amount) => set((state) => {
    const newScore = Math.min(100, state.resonanceScore + amount);
    return { resonanceScore: newScore };
  }),
  
  activeSection: 'hero',
  setActiveSection: (section) => set(() => ({ activeSection: section })),
  
  liveFingerprint: 'initializing system kernels...',
  setLiveFingerprint: (activity) => set(() => ({ liveFingerprint: activity })),
  
  cursorHovering: false,
  setCursorHovering: (hovering) => set(() => ({ cursorHovering: hovering })),
}));
