<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useProduct } from '@/composables/products/useProduct.js'
import type { Reservation } from '@/types/model/reservation'
import { useToken } from '@/composables/auth/useToken.js'
import { useBranch } from '@/composables/branch/useBranch'
import { useRouter } from 'vue-router'

const props = defineProps<{ reservation: Reservation }>()

defineEmits<{
  (event: 'update', status?: boolean): void
  (event: 'remove'): void
  (event: 'sellProducts'): void
}>()

const { t } = useI18n()

useHead({ title: t('reservation') })

const { sellAll } = useProduct()

const { user, fetchUser } = useToken()
const { branch, fetchBranch } = useBranch()
fetchUser().then(() => {
  if (user.value && user.value.branch.id) {
    fetchBranch(user.value.branch.id)
  }
})


/**
 * Print function to navigate to the print route for the current reservation
 */
const router = useRouter()
const print = (): void => {
  if (props.reservation?.id) {
    router.push({ name: 'reservation.print', params: { id: props.reservation.id } })
  }
}

/**
 * Function to compose an email
 */
const mail = (): void => {
  const body = branch.value?.mail_reservation ? branch.value?.mail_reservation : t('reservation_mail_body', { surname: props.reservation.surname })
  window.location.href = `mailto:${props.reservation.mail}?subject=${t('your_reservation')}&body=${encodeURIComponent(body)}`
}
</script>

<template>
  <div class="toolbar">
    <div class="toolbar_group">
      <RouterLink :to="{ name: 'reservation' }">&lang; {{ $t('back') }}</RouterLink>
    </div>
    <div class="toolbar_group">
      <BTooltip :text="t('delete_reservation')" position="bottom">
        <BMaterialIcon @click="$emit('remove')" color="#ff0000" hover>delete</BMaterialIcon>
      </BTooltip>
      <BTooltip :text="t('sell_all')" position="bottom">
        <BMaterialIcon @click="$emit('sellProducts')" hover>sell</BMaterialIcon>
      </BTooltip>
      <BTooltip :text="t('compose_mail')" position="bottom">
        <BMaterialIcon @click="mail" hover>mail</BMaterialIcon>
      </BTooltip>
      <BTooltip :text="t('print')" position="bottom">
        <BMaterialIcon @click="print" hover>print</BMaterialIcon>
      </BTooltip>
      <BSwitch v-model="reservation.open" @update:modelValue="$emit('update', props.reservation.open)"
        :label="$t('is_new')" />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--color-neutral-02);
  border-radius: 20px;
  padding: 20px;
}

.toolbar_group {
  display: flex;
  gap: 20px;
  align-items: center;
}

@media print {
  .toolbar {
    display: none;
  }
}
</style>
