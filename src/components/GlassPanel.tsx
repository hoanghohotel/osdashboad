import React from 'react';

export type GlassVariant = 'primary' | 'secondary' | 'floating' | 'interactive';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  interactiveHover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'lg' | 'xl' | '2xl' | '3xl';
  children: React.ReactNode;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = 'secondary',
  interactiveHover = false,
  padding = 'md',
  rounded = '2xl',
  className = '',
  children,
  ...rest
}) => {
  const variantClass =
    variant === 'primary'
      ? 'glass-primary'
      : variant === 'floating'
      ? 'glass-floating'
      : variant === 'interactive'
      ? 'glass-interactive'
      : 'glass-secondary';

  const hoverClass =
    interactiveHover && variant === 'secondary' ? 'glass-secondary-interactive' : '';

  const paddingClass =
    padding === 'none'
      ? ''
      : padding === 'sm'
      ? 'p-4'
      : padding === 'lg'
      ? 'p-6 sm:p-7'
      : 'p-5 sm:p-6';

  const roundedClass =
    rounded === 'lg'
      ? 'rounded-lg'
      : rounded === 'xl'
      ? 'rounded-xl'
      : rounded === '3xl'
      ? 'rounded-3xl'
      : 'rounded-2xl';

  return (
    <div
      className={`${variantClass} ${hoverClass} ${paddingClass} ${roundedClass} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
