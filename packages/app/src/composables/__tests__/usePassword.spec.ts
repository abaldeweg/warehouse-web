import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { usePassword } from '../usePassword'
import axios from 'axios'
import Cookies from 'js-cookie'

vi.mock('axios')
vi.mock('js-cookie')

describe('usePassword', () => {
  let mockAxios: any
  let mockCookies: any

  beforeEach(() => {
    mockAxios = {
      create: vi.fn().mockReturnThis(),
      request: vi.fn(),
    }
    ;(axios as any).create = vi.fn(() => mockAxios)
    mockCookies = {
      get: vi.fn(() => 'test-token'),
    }
    ;(Cookies as any).get = mockCookies.get
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize refs correctly', () => {
    const { password, isChangingPassword, passwordSuccessful, passwordError } = usePassword()

    expect(password.value).toBe(null)
    expect(isChangingPassword.value).toBe(false)
    expect(passwordSuccessful.value).toBe(false)
    expect(passwordError.value).toBe(false)
  })

  it('should set passwordSuccessful to true on 200 response', async () => {
    const { password, isChangingPassword, passwordSuccessful, passwordError, changePassword } =
      usePassword()
    password.value = 'newpass'
    mockAxios.request.mockResolvedValue({ status: 200 })

    await changePassword()

    expect(isChangingPassword.value).toBe(false)
    expect(passwordSuccessful.value).toBe(true)
    expect(passwordError.value).toBe(false)
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'put',
      url: '/api/password',
      data: { password: 'newpass' },
      params: undefined,
    })
  })

  it('should set passwordError to true on non-200 response', async () => {
    const { password, isChangingPassword, passwordSuccessful, passwordError, changePassword } =
      usePassword()
    password.value = 'badpass'
    mockAxios.request.mockResolvedValue({ status: 400 })

    await changePassword()

    expect(isChangingPassword.value).toBe(false)
    expect(passwordSuccessful.value).toBe(false)
    expect(passwordError.value).toBe(true)
  })
})
