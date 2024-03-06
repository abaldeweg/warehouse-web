import { describe, it, expect, vi, afterEach } from 'vitest'
import { useKeycloak } from '../useKeycloak.js'

vi.mock('keycloak-js', () => {
  function Keycloak() {
    const init = vi.fn(() => Promise.resolve())

    return { init }
  }

  return { default: Keycloak }
})

describe('useKeycloak', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('Auth', async () => {
    const { isAuthenticated } = useKeycloak({
      url: null,
      realm: 'test',
      clientId: 'web',
      redirectUri: null,
    })

    isAuthenticated

    expect(isAuthenticated.value).toBeFalsy()
  })
})
