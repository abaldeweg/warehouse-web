<script setup lang="ts">
import { useCondition } from '@/composables/conditions/useCondition'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  item: Object,
  isAdmin: Boolean,
})

const { t } = useI18n()

const name = ref(props.item?.name || '')

const { updateCondition, removeCondition } = useCondition()
</script>

<template>
  <BList divider v-if="item">
    <template #title>
      <span v-if="!isAdmin">{{ item.name }}</span>

      <BForm @submit.prevent v-if="isAdmin">
        <BInput
          v-model="name"
          type="text"
          name="name"
          id="name"
          :label="t('name')"
          hideLabel
          @input="updateCondition(item.id, name.value)"
        />
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon>more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeCondition(item.id)">
          {{ $t('delete_item') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>
</template>
