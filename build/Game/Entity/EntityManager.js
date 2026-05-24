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
    applyAllEntityPhysics() {
        for (const e of this.entities.values()) {
            e.applyPhysics();
        }
    }
}
export const entityManager = new EntityManager();
