import Vector from "../Physics/Vector.js";

/** data about the physics of the entity such as movement vectors and stuff */
export default class PhysicsData {
    public velocity: Vector = new Vector(0,0);
    // might add an acceleration vector here

    constructor() {
        // nothing here again lol
    }
}