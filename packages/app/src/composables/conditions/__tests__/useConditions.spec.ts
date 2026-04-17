import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

import { useConditions } from '../useConditions'
import { apiClient } from '@/api/apiClient'

describe('useConditions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('listConditions fetches and sets conditions and toggles isLoading', async () => {
    const mockData = [
      {
        id: 1,
        name: 'Good',
        branch_id: 10,
        branch: {
          id: 10,
          name: 'Branch',
          steps: 1,
          currency: 'EUR',
          ordering: null,
          public: false,
          pricelist: 'default',
          cart: false,
          content: null,
          mail_reservation: null,
        },
      },
    ]
      ; (apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const { conditions, isLoading, listConditions } = useConditions()
    const c = listConditions()
    expect(isLoading.value).toBe(true)
    await c
    expect(conditions.value).toEqual(mockData)
    expect(isLoading.value).toBe(false)
  })

  it('processedConditions filters and sorts correctly', () => {
    const { conditions, criteria, sort, processedConditions } = useConditions()
    conditions.value = [
      {
        id: 1,
        name: 'banana',
        branch_id: 1,
        branch: {
          id: 1,
          name: 'Branch',
          steps: 1,
          currency: 'EUR',
          ordering: null,
          public: false,
          pricelist: '',
          cart: false,
          content: null,
          mail_reservation: null,
        },
      },
      {
        id: 2,
        name: 'apple',
        branch_id: 1,
        branch: {
          id: 1,
          name: 'Branch',
          steps: 1,
          currency: 'EUR',
          ordering: null,
          public: false,
          pricelist: '',
          cart: false,
          content: null,
          mail_reservation: null,
        },
      },
      {
        id: 3,
        name: 'apricot',
        branch_id: 2,
        branch: {
          id: 2,
          name: 'Branch',
          steps: 1,
          currency: 'EUR',
          ordering: null,
          public: false,
          pricelist: '',
          cart: false,
          content: null,
          mail_reservation: null,
        },
      },
    ]
    criteria.value = 'ap'
    sort.value = 'asc'
    expect(processedConditions.value?.map((c) => c.name)).toEqual(['apple', 'apricot'])
    sort.value = 'desc'
    expect(processedConditions.value?.map((c) => c.name)).toEqual(['apricot', 'apple'])
  })
})
