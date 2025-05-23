<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useOrder } from '@/composables/useOrder.ts'
import { useDate } from '@/composables/useDate.ts'

const { t } = useI18n()

useHead({ title: t('orders') })

const { orders, isLoading, list } = useOrder()

onMounted(list)

const { toLocaleDateString, isOlderThan } = useDate()
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
      v-for="reservation in orders"
      :key="reservation.id"
      :route="{ name: 'reservation.detail', params: { id: reservation.id } }"
      divider
    >
      <template #title
        >{{ $t('order_from') }} {{ toLocaleDateString(reservation.createdAt) }}</template
      >

      <template #text>
        <span v-if="reservation.open">{{ $t('is_new') }}</span>
        <span v-if="!reservation.open && isOlderThan(14, reservation.createdAt)">{{
          $t('older_than_14_days')
        }}</span>
      </template>

      <template #controls>
        <RouterLink :to="{ name: 'reservation.detail', params: { id: reservation.id } }">
          <BMaterialIcon>edit</BMaterialIcon>
        </RouterLink>
      </template>
    </BList>
  </BContainer>
</template>
