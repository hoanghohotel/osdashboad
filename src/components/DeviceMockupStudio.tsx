import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { DeviceMode, DeviceOrientation, NavSectionId } from '../types/dashboard';
import {
  APPLE_BEZEL_FINISHES,
  AppleBezelFinish,
  AppleSquircleIcon,
  AppleStatusIcons,
} from './AppleDesignResources';
import { LiquidBackground } from './LiquidBackground';
import { Badge, Button, FaIcon } from './ui/liquid-shadcn';

/* ============================================================================
 * 1. Unified Sidebar Application Icon Definitions (11 Sidebar Apps)
 *    Used across Device Home Screen (SpringBoard / Launchpad) & Device Docks
 * ========================================================================== */
export interface SidebarAppDefinition {
  id: NavSectionId;
  faIcon: string;
  dockTint: string;
  dockGlow: string;
  glyphColor: string;
  group: 'workspace' | 'commerce' | 'system';
}

export const SIDEBAR_APP_DEFINITIONS: SidebarAppDefinition[] = [
  {
    id: 'overview',
    faIcon: 'fa-solid fa-compass',
    dockTint: 'rgba(10, 132, 255, 0.28)',
    dockGlow: 'rgba(10, 132, 255, 0.42)',
    glyphColor: '#38bdf8',
    group: 'workspace',
  },
  {
    id: 'analytics',
    faIcon: 'fa-solid fa-chart-pie',
    dockTint: 'rgba(139, 92, 246, 0.28)',
    dockGlow: 'rgba(139, 92, 246, 0.42)',
    glyphColor: '#c084fc',
    group: 'workspace',
  },
  {
    id: 'reports',
    faIcon: 'fa-solid fa-file-invoice-dollar',
    dockTint: 'rgba(6, 182, 212, 0.28)',
    dockGlow: 'rgba(6, 182, 212, 0.42)',
    glyphColor: '#22d3ee',
    group: 'workspace',
  },
  {
    id: 'orders',
    faIcon: 'fa-solid fa-bag-shopping',
    dockTint: 'rgba(16, 185, 129, 0.28)',
    dockGlow: 'rgba(16, 185, 129, 0.42)',
    glyphColor: '#34d399',
    group: 'commerce',
  },
  {
    id: 'products',
    faIcon: 'fa-solid fa-cubes-stacked',
    dockTint: 'rgba(245, 158, 11, 0.28)',
    dockGlow: 'rgba(245, 158, 11, 0.42)',
    glyphColor: '#fbbf24',
    group: 'commerce',
  },
  {
    id: 'customers',
    faIcon: 'fa-solid fa-user-astronaut',
    dockTint: 'rgba(244, 63, 94, 0.28)',
    dockGlow: 'rgba(244, 63, 94, 0.42)',
    glyphColor: '#fb7185',
    group: 'commerce',
  },
  {
    id: 'inventory',
    faIcon: 'fa-solid fa-boxes-stacked',
    dockTint: 'rgba(249, 115, 22, 0.28)',
    dockGlow: 'rgba(249, 115, 22, 0.42)',
    glyphColor: '#fb923c',
    group: 'commerce',
  },
  {
    id: 'development',
    faIcon: 'fa-solid fa-wand-magic-sparkles',
    dockTint: 'rgba(79, 70, 229, 0.3)',
    dockGlow: 'rgba(79, 70, 229, 0.45)',
    glyphColor: '#818cf8',
    group: 'system',
  },
  {
    id: 'team',
    faIcon: 'fa-solid fa-shield-halved',
    dockTint: 'rgba(20, 184, 166, 0.28)',
    dockGlow: 'rgba(20, 184, 166, 0.42)',
    glyphColor: '#2dd4bf',
    group: 'system',
  },
  {
    id: 'integrations',
    faIcon: 'fa-solid fa-plug',
    dockTint: 'rgba(217, 70, 239, 0.28)',
    dockGlow: 'rgba(217, 70, 239, 0.42)',
    glyphColor: '#a78bfa',
    group: 'system',
  },
  {
    id: 'settings',
    faIcon: 'fa-solid fa-sliders',
    dockTint: 'rgba(100, 116, 139, 0.28)',
    dockGlow: 'rgba(100, 116, 139, 0.4)',
    glyphColor: '#94a3b8',
    group: 'system',
  },
];

/* ============================================================================
 * 2. Device OS Home Screen (SpringBoard / iPadOS / macOS Launchpad)
 *    Displays all Sidebar sections as interactive Apple Design Resources
 *    Icon Composer Squircle App Icons + Live OS Widgets.
 * ========================================================================== */
interface DeviceHomeScreenProps {
  deviceMode: DeviceMode;
  activeSection: NavSectionId;
  onOpenApp: (section: NavSectionId) => void;
  onOpenCommandPalette: () => void;
  onOpenQuickCreate: () => void;
  ordersCount: number;
  lowStockCount: number;
  totalRevenueFormatted: string;
  conversionRate: number;
  userName: string;
  workspaceName: string;
  showHIGGrid?: boolean;
}

