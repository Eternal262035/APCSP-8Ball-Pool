import { PI2 } from "../../Const/Constants.js";
import { ctx } from "../InitCanvas.js";
import Renderable from "../Renderable.js";
export default class Circle extends Renderable {
    constructor(container, position, radius) {
        super(container, position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(position.x, position.y, radius, 0, PI2);
        this.addPath(path1);
        this.draw(ctx);
    }
}
