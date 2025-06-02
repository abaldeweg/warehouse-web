import { ref } from 'vue'
import type { Ref } from 'vue'
import Cookies from 'js-cookie'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { apiClient } from '@/api/apiClient'

/**
 * Interface defining the structure of the useLogin composable.
 */
export interface UseLogin {
  username: Ref<string | null>
  password: Ref<string | null>
  isLoggingIn: Ref<boolean>
  invalidCredentials: Ref<boolean>
  login: () => Promise<void>
}

/**
 * useLogin composable for handling user authentication.
 */
export function useLogin(): UseLogin {
  const username = ref<string | null>(null)
  const password = ref<string | null>(null)
  const isLoggingIn = ref<boolean>(false)
  const invalidCredentials = ref<boolean>(false)

  const router = useRouter()

  /**
   * Checks the user's credentials by sending a login request to the API.
   */
  const checkLogin = async (): Promise<AxiosResponse> => {
    const response = await apiClient.post('/api/login_check', {
      username: username.value,
      password: password.value,
    })
    return response
  }

  /**
   * Checks if the login response is valid.
   */
  const isValid = (res: AxiosResponse): boolean => {
    return (
      res.status === 200 &&
      res.data &&
      typeof res.data.token === 'string' &&
      typeof res.data.refresh_token === 'string'
    )
  }

  /**
   * Stores authentication tokens in cookies.
   */
  const setCookies = (response: AxiosResponse): void => {
    if (!isValid(response)) return
    Cookies.set('token', response.data.token, { expires: 7 })
    Cookies.set('refresh_token', response.data.refresh_token, {
      expires: 30,
    })
  }

  /**
   * Attempts to log in the user using the provided credentials.
   * Updates state and navigates on success.
   */
  const login = async (): Promise<void> => {
    invalidCredentials.value = false
    isLoggingIn.value = true

    const req = await checkLogin()
    isLoggingIn.value = false
    setCookies(req)

    if (isValid(req)) {
      router.push({ name: 'home' })
    }

    if (!isValid(req)) {
      invalidCredentials.value = true
    }
  }

  return {
    username,
    password,
    isLoggingIn,
    invalidCredentials,
    login,
  }
}
