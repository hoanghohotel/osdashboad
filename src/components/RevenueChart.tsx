import React, { useState } from 'react';
import {
  Area,
  ComposedChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FaIcon,
  Skeleton,
} from './ui/liquid-shadcn';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { AnalyticsPoint, ChartGranularity } from '../types/dashboard';

interface RevenueChartProps {
  data: AnalyticsPoint[];
  granularity: ChartGranularity;
  onChangeGranularity: (g: ChartGranularity) => void;
  loading?: boolean;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  granularity,
  onChangeGranularity,
  loading = false,
}) => {
  const { t } = useLanguage();
  const { mode } = useTheme();
  const [showOrders, setShowOrders] = useState(true);
  const [showPrevious, setShowPrevious] = useState(true);

  const axisColor = mode === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.06)';

  const formatCurrencyCompact = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
    return `$${val}`;
  };

  return (
    <Card glassVariant="secondary" className="flex flex-col justify-between">
      <CardHeader className="flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-4 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <FaIcon icon="fa-solid fa-chart-area" className="text-[var(--accent-primary)] text-xs" />
            <span>{t.chart.title}</span>
          </CardTitle>
          <CardDescription className="mt-0.5">{t.chart.subtitle}</CardDescription>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <Button
              size="sm"
              variant={showPrevious ? 'secondary' : 'ghost'}
              onClick={() => setShowPrevious((prev) => !prev)}
            >
              <FaIcon icon="fa-solid fa-clock-rotate-left" className="text-[10px]" />
              <span>{t.chart.previousSeries}</span>
            </Button>
            <Button
              size="sm"
              variant={showOrders ? 'secondary' : 'ghost'}
              onClick={() => setShowOrders((prev) => !prev)}
            >
              <FaIcon icon="fa-solid fa-bag-shopping" className="text-[10px] text-emerald-500" />
              <span>{t.chart.ordersSeries}</span>
            </Button>
          </div>

          <div className="liquid-pill-group">
            {(['daily', 'weekly', 'monthly'] as ChartGranularity[]).map((item) => {
              const active = granularity === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onChangeGranularity(item)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'liquid-btn-primary text-white'
                      : 'liquid-btn-ghost text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {t.chart[item]}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-5">
        <div className="h-[310px] w-full">
          {loading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueAreaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="var(--accent-primary)" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: axisColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={formatCurrencyCompact}
                  tick={{ fill: axisColor, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                {showOrders && (
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: axisColor, fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                )}
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;
                    const point = payload[0].payload as AnalyticsPoint;
                    return (
                      <div className="glass-floating rounded-xl p-3 text-xs space-y-1.5 min-w-[180px]">
                        <div className="font-semibold text-[var(--text-primary)] border-b border-[var(--glass-border)] pb-1">
                          {label}
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[var(--text-secondary)]">
                            {t.chart.revenueSeries}
                          </span>
                          <span className="font-mono-tabular font-semibold text-[var(--text-primary)]">
                            ${point.revenue.toLocaleString()}
                          </span>
                        </div>
                        {showPrevious && (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[var(--text-muted)]">
                              {t.chart.previousSeries}
                            </span>
                            <span className="font-mono-tabular text-[var(--text-secondary)]">
                              ${point.previousRevenue.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {showOrders && (
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-[var(--text-secondary)]">
                              {t.chart.ordersSeries}
                            </span>
                            <span className="font-mono-tabular font-semibold text-emerald-500">
                              {point.orders.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
                {showPrevious && (
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="previousRevenue"
                    stroke={axisColor}
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                )}
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--accent-primary)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueAreaFill)"
                />
                {showOrders && (
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ r: 2.5, fill: '#10b981' }}
                    activeDot={{ r: 4 }}
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
