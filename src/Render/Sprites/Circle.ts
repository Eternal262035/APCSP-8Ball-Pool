import { PI2 } from "../../Const/Constants.js";
import RenderableContainer from "../RenderableContainer.js";
import Renderable, { PositionData } from "../Renderable.js";

export default class Circle extends Renderable {
    constructor(container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(this.positionData.x, this.positionData.y, radius, 0, PI2);
        path1.arc(this.positionData.x, this.positionData.y, 10+radius, 0, PI2);
        const path2 = new Path2D;
        path2.arc(this.positionData.x+67, this.positionData.y, radius, 2, PI2);
        path2.arc(this.positionData.x+67, this.positionData.y, 10+radius, 0, PI2);
        this.addPath(path1);
        this.addPath(path2);
        
    }

    public draw(thisCtx: CanvasRenderingContext2D) {
        super.draw(thisCtx);
        // console.log(this.positionData);
    }
}