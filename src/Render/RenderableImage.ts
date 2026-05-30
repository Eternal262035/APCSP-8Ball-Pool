import { PositionData } from "../Game/Datagroups/PositionData.js";

export default class RenderableImage {
    public src: string;
    public position: PositionData;

    constructor(src: string, position: PositionData, ...customArgs: any[]) {
        this.src = src;
        this.position = position;
        
        // console.log(this);
    }
}