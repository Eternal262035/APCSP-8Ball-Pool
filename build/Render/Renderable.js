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
        for (const path of this.paths) {
            // iterate through each path
            ctx.stroke(path); // this is a default. 
        }
    }
}
