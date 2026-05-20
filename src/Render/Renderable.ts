/** the basic class that exists for a renderable object. 
 * children classes like Circle and Rectangle and such all 
*/
export class Renderable {
    public position: {
        x: number,
        y: number,
    } = {x:0,y:0};
    public paths: Path2D[] = [];

    constructor() {

    }

    /** defines the paths. */
    protected setPath() {
        
    }
}