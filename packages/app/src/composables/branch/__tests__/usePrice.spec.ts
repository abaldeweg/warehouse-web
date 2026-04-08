import { describe, it, expect, beforeEach, vi } from 'vitest'
import { usePrice } from '@/composables/branch/usePrice'

vi.mock('vue-i18n', () => ({
  useI18n: () => ({ t: (k: string) => k }),
}))

describe('usePrice', () => {
  let sections: ReturnType<typeof usePrice>['sections']
  let parse: ReturnType<typeof usePrice>['parse']
  let toRecord: ReturnType<typeof usePrice>['toRecord']
  let addEntry: ReturnType<typeof usePrice>['addEntry']
  let removeEntry: ReturnType<typeof usePrice>['removeEntry']

  beforeEach(() => {
    const c = usePrice()
    sections = c.sections
    parse = c.parse
    toRecord = c.toRecord
    addEntry = c.addEntry
    removeEntry = c.removeEntry
  })

  it('parses valid JSON into pricelist data', () => {
    const json = JSON.stringify({ base: 5, releaseYear: { '2020': '2020' }, condition: { good: 'good' } })
    const parsed = parse(json)

    expect(parsed.base).toBe(5)
    expect(parsed.releaseYear).toEqual([{ key: '2020', value: '2020' }])
    expect(parsed.condition).toEqual([{ key: 'good', value: 'good' }])
  })

  it('returns defaults when parsing invalid JSON', () => {
    const parsed = parse('not json')
    expect(parsed.base).toBe(0)
    expect(parsed.releaseYear).toEqual([])
    expect(parsed.condition).toEqual([])
  })

  it('converts entries to record', () => {
    const rec = toRecord([{ key: 'a', value: '1' }, { key: 'b', value: '2' }])
    expect(rec).toEqual({ a: '1', b: '2' })
  })

  it('adds and removes entries', () => {
    const arr: Array<{ key: string; value: string }> = []
    addEntry(arr)
    expect(arr).toHaveLength(1)
    expect(arr[0]).toEqual({ key: '', value: '' })
    addEntry(arr)
    expect(arr).toHaveLength(2)
    removeEntry(arr, 0)
    expect(arr).toHaveLength(1)
  })

  it('computes sections with labels and prefixes', () => {
    const s = sections.value
    expect(s[0].label).toBe('release_year')
    expect(s[0].prefix).toBe('releaseYear')
    expect(s[1].label).toBe('condition')
    expect(s[1].prefix).toBe('condition')
  })
})
