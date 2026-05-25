import { containers } from "../../Render/RenderableContainer.js";
import SpriteBall from "../../Render/Sprites/Ball.js";
import HitboxData from "../Datagroups/HitboxData.js";
import PhysicsData from "../Datagroups/PhysicsData.js";
import { PositionData } from "../Datagroups/PositionData.js";
import { entityManager } from "./EntityManager.js";
const wallMultiFactor = 0.98;
export default class Entity {
    positionData;
    hitboxData;
    physicsData;
    sprite; // or any extended class from it btw
    id = -1; // just set it to -1 as a default for now;
    constructor(x, y, size) {
        this.positionData = new PositionData(x, y);
        this.hitboxData = new HitboxData(size);
        this.physicsData = new PhysicsData();
        this.sprite = new SpriteBall(containers[0], this.positionData, this.hitboxData.size);
        entityManager.addNewEntity(this);
    }
    destroy() {
        entityManager.removeEntity(this);
        // need to remove the sprite too
        return this;
    }
    applyPhysics() {
        if (this.positionData.x + this.physicsData.velocity.x >= 600) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -wallMultiFactor;
        }
        if (this.positionData.x + this.physicsData.velocity.x <= 100) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -wallMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y >= 600) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -wallMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y <= 100) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -wallMultiFactor;
        }
        // if (Math.abs(this.positionData.x+this.physicsData.velocity.x) > 100) {
        //     this.physicsData.velocity.x = 0;
        // }
        // if (Math.abs(this.positionData.y+this.physicsData.velocity.y) > 100) {
        //     this.physicsData.velocity.y = 0;
        // }
        this.positionData.x += this.physicsData.velocity.x;
        this.positionData.y += this.physicsData.velocity.y;
        if (this.positionData.x >= 600 || this.positionData.x <= 100 || this.positionData.y >= 600 || this.positionData.y <= 100) {
            // this.destroy();
        }
        this.physicsData.velocity.scale(0.9972);
        // update rendering for the arrows
        this.sprite.paths[1].path = new Path2D;
        this.sprite.paths[1].path.moveTo(0, 0);
        this.sprite.paths[1].path.lineTo(1.75 * this.hitboxData.size * Math.cos(this.physicsData.velocity.angle), 1.75 * this.hitboxData.size * Math.sin(this.physicsData.velocity.angle));
        this.sprite.paths[2].path = new Path2D;
        this.sprite.paths[2].path.moveTo(1.75 * this.hitboxData.size * Math.cos(this.physicsData.velocity.angle), 1.75 * this.hitboxData.size * Math.sin(this.physicsData.velocity.angle));
        this.sprite.paths[2].path.lineTo(1.35 * this.hitboxData.size * Math.cos(this.physicsData.velocity.angle - 0.24), 1.35 * this.hitboxData.size * Math.sin(this.physicsData.velocity.angle - 0.24));
        this.sprite.paths[3].path = new Path2D;
        this.sprite.paths[3].path.moveTo(1.75 * this.hitboxData.size * Math.cos(this.physicsData.velocity.angle), 1.75 * this.hitboxData.size * Math.sin(this.physicsData.velocity.angle));
        this.sprite.paths[3].path.lineTo(1.35 * this.hitboxData.size * Math.cos(this.physicsData.velocity.angle + 0.24), 1.35 * this.hitboxData.size * Math.sin(this.physicsData.velocity.angle + 0.24));
        // this.sprite.paths[4]
    }
}
