<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
// import {useReservations} from '@/composables/reservations/useReservations'

const { t } = useI18n()

useHead({ title: t('products') })

const catalogRef = ref<HTMLIFrameElement>()
const iframeHeight = ref<string>('auto')
const catalog: string = import.meta.env.VITE_CATALOG
let resizeObserver: ResizeObserver | null = null

// const {countAllReservations, countOpenReservations,countOutdatedReservations} = useReservations()

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

/**
 * Scrolls the page to the top.
 */
const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
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
  <!-- <BContainer size="l">
    <BAlert type="danger">
      <RouterLink :to="{ name: 'reservation' }" :style="{ textDecoration: 'none' }">
        <BMaterialIcon class="icon">euro</BMaterialIcon>
        {{t('open_reservations')}}: {{ countOpenReservations }} &bull;
        {{t('outdated_reservations')}}: {{ countOutdatedReservations }} &bull;
        {{t('all_reservations')}}: {{ countAllReservations }}
      </RouterLink>
    </BAlert>
  </BContainer> -->
  <iframe
    ref="catalogRef"
    :src="catalog"
    class="catalog"
    :style="{ height: iframeHeight }"
  ></iframe>

  <button
    @click="scrollToTop"
    class="scroll-to-top"
    :title="t('scroll_to_top')"
    aria-label="Scroll to top"
  >
    <BMaterialIcon>arrow_upward</BMaterialIcon>
  </button>
</template>

<style scoped>
.catalog {
  width: 100%;
  min-height: 100vh;
  border: none;
  display: block;
}

.icon {
  float: right;
}

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background-color: var(--color-neutral-10);
  color: var(--color-neutral-00);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scroll-to-top:hover {
  background-color: var(--color-neutral-08);
}
</style>
