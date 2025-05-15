import Cookies from 'js-cookie'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'
import { ref } from 'vue';

/**
 * Represents a branch entity with its properties.
 */
interface Branch {
  id: number;
  name: string;
  steps: string;
  currency: string;
  ordering: string;
  public: boolean;
  pricelist: string;
  cart: boolean;
  content: any;
}

/**
 * Represents a user entity with associated branch and roles.
 */
export interface User {
  id: number;
  username: string;
  roles: string[];
  branch: Branch;
  isUser: boolean;
  isAdmin: boolean;
}

/**
 * Composable for handling user authentication and token-based API requests.
 */
export function useToken() {
  /**
   * Reactive reference to the current user, or null if not loaded.
   */
  const user = ref<User | null>(null)

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
      baseURL: import.meta.env.VITE_APP_API,
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

  /**
   * Fetches the current user from the API and updates the user ref.
   */
  const fetchUser = async (): Promise<void> => {
    user.value = null
    const res = await request('get', '/api/me')
    if (res.status === 200) {
      user.value = res.data
    }
  }

  return { user, fetchUser }
}
