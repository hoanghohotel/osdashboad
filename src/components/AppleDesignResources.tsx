import React from 'react';
import { NavSectionId } from '../types/dashboard';

/* ============================================================================
 * 1. APPLE DESIGN RESOURCES — HARDWARE BEZEL FINISHES
 *    (Ref: https://developer.apple.com/design/resources/#product-bezels)
 * ========================================================================== */
export type AppleBezelFinish =
  | 'space-black'
  | 'silver'
  | 'natural-titanium'
  | 'desert-titanium';

export interface AppleBezelFinishSpec {
  id: AppleBezelFinish;
  name: string;
  swatchHex: string;
  outerShellBg: string;
  outerBorder: string;
  outerShadow: string;
  deckGradient: string;
  lipGradient: string;
  buttonBg: string;
}

export const APPLE_BEZEL_FINISHES: Record<AppleBezelFinish, AppleBezelFinishSpec> = {
  'space-black': {
    id: 'space-black',
    name: 'Space Black',
    swatchHex: '#1d1e22',
    outerShellBg: 'linear-gradient(155deg, #2c2e36 0%, #17191f 52%, #0d0e12 100%)',
    outerBorder: '#3e414d',
    outerShadow:
      'inset 0 1.5px 2px rgba(255,255,255,0.28), inset 0 -1.5px 2px rgba(255,255,255,0.1), 0 38px 90px -16px rgba(0,0,0,0.82)',
    deckGradient:
      'linear-gradient(90deg, #23252c 0%, #4b4f5c 15%, #6e7382 50%, #4b4f5c 85%, #23252c 100%)',
    lipGradient: 'linear-gradient(180deg, #1b1d23 0%, #383b46 100%)',
    buttonBg: '#2e313a',
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    swatchHex: '#d4d8e0',
    outerShellBg: 'linear-gradient(155deg, #e5e8ef 0%, #b8becb 52%, #8c93a3 100%)',
    outerBorder: '#f8fafc',
    outerShadow:
      'inset 0 2px 3px rgba(255,255,255,0.9), inset 0 -1.5px 2px rgba(15,23,42,0.25), 0 38px 90px -16px rgba(0,0,0,0.72)',
    deckGradient:
      'linear-gradient(90deg, #8e94a2 0%, #cfd4df 15%, #f1f4f9 50%, #cfd4df 85%, #8e94a2 100%)',
    lipGradient: 'linear-gradient(180deg, #686e7c 0%, #a5acb9 100%)',
    buttonBg: '#b8becb',
  },
  'natural-titanium': {
    id: 'natural-titanium',
    name: 'Natural Titanium',
    swatchHex: '#9a958d',
    outerShellBg: 'linear-gradient(155deg, #57544f 0%, #302e2b 52%, #1b1a18 100%)',
    outerBorder: '#9e988e',
    outerShadow:
      'inset 0 2px 3px rgba(255,255,255,0.38), inset 0 -2px 3px rgba(255,255,255,0.16), 0 38px 90px -16px rgba(0,0,0,0.82)',
    deckGradient:
      'linear-gradient(90deg, #5c5852 0%, #99948b 15%, #c7c2b8 50%, #99948b 85%, #5c5852 100%)',
    lipGradient: 'linear-gradient(180deg, #43403b 0%, #78736b 100%)',
    buttonBg: '#8c877e',
  },
  'desert-titanium': {
    id: 'desert-titanium',
    name: 'Desert Titanium',
    swatchHex: '#c4ab97',
    outerShellBg: 'linear-gradient(155deg, #6b5a4e 0%, #3d332c 52%, #241e1a 100%)',
    outerBorder: '#bfa38c',
    outerShadow:
      'inset 0 2px 3px rgba(255,240,225,0.42), inset 0 -2px 3px rgba(255,225,200,0.18), 0 38px 90px -16px rgba(0,0,0,0.82)',
    deckGradient:
      'linear-gradient(90deg, #736053 0%, #b59b86 15%, #dfd0c3 50%, #b59b86 85%, #736053 100%)',
    lipGradient: 'linear-gradient(180deg, #54463c 0%, #8f7968 100%)',
    buttonBg: '#ad937e',
  },
};

