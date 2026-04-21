<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'

defineProps({
  isDrawerActive: Boolean,
})

const emit = defineEmits<{
  (event: 'update:isDrawerActive', value: boolean): void
  (event: 'close-drawer'): void
}>()

const catalog: string = import.meta.env.VITE_CATALOG
const shop: string = import.meta.env.VITE_SHOP

const nav = (path: string): string => {
  const baseURL: string = import.meta.env.VITE_BASE_URL
  let p = `${baseURL}${path}`
  if (p.startsWith('//')) p = p.slice(1)
  return p
}
</script>

<template>
  <BPanel
    :model-value="isDrawerActive"
    @update:model-value="emit('update:isDrawerActive', $event)"
    @close="emit('close-drawer')"
  >
    <template #header>
      <BContainer>
        <AppLogo />
      </BContainer>
    </template>

    <template #footer>
      <BButton
        design="text"
        @click="emit('close-drawer')"
        :style="{ float: 'right', marginRight: '10px' }"
      >
        <BMaterialIcon color="var(--color-neutral-10)" hover>left_panel_close</BMaterialIcon>
      </BButton>
    </template>

    <BNavigation>
      <BNavigationItem :route="nav('/home')" icon="home">{{ $t('home') }}</BNavigationItem>
      <BNavigationItem :route="nav(catalog)" icon="menu_book">{{ $t('catalog') }}</BNavigationItem>
      <BNavigationItem :route="nav('/reservation')" icon="shopping_cart">{{
        $t('reservations')
      }}</BNavigationItem>
      <BNavigationItem :route="nav('/settings')" icon="settings">{{
        $t('settings')
      }}</BNavigationItem>
      <BNavigationItem :route="shop" icon="store">{{ $t('shop') }}</BNavigationItem>
      <BNavigationItem :route="'/help'" icon="help">{{ $t('help') }}</BNavigationItem>
    </BNavigation>
  </BPanel>
</template>
