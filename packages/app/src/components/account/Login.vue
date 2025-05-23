<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'

const { username, password, isLoggingIn, invalidCredentials, login } = useLogin()
</script>

<template>
  <BAlert type="error" v-if="invalidCredentials">
    <p>{{ $t('invalidCredentials') }}</p>
  </BAlert>

  <BForm @submit.prevent="login">
    <BInput
      type="text"
      id="username"
      :placeholder="$t('username')"
      :label="$t('username')"
      autofocus
      v-model="username"
    />

    <BInput
      type="password"
      id="password"
      :placeholder="$t('password')"
      :label="$t('password')"
      v-model="password"
    />

    <BFormGroup buttons>
      <BFormItem>
        <BButton design="primary_wide" v-if="!isLoggingIn">
          {{ $t('login') }}
        </BButton>
        <BButton design="outline_wide" v-if="isLoggingIn">
          <BSpinner size="s" :style="{ margin: 'auto' }" />
        </BButton>
      </BFormItem>
    </BFormGroup>
  </BForm>
</template>
