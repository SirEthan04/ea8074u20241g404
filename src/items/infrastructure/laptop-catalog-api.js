import axios from 'axios';
export class LaptopCatalogApi {
    constructor() { this.http = axios.create({ baseURL: 'https://dummyjson.com' }); }
    getLaptops(category) {
        return this.http.get('/products/category/' + encodeURIComponent(category), { params: { limit: 0 } });
    }
}
