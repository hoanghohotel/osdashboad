import React, { useEffect, useRef, useState } from 'react';
import { ACCENT_SWATCHES, useTheme } from '../context/ThemeContext';
import { LANGUAGE_OPTIONS, useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { ActivityEvent, DeviceMode, NavSectionId, WorkspaceOption } from '../types/dashboard';
import { ControlCenterPopover } from './ControlCenterPopover';
import { AuthenticatedUser } from './LoginScreen';
import { Avatar, Button, FaIcon } from './ui/liquid-shadcn';

interface TopBarProps {
  workspaces: WorkspaceOption[];
  activeWorkspace: WorkspaceOption;
  onSelectWorkspace: (ws: WorkspaceOption) => void;
  onOpenCommandPalette: () => void;
  onOpenQuickCreate: (defaultTab?: 'order' | 'product') => void;
  onOpenMobileSidebar: () => void;
  activities: ActivityEvent[];
  onMarkAllRead: () => void;
  onMarkActivityRead: (id: string) => void;
  onNavigate: (section: NavSectionId) => void;
  currentUser: AuthenticatedUser;
  onLogout: () => void;
  deviceMode?: DeviceMode;
  onSelectDeviceMode?: (mode: DeviceMode) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  workspaces,
  activeWorkspace,
  onSelectWorkspace,
  onOpenCommandPalette,
  onOpenQuickCreate,
  onOpenMobileSidebar,
  activities,
  onMarkAllRead,
  onMarkActivityRead,
  onNavigate,
  currentUser,
  onLogout,
  deviceMode = 'full',
  onSelectDeviceMode,
}) => {
  const { mode, toggleMode, accent, setAccent } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { addToast } = useToast();

  const [openMenu, setOpenMenu] = useState<
    'workspace' | 'notifications' | 'appearance' | 'controlCenter' | 'account' | null
  >(null);
  const barRef = useRef<HTMLDivElement>(null);

  const unreadCount = activities.filter((a) => !a.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={barRef} className="sticky top-0 z-30 px-3 sm:px-6 pt-3 pb-2">
      <div className="glass-primary rounded-2xl px-3.5 sm:px-5 h-14 flex items-center justify-between gap-3 sm:gap-6">
        {/* Left Zone: Mobile Drawer Trigger + macOS Window Dots + Brand + Workspace Selector */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <Button
            variant="secondary"
            size="icon"
            onClick={onOpenMobileSidebar}
            aria-label="Open navigation menu"
            className="lg:hidden"
          >
            <FaIcon icon="fa-solid fa-bars" />
          </Button>

          {/* Subtle macOS Window Controls */}
          <div className="hidden xl:flex items-center gap-1.5 mr-1">
            <button
              type="button"
              onClick={onLogout}
              title={t.app.signOut}
              aria-label={t.app.signOut}
              className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10 hover:opacity-80 transition-opacity cursor-pointer"
            />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" />
          </div>

          <button
            type="button"
            onClick={() => onNavigate('overview')}
            className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm transition-transform duration-150 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-hover))',
                boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.4)',
              }}
            >
              <FaIcon icon="fa-solid fa-layer-group" className="text-xs" />
            </div>
            <span className="text-base font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap">
              {t.app.brand}
            </span>
          </button>

          <span className="hidden sm:inline text-[var(--text-muted)] select-none" aria-hidden="true">
            /
          </span>

          {/* Workspace Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'workspace' ? null : 'workspace')}
              className="glass-interactive px-2.5 py-1.5 rounded-xl flex items-center gap-2 text-xs font-medium text-[var(--text-primary)] max-w-[170px] sm:max-w-[210px] cursor-pointer"
            >
              <span className="truncate">{activeWorkspace.name}</span>
              <FaIcon icon="fa-solid fa-chevron-down" className="text-[10px] text-[var(--text-muted)] shrink-0" />
            </button>

            {openMenu === 'workspace' && (
              <div className="glass-floating absolute left-0 mt-2 w-72 rounded-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-medium text-[var(--text-muted)]">
                  {t.app.workspace}
                </div>
                {workspaces.map((ws) => {
                  const isSelected = ws.id === activeWorkspace.id;
                  return (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => {
                        onSelectWorkspace(ws);
                        setOpenMenu(null);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[var(--accent-soft)] text-[var(--text-primary)]'
                          : 'hover:bg-[var(--glass-subtle-bg)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                          {ws.name}
                        </p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">
                          {ws.plan} · {ws.region}
                        </p>
                      </div>
                      {isSelected && (
                        <FaIcon
                          icon="fa-solid fa-check"
                          className="text-xs shrink-0 mt-0.5 text-[var(--accent-primary)]"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Center Zone: Global Spotlight Search Trigger (⌘K) */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="w-full glass-interactive px-3.5 py-2 rounded-xl flex items-center justify-between gap-3 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <span className="flex items-center gap-2.5 truncate">
              <FaIcon icon="fa-solid fa-magnifying-glass" className="text-xs text-[var(--text-muted)] shrink-0" />
              <span className="truncate">{t.app.searchPlaceholder}</span>
            </span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono-tabular rounded border border-[var(--glass-border-strong)] bg-[var(--glass-subtle-bg)] text-[var(--text-secondary)] shrink-0 flex items-center gap-0.5">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Zone: Quick Create + Control Center + Appearance/Lang + Notifications + Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Search Button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={onOpenCommandPalette}
            aria-label="Search and commands"
            className="md:hidden"
          >
            <FaIcon icon="fa-solid fa-magnifying-glass" />
          </Button>

          {/* Device Mockup Studio Switcher (Full / MacBook / iPad / iPhone) */}
          {onSelectDeviceMode && (
            <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)]">
              {(
                [
                  { id: 'full', title: 'Full Desktop', icon: 'fa-solid fa-expand' },
                  { id: 'macbook', title: 'MacBook Pro 16"', icon: 'fa-solid fa-laptop' },
                  { id: 'ipad', title: 'iPad Pro 13"', icon: 'fa-solid fa-tablet-screen-button' },
                  { id: 'iphone', title: 'iPhone 16 Pro', icon: 'fa-solid fa-mobile-screen-button' },
                ] as const
              ).map((dev) => {
                const active = deviceMode === dev.id;
                return (
                  <button
                    key={dev.id}
                    type="button"
                    onClick={() => onSelectDeviceMode(dev.id)}
                    title={`View on ${dev.title}`}
                    aria-label={`View on ${dev.title}`}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs transition-all cursor-pointer ${
                      active
                        ? 'accent-btn text-white shadow-xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <FaIcon icon={dev.icon} className="text-[11px]" />
                  </button>
                );
              })}
            </div>
          )}

          {/* Primary Quick-Create Action */}
          <Button variant="default" size="sm" onClick={() => onOpenQuickCreate('order')}>
            <FaIcon icon="fa-solid fa-plus" />
            <span className="hidden sm:inline">{t.app.quickCreate}</span>
          </Button>

          {/* Liquid Glass Control Center Popover Button */}
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              onClick={() =>
                setOpenMenu(openMenu === 'controlCenter' ? null : 'controlCenter')
              }
              aria-label={t.app.controlCenter}
              title={t.app.controlCenter}
            >
              <FaIcon icon="fa-solid fa-sliders" />
            </Button>

            {openMenu === 'controlCenter' && (
              <div className="absolute right-0 mt-2 z-50">
                <ControlCenterPopover
                  onLockWorkspace={() => {
                    setOpenMenu(null);
                    onLogout();
                  }}
                />
              </div>
            )}
          </div>

          {/* Theme Mode Quick Toggle */}
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleMode}
            aria-label={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
            title={mode === 'dark' ? t.app.themeLight : t.app.themeDark}
            className="hidden sm:inline-flex"
          >
            <FaIcon icon={mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
          </Button>

          {/* macOS Accent & Language Customizer Popover */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpenMenu(openMenu === 'appearance' ? null : 'appearance')}
              aria-label="Appearance and Language"
            >
              <FaIcon icon="fa-solid fa-palette" className="text-[var(--accent-primary)]" />
              <span className="uppercase font-mono-tabular text-[11px]">{language}</span>
            </Button>

            {openMenu === 'appearance' && (
              <div className="glass-floating absolute right-0 mt-2 w-72 rounded-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[var(--text-primary)]">
                      {t.app.accentColor}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {t.accents[accent]}
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {ACCENT_SWATCHES.map((swatch) => {
                      const active = accent === swatch.id;
                      return (
                        <button
                          key={swatch.id}
                          type="button"
                          onClick={() => {
                            setAccent(swatch.id);
                            addToast(
                              `${t.app.accentColor}: ${t.accents[swatch.id]}`,
                              undefined,
                              'info'
                            );
                          }}
                          aria-label={t.accents[swatch.id]}
                          className={`h-7 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                            active
                              ? 'scale-110 ring-2 ring-offset-2 ring-[var(--text-primary)]'
                              : 'hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: mode === 'dark' ? swatch.darkHex : swatch.hex,
                          }}
                        >
                          {active && <FaIcon icon="fa-solid fa-check" className="text-[10px] text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[var(--glass-border)] pt-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)] mb-2">
                    <FaIcon icon="fa-solid fa-globe" className="text-xs text-[var(--text-muted)]" />
                    <span>{t.app.language}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {LANGUAGE_OPTIONS.map((opt) => {
                      const active = language === opt.code;
                      return (
                        <button
                          key={opt.code}
                          type="button"
                          onClick={() => {
                            setLanguage(opt.code);
                            addToast(`${opt.label}`, undefined, 'info');
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                            active
                              ? 'accent-btn'
                              : 'glass-interactive text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          {opt.short}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              onClick={() =>
                setOpenMenu(openMenu === 'notifications' ? null : 'notifications')
              }
              aria-label={t.app.notifications}
              className="relative"
            >
              <FaIcon icon="fa-solid fa-bell" />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-mono-tabular font-bold text-white flex items-center justify-center"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                >
                  {unreadCount}
                </span>
              )}
            </Button>

            {openMenu === 'notifications' && (
              <div className="glass-floating absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl p-3.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[var(--glass-border)]">
                  <span className="text-xs font-semibold text-[var(--text-primary)]">
                    {t.app.notifications} ({unreadCount})
                  </span>
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={onMarkAllRead}
                      className="text-[11px] font-medium hover:underline cursor-pointer"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      {t.app.markAllRead}
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-1.5">
                  {activities.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] py-6 text-center">
                      {t.app.noNotifications}
                    </p>
                  ) : (
                    activities.map((act) => (
                      <button
                        key={act.id}
                        type="button"
                        onClick={() => onMarkActivityRead(act.id)}
                        className={`w-full text-left p-2.5 rounded-xl transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                          !act.read
                            ? 'bg-[var(--accent-soft)]'
                            : 'hover:bg-[var(--glass-subtle-bg)] opacity-80'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-[var(--text-primary)]">
                            {act.titleCustom || act.titleKey}
                          </p>
                          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                            {act.description}
                          </p>
                          <p className="text-[10px] font-mono-tabular text-[var(--text-muted)] mt-1">
                            {act.actor} · {act.timestamp}
                          </p>
                        </div>
                        {!act.read && (
                          <span
                            className="text-[10px] font-mono-tabular font-semibold shrink-0"
                            style={{ color: 'var(--accent-primary)' }}
                          >
                            NEW
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Account Popover Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === 'account' ? null : 'account')}
              aria-label={t.app.profile}
              className="glass-interactive pl-1.5 pr-2.5 py-1 rounded-full flex items-center gap-2 cursor-pointer"
            >
              <Avatar initials={currentUser.initials} size="sm" />
              <span className="hidden xl:inline text-xs font-medium text-[var(--text-primary)] whitespace-nowrap">
                {currentUser.name}
              </span>
              <FaIcon icon="fa-solid fa-chevron-down" className="text-[10px] text-[var(--text-muted)]" />
            </button>

            {openMenu === 'account' && (
              <div
                className="absolute right-0 mt-2.5 w-64 rounded-[28px] p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
                style={{
                  background:
                    mode === 'dark'
                      ? 'rgba(24, 28, 38, 0.86)'
                      : 'rgba(248, 249, 252, 0.88)',
                  backdropFilter: 'blur(36px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(36px) saturate(200%)',
                  boxShadow:
                    mode === 'dark'
                      ? 'inset 0 1px 1px rgba(255,255,255,0.22), 0 24px 48px rgba(0,0,0,0.65)'
                      : 'inset 0 1.5px 2px rgba(255,255,255,0.95), 0 20px 44px rgba(15,23,42,0.12)',
                  border:
                    mode === 'dark'
                      ? '1px solid rgba(255,255,255,0.14)'
                      : '1px solid rgba(255,255,255,0.85)',
                }}
              >
                <div className="px-3.5 py-2 mb-1">
                  <p className="text-xs font-bold text-[var(--text-primary)] truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">
                    {currentUser.email}
                  </p>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('development');
                      setOpenMenu(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-primary)] flex items-center justify-between transition-all hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-xs border border-transparent hover:border-white/60 dark:hover:border-white/15 cursor-pointer"
                  >
                    <span>{t.nav.development}</span>
                    <FaIcon icon="fa-solid fa-code" className="text-xs text-[var(--accent-primary)]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('team');
                      setOpenMenu(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-primary)] flex items-center justify-between transition-all hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-xs border border-transparent hover:border-white/60 dark:hover:border-white/15 cursor-pointer"
                  >
                    <span>{t.app.profile}</span>
                    <FaIcon icon="fa-regular fa-user" className="text-xs text-[var(--text-primary)]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('integrations');
                      setOpenMenu(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-primary)] flex items-center justify-between transition-all hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-xs border border-transparent hover:border-white/60 dark:hover:border-white/15 cursor-pointer"
                  >
                    <span>{t.nav.integrations}</span>
                    <FaIcon icon="fa-solid fa-puzzle-piece" className="text-xs text-[var(--text-primary)]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('settings');
                      setOpenMenu(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-primary)] flex items-center justify-between transition-all hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-xs border border-transparent hover:border-white/60 dark:hover:border-white/15 cursor-pointer"
                  >
                    <span>{t.nav.settings}</span>
                    <FaIcon icon="fa-solid fa-sliders" className="text-xs text-[var(--text-primary)]" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenMenu(null);
                      onOpenCommandPalette();
                    }}
                    className="w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-primary)] flex items-center justify-between transition-all hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-xs border border-transparent hover:border-white/60 dark:hover:border-white/15 cursor-pointer"
                  >
                    <span>{t.app.helpCenter}</span>
                    <FaIcon icon="fa-regular fa-circle-question" className="text-xs text-[var(--text-primary)]" />
                  </button>
                </div>

                <div className="my-1.5 border-t border-[var(--glass-border)]" />

                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null);
                    onLogout();
                  }}
                  className="w-full px-4 py-2.5 rounded-2xl text-sm font-medium text-[#e11d48] dark:text-[#ff453a] flex items-center justify-between transition-all hover:bg-rose-500/10 cursor-pointer"
                >
                  <span>{t.app.signOut}</span>
                  <FaIcon icon="fa-solid fa-right-from-bracket" className="text-xs" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
