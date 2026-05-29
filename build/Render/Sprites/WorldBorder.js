import { mapHeight, mapWidth } from "../../config.js";
import { PI2 } from "../../Const/Constants.js";
import { Color, DrawType } from "../../Const/Enums.js";
import { mapLeft, mapTop } from "../../index.js";
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
        const markingPaths1 = new Path2D;
        for (let i = 0; i < 8; i++) {
            markingPaths1.moveTo(0, i / 8 * height);
            markingPaths1.arc(0, i / 8 * height, 5, 0, PI2);
        }
        const markingPaths2 = new Path2D;
        for (let i = 0; i < 4; i++) {
            markingPaths2.moveTo(i / 4 * width, 0);
            markingPaths2.arc(i / 4 * width, 0, 5, 0, PI2);
        }
        this.addPath(new RenderablePath2D(path1, DrawType.Fill | DrawType.Stroke, Color.PoolTableGreen, Color.Wood));
        this.addPath(new RenderablePath2D(markingPaths1, DrawType.Stroke, Color.Red, Color.Red));
        this.addPath(new RenderablePath2D(markingPaths2, DrawType.Stroke, Color.Red, Color.Red));
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
    resize() {
        this.positionData.x = mapLeft;
        this.positionData.y = mapTop;
        const newPath2D = new Path2D();
        newPath2D.rect(0, 0, mapWidth, mapHeight);
        this.paths[0] = new RenderablePath2D(newPath2D, DrawType.Fill | DrawType.Stroke, this.paths[0].fillColor, this.paths[0].strokeColor);
        const markingPaths = new Path2D;
        for (let i = 0; i < 8; i++) {
            markingPaths.moveTo(0, i / 8 * mapHeight);
            markingPaths.arc(0, i / 8 * mapHeight, 5, 0, PI2);
        }
        this.paths[1] = new RenderablePath2D(markingPaths, DrawType.Fill | DrawType.Stroke, this.paths[1].fillColor, this.paths[1].strokeColor);
        const markingPaths2 = new Path2D;
        for (let i = 0; i < 4; i++) {
            markingPaths2.moveTo(i / 4 * mapWidth, 0);
            markingPaths2.arc(i / 4 * mapWidth, 0, 5, 0, PI2);
        }
        this.paths[2] = new RenderablePath2D(markingPaths2, DrawType.Fill | DrawType.Stroke, this.paths[2].fillColor, this.paths[2].strokeColor);
    }
}
