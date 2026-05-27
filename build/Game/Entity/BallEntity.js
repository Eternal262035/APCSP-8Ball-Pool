import { containers } from "../../Render/RenderableContainer.js";
import SpriteDebugBall from "../../Render/Sprites/DebugBall.js";
import Entity from "./Entity.js";
export default class BallEntity extends Entity {
    /** this is the number that dictates what number the ball is.
     * it is numbered from 0 to 15 inclusive, where 0 is the cue ball and 1-15 are the normal numbered balls.
     */
    ballNumber = 0;
    constructor(x, y, ballNumber) {
        super(x, y, 20); // call parent constructor with xpos, ypos, and size (all balls are the same size)
        this.sprite = new SpriteDebugBall(containers[0], this.positionData, 20);
    }
}
