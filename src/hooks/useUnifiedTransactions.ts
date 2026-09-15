import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useQuery as useApolloQuery, gql } from '@apollo/client';
import restClient from '../api/restClient';
import graphqlClient from '../api/graphqlClient';
import { normalizeRestTransaction, normalizeGraphQLTransaction } from '../services/adapters/dataNormalizer';
import { EnterpriseTransaction } from '../types/domain';

const GRAPHQL_QUERY = gql`
  query GetTransactions {
    transactions {
      id
      reference_id
      source
      amount
      currency
      created_at
      status
      metadata
    }
  }
`;

export function useUnifiedTransactions() {
  const {
    data: restData,
    isLoading: isRestLoading,
    error: restError,
  } = useQuery({
    queryKey: ['restTransactions'],
    queryFn: async () => {
      const response = await restClient.get('/transactions');
      return response.data.map(normalizeRestTransaction);
    },
  });

  const {
    data: graphqlData,
    loading: isGraphQLLoading,
    error: graphqlError,
  } = useApolloQuery(GRAPHQL_QUERY, { client: graphqlClient });

  const normalizedGraphQLData = useMemo(
    () => graphqlData?.transactions.map(normalizeGraphQLTransaction) || [],
    [graphqlData]
  );

  const combinedData: EnterpriseTransaction[] = useMemo(
    () => [...(restData || []), ...normalizedGraphQLData].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
    [restData, normalizedGraphQLData]
  );

  return {
    data: combinedData,
    isLoading: isRestLoading || isGraphQLLoading,
    error: restError || graphqlError,
    metrics: {
      restCount: restData?.length || 0,
      graphqlCount: normalizedGraphQLData.length,
      latencyMs: 0, // Placeholder for latency calculation
    },
  };
}