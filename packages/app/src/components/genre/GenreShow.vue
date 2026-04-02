<script setup lang="ts">
import { useGenre } from '@/composables/genre/useGenre'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  item: Object,
  isAdmin: Boolean,
})

const { t } = useI18n()

const name = ref(props.item?.name || '')

const { updateGenre, removeGenre } = useGenre()
</script>

<template>
  <BList divider v-if="item">
    <template #title>
      <span v-if="!isAdmin" >{{ item.name }}</span>

      <BForm @submit.prevent="updateGenre(item.id, name)" v-if="isAdmin" class="editForm">
        <div class="editForm_input">
          <BInput
            v-model="name"
            type="text"
            name="name"
            id="name"
            :label="t('name')"
            hideLabel
          />
        </div>
        <BButton design="text" type="submit" :style="{ paddingTop: '0', paddingBottom: '0' }">
          <BMaterialIcon>save</BMaterialIcon>
        </BButton>
      </BForm>
    </template>

    <template #controls>
      <BDropdown v-if="isAdmin">
        <template #selector>
          <BMaterialIcon>more_vert</BMaterialIcon>
        </template>
        <BDropdownItem icon="delete" @click="removeGenre(item.id)">
          {{ $t('delete_item') }}
        </BDropdownItem>
      </BDropdown>
    </template>
  </BList>
</template>

<style scoped>
.editForm {
  display: flex;
}
.editForm_input {
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
