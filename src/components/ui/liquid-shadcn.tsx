import React, { createContext, useContext, useState } from 'react';

/* ============================================================================
 * 1. Font Awesome Icon Primitive (<FaIcon />)
 * ========================================================================== */
export interface FaIconProps extends React.HTMLAttributes<HTMLElement> {
  icon: string;
  fixedWidth?: boolean;
}

export const FaIcon: React.FC<FaIconProps> = ({
  icon,
  fixedWidth = true,
  className = '',
  ...rest
}) => (
  <i
    aria-hidden="true"
    className={`${icon} ${fixedWidth ? 'fa-fw' : ''} ${className}`.trim()}
    {...rest}
  />
);

/* ============================================================================
 * 2. Complete shadcn/ui Liquid Glass Button System
 *    (<Button />, <ButtonGroup />, <Toggle />, <ToggleGroup />, <Kbd />)
 * ========================================================================== */
export type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'glass-pill'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl' | 'icon-sm' | 'icon' | 'icon-lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftFaIcon?: string;
  rightFaIcon?: string;
  kbd?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      loading = false,
      leftFaIcon,
      rightFaIcon,
      kbd,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses: Record<ButtonVariant, string> = {
      default: 'liquid-btn-primary text-white font-semibold',
      secondary:
        'liquid-btn text-[var(--text-primary)] font-semibold hover:text-[var(--text-primary)]',
      outline:
        'liquid-btn-outline text-[var(--text-primary)] font-semibold',
      ghost:
        'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium',
      destructive:
        'liquid-btn-destructive text-white font-semibold',
      success:
        'liquid-btn-success text-white font-semibold',
      warning:
        'liquid-btn-warning text-slate-950 font-semibold',
      'glass-pill':
        'liquid-btn-caustic text-[var(--text-primary)] font-semibold',
      link: 'bg-transparent text-[var(--accent-primary)] underline-offset-4 hover:underline font-semibold px-0!',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      xs: 'h-7 px-3 text-[11px] rounded-full gap-1.5',
      sm: 'h-8.5 px-3.5 text-xs rounded-full gap-1.5',
      default: 'h-9.5 px-4.5 py-2 text-xs rounded-full gap-2',
      lg: 'h-11 px-5.5 text-sm rounded-full gap-2.5',
      xl: 'h-12 px-6.5 text-sm rounded-full gap-3',
      'icon-sm': 'h-7.5 w-7.5 p-0 rounded-full justify-center',
      icon: 'h-9.5 w-9.5 p-0 rounded-full justify-center',
      'icon-lg': 'h-11 w-11 p-0 rounded-full justify-center',
    };

    return (
      <button
        ref={ref}
        type={props.type || 'button'}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:pointer-events-none disabled:opacity-45 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {loading && <FaIcon icon="fa-solid fa-circle-notch" className="fa-spin text-xs" />}
        {!loading && leftFaIcon && <FaIcon icon={leftFaIcon} />}
        {children}
        {!loading && rightFaIcon && <FaIcon icon={rightFaIcon} />}
        {kbd && (
          <kbd className="ml-1 px-1.5 py-0.5 text-[10px] font-mono-tabular rounded-full bg-black/15 dark:bg-white/15 border border-white/20 text-current opacity-90">
            {kbd}
          </kbd>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export const ButtonGroup: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = '', children }) => (
  <div
    role="group"
    className={`liquid-pill-group ${className}`}
  >
    {children}
  </div>
);

export const Toggle: React.FC<{
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
  size?: 'sm' | 'default' | 'lg';
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ pressed, onPressedChange, size = 'default', ariaLabel, className = '', children }) => {
  const sz =
    size === 'sm'
      ? 'h-8 px-3 text-xs'
      : size === 'lg'
      ? 'h-10.5 px-4.5 text-sm'
      : 'h-9 px-3.5 text-xs';
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={ariaLabel}
      onClick={() => onPressedChange(!pressed)}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all cursor-pointer active:scale-95 ${sz} ${
        pressed
          ? 'liquid-btn-primary text-white'
          : 'liquid-btn text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const Kbd: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <kbd
    className={`pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-md border border-[var(--glass-border-strong)] bg-[var(--glass-subtle-bg)] px-1.5 font-mono-tabular text-[10px] font-medium text-[var(--text-secondary)] shadow-2xs ${className}`}
  >
    {children}
  </kbd>
);

export const Badge: React.FC<{
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive';
  className?: string;
  children: React.ReactNode;
}> = ({ variant = 'default', className = '', children }) => {
  const styles = {
    default: 'bg-[var(--accent-soft)] text-[var(--accent-primary)] border border-[var(--accent-border)]',
    secondary: 'glass-interactive text-[var(--text-secondary)]',
    outline: 'border border-[var(--glass-border-strong)] text-[var(--text-primary)]',
    success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30',
    destructive: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-0.5 text-[11px] font-mono-tabular font-semibold transition-colors ${styles} ${className}`}
    >
      {children}
    </span>
  );
};

/* ============================================================================
 * 3. shadcn/ui Liquid Glass Card Anatomy
 * ========================================================================== */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glassVariant?: 'primary' | 'secondary' | 'floating' | 'interactive';
  interactiveHover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      glassVariant = 'secondary',
      interactiveHover = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const surface =
      glassVariant === 'primary'
        ? 'glass-primary'
        : glassVariant === 'floating'
        ? 'glass-floating'
        : glassVariant === 'interactive'
        ? 'glass-interactive'
        : 'glass-secondary';

    const hover = interactiveHover ? 'glass-secondary-interactive' : '';

    return (
      <div
        ref={ref}
        className={`${surface} ${hover} rounded-2xl text-[var(--text-primary)] ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`flex flex-col space-y-1 p-5 sm:p-6 border-b border-[var(--glass-border)] ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <h3
    className={`text-sm sm:text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)] ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p className={`text-xs text-[var(--text-secondary)] leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`p-5 sm:p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`flex items-center justify-between px-5 sm:px-6 py-4 border-t border-[var(--glass-border)] ${className}`}
    {...props}
  >
    {children}
  </div>
);

