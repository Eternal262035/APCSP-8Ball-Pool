import { PositionData } from "../Game/Datagroups/PositionData.js";
import { cacheNewImage } from "../utils.js";

export default class RenderableImage {
    public src: string;
    public position: PositionData;
    public cacheId: string;
    public width: number;
    public height: number;

    constructor(src: string, position: PositionData, width: number, height: number, ...customArgs: any[]) {
        this.src = src;
        this.position = position;
        this.width = width;
        this.height = height;
            
        this.cacheId = cacheNewImage(this.src);

        // console.log(this);
    }
}