import { PI2 } from "../../../Const/Constants.js";
import { Color, DrawType } from "../../../Const/Enums.js";
import { PositionData } from "../../../Game/Datagroups/PositionData.js";
import { Assets } from "../../../load.js";
import Renderable from "../../Renderable.js";
import RenderableContainer from "../../RenderableContainer.js";
import RenderableImage from "../../RenderableImage.js";
import RenderablePath2D from "../../RenderablePath2D.js";

/** the SPRITE for the cue ball. */
export default class SpriteCueBall extends Renderable {
    constructor(container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const path1 = new Path2D();
        path1.arc(0, 0, radius, 0, PI2);

        const shadow = new Path2D();
        shadow.arc(0, 0, radius * 0.85, 0, PI2);

        this.addPath(new RenderablePath2D(shadow, DrawType.Shadow, Color.Black, Color.DarkGray));
        this.addPath(new RenderablePath2D(path1, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
}