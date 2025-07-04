import type { UseDate } from '../types/composables'

/**
 * useDate composable for date manipulation logic.
 */
export function useDate(): UseDate {
  /**
   * Converts a Unix timestamp to a locale date string.
   */
  const toLocaleDateString = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleString()
  }

  /**
   * Checks if a given timestamp is older than the specified number of days.
   */
  const isOlderThan = (days: number, timestamp: number) => {
    const now = Date.now() / 1000
    const seconds = timestamp
    const diff = now - seconds
    return diff > days * 86400
  }

  return {
    toLocaleDateString,
    isOlderThan,
  }
}
