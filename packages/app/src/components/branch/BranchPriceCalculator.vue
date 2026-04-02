<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Branch } from '@/types/model/branch'
import type { User } from '@/types/model/user'

const { t } = useI18n()

const props = defineProps<{
  branch: Branch | null
  user: User | null
}>()

const emit = defineEmits(['update'])

const base = <number>(props.branch?.pricelist ? JSON.parse(props.branch.pricelist).base : 0)
const releaseYear = ref<string | null>(null)
const condition = ref<string | null>(null)
const pricelist = ref(
  props.branch?.pricelist
    ? JSON.parse(props.branch.pricelist)
    : {
        base: 0,
        releaseYear: {},
        condition: {},
      },
)

const toString = (id: string): string => {
  if (!props.branch?.pricelist) return ''

  const pricelist = JSON.parse(props.branch.pricelist)[id]
  let elements = ''

  for (const key in pricelist) {
    elements += key + ':' + pricelist[key] + '\n'
  }

  return elements
}

const toArray = (value: string | null) => {
  const prices: Record<string, string> = {}

  if (!value) return prices

  value.split('\n').forEach((element: string) => {
    const item = element.split(':')

    if ('' === item[0] || undefined === item[1]) return

    prices[item[0]] = item[1]
  })

  return prices
}

onMounted(() => {
  releaseYear.value = toString('releaseYear')
  condition.value = toString('condition')
})

watch(
  () => releaseYear.value,
  (value) => {
    pricelist.value.releaseYear = toArray(value)
  },
)

watch(
  () => condition.value,
  (value) => {
    pricelist.value.condition = toArray(value)
  },
)

const update = () => {
  if (!props.user || !props.user.isAdmin) return

  emit('update', {
    id: props.branch?.id,
    params: {
      name: props.branch?.name,
      steps: props.branch?.steps,
      currency: props.branch?.currency,
      ordering: props.branch?.ordering,
      public: props.branch?.public,
      pricelist: JSON.stringify(pricelist.value),
      cart: props.branch?.cart,
      content: props.branch?.content,
    },
  })
}
</script>

<template>
  <BForm @submit.prevent="update" v-if="branch">
    <BInput type="number" name="baseprice" id="baseprice" v-model="base" />
    <BTextarea
      rows="5"
      name="release_year"
      id="releaseYear"
      :label="t('price_calc_release_year')"
      :help="t('price_calc_release_year_help')"
      v-model="releaseYear"
    />
    <BTextarea
      rows="5"
      name="condition"
      id="condition"
      :label="t('price_calc_condition')"
      :help="t('price_calc_condition_help')"
      v-model="condition"
    />

    <template #buttons>
      <b-button design="outline">{{ $t('save') }}</b-button>
    </template>
  </BForm>
</template>
