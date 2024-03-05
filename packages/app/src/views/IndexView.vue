<script setup>
import { useTitle } from '@baldeweg/ui'
import { useI18n } from 'vue-i18n'
import { useKeycloak } from '@/composables/useKeycloak.js'

const { t } = useI18n()

useTitle({ title: t('welcome') })

const config = {
  url: '',
  realm: '',
  clientId: '',
  redirectUri: '',
}
const { token, idToken, userInfo, hasRole, expired } = useKeycloak(config)
</script>

<template>
  <BContainer size="m">
    <h1>{{ $t('welcome') }}</h1>
    <p>Token: {{ token }}</p>
    <p>ID Token: {{ idToken }}</p>
    <p>Role: {{ hasRole('admin') }}</p>
    <p>{{ hasRole('user') }}</p>
    <p>{{ expired() }}</p>

    <pre><code>{{ token }}</code></pre>
    <pre><code>{{ userInfo }}</code></pre>
  </BContainer>
</template>
