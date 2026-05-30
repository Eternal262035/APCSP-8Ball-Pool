import { ballSize } from "../../config.js";
import { mapBottom, mapLeft, mapRight, mapTop } from "../../index.js";
import { containers } from "../../Render/RenderableContainer.js";
import SpriteCueBall from "../../Render/Sprites/Balls/CueBall.js";
import { Sprite1Ball, Sprite2Ball, Sprite3Ball, Sprite4Ball, Sprite5Ball, Sprite6Ball, Sprite7Ball } from "../../Render/Sprites/Balls/SolidBalls.js";
import SpriteCircle from "../../Render/Sprites/Circle.js";
import Entity from "./Entity.js";
export default class BallEntity extends Entity {
    /** this is the number that dictates what number the ball is.
     * it is numbered from 0 to 15 inclusive, where 0 is the cue ball and 1-15 are the normal numbered balls.
     */
    ballNumber = 0;
    size = ballSize;
    constructor(x, y, ballNumber) {
        super(x, y, ballSize); // call parent constructor with xpos, ypos, and size (all balls are the same size)
        this.ballNumber = ballNumber;
        console.log(`Ball number: ${this.ballNumber}`);
        switch (this.ballNumber) {
            default: {
                this.sprite = new SpriteCircle(containers[0], this.positionData, ballSize);
                break;
            }
            case 0:
                this.sprite = new SpriteCueBall(containers[0], this.positionData, ballSize);
                break;
            case 1:
                this.sprite = new Sprite1Ball(containers[0], this.positionData, ballSize);
                break;
            case 2:
                this.sprite = new Sprite2Ball(containers[0], this.positionData, ballSize);
                break;
            case 3:
                this.sprite = new Sprite3Ball(containers[0], this.positionData, ballSize);
                break;
            case 4:
                this.sprite = new Sprite4Ball(containers[0], this.positionData, ballSize);
                break;
            case 5:
                this.sprite = new Sprite5Ball(containers[0], this.positionData, ballSize);
                break;
            case 6:
                this.sprite = new Sprite6Ball(containers[0], this.positionData, ballSize);
                break;
            case 7:
                this.sprite = new Sprite7Ball(containers[0], this.positionData, ballSize);
                break;
        }
    }
    // make it bounce off the walls just like the TestEntity
    applyPhysics() {
        if (this.positionData.x + this.physicsData.velocity.x + this.hitboxData.size >= mapRight) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.x + this.physicsData.velocity.x - this.hitboxData.size <= mapLeft) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y + this.hitboxData.size >= mapBottom) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y - this.hitboxData.size <= mapTop) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
        }
        super.applyPhysics();
        super.approximateZeroVelocity();
        if (this.positionData.x >= mapRight - this.hitboxData.size) {
            this.positionData.x = mapRight - this.hitboxData.size;
        }
        if (this.positionData.x <= mapLeft + this.hitboxData.size) {
            this.positionData.x = mapLeft + this.hitboxData.size;
        }
        if (this.positionData.y >= mapBottom - this.hitboxData.size) {
            this.positionData.y = mapBottom - this.hitboxData.size;
        }
        if (this.positionData.y <= mapTop + this.hitboxData.size) {
            this.positionData.y = mapTop + this.hitboxData.size;
        }
    }
}
