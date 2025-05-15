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
    <p>Welcome to the app!</p>
    <p>This is just a preview, very much stuff is missing.</p>
  </BContainer>
</template>
