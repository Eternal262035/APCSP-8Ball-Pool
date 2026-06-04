import { game } from "../../index.js";
import { PositionData } from "../Datagroups/PositionData.js";
import BallEntity from "../Entity/BallEntity.js";
import Vector from "../Physics/Vector.js";
import { CueHudBkg, CueHudIntensity } from "./RenderHud.js";

export var showHud: Boolean = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas") as HTMLCanvasElement | null;
    

    var hudCx = 0; // hud center x
    var hudCy = 0; // hud center y
    var hudBkg = new CueHudBkg(0, 0);
    var hudIntensityDisplay = new CueHudIntensity(0, 0);
    function updateHudPosition(position: PositionData) {
        hudBkg.positionData = position;
        hudIntensityDisplay.positionData = position;
    }
    
    canvasEle?.addEventListener("mousedown", (e)=>{
        console.log("SHOWING HUD");
        showHud = true;
        const cueBallPosition = game.getBallByNumber(0) as BallEntity;
        const mx = cueBallPosition.positionData.x; // e.clientX;
        const my = cueBallPosition.positionData.y; // e.clientY;
        hudCx = mx;
        hudCy = my;
        updateHudPosition({x: mx, y: my});
    });
    
    canvasEle?.addEventListener("mouseup", (e)=>{
        console.log("HIDING HUD");
        showHud = false;
        const mx = e.clientX;
        const my = e.clientY;
        const cueBall = game.getBallByNumber(0) as BallEntity;
        cueBall.physicsData.velocity.add(
            new Vector(hudCx-mx, hudCy-my).scale(1*hudIntensityDisplay.intensityRatio)
        );
    });
    
    canvasEle?.addEventListener("mousemove", (e)=>{
        const mx = e.clientX;
        const my = e.clientY;

        if (showHud) {
            const d = Math.sqrt((mx-hudCx)**2 + (my-hudCy)**2)/(2*67);
            hudIntensityDisplay.updateIntensity(d<=1?d:1);
        }
    });
    
    canvasEle?.addEventListener("wheel", (e)=>{ // not "scroll" because we arent actually scrolling the element, only givingg the input
        // @ts-ignore
        console.log(e.wheelDeltaY); 
    });

    
}



// type assertions galore
//  fahhhhhhhh