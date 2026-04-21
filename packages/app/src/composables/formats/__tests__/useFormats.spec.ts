import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFormats } from '../useFormats'
import { apiClient } from '@/api/apiClient'

const commonBranch = {
  id: 1,
  name: 'Branch',
  steps: 1,
  currency: 'EUR',
  ordering: null,
  public: true,
  pricelist: '',
  cart: true,
  content: null,
  mail_reservation: null,
}

const mockFormats = [
  { id: 1, name: 'Hardcover', branch_id: 1, branch: commonBranch },
  { id: 2, name: 'Paperback', branch_id: 1, branch: commonBranch },
  { id: 3, name: 'eBook', branch_id: 1, branch: commonBranch },
]

describe('useFormats', () => {
  beforeEach(() => vi.restoreAllMocks())

  it('listFormats populates formats and toggles loading', async () => {
    vi.spyOn(apiClient, 'get').mockResolvedValue({ data: mockFormats })
    const { listFormats, formats, isLoading, processedFormats } = useFormats()

    expect(formats.value).toBeNull()
    const f = listFormats()
    expect(isLoading.value).toBe(true)
    await f
    expect(formats.value).toEqual(mockFormats)
    expect(processedFormats.value).toEqual(mockFormats)
    expect(isLoading.value).toBe(false)
  })

  it('processedFormats filters by criteria and sorts', () => {
    const { formats, criteria, sort, processedFormats } = useFormats()
    formats.value = mockFormats

    criteria.value = 'paper'
    expect(processedFormats.value).toEqual([
      { id: 2, name: 'Paperback', branch_id: 1, branch: commonBranch },
    ])

    criteria.value = null
    sort.value = 'asc'
    expect(processedFormats.value?.map((f) => f.name)).toEqual(['eBook', 'Hardcover', 'Paperback'])

    sort.value = 'desc'
    expect(processedFormats.value?.map((f) => f.name)).toEqual(['Paperback', 'Hardcover', 'eBook'])
  })
})
