import { describe, it, expect, vi, type Mock } from 'vitest'
import { useLogin } from '../useLogin'
import Cookies from 'js-cookie'
import { apiClient } from '@/api/apiClient'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
}))

vi.mock('js-cookie', () => ({
  default: {
    set: vi.fn(),
  },
}))

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
  },
}))

describe('useLogin', () => {
  it('should call API and set cookies on successful login', async () => {
    const { login, username, password, invalidCredentials, isLoggingIn } = useLogin()
    const mockResponse = {
      status: 200,
      data: {
        token: 'mockToken',
        refresh_token: 'mockRefreshToken',
      },
    }

    username.value = 'testuser'
    password.value = 'testpassword'
    ;(apiClient.post as Mock).mockResolvedValue(mockResponse)

    await login()

    expect(isLoggingIn.value).toBe(false)
    expect(Cookies.set).toHaveBeenCalledWith('token', 'mockToken', { expires: 7 })
    expect(Cookies.set).toHaveBeenCalledWith('refresh_token', 'mockRefreshToken', { expires: 30 })
    expect(invalidCredentials.value).toBe(false)
  })

  it('should set invalidCredentials to true on failed login', async () => {
    const { login, username, password, invalidCredentials, isLoggingIn } = useLogin()
    const mockResponse = {
      status: 401,
      data: {},
    }

    username.value = 'testuser'
    password.value = 'wrongpassword'
    ;(apiClient.post as Mock).mockResolvedValue(mockResponse)

    await login()

    expect(isLoggingIn.value).toBe(false)
    expect(invalidCredentials.value).toBe(true)
  })
})
