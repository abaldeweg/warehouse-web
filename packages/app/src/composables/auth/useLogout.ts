import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'
import type { UseLogout } from '@/types/composables'

/**
 * Composable for handling user logout.
 */
export function useLogout(): UseLogout {
  const router = useRouter()

  const logout = (): void => {
    Cookies.remove('token')
    Cookies.remove('refresh_token')

    router.push({ name: 'account.login' })
  }

  return {
    logout,
  }
}
