const c = document.getElementById("mainCanvas"); // type assertion because by default it returns a generic HTMLElement type
export var ctx;
export default function initCanvas() {
    ctx = c.getContext("2d");
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    window.addEventListener("resize", () => {
        c.height = window.innerHeight;
        c.width = window.innerWidth;
    });
}
