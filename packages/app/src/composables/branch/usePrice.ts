import type { PricelistEntry, PricelistData } from '@/types/model/branch'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface UsePrices {
  sections: Ref<{
    label: string
    entries: PricelistEntry[]
    prefix: string
  }[]>
  pricelist: Ref<{
    base: number
    releaseYear: PricelistEntry[]
    condition: PricelistEntry[]
  }>
  parse: (value: string) => PricelistData
  toRecord: (entries: PricelistEntry[]) => Record<string, string>
  addEntry: (entries: PricelistEntry[]) => void
  removeEntry: (entries: PricelistEntry[], index: number) => void
  moveEntryUp: (entries: PricelistEntry[], index: number) => void
  moveEntryDown: (entries: PricelistEntry[], index: number) => void
}

/**
 * usePrice composable for managing pricelist logic.
 */
export function usePrice(): UsePrices {
  const { t } = useI18n()

  const pricelist = ref<PricelistData>({
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
  const addEntry = (entries: PricelistEntry[]): number => entries.push({ key: '', value: '' })

  /**
   * Removes the entry at the specified index from the given entries array.
   */
  const removeEntry = (entries: PricelistEntry[], index: number): PricelistEntry[] => entries.splice(index, 1)

  /**
   * Moves the entry at the given index one position up.
   */
  const moveEntryUp = (entries: PricelistEntry[], index: number): void => {
    if (index <= 0) return
    ;[entries[index - 1], entries[index]] = [entries[index], entries[index - 1]]
  }

  /**
   * Moves the entry at the given index one position down.
   */
  const moveEntryDown = (entries: PricelistEntry[], index: number): void => {
    if (index >= entries.length - 1) return
    ;[entries[index], entries[index + 1]] = [entries[index + 1], entries[index]]
  }

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
    pricelist, sections, parse, toRecord, addEntry, removeEntry, moveEntryUp, moveEntryDown
  }
}
