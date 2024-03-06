<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useKeycloak } from '@/composables/useKeycloak.js'

const { t } = useI18n()

useTitle({ title: t('welcome') })

const config = {
  url: import.meta.env.VITE_AUTH_URL,
  realm: import.meta.env.VITE_AUTH_REALM,
  clientId: import.meta.env.VITE_AUTH_CLIENT,
  redirectUri: import.meta.env.VITE_AUTH_REDIRECT,
}
const { isAuthenticated, token, idToken, userInfo, userProfile, hasRole, expired } = useKeycloak(config)
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('welcome') }}</h1>

    <details v-if="isAuthenticated">
      <summary>DEBUG</summary>

      <p>ID Token</p>
      <BCode>{{ idToken }}</BCode>

      <p>Token</p>
      <BCode>{{ token }}</BCode>

      <p>User Info</p>
      <BCode>{{ userInfo }}</BCode>

      <p>User Profile</p>
      <BCode>{{ userProfile }}</BCode>

      <p>Admin</p>
      <BCode>{{ hasRole('admin') }}</BCode>

      <p>User</p>
      <BCode>{{ hasRole('user') }}</BCode>

      <p>Expired</p>
      <BCode>{{ expired }}</BCode>
    </details>
  </BContainer>
</template>
