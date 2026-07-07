<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import Stats from '@/components/home/BookStats.vue'
import Reservations from '@/components/home/ReservationsStats.vue'
import Storage from '@/components/home/StorageStats.vue'
import { useStats } from '@/composables/stats/useStats'
import { useReservations } from '@/composables/reservations/useReservations'
import { useAnalyze } from '@/composables/analyze/useAnalyze'
import ShopSearch from '@/components/home/ShopSearch.vue'

const { t } = useI18n()

useHead({
  title: t('stats'),
})

const { stats, fetchStats } = useStats()
fetchStats()

const { countAllReservations, countOpenReservations, countOutdatedReservations } = useReservations()
const { analyze, fetchShopSearch } = useAnalyze()
fetchShopSearch()
</script>

<template>
  <BContainer size="m">
    <h1>{{ t('stats') }}</h1>
  </BContainer>

  <BContainer size="m">
    <Stats :stats="stats" />
  </BContainer>

  <BContainer size="m">
    <Reservations :countAllReservations="countAllReservations" :countOpenReservations="countOpenReservations"
          :countOutdatedReservations="countOutdatedReservations" />
  </BContainer>

  <BContainer size="m">
    <Storage :stats="stats" />
  </BContainer>

  <BContainer size="m">
    <ShopSearch :analyze="analyze" />
  </BContainer>
</template>
