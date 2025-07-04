import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { User } from '@/types/model/user'
import type { UseToken } from '@/types/composables'

/**
 * Composable for handling user authentication and token-based API requests.
 */
export function useToken(): UseToken {
  const user = ref<User | null>(null)

  /**
   * Fetches the current user from the API and updates the user ref.
   */
  const fetchUser = async (): Promise<void> => {
    user.value = null
    const res = await apiClient.get('/api/me')
    if (res.status === 200) {
      user.value = res.data
    }
  }

  return { user, fetchUser }
}