export const DeviceHomeScreen: React.FC<DeviceHomeScreenProps> = ({
  deviceMode,
  activeSection,
  onOpenApp,
  onOpenCommandPalette,
  onOpenQuickCreate,
  ordersCount,
  lowStockCount,
  totalRevenueFormatted,
  conversionRate,
  userName,
  workspaceName,
  showHIGGrid = false,
}) => {
  const { t } = useLanguage();
  const isIPhone = deviceMode === 'iphone';
  const isIPad = deviceMode === 'ipad';

  const getBadgeCount = (id: NavSectionId): number | undefined => {
    if (id === 'orders' && ordersCount > 0) return ordersCount;
    if (id === 'inventory' && lowStockCount > 0) return lowStockCount;
    return undefined;
  };

  return (
    <div
      className={`flex-1 flex flex-col justify-between select-none ${
        isIPhone
          ? 'px-5 pt-3 pb-2'
          : isIPad
          ? 'px-10 pt-6 pb-4'
          : 'px-8 sm:px-14 pt-8 pb-8 max-w-[1280px] w-full mx-auto'
      }`}
    >
      {/* Top Section: Apple HIG Widgets + Icon Composer App Grid */}
      <div className={isIPhone ? 'space-y-5' : 'space-y-7'}>
        {/* Top OS Liquid Glass Widgets Row */}
        <div
          className={`grid gap-3.5 ${
            isIPhone ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {/* Widget 1: Live Revenue Pulse Widget */}
          <button
            type="button"
            onClick={() => onOpenApp('overview')}
            className="glass-primary rounded-[26px] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <FaIcon icon="fa-solid fa-compass" />
                <span className="truncate">{workspaceName}</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p
              className={`font-bold font-mono-tabular tracking-tight text-[var(--text-primary)] ${
                isIPhone ? 'text-lg' : 'text-2xl'
              }`}
            >
              {totalRevenueFormatted}
            </p>
            <div className="flex items-center justify-between mt-1.5 text-[11px]">
              <span className="text-emerald-500 font-semibold">+18.4%</span>
              <span className="text-[var(--text-muted)] text-[10px]">
                {t.nav.overview} →
              </span>
            </div>
          </button>

          {/* Widget 2: Orders & Fulfillment Live Widget */}
          <button
            type="button"
            onClick={() => onOpenApp('orders')}
            className="glass-primary rounded-[26px] p-4 text-left transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <FaIcon icon="fa-solid fa-bag-shopping" />
                <span>{t.nav.orders}</span>
              </span>
              <Badge variant="success">{ordersCount} Active</Badge>
            </div>
            <p
              className={`font-bold font-mono-tabular tracking-tight text-[var(--text-primary)] ${
                isIPhone ? 'text-lg' : 'text-2xl'
              }`}
            >
              {conversionRate}% CVR
            </p>
            <div className="flex items-center justify-between mt-1.5 text-[11px]">
              <span className="text-[var(--text-secondary)] truncate">
                {lowStockCount} SKU Alert
              </span>
              <span className="text-[var(--text-muted)] text-[10px]">Open →</span>
            </div>
          </button>

          {/* Widget 3: Quick Spotlight & Operator Widget (Hidden on compact iPhone 2-col row) */}
          {!isIPhone && (
            <div className="glass-primary rounded-[26px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <FaIcon icon="fa-brands fa-apple" />
                  <span>Apple HIG Spatial Home</span>
                </span>
                <span className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
                  {userName}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  className="liquid-btn flex-1 py-2 px-3 rounded-full text-xs font-semibold text-[var(--text-primary)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FaIcon
                    icon="fa-solid fa-magnifying-glass"
                    className="text-[var(--accent-primary)]"
                  />
                  <span>Spotlight (⌘K)</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenQuickCreate}
                  className="liquid-btn-primary py-2 px-3.5 rounded-full text-xs font-semibold text-white flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <FaIcon icon="fa-solid fa-plus" />
                  <span>{t.welcome.newOrderBtn}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main OS Application Icon Grid — Official Apple Icon Composer Squircles */}
        <div
          className={`grid place-items-center ${
            isIPhone
              ? 'grid-cols-4 gap-x-3 gap-y-5 pt-1'
              : isIPad
              ? 'grid-cols-5 sm:grid-cols-6 gap-x-6 gap-y-7 pt-2'
              : 'grid-cols-4 sm:grid-cols-6 gap-x-8 gap-y-8 pt-3'
          }`}
        >
          {SIDEBAR_APP_DEFINITIONS.map((app) => {
            const badge = getBadgeCount(app.id);
            const isCurrent = activeSection === app.id;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => onOpenApp(app.id)}
                className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer w-full"
              >
                <AppleSquircleIcon
                  iconId={app.id}
                  size={isIPhone ? 'lg' : 'xl'}
                  active={isCurrent}
                  showHIGGrid={showHIGGrid}
                  badgeCount={badge}
                  className="group-hover:-translate-y-1.5 group-hover:scale-108 group-active:scale-95"
                />
                <span
                  className={`font-medium text-[var(--text-primary)] text-center leading-tight truncate max-w-[88px] drop-shadow-xs ${
                    isIPhone ? 'text-[11px]' : 'text-xs'
                  }`}
                >
                  {t.nav[app.id]}
                </span>
              </button>
            );
          })}

          {/* Quick Create Action App Icon on Home Screen */}
          <button
            type="button"
            onClick={onOpenQuickCreate}
            className="group flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer w-full"
          >
            <AppleSquircleIcon
              iconId="quick-create"
              size={isIPhone ? 'lg' : 'xl'}
              showHIGGrid={showHIGGrid}
              className="group-hover:-translate-y-1.5 group-hover:scale-108 group-active:scale-95"
            />
            <span
              className={`font-medium text-[var(--text-primary)] text-center leading-tight truncate max-w-[88px] drop-shadow-xs ${
                isIPhone ? 'text-[11px]' : 'text-xs'
              }`}
            >
              {t.welcome.newOrderBtn}
            </span>
          </button>
        </div>
      </div>

      {/* iOS / iPadOS SpringBoard Search Pill & Page Indicator */}
      <div className="flex flex-col items-center gap-2 pt-3 pb-1">
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="px-3.5 py-1 rounded-full glass-interactive text-[11px] font-semibold text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform"
        >
          <FaIcon icon="fa-solid fa-magnifying-glass" className="text-[10px] opacity-80" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. Internal Device Dock (<DeviceInternalDock />)
 *    Uses Official Apple Design Resources Squircle App Icons:
 *    - iPhone ('iphone'): Strictly 4 icons pinned inside bottom of iPhone
 *    - iPad   ('ipad')  : Strictly 13 icons pinned inside bottom of iPad
 *    - MacBook / Full   : Full macOS Tahoe Dock with all Sidebar apps + tools
 * ========================================================================== */
export interface DeviceInternalDockProps {
  deviceMode: DeviceMode;
  activeSection: NavSectionId;
  isHomeScreenOpen: boolean;
  onSelectSection: (section: NavSectionId) => void;
  onToggleHomeScreen: () => void;
  onSelectDeviceMode: (mode: DeviceMode) => void;
  onOpenCommandPalette: () => void;
  onOpenQuickCreate: () => void;
  ordersCount: number;
  lowStockCount: number;
  isAuthenticated: boolean;
  onToggleLock: () => void;
  showHIGGrid?: boolean;
}

export const DeviceInternalDock: React.FC<DeviceInternalDockProps> = ({
  deviceMode,
  activeSection,
  isHomeScreenOpen,
  onSelectSection,
  onToggleHomeScreen,
  onOpenCommandPalette,
  ordersCount,
  lowStockCount,
  isAuthenticated,
  onToggleLock,
  showHIGGrid = false,
}) => {
  const { mode, toggleMode } = useTheme();
  const { t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [bouncingId, setBouncingId] = useState<string | null>(null);

  const triggerBounce = (id: string) => {
    setBouncingId(id);
    setTimeout(() => setBouncingId(null), 420);
  };

  const getBadge = (id: NavSectionId): number | undefined => {
    if (id === 'orders' && ordersCount > 0) return ordersCount;
    if (id === 'inventory' && lowStockCount > 0) return lowStockCount;
    return undefined;
  };

  // CASE A: iPHONE DOCK — Strictly 4 Icons Inside Bottom of iPhone Screen
  if (deviceMode === 'iphone') {
    const iphoneFourApps = SIDEBAR_APP_DEFINITIONS.filter((a) =>
      ['overview', 'analytics', 'orders', 'settings'].includes(a.id)
    );

    return (
      <div className="px-3.5 pt-5 pb-1 shrink-0 z-30 select-none overflow-visible">
        <div
          className="px-4 py-3 rounded-[32px] grid grid-cols-4 place-items-center gap-3 overflow-visible"
          style={{
            background:
              mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.14) 0%, rgba(15, 23, 42, 0.48) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.36) 100%)',
            backdropFilter: 'blur(42px) saturate(210%)',
            WebkitBackdropFilter: 'blur(42px) saturate(210%)',
            boxShadow:
              mode === 'dark'
                ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.26), 0 16px 34px -8px rgba(0, 0, 0, 0.68)'
                : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.88), 0 14px 30px -8px rgba(15, 23, 42, 0.16)',
            border:
              mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(255, 255, 255, 0.74)',
          }}
        >
          {iphoneFourApps.map((app) => {
            const isActive = !isHomeScreenOpen && activeSection === app.id;
            const badge = getBadge(app.id);
            return (
              <div
                key={app.id}
                className="relative flex items-center justify-center w-[56px] h-[56px] overflow-visible"
              >
                <button
                  type="button"
                  onClick={() => {
                    triggerBounce(app.id);
                    onSelectSection(app.id);
                  }}
                  title={t.nav[app.id]}
                  aria-label={t.nav[app.id]}
                  className={`flex items-center justify-center w-full h-full cursor-pointer origin-bottom transition-all duration-200 ${
                    isActive
                      ? '-translate-y-4 scale-[1.15] z-20'
                      : 'translate-y-0 scale-100 hover:-translate-y-2 hover:scale-[1.06]'
                  } ${bouncingId === app.id ? 'animate-bounce' : ''}`}
                >
                  <AppleSquircleIcon
                    iconId={app.id}
                    size="lg"
                    active={isActive}
                    showHIGGrid={showHIGGrid}
                    badgeCount={badge}
                  />
                </button>
                <span
                  className={`pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--text-primary)] opacity-95 scale-100 shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                      : 'opacity-0 scale-50'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // CASE B: iPAD DOCK — Strictly 13 Icons Inside Bottom of iPad Screen
  // (1 App Library/Home Icon + 11 Sidebar App Icons + 1 Spotlight Search Icon = 13 Icons)
  if (deviceMode === 'ipad') {
    return (
      <div className="px-4 pt-5 pb-1 flex justify-center shrink-0 z-30 select-none overflow-visible">
        <div
          className="px-3.5 py-2.5 rounded-[28px] flex items-center justify-center gap-2 max-w-full overflow-visible"
          style={{
            background:
              mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(15, 23, 42, 0.46) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.34) 100%)',
            backdropFilter: 'blur(42px) saturate(210%)',
            WebkitBackdropFilter: 'blur(42px) saturate(210%)',
            boxShadow:
              mode === 'dark'
                ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 18px 36px -8px rgba(0, 0, 0, 0.68)'
                : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.88), 0 16px 34px -8px rgba(15, 23, 42, 0.16)',
            border:
              mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.16)'
                : '1px solid rgba(255, 255, 255, 0.72)',
          }}
        >
          {/* Icon #1: iPadOS Home Screen / App Library Launcher */}
          <div className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible">
            <button
              type="button"
              onClick={() => {
                triggerBounce('home');
                onToggleHomeScreen();
              }}
              title="Home Screen / App Library"
              className={`flex items-center justify-center w-full h-full cursor-pointer origin-bottom transition-all duration-200 ${
                isHomeScreenOpen
                  ? '-translate-y-4 scale-[1.18] z-20'
                  : 'translate-y-0 scale-100 hover:-translate-y-2.5 hover:scale-[1.1]'
              } ${bouncingId === 'home' ? 'animate-bounce' : ''}`}
            >
              <AppleSquircleIcon
                iconId="launchpad"
                size="md"
                active={isHomeScreenOpen}
                showHIGGrid={showHIGGrid}
              />
            </button>
            <span
              className={`pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                isHomeScreenOpen
                  ? 'bg-[var(--text-primary)] opacity-95 scale-100 shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                  : 'opacity-0 scale-50'
              }`}
            />
          </div>

          <div className="h-7 w-px bg-[var(--glass-border-strong)] mx-0.5 self-center shrink-0" />

          {/* Icons #2 to #12: All 11 Sidebar Application Icons */}
          {SIDEBAR_APP_DEFINITIONS.map((app) => {
            const isActive = !isHomeScreenOpen && activeSection === app.id;
            const badge = getBadge(app.id);
            return (
              <div
                key={app.id}
                className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible"
              >
                <button
                  type="button"
                  onClick={() => {
                    triggerBounce(app.id);
                    onSelectSection(app.id);
                  }}
                  title={t.nav[app.id]}
                  aria-label={t.nav[app.id]}
                  className={`flex items-center justify-center w-full h-full cursor-pointer origin-bottom transition-all duration-200 ${
                    isActive
                      ? '-translate-y-4 scale-[1.18] z-20'
                      : 'translate-y-0 scale-100 hover:-translate-y-2.5 hover:scale-[1.1]'
                  } ${bouncingId === app.id ? 'animate-bounce' : ''}`}
                >
                  <AppleSquircleIcon
                    iconId={app.id}
                    size="md"
                    active={isActive}
                    showHIGGrid={showHIGGrid}
                    badgeCount={badge}
                  />
                </button>
                <span
                  className={`pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--text-primary)] opacity-95 scale-100 shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                      : 'opacity-0 scale-50'
                  }`}
                />
              </div>
            );
          })}

          <div className="h-7 w-px bg-[var(--glass-border-strong)] mx-0.5 self-center shrink-0" />

          {/* Icon #13: Spotlight Search (⌘K) */}
          <div className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Spotlight Search (⌘K)"
              className="flex items-center justify-center w-full h-full cursor-pointer origin-bottom transition-all duration-200 hover:-translate-y-2.5 hover:scale-[1.1]"
            >
              <AppleSquircleIcon
                iconId="spotlight"
                size="md"
                showHIGGrid={showHIGGrid}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CASE C: MACBOOK PRO / FULL DESKTOP DOCK
  const getDockItemTransform = (idx: number, isActive: boolean) => {
    if (hoveredIdx !== null) {
      const dist = Math.abs(hoveredIdx - idx);
      if (dist === 0) return 'scale-[1.24] -translate-y-5 z-30';
      if (dist === 1) {
        return isActive
          ? 'scale-[1.18] -translate-y-4 z-20'
          : 'scale-[1.1] -translate-y-2 z-10';
      }
    }
    if (isActive) {
      return 'scale-[1.18] -translate-y-4 z-20';
    }
    return 'scale-100 translate-y-0 z-0';
  };

  return (
    <div
      className={`${
        deviceMode === 'full'
          ? 'fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[98vw]'
          : 'px-4 pt-5 pb-2 flex justify-center shrink-0 z-30'
      } select-none overflow-visible`}
    >
      <div
        className="px-3.5 py-2.5 rounded-[26px] flex items-center justify-center gap-2 overflow-visible"
        style={{
          background:
            mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.11) 0%, rgba(15, 23, 42, 0.44) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.62) 0%, rgba(255, 255, 255, 0.32) 100%)',
          backdropFilter: 'blur(42px) saturate(210%)',
          WebkitBackdropFilter: 'blur(42px) saturate(210%)',
          boxShadow:
            mode === 'dark'
              ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.25), 0 22px 46px -10px rgba(0, 0, 0, 0.72)'
              : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.88), 0 18px 42px -10px rgba(15, 23, 42, 0.16)',
          border:
            mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.16)'
              : '1px solid rgba(255, 255, 255, 0.72)',
        }}
      >
        {/* Launchpad / Home Screen Toggle Icon */}
        {isAuthenticated && (
          <>
            <div className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible">
              {hoveredLabel === 'launchpad' && (
                <div className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
                  Launchpad (All Apps)
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  triggerBounce('launchpad');
                  onToggleHomeScreen();
                }}
                onMouseEnter={() => {
                  setHoveredIdx(-1);
                  setHoveredLabel('launchpad');
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  setHoveredLabel(null);
                }}
                className={`flex items-center justify-center w-full h-full cursor-pointer shrink-0 origin-bottom transition-all duration-200 ${getDockItemTransform(
                  -1,
                  isHomeScreenOpen
                )} ${bouncingId === 'launchpad' ? 'animate-bounce' : ''}`}
              >
                <AppleSquircleIcon
                  iconId="launchpad"
                  size="md"
                  active={isHomeScreenOpen}
                  showHIGGrid={showHIGGrid}
                />
              </button>
              <span
                className={`pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isHomeScreenOpen
                    ? 'bg-[var(--text-primary)] opacity-95 scale-100 shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                    : 'opacity-0 scale-50'
                }`}
              />
            </div>

            <div className="h-7 w-px bg-[var(--glass-border-strong)] mx-0.5 self-center shrink-0" />
          </>
        )}

        {/* All 11 Sidebar Application Icons */}
        {SIDEBAR_APP_DEFINITIONS.map((app, idx) => {
          const isActive = isAuthenticated && !isHomeScreenOpen && activeSection === app.id;
          const badge = getBadge(app.id);
          return (
            <div
              key={app.id}
              className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible"
            >
              {hoveredLabel === app.id && (
                <div className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
                  {t.nav[app.id]}
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  triggerBounce(app.id);
                  onSelectSection(app.id);
                }}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  setHoveredLabel(app.id);
                }}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  setHoveredLabel(null);
                }}
                aria-label={t.nav[app.id]}
                className={`flex items-center justify-center w-full h-full cursor-pointer shrink-0 origin-bottom transition-all duration-200 ${getDockItemTransform(
                  idx,
                  isActive
                )} ${bouncingId === app.id ? 'animate-bounce' : ''}`}
              >
                <AppleSquircleIcon
                  iconId={app.id}
                  size="md"
                  active={isActive}
                  showHIGGrid={showHIGGrid}
                  badgeCount={badge}
                />
              </button>
              <span
                className={`pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-[var(--text-primary)] opacity-95 scale-100 shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                    : 'opacity-0 scale-50'
                }`}
              />
            </div>
          );
        })}

        <div className="h-7 w-px bg-[var(--glass-border-strong)] mx-0.5 self-center shrink-0" />

        {/* System Utilities: Spotlight, Appearance Mode, Lock — Aligned on the exact same axis */}
        <div className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible">
          {hoveredLabel === 'spotlight' && (
            <div className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
              Spotlight Search (⌘K)
            </div>
          )}
          <button
            type="button"
            onClick={onOpenCommandPalette}
            onMouseEnter={() => {
              setHoveredIdx(20);
              setHoveredLabel('spotlight');
            }}
            onMouseLeave={() => {
              setHoveredIdx(null);
              setHoveredLabel(null);
            }}
            title="Spotlight Search (⌘K)"
            className={`flex items-center justify-center w-full h-full cursor-pointer shrink-0 origin-bottom transition-all duration-200 ${getDockItemTransform(
              20,
              false
            )}`}
          >
            <AppleSquircleIcon iconId="spotlight" size="md" showHIGGrid={showHIGGrid} />
          </button>
        </div>

        <div className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible">
          {hoveredLabel === 'theme' && (
            <div className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
              {mode === 'dark' ? t.app.themeLight : t.app.themeDark}
            </div>
          )}
          <button
            type="button"
            onClick={toggleMode}
            onMouseEnter={() => {
              setHoveredIdx(21);
              setHoveredLabel('theme');
            }}
            onMouseLeave={() => {
              setHoveredIdx(null);
              setHoveredLabel(null);
            }}
            title={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
            className={`flex items-center justify-center w-full h-full cursor-pointer shrink-0 origin-bottom transition-all duration-200 ${getDockItemTransform(
              21,
              false
            )}`}
          >
            <AppleSquircleIcon iconId="theme" size="md" showHIGGrid={showHIGGrid} />
          </button>
        </div>

        <div className="relative flex items-center justify-center w-11 h-11 shrink-0 overflow-visible">
          {hoveredLabel === 'lock' && (
            <div className="hidden sm:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
              {isAuthenticated ? 'Lock Screen' : 'Unlock'}
            </div>
          )}
          <button
            type="button"
            onClick={onToggleLock}
            onMouseEnter={() => {
              setHoveredIdx(22);
              setHoveredLabel('lock');
            }}
            onMouseLeave={() => {
              setHoveredIdx(null);
              setHoveredLabel(null);
            }}
            title={isAuthenticated ? 'Lock Screen' : 'Unlock'}
            className={`flex items-center justify-center w-full h-full cursor-pointer shrink-0 origin-bottom transition-all duration-200 ${getDockItemTransform(
              22,
              false
            )}`}
          >
            <AppleSquircleIcon iconId="lock" size="md" showHIGGrid={showHIGGrid} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. Official Apple Design Resources Product Bezel Wrapper (<DeviceMockupFrame />)
 *    Ref: https://developer.apple.com/design/resources/#product-bezels
 *    - MacBook Pro 16"   : 1440 × 900 px (Desktop Viewport Locked)
 *    - iPad Pro 13" M4   : 1180 × 820 px Landscape / 820 × 1180 px Portrait
 *    - iPhone 16 Pro Max : 430 × 932 px Portrait / 932 × 430 px Landscape
 * ========================================================================== */
interface DeviceMockupFrameProps {
  deviceMode: DeviceMode;
  onSelectDeviceMode: (mode: DeviceMode) => void;
  orientation: DeviceOrientation;
  onToggleOrientation: () => void;
  isHomeScreenOpen?: boolean;
  onToggleHomeScreen?: () => void;
  bottomDock?: React.ReactNode;
  children: React.ReactNode;
}

export const DeviceMockupFrame: React.FC<DeviceMockupFrameProps> = ({
  deviceMode,
  onSelectDeviceMode,
  orientation,
  onToggleOrientation,
  isHomeScreenOpen = false,
  onToggleHomeScreen,
  bottomDock,
  children,
}) => {
  const { mode } = useTheme();
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [scaleMode, setScaleMode] = useState<'fit' | 'native'>('fit');
  const [bezelFinish, setBezelFinish] = useState<AppleBezelFinish>('space-black');
  const [dynamicIslandExpanded, setDynamicIslandExpanded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth - 32 : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight - 130 : 900,
  });

  useEffect(() => {
    const updateSize = () => {
      const w = stageRef.current?.clientWidth || window.innerWidth - 32;
      const h = Math.max(500, window.innerHeight - 125);
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
    return (
      <div className="min-h-screen flex flex-col pb-24">
        {children}
        {bottomDock}
      </div>
    );
  }

  // Exact Fixed Logical Pixel Resolutions per Apple Design Resources Templates
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
      chip: 'Apple Design Resources · M4 Max · Liquid Retina XDR',
      screenW: 1440,
      screenH: 900,
      frameExtraW: 84,
      frameExtraH: 94,
      viewportClass: 'device-viewport-macbook',
      icon: 'fa-solid fa-laptop',
    },
    ipad: {
      name: 'iPad Pro 13" (M4)',
      chip: 'Apple Design Resources · Ultra Retina Tandem OLED · 13-Icon Dock',
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
      chip: 'Apple Design Resources · Grade 5 Titanium · 4-Icon Dock',
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
  const finishSpec = APPLE_BEZEL_FINISHES[bezelFinish];
  const totalHardwareW = activeSpec.screenW + activeSpec.frameExtraW;
  const totalHardwareH = activeSpec.screenH + activeSpec.frameExtraH;

  // Compute proportional scale so the exact pixel resolution fits any viewer screen
  const scaleX = (stageSize.width - 16) / totalHardwareW;
  const scaleY = (stageSize.height - 12) / totalHardwareH;
  const autoFitScale = Math.min(1, Math.max(0.24, Math.min(scaleX, scaleY)));
  const effectiveScale = scaleMode === 'native' ? 1 : autoFitScale;
  const scaledPercent = Math.round(effectiveScale * 100);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-3 pb-8 px-2 sm:px-6 select-none overflow-x-hidden">
      {/* Top Floating Apple Design Resources Bezel Studio Bar */}
      <div className="w-full max-w-[1440px] mb-3 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-3xl glass-floating">
        <div className="flex items-center gap-3">
          <AppleSquircleIcon iconId="development" size="sm" active />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <FaIcon icon="fa-brands fa-apple" />
                <span>{activeSpec.name}</span>
              </span>
              <Badge variant="default">
                {activeSpec.screenW} × {activeSpec.screenH} pt/px
              </Badge>
              <Badge variant="secondary">{scaledPercent}% Scale</Badge>
              <Badge variant="outline">{finishSpec.name}</Badge>
            </div>
            <p className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
              {activeSpec.chip}
            </p>
          </div>
        </div>

        {/* Device Switcher Pills + Hardware Finish Swatches + Orientation & Scale Mode */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Official Apple Hardware Bezel Finish Swatches */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-interactive"
            title="Apple Product Bezel Finish"
          >
            <span className="text-[10px] font-semibold text-[var(--text-muted)] hidden xl:inline mr-0.5">
              Finish:
            </span>
            {(Object.keys(APPLE_BEZEL_FINISHES) as AppleBezelFinish[]).map((finKey) => {
              const fin = APPLE_BEZEL_FINISHES[finKey];
              const isSelected = bezelFinish === finKey;
              return (
                <button
                  key={finKey}
                  type="button"
                  onClick={() => {
                    setBezelFinish(finKey);
                    addToast(
                      `Apple Bezel: ${fin.name}`,
                      `Applied official ${fin.name} hardware chassis finish.`,
                      'info'
                    );
                  }}
                  title={fin.name}
                  aria-label={fin.name}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer border ${
                    isSelected
                      ? 'scale-120 ring-2 ring-[var(--accent-primary)] border-white'
                      : 'opacity-75 hover:opacity-100 border-white/40'
                  }`}
                  style={{ backgroundColor: fin.swatchHex }}
                />
              );
            })}
          </div>

          {onToggleHomeScreen && (
            <Button
              size="sm"
              variant={isHomeScreenOpen ? 'default' : 'secondary'}
              leftFaIcon="fa-solid fa-table-cells-large"
              onClick={onToggleHomeScreen}
            >
              <span>{isHomeScreenOpen ? 'Home Screen (Active)' : 'Home Screen'}</span>
            </Button>
          )}

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
            <span>
              {scaleMode === 'fit'
                ? '100% Native px'
                : `Auto Fit (${Math.round(autoFitScale * 100)}%)`}
            </span>
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
           * CASE 1: APPLE MACBOOK PRO 16" PRODUCT BEZEL (FIXED 1440 × 900 PX)
           * =============================================================== */}
          {deviceMode === 'macbook' && (
            <div className="flex flex-col items-center shrink-0">
              {/* Upper Display Lid & Anodized Aluminum Bezel */}
              <div
                className="rounded-t-[34px] p-3 pb-4.5 relative"
                style={{
                  background: finishSpec.outerShellBg,
                  boxShadow: finishSpec.outerShadow,
                  border: `2px solid ${finishSpec.outerBorder}`,
                }}
              >
                {/* Inner Liquid Retina XDR Screen — Locked to Exact 1440 × 900 px */}
                <div
                  className="rounded-t-[18px] rounded-b-[4px] overflow-hidden flex flex-col relative border border-black/80"
                  style={{
                    width: `${activeSpec.screenW}px`,
                    height: `${activeSpec.screenH}px`,
                    backgroundColor: mode === 'dark' ? '#080b12' : '#f2f4f8',
                  }}
                >
                  {/* Seamless Flush MacBook Camera Housing Notch at Top Center of Screen */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-40 w-[164px] h-[24px] bg-[#06070a] rounded-b-[12px] flex items-center justify-center gap-2.5 border-x border-b border-white/10 shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#131722] border border-white/25 relative flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-sky-400/80" />
                    </span>
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse"
                      title="12MP Center Stage Camera Active"
                    />
                  </div>

                  <LiquidBackground embedded />

                  {/* Official macOS Tahoe 26 Status Menu Bar (28px height) */}
                  <div className="h-7 px-4 bg-black/35 backdrop-blur-2xl text-white/95 text-[11px] font-medium flex items-center justify-between shrink-0 z-30 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={onToggleHomeScreen}
                        className="font-bold flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer"
                      >
                        <FaIcon icon="fa-brands fa-apple" className="text-[13px]" />
                        <span>{t.app.brand}</span>
                      </button>
                      {onToggleHomeScreen && (
                        <button
                          type="button"
                          onClick={onToggleHomeScreen}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                            isHomeScreenOpen
                              ? 'bg-sky-500/35 text-sky-300 border border-sky-400/40'
                              : 'hover:bg-white/10 opacity-85'
                          }`}
                        >
                          <FaIcon icon="fa-solid fa-table-cells-large" className="mr-1" />
                          Launchpad
                        </button>
                      )}
                      <span className="opacity-85">File</span>
                      <span className="opacity-85">Edit</span>
                      <span className="opacity-85">View</span>
                      <span className="opacity-85">Window</span>
                      <span className="opacity-85">Help</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono-tabular text-[10px]">
                      <span className="text-[#34C759]">● 1440 × 900 · Liquid Retina XDR</span>
                      <AppleStatusIcons showCellular={false} batteryPercent={100} />
                      <span>Sun Oct 18 9:41 AM</span>
                    </div>
                  </div>

                  {/* Live Scrollable Website Viewport Locked to 1440 × 900 Desktop Layout */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text flex flex-col ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {children}
                  </div>

                  {/* Internal macOS Dock Pinned at Bottom Inside MacBook Screen */}
                  {bottomDock}
                </div>

                {/* Bottom Chin Bezel with MacBook Pro Metallic Wordmark */}
                <div className="pt-1.5 flex items-center justify-center">
                  <span className="text-[9.5px] tracking-[0.24em] uppercase font-semibold text-white/50">
                    MacBook Pro
                  </span>
                </div>
              </div>

              {/* Lower Aluminum Unibody Base Deck, Thumb Scoop Lip & Rubber Feet */}
              <div className="flex flex-col items-center">
                <div
                  className="w-[1520px] h-5 rounded-b-[22px] rounded-t-[2px] relative flex justify-center items-start"
                  style={{
                    background: finishSpec.deckGradient,
                    boxShadow:
                      'inset 0 1px 1px rgba(255,255,255,0.75), 0 22px 45px rgba(0,0,0,0.68)',
                  }}
                >
                  <div
                    className="w-36 h-2.5 rounded-b-xl"
                    style={{
                      background: finishSpec.lipGradient,
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
                    }}
                  />
                </div>
                <div className="w-[1380px] flex justify-between px-12">
                  <div className="w-16 h-1 rounded-b-md bg-black/75" />
                  <div className="w-16 h-1 rounded-b-md bg-black/75" />
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
           * CASE 2: APPLE IPAD PRO 13" M4 PRODUCT BEZEL (1180×820 / 820×1180)
           * =============================================================== */}
          {deviceMode === 'ipad' && (
            <div className="relative shrink-0">
              {/* Physical Side Hardware Buttons & Apple Pencil Magnetic Strip */}
              <div
                className="absolute -top-1.5 left-16 w-12 h-1.5 rounded-t-md"
                style={{ backgroundColor: finishSpec.buttonBg }}
              />
              <div
                className="absolute top-20 -right-1.5 w-1.5 h-10 rounded-r-md"
                style={{ backgroundColor: finishSpec.buttonBg }}
              />
              <div
                className="absolute top-32 -right-1.5 w-1.5 h-10 rounded-r-md"
                style={{ backgroundColor: finishSpec.buttonBg }}
              />

              {/* Ultra-Thin 5.1mm Uniform Symmetrical Bezel */}
              <div
                className="rounded-[44px] p-4 relative"
                style={{
                  background: finishSpec.outerShellBg,
                  boxShadow: finishSpec.outerShadow,
                  border: `2px solid ${finishSpec.outerBorder}`,
                }}
              >
                {/* Landscape TrueDepth Camera Array Centered on Top Bezel */}
                <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#151924] border border-white/25" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]/85" />
                </div>

                {/* Inner Ultra Retina XDR Tandem OLED Display */}
                <div
                  className="rounded-[30px] overflow-hidden flex flex-col relative border border-black/70"
                  style={{
                    width: `${activeSpec.screenW}px`,
                    height: `${activeSpec.screenH}px`,
                    backgroundColor: mode === 'dark' ? '#080b12' : '#f2f4f8',
                  }}
                >
                  <LiquidBackground embedded />

                  {/* Official iPadOS 26 Status Bar + Multitasking 3-Dot Control */}
                  <div className="h-7 px-5 bg-black/25 backdrop-blur-md text-[var(--text-primary)] text-[11px] font-semibold flex items-center justify-between shrink-0 z-30 border-b border-[var(--glass-border)]">
                    <div className="flex items-center gap-2.5 font-mono-tabular">
                      <span>9:41 AM</span>
                      <span className="opacity-65">Sun Oct 18</span>
                    </div>

                    {/* Official iPadOS Multitasking 3-Dot Window Control + Home Toggle */}
                    <div className="flex items-center gap-2">
                      {onToggleHomeScreen && (
                        <button
                          type="button"
                          onClick={onToggleHomeScreen}
                          title="Toggle iPadOS Home Screen / Stage Manager"
                          className="px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-[10px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-0.5">
                            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                            <span className="w-1 h-1 rounded-full bg-current opacity-70" />
                          </span>
                          <span>{isHomeScreenOpen ? 'iPadOS Home' : 'Stage Manager'}</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-tabular text-[var(--accent-primary)]">
                        {activeSpec.screenW}×{activeSpec.screenH}
                      </span>
                      <AppleStatusIcons showCellular show5G batteryPercent={100} />
                    </div>
                  </div>

                  {/* Live Scrollable Website / Home Screen Viewport Locked to iPad Resolution */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text flex flex-col ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {children}
                  </div>

                  {/* 13-Icon iPadOS Dock Pinned Inside Bottom of iPad Screen */}
                  {bottomDock}

                  {/* Interactive Bottom iPadOS Home Indicator Bar */}
                  <button
                    type="button"
                    onClick={onToggleHomeScreen}
                    title="Click Home Indicator to switch between App and iPad Home Screen"
                    className="h-5 w-full flex items-center justify-center shrink-0 bg-black/10 backdrop-blur-xs cursor-pointer group"
                  >
                    <div className="w-36 h-1.5 rounded-full bg-[var(--text-primary)]/50 group-hover:bg-[var(--accent-primary)] transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
           * CASE 3: APPLE IPHONE 16 PRO MAX PRODUCT BEZEL (430×932 / 932×430)
           * =============================================================== */}
          {deviceMode === 'iphone' && (
            <div className="relative shrink-0">
              {/* Physical Grade 5 Titanium Side Buttons + Camera Control Button */}
              {orientation === 'portrait' && (
                <>
                  <div
                    className="absolute top-28 -left-1.5 w-1.5 h-7 rounded-l-md"
                    style={{ backgroundColor: finishSpec.buttonBg }}
                    title="Action Button"
                  />
                  <div
                    className="absolute top-40 -left-1.5 w-1.5 h-12 rounded-l-md"
                    style={{ backgroundColor: finishSpec.buttonBg }}
                    title="Volume Up"
                  />
                  <div
                    className="absolute top-56 -left-1.5 w-1.5 h-12 rounded-l-md"
                    style={{ backgroundColor: finishSpec.buttonBg }}
                    title="Volume Down"
                  />
                  <div
                    className="absolute top-44 -right-1.5 w-1.5 h-16 rounded-r-md"
                    style={{ backgroundColor: finishSpec.buttonBg }}
                    title="Side Button (Power / Siri)"
                  />
                  <div
                    className="absolute bottom-52 -right-1 w-1 h-12 rounded-r-sm opacity-85"
                    style={{ backgroundColor: finishSpec.buttonBg }}
                    title="Camera Control Capacitive Button"
                  />
                </>
              )}

              {/* Grade 5 Titanium Outer Chassis */}
              <div
                className="rounded-[58px] p-3.5 relative"
                style={{
                  background: finishSpec.outerShellBg,
                  boxShadow: finishSpec.outerShadow,
                  border: `2.5px solid ${finishSpec.outerBorder}`,
                }}
              >
                {/* Inner Super Retina XDR OLED Screen — Locked to Exact 430×932 or 932×430 px */}
                <div
                  className="rounded-[46px] overflow-hidden flex flex-col relative border border-black/80"
                  style={{
                    width: `${activeSpec.screenW}px`,
                    height: `${activeSpec.screenH}px`,
                    backgroundColor: mode === 'dark' ? '#080b12' : '#f2f4f8',
                  }}
                >
                  <LiquidBackground embedded />

                  {/* Official iOS 26 Status Bar + Interactive Dynamic Island */}
                  <div className="pt-2.5 pb-1.5 px-6 flex items-center justify-between shrink-0 z-30 relative">
                    <button
                      type="button"
                      onClick={onToggleHomeScreen}
                      title="Return to iPhone Home Screen"
                      className="text-[13px] font-bold font-sans tracking-tight text-[var(--text-primary)] hover:text-[var(--accent-primary)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>9:41</span>
                      {!isHomeScreenOpen && onToggleHomeScreen && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[var(--accent-soft)] text-[var(--accent-primary)] text-[9px] font-sans">
                          Home
                        </span>
                      )}
                    </button>

                    {/* Official Apple Dynamic Island Cutout & Live Activity */}
                    <button
                      type="button"
                      onClick={() => setDynamicIslandExpanded((v) => !v)}
                      onMouseEnter={() => setDynamicIslandExpanded(true)}
                      onMouseLeave={() => setDynamicIslandExpanded(false)}
                      className={`bg-black text-white rounded-full transition-all duration-300 flex items-center justify-between px-3 cursor-pointer shadow-lg border border-white/10 ${
                        dynamicIslandExpanded ? 'w-56 h-9' : 'w-[122px] h-[34px]'
                      }`}
                    >
                      {dynamicIslandExpanded ? (
                        <>
                          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#34C759] truncate">
                            <FaIcon icon="fa-solid fa-wave-square" className="fa-beat-fade" />
                            <span>
                              {activeSpec.screenW}×{activeSpec.screenH}pt
                            </span>
                          </span>
                          <span className="text-[10px] font-mono-tabular text-[#0A84FF]">
                            Live +18.4%
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0f131d] border border-white/15" />
                          <span className="w-3 h-3 rounded-full bg-[#111827] border border-sky-400/30 flex items-center justify-center">
                            <span className="w-1 h-1 rounded-full bg-sky-400/70" />
                          </span>
                        </>
                      )}
                    </button>

                    <AppleStatusIcons
                      showCellular
                      show5G
                      className="text-[var(--text-primary)]"
                    />
                  </div>

                  {/* Live Scrollable Mobile Website / SpringBoard Home Screen Viewport */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text flex flex-col ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {children}
                  </div>

                  {/* 4-Icon iOS Dock Pinned Inside Bottom of iPhone Screen */}
                  {bottomDock}

                  {/* Interactive Bottom iOS Home Indicator Bar */}
                  <button
                    type="button"
                    onClick={onToggleHomeScreen}
                    title="Click Home Indicator to return to iPhone Home Screen"
                    className="h-5 w-full flex items-center justify-center shrink-0 bg-black/10 backdrop-blur-xs cursor-pointer group"
                  >
                    <div className="w-[134px] h-[5px] rounded-full bg-[var(--text-primary)]/55 group-hover:bg-[var(--accent-primary)] transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
