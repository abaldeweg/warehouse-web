import { ref } from 'vue'
import Cookies from 'js-cookie'
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import type { Method } from 'axios'

export function usePassword() {
  const password: Ref<string | null> = ref(null)
  const isChangingPassword: Ref<boolean> = ref(false)
  const passwordSuccessful: Ref<boolean> = ref(false)
  const passwordError: Ref<boolean> = ref(false)

  /**
   * Make an authenticated API request.
   */
  const request = (method: Method, url: string, data?: any, params?: any): Promise<AxiosResponse> => {
    const config = {
      baseURL: import.meta.env.VITE_BASE_URL,
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
   * Attempts to change the user's password by sending a PUT request to the API.
   */
  const changePassword = async (): Promise<void> => {
    isChangingPassword.value = true

    const response = await request('put', '/api/password', {
      password: password.value,
    })

    if (response.status === 200) {
      passwordSuccessful.value = true
    }

    if (response.status !== 200) {
      passwordError.value = true
    }

    isChangingPassword.value = false
  }

  return {
    password,
    isChangingPassword,
    passwordSuccessful,
    passwordError,
    changePassword,
  }
}
