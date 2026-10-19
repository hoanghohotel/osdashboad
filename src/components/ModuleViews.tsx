import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FaIcon,
  Input,
  Label,
  Progress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/liquid-shadcn';
import { ACCENT_SWATCHES, useTheme } from '../context/ThemeContext';
import { LANGUAGE_OPTIONS, useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { WALLPAPER_PRESETS, WallpaperPreset } from '../data/wallpapers';
import {
  AnalyticsPoint,
  Customer,
  IntegrationItem,
  Product,
  TeamMember,
} from '../types/dashboard';

/* 1. Analytics Deep-Dive Module */
export const AnalyticsModuleView: React.FC<{
  series: AnalyticsPoint[];
  onExportCsv: () => void;
}> = ({ series, onExportCsv }) => {
  const { mode } = useTheme();
  const axisColor = mode === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)';

  const channelData = [
    { channel: 'Direct & Organic', share: 42, conversion: 4.9, aov: 318, revenue: 581364 },
    { channel: 'Apple Pay Express', share: 28, conversion: 5.4, aov: 342, revenue: 387576 },
    { channel: 'Enterprise B2B Portal', share: 19, conversion: 6.2, aov: 1240, revenue: 262998 },
    { channel: 'Partner Affiliates', share: 11, conversion: 3.1, aov: 245, revenue: 152262 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card glassVariant="secondary" className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between border-b border-[var(--glass-border)] pb-4 space-y-0">
            <div>
              <CardTitle>Conversion Rate & Order Volume Velocity</CardTitle>
              <CardDescription className="mt-0.5">
                Checkout funnel efficiency (%) paired with period order volume
              </CardDescription>
            </div>
            <Button variant="secondary" size="sm" onClick={onExportCsv}>
              <FaIcon icon="fa-solid fa-download" />
              <span>Export Telemetry</span>
            </Button>
          </CardHeader>

          <CardContent className="pt-5">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={series} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (!active || !payload || !payload.length) return null;
                      const pt = payload[0].payload as AnalyticsPoint;
                      return (
                        <div className="glass-floating rounded-xl p-3 text-xs space-y-1">
                          <p className="font-semibold text-[var(--text-primary)]">{label}</p>
                          <p className="font-mono-tabular text-[var(--text-secondary)]">
                            Orders: <strong className="text-[var(--text-primary)]">{pt.orders}</strong>
                          </p>
                          <p className="font-mono-tabular text-[var(--text-secondary)]">
                            Conversion:{' '}
                            <strong className="text-emerald-500">{pt.conversionRate}%</strong>
                          </p>
                        </div>
                      );
                    }}
                  />
                  <Bar dataKey="orders" fill="var(--accent-primary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card glassVariant="secondary">
          <CardHeader className="border-b border-[var(--glass-border)] pb-4">
            <CardTitle>Acquisition Attribution</CardTitle>
            <CardDescription>Revenue share · Conversion · Average order value</CardDescription>
          </CardHeader>
          <CardContent className="pt-5 space-y-4">
            {channelData.map((ch) => (
              <div key={ch.channel} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[var(--text-primary)]">{ch.channel}</span>
                  <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                    ${ch.revenue.toLocaleString()}
                  </span>
                </div>
                <div className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
                  {ch.share}% share · {ch.conversion}% CVR · ${ch.aov} AOV
                </div>
                <Progress value={ch.share} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* 2. Products & Inventory Module */
export const ProductsInventoryView: React.FC<{
  products: Product[];
  modeType: 'products' | 'inventory';
  onOpenCreateProduct: () => void;
  onRestockProduct: (productId: string, amount: number) => void;
}> = ({ products, modeType, onOpenCreateProduct, onRestockProduct }) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchCat = categoryFilter === 'All' || p.category === categoryFilter;
    const matchQ =
      !query.trim() ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.sku.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className="space-y-6">
      <Card glassVariant="secondary">
        <CardContent className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={categoryFilter === cat ? 'default' : 'secondary'}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 sm:w-64">
                <Input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  leftFaIcon="fa-solid fa-magnifying-glass"
                  placeholder="Search SKU or product name..."
                />
              </div>
              <Button variant="default" size="sm" onClick={onOpenCreateProduct}>
                <FaIcon icon="fa-solid fa-plus" />
                <span>Add SKU</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((prod) => {
              const isLow = prod.stock <= prod.reorderPoint;
              return (
                <Card
                  key={prod.id}
                  glassVariant="interactive"
                  interactiveHover
                  className="flex flex-col justify-between"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm leading-snug">{prod.name}</CardTitle>
                      <span className="font-mono-tabular text-sm font-bold text-[var(--text-primary)] shrink-0">
                        ${prod.price}
                      </span>
                    </div>
                    <CardDescription className="font-mono-tabular text-[11px]">
                      {prod.sku} · {prod.category} · <FaIcon icon="fa-solid fa-star" className="text-amber-400 text-[10px]" /> {prod.rating.toFixed(1)}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="justify-between gap-2 mt-2">
                    <div className="text-xs">
                      <span className="text-[var(--text-secondary)]">Stock: </span>
                      <strong
                        className={`font-mono-tabular ${
                          isLow
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {prod.stock} units
                      </strong>
                      <span className="text-[var(--text-muted)] font-mono-tabular">
                        {' '}
                        · {prod.unitsSold} sold
                      </span>
                    </div>

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onRestockProduct(prod.id, 50)}
                    >
                      <FaIcon
                        icon="fa-solid fa-arrows-rotate"
                        className="text-[10px] text-[var(--accent-primary)]"
                      />
                      <span>{modeType === 'inventory' ? 'Restock +50' : '+50 Stock'}</span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* 3. Customers Directory View */
export const CustomersModuleView: React.FC<{ customers: Customer[] }> = ({ customers }) => {
  const { addToast } = useToast();
  const [segment, setSegment] = useState<'all' | Customer['segment']>('all');

  const list = customers.filter((c) => segment === 'all' || c.segment === segment);

  return (
    <Card glassVariant="secondary" className="overflow-hidden">
      <CardHeader className="border-b border-[var(--glass-border)] pb-4 flex-col sm:flex-row sm:items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle>Customer Accounts & Lifetime Value</CardTitle>
          <CardDescription className="mt-0.5">
            Segmented B2B and direct customer accounts ranked by cumulative net spend
          </CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {(['all', 'enterprise', 'vip', 'growth', 'new'] as const).map((seg) => (
            <Button
              key={seg}
              size="sm"
              variant={segment === seg ? 'default' : 'secondary'}
              onClick={() => setSegment(seg)}
              className="capitalize"
            >
              {seg}
            </Button>
          ))}
        </div>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-5">Customer · Organization</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Segment</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">Lifetime Spend</TableHead>
            <TableHead className="text-right px-5">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((cus) => (
            <TableRow key={cus.id}>
              <TableCell className="px-5">
                <div className="font-semibold text-[var(--text-primary)]">{cus.name}</div>
                <div className="text-[11px] text-[var(--text-muted)]">
                  {cus.company} · {cus.email}
                </div>
              </TableCell>
              <TableCell className="text-[var(--text-secondary)]">{cus.location}</TableCell>
              <TableCell className="capitalize font-medium text-[var(--accent-primary)]">
                {cus.segment}
              </TableCell>
              <TableCell className="text-right font-mono-tabular text-[var(--text-primary)]">
                {cus.ordersCount}
              </TableCell>
              <TableCell className="text-right font-mono-tabular font-semibold text-[var(--text-primary)]">
                ${cus.totalSpent.toLocaleString()}
              </TableCell>
              <TableCell className="px-5 text-right">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() =>
                    addToast(
                      `Statement dispatched to ${cus.name}`,
                      `Sent account ledger summary to ${cus.email}`,
                      'info'
                    )
                  }
                >
                  <FaIcon icon="fa-regular fa-paper-plane" className="text-[10px]" />
                  <span>Send Statement</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

/* 4. Reports Module View */
export const ReportsModuleView: React.FC<{ onExportCsv: () => void }> = ({ onExportCsv }) => {
  const { addToast } = useToast();
  const reports = [
    {
      id: 'REP-2026-Q4',
      title: 'Q4 Executive GMV & Net Margin Ledger',
      period: 'Oct 2026 MTD',
      format: 'CSV · JSON · PDF',
      size: '1.8 MB',
    },
    {
      id: 'REP-TAX-VAT',
      title: 'Multi-Region VAT, GST & Sales Tax Reconciliation',
      period: 'Q3 2026 Settled',
      format: 'CSV · NetSuite XML',
      size: '2.4 MB',
    },
    {
      id: 'REP-INV-VAL',
      title: 'Warehouse SKU Valuation & Sell-Through Velocity',
      period: 'Rolling 30 Days',
      format: 'CSV · XLSX',
      size: '940 KB',
    },
    {
      id: 'REP-COHORT',
      title: 'Enterprise SaaS & VIP Retention Cohort Matrix',
      period: '12-Month Rolling',
      format: 'CSV · Parquet',
      size: '3.1 MB',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {reports.map((rep) => (
        <Card
          key={rep.id}
          glassVariant="secondary"
          interactiveHover
          className="flex flex-col justify-between"
        >
          <CardHeader>
            <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[var(--text-muted)]">
              <span>{rep.id}</span>
              <span>
                {rep.period} · {rep.size}
              </span>
            </div>
            <CardTitle className="mt-1">{rep.title}</CardTitle>
            <CardDescription>Formats: {rep.format}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-end">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                onExportCsv();
                addToast('Report Downloaded', `${rep.title} (${rep.id}) exported.`);
              }}
            >
              <FaIcon icon="fa-solid fa-download" />
              <span>Download Report</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

/* 5. Team & Permissions Module View */
export const TeamModuleView: React.FC<{
  members: TeamMember[];
  onInviteMember: (name: string, email: string, role: TeamMember['role']) => void;
}> = ({ members, onInviteMember }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Operations');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    onInviteMember(name.trim(), email.trim(), role);
    setName('');
    setEmail('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card glassVariant="secondary" className="lg:col-span-2">
        <CardHeader className="border-b border-[var(--glass-border)] pb-4">
          <CardTitle>Workspace Operators & Role-Based Access</CardTitle>
          <CardDescription>
            Hardware passkey enforcement enabled across all administrative seats
          </CardDescription>
        </CardHeader>

        <CardContent className="divide-y divide-[var(--glass-border)] pt-2">
          {members.map((m) => (
            <div
              key={m.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  {m.name} · <span className="text-[var(--accent-primary)]">{m.role}</span>
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  {m.email} · {m.department} · {m.lastActive}
                </p>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                  {m.permissions.join(' · ')}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-[11px] font-mono-tabular text-emerald-600 dark:text-emerald-400">
                <FaIcon icon="fa-solid fa-key" />
                <span>2FA Passkey Active</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card glassVariant="secondary">
        <form onSubmit={handleSubmit}>
          <CardHeader className="border-b border-[var(--glass-border)] pb-4">
            <CardTitle>Invite Workspace Operator</CardTitle>
            <CardDescription>
              Provision a new role-scoped seat with SSO & Passkey policy
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4 space-y-3">
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftFaIcon="fa-regular fa-user"
                placeholder="e.g. Linh Pham"
              />
            </div>
            <div>
              <Label>Work Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftFaIcon="fa-regular fa-envelope"
                placeholder="linh@auraos.io"
              />
            </div>
            <div>
              <Label>Access Role</Label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TeamMember['role'])}
                className="w-full h-9 glass-interactive px-3 rounded-xl text-xs text-[var(--text-primary)] bg-transparent focus:outline-none"
              >
                <option value="Admin">Admin</option>
                <option value="Operations">Operations</option>
                <option value="Analyst">Analyst</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </CardContent>

          <CardFooter>
            <Button type="submit" variant="default" className="w-full">
              <FaIcon icon="fa-solid fa-user-plus" />
              <span>Send Seat Invitation</span>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

/* 6. Integrations Module View */
export const IntegrationsModuleView: React.FC<{
  integrations: IntegrationItem[];
  onToggleIntegration: (id: string) => void;
}> = ({ integrations, onToggleIntegration }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {integrations.map((intg) => (
        <Card
          key={intg.id}
          glassVariant="secondary"
          interactiveHover
          className="flex flex-col justify-between"
        >
          <CardHeader>
            <div className="flex items-center justify-between text-[11px] font-mono-tabular text-[var(--text-muted)]">
              <span>{intg.category}</span>
              <span
                className={
                  intg.connected
                    ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                    : 'text-[var(--text-muted)]'
                }
              >
                {intg.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <CardTitle className="mt-1">{intg.name}</CardTitle>
            <CardDescription className="leading-relaxed">{intg.description}</CardDescription>
          </CardHeader>

          <CardFooter className="justify-between text-xs">
            <span className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
              Sync: {intg.lastSync} · {intg.eventsPerDay.toLocaleString()}/day
            </span>
            <Button
              size="sm"
              variant={intg.connected ? 'secondary' : 'default'}
              onClick={() => onToggleIntegration(intg.id)}
            >
              <FaIcon icon={intg.connected ? 'fa-solid fa-sliders' : 'fa-solid fa-plug'} />
              <span>{intg.connected ? 'Configure' : 'Connect'}</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

/* 7. Settings Module View (macOS System Settings & 10-Wallpaper Studio Aesthetic) */
export const SettingsModuleView: React.FC = () => {
  const {
    mode,
    setMode,
    accent,
    setAccent,
    highRefraction,
    setHighRefraction,
    wallpaperId,
    activeWallpaper,
    customWallpaperUrl,
    wallpaperBlur,
    wallpaperDim,
    setWallpaperId,
    setCustomWallpaperUrl,
    setWallpaperBlur,
    setWallpaperDim,
    cycleNextWallpaper,
  } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { addToast } = useToast();

  const [wallpaperCategory, setWallpaperCategory] = useState<
    'all' | WallpaperPreset['category']
  >('all');
  const [customUrlInput, setCustomUrlInput] = useState(customWallpaperUrl || '');

  const filteredWallpapers = WALLPAPER_PRESETS.filter(
    (wp) => wallpaperCategory === 'all' || wp.category === wallpaperCategory
  );

  const handleSelectWallpaper = (wp: WallpaperPreset) => {
    setWallpaperId(wp.id);
    addToast(
      language === 'vi'
        ? `Đã đổi hình nền: ${wp.name.vi}`
        : language === 'zh'
        ? `已切换壁纸：${wp.name.zh}`
        : `Wallpaper applied: ${wp.name.en}`,
      wp.subtitle[language],
      'info'
    );
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomWallpaperUrl(reader.result);
        setCustomUrlInput('');
        addToast(
          language === 'vi' ? 'Đã tải ảnh nền tùy chỉnh' : 'Custom Background Uploaded',
          file.name,
          'info'
        );
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Card 1: 10 Designed Wallpapers & Background Studio */}
      <Card glassVariant="secondary">
        <CardHeader className="border-b border-[var(--glass-border)] pb-4 flex-col sm:flex-row sm:items-center justify-between gap-4 space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FaIcon icon="fa-solid fa-image" className="text-[var(--accent-primary)]" />
              <span>
                {language === 'vi'
                  ? 'Bộ Sưu Tập 10 Hình Nền Thiết Kế (macOS & iOS 26 Wallpaper Studio)'
                  : language === 'zh'
                  ? 'macOS 与 iOS 26 专属 10 款精制背景壁纸工作室'
                  : 'macOS & iOS 26 Designed Wallpaper Studio (10 Artworks)'}
              </span>
            </CardTitle>
            <CardDescription className="mt-1">
              {language === 'vi'
                ? 'Chọn 1 trong 10 ảnh nền nghệ thuật độ phân giải cao để khúc xạ xuyên qua lớp kính Liquid Glass trên toàn bộ thiết bị'
                : language === 'zh'
                ? '从 10 款高分辨率艺术背景中选择，实时折射于全设备液态玻璃界面'
                : 'Select from 10 custom-designed artworks engineered for optical Liquid Glass refraction across all devices'}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                cycleNextWallpaper();
                addToast(
                  language === 'vi'
                    ? 'Đã chuyển sang hình nền kế tiếp'
                    : language === 'zh'
                    ? '已切换下一张壁纸'
                    : 'Switched to next wallpaper',
                  undefined,
                  'info'
                );
              }}
            >
              <FaIcon icon="fa-solid fa-wand-magic-sparkles" />
              <span>
                {language === 'vi'
                  ? 'Đổi hình nền tiếp theo'
                  : language === 'zh'
                  ? '切换下一张壁纸'
                  : 'Next Wallpaper'}
              </span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-5 space-y-6">
          {/* Active Wallpaper Live Preview Showcase Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-[var(--glass-border-strong)] h-44 sm:h-52 flex items-end p-5 select-none">
            <img
              src={customWallpaperUrl.trim() || activeWallpaper.svgDataUri}
              alt={activeWallpaper.name[language]}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1 text-white">
                <div className="flex items-center gap-2 text-[11px] font-mono-tabular text-sky-300">
                  <FaIcon icon="fa-solid fa-circle-check" />
                  <span>
                    {customWallpaperUrl.trim()
                      ? 'Custom User Wallpaper'
                      : `${activeWallpaper.badge} · ${activeWallpaper.resolution}`}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                  {customWallpaperUrl.trim()
                    ? language === 'vi'
                      ? 'Ảnh Nền Tùy Chỉnh'
                      : 'Custom Background Image'
                    : activeWallpaper.name[language]}
                </h3>
                <p className="text-xs text-white/80 max-w-xl">
                  {customWallpaperUrl.trim()
                    ? language === 'vi'
                      ? 'Đang sử dụng hình nền tải lên hoặc liên kết tùy chỉnh của bạn'
                      : 'Currently displaying your custom uploaded or linked background'
                    : activeWallpaper.subtitle[language]}
                </p>
              </div>

              {/* Optical Wallpaper Blur & Dimming Controls */}
              <div className="glass-floating rounded-2xl px-4 py-2.5 flex flex-wrap items-center gap-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[var(--text-primary)]">
                    {language === 'vi' ? 'Độ mờ nền:' : 'Blur:'}
                  </span>
                  {([0, 4, 12] as const).map((bVal) => (
                    <button
                      key={bVal}
                      type="button"
                      onClick={() => setWallpaperBlur(bVal)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tabular font-semibold cursor-pointer ${
                        wallpaperBlur === bVal
                          ? 'liquid-btn-primary text-white'
                          : 'liquid-btn-ghost text-[var(--text-secondary)]'
                      }`}
                    >
                      {bVal}px
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[var(--text-primary)]">
                    {language === 'vi' ? 'Độ dịu:' : 'Dim:'}
                  </span>
                  {([18, 32, 48] as const).map((dVal) => (
                    <button
                      key={dVal}
                      type="button"
                      onClick={() => setWallpaperDim(dVal)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tabular font-semibold cursor-pointer ${
                        wallpaperDim === dVal
                          ? 'liquid-btn-primary text-white'
                          : 'liquid-btn-ghost text-[var(--text-secondary)]'
                      }`}
                    >
                      {dVal}%
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="liquid-pill-group overflow-x-auto">
              {(
                [
                  {
                    id: 'all',
                    label:
                      language === 'vi'
                        ? 'Tất cả 10 ảnh nền'
                        : language === 'zh'
                        ? '全部 10 款壁纸'
                        : 'All 10 Wallpapers',
                  },
                  {
                    id: 'dynamic',
                    label:
                      language === 'vi'
                        ? 'Dải Lụa Động (Dynamic)'
                        : language === 'zh'
                        ? '动态流光'
                        : 'Dynamic Flow',
                  },
                  {
                    id: 'landscape',
                    label:
                      language === 'vi'
                        ? 'Phong Cảnh macOS'
                        : language === 'zh'
                        ? 'macOS 自然风光'
                        : 'macOS Landscapes',
                  },
                  {
                    id: 'prism',
                    label:
                      language === 'vi'
                        ? 'Lăng Kính Quang Học'
                        : language === 'zh'
                        ? '光学棱镜'
                        : 'Optical Prism',
                  },
                  {
                    id: 'abstract',
                    label:
                      language === 'vi'
                        ? 'Điêu Khắc 3D'
                        : language === 'zh'
                        ? '3D 雕塑艺术'
                        : '3D Abstract',
                  },
                ] as const
              ).map((cat) => {
                const active = wallpaperCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setWallpaperCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'liquid-btn-primary text-white'
                        : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span className="text-xs font-mono-tabular text-[var(--text-muted)]">
              {filteredWallpapers.length} / 10 Artworks
            </span>
          </div>

          {/* 10 Custom-Designed Background Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {filteredWallpapers.map((wp) => {
              const indexNum = WALLPAPER_PRESETS.findIndex((item) => item.id === wp.id) + 1;
              const isSelected = !customWallpaperUrl.trim() && wallpaperId === wp.id;
              return (
                <button
                  key={wp.id}
                  type="button"
                  onClick={() => handleSelectWallpaper(wp)}
                  className={`group text-left rounded-2xl overflow-hidden border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/40 -translate-y-0.5 shadow-lg'
                      : 'border-[var(--glass-border)] hover:border-[var(--glass-border-strong)] hover:-translate-y-1'
                  }`}
                >
                  {/* 16:9 Wallpaper Artwork Preview */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img
                      src={wp.svgDataUri}
                      alt={wp.name[language]}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

                    {/* Top Index Number & Active Checkmark */}
                    <div className="absolute top-2 inset-x-2.5 flex items-center justify-between text-[10px] font-mono-tabular text-white/90">
                      <span className="px-1.5 py-0.5 rounded-md bg-black/45 backdrop-blur-md">
                        #{String(indexNum).padStart(2, '0')}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-sm">
                          <FaIcon icon="fa-solid fa-check" className="text-[10px]" />
                        </span>
                      )}
                    </div>

                    {/* Bottom Badge inside Thumbnail */}
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] text-white/85 font-medium truncate">
                      <span className="truncate">{wp.badge}</span>
                    </div>
                  </div>

                  {/* Wallpaper Title & Subtitle */}
                  <div className="p-3 bg-[var(--glass-secondary-bg)] flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                        {wp.name[language]}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-0.5 leading-snug">
                        {wp.subtitle[language]}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional Custom Wallpaper Upload or Image URL Bar */}
          <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div className="flex-1 space-y-1.5">
              <Label>
                {language === 'vi'
                  ? 'Hoặc tải ảnh nền riêng / dán đường dẫn ảnh (Custom Wallpaper)'
                  : language === 'zh'
                  ? '或上传自定义图片 / 粘贴壁纸链接'
                  : 'Or Upload / Paste Custom Background Image URL'}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="url"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  leftFaIcon="fa-solid fa-link"
                  placeholder="https://example.com/wallpaper.jpg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    if (!customUrlInput.trim()) return;
                    setCustomWallpaperUrl(customUrlInput.trim());
                    addToast(
                      language === 'vi' ? 'Đã áp dụng URL hình nền' : 'Custom Wallpaper URL Applied'
                    );
                  }}
                >
                  <span>{language === 'vi' ? 'Áp dụng' : 'Apply URL'}</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <label className="liquid-btn px-3.5 py-2 rounded-full text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-2 cursor-pointer">
                <FaIcon icon="fa-solid fa-upload" className="text-[var(--accent-primary)]" />
                <span>
                  {language === 'vi'
                    ? 'Tải ảnh từ máy'
                    : language === 'zh'
                    ? '上传本地图片'
                    : 'Upload Image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadFile}
                  className="hidden"
                />
              </label>

              {customWallpaperUrl.trim() && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setCustomWallpaperUrl('');
                    setCustomUrlInput('');
                    addToast(
                      language === 'vi'
                        ? 'Đã khôi phục bộ 10 hình nền mặc định'
                        : 'Restored preset wallpaper'
                    );
                  }}
                >
                  <FaIcon icon="fa-solid fa-rotate-left" />
                  <span>{language === 'vi' ? 'Khôi phục' : 'Reset'}</span>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card 2: Light/Dark Glass Posture & 6 System Accent Colors */}
      <Card glassVariant="secondary">
        <CardHeader className="border-b border-[var(--glass-border)] pb-4">
          <CardTitle>macOS Liquid Glass Appearance & System Accent</CardTitle>
          <CardDescription>
            Customize surface translucency, light/dark glass posture, and the 6 macOS Sonoma accent tints
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5 space-y-6">
          {/* Light / Dark Mode Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setMode('light')}
              className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                mode === 'light'
                  ? 'bg-[var(--accent-soft)] border-[var(--accent-border)]'
                  : 'glass-interactive'
              }`}
            >
              <div className="flex items-center gap-3">
                <FaIcon icon="fa-solid fa-sun" className="text-amber-500 text-base" />
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    {t.app.themeLight}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Warm alabaster backdrop · Specular white glass
                  </p>
                </div>
              </div>
              {mode === 'light' && (
                <FaIcon icon="fa-solid fa-check" className="text-xs text-[var(--accent-primary)]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMode('dark')}
              className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                mode === 'dark'
                  ? 'bg-[var(--accent-soft)] border-[var(--accent-border)]'
                  : 'glass-interactive'
              }`}
            >
              <div className="flex items-center gap-3">
                <FaIcon icon="fa-solid fa-moon" className="text-sky-400 text-base" />
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    {t.app.themeDark}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Deep obsidian graphite · Layered smoked glass
                  </p>
                </div>
              </div>
              {mode === 'dark' && (
                <FaIcon icon="fa-solid fa-check" className="text-xs text-[var(--accent-primary)]" />
              )}
            </button>
          </div>

          {/* 6 Switchable System Accent Colors */}
          <div className="pt-2">
            <Label className="mb-3">{t.app.accentColor} (6 macOS Sonoma Presets)</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {ACCENT_SWATCHES.map((swatch) => {
                const active = accent === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => {
                      setAccent(swatch.id);
                      addToast(`${t.app.accentColor}: ${t.accents[swatch.id]}`, undefined, 'info');
                    }}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      active
                        ? 'bg-[var(--accent-soft)] border-[var(--accent-border)]'
                        : 'glass-interactive'
                    }`}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: mode === 'dark' ? swatch.darkHex : swatch.hex }}
                    >
                      {active && (
                        <FaIcon icon="fa-solid fa-check" className="text-[10px] text-white" />
                      )}
                    </span>
                    <span className="text-[11px] font-medium text-[var(--text-primary)] truncate max-w-full">
                      {t.accents[swatch.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Trilingual Language Switcher (VI / EN / ZH) */}
          <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                {t.app.language} (Việt · Anh · Trung)
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Instant interface localization across navigation, metrics, and dialogs
              </p>
            </div>
            <div className="flex items-center gap-2">
              {LANGUAGE_OPTIONS.map((opt) => (
                <Button
                  key={opt.code}
                  size="sm"
                  variant={language === opt.code ? 'default' : 'secondary'}
                  onClick={() => {
                    setLanguage(opt.code);
                    addToast(`Language switched to ${opt.label}`, undefined, 'info');
                  }}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Optical Blur & Refraction Depth Toggle */}
          <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[var(--text-primary)]">
                High-Depth Optical Glass Refraction (28px Blur)
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                Increases backdrop-filter blur radius for enhanced layered depth
              </p>
            </div>
            <Switch checked={highRefraction} onCheckedChange={setHighRefraction} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

