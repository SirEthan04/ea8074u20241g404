<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import useSectionsStore from '../../../sections/application/sections.store.js';
import useItemsStore from '../../../items/application/items.store.js';
import TechShelfSectionSummary from '../../../sections/presentation/components/tech-shelf-section-summary.vue';
const { t } = useI18n();
const sectionsStore = useSectionsStore();
const itemsStore = useItemsStore();
const loading = ref(true);
const error = ref(false);
async function loadData() {
  loading.value = true;
  error.value = false;
  try { await Promise.all([sectionsStore.fetchSections(), itemsStore.fetchItems()]); }
  catch { error.value = true; }
  finally { loading.value = false; }
}
onMounted(loadData);
</script>
<template>
  <section>
    <h1>{{ t('home') }}</h1>
    <p>{{ t('welcome') }}</p>
    <h2>{{ t('collections') }}</h2>
    <p v-if="loading" role="status">{{ t('loading') }}</p>
    <pv-message v-else-if="error" severity="error">
      {{ t('loadError') }} <pv-button :label="t('retry')" text @click="loadData" />
    </pv-message>
    <div v-else class="grid">
      <div v-for="section in sectionsStore.sections" :key="section.id" class="col-12 md:col-6">
        <TechShelfSectionSummary :section="section" :items="itemsStore.getItemsBySectionId(section.id)" />
      </div>
    </div>
  </section>
</template>
