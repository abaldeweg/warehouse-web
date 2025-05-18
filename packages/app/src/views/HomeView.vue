<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'

const { t } = useI18n()

useHead({
  title: t('Welcome'),
})
</script>

<template>
  <BContainer size="m">
    <h1>Welcome to the app!</h1>
  </BContainer>
</template>
