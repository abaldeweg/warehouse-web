import { ref } from 'vue'
import Cookies from 'js-cookie'
import type { Ref } from 'vue'
import { apiClient } from '@/api/apiClient'

const isAuthenticated: Ref<boolean> = ref(false)
const user: Ref<Record<string, any> | null> = ref(null)
const lastCheck: Ref<number | null> = ref(null)

/**
 * useAuth composable for authentication logic.
 */
export function useAuth() {
  /**
   * Fetch user data from the API and update the user ref.
   */
  const fetchUser = async (): Promise<void> => {
    user.value = null
    if (Cookies.get('token') !== undefined) {
      try {
        const response = await apiClient.get('/api/me')
        if (response.status === 200 && response.data && typeof response.data === 'object') {
          user.value = response.data
        }
      } catch (error: any) {
        console.error('Error fetching user data:', error)
      }
    }
  }

  /**
   * Fetch a new token using the refresh token and update cookies.
   */
  const fetchTokenByRefreshToken = async (): Promise<void> => {
    if (Cookies.get('refresh_token')) {
      const response = await apiClient.post('/api/token/refresh', {
        refresh_token: Cookies.get('refresh_token'),
      })
      Cookies.set('token', response.data.token, { expires: 7 })
      Cookies.set('refresh_token', response.data.refresh_token, {
        expires: 30,
      })
    }
  }

  /**
   * Get and update the user's authentication status.
   */
  const getUserAuthenticationStatus = async (): Promise<void> => {
    isAuthenticated.value = false

    if (Cookies.get('token') === undefined && Cookies.get('refresh_token') !== undefined) {
      await fetchTokenByRefreshToken()
    }

    if (Cookies.get('token') !== undefined) {
      await fetchUser()
      if (typeof user.value === 'object') {
        isAuthenticated.value = true
      }
    }
  }

  /**
   * Update the lastCheck timestamp if authenticated, otherwise set to null.
   */
  const updateLastCheck = (): void => {
    if (isAuthenticated.value === true) {
      lastCheck.value = Math.floor(Date.now() / 1000)
      return
    }
    lastCheck.value = null
  }

  /**
   * Check if the user is authenticated. Refreshes token if needed.
   */
  const checkAuthenticationStatus = async (): Promise<boolean> => {
    const currentTime = Math.floor(Date.now() / 1000)

    if (!Cookies.get('token') || !lastCheck.value || currentTime - lastCheck.value > 3600) {
      await getUserAuthenticationStatus()
      updateLastCheck()
    }

    return isAuthenticated.value
  }

  return {
    isAuthenticated,
    user,
    checkAuthenticationStatus,
  }
}
