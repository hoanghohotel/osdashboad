import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button, FaIcon } from './ui/liquid-shadcn';

export interface AuthenticatedUser {
  name: string;
  email: string;
  role: string;
  initials: string;
}

interface LoginScreenProps {
  onSuccessLogin: (user: AuthenticatedUser) => void;
}

// This public workspace demonstrates the UI; it does not authenticate users.
export const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccessLogin }) => {
  const { language } = useLanguage();
  const copy = language === 'vi' ? {
    label: 'KHÔNG GIAN QUẢN TRỊ', title: 'Mọi hoạt động. Một góc nhìn.',
    description: 'Theo dõi doanh thu, đơn hàng và hiệu quả kinh doanh trong một không gian làm việc rõ ràng.',
    enter: 'Khám phá dashboard', demo: 'Bản trải nghiệm · Dữ liệu mẫu',
    note: 'Không cần tài khoản. Thay đổi trong bản demo sẽ được đặt lại khi tải lại trang.',
    features: ['Tổng quan kinh doanh', 'Quản lý đơn hàng', 'Báo cáo trực quan'],
  } : language === 'zh' ? {
    label: '管理工作空间', title: '业务全貌，一目了然。',
    description: '在清晰的工作空间中查看收入、订单和业务表现。',
    enter: '体验仪表盘', demo: '体验版 · 示例数据',
    note: '无需账号。刷新页面后，演示中的更改将重置。',
    features: ['业务概览', '订单管理', '可视化报表'],
  } : {
    label: 'BUSINESS WORKSPACE', title: 'Your business. In focus.',
    description: 'A clear view of revenue, orders and performance, with room to focus on what comes next.',
    enter: 'Explore dashboard', demo: 'Interactive demo · Sample data',
    note: 'No account required. Demo changes reset when you reload the page.',
    features: ['Business overview', 'Order management', 'Visual reports'],
  };
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-5 sm:p-10">
      <section className="w-full max-w-5xl grid md:grid-cols-2 overflow-hidden rounded-3xl border border-[var(--glass-border)] bg-[var(--glass-secondary-bg)] shadow-xl">
        <div className="p-8 sm:p-12 flex flex-col justify-between gap-12 bg-[var(--accent-soft)]">
          <div className="flex items-center gap-3 font-semibold text-lg"><span className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] text-white grid place-items-center"><FaIcon icon="fa-solid fa-layer-group" /></span>AuraOS</div>
          <div><p className="text-xs font-semibold tracking-widest text-[var(--accent-primary)] mb-4">{copy.label}</p><h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">{copy.title}</h1><p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)]">{copy.description}</p></div>
          <ul className="space-y-3 text-sm text-[var(--text-secondary)]">{copy.features.map(feature => <li key={feature} className="flex items-center gap-3"><FaIcon icon="fa-solid fa-check" className="text-[var(--accent-primary)]" />{feature}</li>)}</ul>
        </div>
        <div className="p-8 sm:p-12 flex flex-col justify-center gap-6">
          <span className="text-xs font-medium text-[var(--accent-primary)]">{copy.demo}</span>
          <h2 className="text-2xl font-semibold">{copy.enter}</h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{copy.note}</p>
          <Button className="w-full min-h-12" onClick={() => onSuccessLogin({name: 'Minh Nguyen', email: 'minh.nguyen@auraos.io', role: 'Demo operator', initials: 'MN'})}>{copy.enter}<FaIcon icon="fa-solid fa-arrow-right" /></Button>
        </div>
      </section>
    </main>
  );
};
