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
    Welcome to the app!
  </BContainer>
</template>
