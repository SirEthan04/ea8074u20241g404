import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';
export class SectionsApi extends BaseApi {
    constructor() {
        super();
        this.endpoint = new BaseEndpoint(this, '/tech-shelf-sections');
    }
    getSections() { return this.endpoint.getAll(); }
}
