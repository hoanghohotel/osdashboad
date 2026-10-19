import React from 'react';
import { Card, CardContent, FaIcon, Skeleton } from './ui/liquid-shadcn';

interface MetricCardProps {
  id: string;
  label: string;
  value: string;
  changePercent: number;
  vsLabel: string;
  sparklineData: number[];
  faIcon: string;
  loading?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  label,
  value,
  changePercent,
  vsLabel,
  sparklineData,
  faIcon,
  loading = false,
  onClick,
}) => {
  const isPositive = changePercent >= 0;

  const width = 92;
  const height = 32;
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / Math.max(sparklineData.length - 1, 1)) * width;
      const y = height - 4 - ((val - min) / range) * (height - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const areaPoints = `0,${height} ${points} ${width},${height}`;

  if (loading) {
    return (
      <Card glassVariant="secondary">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-8 w-8 rounded-xl" />
          </div>
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-3 w-24" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      glassVariant="secondary"
      interactiveHover
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? label : undefined}
      onKeyDown={onClick ? (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onClick();
        }
      } : undefined}
      className={onClick ? 'cursor-pointer' : ''}
    >
      <CardContent>
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-medium text-[var(--text-secondary)] truncate">
            {label}
          </span>
          <div className="w-8 h-8 rounded-xl glass-interactive flex items-center justify-center text-[var(--accent-primary)] shrink-0">
            <FaIcon icon={faIcon} className="text-xs" />
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-2xl sm:text-[26px] font-bold tracking-tight font-mono-tabular text-[var(--text-primary)] leading-none">
              {value}
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-xs">
              <span
                className={`inline-flex items-center gap-1 font-mono-tabular font-semibold ${
                  isPositive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                <FaIcon
                  icon={
                    isPositive ? 'fa-solid fa-arrow-trend-up' : 'fa-solid fa-arrow-trend-down'
                  }
                  className="text-[10px]"
                />
                {isPositive ? '+' : ''}
                {changePercent.toFixed(1)}%
              </span>
              <span className="text-[var(--text-muted)]" aria-hidden="true">
                ·
              </span>
              <span className="text-[11px] text-[var(--text-muted)] truncate">{vsLabel}</span>
            </div>
          </div>

          <div className="shrink-0" aria-hidden="true">
            <svg width={width} height={height} className="overflow-visible">
              <defs>
                <linearGradient id={`spark-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <polygon points={areaPoints} fill={`url(#spark-grad-${id})`} />
              <polyline
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
