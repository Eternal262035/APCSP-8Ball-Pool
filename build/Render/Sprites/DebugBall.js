import { PI2 } from "../../Const/Constants.js";
import { Color, DrawTextType, DrawType } from "../../Const/Enums.js";
import Renderable from "../Renderable.js";
import RenderableImage from "../RenderableImage.js";
import RenderablePath2D from "../RenderablePath2D.js";
import RenderableText from "../RenderableText.js";
export default class SpriteDebugBall extends Renderable {
    constructor(container, position, radius) {
        super(container, position); // call parent constructor with the required arguments
        console.log(this);
        const path1 = new Path2D;
        path1.arc(0, 0, radius, 0, PI2);
        // const path2 = new Path2D;
        // path2.rect(-10, -10, 10, 10);
        // path2.rect(5, -10, 10, 10);
        // path2.rect(-7, 10, 17, 4);
        // const path3 = new Path2D;
        // path3.arc(0,0, radius*0.5, PI2, PI2);
        const directionArrow = new Path2D;
        directionArrow.moveTo(0, 0);
        directionArrow.lineTo(radius * 1.75, 0);
        this.addPath(new RenderablePath2D(path1, DrawType.Stroke | DrawType.Fill, Color.Black, Color.Transparent));
        this.addPath(new RenderablePath2D(directionArrow, DrawType.Stroke, Color.Red));
        this.addPath(new RenderablePath2D(new Path2D, DrawType.Stroke, Color.Red)); // arrow
        this.addPath(new RenderablePath2D(new Path2D, DrawType.Stroke, Color.Red)); // arrow
        this.addPath(new RenderablePath2D(new Path2D, DrawType.Stroke, Color.Red)); // arrow
        this.addPath(new RenderableText("AA", { x: -10, y: 7 }, DrawTextType.Fill, "20px Arial", Color.Blue)); // arrow
        this.addPath(new RenderableImage(
        // 'https://i.ibb.co/RGsBGrVM/dynotransparent.png',
        '../../../assets/smash-hit-ball.png', { x: 0 - radius, y: 0 - radius }, radius * 2, radius * 2)); // arrow
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
}
