import { PI2 } from "../../Const/Constants.js";
import { Color, DrawTextType, DrawType } from "../../Const/Enums.js";
import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import RenderablePath2D from "../../Render/RenderablePath2D.js";
import { PositionData } from "../Datagroups/PositionData.js";

export class CueHudBkg extends Renderable {
    


    constructor(x: number, y: number) {
        super(containers[2], {x: x, y: y});
        
        const bkgCircle = new Path2D();
        bkgCircle.arc(0, 0, 67, 0, PI2);





        this.addPath(new RenderablePath2D(bkgCircle, DrawType.Fill, Color.HudBkgMain, Color.HudBkgMain));
    }


}

export class CueHudIntensity extends Renderable {
    public intensityRatio: number = 0.5;
    
    constructor(x: number, y: number) {
        super(containers[2], {x: x, y: y});
        const path1 = new Path2D();
        path1.arc(0,0,67*this.intensityRatio, 0, PI2);
        
        
        this.addPath(new RenderablePath2D(path1, DrawType.Fill, Color.HudBkgMain, Color.HudBkgMain))
    }

    public updateIntensity(newIntensity: number) {
        this.intensityRatio = newIntensity;
        
        const newPath1 = new Path2D();
        newPath1.arc(0,0,67*this.intensityRatio, 0, PI2);
        
        this.paths[0] = new RenderablePath2D(newPath1, DrawType.Fill, Color.HudBkgMain, Color.HudBkgMain)
    }
}