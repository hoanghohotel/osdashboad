# AuraOS — macOS Liquid Glass E-Commerce & SaaS Admin Workspace

AuraOS is a production-grade administrative workspace and analytics platform inspired by Apple's macOS Liquid Glass design language. It delivers an authentic layered translucent desktop experience for managing modern e-commerce operations, SaaS revenue metrics, orders, inventory, customers, and team workflows with native tactile precision.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following architectural and aesthetic decisions incorporate your selections and the core workflow specification:

- **Confirmed Decision 1 — Primary Business Focus**: **Modern E-Commerce & SaaS Analytics**, combining real-time revenue intelligence, order lifecycle management, product catalog & inventory tracking, customer segmentation, and team operations.
- **Confirmed Decision 2 — Theme & Accent Architecture**: **macOS Sonoma Dynamic Tint System** featuring carefully calibrated **Light Mode** and **Dark Mode** glass materials paired with **6 switchable system accent colors** (Cupertino Blue, Royal Purple, Rose Pink, Amber Orange, Emerald Green, and Titanium Graphite), persisted in local storage.
- **Confirmed Decision 3 — Background & Refraction Atmosphere**: **Interactive macOS Liquid Mesh with 3D Glass Orbs**, providing subtle ambient light dispersion behind translucent `backdrop-filter: blur(...) saturate(...)` panels while guaranteeing WCAG AA text contrast and readability.
- **Confirmed Decision 4 — Trilingual Localization (EN / VI / ZH)**: Built-in instant language switching across **English (`EN`)**, **Tiếng Việt (`VI`)**, and **中文 (`ZH`)** with localized UI labels, navigation, metrics, and status terminology.

---

## 1. Overview & Core Concept

- **What It Does**: AuraOS provides a unified executive and operational command center with a floating macOS-inspired top bar, collapsible translucent sidebar, global `⌘K` spotlight command palette, interactive KPI sparklines, multi-series revenue & order analytics, full CRUD/filterable orders table, and dedicated interactive workspaces for all 10 navigation sections (Overview, Analytics, Orders, Products, Customers, Inventory, Reports, Team & Permissions, Integrations, and Settings).
- **Target Audience / Persona**: E-commerce directors, SaaS founders, and operations leads who expect the visual refinement, spatial clarity, and keyboard-first responsiveness of a native macOS desktop application.
- **Key Value**: Replaces cluttered, flat admin templates with a calm, layered Liquid Glass hierarchy that reduces cognitive load while keeping dense financial and operational data scannable and immediately actionable.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Executive Overview & Period Comparison**: Users greet a personalized workspace header with date-range switching (`Today`, `7D`, `30D`, `90D`, `12M`), 4 KPI metric cards with mini sparklines and period-over-period deltas, and an interactive Recharts revenue/orders area chart with `Daily`, `Weekly`, and `Monthly` granularity toggles.
2. **Order Fulfillment & Inspection**: Users search orders in real time, filter by fulfillment or payment status, sort by date or amount, paginate results, inspect full order line-items in a floating glass detail drawer, update order statuses, or create a new order via the Quick-Create modal.
3. **Spotlight Command (`⌘K`) & Multi-View Navigation**: Pressing `⌘K` (or clicking the search bar) opens a floating Liquid Glass command menu to jump directly to any module, filter orders, toggle Light/Dark mode, switch between the 6 macOS accent colors, or switch languages (`EN` / `VI` / `ZH`).
4. **Complete Module Coverage**: Clicking any of the 10 sidebar sections transitions smoothly to a dedicated, functional view (e.g., cohort & funnel charts in Analytics, visual product catalog with stock controls in Products & Inventory, customer LTV profiles in Customers, downloadable report builders in Reports, RBAC matrix in Team, API webhook toggles in Integrations, and live appearance/accent/language customizers in Settings).

