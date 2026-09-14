// Define a unified TypeScript interface for core entities
export interface CoreEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type TransactionSource = 'REST' | 'GRAPHQL';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';
export type TransactionCurrency = 'AED' | 'SAR' | 'USD';

export interface EnterpriseTransaction {
  id: string;
  referenceId: string;
  source: TransactionSource;
  amount: number;
  currency: TransactionCurrency;
  timestamp: string;
  status: TransactionStatus;
  description: string;
}

const transactionDescriptions = [
  'SWIFT settlement',
  'SaaS billing collection',
  'Merchant payout',
  'Treasury liquidity transfer',
  'Cross-border invoice payment',
  'Enterprise payroll disbursement',
];

const currencies: TransactionCurrency[] = ['AED', 'SAR', 'USD'];
const statuses: TransactionStatus[] = ['COMPLETED', 'PENDING', 'FAILED'];

export function generateMockTransactions(count: number): EnterpriseTransaction[] {
  const recordCount = Math.max(0, Math.floor(count));
  const now = Date.now();

  return Array.from({ length: recordCount }, (_, index) => {
    const source: TransactionSource = index % 2 === 0 ? 'REST' : 'GRAPHQL';
    const currency = currencies[Math.floor(Math.random() * currencies.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const timestamp = new Date(now - Math.floor(Math.random() * 30 * 24 * 60) * 60 * 1000).toISOString();
    const amount = Number((850 + Math.random() * 248000).toFixed(2));

    return {
      id: `txn-${String(index + 1).padStart(6, '0')}`,
      referenceId: `${source === 'REST' ? 'RST' : 'GQL'}-${String(100000 + index)}`,
      source,
      amount,
      currency,
      timestamp,
      status,
      description: transactionDescriptions[index % transactionDescriptions.length],
    };
  });
}