import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useTags } from '@/composables/tags/useTags'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('useTags', () => {
  const sample = [
    { id: 1, name: 'banana' },
    { id: 2, name: 'apple' },
    { id: 3, name: 'cherry' },
  ]

  beforeEach(() => {
    const getMock = apiClient.get as unknown as Mock
    getMock.mockReset()
    getMock.mockResolvedValue({ data: sample })
  })

  it('loads tags and updates state', async () => {
    const { tags, isLoading, listTags, processedTags } = useTags()

    expect(tags.value).toBeNull()
    expect(isLoading.value).toBe(false)

    const t = listTags()
    expect(isLoading.value).toBe(true)
    await t

    expect(tags.value).toEqual(sample)
    expect(isLoading.value).toBe(false)
    expect(processedTags.value).toEqual(sample)
  })

  it('filters processedTags by criteria', async () => {
    const { criteria, listTags, processedTags } = useTags()
    await listTags()

    criteria.value = 'app'

    expect(processedTags.value).toHaveLength(1)
    expect(processedTags.value?.[0].name).toContain('app')
  })

  it('sorts processedTags ascending and descending', async () => {
    const { sort, listTags, processedTags } = useTags()
    await listTags()

    sort.value = 'asc'
    const asc = processedTags.value?.map((t) => t.name)
    expect(asc).toEqual(['apple', 'banana', 'cherry'])

    sort.value = 'desc'
    const desc = processedTags.value?.map((t) => t.name)
    expect(desc).toEqual(['cherry', 'banana', 'apple'])
  })
})

