import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { LiquidBackground } from './components/LiquidBackground';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { MetricCard } from './components/MetricCard';
import { RevenueChart } from './components/RevenueChart';
import { OrdersTable } from './components/OrdersTable';
import { OverviewWidgets } from './components/OverviewWidgets';
import { AuthenticatedUser, LoginScreen } from './components/LoginScreen';
const DevelopmentShowcaseView = lazy(() => import('./components/DevelopmentShowcaseView').then(module => ({ default: module.DevelopmentShowcaseView })));
import {
  DeviceHomeScreen,
  DeviceInternalDock,
  DeviceMockupFrame,
} from './components/DeviceMockupStudio';
import { Button, Card, CardContent, FaIcon } from './components/ui/liquid-shadcn';
import {
  AnalyticsModuleView,
  CustomersModuleView,
  IntegrationsModuleView,
  ProductsInventoryView,
  ReportsModuleView,
  SettingsModuleView,
  TeamModuleView,
} from './components/ModuleViews';
import {
  CancelOrderDialog,
  OrderDetailDrawer,
  QuickCreateModal,
  SearchCommandModal,
} from './components/FloatingModals';
import {
  ANALYTICS_SERIES,
  INITIAL_ACTIVITIES,
  INITIAL_CUSTOMERS,
  INITIAL_INTEGRATIONS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_TEAM,
  WORKSPACES,
} from './data/mockData';
import {
  ActivityEvent,
  ChartGranularity,
  DateRangeKey,
  DeviceMode,
  DeviceOrientation,
  IntegrationItem,
  NavSectionId,
  Order,
  Product,
  TeamMember,
  WorkspaceOption,
} from './types/dashboard';

const DATE_RANGE_MULTIPLIER: Record<DateRangeKey, number> = {
  today: 0.14,
  '7d': 0.45,
  '30d': 1.0,
  '90d': 2.75,
  '12m': 10.4,
};

