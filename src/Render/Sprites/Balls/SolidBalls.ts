import { PI2 } from "../../../Const/Constants.js";
import { Color, DrawTextType, DrawType } from "../../../Const/Enums.js";
import { PositionData } from "../../../Game/Datagroups/PositionData.js";
import Renderable from "../../Renderable.js";
import RenderableContainer from "../../RenderableContainer.js";
import RenderableImage from "../../RenderableImage.js";
import RenderablePath2D from "../../RenderablePath2D.js";
import RenderableText from "../../RenderableText.js";

/** the sprite for the 1 ball */
export class Sprite1Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS1T9));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("1", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));
    }
}

export class Sprite2Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS2T10));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("2", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));        
    }
}

export class Sprite3Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS3T11));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("3", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));        
    }
}

export class Sprite4Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS4T12));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("4", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));        
    }
}

export class Sprite5Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS5T13));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("5", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));        
    }
}

export class Sprite6Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS6T14));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("6", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));        
    }
}

export class Sprite7Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS7T15));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("7", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));    
    }
}

