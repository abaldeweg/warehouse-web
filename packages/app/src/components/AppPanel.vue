<script setup>
import AppLogo from '@/components/AppLogo.vue'

defineProps({
  isDrawerActive: Boolean,
})

const catalog = import.meta.env.VITE_CATALOG
const settings = import.meta.env.VITE_SETTINGS
const shop = import.meta.env.VITE_SHOP
</script>

<template>
  <BPanel :model-value="isDrawerActive" @update:model-value="$emit('update:isDrawerActive', $event)"
    @close="$emit('close-drawer')">
    <template #header>
      <BContainer>
        <RouterLink :to="{ name: 'home' }">
          <AppLogo v-if="hasLogo" />
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 200 200" class="logo" v-else>
            <path
              d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z " />
          </svg>
        </RouterLink>
      </BContainer>
      </template>


      <BContainer size="m">
        <BNav :nav="[
        { route: { name: 'home' }, title: $t('home') },
        { route: catalog, title: $t('catalog') },
        { route: { name: 'orders' }, title: $t('reservation') },
        { route: settings, title: $t('settings') },
        { route: shop, title: $t('shop') },
      ]" />
      </BContainer>
  </BPanel>
</template>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
