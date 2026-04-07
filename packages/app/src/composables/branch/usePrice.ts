import type { UsePrices } from '@/types/composables'
import type { PricelistEntry, PricelistData } from '@/types/model/branch'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * usePrice composable for managing pricelist logic.
 */
export function usePrice(): UsePrices {
  const { t } = useI18n()

  const pricelist = ref({
    base: 0,
    releaseYear: [] as PricelistEntry[],
    condition: [] as PricelistEntry[],
  })

  const sections = computed(() => [
    {
      label: t('release_year'),
      entries: pricelist.value.releaseYear,
      prefix: 'releaseYear',
    },
    {
      label: t('condition'),
      entries: pricelist.value.condition,
      prefix: 'condition',
    },
  ])

  /**
   * Converts a record of key-value pairs into an array of PricelistEntry objects.
   */
  const toEntries = (r: Record<string, string>): PricelistEntry[] =>
    Object.entries(r).map(([key, value]) => ({ key, value }))

  /**
   * Converts an array of PricelistEntry objects into a record of key-value pairs.
   */
  const toRecord = (entries: PricelistEntry[]): Record<string, string> =>
    Object.fromEntries(entries.map((e) => [e.key, e.value]))

  /**
   * Adds a new entry with empty key and value to the given entries array.
   */
  const addEntry = (entries: PricelistEntry[]) => entries.push({ key: '', value: '' })

  /**
   * Removes the entry at the specified index from the given entries array.
   */
  const removeEntry = (entries: PricelistEntry[], index: number) => entries.splice(index, 1)

  /**
   * Parses the input JSON string into a PricelistData object.
   */
  const parse = (value: string): PricelistData => {
    try {
      const parsed = JSON.parse(value)
      return {
        base: parsed.base ?? 0,
        releaseYear: toEntries(parsed.releaseYear ?? {}),
        condition: toEntries(parsed.condition ?? {}),
      }
    } catch {
      return { base: 0, releaseYear: [], condition: [] }
    }
  }

  return {
    pricelist, sections, parse, toRecord, addEntry, removeEntry
  }
}
