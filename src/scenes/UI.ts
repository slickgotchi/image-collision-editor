

export class UI extends Phaser.Scene {
    private infoLogRect!: Phaser.GameObjects.Rectangle;
    private infoLogText!: Phaser.GameObjects.Text;

    constructor() {
        super('ui');
    }

    create() {
        this.createInfoLog();
    }

    createInfoLog() {
        this.infoLogRect = this.add.rectangle(10, 10, 300, 120, 0x000000, 0.5);
        this.infoLogRect.setDepth(1);
        this.infoLogRect.setOrigin(0,0);
        this.infoLogRect.setScrollFactor(0);

        this.infoLogText = this.add.text(20,20,
           'Zoom: \nX: \nY: ',
           {
            fontSize: "24px",
            color: "#ffffff"
           }   
        );
        this.infoLogText.setDepth(2);
    }
}