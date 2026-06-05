import { ballSize } from "../../config.js";
import SpritePocketEntity from "../../Render/Sprites/Pocket.js";
import Entity from "./Entity.js";
/** the entity that detects collisions between it and a BallEntity
 * if a PocketEntity collides with a BallEntity, then that means the ball has been pocketed (and should be removed from the table)
 */
export default class PocketEntity extends Entity {
    size = ballSize * 1.2;
    constructor(x, y) {
        super(x, y, ballSize * 1.2); // call parent constructor with xpos, ypos, and size (all balls are the same size)
        this.sprite = new SpritePocketEntity({ x: x, y: y });
    }
    // make it bounce off the walls just like the TestEntity
    applyPhysics() {
        // absolutely nothing, no physics to be applied here. 
        super.applyPhysics();
        super.approximateZeroVelocity();
        // this entity literally does not move;
    }
}
