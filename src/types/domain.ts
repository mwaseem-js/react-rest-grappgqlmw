// Define a unified TypeScript interface for core entities
export interface CoreEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnterpriseTransaction {
  id: string;
  referenceId: string;
  source: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: string;
  metadata?: Record<string, unknown>;
}