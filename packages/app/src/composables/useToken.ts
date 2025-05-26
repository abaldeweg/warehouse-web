import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'

/**
 * Represents a branch entity with its properties.
 */
interface Branch {
  id: number
  name: string
  steps: string
  currency: string
  ordering: string
  public: boolean
  pricelist: string
  cart: boolean
  content: string | null
}

/**
 * Represents a user entity with associated branch and roles.
 */
export interface User {
  id: number
  username: string
  roles: string[]
  branch: Branch
  isUser: boolean
  isAdmin: boolean
}

/**
 * Composable for handling user authentication and token-based API requests.
 */
export function useToken() {
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
