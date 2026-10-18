import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const LiquidBackground: React.FC = () => {
  const { mode } = useTheme();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none"
      style={{ backgroundColor: 'var(--bg-canvas)' }}
    >
      {/* Subtle Ambient Mesh Base */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            mode === 'dark'
              ? 'radial-gradient(circle at 16% 18%, var(--orb-1), transparent 46%), radial-gradient(circle at 84% 22%, var(--orb-2), transparent 48%), radial-gradient(circle at 52% 82%, var(--orb-3), transparent 52%)'
              : 'radial-gradient(circle at 14% 16%, var(--orb-1), transparent 48%), radial-gradient(circle at 86% 20%, var(--orb-2), transparent 46%), radial-gradient(circle at 54% 84%, var(--orb-3), transparent 54%)',
        }}
      />

      {/* 3D Refracting Glass Orb 1 - Top Left */}
      <div
        className="absolute -top-24 -left-16 w-[440px] h-[440px] rounded-full opacity-75"
        style={{
          background:
            mode === 'dark'
              ? 'radial-gradient(circle at 32% 30%, rgba(255, 255, 255, 0.14), var(--orb-1) 52%, transparent 74%)'
              : 'radial-gradient(circle at 32% 30%, rgba(255, 255, 255, 0.9), var(--orb-1) 56%, transparent 76%)',
          filter: 'blur(36px)',
        }}
      />

      {/* 3D Refracting Glass Sphere 2 - Top Right */}
      <div
        className="absolute top-[12%] right-[6%] w-[360px] h-[360px] rounded-full opacity-70"
        style={{
          background:
            mode === 'dark'
              ? 'radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.1), var(--orb-2) 55%, transparent 75%)'
              : 'radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.85), var(--orb-2) 58%, transparent 78%)',
          filter: 'blur(42px)',
        }}
      />

      {/* Specular 3D Glass Lens Accent - Subtle geometric depth behind cards */}
      <div
        className="hidden lg:block absolute top-[28%] left-[38%] w-64 h-64 rounded-full"
        style={{
          background:
            mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.12) 100%)',
          boxShadow:
            mode === 'dark'
              ? 'inset 0 1px 2px rgba(255,255,255,0.12)'
              : 'inset 0 2px 4px rgba(255,255,255,0.8)',
          filter: 'blur(2px)',
          opacity: 0.45,
        }}
      />

      {/* Fine Architectural Grid Overlay for Desktop Depth */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
};
