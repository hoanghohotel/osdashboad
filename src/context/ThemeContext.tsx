import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AccentColor, ThemeMode } from '../types/dashboard';
import { WALLPAPER_PRESETS, WallpaperId, WallpaperPreset } from '../data/wallpapers';

interface ThemeContextValue {
  mode: ThemeMode;
  accent: AccentColor;
  highRefraction: boolean;
  wallpaperId: WallpaperId;
  activeWallpaper: WallpaperPreset;
  customWallpaperUrl: string;
  wallpaperBlur: number;
  wallpaperDim: number;
  wallpaperDimming: boolean;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  setAccent: (accent: AccentColor) => void;
  setHighRefraction: (val: boolean) => void;
  setWallpaperId: (id: WallpaperId) => void;
  setCustomWallpaperUrl: (url: string | null) => void;
  setWallpaperBlur: (blurPx: number) => void;
  setWallpaperDim: (dimPercent: number) => void;
  setWallpaperDimming: (enabled: boolean) => void;
  cycleNextWallpaper: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_THEME_KEY = 'auraos_theme_mode';
const STORAGE_ACCENT_KEY = 'auraos_accent_color';
const STORAGE_REFRACTION_KEY = 'auraos_high_refraction';
const STORAGE_WALLPAPER_KEY = 'auraos_wallpaper_id';
const STORAGE_CUSTOM_WALLPAPER_KEY = 'auraos_custom_wallpaper_url';
const STORAGE_WALLPAPER_BLUR_KEY = 'auraos_wallpaper_blur';
const STORAGE_WALLPAPER_DIM_KEY = 'auraos_wallpaper_dim';

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
    return 'light';
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

  const [wallpaperId, setWallpaperIdState] = useState<WallpaperId>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_WALLPAPER_KEY) as WallpaperId | null;
      if (saved && WALLPAPER_PRESETS.some((w) => w.id === saved)) {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'tahoe-liquid-waves';
  });

  const [customWallpaperUrl, setCustomWallpaperUrlState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_CUSTOM_WALLPAPER_KEY) || '';
    } catch {
      return '';
    }
  });

  const [wallpaperBlur, setWallpaperBlurState] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_WALLPAPER_BLUR_KEY));
      if (!Number.isNaN(saved) && saved >= 0 && saved <= 32) return saved;
    } catch {
      // ignore
    }
    return 0;
  });

  const [wallpaperDim, setWallpaperDimState] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem(STORAGE_WALLPAPER_DIM_KEY));
      if (!Number.isNaN(saved) && saved >= 0 && saved <= 75) return saved;
    } catch {
      // ignore
    }
    return 22;
  });

  const activeWallpaper = useMemo<WallpaperPreset>(() => {
    return (
      WALLPAPER_PRESETS.find((w) => w.id === wallpaperId) || WALLPAPER_PRESETS[0]
    );
  }, [wallpaperId]);

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

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--orb-1', activeWallpaper.orb1);
    root.style.setProperty('--orb-2', activeWallpaper.orb2);
    root.style.setProperty('--orb-3', activeWallpaper.orb3);
    try {
      localStorage.setItem(STORAGE_WALLPAPER_KEY, wallpaperId);
    } catch {
      // ignore
    }
  }, [wallpaperId, activeWallpaper]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_WALLPAPER_KEY, customWallpaperUrl);
    } catch {
      // ignore
    }
  }, [customWallpaperUrl]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WALLPAPER_BLUR_KEY, String(wallpaperBlur));
    } catch {
      // ignore
    }
  }, [wallpaperBlur]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WALLPAPER_DIM_KEY, String(wallpaperDim));
    } catch {
      // ignore
    }
  }, [wallpaperDim]);

  const setMode = (newMode: ThemeMode) => setModeState(newMode);
  const toggleMode = () => setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  const setAccent = (newAccent: AccentColor) => setAccentState(newAccent);
  const setHighRefraction = (val: boolean) => setHighRefractionState(val);
  const setWallpaperId = (id: WallpaperId) => {
    setCustomWallpaperUrlState('');
    setWallpaperIdState(id);
  };
  const setCustomWallpaperUrl = (url: string | null) => setCustomWallpaperUrlState(url || '');
  const setWallpaperBlur = (blurPx: number) => setWallpaperBlurState(blurPx);
  const setWallpaperDim = (dimPercent: number) => setWallpaperDimState(dimPercent);
  const setWallpaperDimming = (enabled: boolean) => setWallpaperDimState(enabled ? 38 : 14);

  const cycleNextWallpaper = () => {
    setCustomWallpaperUrlState('');
    const idx = WALLPAPER_PRESETS.findIndex((w) => w.id === wallpaperId);
    const next = WALLPAPER_PRESETS[(idx + 1) % WALLPAPER_PRESETS.length];
    setWallpaperIdState(next.id);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accent,
        highRefraction,
        wallpaperId,
        activeWallpaper,
        customWallpaperUrl,
        wallpaperBlur,
        wallpaperDim,
        wallpaperDimming: wallpaperDim >= 30,
        setMode,
        toggleMode,
        setAccent,
        setHighRefraction,
        setWallpaperId,
        setCustomWallpaperUrl,
        setWallpaperBlur,
        setWallpaperDim,
        setWallpaperDimming,
        cycleNextWallpaper,
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
