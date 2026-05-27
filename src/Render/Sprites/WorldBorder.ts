import { PI2 } from "../../Const/Constants.js";
import { Color, DrawType } from "../../Const/Enums.js";
import { PositionData } from "../../Game/Datagroups/PositionData.js";
import Renderable from "../Renderable.js";
import RenderableContainer from "../RenderableContainer.js";
import RenderablePath2D from "../RenderablePath2D.js";

export default class SpriteWorldBorder extends Renderable {
    constructor(container: RenderableContainer, position: PositionData, width: number, height: number) {
        super(container, position);
        console.log(this);
        const path1 = new Path2D;
        // path1.rect(position.x-width/2, position.y-height/2, width, height);
        // path1.rect(position.x, position.y, width, height);
        path1.rect(0,0, width, height);
        
        this.addPath(new RenderablePath2D(path1, DrawType.Fill|DrawType.Stroke, Color.PoolTableGreen, Color.Wood));     
    }

    public draw(thisCtx: CanvasRenderingContext2D) {
        super.draw(thisCtx);
    }
}