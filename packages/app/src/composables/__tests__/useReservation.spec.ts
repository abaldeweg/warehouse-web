import { describe, it, expect, vi } from 'vitest'
import { useReservation } from '../useReservation'
import { apiClient } from '@/api/apiClient'
import type { Mock } from 'vitest'

vi.mock('@/api/apiClient', () => {
  const apiClient = {
    get: vi.fn(() => Promise.resolve({})),
    put: vi.fn(() => Promise.resolve({})),
    delete: vi.fn(() => Promise.resolve({})),
  }
  return { apiClient }
})

describe('useReservation', () => {
  it('fetches a reservation successfully', async () => {
    const mockReservation = { id: '1', firstname: 'John', surname: 'Doe' }
    ;(apiClient.get as Mock).mockImplementation(() => Promise.resolve({ data: mockReservation }))

    const { reservation, fetchReservation } = useReservation('1')
    await fetchReservation('1')

    expect(apiClient.get).toHaveBeenCalledWith('/api/reservation/1')
    expect(reservation?.value).toEqual(mockReservation)
  })

  it('updates a reservation successfully', async () => {
    const mockReservation = {
      id: '1',
      books: [],
      branch_id: 0,
      branch: {
        id: 0,
        name: '',
        steps: '',
        currency: '',
        ordering: '0',
        public: false,
        pricelist: '',
        cart: false,
        content: null,
      },
      notes: '',
      salutation: '',
      firstname: '',
      surname: '',
      mail: '',
      phone: '',
      open: false,
      createdAt: Date.now(),
    }
    ;(apiClient.put as Mock).mockResolvedValue({})

    const { reservation, updateReservation } = useReservation('1')
    reservation.value = mockReservation

    await updateReservation()

    expect(apiClient.put).toHaveBeenCalledWith('/api/reservation/1', {
      ...mockReservation,
    })
  })

  it('removes a reservation successfully', async () => {
    ;(apiClient.delete as Mock).mockImplementation(() => Promise.resolve({}))

    const { reservation, removeReservation } = useReservation('1')
    reservation.value = {
      id: '1',
      books: [],
      branch_id: 0,
      branch: {
        id: 0,
        name: '',
        steps: '',
        currency: '',
        ordering: '0',
        public: false,
        pricelist: '',
        cart: false,
        content: null,
      },
      notes: '',
      salutation: '',
      firstname: '',
      surname: '',
      mail: '',
      phone: '',
      open: false,
      createdAt: Date.now(),
    }

    await removeReservation()

    expect(apiClient.delete).toHaveBeenCalledWith('/api/reservation/1')
  })
})
