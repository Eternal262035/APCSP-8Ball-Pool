import { ballSize } from "../../config.js";
import { PI2 } from "../../Const/Constants.js";
import { Color, DrawType } from "../../Const/Enums.js";
import Renderable from "../Renderable.js";
import { containers } from "../RenderableContainer.js";
import RenderablePath2D from "../RenderablePath2D.js";
export default class SpritePocketEntity extends Renderable {
    constructor(position) {
        super(containers[1], position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(0, 0, ballSize * 1.2, 0, PI2);
        const path2 = new Path2D;
        path2.arc(0, 0, ballSize * 0.8, 0, PI2);
        const path3 = new Path2D;
        path3.arc(0, 0, ballSize * 0.35, 0, PI2);
        this.addPath(new RenderablePath2D(path1, DrawType.Fill | DrawType.Stroke, Color.Wood2, Color.Wood));
        this.addPath(new RenderablePath2D(path2, DrawType.Fill, Color.Wood1, Color.Wood1));
        this.addPath(new RenderablePath2D(path3, DrawType.Fill, Color.Wood2, Color.Wood2));
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
}
