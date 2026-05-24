import { entityManager } from "../Entity/EntityManager.js";
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
                // momentum is a vector
                const mom1 = firstEntity.physicsData.velocity.scale(firstEntity.physicsData.mass);
                const mom2 = secondEntity.physicsData.velocity.scale(secondEntity.physicsData.mass);
                const aoc = Math.atan2(// angle between the centers of the two entities
                firstEntity.positionData.y - secondEntity.positionData.y, firstEntity.positionData.x - secondEntity.positionData.x);
                const a1 = firstEntity.physicsData.velocity.angle; // angle of the first object's velocity
                const a2 = secondEntity.physicsData.velocity.angle; // angle of the second object's velocity 
                const da1 = aoc - a1; // angle between line formed between their centers and the velocity vector
                const da2 = aoc - a2; // angle between line formed between their centers and the velocity vector
                const netmx = mom1.x - mom2.x;
                const netmy = mom1.y - mom2.y;
                firstEntity.physicsData.velocity.add();
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
