import Entity from "./Entity.js";

class EntityManager {
    public entities: Map<number, Entity> = new Map();
    public idCounter: number = 0;

    constructor() {
        // literally nothing lol
    }

    public addNewEntity(e: Entity): void {
        e.id = this.idCounter;
        this.idCounter++;
        this.entities.set(e.id, e);
    }

    public applyAllEntityPhysics(): void {
        for (const e of this.entities.values()) {
            e.applyPhysics();
        }
    }
}


export const entityManager = new EntityManager();