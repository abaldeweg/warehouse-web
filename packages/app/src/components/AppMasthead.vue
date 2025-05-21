<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { useAuth } from '@/composables/useAuth'
import { useLogout } from '@/composables/useLogout'
import { useOrder } from '@/composables/useOrder'
import { computed, onMounted, onUnmounted } from 'vue'

const hasLogo = import.meta.env.VITE_APP_LOGO === 'false' ? false : true

const { isAuthenticated, user, checkAuthenticationStatus } = useAuth()
checkAuthenticationStatus()

const { logout } = useLogout()

const { orders, list } = useOrder()
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  list()
  intervalId = setInterval(() => {
    list()
  }, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const countOrders = computed(() => {
  return orders.value !== null ? orders.value.length : 0
})
</script>

<template>
  <BMasthead>
    <BMastheadItem position="start" v-if="isAuthenticated">
      <span @click="$emit('open-drawer')" :style="{ cursor: 'pointer' }">
        <BMaterialIcon>menu</BMaterialIcon>
      </span>
    </BMastheadItem>

    <BMastheadItem position="center">
      <!-- <RouterLink :to="{ name: 'home' }">
        <AppLogo v-if="hasLogo" />
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 200 200" class="logo" v-else>
          <path
            d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z " />
        </svg>
      </RouterLink> -->
    </BMastheadItem>

    <BMastheadItem position="end" v-if="isAuthenticated" class="actions">
      <BBadge variant="inline" :content="countOrders" background="primary" :action="{ 'name': 'orders' }"
        style="font-size: 0.8rem;" v-if="countOrders > 0">
        <RouterLink :to="{ 'name': 'orders' }">
          <BMaterialIcon>euro</BMaterialIcon>
        </RouterLink>
      </BBadge>
      <BMaterialIcon v-if="countOrders === 0">euro</BMaterialIcon />
      <BDropdown position="bottom" class="action">
        <template #selector>
          <span @click.prevent>
            <BMaterialIcon style="cursor: pointer;">account_circle</BMaterialIcon>
          </span>
        </template>

        <BDropdownItem no-hover v-if="user">
          {{ $t('hello') }}, {{ user.username || '' }}!
        </BDropdownItem>

        <BDivider />

        <BDropdownItem @click.prevent="$router.push({ name: 'account' })">
          {{ $t('settings') }}
        </BDropdownItem>
        <BDropdownItem @click.prevent="logout">
          {{ $t('logout') }}
        </BDropdownItem>
      </BDropdown>
    </BMastheadItem>
  </BMasthead>
</template>

<style>
body {
  --masthead-top-height: 60px;
}
</style>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>
