import { PositionData } from "./Game/Datagroups/PositionData.js";
import Entity from "./Game/Entity/Entity.js";
import { entityManager } from "./Game/Entity/EntityManager.js";
import { checkForCollisions } from "./Game/Physics/Collision.js";
import initCanvas, { ctx } from "./Render/InitCanvas.js";
import renderFrameLoop from "./Render/RenderMain.js";
import { containers, initRenderableContainers } from "./Render/RenderableContainer.js";
import Circle from "./Render/Sprites/Circle.js";
import SpriteWorldBorder from "./Render/Sprites/WorldBorder.js";

// alert("Load index");



initCanvas();
initRenderableContainers();
renderFrameLoop(ctx);
const tickInterval = setInterval(()=>{
    checkForCollisions();
    skibidiSixSevenTungTungSaheur();
    // mouseEntity.physicsData.velocity.scale(0);
    entityManager.applyAllEntityPhysics();
}, 10);


new Entity(167,167,15);
new Entity(197,167,15);
new Entity(217,167,15);
// new Entity(67,77,20);

// const mouseEntity = new Entity(67,77,20);
// let mx = 0;
// let my = 0;
// document.addEventListener('mousemove', (event) => {
//     mx = event.clientX;
//     my = event.clientY;
//     mouseEntity.positionData.x = mx;
//     mouseEntity.positionData.y = my;
// });
document.addEventListener('click', (event) => {
    new Entity(event.clientX,event.clientY,20);
});

new SpriteWorldBorder(containers[0], new PositionData(100, 100), 500, 500);


const wasdEntity = new Entity(107, 167, 25);
wasdEntity.physicsData.mass = 1000;










enum InputFlags {
    LeftClick   = 1 << 0,
    RightClick  = 1 << 1,
    Up          = 1 << 2,
    Left        = 1 << 3,
    Down        = 1 << 4,
    Right       = 1 << 5,
}

let currentInputs = 0;

/** match a keycode to an input flag */
function matchToInput(keyCode:number):InputFlags|undefined { // matches keycodes to input flags
    switch (keyCode) {
        case 87: // w
        case 38: // arrowUp
            return InputFlags.Up;
        case 83: // s
        case 40: // arrowDown
            return InputFlags.Down;
        case 65: // a
        case 37: // arrowLeft
            return InputFlags.Left;
        case 68: // d
        case 39: // arrowRight
            return InputFlags.Right
    }
}


// key down
window.addEventListener("keydown", (e) => {
    const input = matchToInput(e.keyCode);
    if (input) {
        currentInputs |= input;
    }
});

// key up
window.addEventListener("keyup", (e) => {
    const input = matchToInput(e.keyCode);
    if (input) {
        // remove flag
        currentInputs &= ~input;
    }
});

function skibidiSixSevenTungTungSaheur():void {
    if (currentInputs & InputFlags.Down) wasdEntity.physicsData.velocity.y += 0.3;
    if (currentInputs & InputFlags.Up) wasdEntity.physicsData.velocity.y -= 0.3;
    if (currentInputs & InputFlags.Left) wasdEntity.physicsData.velocity.x -= 0.3;
    if (currentInputs & InputFlags.Right) wasdEntity.physicsData.velocity.x += 0.3;
}