/* ============================================================================
 * 2. OFFICIAL APPLE WINDOW CONTROLS (macOS Tahoe / Sequoia Traffic Lights)
 * ========================================================================== */
export interface AppleTrafficLightsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
  closeTitle?: string;
  minimizeTitle?: string;
  zoomTitle?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const AppleTrafficLights: React.FC<AppleTrafficLightsProps> = ({
  onClose,
  onMinimize,
  onZoom,
  closeTitle = 'Close / Lock Session',
  minimizeTitle = 'Minimize',
  zoomTitle = 'Full Screen / Zoom',
  size = 'md',
  className = '',
}) => {
  const dotClass = size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3';

  return (
    <div
      className={`group/traffic inline-flex items-center gap-2 select-none shrink-0 ${className}`}
      role="group"
      aria-label="macOS Window Controls"
    >
      {/* Red Close Button */}
      <button
        type="button"
        onClick={onClose}
        title={closeTitle}
        aria-label={closeTitle}
        className={`${dotClass} rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] flex items-center justify-center text-[#4D0000] transition-transform active:scale-90 cursor-pointer`}
      >
        <svg
          viewBox="0 0 12 12"
          className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M3.2 3.2L8.8 8.8M8.8 3.2L3.2 8.8" />
        </svg>
      </button>

      {/* Yellow Minimize Button */}
      <button
        type="button"
        onClick={onMinimize}
        title={minimizeTitle}
        aria-label={minimizeTitle}
        className={`${dotClass} rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] flex items-center justify-center text-[#5A3000] transition-transform active:scale-90 cursor-pointer`}
      >
        <svg
          viewBox="0 0 12 12"
          className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 transition-opacity"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M2.5 6H9.5" />
        </svg>
      </button>

      {/* Green Zoom / Fullscreen Button */}
      <button
        type="button"
        onClick={onZoom}
        title={zoomTitle}
        aria-label={zoomTitle}
        className={`${dotClass} rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] flex items-center justify-center text-[#003D00] transition-transform active:scale-90 cursor-pointer`}
      >
        <svg
          viewBox="0 0 12 12"
          className="w-2 h-2 opacity-0 group-hover/traffic:opacity-100 transition-opacity"
          fill="currentColor"
        >
          <path d="M3 4.8L7.2 9H3V4.8ZM9 7.2L4.8 3H9V7.2Z" />
        </svg>
      </button>
    </div>
  );
};

/* ============================================================================
 * 3. OFFICIAL APPLE iOS / iPadOS / macOS STATUS BAR VECTORS
 *    (Cellular Bars, Wi-Fi Waves, Battery Icon, Control Center Two-Switch Icon)
 * ========================================================================== */
