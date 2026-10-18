import React, { useState } from 'react';
import {
  AccordionItem,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  FaIcon,
  Input,
  Kbd,
  Label,
  Progress,
  RadioGroup,
  Separator,
  Skeleton,
  Slider,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
} from './ui/liquid-shadcn';
import { ACCENT_SWATCHES, useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';

interface ShadcnCatalogEntry {
  name: string;
  tag: string;
  category: 'buttons' | 'forms' | 'navigation' | 'data' | 'overlays' | 'layout';
  faIcon: string;
  description: string;
}

export const SHADCN_54_CATALOG: ShadcnCatalogEntry[] = [
  // 1. Buttons & Actions (6)
  { name: 'Button', tag: '<Button />', category: 'buttons', faIcon: 'fa-solid fa-hand-pointer', description: '9 Liquid Glass variants & 8 sizes with loading & kbd support' },
  { name: 'Button Group', tag: '<ButtonGroup />', category: 'buttons', faIcon: 'fa-solid fa-object-group', description: 'Segmented translucent capsule container for grouped actions' },
  { name: 'Toggle', tag: '<Toggle />', category: 'buttons', faIcon: 'fa-solid fa-toggle-on', description: 'Two-state pressable glass button for toolbar state' },
  { name: 'Toggle Group', tag: '<ToggleGroup />', category: 'buttons', faIcon: 'fa-solid fa-bold', description: 'Single or multi-select formatting toolbar buttons' },
  { name: 'Split Button', tag: '<SplitButton />', category: 'buttons', faIcon: 'fa-solid fa-caret-down', description: 'Primary action paired with secondary dropdown trigger' },
  { name: 'Kbd', tag: '<Kbd />', category: 'buttons', faIcon: 'fa-regular fa-keyboard', description: 'macOS keyboard shortcut badge (⌘K, ⇧⌘P)' },

  // 2. Forms & Inputs (12)
  { name: 'Input', tag: '<Input />', category: 'forms', faIcon: 'fa-solid fa-i-cursor', description: 'Inset translucent text field with Font Awesome prefix icon' },
  { name: 'Input OTP', tag: '<InputOTP />', category: 'forms', faIcon: 'fa-solid fa-key', description: '6-digit hardware passkey & 2FA verification boxes' },
  { name: 'Textarea', tag: '<Textarea />', category: 'forms', faIcon: 'fa-solid fa-align-left', description: 'Multi-line glass text area with focus ring' },
  { name: 'Label', tag: '<Label />', category: 'forms', faIcon: 'fa-solid fa-tag', description: 'Accessible form field caption primitive' },
  { name: 'Select', tag: '<Select />', category: 'forms', faIcon: 'fa-solid fa-list-check', description: 'Glass dropdown select with keyboard navigation' },
  { name: 'Combobox', tag: '<Combobox />', category: 'forms', faIcon: 'fa-solid fa-magnifying-glass-plus', description: 'Autocomplete input with searchable glass popover list' },
  { name: 'Checkbox', tag: '<Checkbox />', category: 'forms', faIcon: 'fa-solid fa-square-check', description: 'Specular rounded check control with Font Awesome tick' },
  { name: 'Radio Group', tag: '<RadioGroup />', category: 'forms', faIcon: 'fa-regular fa-circle-dot', description: 'Single-choice glass card radio selector' },
  { name: 'Switch', tag: '<Switch />', category: 'forms', faIcon: 'fa-solid fa-sliders', description: 'macOS System Settings tactile pill toggle' },
  { name: 'Slider', tag: '<Slider />', category: 'forms', faIcon: 'fa-solid fa-gauge', description: 'Continuous range track with dynamic accent fill' },
  { name: 'Form', tag: '<Form />', category: 'forms', faIcon: 'fa-solid fa-file-signature', description: 'Validated form group with inline helper & error states' },
  { name: 'Date Picker', tag: '<DatePicker />', category: 'forms', faIcon: 'fa-regular fa-calendar-days', description: 'Popover trigger combined with interactive Calendar' },

  // 3. Navigation & Menus (8)
  { name: 'Tabs', tag: '<Tabs />', category: 'navigation', faIcon: 'fa-solid fa-folder-Closed', description: 'Segmented macOS glass tab bar with content panels' },
  { name: 'Breadcrumb', tag: '<Breadcrumb />', category: 'navigation', faIcon: 'fa-solid fa-angles-right', description: 'Hierarchical path trail with custom separators' },
  { name: 'Menubar', tag: '<Menubar />', category: 'navigation', faIcon: 'fa-solid fa-window-maximize', description: 'Desktop macOS top application menu bar (File, Edit, View)' },
  { name: 'Navigation Menu', tag: '<NavigationMenu />', category: 'navigation', faIcon: 'fa-regular fa-compass', description: 'Horizontal header navigation with glass mega-preview' },
  { name: 'Dropdown Menu', tag: '<DropdownMenu />', category: 'navigation', faIcon: 'fa-solid fa-bars-staggered', description: 'Floating action menu with shortcuts & dividers' },
  { name: 'Context Menu', tag: '<ContextMenu />', category: 'navigation', faIcon: 'fa-solid fa-arrow-pointer', description: 'Right-click / contextual glass inspection menu' },
  { name: 'Pagination', tag: '<Pagination />', category: 'navigation', faIcon: 'fa-solid fa-ellipsis', description: 'Page navigation controls with numbered glass buttons' },
  { name: 'Sidebar', tag: '<Sidebar />', category: 'navigation', faIcon: 'fa-solid fa-table-columns', description: 'Collapsible desktop & mobile drawer navigation rail' },

  // 4. Overlays, Modals & Popovers (10)
  { name: 'Dialog', tag: '<Dialog />', category: 'overlays', faIcon: 'fa-regular fa-window-restore', description: 'Centered floating glass modal window with backdrop blur' },
  { name: 'Alert Dialog', tag: '<AlertDialog />', category: 'overlays', faIcon: 'fa-solid fa-triangle-exclamation', description: 'Destructive action confirmation modal interrupt' },
  { name: 'Sheet', tag: '<Sheet />', category: 'overlays', faIcon: 'fa-solid fa-panel-right', description: 'Slide-over side inspector panel (Right / Left)' },
  { name: 'Drawer', tag: '<Drawer />', category: 'overlays', faIcon: 'fa-solid fa-window-minimize', description: 'Bottom Vaul-style gesture sheet with grab handle' },
  { name: 'Popover', tag: '<Popover />', category: 'overlays', faIcon: 'fa-regular fa-comment-dots', description: 'Floating glass callout anchored to trigger button' },
  { name: 'Tooltip', tag: '<Tooltip />', category: 'overlays', faIcon: 'fa-solid fa-circle-info', description: 'Micro glass hover label with shortcut hint' },
  { name: 'Hover Card', tag: '<HoverCard />', category: 'overlays', faIcon: 'fa-regular fa-id-card', description: 'Rich profile preview card on link/avatar hover' },
  { name: 'Command', tag: '<Command />', category: 'overlays', faIcon: 'fa-solid fa-terminal', description: 'Spotlight ⌘K keyboard command palette' },
  { name: 'Sonner', tag: '<Sonner />', category: 'overlays', faIcon: 'fa-solid fa-bell', description: 'Stacked macOS notification banner toast engine' },
  { name: 'Toast', tag: '<Toast />', category: 'overlays', faIcon: 'fa-regular fa-bell', description: 'Actionable status notification with dismiss control' },

  // 5. Data Display & Feedback (10)
  { name: 'Card', tag: '<Card />', category: 'data', faIcon: 'fa-regular fa-square', description: 'Composable glass container (Header, Title, Content, Footer)' },
  { name: 'Table', tag: '<Table />', category: 'data', faIcon: 'fa-solid fa-table', description: 'Semantic tabular data grid with sticky glass header' },
  { name: 'Data Table', tag: '<DataTable />', category: 'data', faIcon: 'fa-solid fa-table-list', description: 'Full-featured table with sort, filter, search & pagination' },
  { name: 'Badge', tag: '<Badge />', category: 'data', faIcon: 'fa-solid fa-certificate', description: 'Compact semantic status label in 6 glass tones' },
  { name: 'Alert', tag: '<Alert />', category: 'data', faIcon: 'fa-solid fa-bullhorn', description: 'Inline callout banner (Default, Success, Warning, Error)' },
  { name: 'Progress', tag: '<Progress />', category: 'data', faIcon: 'fa-solid fa-bars-progress', description: 'Animated completion bar with accent gradient' },
  { name: 'Skeleton', tag: '<Skeleton />', category: 'data', faIcon: 'fa-solid fa-wave-square', description: 'Translucent shimmer placeholder for async loading' },
  { name: 'Avatar', tag: '<Avatar />', category: 'data', faIcon: 'fa-regular fa-user-circle', description: 'Circular operator identity badge with fallback initials' },
  { name: 'Calendar', tag: '<Calendar />', category: 'data', faIcon: 'fa-regular fa-calendar', description: 'Interactive monthly date grid with range selection' },
  { name: 'Chart', tag: '<Chart />', category: 'data', faIcon: 'fa-solid fa-chart-area', description: 'Recharts area/bar composition with floating glass tooltip' },

  // 6. Layout & Disclosure (8)
  { name: 'Accordion', tag: '<Accordion />', category: 'layout', faIcon: 'fa-solid fa-list-ul', description: 'Vertically stacked collapsible disclosure sections' },
  { name: 'Collapsible', tag: '<Collapsible />', category: 'layout', faIcon: 'fa-solid fa-down-left-and-up-right-to-center', description: 'Expandable/collapsible container for progressive disclosure' },
  { name: 'Separator', tag: '<Separator />', category: 'layout', faIcon: 'fa-solid fa-minus', description: 'Hairline specular divider between glass groups' },
  { name: 'Scroll Area', tag: '<ScrollArea />', category: 'layout', faIcon: 'fa-solid fa-arrows-up-down', description: 'Custom-styled scrollable glass viewport container' },
  { name: 'Resizable', tag: '<Resizable />', category: 'layout', faIcon: 'fa-solid fa-grip-lines-vertical', description: 'Interactive draggable split-pane workspace layout' },
  { name: 'Aspect Ratio', tag: '<AspectRatio />', category: 'layout', faIcon: 'fa-solid fa-expand', description: 'Proportional media frame container (16:9 / 4:3)' },
  { name: 'Carousel', tag: '<Carousel />', category: 'layout', faIcon: 'fa-solid fa-images', description: 'Interactive slide deck with previous/next glass controls' },
  { name: 'Direction / Typography', tag: '<Typography />', category: 'layout', faIcon: 'fa-solid fa-font', description: 'Plus Jakarta Sans & JetBrains Mono tabular scale' },
];

const FA_ICON_SHOWCASE = [
  { icon: 'fa-solid fa-layer-group', name: 'fa-layer-group', category: 'Core' },
  { icon: 'fa-solid fa-wand-magic-sparkles', name: 'fa-wand-magic-sparkles', category: 'Core' },
  { icon: 'fa-solid fa-bolt', name: 'fa-bolt', category: 'Core' },
  { icon: 'fa-solid fa-shield-halved', name: 'fa-shield-halved', category: 'Security' },
  { icon: 'fa-solid fa-fingerprint', name: 'fa-fingerprint', category: 'Security' },
  { icon: 'fa-solid fa-key', name: 'fa-key', category: 'Security' },
  { icon: 'fa-solid fa-chart-line', name: 'fa-chart-line', category: 'Analytics' },
  { icon: 'fa-solid fa-chart-pie', name: 'fa-chart-pie', category: 'Analytics' },
  { icon: 'fa-solid fa-bag-shopping', name: 'fa-bag-shopping', category: 'Commerce' },
  { icon: 'fa-solid fa-boxes-stacked', name: 'fa-boxes-stacked', category: 'Commerce' },
  { icon: 'fa-solid fa-credit-card', name: 'fa-credit-card', category: 'Commerce' },
  { icon: 'fa-solid fa-sliders', name: 'fa-sliders', category: 'System' },
  { icon: 'fa-solid fa-terminal', name: 'fa-terminal', category: 'Developer' },
  { icon: 'fa-solid fa-code-branch', name: 'fa-code-branch', category: 'Developer' },
  { icon: 'fa-solid fa-microchip', name: 'fa-microchip', category: 'Developer' },
  { icon: 'fa-brands fa-apple', name: 'fa-apple', category: 'Brands' },
  { icon: 'fa-brands fa-google', name: 'fa-google', category: 'Brands' },
  { icon: 'fa-brands fa-github', name: 'fa-github', category: 'Brands' },
  { icon: 'fa-brands fa-x-twitter', name: 'fa-x-twitter', category: 'Brands' },
  { icon: 'fa-brands fa-facebook', name: 'fa-facebook', category: 'Brands' },
  { icon: 'fa-brands fa-stripe', name: 'fa-stripe', category: 'Brands' },
  { icon: 'fa-brands fa-shopify', name: 'fa-shopify', category: 'Brands' },
  { icon: 'fa-brands fa-slack', name: 'fa-slack', category: 'Brands' },
  { icon: 'fa-brands fa-docker', name: 'fa-docker', category: 'Brands' },
];

export const DevelopmentShowcaseView: React.FC = () => {
  const { mode, toggleMode, accent, setAccent, highRefraction, setHighRefraction } = useTheme();
  const { addToast } = useToast();

  // Filter Category for Component Library
  const [categoryFilter, setCategoryFilter] = useState<
    'all' | 'buttons' | 'forms' | 'navigation' | 'data' | 'overlays' | 'catalog' | 'icons'
  >('all');

  // Button System Interactive States
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);
  const [segmentedPeriod, setSegmentedPeriod] = useState<'realtime' | '24h' | '7d' | '30d'>('24h');
  const [viewPosture, setViewPosture] = useState<'spatial' | 'grid' | 'table'>('spatial');
  const [splitMenuOpen, setSplitMenuOpen] = useState(false);
  const [toggleBold, setToggleBold] = useState(true);
  const [toggleItalic, setToggleItalic] = useState(false);
  const [toggleUnderline, setToggleUnderline] = useState(false);
  const [toggleCode, setToggleCode] = useState(true);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');

  // Forms & Inputs States
  const [switchA, setSwitchA] = useState(true);
  const [switchB, setSwitchB] = useState(true);
  const [checkA, setCheckA] = useState(true);
  const [checkB, setCheckB] = useState(false);
  const [sliderVal, setSliderVal] = useState(76);
  const [gpuNodes] = useState(68);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card' | 'wire'>('apple');
  const [radioPlan, setRadioPlan] = useState('enterprise');
  const [comboboxOpen, setComboboxOpen] = useState(false);
  const [comboboxValue, setComboboxValue] = useState('us-west-sfo');
  const [comboboxQuery, setComboboxQuery] = useState('');
  const [otpDigits, setOtpDigits] = useState(['4', '8', '2', '9', '1', '0']);

  // Navigation & Layout States
  const [activeMenuBar, setActiveMenuBar] = useState<string | null>(null);
  const [activePage, setActivePage] = useState(2);
  const [selectedDay, setSelectedDay] = useState(18);
  const [commandSearch, setCommandSearch] = useState('');
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [resizableSplit, setResizableSplit] = useState(55);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Overlays States
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [hoverCardOpen, setHoverCardOpen] = useState(false);

  // Catalog & Icon Search
  const [catalogSearch, setCatalogSearch] = useState('');
  const [iconQuery, setIconQuery] = useState('');

  const showSection = (
    sec: 'buttons' | 'forms' | 'navigation' | 'data' | 'overlays' | 'catalog' | 'icons'
  ) => categoryFilter === 'all' || categoryFilter === sec;

  const filteredCatalog = SHADCN_54_CATALOG.filter(
    (item) =>
      !catalogSearch.trim() ||
      item.name.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.tag.toLowerCase().includes(catalogSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(catalogSearch.toLowerCase())
  );

  const filteredIcons = FA_ICON_SHOWCASE.filter(
    (item) =>
      !iconQuery.trim() ||
      item.name.toLowerCase().includes(iconQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(iconQuery.toLowerCase())
  );

  const REGIONS = [
    { value: 'us-west-sfo', label: 'US-West (San Francisco · Primary)' },
    { value: 'eu-central-fra', label: 'EU-Central (Frankfurt · GDPR)' },
    { value: 'ap-southeast-sin', label: 'AP-Southeast (Singapore · Edge)' },
    { value: 'ap-northeast-tyo', label: 'AP-Northeast (Tokyo · Low Latency)' },
  ];

  const CAROUSEL_SLIDES = [
    {
      title: 'Optical Specular Layering',
      metric: '28px Blur · 200% Saturation',
      desc: 'Dynamic background mesh refracts through 4 distinct elevation tiers.',
      icon: 'fa-solid fa-wand-magic-sparkles',
    },
    {
      title: 'Zero-Jitter Tabular Telemetry',
      metric: '99.998% SLA Precision',
      desc: 'JetBrains Mono & Plus Jakarta Sans with strict tabular-nums alignment.',
      icon: 'fa-solid fa-chart-line',
    },
    {
      title: 'Hardware WebAuthn Passkeys',
      metric: 'FIDO2 / Touch ID Ready',
      desc: 'End-to-end cryptographic session verification across all admin seats.',
      icon: 'fa-solid fa-fingerprint',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Architecture Banner & Filter Bar */}
      <Card glassVariant="secondary">
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-[var(--accent-primary)] font-semibold">
                <FaIcon icon="fa-solid fa-cubes" />
                <span>
                  Complete 54/54 shadcn/ui Catalog × Apple Liquid Glass · Font Awesome 6
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
                Unified Liquid Glass Design System & Full shadcn/ui Component Registry
              </h2>
              <p className="text-xs text-[var(--text-secondary)] max-w-3xl">
                Includes the complete 9-variant Button System (`Button`, `ButtonGroup`, `Toggle`,
                `ToggleGroup`, `SplitButton`, `Kbd`, OAuth Pills) and all 54 official shadcn/ui
                components engineered with macOS Sonoma glass refraction.
              </p>
            </div>

            {/* Live Theme & Accent Inspector Bar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <Button variant="secondary" size="sm" onClick={toggleMode}>
                <FaIcon icon={mode === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
                <span>{mode === 'dark' ? 'Light Glass' : 'Dark Glass'}</span>
              </Button>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-interactive">
                {ACCENT_SWATCHES.map((sw) => (
                  <button
                    key={sw.id}
                    type="button"
                    onClick={() => setAccent(sw.id)}
                    aria-label={sw.id}
                    className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                      accent === sw.id ? 'scale-125 ring-2 ring-[var(--text-primary)]' : 'opacity-75'
                    }`}
                    style={{ backgroundColor: mode === 'dark' ? sw.darkHex : sw.hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Category Segmented Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(
                [
                  { id: 'all', label: 'All 54 Components', icon: 'fa-solid fa-layer-group' },
                  { id: 'buttons', label: 'Button System (9 Variants)', icon: 'fa-solid fa-hand-pointer' },
                  { id: 'forms', label: 'Forms, Select & Combobox', icon: 'fa-solid fa-sliders' },
                  { id: 'navigation', label: 'Menus, Breadcrumb & Pager', icon: 'fa-regular fa-compass' },
                  { id: 'data', label: 'Cards, Resizable & Carousel', icon: 'fa-solid fa-table' },
                  { id: 'overlays', label: 'Dialog, Sheet, Drawer & Popover', icon: 'fa-solid fa-window-restore' },
                  { id: 'catalog', label: '54/54 Registry Matrix', icon: 'fa-solid fa-list-check' },
                  { id: 'icons', label: 'Font Awesome 6', icon: 'fa-solid fa-icons' },
                ] as const
              ).map((tab) => (
                <Button
                  key={tab.id}
                  variant={categoryFilter === tab.id ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setCategoryFilter(tab.id)}
                >
                  <FaIcon icon={tab.icon} />
                  <span>{tab.label}</span>
                </Button>
              ))}
            </div>

            <Badge variant="default">54 / 54 shadcn Primitives Ready</Badge>
          </div>
        </CardContent>
      </Card>

      {/* =====================================================================
       * SECTION 1: COMPLETE LIQUID GLASS BUTTON SYSTEM
       * =================================================================== */}
      {showSection('buttons') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card 1A: All 9 Button Variants &All 8 Sizes */}
            <Card interactiveHover>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <FaIcon
                      icon="fa-solid fa-wand-magic-sparkles"
                      className="mr-2 text-[var(--accent-primary)]"
                    />
                    {'Complete Button Architecture (<Button />)'}
                  </CardTitle>
                  <Badge variant="default">9 Variants · 8 Sizes</Badge>
                </div>
                <CardDescription>
                  Every button features specular top highlights, active press micro-scaling, keyboard
                  shortcut badges, and async loading states.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* 9 Variants */}
                <div>
                  <Label>9 Variants (Default · Secondary · Outline · Ghost · Glass-Pill · Success · Warning · Destructive · Link)</Label>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button
                      variant="default"
                      leftFaIcon="fa-solid fa-bolt"
                      onClick={() => addToast('Default Accent Button', 'variant="default"')}
                    >
                      Accent Primary
                    </Button>
                    <Button
                      variant="secondary"
                      leftFaIcon="fa-solid fa-layer-group"
                      onClick={() => addToast('Secondary Glass Button', 'variant="secondary"', 'info')}
                    >
                      Secondary Glass
                    </Button>
                    <Button
                      variant="outline"
                      leftFaIcon="fa-solid fa-border-all"
                      onClick={() => addToast('Outline Specular Button', 'variant="outline"')}
                    >
                      Outline Rim
                    </Button>
                    <Button
                      variant="ghost"
                      leftFaIcon="fa-regular fa-compass"
                      onClick={() => addToast('Ghost Button', 'variant="ghost"')}
                    >
                      Ghost Hover
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-solid fa-wand-magic-sparkles"
                      onClick={() => addToast('visionOS Capsule Pill', 'variant="glass-pill"')}
                    >
                      visionOS Pill
                    </Button>
                    <Button
                      variant="success"
                      leftFaIcon="fa-solid fa-circle-check"
                      onClick={() => addToast('Settlement Approved', 'variant="success"')}
                    >
                      Success
                    </Button>
                    <Button
                      variant="warning"
                      leftFaIcon="fa-solid fa-triangle-exclamation"
                      onClick={() => addToast('Caution Triggered', 'variant="warning"', 'warning')}
                    >
                      Warning
                    </Button>
                    <Button
                      variant="destructive"
                      leftFaIcon="fa-solid fa-trash-can"
                      onClick={() => addToast('Destructive Action', 'variant="destructive"', 'warning')}
                    >
                      Destructive
                    </Button>
                    <Button variant="link" rightFaIcon="fa-solid fa-arrow-up-right-from-square">
                      Documentation Link
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* 8 Sizes */}
                <div>
                  <Label>8 Scale Sizes (`xs` · `sm` · `default` · `lg` · `xl` · `icon-sm` · `icon` · `icon-lg`)</Label>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <Button size="xs" variant="secondary" leftFaIcon="fa-solid fa-microchip">
                      Extra Small (xs)
                    </Button>
                    <Button size="sm" variant="secondary" leftFaIcon="fa-solid fa-terminal">
                      Small (sm)
                    </Button>
                    <Button size="default" variant="default" leftFaIcon="fa-solid fa-rocket">
                      Default
                    </Button>
                    <Button size="lg" variant="default" leftFaIcon="fa-solid fa-layer-group">
                      Large (lg)
                    </Button>
                    <Button size="xl" variant="glass-pill" leftFaIcon="fa-brands fa-apple">
                      Extra Large (xl)
                    </Button>
                    <Button size="icon-sm" variant="secondary" aria-label="Small icon">
                      <FaIcon icon="fa-solid fa-plus" className="text-[10px]" />
                    </Button>
                    <Button size="icon" variant="secondary" aria-label="Default icon">
                      <FaIcon icon="fa-solid fa-gear" />
                    </Button>
                    <Button size="icon-lg" variant="default" aria-label="Large icon">
                      <FaIcon icon="fa-solid fa-bell" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Interactive States: Loading, Disabled, Kbd Shortcuts */}
                <div>
                  <Label>Interactive States (Loading Spinner · Keyboard Shortcuts · Disabled)</Label>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <Button
                      variant="default"
                      loading={isSimulatingLoad}
                      leftFaIcon="fa-solid fa-cloud-arrow-up"
                      onClick={() => {
                        setIsSimulatingLoad(true);
                        setTimeout(() => {
                          setIsSimulatingLoad(false);
                          addToast('Deployment Complete', 'Async loading state resolved.');
                        }, 1100);
                      }}
                    >
                      {isSimulatingLoad ? 'Deploying Edge...' : 'Click to Test Loading'}
                    </Button>

                    <Button
                      variant="secondary"
                      leftFaIcon="fa-solid fa-magnifying-glass"
                      kbd="⌘K"
                      onClick={() => addToast('Spotlight Shortcut', 'Triggered via kbd="⌘K" prop.')}
                    >
                      Command Palette
                    </Button>

                    <Button
                      variant="secondary"
                      leftFaIcon="fa-solid fa-bolt"
                      kbd="⇧⌘P"
                      onClick={() => addToast('Quick Deploy', 'Triggered via kbd="⇧⌘P".')}
                    >
                      Quick Action
                    </Button>

                    <Button variant="secondary" disabled leftFaIcon="fa-solid fa-lock">
                      Disabled State
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 1B: ButtonGroup, SplitButton, Toggle, ToggleGroup & OAuth Buttons */}
            <Card interactiveHover>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <FaIcon
                      icon="fa-solid fa-object-group"
                      className="mr-2 text-[var(--accent-primary)]"
                    />
                    ButtonGroup, SplitButton, ToggleGroup & OAuth
                  </CardTitle>
                  <Badge variant="secondary">Composable Groups</Badge>
                </div>
                <CardDescription>
                  Segmented button groups, split dropdown buttons, formatting toggles, and brand OAuth
                  primitives.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Segmented ButtonGroup & SplitButton */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Label>{'Segmented Button Group (<ButtonGroup />)'}</Label>
                    <ButtonGroup>
                      {(['realtime', '24h', '7d', '30d'] as const).map((p) => (
                        <Button
                          key={p}
                          size="xs"
                          variant={segmentedPeriod === p ? 'default' : 'ghost'}
                          onClick={() => setSegmentedPeriod(p)}
                        >
                          {p.toUpperCase()}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </div>

                  {/* Split Action Button */}
                  <div className="relative">
                    <Label>{'Split Action Button (<SplitButton />)'}</Label>
                    <div className="inline-flex items-center rounded-full overflow-hidden shadow-xs">
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-r-none border-r border-white/25"
                        leftFaIcon="fa-solid fa-rocket"
                        onClick={() => addToast('Production Release Dispatched', 'Main split action.')}
                      >
                        Deploy Cluster
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-l-none px-2.5"
                        aria-label="More deploy targets"
                        onClick={() => setSplitMenuOpen((o) => !o)}
                      >
                        <FaIcon icon="fa-solid fa-chevron-down" className="text-[10px]" />
                      </Button>
                    </div>

                    {splitMenuOpen && (
                      <div className="glass-floating absolute right-0 mt-2 w-48 rounded-2xl p-1.5 z-30 space-y-1">
                        {[
                          { label: 'Deploy Canary (10%)', icon: 'fa-solid fa-flask' },
                          { label: 'Promote Staging', icon: 'fa-solid fa-code-branch' },
                          { label: 'Rollback Snapshot', icon: 'fa-solid fa-rotate-left' },
                        ].map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => {
                              setSplitMenuOpen(false);
                              addToast(item.label);
                            }}
                            className="w-full text-left px-3 py-1.5 rounded-full text-xs text-[var(--text-primary)] hover:bg-[var(--accent-soft)] flex items-center gap-2 cursor-pointer"
                          >
                            <FaIcon icon={item.icon} className="text-[var(--accent-primary)]" />
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Toggle & ToggleGroup Toolbar */}
                <div>
                  <Label>{'Toggle & ToggleGroup Formatting Bar (<Toggle /> · <ToggleGroup />)'}</Label>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <div className="liquid-pill-group">
                      <Toggle
                        size="sm"
                        pressed={toggleBold}
                        onPressedChange={setToggleBold}
                        ariaLabel="Bold"
                      >
                        <FaIcon icon="fa-solid fa-bold" />
                      </Toggle>
                      <Toggle
                        size="sm"
                        pressed={toggleItalic}
                        onPressedChange={setToggleItalic}
                        ariaLabel="Italic"
                      >
                        <FaIcon icon="fa-solid fa-italic" />
                      </Toggle>
                      <Toggle
                        size="sm"
                        pressed={toggleUnderline}
                        onPressedChange={setToggleUnderline}
                        ariaLabel="Underline"
                      >
                        <FaIcon icon="fa-solid fa-underline" />
                      </Toggle>
                      <Toggle
                        size="sm"
                        pressed={toggleCode}
                        onPressedChange={setToggleCode}
                        ariaLabel="Code"
                      >
                        <FaIcon icon="fa-solid fa-code" />
                      </Toggle>
                    </div>

                    <div className="liquid-pill-group">
                      {(
                        [
                          { id: 'left', icon: 'fa-solid fa-align-left' },
                          { id: 'center', icon: 'fa-solid fa-align-center' },
                          { id: 'right', icon: 'fa-solid fa-align-right' },
                        ] as const
                      ).map((al) => (
                        <Toggle
                          key={al.id}
                          size="sm"
                          pressed={textAlign === al.id}
                          onPressedChange={() => setTextAlign(al.id)}
                          ariaLabel={`Align ${al.id}`}
                        >
                          <FaIcon icon={al.icon} />
                        </Toggle>
                      ))}
                    </div>

                    <div className="liquid-pill-group">
                      {(
                        [
                          { id: 'spatial', icon: 'fa-solid fa-cubes', label: '3D' },
                          { id: 'grid', icon: 'fa-solid fa-border-all', label: 'Grid' },
                          { id: 'table', icon: 'fa-solid fa-list', label: 'List' },
                        ] as const
                      ).map((vp) => (
                        <Toggle
                          key={vp.id}
                          size="sm"
                          pressed={viewPosture === vp.id}
                          onPressedChange={() => setViewPosture(vp.id)}
                        >
                          <FaIcon icon={vp.icon} />
                          <span>{vp.label}</span>
                        </Toggle>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Brand & OAuth Button Suite */}
                <div>
                  <Label>Social, OAuth & Passkey Chromatic Caustic Liquid Glass Buttons</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-apple"
                      onClick={() => addToast('Apple ID OAuth', 'Signed in with Apple.')}
                    >
                      Apple ID
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-google"
                      onClick={() => addToast('Google Workspace OAuth', 'Signed in with Google.')}
                    >
                      Google
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-github"
                      onClick={() => addToast('GitHub OAuth', 'Connected repository scope.')}
                    >
                      GitHub
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-x-twitter"
                      onClick={() => addToast('X.com OAuth', 'Verified handle.')}
                    >
                      X.com
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-facebook"
                      onClick={() => addToast('Facebook OAuth', 'Connected Meta Business.')}
                    >
                      Facebook
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-discord"
                      onClick={() => addToast('Discord OAuth', 'Webhook linked.')}
                    >
                      Discord
                    </Button>
                    <Button
                      variant="glass-pill"
                      leftFaIcon="fa-brands fa-stripe"
                      onClick={() => addToast('Stripe Connect', 'Merchant ledger active.')}
                    >
                      Stripe
                    </Button>
                    <Button
                      variant="default"
                      leftFaIcon="fa-solid fa-fingerprint"
                      onClick={() => addToast('Hardware Passkey', 'Biometric Touch ID verified.')}
                    >
                      Passkey
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* =====================================================================
       * SECTION 2: FORMS, SELECT, COMBOBOX, RADIOGROUP, INPUT-OTP & SLIDERS
       * =================================================================== */}
      {showSection('forms') && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 2A: Input, Combobox, Select, InputOTP & Textarea */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-keyboard" className="mr-2 text-[var(--accent-primary)]" />
                Input, Combobox, Select & InputOTP
              </CardTitle>
              <CardDescription>
                Searchable Combobox popover, native glass Select, and 6-digit OTP inputs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dev-endpoint">{'Input with Prefix Icon (<Input />)'}</Label>
                <Input
                  id="dev-endpoint"
                  leftFaIcon="fa-solid fa-globe"
                  defaultValue="https://api.auraos.io/v2/webhooks"
                  className="font-mono-tabular"
                />
              </div>

              {/* Interactive Combobox */}
              <div className="relative">
                <Label>{'Searchable Combobox (<Combobox />)'}</Label>
                <button
                  type="button"
                  onClick={() => setComboboxOpen((o) => !o)}
                  className="w-full h-9 rounded-xl glass-interactive px-3 flex items-center justify-between text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <span className="flex items-center gap-2 truncate">
                    <FaIcon icon="fa-solid fa-server" className="text-[var(--accent-primary)]" />
                    <span className="truncate">
                      {REGIONS.find((r) => r.value === comboboxValue)?.label}
                    </span>
                  </span>
                  <FaIcon icon="fa-solid fa-sort" className="text-[10px] text-[var(--text-muted)]" />
                </button>

                {comboboxOpen && (
                  <div className="glass-floating absolute inset-x-0 mt-1.5 rounded-2xl p-2 z-30 space-y-1.5">
                    <Input
                      value={comboboxQuery}
                      onChange={(e) => setComboboxQuery(e.target.value)}
                      leftFaIcon="fa-solid fa-magnifying-glass"
                      placeholder="Filter region..."
                    />
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {REGIONS.filter(
                        (r) =>
                          !comboboxQuery.trim() ||
                          r.label.toLowerCase().includes(comboboxQuery.toLowerCase())
                      ).map((r) => (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => {
                            setComboboxValue(r.value);
                            setComboboxOpen(false);
                            addToast('Region Selected', r.label, 'info');
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-xl text-xs hover:bg-[var(--accent-soft)] flex items-center justify-between cursor-pointer"
                        >
                          <span className="truncate">{r.label}</span>
                          {comboboxValue === r.value && (
                            <FaIcon
                              icon="fa-solid fa-check"
                              className="text-[10px] text-[var(--accent-primary)]"
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label>{'6-Digit Hardware Passkey OTP (<InputOTP />)'}</Label>
                <div className="grid grid-cols-6 gap-2">
                  {otpDigits.map((digit, idx) => (
                    <Input
                      key={idx}
                      value={digit}
                      maxLength={1}
                      onChange={(e) => {
                        const val = e.target.value.slice(-1);
                        setOtpDigits((prev) => prev.map((d, i) => (i === idx ? val : d)));
                      }}
                      className="text-center font-mono-tabular font-bold text-sm px-0!"
                    />
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="dev-notes">{'Deployment Release Notes (<Textarea />)'}</Label>
                <Textarea
                  id="dev-notes"
                  defaultValue="Enable multi-region edge caching and zero-downtime Stripe settlement webhooks."
                />
              </div>
            </CardContent>
          </Card>

          {/* Card 2B: RadioGroup, Switch, Checkbox, Slider & Progress */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-sliders" className="mr-2 text-[var(--accent-primary)]" />
                RadioGroup, Switch, Slider & Progress
              </CardTitle>
              <CardDescription>
                Single-choice RadioGroup cards alongside tactile switches and range sliders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>{'Compute Tier (<RadioGroup />)'}</Label>
                <RadioGroup
                  value={radioPlan}
                  onValueChange={setRadioPlan}
                  options={[
                    {
                      value: 'enterprise',
                      label: 'Dedicated M4 Ultra Cluster',
                      description: '128GB unified memory · Zero-latency settlement',
                    },
                    {
                      value: 'serverless',
                      label: 'Elastic Edge Auto-Scale',
                      description: 'Scale-to-zero workers across 38 global PoPs',
                    },
                  ]}
                />
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    Optical Refraction Depth (28px)
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Live global `backdrop-filter` intensity
                  </p>
                </div>
                <Switch checked={highRefraction} onCheckedChange={setHighRefraction} />
              </div>

              <div className="flex items-center justify-between py-1">
                <div>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    Hardware Passkey Enforcement
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Require WebAuthn for admin actions
                  </p>
                </div>
                <Switch checked={switchA} onCheckedChange={setSwitchA} />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <Label className="mb-0">{'Edge Cache Allocation (<Slider />)'}</Label>
                  <span className="font-mono-tabular font-bold text-[var(--accent-primary)]">
                    {sliderVal}%
                  </span>
                </div>
                <Slider value={sliderVal} onValueChange={setSliderVal} />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <Label className="mb-0">{'Settlement Pipeline Quota (<Progress />)'}</Label>
                  <span className="font-mono-tabular text-[var(--text-secondary)]">
                    {gpuNodes} / 100 TB
                  </span>
                </div>
                <Progress value={gpuNodes} />
              </div>

              <div className="pt-1 flex items-center gap-4">
                <Checkbox checked={checkA} onCheckedChange={setCheckA} label="TLS 1.3 Strict" />
                <Checkbox checked={checkB} onCheckedChange={setCheckB} label="Audit Webhooks" />
              </div>
            </CardContent>
          </Card>

          {/* Card 2C: Classic shadcn Payment Method Form */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-credit-card" className="mr-2 text-[var(--accent-primary)]" />
                {'shadcn Form & Payment Card (<Form />)'}
              </CardTitle>
              <CardDescription>
                Classic shadcn/ui payment instrument form restyled in translucent Liquid Glass.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'apple', label: 'Apple Pay', icon: 'fa-brands fa-apple' },
                    { id: 'card', label: 'Card', icon: 'fa-regular fa-credit-card' },
                    { id: 'wire', label: 'Wire ACH', icon: 'fa-solid fa-building-columns' },
                  ] as const
                ).map((pm) => {
                  const active = paymentMethod === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id)}
                      className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        active
                          ? 'bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--text-primary)]'
                          : 'glass-interactive text-[var(--text-secondary)]'
                      }`}
                    >
                      <FaIcon icon={pm.icon} className="text-base" />
                      <span>{pm.label}</span>
                    </button>
                  );
                })}
              </div>

              <div>
                <Label>Cardholder / Entity Name</Label>
                <Input defaultValue="Aura Commerce Global Inc." leftFaIcon="fa-regular fa-building" />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Label>Account / Card Number</Label>
                  <Input defaultValue="4829 •••• •••• 9012" className="font-mono-tabular" />
                </div>
                <div>
                  <Label>CVC</Label>
                  <Input defaultValue="842" className="font-mono-tabular" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                leftFaIcon="fa-solid fa-lock"
                onClick={() =>
                  addToast(
                    'Payment Instrument Saved',
                    `Primary settlement set to ${paymentMethod.toUpperCase()}.`
                  )
                }
              >
                Authorize Instrument
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* =====================================================================
       * SECTION 3: NAVIGATION, MENUBAR, BREADCRUMB, DROPDOWN, CONTEXT & PAGER
       * =================================================================== */}
      {showSection('navigation') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 3A: Menubar, Breadcrumb & Pagination */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-window-maximize" className="mr-2 text-[var(--accent-primary)]" />
                Menubar, Breadcrumb & Pagination
              </CardTitle>
              <CardDescription>
                macOS desktop Menubar, hierarchical Breadcrumb trail, and numbered Pagination bar.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Menubar */}
              <div className="relative">
                <Label>{'macOS Application Menubar (<Menubar />)'}</Label>
                <div className="p-1.5 rounded-xl glass-interactive flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {['File', 'Edit', 'View', 'Workspace', 'Security'].map((menu) => (
                      <button
                        key={menu}
                        type="button"
                        onClick={() =>
                          setActiveMenuBar(activeMenuBar === menu ? null : menu)
                        }
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          activeMenuBar === menu
                            ? 'accent-btn'
                            : 'text-[var(--text-primary)] hover:bg-[var(--glass-subtle-bg)]'
                        }`}
                      >
                        {menu}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 pr-2 text-[11px] text-[var(--text-muted)] font-mono-tabular">
                    <Kbd>⌘K</Kbd>
                    <Kbd>⇧⌘N</Kbd>
                  </div>
                </div>

                {activeMenuBar && (
                  <div className="glass-floating mt-1.5 w-60 rounded-2xl p-1.5 space-y-1 animate-in fade-in duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuBar(null);
                        addToast(`${activeMenuBar} → New Window`);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl text-xs text-[var(--text-primary)] hover:bg-[var(--accent-soft)] flex items-center justify-between cursor-pointer"
                    >
                      <span>New {activeMenuBar} Snapshot</span>
                      <Kbd>⌘N</Kbd>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMenuBar(null);
                        addToast(`${activeMenuBar} → Export Telemetry`);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl text-xs text-[var(--text-primary)] hover:bg-[var(--accent-soft)] flex items-center justify-between cursor-pointer"
                    >
                      <span>Export JSON Schema</span>
                      <Kbd>⇧⌘E</Kbd>
                    </button>
                  </div>
                )}
              </div>

              <Separator />

              {/* Breadcrumb */}
              <div>
                <Label>{'Breadcrumb Navigation (<Breadcrumb />)'}</Label>
                <nav
                  aria-label="Breadcrumb"
                  className="px-3.5 py-2 rounded-xl glass-interactive flex flex-wrap items-center gap-2 text-xs"
                >
                  <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer flex items-center gap-1.5">
                    <FaIcon icon="fa-solid fa-house" className="text-[10px]" />
                    <span>AuraOS</span>
                  </span>
                  <FaIcon icon="fa-solid fa-chevron-right" className="text-[9px] text-[var(--text-muted)]" />
                  <span className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer">
                    Design System
                  </span>
                  <FaIcon icon="fa-solid fa-chevron-right" className="text-[9px] text-[var(--text-muted)]" />
                  <span className="font-semibold text-[var(--accent-primary)]">
                    shadcn Liquid Glass
                  </span>
                </nav>
              </div>

              <Separator />

              {/* Pagination */}
              <div>
                <Label>{'Pagination Controls (<Pagination />)'}</Label>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    leftFaIcon="fa-solid fa-chevron-left"
                    onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((pg) => (
                      <Button
                        key={pg}
                        size="icon-sm"
                        variant={activePage === pg ? 'default' : 'secondary'}
                        onClick={() => setActivePage(pg)}
                        className="font-mono-tabular"
                      >
                        {pg}
                      </Button>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    rightFaIcon="fa-solid fa-chevron-right"
                    onClick={() => setActivePage((p) => Math.min(5, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3B: DropdownMenu, ContextMenu & NavigationMenu */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-bars-staggered" className="mr-2 text-[var(--accent-primary)]" />
                DropdownMenu, ContextMenu & Badges
              </CardTitle>
              <CardDescription>
                Interactive menu surfaces with keyboard shortcuts and semantic status badges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Inline DropdownMenu Preview */}
                <div className="p-3 rounded-2xl glass-interactive space-y-1">
                  <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    {'<DropdownMenu />'}
                  </p>
                  {[
                    { icon: 'fa-regular fa-user', label: 'Operator Profile', kbd: '⇧⌘P' },
                    { icon: 'fa-solid fa-credit-card', label: 'Billing & Quotas', kbd: '⌘B' },
                    { icon: 'fa-solid fa-key', label: 'API Signing Keys', kbd: '⌘K' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => addToast(item.label)}
                      className="w-full px-2.5 py-1.5 rounded-xl text-xs text-[var(--text-primary)] hover:bg-[var(--accent-soft)] flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <FaIcon icon={item.icon} className="text-[var(--accent-primary)]" />
                        <span>{item.label}</span>
                      </span>
                      <Kbd>{item.kbd}</Kbd>
                    </button>
                  ))}
                </div>

                {/* ContextMenu Zone */}
                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    addToast('ContextMenu Triggered', 'Right-click action inspected.', 'info');
                  }}
                  onClick={() =>
                    addToast('ContextMenu Surface', 'Right-click or tap to inspect node.', 'info')
                  }
                  className="p-4 rounded-2xl border border-dashed border-[var(--glass-border-strong)] bg-[var(--glass-subtle-bg)] flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-[var(--accent-primary)] transition-colors"
                >
                  <FaIcon
                    icon="fa-solid fa-arrow-pointer"
                    className="text-lg text-[var(--accent-primary)]"
                  />
                  <p className="text-xs font-semibold text-[var(--text-primary)]">
                    {'Right-Click Zone (<ContextMenu />)'}
                  </p>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    Right-click or tap here to test contextual menu dispatch
                  </p>
                </div>
              </div>

              <Separator />

              {/* Badge Variants */}
              <div>
                <Label>{'Semantic Status Badges (<Badge />)'}</Label>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge variant="default">
                    <FaIcon icon="fa-solid fa-bolt" className="text-[9px]" />
                    Accent Default
                  </Badge>
                  <Badge variant="secondary">Secondary Glass</Badge>
                  <Badge variant="outline">Specular Outline</Badge>
                  <Badge variant="success">
                    <FaIcon icon="fa-solid fa-circle-check" className="text-[9px]" />
                    99.98% Healthy
                  </Badge>
                  <Badge variant="warning">Low Stock SKU</Badge>
                  <Badge variant="destructive">Revoked Token</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* =====================================================================
       * SECTION 4: DATA & LAYOUT (TABS, ACCORDION, RESIZABLE, CAROUSEL, CALENDAR)
       * =================================================================== */}
      {showSection('data') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tabs, Accordion & Collapsible */}
            <Card interactiveHover>
              <CardHeader>
                <CardTitle>
                  <FaIcon icon="fa-solid fa-folder-tree" className="mr-2 text-[var(--accent-primary)]" />
                  {'Tabs, Accordion & Collapsible'}
                </CardTitle>
                <CardDescription>
                  Segmented glass tabs paired with Accordion & Collapsible disclosures.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="preview">
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="preview">
                      <FaIcon icon="fa-solid fa-eye" />
                      <span>Accordion</span>
                    </TabsTrigger>
                    <TabsTrigger value="collapsible">
                      <FaIcon icon="fa-solid fa-compress" />
                      <span>Collapsible</span>
                    </TabsTrigger>
                    <TabsTrigger value="scroll">
                      <FaIcon icon="fa-solid fa-scroll" />
                      <span>ScrollArea</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="preview" className="space-y-1 pt-2">
                    <AccordionItem
                      title="01. Optical Backdrop Refraction"
                      icon="fa-solid fa-wand-magic-sparkles"
                      defaultOpen
                    >
                      Uses multi-layered `backdrop-filter: blur(24px) saturate(185%)` with specular
                      top inner borders.
                    </AccordionItem>
                    <AccordionItem
                      title="02. 6 Dynamic macOS Sonoma Accents"
                      icon="fa-solid fa-swatchbook"
                    >
                      Switches `--accent-primary`, `--accent-soft`, and ambient mesh orbs in real
                      time.
                    </AccordionItem>
                  </TabsContent>

                  <TabsContent value="collapsible" className="pt-2 space-y-2">
                    <div className="p-3 rounded-xl glass-interactive flex items-center justify-between">
                      <span className="text-xs font-semibold">
                        {'@auraos/glass-primitives (v4.2)'}
                      </span>
                      <Button
                        size="xs"
                        variant="secondary"
                        onClick={() => setCollapsibleOpen((o) => !o)}
                      >
                        <FaIcon
                          icon={
                            collapsibleOpen
                              ? 'fa-solid fa-chevron-up'
                              : 'fa-solid fa-chevron-down'
                          }
                        />
                        <span>{collapsibleOpen ? 'Hide' : 'Expand'}</span>
                      </Button>
                    </div>
                    {collapsibleOpen && (
                      <div className="p-3 rounded-xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)] text-xs font-mono-tabular space-y-1">
                        <div>• @radix-ui/react-slotcompatible</div>
                        <div>• font-awesome/6.5.2 vector icons</div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="scroll" className="pt-2">
                    <div className="h-32 overflow-y-auto rounded-xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)] p-3 space-y-2 text-xs">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1 border-b border-[var(--glass-border)] last:border-0"
                        >
                          <span>Edge Worker Node #{i + 1}</span>
                          <Badge variant="success">0.{i + 2}ms</Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Interactive Resizable Split Pane & Carousel */}
            <Card interactiveHover>
              <CardHeader>
                <CardTitle>
                  <FaIcon icon="fa-solid fa-grip-lines-vertical" className="mr-2 text-[var(--accent-primary)]" />
                  {'Resizable Split & Carousel'}
                </CardTitle>
                <CardDescription>
                  {'Interactive <Resizable /> split pane and <Carousel /> slide deck.'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Resizable Split Demo */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label className="mb-0">{'Resizable Split Pane (<Resizable />)'}</Label>
                    <span className="text-[11px] font-mono-tabular text-[var(--text-muted)]">
                      {resizableSplit}% / {100 - resizableSplit}%
                    </span>
                  </div>
                  <div className="h-24 rounded-2xl border border-[var(--glass-border-strong)] overflow-hidden flex">
                    <div
                      style={{ width: `${resizableSplit}%` }}
                      className="bg-[var(--accent-soft)] flex flex-col items-center justify-center p-2 text-xs font-semibold text-[var(--accent-primary)] transition-all"
                    >
                      <FaIcon icon="fa-solid fa-table-columns" />
                      <span className="mt-1 font-mono-tabular">{resizableSplit}%</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setResizableSplit((s) => (s === 55 ? 35 : s === 35 ? 70 : 55))
                      }
                      title="Click to resize panes"
                      className="w-3 bg-[var(--glass-border-strong)] hover:bg-[var(--accent-primary)] flex items-center justify-center cursor-col-resize transition-colors"
                    >
                      <FaIcon icon="fa-solid fa-grip-lines-vertical" className="text-[9px]" />
                    </button>
                    <div className="flex-1 bg-[var(--glass-subtle-bg)] flex flex-col items-center justify-center p-2 text-xs text-[var(--text-secondary)]">
                      <span>Inspector</span>
                      <span className="font-mono-tabular text-[11px]">
                        {100 - resizableSplit}%
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Interactive Carousel */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label className="mb-0">{'Interactive Slide Deck (<Carousel />)'}</Label>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon-sm"
                        variant="secondary"
                        onClick={() =>
                          setCarouselIndex(
                            (i) => (i - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
                          )
                        }
                      >
                        <FaIcon icon="fa-solid fa-chevron-left" className="text-[10px]" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="secondary"
                        onClick={() =>
                          setCarouselIndex((i) => (i + 1) % CAROUSEL_SLIDES.length)
                        }
                      >
                        <FaIcon icon="fa-solid fa-chevron-right" className="text-[10px]" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl glass-interactive space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <FaIcon
                          icon={CAROUSEL_SLIDES[carouselIndex].icon}
                          className="text-[var(--accent-primary)]"
                        />
                        {CAROUSEL_SLIDES[carouselIndex].title}
                      </span>
                      <Badge variant="default">
                        0{carouselIndex + 1} / 0{CAROUSEL_SLIDES.length}
                      </Badge>
                    </div>
                    <p className="text-[11px] font-mono-tabular text-emerald-500 font-semibold">
                      {CAROUSEL_SLIDES[carouselIndex].metric}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {CAROUSEL_SLIDES[carouselIndex].desc}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Calendar & DatePicker */}
            <Card interactiveHover>
              <CardHeader>
                <CardTitle>
                  <FaIcon icon="fa-regular fa-calendar-check" className="mr-2 text-[var(--accent-primary)]" />
                  {'Calendar & DatePicker (<Calendar />)'}
                </CardTitle>
                <CardDescription>
                  Interactive monthly settlement calendar grid with selectable date cells.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-3 rounded-2xl bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)]">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      October 2026 · Oct {selectedDay}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => setSelectedDay((d) => Math.max(1, d - 1))}
                      >
                        <FaIcon icon="fa-solid fa-chevron-left" className="text-[10px]" />
                      </Button>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => setSelectedDay((d) => Math.min(31, d + 1))}
                      >
                        <FaIcon icon="fa-solid fa-chevron-right" className="text-[10px]" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-[var(--text-muted)] mb-1.5">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                      const active = selectedDay === day;
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            setSelectedDay(day);
                            addToast(`Selected Oct ${day}, 2026`, 'Filtered ledger snapshot.', 'info');
                          }}
                          className={`h-7 rounded-lg text-xs font-mono-tabular transition-all cursor-pointer ${
                            active
                              ? 'accent-btn font-bold'
                              : 'hover:bg-[var(--glass-interactive-bg)] text-[var(--text-primary)]'
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* =====================================================================
       * SECTION 5: OVERLAYS (DIALOG, ALERTDIALOG, SHEET, DRAWER, POPOVER, HOVERCARD, COMMAND, ALERTS)
       * =================================================================== */}
      {showSection('overlays') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Semantic Liquid Glass Alerts & Inline Command */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-bell" className="mr-2 text-[var(--accent-primary)]" />
                {'Alerts & Command Box (<Alert /> · <Command />)'}
              </CardTitle>
              <CardDescription>
                Contextual callouts and keyboard-first Spotlight command list.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Alert variant="default" icon="fa-solid fa-circle-info">
                <AlertTitle>macOS Sonoma Liquid Glass Active</AlertTitle>
                <AlertDescription>
                  All 54 shadcn/ui components inherit real-time optical blur tokens.
                </AlertDescription>
              </Alert>

              <Alert variant="success" icon="fa-solid fa-circle-check">
                <AlertTitle>99.98% Checkout Settlement Verified</AlertTitle>
                <AlertDescription>
                  Apple Pay Express and Stripe webhooks are operating with zero packet loss.
                </AlertDescription>
              </Alert>

              <Alert variant="warning" icon="fa-solid fa-triangle-exclamation">
                <AlertTitle>Low Inventory Threshold Alert</AlertTitle>
                <AlertDescription>
                  2 SKUs in EU-Central warehouse have fallen below reorder point.
                </AlertDescription>
              </Alert>

              {/* Inline Command Box */}
              <div className="rounded-2xl border border-[var(--glass-border-strong)] bg-[var(--glass-subtle-bg)] overflow-hidden mt-2">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[var(--glass-border)]">
                  <FaIcon
                    icon="fa-solid fa-magnifying-glass"
                    className="text-xs text-[var(--text-muted)]"
                  />
                  <input
                    type="text"
                    value={commandSearch}
                    onChange={(e) => setCommandSearch(e.target.value)}
                    placeholder="Filter Spotlight commands..."
                    className="w-full bg-transparent text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                  />
                </div>
                <div className="p-1.5 space-y-1">
                  {[
                    { icon: 'fa-solid fa-plus', label: 'Create New Order', shortcut: '⌘N' },
                    { icon: 'fa-solid fa-file-csv', label: 'Export GMV Ledger CSV', shortcut: '⌘E' },
                    { icon: 'fa-solid fa-shield-halved', label: 'Verify Passkey Policy', shortcut: '⌘P' },
                  ]
                    .filter(
                      (cmd) =>
                        !commandSearch.trim() ||
                        cmd.label.toLowerCase().includes(commandSearch.toLowerCase())
                    )
                    .map((cmd) => (
                      <button
                        key={cmd.label}
                        type="button"
                        onClick={() => addToast(cmd.label, `Executed via ${cmd.shortcut}`)}
                        className="w-full px-3 py-1.5 rounded-xl text-xs text-[var(--text-primary)] hover:bg-[var(--accent-soft)] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <FaIcon icon={cmd.icon} className="text-[var(--accent-primary)]" />
                          <span>{cmd.label}</span>
                        </span>
                        <Kbd>{cmd.shortcut}</Kbd>
                      </button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Overlays: Dialog, AlertDialog, Sheet, Drawer, Popover, HoverCard */}
          <Card interactiveHover>
            <CardHeader>
              <CardTitle>
                <FaIcon icon="fa-solid fa-window-restore" className="mr-2 text-[var(--accent-primary)]" />
                Dialog, AlertDialog, Sheet, Drawer, Popover & HoverCard
              </CardTitle>
              <CardDescription>
                Interactive triggers for all floating Liquid Glass overlay primitives.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>
                  {'Modal & Drawer Triggers (<Dialog /> · <AlertDialog /> · <Sheet /> · <Drawer />)'}
                </Label>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Button
                    variant="default"
                    size="sm"
                    leftFaIcon="fa-regular fa-window-restore"
                    onClick={() => setDialogOpen(true)}
                  >
                    Open Dialog
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    leftFaIcon="fa-solid fa-triangle-exclamation"
                    onClick={() => setAlertDialogOpen(true)}
                  >
                    Open AlertDialog
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    leftFaIcon="fa-solid fa-table-columns"
                    onClick={() => setSheetOpen(true)}
                  >
                    Open Side Sheet
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    leftFaIcon="fa-solid fa-window-minimize"
                    onClick={() => setDrawerOpen(true)}
                  >
                    Open Bottom Drawer
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Popover, HoverCard & Sonner */}
              <div className="flex flex-wrap items-center gap-3 relative">
                <div className="relative">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftFaIcon="fa-regular fa-comment-dots"
                    onClick={() => setPopoverOpen((o) => !o)}
                  >
                    {'Toggle <Popover />'}
                  </Button>
                  {popoverOpen && (
                    <div className="glass-floating absolute left-0 mt-2 w-64 rounded-2xl p-3.5 z-30 space-y-2 animate-in fade-in zoom-in-95 duration-150">
                      <p className="text-xs font-bold text-[var(--text-primary)]">
                        Optical Glass Popover
                      </p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        Anchored floating callout with 32px background blur.
                      </p>
                      <Button
                        size="xs"
                        variant="default"
                        className="w-full"
                        onClick={() => setPopoverOpen(false)}
                      >
                        Apply Settings
                      </Button>
                    </div>
                  )}
                </div>

                <div
                  className="relative"
                  onMouseEnter={() => setHoverCardOpen(true)}
                  onMouseLeave={() => setHoverCardOpen(false)}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    leftFaIcon="fa-regular fa-id-card"
                    onClick={() => setHoverCardOpen((o) => !o)}
                  >
                    {'Hover / Tap <HoverCard />'}
                  </Button>
                  {hoverCardOpen && (
                    <div className="glass-floating absolute left-0 mt-2 w-64 rounded-2xl p-3.5 z-30 flex items-start gap-3 animate-in fade-in duration-150">
                      <Avatar initials="MN" />
                      <div className="text-xs space-y-0.5">
                        <p className="font-bold text-[var(--text-primary)]">@minh.nguyen</p>
                        <p className="text-[11px] text-[var(--text-secondary)]">
                          Executive Owner · AuraOS Global
                        </p>
                        <p className="text-[10px] font-mono-tabular text-emerald-500">
                          Joined Oct 2024 · Passkey Verified
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  leftFaIcon="fa-solid fa-paper-plane"
                  onClick={() =>
                    addToast(
                      'Sonner Glass Notification',
                      'Dispatched from shadcn Development Playground.',
                      'success'
                    )
                  }
                >
                  {'Trigger <Sonner />'}
                </Button>
              </div>

              <Separator />

              {/* Avatars & Skeletons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>{'Avatar Group (<Avatar />)'}</Label>
                  <div className="flex items-center -space-x-2">
                    <Avatar initials="MN" />
                    <Avatar initials="CV" />
                    <Avatar initials="ST" />
                    <Avatar initials="LB" />
                    <Avatar initials="+6" size="sm" className="ml-2" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>{'Shimmer Skeleton (<Skeleton />)'}</Label>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-2.5 w-1/2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* =====================================================================
       * SECTION 6: COMPLETE 54/54 SHADCN/UI COMPONENT REGISTRY MATRIX
       * =================================================================== */}
      {showSection('catalog') && (
        <Card interactiveHover>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle>
                  <FaIcon icon="fa-solid fa-list-check" className="mr-2 text-[var(--accent-primary)]" />
                  Complete 54/54 shadcn/ui Component Registry ({filteredCatalog.length} Listed)
                </CardTitle>
                <CardDescription>
                  Click any component in the official shadcn/ui catalog to copy its Liquid Glass JSX
                  tag or filter by category.
                </CardDescription>
              </div>
              <div className="w-full sm:w-72">
                <Input
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  leftFaIcon="fa-solid fa-magnifying-glass"
                  placeholder="Search all 54 shadcn components..."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredCatalog.map((item, idx) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(item.tag).catch(() => {});
                    }
                    addToast(`${item.name} (${item.tag})`, item.description, 'info');
                  }}
                  className="glass-interactive p-3.5 rounded-2xl text-left flex flex-col justify-between gap-2.5 group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-[var(--accent-soft)] text-[var(--accent-primary)] flex items-center justify-center shrink-0">
                        <FaIcon icon={item.faIcon} className="text-xs" />
                      </span>
                      <div>
                        <p className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {String(idx + 1).padStart(2, '0')}. {item.name}
                        </p>
                        <code className="text-[10px] font-mono-tabular text-[var(--accent-primary)]">
                          {item.tag}
                        </code>
                      </div>
                    </div>
                    <Badge variant="secondary" className="capitalize text-[9px]">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* =====================================================================
       * SECTION 7: FONT AWESOME 6 ICON EXPLORER
       * =================================================================== */}
      {showSection('icons') && (
        <Card interactiveHover>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <CardTitle>
                  <FaIcon icon="fa-solid fa-icons" className="mr-2 text-[var(--accent-primary)]" />
                  Font Awesome 6 Liquid Glass Icon Matrix ({filteredIcons.length} Icons)
                </CardTitle>
                <CardDescription>
                  {'Click any Font Awesome icon card to copy its <FaIcon /> JSX snippet.'}
                </CardDescription>
              </div>
              <div className="w-full sm:w-64">
                <Input
                  value={iconQuery}
                  onChange={(e) => setIconQuery(e.target.value)}
                  leftFaIcon="fa-solid fa-magnifying-glass"
                  placeholder="Search Font Awesome icon..."
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {filteredIcons.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    const snippet = `<FaIcon icon="${item.icon}" />`;
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(snippet).catch(() => {});
                    }
                    addToast('Copied Font Awesome JSX', snippet, 'info');
                  }}
                  className="glass-interactive rounded-2xl p-3 flex flex-col items-center justify-center gap-2 text-center group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--glass-subtle-bg)] flex items-center justify-center text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    <FaIcon icon={item.icon} className="text-base" />
                  </div>
                  <div className="min-w-0 w-full">
                    <p className="text-[11px] font-mono-tabular font-medium text-[var(--text-primary)] truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)]">{item.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* =====================================================================
       * INTERACTIVE OVERLAY MODALS (DIALOG, ALERTDIALOG, SHEET, DRAWER)
       * =================================================================== */}
      {/* 1. shadcn Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setDialogOpen(false)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-md glass-floating rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <FaIcon icon="fa-solid fa-layer-group" className="text-[var(--accent-primary)]" />
                  <span>shadcn/ui Liquid Glass Dialog</span>
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Floating modal dialog using `--glass-floating-bg` and 32px backdrop blur.
                </p>
              </div>
              <Button size="icon-sm" variant="secondary" onClick={() => setDialogOpen(false)}>
                <FaIcon icon="fa-solid fa-xmark" />
              </Button>
            </div>

            <div className="space-y-3 pt-1">
              <div className="space-y-1.5">
                <Label>Token Name</Label>
                <Input defaultValue="aura_live_9842_sonoma_glass" className="font-mono-tabular" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--glass-border)]">
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="default"
                leftFaIcon="fa-solid fa-check"
                onClick={() => {
                  setDialogOpen(false);
                  addToast('Token Provisioned', 'Saved from shadcn Liquid Glass Dialog.');
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. shadcn AlertDialog */}
      {alertDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/55 backdrop-blur-xs"
            onClick={() => setAlertDialogOpen(false)}
            aria-hidden="true"
          />
          <div
            role="alertdialog"
            aria-modal="true"
            className="relative z-10 w-full max-w-sm glass-floating rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/15 text-rose-500 shrink-0">
                <FaIcon icon="fa-solid fa-triangle-exclamation" className="text-base" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {'Revoke Production Signing Secret? (<AlertDialog />)'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  This action cannot be undone. Active edge webhooks using this key will reject
                  requests immediately.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setAlertDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                leftFaIcon="fa-solid fa-trash-can"
                onClick={() => {
                  setAlertDialogOpen(false);
                  addToast('Signing Key Revoked', 'Confirmed via shadcn AlertDialog.', 'warning');
                }}
              >
                Yes, Revoke Key
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. shadcn Side Sheet */}
      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setSheetOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-md h-full glass-floating p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-5">
              <div className="flex items-start justify-between pb-4 border-b border-[var(--glass-border)]">
                <div>
                  <p className="text-xs font-mono-tabular text-[var(--accent-primary)] font-semibold">
                    {'<Sheet side="right" />'}
                  </p>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mt-0.5">
                    Liquid Glass Inspector Sheet
                  </h3>
                </div>
                <Button size="icon-sm" variant="secondary" onClick={() => setSheetOpen(false)}>
                  <FaIcon icon="fa-solid fa-xmark" />
                </Button>
              </div>

              <Alert variant="success" icon="fa-solid fa-shield-halved">
                <AlertTitle>Zero-Trust Hardware Enclave</AlertTitle>
                <AlertDescription>
                  Passkey signature verified via macOS Secure Enclave.
                </AlertDescription>
              </Alert>
            </div>

            <div className="pt-4 border-t border-[var(--glass-border)] flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setSheetOpen(false)}>
                Close Sheet
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  setSheetOpen(false);
                  addToast('Sheet Configuration Applied');
                }}
              >
                Apply Policy
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. shadcn Bottom Vaul Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full max-w-2xl glass-floating rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 rounded-full bg-[var(--glass-border-strong)] mx-auto mb-2" />
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {'Vaul Gesture Bottom Drawer (<Drawer />)'}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Mobile-friendly bottom sheet with grab bar and translucent refraction.
                </p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => setDrawerOpen(false)}>
                Dismiss
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl glass-interactive text-center">
                <p className="text-[11px] text-[var(--text-muted)]">Edge Latency</p>
                <p className="text-base font-bold font-mono-tabular text-[var(--text-primary)]">
                  1.4 ms
                </p>
              </div>
              <div className="p-3 rounded-2xl glass-interactive text-center">
                <p className="text-[11px] text-[var(--text-muted)]">Blur Radius</p>
                <p className="text-base font-bold font-mono-tabular text-[var(--accent-primary)]">
                  32 px
                </p>
              </div>
              <div className="p-3 rounded-2xl glass-interactive text-center">
                <p className="text-[11px] text-[var(--text-muted)]">Components</p>
                <p className="text-base font-bold font-mono-tabular text-emerald-500">54 / 54</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
