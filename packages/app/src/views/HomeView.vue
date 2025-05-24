<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import Stats from '@/components/home/Stats.vue'
import Reservations from '@/components/home/Reservations.vue'

const { t } = useI18n()

useHead({
  title: t('Welcome'),
})
</script>

<template>
  <BContainer size="m">
    <h1>{{ t('welcome_to_warehouse') }}</h1>
  </BContainer>

  <Reservations />
  <Stats />
</template>
