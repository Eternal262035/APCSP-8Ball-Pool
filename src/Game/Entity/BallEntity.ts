import { mapBottom, mapLeft, mapRight, mapTop } from "../../index.js";
import { containers } from "../../Render/RenderableContainer.js";
import SpriteCueBall from "../../Render/Sprites/Balls/CueBall.js";
import SpriteCircle from "../../Render/Sprites/Circle.js";
import SpriteDebugBall from "../../Render/Sprites/DebugBall.js";
import Entity from "./Entity.js";

export default class BallEntity extends Entity {
    /** this is the number that dictates what number the ball is.
     * it is numbered from 0 to 15 inclusive, where 0 is the cue ball and 1-15 are the normal numbered balls. 
     */
    public ballNumber: number = 0;

    constructor(x: number, y: number, ballNumber: number) {
        super(x, y, 20); // call parent constructor with xpos, ypos, and size (all balls are the same size)
        this.ballNumber = ballNumber;
        switch (this.ballNumber) {
            default: {
                this.sprite = new SpriteCircle(containers[0], this.positionData, 20);
                break; 
            }
            case 0: this.sprite = new SpriteCueBall(containers[0], this.positionData, 20); break;
        }
    }

    // make it bounce off the walls just like the TestEntity
    public applyPhysics(): void {
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