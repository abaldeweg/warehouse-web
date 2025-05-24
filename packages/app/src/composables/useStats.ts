import Cookies from 'js-cookie'
import type { AxiosResponse, Method } from 'axios'
import axios from 'axios'
import { ref } from 'vue'

/**
 * useAuth composable for authentication logic.
 */
export function useStats() {
  const stats = ref<any>(null)
  /**
   * Make an authenticated API request.
   */
  const request = (
    method: Method,
    url: string,
    data?: any,
    params?: any,
  ): Promise<AxiosResponse> => {
    const config = {
      baseURL: import.meta.env.VITE_API,
      timeout: 50000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + Cookies.get('token'),
      },
    }

    return axios.create(config).request({
      method,
      url,
      data,
      params,
    })
  }

  const fetchStats = async (): Promise<any> => {
    const response = await request('get', '/api/book/stats')
    stats.value = response.data
  }

  return {
    stats,
    fetchStats,
  }
}
