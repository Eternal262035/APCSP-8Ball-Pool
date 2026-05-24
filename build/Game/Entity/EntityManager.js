class EntityManager {
    entities = new Map();
    idCounter = 0;
    constructor() {
        // literally nothing lol
    }
    addNewEntity(e) {
        e.id = this.idCounter;
        this.idCounter++;
        this.entities.set(e.id, e);
    }
}
export const entityManager = new EntityManager();
