import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { EnterpriseTransaction, generateMockTransactions, TransactionStatus } from '../types/domain';

const transactions = generateMockTransactions(10000);

const statusStyles: Record<TransactionStatus, { background: string; color: string }> = {
  COMPLETED: { background: '#dcfce7', color: '#166534' },
  PENDING: { background: '#fef3c7', color: '#92400e' },
  FAILED: { background: '#fee2e2', color: '#b91c1c' },
};

const formatAmount = (transaction: EnterpriseTransaction) =>
  `${transaction.currency} ${transaction.amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const formatTimestamp = (timestamp: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));

const pillStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.04em',
  padding: '4px 8px',
};

const VirtualizedTransactionFeed: React.FC = () => {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 5,
  });

  const restCount = transactions.filter((transaction) => transaction.source === 'REST').length;
  const graphqlCount = transactions.length - restCount;

  return (
    <section style={{ color: '#172033', fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
      <header style={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <p style={{ color: '#64748b', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', margin: '0 0 5px', textTransform: 'uppercase' }}>
            Live transaction monitor
          </p>
          <h1 style={{ fontSize: 26, letterSpacing: '-0.02em', margin: 0 }}>Enterprise transaction feed</h1>
        </div>
        <span style={{ ...pillStyle, background: '#dcfce7', color: '#166534' }}>60 FPS virtualization</span>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 14 }}>
        <Metric label="Total records" value={transactions.length.toLocaleString()} />
        <Metric label="REST" value={restCount.toLocaleString()} accent="#2563eb" />
        <Metric label="GraphQL" value={graphqlCount.toLocaleString()} accent="#c026d3" />
      </div>

      <div ref={parentRef} style={{ background: '#ffffff', border: '1px solid #dbe3ef', borderRadius: 10, height: 520, overflow: 'auto' }}>
        <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative', width: '100%' }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const transaction = transactions[virtualRow.index];
            const statusStyle = statusStyles[transaction.status];
            const sourceStyle = transaction.source === 'REST'
              ? { background: '#dbeafe', color: '#1d4ed8' }
              : { background: '#fae8ff', color: '#a21caf' };

            return (
              <article
                key={transaction.id}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                style={{ alignItems: 'center', borderBottom: '1px solid #eef2f7', display: 'grid', gap: 14, gridTemplateColumns: 'minmax(190px, 1fr) minmax(150px, 0.7fr) auto', minHeight: 64, padding: '10px 16px', position: 'absolute', top: 0, transform: `translateY(${virtualRow.start}px)`, width: '100%' }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ alignItems: 'center', display: 'flex', gap: 8, marginBottom: 5 }}>
                    <span style={{ ...pillStyle, ...sourceStyle }}>{transaction.source}</span>
                    <strong style={{ fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{transaction.description}</strong>
                  </div>
                  <span style={{ color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 12 }}>{transaction.referenceId}</span>
                </div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{formatTimestamp(transaction.timestamp)}</div>
                <div style={{ alignItems: 'flex-end', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <strong style={{ fontSize: 14, whiteSpace: 'nowrap' }}>{formatAmount(transaction)}</strong>
                  <span style={{ ...pillStyle, background: statusStyle.background, color: statusStyle.color }}>{transaction.status}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Metric: React.FC<{ label: string; value: string; accent?: string }> = ({ label, value, accent = '#172033' }) => (
  <div style={{ background: '#ffffff', border: '1px solid #dbe3ef', borderRadius: 8, minWidth: 128, padding: '10px 13px' }}>
    <div style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</div>
    <div style={{ color: accent, fontSize: 20, fontWeight: 800, marginTop: 2 }}>{value}</div>
  </div>
);

export default VirtualizedTransactionFeed;
