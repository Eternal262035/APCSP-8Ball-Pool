// /** basically a glorified Path2D that has instructions on whether to fill,  */
// export interface RenderableComponent {
// }
/** the basic class that exists for a renderable object.
 * All sprites extend off of this.
 * children classes like Circle and Rectangle and such all
*/
export default class Renderable {
    positionData;
    paths = [];
    constructor(position) {
        this.positionData = position;
    }
    /** add a path to the array of paths */
    addPath(path) {
        this.paths.push(path);
    }
    /** draws each Path2D given a ctx */
    draw(ctx) {
        for (const path of this.paths) {
            // iterate through each path
            ctx.stroke(path);
        }
    }
}
