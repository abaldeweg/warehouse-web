<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { useAuth } from '@/composables/useAuth'
import { useLogout } from '@/composables/useLogout'
import { computed, onMounted, onUnmounted } from 'vue'
import { useReservations } from '@/composables/useReservations'

const { isAuthenticated, user, checkAuthenticationStatus } = useAuth()
onMounted(checkAuthenticationStatus)

const { logout } = useLogout()

const { reservations, fetchReservations } = useReservations()
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  fetchReservations()
  intervalId = setInterval(() => {
    fetchReservations()
  }, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const countReservations = computed(() => {
  return reservations.value !== null ? reservations.value.length : 0
})
</script>

<template>
  <BMasthead>
    <BMastheadItem position="start" v-if="isAuthenticated">
      <span @click="$emit('open-drawer')">
        <BMaterialIcon hover>menu</BMaterialIcon>
      </span>
    </BMastheadItem>

    <!-- <BMastheadItem position="center">
      <AppLogo />
    </BMastheadItem> -->

    <BMastheadItem position="end" v-if="isAuthenticated" class="actions">
      <BBadge
        variant="inline"
        :content="countReservations"
        background="primary"
        :action="{ name: 'reservation' }"
        v-if="countReservations > 0"
      >
        <RouterLink :to="{ name: 'reservation' }">
          <BMaterialIcon>euro</BMaterialIcon>
        </RouterLink>
      </BBadge>
      <BMaterialIcon v-if="countReservations === 0">euro</BMaterialIcon>
      <BDropdown position="bottom" class="action">
        <template #selector>
          <BMaterialIcon hover>account_circle</BMaterialIcon>
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
