<script setup lang="ts">
import { computed } from 'vue'

interface Product {
  id: string
  title: string
  price: number
  sold?: boolean
  removed?: boolean
  author: {
    firstname: string
    surname: string
  }
  genre: {
    name: string
  }
}

const props = defineProps<{ products: Product[] }>()

const catalog = import.meta.env.VUE_APP_CATALOG

const currency = (number: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number)
}

const sum = computed(() => {
  return props.products.reduce((prev, cur) => {
    return prev + cur.price
  }, 0)
})
</script>

<template>
  <BContainer size="m">
    <h2>{{ $t('products') }}</h2>

    <BTable>
      <table>
        <thead>
          <tr>
            <th>{{ $t('title') }}</th>
            <th>{{ $t('author') }}</th>
            <th>{{ $t('genre') }}</th>
            <th class="alignRight">{{ $t('price') }}</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>
              <a :href="catalog + '/search/book/' + product.id">
                {{ product.title }}
              </a>
              <span v-if="product.sold"> - {{ $t('sold') }}</span>
              <span v-if="product.removed"> - {{ $t('removed') }}</span>
            </td>
            <td>
              {{ product.author.surname }}, {{ product.author.firstname }}
            </td>
            <td>{{ product.genre.name }}</td>
            <td class="alignRight">{{ currency(product.price) }}</td>
          </tr>
        </tbody>

        <tfoot class="sum">
          <tr>
            <td colspan="3">
              {{ $t('grand_total') }}
            </td>
            <td class="alignRight">{{ currency(sum) }}</td>
          </tr>
        </tfoot>
      </table>
    </BTable>
  </BContainer>
</template>

<style scoped>
.sum {
  font-weight: bold;
}
.alignRight {
  text-align: right;
}
</style>