const DashboardWorkspace: React.FC = () => {
  const { t, language } = useLanguage();
  const { addToast } = useToast();

  // Authentication & Lock Screen State (starts at LoginScreen after macos-web BootupScreen)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser>({
    name: 'Minh Nguyen',
    email: 'minh.nguyen@auraos.io',
    role: 'Executive Owner',
    initials: 'MN',
  });

  // Device Mockup Studio State ('full' | 'macbook' | 'ipad' | 'iphone')
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('full');
  const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientation>('portrait');
  // OS Home Screen (SpringBoard / Launchpad) displaying Sidebar items as App Icons
  const [isHomeScreenOpen, setIsHomeScreenOpen] = useState<boolean>(false);

  const handleSelectDeviceMode = (nextMode: DeviceMode) => {
    setDeviceMode(nextMode);
    if (nextMode === 'iphone') {
      setDeviceOrientation('portrait');
      setIsHomeScreenOpen(true);
    } else if (nextMode === 'ipad') {
      setDeviceOrientation('landscape');
      setIsHomeScreenOpen(true);
    } else if (nextMode === 'macbook') {
      setIsHomeScreenOpen(true);
    }
  };

  // Layout & Navigation State
  const [activeSection, setActiveSection] = useState<NavSectionId>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<WorkspaceOption>(WORKSPACES[0]);
  const [dateRange, setDateRange] = useState<DateRangeKey>('30d');
  const [chartGranularity, setChartGranularity] = useState<ChartGranularity>('daily');
  const [isLoading, setIsLoading] = useState(false);

  // Domain Data State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers] = useState(INITIAL_CUSTOMERS);
  const [activities, setActivities] = useState<ActivityEvent[]>(INITIAL_ACTIVITIES);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(INITIAL_TEAM);
  const [integrations, setIntegrations] = useState<IntegrationItem[]>(INITIAL_INTEGRATIONS);

  // Modals & Drawers State
  const [commandOpen, setCommandOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);
  const [quickCreateTab, setQuickCreateTab] = useState<'order' | 'product'>('order');
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);

  // Global ⌘K / Ctrl+K Spotlight Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAuthenticated) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const formattedDate = useMemo(() => {
    try {
      const locale = language === 'vi' ? 'vi-VN' : language === 'zh' ? 'zh-CN' : 'en-US';
      return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date());
    } catch {
      return 'Oct 18, 2026';
    }
  }, [language]);

  const scaleFactor = activeWorkspace.multiplier * DATE_RANGE_MULTIPLIER[dateRange];

  const scaledChartSeries = useMemo(() => {
    const base = ANALYTICS_SERIES[chartGranularity];
    return base.map((pt) => ({
      ...pt,
      revenue: Math.round(pt.revenue * activeWorkspace.multiplier),
      previousRevenue: Math.round(pt.previousRevenue * activeWorkspace.multiplier),
      orders: Math.max(1, Math.round(pt.orders * activeWorkspace.multiplier)),
    }));
  }, [chartGranularity, activeWorkspace.multiplier]);

  const kpiMetrics = useMemo(() => {
    const liveOrdersTotal = orders
      .filter((o) => o.status !== 'cancelled')
      .reduce((acc, o) => acc + o.amount, 0);
    const totalRevenue = Math.round((482900 + liveOrdersTotal) * scaleFactor);
    const totalOrdersCount = Math.max(
      orders.length,
      Math.round((1840 + orders.length) * scaleFactor)
    );
    const activeCustomersCount = Math.round(12480 * activeWorkspace.multiplier);
    const conversionRate = +(4.42 * (0.95 + activeWorkspace.multiplier * 0.05)).toFixed(2);

    return {
      totalRevenue,
      totalOrdersCount,
      activeCustomersCount,
      conversionRate,
    };
  }, [orders, scaleFactor, activeWorkspace.multiplier]);

  const triggerRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      addToast(t.app.refreshData, `${activeWorkspace.name} synchronized.`);
    }, 420);
  };

  const handleExportCsv = () => {
    const headers = ['OrderID', 'Customer', 'Email', 'Location', 'Date', 'Amount', 'Status', 'Payment'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      `"${o.customerLocation}"`,
      o.date,
      o.amount.toFixed(2),
      o.status,
      o.paymentStatus,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `auraos-orders-${dateRange}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast(t.app.exportReport, `${orders.length} records exported to CSV.`);
  };

  const handleCreateOrder = (data: {
    customerName: string;
    customerEmail: string;
    customerLocation: string;
    amount: number;
  }) => {
    const newId = `ORD-${9483 + orders.length}`;
    const newOrder: Order = {
      id: newId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerLocation: data.customerLocation,
      date: '2026-10-18 14:55',
      amount: data.amount,
      status: 'processing',
      paymentStatus: 'paid',
      itemsCount: 1,
      paymentMethod: 'Apple Pay Express',
      items: [
        {
          id: `${Date.now()}`,
          name: 'Thunderbolt 5 Studio Dock Pro',
          sku: 'AURA-TB5-04',
          quantity: 1,
          price: data.amount,
        },
      ],
    };
    setOrders((prev) => [newOrder, ...prev]);
    setActivities((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: 'order',
        titleKey: `New Order ${newId}`,
        titleCustom: `New Order ${newId} created`,
        description: `${data.customerName} placed a $${data.amount.toLocaleString()} order.`,
        timestamp: 'Just now',
        actor: currentUser.name,
        read: false,
      },
      ...prev,
    ]);
    addToast(`Order ${newId} Dispatched`, `${data.customerName} · $${data.amount.toLocaleString()}`);
  };

  const handleCreateProduct = (data: {
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
  }) => {
    const newProd: Product = {
      id: `PRD-0${products.length + 1}`,
      name: data.name,
      sku: data.sku,
      category: data.category,
      price: data.price,
      stock: data.stock,
      reorderPoint: 25,
      unitsSold: 1,
      revenue: data.price,
      growth: 18.0,
      rating: 5.0,
    };
    setProducts((prev) => [newProd, ...prev]);
    setActivities((prev) => [
      {
        id: `ACT-${Date.now()}`,
        type: 'product',
        titleKey: `Catalog SKU ${data.sku} added`,
        titleCustom: `Catalog SKU ${data.sku} added`,
        description: `${data.name} ($${data.price}) registered with ${data.stock} initial units.`,
        timestamp: 'Just now',
        actor: currentUser.name,
        read: false,
      },
      ...prev,
    ]);
    addToast(`SKU ${data.sku} Added`, `${data.name} added to catalog.`);
  };

  const handleFulfillOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'fulfilled', paymentStatus: 'paid' } : o))
    );
    addToast(`Order ${orderId} Fulfilled`, 'Tracking telemetry dispatched to customer.');
  };

  const handleConfirmCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: 'cancelled', paymentStatus: 'refunded' } : o
      )
    );
    setOrderToCancel(null);
    addToast(`Order ${orderId} Cancelled`, 'Payment refund initiated.', 'warning');
  };

  const handleRestockProduct = (productId: string, amount: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + amount } : p))
    );
    const target = products.find((p) => p.id === productId);
    addToast(
      `Restocked +${amount} units`,
      target ? `${target.name} (${target.sku}) inventory updated.` : undefined
    );
  };

  const handleSyncInventory = () => {
    setProducts((prev) =>
      prev.map((p) => (p.stock <= p.reorderPoint ? { ...p, stock: p.stock + 40 } : p))
    );
    addToast(
      t.widgets.syncInventory,
      'Low-stock SKUs automatically replenished across regional warehouses.'
    );
  };

  const handleInviteMember = (name: string, email: string, role: TeamMember['role']) => {
    const newMember: TeamMember = {
      id: `TM-${Date.now()}`,
      name,
      email,
      role,
      department: 'Operations & Growth',
      lastActive: 'Invited just now',
      twoFactorEnabled: true,
      permissions: ['Workspace Access', 'Role Policy Verified'],
    };
    setTeamMembers((prev) => [...prev, newMember]);
    addToast(`Seat Invitation Sent`, `${name} (${role}) invited via ${email}.`);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              connected: !item.connected,
              lastSync: !item.connected ? 'Just now' : 'Paused',
            }
          : item
      )
    );
    const target = integrations.find((i) => i.id === id);
    if (target) {
      addToast(
        `${target.name}`,
        target.connected ? 'Integration webhook paused.' : 'Integration connected & synced.',
        'info'
      );
    }
  };

  const lowStockCount = products.filter((p) => p.stock <= p.reorderPoint).length;
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'pending' || o.status === 'processing'
  ).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex flex-col selection:bg-[var(--accent-primary)] selection:text-white">
        <LiquidBackground />
        <LoginScreen
          onSuccessLogin={(user) => {
            setCurrentUser(user);
            setIsAuthenticated(true);
            if (deviceMode !== 'full') {
              setIsHomeScreenOpen(true);
            }
            addToast(
              `Welcome back, ${user.name}`,
              `Signed in as ${user.role} · ${activeWorkspace.name}`
            );
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-[var(--accent-primary)] selection:text-white">
      <LiquidBackground />

      {/* Hardware Mock-up Wrapper (Full / MacBook Pro 16" / iPad Pro 13" / iPhone 16 Pro Max) */}
      <DeviceMockupFrame
        deviceMode={deviceMode}
        onSelectDeviceMode={handleSelectDeviceMode}
        orientation={deviceOrientation}
        onToggleOrientation={() =>
          setDeviceOrientation((o) => (o === 'portrait' ? 'landscape' : 'portrait'))
        }
        isHomeScreenOpen={isHomeScreenOpen}
        onToggleHomeScreen={() => setIsHomeScreenOpen((prev) => !prev)}
        bottomDock={
          <DeviceInternalDock
            deviceMode={deviceMode}
            activeSection={activeSection}
            isHomeScreenOpen={isHomeScreenOpen}
            onSelectSection={(sec) => {
              setActiveSection(sec);
              setIsHomeScreenOpen(false);
            }}
            onToggleHomeScreen={() => setIsHomeScreenOpen((prev) => !prev)}
            onSelectDeviceMode={handleSelectDeviceMode}
            onOpenCommandPalette={() => setCommandOpen(true)}
            onOpenQuickCreate={() => {
              setQuickCreateTab('order');
              setQuickCreateOpen(true);
            }}
            ordersCount={activeOrdersCount}
            lowStockCount={lowStockCount}
            isAuthenticated={isAuthenticated}
            onToggleLock={() => {
              setIsAuthenticated(false);
              addToast(t.app.signOut, 'Switched to Lock / Login Screen.', 'info');
            }}
          />
        }
      >
        {isHomeScreenOpen ? (
          /* Device OS Home Screen (SpringBoard / iPadOS Home / macOS Launchpad)
           * Every Sidebar item is rendered as an interactive Liquid Glass App Icon */
          <DeviceHomeScreen
            deviceMode={deviceMode}
            activeSection={activeSection}
            onOpenApp={(sec) => {
              setActiveSection(sec);
              setIsHomeScreenOpen(false);
            }}
            onOpenCommandPalette={() => setCommandOpen(true)}
            onOpenQuickCreate={() => {
              setQuickCreateTab('order');
              setQuickCreateOpen(true);
            }}
            ordersCount={activeOrdersCount}
            lowStockCount={lowStockCount}
            totalRevenueFormatted={`$${kpiMetrics.totalRevenue.toLocaleString()}`}
            conversionRate={kpiMetrics.conversionRate}
            userName={currentUser.name}
            workspaceName={activeWorkspace.name}
          />
        ) : (
          <div className="flex-1 flex flex-col">
            <TopBar
              workspaces={WORKSPACES}
              activeWorkspace={activeWorkspace}
              onSelectWorkspace={(ws) => {
                setActiveWorkspace(ws);
                triggerRefresh();
              }}
              onOpenCommandPalette={() => setCommandOpen(true)}
              onOpenQuickCreate={(tab = 'order') => {
                setQuickCreateTab(tab);
                setQuickCreateOpen(true);
              }}
              onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
              activities={activities}
              onMarkAllRead={() =>
                setActivities((prev) => prev.map((a) => ({ ...a, read: true })))
              }
              onMarkActivityRead={(id) =>
                setActivities((prev) =>
                  prev.map((a) => (a.id === id ? { ...a, read: true } : a))
                )
              }
              onNavigate={(sec) => {
                setActiveSection(sec);
                setIsHomeScreenOpen(false);
              }}
              currentUser={currentUser}
              onLogout={() => {
                setIsAuthenticated(false);
                addToast(t.app.signOut, 'Workspace locked securely.', 'info');
              }}
              deviceMode={deviceMode}
              onSelectDeviceMode={handleSelectDeviceMode}
            />

            {/* Main Desktop Workspace Container */}
            <div className="flex-1 flex gap-5 px-3 sm:px-6 pb-10 pt-2 max-w-[1600px] w-full mx-auto">
              <Sidebar
                activeSection={activeSection}
                onSelectSection={(sec) => {
                  setActiveSection(sec);
                  setIsHomeScreenOpen(false);
                }}
                collapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
                mobileOpen={mobileSidebarOpen}
                onCloseMobile={() => setMobileSidebarOpen(false)}
                ordersCount={activeOrdersCount}
                lowStockCount={lowStockCount}
              />

              <main className="workspace-content flex-1 min-w-0 space-y-6">
                <div role="note" className="demo-notice">
                  <FaIcon icon="fa-solid fa-circle-info" />
                  {language === 'vi' ? 'Bản trải nghiệm — dữ liệu mẫu. Thay đổi sẽ đặt lại khi tải lại trang.' : language === 'zh' ? '体验版 — 示例数据。刷新后更改将重置。' : 'Demo workspace — sample data. Changes reset on reload.'}
                </div>
                {/* Page Breadcrumb & Welcome / Section Header */}
                <Card glassVariant="secondary">
                  <CardContent>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1.5 max-w-2xl">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
                          <button
                            type="button"
                            onClick={() => setIsHomeScreenOpen(true)}
                            className="liquid-btn px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[var(--accent-primary)] inline-flex items-center gap-1.5 cursor-pointer"
                            title="Open Device OS Home Screen (App Icons)"
                          >
                            <FaIcon icon="fa-solid fa-table-cells-large" className="text-[10px]" />
                            <span>Home Apps</span>
                          </button>
                          <span aria-hidden="true">/</span>
                          <span>{activeWorkspace.name}</span>
                          <span aria-hidden="true">/</span>
                          <span className="font-medium text-[var(--accent-primary)]">
                            {t.nav[activeSection]}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-tabular inline-flex items-center gap-1.5">
                            <FaIcon icon="fa-regular fa-calendar" className="text-[11px]" />
                            {formattedDate}
                          </span>
                        </div>

                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                          {activeSection === 'overview'
                            ? `${t.welcome.greeting.split(',')[0]}, ${currentUser.name}`
                            : t.nav[activeSection]}
                        </h1>

                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {t.welcome.summaryPrefix}{' '}
                          <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                            {t.welcome.summaryHighlight}
                          </strong>{' '}
                          {t.welcome.summarySuffix}
                        </p>
                      </div>

                      {/* Date-Range Selector & Primary Contextual Actions */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <div className="liquid-pill-group overflow-x-auto">
                          {(['today', '7d', '30d', '90d', '12m'] as DateRangeKey[]).map((rk) => {
                            const active = dateRange === rk;
                            return (
                              <button
                                key={rk}
                                type="button"
                                onClick={() => {
                                  setDateRange(rk);
                                  triggerRefresh();
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                                  active
                                    ? 'liquid-btn-primary text-white'
                                    : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                              >
                                {t.welcome.ranges[rk]}
                              </button>
                            );
                          })}
                        </div>

                        {activeSection !== 'development' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setActiveSection('development')}
                            title="Open shadcn/ui Liquid Glass Component Library"
                          >
                            <FaIcon
                              icon="fa-solid fa-code"
                              className="text-[var(--accent-primary)]"
                            />
                            <span>shadcn UI Kit</span>
                          </Button>
                        )}

                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={triggerRefresh}
                          title={t.app.refreshData}
                          aria-label={t.app.refreshData}
                        >
                          <FaIcon
                            icon="fa-solid fa-arrows-rotate"
                            className={isLoading ? 'fa-spin' : ''}
                          />
                        </Button>

                        <Button variant="secondary" onClick={handleExportCsv}>
                          <FaIcon icon="fa-solid fa-download" />
                          <span>{t.welcome.exportCsvBtn}</span>
                        </Button>

                        <Button
                          variant="default"
                          onClick={() => {
                            setQuickCreateTab('order');
                            setQuickCreateOpen(true);
                          }}
                        >
                          <FaIcon icon="fa-solid fa-plus" />
                          <span>{t.welcome.newOrderBtn}</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dynamic Module Routing */}
                {activeSection === 'overview' && (
                  <div className="space-y-6">
                    {/* 4 Liquid Glass KPI Cards with Font Awesome Icons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                      <MetricCard
                        id="rev"
                        label={t.kpi.totalRevenue}
                        value={`$${kpiMetrics.totalRevenue.toLocaleString()}`}
                        changePercent={18.4}
                        vsLabel={t.kpi.vsPreviousPeriod}
                        sparklineData={[32, 38, 35, 44, 49, 46, 54, 59, 64, 68]}
                        faIcon="fa-solid fa-dollar-sign"
                        loading={isLoading}
                        onClick={() => setActiveSection('analytics')}
                      />
                      <MetricCard
                        id="ord"
                        label={t.kpi.totalOrders}
                        value={kpiMetrics.totalOrdersCount.toLocaleString()}
                        changePercent={12.6}
                        vsLabel={t.kpi.vsPreviousPeriod}
                        sparklineData={[110, 125, 118, 142, 155, 149, 172, 190, 208, 236]}
                        faIcon="fa-solid fa-bag-shopping"
                        loading={isLoading}
                        onClick={() => setActiveSection('orders')}
                      />
                      <MetricCard
                        id="cus"
                        label={t.kpi.activeCustomers}
                        value={kpiMetrics.activeCustomersCount.toLocaleString()}
                        changePercent={9.2}
                        vsLabel={t.kpi.vsPreviousPeriod}
                        sparklineData={[820, 845, 860, 890, 920, 945, 980, 1010, 1050, 1095]}
                        faIcon="fa-solid fa-user-group"
                        loading={isLoading}
                        onClick={() => setActiveSection('customers')}
                      />
                      <MetricCard
                        id="cvr"
                        label={t.kpi.conversionRate}
                        value={`${kpiMetrics.conversionRate}%`}
                        changePercent={4.1}
                        vsLabel={t.kpi.vsPreviousPeriod}
                        sparklineData={[3.4, 3.5, 3.6, 3.8, 3.9, 4.0, 4.1, 4.3, 4.5, 4.64]}
                        faIcon="fa-solid fa-percent"
                        loading={isLoading}
                        onClick={() => setActiveSection('analytics')}
                      />
                    </div>

                    <RevenueChart
                      data={scaledChartSeries}
                      granularity={chartGranularity}
                      onChangeGranularity={setChartGranularity}
                      loading={isLoading}
                    />

                    <OrdersTable
                      orders={orders}
                      loading={isLoading}
                      onInspectOrder={(ord) => setInspectedOrder(ord)}
                      onFulfillOrder={handleFulfillOrder}
                      onRequestCancelOrder={(ord) => setOrderToCancel(ord)}
                      onOpenCreateOrder={() => {
                        setQuickCreateTab('order');
                        setQuickCreateOpen(true);
                      }}
                    />

                    <OverviewWidgets
                      activities={activities}
                      products={products}
                      orders={orders}
                      onOpenQuickCreate={(tab) => {
                        setQuickCreateTab(tab);
                        setQuickCreateOpen(true);
                      }}
                      onSyncInventory={handleSyncInventory}
                      onNavigate={(sec) => setActiveSection(sec)}
                    />
                  </div>
                )}

                {activeSection === 'development' && <Suspense fallback={<p role="status">{language === 'vi' ? 'Đang tải…' : language === 'zh' ? '加载中…' : 'Loading…'}</p>}><DevelopmentShowcaseView /></Suspense>}

                {activeSection === 'analytics' && (
                  <div className="space-y-6">
                    <RevenueChart
                      data={scaledChartSeries}
                      granularity={chartGranularity}
                      onChangeGranularity={setChartGranularity}
                      loading={isLoading}
                    />
                    <AnalyticsModuleView series={scaledChartSeries} onExportCsv={handleExportCsv} />
                  </div>
                )}

                {activeSection === 'orders' && (
                  <OrdersTable
                    orders={orders}
                    loading={isLoading}
                    pageSize={10}
                    onInspectOrder={(ord) => setInspectedOrder(ord)}
                    onFulfillOrder={handleFulfillOrder}
                    onRequestCancelOrder={(ord) => setOrderToCancel(ord)}
                    onOpenCreateOrder={() => {
                      setQuickCreateTab('order');
                      setQuickCreateOpen(true);
                    }}
                  />
                )}

                {(activeSection === 'products' || activeSection === 'inventory') && (
                  <ProductsInventoryView
                    products={products}
                    modeType={activeSection}
                    onOpenCreateProduct={() => {
                      setQuickCreateTab('product');
                      setQuickCreateOpen(true);
                    }}
                    onRestockProduct={handleRestockProduct}
                  />
                )}

                {activeSection === 'customers' && <CustomersModuleView customers={customers} />}

                {activeSection === 'reports' && <ReportsModuleView onExportCsv={handleExportCsv} />}

                {activeSection === 'team' && (
                  <TeamModuleView members={teamMembers} onInviteMember={handleInviteMember} />
                )}

                {activeSection === 'integrations' && (
                  <IntegrationsModuleView
                    integrations={integrations}
                    onToggleIntegration={handleToggleIntegration}
                  />
                )}

                {activeSection === 'settings' && <SettingsModuleView />}
              </main>
            </div>
          </div>
        )}
      </DeviceMockupFrame>

      {/* Floating Glass Overlays & Modals */}
      <SearchCommandModal
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={(sec) => {
          setActiveSection(sec);
          setIsHomeScreenOpen(false);
        }}
        onOpenQuickCreate={(tab) => {
          setQuickCreateTab(tab);
          setQuickCreateOpen(true);
        }}
        orders={orders}
        onInspectOrder={(ord) => setInspectedOrder(ord)}
      />

      <QuickCreateModal
        open={quickCreateOpen}
        defaultTab={quickCreateTab}
        onClose={() => setQuickCreateOpen(false)}
        onCreateOrder={handleCreateOrder}
        onCreateProduct={handleCreateProduct}
      />

      <OrderDetailDrawer
        order={inspectedOrder}
        onClose={() => setInspectedOrder(null)}
        onFulfillOrder={handleFulfillOrder}
        onRequestCancelOrder={(ord) => setOrderToCancel(ord)}
      />

      <CancelOrderDialog
        order={orderToCancel}
        onCancel={() => setOrderToCancel(null)}
        onConfirm={handleConfirmCancelOrder}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <DashboardWorkspace />
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
