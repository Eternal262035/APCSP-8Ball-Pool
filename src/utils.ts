import { PositionData } from "./Game/Datagroups/PositionData.js";
import { mapBottom, mapLeft, mapRight, mapTop } from "./index.js";

/** converts map coords (where 0,0 is the top left corner of the pool table) into canvas coords */
export function mapToCanvasCoords(x: number, y: number): PositionData {
    // the distance from the left edge of the screen to the left edge of the pool table is mapLeft
    // same logic for vertical distance
    return new PositionData(x+mapLeft, y+mapTop);
}

/** converts canvas coords into map coords (where 0,0 is the top left corner of the pool table) */
export function canvasToMapCoords(x: number, y: number): PositionData {
    return new PositionData(x-mapLeft, y-mapTop);
}

export function cacheNewImage(url:string): string {
    const imageId = `cache_${crypto.randomUUID()}`;
    const node = document.createElement("img");
    node.setAttribute("src", url);
    node.setAttribute("id", imageId);
    // @ts-ignore
    document.getElementById("imageCache").appendChild(node);
    return imageId;
}