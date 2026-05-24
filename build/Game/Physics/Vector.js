/** a quantity with both magnitude and direction!
 * also has some useful methods to use
 */
export default class Vector /* implements VectorAbstract */ {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /** magnitude of a vector */
    static magnitude(v) {
        return Math.sqrt(v.x ** 2 + v.y ** 2);
    }
    /** directon of given VectorAbstract
     * uses atan2 -->
    */
    static direction(v) {
        return Math.atan2(v.x, v.y);
    }
    /** construct a vector from mag and dir */
    static fromPolar(r, theta) {
        return new Vector(r * Math.cos(theta), r * Math.cos(theta));
    }
    /** set properties of the vecotr */
    set(v) {
        this.x = v.x;
        this.y = v.y;
    }
    /** basic vector addition */
    add(v) {
        this.x += v.x,
            this.y += v.y;
    }
    /** also vector addition but its subtraction */
    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
    }
    /** scale up or down a vector by a factor */
    scale(v) {
        this.x *= v;
        this.y *= v;
        return this;
    }
    /** getter method for angle vector angle */
    get angle() {
        return Math.atan2(this.y, this.x);
    }
    /** getter method for magnitude (probably wont use) */
    get magnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    /** set the angle of vector and itll update the component vectors accordingly */
    set angle(angle) {
        const currentMag = this.magnitude;
        this.set({
            x: Math.cos(angle) * currentMag,
            y: Math.sin(angle) * currentMag
        });
    }
    /** updates angle based on magnitude change */
    set magnitude(magnitude) {
        const currentDir = this.angle;
        this.set({
            x: Math.cos(currentDir) * magnitude,
            y: Math.sin(currentDir) * magnitude
        });
    }
}
