<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { useAuth } from '@/composables/useAuth'
import { useLogout } from '@/composables/useLogout'
import { useOrder } from '@/composables/useOrder'
import { computed, onMounted, onUnmounted } from 'vue'

const { isAuthenticated, user, checkAuthenticationStatus } = useAuth()
onMounted(checkAuthenticationStatus)

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

    <!-- <BMastheadItem position="center">
      <AppLogo />
    </BMastheadItem> -->

    <BMastheadItem position="end" v-if="isAuthenticated" class="actions">
      <BBadge
        variant="inline"
        :content="countOrders"
        background="primary"
        :action="{ name: 'reservation' }"
        v-if="countOrders > 0"
      >
        <RouterLink :to="{ name: 'reservation' }">
          <BMaterialIcon>euro</BMaterialIcon>
        </RouterLink>
      </BBadge>
      <BMaterialIcon v-if="countOrders === 0">euro</BMaterialIcon>
      <BDropdown position="bottom" class="action">
        <template #selector>
          <span @click.prevent>
            <BMaterialIcon style="cursor: pointer">account_circle</BMaterialIcon>
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
@media print {
  body {
    --masthead-top-height: 0px;
  }
}
</style>

<style scoped>
.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}
</style>
