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

    public removeEntity(e: Entity): void {
        this.entities.delete(e.id);
    }

    public applyAllEntityPhysics(): void {
        for (const e of this.entities.values()) {
            e.applyPhysics();
        }
    }
}


export const entityManager = new EntityManager();