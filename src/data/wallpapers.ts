import { AccentColor } from '../types/dashboard';

export type WallpaperId =
  | 'tahoe-liquid-waves'
  | 'sequoia-sunrise-ridge'
  | 'sonoma-horizon-dusk'
  | 'arctic-aurora-fjord'
  | 'obsidian-caustic-prism'
  | 'dolomites-alpine-mirror'
  | 'namib-golden-dunes'
  | 'kyoto-misty-bamboo'
  | 'bioluminescent-abyss'
  | 'iridescent-pearl-studio';

export type WallpaperCategory = 'all' | 'dynamic' | 'landscape' | 'abstract' | 'prism';

export interface WallpaperPreset {
  id: WallpaperId;
  category: Exclude<WallpaperCategory, 'all'>;
  name: {
    vi: string;
    en: string;
    zh: string;
  };
  subtitle: {
    vi: string;
    en: string;
    zh: string;
  };
  badge: string;
  resolution: string;
  accentRecommendation: AccentColor;
  darkCanvas: string;
  lightCanvas: string;
  orb1: string;
  orb2: string;
  orb3: string;
  svgDataUri: string;
  lightSvgDataUri: string;
  svgDataUrl: string;
}

const encodeSvg = (svg: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

const RAW_WALLPAPERS: Omit<WallpaperPreset, 'svgDataUrl'>[] = [
  /* 1. macOS Tahoe 26 — Official Liquid Glass Waves (Dynamic Light/Dark) */
  {
    id: 'tahoe-liquid-waves',
    category: 'dynamic',
    name: {
      vi: 'macOS Tahoe 26 — Sóng Kính Lỏng',
      en: 'macOS Tahoe 26 — Liquid Glass',
      zh: 'macOS Tahoe 26 — 液态玻璃波浪',
    },
    subtitle: {
      vi: 'Hình nền chuẩn Apple WWDC: Dải pha lê lỏng sapphire & cyan khúc xạ 3D',
      en: 'Official Apple WWDC refractive sapphire & cyan 3D liquid glass ribbons',
      zh: 'Apple WWDC 官方折射蓝宝石与青色 3D 液态水晶丝带',
    },
    badge: 'macOS Tahoe 26 HIG',
    resolution: '6K Pro Display XDR',
    accentRecommendation: 'blue',
    darkCanvas: '#020817',
    lightCanvas: '#e0f2fe',
    orb1: 'rgba(10, 132, 255, 0.36)',
    orb2: 'rgba(94, 92, 230, 0.30)',
    orb3: 'rgba(50, 173, 230, 0.28)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#020617"/>
            <stop offset="48%" stop-color="#07193d"/>
            <stop offset="100%" stop-color="#030b1c"/>
          </linearGradient>
          <radialGradient id="tOrb1" cx="24%" cy="28%" r="55%">
            <stop offset="0%" stop-color="#0A84FF" stop-opacity="0.72"/>
            <stop offset="50%" stop-color="#5E5CE6" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="tOrb2" cx="78%" cy="68%" r="58%">
            <stop offset="0%" stop-color="#32ADE6" stop-opacity="0.65"/>
            <stop offset="55%" stop-color="#0A84FF" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="tRibbon1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#64D2FF" stop-opacity="0.88"/>
            <stop offset="50%" stop-color="#0A84FF" stop-opacity="0.75"/>
            <stop offset="100%" stop-color="#5E5CE6" stop-opacity="0.85"/>
          </linearGradient>
          <linearGradient id="tRibbon2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#E0F2FE" stop-opacity="0.62"/>
            <stop offset="45%" stop-color="#38BDF8" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0.72"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#tBg)"/>
        <rect width="1920" height="1080" fill="url(#tOrb1)"/>
        <rect width="1920" height="1080" fill="url(#tOrb2)"/>
        <path d="M-140,820 C260,360 720,980 1240,460 C1540,160 1780,540 2060,340 L2060,1140 L-140,1140 Z" fill="url(#tRibbon1)" opacity="0.62"/>
        <path d="M-140,560 C380,920 860,220 1380,620 C1680,850 1840,420 2060,520 L2060,1140 L-140,1140 Z" fill="url(#tRibbon2)" opacity="0.58"/>
        <path d="M-120,660 C340,280 880,840 1440,380 C1710,160 1880,360 2040,260" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-opacity="0.55"/>
        <path d="M-120,560 C380,920 860,220 1380,620 C1680,850 1840,420 2060,520" fill="none" stroke="#BAE6FD" stroke-width="2.5" stroke-opacity="0.48"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="tlBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E0F2FE"/>
            <stop offset="50%" stop-color="#BAE6FD"/>
            <stop offset="100%" stop-color="#DBEAFE"/>
          </linearGradient>
          <linearGradient id="tlWave1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#007AFF" stop-opacity="0.72"/>
            <stop offset="50%" stop-color="#32ADE6" stop-opacity="0.58"/>
            <stop offset="100%" stop-color="#5856D6" stop-opacity="0.65"/>
          </linearGradient>
          <linearGradient id="tlWave2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.85"/>
            <stop offset="50%" stop-color="#7DD3FC" stop-opacity="0.65"/>
            <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.55"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#tlBg)"/>
        <path d="M-140,820 C260,360 720,980 1240,460 C1540,160 1780,540 2060,340 L2060,1140 L-140,1140 Z" fill="url(#tlWave1)"/>
        <path d="M-140,560 C380,920 860,220 1380,620 C1680,850 1840,420 2060,520 L2060,1140 L-140,1140 Z" fill="url(#tlWave2)"/>
        <path d="M-120,660 C340,280 880,840 1440,380 C1710,160 1880,360 2040,260" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-opacity="0.85"/>
      </svg>
    `),
  },

  /* 2. macOS Sequoia 15 — Official Sunrise Forest Beams */
  {
    id: 'sequoia-sunrise-ridge',
    category: 'landscape',
    name: {
      vi: 'macOS Sequoia 15 — Bình Minh Rừng Thông',
      en: 'macOS Sequoia 15 — Sunrise Beams',
      zh: 'macOS Sequoia 15 — 红杉晨曦光束',
    },
    subtitle: {
      vi: 'Tia nắng bình minh hổ phách & tím sương mù xuyên qua tán rừng Sequoia',
      en: 'Official macOS Sequoia abstract canopy sunbeams & layered mountain mist',
      zh: 'macOS Sequoia 官方抽象林间晨光与层叠山脊薄雾',
    },
    badge: 'macOS Sequoia 15',
    resolution: '6K Dynamic HDR',
    accentRecommendation: 'orange',
    darkCanvas: '#0f0718',
    lightCanvas: '#fff3e6',
    orb1: 'rgba(255, 149, 0, 0.34)',
    orb2: 'rgba(175, 82, 222, 0.28)',
    orb3: 'rgba(255, 45, 85, 0.24)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sqSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0B0616"/>
            <stop offset="35%" stop-color="#2E1042"/>
            <stop offset="70%" stop-color="#9A3412"/>
            <stop offset="100%" stop-color="#F59E0B"/>
          </linearGradient>
          <linearGradient id="sqBeam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FDE68A" stop-opacity="0.48"/>
            <stop offset="50%" stop-color="#FB923C" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#FB923C" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sqSky)"/>
        <polygon points="0,0 780,0 1620,1080 420,1080" fill="url(#sqBeam)"/>
        <polygon points="480,0 1180,0 1920,960 1180,1080" fill="url(#sqBeam)" opacity="0.7"/>
        <path d="M-80,620 Q360,440 820,580 T1680,470 L2000,560 L2000,1080 L-80,1080 Z" fill="#3B0764" opacity="0.68"/>
        <path d="M-80,740 Q480,580 980,720 T1960,640 L1960,1080 L-80,1080 Z" fill="#1E0836" opacity="0.85"/>
        <path d="M-80,860 Q520,740 1120,850 T1960,790 L1960,1080 L-80,1080 Z" fill="#090314"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sqlSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FEF3C7"/>
            <stop offset="45%" stop-color="#FDBA74"/>
            <stop offset="100%" stop-color="#F472B6"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sqlSky)"/>
        <path d="M-80,620 Q360,440 820,580 T1680,470 L2000,560 L2000,1080 L-80,1080 Z" fill="#FB923C" opacity="0.65"/>
        <path d="M-80,740 Q480,580 980,720 T1960,640 L1960,1080 L-80,1080 Z" fill="#C2410C" opacity="0.75"/>
        <path d="M-80,860 Q520,740 1120,850 T1960,790 L1960,1080 L-80,1080 Z" fill="#7C2D12" opacity="0.85"/>
      </svg>
    `),
  },

  /* 3. macOS Sonoma 14 — Official Sonoma Horizon Waves */
  {
    id: 'sonoma-horizon-dusk',
    category: 'dynamic',
    name: {
      vi: 'macOS Sonoma 14 — Đường Chân Trời',
      en: 'macOS Sonoma 14 — Horizon Waves',
      zh: 'macOS Sonoma 14 — 索诺玛地平线',
    },
    subtitle: {
      vi: 'Dải lụa địa hình Sonoma uốn lượn sắc hồng cánh sen, chàm tím & lam ngọc',
      en: 'Official macOS Sonoma sweeping magenta, indigo, coral, and cyan ribbons',
      zh: 'macOS Sonoma 官方洋红、靛蓝、珊瑚与青色波浪曲线',
    },
    badge: 'macOS Sonoma 14',
    resolution: '6K Dynamic',
    accentRecommendation: 'pink',
    darkCanvas: '#0c071c',
    lightCanvas: '#fce7f3',
    orb1: 'rgba(255, 45, 85, 0.34)',
    orb2: 'rgba(175, 82, 222, 0.30)',
    orb3: 'rgba(50, 173, 230, 0.28)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="snSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#090D24"/>
            <stop offset="38%" stop-color="#2E1065"/>
            <stop offset="72%" stop-color="#BE185D"/>
            <stop offset="100%" stop-color="#F97316"/>
          </linearGradient>
          <linearGradient id="snWave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="50%" stop-color="#818CF8"/>
            <stop offset="100%" stop-color="#F43F5E"/>
          </linearGradient>
          <linearGradient id="snWave2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E1B4B"/>
            <stop offset="55%" stop-color="#581C87"/>
            <stop offset="100%" stop-color="#9D174D"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#snSky)"/>
        <path d="M-100,480 C440,220 960,680 1520,380 C1740,260 1860,320 2020,280 L2020,1080 L-100,1080 Z" fill="url(#snWave1)" opacity="0.72"/>
        <path d="M-100,660 C420,440 940,820 1480,560 C1720,440 1860,520 2020,480 L2020,1080 L-100,1080 Z" fill="url(#snWave2)" opacity="0.92"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="snlSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E0F2FE"/>
            <stop offset="50%" stop-color="#FCE7F3"/>
            <stop offset="100%" stop-color="#FFEDD5"/>
          </linearGradient>
          <linearGradient id="snlW1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.8"/>
            <stop offset="50%" stop-color="#A855F7" stop-opacity="0.75"/>
            <stop offset="100%" stop-color="#FB7185" stop-opacity="0.8"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#snlSky)"/>
        <path d="M-100,520 C440,260 960,720 1520,420 L2020,320 L2020,1080 L-100,1080 Z" fill="url(#snlW1)"/>
      </svg>
    `),
  },

  /* 4. iOS 26 — Official Liquid Glass Petal Bloom */
  {
    id: 'arctic-aurora-fjord',
    category: 'dynamic',
    name: {
      vi: 'iOS 26 — Hoa Kính Lỏng Khúc Xạ',
      en: 'iOS 26 — Liquid Glass Bloom',
      zh: 'iOS 26 — 液态玻璃花瓣绽放',
    },
    subtitle: {
      vi: 'Hình nền mặc định iPhone 16 Pro / iOS 26 với vòm kính đồng tâm phát sáng',
      en: 'Official iOS 26 concentric refractive glass arches in cyan, emerald & indigo',
      zh: 'iOS 26 官方同心折射玻璃拱弧',
    },
    badge: 'iOS 26 Official',
    resolution: 'Super Retina XDR',
    accentRecommendation: 'green',
    darkCanvas: '#031117',
    lightCanvas: '#ecfdf5',
    orb1: 'rgba(52, 199, 89, 0.34)',
    orb2: 'rgba(50, 173, 230, 0.32)',
    orb3: 'rgba(88, 86, 214, 0.28)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="iosBg" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stop-color="#082F49"/>
            <stop offset="55%" stop-color="#021729"/>
            <stop offset="100%" stop-color="#010912"/>
          </radialGradient>
          <radialGradient id="petalA" cx="35%" cy="38%" r="48%">
            <stop offset="0%" stop-color="#34D399" stop-opacity="0.82"/>
            <stop offset="55%" stop-color="#0EA5E9" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#021729" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="petalB" cx="68%" cy="62%" r="48%">
            <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.82"/>
            <stop offset="55%" stop-color="#6366F1" stop-opacity="0.48"/>
            <stop offset="100%" stop-color="#021729" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#iosBg)"/>
        <ellipse cx="680" cy="480" rx="640" ry="420" fill="url(#petalA)" transform="rotate(-18 680 480)"/>
        <ellipse cx="1260" cy="600" rx="640" ry="420" fill="url(#petalB)" transform="rotate(22 1260 600)"/>
        <ellipse cx="960" cy="540" rx="520" ry="340" fill="none" stroke="#A7F3D0" stroke-width="3" stroke-opacity="0.42"/>
        <ellipse cx="960" cy="540" rx="360" ry="230" fill="none" stroke="#BAE6FD" stroke-width="2.5" stroke-opacity="0.5"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="ioslBg" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stop-color="#ECFDF5"/>
            <stop offset="55%" stop-color="#E0F2FE"/>
            <stop offset="100%" stop-color="#DBEAFE"/>
          </radialGradient>
          <radialGradient id="petalLA" cx="35%" cy="38%" r="48%">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#E0F2FE" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="petalLB" cx="68%" cy="62%" r="48%">
            <stop offset="0%" stop-color="#0EA5E9" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#DBEAFE" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#ioslBg)"/>
        <ellipse cx="680" cy="480" rx="640" ry="420" fill="url(#petalLA)" transform="rotate(-18 680 480)"/>
        <ellipse cx="1260" cy="600" rx="640" ry="420" fill="url(#petalLB)" transform="rotate(22 1260 600)"/>
      </svg>
    `),
  },

  /* 5. iPadOS 26 — Official Pro M4 Tandem OLED Ribbon */
  {
    id: 'obsidian-caustic-prism',
    category: 'prism',
    name: {
      vi: 'iPadOS 26 — Dải Kính OLED M4 Pro',
      en: 'iPadOS 26 — Ultra Retina OLED Ribbon',
      zh: 'iPadOS 26 — M4 双层串联 OLED 光带',
    },
    subtitle: {
      vi: 'Hình nền chuẩn iPad Pro M4: Nền đen Tandem OLED tuyệt đối với lăng kính đỏ-tím-xanh',
      en: 'Official iPad Pro M4 Tandem OLED deep obsidian with neon caustic glass wings',
      zh: 'iPad Pro M4 官方深邃黑与霓虹散射光翼',
    },
    badge: 'iPad Pro M4 Official',
    resolution: 'Ultra Retina XDR',
    accentRecommendation: 'red',
    darkCanvas: '#040407',
    lightCanvas: '#f8fafc',
    orb1: 'rgba(255, 59, 48, 0.34)',
    orb2: 'rgba(175, 82, 222, 0.32)',
    orb3: 'rgba(10, 132, 255, 0.30)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="m4WingA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF3B30" stop-opacity="0.88"/>
            <stop offset="48%" stop-color="#AF52DE" stop-opacity="0.72"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="m4WingB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0A84FF" stop-opacity="0.88"/>
            <stop offset="48%" stop-color="#32ADE6" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="#030306"/>
        <path d="M180,140 C780,80 960,540 960,540 C960,540 460,880 140,940 C380,620 380,460 180,140 Z" fill="url(#m4WingA)"/>
        <path d="M1740,140 C1140,80 960,540 960,540 C960,540 1460,880 1780,940 C1540,620 1540,460 1740,140 Z" fill="url(#m4WingB)"/>
        <circle cx="960" cy="540" r="240" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-opacity="0.28"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="m4LWingA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF2D55" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#F8FAFC" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="m4LWingB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#007AFF" stop-opacity="0.55"/>
            <stop offset="100%" stop-color="#F8FAFC" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="#F1F5F9"/>
        <path d="M180,140 C780,80 960,540 960,540 C960,540 460,880 140,940 Z" fill="url(#m4LWingA)"/>
        <path d="M1740,140 C1140,80 960,540 960,540 C960,540 1460,880 1780,940 Z" fill="url(#m4LWingB)"/>
      </svg>
    `),
  },

  /* 6. macOS Big Sur — Official Chroma Silk Waves */
  {
    id: 'dolomites-alpine-mirror',
    category: 'landscape',
    name: {
      vi: 'macOS Big Sur — Lụa Sắc Màu Chroma',
      en: 'macOS Big Sur — Chroma Silk Waves',
      zh: 'macOS Big Sur — 经典炫彩丝绸波浪',
    },
    subtitle: {
      vi: 'Hình nền biểu tượng của Apple với các lớp sóng màu lục lam, hồng san hô và xanh dương',
      en: 'Iconic Apple Design multi-layered silk color waves in cyan, coral, and royal blue',
      zh: 'Apple 经典多层青色、珊瑚红与深蓝丝绸波浪',
    },
    badge: 'macOS Big Sur HIG',
    resolution: '6K Vector HDR',
    accentRecommendation: 'blue',
    darkCanvas: '#061428',
    lightCanvas: '#e0f2fe',
    orb1: 'rgba(50, 173, 230, 0.34)',
    orb2: 'rgba(255, 45, 85, 0.28)',
    orb3: 'rgba(255, 149, 0, 0.24)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <rect width="1920" height="1080" fill="#071330"/>
        <path d="M0,220 C520,420 1080,40 1920,280 L1920,1080 L0,1080 Z" fill="#0EA5E9" opacity="0.78"/>
        <path d="M0,420 C620,180 1240,620 1920,380 L1920,1080 L0,1080 Z" fill="#EC4899" opacity="0.72"/>
        <path d="M0,580 C480,760 1180,380 1920,620 L1920,1080 L0,1080 Z" fill="#F97316" opacity="0.68"/>
        <path d="M0,740 C560,560 1320,860 1920,700 L1920,1080 L0,1080 Z" fill="#1E1B4B" opacity="0.94"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <rect width="1920" height="1080" fill="#BAE6FD"/>
        <path d="M0,220 C520,420 1080,40 1920,280 L1920,1080 L0,1080 Z" fill="#38BDF8" opacity="0.82"/>
        <path d="M0,420 C620,180 1240,620 1920,380 L1920,1080 L0,1080 Z" fill="#FB7185" opacity="0.75"/>
        <path d="M0,580 C480,760 1180,380 1920,620 L1920,1080 L0,1080 Z" fill="#FBBF24" opacity="0.72"/>
        <path d="M0,740 C560,560 1320,860 1920,700 L1920,1080 L0,1080 Z" fill="#2563EB" opacity="0.82"/>
      </svg>
    `),
  },

  /* 7. macOS Ventura 13 — Official California Poppy Bloom */
  {
    id: 'namib-golden-dunes',
    category: 'abstract',
    name: {
      vi: 'macOS Ventura 13 — Hoa Anh Túc Vàng',
      en: 'macOS Ventura 13 — Poppy Bloom',
      zh: 'macOS Ventura 13 — 加州金罂粟盛放',
    },
    subtitle: {
      vi: 'Cánh hoa cam hổ phách & vàng rực rỡ chuyển sắc trên nền xanh đêm Ventura',
      en: 'Official macOS Ventura sweeping golden-amber & fiery sunset petal forms',
      zh: 'macOS Ventura 官方金琥珀与暖橙花瓣光影',
    },
    badge: 'macOS Ventura 13',
    resolution: '6K HDR Bloom',
    accentRecommendation: 'orange',
    darkCanvas: '#120804',
    lightCanvas: '#fff7ed',
    orb1: 'rgba(255, 149, 0, 0.36)',
    orb2: 'rgba(255, 59, 48, 0.30)',
    orb3: 'rgba(255, 204, 0, 0.25)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="vnBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#051329"/>
            <stop offset="50%" stop-color="#1C0B19"/>
            <stop offset="100%" stop-color="#431407"/>
          </linearGradient>
          <radialGradient id="vnPetal1" cx="55%" cy="48%" r="52%">
            <stop offset="0%" stop-color="#FDE047"/>
            <stop offset="45%" stop-color="#F97316"/>
            <stop offset="85%" stop-color="#DC2626" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#1C0B19" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#vnBg)"/>
        <path d="M260,1080 C340,360 980,80 1720,220 C1420,640 1160,960 260,1080 Z" fill="url(#vnPetal1)"/>
        <path d="M680,1080 C820,460 1340,240 1920,420 L1920,1080 Z" fill="#FB923C" opacity="0.55"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <rect width="1920" height="1080" fill="#E0F2FE"/>
        <path d="M260,1080 C340,360 980,80 1720,220 C1420,640 1160,960 260,1080 Z" fill="#FB923C" opacity="0.85"/>
        <path d="M680,1080 C820,460 1340,240 1920,420 L1920,1080 Z" fill="#FDE047" opacity="0.72"/>
      </svg>
    `),
  },

  /* 8. macOS Monterey 12 — Official Orbital Violet Canyon */
  {
    id: 'kyoto-misty-bamboo',
    category: 'abstract',
    name: {
      vi: 'macOS Monterey 12 — Hẻm Núi Tím Quang Học',
      en: 'macOS Monterey 12 — Violet Canyon',
      zh: 'macOS Monterey 12 — 蒙特雷紫罗兰峡谷',
    },
    subtitle: {
      vi: 'Dải sóng 3D Monterey màu tím indigo, hồng magenta và ánh sáng viền sắc nét',
      en: 'Official macOS Monterey 3D sculptural purple, violet, and magenta light ridges',
      zh: 'macOS Monterey 官方 3D 紫罗兰与品红光影山脊',
    },
    badge: 'macOS Monterey 12',
    resolution: '6K Sculptural',
    accentRecommendation: 'purple',
    darkCanvas: '#0d061a',
    lightCanvas: '#f5f3ff',
    orb1: 'rgba(175, 82, 222, 0.36)',
    orb2: 'rgba(88, 86, 214, 0.32)',
    orb3: 'rgba(255, 45, 85, 0.25)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="mtBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#090414"/>
            <stop offset="50%" stop-color="#2E1065"/>
            <stop offset="100%" stop-color="#4C1D95"/>
          </linearGradient>
          <linearGradient id="mtRidge1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#F472B6"/>
            <stop offset="50%" stop-color="#A855F7"/>
            <stop offset="100%" stop-color="#3B0764"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#mtBg)"/>
        <path d="M-100,240 C480,680 1120,120 1980,540 L1980,1080 L-100,1080 Z" fill="url(#mtRidge1)" opacity="0.82"/>
        <path d="M-100,580 C560,320 1240,860 1980,460 L1980,1080 L-100,1080 Z" fill="#1E1B4B" opacity="0.88"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <rect width="1920" height="1080" fill="#F3E8FF"/>
        <path d="M-100,240 C480,680 1120,120 1980,540 L1980,1080 L-100,1080 Z" fill="#C084FC" opacity="0.75"/>
        <path d="M-100,580 C560,320 1240,860 1980,460 L1980,1080 L-100,1080 Z" fill="#818CF8" opacity="0.78"/>
      </svg>
    `),
  },

  /* 9. Studio Display XDR — Official Radial Caustic Mesh */
  {
    id: 'bioluminescent-abyss',
    category: 'prism',
    name: {
      vi: 'Studio Display XDR — Quang Phổ Xanh',
      en: 'Studio Display XDR — Cyan Caustics',
      zh: 'Studio Display XDR — 专业级蓝青散射光谱',
    },
    subtitle: {
      vi: 'Hình nền chuẩn màn hình Apple Studio Display 5K với luồng sáng lục lam & xanh biển sâu',
      en: 'Official Apple Studio Display 5K radial turquoise & deep sapphire light bursts',
      zh: 'Apple Studio Display 5K 官方青蓝径向光束',
    },
    badge: 'Studio Display 5K',
    resolution: '5K Retina P3',
    accentRecommendation: 'blue',
    darkCanvas: '#020b16',
    lightCanvas: '#ecfeff',
    orb1: 'rgba(50, 173, 230, 0.36)',
    orb2: 'rgba(0, 199, 190, 0.32)',
    orb3: 'rgba(10, 132, 255, 0.28)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sdCenter" cx="50%" cy="54%" r="60%">
            <stop offset="0%" stop-color="#22D3EE" stop-opacity="0.88"/>
            <stop offset="42%" stop-color="#0284C7" stop-opacity="0.62"/>
            <stop offset="78%" stop-color="#1E1B4B" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#020617"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sdCenter)"/>
        <circle cx="960" cy="560" r="420" fill="none" stroke="#67E8F9" stroke-width="2.5" stroke-opacity="0.38"/>
        <circle cx="960" cy="560" r="640" fill="none" stroke="#38BDF8" stroke-width="2" stroke-opacity="0.24"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sdlCenter" cx="50%" cy="54%" r="60%">
            <stop offset="0%" stop-color="#67E8F9"/>
            <stop offset="55%" stop-color="#BAE6FD"/>
            <stop offset="100%" stop-color="#EFF6FF"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sdlCenter)"/>
      </svg>
    `),
  },

  /* 10. visionOS 26 — Official Spatial Computing Alabaster Halo */
  {
    id: 'iridescent-pearl-studio',
    category: 'abstract',
    name: {
      vi: 'visionOS 26 — Không Gian Kính Vision Pro',
      en: 'visionOS 26 — Spatial Glass Halo',
      zh: 'visionOS 26 — Vision Pro 空间计算光环',
    },
    subtitle: {
      vi: 'Môi trường không gian 3D chuẩn Apple Vision Pro với vòng hào quang ngọc trai & kính mờ',
      en: 'Official Apple Vision Pro spatial environment with pearlescent glass rings',
      zh: 'Apple Vision Pro 官方空间计算珍珠玻璃光环环境',
    },
    badge: 'visionOS 26 HIG',
    resolution: 'Spatial 8K Equirect',
    accentRecommendation: 'purple',
    darkCanvas: '#0f1322',
    lightCanvas: '#f8fafc',
    orb1: 'rgba(168, 85, 247, 0.30)',
    orb2: 'rgba(56, 189, 248, 0.30)',
    orb3: 'rgba(244, 114, 182, 0.25)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="vpBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0B1021"/>
            <stop offset="52%" stop-color="#1E293B"/>
            <stop offset="100%" stop-color="#0F172A"/>
          </linearGradient>
          <radialGradient id="vpHalo" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stop-color="#F8FAFC" stop-opacity="0.35"/>
            <stop offset="45%" stop-color="#C084FC" stop-opacity="0.28"/>
            <stop offset="75%" stop-color="#38BDF8" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#0F172A" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#vpBg)"/>
        <rect width="1920" height="1080" fill="url(#vpHalo)"/>
        <ellipse cx="960" cy="520" rx="680" ry="260" fill="none" stroke="#E2E8F0" stroke-width="2.5" stroke-opacity="0.45"/>
        <ellipse cx="960" cy="520" rx="480" ry="180" fill="none" stroke="#BAE6FD" stroke-width="2" stroke-opacity="0.38"/>
      </svg>
    `),
    lightSvgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="vplBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#F8FAFC"/>
            <stop offset="52%" stop-color="#E2E8F0"/>
            <stop offset="100%" stop-color="#F1F5F9"/>
          </linearGradient>
          <radialGradient id="vplHalo" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
            <stop offset="50%" stop-color="#DDD6FE" stop-opacity="0.65"/>
            <stop offset="85%" stop-color="#BAE6FD" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#F1F5F9" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#vplBg)"/>
        <rect width="1920" height="1080" fill="url(#vplHalo)"/>
      </svg>
    `),
  },
];

export const WALLPAPER_PRESETS: WallpaperPreset[] = RAW_WALLPAPERS.map((w) => ({
  ...w,
  svgDataUrl: w.svgDataUri,
}));

export const DEFAULT_WALLPAPER_ID: WallpaperId = 'tahoe-liquid-waves';
