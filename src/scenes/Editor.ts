import { Rectangle } from "../shapes/Rectangle";
import { ConvertGame } from "../utils/ConvertGame";
import { ConvertPhaser } from "../utils/ConvertPhaser";
import { GlobalData } from "../utils/GlobalData";
import { Mode } from "./UI";


export class Editor extends Phaser.Scene {
    private isScrolling = false;
    private isEditing = false;

    // shapes
    private activeShapeIdx = 0;
    private rectangles: Rectangle[] = [];

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
                this.isScrolling = true;
            }
        });

        // DRAG (IF MIDDLE CLICK)
        this.input.on('pointermove', (pointer: any) => {
            // do scrolling if applicable
            if (this.isScrolling) {
                const dx = pointer.position.x - pointer.prevPosition.x;
                const dy = pointer.position.y - pointer.prevPosition.y;
                const zoom = this.cameras.main.zoom;

                this.cameras.main.scrollX -= dx / zoom;
                this.cameras.main.scrollY -= dy / zoom;

                // set global data
                GlobalData.scroll.x = this.cameras.main.scrollX;
                GlobalData.scroll.y = this.cameras.main.scrollY;
            }

            // update screen pos
            GlobalData.screen.x = pointer.position.x;
            GlobalData.screen.y = pointer.position.y;

            // update game pos
            GlobalData.game.x = ConvertPhaser.xToGame(pointer.position.x, this) / GlobalData.zoom + ConvertPhaser.dimToGame(this.cameras.main.scrollX, this);
            GlobalData.game.y = ConvertPhaser.yToGame(pointer.position.y, this) / GlobalData.zoom - ConvertPhaser.dimToGame(this.cameras.main.scrollY, this);

            // do shape editing?
            if (this.isEditing) {
                switch (GlobalData.mode) {
                    case Mode.Rectangle: {
                        const rect = this.rectangles[this.activeShapeIdx].phaserRectangle;

                        const curr = {
                            x: GlobalData.game.x,
                            y: GlobalData.game.y
                        }

                        const start = {
                            x: ConvertPhaser.xToGame(rect.x, this),
                            y: ConvertPhaser.yToGame(rect.y, this)
                        }

                        const width =  curr.x - start.x;
                        const height = curr.y - start.y;
                        
                        rect.setOrigin(
                            width > 0 ? 0 : 1,
                            height > 0 ? 1 : 0
                        );
                        rect.setSize(
                            ConvertGame.dimToPhaser(Math.abs(width), this), 
                            ConvertGame.dimToPhaser(Math.abs(height), this)
                        );

                        this.rectangles[this.activeShapeIdx].updatePoints();

                        break;
                    }
                    default: break;
                }
            }

            
        })

        // CLICK
        this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
            this.isScrolling = false;
            
            if (pointer.button === 1) return;
            switch (GlobalData.mode) {
                case Mode.Move: {

                    break;
                }
                case Mode.Rectangle: {
                    // if not editing start a rectangle
                    if (!this.isEditing) {
                        this.startRectangle(GlobalData.game.x, GlobalData.game.y);
                        this.isEditing = true;
                    } else {
                        this.finishRectangle(GlobalData.game.x, GlobalData.game.y);
                        this.isEditing = false;
                    }
                    break;
                }
                case Mode.Circle: {

                    break;
                }
                case Mode.Polygon: {

                    break;
                }
                default: break;
            }
        });

        // UNDO
        this.input.keyboard?.on('keyup-Z', () => {
            if (this.rectangles.length > 0) {
                const rect = this.rectangles.pop();
                rect?.destroy();
            }
        })
    }


    startRectangle(x: number, y: number) {
        const rect = this.add.rectangle(
            ConvertGame.xToPhaser(x, this), 
            ConvertGame.yToPhaser(y, this),
            1,
            1
        );
        this.rectangles.push(new Rectangle(rect));

        this.activeShapeIdx = this.rectangles.length - 1;
        rect.setFillStyle(0xffffff, 0.2);
        rect.setStrokeStyle(3, 0xff00ff);
        rect.setDepth(2);
        rect.setOrigin(0,1);
    }

    finishRectangle(x: number, y: number) {

    }

}