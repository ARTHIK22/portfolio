// src/context/MotionContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface MotionContextType {
  isMotionEnabled: boolean;
  toggleMotion: () => void;
  setMotionEnabled: (enabled: boolean) => void;
}

const MotionContext = createContext<MotionContextType>({
  isMotionEnabled: true,
  toggleMotion: () => {},
  setMotionEnabled: () => {},
});

const STORAGE_KEY = 'aurora_motion_preference';

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMotionEnabled, setIsMotionEnabled] = useState<boolean>(() => {
    try {
      // Check localStorage first
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        return stored === 'true';
      }
      // Check system prefers-reduced-motion
      if (typeof window !== 'undefined' && window.matchMedia) {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        return !prefersReduced;
      }
    } catch {
      // Graceful fallback if localStorage is restricted
    }
    return true;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(isMotionEnabled));
    } catch {
      // Storage unavailable
    }

    if (!isMotionEnabled) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [isMotionEnabled]);

  // Listen to OS prefers-reduced-motion changes if no explicit user override is stored
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(STORAGE_KEY) === null) {
          setIsMotionEnabled(!e.matches);
        }
      } catch {
        setIsMotionEnabled(!e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleMotion = () => {
    setIsMotionEnabled((prev) => !prev);
  };

  const setMotionEnabled = (enabled: boolean) => {
    setIsMotionEnabled(enabled);
  };

  return (
    <MotionContext.Provider value={{ isMotionEnabled, toggleMotion, setMotionEnabled }}>
      {children}
    </MotionContext.Provider>
  );
};

export const useMotion = () => useContext(MotionContext);
