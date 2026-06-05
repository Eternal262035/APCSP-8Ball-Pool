import { ballSize, mapHeight, mapWidth } from "../../config.js";
import { PI } from "../../Const/Constants.js";
import { BallType, GameOutcome } from "../../Const/Enums.js";
import { game, tickInterval } from "../../index.js";
import { PositionData } from "../Datagroups/PositionData.js";
import BallEntity from "../Entity/BallEntity.js";
import { entityManager } from "../Entity/EntityManager.js";
import PocketEntity from "../Entity/PocketEntity.js";
import TestEntity from "../Entity/TestEntity.js";
import { checkAllZeroVelocity } from "../UI/UIMain.js";

/** the general class for a game instance. */
export default class GameInstance {
    /** the array containing all the balls. Index 0 is going to be the cue ball, and the rest are index 1-15. */
    public balls: BallEntity[] = [];
    public allowedBallTypes: BallType = BallType.Solid|BallType.Stripe;
    public solidBallsPresent: number[] = [1, 2, 3, 4, 5, 6, 7];
    public stripeBallsPresent: number[] = [9, 10, 11, 12, 13, 14, 15];

    public score: number = 0;
    public totalHits: number = 0;
    public ball8Hit: boolean = false;
    
    constructor() {
        // literally nothing, I guess.
    }
    
    public deleteAllBalls() {
        for (const ball of this.balls) {
            ball.destroy();
        }
        
    }
    
    /** reset all the balls into their initial triangle position. */
    public rackBalls() {
        this.deleteAllBalls(); // get rid of all the balls first
        this.solidBallsPresent = [1, 2, 3, 4, 5, 6, 7];
        this.stripeBallsPresent = [9, 10, 11, 12, 13, 14, 15];
        this.ball8Hit = false;
        this.score = 0;

        const ballOrder: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        for (let i=0; i<67; i++) {
            this.indexSwap(ballOrder, this.randIntIncl(0,ballOrder.length-1), this.randIntIncl(0,ballOrder.length-1))
        }

        // console.log(ballOrder);

        // always ensure that the 8 ball is in the fourth index
        this.indexSwap(ballOrder, ballOrder.indexOf(8), 4);
        
        // console.log(ballOrder);

        let colNum = 5;
        let rowNum = 0;
        let xOffset = 0;
        let yOffset = 2*ballSize*(1-Math.sin(PI/3));
        console.log(yOffset);
        for (const ballNumber of ballOrder) {
            console.log(rowNum, colNum);

            // this.ballAt(mapWidth*0.5, mapHeight*0.25, ballNumber);
            this.ballAt(
                mapWidth/2 + rowNum*ballSize*2+xOffset,
                mapHeight/4 - /* correction factor to center the apex ball --> */ 9*ballSize+2*yOffset + /* get rid of extra space between rows */ colNum*ballSize*2-yOffset*colNum,
                ballNumber
            );
            
            
            rowNum++;
            if (rowNum>5-colNum) {
                xOffset -=ballSize;
                colNum--;
                rowNum = 0;
            }
        }

        // spawn in the cue ball
        this.ballAt(mapWidth/2, 6/8*mapHeight, 0);


        this.spawnPocketEntities();
    } 

    public ballAt(x: number, y: number, number: number):void {
        const b = new BallEntity(x, y, number);
        this.balls.push(b);
        // return b;
    }

    public getBallByNumber(n: number): BallEntity|null {
        for (const ball of this.balls) {
            if (ball.ballNumber == n) {
                return ball;
            }
        }
        return null;
    }


    public spawnPocketEntities() {
        new PocketEntity(0+6,0+6);
        new PocketEntity(mapWidth-6,0+6);
        new PocketEntity(0+6,mapHeight-6);
        new PocketEntity(mapWidth-6,mapHeight-6);
        
        new PocketEntity(mapWidth, mapHeight/2);
        new PocketEntity(0, mapHeight/2);
    }

    public doSelectionModal() {
        // @ts-ignore
        document.getElementById("mainCanvas").style.pointerEvents = "none"; // so you cant try to hit while on the modal
        // @ts-ignore
        document.getElementById("selectBallTypeModal").classList.remove("hidden"); // so you cant try to hit while on the modal
        // @ts-ignore
        document.getElementById("selectBallTypeModal").classList.add("shown"); // so you cant try to hit while on the modal
        // @ts-ignore
        const solidBtnListener = document.getElementById("selectBallTypeModal-btn-solids").addEventListener("click", ()=>{
            this.allowedBallTypes = BallType.Solid;
            this.hideStuff();
        });
        // @ts-ignore
        const stripeBtnListener = document.getElementById("selectBallTypeModal-btn-stripes").addEventListener("click", ()=>{
            this.allowedBallTypes = BallType.Stripe;
            this.hideStuff();
        });
        
    }

