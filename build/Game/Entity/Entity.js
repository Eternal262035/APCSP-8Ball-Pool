import { containers } from "../../Render/RenderableContainer.js";
import SpriteBall from "../../Render/Sprites/Ball.js";
import HitboxData from "../Datagroups/HitboxData.js";
import { PositionData } from "../Datagroups/PositionData.js";
import { entityManager } from "./EntityManager.js";
export default class Entity {
    positionData;
    hitboxData;
    sprite; // or any extended class from it btw
    id = -1; // just set it to -1 as a default for now;
    constructor(x, y, size) {
        this.positionData = new PositionData(x, y);
        this.hitboxData = new HitboxData(size);
        this.sprite = new SpriteBall(containers[0], this.positionData, this.hitboxData.size);
        entityManager.addNewEntity(this);
    }
}
