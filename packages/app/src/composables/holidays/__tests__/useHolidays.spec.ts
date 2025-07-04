import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useHolidays } from '../useHolidays'

describe('useHolidays', () => {
  beforeEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('activates party', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-01T12:00:00Z'))

    const holidays = useHolidays()
    holidays.startHolidays()

    expect(holidays.hasParty.value).toBe(true)
    expect(holidays.hasSnow.value).toBe(true)
    expect(holidays.showPride.value).toBe(false)
    holidays.stopHolidays()
  })

  it('activates snow', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-12-15T12:00:00Z'))

    const holidays = useHolidays()
    holidays.startHolidays()

    expect(holidays.hasParty.value).toBe(false)
    expect(holidays.hasSnow.value).toBe(true)
    expect(holidays.showPride.value).toBe(false)
    holidays.stopHolidays()
  })

  it('show pride', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-06-10T12:00:00Z'))

    const holidays = useHolidays()
    holidays.startHolidays()

    expect(holidays.hasParty.value).toBe(false)
    expect(holidays.hasSnow.value).toBe(false)
    expect(holidays.showPride.value).toBe(true)
    holidays.stopHolidays()
  })
})
