import { Laptop } from '../domain/model/laptop.entity.js';

export class LaptopAssembler {
    static toEntityFromResource(resource) { return new Laptop(resource); }
    static toEntitiesFromResponse(response) {
        return response.data.products.map(resource => this.toEntityFromResource(resource));
    }
}
