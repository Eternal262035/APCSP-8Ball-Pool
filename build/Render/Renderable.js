import { DrawType } from "../Const/Enums.js";
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
        this.paths.push(path);
    }
    /** draws each Path2D given a ctx */
    draw(ctx) {
        for (const rp2d of this.paths) {
            ctx.save();
            ctx.translate(1 * this.positionData.x, 1 * this.positionData.y);
            if (rp2d.type & DrawType.Fill) {
                ctx.fillStyle = rp2d.fillColor;
                ctx.fill(rp2d.path);
            }
            if (rp2d.type & DrawType.Stroke) {
                ctx.strokeStyle = rp2d.strokeColor;
                ctx.stroke(rp2d.path);
            }
            ctx.restore();
        }
    }
}
