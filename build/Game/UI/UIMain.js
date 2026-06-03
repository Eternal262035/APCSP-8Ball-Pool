import { CueHudBkg, CueHudIntensity } from "./RenderHud.js";
export var showHud = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    var hudBkg = new CueHudBkg(0, 0);
    var hudIntensityDisplay = new CueHudIntensity(0, 0);
    function updateHudPosition(position) {
        hudBkg.positionData = position;
        hudIntensityDisplay.positionData = position;
    }
    canvasEle?.addEventListener("mousedown", (e) => {
        console.log("SHOWING HUD");
        showHud = true;
        const mx = e.clientX;
        const my = e.clientY;
        updateHudPosition({ x: mx, y: my });
    });
    canvasEle?.addEventListener("mouseup", (e) => {
        console.log("HIDING HUD");
        showHud = false;
    });
    canvasEle?.addEventListener("mousemove", (e) => {
        const mx = e.clientX;
        const my = e.clientY;
        if (showHud) {
            hudIntensityDisplay.updateIntensity(Math.random());
        }
    });
    canvasEle?.addEventListener("wheel", (e) => {
        // @ts-ignore
        console.log(e.wheelDeltaY);
    });
}
