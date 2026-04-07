import { ref, computed } from 'vue'
import { apiClient } from '@/api/apiClient'
import type { Tag } from '@/types/model/tag'
import type { UseTags } from '@/types/composables'

/**
 * useTags composable for managing a list of tags.
 */
export function useTags(): UseTags {
  const tags = ref<Tag[] | null>(null)
  const criteria = ref<string | null>(null)
  const sort = ref<'asc' | 'desc' | null>(null)
  const isLoading = ref<boolean>(false)


  const processedTags = computed<Tag[] | null>((): Tag[] | null => {
    if (!tags.value) return null
    let result: Tag[] = tags.value
    if (criteria.value) {
      const needle = criteria.value.toLowerCase().trim()
      result = tags.value.filter((t) => t.name.toLowerCase().includes(needle))
    }
    if (!sort.value) return result
    const sorted = [...result].sort((a, b) => a.name.localeCompare(b.name))
    return sort.value === 'asc' ? sorted : sorted.reverse()
  })

  /**
   * Fetches the list of tags from the API and updates the `tags` ref.
   */
  const listTags = async (): Promise<void> => {
    isLoading.value = true
    const response = await apiClient.get('/api/tag/')
    tags.value = response.data
    isLoading.value = false
  }

  return {
    tags,
    criteria,
    sort,
    isLoading,
    processedTags,
    listTags,
  }
}
