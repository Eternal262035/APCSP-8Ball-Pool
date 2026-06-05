import { ballSize } from "../../config.js";
import { PI2 } from "../../Const/Constants.js";
import { Color, DrawTextType, DrawType } from "../../Const/Enums.js";
import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import RenderablePath2D from "../../Render/RenderablePath2D.js";
import RenderableText from "../../Render/RenderableText.js";
import { PositionData } from "../Datagroups/PositionData.js";
import Vector, { VectorAbstract } from "../Physics/Vector.js";

export class CueHudBkg extends Renderable {
    


    constructor(x: number, y: number) {
        super(containers[2], {x: x, y: y});
        
        const bkgCircle = new Path2D();
        bkgCircle.arc(0, 0, 67, 0, PI2);





        this.addPath(new RenderablePath2D(bkgCircle, DrawType.Fill|DrawType.Stroke, Color.LightGray, Color.HudBkgMain));
    }


}

export class CueHudIntensity extends Renderable {
    public intensityRatio: number = 0.5;
    
    constructor(x: number, y: number) {
        super(containers[2], {x: x, y: y});
        const path1 = new Path2D();
        path1.arc(0,0,67*this.intensityRatio, 0, PI2);

        const textPercentDisplay = new RenderableText("0.00%", {x: -24, y: 9}, DrawTextType.Fill, "20px Arial");
        
        
        this.addPath(new RenderablePath2D(path1, DrawType.Fill, Color.HudBkgIndicator, Color.HudBkgIndicator))
        this.addPath(textPercentDisplay);
    }

    public updateIntensity(newIntensity: number) {
        this.intensityRatio = newIntensity;
        
        const newPath1 = new Path2D();
        newPath1.arc(0,0,67*this.intensityRatio, 0, PI2);
        
        this.paths[0] = new RenderablePath2D(newPath1, DrawType.Fill, Color.HudBkgIndicator, Color.HudBkgIndicator)
        this.textPaths[0] = new RenderableText(`${(newIntensity*100).toFixed(2)}%`, {x: -24, y: 9}, DrawTextType.Fill, "20px Roboto Mono");
    }
}

export class CueHudTracerArrow extends Renderable {
    public length: number = 150;
    public angle: number = 0;
    public startRadius: number = ballSize*2;
    private vector: VectorAbstract;

    constructor(x: number, y: number) {
        super(containers[2], {x: x, y: y});
        this.vector = new Vector(0,0);
        const path1 = new Path2D();
        path1.moveTo(0,0);
        path1.lineTo(this.vector.x, this.vector.y);

        this.addPath(new RenderablePath2D(path1, DrawType.Stroke, Color.Black, Color.Black));

    }
}