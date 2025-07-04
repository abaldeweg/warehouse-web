import { describe, it, expect } from 'vitest'
import { useDate } from '../useDate'

describe('useDate', () => {
  const { toLocaleDateString, isOlderThan } = useDate()

  it('should convert a timestamp to a locale date string', () => {
    const timestamp = 1735686000

    const result = toLocaleDateString(timestamp)

    expect(result).toBe(new Date(timestamp * 1000).toLocaleString())
  })

  it('should return true if the timestamp is older than the specified days', () => {
    const days = 14
    const timestamp = Date.now() / 1000 - days * 86400 - 1

    const result = isOlderThan(days, timestamp)

    expect(result).toBe(true)
  })

  it('should return false if the timestamp is not older than the specified days', () => {
    const days = 14
    const timestamp = Date.now() / 1000 - days * 86400 + 1

    const result = isOlderThan(days, timestamp)

    expect(result).toBe(false)
  })
})
