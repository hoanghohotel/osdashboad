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
  svgDataUrl: string;
}

const encodeSvg = (svg: string): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;

const RAW_WALLPAPERS: Omit<WallpaperPreset, 'svgDataUrl'>[] = [
  /* 1. macOS Tahoe Liquid Glass Waves */
  {
    id: 'tahoe-liquid-waves',
    category: 'dynamic',
    name: {
      vi: 'Sóng Kính Lỏng macOS Tahoe',
      en: 'macOS Tahoe Liquid Waves',
      zh: 'macOS Tahoe 液态玻璃波浪',
    },
    subtitle: {
      vi: 'Dải sóng pha lê xanh sapphire & lục lam khúc xạ ánh sáng 3D',
      en: 'Refractive sapphire & cyan 3D liquid crystal ribbons',
      zh: '折射蓝宝石与青色 3D 液态水晶丝带',
    },
    badge: 'macOS Tahoe Official',
    resolution: '6K Vector HDR',
    accentRecommendation: 'blue',
    darkCanvas: '#040814',
    lightCanvas: '#e8f1fc',
    orb1: 'rgba(14, 165, 233, 0.34)',
    orb2: 'rgba(99, 102, 241, 0.28)',
    orb3: 'rgba(45, 212, 191, 0.24)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#030712"/>
            <stop offset="45%" stop-color="#0b1938"/>
            <stop offset="100%" stop-color="#051329"/>
          </linearGradient>
          <radialGradient id="glow1" cx="25%" cy="22%" r="55%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.58"/>
            <stop offset="50%" stop-color="#2563eb" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="glow2" cx="80%" cy="72%" r="60%">
            <stop offset="0%" stop-color="#818cf8" stop-opacity="0.52"/>
            <stop offset="55%" stop-color="#0ea5e9" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#030712" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="waveA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.82"/>
            <stop offset="50%" stop-color="#818cf8" stop-opacity="0.65"/>
            <stop offset="100%" stop-color="#2dd4bf" stop-opacity="0.8"/>
          </linearGradient>
          <linearGradient id="waveB" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0284c7" stop-opacity="0.55"/>
            <stop offset="50%" stop-color="#e0f2fe" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.6"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#bg1)"/>
        <rect width="1920" height="1080" fill="url(#glow1)"/>
        <rect width="1920" height="1080" fill="url(#glow2)"/>
        <path d="M-120,760 C340,520 680,940 1180,620 C1520,400 1760,640 2040,480 L2040,1140 L-120,1140 Z" fill="url(#waveA)" opacity="0.48"/>
        <path d="M-120,620 C260,840 780,340 1290,590 C1620,750 1820,430 2040,560 L2040,1140 L-120,1140 Z" fill="url(#waveB)" opacity="0.55"/>
        <path d="M-100,480 C420,240 860,720 1420,380 C1690,220 1860,360 2040,290" fill="none" stroke="#e0f2fe" stroke-width="3" stroke-opacity="0.42"/>
        <path d="M-100,660 C380,460 920,820 1480,510 C1720,370 1880,490 2040,420" fill="none" stroke="#7dd3fc" stroke-width="2" stroke-opacity="0.35"/>
        <circle cx="420" cy="260" r="180" fill="#38bdf8" opacity="0.16"/>
        <circle cx="1480" cy="340" r="240" fill="#818cf8" opacity="0.14"/>
      </svg>
    `),
  },

  /* 2. macOS Sequoia Sunrise Forest Ridge */
  {
    id: 'sequoia-sunrise-ridge',
    category: 'landscape',
    name: {
      vi: 'Bình Minh Rừng Thông Sequoia',
      en: 'Sequoia Sunrise Ridge',
      zh: '红杉日出山脊',
    },
    subtitle: {
      vi: 'Sương sớm vàng hổ phách & tím hoàng hôn trên đỉnh núi Sequoia',
      en: 'Golden amber & violet dawn mist over layered redwood ridges',
      zh: '金琥珀与紫罗兰晨雾笼罩层叠红杉山脉',
    },
    badge: 'macOS Sequoia',
    resolution: '6K Landscape',
    accentRecommendation: 'orange',
    darkCanvas: '#0f0716',
    lightCanvas: '#fdf2eb',
    orb1: 'rgba(249, 115, 22, 0.32)',
    orb2: 'rgba(168, 85, 247, 0.28)',
    orb3: 'rgba(236, 72, 153, 0.24)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="seqSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#140924"/>
            <stop offset="38%" stop-color="#4c1d57"/>
            <stop offset="68%" stop-color="#c2410c"/>
            <stop offset="100%" stop-color="#fbbf24"/>
          </linearGradient>
          <radialGradient id="seqSun" cx="62%" cy="54%" r="42%">
            <stop offset="0%" stop-color="#fde68a" stop-opacity="0.9"/>
            <stop offset="40%" stop-color="#f97316" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#f97316" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#seqSky)"/>
        <rect width="1920" height="1080" fill="url(#seqSun)"/>
        <path d="M0,560 L260,430 L540,520 L880,370 L1190,500 L1520,390 L1920,490 L1920,1080 L0,1080 Z" fill="#43144a" opacity="0.65"/>
        <path d="M0,670 L320,540 L690,650 L1060,490 L1440,620 L1740,520 L1920,590 L1920,1080 L0,1080 Z" fill="#2e1038" opacity="0.82"/>
        <path d="M0,780 L240,690 L580,770 L960,640 L1350,750 L1680,660 L1920,730 L1920,1080 L0,1080 Z" fill="#1b0924" opacity="0.92"/>
        <path d="M0,890 L420,810 L840,880 L1280,790 L1640,860 L1920,810 L1920,1080 L0,1080 Z" fill="#0c0412"/>
      </svg>
    `),
  },

  /* 3. macOS Sonoma Horizon Dusk */
  {
    id: 'sonoma-horizon-dusk',
    category: 'dynamic',
    name: {
      vi: 'Đồi Nho Sonoma Hoàng Hôn',
      en: 'Sonoma Vineyard Dusk',
      zh: '索诺玛暮色山丘',
    },
    subtitle: {
      vi: 'Đường cong lượn sóng màu hồng ngọc, chàm tím và cam hoàng hôn',
      en: 'Sweeping magenta, indigo, and warm sunset horizon curves',
      zh: '洋红、靛蓝与暖金交织的柔美地平线曲线',
    },
    badge: 'macOS Sonoma',
    resolution: '6K Dynamic',
    accentRecommendation: 'pink',
    darkCanvas: '#0b0719',
    lightCanvas: '#f9eef7',
    orb1: 'rgba(225, 29, 72, 0.3)',
    orb2: 'rgba(147, 51, 234, 0.28)',
    orb3: 'rgba(59, 130, 246, 0.25)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sonSky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a"/>
            <stop offset="40%" stop-color="#3b0764"/>
            <stop offset="78%" stop-color="#be185d"/>
            <stop offset="100%" stop-color="#f97316"/>
          </linearGradient>
          <linearGradient id="hill1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ec4899" stop-opacity="0.72"/>
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.75"/>
          </linearGradient>
          <linearGradient id="hill2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1e1b4b"/>
            <stop offset="60%" stop-color="#4c1d95"/>
            <stop offset="100%" stop-color="#831843"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sonSky)"/>
        <path d="M-80,520 Q540,280 1160,560 T2020,440 L2020,1080 L-80,1080 Z" fill="url(#hill1)"/>
        <path d="M-80,680 Q460,480 1040,710 T2020,610 L2020,1080 L-80,1080 Z" fill="url(#hill2)"/>
        <path d="M-80,830 Q620,660 1280,860 T2020,780 L2020,1080 L-80,1080 Z" fill="#090514" opacity="0.92"/>
      </svg>
    `),
  },

  /* 4. Arctic Aurora Borealis Fjord */
  {
    id: 'arctic-aurora-fjord',
    category: 'landscape',
    name: {
      vi: 'Cực Quang Bắc Cực Aurora',
      en: 'Arctic Aurora Fjord',
      zh: '北极极光峡湾',
    },
    subtitle: {
      vi: 'Dải cực quang xanh ngọc lục bảo & tím phản chiếu trên mặt hồ băng',
      en: 'Emerald & violet aurora ribbons mirrored over an arctic glass fjord',
      zh: '翡翠绿与紫罗兰极光倒映在冰川峡湾',
    },
    badge: 'Night HDR',
    resolution: '6K Atmos',
    accentRecommendation: 'green',
    darkCanvas: '#030d12',
    lightCanvas: '#e8fbf6',
    orb1: 'rgba(16, 185, 129, 0.34)',
    orb2: 'rgba(6, 182, 212, 0.28)',
    orb3: 'rgba(139, 92, 246, 0.25)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="aurBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#020617"/>
            <stop offset="55%" stop-color="#042f2e"/>
            <stop offset="100%" stop-color="#02171e"/>
          </linearGradient>
          <linearGradient id="aurRibbon1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0"/>
            <stop offset="30%" stop-color="#34d399" stop-opacity="0.78"/>
            <stop offset="65%" stop-color="#22d3ee" stop-opacity="0.65"/>
            <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="aurRibbon2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#a855f7" stop-opacity="0"/>
            <stop offset="40%" stop-color="#818cf8" stop-opacity="0.55"/>
            <stop offset="75%" stop-color="#10b981" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#aurBg)"/>
        <path d="M-100,280 C380,60 760,480 1280,180 C1580,20 1760,260 2020,140 L2020,520 C1720,620 1480,380 1180,520 C680,740 340,360 -100,540 Z" fill="url(#aurRibbon1)" opacity="0.75"/>
        <path d="M-100,180 C440,380 920,-20 1440,260 C1700,400 1860,180 2020,240 L2020,460 C1780,380 1620,560 1360,420 C840,140 420,520 -100,340 Z" fill="url(#aurRibbon2)" opacity="0.65"/>
        <polygon points="0,720 260,480 520,680 860,420 1220,690 1560,460 1920,700 1920,740 0,740" fill="#061621"/>
        <rect x="0" y="720" width="1920" height="360" fill="#031219" opacity="0.92"/>
        <path d="M0,740 L1920,740" stroke="#34d399" stroke-width="1.5" stroke-opacity="0.4"/>
        <ellipse cx="960" cy="890" rx="760" ry="120" fill="url(#aurRibbon1)" opacity="0.35"/>
      </svg>
    `),
  },

  /* 5. Smoked Obsidian Caustic Prism */
  {
    id: 'obsidian-caustic-prism',
    category: 'prism',
    name: {
      vi: 'Lăng Kính Đá Đen Obsidian',
      en: 'Obsidian Caustic Prism',
      zh: '黑曜石焦散棱镜',
    },
    subtitle: {
      vi: 'Kính khói đen khúc xạ tia sáng đỏ crimson, cam hổ phách & tím',
      en: 'Smoked dark crystal glass refracting crimson & amber caustic beams',
      zh: '烟熏黑水晶折射深红与琥珀焦散光束',
    },
    badge: 'Pro Studio',
    resolution: '6K Macro Glass',
    accentRecommendation: 'pink',
    darkCanvas: '#060409',
    lightCanvas: '#f8eef2',
    orb1: 'rgba(244, 63, 94, 0.34)',
    orb2: 'rgba(245, 158, 11, 0.25)',
    orb3: 'rgba(139, 92, 246, 0.28)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="caustic1" cx="72%" cy="34%" r="52%">
            <stop offset="0%" stop-color="#f43f5e" stop-opacity="0.62"/>
            <stop offset="45%" stop-color="#9333ea" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#050308" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="caustic2" cx="28%" cy="68%" r="48%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.48"/>
            <stop offset="55%" stop-color="#e11d48" stop-opacity="0.22"/>
            <stop offset="100%" stop-color="#050308" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="glassShard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
            <stop offset="50%" stop-color="#f43f5e" stop-opacity="0.08"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.02"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="#06040a"/>
        <rect width="1920" height="1080" fill="url(#caustic1)"/>
        <rect width="1920" height="1080" fill="url(#caustic2)"/>
        <polygon points="340,120 1180,-40 860,980 120,820" fill="url(#glassShard)" stroke="#ffffff" stroke-opacity="0.16" stroke-width="1.5"/>
        <polygon points="920,80 1760,240 1420,1120 680,920" fill="url(#glassShard)" stroke="#fda4af" stroke-opacity="0.2" stroke-width="1.5"/>
        <circle cx="1320" cy="360" r="280" fill="none" stroke="#fb7185" stroke-opacity="0.25" stroke-width="2"/>
        <circle cx="620" cy="680" r="340" fill="none" stroke="#fbbf24" stroke-opacity="0.18" stroke-width="1.5"/>
      </svg>
    `),
  },

  /* 6. Dolomites Alpine Mirror Lake */
  {
    id: 'dolomites-alpine-mirror',
    category: 'landscape',
    name: {
      vi: 'Hồ Ngọc Bích Núi Tuyết Dolomites',
      en: 'Dolomites Alpine Mirror',
      zh: '多洛米蒂高山镜湖',
    },
    subtitle: {
      vi: 'Đỉnh núi đá vôi phủ sương hồng phản chiếu trên hồ băng xanh ngọc',
      en: 'Alpenglow limestone peaks reflected in a turquoise alpine lake',
      zh: '朝霞映照的白云石峰倒映在碧绿高山湖泊',
    },
    badge: '8K Nature',
    resolution: '6K Photoreal Vector',
    accentRecommendation: 'blue',
    darkCanvas: '#06101b',
    lightCanvas: '#ebf6fa',
    orb1: 'rgba(56, 189, 248, 0.32)',
    orb2: 'rgba(244, 114, 182, 0.25)',
    orb3: 'rgba(20, 184, 166, 0.28)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="dolSky" x1="0%" y1="0%" x2="0%" y2="65%">
            <stop offset="0%" stop-color="#0c192c"/>
            <stop offset="55%" stop-color="#1e3a5f"/>
            <stop offset="100%" stop-color="#f472b6"/>
          </linearGradient>
          <linearGradient id="dolLake" x1="0%" y1="60%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0d9488"/>
            <stop offset="45%" stop-color="#0369a1"/>
            <stop offset="100%" stop-color="#081424"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="680" fill="url(#dolSky)"/>
        <polygon points="0,680 180,460 360,570 640,260 920,540 1180,220 1480,520 1720,340 1920,680" fill="#334155"/>
        <polygon points="640,260 760,520 920,540" fill="#fda4af" opacity="0.45"/>
        <polygon points="1180,220 1320,500 1480,520" fill="#fda4af" opacity="0.5"/>
        <rect x="0" y="680" width="1920" height="400" fill="url(#dolLake)"/>
        <polygon points="0,680 180,860 360,760 640,1020 920,790 1180,1050 1480,810 1720,940 1920,680" fill="#0f172a" opacity="0.35"/>
      </svg>
    `),
  },

  /* 7. Namib Golden Sunset Dunes */
  {
    id: 'namib-golden-dunes',
    category: 'landscape',
    name: {
      vi: 'Đồi Cát Vàng Sa Mạc Namib',
      en: 'Namib Golden Sunset Dunes',
      zh: '纳米布金色沙丘',
    },
    subtitle: {
      vi: 'Đường sống cát vàng đồng rực rỡ tương phản với bầu trời đêm chàm',
      en: 'Sculpted copper-gold desert ridges against a deep indigo twilight',
      zh: '雕塑般的铜金沙漠山脊与深邃靛蓝夜空',
    },
    badge: 'Mojave / Namib',
    resolution: '6K Desert HDR',
    accentRecommendation: 'orange',
    darkCanvas: '#120a05',
    lightCanvas: '#fcf4e8',
    orb1: 'rgba(234, 88, 12, 0.35)',
    orb2: 'rgba(245, 158, 11, 0.3)',
    orb3: 'rgba(99, 102, 241, 0.22)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="duneSky" x1="0%" y1="0%" x2="0%" y2="60%">
            <stop offset="0%" stop-color="#090d1e"/>
            <stop offset="55%" stop-color="#311042"/>
            <stop offset="100%" stop-color="#ea580c"/>
          </linearGradient>
          <linearGradient id="duneLit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fbbf24"/>
            <stop offset="50%" stop-color="#ea580c"/>
            <stop offset="100%" stop-color="#7c2d12"/>
          </linearGradient>
          <linearGradient id="duneShadow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#431407"/>
            <stop offset="100%" stop-color="#140703"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#duneSky)"/>
        <circle cx="1420" cy="310" r="110" fill="#fde68a" opacity="0.8"/>
        <path d="M-80,680 Q480,380 1120,660 L1120,1080 L-80,1080 Z" fill="url(#duneLit)"/>
        <path d="M1120,660 Q1540,820 2020,560 L2020,1080 L1120,1080 Z" fill="url(#duneShadow)"/>
        <path d="M420,1080 Q1080,520 2020,760 L2020,1080 Z" fill="url(#duneLit)" opacity="0.9"/>
        <path d="M-80,1080 Q520,740 1240,1080 Z" fill="url(#duneShadow)" opacity="0.95"/>
      </svg>
    `),
  },

  /* 8. Kyoto Misty Bamboo Zen Grove */
  {
    id: 'kyoto-misty-bamboo',
    category: 'landscape',
    name: {
      vi: 'Rừng Trúc Sương Sớm Kyoto',
      en: 'Kyoto Misty Bamboo Grove',
      zh: '京都岚山晨雾竹林',
    },
    subtitle: {
      vi: 'Ánh nắng ngọc bích xuyên qua rừng trúc Arashiyama tĩnh lặng',
      en: 'Diffused emerald & jade morning rays through tranquil bamboo stalks',
      zh: '柔和翡翠晨光穿透静谧岚山竹林',
    },
    badge: 'Zen Minimal',
    resolution: '6K Botanical',
    accentRecommendation: 'green',
    darkCanvas: '#04120c',
    lightCanvas: '#edf9f2',
    orb1: 'rgba(16, 185, 129, 0.34)',
    orb2: 'rgba(52, 211, 153, 0.26)',
    orb3: 'rgba(20, 184, 166, 0.24)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bamBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#02140d"/>
            <stop offset="50%" stop-color="#064e3b"/>
            <stop offset="100%" stop-color="#022c22"/>
          </linearGradient>
          <radialGradient id="bamMist" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stop-color="#6ee7b7" stop-opacity="0.45"/>
            <stop offset="60%" stop-color="#10b981" stop-opacity="0.15"/>
            <stop offset="100%" stop-color="#022c22" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#bamBg)"/>
        <rect width="1920" height="1080" fill="url(#bamMist)"/>
        <g stroke="#34d399" stroke-opacity="0.28">
          <rect x="180" y="0" width="22" height="1080" fill="#042f2e"/>
          <rect x="340" y="0" width="16" height="1080" fill="#065f46" opacity="0.7"/>
          <rect x="580" y="0" width="28" height="1080" fill="#042f2e"/>
          <rect x="820" y="0" width="18" height="1080" fill="#065f46" opacity="0.6"/>
          <rect x="1140" y="0" width="26" height="1080" fill="#042f2e"/>
          <rect x="1390" y="0" width="20" height="1080" fill="#065f46" opacity="0.75"/>
          <rect x="1660" y="0" width="30" height="1080" fill="#042f2e"/>
        </g>
        <polygon points="400,0 780,0 1320,1080 860,1080" fill="#a7f3d0" opacity="0.09"/>
        <polygon points="900,0 1240,0 1760,1080 1380,1080" fill="#6ee7b7" opacity="0.08"/>
      </svg>
    `),
  },

  /* 9. Bioluminescent Deep Ocean Reef */
  {
    id: 'bioluminescent-abyss',
    category: 'dynamic',
    name: {
      vi: 'Đại Dương Phát Quang Sinh Học',
      en: 'Bioluminescent Midnight Shore',
      zh: '荧光深海夜岸',
    },
    subtitle: {
      vi: 'Sóng biển phát sáng xanh neon dưới dải ngân hà đêm huyền ảo',
      en: 'Glowing electric cyan ocean surf beneath a starry Milky Way sky',
      zh: '璀璨银河下闪烁电光青色的荧光海浪',
    },
    badge: 'Spatial Glow',
    resolution: '6K Night Sea',
    accentRecommendation: 'blue',
    darkCanvas: '#020714',
    lightCanvas: '#e6f6ff',
    orb1: 'rgba(6, 182, 212, 0.38)',
    orb2: 'rgba(59, 130, 246, 0.32)',
    orb3: 'rgba(168, 85, 247, 0.26)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="seaSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#02040d"/>
            <stop offset="50%" stop-color="#0a1936"/>
            <stop offset="100%" stop-color="#030917"/>
          </linearGradient>
          <radialGradient id="milky" cx="55%" cy="24%" r="55%">
            <stop offset="0%" stop-color="#818cf8" stop-opacity="0.38"/>
            <stop offset="50%" stop-color="#0ea5e9" stop-opacity="0.16"/>
            <stop offset="100%" stop-color="#02040d" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="bioWave" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.15"/>
            <stop offset="50%" stop-color="#22d3ee" stop-opacity="0.9"/>
            <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2"/>
          </linearGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#seaSky)"/>
        <rect width="1920" height="1080" fill="url(#milky)"/>
        <path d="M-80,680 Q480,620 960,690 T2000,660 L2000,1080 L-80,1080 Z" fill="#041026"/>
        <path d="M-60,710 Q520,640 1020,730 T1980,700" fill="none" stroke="url(#bioWave)" stroke-width="8"/>
        <path d="M-60,810 Q620,730 1160,840 T1980,790" fill="none" stroke="url(#bioWave)" stroke-width="12" opacity="0.85"/>
        <path d="M-60,930 Q440,860 1080,960 T1980,910" fill="none" stroke="url(#bioWave)" stroke-width="6" opacity="0.65"/>
      </svg>
    `),
  },

  /* 10. Iridescent Pearl & Alabaster Sculpture (visionOS Spatial Light) */
  {
    id: 'iridescent-pearl-studio',
    category: 'prism',
    name: {
      vi: 'Điêu Khắc Ngọc Trai visionOS',
      en: 'Iridescent Pearl Spatial Studio',
      zh: 'visionOS 虹彩珍珠雕塑',
    },
    subtitle: {
      vi: 'Dải lụa ngọc trai óng ánh sắc tím pastel, xanh băng và vàng champagne',
      en: 'Flowing mother-of-pearl ribbons in pastel lavender, ice blue & champagne',
      zh: '薰衣草紫、冰蓝与香槟金交织的珍珠母贝丝带',
    },
    badge: 'visionOS 2',
    resolution: '6K Spatial Silk',
    accentRecommendation: 'purple',
    darkCanvas: '#0e101a',
    lightCanvas: '#f6f5fb',
    orb1: 'rgba(167, 139, 250, 0.34)',
    orb2: 'rgba(56, 189, 248, 0.3)',
    orb3: 'rgba(244, 114, 182, 0.26)',
    svgDataUri: encodeSvg(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pearlBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#131629"/>
            <stop offset="50%" stop-color="#1e1b4b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <radialGradient id="pearl1" cx="30%" cy="35%" r="55%">
            <stop offset="0%" stop-color="#c4b5fd" stop-opacity="0.65"/>
            <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="pearl2" cx="74%" cy="62%" r="55%">
            <stop offset="0%" stop-color="#fbcfe8" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="#fde68a" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#pearlBg)"/>
        <rect width="1920" height="1080" fill="url(#pearl1)"/>
        <rect width="1920" height="1080" fill="url(#pearl2)"/>
        <path d="M-100,320 C420,680 860,40 1380,440 C1660,640 1840,280 2040,420 L2040,1080 L-100,1080 Z" fill="#ffffff" opacity="0.1"/>
        <path d="M-100,580 C360,280 940,820 1460,460 C1740,260 1890,540 2040,480 L2040,1080 L-100,1080 Z" fill="#e0e7ff" opacity="0.12"/>
      </svg>
    `),
  },
];

export const WALLPAPER_PRESETS: WallpaperPreset[] = RAW_WALLPAPERS.map((wp) => ({
  ...wp,
  svgDataUrl: wp.svgDataUri,
}));
