<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import AppMasthead from './components/AppMasthead.vue'
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router'

useHead({
  title: 'Home',
})

const isDrawerActive = ref(false)

const about = import.meta.env.VITE_APP_ABOUT

onMounted(() => {
  const router = useRouter()
  router.beforeEach((to, from, next) => {
    isDrawerActive.value = false
    next()
  })
})
</script>

<template>
  <BApp>
    <AppMasthead @open-drawer="isDrawerActive = true" />

    <RouterView />

    <div class="footer">
      <b-container size="s">
        <div v-html="about" />
      </b-container>
    </div>
  </BApp>

  <BPanel v-model="isDrawerActive" @close="isDrawerActive = false">
    <BContainer size="m">
      <BNav :nav="[
        { route: { name: 'home' }, title: $t('home') },
        { route: { name: 'orders' }, title: $t('reservation') },
      ]" />
    </BContainer>
  </BPanel>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-neutral-02);
}
</style>
