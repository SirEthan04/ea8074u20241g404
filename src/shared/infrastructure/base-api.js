import axios from 'axios';
export class BaseApi {
    constructor() {
        this.http = axios.create({
            baseURL: import.meta.env.VITE_INVENTORY_API_URL || 'http://localhost:3100',
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
