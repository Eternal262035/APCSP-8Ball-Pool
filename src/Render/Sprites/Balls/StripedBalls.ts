import { PI, PI2 } from "../../../Const/Constants.js";
import { Color, DrawTextType, DrawType } from "../../../Const/Enums.js";
import { PositionData } from "../../../Game/Datagroups/PositionData.js";
import Renderable from "../../Renderable.js";
import RenderableContainer from "../../RenderableContainer.js";
import RenderableImage from "../../RenderableImage.js";
import RenderablePath2D from "../../RenderablePath2D.js";
import RenderableText from "../../RenderableText.js";

/** the sprite for the 9 ball */
export class Sprite9Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);

        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS1T9));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("9", {x: -6, y: 7}, DrawTextType.Fill, "20px Arial", Color.Black));
    }
}

export class Sprite10Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);
        
        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS2T10));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("10", {x: -10, y: 7}, DrawTextType.Fill, "17px Arial", Color.Black));        
    }
}

export class Sprite11Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);
        
        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS3T11));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("11", {x: -10, y: 7}, DrawTextType.Fill, "17px Arial", Color.Black));        
    }
}

export class Sprite12Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);
        
        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS4T12));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("12", {x: -10, y: 7}, DrawTextType.Fill, "17px Arial", Color.Black));        
    }
}

export class Sprite13Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);
        
        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS5T13));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("13", {x: -10, y: 7}, DrawTextType.Fill, "17px Arial", Color.Black));        
    }
}

export class Sprite14Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);
        
        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS6T14));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("14", {x: -10, y: 7}, DrawTextType.Fill, "17px Arial", Color.Black));        
    }
}

export class Sprite15Ball extends Renderable {
    constructor (container: RenderableContainer, position: PositionData, radius: number) {
        super(container, position);
        console.log(this);
        const bkgPath = new Path2D();
        bkgPath.arc(0, 0, radius, 0, PI2);
        const numberBkg = new Path2D();
        numberBkg.arc(0, 0, radius*0.55, 0, PI2);
        
        const topMask = new Path2D();
        topMask.arc(0,0,radius, PI/5, 4*PI/5);
        const bottomMask = new Path2D();
        bottomMask.arc(0,0,radius, 6*PI/5, 9*PI/5);
        
        this.addPath(new RenderablePath2D(bkgPath, DrawType.Fill, Color.White, Color.BallS7T15));
        this.addPath(new RenderablePath2D(topMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(bottomMask, DrawType.Fill, Color.White, Color.White));
        this.addPath(new RenderablePath2D(numberBkg, DrawType.Fill|DrawType.Stroke, Color.DarkGray, Color.White));
        this.addPath(new RenderableText("15", {x: -10, y: 7}, DrawTextType.Fill, "17px Arial", Color.Black));    
    }
}

