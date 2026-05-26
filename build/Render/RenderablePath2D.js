import { Color } from "../Const/Enums.js";
/** basically a Path2D that contains information on how to render it.
 * such as stroke or fill, with what color, etc
 * Structure of the customArgs rest parameter:
 * [Color, Color, imgSrc, etc...]
 */
export default class RenderablePath2D {
    path;
    type;
    fillColor = Color.LightGray;
    strokeColor = Color.Black;
    constructor(path, type, ...customArgs) {
        this.path = path;
        this.type = type;
        this.strokeColor = customArgs[0] || Color.Black;
        this.fillColor = customArgs[1] || Color.LightGray;
        // console.log(this);
    }
}
