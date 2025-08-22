<script setup lang="ts">
import AppMasthead from '@/components/AppMasthead.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppPanel from '@/components/AppPanel.vue'
import AppFooter from '@/components/AppFooter.vue'

const isDrawerActive = ref(true)
const router = useRouter()

onMounted(() => {
  router.beforeEach(() => {
    isDrawerActive.value = true
  })
})
</script>

<template>
  <BApp>
    <div :style="{ marginLeft: isDrawerActive ? '300px' : '0px' }">
      <AppMasthead @open-drawer="isDrawerActive = true" />
      <slot />
      <AppFooter />
    </div>
  </BApp>
  <AppPanel v-model:isDrawerActive="isDrawerActive" permanent @close-drawer="isDrawerActive = false" />
</template>
