import { msprt, mspt } from "../config.js";
import { showHud } from "../Game/UI/UIMain.js";
import { bkgX,  bkgY, } from "../index.js";
import { c } from "./InitCanvas.js";
import { containers } from "./RenderableContainer.js";


const background = document.getElementsByClassName("background")[0] as HTMLElement;
let bkgXcurrent = 0; // this is what rendermain actually uses to render the position of the div
let bkgYcurrent = 0;

let lastTick = Date.now();
let thisTick = Date.now();
export default function renderFrameLoop(ctx: CanvasRenderingContext2D) { // lalalala theres no stopping this
    requestAnimationFrame(()=>{renderFrameLoop(ctx);});// must wrap in anonymous function cuz otherwise it eats the call stack

    
    bkgXcurrent += (bkgX - bkgXcurrent) * 0.08; // 0.1 = smoothing factor
    bkgYcurrent += (bkgY - bkgYcurrent) * 0.08;
    background.style.transform = `translate(${bkgXcurrent}px, ${bkgYcurrent}px) scale(1.1)`;

    thisTick = Date.now();
    const delta = thisTick - lastTick;
    
    
    if (delta > msprt) {
        const renStart = Date.now();
        ctx.clearRect(0,0,c.width, c.height);
        lastTick = thisTick;
        containers[0].drawAll(ctx); // draw border
        containers[1].drawAll(ctx); // draw entities
        if (showHud) containers[2].drawAll(ctx); // draw hud 

        // for (const ctn of containers) {
        //     ctn.drawAll(ctx);
        // }
        // @ts-ignore
        document.getElementById("debug-fps").innerText = `fps: ${(1000/delta).toFixed(1)} | ${(1000/msprt).toFixed(1)} (delta|config)`;
        // @ts-ignore
        document.getElementById("debug-renderTime").innerText = `frame render: ${Date.now()-renStart} ms`;
    }
}


