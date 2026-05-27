import { Color, DrawTextType, DrawType } from "../Const/Enums.js";
import { PositionData } from "../Game/Datagroups/PositionData.js";

/**  */
export default class RenderableText {
    public text: string;
    public position: PositionData;
    public type: DrawTextType;
    public fillColor: Color = Color.LightGray; 
    public strokeColor: Color = Color.Black;
    public font: string;

    constructor(text: string, position: PositionData, type: DrawTextType, font: string, ...customArgs: any[]) {
        this.text = text;
        this.position = position;
        this.type = type;
        this.font = font;
        this.strokeColor = customArgs[0]||Color.Black;
        this.fillColor = customArgs[1]||Color.LightGray;
        
        // console.log(this);
    }
}