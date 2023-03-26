import { GlobalData } from "../utils/GlobalData";

export enum Mode {
    None,
    Move,
    Rectangle,
    Circle,
    Polygon
}

export class UI extends Phaser.Scene {
    private infoLogRect!: Phaser.GameObjects.Rectangle;
    private infoLogText!: Phaser.GameObjects.Text;

    private moveButton!: Phaser.GameObjects.Rectangle;
    private rectButton!: Phaser.GameObjects.Rectangle;
    private circButton!: Phaser.GameObjects.Rectangle;
    private polyButton!: Phaser.GameObjects.Rectangle;

    constructor() {
        super('ui');
    }

    create() {
        this.createInfoLog();
    }

    createInfoLog() {
        this.infoLogRect = this.add.rectangle(10, 10, 250, 280, 0x000000, 0.5);
        this.infoLogRect.setDepth(1);
        this.infoLogRect.setOrigin(0,0);
        this.infoLogRect.setScrollFactor(0);

        this.infoLogText = this.add.text(20,20,"");
        this.infoLogText.setDepth(2);
        this.infoLogText.setFontSize(24);

        this.createButtons();
        this.createInput();
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
        );
    }

    createButtons() {
        const PAD = 10;
        const SIZE = 100;

        this.moveButton = this.add.rectangle(PAD, 1080-PAD, SIZE, SIZE, 0x000000);
        this.setupButton(this.moveButton);

        this.rectButton = this.add.rectangle(PAD + (PAD+SIZE), 1080-PAD, SIZE, SIZE, 0x000000);
        this.setupButton(this.rectButton);

        this.circButton = this.add.rectangle(PAD+ 2*(PAD+SIZE), 1080-PAD, SIZE, SIZE, 0x000000);
        this.setupButton(this.circButton);

        this.polyButton = this.add.rectangle(PAD+ 3*(PAD+SIZE), 1080-PAD, SIZE, SIZE, 0x000000);
        this.setupButton(this.polyButton);

        this.updateButtons();
    }

    setupButton(btn: Phaser.GameObjects.Rectangle) {
        btn.setOrigin(0, 1);
        btn.setScrollFactor(0);
        btn.setDepth(1);
    }

    updateButtons() {
        this.moveButton.setAlpha(GlobalData.mode === 1 ? 1 : 0.5);
        this.rectButton.setAlpha(GlobalData.mode === 2 ? 1 : 0.5);
        this.circButton.setAlpha(GlobalData.mode === 3 ? 1 : 0.5);
        this.polyButton.setAlpha(GlobalData.mode === 4 ? 1 : 0.5);
    }

    createInput() {
        this.input.keyboard?.on('keyup-M', () => {
            GlobalData.mode = 1;
            this.updateButtons();
        });

        this.input.keyboard?.on('keyup-R', () => {
            GlobalData.mode = 2;
            this.updateButtons();
        });

        this.input.keyboard?.on('keyup-C', () => {
            GlobalData.mode = 3;
            this.updateButtons();
        });

        this.input.keyboard?.on('keyup-P', () => {
            GlobalData.mode = 4;
            this.updateButtons();
        });
    }
}