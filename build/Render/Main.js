import { mspt } from "../config.js";
import { c } from "./InitCanvas.js";
import { containers } from "./RenderableContainer.js";
let lastTick = Date.now();
let thisTick = Date.now();
export default function renderFrameLoop(ctx) {
    requestAnimationFrame(() => { renderFrameLoop(ctx); }); // must wrap in anonymous function cuz otherwise it eats the call stack
    thisTick = Date.now();
    const delta = thisTick - lastTick;
    if (delta > mspt) {
        ctx.clearRect(0, 0, c.width, c.height);
        lastTick = thisTick;
        for (const ctn of containers) {
            ctn.drawAll(ctx);
        }
    }
}
