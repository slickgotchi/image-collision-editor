import { ConvertGame } from "../utils/ConvertGame";


export class Editor extends Phaser.Scene {
    constructor() {
        super('boot-strap');
    }

    preload() {
        this.load.image("level-design", "./src/assets/level-design.png");
    }

    create() {
        const img = this.add.image(0, 0, 'level-design');
        img.setPosition(
            ConvertGame.xToPhaser(0, this),
            ConvertGame.yToPhaser(0, this)
        );
        img.setDisplaySize(
            ConvertGame.dimToPhaser(1440/27, this),
            ConvertGame.dimToPhaser(810/27, this)
        );
    }

    update(time: number, dt_ms: number) {
        
    }
}