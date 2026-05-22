import RenderableContainer from "./Manager.js";

/** the position of the sprite (screen coords for now ig) */
export interface PositionData { // using interface and not type cuz we dont need type unions and all that
    x: number,
    y: number
}

// /** basically a glorified Path2D that has instructions on whether to fill,  */
// export interface RenderableComponent {

// }

/** the id that is assigned to each Renderable instance */
export var renderableId = 0;

/** the basic class that exists for a renderable object. 
 * All sprites extend off of this.
 * children classes like Circle and Rectangle and such all 
*/
export default class Renderable {
    public positionData: PositionData;
    public container: RenderableContainer;
    public paths: Path2D[] = [];
    private id: number;

    constructor(container: RenderableContainer, position: PositionData) {
        this.container = container;
        this.positionData = position;
        this.id = renderableId;
        renderableId++;
        this.container.addChild(this.id, this);
    }

    /** add a path to the array of paths */
    public addPath(path: Path2D) {
        this.paths.push(path);
    }

    /** draws each Path2D given a ctx */
    public draw(ctx: CanvasRenderingContext2D) {
        for (const path of this.paths) {
            // iterate through each path
            ctx.stroke(path); // this is a default. 
        }
    }
}