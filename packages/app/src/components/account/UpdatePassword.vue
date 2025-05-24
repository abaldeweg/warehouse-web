<script setup lang="ts">
import { usePassword } from '@/composables/usePassword.ts'

const { changePassword, password, passwordSuccessful, passwordError, isChangingPassword } =
  usePassword()
</script>

<template>
  <BAlert type="success" v-if="passwordSuccessful">
    <p>{{ $t('password_update_success') }}</p>
  </BAlert>

  <BAlert type="error" v-if="passwordError">
    <p>{{ $t('password_update_error') }}</p>
  </BAlert>

  <BForm @submit.prevent="changePassword">
    <BInput
      type="password"
      id="password"
      required
      :placeholder="$t('new_password')"
      :label="$t('new_password')"
      v-model="password"
    />

    <BFormGroup buttons>
      <BFormItem>
        <BButton design="primary_wide" v-if="!isChangingPassword">
          {{ $t('save') }}
        </BButton>
        <BButton design="outline" v-if="isChangingPassword">
          <BSpinner size="s" :style="{ margin: 'auto' }" />
        </BButton>
      </BFormItem>
    </BFormGroup>
  </BForm>
</template>
