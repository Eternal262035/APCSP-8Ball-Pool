import Vector from "../Physics/Vector.js";
/** data about the physics of the entity such as movement vectors and stuff */
export default class PhysicsData {
    velocity = new Vector(0, 0);
    mass = 1;
    momentum;
    // might add an acceleration vector here
    constructor() {
        this.momentum = Vector.magnitude(this.velocity) * this.mass;
    }
}
