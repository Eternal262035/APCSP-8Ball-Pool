import { PositionData } from "../Game/Datagroups/PositionData.js";
import { cacheNewImage } from "../utils.js";

export default class RenderableImage {
    public src: HTMLElement;
    public position: PositionData;
    public width: number;
    public height: number;

    constructor(src: string, position: PositionData, width: number, height: number, ...customArgs: any[]) {
        // @ts-ignore
        this.src = document.getElementById(src);
        
        this.position = position;
        this.width = width;
        this.height = height;

        // console.log(this);
    }
}