export const AppleStatusIcons: React.FC<{
  showCellular?: boolean;
  show5G?: boolean;
  batteryPercent?: number;
  className?: string;
}> = ({ showCellular = true, show5G = false, batteryPercent, className = '' }) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
    {showCellular && (
      <svg viewBox="0 0 18 12" className="w-[15px] h-[10px] fill-current" aria-hidden="true">
        <rect x="1" y="8" width="2.6" height="3.5" rx="0.8" />
        <rect x="5" y="6" width="2.6" height="5.5" rx="0.8" />
        <rect x="9" y="3.5" width="2.6" height="8" rx="0.8" />
        <rect x="13" y="1" width="2.6" height="10.5" rx="0.8" />
      </svg>
    )}
    {show5G && (
      <span className="text-[10px] font-bold tracking-tight leading-none font-sans">5G</span>
    )}
    {/* Official Apple Wi-Fi 3-Arc Symbol */}
    <svg viewBox="0 0 16 12" className="w-[14px] h-[10px] fill-current" aria-hidden="true">
      <path d="M8 9.6a1.35 1.35 0 1 0 0 2.7 1.35 1.35 0 0 0 0-2.7Zm-3.05-1.8a4.5 4.5 0 0 1 6.1 0 .75.75 0 0 1-1.05 1.07 3 3 0 0 0-4 0 .75.75 0 0 1-1.05-1.07Zm-2.6-2.55a8.15 8.15 0 0 1 11.3 0 .75.75 0 0 1-1.05 1.07 6.65 6.65 0 0 0-9.2 0 .75.75 0 0 1-1.05-1.07ZM.25 2.75a11.75 11.75 0 0 1 15.5 0 .75.75 0 0 1-1.03 1.09 10.25 10.25 0 0 0-13.44 0A.75.75 0 0 1 .25 2.75Z" />
    </svg>
    {typeof batteryPercent === 'number' && (
      <span className="text-[10px] font-mono-tabular font-semibold leading-none">
        {batteryPercent}%
      </span>
    )}
    {/* Official Apple Proportional Battery Icon with Positive Terminal Cap */}
    <svg viewBox="0 0 26 12" className="w-[22px] h-[11px]" aria-hidden="true">
      <rect
        x="0.75"
        y="1"
        width="21"
        height="10"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
         strokeOpacity="0.55"
      />
      <rect x="2.4" y="2.6" width="17.7" height="6.8" rx="1.6" fill="#34C759" />
      <path
        d="M23 4.2v3.6a1.6 1.6 0 0 0 1.4-1.8A1.6 1.6 0 0 0 23 4.2Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </svg>
  </div>
);

/* ============================================================================
 * 4. APPLE DESIGN RESOURCES — ICON COMPOSER & GOLDEN-RATIO SQUIRCLE ICONS
 *    Every Sidebar App & OS System Utility has multi-layered vector artwork
 *    built on Apple's 1024×1024 Continuous Squircle Icon Grid specification.
 * ========================================================================== */
export type AppleAppIconId =
  | NavSectionId
  | 'launchpad'
  | 'spotlight'
  | 'quick-create'
  | 'theme'
  | 'lock';

interface AppleIconThemeSpec {
  id: AppleAppIconId;
  bgGradient: [string, string, string];
  rimColor: string;
  glowColor: string;
  categoryLabel: string;
}

