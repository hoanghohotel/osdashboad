import React, { createContext, useContext, useEffect, useState } from 'react';
import { AccentColor, ThemeMode } from '../types/dashboard';

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  highRefraction: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setAccent: (accent: AccentColor) => void;
  setHighRefraction: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_THEME_KEY = 'auraos_theme_mode';
const STORAGE_ACCENT_KEY = 'auraos_accent_color';
const STORAGE_REFRACTION_KEY = 'auraos_high_refraction';

export const ACCENT_SWATCHES: { id: AccentColor; hex: string; darkHex: string }[] = [
  { id: 'blue', hex: '#007AFF', darkHex: '#0A84FF' },
  { id: 'purple', hex: '#9333EA', darkHex: '#BF5AF2' },
  { id: 'pink', hex: '#E11D48', darkHex: '#FF375F' },
  { id: 'orange', hex: '#EA580C', darkHex: '#FF9F0A' },
  { id: 'green', hex: '#059669', darkHex: '#30D158' },
  { id: 'graphite', hex: '#475569', darkHex: '#94A3B8' },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode | null;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore storage errors
    }
    return 'dark';
  });

  const [accent, setAccentState] = useState<AccentColor>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACCENT_KEY) as AccentColor | null;
      if (saved && ['blue', 'purple', 'pink', 'orange', 'green', 'graphite'].includes(saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'blue';
  });

  const [highRefraction, setHighRefractionState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REFRACTION_KEY);
      return saved ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_THEME_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-accent', accent);
    try {
      localStorage.setItem(STORAGE_ACCENT_KEY, accent);
    } catch {
      // ignore
    }
  }, [accent]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--blur-primary', highRefraction ? '28px' : '16px');
    root.style.setProperty('--blur-secondary', highRefraction ? '20px' : '12px');
    try {
      localStorage.setItem(STORAGE_REFRACTION_KEY, String(highRefraction));
    } catch {
      // ignore
    }
  }, [highRefraction]);

  const setMode = (newMode: ThemeMode) => setModeState(newMode);
  const toggleMode = () => setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  const setAccent = (newAccent: AccentColor) => setAccentState(newAccent);
  const setHighRefraction = (val: boolean) => setHighRefractionState(val);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accent,
        highRefraction,
        setMode,
        toggleMode,
        setAccent,
        setHighRefraction,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
