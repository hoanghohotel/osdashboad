import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Avatar, Button, Checkbox, FaIcon, Input, Label } from './ui/liquid-shadcn';

export interface AuthenticatedUser {
  name: string;
  email: string;
  role: string;
  initials: string;
}

export type OAuthProviderId =
  | 'apple'
  | 'google'
  | 'github'
  | 'x'
  | 'facebook'
  | 'passkey'
  | 'credentials';

interface LoginScreenProps {
  onSuccessLogin: (user: AuthenticatedUser) => void;
}

const DEMO_OPERATORS: AuthenticatedUser[] = [
  {
    name: 'Minh Nguyen',
    email: 'minh.nguyen@auraos.io',
    role: 'Executive Owner',
    initials: 'MN',
  },
  {
    name: 'Claire Vance',
    email: 'claire.vance@auraos.io',
    role: 'Global Operations Admin',
    initials: 'CV',
  },
  {
    name: 'Sora Takahashi',
    email: 'sora.takahashi@auraos.io',
    role: 'Revenue Intelligence Lead',
    initials: 'ST',
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccessLogin }) => {
  const { mode } = useTheme();
  const { t } = useLanguage();

  const [selectedOperator, setSelectedOperator] = useState<AuthenticatedUser>(DEMO_OPERATORS[0]);
  const [authTab, setAuthTab] = useState<'sso' | 'credentials'>('sso');
  const [email, setEmail] = useState(DEMO_OPERATORS[0].email);
  const [password, setPassword] = useState('auraos-executive-2026');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [authProviderLoading, setAuthProviderLoading] = useState<OAuthProviderId | null>(null);

  // macos-web BootupScreen state (runs before LoginScreen is interactive)
  const [bootProgress, setBootProgress] = useState<number>(0);
  const [bootFadingOut, setBootFadingOut] = useState<boolean>(false);
  const [bootHidden, setBootHidden] = useState<boolean>(false);

  React.useEffect(() => {
    setBootProgress(0);
    setBootFadingOut(false);
    setBootHidden(false);

    // Realistic macOS boot progress sequence inspired by taxvui/macos-web
    const t1 = window.setTimeout(() => setBootProgress(18), 120);
    const t2 = window.setTimeout(() => setBootProgress(46), 520);
    const t3 = window.setTimeout(() => setBootProgress(78), 1050);
    const t4 = window.setTimeout(() => setBootProgress(100), 1550);
    const t5 = window.setTimeout(() => setBootFadingOut(true), 1950);
    const t6 = window.setTimeout(() => setBootHidden(true), 2450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
      window.clearTimeout(t6);
    };
  }, []);

  const triggerSignIn = (user: AuthenticatedUser, provider: OAuthProviderId = 'apple') => {
    setErrorMsg('');
    setAuthProviderLoading(provider);
    setTimeout(() => {
      setAuthProviderLoading(null);
      onSuccessLogin(user);
    }, 340);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.trim().length < 4) {
      setErrorMsg(t.login.invalidError);
      return;
    }
    const matched = DEMO_OPERATORS.find(
      (op) => op.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (matched) {
      triggerSignIn(matched, 'credentials');
    } else {
      const namePart = email.split('@')[0].replace(/[._-]/g, ' ');
      const formattedName = namePart
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      const initials = formattedName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      triggerSignIn(
        {
          name: formattedName || 'Minh Nguyen',
          email: email.trim(),
          role: 'Workspace Operator',
          initials: initials || 'AU',
        },
        'credentials'
      );
    }
  };

  const isAuthenticating = authProviderLoading !== null;

  // Shared Liquid Glass interactive surface factory with subtle optical refraction tinting
  const getOAuthPillStyle = (tintRgbaDark: string, tintRgbaLight: string): React.CSSProperties => ({
    background:
      mode === 'dark'
        ? `radial-gradient(90% 120% at 85% 100%, ${tintRgbaDark} 0%, transparent 70%), linear-gradient(135deg, rgba(255, 255, 255, 0.11) 0%, rgba(255, 255, 255, 0.025) 52%, rgba(255, 255, 255, 0.06) 100%)`
        : `radial-gradient(90% 120% at 85% 100%, ${tintRgbaLight} 0%, transparent 70%), linear-gradient(135deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.18) 52%, rgba(255, 255, 255, 0.3) 100%)`,
    backdropFilter: 'blur(32px) saturate(210%)',
    WebkitBackdropFilter: 'blur(32px) saturate(210%)',
  });

  return (
    <div className="relative flex-1 min-h-screen w-full flex items-center justify-center overflow-hidden select-none">
      {/* macOS Bootup Loading Screen (referenced from taxvui/macos-web BootupScreen.svelte) */}
      {!bootHidden && (
        <div
          aria-label="macOS Boot Loading Screen"
          className={`fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center gap-9 select-none transition-opacity duration-500 ease-out ${
            bootFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 cursor-none'
          }`}
        >
          {/* Authentic Crisp White Apple Boot Logo */}
          <svg
            className="w-20 h-20 sm:w-24 sm:h-24 text-white fill-current drop-shadow-[0_0_24px_rgba(255,255,255,0.18)]"
            viewBox="0 0 170 170"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.83-11.77-14.4-5.93-9.19-10.76-19.65-14.49-31.38-3.73-11.73-5.6-22.71-5.6-32.94 0-12.42 3.11-22.76 9.33-31.02 6.22-8.26 14.07-12.56 23.54-12.89 4.92 0 10.42 1.51 16.51 4.53 6.08 3.02 9.99 4.58 11.73 4.69 1.34 0 5.64-1.82 12.9-5.45 7.26-3.63 13.39-5.17 18.39-4.61 13.63 1.1 23.86 6.48 30.67 16.14-12.18 7.38-18.11 17.66-17.78 30.85.33 10.29 4.19 18.86 11.57 25.71 5.14 4.81 11.18 7.66 18.11 8.55-1.45 4.47-3.13 8.87-5.04 13.21zM119.22 31.01c0 8.06-2.94 15.61-8.82 22.66-7.08 8.28-15.64 13.06-24.91 12.3-.17-.95-.26-1.96-.26-3.02 0-7.72 3.36-15.99 9.33-22.86 2.98-3.42 6.77-6.26 11.37-8.52 4.6-2.26 8.95-3.51 13.05-3.75.16 1.07.24 2.13.24 3.19z" />
          </svg>

          {/* macos-web Progress Bar Track & Indicator */}
          <div className="w-44 sm:w-48 h-[4.5px] rounded-full bg-[#3a3a3c] overflow-hidden shadow-[inset_0_0.5px_1px_rgba(0,0,0,0.8)]">
            <div
              className="w-full h-full bg-white rounded-full transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${100 - bootProgress}%)`,
              }}
            />
          </div>
        </div>
      )}

      {/* Dramatic 3D Chromatic Ribbon Backdrop layered softly over active Wallpaper */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              mode === 'dark'
                ? 'radial-gradient(circle at 50% 45%, rgba(225, 29, 72, 0.18), rgba(147, 51, 234, 0.12) 38%, transparent 75%)'
                : 'radial-gradient(circle at 50% 45%, rgba(56, 189, 248, 0.18), rgba(168, 85, 247, 0.12) 42%, transparent 78%)',
          }}
        />

        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="ribbonOuter"
              x1="120"
              y1="40"
              x2="1320"
              y2="860"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor={mode === 'dark' ? '#ff2d55' : '#38bdf8'} />
              <stop offset="28%" stopColor={mode === 'dark' ? '#fde047' : '#818cf8'} />
              <stop offset="56%" stopColor={mode === 'dark' ? '#ec4899' : '#c084fc'} />
              <stop offset="82%" stopColor={mode === 'dark' ? '#a855f7' : '#f472b6'} />
              <stop offset="100%" stopColor={mode === 'dark' ? '#fb923c' : '#60a5fa'} />
            </linearGradient>

            <linearGradient
              id="ribbonCore"
              x1="250"
              y1="800"
              x2="1150"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor={mode === 'dark' ? '#f43f5e' : '#6366f1'}
                stopOpacity="0.9"
              />
              <stop
                offset="45%"
                stopColor={mode === 'dark' ? '#1e1b4b' : '#ffffff'}
                stopOpacity="0.85"
              />
              <stop
                offset="75%"
                stopColor={mode === 'dark' ? '#fbbf24' : '#38bdf8'}
                stopOpacity="0.95"
              />
              <stop
                offset="100%"
                stopColor={mode === 'dark' ? '#e11d48' : '#a855f7'}
                stopOpacity="0.9"
              />
            </linearGradient>

            <filter id="ribbonBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="14" />
            </filter>
          </defs>

          <path
            d="M160 940 C 190 460, 220 30, 560 50 C 890 70, 1180 480, 1490 880"
            stroke="url(#ribbonOuter)"
            strokeWidth="150"
            strokeLinecap="round"
            filter="url(#ribbonBlur)"
            opacity={mode === 'dark' ? 0.85 : 0.65}
          />

          <path
            d="M140 960 C 175 490, 235 55, 555 68 C 875 82, 1145 500, 1460 910"
            stroke="url(#ribbonCore)"
            strokeWidth="86"
            strokeLinecap="round"
            opacity={mode === 'dark' ? 0.92 : 0.78}
          />

          <path
            d="M195 930 C 225 460, 265 42, 575 56 C 895 70, 1175 480, 1480 885"
            stroke="#ffffff"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#ribbonBlur)"
            opacity={mode === 'dark' ? 0.75 : 0.9}
          />
        </svg>
      </div>

      {/* Center Refractive Liquid Glass Authentication Card (Full Screen — No Header, No Dock) */}
      <main className="relative z-20 w-full flex items-center justify-center p-4 sm:p-6">
        <div
          className="w-full max-w-[450px] rounded-[34px] p-6 sm:p-8 transition-all duration-300 relative overflow-hidden"
          style={{
            background:
              mode === 'dark'
                ? 'linear-gradient(155deg, rgba(24, 16, 36, 0.58) 0%, rgba(12, 10, 20, 0.76) 100%)'
                : 'linear-gradient(155deg, rgba(255, 255, 255, 0.76) 0%, rgba(242, 246, 255, 0.62) 100%)',
            backdropFilter: 'blur(32px) saturate(210%)',
            WebkitBackdropFilter: 'blur(32px) saturate(210%)',
            boxShadow:
              mode === 'dark'
                ? 'inset 0 1.5px 2px rgba(255, 255, 255, 0.35), inset 0 -1.5px 3px rgba(244, 63, 94, 0.28), 0 32px 72px -12px rgba(0, 0, 0, 0.78)'
                : 'inset 0 2px 3px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(99, 102, 241, 0.16), 0 28px 64px -12px rgba(15, 23, 42, 0.18)',
            border:
              mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.22)'
                : '1px solid rgba(255, 255, 255, 0.85)',
          }}
        >
          {/* Specular Top-Right Edge Caustic Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-70"
            style={{
              background:
                mode === 'dark'
                  ? 'radial-gradient(circle, rgba(253, 224, 71, 0.55) 0%, rgba(244, 63, 94, 0.25) 50%, transparent 72%)'
                  : 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(56, 189, 248, 0.35) 55%, transparent 75%)',
              filter: 'blur(16px)',
            }}
          />

          {/* Top Bar inside Glass Card: macOS Window Dots + Auth Mode Switch */}
          <div className="flex items-center justify-between mb-5 relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/10" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/10" />
              <span className="w-3 h-3 rounded-full bg-[#28c840] border border-black/10" />
            </div>

            <div className="liquid-pill-group">
              <button
                type="button"
                onClick={() => setAuthTab('sso')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  authTab === 'sso'
                    ? 'liquid-btn-primary text-white'
                    : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                OAuth / Passkey
              </button>
              <button
                type="button"
                onClick={() => setAuthTab('credentials')}
                className={`px-3.5 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  authTab === 'credentials'
                    ? 'liquid-btn-primary text-white'
                    : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Email
              </button>
            </div>
          </div>

          {/* Brand Header */}
          <div className="text-center space-y-1 mb-5 relative z-10">
            <div
              data-active="true"
              className="liquid-dock-icon w-11 h-11 mx-auto mb-2.5 flex items-center justify-center"
              style={
                {
                  '--dock-tint': 'rgba(56, 189, 248, 0.32)',
                  '--dock-glow': 'rgba(56, 189, 248, 0.42)',
                } as React.CSSProperties
              }
            >
              <FaIcon
                icon="fa-solid fa-layer-group"
                className="text-base text-[var(--accent-primary)] relative z-10"
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              {t.login.welcomeBack}
            </h1>
            <p className="text-xs text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
              {t.login.subtitle}
            </p>
          </div>

          {/* Stylized Liquid Glass OAuth Buttons: Apple + Icon-Only Facebook, Google, X, GitHub */}
          <div className="space-y-3 relative z-10">
            {/* Primary Full-Width Apple OAuth Liquid Glass Capsule */}
            <button
              type="button"
              disabled={isAuthenticating}
              onClick={() => triggerSignIn(selectedOperator, 'apple')}
              style={getOAuthPillStyle('rgba(244, 63, 94, 0.16)', 'rgba(244, 63, 94, 0.12)')}
              className="liquid-btn-caustic w-full py-3 px-4 rounded-full flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.015] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <FaIcon icon="fa-brands fa-apple" className="text-base shrink-0" />
              <span className="truncate">
                {authProviderLoading === 'apple' ? 'Apple ID...' : t.login.signInWithApple}
              </span>
            </button>

            {/* Icon-Only Liquid Glass Row: Facebook, Google, X, GitHub (No text labels) */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* Facebook Icon-Only OAuth Button */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerSignIn(selectedOperator, 'facebook')}
                title={t.login.signInWithFacebook}
                aria-label={t.login.signInWithFacebook}
                style={getOAuthPillStyle('rgba(59, 130, 246, 0.18)', 'rgba(59, 130, 246, 0.14)')}
                className="liquid-btn-caustic h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
              >
                {authProviderLoading === 'facebook' ? (
                  <FaIcon icon="fa-solid fa-circle-notch" className="fa-spin text-sm" />
                ) : (
                  <FaIcon icon="fa-brands fa-facebook" className="text-[#1877F2] text-lg" />
                )}
              </button>

              {/* Google Icon-Only OAuth Button */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerSignIn(selectedOperator, 'google')}
                title={t.login.signInWithGoogle}
                aria-label={t.login.signInWithGoogle}
                style={getOAuthPillStyle('rgba(56, 189, 248, 0.18)', 'rgba(56, 189, 248, 0.14)')}
                className="liquid-btn-caustic h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
              >
                {authProviderLoading === 'google' ? (
                  <FaIcon icon="fa-solid fa-circle-notch" className="fa-spin text-sm" />
                ) : (
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
                    />
                  </svg>
                )}
              </button>

              {/* X (Twitter) Icon-Only OAuth Button */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerSignIn(selectedOperator, 'x')}
                title={t.login.signInWithX}
                aria-label={t.login.signInWithX}
                style={getOAuthPillStyle('rgba(168, 85, 247, 0.16)', 'rgba(168, 85, 247, 0.12)')}
                className="liquid-btn-caustic h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
              >
                {authProviderLoading === 'x' ? (
                  <FaIcon icon="fa-solid fa-circle-notch" className="fa-spin text-sm" />
                ) : (
                  <FaIcon icon="fa-brands fa-x-twitter" className="text-[17px]" />
                )}
              </button>

              {/* GitHub Icon-Only OAuth Button */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerSignIn(selectedOperator, 'github')}
                title={t.login.signInWithGithub}
                aria-label={t.login.signInWithGithub}
                style={getOAuthPillStyle('rgba(99, 102, 241, 0.18)', 'rgba(99, 102, 241, 0.14)')}
                className="liquid-btn-caustic h-11 rounded-full flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.04] active:scale-[0.96] cursor-pointer"
              >
                {authProviderLoading === 'github' ? (
                  <FaIcon icon="fa-solid fa-circle-notch" className="fa-spin text-sm" />
                ) : (
                  <FaIcon icon="fa-brands fa-github" className="text-lg" />
                )}
              </button>
            </div>
          </div>

          {authTab === 'sso' ? (
            <div className="space-y-4 mt-4 relative z-10">
              {/* Touch ID / Passkey Secondary Pill */}
              <button
                type="button"
                disabled={isAuthenticating}
                onClick={() => triggerSignIn(selectedOperator, 'passkey')}
                className="w-full py-2.5 px-5 rounded-full liquid-btn flex items-center justify-between text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <FaIcon icon="fa-solid fa-fingerprint" className="text-[var(--accent-primary)]" />
                  <span>
                    {t.login.signInWithPasskey} · <strong>{selectedOperator.name}</strong>
                  </span>
                </span>
                <FaIcon icon="fa-solid fa-arrow-right" className="text-[11px] text-[var(--text-muted)]" />
              </button>

              {/* Operator Selector Strip — Avatar Icons Only */}
              <div className="pt-3.5 border-t border-[var(--glass-border)]">
                <p className="text-[11px] font-medium text-[var(--text-muted)] mb-2.5 text-center">
                  {t.login.switchAccount}
                </p>
                <div className="flex items-center justify-center gap-4">
                  {DEMO_OPERATORS.map((op) => {
                    const active = selectedOperator.email === op.email;
                    return (
                      <button
                        key={op.email}
                        type="button"
                        onClick={() => {
                          setSelectedOperator(op);
                          setEmail(op.email);
                        }}
                        title={`${op.name} · ${op.role}`}
                        aria-label={`${op.name} · ${op.role}`}
                        className={`relative p-1 rounded-full transition-all duration-200 cursor-pointer ${
                          active
                            ? 'ring-2 ring-[var(--accent-primary)] scale-110 shadow-[0_0_20px_var(--accent-glow)]'
                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <Avatar initials={op.initials} size="md" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Mode 2: Email & Password Credentials Form */
            <form
              onSubmit={handleFormSubmit}
              className="space-y-3.5 mt-4 pt-3 border-t border-[var(--glass-border)] relative z-10"
            >
              {errorMsg && (
                <p className="text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <div>
                <Label>{t.login.emailLabel}</Label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftFaIcon="fa-regular fa-envelope"
                  placeholder={t.login.emailPlaceholder}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <Label className="mb-0">{t.login.passwordLabel}</Label>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(DEMO_OPERATORS[0].email);
                      setPassword('auraos-executive-2026');
                    }}
                    className="text-[11px] text-[var(--accent-primary)] hover:underline cursor-pointer"
                  >
                    {t.login.demoFill}
                  </button>
                </div>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftFaIcon="fa-solid fa-key"
                  placeholder={t.login.passwordPlaceholder}
                />
              </div>

              <div className="pt-0.5">
                <Checkbox
                  checked={rememberDevice}
                  onCheckedChange={setRememberDevice}
                  label={t.login.rememberDevice}
                />
              </div>

              <Button
                type="submit"
                variant="default"
                disabled={isAuthenticating}
                className="w-full rounded-full"
              >
                <FaIcon icon="fa-solid fa-lock" />
                <span>
                  {authProviderLoading === 'credentials' ? '...' : t.login.signInButton}
                </span>
              </Button>
            </form>
          )}

          {/* Footer Security Caption */}
          <div className="mt-5 pt-3.5 border-t border-[var(--glass-border)] flex items-center justify-center gap-1.5 text-[11px] text-[var(--text-muted)] relative z-10">
            <FaIcon icon="fa-solid fa-shield-halved" className="text-emerald-500 shrink-0" />
            <span className="truncate">{t.login.securityNote}</span>
          </div>
        </div>
      </main>
    </div>
  );
};
