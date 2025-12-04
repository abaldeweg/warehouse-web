import { describe, it, expect, vi } from 'vitest'
import { useReservations } from '../useReservations'
import { apiClient } from '@/api/apiClient'
import type { Mock } from 'vitest'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}))

describe('useReservations', () => {
  it('fetchReservations sets reservations', async () => {
    const mockData = [
      {
        id: '1',
        branch_id: 101,
        branch: {},
        created_at: '2025-05-26T00:00:00Z',
        notes: 'Test note',
        books: [],
        salutation: 'Mr.',
        firstname: 'John',
        surname: 'Doe',
        mail: 'mail@localhost',
        phone: '1234567890',
        open: true,
        createdAt: 1620000000,
      },
    ]
    ;(apiClient.get as Mock).mockResolvedValue({ data: mockData })

    const { reservations, fetchReservations } = useReservations()
    await fetchReservations()

    expect(reservations.value).toEqual(mockData)
  })

  it('fetchReservations sets reservations and updates countAllReservations', async () => {
    const mockData = [
      {
        id: '1',
        branch_id: 101,
        branch: {},
        created_at: '2025-05-26T00:00:00Z',
        notes: 'Test note',
        books: [],
        salutation: 'Mr.',
        firstname: 'John',
        surname: 'Doe',
        mail: 'mail@localhost',
        phone: '1234567890',
        open: true,
        createdAt: 1620000000,
      },
    ]
    ;(apiClient.get as Mock).mockResolvedValueOnce({ data: mockData })

    const { countAllReservations, fetchReservations } = useReservations()
    await fetchReservations()

    expect(countAllReservations.value).toBe(mockData.length)
  })
})
