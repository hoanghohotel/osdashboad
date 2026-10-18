import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FaIcon,
  Progress,
} from './ui/liquid-shadcn';
import { useLanguage } from '../context/LanguageContext';
import { ActivityEvent, NavSectionId, Order, Product } from '../types/dashboard';

interface OverviewWidgetsProps {
  activities: ActivityEvent[];
  products: Product[];
  orders: Order[];
  onOpenQuickCreate: (tab: 'order' | 'product') => void;
  onSyncInventory: () => void;
  onNavigate: (section: NavSectionId) => void;
}

export const OverviewWidgets: React.FC<OverviewWidgetsProps> = ({
  activities,
  products,
  orders,
  onOpenQuickCreate,
  onSyncInventory,
  onNavigate,
}) => {
  const { t } = useLanguage();

  const totalOrders = Math.max(orders.length, 1);
  const statusCounts = {
    fulfilled: orders.filter((o) => o.status === 'fulfilled').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    pending: orders.filter((o) => o.status === 'pending').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  const topProducts = [...products].sort((a, b) => b.revenue - a.revenue).slice(0, 4);
  const maxProductRev = Math.max(...topProducts.map((p) => p.revenue), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Best-Selling Products */}
      <Card glassVariant="secondary" interactiveHover className="flex flex-col justify-between">
        <div>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{t.widgets.bestSellingProducts}</CardTitle>
              <CardDescription className="mt-0.5">{t.widgets.bestSellingSubtitle}</CardDescription>
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={() => onNavigate('products')}
              aria-label={t.nav.products}
            >
              <FaIcon icon="fa-solid fa-arrow-up-right-from-square" className="text-xs" />
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            {topProducts.map((prod, idx) => {
              const widthPercent = Math.round((prod.revenue / maxProductRev) * 100);
              const isLowStock = prod.stock <= prod.reorderPoint;
              return (
                <div key={prod.id} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="font-medium text-[var(--text-primary)] truncate">
                      0{idx + 1}. {prod.name}
                    </span>
                    <span className="font-mono-tabular font-semibold text-[var(--text-primary)] shrink-0">
                      ${prod.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono-tabular">
                    <span>
                      {prod.sku} · {prod.unitsSold} {t.widgets.unitsSold}
                    </span>
                    <span className={isLowStock ? 'text-amber-500 font-medium' : ''}>
                      {prod.stock} {t.widgets.inStock}
                    </span>
                  </div>
                  <Progress value={widthPercent} />
                </div>
              );
            })}
          </CardContent>
        </div>
      </Card>

      {/* Order Status Distribution & Quick Actions */}
      <Card glassVariant="secondary" interactiveHover className="flex flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle>{t.widgets.orderStatusDist}</CardTitle>
            <CardDescription>{t.widgets.orderStatusSubtitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3.5">
            {[
              {
                key: 'fulfilled',
                label: t.orders.fulfilled,
                count: statusCounts.fulfilled,
                color: '#10b981',
              },
              {
                key: 'processing',
                label: t.orders.processing,
                count: statusCounts.processing,
                color: 'var(--accent-primary)',
              },
              {
                key: 'pending',
                label: t.orders.pending,
                count: statusCounts.pending,
                color: '#f59e0b',
              },
              {
                key: 'cancelled',
                label: t.orders.cancelled,
                count: statusCounts.cancelled,
                color: '#f43f5e',
              },
            ].map((row) => {
              const pct = Math.round((row.count / totalOrders) * 100);
              return (
                <div key={row.key} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--text-secondary)] font-medium">{row.label}</span>
                    <span className="font-mono-tabular text-[var(--text-primary)] font-semibold">
                      {row.count} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-[var(--glass-subtle-bg)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${pct}%`, backgroundColor: row.color }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[var(--glass-border)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {t.widgets.quickActions}
                </span>
                <span className="text-[11px] font-mono-tabular text-emerald-600 dark:text-emerald-400">
                  {t.widgets.uptime}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="justify-start"
                  onClick={() => onOpenQuickCreate('product')}
                >
                  <FaIcon icon="fa-solid fa-box-open" className="text-[var(--accent-primary)]" />
                  <span className="truncate">{t.widgets.createProduct}</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="justify-start"
                  onClick={onSyncInventory}
                >
                  <FaIcon icon="fa-solid fa-arrows-rotate" className="text-[var(--accent-primary)]" />
                  <span className="truncate">{t.widgets.syncInventory}</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="justify-start"
                  onClick={() => onNavigate('team')}
                >
                  <FaIcon icon="fa-solid fa-user-plus" className="text-[var(--accent-primary)]" />
                  <span className="truncate">{t.widgets.inviteMember}</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="justify-start"
                  onClick={() => onNavigate('development')}
                >
                  <FaIcon icon="fa-solid fa-code" className="text-[var(--accent-primary)]" />
                  <span className="truncate">shadcn UI Kit</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Operational Activity Timeline */}
      <Card glassVariant="secondary" interactiveHover className="flex flex-col justify-between">
        <div>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>{t.widgets.recentActivity}</CardTitle>
              <CardDescription className="mt-0.5">{t.widgets.activitySubtitle}</CardDescription>
            </div>
            <FaIcon icon="fa-solid fa-wave-square" className="text-sm text-[var(--text-muted)]" />
          </CardHeader>

          <CardContent className="space-y-4">
            {activities.slice(0, 5).map((event) => (
              <div
                key={event.id}
                className="relative pl-4 border-l border-[var(--glass-border-strong)] space-y-0.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                    {event.titleCustom || event.titleKey}
                  </p>
                  <span className="text-[10px] font-mono-tabular text-[var(--text-muted)] shrink-0">
                    {event.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                  {event.description}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  {event.actor} · {event.type}
                </p>
              </div>
            ))}
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
