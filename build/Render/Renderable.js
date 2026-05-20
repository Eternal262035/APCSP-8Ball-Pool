/** the basic class that exists for a renderable object.
 * children classes like Circle and Rectangle and such all
*/
export class Renderable {
    position = { x: 0, y: 0 };
    paths = [];
    constructor() {
    }
    /** defines the paths. */
    addPath(p) {
        this.paths.push(p);
    }
}
