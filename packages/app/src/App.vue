<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import AppMasthead from './components/AppMasthead.vue'
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'
import AppPanel from './components/AppPanel.vue'

useHead({
  title: 'Home',
})

const isDrawerActive = ref(false)

const about = import.meta.env.VITE_APP_ABOUT

onMounted(() => {
  const router = useRouter()
  router.beforeEach(() => {
    isDrawerActive.value = false
  })
})
</script>

<template>
  <BApp>
    <AppMasthead @open-drawer="isDrawerActive = true" />

    <RouterView />

    <div class="footer">
      <BContainer size="s">
        <div v-html="about" />
      </BContainer>
    </div>
  </BApp>

  <AppPanel v-model:isDrawerActive="isDrawerActive"  />
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
