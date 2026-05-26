import Renderable from "../../Render/Renderable.js";
import { containers } from "../../Render/RenderableContainer.js";
import HitboxData from "../Datagroups/HitboxData.js";
import PhysicsData from "../Datagroups/PhysicsData.js";
import { PositionData } from "../Datagroups/PositionData.js";
import { entityManager } from "./EntityManager.js";
export default class Entity {
    positionData;
    hitboxData;
    physicsData;
    sprite; // or any extended class from it btw
    id = -1; // just set it to -1 as a default for now;
    wallVelocityMultiFactor = 0.98;
    passiveVelocityMultiFactor = 0.9972;
    constructor(x, y, size) {
        this.positionData = new PositionData(x, y);
        this.hitboxData = new HitboxData(size);
        this.physicsData = new PhysicsData();
        // this.sprite = new SpriteBall(containers[1], this.positionData, this.hitboxData.size);
        /** Explanation:
         * the type union between Renderable and undefined gets messy especially for extended classes
         * this is why we set this.sprite to a temporary Renderable and remove it from the container immediately.
         */
        this.sprite = new Renderable(containers[0], this.positionData);
        this.sprite.container.removeChild(this.sprite.id);
        entityManager.addNewEntity(this);
    }
    destroy() {
        entityManager.removeEntity(this);
        // need to remove the sprite too
        return this;
    }
    applyPhysics() {
        // change the position by the velocity.
        this.positionData.x += this.physicsData.velocity.x;
        this.positionData.y += this.physicsData.velocity.y;
        // scale down the velocity a little bit to mimic friction.
        this.physicsData.velocity.scale(this.passiveVelocityMultiFactor);
    }
}
