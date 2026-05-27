import { Color, DrawType } from "../../Const/Enums.js";
import Renderable from "../Renderable.js";
import RenderablePath2D from "../RenderablePath2D.js";
export default class SpriteWorldBorder extends Renderable {
    constructor(container, position, width, height) {
        super(container, position);
        console.log(this);
        const path1 = new Path2D;
        // path1.rect(position.x-width/2, position.y-height/2, width, height);
        // path1.rect(position.x, position.y, width, height);
        path1.rect(0, 0, width, height);
        this.addPath(new RenderablePath2D(path1, DrawType.Fill | DrawType.Stroke, Color.PoolTableGreen, Color.Wood));
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
}
