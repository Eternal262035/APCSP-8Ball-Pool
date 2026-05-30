import { PI2 } from "../../Const/Constants.js";
import { DrawType } from "../../Const/Enums.js";
import Renderable from "../Renderable.js";
import RenderablePath2D from "../RenderablePath2D.js";
export default class SpriteCircle extends Renderable {
    constructor(container, position, radius) {
        super(container, position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(0, 0, radius, 0, PI2);
        // path1.arc(0, 0, 10+radius, 0, PI2);
        // const path2 = new Path2D;
        // path2.arc(0+67, 0, radius, 2, PI2);
        // path2.arc(0+67, 0, 10+radius, 0, PI2);
        this.addPath(new RenderablePath2D(path1, DrawType.Stroke));
        // this.addPath(new RenderablePath2D(path2, DrawType.Stroke));
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
}
