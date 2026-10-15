export class Laptop {
    constructor({ id = null, title = "", category = "", price = 0, thumbnail = "" } = {}) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.price = price;
        this.thumbnail = thumbnail;
    }
}
