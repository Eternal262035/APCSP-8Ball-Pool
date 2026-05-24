/** basic vector type */
export interface VectorAbstract {
    x: number;
    y: number;
}

/** a quantity with both magnitude and direction!
 * also has some useful methods to use
 */
export default class Vector /* implements VectorAbstract */ {
    public x: number;
    public y: number;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    /** magnitude of a vector */
    public static magnitude(v: VectorAbstract) {
        return Math.sqrt(v.x**2 + v.y**2);
    }

    /** directon of given VectorAbstract 
     * uses atan2 --> 
    */
    public static direction(v: VectorAbstract) {
        return Math.atan2(v.x, v.y);
    }

    /** construct a vector from mag and dir */
    public static fromPolar(r: number, theta: number): Vector {
        return new Vector(r*Math.cos(theta), r*Math.cos(theta));
    }

    /** set properties of the vecotr */
    public set(v: VectorAbstract):void {
        this.x = v.x;
        this.y = v.y;
    }

    /** basic vector addition */
    public add(v: VectorAbstract):void {
        this.x += v.x,
        this.y += v.y;
    }

    /** also vector addition but its subtraction */
    public subtract(v: VectorAbstract):void {
        this.x -= v.x;
        this.y -= v.y;
    }

    /** scale up or down a vector by a factor */
    public scale(v:number): Vector {
        this.x*=v;
        this.y*=v;
        return this;
    }

    /** getter method for angle vector angle */
    public get angle():number {
        return Math.atan2(this.y, this.x);
    }

    /** getter method for magnitude (probably wont use) */
    public get magnitude():number {
        return Math.sqrt(this.x**2+this.y**2);
    }

    /** set the angle of vector and itll update the component vectors accordingly */
    public set angle(angle: number) {
        const currentMag = this.magnitude;

        this.set({
            x: Math.cos(angle) * currentMag, 
            y: Math.sin(angle) * currentMag
        });
    }

    /** updates angle based on magnitude change */
    public set magnitude(magnitude: number) {
        const currentDir = this.angle;

        this.set({
            x: Math.cos(currentDir) * magnitude,
            y: Math.sin(currentDir) * magnitude
        });
    }
}