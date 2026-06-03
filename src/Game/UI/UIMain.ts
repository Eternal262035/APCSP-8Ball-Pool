import { PositionData } from "../Datagroups/PositionData.js";
import { CueHudBkg } from "./RenderHud.js";

export var showHud: Boolean = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas") as HTMLCanvasElement | null;
    
    var hudBkg = new CueHudBkg(0, 0);
    function updateHudPosition(position: PositionData) {
        hudBkg.positionData = position;
    }

    canvasEle?.addEventListener("mousedown", (e)=>{
        console.log("SHOWING HUD")
        showHud = true;
        const mx = e.clientX;
        const my = e.clientY;
        updateHudPosition({x: mx, y: my});
    });
    
    canvasEle?.addEventListener("mouseup", (e)=>{
        showHud = false;
    });

    canvasEle?.addEventListener("mousemove", (e)=>{
        // something
    });
    
    canvasEle?.addEventListener("wheel", (e)=>{ // not "scroll" because we arent actually scrolling the element, only givingg the input
        // @ts-ignore
        console.log(e.wheelDeltaY); 
    });

    
}

