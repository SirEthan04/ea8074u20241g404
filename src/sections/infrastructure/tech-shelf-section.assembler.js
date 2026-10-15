import { TechShelfSection } from '../domain/model/tech-shelf-section.entity.js';

export class TechShelfSectionAssembler {
    static toEntityFromResource(resource) { return new TechShelfSection(resource); }
    static toEntitiesFromResponse(response) {
        return response.data.map(resource => this.toEntityFromResource(resource));
    }
}
