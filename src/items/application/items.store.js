import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ItemsApi } from '../infrastructure/items-api.js';
import { LaptopInventoryItemAssembler } from '../infrastructure/laptop-inventory-item.assembler.js';
const api = new ItemsApi();

export default defineStore('items', () => {
    const items = ref([]);
    async function fetchItems() {
        const response = await api.getItems();
        items.value = LaptopInventoryItemAssembler.toEntitiesFromResponse(response);
    }
    function getItemsBySectionId(id) {
        return items.value.filter(item => String(item.sectionId) === String(id));
    }
    function getTotalBySectionId(id) {
        return getItemsBySectionId(id).reduce((sum, item) => sum + Number(item.quantity), 0);
    }
    async function addItem(item) {
        const { id, ...resource } = item;
        const response = await api.createItem(resource);
        items.value.push(LaptopInventoryItemAssembler.toEntityFromResource(response.data));
    }
    return { items, fetchItems, getItemsBySectionId, getTotalBySectionId, addItem };
});
