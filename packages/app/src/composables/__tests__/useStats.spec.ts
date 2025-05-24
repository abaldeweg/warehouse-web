import { describe, it, expect, vi } from 'vitest'
import { useStats } from '../useStats'
import axios from 'axios'
import Cookies from 'js-cookie'

vi.mock('axios')
vi.mock('js-cookie')

describe('useStats', () => {
  it('should fetch stats and update the stats ref', async () => {
    const mockData = { books: 10, authors: 5 }
    ;(axios.create as any).mockReturnValue({
      request: vi.fn().mockResolvedValue({ data: mockData }),
    })
    ;(Cookies.get as any).mockReturnValue('mock-token')

    const { stats, fetchStats } = useStats()
    await fetchStats()

    expect(stats.value).toEqual(mockData)
  })
})
