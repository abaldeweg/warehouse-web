import { describe, it, expect, vi } from 'vitest'
import { useStats } from '../useStats'
import { apiClient } from '@/api/apiClient'

describe('useStats', () => {
  it('fetches stats successfully', async () => {
    const mockData = { data: { total: 100 } }
    vi.spyOn(apiClient, 'get').mockResolvedValue(mockData)

    const { stats, fetchStats } = useStats()
    await fetchStats()

    expect(apiClient.get).toHaveBeenCalledWith('/api/book/stats')
    expect(stats.value).toEqual(mockData.data)
  })
})
