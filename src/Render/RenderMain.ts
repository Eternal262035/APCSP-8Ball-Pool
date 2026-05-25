import { msprt, mspt } from "../config.js";
import { c } from "./InitCanvas.js";
import { containers } from "./RenderableContainer.js";



let lastTick = Date.now();
let thisTick = Date.now();
export default function renderFrameLoop(ctx: CanvasRenderingContext2D) {
    requestAnimationFrame(()=>{renderFrameLoop(ctx);});// must wrap in anonymous function cuz otherwise it eats the call stack
    
    thisTick = Date.now();
    const delta = thisTick - lastTick;
    
    
    if (delta > msprt) {
        const renStart = Date.now();
        ctx.clearRect(0,0,c.width, c.height);
        lastTick = thisTick;
        for (const ctn of containers) {
            ctn.drawAll(ctx);
        }
        // @ts-ignore
        document.getElementById("debug-fps").innerText = `fps: ${(1000/delta).toFixed(1)} | ${(1000/msprt).toFixed(1)} | (delta|config)`;
        // @ts-ignore
        document.getElementById("debug-renderTime").innerText = `frame render: ${Date.now()-renStart} ms`;
    }
}


