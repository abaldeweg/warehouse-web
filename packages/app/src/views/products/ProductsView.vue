<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({ title: t('products') })

const catalog: string = import.meta.env.VITE_CATALOG

</script>

<template>
  <iframe :src="catalog" class="catalog"></iframe>
</template>

<style scoped>
.catalog {
  width: 100%;
  height: 100dvh;
  border: none;
}
</style>
