import { Color, DrawTextType, DrawType } from "../Const/Enums.js";
import { PositionData } from "../Game/Datagroups/PositionData.js";
import RenderableContainer from "./RenderableContainer.js";
import RenderablePath2D from "./RenderablePath2D.js";
import RenderableImage from "./RenderableImage.js";
import RenderableText from "./RenderableText.js";



/** type union */
type RenderableTemplate = RenderablePath2D|RenderableText|RenderableImage;

/** the id that is assigned to each Renderable instance */
export var renderableId = 0;

/** the basic class that exists for a renderable object. 
 * All sprites extend off of this.
 * children classes like Circle and Rectangle and such all 
*/
export default class Renderable {
    public positionData: PositionData;
    public container: RenderableContainer;
    public paths: RenderablePath2D[] = [];
    public textPaths: RenderableText[] = [];
    public imagePaths: RenderableImage[] = [];
    public id: number;

    constructor(container: RenderableContainer, position: PositionData) {
        this.container = container;
        this.positionData = position;
        this.id = renderableId;
        renderableId++;
        this.container.addChild(this.id, this);
    }

    /** add a path to the array of paths */
    public addPath(path: RenderableTemplate) {
        if (path instanceof RenderablePath2D) this.paths.push(path);
        if (path instanceof RenderableText) this.textPaths.push(path);
        if (path instanceof RenderableImage) this.imagePaths.push(path);
    }

    /** draws each Path2D given a ctx */
    public draw(ctx: CanvasRenderingContext2D) {
        for (const template of this.paths) {
            ctx.save();
            ctx.translate(1*this.positionData.x, 1*this.positionData.y);
            if (template.type & DrawType.Fill) {
                ctx.fillStyle = template.fillColor;
                ctx.fill(template.path);
            }
            if (template.type & DrawType.Stroke) {
                ctx.strokeStyle = template.strokeColor;
                ctx.stroke(template.path);
            }
            if (template.type & DrawType.Shadow) {
                ctx.shadowColor = template.strokeColor;
                ctx.shadowBlur = 20;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = -2;
                ctx.fill(template.path);
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
        for (const template of this.imagePaths) {
            ctx.save();
            ctx.translate(1 * this.positionData.x, 1 * this.positionData.y);
            // using a type assertion here seems really sketchy to me but whatever
            ctx.drawImage(template.src as CanvasImageSource, template.position.x, template.position.y, template.width, template.height);
            ctx.restore();
        }
    }
}