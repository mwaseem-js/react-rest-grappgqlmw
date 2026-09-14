// Adapter function to normalize data from REST and GraphQL sources
import { CoreEntity, EnterpriseTransaction } from '../../types/domain';

export function normalizeDataFromRest(rawData: any): CoreEntity {
  return {
    id: rawData.id,
    name: rawData.name,
    description: rawData.description || '',
    createdAt: rawData.created_at,
    updatedAt: rawData.updated_at,
  };
}

export function normalizeDataFromGraphQL(node: any): CoreEntity {
  return {
    id: node.id,
    name: node.name,
    description: node.description || '',
    createdAt: node.createdAt,
    updatedAt: node.updatedAt,
  };
}

export function normalizeRestTransaction(rawData: any): EnterpriseTransaction {
  return {
    id: rawData.id,
    referenceId: rawData.reference_id,
    source: rawData.source,
    amount: Number(rawData.amount),
    currency: rawData.currency,
    timestamp: rawData.created_at,
    status: rawData.status,
    description: rawData.description || 'Enterprise transaction',
  };
}

export function normalizeGraphQLTransaction(node: any): EnterpriseTransaction {
  return {
    id: node.id,
    referenceId: node.reference_id,
    source: node.source,
    amount: Number(node.amount),
    currency: node.currency,
    timestamp: node.created_at,
    status: node.status,
    description: node.description || 'Enterprise transaction',
  };
}