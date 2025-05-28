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
      books: [{ id: 1 }],
      branch_id: 1,
      branch: 'Main Branch',
      created_at: '2023-01-01T00:00:00Z',
      notes: 'Reservation notes',
      updated_at: '2023-01-02T00:00:00Z',
      status: 'active',
      user_id: 1,
      user: { id: 1, name: 'John Doe' },
      salutation: 'Mr.',
      firstname: 'John',
      surname: 'Doe',
      mail: 'mail@localhost',
      phone: '1234567890',
      address: '123 Main St',
      open: true,
      createdAt: new Date('2023-01-01T00:00:00Z').getTime(),
    }
    ;(apiClient.put as Mock).mockResolvedValue({})

    const { reservation, updateReservation } = useReservation('1')
    reservation.value = mockReservation

    await updateReservation()

    expect(apiClient.put).toHaveBeenCalledWith('/api/reservation/1', {
      id: '1',
      books: [{ id: 1 }],
      branch_id: 1,
      branch: 'Main Branch',
      created_at: '2023-01-01T00:00:00Z',
      notes: 'Reservation notes',
      updated_at: '2023-01-02T00:00:00Z',
      status: 'active',
      user_id: 1,
      user: { id: 1, name: 'John Doe' },
      salutation: 'Mr.',
      firstname: 'John',
      surname: 'Doe',
      mail: 'mail@localhost',
      phone: '1234567890',
      address: '123 Main St',
      open: true,
      createdAt: new Date('2023-01-01T00:00:00Z').getTime(),
    })
  })

  it('removes a reservation successfully', async () => {
    ;(apiClient.delete as Mock).mockImplementation(() => Promise.resolve({}))

    const { reservation, removeReservation } = useReservation('1')
    reservation.value = {
      id: '1',
      books: [],
      branch_id: 0,
      branch: '',
      created_at: '',
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
