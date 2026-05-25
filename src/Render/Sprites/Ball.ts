import { PI2 } from "../../Const/Constants.js";
import { DrawType } from "../../Const/Enums.js";
import { PositionData } from "../../Game/Datagroups/PositionData.js";
import Renderable from "../Renderable.js";
import RenderableContainer from "../RenderableContainer.js";
import RenderablePath2D from "../RenderablePath2D.js";

export default class SpriteBall extends Renderable {
    constructor(container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(0, 0, radius, 0, PI2);
        const path2 = new Path2D;
        path2.rect(-10, -10, 10, 10);
        path2.rect(5, -10, 10, 10);
        path2.rect(-7, 10, 17, 4);
        // const path3 = new Path2D;
        // path3.arc(0,0, radius*0.5, PI2, PI2);

        const directionArrow = new Path2D;
        directionArrow.moveTo(0,0);
        directionArrow.lineTo(radius*1.75, 0);

        this.addPath(new RenderablePath2D(path1, DrawType.Stroke));     
        this.addPath(new RenderablePath2D(directionArrow, DrawType.Stroke));     
        this.addPath(new RenderablePath2D(new Path2D, DrawType.Stroke)); // arrow
        this.addPath(new RenderablePath2D(new Path2D, DrawType.Stroke)); // arrow
    }

    public draw(thisCtx: CanvasRenderingContext2D) {
        super.draw(thisCtx);
    }
}