import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';
export class ItemsApi extends BaseApi {
    constructor() {
        super();
        this.endpoint = new BaseEndpoint(this, '/laptop-inventory-items');
    }
    getItems() { return this.endpoint.getAll(); }
    createItem(resource) { return this.endpoint.create(resource); }
}
