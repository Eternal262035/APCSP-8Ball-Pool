import { entityManager } from "../Entity/EntityManager.js";

export function resetBalls() {
    for (const entity of entityManager.entities.values()) {
        entity.destroy();
    }
}