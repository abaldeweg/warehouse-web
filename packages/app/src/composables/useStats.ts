import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Stats } from '@/types/stats'
import type { UseStats } from '../types/composables'

/**
 * useAuth composable for authentication logic.
 */
export function useStats(): UseStats {
  const stats = ref<Stats | null>(null)

  const fetchStats = async (): Promise<void> => {
    const response = await apiClient.get('/api/book/stats')
    stats.value = response.data
  }

  return {
    stats,
    fetchStats,
  }
}
