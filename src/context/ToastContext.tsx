import React, { createContext, useCallback, useContext, useState } from 'react';
import { FaIcon } from '../components/ui/liquid-shadcn';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'success' | 'info' | 'warning';
}

interface ToastContextValue {
  addToast: (title: string, description?: string, variant?: 'success' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (title: string, description?: string, variant: 'success' | 'info' | 'warning' = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setToasts((prev) => [...prev.slice(-3), { id, title, description, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== id));
      }, 3800);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* macOS Sonner-inspired Liquid Glass Notification Stack */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="glass-floating pointer-events-auto rounded-2xl p-3.5 flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="mt-0.5 shrink-0">
              {toast.variant === 'warning' ? (
                <FaIcon icon="fa-solid fa-triangle-exclamation" className="text-amber-500 text-sm" />
              ) : toast.variant === 'info' ? (
                <FaIcon
                  icon="fa-solid fa-circle-info"
                  className="text-sm"
                  style={{ color: 'var(--accent-primary)' }}
                />
              ) : (
                <FaIcon icon="fa-solid fa-circle-check" className="text-emerald-500 text-sm" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-1 rounded-lg transition-colors cursor-pointer"
            >
              <FaIcon icon="fa-solid fa-xmark" className="text-xs" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
