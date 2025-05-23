import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useToken } from '../useToken'
import type { User } from '../useToken'
import axios from 'axios'
import Cookies from 'js-cookie'

vi.mock('axios')
vi.mock('js-cookie')

describe('useToken', () => {
  const mockUser: User = {
    id: 1,
    username: 'testuser',
    roles: ['user'],
    branch: {
      id: 1,
      name: 'Main',
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

  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('fetchUser updates on 200 response', async () => {
    Cookies.get.mockReturnValue('test-token')
    axios.create.mockReturnValue({
      request: vi.fn().mockResolvedValue({ status: 200, data: mockUser }),
    })
    const { user, fetchUser } = useToken()
    user.value = { ...mockUser }
    await fetchUser()
    expect(user.value).toEqual(mockUser)
  })

  it('fetchUser leaves user as null on non-200 response', async () => {
    Cookies.get.mockReturnValue('test-token')
    axios.create.mockReturnValue({
      request: vi.fn().mockResolvedValue({ status: 401, data: null }),
    })
    const { user, fetchUser } = useToken()
    user.value = { ...mockUser }
    await fetchUser()
    expect(user.value).toBeNull()
  })
})
