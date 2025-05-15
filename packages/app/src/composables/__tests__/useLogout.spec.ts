import { describe, it, vi, expect, beforeEach } from 'vitest'
import { useLogout } from '../useLogout'
import Cookies from 'js-cookie'

vi.mock('js-cookie', () => ({
  default: {
    remove: vi.fn(),
  },
}))

const pushMock = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock }),
}))

describe('useLogout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('removes token and refresh_token cookies and redirects to login', () => {
    const { logout } = useLogout()
    logout()
    expect(Cookies.remove).toHaveBeenCalledWith('token')
    expect(Cookies.remove).toHaveBeenCalledWith('refresh_token')
    expect(pushMock).toHaveBeenCalledWith({ name: 'login' })
  })
})
