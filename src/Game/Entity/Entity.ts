import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import SpriteBall from "../../Render/Sprites/Ball.js";
import HitboxData from "../Datagroups/HitboxData.js";
import PhysicsData from "../Datagroups/PhysicsData.js";
import { PositionData } from "../Datagroups/PositionData.js";
import { entityManager } from "./EntityManager.js";

export default class Entity {
    public positionData: PositionData;
    public hitboxData: HitboxData;
    public physicsData: PhysicsData;

    public sprite: Renderable; // or any extended class from it btw
    public id: number = -1; // just set it to -1 as a default for now;


    constructor(x: number, y:number, size: number) {
        this.positionData = new PositionData(x, y);
        this.hitboxData = new HitboxData(size);
        this.physicsData = new PhysicsData();

        this.sprite = new SpriteBall(containers[0], this.positionData, this.hitboxData.size);
        entityManager.addNewEntity(this);
    }

    public applyPhysics() {
        if (this.positionData.x + this.physicsData.velocity.x >= 600) {
            this.physicsData.velocity.x = 0;
        }
        if (this.positionData.x + this.physicsData.velocity.x <= 100) {
            this.physicsData.velocity.x = 0;
        }
        if (this.positionData.y + this.physicsData.velocity.y >= 600) {
            this.physicsData.velocity.y = 0;
        }
        if (this.positionData.y + this.physicsData.velocity.y <= 100) {
            this.physicsData.velocity.y = 0;
        }
        // if (Math.abs(this.positionData.x+this.physicsData.velocity.x) > 100) {
        //     this.physicsData.velocity.x = 0;
        // }
        // if (Math.abs(this.positionData.y+this.physicsData.velocity.y) > 100) {
        //     this.physicsData.velocity.y = 0;
        // }
        this.positionData.x += this.physicsData.velocity.x;
        this.positionData.y += this.physicsData.velocity.y;
        this.physicsData.velocity.scale(0.9);
    }
}