import { updateHudPosition } from "./RenderHud.js";
export var showHud = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    canvasEle?.addEventListener("mousedown", (e) => {
        showHud = true;
    });
    canvasEle?.addEventListener("mouseup", (e) => {
        showHud = false;
    });
    canvasEle?.addEventListener("mousemove", (e) => {
        const mx = e.clientX;
        const my = e.clientY;
        updateHudPosition({ x: mx, y: my });
    });
    canvasEle?.addEventListener("wheel", (e) => {
        // @ts-ignore
        console.log(e.wheelDeltaY);
    });
}
