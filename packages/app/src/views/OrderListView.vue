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

const isOlderThan14Days = (createdAt: number) => {
  const now = Date.now() / 1000
  const orderDate = createdAt
  const diff = now - orderDate
  return diff > 14 * 86400
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
    <BList v-for="item in orders" :key="item.id" :route="{ name: 'order.detail', params: { id: item.id } }" divider>
      <template #title>
        {{ $t('order_from') }} {{ toLocaleDateString(item.createdAt) }}
      </template>

      <template #text>
        <span v-if="item.open">{{ $t('is_new') }}</span>
        <span v-if="!item.open && isOlderThan14Days(item.createdAt)">{{ $t('older_than_14_days') }}</span>
      </template>

      <template #controls>
        <RouterLink :to="{ name: 'order.detail', params: { id: item.id } }">
          <BMaterialIcon>edit</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
