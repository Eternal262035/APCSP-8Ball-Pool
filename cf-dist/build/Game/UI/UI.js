export var showHud = false;
export function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    canvasEle?.addEventListener("mousedown", (e) => {
        showHud = true;
    });
    canvasEle?.addEventListener("mouseup", (e) => {
        showHud = false;
    });
    canvasEle?.addEventListener("wheel", (e) => {
        // @ts-ignore
        console.log(e.wheelDeltaY);
    });
}
