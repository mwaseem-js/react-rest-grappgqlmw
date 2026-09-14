import React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { EnterpriseTransaction, generateMockTransactions } from '../types/domain';

const transactions = generateMockTransactions(10000);

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
            return (
              <article
                key={transaction.id}
                ref={rowVirtualizer.measureElement}
                data-index={virtualRow.index}
                style={{ alignItems: 'center', borderBottom: '1px solid #f1f5f9', boxSizing: 'border-box', display: 'flex', height: `${virtualRow.size}px`, justifyContent: 'space-between', left: 0, padding: '0 1.5rem', position: 'absolute', top: 0, transform: `translateY(${virtualRow.start}px)`, width: '100%' }}
              >
                <div style={{ alignItems: 'center', display: 'flex', gap: '0.85rem', minWidth: 260 }}>
                  <span style={{ backgroundColor: transaction.source === 'REST' ? '#e0f2fe' : '#fce7f3', borderRadius: 4, color: transaction.source === 'REST' ? '#0369a1' : '#be185d', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', padding: '3px 8px' }}>
                    {transaction.source}
                  </span>
                  <div>
                    <div style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: 600 }}>{transaction.description}</div>
                    <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{transaction.referenceId}</div>
                  </div>
                </div>
                <div style={{ color: '#64748b', fontSize: '0.8rem', textAlign: 'center' }}>{formatTimestamp(transaction.timestamp)}</div>
                <div style={{ alignItems: 'center', display: 'flex', flexShrink: 0, gap: '1rem' }}>
                  <div style={{ minWidth: 130, textAlign: 'right' }}>
                    <div style={{ color: '#0f172a', fontSize: '0.925rem', fontWeight: 700, whiteSpace: 'nowrap' }}>{formatAmount(transaction)}</div>
                  </div>
                  <span style={{ backgroundColor: transaction.status === 'COMPLETED' ? '#ecfdf5' : transaction.status === 'PENDING' ? '#fffbeb' : '#fef2f2', borderRadius: '9999px', color: transaction.status === 'COMPLETED' ? '#047857' : transaction.status === 'PENDING' ? '#b45309' : '#b91c1c', fontSize: '0.725rem', fontWeight: 700, padding: '3px 10px', whiteSpace: 'nowrap' }}>
                    {transaction.status}
                  </span>
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
