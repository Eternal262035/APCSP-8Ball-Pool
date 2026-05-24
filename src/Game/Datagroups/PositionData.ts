/** data about the position of the entity */
export class PositionData { // using interface and not type cuz we dont need type unions and all that
    public x: number;
    public y: number;

    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
    }
}