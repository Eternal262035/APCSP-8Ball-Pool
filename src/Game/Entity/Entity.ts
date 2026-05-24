import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import SpriteBall from "../../Render/Sprites/Ball.js";
import HitboxData from "../Datagroups/HitboxData.js";
import { PositionData } from "../Datagroups/PositionData.js";
import { entityManager } from "./EntityManager.js";

export default class Entity {
    public positionData: PositionData;
    public hitboxData: HitboxData;
    public sprite: Renderable; // or any extended class from it btw
    public id: number = -1; // just set it to -1 as a default for now;

    constructor(x: number, y:number, size: number) {
        this.positionData = new PositionData(x, y);
        this.hitboxData = new HitboxData(size);
        this.sprite = new SpriteBall(containers[0], this.positionData, this.hitboxData.size);
        entityManager.addNewEntity(this);
    }
}