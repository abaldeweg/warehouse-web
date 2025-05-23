<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'
import AppMasthead from './components/AppMasthead.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppPanel from '@/components/AppPanel.vue'
import { useI18n } from 'vue-i18n'
import AppFooter from './components/AppFooter.vue'

const { t } = useI18n()

useHead({
  title: t('home'),
})

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
    <RouterView />
    <AppFooter />
  </BApp>
  <AppPanel v-model:isDrawerActive="isDrawerActive" />
</template>
