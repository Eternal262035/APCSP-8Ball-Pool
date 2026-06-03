import { Color, DrawType } from "../../Const/Enums.js";
import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import RenderablePath2D from "../../Render/RenderablePath2D.js";
class CueHudBkg extends Renderable {
    constructor(x, y) {
        super(containers[2], { x: x, y: y });
        const bkgCircle = new Path2D();
        this.addPath(new RenderablePath2D(bkgCircle, DrawType.Fill, Color.HudBkgMain, Color.HudBkgMain));
    }
}
const hudBkg = new CueHudBkg(0, 0);
export function updateHudPosition(position) {
    hudBkg.positionData = position;
}
