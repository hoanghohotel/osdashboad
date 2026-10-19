import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavSectionId } from '../types/dashboard';
import { Button, FaIcon } from './ui/liquid-shadcn';

interface SidebarProps {
  activeSection: NavSectionId;
  onSelectSection: (section: NavSectionId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  ordersCount: number;
  lowStockCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
  ordersCount,
  lowStockCount,
}) => {
  const { t } = useLanguage();

  const navGroups: {
    label: string;
    items: {
      id: NavSectionId;
      label: string;
      faIcon: string;
      count?: number;
    }[];
  }[] = [
    {
      label: t.nav.workspaceGroup,
      items: [
        { id: 'overview', label: t.nav.overview, faIcon: 'fa-solid fa-gauge-high' },
        { id: 'analytics', label: t.nav.analytics, faIcon: 'fa-solid fa-chart-line' },
        { id: 'reports', label: t.nav.reports, faIcon: 'fa-solid fa-file-invoice-dollar' },
      ],
    },
    {
      label: t.nav.commerceGroup,
      items: [
        {
          id: 'orders',
          label: t.nav.orders,
          faIcon: 'fa-solid fa-bag-shopping',
          count: ordersCount,
        },
        { id: 'products', label: t.nav.products, faIcon: 'fa-solid fa-cube' },
        { id: 'customers', label: t.nav.customers, faIcon: 'fa-solid fa-user-group' },
        {
          id: 'inventory',
          label: t.nav.inventory,
          faIcon: 'fa-solid fa-boxes-stacked',
          count: lowStockCount,
        },
      ],
    },
    {
      label: t.nav.systemGroup,
      items: [
        { id: 'development', label: t.nav.development, faIcon: 'fa-solid fa-code' },
        { id: 'team', label: t.nav.team, faIcon: 'fa-solid fa-shield-halved' },
        { id: 'integrations', label: t.nav.integrations, faIcon: 'fa-solid fa-plug' },
        { id: 'settings', label: t.nav.settings, faIcon: 'fa-solid fa-sliders' },
      ],
    },
  ];

  const renderSidebarContent = (isMobileDrawer = false) => {
    const isCompact = collapsed && !isMobileDrawer;

    return (
      <div className="flex flex-col flex-1 h-full justify-between">
        <div className="space-y-4">
          {isMobileDrawer && (
            <div className="flex items-center justify-between px-2 pb-2 border-b border-[var(--glass-border)]">
              <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                <FaIcon icon="fa-solid fa-layer-group" className="text-[var(--accent-primary)]" />
                <span>{t.app.brand}</span>
              </span>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={onCloseMobile}
                aria-label="Close navigation drawer"
              >
                <FaIcon icon="fa-solid fa-xmark" />
              </Button>
            </div>
          )}

          {navGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              {!isCompact && (
                <p className="px-3 text-[11px] font-medium text-[var(--text-muted)] truncate">
                  {group.label}
                </p>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectSection(item.id);
                        if (isMobileDrawer) onCloseMobile();
                      }}
                      title={isCompact ? item.label : undefined}
                      className={`w-full flex items-center cursor-pointer ${
                        isCompact ? 'justify-center px-2 py-2' : 'justify-between px-3.5 py-2'
                      } rounded-full text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'liquid-btn-primary text-white'
                          : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <FaIcon
                          icon={item.faIcon}
                          className={`text-sm shrink-0 ${
                            isActive ? 'text-white' : 'text-[var(--text-muted)]'
                          }`}
                        />
                        {!isCompact && <span className="truncate">{item.label}</span>}
                      </span>

                      {!isCompact && typeof item.count === 'number' && item.count > 0 && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tabular font-bold shrink-0 ${
                            isActive
                              ? 'bg-white/25 text-white border border-white/30'
                              : 'bg-[var(--glass-subtle-bg)] text-[var(--text-secondary)] border border-[var(--glass-border)]'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Collapse / Expand Control — Pinned at the bottom of the full-height sidebar */}
        <div className="pt-3 border-t border-[var(--glass-border)] mt-4 shrink-0">
          {!isMobileDrawer && (
            <Button
              variant="secondary"
              onClick={onToggleCollapse}
              aria-label={collapsed ? t.app.expandSidebar : t.app.collapseSidebar}
              className={`w-full ${isCompact ? 'justify-center px-0' : 'justify-between px-4'}`}
            >
              {!isCompact && <span className="truncate">{t.app.collapseSidebar}</span>}
              <FaIcon
                icon={isCompact ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'}
                className="text-xs shrink-0"
              />
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop & Tablet Full-Height Glass Sidebar
       * Stretches to the full height of the device screen without premature vertical shrinking */}
      <aside
        aria-label="Sidebar Navigation"
        className={`hidden md:flex flex-col self-stretch shrink-0 transition-all duration-200 ${
          collapsed ? 'w-[76px]' : 'w-[248px]'
        }`}
      >
        <div className="flex-1 h-full min-h-full glass-primary rounded-2xl p-3 flex flex-col justify-between">
          {renderSidebarContent(false)}
        </div>
      </aside>

      {/* Mobile Glass Drawer (iPhone / Compact Viewports) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-72 max-w-[82vw] h-full glass-floating p-4 overflow-y-auto flex flex-col">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};
