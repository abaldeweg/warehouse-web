import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

/**
 * Composable for handling user logout.
 */
export function useLogout() {
  const logout = (): void => {
    Cookies.remove('token')
    Cookies.remove('refresh_token')

    const router = useRouter()
    router.push({ name: 'login' })
  }

  return {
    logout,
  }
}
