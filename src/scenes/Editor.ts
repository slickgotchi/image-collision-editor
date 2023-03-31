import { Dot } from "../shapes/Dot";
import { Rectangle } from "../shapes/Rectangle";
import { Shape, ShapeType } from "../shapes/Shape";
import { ConvertGame } from "../utils/ConvertGame";
import { ConvertPhaser } from "../utils/ConvertPhaser";
import { ConvertScreen } from "../utils/ConvertScreen";
import { FileHandler } from "../utils/FileHandler";
import { GlobalData } from "../utils/GlobalData";
import { Mode } from "./UI";


export class Editor extends Phaser.Scene {
    private isScrolling = false;
    private isEditing = false;

    // shapes
    private activeShapeIdx = 0;
    private shapes: Shape[] = [];

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
        this.createFileGenerator();

        GlobalData.editorRef = this;
    }

    update(time: number, dt_ms: number) {
        
    }

    createFileGenerator() {
        const gen = document.getElementById('generate');
        const filename = document.getElementById('generate-filename') as HTMLInputElement;
        if (gen && filename) {
            gen.onclick = () => {
                FileHandler.download(this, this.shapes, filename.value + '.json');
            }
        }
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
            // GlobalData.game.x = ConvertPhaser.xToGame(pointer.position.x, this) / GlobalData.zoom + ConvertPhaser.dimToGame(this.cameras.main.scrollX, this);
            // GlobalData.game.y = ConvertPhaser.yToGame(pointer.position.y, this) / GlobalData.zoom - ConvertPhaser.dimToGame(this.cameras.main.scrollY, this);
            GlobalData.game.x = ConvertScreen.xToGame(pointer.position.x, this);
            GlobalData.game.y = ConvertScreen.yToGame(pointer.position.y, this);

            // do shape editing?
            if (this.isEditing) {
                switch (GlobalData.mode) {
                    case Mode.Rectangle: {
                        const rect = this.shapes[this.activeShapeIdx] as Rectangle;
                        rect.editUpdate(
                            ConvertScreen.xToGame(pointer.position.x, this),
                            ConvertScreen.yToGame(pointer.position.y, this)
                        )
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
                case Mode.Dot: {
                    this.shapes.push(new Dot(
                        this,
                        ConvertScreen.xToGame(pointer.position.x, this),
                        ConvertScreen.yToGame(pointer.position.y, this),
                    ));
                    this.activeShapeIdx = this.shapes.length - 1;
                    break;
                }
                case Mode.Rectangle: {
                    // if not editing start a rectangle
                    if (!this.isEditing) {
                        this.shapes.push(new Rectangle(
                            this, 
                            ConvertScreen.xToGame(pointer.position.x, this),
                            ConvertScreen.yToGame(pointer.position.y, this),
                            ConvertScreen.dimToGame(1, this),
                            ConvertScreen.dimToGame(1, this)
                        ));
                        this.activeShapeIdx = this.shapes.length - 1;
                        this.isEditing = true;
                    } else {
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
            if (this.shapes.length > 0) {
                const shape = this.shapes.pop();
                shape?.destroy();
            }
        })

        // // ENTER (PRINT)
        // this.input.keyboard?.on('keyup-S', () => {
        //     // FileHandler.writeRectangleData("test.json", this.rectangles, this);
            
        // })
    }

    generateShapesFromLoadedData() {
        const shapes = GlobalData.loadedData;
        shapes.forEach((shape: any) => {
            switch (shape.type) {
                case (ShapeType.DOT): {
                    this.shapes.push(new Dot(
                        this,
                        shape.x,
                        shape.y
                    ));
                    break;
                }
                case (ShapeType.RECTANGLE): {
                    const rect = new Rectangle(
                        this, 
                        shape.x,
                        shape.y,
                        shape.width,
                        shape.height
                    )
                    this.shapes.push(rect);
                    rect.rect.setOrigin(0,1);
                    this.activeShapeIdx = this.shapes.length - 1;
                    break;
                }
                default: break;
            }
        })
    }

}

