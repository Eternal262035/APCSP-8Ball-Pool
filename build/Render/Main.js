import { c } from "./InitCanvas.js";
import { containers } from "./RenderableContainer.js";
export default function renderFrameLoop(ctx) {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const ctn of containers) {
        ctn.drawAll(ctx);
    }
    requestAnimationFrame(() => { renderFrameLoop(ctx); }); // must wrap in anonymous function cuz otherwise it eats the call stack
}
