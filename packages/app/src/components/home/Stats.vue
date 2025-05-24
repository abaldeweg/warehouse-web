<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useStats } from '@/composables/useStats'

const { t } = useI18n()

const { stats, fetchStats } = useStats()
fetchStats()
</script>

<template>
  <BContainer size="m">
    <h2>{{ t('stats') }}</h2>
  </BContainer>

  <BContainer size="m" v-if="stats">
    <BFlex justify="space-between" gap="20px">
      <div class="card">
        <div class="card_number isHighlighted">{{ (stats.storage / 1024).toFixed(2) }} GB</div>
        <div class="card_title">Storage Usage (Cover)</div>
      </div>
      <div class="card">
        <div class="card_number isHighlighted">{{ stats.all }}</div>
        <div class="card_title">Products</div>
      </div>
      <div class="card">
        <div class="card_number">{{ stats.available }}</div>
        <div class="card_title">Available Products</div>
      </div>
      <div class="card">
        <div class="card_number">{{ stats.reserved }}</div>
        <div class="card_title">Reserved Products</div>
      </div>
      <div class="card">
        <div class="card_number">{{ stats.sold }}</div>
        <div class="card_title">Sold Products</div>
      </div>
      <div class="card">
        <div class="card_number">{{ stats.removed }}</div>
        <div class="card_title">Removed Products</div>
      </div>
    </BFlex>
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
</style>