export const APPLE_ICON_SPECS: Record<AppleAppIconId, AppleIconThemeSpec> = {
  overview: {
    id: 'overview',
    bgGradient: ['#0A84FF', '#0055D4', '#002D7A'],
    rimColor: 'rgba(125, 211, 252, 0.78)',
    glowColor: 'rgba(10, 132, 255, 0.45)',
    categoryLabel: 'Safari / Compass Navigation',
  },
  analytics: {
    id: 'analytics',
    bgGradient: ['#8B5CF6', '#5B21B6', '#1E1B4B'],
    rimColor: 'rgba(216, 180, 254, 0.78)',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    categoryLabel: 'Stocks / Telemetry Charts',
  },
  reports: {
    id: 'reports',
    bgGradient: ['#06B6D4', '#0284C7', '#0F172A'],
    rimColor: 'rgba(165, 243, 252, 0.78)',
    glowColor: 'rgba(6, 182, 212, 0.45)',
    categoryLabel: 'Pages / Financial Ledger',
  },
  orders: {
    id: 'orders',
    bgGradient: ['#10B981', '#059669', '#064E3B'],
    rimColor: 'rgba(167, 243, 208, 0.78)',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    categoryLabel: 'Apple Store / Bag Commerce',
  },
  products: {
    id: 'products',
    bgGradient: ['#F59E0B', '#D97706', '#78350F'],
    rimColor: 'rgba(253, 230, 138, 0.8)',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    categoryLabel: 'Reality Composer / 3D Cube',
  },
  customers: {
    id: 'customers',
    bgGradient: ['#F43F5E', '#E11D48', '#881337'],
    rimColor: 'rgba(254, 205, 211, 0.78)',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    categoryLabel: 'Contacts / People Directory',
  },
  inventory: {
    id: 'inventory',
    bgGradient: ['#F97316', '#EA580C', '#7C2D12'],
    rimColor: 'rgba(254, 215, 170, 0.78)',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    categoryLabel: 'Files / Warehouse Logistics',
  },
  development: {
    id: 'development',
    bgGradient: ['#3B82F6', '#4F46E5', '#1E1B4B'],
    rimColor: 'rgba(191, 219, 254, 0.82)',
    glowColor: 'rgba(79, 70, 229, 0.5)',
    categoryLabel: 'Xcode / Apple Design Kit',
  },
  team: {
    id: 'team',
    bgGradient: ['#14B8A6', '#0D9488', '#134E4A'],
    rimColor: 'rgba(153, 246, 228, 0.78)',
    glowColor: 'rgba(20, 184, 166, 0.45)',
    categoryLabel: 'Passwords / Security Shield',
  },
  integrations: {
    id: 'integrations',
    bgGradient: ['#EC4899', '#8B5CF6', '#311042'],
    rimColor: 'rgba(245, 208, 254, 0.8)',
    glowColor: 'rgba(217, 70, 239, 0.45)',
    categoryLabel: 'Shortcuts / API Workflows',
  },
  settings: {
    id: 'settings',
    bgGradient: ['#64748B', '#334155', '#0F172A'],
    rimColor: 'rgba(226, 232, 240, 0.78)',
    glowColor: 'rgba(148, 163, 184, 0.4)',
    categoryLabel: 'System Settings / Gear',
  },
  launchpad: {
    id: 'launchpad',
    bgGradient: ['#1E293B', '#0F172A', '#020617'],
    rimColor: 'rgba(148, 163, 184, 0.75)',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    categoryLabel: 'macOS Launchpad / App Library',
  },
  spotlight: {
    id: 'spotlight',
    bgGradient: ['#0EA5E9', '#6366F1', '#1E1B4B'],
    rimColor: 'rgba(186, 230, 253, 0.8)',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    categoryLabel: 'Spotlight Search (⌘K)',
  },
  'quick-create': {
    id: 'quick-create',
    bgGradient: ['#10B981', '#047857', '#064E3B'],
    rimColor: 'rgba(167, 243, 208, 0.8)',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    categoryLabel: 'Quick Action / New Order',
  },
  theme: {
    id: 'theme',
    bgGradient: ['#F59E0B', '#7C3AED', '#0F172A'],
    rimColor: 'rgba(253, 230, 138, 0.8)',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    categoryLabel: 'True Tone / Appearance',
  },
  lock: {
    id: 'lock',
    bgGradient: ['#F43F5E', '#9F1239', '#4C0519'],
    rimColor: 'rgba(254, 205, 211, 0.8)',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    categoryLabel: 'Lock Screen / Touch ID',
  },
};

export interface AppleSquircleIconProps {
  iconId: AppleAppIconId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  active?: boolean;
  showHIGGrid?: boolean;
  badgeCount?: number;
  className?: string;
}

