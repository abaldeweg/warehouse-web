<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

interface PricelistEntry {
  key: string
  value: string
}

interface PricelistData {
  base: number
  releaseYear: PricelistEntry[]
  condition: PricelistEntry[]
}

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

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

onMounted((): void => {
  const parsed: PricelistData = parse(props.modelValue)
  pricelist.value.base = parsed.base
  pricelist.value.releaseYear = parsed.releaseYear
  pricelist.value.condition = parsed.condition
})

watch(
  pricelist,
  (): void =>
    emit(
      'update:modelValue',
      JSON.stringify({
        base: Number(pricelist.value.base),
        releaseYear: toRecord(pricelist.value.releaseYear),
        condition: toRecord(pricelist.value.condition),
      }),
    ),
  { deep: true },
)
</script>

<template>
  <BFieldset :legend="t('pricelist')">
    <BInput type="number" name="base" id="base" :label="t('base_price')" v-model="pricelist.base" />

    <table v-for="section in sections" :key="section.prefix">
      <thead>
        <tr>
          <th>{{ section.label }}</th>
          <th>{{ t('price') }}</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in section.entries" :key="index">
          <td>
            <BInput
              type="text"
              :name="`${section.prefix}_key_${index}`"
              :id="`${section.prefix}_key_${index}`"
              v-model="entry.key"
            />
          </td>
          <td>
            <BInput
              type="text"
              :name="`${section.prefix}_price_${index}`"
              :id="`${section.prefix}_price_${index}`"
              v-model="entry.value"
            />
          </td>
          <td class="alignRight">
            <BButton design="text" type="button" @click="removeEntry(section.entries, index)">
              <BMaterialIcon color="var(--color-neutral-10)">delete</BMaterialIcon>
            </BButton>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="alignRight">
            <BButton design="text" type="button" @click="addEntry(section.entries)">
              <BMaterialIcon>add</BMaterialIcon>
            </BButton>
          </td>
        </tr>
      </tfoot>
    </table>
  </BFieldset>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
