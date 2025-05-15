import { ref } from 'vue'
import Cookies from 'js-cookie'
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'

const isAuthenticated: Ref<boolean> = ref(false)
const user: Ref<Record<string, any> | null> = ref(null)
const lastCheck: Ref<number | null> = ref(null)

/**
 * useAuth composable for authentication logic.
 * @returns {Object} - Methods for authentication
 *   - isUserAuthenticated: Checks if the user is authenticated (with token refresh if needed)
 */
export function useAuth() {
  /**
   * Make an authenticated API request.
   * @param {Method} method - HTTP method
   * @param {string} url - API endpoint
   * @param {any} [data] - Request body
   * @param {any} [params] - Query parameters
   * @returns {Promise<AxiosResponse>} - Axios response promise
   */
  const request = (method: Method, url: string, data?: any, params?: any): Promise<AxiosResponse> => {
    const config = {
      baseURL: import.meta.env.VITE_APP_API,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('token'),
      },
    }

    return axios.create(config).request({
      method,
      url,
      data,
      params,
    })
  }

  /**
   * Fetch user data from the API and update the user ref.
   * @returns {Promise<void>}
   */
  const fetchUser = async (): Promise<void> => {
    user.value = null
    if (Cookies.get('token') !== undefined) {
      const response = await request('get', '/api/me')
      user.value = response.data
    }
  }

  /**
   * Fetch a new token using the refresh token and update cookies.
   * @returns {Promise<void>}
   */
  const fetchTokenByRefreshToken = async (): Promise<void> => {
    if (Cookies.get('refresh_token')) {
      const response = await request('post', '/api/token/refresh', {
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
   * @returns {Promise<void>}
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
   * @returns {Promise<boolean>} - True if authenticated, false otherwise
   */
  const isUserAuthenticated = async (): Promise<boolean> => {
    const currentTime = Math.floor(Date.now() / 1000);

    if (!Cookies.get('token') || !lastCheck.value || currentTime - lastCheck.value > 3600) {
      await getUserAuthenticationStatus();
      updateLastCheck();
    }

    return isAuthenticated.value;
  }

  return {
    isAuthenticated,
    user,
    isUserAuthenticated,
  }
}
