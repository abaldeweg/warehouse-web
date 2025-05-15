import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useLogin } from './useLogin'
import Cookies from 'js-cookie'
import axios from 'axios'

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
  },
}))

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      request: vi.fn(),
    })),
  },
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('useLogin', () => {
  let mockRequest: any
  let mockSet: any
  let mockGet: any

  beforeEach(() => {
    mockSet = Cookies.set as unknown as ReturnType<typeof vi.fn>
    mockGet = Cookies.get as unknown as ReturnType<typeof vi.fn>
    const axiosInstance = {
      request: vi.fn(),
    }
    mockRequest = axiosInstance.request
      ; (axios.create as unknown as ReturnType<typeof vi.fn>).mockReturnValue(axiosInstance)
    mockGet.mockReturnValue('test-token')
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize refs', () => {
    const { username, password, isLoggingIn, invalidCredentials } = useLogin()
    expect(username.value).toBeNull()
    expect(password.value).toBeNull()
    expect(isLoggingIn.value).toBe(false)
    expect(invalidCredentials.value).toBe(false)
  })

  it('should call API and set cookies on valid login', async () => {
    const { username, password, isLoggingIn, invalidCredentials, login } = useLogin()
    username.value = 'user'
    password.value = 'pass'
    mockRequest.mockResolvedValue({
      status: 200,
      data: { token: 'token', refresh_token: 'refresh_token' },
    })
    await login()
    expect(mockRequest).toHaveBeenCalled()
    expect(mockSet).toHaveBeenCalledWith('token', 'token', { expires: 7 })
    expect(mockSet).toHaveBeenCalledWith('refresh_token', 'refresh_token', { expires: 30 })
    expect(isLoggingIn.value).toBe(false)
    expect(invalidCredentials.value).toBe(false)
  })

  it('should set invalidCredentials on invalid login', async () => {
    const { username, password, invalidCredentials, login } = useLogin()
    username.value = 'user'
    password.value = 'wrong'
    mockRequest.mockResolvedValue({
      status: 401,
      data: {},
    })
    await login()
    expect(invalidCredentials.value).toBe(true)
  })

  it('should not set cookies if response is invalid', async () => {
    const { username, password, login } = useLogin()
    username.value = 'user'
    password.value = 'pass'
    mockRequest.mockResolvedValue({
      status: 200,
      data: {},
    })
    await login()
    expect(mockSet).not.toHaveBeenCalledWith('token', expect.anything(), expect.anything())
    expect(mockSet).not.toHaveBeenCalledWith('refresh_token', expect.anything(), expect.anything())
  })
})
