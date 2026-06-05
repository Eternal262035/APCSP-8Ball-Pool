import { game } from "../../index.js";
import Vector from "../Physics/Vector.js";
import { CueHudBkg, CueHudIntensity, CueHudTracerArrow } from "./RenderHud.js";
export var showHud = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    var hudCx = 0; // hud center x
    var hudCy = 0; // hud center y
    var hudBkg = new CueHudBkg(0, 0);
    var hudIntensityDisplay = new CueHudIntensity(0, 0);
    var hudTracerArrow = new CueHudTracerArrow(0, 0);
    function updateHudPosition(position) {
        hudBkg.positionData = position;
        hudIntensityDisplay.positionData = position;
        hudTracerArrow.positionData = position;
    }
    canvasEle?.addEventListener("mousedown", (e) => {
        // console.log("SHOWING HUD");
        if (!checkAllZeroVelocity())
            return;
        showHud = true;
        const cueBallPosition = game.getBallByNumber(0);
        const mx = cueBallPosition.positionData.x; // e.clientX;
        const my = cueBallPosition.positionData.y; // e.clientY;
        hudCx = mx;
        hudCy = my;
        updateHudPosition({ x: mx, y: my });
    });
    canvasEle?.addEventListener("mouseup", (e) => {
        if (!checkAllZeroVelocity())
            return;
        // console.log("HIDING HUD");
        showHud = false;
        const mx = e.clientX;
        const my = e.clientY;
        const cueBall = game.getBallByNumber(0);
        cueBall.physicsData.velocity.set(Vector.fromPolar(15 * hudIntensityDisplay.intensityRatio, new Vector(-mx + hudCx, -my + hudCy).angle));
    });
    canvasEle?.addEventListener("mousemove", (e) => {
        if (!checkAllZeroVelocity())
            return;
        const mx = e.clientX;
        const my = e.clientY;
        if (showHud) {
            const d = Math.sqrt((mx - hudCx) ** 2 + (my - hudCy) ** 2) / (4 * 67);
            hudIntensityDisplay.updateIntensity(d <= 1 ? d : 1);
            hudTracerArrow.updateVector(Vector.fromPolar(hudTracerArrow.length * hudIntensityDisplay.intensityRatio, new Vector(-mx + hudCx, -my + hudCy).angle));
        }
    });
    // canvasEle?.addEventListener("wheel", (e)=>{ // not "scroll" because we arent actually scrolling the element, only givingg the input
    //     // @ts-ignore
    //     console.log(e.wheelDeltaY); 
    // });
}
function checkAllZeroVelocity() {
    // makes sure to only show hud when all balls are at rest
    for (const ball of game.balls) {
        if (ball.physicsData.velocity.magnitude != 0)
            return false;
    }
    return true;
}
// type assertions galore
//  fahhhhhhhh
