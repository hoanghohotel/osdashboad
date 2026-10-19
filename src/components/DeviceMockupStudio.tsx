import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { DeviceMode, DeviceOrientation, NavSectionId } from '../types/dashboard';
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
    dockTint: 'rgba(56, 189, 248, 0.28)',
    dockGlow: 'rgba(56, 189, 248, 0.38)',
    glyphColor: '#38bdf8',
    group: 'workspace',
  },
  {
    id: 'analytics',
    faIcon: 'fa-solid fa-chart-pie',
    dockTint: 'rgba(192, 132, 252, 0.28)',
    dockGlow: 'rgba(192, 132, 252, 0.38)',
    glyphColor: '#c084fc',
    group: 'workspace',
  },
  {
    id: 'reports',
    faIcon: 'fa-solid fa-file-invoice-dollar',
    dockTint: 'rgba(34, 211, 238, 0.28)',
    dockGlow: 'rgba(34, 211, 238, 0.38)',
    glyphColor: '#22d3ee',
    group: 'workspace',
  },
  {
    id: 'orders',
    faIcon: 'fa-solid fa-bag-shopping',
    dockTint: 'rgba(52, 211, 153, 0.28)',
    dockGlow: 'rgba(52, 211, 153, 0.38)',
    glyphColor: '#34d399',
    group: 'commerce',
  },
  {
    id: 'products',
    faIcon: 'fa-solid fa-cubes-stacked',
    dockTint: 'rgba(251, 191, 36, 0.28)',
    dockGlow: 'rgba(251, 191, 36, 0.38)',
    glyphColor: '#fbbf24',
    group: 'commerce',
  },
  {
    id: 'customers',
    faIcon: 'fa-solid fa-user-astronaut',
    dockTint: 'rgba(251, 113, 133, 0.28)',
    dockGlow: 'rgba(251, 113, 133, 0.38)',
    glyphColor: '#fb7185',
    group: 'commerce',
  },
  {
    id: 'inventory',
    faIcon: 'fa-solid fa-boxes-stacked',
    dockTint: 'rgba(251, 146, 60, 0.28)',
    dockGlow: 'rgba(251, 146, 60, 0.38)',
    glyphColor: '#fb923c',
    group: 'commerce',
  },
  {
    id: 'development',
    faIcon: 'fa-solid fa-wand-magic-sparkles',
    dockTint: 'rgba(129, 140, 248, 0.3)',
    dockGlow: 'rgba(129, 140, 248, 0.4)',
    glyphColor: '#818cf8',
    group: 'system',
  },
  {
    id: 'team',
    faIcon: 'fa-solid fa-shield-halved',
    dockTint: 'rgba(45, 212, 191, 0.28)',
    dockGlow: 'rgba(45, 212, 191, 0.38)',
    glyphColor: '#2dd4bf',
    group: 'system',
  },
  {
    id: 'integrations',
    faIcon: 'fa-solid fa-plug',
    dockTint: 'rgba(167, 139, 250, 0.28)',
    dockGlow: 'rgba(167, 139, 250, 0.38)',
    glyphColor: '#a78bfa',
    group: 'system',
  },
  {
    id: 'settings',
    faIcon: 'fa-solid fa-sliders',
    dockTint: 'rgba(148, 163, 184, 0.26)',
    dockGlow: 'rgba(148, 163, 184, 0.34)',
    glyphColor: '#94a3b8',
    group: 'system',
  },
];

