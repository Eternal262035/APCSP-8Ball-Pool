import { ballSize } from "../../config.js";
import { mapBottom, mapLeft, mapRight, mapTop } from "../../index.js";
import { containers } from "../../Render/RenderableContainer.js";
import SpriteCueBall from "../../Render/Sprites/Balls/CueBall.js";
import { Sprite1Ball, Sprite2Ball, Sprite3Ball, Sprite4Ball, Sprite5Ball, Sprite6Ball, Sprite7Ball, Sprite8Ball } from "../../Render/Sprites/Balls/SolidBalls.js";
import { Sprite10Ball, Sprite11Ball, Sprite12Ball, Sprite13Ball, Sprite14Ball, Sprite15Ball, Sprite9Ball } from "../../Render/Sprites/Balls/StripedBalls.js";
import SpriteCircle from "../../Render/Sprites/Circle.js";
import SpriteDebugBall from "../../Render/Sprites/DebugBall.js";
import Entity from "./Entity.js";

export default class BallEntity extends Entity {
    /** this is the number that dictates what number the ball is.
     * it is numbered from 0 to 15 inclusive, where 0 is the cue ball and 1-15 are the normal numbered balls. 
     */
    public ballNumber: number = 0;
    public size: number = ballSize;

    constructor(x: number, y: number, ballNumber: number) {
        super(x, y, ballSize); // call parent constructor with xpos, ypos, and size (all balls are the same size)
        this.ballNumber = ballNumber;
        console.log(`Ball number: ${this.ballNumber}`)
        switch (this.ballNumber) {
            default: {
                this.sprite = new SpriteCircle(containers[0], this.positionData, ballSize);
                break; 
            }
            case 0: this.sprite = new SpriteCueBall(containers[0], this.positionData, ballSize); break;
            case 1: this.sprite = new Sprite1Ball(containers[0], this.positionData, ballSize); break;
            case 2: this.sprite = new Sprite2Ball(containers[0], this.positionData, ballSize); break;
            case 3: this.sprite = new Sprite3Ball(containers[0], this.positionData, ballSize); break;
            case 4: this.sprite = new Sprite4Ball(containers[0], this.positionData, ballSize); break;
            case 5: this.sprite = new Sprite5Ball(containers[0], this.positionData, ballSize); break;
            case 6: this.sprite = new Sprite6Ball(containers[0], this.positionData, ballSize); break;
            case 7: this.sprite = new Sprite7Ball(containers[0], this.positionData, ballSize); break;
            
            case 8: this.sprite = new Sprite8Ball(containers[0], this.positionData, ballSize); break;
            
            case 9: this.sprite = new Sprite9Ball(containers[0], this.positionData, ballSize); break;
            case 10: this.sprite = new Sprite10Ball(containers[0], this.positionData, ballSize); break;
            case 11: this.sprite = new Sprite11Ball(containers[0], this.positionData, ballSize); break;
            case 12: this.sprite = new Sprite12Ball(containers[0], this.positionData, ballSize); break;
            case 13: this.sprite = new Sprite13Ball(containers[0], this.positionData, ballSize); break;
            case 14: this.sprite = new Sprite14Ball(containers[0], this.positionData, ballSize); break;
            case 15: this.sprite = new Sprite15Ball(containers[0], this.positionData, ballSize); break;

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