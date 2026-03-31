import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseConditions } from '@/types/composables'
import type { Condition } from '@/types/model/condition'

/**
 * useConditions composable for managing a list of conditions.
 */
export function useConditions(): UseConditions {
  const conditions = ref<Condition[] | null>(null)

  const listConditions = async (): Promise<void> => {
    const response = await apiClient.get('/api/condition/')
    conditions.value = response.data
  }

  return {
    conditions,
    listConditions,
  }
}
