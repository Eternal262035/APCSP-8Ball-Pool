import Renderable from "./Renderable.js";

/** container that holds all the renderable entities.
 * there can be more than one RenderableContainer in existence. 
 */
export default class RenderableContainer {
    public children: Map<number, Renderable>;

    constructor() {
        this.children = new Map();
    }

    public addChild(id: number, child: Renderable):void {
        this.children.set(id, child);
    }

    public removeChild(id:number):void {
        this.children.delete(id);
    }

    public drawAll(ctx: CanvasRenderingContext2D) {
        for (const child of this.children.values()) {
            child.draw(ctx);
        }
    }
    

}


export const containers: RenderableContainer[] = [];
export function initRenderableContainers() {
    containers.push(new RenderableContainer()); // pool table and background
    containers.push(new RenderableContainer()); // entities
}