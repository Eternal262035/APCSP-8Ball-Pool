import { entityManager } from "../Entity/EntityManager.js";
import Vector from "./Vector.js";
/** currently it's the stupidest algo under the sun to do this
 * spatial hashing is overkill for something like this,
 * but it does need to be optimized.
 */
export function checkForCollisions() {
    let array = Array.from(entityManager.entities.values());
    for (let i = 0; i < entityManager.entities.size; i++) {
        for (let j = i + 1; j < entityManager.entities.size; j++) {
            const firstEntity = array[i];
            const secondEntity = array[j];
            if (firstEntity.id == secondEntity.id)
                continue;
            const dr = Math.sqrt((firstEntity.positionData.x - secondEntity.positionData.x) ** 2 + (firstEntity.positionData.y - secondEntity.positionData.y) ** 2);
            if (dr < firstEntity.hitboxData.size + secondEntity.hitboxData.size) {
                // console.log(`${firstEntity.id} <--> ${secondEntity.id}`);
                // firstEntity.physicsData.velocity.add(Vector.fromPolar(dr, Vector.direction({x: firstEntity.positionData.x-secondEntity.positionData.x, y: firstEntity.positionData.y-secondEntity.positionData.y})));
                const correctionVector = new Vector(firstEntity.positionData.x - secondEntity.positionData.x, firstEntity.positionData.y - secondEntity.positionData.y);
                correctionVector.scale(0.1);
                firstEntity.physicsData.velocity.add(correctionVector);
                secondEntity.physicsData.velocity.subtract(correctionVector);
            }
        }
    }
    // old
    // for (const firstEntity of entityManager.entities.values()) {
    //     for (const secondEntity of entityManager.entities.values()) {
    //         if (firstEntity.id==secondEntity.id) continue;
    //         const dr = Math.sqrt((firstEntity.positionData.x-secondEntity.positionData.x)**2 + (firstEntity.positionData.y-secondEntity.positionData.y)**2);
    //         if (dr < firstEntity.hitboxData.size + secondEntity.hitboxData.size) {
    //             // console.log(`${firstEntity.id} <--> ${secondEntity.id}`);
    //             // firstEntity.physicsData.velocity.add(Vector.fromPolar(dr, Vector.direction({x: firstEntity.positionData.x-secondEntity.positionData.x, y: firstEntity.positionData.y-secondEntity.positionData.y})));
    //             const correctionVector = new Vector(
    //                 firstEntity.positionData.x-secondEntity.positionData.x, 
    //                 firstEntity.positionData.y-secondEntity.positionData.y, 
    //             );
    //             correctionVector.scale(0.03);
    //             firstEntity.physicsData.velocity.add(correctionVector)
    //         }
    //     }
    // }
}
