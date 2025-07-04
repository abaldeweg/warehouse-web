<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDate } from '@/composables/useDate'
import { useReservations } from '@/composables/reservations/useReservations'

const { t } = useI18n()

const { reservations, reservationsCount } = useReservations()

const { isOlderThan } = useDate()

const countOpenReservations = computed(() => {
  return reservations.value?.filter((order) => order.open === true).length || 0
})

const countOutdatedReservations = computed(() => {
  return reservations.value?.filter((order) => isOlderThan(14, order.createdAt)).length || 0
})
</script>

<template>
  <BContainer size="m">
    <h2>{{ t('reservations') }}</h2>
  </BContainer>

  <BContainer size="m">
    <div class="reservations">
      <div class="card">
        <div class="card_number">
          <BMaterialIcon :size="50">storefront</BMaterialIcon>
        </div>
      </div>
      <div class="card">
        <div class="card_number">{{ reservationsCount }} in total</div>
      </div>
      <div class="card">
        <div class="card_number isHighlighted">{{ countOpenReservations }} new</div>
      </div>
      <div class="card">
        <div class="card_number isHighlighted">{{ countOutdatedReservations }} outdated</div>
      </div>
    </div>
  </BContainer>
</template>

<style scoped>
.card {
  flex: 1;
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
}

.card_number {
  font-size: 2rem;
  font-weight: bold;
}

.card_number.isHighlighted {
  color: var(--color-primary-10);
}

.card_title {
  margin-top: 5px;
  color: var(--color-neutral-08);
  font-size: 0.9rem;
}

.reservations {
  display: flex;
  gap: 20px;
}
</style>
