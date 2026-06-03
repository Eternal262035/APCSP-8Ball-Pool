import { CueHudBkg } from "./RenderHud.js";
export var showHud = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    var hudBkg = new CueHudBkg(0, 0);
    function updateHudPosition(position) {
        hudBkg.positionData = position;
    }
    canvasEle?.addEventListener("mousedown", (e) => {
        console.log("SHOWING HUD");
        showHud = true;
        const mx = e.clientX;
        const my = e.clientY;
        updateHudPosition({ x: mx, y: my });
    });
    canvasEle?.addEventListener("mouseup", (e) => {
        showHud = false;
    });
    canvasEle?.addEventListener("mousemove", (e) => {
        // something
    });
    canvasEle?.addEventListener("wheel", (e) => {
        // @ts-ignore
        console.log(e.wheelDeltaY);
    });
}
