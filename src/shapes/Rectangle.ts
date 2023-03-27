import { ConvertGame } from "../utils/ConvertGame";
import { Shape, ShapeType } from "./Shape";

export class Rectangle extends Shape {
    width: number = 1;
    height: number = 1;

    rect!: Phaser.GameObjects.Rectangle;
    // private trPoint!: Phaser.GameObjects.Arc;
    // private brPoint!: Phaser.GameObjects.Arc;
    // private blPoint!: Phaser.GameObjects.Arc;
    // private tlPoint!: Phaser.GameObjects.Arc;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene, x, y);
        this.type = ShapeType.RECTANGLE;
        this.width = width;
        this.height = height;

        this.rect = scene.add.rectangle(
            ConvertGame.xToPhaser(x, scene),
            ConvertGame.yToPhaser(y, scene),
            ConvertGame.dimToPhaser(width, scene),
            ConvertGame.dimToPhaser(height, scene)
        )
        this.rect.setOrigin(0,0);
        this.rect.setFillStyle(0xffffff, 0.2);
        this.rect.setStrokeStyle(3, 0xff00ff);
        this.rect.setDepth(2);

        // const ALPHA = 0.2;
        // const RADIUS = 10;

        // this.trPoint = scene.add.circle(
        //     this.phaserRectangle.getTopRight().x,
        //     this.phaserRectangle.getTopRight().y,
        //     RADIUS,
        //     0x00ff00,
        //     ALPHA
        // )
        // this.trPoint.setStrokeStyle(2, 0x00ff00);

        // this.brPoint = scene.add.circle(
        //     this.phaserRectangle.getBottomRight().x,
        //     this.phaserRectangle.getBottomRight().y,
        //     RADIUS,
        //     0x00ff00,
        //     ALPHA
        // )
        // this.brPoint.setStrokeStyle(2, 0x00ff00);

        // this.blPoint = scene.add.circle(
        //     this.phaserRectangle.getBottomLeft().x,
        //     this.phaserRectangle.getBottomLeft().y,
        //     RADIUS,
        //     0x00ff00,
        //     ALPHA
        // )
        // this.blPoint.setStrokeStyle(2, 0x00ff00);

        // this.tlPoint = scene.add.circle(
        //     this.phaserRectangle.getTopLeft().x,
        //     this.phaserRectangle.getTopLeft().y,
        //     RADIUS,
        //     0x00ff00,
        //     ALPHA
        // )
        // this.tlPoint.setStrokeStyle(2, 0x00ff00);
    }

    editUpdate(nextGameX: number, nextGameY: number) {
        const width =  nextGameX - this.x;
        const height = nextGameY - this.y;
        
        this.rect.setOrigin(
            width > 0 ? 0 : 1,
            height > 0 ? 1 : 0
        );
        this.rect.setSize(
            ConvertGame.dimToPhaser(Math.abs(width), this.scene), 
            ConvertGame.dimToPhaser(Math.abs(height), this.scene)
        );

        // update width and height
        this.width = Math.abs(width);
        this.height = Math.abs(height);
    }

    remder() {

    }

    // updatePoints() {
    //     this.trPoint.setPosition(
    //         this.phaserRectangle.getTopRight().x,
    //         this.phaserRectangle.getTopRight().y,
    //     );

    //     this.brPoint.setPosition(
    //         this.phaserRectangle.getBottomRight().x,
    //         this.phaserRectangle.getBottomRight().y,
    //     );

    //     this.blPoint.setPosition(
    //         this.phaserRectangle.getBottomLeft().x,
    //         this.phaserRectangle.getBottomLeft().y,
    //     );

    //     this.tlPoint.setPosition(
    //         this.phaserRectangle.getTopLeft().x,
    //         this.phaserRectangle.getTopLeft().y,
    //     );
    // }

    // destroy() {
    //     this.phaserRectangle.destroy();
    //     this.trPoint.destroy();
    //     this.brPoint.destroy();
    //     this.blPoint.destroy();
    //     this.tlPoint.destroy();
    // }
}