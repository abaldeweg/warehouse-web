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

  it('reserves a product again with reserved and reservation_id', async () => {
    ;(apiClient.get as Mock).mockResolvedValue({
      data: {
        id: '32f50289-9581-4869-86de-b22ff287a97a',
        added: 0,
        title: 'Title',
        shortDescription: '',
        author: { firstname: 'Jane', surname: 'Doe' },
        genre: { id: 2 },
        price: 1,
        sold: false,
        removed: false,
        releaseYear: '',
        condition: { id: 3 },
        tags: [{ id: 4 }],
        recommendation: false,
        format: { id: 5 },
        subtitle: null,
        duplicate: false,
      },
    })
    ;(apiClient.put as Mock).mockResolvedValue({})

    const { reserveProduct } = useReservation('ebf7284b-33da-74a6-f40a-97b821853d0b')
    await reserveProduct('32f50289-9581-4869-86de-b22ff287a97a')

    expect(apiClient.get).toHaveBeenCalledWith('/api/book/32f50289-9581-4869-86de-b22ff287a97a')
    expect(apiClient.put).toHaveBeenCalledWith(
      '/api/book/32f50289-9581-4869-86de-b22ff287a97a',
      expect.objectContaining({ reserved: true, reservation_id: 'ebf7284b-33da-74a6-f40a-97b821853d0b' }),
    )
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
