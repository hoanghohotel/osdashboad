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
      <div className="flex flex-col h-full justify-between">
        <div className="space-y-5 overflow-y-auto pr-0.5">
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
                        isCompact ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
                      } rounded-xl text-xs font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-[var(--accent-soft)] text-[var(--text-primary)] border border-[var(--accent-border)] shadow-xs'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-subtle-bg)] border border-transparent'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 min-w-0">
                        <FaIcon
                          icon={item.faIcon}
                          className={`text-sm shrink-0 ${
                            isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
                          }`}
                        />
                        {!isCompact && <span className="truncate">{item.label}</span>}
                      </span>

                      {!isCompact && typeof item.count === 'number' && item.count > 0 && (
                        <span className="text-[11px] font-mono-tabular text-[var(--text-muted)] shrink-0">
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

        {/* Bottom Collapse / Expand Control */}
        <div className="pt-3 border-t border-[var(--glass-border)] mt-3">
          {!isMobileDrawer && (
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={collapsed ? t.app.expandSidebar : t.app.collapseSidebar}
              className={`w-full glass-interactive rounded-xl py-2 px-3 flex items-center cursor-pointer ${
                isCompact ? 'justify-center' : 'justify-between'
              } text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]`}
            >
              {!isCompact && <span className="truncate">{t.app.collapseSidebar}</span>}
              <FaIcon
                icon={
                  isCompact ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left'
                }
                className="text-xs shrink-0"
              />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Floating Glass Sidebar */}
      <aside
        aria-label="Sidebar Navigation"
        className={`hidden lg:block shrink-0 transition-all duration-200 ${
          collapsed ? 'w-[76px]' : 'w-[254px]'
        }`}
      >
        <div className="sticky top-[74px] h-[calc(100vh-90px)] glass-primary rounded-2xl p-3">
          {renderSidebarContent(false)}
        </div>
      </aside>

      {/* Mobile & Tablet Glass Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-72 max-w-[82vw] h-full glass-floating p-4">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
};
