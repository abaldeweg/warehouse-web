<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

useHead({ title: t('products') })

const catalogRef = ref<HTMLIFrameElement>()
const iframeHeight = ref<string>('auto')
const catalog: string = import.meta.env.VITE_CATALOG
let resizeObserver: ResizeObserver | null = null

/**
 * Updates the height of the iframe based on its content.
 */
const updateHeight = (): void => {
  const iframe = catalogRef.value
  if (!iframe) return

  try {
    const contentHeight = iframe.contentDocument?.documentElement.scrollHeight
    if (contentHeight) {
      iframeHeight.value = `${contentHeight}px`
    }
  } catch (e) {
    console.error('Cannot access iframe:', e)
  }
}

onMounted((): void => {
  const iframe = catalogRef.value
  if (!iframe) return

  iframe.onload = () => {
    updateHeight()
    resizeObserver = new ResizeObserver(updateHeight)
    if (iframe.contentDocument?.documentElement) {
      resizeObserver.observe(iframe.contentDocument.documentElement)
    }
  }
})

onBeforeUnmount((): void => {
  resizeObserver?.disconnect()
  resizeObserver = null
})

</script>

<template>
  <iframe
    ref="catalogRef"
    :src="catalog"
    class="catalog"
    :style="{ height: iframeHeight }"
  ></iframe>
</template>

<style scoped>
.catalog {
  width: 100%;
  border: none;
  display: block;
}
</style>
