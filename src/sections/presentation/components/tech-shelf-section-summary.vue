<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const props = defineProps({ section: { type: Object, required: true }, items: { type: Array, default: () => [] } });
const { t, locale } = useI18n();
const total = computed(() => props.items.reduce((sum, item) => sum + Number(item.quantity), 0));
const available = computed(() => props.section.maxCapacity - total.value);
function formatPrice(price) {
  return new Intl.NumberFormat(locale.value, { style: 'currency', currency: 'USD' }).format(price);
}
</script>
<template>
  <pv-card class="section-card">
    <template #header><h3 class="section-heading">{{ section.name }}</h3></template>
    <template #content>
      <p v-if="!items.length">{{ t('noLaptops') }}</p>
      <article v-for="item in items" :key="item.id" class="inventory-item">
        <img :src="item.imageUrl" :alt="item.laptopName" class="laptop-thumbnail" />
        <div>
          <h4>{{ item.laptopName }}</h4>
          <p>{{ t('price') }}: {{ formatPrice(item.price) }}</p>
          <p>{{ t('quantity') }}: {{ item.quantity }}</p>
        </div>
      </article>
    </template>
    <template #footer>
      <div class="capacity-summary">
        <span>{{ t('total') }}: <strong>{{ total }}</strong></span>
        <span>{{ t('available') }}: <strong>{{ available }}</strong></span>
      </div>
    </template>
  </pv-card>
</template>
