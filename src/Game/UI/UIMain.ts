import { PositionData } from "../Datagroups/PositionData.js";
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
        const mx = e.clientX;
        const my = e.clientY;
        hudCx = mx;
        hudCy = my;
        updateHudPosition({x: mx, y: my});
    });
    
    canvasEle?.addEventListener("mouseup", (e)=>{
        console.log("HIDING HUD");
        showHud = false;
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

