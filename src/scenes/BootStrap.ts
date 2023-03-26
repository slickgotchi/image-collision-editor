
export class BootStrap extends Phaser.Scene {
    constructor() {
        super('boot-strap');
    }

    preload() {
        
    }

    create() {
        // this.scene.add('editor', {});
        // this.scene.add('ui', {});

        this.scene.launch('editor');
        this.scene.launch('ui');
    }

    update(time: number, dt_ms: number) {
        
    }
}