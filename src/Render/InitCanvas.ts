const c = document.getElementById("mainCanvas") as HTMLCanvasElement; // type assertion because by default it returns a generic HTMLElement type
export var ctx: CanvasRenderingContext2D | null;


export default function initCanvas() {
    ctx = c.getContext("2d");
    c.height = screen.height;
    c.width = screen.width;
}