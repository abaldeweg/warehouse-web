<script setup lang="ts">
import { useHolidays } from '@/composables/useHolidays'
import { onMounted, onUnmounted, watch } from 'vue'

const { date, showPride, startHolidays, stopHolidays } = useHolidays()

const simulateDate = (data: string): void => {
  const simulatedDate = new Date(data)
  date.value = simulatedDate
}

watch(date, () => {
  stopHolidays()
  startHolidays()
})

onMounted(() => {
  startHolidays()
})

onUnmounted(() => {
  stopHolidays()
})
</script>

<template>
  <div class="pride" v-if="showPride" />
  <BContainer size="m">
    Simulate Date:
    <BButton design="outline" @click="simulateDate('2025-12-01')">December and January</BButton>
    <BButton design="outline" @click="simulateDate('2025-12-31')"
      >December 31, January 1 to January 6</BButton
    >
    <BButton design="outline" @click="simulateDate('2025-06-01')">June</BButton>
  </BContainer>
</template>

<style scoped>
.pride {
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(240, 0, 0, 1) 0%,
    rgba(255, 128, 0, 1) 20%,
    rgba(255, 255, 0, 1) 40%,
    rgba(0, 121, 64, 1) 60%,
    rgba(64, 64, 255, 1) 80%,
    rgba(160, 0, 192, 1) 100%
  );
  width: 100%;
  height: 3px;
  z-index: 3;
}
</style>
