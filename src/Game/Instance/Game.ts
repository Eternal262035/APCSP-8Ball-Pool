import BallEntity from "../Entity/BallEntity.js";
import { entityManager } from "../Entity/EntityManager.js";
import TestEntity from "../Entity/TestEntity.js";

/** the general class for a game instance. */
export default class GameInstance {
    /** the array containing all the balls. Index 0 is going to be the cue ball, and the rest are index 1-15. */
    public balls: BallEntity[] = [];


    constructor() {
        for (let i=0; i<15; i++) {
            const b = new BallEntity(100,300+Math.random(),15);
            this.balls.push(b);
        }
    }

    public reset() {
        for (const ball of this.balls) {
            ball.destroy();
        }
    }
}