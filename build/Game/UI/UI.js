export default function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    canvasEle?.addEventListener("click", (e) => {
    });
    canvasEle?.addEventListener("wheel", (e) => {
        // @ts-ignore
        console.log(e.wheelDeltaY);
    });
}