/* ============================================================================
 * 4. shadcn/ui Input, Textarea, Label, Select & RadioGroup
 * ========================================================================== */
export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <label
    className={`block text-xs font-medium leading-none text-[var(--text-secondary)] select-none mb-1.5 ${className}`}
    {...props}
  >
    {children}
  </label>
);

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftFaIcon?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', leftFaIcon, ...props }, ref) => {
    if (leftFaIcon) {
      return (
        <div className="relative w-full">
          <FaIcon
            icon={leftFaIcon}
            className="text-xs text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
          <input
            ref={ref}
            className={`flex h-9 w-full rounded-xl glass-interactive pl-8 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            {...props}
          />
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={`flex h-9 w-full rounded-xl glass-interactive px-3 py-1.5 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', ...props }, ref) => (
  <textarea
    ref={ref}
    className={`flex min-h-[84px] w-full rounded-xl glass-interactive px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export const RadioGroup: React.FC<{
  value: string;
  onValueChange: (val: string) => void;
  options: { value: string; label: string; description?: string }[];
  className?: string;
}> = ({ value, onValueChange, options, className = '' }) => (
  <div role="radiogroup" className={`space-y-2 ${className}`}>
    {options.map((opt) => {
      const checked = value === opt.value;
      return (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={checked}
          onClick={() => onValueChange(opt.value)}
          className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-all cursor-pointer ${
            checked
              ? 'bg-[var(--accent-soft)] border-[var(--accent-border)]'
              : 'glass-interactive border-[var(--glass-border)]'
          }`}
        >
          <span
            className={`mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${
              checked
                ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]'
                : 'border-[var(--glass-border-strong)]'
            }`}
          >
            {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--text-primary)]">{opt.label}</p>
            {opt.description && (
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{opt.description}</p>
            )}
          </div>
        </button>
      );
    })}
  </div>
);

/* ============================================================================
 * 5. shadcn/ui Switch & Checkbox
 * ========================================================================== */
export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  label,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] disabled:opacity-45 ${
      checked
        ? 'bg-[var(--accent-primary)] border-[var(--accent-border)]'
        : 'glass-interactive border-[var(--glass-border-strong)]'
    }`}
  >
    <span
      className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150 ${
        checked ? 'translate-x-4' : 'translate-x-0.5'
      }`}
    />
  </button>
);

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  id,
  label,
}) => {
  const box = (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={`h-4 w-4 shrink-0 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
        checked
          ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white'
          : 'glass-interactive border-[var(--glass-border-strong)]'
      }`}
    >
      {checked && <FaIcon icon="fa-solid fa-check" className="text-[10px]" />}
    </button>
  );

  if (label) {
    return (
      <div
        onClick={() => onCheckedChange(!checked)}
        className="inline-flex items-center gap-2 cursor-pointer select-none"
      >
        {box}
        <span className="text-xs text-[var(--text-secondary)]">{label}</span>
      </div>
    );
  }

  return box;
};

/* ============================================================================
 * 6. shadcn/ui Slider & Progress
 * ========================================================================== */
export interface SliderProps {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange: (val: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
}) => {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min || 1)) * 100));
  return (
    <div className="relative flex w-full touch-none select-none items-center py-2">
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)]">
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${pct}%`, backgroundColor: 'var(--accent-primary)' }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export const Progress: React.FC<{ value: number; className?: string }> = ({
  value,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-[var(--glass-subtle-bg)] border border-[var(--glass-border)] ${className}`}
    >
      <div
        className="h-full transition-all duration-300 rounded-full"
        style={{
          width: `${clamped}%`,
          background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-hover))',
        }}
      />
    </div>
  );
};

