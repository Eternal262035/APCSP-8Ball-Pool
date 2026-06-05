import { ballSize } from "../../config.js";
import { mapBottom, mapLeft, mapRight, mapTop } from "../../index.js";
import { containers } from "../../Render/RenderableContainer.js";
import SpriteCueBall from "../../Render/Sprites/Balls/CueBall.js";
import { Sprite1Ball, Sprite2Ball, Sprite3Ball, Sprite4Ball, Sprite5Ball, Sprite6Ball, Sprite7Ball, Sprite8Ball } from "../../Render/Sprites/Balls/SolidBalls.js";
import { Sprite10Ball, Sprite11Ball, Sprite12Ball, Sprite13Ball, Sprite14Ball, Sprite15Ball, Sprite9Ball } from "../../Render/Sprites/Balls/StripedBalls.js";
import SpriteCircle from "../../Render/Sprites/Circle.js";
import SpriteDebugBall from "../../Render/Sprites/DebugBall.js";
import SpritePocketEntity from "../../Render/Sprites/Pocket.js";
import Entity from "./Entity.js";
import { entityManager } from "./EntityManager.js";

/** the entity that detects collisions between it and a BallEntity
 * if a PocketEntity collides with a BallEntity, then that means the ball has been pocketed (and should be removed from the table)
 */
export default class PocketEntity extends Entity {
    public size: number = ballSize*1.2;

    constructor(x: number, y: number) {
        super(x, y, ballSize*1.2); // call parent constructor with xpos, ypos, and size (all balls are the same size)
        

        this.sprite = new SpritePocketEntity({x: this.positionData.x, y: this.positionData.y});
        console.log(entityManager.entities.values());
    }

    // make it bounce off the walls just like the TestEntity
    public applyPhysics(): void {
        // console.log(this.positionData)
        // absolutely nothing, no physics to be applied here. 
        this.physicsData.velocity.scale(0);
        super.applyPhysics();
        // super.approximateZeroVelocity();
        // this entity literally does not move;
    }
    
}