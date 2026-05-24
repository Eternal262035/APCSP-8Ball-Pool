import Entity from "./Game/Entity/Entity.js";
import { entityManager } from "./Game/Entity/EntityManager.js";
import { checkForCollisions } from "./Game/Physics/Collision.js";
import initCanvas, { ctx } from "./Render/InitCanvas.js";
import renderFrameLoop from "./Render/Main.js";
import { containers, initRenderableContainers } from "./Render/RenderableContainer.js";
import Circle from "./Render/Sprites/Circle.js";

// alert("Load index");



initCanvas();
initRenderableContainers();
renderFrameLoop(ctx);
const tickInterval = setInterval(()=>{
    checkForCollisions();
    entityManager.applyAllEntityPhysics();
}, 10);

    
new Entity(67,67,15);
new Entity(67,77,20);
const mouseEntity = new Entity(67,77,20);

let mx = 0;
let my = 0;
document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    mouseEntity.positionData.x = mx;
    mouseEntity.positionData.y = my;
});
document.addEventListener('click', (event) => {
    new Entity(event.clientX,event.clientY,20);
});