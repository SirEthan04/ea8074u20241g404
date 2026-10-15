<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import useSectionsStore from '../../../sections/application/sections.store.js';
import useItemsStore from '../../application/items.store.js';
import { LaptopCatalogApi } from '../../infrastructure/laptop-catalog-api.js';
import { LaptopAssembler } from '../../infrastructure/laptop.assembler.js';
import { LaptopInventoryItem } from '../../domain/model/laptop-inventory-item.entity.js';
const { t, locale } = useI18n();
const router = useRouter();
const sectionsStore = useSectionsStore();
const itemsStore = useItemsStore();
const catalogApi = new LaptopCatalogApi();
const sectionId = ref(null);
const laptopId = ref(null);
const quantity = ref(1);
const laptops = ref([]);
const loading = ref(true);
const catalogLoading = ref(false);
const saving = ref(false);
const dataReady = ref(false);
const error = ref('');
const catalogError = ref(false);
const section = computed(() => sectionsStore.sections.find(value => value.id === sectionId.value));
const laptop = computed(() => laptops.value.find(value => value.id === laptopId.value));
const available = computed(() => section.value ? section.value.maxCapacity - itemsStore.getTotalBySectionId(section.value.id) : 0);
const price = computed(() => new Intl.NumberFormat(locale.value, { style: 'currency', currency: 'USD' }).format(laptop.value?.price || 0));

async function loadData() {
  loading.value = true;
  dataReady.value = false;
  error.value = '';
  try {
    await Promise.all([sectionsStore.fetchSections(), itemsStore.fetchItems()]);
    dataReady.value = true;
  } catch { error.value = 'loadError'; }
  finally { loading.value = false; }
}
async function loadLaptops() {
  const selectedId = sectionId.value;
  laptopId.value = null;
  laptops.value = [];
  catalogError.value = false;
  error.value = '';
  if (!section.value) return;
  catalogLoading.value = true;
  try {
    const response = await catalogApi.getLaptops(section.value.laptopCategory);
    if (selectedId === sectionId.value) laptops.value = LaptopAssembler.toEntitiesFromResponse(response);
  } catch {
    if (selectedId === sectionId.value) catalogError.value = true;
  } finally {
    if (selectedId === sectionId.value) catalogLoading.value = false;
  }
}
watch(sectionId, loadLaptops);
onMounted(loadData);

async function createItem() {
  if (saving.value || !dataReady.value) return;
  error.value = '';
  if (!section.value || !laptop.value) { error.value = 'required'; return; }
  saving.value = true;
  try {
    await itemsStore.fetchItems();
    if (!Number.isInteger(quantity.value) || quantity.value <= 0 || quantity.value > available.value) {
      error.value = 'capacityError';
      return;
    }
    await itemsStore.addItem(new LaptopInventoryItem({
      sectionId: section.value.id,
      laptopCategoryId: section.value.laptopCategory,
      laptopId: laptop.value.id,
      laptopName: laptop.value.title,
      price: laptop.value.price,
      imageUrl: laptop.value.thumbnail,
      quantity: quantity.value,
      registeredAt: new Date().toISOString()
    }));
    await router.push('/home');
  } catch { error.value = 'saveError'; }
  finally { saving.value = false; }
}
</script>
<template>
  <p v-if="loading" role="status">{{ t('loading') }}</p>
  <form v-else class="item-form" @submit.prevent="createItem">
    <pv-message v-if="error" severity="error" role="alert">{{ t(error) }}</pv-message>
    <pv-button v-if="!dataReady" :label="t('retry')" @click="loadData" />
    <span id="section-label" class="field-label">{{ t('section') }}</span>
    <pv-select aria-labelledby="section-label" v-model="sectionId" :options="sectionsStore.sections" option-label="name" option-value="id"
               :placeholder="t('selectSection')" :disabled="!dataReady || saving" />
    <p v-if="section">{{ t('available') }}: {{ available }}</p>
    <span id="laptop-label" class="field-label">{{ t('laptop') }}</span>
    <pv-select aria-labelledby="laptop-label" v-model="laptopId" :options="laptops" option-label="title" option-value="id"
               :placeholder="t('selectLaptop')" :loading="catalogLoading" :disabled="!section || catalogLoading || saving" />
    <pv-message v-if="catalogError" severity="error">
      {{ t('catalogError') }} <pv-button :label="t('retry')" text @click="loadLaptops" />
    </pv-message>
    <div v-if="laptop" class="laptop-preview">
      <img :src="laptop.thumbnail" :alt="laptop.title" />
      <div><h3>{{ laptop.title }}</h3><p>{{ t('price') }}: {{ price }}</p></div>
    </div>
    <label for="quantity">{{ t('quantity') }}</label>
    <pv-input-number input-id="quantity" v-model="quantity" :min="1" :max-fraction-digits="0" :use-grouping="false" :disabled="saving || !dataReady" show-buttons />
    <div class="form-actions">
      <pv-button type="submit" :label="t('create')" :loading="saving" :disabled="!dataReady || !laptop || catalogLoading || available < 1" />
      <pv-button :label="t('cancel')" severity="secondary" :disabled="saving" @click="router.push('/home')" />
    </div>
  </form>
</template>