export const AppleSquircleIcon: React.FC<AppleSquircleIconProps> = ({
  iconId,
  size = 'md',
  active = false,
  showHIGGrid = false,
  badgeCount,
  className = '',
}) => {
  const spec = APPLE_ICON_SPECS[iconId] || APPLE_ICON_SPECS.overview;
  const uid = `apple-icon-${iconId}`;

  // Apple Continuous Squircle proportions (~22.5% corner radius)
  const sizeMap: Record<NonNullable<AppleSquircleIconProps['size']>, string> = {
    xs: 'w-7 h-7 rounded-[7px]',
    sm: 'w-8.5 h-8.5 rounded-[9px]',
    md: 'w-11 h-11 rounded-[11.5px]',
    lg: 'w-[56px] h-[56px] rounded-[14px]',
    xl: 'w-[66px] h-[66px] rounded-[16.5px]',
    '2xl': 'w-[88px] h-[88px] rounded-[22px]',
  };

  const renderLayeredGlyph = () => {
    switch (iconId) {
      case 'overview':
        // Apple Safari / Precision Compass 3D Layered Glass Icon
        return (
          <g>
            {/* Outer Translucent Compass Ring & Tick Marks */}
            <circle
              cx="50"
              cy="50"
              r="34"
              fill="rgba(255,255,255,0.12)"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.8"
            />
            <circle
              cx="50"
              cy="50"
              r="29"
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2.2"
              strokeDasharray="1.8 4.2"
            />
            {/* North-East Red Needle & South-West Silver Glass Needle */}
            <polygon points="50,50 43,43 68,24 57,57" fill="#FF3B30" />
            <polygon points="50,50 57,57 32,76 43,43" fill="#F8FAFC" />
            <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
          </g>
        );

      case 'analytics':
        // Apple Stocks / Layered 3D Translucent Glass Columns + Spline Curve (Centered at 50,50)
        return (
          <g>
            {/* Frosted Glass Chart Bars (x=20.5 to 79.5, y=23 to 77) */}
            <rect
              x="20.5"
              y="53"
              width="11"
              height="24"
              rx="3.5"
              fill="rgba(255,255,255,0.38)"
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="1.2"
            />
            <rect
              x="36.5"
              y="41"
              width="11"
              height="36"
              rx="3.5"
              fill="rgba(255,255,255,0.58)"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="1.2"
            />
            <rect
              x="52.5"
              y="29"
              width="11"
              height="48"
              rx="3.5"
              fill="#38BDF8"
              stroke="#E0F2FE"
              strokeWidth="1.4"
            />
            <rect
              x="68.5"
              y="35"
              width="11"
              height="42"
              rx="3.5"
              fill="#FFFFFF"
            />
            {/* Glowing Trend Spline */}
            <path
              d="M22 47 Q 38 26, 54 34 T 76 23"
              fill="none"
              stroke="#FDE047"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="76" cy="23" r="4" fill="#FEF08A" />
          </g>
        );

      case 'reports':
        // Apple Pages / Frosted Glass Document with Analytics Ribbon (Centered at 50,50)
        return (
          <g>
            {/* Back Glass Sheet */}
            <rect
              x="28"
              y="19"
              width="46"
              height="58"
              rx="8"
              fill="rgba(255,255,255,0.28)"
              transform="rotate(6 51 48)"
            />
            {/* Front Specular Glass Document (x=26..74, y=20..80) */}
            <rect
              x="26"
              y="20"
              width="48"
              height="60"
              rx="8"
              fill="rgba(255,255,255,0.9)"
            />
            {/* Header Accent Pill & Data Lines */}
            <rect x="34" y="30" width="20" height="5" rx="2.5" fill="#0284C7" />
            <rect x="34" y="41" width="32" height="3.5" rx="1.75" fill="#64748B" opacity="0.6" />
            <rect x="34" y="49" width="26" height="3.5" rx="1.75" fill="#64748B" opacity="0.6" />
            {/* Mini Sparkline Inside Document */}
            <path
              d="M34 67 L44 59 L52 64 L64 53"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'orders':
        // Apple Store Bag — Layered 3D Glass Shopping Bag with Handle (Centered at 50,50)
        return (
          <g>
            {/* Braided Glass Handle (Top at y=20) */}
            <path
              d="M37 39 V33 A13 13 0 0 1 63 33 V39"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            {/* Translucent Frosted Bag Body (x=23..77, y=36..80) */}
            <rect
              x="23"
              y="36"
              width="54"
              height="44"
              rx="11"
              fill="rgba(255,255,255,0.9)"
            />
            {/* Inner Emerald Emblem */}
            <circle cx="50" cy="58" r="10" fill="#10B981" />
            <path
              d="M45.5 58.2 L48.8 61.5 L55 55"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );

      case 'products':
        // Apple Reality Composer — 3D Isometric Refractive Glass Cube (Centered at 50,50)
        return (
          <g>
            {/* Top Diamond Facet */}
            <polygon
              points="50,18 78,34 50,50 22,34"
              fill="#FEF3C7"
            />
            {/* Left Lit Facet */}
            <polygon
              points="22,34 50,50 50,82 22,66"
              fill="rgba(255,255,255,0.78)"
            />
            {/* Right Shaded Refractive Facet */}
            <polygon
              points="50,50 78,34 78,66 50,82"
              fill="rgba(255,255,255,0.42)"
            />
            {/* Specular Edges */}
            <polyline
              points="22,34 50,50 78,34"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <line x1="50" y1="50" x2="50" y2="82" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        );

      case 'customers':
        // Apple Contacts / FaceTime — Overlapping Translucent Glass People (Centered at 50,50)
        return (
          <g>
            {/* Secondary Glass Silhouette */}
            <circle cx="62" cy="38" r="9.5" fill="rgba(255,255,255,0.52)" />
            <path
              d="M46 73 C46 60 78 60 78 73 Z"
              fill="rgba(255,255,255,0.52)"
            />
            {/* Primary Specular Glass Silhouette */}
            <circle cx="42" cy="36" r="11.5" fill="#FFFFFF" />
            <path
              d="M22 75.5 C22 57.5 62 57.5 62 75.5 Z"
              fill="#FFFFFF"
            />
          </g>
        );

      case 'inventory':
        // Apple Files / Stacked 3D Glass Containers (Centered at 50,50)
        return (
          <g>
            {/* Back Layer Container */}
            <rect
              x="26"
              y="22"
              width="48"
              height="34"
              rx="7"
              fill="rgba(255,255,255,0.42)"
            />
            {/* Middle Layer Container */}
            <rect
              x="22"
              y="32"
              width="56"
              height="38"
              rx="8"
              fill="rgba(255,255,255,0.68)"
            />
            {/* Front Specular Container Drawer */}
            <rect
              x="19"
              y="43"
              width="62"
              height="35"
              rx="9"
              fill="#FFFFFF"
            />
            {/* Handle Pill Slot */}
            <rect x="41" y="57.5" width="18" height="5.5" rx="2.75" fill="#EA580C" />
          </g>
        );

      case 'development':
        // Apple Design Resources / Xcode Blueprint + Bezier Vector Curve (Centered at 50,50)
        return (
          <g>
            {/* Subtle Blueprint Grid Lines */}
            <circle
              cx="50"
              cy="50"
              r="31"
              fill="rgba(255,255,255,0.12)"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            {/* Bezier Curve & Control Handles */}
            <line x1="26" y1="68" x2="36" y2="30" stroke="#93C5FD" strokeWidth="2" />
            <line x1="74" y1="32" x2="64" y2="70" stroke="#93C5FD" strokeWidth="2" />
            <path
              d="M26 68 C 36 30, 64 70, 74 32"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4.2"
              strokeLinecap="round"
            />
            {/* Control Point Nodes */}
            <rect x="22" y="64" width="8" height="8" rx="2" fill="#38BDF8" stroke="#FFF" strokeWidth="1.5" />
            <rect x="70" y="28" width="8" height="8" rx="2" fill="#38BDF8" stroke="#FFF" strokeWidth="1.5" />
            <circle cx="50" cy="50" r="5.5" fill="#FDE047" stroke="#FFFFFF" strokeWidth="1.8" />
          </g>
        );

      case 'team':
        // Apple Passwords / Security Shield with Specular Keyhole (Centered at 50,50)
        return (
          <g>
            <path
              d="M50 18 L76 28 V49 C76 66 64 76.5 50 82 C36 76.5 24 66 24 49 V28 L50 18 Z"
              fill="rgba(255,255,255,0.9)"
            />
            <path
              d="M50 23 L71 31 V48.5 C71 62.5 61 72 50 77 V23 Z"
              fill="#CCFBF1"
              opacity="0.55"
            />
            <circle cx="50" cy="46" r="6.5" fill="#0D9488" />
            <path d="M47 50 L45.5 63 H54.5 L53 50 Z" fill="#0D9488" />
          </g>
        );

      case 'integrations':
        // Apple Shortcuts — Interlocking Iridescent Glass Squircles (Centered at 50,50)
        return (
          <g>
            {/* Bottom Layer Diamond */}
            <rect
              x="33"
              y="41"
              width="34"
              height="34"
              rx="9"
              transform="rotate(45 50 58)"
              fill="#38BDF8"
              opacity="0.88"
            />
            {/* Top Layer Translucent Glass Diamond */}
            <rect
              x="33"
              y="25"
              width="34"
              height="34"
              rx="9"
              transform="rotate(45 50 42)"
              fill="rgba(255,255,255,0.92)"
            />
            {/* Overlap Highlight */}
            <circle cx="50" cy="50" r="5" fill="#EC4899" />
          </g>
        );

      case 'settings':
        // Apple System Settings — Precision Multi-Toothed Metallic & Glass Gear (Centered at 50,50)
        return (
          <g>
            <circle
              cx="50"
              cy="50"
              r="26"
              fill="none"
              stroke="rgba(255,255,255,0.92)"
              strokeWidth="8"
              strokeDasharray="7.2 5.1"
            />
            <circle
              cx="50"
              cy="50"
              r="22"
              fill="rgba(255,255,255,0.88)"
            />
            <circle
              cx="50"
              cy="50"
              r="13"
              fill="#1E293B"
              stroke="#94A3B8"
              strokeWidth="2.5"
            />
            <circle cx="50" cy="50" r="5.5" fill="#E2E8F0" />
          </g>
        );

      case 'launchpad':
        // Official macOS Launchpad / iPadOS App Library 3×3 Colorful Squircle Grid (Centered at 50,50)
        return (
          <g>
            <rect x="21" y="21" width="16" height="16" rx="4.5" fill="#38BDF8" />
            <rect x="42" y="21" width="16" height="16" rx="4.5" fill="#A855F7" />
            <rect x="63" y="21" width="16" height="16" rx="4.5" fill="#F43F5E" />
            <rect x="21" y="42" width="16" height="16" rx="4.5" fill="#34D399" />
            <rect x="42" y="42" width="16" height="16" rx="4.5" fill="#FBBF24" />
            <rect x="63" y="42" width="16" height="16" rx="4.5" fill="#60A5FA" />
            <rect x="21" y="63" width="16" height="16" rx="4.5" fill="#FB923C" />
            <rect x="42" y="63" width="16" height="16" rx="4.5" fill="#2DD4BF" />
            <rect x="63" y="63" width="16" height="16" rx="4.5" fill="#E879F9" />
          </g>
        );

      case 'spotlight':
        // Official macOS Spotlight Optical Glass Magnifier (Centered at 50,50)
        return (
          <g>
            <circle
              cx="44"
              cy="44"
              r="19"
              fill="rgba(255,255,255,0.22)"
              stroke="#FFFFFF"
              strokeWidth="6.5"
            />
            <line
              x1="58"
              y1="58"
              x2="75"
              y2="75"
              stroke="#FFFFFF"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
          </g>
        );

      case 'quick-create':
        return (
          <g>
            <circle cx="50" cy="50" r="28" fill="rgba(255,255,255,0.22)" />
            <path
              d="M50 32 V68 M32 50 H68"
              stroke="#FFFFFF"
              strokeWidth="7"
              strokeLinecap="round"
            />
          </g>
        );

      case 'theme':
        return (
          <g>
            <circle cx="50" cy="50" r="25" fill="#FDE047" />
            <path
              d="M50 25 A25 25 0 0 0 50 75 Z"
              fill="#FFFFFF"
            />
          </g>
        );

      case 'lock':
        return (
          <g>
            <path
              d="M36 45 V35 A14 14 0 0 1 64 35 V45"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <rect x="27" y="43" width="46" height="36" rx="9" fill="#FFFFFF" />
            <circle cx="50" cy="58" r="4.5" fill="#E11D48" />
            <rect x="48" y="60" width="4" height="9" rx="2" fill="#E11D48" />
          </g>
        );
    }
  };

  return (
    <div
      data-active={active}
      className={`relative flex items-center justify-center select-none shrink-0 transition-all duration-200 ${sizeMap[size]} ${className}`}
      style={{
        boxShadow: active
          ? `0 16px 32px -4px ${spec.glowColor}, 0 6px 14px -2px rgba(0,0,0,0.55), 0 0 0 1.5px ${spec.rimColor}, inset 0 1.5px 2px rgba(255,255,255,0.8)`
          : `0 8px 18px -5px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.28), inset 0 1.5px 1.5px rgba(255,255,255,0.5)`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full block overflow-hidden rounded-[inherit]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={spec.bgGradient[0]} />
            <stop offset="52%" stopColor={spec.bgGradient[1]} />
            <stop offset="100%" stopColor={spec.bgGradient[2]} />
          </linearGradient>
          <radialGradient id={`${uid}-sheen`} cx="28%" cy="16%" r="68%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.48" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Layer 1: Apple Icon Composer Multi-Stop Base Plate */}
        <rect width="100" height="100" fill={`url(#${uid}-bg)`} />

        {/* Layer 2: Top-Left Optical Liquid Glass Refraction Sheen */}
        <rect width="100" height="100" fill={`url(#${uid}-sheen)`} />

        {/* Layer 3: Foreground Multi-Layer Vector Artwork */}
        {renderLayeredGlyph()}

        {/* Layer 4: Official Apple HIG Golden-Ratio Icon Grid Overlay (When enabled) */}
        {showHIGGrid && (
          <g stroke="rgba(255,255,255,0.58)" strokeWidth="0.75" fill="none">
            {/* Outer Safe Zone Squircle Keyline */}
            <rect x="6" y="6" width="88" height="88" rx="20" />
            {/* Diagonals */}
            <line x1="0" y1="0" x2="100" y2="100" />
            <line x1="100" y1="0" x2="0" y2="100" />
            {/* Center Crosshairs & Golden Ratio Lines */}
            <line x1="50" y1="0" x2="50" y2="100" />
            <line x1="0" y1="50" x2="100" y2="50" />
            <line x1="18" y1="0" x2="18" y2="100" strokeOpacity="0.4" />
            <line x1="82" y1="0" x2="82" y2="100" strokeOpacity="0.4" />
            <line x1="0" y1="18" x2="100" y2="18" strokeOpacity="0.4" />
            <line x1="0" y1="82" x2="100" y2="82" strokeOpacity="0.4" />
            {/* 3 Concentric Golden Ratio Circles */}
            <circle cx="50" cy="50" r="44" />
            <circle cx="50" cy="50" r="32" />
            <circle cx="50" cy="50" r="19.5" />
          </g>
        )}
      </svg>

      {/* Notification Badge */}
      {typeof badgeCount === 'number' && badgeCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 z-20 min-w-[19px] h-[19px] px-1 rounded-full bg-[#FF3B30] text-white text-[10px] font-mono-tabular font-bold flex items-center justify-center border-[1.5px] border-white shadow-md">
          {badgeCount}
        </span>
      )}
    </div>
  );
};
