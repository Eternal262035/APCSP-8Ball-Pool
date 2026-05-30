import { cacheNewImage } from "../utils.js";
export default class RenderableImage {
    src;
    position;
    cacheId;
    width;
    height;
    constructor(src, position, width, height, ...customArgs) {
        this.src = src;
        this.position = position;
        this.width = width;
        this.height = height;
        this.cacheId = cacheNewImage(this.src);
        // console.log(this);
    }
}
