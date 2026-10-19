import React, { useState } from 'react';
import { ACCENT_SWATCHES, useTheme } from '../context/ThemeContext';
import { LANGUAGE_OPTIONS, useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { WALLPAPER_PRESETS } from '../data/wallpapers';
import { FaIcon } from './ui/liquid-shadcn';

interface ControlCenterPopoverProps {
  onLockWorkspace?: () => void;
}

export const ControlCenterPopover: React.FC<ControlCenterPopoverProps> = ({
  onLockWorkspace,
}) => {
  const {
    mode,
    toggleMode,
    accent,
    setAccent,
    highRefraction,
    setHighRefraction,
    wallpaperId,
    customWallpaperUrl,
    setWallpaperId,
  } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { addToast } = useToast();

  const [focusActive, setFocusActive] = useState(true);
  const [silentMode, setSilentMode] = useState(true);
  const [brightness, setBrightness] = useState(82);
  const [soundLevel, setSoundLevel] = useState(0);

  const glassCircleStyle: React.CSSProperties = {
    background:
      mode === 'dark'
        ? 'linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 100%)'
        : 'linear-gradient(145deg, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.42) 100%)',
    backdropFilter: 'blur(24px) saturate(190%)',
    WebkitBackdropFilter: 'blur(24px) saturate(190%)',
    boxShadow:
      mode === 'dark'
        ? 'inset 0 1px 1px rgba(255,255,255,0.28), inset 0 -1px 1px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.35)'
        : 'inset 0 1.5px 2px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(15,23,42,0.06), 0 8px 20px rgba(15,23,42,0.08)',
    border:
      mode === 'dark'
        ? '1px solid rgba(255,255,255,0.16)'
        : '1px solid rgba(255,255,255,0.65)',
  };

  return (
    <div
      className="w-[310px] rounded-[32px] p-4 select-none space-y-4 animate-in fade-in zoom-in-95 duration-150"
      style={{
        background:
          mode === 'dark'
            ? 'rgba(18, 24, 34, 0.72)'
            : 'rgba(245, 247, 252, 0.72)',
        backdropFilter: 'blur(36px) saturate(200%)',
        WebkitBackdropFilter: 'blur(36px) saturate(200%)',
        boxShadow:
          mode === 'dark'
            ? 'inset 0 1px 1px rgba(255,255,255,0.22), 0 28px 60px rgba(0,0,0,0.65)'
            : 'inset 0 1.5px 2px rgba(255,255,255,0.9), 0 24px 52px rgba(15,23,42,0.16)',
        border:
          mode === 'dark'
            ? '1px solid rgba(255,255,255,0.14)'
            : '1px solid rgba(255,255,255,0.7)',
      }}
    >
      {/* Top 4-Column Tactile Control Grid */}
      <div className="grid grid-cols-4 gap-3 items-stretch">
        <div className="col-span-2 flex flex-col justify-between gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setHighRefraction(!highRefraction);
                addToast(
                  t.login.glassBlur,
                  highRefraction ? 'Standard 16px Glass Blur' : 'Enhanced 28px Optical Refraction',
                  'info'
                );
              }}
              title={t.login.glassBlur}
              style={glassCircleStyle}
              className={`h-14 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                highRefraction ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
              }`}
            >
              <FaIcon icon="fa-solid fa-lock" className="text-base" />
            </button>

            <button
              type="button"
              onClick={() => {
                setSilentMode(!silentMode);
                addToast(
                  silentMode ? 'Alerts Unmuted' : 'Quiet Notifications Enabled',
                  undefined,
                  'info'
                );
              }}
              title={t.app.notifications}
              style={glassCircleStyle}
              className={`h-14 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                !silentMode ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
              }`}
            >
              <FaIcon icon="fa-solid fa-bell" className="text-base" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setFocusActive(!focusActive);
              toggleMode();
            }}
            style={glassCircleStyle}
            className="h-16 rounded-full px-3 flex items-center justify-between gap-2 transition-transform active:scale-95 cursor-pointer"
          >
            <span
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{
                background:
                  mode === 'dark'
                    ? 'rgba(255,255,255,0.16)'
                    : 'rgba(15,23,42,0.08)',
              }}
            >
              <FaIcon icon="fa-solid fa-moon" className="text-sm text-[var(--text-primary)]" />
            </span>
            <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
              {t.login.focusMode}
            </span>
            <FaIcon
              icon="fa-solid fa-up-down"
              className="text-[11px] text-[var(--text-secondary)] shrink-0 mr-1"
            />
          </button>
        </div>

        {/* Right 2 Columns: Vertical Brightness & Sound Sliders */}
        <div
          style={glassCircleStyle}
          onClick={() => setBrightness((b) => (b >= 95 ? 45 : b + 15))}
          title="Click to adjust ambient luminance"
          className="h-[132px] rounded-[28px] relative overflow-hidden flex flex-col justify-end items-center pb-3.5 cursor-pointer group"
        >
          <div
            className="absolute bottom-0 inset-x-0 transition-all duration-300"
            style={{
              height: `${brightness}%`,
              background:
                mode === 'dark'
                  ? 'linear-gradient(to top, rgba(255,255,255,0.22), rgba(255,255,255,0.08))'
                  : 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
            }}
          />
          <FaIcon
            icon="fa-solid fa-sun"
            className="text-base relative z-10 text-[var(--text-primary)] transition-transform group-hover:scale-110"
          />
        </div>

        <div
          style={glassCircleStyle}
          onClick={() => setSoundLevel((s) => (s === 0 ? 65 : s === 65 ? 100 : 0))}
          title="Click to toggle audio feedback"
          className="h-[132px] rounded-[28px] relative overflow-hidden flex flex-col justify-end items-center pb-3.5 cursor-pointer group"
        >
          <div
            className="absolute bottom-0 inset-x-0 transition-all duration-300"
            style={{
              height: `${soundLevel}%`,
              background:
                mode === 'dark'
                  ? 'linear-gradient(to top, rgba(255,255,255,0.22), rgba(255,255,255,0.08))'
                  : 'linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.4))',
            }}
          />
          <FaIcon
            icon={soundLevel === 0 ? 'fa-solid fa-volume-xmark' : 'fa-solid fa-volume-high'}
            className="text-base relative z-10 text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Bottom Row of 4 Circular Glass Utility Buttons */}
      <div className="grid grid-cols-4 gap-3">
        <button
          type="button"
          onClick={toggleMode}
          style={glassCircleStyle}
          title={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
          className="h-14 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer"
        >
          <FaIcon icon="fa-solid fa-bolt-lightning" className="text-base" />
        </button>
        <button
          type="button"
          onClick={() => addToast('SLA Telemetry Timer', '99.98% uptime across all edge nodes.')}
          style={glassCircleStyle}
          title="SLA Telemetry"
          className="h-14 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer"
        >
          <FaIcon icon="fa-solid fa-stopwatch" className="text-base" />
        </button>
        <button
          type="button"
          onClick={() => addToast('Snapshot Ready', 'Workspace state saved to local storage.')}
          style={glassCircleStyle}
          title="Workspace Snapshot"
          className="h-14 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer"
        >
          <FaIcon icon="fa-solid fa-camera" className="text-base" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (onLockWorkspace) onLockWorkspace();
          }}
          style={glassCircleStyle}
          title={t.app.signOut}
          className="h-14 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-transform active:scale-95 cursor-pointer"
        >
          <FaIcon icon="fa-solid fa-power-off" className="text-base" />
        </button>
      </div>

      {/* System Accent & Language Quick Strip */}
      <div className="pt-2 border-t border-[var(--glass-border)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {ACCENT_SWATCHES.map((sw) => (
              <button
                key={sw.id}
                type="button"
                onClick={() => setAccent(sw.id)}
                aria-label={sw.id}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
                  accent === sw.id
                    ? 'scale-115 ring-2 ring-[var(--text-primary)]'
                    : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: mode === 'dark' ? sw.darkHex : sw.hex }}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            {LANGUAGE_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                type="button"
                onClick={() => setLanguage(opt.code)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-mono-tabular font-bold transition-colors cursor-pointer ${
                  language === opt.code
                    ? 'accent-btn'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {opt.short}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Official Apple Wallpapers Quick Grid */}
        <div className="pt-1.5 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--text-muted)]">
            <span>Apple HIG Wallpapers (10)</span>
            <span className="font-mono-tabular">Dynamic</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {WALLPAPER_PRESETS.map((wp) => {
              const isSelected = !customWallpaperUrl && wallpaperId === wp.id;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => {
                    setWallpaperId(wp.id);
                    addToast(wp.name[language], wp.badge, 'info');
                  }}
                  title={wp.name[language]}
                  className={`relative aspect-16/10 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent-primary)] ring-1 ring-[var(--accent-primary)] scale-105'
                      : 'border-white/20 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img
                    src={mode === 'light' ? wp.lightSvgDataUri : wp.svgDataUri}
                    alt={wp.name[language]}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
