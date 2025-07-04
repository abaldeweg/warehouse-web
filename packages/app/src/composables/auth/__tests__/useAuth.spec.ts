import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useAuth } from '../useAuth'
import Cookies from 'js-cookie'
import { apiClient } from '@/api/apiClient'

describe('useAuth', () => {
  const mockApiResponse = {
    data: {
      id: 1,
      username: 'admin',
      roles: ['ROLE_USER'],
      branch: {
        id: 1,
        name: 'Branch 1',
      },
      isUser: true,
      isAdmin: false,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    Cookies.set = vi.fn()
  })

  it('should fetch user data if token exists', async () => {
    Cookies.get = vi.fn().mockImplementation((key) => (key === 'token' ? 'valid-token' : undefined))
    apiClient.get = vi.fn().mockResolvedValue({ status: 200, ...mockApiResponse })

    const { user, checkAuthenticationStatus } = useAuth()
    await checkAuthenticationStatus()

    expect(user.value).toEqual(mockApiResponse.data)
  })

  it('should refresh token if token is missing but refresh_token exists', async () => {
    Cookies.get = vi
      .fn()
      .mockImplementation((key) => (key === 'refresh_token' ? 'valid-refresh-token' : undefined))
    apiClient.post = vi
      .fn()
      .mockResolvedValue({ data: { token: 'new-token', refresh_token: 'new-refresh-token' } })

    const { checkAuthenticationStatus } = useAuth()
    await checkAuthenticationStatus()

    expect(Cookies.set).toHaveBeenCalledWith('token', 'new-token', { expires: 7 })
    expect(Cookies.set).toHaveBeenCalledWith('refresh_token', 'new-refresh-token', { expires: 30 })
  })

  it('should set isAuthenticated to true if user data is valid', async () => {
    Cookies.get = vi.fn().mockImplementation((key) => (key === 'token' ? 'valid-token' : undefined))
    apiClient.get = vi.fn().mockResolvedValue({ status: 200, ...mockApiResponse })

    const { isAuthenticated, checkAuthenticationStatus } = useAuth()
    await checkAuthenticationStatus()

    expect(isAuthenticated.value).toBe(true)
  })

  it('should set isAuthenticated to false if no valid token or user data', async () => {
    Cookies.get = vi.fn().mockReturnValue(undefined)

    const { isAuthenticated, checkAuthenticationStatus } = useAuth()
    await checkAuthenticationStatus()

    expect(isAuthenticated.value).toBe(false)
  })
})
