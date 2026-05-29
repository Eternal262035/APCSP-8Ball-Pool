import { PositionData } from "./Game/Datagroups/PositionData.js";
import { entityManager } from "./Game/Entity/EntityManager.js";
import TestEntity from "./Game/Entity/TestEntity.js";
import GameInstance from "./Game/Instance/Game.js";
import { checkForCollisions } from "./Game/Physics/Collision.js";
import initCanvas, { ctx } from "./Render/InitCanvas.js";
import renderFrameLoop from "./Render/RenderMain.js";
import { containers, initRenderableContainers } from "./Render/RenderableContainer.js";
import SpriteWorldBorder from "./Render/Sprites/WorldBorder.js";
import { mapHeight, mapWidth, mspt } from "./config.js";
import { canvasToMapCoords } from "./utils.js";
// alert("Load index");
// the screen coords of the map.
export let mapLeft = 0;
export let mapRight = 0;
export let mapBottom = 0;
export let mapTop = 0;
initCanvas();
initRenderableContainers();
renderFrameLoop(ctx);
// the map border sprite (visual only, does not exist as an Entity)
const mapBorderIndicator = new SpriteWorldBorder(containers[0], new PositionData(100, 100), 500, 500);
resizeMap();
export let game = new GameInstance();
const tickInterval = setInterval(() => {
    const start = Date.now();
    checkForCollisions();
    skibidiSixSevenTungTungSaheur();
    // mouseEntity.physicsData.velocity.scale(0);
    entityManager.applyAllEntityPhysics();
    // @ts-ignore
    document.getElementById("debug-mspt").innerText = `mspt: ${Date.now() - start} ms | ${Date.now() - start > mspt ? Date.now() - start : mspt} ms | ${mspt} mspt | ${(1000 / (Date.now() - start > mspt ? Date.now() - start : mspt).toFixed(2))} (tick|actual|config|tps)`;
    // @ts-ignore
    document.getElementById("debug-entityCounts").innerText = `Entities: ${entityManager.entities.size} | ${containers.length} (total|containers)`;
}, mspt);
window.addEventListener("resize", (e) => {
    const delta = resizeMap();
    relocateAllEntities(delta.dx, delta.dy);
});
/** resizes the map and returns the number of pixels everything was moved by (delta)
 * useful in the relocateAllEntities() function, which runs right after.
 */
function resizeMap() {
    // change the values of the map boundaries. 
    const oldMapLeft = mapLeft;
    const oldMapTop = mapTop;
    mapLeft = window.innerWidth / 2 - mapWidth / 2;
    mapRight = window.innerWidth / 2 + mapWidth / 2;
    mapBottom = window.innerHeight / 2 + mapHeight / 2;
    mapTop = window.innerHeight / 2 - mapHeight / 2;
    // redefine the render path for the map border sprite
    mapBorderIndicator.resize();
    return {
        dx: mapLeft - oldMapLeft,
        dy: mapTop - oldMapTop,
    };
}
function relocateAllEntities(dx, dy) {
    for (const entity of entityManager.entities.values()) {
        entity.positionData.x += dx;
        entity.positionData.y += dy;
    }
}
// new TestEntity(267,167,15);
// new TestEntity(297,167,15);
// new TestEntity(317,167,15);
let mx = 0;
let my = 0;
// const mouseEntity = new Entity(67,77,20);
document.addEventListener('mousemove', (event) => {
    mx = event.clientX;
    my = event.clientY;
    const cc = canvasToMapCoords(mx, my);
    // @ts-ignore
    document.getElementById("debug-mousePos").innerText = `Mouse: window (${mx}, ${my}) | map (${cc.x}, ${cc.y})`;
    // mouseEntity.positionData.x = mx;
    // mouseEntity.positionData.y = my;
});
document.addEventListener('click', (event) => {
    const mapCoords = canvasToMapCoords(event.clientX, event.clientY);
    new TestEntity(mapCoords.x, mapCoords.y, 20);
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
