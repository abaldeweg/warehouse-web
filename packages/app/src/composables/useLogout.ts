import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

/**
 * Composable for handling user logout.
 */
export function useLogout() {
  const router = useRouter()

  const logout = (): void => {
    Cookies.remove('token')
    Cookies.remove('refresh_token')

    router.push({ name: 'login' })
  }

  return {
    logout,
  }
}
