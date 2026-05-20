/** the position of the sprite (screen coords for now ig) */
export interface PositionData { // using interface and not type cuz we dont need type unions and all that
    x: number,
    y: number
}

// /** basically a glorified Path2D that has instructions on whether to fill,  */
// export interface RenderableComponent {

// }

/** the basic class that exists for a renderable object. 
 * All sprites extend off of this.
 * children classes like Circle and Rectangle and such all 
*/
export default class Renderable {
    positionData: PositionData;
    public paths: Path2D[] = [];

    constructor(position: PositionData) {
        this.positionData = position;
    }

    /** add a path to the array of paths */
    public addPath(path: Path2D) {
        this.paths.push(path);
    }

    /** draws each Path2D given a ctx */
    public draw(ctx: CanvasRenderingContext2D) {
        for (const path of this.paths) {
            // iterate through each path
            ctx.stroke(path);
        }
    }
}