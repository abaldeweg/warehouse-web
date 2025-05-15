import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useToken } from '../useToken'
import type { User } from '../useToken'
import axios from 'axios'

describe('useToken', () => {
  const mockAxios = {
    request: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize user as null', () => {
    const { user } = useToken()

    expect(user.value).toBeNull()
  })

  it('should set user on successful fetch', async () => {
    const mockUser: User = {
      id: 1,
      username: 'test',
      roles: ['user'],
      branch: {
        id: 1,
        name: 'main',
        steps: '',
        currency: 'EUR',
        ordering: '',
        public: true,
        pricelist: '',
        cart: false,
        content: null,
      },
      isUser: true,
      isAdmin: false,
    }
    mockAxios.request.mockResolvedValue({ status: 200, data: mockUser })

    const { user, fetchUser } = useToken()
    await fetchUser()

    expect(user.value).toEqual(mockUser)
  })

  it('should set user to null if fetch fails', async () => {
    mockAxios.request.mockResolvedValue({ status: 500, data: {} })
    const { user, fetchUser } = useToken()
    user.value = { id: 1 } as any

    await fetchUser()

    expect(user.value).toBeNull()
  })
})
