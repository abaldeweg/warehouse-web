import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useToken } from '../useToken'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('useToken', () => {
  let fetchUser: ReturnType<typeof useToken>['fetchUser']
  let user: ReturnType<typeof useToken>['user']

  beforeEach(() => {
    const composable = useToken()
    fetchUser = composable.fetchUser
    user = composable.user
    vi.clearAllMocks()
  })

  it('should fetch user and update user ref on success', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      roles: ['user'],
      branch: {
        id: 1,
        name: 'Main Branch',
        steps: 'step1',
        currency: 'EUR',
        ordering: 'manual',
        public: true,
        pricelist: 'pricelist',
        cart: true,
        content: null,
      },
      isUser: true,
      isAdmin: false,
    }

    ;(apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      status: 200,
      data: mockUser,
    })

    await fetchUser()

    expect(apiClient.get).toHaveBeenCalledWith('/api/me')
    expect(user.value).toEqual(mockUser)
  })
})
