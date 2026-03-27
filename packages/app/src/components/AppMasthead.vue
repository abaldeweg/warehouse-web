<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { useAuth } from '@/composables/auth/useAuth'
import { useLogout } from '@/composables/auth/useLogout'
import { onMounted, onUnmounted } from 'vue'
import { useReservations } from '@/composables/reservations/useReservations'
const emit = defineEmits(['open-drawer'])

const { isAuthenticated, user, checkAuthenticationStatus } = useAuth()
onMounted(checkAuthenticationStatus)

const { logout } = useLogout()

const { countAllReservations, fetchReservations } = useReservations()
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    fetchReservations()
  }, 60000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <header class="masthead">
    <div class="masthead_start" v-if="isAuthenticated">
      <span @click="emit('open-drawer')">
        <BMaterialIcon hover>menu</BMaterialIcon>
      </span>
    </div>

    <div class="masthead_center">
      <AppLogo />
    </div>

    <div class="masthead_end actions" v-if="isAuthenticated">
      <RouterLink :to="{ name: 'reservation' }">
        <BMaterialIcon>euro</BMaterialIcon>{{ countAllReservations > 0 ? ('(' + countAllReservations + ')') : '' }}
      </RouterLink>
      <BMaterialIcon v-if="countAllReservations === 0">euro</BMaterialIcon>
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
    </div>
  </header>
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

.badge_content {
  display: none;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
}

.masthead {
  height: var(--masthead-top-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
}

.masthead_start,
.masthead_center,
.masthead_end {
  display: flex;
  align-items: center;
}

.masthead_center {
  justify-content: center;
  flex: 1;
}

.masthead_start {
  min-width: 160px;
}

.masthead_end {
  min-width: 160px;
  justify-content: flex-end;
}
</style>
