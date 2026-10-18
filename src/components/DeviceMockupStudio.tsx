import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { DeviceMode, DeviceOrientation, NavSectionId } from '../types/dashboard';
import { Badge, Button, FaIcon } from './ui/liquid-shadcn';

/* ============================================================================
 * 1. Device Mockup Frame Wrapper (MacBook Pro 16", iPad Pro 13", iPhone 16 Pro)
 * ========================================================================== */
interface DeviceMockupFrameProps {
  deviceMode: DeviceMode;
  onSelectDeviceMode: (mode: DeviceMode) => void;
  orientation: DeviceOrientation;
  onToggleOrientation: () => void;
  children: React.ReactNode;
}

export const DeviceMockupFrame: React.FC<DeviceMockupFrameProps> = ({
  deviceMode,
  onSelectDeviceMode,
  orientation,
  onToggleOrientation,
  children,
}) => {
  const { mode } = useTheme();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [zoomOut, setZoomOut] = useState(false);
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);

  // Full Canvas Mode (Default Desktop)
  if (deviceMode === 'full') {
    return <div className="min-h-screen flex flex-col pb-24">{children}</div>;
  }

  const deviceSpecs: Record<
    Exclude<DeviceMode, 'full'>,
    { name: string; chip: string; resolution: string; icon: string }
  > = {
    macbook: {
      name: 'MacBook Pro 16"',
      chip: 'Apple M4 Max',
      resolution: '3456 × 2234 Liquid Retina XDR',
      icon: 'fa-solid fa-laptop',
    },
    ipad: {
      name: 'iPad Pro 13"',
      chip: 'Apple M4 Tandem OLED',
      resolution: orientation === 'landscape' ? '2752 × 2064 Landscape' : '2064 × 2752 Portrait',
      icon: 'fa-solid fa-tablet-screen-button',
    },
    iphone: {
      name: 'iPhone 16 Pro Max',
      chip: 'Apple A18 Pro · Titanium',
      resolution: orientation === 'portrait' ? '412 × 844 Super Retina XDR' : '844 × 412 Landscape',
      icon: 'fa-solid fa-mobile-screen-button',
    },
  };

  const activeSpec = deviceSpecs[deviceMode];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-3 pb-28 px-2 sm:px-6 select-none overflow-x-hidden">
      {/* Top Floating Device Studio Control Bar */}
      <div className="w-full max-w-[1360px] mb-4 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl glass-floating">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-[var(--accent-soft)] text-[var(--accent-primary)] flex items-center justify-center">
            <FaIcon icon={activeSpec.icon} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {activeSpec.name}
              </span>
              <Badge variant="default">{activeSpec.chip}</Badge>
            </div>
            <p className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
              {activeSpec.resolution} · Live Interactive Viewport
            </p>
          </div>
        </div>

        {/* Device Switcher Pills + Orientation & Scale */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-1 rounded-xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)] flex items-center gap-1">
            {(
              [
                { id: 'full', label: 'Full Screen', icon: 'fa-solid fa-expand' },
                { id: 'macbook', label: 'MacBook Pro', icon: 'fa-solid fa-laptop' },
                { id: 'ipad', label: 'iPad Pro', icon: 'fa-solid fa-tablet-screen-button' },
                { id: 'iphone', label: 'iPhone 16 Pro', icon: 'fa-solid fa-mobile-screen-button' },
              ] as const
            ).map((dev) => {
              const active = deviceMode === dev.id;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => onSelectDeviceMode(dev.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? 'accent-btn shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <FaIcon icon={dev.icon} className="text-[11px]" />
                  <span className="hidden sm:inline">{dev.label}</span>
                </button>
              );
            })}
          </div>

          {(deviceMode === 'ipad' || deviceMode === 'iphone') && (
            <Button
              size="sm"
              variant="secondary"
              leftFaIcon="fa-solid fa-rotate"
              onClick={() => {
                onToggleOrientation();
                addToast(
                  'Orientation Rotated',
                  `Switched to ${orientation === 'portrait' ? 'Landscape' : 'Portrait'} view.`,
                  'info'
                );
              }}
            >
              <span>{orientation === 'portrait' ? 'Landscape' : 'Portrait'}</span>
            </Button>
          )}

          <Button
            size="sm"
            variant="secondary"
            leftFaIcon={
              zoomOut ? 'fa-solid fa-magnifying-glass-plus' : 'fa-solid fa-magnifying-glass-minus'
            }
            onClick={() => setZoomOut((z) => !z)}
          >
            <span>{zoomOut ? '100%' : '90% Fit'}</span>
          </Button>
        </div>
      </div>

      {/* Hardware Mock-up Stage */}
      <div
        className={`w-full flex flex-col items-center justify-center transition-transform duration-300 origin-top ${
          zoomOut ? 'scale-[0.88]' : 'scale-100'
        }`}
      >
        {/* =================================================================
         * CASE 1: MACBOOK PRO 16" M4 MAX MOCKUP
         * =============================================================== */}
        {deviceMode === 'macbook' && (
          <div className="w-full max-w-[1360px] flex flex-col items-center">
            {/* Upper Display Lid & Anodized Aluminum Bezel */}
            <div
              className="w-full rounded-t-[32px] p-3 sm:p-4 pb-5 relative transition-all duration-300"
              style={{
                background: 'linear-gradient(180deg, #1e2028 0%, #0e1015 100%)',
                boxShadow:
                  'inset 0 1.5px 2px rgba(255,255,255,0.28), 0 30px 80px -15px rgba(0,0,0,0.75)',
                border: '1.5px solid rgba(255,255,255,0.16)',
              }}
            >
              {/* MacBook Camera Notch */}
              <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-40 w-44 h-6 bg-[#090a0f] rounded-b-2xl flex items-center justify-center gap-2.5 border-x border-b border-white/10 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#1a1d26] border border-white/20 relative flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-sky-400/70" />
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                  title="FaceTime HD Camera Active"
                />
              </div>

              {/* Inner Liquid Retina XDR Screen */}
              <div
                className="w-full h-[72vh] min-h-[540px] max-h-[820px] rounded-t-[20px] rounded-b-[8px] overflow-hidden flex flex-col relative border border-white/10"
                style={{
                  backgroundColor: mode === 'dark' ? '#080b12' : '#f2f4f8',
                }}
              >
                {/* macOS Sequoia Internal Status Menu Bar */}
                <div className="h-7 px-4 bg-black/35 backdrop-blur-xl text-white/90 text-[11px] font-medium flex items-center justify-between shrink-0 z-30 border-b border-white/10">
                  <div className="flex items-center gap-4">
                    <span className="font-bold flex items-center gap-1.5">
                      <FaIcon icon="fa-brands fa-apple" className="text-xs" />
                      <span>{t.app.brand}</span>
                    </span>
                    <span className="hidden sm:inline opacity-80">File</span>
                    <span className="hidden sm:inline opacity-80">Edit</span>
                    <span className="hidden sm:inline opacity-80">View</span>
                    <span className="hidden md:inline opacity-80">Window</span>
                    <span className="hidden md:inline opacity-80">Help</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono-tabular text-[10px]">
                    <span className="hidden sm:inline text-emerald-400">● M4 Max</span>
                    <FaIcon icon="fa-solid fa-wifi" />
                    <span className="flex items-center gap-1">
                      <span>100%</span>
                      <FaIcon icon="fa-solid fa-battery-full" className="text-emerald-400" />
                    </span>
                    <span>Oct 18 15:45</span>
                  </div>
                </div>

                {/* Live Scrollable Website Viewport inside MacBook */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-text">
                  {children}
                </div>
              </div>

              {/* Bottom Chin Bezel with MacBook Pro Metallic Wordmark */}
              <div className="pt-1.5 flex items-center justify-center">
                <span className="text-[10px] tracking-[0.22em] uppercase font-semibold text-white/45">
                  MacBook Pro
                </span>
              </div>
            </div>

            {/* Lower Aluminum Unibody Base Deck & Thumb Lip */}
            <div
              className="w-[103%] max-w-[1400px] h-5 rounded-b-[22px] rounded-t-[3px] relative flex justify-center items-start"
              style={{
                background:
                  'linear-gradient(90deg, #646875 0%, #aeb4c2 15%, #dfe3ec 50%, #aeb4c2 85%, #646875 100%)',
                boxShadow:
                  'inset 0 1px 1px rgba(255,255,255,0.85), 0 22px 45px rgba(0,0,0,0.65)',
              }}
            >
              {/* Center Thumb Notch */}
              <div
                className="w-28 h-2.5 rounded-b-xl"
                style={{
                  background: 'linear-gradient(180deg, #4b4f5c 0%, #7d8394 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
                }}
              />
            </div>
          </div>
        )}

        {/* =================================================================
         * CASE 2: IPAD PRO 13" M4 TANDEM OLED MOCKUP
         * =============================================================== */}
        {deviceMode === 'ipad' && (
          <div
            className={`relative transition-all duration-300 ${
              orientation === 'landscape'
                ? 'w-full max-w-[1060px]'
                : 'w-full max-w-[760px]'
            }`}
          >
            {/* Physical Side Hardware Buttons */}
            <div className="absolute -top-1.5 left-16 w-12 h-1.5 rounded-t-md bg-slate-500/80" />
            <div className="absolute top-20 -right-1.5 w-1.5 h-10 rounded-r-md bg-slate-500/80" />
            <div className="absolute top-32 -right-1.5 w-1.5 h-10 rounded-r-md bg-slate-500/80" />

            {/* Titanium Outer Chassis & Uniform Symmetrical Bezel */}
            <div
              className="w-full rounded-[44px] p-3.5 sm:p-4 relative transition-all duration-300"
              style={{
                background: 'linear-gradient(145deg, #2b2e38 0%, #101218 100%)',
                boxShadow:
                  'inset 0 1.5px 2px rgba(255,255,255,0.32), inset 0 -1.5px 2px rgba(255,255,255,0.12), 0 36px 84px -16px rgba(0,0,0,0.78)',
                border: '2px solid rgba(255,255,255,0.22)',
              }}
            >
              {/* Top Camera Sensor Dot in Bezel */}
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1d2230] border border-white/25" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              </div>

              {/* Inner Tandem OLED Display */}
              <div
                className={`w-full rounded-[32px] overflow-hidden flex flex-col relative border border-white/10 ${
                  orientation === 'landscape'
                    ? 'h-[72vh] min-h-[560px] max-h-[740px]'
                    : 'h-[80vh] min-h-[680px] max-h-[900px] device-viewport-ipad-portrait'
                }`}
                style={{
                  backgroundColor: mode === 'dark' ? '#080b12' : '#f2f4f8',
                }}
              >
                {/* iPadOS Status Bar */}
                <div className="h-7 px-5 bg-black/25 backdrop-blur-md text-[var(--text-primary)] text-[11px] font-semibold flex items-center justify-between shrink-0 z-30 border-b border-[var(--glass-border)]">
                  <div className="flex items-center gap-2 font-mono-tabular">
                    <span>9:41 AM</span>
                    <span className="opacity-60">Sun Oct 18</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-7 h-1 rounded-full bg-[var(--text-muted)]/40" />
                  </div>
                  <div className="flex items-center gap-2 font-mono-tabular text-[11px]">
                    <span>5G</span>
                    <FaIcon icon="fa-solid fa-wifi" className="text-[10px]" />
                    <span>100%</span>
                    <FaIcon icon="fa-solid fa-battery-full" className="text-emerald-500" />
                  </div>
                </div>

                {/* Live Scrollable Website Viewport inside iPad */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-text">
                  {children}
                </div>

                {/* Bottom iPadOS Home Indicator Bar */}
                <div className="h-5 flex items-center justify-center shrink-0 bg-black/10 backdrop-blur-xs">
                  <div className="w-36 h-1.5 rounded-full bg-[var(--text-primary)]/40" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================
         * CASE 3: IPHONE 16 PRO MAX TITANIUM MOCKUP (WITH DYNAMIC ISLAND)
         * =============================================================== */}
        {deviceMode === 'iphone' && (
          <div
            className={`relative transition-all duration-300 ${
              orientation === 'portrait'
                ? 'w-[412px] max-w-[96vw]'
                : 'w-[844px] max-w-[96vw]'
            }`}
          >
            {/* Physical Titanium Side Buttons (Action Button, Volume Up/Down, Power) */}
            {orientation === 'portrait' && (
              <>
                <div
                  className="absolute top-28 -left-1.5 w-1.5 h-7 rounded-l-md bg-[#8a857d]"
                  title="Action Button"
                />
                <div
                  className="absolute top-40 -left-1.5 w-1.5 h-12 rounded-l-md bg-[#8a857d]"
                  title="Volume Up"
                />
                <div
                  className="absolute top-56 -left-1.5 w-1.5 h-12 rounded-l-md bg-[#8a857d]"
                  title="Volume Down"
                />
                <div
                  className="absolute top-44 -right-1.5 w-1.5 h-16 rounded-r-md bg-[#8a857d]"
                  title="Power / Siri Button"
                />
              </>
            )}

            {/* Grade 5 Natural Titanium Outer Shell */}
            <div
              className="w-full rounded-[56px] p-3.5 relative transition-all duration-300"
              style={{
                background:
                  'linear-gradient(145deg, #464440 0%, #242320 45%, #151412 100%)',
                boxShadow:
                  'inset 0 2px 3px rgba(255,255,255,0.38), inset 0 -2px 3px rgba(255,255,255,0.18), 0 38px 90px -15px rgba(0,0,0,0.82)',
                border: '2.5px solid #8c877e',
              }}
            >
              {/* Inner Super Retina XDR OLED Screen */}
              <div
                className={`w-full rounded-[44px] overflow-hidden flex flex-col relative border border-white/15 device-viewport-iphone ${
                  orientation === 'portrait' ? 'h-[790px]' : 'h-[400px]'
                }`}
                style={{
                  backgroundColor: mode === 'dark' ? '#080b12' : '#f2f4f8',
                }}
              >
                {/* iOS 18 Status Bar + Interactive Dynamic Island */}
                <div className="pt-2.5 pb-1.5 px-6 flex items-center justify-between shrink-0 z-30 relative">
                  <span className="text-xs font-bold font-mono-tabular text-[var(--text-primary)]">
                    9:41
                  </span>

                  {/* Interactive Dynamic Island */}
                  <button
                    type="button"
                    onClick={() => setDynamicIslandExpanded((v) => !v)}
                    onMouseEnter={() => setDynamicIslandExpanded(true)}
                    onMouseLeave={() => setDynamicIslandExpanded(false)}
                    className={`bg-black text-white rounded-full transition-all duration-300 flex items-center justify-between px-3 cursor-pointer shadow-lg border border-white/10 ${
                      dynamicIslandExpanded ? 'w-56 h-9' : 'w-28 h-7'
                    }`}
                  >
                    {dynamicIslandExpanded ? (
                      <>
                        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 truncate">
                          <FaIcon icon="fa-solid fa-wave-square" className="fa-beat-fade" />
                          <span>AuraOS Live · 99.98%</span>
                        </span>
                        <span className="text-[10px] font-mono-tabular text-sky-400">
                          +18.4%
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#161926] border border-white/20" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-primary)]">
                    <FaIcon icon="fa-solid fa-signal" className="text-[10px]" />
                    <FaIcon icon="fa-solid fa-wifi" className="text-[10px]" />
                    <FaIcon icon="fa-solid fa-battery-full" className="text-emerald-500 text-xs" />
                  </div>
                </div>

                {/* Live Scrollable Mobile Website Viewport inside iPhone */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative select-text">
                  {children}
                </div>

                {/* Bottom iOS Home Bar Pill */}
                <div className="h-6 flex items-center justify-center shrink-0 bg-black/10 backdrop-blur-xs">
                  <div className="w-32 h-1.5 rounded-full bg-[var(--text-primary)]/50" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================================
 * 2. macOS Sonoma / Sequoia Floating 3D Liquid Glass Dock (<MacOSLiquidDock />)
 * ========================================================================== */
interface MacOSLiquidDockProps {
  activeSection: NavSectionId;
  onSelectSection: (section: NavSectionId) => void;
  deviceMode: DeviceMode;
  onSelectDeviceMode: (mode: DeviceMode) => void;
  onOpenCommandPalette: () => void;
  onOpenQuickCreate: () => void;
  ordersCount: number;
  isAuthenticated?: boolean;
  onToggleLock?: () => void;
}

export const MacOSLiquidDock: React.FC<MacOSLiquidDockProps> = ({
  activeSection,
  onSelectSection,
  deviceMode,
  onSelectDeviceMode,
  onOpenCommandPalette,
  onOpenQuickCreate,
  ordersCount,
  isAuthenticated = true,
  onToggleLock,
}) => {
  const { mode, toggleMode } = useTheme();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [dockMinimized, setDockMinimized] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [bouncingKey, setBouncingKey] = useState<string | null>(null);

  const triggerBounce = (key: string) => {
    setBouncingKey(key);
    setTimeout(() => setBouncingKey(null), 450);
  };

  if (dockMinimized) {
    return (
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50">
        <button
          type="button"
          onClick={() => setDockMinimized(false)}
          className="glass-floating px-4 py-1.5 rounded-full text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <FaIcon icon="fa-solid fa-angles-up" className="text-[var(--accent-primary)] text-[10px]" />
          <span>macOS Dock ({deviceMode.toUpperCase()})</span>
        </button>
      </div>
    );
  }

  const appDockItems: {
    id: NavSectionId;
    label: string;
    faIcon: string;
    gradient: string;
    badge?: number;
  }[] = [
    {
      id: 'overview',
      label: t.nav.overview,
      faIcon: 'fa-solid fa-gauge-high',
      gradient: 'linear-gradient(135deg, #007AFF, #38bdf8)',
    },
    {
      id: 'analytics',
      label: t.nav.analytics,
      faIcon: 'fa-solid fa-chart-line',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
    {
      id: 'orders',
      label: t.nav.orders,
      faIcon: 'fa-solid fa-bag-shopping',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      badge: ordersCount,
    },
    {
      id: 'products',
      label: t.nav.products,
      faIcon: 'fa-solid fa-cube',
      gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    },
    {
      id: 'customers',
      label: t.nav.customers,
      faIcon: 'fa-solid fa-user-group',
      gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
    {
      id: 'development',
      label: 'shadcn UI Kit',
      faIcon: 'fa-solid fa-code',
      gradient: 'linear-gradient(135deg, #6366f1, #3b82f6)',
    },
    {
      id: 'settings',
      label: t.nav.settings,
      faIcon: 'fa-solid fa-sliders',
      gradient: 'linear-gradient(135deg, #64748b, #334155)',
    },
  ];

  const deviceDockItems: {
    id: DeviceMode;
    label: string;
    faIcon: string;
  }[] = [
    { id: 'full', label: 'Full Desktop', faIcon: 'fa-solid fa-expand' },
    { id: 'macbook', label: 'MacBook Pro 16"', faIcon: 'fa-solid fa-laptop' },
    { id: 'ipad', label: 'iPad Pro 13"', faIcon: 'fa-solid fa-tablet-screen-button' },
    { id: 'iphone', label: 'iPhone 16 Pro', faIcon: 'fa-solid fa-mobile-screen-button' },
  ];

  const getScaleClass = (idx: number) => {
    if (hoveredIndex === null) return 'scale-100 translate-y-0';
    const dist = Math.abs(hoveredIndex - idx);
    if (dist === 0) return 'scale-125 -translate-y-2.5';
    if (dist === 1) return 'scale-110 -translate-y-1';
    return 'scale-100 translate-y-0';
  };

  return (
    <div
      aria-label="macOS Liquid Glass Dock"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] select-none"
    >
      <div
        className="px-3.5 py-2 rounded-[30px] flex items-end gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar"
        style={{
          background:
            mode === 'dark'
              ? 'linear-gradient(180deg, rgba(30, 36, 52, 0.72) 0%, rgba(15, 19, 29, 0.88) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.78) 0%, rgba(240, 244, 252, 0.9) 100%)',
          backdropFilter: 'blur(36px) saturate(210%)',
          WebkitBackdropFilter: 'blur(36px) saturate(210%)',
          boxShadow:
            mode === 'dark'
              ? 'inset 0 1.5px 1.5px rgba(255,255,255,0.28), inset 0 -1px 2px rgba(0,0,0,0.5), 0 24px 48px rgba(0,0,0,0.68)'
              : 'inset 0 1.5px 2px rgba(255,255,255,0.95), inset 0 -1px 2px rgba(15,23,42,0.08), 0 20px 44px rgba(15,23,42,0.18)',
          border:
            mode === 'dark'
              ? '1px solid rgba(255,255,255,0.18)'
              : '1px solid rgba(255,255,255,0.85)',
        }}
      >
        {/* 1. Core Application Module Icons */}
        {appDockItems.map((item, idx) => {
          const isActive = isAuthenticated && activeSection === item.id;
          const key = `app-${item.id}`;
          const isHovered = hoveredKey === key;
          const isBouncing = bouncingKey === key;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {isHovered && (
                <div className="hidden sm:block absolute -top-11 px-2.5 py-1 rounded-xl glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none animate-in fade-in duration-100 z-50">
                  {item.label}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  triggerBounce(key);
                  onSelectSection(item.id);
                }}
                onMouseEnter={() => {
                  setHoveredIndex(idx);
                  setHoveredKey(key);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setHoveredKey(null);
                }}
                aria-label={item.label}
                style={{
                  background: item.gradient,
                  boxShadow:
                    'inset 0 1.5px 1px rgba(255,255,255,0.45), 0 6px 14px -3px rgba(0,0,0,0.35)',
                }}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl text-white flex items-center justify-center relative transition-all duration-200 active:scale-95 cursor-pointer shrink-0 ${getScaleClass(
                  idx
                )} ${isBouncing ? 'animate-bounce' : ''}`}
              >
                <FaIcon icon={item.faIcon} className="text-sm sm:text-base" />
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-mono-tabular font-bold flex items-center justify-center border border-white/60">
                    {item.badge}
                  </span>
                )}
              </button>

              <span
                className={`mt-1 w-1 h-1 rounded-full transition-opacity ${
                  isActive ? 'bg-[var(--text-primary)] opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          );
        })}

        {/* Hairline Dock Divider */}
        <div className="h-8 w-px bg-[var(--glass-border-strong)] mx-1 mb-1.5 shrink-0" />

        {/* 2. Device Mockup Switcher Icons (Full, MacBook, iPad, iPhone) */}
        {deviceDockItems.map((dev, devIdx) => {
          const globalIdx = appDockItems.length + devIdx;
          const isActive = deviceMode === dev.id;
          const key = `dev-${dev.id}`;
          const isHovered = hoveredKey === key;
          const isBouncing = bouncingKey === key;
          return (
            <div key={dev.id} className="relative flex flex-col items-center">
              {isHovered && (
                <div className="hidden sm:block absolute -top-11 px-2.5 py-1 rounded-xl glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none animate-in fade-in duration-100 z-50">
                  {dev.label}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  triggerBounce(key);
                  onSelectDeviceMode(dev.id);
                  addToast(
                    `Viewport: ${dev.label}`,
                    dev.id === 'full'
                      ? 'Restored full desktop canvas.'
                      : `Switched to interactive ${dev.label} hardware frame.`,
                    'info'
                  );
                }}
                onMouseEnter={() => {
                  setHoveredIndex(globalIdx);
                  setHoveredKey(key);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setHoveredKey(null);
                }}
                aria-label={dev.label}
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shrink-0 ${getScaleClass(
                  globalIdx
                )} ${isBouncing ? 'animate-bounce' : ''} ${
                  isActive
                    ? 'accent-btn text-white'
                    : 'glass-interactive text-[var(--text-primary)]'
                }`}
              >
                <FaIcon icon={dev.faIcon} className="text-sm sm:text-base" />
              </button>

              <span
                className={`mt-1 w-1.5 h-1.5 rounded-full transition-opacity ${
                  isActive ? 'bg-[var(--accent-primary)] opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          );
        })}

        {/* Hairline Dock Divider */}
        <div className="h-8 w-px bg-[var(--glass-border-strong)] mx-1 mb-1.5 shrink-0 hidden sm:block" />

        {/* 3. System Utility Actions (Spotlight ⌘K, Quick Create, Lock/Unlock, Theme, Minimize) */}
        <div className="hidden sm:flex items-end gap-1.5">
          {isAuthenticated && (
            <>
              <div className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  title="Spotlight Search (⌘K)"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl glass-interactive text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <FaIcon icon="fa-solid fa-magnifying-glass" className="text-sm" />
                </button>
                <span className="mt-1 w-1 h-1 opacity-0" />
              </div>

              <div className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={onOpenQuickCreate}
                  title={t.app.quickCreate}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl glass-interactive text-[var(--accent-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <FaIcon icon="fa-solid fa-plus" className="text-sm" />
                </button>
                <span className="mt-1 w-1 h-1 opacity-0" />
              </div>
            </>
          )}

          {onToggleLock && (
            <div className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={onToggleLock}
                title={isAuthenticated ? 'Lock Screen (Login View)' : 'Unlock to Dashboard'}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl glass-interactive text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <FaIcon
                  icon={isAuthenticated ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open'}
                  className="text-sm text-rose-400"
                />
              </button>
              <span className="mt-1 w-1 h-1 opacity-0" />
            </div>
          )}

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={toggleMode}
              title={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl glass-interactive text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <FaIcon
                icon={mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}
                className="text-sm text-amber-400"
              />
            </button>
            <span className="mt-1 w-1 h-1 opacity-0" />
          </div>

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => setDockMinimized(true)}
              title="Minimize Dock"
              className="w-8 h-10 sm:h-11 rounded-xl glass-interactive text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer"
            >
              <FaIcon icon="fa-solid fa-angles-down" className="text-xs" />
            </button>
            <span className="mt-1 w-1 h-1 opacity-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
