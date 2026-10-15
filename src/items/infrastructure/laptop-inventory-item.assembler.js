import { LaptopInventoryItem } from '../domain/model/laptop-inventory-item.entity.js';

export class LaptopInventoryItemAssembler {
    static toEntityFromResource(resource) { return new LaptopInventoryItem(resource); }
    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
