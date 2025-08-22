<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LoginLayout from '@/layouts/LoginLayout.vue'
import PrintLayout from './layouts/PrintLayout.vue'

const layouts: Record<string, object> = {
  default: DefaultLayout,
  login: LoginLayout,
  print: PrintLayout
}

const route = useRouter().currentRoute
const layout = computed(() => layouts[(route.value.meta.layout as string) || 'default'])
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
