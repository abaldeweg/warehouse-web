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

  const listTags = async (): Promise<void> => {
    const response = await apiClient.get('/api/tag/')
    tags.value = response.data
  }

  return {
    tags,
    criteria,
    sort,
    processedTags,
    listTags,
  }
}
