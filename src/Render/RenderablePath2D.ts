import { Color, DrawType } from "../Const/Enums.js";

/** basically a Path2D that contains information on how to render it
 * such as stroke or fill, with what color, etc 
 * 
 */
export default class RenderablePath2D {
    public path: Path2D;
    public type: DrawType;
    public colors: {
        stroke: Color,
        fill: Color,
    } = {
        stroke: Color.Black,
        fill: Color.LightGray
    };

    constructor(path: Path2D, type: DrawType) {
        this.path = path;
        this.type = type;
    }
}