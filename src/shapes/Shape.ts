export enum ShapeType {
    BASE,
    DOT,
    RECTANGLE,
    CIRCLE,
    POLYGON
}

export class Shape {
    scene!: Phaser.Scene;
    type!: ShapeType;
    x!: number;
    y!: number;

    constructor(scene: Phaser.Scene, x = 0, y = 0) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.type = ShapeType.BASE;
    }

    editUpdate(nextGameX: number, nextGameY: number) {

    }

    render() {

    }

    destroy() {

    }
}