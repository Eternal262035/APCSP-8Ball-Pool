import { entityManager } from "../Entity/EntityManager.js";
/** currently it's the stupidest algo under the sun to do this
 * spatial hashing is overkill for something like this,
 * but it does need to be optimized.
 */
export function checkForCollisions() {
    let array = Array.from(entityManager.entities.values());
    for (let i = 0; i < entityManager.entities.size; i++) {
        for (let j = i + 1; j < entityManager.entities.size; j++) {
            const a = array[i];
            const b = array[j];
            if (a.id == b.id)
                continue;
            const dx = a.positionData.x - b.positionData.x;
            const dy = a.positionData.y - b.positionData.y;
            const dr = Math.sqrt(dx ** 2 + dy ** 2);
            const hbSum = a.hitboxData.size + b.hitboxData.size;
            if (dr < hbSum) {
                // first see how much the hitboxes are intersecting. 
                // the strategy we're using here is to instantly "correct" the balls so theyu dont overlap anymore
                // and then we apply impule
                // impulse is the change in momentum (p) and momentum must be conserved during the collision. 
                // so first we separate the balls in the same tick so they dont double hit in the next tick
                const overlap = hbSum - dr; // overlap between teh two hitboxes
                // move them out of the way
                a.positionData.x += 0.5 * dx * overlap / dr;
                b.positionData.x -= 0.5 * dx * overlap / dr;
                a.positionData.y += 0.5 * dy * overlap / dr;
                b.positionData.y -= 0.5 * dy * overlap / dr;
                // now that the balls are separated we can apply impulse to them
                const angle = Math.atan2(dy, dx); // angle of the line
                const xComp = dx / dr; // component of the dr that is in the x or y dir. sqrt-ing the sum of the squares yields a unit vector. 
                const yComp = dy / dr; // component of the dr that is in the x or y dir. sqrt-ing the sum of the squares yields a unit vector.
                // this is finding the relative velocity between the balls (along the line formed by their centers)
                const relvx = b.physicsData.velocity.x - a.physicsData.velocity.x;
                const relvy = b.physicsData.velocity.y - a.physicsData.velocity.y;
                // const relv = Math.sqrt(relvx**2+relvy**2);
                const relv = relvx * xComp + relvy * yComp;
                const restitution = 1; // resitution is like the elasticity of the collision
                // when restitution is 1 that means the collision is perfectl elastic (both E_k and p conserved)
                const impulse = -(1 + restitution) * relv / (1 / a.physicsData.mass + 1 / b.physicsData.mass); // skibidi
                const ix = impulse * dx / dr; // component of impulse in the x direction
                const iy = impulse * dy / dr; // component of impuls in the y direction
                // divide by mass to get the delta v
                // and then add that delta v to the current velocity
                a.physicsData.velocity.subtract({ x: ix / a.physicsData.mass, y: iy / a.physicsData.mass });
                b.physicsData.velocity.add({ x: ix / b.physicsData.mass, y: iy / b.physicsData.mass });
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