### Visual Identity & Theme
- **Aesthetic Direction**: Authentic macOS Sonoma / VisionOS Liquid Glass — multi-layered translucent acrylic and glass surfaces with specular top-edge inner highlights (`inset 0 1px 0 0 rgba(255,255,255,0.45)` in light mode, `rgba(255,255,255,0.12)` in dark mode), hairline translucent borders, and soft ambient elevation shadows.
- **Color Palette & Mood**:
  - *Light Mode (`--bg-canvas: #F4F5F8`)*: Warm alabaster-silver canvas with subtle pastel ambient mesh orbs; primary glass (`rgba(255, 255, 255, 0.68)`), secondary card glass (`rgba(255, 255, 255, 0.54)`), floating popover glass (`rgba(255, 255, 255, 0.85)`), crisp charcoal ink (`#111827`), and muted slate secondary text (`#4B5563`).
  - *Dark Mode (`--bg-canvas: #0B0D13`)*: Deep obsidian-graphite canvas with subdued aurora mesh refraction; primary glass (`rgba(24, 28, 38, 0.72)`), secondary card glass (`rgba(30, 35, 48, 0.56)`), floating popover glass (`rgba(20, 24, 34, 0.88)`), soft alabaster primary text (`#F9FAFB`), and cool gray secondary text (`#9CA3AF`).
  - *6 Switchable macOS Accent Tints*:
    1. **Blue (Default)**: `#007AFF` (Light) / `#0A84FF` (Dark)
    2. **Purple**: `#AF52DE` / `#BF5AF2`
    3. **Pink**: `#FF2D55` / `#FF375F`
    4. **Orange**: `#FF9500` / `#FF9F0A`
    5. **Green**: `#28CD41` / `#30D158`
    6. **Graphite**: `#5856D6` / `#636366`
- **Typography & Hierarchy**:
  - *System & Display Stack*: `-apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "SF Pro Display", "SF Pro Text", "Segoe UI", sans-serif` for native Apple geometric legibility.
  - *Numeric & Financial Discipline*: Strict `font-variant-numeric: tabular-nums` (`tabular-nums`) and monospace alignment on all currency values, order IDs, percentages, timestamps, and table columns to prevent layout jitter.
- **Component Styling & Glass Surface Hierarchy**:
  - **Primary Glass**: Floating TopBar and collapsible Sidebar (`backdrop-filter: blur(24px) saturate(180%)`).
  - **Secondary Glass**: KPI MetricCards, RevenueChart container, OrdersTable, and module panels (`backdrop-filter: blur(16px) saturate(160%)`).
  - **Floating Glass**: Spotlight Command Palette (`⌘K`), Notification Center popover, Account Menu, and Quick-Create Modal (`backdrop-filter: blur(32px) saturate(200%)`).
  - **Interactive Glass**: Segmented controls, pill-free unboxed metadata with `·` separators, tactile button states, and active sidebar indicators tinted with the active system accent color.
