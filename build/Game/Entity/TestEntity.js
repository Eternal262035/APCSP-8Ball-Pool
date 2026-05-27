import { containers } from "../../Render/RenderableContainer.js";
import SpriteDebugBall from "../../Render/Sprites/DebugBall.js";
import Entity from "./Entity.js";
export default class TestEntity extends Entity {
    // no additional properties I think
    constructor(x, y, size) {
        super(x, y, size);
        // type assertion does not work here.
        this.sprite = new SpriteDebugBall(containers[1], this.positionData, this.hitboxData.size);
    }
    applyPhysics() {
        if (this.positionData.x + this.physicsData.velocity.x >= 600) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.x + this.physicsData.velocity.x <= 100) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y >= 600) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y <= 100) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
        }
        super.applyPhysics();
        if (this.positionData.x >= 600) {
            this.positionData.x = 600;
        }
        if (this.positionData.x <= 100) {
            this.positionData.x = 100;
        }
        if (this.positionData.y >= 600) {
            this.positionData.y = 600;
        }
        if (this.positionData.y <= 100) {
            this.positionData.y = 100;
        }
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
    }
}
