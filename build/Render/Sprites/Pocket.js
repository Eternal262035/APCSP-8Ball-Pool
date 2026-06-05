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
        this.addPath(new RenderablePath2D(path1, DrawType.Fill, Color.Black, Color.Black));
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
}