- **Interactive Feedback & Motion**:
  - Compositor-only transitions (`transform`, `opacity`) settling in `150ms–220ms` with `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Full support for `prefers-reduced-motion` and graceful CSS fallback when `backdrop-filter` is unavailable.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1 — CSS Custom Properties for Live Glass & 6-Accent Theme Engine**
  - *Chosen Approach*: Centralize all glass opacities, specular border highlights, text contrast tokens, and the 6 macOS accent colors as reactive CSS variables on the document root, paired with Tailwind CSS utility classes.
  - *Why*: Enables instantaneous, zero-flicker switching between Light/Dark modes and any of the 6 accent colors across charts, active navigation states, focus rings, and interactive buttons.
  - *Alternatives Considered*: Hardcoding Tailwind color classes per component, which makes multi-accent theming brittle and causes inconsistent contrast in dark mode.
- **Decision 2 — Rich Client-Side State Store with Simulated Async Loading & Empty States**
  - *Chosen Approach*: Build a strongly typed reactive state layer seeded with realistic e-commerce & SaaS data (orders, products, customers, activity logs, time-series revenue) plus interactive controls to trigger loading skeletons, empty filter states, error recovery, and live record creation.
  - *Why*: Ensures every button, filter, sort header, pagination control, quick-action modal, and toast notification performs a real, verifiable state mutation.
  - *Alternatives Considered*: Static display tables, which fail functional usability requirements.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         AuraOS Providers & Context                           │
│   ┌────────────────────┐   ┌────────────────────┐   ┌────────────────────┐   │
│   │   ThemeProvider    │   │   I18nProvider     │   │   ToastProvider    │   │
│   │ (Light/Dark + 6    │   │ (Việt / Anh /      │   │ (macOS Notification│   │
│   │  macOS Accents)    │   │  Trung Dictionary) │   │  Banner Queue)     │   │
│   └─────────┬──────────┘   └─────────┬──────────┘   └─────────┬──────────┘   │
└─────────────┼────────────────────────┼────────────────────────┼──────────────┘
              │                        │                        │
              ▼                        ▼                        ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           AppShell & Liquid Canvas                           │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ LiquidBackground (Ambient Mesh Gradient + 3D Refracting Glass Orbs)    │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ TopBar (Primary Glass: Workspace Switcher, ⌘K Trigger, Quick-Create,   │  │
│  │         Unread Notifications Popover, Theme/Accent/Lang, User Menu)    │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────┐  ┌──────────────────────────────────────────────┐  │
│  │ Sidebar (Collapsible │  │ Main Desktop Workspace Viewport              │  │
│  │ Primary Glass +      │  │  ┌────────────────────────────────────────┐  │  │
│  │ Mobile Drawer)       │  │  │ PageHeader (Breadcrumbs, Title,        │  │  │
│  │ • Overview           │  │  │ Date-Range Picker, Contextual Actions) │  │  │
│  │ • Analytics          │  │  └────────────────────────────────────────┘  │  │
│  │ • Orders             │  │  ┌────────────────────────────────────────┐  │  │
│  │ • Products           │  │  │ Active Module View (Overview Default)  │  │  │
│  │ • Customers          │  │  │ • 4x MetricCards (Tabular + Sparkline) │  │  │
│  │ • Inventory          │  │  │ • RevenueChart (Recharts D/W/M Filter) │  │  │
│  │ • Reports            │  │  │ • OrdersTable (Search/Sort/Page/CRUD)  │  │  │
│  │ • Team & Permissions │  │  │ • ActivityTimeline & Status Dist.      │  │  │
│  │ • Integrations       │  │  │ • Best-Selling Products & Quick Action │  │  │
│  │ • Settings           │  │  └────────────────────────────────────────┘  │  │
│  └──────────────────────┘  └──────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ Floating Glass Overlays: SearchCommand (⌘K) │ QuickCreateModal │       │  │
│  │                          OrderDetailDrawer  │ ConfirmationDialog       │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State
- **Theme & Appearance State**: `mode: 'light' | 'dark'`, `accent: 'blue' | 'purple' | 'pink' | 'orange' | 'green' | 'graphite'`, `reducedMotion: boolean`, `glassIntensity: 'standard' | 'high'`, persisted in `localStorage`.
- **Localization State (`Language: 'vi' | 'en' | 'zh'`)**: Complete structured dictionary covering navigation, KPI titles, chart axes, table headers, status labels, notifications, and empty/error states.
- **Commerce & SaaS Dataset**:
  - `Order`: ID, customer name/email/avatar, timestamp, line items, total amount, fulfillment status (`Fulfilled`, `Processing`, `Pending`, `Cancelled`), payment status (`Paid`, `Refunded`, `Unpaid`).
  - `Product & Inventory`: SKU, name, category, unit price, stock level, reorder threshold, 30-day sales volume, revenue contribution.
  - `Analytics Series`: Daily, Weekly, and Monthly time-series arrays scaled dynamically by the active date-range selector (`7D`, `30D`, `90D`, `12M`).
  - `Activity & Notifications`: Categorized timeline events (`order`, `product`, `inventory`, `team`, `system`) with unread flags and mark-all-read handlers.

### Interactive Component & State Mapping
- **TopBar & Workspace Switcher**: Switching workspaces (`Aura Commerce Global`, `Aura APAC Storefront`, `Aura Enterprise SaaS`) dynamically recalculates workspace metrics and triggers a confirmation toast.
- **KPI MetricCards & Date Range**: Changing the date-range filter updates the 4 KPI values, percentage change deltas, and mini sparkline trends, with an optional simulated refresh skeleton state.
- **RevenueChart (`Recharts`)**: Toggling `Daily`, `Weekly`, and `Monthly` or toggling series visibility (`Revenue`, `Orders`) smoothly updates the responsive area/bar chart with custom translucent glass tooltips.
- **OrdersTable**: Live search input filters by Order ID, customer name, or email; status segment tabs filter by fulfillment state; column headers sort ascending/descending; row action menus open the Order Detail Drawer, mark orders fulfilled, or open a confirmation dialog before cancellation.
- **Quick-Create & Command Palette (`⌘K`)**: Creating a new order or product appends directly to the live state, updates KPI totals and recent activity, and fires a macOS-style toast notification.
