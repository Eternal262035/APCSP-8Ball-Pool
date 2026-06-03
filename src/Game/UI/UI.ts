export default function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas") as HTMLCanvasElement | null;
    
    canvasEle?.addEventListener("click", (e)=>{
    
    });
    
    canvasEle?.addEventListener("wheel", (e)=>{ // not "scroll" because we arent actually scrolling the element, only givingg the input
        // @ts-ignore
        console.log(e.wheelDeltaY); 
    });
}

