import { PI2 } from "../../Const/Constants.js";
import { Color, DrawType } from "../../Const/Enums.js";
import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import RenderablePath2D from "../../Render/RenderablePath2D.js";
export class CueHudBkg extends Renderable {
    constructor(x, y) {
        super(containers[2], { x: x, y: y });
        const bkgCircle = new Path2D();
        bkgCircle.arc(0, 0, 67, 0, PI2);
        this.addPath(new RenderablePath2D(bkgCircle, DrawType.Fill, Color.HudBkgMain, Color.HudBkgMain));
    }
}
