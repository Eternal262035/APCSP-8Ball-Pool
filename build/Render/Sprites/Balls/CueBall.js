import { PI2 } from "../../../Const/Constants.js";
import { Color, DrawType } from "../../../Const/Enums.js";
import Renderable from "../../Renderable.js";
import RenderablePath2D from "../../RenderablePath2D.js";
/** the SPRITE for the cue ball. */
export default class SpriteCueBall extends Renderable {
    constructor(container, position, radius) {
        super(container, position);
        console.log(this);
        const testPath = new Path2D();
        testPath.arc(0, 0, radius, 0, PI2);
        this.addPath(new RenderablePath2D(testPath, DrawType.Fill, Color.White));
    }
}
