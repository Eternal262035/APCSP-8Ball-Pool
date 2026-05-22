import { PI2 } from "../../Const/Constants.js";
import { ctx } from "../InitCanvas.js";
import RenderableContainer from "../Manager.js";
import Renderable, { PositionData } from "../Renderable.js";

export default class Circle extends Renderable {
    constructor(container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(position.x, position.y, radius, 0, PI2);
        this.addPath(path1);
        this.draw(ctx);
    }
}