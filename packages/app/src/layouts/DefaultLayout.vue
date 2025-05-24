<script setup lang="ts">
import AppMasthead from '@/components/AppMasthead.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppPanel from '@/components/AppPanel.vue'
import AppFooter from '@/components/AppFooter.vue'

const isDrawerActive = ref(false)
const router = useRouter()

onMounted(() => {
  router.beforeEach(() => {
    isDrawerActive.value = false
  })
})
</script>

<template>
  <BApp>
    <AppMasthead @open-drawer="isDrawerActive = true" />
    <slot />
    <AppFooter />
  </BApp>
  <AppPanel v-model:isDrawerActive="isDrawerActive" />
</template>
