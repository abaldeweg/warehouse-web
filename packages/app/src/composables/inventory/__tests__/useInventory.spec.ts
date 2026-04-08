import { describe, expect, it, vi } from 'vitest'
import type { Mock } from 'vitest'
import { useInventory } from '@/composables/inventory/useInventory'
import { apiClient } from '@/api/apiClient'

vi.mock('@/api/apiClient', () => ({
  apiClient: {
    post: vi.fn(),
    put: vi.fn(),
  },
}))

describe('useInventory', () => {
  it('calls post to create an inventory', async () => {
    ; (apiClient.post as unknown as Mock).mockResolvedValue({})
    const { createInventory } = useInventory()
    await createInventory()
    expect(apiClient.post).toHaveBeenCalledWith('/api/inventory/new')
  })

  it('calls put to end an inventory with endedAt', async () => {
    ; (apiClient.put as unknown as Mock).mockResolvedValue({})
    const { endInventory } = useInventory()
    await endInventory(1)
    expect(apiClient.put).toHaveBeenCalled()
    const [url, body] = (apiClient.put as unknown as Mock).mock.calls[0]
    expect(url).toBe('/api/inventory/1')
    expect(typeof body.endedAt).toBe('number')
  })
})
