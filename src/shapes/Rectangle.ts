export class Rectangle {
    phaserRectangle!: Phaser.GameObjects.Rectangle;
    private trPoint!: Phaser.GameObjects.Arc;
    private brPoint!: Phaser.GameObjects.Arc;
    private blPoint!: Phaser.GameObjects.Arc;
    private tlPoint!: Phaser.GameObjects.Arc;

    constructor(phaserRectangle: Phaser.GameObjects.Rectangle) {

        this.phaserRectangle = phaserRectangle;
        const scene = this.phaserRectangle.scene;

        const ALPHA = 0.2;
        const RADIUS = 10;

        this.trPoint = scene.add.circle(
            this.phaserRectangle.getTopRight().x,
            this.phaserRectangle.getTopRight().y,
            RADIUS,
            0x00ff00,
            ALPHA
        )
        this.trPoint.setStrokeStyle(2, 0x00ff00);

        this.brPoint = scene.add.circle(
            this.phaserRectangle.getBottomRight().x,
            this.phaserRectangle.getBottomRight().y,
            RADIUS,
            0x00ff00,
            ALPHA
        )
        this.brPoint.setStrokeStyle(2, 0x00ff00);

        this.blPoint = scene.add.circle(
            this.phaserRectangle.getBottomLeft().x,
            this.phaserRectangle.getBottomLeft().y,
            RADIUS,
            0x00ff00,
            ALPHA
        )
        this.blPoint.setStrokeStyle(2, 0x00ff00);

        this.tlPoint = scene.add.circle(
            this.phaserRectangle.getTopLeft().x,
            this.phaserRectangle.getTopLeft().y,
            RADIUS,
            0x00ff00,
            ALPHA
        )
        this.tlPoint.setStrokeStyle(2, 0x00ff00);
    }

    updatePoints() {
        this.trPoint.setPosition(
            this.phaserRectangle.getTopRight().x,
            this.phaserRectangle.getTopRight().y,
        );

        this.brPoint.setPosition(
            this.phaserRectangle.getBottomRight().x,
            this.phaserRectangle.getBottomRight().y,
        );

        this.blPoint.setPosition(
            this.phaserRectangle.getBottomLeft().x,
            this.phaserRectangle.getBottomLeft().y,
        );

        this.tlPoint.setPosition(
            this.phaserRectangle.getTopLeft().x,
            this.phaserRectangle.getTopLeft().y,
        );
    }

    destroy() {
        this.phaserRectangle.destroy();
        this.trPoint.destroy();
        this.brPoint.destroy();
        this.blPoint.destroy();
        this.tlPoint.destroy();
    }
}