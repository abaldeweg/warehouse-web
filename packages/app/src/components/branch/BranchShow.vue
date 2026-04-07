<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Branch, PricelistData } from '@/types/model/branch'
import { usePrice } from '@/composables/branch/usePrice'
import { onMounted } from 'vue'

const props = defineProps<{ branch: Branch }>()

const { t } = useI18n()

const { pricelist, sections, parse } = usePrice()

onMounted((): void => {
  const parsed: PricelistData = parse(props.branch.pricelist)
  pricelist.value.base = parsed.base
  pricelist.value.releaseYear = parsed.releaseYear
  pricelist.value.condition = parsed.condition
})
</script>

<template>
  <BContainer size="m">
    <BTable>
      <table :aria-label="t('branch')">
        <tbody>
          <tr>
            <td>{{ t('name_of_branch') }}</td>
            <td class="alignRight">{{ branch.name }}</td>
          </tr>
          <tr>
            <td>{{ t('price_steps') }}</td>
            <td class="alignRight">{{ branch.steps }}</td>
          </tr>
          <tr v-if="branch.ordering">
            <td>{{ t('book_ordering') }}</td>
            <td class="alignRight">{{ branch.ordering }}</td>
          </tr>
          <tr>
            <td>{{ t('is_public') }}</td>
            <td class="alignRight">
              <BMaterialIcon v-if="branch.public">check_circle</BMaterialIcon>
              <BMaterialIcon v-else>cancel</BMaterialIcon>
            </td>
          </tr>
          <tr>
            <td>{{ t('activate_cart') }}</td>
            <td class="alignRight">
              <BMaterialIcon v-if="branch.cart">check_circle</BMaterialIcon>
              <BMaterialIcon v-else>cancel</BMaterialIcon>
            </td>
          </tr>
          <tr v-if="branch.content">
            <td>{{ t('content') }}</td>
            <td>{{ branch.content }}</td>
          </tr>
          <tr v-if="branch.mail_reservation">
            <td>{{ t('mail_reservation') }}</td>
            <td>{{ branch.mail_reservation }}</td>
          </tr>
        </tbody>
      </table>
    </BTable>
  </BContainer>

  <BContainer size="m">
    <BTable>
      <table>
        <tbody>
          <tr>
            <td>{{ t('base_price') }}</td>
            <td class="alignRight">{{ pricelist.base }} EUR</td>
          </tr>
        </tbody>
      </table>
    </BTable>

    <div v-for="section in sections" :key="section.label">
      <BTable v-if="section.entries.length">
        <table>
          <thead>
            <tr>
              <th>{{ section.label }}</th>
              <th class="alignRight">{{ t('price') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="entry in section.entries" :key="entry.key">
              <td>{{ entry.key }}</td>
              <td class="alignRight">{{ entry.value }} EUR</td>
            </tr>
          </tbody>
        </table>
      </BTable>
    </div>
  </BContainer>
</template>

<style scoped>
.alignRight {
  text-align: right;
}
</style>
