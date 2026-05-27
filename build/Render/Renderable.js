import { DrawTextType, DrawType } from "../Const/Enums.js";
import RenderablePath2D from "./RenderablePath2D.js";
import RenderableText from "./RenderableText.js";
/** the id that is assigned to each Renderable instance */
export var renderableId = 0;
/** the basic class that exists for a renderable object.
 * All sprites extend off of this.
 * children classes like Circle and Rectangle and such all
*/
export default class Renderable {
    positionData;
    container;
    paths = [];
    textPaths = [];
    id;
    constructor(container, position) {
        this.container = container;
        this.positionData = position;
        this.id = renderableId;
        renderableId++;
        this.container.addChild(this.id, this);
    }
    /** add a path to the array of paths */
    addPath(path) {
        if (path instanceof RenderablePath2D)
            this.paths.push(path);
        if (path instanceof RenderableText)
            this.textPaths.push(path);
    }
    /** draws each Path2D given a ctx */
    draw(ctx) {
        for (const template of this.paths) {
            ctx.save();
            ctx.translate(1 * this.positionData.x, 1 * this.positionData.y);
            if (template.type & DrawType.Fill) {
                ctx.fillStyle = template.fillColor;
                ctx.fill(template.path);
            }
            if (template.type & DrawType.Stroke) {
                ctx.strokeStyle = template.strokeColor;
                ctx.stroke(template.path);
            }
            ctx.restore();
        }
        for (const template of this.textPaths) {
            ctx.save();
            ctx.translate(1 * this.positionData.x, 1 * this.positionData.y);
            if (template.type & DrawTextType.Stroke) {
                ctx.strokeStyle = template.strokeColor;
                ctx.font = template.font;
                ctx.strokeText(template.text, template.position.x, template.position.y);
            }
            if (template.type & DrawTextType.Fill) {
                ctx.fillStyle = template.strokeColor;
                ctx.font = template.font;
                ctx.fillText(template.text, template.position.x, template.position.y);
            }
            ctx.restore();
        }
    }
}
