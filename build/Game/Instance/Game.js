import { ballSize, mapHeight, mapWidth } from "../../config.js";
import { PI } from "../../Const/Constants.js";
import BallEntity from "../Entity/BallEntity.js";
/** the general class for a game instance. */
export default class GameInstance {
    /** the array containing all the balls. Index 0 is going to be the cue ball, and the rest are index 1-15. */
    balls = [];
    coordinatesX = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4];
    constructor() {
    }
    deleteAllBalls() {
        for (const ball of this.balls) {
            ball.destroy();
        }
    }
    /** reset all the balls into their initial triangle position. */
    rackBalls() {
        this.deleteAllBalls(); // get rid of all the balls first
        const ballOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        for (let i = 0; i < 67; i++) {
            this.indexSwap(ballOrder, this.randIntIncl(0, ballOrder.length - 1), this.randIntIncl(0, ballOrder.length - 1));
        }
        // console.log(ballOrder);
        // always ensure that the 8 ball is in the fourth index
        this.indexSwap(ballOrder, ballOrder.indexOf(8), 4);
        // console.log(ballOrder);
        let colNum = 5;
        let rowNum = 0;
        let xOffset = 0;
        let yOffset = 2 * ballSize * (1 - Math.sin(PI / 3));
        console.log(yOffset);
        for (const ballNumber of ballOrder) {
            console.log(rowNum, colNum);
            // this.ballAt(mapWidth*0.5, mapHeight*0.25, ballNumber);
            this.ballAt(mapWidth / 2 + rowNum * ballSize * 2 + xOffset, mapHeight / 4 - /* correction factor to center the apex ball --> */ 9 * ballSize + 2 * yOffset + /* get rid of extra space between rows */ colNum * ballSize * 2 - yOffset * colNum, ballNumber);
            rowNum++;
            if (rowNum > 5 - colNum) {
                xOffset -= ballSize;
                colNum--;
                rowNum = 0;
            }
        }
        // spawn in the cue ball
        this.ballAt(mapWidth / 2, 6 / 8 * mapHeight, 0);
    }
    ballAt(x, y, number) {
        const b = new BallEntity(x, y, number);
        this.balls.push(b);
        // return b;
    }
    // util stuff 
    /** swap the values of two indexes in an array */
    indexSwap(list, a, b) {
        const temp = Number(list[a]);
        list[a] = Number(list[b]);
        list[b] = temp;
    }
    /** get a random integer from a to b, inclusive */
    randIntIncl(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
}
