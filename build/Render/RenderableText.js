import { Color } from "../Const/Enums.js";
/**  */
export default class RenderableText {
    text;
    position;
    type;
    fillColor = Color.LightGray;
    strokeColor = Color.Black;
    font;
    constructor(text, position, type, font, ...customArgs) {
        this.text = text;
        this.position = position;
        this.type = type;
        this.font = font;
        this.strokeColor = customArgs[0] || Color.Black;
        this.fillColor = customArgs[1] || Color.LightGray;
        // console.log(this);
    }
}
