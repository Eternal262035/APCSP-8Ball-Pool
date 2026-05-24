import Renderable from "../Renderable.js";
export default class SpriteWorldBorder extends Renderable {
    constructor(container, position, width, height) {
        super(container, position);
        console.log(this);
        const path1 = new Path2D;
        // path1.rect(position.x-width/2, position.y-height/2, width, height);
        // path1.rect(position.x, position.y, width, height);
        path1.rect(0, 0, width, height);
        this.addPath(path1);
    }
    draw(thisCtx) {
        super.draw(thisCtx);
    }
}
