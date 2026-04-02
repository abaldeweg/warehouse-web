import { computed, ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseConditions } from '@/types/composables'
import type { Condition } from '@/types/model/condition'

/**
 * useConditions composable for managing a list of conditions.
 */
export function useConditions(): UseConditions {
  const conditions = ref<Condition[] | null>(null)

  const criteria = ref<string | null>(null)
  const filteredConditions = computed<Condition[] | null>(() => {
    if (!conditions.value) return null
    if (!criteria.value) return conditions.value
    const needle = criteria.value.toLowerCase().trim()
    return conditions.value.filter((c) => c.name.toLowerCase().includes(needle))
  })

  const listConditions = async (): Promise<void> => {
    const response = await apiClient.get('/api/condition/')
    conditions.value = response.data
  }

  return {
    conditions,
    criteria,
    filteredConditions,
    listConditions,
  }
}
