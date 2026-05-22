import initCanvas from "./Render/InitCanvas.js";
import { containers, initRenderableContainers } from "./Render/Manager.js";
import Circle from "./Render/Sprites/CircleTest.js";

// alert("Load index");



initCanvas();
initRenderableContainers();

new Circle(containers[0], {x:67, y:67}, 15);