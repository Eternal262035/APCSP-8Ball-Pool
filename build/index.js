import { PositionData } from "./Game/Datagroups/PositionData.js";
import { entityManager } from "./Game/Entity/EntityManager.js";
import TestEntity from "./Game/Entity/TestEntity.js";
import { checkForCollisions } from "./Game/Physics/Collision.js";
import initCanvas, { ctx } from "./Render/InitCanvas.js";
import renderFrameLoop from "./Render/RenderMain.js";
import { containers, initRenderableContainers } from "./Render/RenderableContainer.js";
import SpriteWorldBorder from "./Render/Sprites/WorldBorder.js";
import { mspt } from "./config.js";
// alert("Load index");
initCanvas();
initRenderableContainers();
renderFrameLoop(ctx);
const tickInterval = setInterval(() => {
    const start = Date.now();
    checkForCollisions();
    skibidiSixSevenTungTungSaheur();
    // mouseEntity.physicsData.velocity.scale(0);
    entityManager.applyAllEntityPhysics();
    // @ts-ignore
    document.getElementById("debug-mspt").innerText = `mspt: ${Date.now() - start} ms | ${mspt} mspt (this|config)`;
    // @ts-ignore
    document.getElementById("debug-entityCounts").innerText = `Entities: ${entityManager.entities.size} | ${containers.length} (total|containers)`;
}, mspt);
new SpriteWorldBorder(containers[0], new PositionData(100, 100), 500, 500);
new TestEntity(267, 167, 15);
new TestEntity(297, 167, 15);
new TestEntity(317, 167, 15);
// new Entity(67,77,20);
// const mouseEntity = new Entity(67,77,20);
let mx = 0;
let my = 0;
document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    // mouseEntity.positionData.x = mx;
    // mouseEntity.positionData.y = my;
});
document.addEventListener('click', (event) => {
    new TestEntity(event.clientX, event.clientY, 20);
});
const wasdEntity = new TestEntity(107, 167, 25);
var InputFlags;
(function (InputFlags) {
    InputFlags[InputFlags["LeftClick"] = 1] = "LeftClick";
    InputFlags[InputFlags["RightClick"] = 2] = "RightClick";
    InputFlags[InputFlags["Up"] = 4] = "Up";
    InputFlags[InputFlags["Left"] = 8] = "Left";
    InputFlags[InputFlags["Down"] = 16] = "Down";
    InputFlags[InputFlags["Right"] = 32] = "Right";
})(InputFlags || (InputFlags = {}));
let currentInputs = 0;
/** match a keycode to an input flag */
function matchToInput(keyCode) {
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
            return InputFlags.Right;
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
function skibidiSixSevenTungTungSaheur() {
    if (currentInputs & InputFlags.Down)
        wasdEntity.physicsData.velocity.y += 0.3;
    if (currentInputs & InputFlags.Up)
        wasdEntity.physicsData.velocity.y -= 0.3;
    if (currentInputs & InputFlags.Left)
        wasdEntity.physicsData.velocity.x -= 0.3;
    if (currentInputs & InputFlags.Right)
        wasdEntity.physicsData.velocity.x += 0.3;
}
