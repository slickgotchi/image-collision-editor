import { ConvertGame } from "../utils/ConvertGame";
import { Shape, ShapeType } from "./Shape";

export class Dot extends Shape {
    circ!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.type = ShapeType.DOT;

        this.circ = scene.add.circle(
            ConvertGame.xToPhaser(x, scene),
            ConvertGame.yToPhaser(y, scene),
            ConvertGame.dimToPhaser(0.1, scene),
        )
        this.circ.setOrigin(0.5,0.5);
        this.circ.setFillStyle(0xffffff, 0.2);
        this.circ.setStrokeStyle(5, 0xff00ff);
        this.circ.setDepth(2);

    }

    editUpdate(nextGameX: number, nextGameY: number) {

    }

    remder() {

    }

    destroy() {
        this.circ.destroy();
    }
}