import { PI2 } from "../../Const/Constants.js";
import { PositionData } from "../../Game/Datagroups/PositionData.js";
import Renderable from "../Renderable.js";
import RenderableContainer from "../RenderableContainer.js";

export default class SpriteWorldBorder extends Renderable {
    constructor(container: RenderableContainer, position: PositionData, width: number, height: number) {
        super(container, position);
        console.log(this);
        const path1 = new Path2D;
        // path1.rect(position.x-width/2, position.y-height/2, width, height);
        // path1.rect(position.x, position.y, width, height);
        path1.rect(0,0, width, height);
        
        this.addPath(path1);     
    }

    public draw(thisCtx: CanvasRenderingContext2D) {
        super.draw(thisCtx);
    }
}