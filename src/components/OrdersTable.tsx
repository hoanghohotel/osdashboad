import React, { useMemo, useState } from 'react';
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  FaIcon,
  Input,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/liquid-shadcn';
import { useLanguage } from '../context/LanguageContext';
import { Order, OrderStatus } from '../types/dashboard';

interface OrdersTableProps {
  orders: Order[];
  loading?: boolean;
  onInspectOrder: (order: Order) => void;
  onFulfillOrder: (orderId: string) => void;
  onRequestCancelOrder: (order: Order) => void;
  onOpenCreateOrder: () => void;
  pageSize?: number;
}

type SortKey = 'date' | 'amount' | 'id';

export const OrdersTable: React.FC<OrdersTableProps> = ({
  orders,
  loading = false,
  onInspectOrder,
  onFulfillOrder,
  onRequestCancelOrder,
  onOpenCreateOrder,
  pageSize = 6,
}) => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);

  const filteredAndSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = orders.filter((ord) => {
      const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
      const matchesQuery =
        !q ||
        ord.id.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerEmail.toLowerCase().includes(q) ||
        ord.customerLocation.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'amount') {
        cmp = a.amount - b.amount;
      } else if (sortKey === 'id') {
        cmp = a.id.localeCompare(b.id);
      } else {
        cmp = a.date.localeCompare(b.date);
      }
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [orders, search, statusFilter, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginatedOrders = filteredAndSorted.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'fulfilled':
        return { label: t.orders.fulfilled, color: 'text-emerald-600 dark:text-emerald-400' };
      case 'processing':
        return { label: t.orders.processing, color: 'text-sky-600 dark:text-sky-400' };
      case 'pending':
        return { label: t.orders.pending, color: 'text-amber-600 dark:text-amber-400' };
      case 'cancelled':
        return { label: t.orders.cancelled, color: 'text-rose-600 dark:text-rose-400' };
    }
  };

  const getPaymentText = (payment: Order['paymentStatus']) => {
    switch (payment) {
      case 'paid':
        return t.orders.paid;
      case 'unpaid':
        return t.orders.unpaid;
      case 'refunded':
        return t.orders.refunded;
    }
  };

  return (
    <Card glassVariant="secondary" className="overflow-hidden">
      <CardHeader className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>{t.orders.title}</CardTitle>
            <CardDescription className="mt-0.5">{t.orders.subtitle}</CardDescription>
          </div>

          <div className="relative w-full sm:w-72">
            <FaIcon
              icon="fa-solid fa-magnifying-glass"
              className="text-xs text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            />
            <Input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={t.orders.searchOrders}
              className="pl-8"
            />
          </div>
        </div>

        {/* Interactive Status Segmented Control */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(
            [
              { id: 'all', label: t.orders.allStatuses },
              { id: 'fulfilled', label: t.orders.fulfilled },
              { id: 'processing', label: t.orders.processing },
              { id: 'pending', label: t.orders.pending },
              { id: 'cancelled', label: t.orders.cancelled },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <Button
                key={tab.id}
                size="sm"
                variant={active ? 'default' : 'secondary'}
                onClick={() => {
                  setStatusFilter(tab.id);
                  setPage(1);
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>
      </CardHeader>

      {loading ? (
        <div className="p-6 space-y-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <Skeleton key={n} className="h-10 w-full" />
          ))}
        </div>
      ) : filteredAndSorted.length === 0 ? (
        <div className="py-14 px-6 text-center max-w-md mx-auto space-y-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{t.orders.emptyTitle}</p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {t.orders.emptyDesc}
          </p>
          <div className="pt-2">
            <Button variant="default" onClick={onOpenCreateOrder}>
              <FaIcon icon="fa-solid fa-plus" />
              <span>{t.orders.createFirstOrder}</span>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-5">
                    <button
                      type="button"
                      onClick={() => handleSort('id')}
                      className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <span>{t.orders.orderId}</span>
                      <FaIcon icon="fa-solid fa-sort" className="text-[10px]" />
                    </button>
                  </TableHead>
                  <TableHead>{t.orders.customer}</TableHead>
                  <TableHead>
                    <button
                      type="button"
                      onClick={() => handleSort('date')}
                      className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <span>{t.orders.date}</span>
                      <FaIcon icon="fa-solid fa-sort" className="text-[10px]" />
                    </button>
                  </TableHead>
                  <TableHead>
                    {t.orders.status} · {t.orders.payment}
                  </TableHead>
                  <TableHead className="text-right">
                    <button
                      type="button"
                      onClick={() => handleSort('amount')}
                      className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)] ml-auto cursor-pointer"
                    >
                      <span>{t.orders.amount}</span>
                      <FaIcon icon="fa-solid fa-sort" className="text-[10px]" />
                    </button>
                  </TableHead>
                  <TableHead className="px-5 text-right">{t.orders.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((ord) => {
                  const st = getStatusText(ord.status);
                  return (
                    <TableRow
                      key={ord.id}
                      onClick={() => onInspectOrder(ord)}
                      className="cursor-pointer"
                    >
                      <TableCell className="px-5 font-mono-tabular font-semibold whitespace-nowrap">
                        {ord.id}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-[var(--text-primary)]">
                          {ord.customerName}
                        </div>
                        <div className="text-[11px] text-[var(--text-muted)]">
                          {ord.customerEmail} · {ord.customerLocation}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono-tabular text-[var(--text-secondary)] whitespace-nowrap">
                        {ord.date}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <span className={`font-semibold ${st.color}`}>{st.label}</span>
                        <span className="mx-1.5 text-[var(--text-muted)]" aria-hidden="true">
                          ·
                        </span>
                        <span className="text-[var(--text-secondary)]">
                          {getPaymentText(ord.paymentStatus)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono-tabular font-semibold whitespace-nowrap">
                        ${ord.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </TableCell>
                      <TableCell
                        className="px-5 text-right whitespace-nowrap"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-7 px-2.5 text-[11px]"
                            onClick={() => onInspectOrder(ord)}
                          >
                            <FaIcon icon="fa-regular fa-eye" />
                            <span>{t.orders.inspect}</span>
                          </Button>
                          {ord.status !== 'fulfilled' && ord.status !== 'cancelled' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-7 px-2 text-emerald-600 dark:text-emerald-400"
                              onClick={() => onFulfillOrder(ord.id)}
                              title={t.orders.markFulfilled}
                            >
                              <FaIcon icon="fa-solid fa-check" />
                            </Button>
                          )}
                          {ord.status !== 'cancelled' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              className="h-7 px-2 text-rose-500"
                              onClick={() => onRequestCancelOrder(ord)}
                              title={t.orders.cancelOrder}
                            >
                              <FaIcon icon="fa-solid fa-ban" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Responsive Structured List View */}
          <div className="md:hidden divide-y divide-[var(--glass-border)]">
            {paginatedOrders.map((ord) => {
              const st = getStatusText(ord.status);
              return (
                <div
                  key={ord.id}
                  onClick={() => onInspectOrder(ord)}
                  className="p-4 space-y-2 hover:bg-[var(--glass-subtle-bg)] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tabular text-xs font-bold text-[var(--text-primary)]">
                      {ord.id}
                    </span>
                    <span className="font-mono-tabular text-sm font-bold text-[var(--text-primary)]">
                      ${ord.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-[var(--text-primary)]">
                    {ord.customerName}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)]">
                    <span>
                      <strong className={st.color}>{st.label}</strong> ·{' '}
                      {getPaymentText(ord.paymentStatus)}
                    </span>
                    <span className="font-mono-tabular text-[var(--text-muted)]">{ord.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="px-5 py-3.5 border-t border-[var(--glass-border)] flex items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
            <span className="font-mono-tabular">
              {t.orders.showing} {(safePage - 1) * pageSize + 1}–
              {Math.min(safePage * pageSize, filteredAndSorted.length)} {t.orders.of}{' '}
              {filteredAndSorted.length} {t.orders.results}
            </span>

            <div className="flex items-center gap-1.5">
              <Button
                size="sm"
                variant="secondary"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <FaIcon icon="fa-solid fa-chevron-left" className="text-[10px]" />
                <span>{t.orders.previous}</span>
              </Button>
              <span className="px-2 font-mono-tabular font-semibold text-[var(--text-primary)]">
                {safePage} / {totalPages}
              </span>
              <Button
                size="sm"
                variant="secondary"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <span>{t.orders.next}</span>
                <FaIcon icon="fa-solid fa-chevron-right" className="text-[10px]" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
