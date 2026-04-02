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
  const sort = ref<'asc' | 'desc' | null>(null)
  const processedConditions = computed<Condition[] | null>((): Condition[] | null => {
    if (!conditions.value) return null
    let result: Condition[] = conditions.value
    if (criteria.value) {
      const needle = criteria.value.toLowerCase().trim()
      result = conditions.value.filter((c) => c.name.toLowerCase().includes(needle))
    }
    if (!sort.value) return result
    const sorted = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return sort.value === 'asc' ? sorted : sorted.reverse()
  })

  const listConditions = async (): Promise<void> => {
    const response = await apiClient.get('/api/condition/')
    conditions.value = response.data
  }

  return {
    conditions,
    criteria,
    sort,
    processedConditions,
    listConditions,
  }
}
