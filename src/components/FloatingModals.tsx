import React, { useEffect, useState } from 'react';
import { ACCENT_SWATCHES, useTheme } from '../context/ThemeContext';
import { LANGUAGE_OPTIONS, useLanguage } from '../context/LanguageContext';
import { NavSectionId, Order } from '../types/dashboard';
import { Button, FaIcon, Input, Label } from './ui/liquid-shadcn';

/* 1. Spotlight Command Palette (⌘K) */
interface SearchCommandModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (section: NavSectionId) => void;
  onOpenQuickCreate: (tab: 'order' | 'product') => void;
  orders: Order[];
  onInspectOrder: (order: Order) => void;
}

export const SearchCommandModal: React.FC<SearchCommandModalProps> = ({
  open,
  onClose,
  onNavigate,
  onOpenQuickCreate,
  orders,
  onInspectOrder,
}) => {
  const { mode, toggleMode, setAccent } = useTheme();
  const { setLanguage, t } = useLanguage();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) setQuery('');
  }, [open]);

  if (!open) return null;

  const navItems: { id: NavSectionId; label: string; faIcon: string }[] = [
    { id: 'overview', label: t.nav.overview, faIcon: 'fa-solid fa-gauge-high' },
    { id: 'development', label: t.nav.development, faIcon: 'fa-solid fa-code' },
    { id: 'analytics', label: t.nav.analytics, faIcon: 'fa-solid fa-chart-line' },
    { id: 'orders', label: t.nav.orders, faIcon: 'fa-solid fa-bag-shopping' },
    { id: 'products', label: t.nav.products, faIcon: 'fa-solid fa-cube' },
    { id: 'customers', label: t.nav.customers, faIcon: 'fa-solid fa-user-group' },
    { id: 'inventory', label: t.nav.inventory, faIcon: 'fa-solid fa-boxes-stacked' },
    { id: 'reports', label: t.nav.reports, faIcon: 'fa-solid fa-file-invoice-dollar' },
    { id: 'team', label: t.nav.team, faIcon: 'fa-solid fa-shield-halved' },
    { id: 'integrations', label: t.nav.integrations, faIcon: 'fa-solid fa-plug' },
    { id: 'settings', label: t.nav.settings, faIcon: 'fa-solid fa-sliders' },
  ];

  const q = query.trim().toLowerCase();
  const filteredNav = navItems.filter((n) => !q || n.label.toLowerCase().includes(q));
  const matchingOrders = q
    ? orders
        .filter(
          (o) =>
            o.id.toLowerCase().includes(q) ||
            o.customerName.toLowerCase().includes(q) ||
            o.customerEmail.toLowerCase().includes(q)
        )
        .slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight Command Palette"
        className="relative z-10 w-full max-w-xl glass-floating rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="p-3.5 border-b border-[var(--glass-border)] flex items-center gap-3">
          <FaIcon
            icon="fa-solid fa-magnifying-glass"
            className="text-sm text-[var(--accent-primary)] shrink-0"
          />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.modals.commandPalettePlaceholder}
            className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <Button variant="secondary" size="icon" className="h-7 w-7" onClick={onClose}>
            <FaIcon icon="fa-solid fa-xmark" className="text-xs" />
          </Button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {matchingOrders.length > 0 && (
            <div>
              <p className="px-2.5 pb-1.5 text-[11px] font-semibold text-[var(--text-muted)]">
                Matching Orders
              </p>
              <div className="space-y-1">
                {matchingOrders.map((ord) => (
                  <button
                    key={ord.id}
                    type="button"
                    onClick={() => {
                      onInspectOrder(ord);
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[var(--accent-soft)] flex items-center justify-between text-xs cursor-pointer"
                  >
                    <span className="font-medium text-[var(--text-primary)]">
                      <strong className="font-mono-tabular">{ord.id}</strong> · {ord.customerName}
                    </span>
                    <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                      ${ord.amount.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Modules */}
          <div>
            <p className="px-2.5 pb-1.5 text-[11px] font-semibold text-[var(--text-muted)]">
              {t.modals.commandNavigation}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {filteredNav.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                  className="text-left px-3 py-2 rounded-xl hover:bg-[var(--accent-soft)] flex items-center justify-between text-xs text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <FaIcon icon={item.faIcon} className="text-xs text-[var(--accent-primary)]" />
                    <span>{item.label}</span>
                  </span>
                  <FaIcon icon="fa-solid fa-arrow-right" className="text-[10px] text-[var(--text-muted)]" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <p className="px-2.5 pb-1.5 text-[11px] font-semibold text-[var(--text-muted)]">
              {t.modals.commandActions}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <Button
                variant="secondary"
                className="justify-start"
                onClick={() => {
                  onClose();
                  onOpenQuickCreate('order');
                }}
              >
                <FaIcon icon="fa-solid fa-plus" className="text-[var(--accent-primary)]" />
                <span>{t.modals.tabOrder}</span>
              </Button>
              <Button
                variant="secondary"
                className="justify-start"
                onClick={() => {
                  onClose();
                  onOpenQuickCreate('product');
                }}
              >
                <FaIcon icon="fa-solid fa-cube" className="text-[var(--accent-primary)]" />
                <span>{t.modals.tabProduct}</span>
              </Button>
            </div>
          </div>

          {/* Theme & Language Quick Switch */}
          <div>
            <p className="px-2.5 pb-1.5 text-[11px] font-semibold text-[var(--text-muted)]">
              {t.modals.commandTheme}
            </p>
            <div className="flex flex-wrap items-center gap-2 px-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  toggleMode();
                  onClose();
                }}
              >
                <FaIcon icon={mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
                <span>{mode === 'dark' ? t.app.themeLight : t.app.themeDark}</span>
              </Button>

              {ACCENT_SWATCHES.map((sw) => (
                <Button
                  key={sw.id}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setAccent(sw.id);
                    onClose();
                  }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sw.hex }} />
                  <span>{t.accents[sw.id]}</span>
                </Button>
              ))}

              {LANGUAGE_OPTIONS.map((lang) => (
                <Button
                  key={lang.code}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setLanguage(lang.code);
                    onClose();
                  }}
                  className="font-mono-tabular"
                >
                  {lang.short}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 2. Quick Create Modal (Order or Product) */
interface QuickCreateModalProps {
  open: boolean;
  defaultTab: 'order' | 'product';
  onClose: () => void;
  onCreateOrder: (data: {
    customerName: string;
    customerEmail: string;
    customerLocation: string;
    amount: number;
  }) => void;
  onCreateProduct: (data: {
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
  }) => void;
}

export const QuickCreateModal: React.FC<QuickCreateModalProps> = ({
  open,
  defaultTab,
  onClose,
  onCreateOrder,
  onCreateProduct,
}) => {
  const { t } = useLanguage();
  const [tab, setTab] = useState<'order' | 'product'>(defaultTab);

  // Order fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerLocation, setCustomerLocation] = useState('San Francisco, US');
  const [orderAmount, setOrderAmount] = useState('1490');

  // Product fields
  const [productName, setProductName] = useState('');
  const [productSku, setProductSku] = useState('AURA-NEW-01');
  const [productCategory, setProductCategory] = useState('Workspace Hardware');
  const [productPrice, setProductPrice] = useState('299');
  const [productStock, setProductStock] = useState('80');

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab, open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'order') {
      if (!customerName.trim() || !customerEmail.trim()) return;
      onCreateOrder({
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        customerLocation: customerLocation.trim() || 'Global Express',
        amount: Math.max(10, Number(orderAmount) || 499),
      });
      setCustomerName('');
      setCustomerEmail('');
      onClose();
    } else {
      if (!productName.trim() || !productSku.trim()) return;
      onCreateProduct({
        name: productName.trim(),
        sku: productSku.trim().toUpperCase(),
        category: productCategory.trim(),
        price: Math.max(1, Number(productPrice) || 199),
        stock: Math.max(0, Number(productStock) || 50),
      });
      setProductName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-md glass-floating rounded-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              {t.modals.quickCreateTitle}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t.modals.quickCreateSubtitle}
            </p>
          </div>
          <Button variant="secondary" size="icon" className="h-8 w-8" onClick={onClose}>
            <FaIcon icon="fa-solid fa-xmark" />
          </Button>
        </div>

        {/* Segmented Tab Switcher */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)]">
          <button
            type="button"
            onClick={() => setTab('order')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tab === 'order' ? 'accent-btn' : 'text-[var(--text-secondary)]'
            }`}
          >
            {t.modals.tabOrder}
          </button>
          <button
            type="button"
            onClick={() => setTab('product')}
            className={`py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              tab === 'product' ? 'accent-btn' : 'text-[var(--text-secondary)]'
            }`}
          >
            {t.modals.tabProduct}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'order' ? (
            <>
              <div>
                <Label>{t.modals.customerName}</Label>
                <Input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  leftFaIcon="fa-regular fa-user"
                  placeholder="e.g. Julian Vance"
                />
              </div>
              <div>
                <Label>{t.modals.customerEmail}</Label>
                <Input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  leftFaIcon="fa-regular fa-envelope"
                  placeholder="julian@studio.io"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t.modals.orderAmount}</Label>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    required
                    value={orderAmount}
                    onChange={(e) => setOrderAmount(e.target.value)}
                    className="font-mono-tabular"
                  />
                </div>
                <div>
                  <Label>{t.modals.shippingLocation}</Label>
                  <Input
                    type="text"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <Label>{t.modals.productName}</Label>
                <Input
                  type="text"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  leftFaIcon="fa-solid fa-cube"
                  placeholder="e.g. Studio Acoustic Monitor Stand"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t.modals.productSku}</Label>
                  <Input
                    type="text"
                    required
                    value={productSku}
                    onChange={(e) => setProductSku(e.target.value)}
                    className="font-mono-tabular"
                  />
                </div>
                <div>
                  <Label>{t.modals.productCategory}</Label>
                  <Input
                    type="text"
                    required
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>{t.modals.productPrice}</Label>
                  <Input
                    type="number"
                    min="1"
                    required
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="font-mono-tabular"
                  />
                </div>
                <div>
                  <Label>{t.modals.productStock}</Label>
                  <Input
                    type="number"
                    min="0"
                    required
                    value={productStock}
                    onChange={(e) => setProductStock(e.target.value)}
                    className="font-mono-tabular"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pt-2 flex items-center justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              {t.modals.cancel}
            </Button>
            <Button type="submit" variant="default">
              <FaIcon icon="fa-solid fa-check" />
              <span>{t.modals.create}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 3. Order Detail Floating Glass Drawer */
interface OrderDetailDrawerProps {
  order: Order | null;
  onClose: () => void;
  onFulfillOrder: (id: string) => void;
  onRequestCancelOrder: (order: Order) => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({
  order,
  onClose,
  onFulfillOrder,
  onRequestCancelOrder,
}) => {
  const { t } = useLanguage();
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md h-full glass-floating p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div className="space-y-6">
          <div className="flex items-start justify-between border-b border-[var(--glass-border)] pb-4">
            <div>
              <p className="text-xs font-mono-tabular text-[var(--accent-primary)] font-semibold">
                {t.modals.orderDetails}
              </p>
              <h3 className="text-xl font-bold font-mono-tabular text-[var(--text-primary)] mt-0.5">
                {order.id}
              </h3>
              <p className="text-xs font-mono-tabular text-[var(--text-muted)] mt-0.5">
                {order.date}
              </p>
            </div>
            <Button variant="secondary" size="icon" className="h-8 w-8" onClick={onClose}>
              <FaIcon icon="fa-solid fa-xmark" />
            </Button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[var(--glass-border)]">
              <span className="text-[var(--text-secondary)]">{t.orders.customer}</span>
              <span className="font-semibold text-[var(--text-primary)]">{order.customerName}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--glass-border)]">
              <span className="text-[var(--text-secondary)]">Email</span>
              <span className="font-mono-tabular text-[var(--text-primary)]">
                {order.customerEmail}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--glass-border)]">
              <span className="text-[var(--text-secondary)]">{t.modals.shippingLocation}</span>
              <span className="text-[var(--text-primary)]">{order.customerLocation}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--glass-border)]">
              <span className="text-[var(--text-secondary)]">{t.modals.paymentMethod}</span>
              <span className="font-mono-tabular text-[var(--text-primary)]">
                {order.paymentMethod}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[var(--text-primary)]">
              {t.modals.lineItems} ({order.items.length})
            </h4>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)] flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">{item.name}</p>
                    <p className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
                      {item.sku} · Qty {item.quantity}
                    </p>
                  </div>
                  <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                    ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--accent-soft)] border border-[var(--accent-border)] flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-primary)]">
              {t.orders.amount}
            </span>
            <span className="text-lg font-bold font-mono-tabular text-[var(--text-primary)]">
              ${order.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-end gap-2">
          {order.status !== 'cancelled' && (
            <Button
              variant="secondary"
              className="text-rose-500"
              onClick={() => {
                onClose();
                onRequestCancelOrder(order);
              }}
            >
              <FaIcon icon="fa-solid fa-ban" />
              <span>{t.orders.cancelOrder}</span>
            </Button>
          )}
          {order.status !== 'fulfilled' && order.status !== 'cancelled' && (
            <Button
              variant="default"
              onClick={() => {
                onFulfillOrder(order.id);
                onClose();
              }}
            >
              <FaIcon icon="fa-solid fa-circle-check" />
              <span>{t.orders.markFulfilled}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

/* 4. Confirmation Dialog for Order Cancellation */
interface CancelOrderDialogProps {
  order: Order | null;
  onCancel: () => void;
  onConfirm: (orderId: string) => void;
}

export const CancelOrderDialog: React.FC<CancelOrderDialogProps> = ({
  order,
  onCancel,
  onConfirm,
}) => {
  const { t } = useLanguage();
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-sm glass-floating rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-500/15 text-rose-500 shrink-0">
            <FaIcon icon="fa-solid fa-triangle-exclamation" className="text-base" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {t.modals.confirmCancelTitle}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
              <strong className="font-mono-tabular">{order.id}</strong> ({order.customerName} · $
              {order.amount.toLocaleString()}). {t.modals.confirmCancelDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button variant="secondary" size="sm" onClick={onCancel}>
            {t.modals.cancel}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onConfirm(order.id)}>
            <FaIcon icon="fa-solid fa-trash-can" />
            <span>{t.modals.confirmCancelBtn}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
