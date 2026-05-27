import { mapBottom, mapLeft, mapRight, mapTop } from "../../index.js";
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
        if (this.positionData.x + this.physicsData.velocity.x >= mapRight) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.x + this.physicsData.velocity.x <= mapLeft) {
            // this.physicsData.velocity.x *= -0.4;
            this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y >= mapBottom) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
        }
        if (this.positionData.y + this.physicsData.velocity.y <= mapTop) {
            // this.physicsData.velocity.y *= -0.4;
            this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
        }
        super.applyPhysics();
        super.approximateZeroVelocity();
        if (this.positionData.x >= mapRight) {
            this.positionData.x = mapRight;
        }
        if (this.positionData.x <= mapLeft) {
            this.positionData.x = mapLeft;
        }
        if (this.positionData.y >= mapBottom) {
            this.positionData.y = mapBottom;
        }
        if (this.positionData.y <= mapTop) {
            this.positionData.y = mapTop;
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
        // this.sprite.textPaths[0].text = `${Vector.magnitude(this.physicsData.velocity).toFixed(2)}`;
    }
}
