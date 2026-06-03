import { updateHudPosition } from "./RenderHud.js";

export var showHud: Boolean = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas") as HTMLCanvasElement | null;
    
    canvasEle?.addEventListener("mousedown", (e)=>{
        showHud = true;
    });
    
    canvasEle?.addEventListener("mouseup", (e)=>{
        showHud = false;
    });

    canvasEle?.addEventListener("mousemove", (e)=>{
        const mx = e.clientX;
        const my = e.clientY;
        updateHudPosition({x: mx, y: my});
    });
    
    canvasEle?.addEventListener("wheel", (e)=>{ // not "scroll" because we arent actually scrolling the element, only givingg the input
        // @ts-ignore
        console.log(e.wheelDeltaY); 
    });

    
}

