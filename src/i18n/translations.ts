import { LanguageCode } from '../types/dashboard';

export interface TranslationDictionary {
  app: {
    brand: string;
    subtitle: string;
    workspace: string;
    searchPlaceholder: string;
    quickCreate: string;
    notifications: string;
    markAllRead: string;
    noNotifications: string;
    themeLight: string;
    themeDark: string;
    accentColor: string;
    language: string;
    profile: string;
    helpCenter: string;
    signOut: string;
    keyboardShortcuts: string;
    expandSidebar: string;
    collapseSidebar: string;
    refreshData: string;
    simulateEmpty: string;
    restoreData: string;
    exportReport: string;
    controlCenter: string;
  };
  login: {
    welcomeBack: string;
    subtitle: string;
    signInWithApple: string;
    signInWithGoogle: string;
    signInWithGithub: string;
    signInWithX: string;
    signInWithFacebook: string;
    signInWithPasskey: string;
    orUseCredentials: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    rememberDevice: string;
    forgotPassword: string;
    signInButton: string;
    quickUnlockAs: string;
    switchAccount: string;
    securityNote: string;
    controlCenterTitle: string;
    focusMode: string;
    ambientLight: string;
    glassBlur: string;
    invalidError: string;
    demoFill: string;
  };
  nav: {
    overview: string;
    analytics: string;
    orders: string;
    products: string;
    customers: string;
    inventory: string;
    reports: string;
    team: string;
    integrations: string;
    development: string;
    settings: string;
    workspaceGroup: string;
    commerceGroup: string;
    systemGroup: string;
  };
  welcome: {
    greeting: string;
    summaryPrefix: string;
    summaryHighlight: string;
    summarySuffix: string;
    newOrderBtn: string;
    exportCsvBtn: string;
    ranges: {
      today: string;
      '7d': string;
      '30d': string;
      '90d': string;
      '12m': string;
    };
  };
  kpi: {
    totalRevenue: string;
    totalOrders: string;
    activeCustomers: string;
    conversionRate: string;
    vsPreviousPeriod: string;
  };
  chart: {
    title: string;
    subtitle: string;
    daily: string;
    weekly: string;
    monthly: string;
    revenueSeries: string;
    ordersSeries: string;
    previousSeries: string;
  };
  orders: {
    title: string;
    subtitle: string;
    searchOrders: string;
    allStatuses: string;
    fulfilled: string;
    processing: string;
    pending: string;
    cancelled: string;
    paid: string;
    unpaid: string;
    refunded: string;
    orderId: string;
    customer: string;
    date: string;
    amount: string;
    status: string;
    payment: string;
    actions: string;
    inspect: string;
    markFulfilled: string;
    cancelOrder: string;
    showing: string;
    of: string;
    results: string;
    previous: string;
    next: string;
    emptyTitle: string;
    emptyDesc: string;
    createFirstOrder: string;
  };
  widgets: {
    recentActivity: string;
    activitySubtitle: string;
    bestSellingProducts: string;
    bestSellingSubtitle: string;
    orderStatusDist: string;
    orderStatusSubtitle: string;
    quickActions: string;
    quickActionsSubtitle: string;
    systemHealth: string;
    systemHealthSubtitle: string;
    unitsSold: string;
    inStock: string;
    lowStock: string;
    createProduct: string;
    createDiscount: string;
    syncInventory: string;
    inviteMember: string;
    operational: string;
    uptime: string;
  };
  modals: {
    quickCreateTitle: string;
    quickCreateSubtitle: string;
    tabOrder: string;
    tabProduct: string;
    customerName: string;
    customerEmail: string;
    orderAmount: string;
    productName: string;
    productSku: string;
    productCategory: string;
    productPrice: string;
    productStock: string;
    cancel: string;
    create: string;
    orderDetails: string;
    lineItems: string;
    paymentMethod: string;
    shippingLocation: string;
    confirmCancelTitle: string;
    confirmCancelDesc: string;
    confirmCancelBtn: string;
    commandPalettePlaceholder: string;
    commandNavigation: string;
    commandTheme: string;
    commandActions: string;
  };
  accents: {
    blue: string;
    purple: string;
    pink: string;
    orange: string;
    green: string;
    graphite: string;
  };
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    app: {
      brand: 'AuraOS',
      subtitle: 'Business dashboard',
      workspace: 'Workspace',
      searchPlaceholder: 'Search orders, products, commands...',
      quickCreate: 'Quick Create',
      notifications: 'Notifications',
      markAllRead: 'Mark all read',
      noNotifications: 'All caught up — no unread alerts',
      themeLight: 'Light mode',
      themeDark: 'Dark mode',
      accentColor: 'System Accent',
      language: 'Language',
      profile: 'Profile',
      helpCenter: 'Help Center',
      signOut: 'Logout',
      keyboardShortcuts: 'Press ⌘K for Spotlight',
      expandSidebar: 'Expand sidebar',
      collapseSidebar: 'Collapse sidebar',
      refreshData: 'Refresh metrics',
      simulateEmpty: 'Preview Empty State',
      restoreData: 'Restore Live Data',
      exportReport: 'Export Ledger CSV',
      controlCenter: 'Control Center',
    },
    login: {
      welcomeBack: 'Sign in to AuraOS',
      subtitle: 'macOS Liquid Glass Commerce & SaaS Executive Workspace',
      signInWithApple: 'Sign in with Apple',
      signInWithGoogle: 'Sign in with Google',
      signInWithGithub: 'Continue with GitHub',
      signInWithX: 'Continue with X',
      signInWithFacebook: 'Continue with Facebook',
      signInWithPasskey: 'Unlock with Touch ID / Passkey',
      orUseCredentials: 'Or sign in with workspace credentials',
      emailLabel: 'Workspace Email',
      emailPlaceholder: 'minh.nguyen@auraos.io',
      passwordLabel: 'Passcode / Password',
      passwordPlaceholder: '••••••••••••',
      rememberDevice: 'Trust this Mac for 30 days',
      forgotPassword: 'Reset Passkey',
      signInButton: 'Unlock Workspace',
      quickUnlockAs: 'Instant Express Sign-In',
      switchAccount: 'Switch Operator',
      securityNote: 'Protected by hardware-backed Passkey & TLS 1.3 encryption',
      controlCenterTitle: 'Liquid Glass Control Center',
      focusMode: 'Focus',
      ambientLight: 'Ambient',
      glassBlur: 'Refraction',
      invalidError: 'Please enter a valid email and at least 4 characters for password.',
      demoFill: 'Auto-fill Executive Credentials',
    },
    nav: {
      overview: 'Overview',
      analytics: 'Analytics',
      orders: 'Orders',
      products: 'Products',
      customers: 'Customers',
      inventory: 'Inventory',
      reports: 'Reports',
      team: 'Team & Permissions',
      integrations: 'Integrations',
      development: 'Development (shadcn UI)',
      settings: 'Settings',
      workspaceGroup: 'Core Intelligence',
      commerceGroup: 'Commerce Operations',
      systemGroup: 'Administration',
    },
    welcome: {
      greeting: 'Good afternoon, Minh Nguyen',
      summaryPrefix: 'Gross merchandise volume is pacing',
      summaryHighlight: '+18.4% ahead of target',
      summarySuffix: 'across 3 active regional storefronts with 99.98% checkout settlement.',
      newOrderBtn: 'New Order',
      exportCsvBtn: 'Export CSV',
      ranges: {
        today: 'Today',
        '7d': '7 Days',
        '30d': '30 Days',
        '90d': '90 Days',
        '12m': '12 Months',
      },
    },
    kpi: {
      totalRevenue: 'Total Revenue',
      totalOrders: 'Total Orders',
      activeCustomers: 'Active Customers',
      conversionRate: 'Conversion Rate',
      vsPreviousPeriod: 'vs prior period',
    },
    chart: {
      title: 'Revenue & Order Velocity',
      subtitle: 'Net settled revenue and completed order volume across channels',
      daily: 'Daily',
      weekly: 'Weekly',
      monthly: 'Monthly',
      revenueSeries: 'Net Revenue',
      ordersSeries: 'Orders',
      previousSeries: 'Prior Period',
    },
    orders: {
      title: 'Recent Orders Ledger',
      subtitle: 'Real-time transaction settlement, fulfillment telemetry, and order actions',
      searchOrders: 'Filter by Order ID, customer, email...',
      allStatuses: 'All Orders',
      fulfilled: 'Fulfilled',
      processing: 'Processing',
      pending: 'Pending',
      cancelled: 'Cancelled',
      paid: 'Paid',
      unpaid: 'Unpaid',
      refunded: 'Refunded',
      orderId: 'Order ID',
      customer: 'Customer',
      date: 'Date',
      amount: 'Amount',
      status: 'Fulfillment',
      payment: 'Payment',
      actions: 'Actions',
      inspect: 'Inspect',
      markFulfilled: 'Fulfill',
      cancelOrder: 'Cancel',
      showing: 'Showing',
      of: 'of',
      results: 'orders',
      previous: 'Previous',
      next: 'Next',
      emptyTitle: 'No matching orders found',
      emptyDesc: 'Adjust your search query or fulfillment status filter, or create a manual order.',
      createFirstOrder: 'Create Manual Order',
    },
    widgets: {
      recentActivity: 'Operational Timeline',
      activitySubtitle: 'Live audit trail across orders, catalog, and team',
      bestSellingProducts: 'Top Performing Products',
      bestSellingSubtitle: 'Ranked by net 30-day revenue contribution',
      orderStatusDist: 'Fulfillment Distribution',
      orderStatusSubtitle: 'Current pipeline breakdown across active orders',
      quickActions: 'Quick Studio Actions',
      quickActionsSubtitle: 'Instant administrative workflows',
      systemHealth: 'Infrastructure & Settlement',
      systemHealthSubtitle: 'Payment gateways & edge storefront regions',
      unitsSold: 'sold',
      inStock: 'in stock',
      lowStock: 'Low stock',
      createProduct: 'Add Catalog SKU',
      createDiscount: 'Issue VIP Promo',
      syncInventory: 'Rebalance Stock',
      inviteMember: 'Invite Operator',
      operational: 'All Regions Nominal',
      uptime: '99.98% Settlement SLA',
    },
    modals: {
      quickCreateTitle: 'Quick Create Record',
      quickCreateSubtitle: 'Dispatch a manual customer order or register a new catalog SKU',
      tabOrder: 'Manual Order',
      tabProduct: 'Catalog Product',
      customerName: 'Customer Full Name',
      customerEmail: 'Customer Email',
      orderAmount: 'Order Total (USD)',
      productName: 'Product Title',
      productSku: 'SKU Identifier',
      productCategory: 'Category',
      productPrice: 'Unit Price (USD)',
      productStock: 'Initial Stock Quantity',
      cancel: 'Cancel',
      create: 'Create Record',
      orderDetails: 'Order Inspector',
      lineItems: 'Purchased Line Items',
      paymentMethod: 'Payment Instrument',
      shippingLocation: 'Destination',
      confirmCancelTitle: 'Cancel Order Settlement?',
      confirmCancelDesc: 'This will mark the order as Cancelled and initiate an automatic refund reversal to the customer.',
      confirmCancelBtn: 'Confirm Cancellation',
      commandPalettePlaceholder: 'Type a command, jump to module, or switch accent...',
      commandNavigation: 'Navigation Modules',
      commandTheme: 'Appearance & System Accent',
      commandActions: 'Quick Operations',
    },
    accents: {
      blue: 'Cupertino Blue',
      purple: 'Royal Purple',
      pink: 'Rose Pink',
      orange: 'Amber Orange',
      green: 'Emerald Green',
      graphite: 'Titanium Graphite',
    },
  },
  vi: {
    app: {
      brand: 'AuraOS',
      subtitle: 'Tổng quan hoạt động kinh doanh',
      workspace: 'Không gian làm việc',
      searchPlaceholder: 'Tìm đơn hàng, sản phẩm, lệnh nhanh...',
      quickCreate: 'Tạo mới',
      notifications: 'Thông báo',
      markAllRead: 'Đánh dấu đã đọc',
      noNotifications: 'Đã xem hết — không có cảnh báo mới',
      themeLight: 'Giao diện sáng',
      themeDark: 'Giao diện tối',
      accentColor: 'Màu nhấn hệ thống',
      language: 'Ngôn ngữ',
      profile: 'Hồ sơ cá nhân',
      helpCenter: 'Trung tâm Trợ giúp',
      signOut: 'Đăng xuất',
      keyboardShortcuts: 'Nhấn ⌘K để mở Spotlight',
      expandSidebar: 'Mở rộng thanh bên',
      collapseSidebar: 'Thu gọn thanh bên',
      refreshData: 'Làm mới dữ liệu',
      simulateEmpty: 'Xem trạng thái trống',
      restoreData: 'Khôi phục dữ liệu',
      exportReport: 'Xuất báo cáo CSV',
      controlCenter: 'Trung tâm Điều khiển',
    },
    login: {
      welcomeBack: 'Đăng nhập AuraOS',
      subtitle: 'Không gian Quản trị Thương mại & SaaS phong cách macOS Liquid Glass',
      signInWithApple: 'Đăng nhập bằng Apple',
      signInWithGoogle: 'Đăng nhập bằng Google',
      signInWithGithub: 'Tiếp tục với GitHub',
      signInWithX: 'Tiếp tục với X',
      signInWithFacebook: 'Tiếp tục với Facebook',
      signInWithPasskey: 'Mở khóa bằng Touch ID / Passkey',
      orUseCredentials: 'Hoặc đăng nhập bằng tài khoản điều hành',
      emailLabel: 'Email công việc',
      emailPlaceholder: 'minh.nguyen@auraos.io',
      passwordLabel: 'Mật khẩu / Mã khóa',
      passwordPlaceholder: '••••••••••••',
      rememberDevice: 'Tin cậy thiết bị Mac này trong 30 ngày',
      forgotPassword: 'Khôi phục khóa',
      signInButton: 'Mở khóa Không gian làm việc',
      quickUnlockAs: 'Đăng nhập Nhanh Một Chạm',
      switchAccount: 'Chuyển tài khoản',
      securityNote: 'Bảo mật bằng khóa phần cứng Passkey & mã hóa TLS 1.3',
      controlCenterTitle: 'Trung tâm Điều khiển Liquid Glass',
      focusMode: 'Tập trung',
      ambientLight: 'Ánh sáng',
      glassBlur: 'Độ tán sắc',
      invalidError: 'Vui lòng nhập email hợp lệ và mật khẩu tối thiểu 4 ký tự.',
      demoFill: 'Tự động điền tài khoản Quản trị',
    },
    nav: {
      overview: 'Tổng quan',
      analytics: 'Phân tích',
      orders: 'Đơn hàng',
      products: 'Sản phẩm',
      customers: 'Khách hàng',
      inventory: 'Kho vận',
      reports: 'Báo cáo',
      team: 'Đội ngũ & Phân quyền',
      integrations: 'Tích hợp',
      development: 'Development (shadcn UI)',
      settings: 'Cài đặt',
      workspaceGroup: 'Trung tâm Điều hành',
      commerceGroup: 'Vận hành Thương mại',
      systemGroup: 'Quản trị Hệ thống',
    },
    welcome: {
      greeting: 'Chào buổi chiều, Minh Nguyễn',
      summaryPrefix: 'Tổng giá trị giao dịch (GMV) đang tăng trưởng',
      summaryHighlight: '+18.4% vượt mục tiêu',
      summarySuffix: 'trên 3 khu vực cửa hàng trực tuyến với tỷ lệ thanh toán thành công 99.98%.',
      newOrderBtn: 'Tạo đơn hàng',
      exportCsvBtn: 'Xuất CSV',
      ranges: {
        today: 'Hôm nay',
        '7d': '7 ngày',
        '30d': '30 ngày',
        '90d': '90 ngày',
        '12m': '12 tháng',
      },
    },
    kpi: {
      totalRevenue: 'Tổng doanh thu',
      totalOrders: 'Tổng đơn hàng',
      activeCustomers: 'Khách hàng hoạt động',
      conversionRate: 'Tỷ lệ chuyển đổi',
      vsPreviousPeriod: 'so với kỳ trước',
    },
    chart: {
      title: 'Biểu đồ Doanh thu & Lưu lượng Đơn hàng',
      subtitle: 'Doanh thu thuần và số lượng đơn hoàn tất trên toàn hệ thống',
      daily: 'Theo ngày',
      weekly: 'Theo tuần',
      monthly: 'Theo tháng',
      revenueSeries: 'Doanh thu thuần',
      ordersSeries: 'Đơn hàng',
      previousSeries: 'Kỳ trước',
    },
    orders: {
      title: 'Sổ cái Đơn hàng Gần đây',
      subtitle: 'Theo dõi thanh toán thời gian thực, trạng thái giao vận và xử lý đơn',
      searchOrders: 'Tìm theo mã đơn, tên khách hàng, email...',
      allStatuses: 'Tất cả',
      fulfilled: 'Đã giao',
      processing: 'Đang xử lý',
      pending: 'Chờ duyệt',
      cancelled: 'Đã hủy',
      paid: 'Đã thanh toán',
      unpaid: 'Chưa thanh toán',
      refunded: 'Đã hoàn tiền',
      orderId: 'Mã đơn',
      customer: 'Khách hàng',
      date: 'Ngày đặt',
      amount: 'Giá trị',
      status: 'Giao vận',
      payment: 'Thanh toán',
      actions: 'Thao tác',
      inspect: 'Chi tiết',
      markFulfilled: 'Hoàn tất',
      cancelOrder: 'Hủy đơn',
      showing: 'Hiển thị',
      of: 'trên',
      results: 'đơn hàng',
      previous: 'Trước',
      next: 'Tiếp',
      emptyTitle: 'Không tìm thấy đơn hàng phù hợp',
      emptyDesc: 'Hãy thử đổi từ khóa tìm kiếm, bộ lọc trạng thái hoặc tạo đơn hàng mới.',
      createFirstOrder: 'Tạo đơn hàng mới',
    },
    widgets: {
      recentActivity: 'Dòng thời gian Vận hành',
      activitySubtitle: 'Nhật ký hoạt động đơn hàng, kho và nhân sự',
      bestSellingProducts: 'Sản phẩm Bán chạy nhất',
      bestSellingSubtitle: 'Xếp hạng theo đóng góp doanh thu 30 ngày',
      orderStatusDist: 'Phân bổ Trạng thái Đơn',
      orderStatusSubtitle: 'Tỷ trọng quy trình xử lý đơn hàng hiện tại',
      quickActions: 'Thao tác Nhanh',
      quickActionsSubtitle: 'Lối tắt nghiệp vụ quản trị tức thì',
      systemHealth: 'Hạ tầng & Cổng Thanh toán',
      systemHealthSubtitle: 'Trạng thái máy chủ và đối tác giao vận',
      unitsSold: 'đã bán',
      inStock: 'tồn kho',
      lowStock: 'Sắp hết',
      createProduct: 'Thêm sản phẩm',
      createDiscount: 'Tạo mã ưu đãi',
      syncInventory: 'Đồng bộ tồn kho',
      inviteMember: 'Mời thành viên',
      operational: 'Toàn hệ thống ổn định',
      uptime: '99.98% Cam kết SLA',
    },
    modals: {
      quickCreateTitle: 'Tạo mới dữ liệu nhanh',
      quickCreateSubtitle: 'Khởi tạo đơn hàng thủ công hoặc thêm mã sản phẩm vào danh mục',
      tabOrder: 'Đơn hàng mới',
      tabProduct: 'Sản phẩm mới',
      customerName: 'Họ và tên khách hàng',
      customerEmail: 'Email khách hàng',
      orderAmount: 'Tổng tiền (USD)',
      productName: 'Tên sản phẩm',
      productSku: 'Mã định danh SKU',
      productCategory: 'Danh mục',
      productPrice: 'Đơn giá (USD)',
      productStock: 'Số lượng nhập kho',
      cancel: 'Hủy bỏ',
      create: 'Xác nhận tạo',
      orderDetails: 'Chi tiết Đơn hàng',
      lineItems: 'Danh sách Sản phẩm',
      paymentMethod: 'Phương thức Thanh toán',
      shippingLocation: 'Địa chỉ Giao nhận',
      confirmCancelTitle: 'Xác nhận hủy đơn hàng?',
      confirmCancelDesc: 'Hành động này sẽ chuyển đơn hàng sang trạng thái Đã hủy và tự động hoàn tiền cho khách hàng.',
      confirmCancelBtn: 'Xác nhận hủy đơn',
      commandPalettePlaceholder: 'Nhập lệnh, chuyển trang hoặc đổi màu giao diện...',
      commandNavigation: 'Điều hướng phân hệ',
      commandTheme: 'Giao diện & Màu sắc macOS',
      commandActions: 'Tác vụ nhanh',
    },
    accents: {
      blue: 'Xanh Cupertino',
      purple: 'Tím Hoàng gia',
      pink: 'Hồng Ruby',
      orange: 'Cam Hổ phách',
      green: 'Xanh Ngọc lục bảo',
      graphite: 'Xám Titan',
    },
  },
  zh: {
    app: {
      brand: 'AuraOS',
      subtitle: '电子商务与 SaaS 行政管理中枢',
      workspace: '工作区',
      searchPlaceholder: '搜索订单、商品或系统指令...',
      quickCreate: '快速新建',
      notifications: '通知中心',
      markAllRead: '全部标为已读',
      noNotifications: '暂无未读系统通知',
      themeLight: '浅色液态玻璃',
      themeDark: '深色液态玻璃',
      accentColor: '系统强调色',
      language: '界面语言',
      profile: '个人资料',
      helpCenter: '帮助中心',
      signOut: '退出登录',
      keyboardShortcuts: '按 ⌘K 唤起全局指令',
      expandSidebar: '展开侧边栏',
      collapseSidebar: '收起侧边栏',
      refreshData: '刷新实时数据',
      simulateEmpty: '预览空状态',
      restoreData: '恢复实时数据',
      exportReport: '导出 CSV 报表',
      controlCenter: '控制中心',
    },
    login: {
      welcomeBack: '登录 AuraOS',
      subtitle: 'macOS 液态玻璃风格电商与 SaaS 行政工作台',
      signInWithApple: '通过 Apple 登录',
      signInWithGoogle: '通过 Google 登录',
      signInWithGithub: '通过 GitHub 继续',
      signInWithX: '通过 X 继续',
      signInWithFacebook: '通过 Facebook 继续',
      signInWithPasskey: '使用 Touch ID / 通行密钥解锁',
      orUseCredentials: '或使用管理员账户凭证登录',
      emailLabel: '工作区邮箱',
      emailPlaceholder: 'minh.nguyen@auraos.io',
      passwordLabel: '访问密码',
      passwordPlaceholder: '••••••••••••',
      rememberDevice: '在 30 天内信任此 Mac 设备',
      forgotPassword: '重置密钥',
      signInButton: '解锁工作区',
      quickUnlockAs: '一键快捷登录',
      switchAccount: '切换操作员',
      securityNote: '受硬件级通行密钥 (Passkey) 与 TLS 1.3 加密保护',
      controlCenterTitle: '液态玻璃控制中心',
      focusMode: '专注模式',
      ambientLight: '环境光感',
      glassBlur: '折射深度',
      invalidError: '请输入有效的邮箱地址及至少 4 位密码。',
      demoFill: '自动填充高管演示账号',
    },
    nav: {
      overview: '总览看板',
      analytics: '数据分析',
      orders: '订单管理',
      products: '商品目录',
      customers: '客户关系',
      inventory: '库存中心',
      reports: '财务报表',
      team: '团队与权限',
      integrations: '集成中心',
      development: '开发组件库 (shadcn UI)',
      settings: '系统设置',
      workspaceGroup: '核心决策',
      commerceGroup: '商业运营',
      systemGroup: '系统管理',
    },
    welcome: {
      greeting: '下午好，Minh Nguyen',
      summaryPrefix: '当前商品交易总额 (GMV) 增长',
      summaryHighlight: '超预期目标 +18.4%',
      summarySuffix: '覆盖 3 个亚太与欧美区域店面，结算成功率达 99.98%。',
      newOrderBtn: '新建订单',
      exportCsvBtn: '导出报表',
      ranges: {
        today: '今日',
        '7d': '近 7 天',
        '30d': '近 30 天',
        '90d': '近 90 天',
        '12m': '近 12 个月',
      },
    },
    kpi: {
      totalRevenue: '总营业额',
      totalOrders: '订单总数',
      activeCustomers: '活跃客户数',
      conversionRate: '转化率',
      vsPreviousPeriod: '较上周期',
    },
    chart: {
      title: '营收与订单增长趋势',
      subtitle: '全渠道净结算收入与已完成订单量对比',
      daily: '按日',
      weekly: '按周',
      monthly: '按月',
      revenueSeries: '净营收',
      ordersSeries: '订单量',
      previousSeries: '上期对比',
    },
    orders: {
      title: '近期订单明细表',
      subtitle: '实时交易结算、履约状态追踪与快捷操作',
      searchOrders: '按订单号、客户姓名、邮箱搜索...',
      allStatuses: '全部状态',
      fulfilled: '已履约',
      processing: '处理中',
      pending: '待处理',
      cancelled: '已取消',
      paid: '已支付',
      unpaid: '未支付',
      refunded: '已退款',
      orderId: '订单号',
      customer: '客户信息',
      date: '下单时间',
      amount: '订单金额',
      status: '履约状态',
      payment: '支付状态',
      actions: '操作',
      inspect: '详情',
      markFulfilled: '标记发货',
      cancelOrder: '取消',
      showing: '显示第',
      of: '至',
      results: '条订单',
      previous: '上一页',
      next: '下一页',
      emptyTitle: '未找到匹配的订单记录',
      emptyDesc: '请尝试调整搜索关键词或状态筛选器，或直接创建新订单。',
      createFirstOrder: '创建首笔订单',
    },
    widgets: {
      recentActivity: '实时运营动态',
      activitySubtitle: '订单、库存变动与团队操作审计日志',
      bestSellingProducts: '畅销商品排行',
      bestSellingSubtitle: '按近 30 天净营收贡献排序',
      orderStatusDist: '订单履约分布',
      orderStatusSubtitle: '当前活跃订单各阶段占比',
      quickActions: '快捷管理操作',
      quickActionsSubtitle: '高频工作流一键直达',
      systemHealth: '基础设施与结算网关',
      systemHealthSubtitle: '全球支付节点与店面可用性监控',
      unitsSold: '件已售',
      inStock: '件库存',
      lowStock: '库存预警',
      createProduct: '新增商品 SKU',
      createDiscount: '发放专属优惠',
      syncInventory: '智能补货同步',
      inviteMember: '邀请团队成员',
      operational: '全节点运行正常',
      uptime: '99.98% 结算可用率',
    },
    modals: {
      quickCreateTitle: '快速创建记录',
      quickCreateSubtitle: '录入人工客户订单或向目录添加新商品 SKU',
      tabOrder: '新建订单',
      tabProduct: '新增商品',
      customerName: '客户姓名',
      customerEmail: '客户邮箱',
      orderAmount: '订单总额 (USD)',
      productName: '商品名称',
      productSku: 'SKU 编码',
      productCategory: '所属品类',
      productPrice: '单价 (USD)',
      productStock: '初始库存数量',
      cancel: '取消',
      create: '确认创建',
      orderDetails: '订单详情检视器',
      lineItems: '商品明细清单',
      paymentMethod: '支付方式',
      shippingLocation: '配送地区',
      confirmCancelTitle: '确认取消该笔订单？',
      confirmCancelDesc: '取消后订单将标记为已取消，并自动向客户原路退回款项。',
      confirmCancelBtn: '确认取消订单',
      commandPalettePlaceholder: '输入指令、跳转模块或切换系统强调色...',
      commandNavigation: '导航模块跳转',
      commandTheme: '外观与 macOS 强调色',
      commandActions: '快捷操作命令',
    },
    accents: {
      blue: '库比蒂诺蓝',
      purple: '皇家紫',
      pink: '玫瑰粉',
      orange: '琥珀橙',
      green: '翡翠绿',
      graphite: '钛金灰',
    },
  },
};
