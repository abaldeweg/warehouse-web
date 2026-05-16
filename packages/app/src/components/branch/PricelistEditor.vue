<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePrice } from '@/composables/branch/usePrice'

interface Props {
  modelValue: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { t } = useI18n()

const { pricelist, sections, parse, toRecord, addEntry, removeEntry, moveEntryUp, moveEntryDown } =
  usePrice()

onMounted((): void => {
  pricelist.value = parse(props.modelValue)
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
            <BButton
              design="text"
              type="button"
              @click="moveEntryUp(section.entries, index)"
              :disabled="index === 0"
            >
              <BMaterialIcon>arrow_upward</BMaterialIcon>
            </BButton>
            <BButton
              design="text"
              type="button"
              @click="moveEntryDown(section.entries, index)"
              :disabled="index === section.entries.length - 1"
            >
              <BMaterialIcon>arrow_downward</BMaterialIcon>
            </BButton>
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
