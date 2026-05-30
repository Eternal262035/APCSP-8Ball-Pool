export default class RenderableImage {
    src;
    position;
    width;
    height;
    constructor(src, position, width, height, ...customArgs) {
        // @ts-ignore
        this.src = document.getElementById(src);
        this.position = position;
        this.width = width;
        this.height = height;
        // console.log(this);
    }
}
