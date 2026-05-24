import { entityManager } from "../Entity/EntityManager.js";
import Vector, { VectorAbstract } from "./Vector.js";

/** currently it's the stupidest algo under the sun to do this
 * spatial hashing is overkill for something like this, 
 * but it does need to be optimized. 
 */
export function checkForCollisions() {
    let array = Array.from(entityManager.entities.values());
    for (let i=0; i<entityManager.entities.size; i++) {
        for (let j=i+1; j<entityManager.entities.size; j++) {
            const a = array[i];
            const b = array[j];
            if (a.id==b.id) continue;
            const dx = a.positionData.x-b.positionData.x;
            const dy = a.positionData.y-b.positionData.y;
            const dr = Math.sqrt(dx**2 + dy**2);
            const hbSum = a.hitboxData.size + b.hitboxData.size
            if (dr < hbSum) {
                // first see how much the hitboxes are intersecting. 
                // the strategy we're using here is to instantly "correct" the balls so theyu dont overlap anymore
                // and then we apply impule
                // impulse is the change in momentum (p) and momentum must be conserved during the collision. 

                // so first we separate the balls in the same tick so they dont double hit in the next tick
                const overlap = hbSum - dr; // overlap between teh two hitboxes
                
                // move them out of the way
                a.positionData.x+=0.5*dx*overlap/dr;
                b.positionData.x-=0.5*dx*overlap/dr;
                a.positionData.y+=0.5*dy*overlap/dr;
                b.positionData.y-=0.5*dy*overlap/dr;

                // now that the balls are separated we can apply impulse to them

                // this is the relative velocity between the balls (along the line formed by their centers)
                const rvx = b.physicsData.velocity.x - a.physicsData.velocity.x;
                const rvy = b.physicsData.velocity.y - a.physicsData.velocity.y;

                const angle = Math.atan2(dy, dx);
                const relv = 

                // momentum is a vector
                const mom1:VectorAbstract = a.physicsData.velocity.scale(a.physicsData.mass);
                const mom2:VectorAbstract = b.physicsData.velocity.scale(b.physicsData.mass);
                
                const aoc = Math.atan2( // angle between the centers of the two entities
                    a.positionData.y-b.positionData.y,
                    a.positionData.x-b.positionData.x
                );
                const a1 = a.physicsData.velocity.angle; // angle of the first object's velocity
                const a2 = b.physicsData.velocity.angle; // angle of the second object's velocity 

                const da1 = aoc-a1; // angle between line formed between their centers and the velocity vector
                const da2 = aoc-a2; // angle between line formed between their centers and the velocity vector

                const netmx = mom1.x - mom2.x;
                const netmy = mom1.y - mom2.y;

                a.physicsData.velocity.add(new Vector(
                    netmx*Math.cos(da1)/a.physicsData.mass,
                    netmy*Math.cos(da1)/a.physicsData.mass,
                ));
                b.physicsData.velocity.add(new Vector(
                    netmx*Math.cos(da2)/b.physicsData.mass,
                    netmy*Math.cos(da2)/b.physicsData.mass,
                ));

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