/* ============================================================================
 * 2. Device OS Home Screen (SpringBoard / iPadOS / macOS Launchpad)
 *    Displays all Sidebar sections as interactive iOS 26 / macOS Tahoe
 *    Refractive Liquid Glass App Icons + Live OS Widgets.
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
      {/* Top Section: OS Widgets + Sidebar App Icon Grid */}
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
                  <FaIcon icon="fa-solid fa-wand-magic-sparkles" />
                  <span>AuraOS Spatial Home</span>
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

        {/* iPhone Search Pill above App Icons */}
        {isIPhone && (
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="liquid-btn w-full py-2 px-4 rounded-full flex items-center justify-center gap-2 text-xs font-medium text-[var(--text-secondary)] cursor-pointer"
          >
            <FaIcon icon="fa-solid fa-magnifying-glass" className="text-[11px]" />
            <span>Spotlight Search</span>
          </button>
        )}

        {/* Main OS Application Icon Grid — Every Icon is a Sidebar Section */}
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
                <div
                  data-active={isCurrent}
                  style={
                    {
                      '--dock-tint': app.dockTint,
                      '--dock-glow': app.dockGlow,
                    } as React.CSSProperties
                  }
                  className={`liquid-dock-icon flex items-center justify-center transition-all duration-200 group-hover:-translate-y-1.5 group-hover:scale-108 group-active:scale-95 ${
                    isIPhone
                      ? 'w-[58px] h-[58px] rounded-[16px]!'
                      : isIPad
                      ? 'w-[66px] h-[66px] rounded-[18px]!'
                      : 'w-[70px] h-[70px] rounded-[20px]!'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center relative z-10"
                    style={{
                      color: app.glyphColor,
                      filter: `drop-shadow(0 2px 8px ${app.dockGlow})`,
                    }}
                  >
                    <FaIcon
                      icon={app.faIcon}
                      className={
                        isIPhone ? 'text-[22px]' : isIPad ? 'text-[25px]' : 'text-[26px]'
                      }
                    />
                  </span>

                  {typeof badge === 'number' && badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 z-20 min-w-[20px] h-[20px] px-1 rounded-full bg-rose-500/95 backdrop-blur-md text-white text-[10px] font-mono-tabular font-bold flex items-center justify-center border border-white/70 shadow-sm">
                      {badge}
                    </span>
                  )}
                </div>

                <span
                  className={`font-medium text-[var(--text-primary)] text-center leading-tight truncate max-w-[84px] ${
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
            <div
              style={
                {
                  '--dock-tint': 'rgba(52, 211, 153, 0.3)',
                  '--dock-glow': 'rgba(52, 211, 153, 0.4)',
                } as React.CSSProperties
              }
              className={`liquid-dock-icon flex items-center justify-center transition-all duration-200 group-hover:-translate-y-1.5 group-hover:scale-108 group-active:scale-95 ${
                isIPhone
                  ? 'w-[58px] h-[58px] rounded-[16px]!'
                  : isIPad
                  ? 'w-[66px] h-[66px] rounded-[18px]!'
                  : 'w-[70px] h-[70px] rounded-[20px]!'
              }`}
            >
              <span
                aria-hidden="true"
                className="flex items-center justify-center relative z-10 text-emerald-400"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(52, 211, 153, 0.4))' }}
              >
                <FaIcon
                  icon="fa-solid fa-plus"
                  className={isIPhone ? 'text-[22px]' : 'text-[25px]'}
                />
              </span>
            </div>
            <span
              className={`font-medium text-[var(--text-primary)] text-center leading-tight truncate max-w-[84px] ${
                isIPhone ? 'text-[11px]' : 'text-xs'
              }`}
            >
              {t.welcome.newOrderBtn}
            </span>
          </button>
        </div>
      </div>

      {/* SpringBoard Page Indicator Dots */}
      <div className="flex items-center justify-center gap-2 pt-4 pb-1">
        <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] opacity-90" />
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] opacity-45" />
      </div>
    </div>
  );
};

