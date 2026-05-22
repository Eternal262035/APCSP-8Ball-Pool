/** container that holds all the renderable entities.
 * there can be more than one RenderableContainer in existence.
 */
export default class RenderableContainer {
    children;
    constructor() {
        this.children = new Map();
    }
    addChild(id, child) {
        this.children.set(id, child);
    }
    removeChild(id) {
        this.children.delete(id);
    }
    drawAll(ctx) {
        for (const child of this.children.values()) {
            child.draw(ctx);
        }
    }
}
export const containers = [];
export function initRenderableContainers() {
    containers.push(new RenderableContainer()); //[0]
}
