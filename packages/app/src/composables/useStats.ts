import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'

/**
 * useAuth composable for authentication logic.
 */
export function useStats() {
  const stats = ref<any>(null)

  const fetchStats = async (): Promise<any> => {
    const response = await apiClient.get('/api/book/stats')
    stats.value = response.data
  }

  return {
    stats,
    fetchStats,
  }
}
