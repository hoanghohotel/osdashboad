export type ThemeMode = 'light' | 'dark';

export type AccentColor = 'blue' | 'purple' | 'pink' | 'orange' | 'green' | 'graphite';

export type LanguageCode = 'vi' | 'en' | 'zh';

export type NavSectionId =
  | 'overview'
  | 'analytics'
  | 'orders'
  | 'products'
  | 'customers'
  | 'inventory'
  | 'reports'
  | 'team'
  | 'integrations'
  | 'development'
  | 'settings';

export type DateRangeKey = 'today' | '7d' | '30d' | '90d' | '12m';

export type DeviceMode = 'full' | 'macbook' | 'ipad' | 'iphone';

export type DeviceOrientation = 'landscape' | 'portrait';

export type ChartGranularity = 'daily' | 'weekly' | 'monthly';

export type OrderStatus = 'fulfilled' | 'processing' | 'pending' | 'cancelled';

export type PaymentStatus = 'paid' | 'unpaid' | 'refunded';

export interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerLocation: string;
  date: string;
  amount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  itemsCount: number;
  paymentMethod: string;
  items: OrderItem[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  reorderPoint: number;
  unitsSold: number;
  revenue: number;
  growth: number;
  rating: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  company: string;
  location: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  segment: 'enterprise' | 'vip' | 'growth' | 'new';
}

export interface ActivityEvent {
  id: string;
  type: 'order' | 'product' | 'inventory' | 'team' | 'system';
  titleKey: string;
  titleCustom?: string;
  description: string;
  timestamp: string;
  actor: string;
  read: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Operations' | 'Analyst' | 'Support';
  department: string;
  lastActive: string;
  twoFactorEnabled: boolean;
  permissions: string[];
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  lastSync: string;
  eventsPerDay: number;
}

export interface AnalyticsPoint {
  label: string;
  revenue: number;
  orders: number;
  previousRevenue: number;
  conversionRate: number;
}

export interface WorkspaceOption {
  id: string;
  name: string;
  plan: string;
  region: string;
  multiplier: number;
}
