import { describe, expect, it, vi } from 'vitest'
import { useInventories } from '@/composables/inventory/useInventories'
import { apiClient } from '@/api/apiClient'
import type { Mock } from 'vitest'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

describe('useInventories', () => {
  it('loads and sorts inventories and detects active inventory', async () => {
    const sample = [
      { id: 1, startedAt: 100, endedAt: null },
      { id: 2, startedAt: 200, endedAt: 300 },
      { id: 3, startedAt: 150, endedAt: 160 },
    ]

      ; (apiClient.get as unknown as Mock).mockResolvedValue({ data: sample })

    const { inventories, hasActiveInventory, listInventories } = useInventories()
    expect(inventories.value).toBeNull()

    await listInventories()

    expect(inventories.value).not.toBeNull()
    expect(inventories.value?.map((i) => i.id)).toEqual([2, 3, 1])
    expect(hasActiveInventory.value).toBe(true)
  })
})
