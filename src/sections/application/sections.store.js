import { defineStore } from 'pinia';
import { ref } from 'vue';
import { SectionsApi } from '../infrastructure/sections-api.js';
import { TechShelfSectionAssembler } from '../infrastructure/tech-shelf-section.assembler.js';
const api = new SectionsApi();

export default defineStore('sections', () => {
    const sections = ref([]);
    async function fetchSections() {
        const response = await api.getSections();
        sections.value = TechShelfSectionAssembler.toEntitiesFromResponse(response);
    }
    return { sections, fetchSections };
});
