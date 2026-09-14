// Unit tests for data normalization
import { describe, it, expect } from 'vitest';
import { normalizeDataFromRest, normalizeDataFromGraphQL } from '../src/services/adapters/dataNormalizer';

describe('Data Normalization', () => {
  it('should normalize REST data correctly', () => {
    const rawData = {
      id: '1',
      name: 'Test Item',
      description: 'A test item',
      created_at: '2026-09-14T00:00:00Z',
      updated_at: '2026-09-14T12:00:00Z',
    };

    const normalized = normalizeDataFromRest(rawData);

    expect(normalized).toEqual({
      id: '1',
      name: 'Test Item',
      description: 'A test item',
      createdAt: '2026-09-14T00:00:00Z',
      updatedAt: '2026-09-14T12:00:00Z',
    });
  });

  it('should normalize GraphQL data correctly', () => {
    const node = {
      id: '2',
      name: 'GraphQL Item',
      description: 'A GraphQL test item',
      createdAt: '2026-09-14T01:00:00Z',
      updatedAt: '2026-09-14T13:00:00Z',
    };

    const normalized = normalizeDataFromGraphQL(node);

    expect(normalized).toEqual({
      id: '2',
      name: 'GraphQL Item',
      description: 'A GraphQL test item',
      createdAt: '2026-09-14T01:00:00Z',
      updatedAt: '2026-09-14T13:00:00Z',
    });
  });

  it('should handle missing fields gracefully', () => {
    const rawData = {
      id: '3',
      name: 'Incomplete Item',
      created_at: '2026-09-14T02:00:00Z',
      updated_at: '2026-09-14T14:00:00Z',
    };

    const normalized = normalizeDataFromRest(rawData);

    expect(normalized).toEqual({
      id: '3',
      name: 'Incomplete Item',
      description: '',
      createdAt: '2026-09-14T02:00:00Z',
      updatedAt: '2026-09-14T14:00:00Z',
    });
  });
});