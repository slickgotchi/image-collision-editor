import { GlobalData } from "../utils/GlobalData";


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
        this.infoLogRect = this.add.rectangle(10, 10, 300, 300, 0x000000, 0.5);
        this.infoLogRect.setDepth(1);
        this.infoLogRect.setOrigin(0,0);
        this.infoLogRect.setScrollFactor(0);

        this.infoLogText = this.add.text(20,20,"");
        this.infoLogText.setDepth(2);
        this.infoLogText.setFontSize(24);
    }

    update() {
        this.infoLogText.setText(
            `Zoom: ${GlobalData.zoom.toFixed(2)}\n\n` +
            `Screen X: ${GlobalData.screen.x.toFixed(0)}\n` + 
            `Screen Y: ${GlobalData.screen.y.toFixed(0)}\n\n` +
            `Game X: ${GlobalData.game.x.toFixed(2)}\n` + 
            `Game Y: ${GlobalData.game.y.toFixed(2)}\n\n` +
            `Scroll X: ${GlobalData.scroll.x.toFixed(0)}\n` + 
            `Scroll Y: ${GlobalData.scroll.y.toFixed(0)}\n`
        )
    }
}