/* ============================================================================
 * 3. Internal Device Dock (<DeviceInternalDock />)
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
}

export const DeviceInternalDock: React.FC<DeviceInternalDockProps> = ({
  deviceMode,
  activeSection,
  isHomeScreenOpen,
  onSelectSection,
  onToggleHomeScreen,
  onOpenCommandPalette,
  onOpenQuickCreate,
  ordersCount,
  lowStockCount,
  isAuthenticated,
  onToggleLock,
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
      <div className="px-3.5 pt-1.5 pb-1 shrink-0 z-30 select-none">
        <div
          className="px-4 py-2.5 rounded-[30px] grid grid-cols-4 place-items-center gap-3"
          style={{
            background:
              mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(15, 23, 42, 0.42) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.3) 100%)',
            backdropFilter: 'blur(38px) saturate(210%)',
            WebkitBackdropFilter: 'blur(38px) saturate(210%)',
            boxShadow:
              mode === 'dark'
                ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 16px 34px -8px rgba(0, 0, 0, 0.65)'
                : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.85), 0 14px 30px -8px rgba(15, 23, 42, 0.14)',
            border:
              mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.72)',
          }}
        >
          {iphoneFourApps.map((app) => {
            const isActive = !isHomeScreenOpen && activeSection === app.id;
            const badge = getBadge(app.id);
            return (
              <button
                key={app.id}
                type="button"
                data-active={isActive}
                onClick={() => {
                  triggerBounce(app.id);
                  onSelectSection(app.id);
                }}
                title={t.nav[app.id]}
                aria-label={t.nav[app.id]}
                style={
                  {
                    '--dock-tint': app.dockTint,
                    '--dock-glow': app.dockGlow,
                  } as React.CSSProperties
                }
                className={`liquid-dock-icon w-[54px] h-[54px] rounded-[15px]! flex items-center justify-center cursor-pointer active:scale-92 ${
                  bouncingId === app.id ? 'animate-bounce' : ''
                }`}
              >
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center relative z-10"
                  style={{
                    color: app.glyphColor,
                    filter: `drop-shadow(0 2px 6px ${app.dockGlow})`,
                  }}
                >
                  <FaIcon icon={app.faIcon} className="text-[20px]" />
                </span>

                {typeof badge === 'number' && badge > 0 && (
                  <span className="absolute -top-1 -right-1 z-20 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-mono-tabular font-bold flex items-center justify-center border border-white/70">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // CASE B: iPAD DOCK — Strictly 13 Icons Inside Bottom of iPad Screen
  // (11 Sidebar App Icons + 1 App Library/Home Icon + 1 Spotlight Search Icon = 13 Icons)
  if (deviceMode === 'ipad') {
    return (
      <div className="px-4 pt-1.5 pb-1 flex justify-center shrink-0 z-30 select-none">
        <div
          className="px-3.5 py-2 rounded-[26px] flex items-end gap-2 max-w-full overflow-x-auto no-scrollbar"
          style={{
            background:
              mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.09) 0%, rgba(15, 23, 42, 0.42) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.56) 0%, rgba(255, 255, 255, 0.3) 100%)',
            backdropFilter: 'blur(40px) saturate(210%)',
            WebkitBackdropFilter: 'blur(40px) saturate(210%)',
            boxShadow:
              mode === 'dark'
                ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 18px 36px -8px rgba(0, 0, 0, 0.68)'
                : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.85), 0 16px 34px -8px rgba(15, 23, 42, 0.16)',
            border:
              mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.15)'
                : '1px solid rgba(255, 255, 255, 0.72)',
          }}
        >
          {/* Icon #1: iPadOS Home Screen / App Library Launcher */}
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              data-active={isHomeScreenOpen}
              onClick={() => {
                triggerBounce('home');
                onToggleHomeScreen();
              }}
              title="Home Screen (All Apps)"
              style={
                {
                  '--dock-tint': 'rgba(56, 189, 248, 0.3)',
                  '--dock-glow': 'rgba(56, 189, 248, 0.4)',
                } as React.CSSProperties
              }
              className="liquid-dock-icon w-11 h-11 flex items-center justify-center cursor-pointer shrink-0 hover:-translate-y-1.5 transition-all"
            >
              <FaIcon
                icon="fa-solid fa-table-cells-large"
                className="text-[16px] text-sky-400 relative z-10"
              />
            </button>
            <span
              className={`mt-1 w-1 h-1 rounded-full ${
                isHomeScreenOpen ? 'bg-[var(--text-primary)] opacity-90' : 'opacity-0'
              }`}
            />
          </div>

          <div className="h-8 w-px bg-[var(--glass-border-strong)] mx-0.5 mb-2 shrink-0" />

          {/* Icons #2 to #12: All 11 Sidebar Application Icons */}
          {SIDEBAR_APP_DEFINITIONS.map((app) => {
            const isActive = !isHomeScreenOpen && activeSection === app.id;
            const badge = getBadge(app.id);
            return (
              <div key={app.id} className="relative flex flex-col items-center">
                <button
                  type="button"
                  data-active={isActive}
                  onClick={() => {
                    triggerBounce(app.id);
                    onSelectSection(app.id);
                  }}
                  title={t.nav[app.id]}
                  aria-label={t.nav[app.id]}
                  style={
                    {
                      '--dock-tint': app.dockTint,
                      '--dock-glow': app.dockGlow,
                    } as React.CSSProperties
                  }
                  className={`liquid-dock-icon w-11 h-11 flex items-center justify-center cursor-pointer shrink-0 hover:-translate-y-1.5 transition-all ${
                    bouncingId === app.id ? 'animate-bounce' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center relative z-10"
                    style={{
                      color: app.glyphColor,
                      filter: `drop-shadow(0 2px 6px ${app.dockGlow})`,
                    }}
                  >
                    <FaIcon icon={app.faIcon} className="text-[16px]" />
                  </span>

                  {typeof badge === 'number' && badge > 0 && (
                    <span className="absolute -top-1 -right-1 z-20 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-mono-tabular font-bold flex items-center justify-center border border-white/70">
                      {badge}
                    </span>
                  )}
                </button>
                <span
                  className={`mt-1 w-1 h-1 rounded-full ${
                    isActive ? 'bg-[var(--text-primary)] opacity-90' : 'opacity-0'
                  }`}
                />
              </div>
            );
          })}

          <div className="h-8 w-px bg-[var(--glass-border-strong)] mx-0.5 mb-2 shrink-0" />

          {/* Icon #13: Spotlight Search (⌘K) */}
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Spotlight Search (⌘K)"
              style={
                {
                  '--dock-tint': 'rgba(192, 132, 252, 0.26)',
                  '--dock-glow': 'rgba(192, 132, 252, 0.36)',
                } as React.CSSProperties
              }
              className="liquid-dock-icon w-11 h-11 flex items-center justify-center cursor-pointer shrink-0 hover:-translate-y-1.5 transition-all"
            >
              <FaIcon
                icon="fa-solid fa-magnifying-glass"
                className="text-[15px] text-purple-400 relative z-10"
              />
            </button>
            <span className="mt-1 w-1 h-1 opacity-0" />
          </div>
        </div>
      </div>
    );
  }

  // CASE C: MACBOOK PRO / FULL DESKTOP DOCK
  const getScaleClass = (idx: number) => {
    if (hoveredIdx === null) return 'scale-100 translate-y-0';
    const dist = Math.abs(hoveredIdx - idx);
    if (dist === 0) return 'scale-[1.2] -translate-y-2';
    if (dist === 1) return 'scale-[1.08] -translate-y-1';
    return 'scale-100 translate-y-0';
  };

  return (
    <div
      className={`${
        deviceMode === 'full'
          ? 'fixed bottom-3 left-1/2 -translate-x-1/2 z-50 max-w-[96vw]'
          : 'px-4 pt-1 pb-2 flex justify-center shrink-0 z-30'
      } select-none`}
    >
      <div
        className="px-3.5 py-2 rounded-[26px] flex items-end gap-2 overflow-x-auto no-scrollbar"
        style={{
          background:
            mode === 'dark'
              ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(15, 23, 42, 0.38) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.54) 0%, rgba(255, 255, 255, 0.28) 100%)',
          backdropFilter: 'blur(40px) saturate(210%)',
          WebkitBackdropFilter: 'blur(40px) saturate(210%)',
          boxShadow:
            mode === 'dark'
              ? 'inset 0 1px 0 0 rgba(255, 255, 255, 0.22), 0 22px 46px -10px rgba(0, 0, 0, 0.7)'
              : 'inset 0 1px 0 0 rgba(255, 255, 255, 0.85), 0 18px 42px -10px rgba(15, 23, 42, 0.16)',
          border:
            mode === 'dark'
              ? '1px solid rgba(255, 255, 255, 0.14)'
              : '1px solid rgba(255, 255, 255, 0.68)',
        }}
      >
        {/* Launchpad / Home Screen Toggle Icon */}
        {isAuthenticated && (
          <>
            <div className="relative flex flex-col items-center">
              {hoveredLabel === 'launchpad' && (
                <div className="hidden sm:block absolute -top-11 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
                  Launchpad (All Apps)
                </div>
              )}
              <button
                type="button"
                data-active={isHomeScreenOpen}
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
                style={
                  {
                    '--dock-tint': 'rgba(56, 189, 248, 0.3)',
                    '--dock-glow': 'rgba(56, 189, 248, 0.4)',
                  } as React.CSSProperties
                }
                className="liquid-dock-icon w-11 h-11 flex items-center justify-center cursor-pointer shrink-0 hover:-translate-y-1.5 transition-all"
              >
                <FaIcon
                  icon="fa-solid fa-table-cells-large"
                  className="text-[16px] text-sky-400 relative z-10"
                />
              </button>
              <span
                className={`mt-1 w-1 h-1 rounded-full ${
                  isHomeScreenOpen ? 'bg-[var(--text-primary)] opacity-90' : 'opacity-0'
                }`}
              />
            </div>

            <div className="h-8 w-px bg-[var(--glass-border-strong)] mx-0.5 mb-2 shrink-0" />
          </>
        )}

        {/* All 11 Sidebar Application Icons */}
        {SIDEBAR_APP_DEFINITIONS.map((app, idx) => {
          const isActive = isAuthenticated && !isHomeScreenOpen && activeSection === app.id;
          const badge = getBadge(app.id);
          return (
            <div key={app.id} className="relative flex flex-col items-center">
              {hoveredLabel === app.id && (
                <div className="hidden sm:block absolute -top-11 px-3 py-1 rounded-full glass-floating text-[11px] font-semibold text-[var(--text-primary)] whitespace-nowrap pointer-events-none z-50">
                  {t.nav[app.id]}
                </div>
              )}
              <button
                type="button"
                data-active={isActive}
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
                style={
                  {
                    '--dock-tint': app.dockTint,
                    '--dock-glow': app.dockGlow,
                  } as React.CSSProperties
                }
                className={`liquid-dock-icon w-11 h-11 flex items-center justify-center cursor-pointer shrink-0 ${getScaleClass(
                  idx
                )} ${bouncingId === app.id ? 'animate-bounce' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className="flex items-center justify-center relative z-10"
                  style={{
                    color: app.glyphColor,
                    filter: `drop-shadow(0 2px 6px ${app.dockGlow})`,
                  }}
                >
                  <FaIcon icon={app.faIcon} className="text-[16px]" />
                </span>

                {typeof badge === 'number' && badge > 0 && (
                  <span className="absolute -top-1 -right-1 z-20 min-w-[16px] h-[16px] px-1 rounded-full bg-rose-500 text-white text-[9px] font-mono-tabular font-bold flex items-center justify-center border border-white/70">
                    {badge}
                  </span>
                )}
              </button>
              <span
                className={`mt-1 w-1 h-1 rounded-full ${
                  isActive ? 'bg-[var(--text-primary)] opacity-90' : 'opacity-0'
                }`}
              />
            </div>
          );
        })}

        <div className="h-8 w-px bg-[var(--glass-border-strong)] mx-0.5 mb-2 shrink-0" />

        {/* System Utilities: Spotlight, Quick Create, Theme, Lock */}
        <div className="flex items-end gap-2">
          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Spotlight Search (⌘K)"
              style={
                {
                  '--dock-tint': 'rgba(56, 189, 248, 0.22)',
                  '--dock-glow': 'rgba(56, 189, 248, 0.32)',
                } as React.CSSProperties
              }
              className="liquid-dock-icon w-11 h-11 flex items-center justify-center hover:-translate-y-1.5 transition-all cursor-pointer"
            >
              <FaIcon
                icon="fa-solid fa-magnifying-glass"
                className="text-[15px] text-sky-400 relative z-10"
              />
            </button>
            <span className="mt-1 w-1 h-1 opacity-0" />
          </div>

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={toggleMode}
              title={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
              style={
                {
                  '--dock-tint': 'rgba(251, 191, 36, 0.24)',
                  '--dock-glow': 'rgba(251, 191, 36, 0.34)',
                } as React.CSSProperties
              }
              className="liquid-dock-icon w-11 h-11 flex items-center justify-center hover:-translate-y-1.5 transition-all cursor-pointer"
            >
              <FaIcon
                icon={mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}
                className="text-[15px] text-amber-400 relative z-10"
              />
            </button>
            <span className="mt-1 w-1 h-1 opacity-0" />
          </div>

          <div className="relative flex flex-col items-center">
            <button
              type="button"
              onClick={onToggleLock}
              title={isAuthenticated ? 'Lock Screen' : 'Unlock'}
              style={
                {
                  '--dock-tint': 'rgba(251, 113, 133, 0.24)',
                  '--dock-glow': 'rgba(251, 113, 133, 0.34)',
                } as React.CSSProperties
              }
              className="liquid-dock-icon w-11 h-11 flex items-center justify-center hover:-translate-y-1.5 transition-all cursor-pointer"
            >
              <FaIcon
                icon={isAuthenticated ? 'fa-solid fa-lock' : 'fa-solid fa-lock-open'}
                className="text-[15px] text-rose-400 relative z-10"
              />
            </button>
            <span className="mt-1 w-1 h-1 opacity-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
 * 4. Exact Fixed-Resolution Device Mockup Frame Wrapper (<DeviceMockupFrame />)
 *    - MacBook Pro 16"   : 1440 × 900 px (Desktop Viewport Locked)
 *    - iPad Pro 13"      : 1180 × 820 px Landscape / 820 × 1180 px Portrait
 *    - iPhone 16 Pro Max : 430 × 932 px Portrait / 932 × 430 px Landscape
 *    Renders the Device Dock INSIDE the bottom of the device screen!
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
      chip: 'Apple M4 · Ultra Retina XDR · 13-Icon Dock',
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
      chip: 'Apple A18 Pro · Grade 5 Titanium · 4-Icon Dock',
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
    <div className="min-h-screen flex flex-col items-center justify-start pt-3 pb-8 px-2 sm:px-6 select-none overflow-x-hidden">
      {/* Top Floating Device Studio Control Bar */}
      <div className="w-full max-w-[1440px] mb-3 z-30 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-3xl glass-floating">
        <div className="flex items-center gap-3">
          <div
            data-active="true"
            className="liquid-dock-icon w-9 h-9 flex items-center justify-center shrink-0"
            style={
              {
                '--dock-tint': 'rgba(56, 189, 248, 0.3)',
                '--dock-glow': 'rgba(56, 189, 248, 0.4)',
              } as React.CSSProperties
            }
          >
            <FaIcon
              icon={activeSpec.icon}
              className="text-sky-400 text-xs relative z-10"
            />
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
              {activeSpec.chip}
            </p>
          </div>
        </div>

        {/* Device Switcher Pills + Home Screen Toggle + Orientation & Scale Mode */}
        <div className="flex flex-wrap items-center gap-2">
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
                  <LiquidBackground embedded />
                  {/* macOS Tahoe Internal Status Menu Bar */}
                  <div className="h-7 px-4 bg-black/35 backdrop-blur-xl text-white/90 text-[11px] font-medium flex items-center justify-between shrink-0 z-30 border-b border-white/10">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={onToggleHomeScreen}
                        className="font-bold flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer"
                      >
                        <FaIcon icon="fa-brands fa-apple" className="text-xs" />
                        <span>{t.app.brand}</span>
                      </button>
                      {onToggleHomeScreen && (
                        <button
                          type="button"
                          onClick={onToggleHomeScreen}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                            isHomeScreenOpen
                              ? 'bg-sky-500/30 text-sky-300 border border-sky-400/40'
                              : 'hover:bg-white/10 opacity-85'
                          }`}
                        >
                          <FaIcon icon="fa-solid fa-table-cells-large" className="mr-1" />
                          Launchpad
                        </button>
                      )}
                      <span className="opacity-80">File</span>
                      <span className="opacity-80">Edit</span>
                      <span className="opacity-80">View</span>
                      <span className="opacity-80">Window</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono-tabular text-[10px]">
                      <span className="text-emerald-400">● 1440 × 900 px · M4 Max</span>
                      <FaIcon icon="fa-solid fa-wifi" />
                      <span className="flex items-center gap-1">
                        <span>100%</span>
                        <FaIcon icon="fa-solid fa-battery-full" className="text-emerald-400" />
                      </span>
                      <span>Oct 18 17:30</span>
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
           *         With 13-Icon Dock Inside Bottom of iPad Screen
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
                  <LiquidBackground embedded />
                  {/* iPadOS Status Bar */}
                  <div className="h-7 px-5 bg-black/25 backdrop-blur-md text-[var(--text-primary)] text-[11px] font-semibold flex items-center justify-between shrink-0 z-30 border-b border-[var(--glass-border)]">
                    <div className="flex items-center gap-2 font-mono-tabular">
                      <span>9:41 AM</span>
                      <span className="opacity-60">Sun Oct 18</span>
                    </div>
                    {onToggleHomeScreen ? (
                      <button
                        type="button"
                        onClick={onToggleHomeScreen}
                        title="Toggle iPadOS Home Screen"
                        className="px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <FaIcon icon="fa-solid fa-table-cells-large" className="text-sky-400" />
                        <span>{isHomeScreenOpen ? 'iPadOS Home' : 'All Apps'}</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="w-7 h-1 rounded-full bg-[var(--text-muted)]/40" />
                      </div>
                    )}
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

                  {/* Live Scrollable Website / Home Screen Viewport Locked to iPad Resolution */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text flex flex-col ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {children}
                  </div>

                  {/* 13-Icon iPadOS Dock Pinned Inside Bottom of iPad Screen */}
                  {bottomDock}

                </div>
              </div>
            </div>
          )}

          {/* =================================================================
           * CASE 3: IPHONE 16 PRO MAX MOCKUP (FIXED 430 × 932 / 932 × 430 PX)
           *         With 4-Icon Dock Inside Bottom of iPhone Screen
           * =============================================================== */}
          {deviceMode === 'iphone' && (
            <div className="relative shrink-0">
              {/* Physical Titanium Side Buttons */}
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
                  <LiquidBackground embedded />
                  {/* iOS Status Bar + Interactive Dynamic Island */}
                  <div className="pt-2.5 pb-1.5 px-6 flex items-center justify-between shrink-0 z-30 relative">
                    <button
                      type="button"
                      onClick={onToggleHomeScreen}
                      title="Return to iPhone Home Screen"
                      className="text-xs font-bold font-mono-tabular text-[var(--text-primary)] hover:text-[var(--accent-primary)] flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>9:41</span>
                      {!isHomeScreenOpen && onToggleHomeScreen && (
                        <span className="px-1.5 py-0.2 rounded-full bg-[var(--accent-soft)] text-[var(--accent-primary)] text-[9px] font-sans">
                          Home
                        </span>
                      )}
                    </button>

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

                  {/* Live Scrollable Mobile Website / SpringBoard Home Screen Viewport */}
                  <div
                    className={`flex-1 overflow-y-auto overflow-x-hidden relative select-text flex flex-col ${activeSpec.viewportClass}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    {children}
                  </div>

                  {/* 4-Icon iOS Dock Pinned Inside Bottom of iPhone Screen */}
                  {bottomDock}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
