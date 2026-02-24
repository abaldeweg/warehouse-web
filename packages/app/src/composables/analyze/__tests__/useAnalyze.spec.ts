import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAnalyze } from '../useAnalyze'
import { apiClient } from '@/api/apiClient'

describe('useAnalyze', () => {
  const mockData = [{ term: 'book', count: 5 }]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchShopSearch uses provided dates and sets analyze', async () => {
    apiClient.get = vi.fn().mockResolvedValue({ data: mockData })

    const { analyze, fetchShopSearch } = useAnalyze()
    await fetchShopSearch('2025-01-01', '2025-01-31')

    expect(apiClient.get).toHaveBeenCalledWith('/api/analyze/shop-search', {
      params: { start: '2025-01-01', end: '2025-01-31' },
    })
    expect(analyze.value).toEqual(mockData)
  })

  it('fetchShopSearch defaults to last 30 days when no dates provided', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-02-15T12:00:00Z'))
    apiClient.get = vi.fn().mockResolvedValue({ data: mockData })

    const { analyze, fetchShopSearch } = useAnalyze()
    await fetchShopSearch()

    expect(apiClient.get).toHaveBeenCalledWith('/api/analyze/shop-search', {
      params: { start: '2025-01-16', end: '2025-02-15' },
    })
    expect(analyze.value).toEqual(mockData)

    vi.useRealTimers()
  })
})