/* ============================================================================
 * 7. shadcn/ui Tabs
 * ========================================================================== */
interface TabsContextValue {
  value: string;
  onValueChange: (val: string) => void;
}
const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export const Tabs: React.FC<{
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  className?: string;
  children: React.ReactNode;
}> = ({ value, defaultValue = '', onValueChange, className = '', children }) => {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;
  const handleChange = (v: string) => {
    setInternal(v);
    if (onValueChange) onValueChange(v);
  };
  return (
    <TabsContext.Provider value={{ value: current, onValueChange: handleChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    role="tablist"
    className={`liquid-pill-group ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const TabsTrigger: React.FC<{
  value: string;
  className?: string;
  children: React.ReactNode;
}> = ({ value, className = '', children }) => {
  const ctx = useContext(TabsContext);
  const active = ctx?.value === value;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={() => ctx?.onValueChange(value)}
      className={`inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
        active
          ? 'liquid-btn-primary text-white'
          : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{
  value: string;
  className?: string;
  children: React.ReactNode;
}> = ({ value, className = '', children }) => {
  const ctx = useContext(TabsContext);
  if (ctx?.value !== value) return null;
  return <div className={`mt-3 ${className}`}>{children}</div>;
};

/* ============================================================================
 * 8. shadcn/ui Alert
 * ========================================================================== */
export const Alert: React.FC<{
  variant?: 'default' | 'success' | 'warning' | 'destructive';
  icon?: string;
  className?: string;
  children: React.ReactNode;
}> = ({ variant = 'default', icon, className = '', children }) => {
  const styles = {
    default: 'glass-interactive border-[var(--glass-border-strong)] text-[var(--text-primary)]',
    success:
      'bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
    warning: 'bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300',
    destructive: 'bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300',
  }[variant];

  return (
    <div role="alert" className={`rounded-2xl p-4 flex items-start gap-3 ${styles} ${className}`}>
      {icon && <FaIcon icon={icon} className="mt-0.5 text-sm shrink-0" />}
      <div className="space-y-1 text-xs flex-1">{children}</div>
    </div>
  );
};

export const AlertTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
}) => <h5 className={`font-semibold leading-none tracking-tight ${className}`}>{children}</h5>;

export const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
}) => <p className={`text-xs opacity-90 leading-relaxed ${className}`}>{children}</p>;

/* ============================================================================
 * 9. shadcn/ui Accordion & Collapsible
 * ========================================================================== */
export const AccordionItem: React.FC<{
  title: string;
  icon?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}> = ({ title, icon, defaultOpen = false, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--glass-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-3.5 text-left text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          {icon && <FaIcon icon={icon} className="text-[var(--accent-primary)]" />}
          <span>{title}</span>
        </span>
        <FaIcon
          icon="fa-solid fa-chevron-down"
          className={`text-[10px] text-[var(--text-muted)] transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="pb-3.5 text-xs text-[var(--text-secondary)] leading-relaxed animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
};

/* ============================================================================
 * 10. Avatar, Separator, Skeleton, ScrollArea, AspectRatio
 * ========================================================================== */
export const Avatar: React.FC<{
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ initials, size = 'md', className = '' }) => {
  const sz =
    size === 'sm'
      ? 'w-7 h-7 text-[10px]'
      : size === 'lg'
      ? 'w-11 h-11 text-sm'
      : 'w-9 h-9 text-xs';
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-xs border border-white/25 ${className}`}
      style={{
        background: 'linear-gradient(135deg, var(--accent-primary), #6366f1)',
      }}
    >
      {initials}
    </div>
  );
};

export const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`h-px w-full bg-[var(--glass-border)] ${className}`} />
);

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-[var(--glass-subtle-bg)] ${className}`} />
);

/* ============================================================================
 * 11. shadcn/ui Table Primitives
 * ========================================================================== */
export const Table: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className="w-full overflow-x-auto">
    <table className={`w-full caption-bottom text-xs border-collapse ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <thead className={`border-b border-[var(--glass-border)] ${className}`} {...props}>
    {children}
  </thead>
);

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <tbody className={`divide-y divide-[var(--glass-border)] ${className}`} {...props}>
    {children}
  </tbody>
);

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <tr
    className={`transition-colors hover:bg-[var(--glass-subtle-bg)] ${className}`}
    {...props}
  >
    {children}
  </tr>
);

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <th
    className={`h-10 px-4 text-left align-middle text-[11px] font-medium text-[var(--text-muted)] ${className}`}
    {...props}
  >
    {children}
  </th>
);

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <td className={`p-4 align-middle text-xs text-[var(--text-primary)] ${className}`} {...props}>
    {children}
  </td>
);