    public hideStuff() {
        // @ts-ignore
        document.getElementById("selectBallTypeModal").classList.remove("shown"); // so you cant try to hit while on the modal
        // @ts-ignore
        document.getElementById("selectBallTypeModal").classList.add("hidden"); // so you cant try to hit while on the modal
        // @ts-ignore
        document.getElementById("mainCanvas").style.pointerEvents = "all"; // so you cant try to hit while on the modal

        // @ts-ignore
        const eles = document.getElementsByClassName("displayLater");
        for (const ele of eles) {
            ele.classList.remove("hidden");
        }

        // @ts-ignore
        document.getElementById("ballTypeDisp").innerHTML = `Hit in all <b>${this.allowedBallTypes&BallType.Solid?"Solid":"Stripe"}</b> balls to win.`
    }


    // this is where we process W/L ig
    public processDeletedBall(n:number) {
        if (n<8&&n>0) {
            this.solidBallsPresent.splice(this.solidBallsPresent.indexOf(n), 1);
            if (this.allowedBallTypes & BallType.Solid) {
                this.score += 100;
            } else {
                this.score -= 45;
            }
        }
        if (n>8) {
            this.stripeBallsPresent.splice(this.stripeBallsPresent.indexOf(n), 1);
            if (this.allowedBallTypes & BallType.Stripe) {
                this.score += 100;
            } else {
                this.score -= 45;
            }
        }
        if (n==0) {
            // cue ball hit in
            this.score *= 0.75;
            const itv = setInterval(()=>{
                if (checkAllZeroVelocity()) {
                    this.ballAt(mapWidth/2, 6/8*mapHeight, 0);
                    clearInterval(itv);
                }
            }, 1111);
        }
        if (n==8) {
            this.ball8Hit = true;
        }

        this.score = Math.round(this.score);
        // @ts-ignore 
        document.getElementById("scoreDisp").innerText = `Score: ${this.score}`;

        if (!this.ball8Hit) return;
        
        if (this.allowedBallTypes & BallType.Solid) {
            this.endGame(this.solidBallsPresent.length==0?GameOutcome.Win:GameOutcome.InstantDeath);
            return;
        }

        if (this.allowedBallTypes & BallType.Stripe) {
            this.endGame(this.stripeBallsPresent.length==0?GameOutcome.Win:GameOutcome.InstantDeath);
            return;
        }
    }

    public endGame(outcome: GameOutcome) {
        clearInterval(tickInterval); // stop the game physics process
    // clearInterval()

        const endScreen = document.getElementById("endScreen") as HTMLElement;
        endScreen.classList.remove("hidden");
        endScreen.classList.add("shown");

        const resultEle = document.getElementById("endScreen-result") as HTMLElement;
        const resultDescrEle = document.getElementById("endScreen-result-description") as HTMLElement;
        const scoreEle = document.getElementById("endScreen-score") as HTMLElement;
        const totalHits = document.getElementById("endScreen-totalHits") as HTMLElement;

        switch (outcome) {
            case GameOutcome.Win: {
                resultEle.innerText = "You win!";
                resultDescrEle.innerText = "You hit all your balls in!";
                scoreEle.innerText = `Score ${this.score}`;
                totalHits.innerText = `Total hits: ${this.totalHits}`;
            } break;
            case GameOutcome.Lose: {
                resultEle.innerText = "You lost!";
                resultDescrEle.innerText = "You hit all the balls from the opposing type! (how did this even happen bruh)";
                scoreEle.innerText = `Score ${this.score}`;
                totalHits.innerText = `Total hits: ${this.totalHits}`;
            } break;
            case GameOutcome.InstantDeath: {
                resultEle.innerText = "You lost: Instant death!";
                resultDescrEle.innerText = "You pocketed the 8-ball before clearing your set!";
                scoreEle.innerText = `Score ${this.score}`;
                totalHits.innerText = `Total hits: ${this.totalHits}`;
            } break;
        }
    }








    // util stuff 
    /** swap the values of two indexes in an array */
    private indexSwap(list: any[], a: number, b: number):void {
        const temp = Number(list[a]);
        list[a] = Number(list[b]);
        list[b] = temp;
    }

    /** get a random integer from a to b, inclusive */
    private randIntIncl(a: number, b: number): number {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }

}