import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { DeviceMode, DeviceOrientation, NavSectionId } from '../types/dashboard';
import { Badge, Button, FaIcon } from './ui/liquid-shadcn';

/* ============================================================================
 * 1. Exact Fixed-Resolution Device Mockup Frame Wrapper
 *    - MacBook Pro 16"   : 1440 × 900 px (Desktop Viewport Locked)
 *    - iPad Pro 13"      : 1180 × 820 px Landscape / 820 × 1180 px Portrait
 *    - iPhone 16 Pro Max : 430 × 932 px Portrait / 932 × 430 px Landscape
 *    Independent of viewer's physical browser window size.
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
  const [scaleMode, setScaleMode] = useState<'fit' | 'native'>('fit');
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth - 32 : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight - 170 : 900,
  });

  useEffect(() => {
    const updateSize = () => {
      const w = stageRef.current?.clientWidth || window.innerWidth - 32;
      const h = Math.max(480, window.innerHeight - 175);
      setStageSize({ width: w, height: h });
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener('resize', updateSize);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, [deviceMode, orientation]);

  // Full Canvas Mode (Default Responsive Desktop)
  if (deviceMode === 'full') {
    return <div className="min-h-screen flex flex-col pb-24">{children}</div>;
  }

  // Exact Fixed Logical Pixel Resolutions for Each Hardware Device
  const resolutionMap: Record<
    Exclude<DeviceMode, 'full'>,
    {
      name: string;
      chip: string;
      screenW: number;
      screenH: number;
      frameExtraW: number;
      frameExtraH: number;
      viewportClass: string;
      icon: string;
    }
  > = {
    macbook: {
      name: 'MacBook Pro 16"',
      chip: 'Apple M4 Max · Liquid Retina XDR',
      screenW: 1440,
      screenH: 900,
      frameExtraW: 84,
      frameExtraH: 92,
      viewportClass: 'device-viewport-macbook',
      icon: 'fa-solid fa-laptop',
    },
    ipad: {
      name: 'iPad Pro 13"',
      chip: 'Apple M4 · Ultra Retina XDR Tandem OLED',
      screenW: orientation === 'landscape' ? 1180 : 820,
      screenH: orientation === 'landscape' ? 820 : 1180,
      frameExtraW: 36,
      frameExtraH: 88,
      viewportClass:
        orientation === 'landscape'
          ? 'device-viewport-ipad-landscape'
          : 'device-viewport-ipad-portrait',
      icon: 'fa-solid fa-tablet-screen-button',
    },
    iphone: {
      name: 'iPhone 16 Pro Max',
      chip: 'Apple A18 Pro · Grade 5 Titanium',
      screenW: orientation === 'portrait' ? 430 : 932,
      screenH: orientation === 'portrait' ? 932 : 430,
      frameExtraW: 32,
      frameExtraH: 96,
      viewportClass:
        orientation === 'portrait'
          ? 'device-viewport-iphone'
          : 'device-viewport-iphone-landscape',
      icon: 'fa-solid fa-mobile-screen-button',
    },
  };

  const activeSpec = resolutionMap[deviceMode];
  const totalHardwareW = activeSpec.screenW + activeSpec.frameExtraW;
  const totalHardwareH = activeSpec.screenH + activeSpec.frameExtraH;

  // Compute proportional scale so the exact pixel resolution fits any viewer screen
  const scaleX = (stageSize.width - 16) / totalHardwareW;
  const scaleY = (stageSize.height - 12) / totalHardwareH;
  const autoFitScale = Math.min(1, Math.max(0.24, Math.min(scaleX, scaleY)));
  const effectiveScale = scaleMode === 'native' ? 1 : autoFitScale;
  const scaledPercent = Math.round(effectiveScale * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-3 pb-28 px-2 sm:px-6 select-none overflow-x-hidden">
      {/* Top Floating Device Studio Control Bar */}
      <div className="w-full max-w-[1440px] mb-3 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-3xl glass-floating">
        <div className="flex items-center gap-3">
          <div
            className="liquid-dock-icon w-9 h-9 flex items-center justify-center shrink-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(0, 122, 255, 0.85) 0%, rgba(56, 189, 248, 0.75) 100%)',
            }}
          >
            <div className="liquid-dock-emblem w-6 h-6">
              <FaIcon icon={activeSpec.icon} className="text-white text-xs" />
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {activeSpec.name}
              </span>
              <Badge variant="default">
                {activeSpec.screenW} × {activeSpec.screenH} px Locked
              </Badge>
              <Badge variant="secondary">{scaledPercent}% Scale</Badge>
            </div>
            <p className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
              {activeSpec.chip} · Independent Hardware Viewport
            </p>
          </div>
        </div>

        {/* Device Switcher Pills + Orientation & Scale Mode */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="liquid-pill-group">
            {(
              [
                { id: 'full', label: 'Full Screen', res: 'Auto', icon: 'fa-solid fa-expand' },
                { id: 'macbook', label: 'MacBook Pro', res: '1440×900', icon: 'fa-solid fa-laptop' },
                {
                  id: 'ipad',
                  label: 'iPad Pro',
                  res: orientation === 'landscape' ? '1180×820' : '820×1180',
                  icon: 'fa-solid fa-tablet-screen-button',
                },
                {
                  id: 'iphone',
                  label: 'iPhone 16 Pro',
                  res: orientation === 'portrait' ? '430×932' : '932×430',
                  icon: 'fa-solid fa-mobile-screen-button',
                },
              ] as const
            ).map((dev) => {
              const active = deviceMode === dev.id;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => onSelectDeviceMode(dev.id)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? 'liquid-btn-primary text-white'
                      : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <FaIcon icon={dev.icon} className="text-[11px]" />
                  <span className="hidden sm:inline">{dev.label}</span>
                  <span className="hidden xl:inline text-[10px] font-mono-tabular opacity-80">
                    ({dev.res})
                  </span>
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
                  `Locked to ${
                    orientation === 'portrait'
                      ? `${activeSpec.screenH} × ${activeSpec.screenW} px Landscape`
                      : `${activeSpec.screenH} × ${activeSpec.screenW} px Portrait`
                  }.`,
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
              scaleMode === 'fit'
                ? 'fa-solid fa-magnifying-glass-plus'
                : 'fa-solid fa-compress'
            }
            onClick={() => setScaleMode((m) => (m === 'fit' ? 'native' : 'fit'))}
          >
            <span>{scaleMode === 'fit' ? '100% Native px' : `Auto Fit (${Math.round(autoFitScale * 100)}%)`}</span>
          </Button>
        </div>
      </div>

      {/* Hardware Mock-up Stage with Exact Pixel Resolution & Proportional Scaling */}
      <div
        ref={stageRef}
        className={`w-full flex flex-col items-center justify-start ${
          scaleMode === 'native' ? 'overflow-x-auto pb-6' : 'overflow-hidden'
        }`}
        style={{
          height: `${Math.ceil(totalHardwareH * effectiveScale) + 20}px`,
        }}
      >
        <div
          className="transition-transform duration-300 origin-top flex flex-col items-center shrink-0"
          style={{
            width: `${totalHardwareW}px`,
            height: `${totalHardwareH}px`,
            transform: `scale(${effectiveScale})`,
          }}
        >
          {/* =================================================================
           * CASE 1: MACBOOK PRO 16" M4 MAX MOCKUP (FIXED 1440 × 900 PX)
           * =============================================================== */}
          {deviceMode === 'macbook' && (
            <div className="flex flex-col items-center shrink-0">
              {/* Upper Display Lid & Anodized Aluminum Bezel */}
              <div
                className="rounded-t-[34px] p-3.5 pb-5 relative"
                style={{
                  background: 'linear-gradient(180deg, #1e2028 0%, #0e1015 100%)',
                  boxShadow:
                    'inset 0 1.5px 2px rgba(255,255,255,0.28), 0 30px 80px -15px rgba(0,0,0,0.75)',
                  border: '1.5px solid rgba(255,255,255,0.18)',
                }}
              >
                {/* MacBook Camera Notch */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-40 w-48 h-6 bg-[#090a0f] rounded-b-2xl flex items-center justify-center gap-2.5 border-x border-b border-white/10 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#1a1d26] border border-white/20 relative flex items-center justify-center">
                    <span className="w-1 h-1 rounded-full bg-sky-400/70" />
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                    title="FaceTime HD Camera Active"
                  />
                </div>

                {/* Inner Liquid Retina XDR Screen — Locked to Exact 1440 × 900 px */}
                <div
                  className="rounded-t-[20px] rounded-b-[8px] overflow-hidden flex flex-col relative border border-white/10"
                  style={{
                    width: `${activeSpec.screenW}px`,
                    height: `${activeSpec.screenH}px`,
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
                      <span className="opacity-80">File</span>
                      <span className="opacity-80">Edit</span>
                      <span className="opacity-80">View</span>
                      <span className="opacity-80">Window</span>
                      <span className="opacity-80">Help</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono-tabular text-[10px]">
                      <span className="text-emerald-400">● 1440 × 900 px · M4 Max</span>
                      <FaIcon icon="fa-solid fa-wifi" />
                      <span className="flex items-center gap-1">
                        <span>100%</span>
                        <FaIcon icon="fa-solid fa-battery-full" className="text-emerald-400" />
                      </span>
                      <span>Oct 18 16:20</span>
                    </div>
                  </div>

                  {/* Live Scrollable Website Viewport Locked to 1440 × 900 Desktop Layout */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
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
                className="w-[1520px] h-5 rounded-b-[24px] rounded-t-[3px] relative flex justify-center items-start"
                style={{
                  background:
                    'linear-gradient(90deg, #646875 0%, #aeb4c2 15%, #dfe3ec 50%, #aeb4c2 85%, #646875 100%)',
                  boxShadow:
                    'inset 0 1px 1px rgba(255,255,255,0.85), 0 22px 45px rgba(0,0,0,0.65)',
                }}
              >
                <div
                  className="w-32 h-2.5 rounded-b-xl"
                  style={{
                    background: 'linear-gradient(180deg, #4b4f5c 0%, #7d8394 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
                  }}
                />
              </div>
            </div>
          )}

          {/* =================================================================
           * CASE 2: IPAD PRO 13" M4 MOCKUP (FIXED 1180 × 820 / 820 × 1180 PX)
           * =============================================================== */}
          {deviceMode === 'ipad' && (
            <div className="relative shrink-0">
              {/* Physical Side Hardware Buttons */}
              <div className="absolute -top-1.5 left-16 w-12 h-1.5 rounded-t-md bg-slate-500/80" />
              <div className="absolute top-20 -right-1.5 w-1.5 h-10 rounded-r-md bg-slate-500/80" />
              <div className="absolute top-32 -right-1.5 w-1.5 h-10 rounded-r-md bg-slate-500/80" />

              {/* Titanium Outer Chassis & Uniform Symmetrical Bezel */}
              <div
                className="rounded-[44px] p-4 relative"
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

                {/* Inner Tandem OLED Display — Locked to Exact 1180×820 or 820×1180 px */}
                <div
                  className="rounded-[32px] overflow-hidden flex flex-col relative border border-white/10"
                  style={{
                    width: `${activeSpec.screenW}px`,
                    height: `${activeSpec.screenH}px`,
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
                      <span className="text-[var(--accent-primary)]">
                        {activeSpec.screenW}×{activeSpec.screenH}
                      </span>
                      <span>5G</span>
                      <FaIcon icon="fa-solid fa-wifi" className="text-[10px]" />
                      <span>100%</span>
                      <FaIcon icon="fa-solid fa-battery-full" className="text-emerald-500" />
                    </div>
                  </div>

                  {/* Live Scrollable Website Viewport Locked to iPad Resolution */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
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
           * CASE 3: IPHONE 16 PRO MAX MOCKUP (FIXED 430 × 932 / 932 × 430 PX)
           * =============================================================== */}
          {deviceMode === 'iphone' && (
            <div className="relative shrink-0">
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
                className="rounded-[56px] p-3.5 relative"
                style={{
                  background:
                    'linear-gradient(145deg, #464440 0%, #242320 45%, #151412 100%)',
                  boxShadow:
                    'inset 0 2px 3px rgba(255,255,255,0.38), inset 0 -2px 3px rgba(255,255,255,0.18), 0 38px 90px -15px rgba(0,0,0,0.82)',
                  border: '2.5px solid #8c877e',
                }}
              >
                {/* Inner Super Retina XDR OLED Screen — Locked to Exact 430×932 or 932×430 px */}
                <div
                  className="rounded-[44px] overflow-hidden flex flex-col relative border border-white/15"
                  style={{
                    width: `${activeSpec.screenW}px`,
                    height: `${activeSpec.screenH}px`,
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
                            <span>
                              {activeSpec.screenW}×{activeSpec.screenH}px
                            </span>
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
                      <FaIcon
                        icon="fa-solid fa-battery-full"
                        className="text-emerald-500 text-xs"
                      />
                    </div>
                  </div>

                  {/* Live Scrollable Mobile Website Viewport Locked to iPhone Resolution */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
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
    </div>
  );
};

/* ============================================================================
 * 2. macOS Tahoe / iOS 26 Floating 3D Liquid Glass Dock (<MacOSLiquidDock />)
 *    Featuring Multi-Layered 3D Refractive Squircle App Icons
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
        <Button
          variant="glass-pill"
          size="sm"
          onClick={() => setDockMinimized(false)}
          leftFaIcon="fa-solid fa-angles-up"
        >
          <span>macOS Dock ({deviceMode.toUpperCase()})</span>
        </Button>
      </div>
    );
  }

  // 1. Core Application Module 3D Squircle Icons
  const appDockItems: {
    id: NavSectionId;
    label: string;
    faIcon: string;
    glassTint: string;
    glowColor: string;
    badge?: number;
  }[] = [
    {
      id: 'overview',
      label: t.nav.overview,
      faIcon: 'fa-solid fa-gauge-high',
      glassTint:
        'linear-gradient(145deg, rgba(56, 189, 248, 0.88) 0%, rgba(0, 122, 255, 0.82) 55%, rgba(29, 78, 216, 0.9) 100%)',
      glowColor: 'rgba(0, 122, 255, 0.48)',
    },
    {
      id: 'analytics',
      label: t.nav.analytics,
      faIcon: 'fa-solid fa-chart-line',
      glassTint:
        'linear-gradient(145deg, rgba(217, 70, 239, 0.88) 0%, rgba(147, 51, 234, 0.82) 55%, rgba(109, 40, 217, 0.9) 100%)',
      glowColor: 'rgba(168, 85, 247, 0.48)',
    },
    {
      id: 'orders',
      label: t.nav.orders,
      faIcon: 'fa-solid fa-bag-shopping',
      glassTint:
        'linear-gradient(145deg, rgba(52, 211, 153, 0.9) 0%, rgba(16, 185, 129, 0.82) 55%, rgba(4, 120, 87, 0.9) 100%)',
      glowColor: 'rgba(16, 185, 129, 0.48)',
      badge: ordersCount,
    },
    {
      id: 'products',
      label: t.nav.products,
      faIcon: 'fa-solid fa-cube',
      glassTint:
        'linear-gradient(145deg, rgba(251, 191, 36, 0.9) 0%, rgba(245, 158, 11, 0.84) 55%, rgba(217, 119, 6, 0.92) 100%)',
      glowColor: 'rgba(245, 158, 11, 0.48)',
    },
    {
      id: 'customers',
      label: t.nav.customers,
      faIcon: 'fa-solid fa-user-group',
      glassTint:
        'linear-gradient(145deg, rgba(251, 113, 133, 0.9) 0%, rgba(244, 63, 94, 0.84) 55%, rgba(190, 18, 60, 0.92) 100%)',
      glowColor: 'rgba(244, 63, 94, 0.48)',
    },
    {
      id: 'development',
      label: 'shadcn UI Kit',
      faIcon: 'fa-solid fa-code',
      glassTint:
        'linear-gradient(145deg, rgba(129, 140, 248, 0.9) 0%, rgba(99, 102, 241, 0.84) 55%, rgba(67, 56, 202, 0.92) 100%)',
      glowColor: 'rgba(99, 102, 241, 0.48)',
    },
    {
      id: 'settings',
      label: t.nav.settings,
      faIcon: 'fa-solid fa-sliders',
      glassTint:
        'linear-gradient(145deg, rgba(148, 163, 184, 0.88) 0%, rgba(100, 116, 139, 0.82) 55%, rgba(51, 65, 85, 0.92) 100%)',
      glowColor: 'rgba(100, 116, 139, 0.45)',
    },
  ];

  // 2. Hardware Device Resolution Switcher 3D Squircle Icons
  const deviceDockItems: {
    id: DeviceMode;
    label: string;
    resolution: string;
    faIcon: string;
    glassTint: string;
    glowColor: string;
  }[] = [
    {
      id: 'full',
      label: 'Full Desktop',
      resolution: 'Responsive Canvas',
      faIcon: 'fa-solid fa-expand',
      glassTint:
        'linear-gradient(145deg, rgba(56, 189, 248, 0.85) 0%, rgba(14, 165, 233, 0.78) 100%)',
      glowColor: 'rgba(14, 165, 233, 0.45)',
    },
    {
      id: 'macbook',
      label: 'MacBook Pro 16"',
      resolution: '1440 × 900 px',
      faIcon: 'fa-solid fa-laptop',
      glassTint:
        'linear-gradient(145deg, rgba(99, 102, 241, 0.88) 0%, rgba(59, 130, 246, 0.82) 100%)',
      glowColor: 'rgba(59, 130, 246, 0.48)',
    },
    {
      id: 'ipad',
      label: 'iPad Pro 13"',
      resolution: '1180 × 820 px',
      faIcon: 'fa-solid fa-tablet-screen-button',
      glassTint:
        'linear-gradient(145deg, rgba(192, 132, 252, 0.88) 0%, rgba(147, 51, 234, 0.82) 100%)',
      glowColor: 'rgba(168, 85, 247, 0.48)',
    },
    {
      id: 'iphone',
      label: 'iPhone 16 Pro Max',
      resolution: '430 × 932 px',
      faIcon: 'fa-solid fa-mobile-screen-button',
      glassTint:
        'linear-gradient(145deg, rgba(251, 113, 133, 0.88) 0%, rgba(225, 29, 72, 0.82) 100%)',
      glowColor: 'rgba(225, 29, 72, 0.48)',
    },
  ];

  const getScaleClass = (idx: number) => {
    if (hoveredIndex === null) return 'scale-100 translate-y-0';
    const dist = Math.abs(hoveredIndex - idx);
    if (dist === 0) return 'scale-[1.24] -translate-y-3';
    if (dist === 1) return 'scale-[1.11] -translate-y-1.5';
    return 'scale-100 translate-y-0';
  };

  return (
    <div
      aria-label="macOS Liquid Glass Dock"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] select-none"
    >
      <div
        className="px-4 py-2.5 rounded-[34px] flex items-end gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar"
        style={{
          background:
            mode === 'dark'
              ? 'linear-gradient(180deg, rgba(34, 40, 58, 0.72) 0%, rgba(14, 18, 28, 0.88) 100%)'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.82) 0%, rgba(238, 244, 255, 0.92) 100%)',
          backdropFilter: 'blur(36px) saturate(210%)',
          WebkitBackdropFilter: 'blur(36px) saturate(210%)',
          boxShadow:
            mode === 'dark'
              ? 'inset 0 1.5px 2px rgba(255,255,255,0.34), inset 0 -1.5px 3px rgba(244, 63, 94, 0.2), 0 26px 54px rgba(0,0,0,0.72)'
              : 'inset 0 2px 2.5px rgba(255,255,255,0.98), inset 0 -1.5px 3px rgba(99,102,241,0.14), 0 22px 48px rgba(15,23,42,0.18)',
          border:
            mode === 'dark'
              ? '1px solid rgba(255,255,255,0.22)'
              : '1px solid rgba(255,255,255,0.92)',
        }}
      >
        {/* 1. Core Application Module 3D Liquid Glass Squircle Icons */}
        {appDockItems.map((item, idx) => {
          const isActive = isAuthenticated && activeSection === item.id;
          const key = `app-${item.id}`;
          const isHovered = hoveredKey === key;
          const isBouncing = bouncingKey === key;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {isHovered && (
                <div className="hidden sm:block absolute -top-12 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none animate-in fade-in duration-100 z-50">
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
                  background: item.glassTint,
                  boxShadow: `inset 0 2px 2.5px rgba(255,255,255,0.82), inset 0 -2.5px 4px rgba(0,0,0,0.28), inset 0 0 0 1px rgba(255,255,255,0.28), 0 10px 22px -4px ${item.glowColor}`,
                }}
                className={`liquid-dock-icon w-11 h-11 sm:w-12 sm:h-12 text-white flex items-center justify-center cursor-pointer shrink-0 ${getScaleClass(
                  idx
                )} ${isBouncing ? 'animate-bounce' : ''}`}
              >
                <div className="liquid-dock-emblem">
                  <FaIcon icon={item.faIcon} className="text-sm sm:text-base text-white" />
                </div>
                {typeof item.badge === 'number' && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 z-20 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-mono-tabular font-bold flex items-center justify-center border border-white shadow-sm">
                    {item.badge}
                  </span>
                )}
              </button>

              <span
                className={`mt-1.5 w-1.5 h-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-[var(--text-primary)] scale-100 opacity-100 shadow-xs'
                    : 'scale-0 opacity-0'
                }`}
              />
            </div>
          );
        })}

        {/* Hairline Glass Dock Divider */}
        <div className="h-9 w-px bg-[var(--glass-border-strong)] mx-1 mb-2 shrink-0" />

        {/* 2. Device Mockup Resolution Switcher 3D Squircle Icons */}
        {deviceDockItems.map((dev, devIdx) => {
          const globalIdx = appDockItems.length + devIdx;
          const isActive = deviceMode === dev.id;
          const key = `dev-${dev.id}`;
          const isHovered = hoveredKey === key;
          const isBouncing = bouncingKey === key;
          return (
            <div key={dev.id} className="relative flex flex-col items-center">
              {isHovered && (
                <div className="hidden sm:flex flex-col items-center absolute -top-14 px-3 py-1 rounded-2xl glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none animate-in fade-in duration-100 z-50">
                  <span>{dev.label}</span>
                  <span className="text-[9px] font-mono-tabular text-[var(--accent-primary)]">
                    {dev.resolution}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  triggerBounce(key);
                  onSelectDeviceMode(dev.id);
                  addToast(
                    `${dev.label} (${dev.resolution})`,
                    dev.id === 'full'
                      ? 'Restored responsive desktop canvas.'
                      : `Locked website resolution to ${dev.resolution}.`,
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
                aria-label={`${dev.label} (${dev.resolution})`}
                style={
                  isActive
                    ? {
                        background: dev.glassTint,
                        boxShadow: `inset 0 2px 2.5px rgba(255,255,255,0.88), inset 0 -2.5px 4px rgba(0,0,0,0.28), 0 12px 24px -4px ${dev.glowColor}`,
                      }
                    : undefined
                }
                className={`liquid-dock-icon w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center cursor-pointer shrink-0 ${getScaleClass(
                  globalIdx
                )} ${isBouncing ? 'animate-bounce' : ''} ${
                  isActive
                    ? 'text-white ring-2 ring-white/70'
                    : 'liquid-btn-caustic text-[var(--text-primary)]'
                }`}
              >
                <div className="liquid-dock-emblem">
                  <FaIcon
                    icon={dev.faIcon}
                    className={`text-sm sm:text-base ${
                      isActive ? 'text-white' : 'text-[var(--text-primary)]'
                    }`}
                  />
                </div>
              </button>

              <span
                className={`mt-1.5 h-1.5 rounded-full transition-all ${
                  isActive
                    ? 'w-3 bg-[var(--accent-primary)] opacity-100'
                    : 'w-1.5 opacity-0'
                }`}
              />
            </div>
          );
        })}

        {/* Hairline Glass Dock Divider */}
        <div className="h-9 w-px bg-[var(--glass-border-strong)] mx-1 mb-2 shrink-0 hidden sm:block" />

        {/* 3. System Utility 3D Glass Squircle Icons */}
        <div className="hidden sm:flex items-end gap-2">
          {isAuthenticated && (
            <>
              <div className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  title="Spotlight Search (⌘K)"
                  className="liquid-dock-icon liquid-btn-caustic w-11 h-11 sm:w-12 sm:h-12 text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2.5 hover:scale-115 active:scale-95 cursor-pointer"
                >
                  <div className="liquid-dock-emblem">
                    <FaIcon icon="fa-solid fa-magnifying-glass" className="text-sm text-[var(--accent-primary)]" />
                  </div>
                </button>
                <span className="mt-1.5 w-1.5 h-1.5 opacity-0" />
              </div>

              <div className="relative flex flex-col items-center">
                <button
                  type="button"
                  onClick={onOpenQuickCreate}
                  title={t.app.quickCreate}
                  className="liquid-dock-icon liquid-btn-caustic w-11 h-11 sm:w-12 sm:h-12 text-[var(--accent-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2.5 hover:scale-115 active:scale-95 cursor-pointer"
                >
                  <div className="liquid-dock-emblem">
                    <FaIcon icon="fa-solid fa-plus" className="text-sm text-emerald-500" />
                  </div>
                </button>
                <span className="mt-1.5 w-1.5 h-1.5 opacity-0" />
              </div>
            </>
          )}

          {onToggleLock && (
            <div className="relative flex flex-col items-center">
              <button
                type="button"
                onClick={onToggleLock}
                title={isAuthenticated ? 'Lock Screen (Login View)' : 'Unlock to Dashboard'}
                className="liquid-dock-icon liquid-btn-caustic w-11 h-11 sm:w-12 sm:h-12 text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2.5 hover:scale-115 active:scale-95 cursor-pointer"
              >
                <div className="liquid-dock-emblem">
                  <FaIcon
                    icon={isAuthenticated ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open'}
                    className="text-sm text-rose-500"
                  />
                </div>
              </button>
              <span className="mt-1.5 w-1.5 h-1.5 opacity-0" />
            </div>
          )}

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={toggleMode}
              title={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
              className="liquid-dock-icon liquid-btn-caustic w-11 h-11 sm:w-12 sm:h-12 text-[var(--text-primary)] flex items-center justify-center transition-all duration-200 hover:-translate-y-2.5 hover:scale-115 active:scale-95 cursor-pointer"
            >
              <div className="liquid-dock-emblem">
                <FaIcon
                  icon={mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}
                  className="text-sm text-amber-500"
                />
              </div>
            </button>
            <span className="mt-1.5 w-1.5 h-1.5 opacity-0" />
          </div>

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={() => setDockMinimized(true)}
              title="Minimize Dock"
              className="liquid-dock-icon liquid-btn-caustic w-9 h-11 sm:h-12 text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center justify-center transition-all cursor-pointer"
            >
              <FaIcon icon="fa-solid fa-angles-down" className="text-xs relative z-10" />
            </button>
            <span className="mt-1.5 w-1.5 h-1.5 opacity-0" />
          </div>
        </div>
      </div>
    </div>
  );
};
