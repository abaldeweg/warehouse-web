import { ref } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { UseAnalyze } from '@/types/composables'
import type { Analyze } from '@/types/model/analyze'

/**
 * useAnalyze composable for analyze logic.
 */
export function useAnalyze(): UseAnalyze {
  const analyze = ref<Analyze[] | null>(null)

  /**
   * Fetch shop search data with optional date range. If no dates are provided, defaults to the last 30 days.
   */
  const fetchShopSearch = async (start?: string, end?: string): Promise<void> => {
    if (!start) {
      const range = new Date()
      range.setDate(range.getDate() - 30)

      start = range.toISOString().slice(0, 10)
    }
    if (!end) {
      const now = new Date()
      end = now.toISOString().slice(0, 10)
    }
    console.log(`Using default date range: ${start} to ${end}`)

    const response = await apiClient.get(`/api/analyze/shop-search`, {
      params: {
        start,
        end,
      },
    })

    analyze.value = response.data
  }

  return {
    analyze,
    fetchShopSearch,
  }
}
