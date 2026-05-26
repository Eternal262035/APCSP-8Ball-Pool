import { Color, DrawType } from "../Const/Enums.js";

/** basically a Path2D that contains information on how to render it.
 * such as stroke or fill, with what color, etc 
 * Structure of the customArgs rest parameter:
 * [Color, Color, imgSrc, etc...]
 */
export default class RenderablePath2D {
    public path: Path2D;
    public type: DrawType;
    public fillColor: Color = Color.LightGray; 
    public strokeColor: Color = Color.Black; 

    constructor(path: Path2D, type: DrawType, ...customArgs: any[]) {
        this.path = path;
        this.type = type;
        this.strokeColor = customArgs[0]||Color.Black;
        this.fillColor = customArgs[1]||Color.LightGray;
        // console.log(this);
    }
}