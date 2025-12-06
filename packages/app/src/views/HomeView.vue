<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import Stats from '@/components/home/BookStats.vue'
import Reservations from '@/components/home/ReservationsStats.vue'
import Storage from '@/components/home/StorageStats.vue'
import { useStats } from '@/composables/stats/useStats'
import { useReservations } from '@/composables/reservations/useReservations'

const { t } = useI18n()

useHead({
  title: t('welcome'),
})

const { stats, fetchStats } = useStats()
fetchStats()

const { countAllReservations, countOpenReservations, countOutdatedReservations } = useReservations()
</script>

<template>
  <BContainer size="m">
    <h1>{{ t('welcome_to_warehouse') }}</h1>
  </BContainer>

  <BContainer size="m">
    <div class="dashboard">
      <div class="widget">
        <Stats :stats="stats" />
      </div>
      <div class="widget">
        <Reservations :countAllReservations="countAllReservations" :countOpenReservations="countOpenReservations"
          :countOutdatedReservations="countOutdatedReservations" />
        <Storage :stats="stats" />
      </div>
    </div>

  </BContainer>
</template>

<style scoped>
@media (min-width: 600px) {
  .dashboard {
    display: flex;
    gap: 20px;
  }

  .widget {
    flex-grow: 1;
  }
}
</style>
