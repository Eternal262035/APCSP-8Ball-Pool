const c = document.getElementById("mainCanvas") as HTMLCanvasElement; // type assertion because by default it returns a generic HTMLElement type
export var ctx: CanvasRenderingContext2D;


export default function initCanvas() {
    ctx = c.getContext("2d") as CanvasRenderingContext2D;
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    window.addEventListener("resize", ()=>{
        c.height = window.innerHeight;
        c.width = window.innerWidth;
    });
}