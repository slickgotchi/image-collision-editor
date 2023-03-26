import { ConvertGame } from "../utils/ConvertGame";
import { ConvertPhaser } from "../utils/ConvertPhaser";
import { GlobalData } from "../utils/GlobalData";


export class Editor extends Phaser.Scene {
    private isDragging = false;

    constructor() {
        super('editor');
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
        img.setDepth(0);
        
        this.createInputHandlers();
    }

    update(time: number, dt_ms: number) {
        
    }

    createInputHandlers() {
        // ZOOM
        this.input.on('wheel', (pointer: any) => {
            const MAX_ZOOM = 10;
            const MIN_ZOOM = 0.1;
            let zoom = this.cameras.main.zoom;
            zoom *= (1-pointer.deltaY*0.0005);
            if (zoom > MAX_ZOOM) zoom = MAX_ZOOM;
            else if (zoom < MIN_ZOOM) zoom = MIN_ZOOM;
            this.cameras.main.setZoom(zoom);

            // set global data
            GlobalData.zoom = zoom;
        });

        // PAN
        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
            if (pointer.button === 1) {
                this.isDragging = true;
            }
        });

        this.input.on('pointermove', (pointer: any) => {
            if (this.isDragging) {
                const dx = pointer.position.x - pointer.prevPosition.x;
                const dy = pointer.position.y - pointer.prevPosition.y;
                const zoom = this.cameras.main.zoom;

                this.cameras.main.scrollX -= dx / zoom;
                this.cameras.main.scrollY -= dy / zoom;

                // set global data
                GlobalData.scroll = {
                    x: this.cameras.main.scrollX,
                    y: this.cameras.main.scrollY
                }
            }

            // update screen pos
            GlobalData.screen.x = pointer.position.x;
            GlobalData.screen.y = pointer.position.y;

            // update game pos
            GlobalData.game.x = ConvertPhaser.xToGame(pointer.position.x, this) / GlobalData.zoom + ConvertPhaser.dimToGame(this.cameras.main.scrollX, this);
            GlobalData.game.y = ConvertPhaser.yToGame(pointer.position.y, this) / GlobalData.zoom - ConvertPhaser.dimToGame(this.cameras.main.scrollY, this);
        })

        // CLICK
        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            this.isDragging = false;
            console.log(`Game Coord: ${GlobalData.game.x.toFixed(2)}, ${GlobalData.game.y.toFixed(2)}`)
        })
    }


}