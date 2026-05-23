import initCanvas, { ctx } from "./Render/InitCanvas.js";
import renderFrameLoop from "./Render/Main.js";
import { containers, initRenderableContainers } from "./Render/RenderableContainer.js";
import Circle from "./Render/Sprites/Circle.js";

// alert("Load index");



initCanvas();
initRenderableContainers();
renderFrameLoop(ctx);

const test = new Circle(containers[0], {x:67, y:67}, 15);
setInterval(()=>{
    test.positionData.x+=10;
    console.log(test.positionData);
}, 2000);


