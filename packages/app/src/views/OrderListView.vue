<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useOrder } from '@/composables/useOrder.ts'

const { t } = useI18n()

useHead({ title: t('orders') })

const { orders, isLoading, list } = useOrder()

onMounted(list)

const toLocaleDateString = (data: number): string => {
  const date = new Date(data * 1000)
  return date.toLocaleString()
}
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('orders') }}</h1>
  </BContainer>

  <BContainer size="m" v-if="isLoading">
    <BSpinner size="l" />
  </BContainer>

  <BContainer size="m" v-if="orders">
    <BList
      v-for="item in orders"
      :key="item.id"
      :route="{ name: 'order.detail', params: { id: item.id } }"
      divider
    >
      <template #title>
        {{ $t('order_from') }} {{ toLocaleDateString(item.createdAt) }}
        <BChip v-if="item.open">{{ $t('is_new') }}</BChip>
      </template>

      <template #options>
        <RouterLink :to="{ name: 'order.detail', params: { id: item.id } }">
          {{ $t('details') }}
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
