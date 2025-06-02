import { ref } from 'vue'
import type { Ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Stats } from '@/types/stats'

export interface UseStats {
  stats: Ref<Stats | null>
  fetchStats: () => Promise<void>
}

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
