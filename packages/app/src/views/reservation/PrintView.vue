<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { watchEffect, nextTick } from 'vue'
import OrderPrintTable from '@/components/reservation/PrintTable.vue'
import OrderPrintCustomer from '@/components/reservation/PrintCustomer.vue'
import { useDate } from '@/composables/reservations/useDate'
import { useReservation } from '@/composables/reservations/useReservation'
import { useRouter } from 'vue-router'

const props = defineProps<{ id: string }>()

const { t } = useI18n()
useHead({ title: t('reservation') })

const { reservation } = useReservation(props.id)
const { toLocaleDateString } = useDate()

const router = useRouter()
watchEffect(() => {
  if (reservation.value) {
    nextTick(() => {
      window.print()
      router.push({ name: 'reservation.detail', params: { id: props.id } })
    })
  }
})
</script>

<template>
  <div v-if="reservation" class="reservation_order">
    <BContainer size="m">
      <h1>{{ $t('reservation_from') }} {{ toLocaleDateString(reservation.createdAt) }}</h1>
    </BContainer>

    <BContainer size="m" class="customer">
      <OrderPrintCustomer :reservation="reservation" />
    </BContainer>

    <BContainer size="m" class="products">
      <OrderPrintTable :products="reservation.books" />
    </BContainer>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
}
</style>
