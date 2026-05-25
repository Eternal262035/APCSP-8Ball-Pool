import { Color } from "../Const/Enums.js";
/** basically a Path2D that contains information on how to render it
 * such as stroke or fill, with what color, etc
 *
 */
export default class RenderablePath2D {
    path;
    type;
    colors = {
        stroke: Color.Black,
        fill: Color.LightGray
    };
    constructor(path, type) {
        this.path = path;
        this.type = type;
    }
}
