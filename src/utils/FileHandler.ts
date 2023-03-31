import * as fs from 'fs';
import { Dot } from '../shapes/Dot';
import { Rectangle } from '../shapes/Rectangle';
import { Shape, ShapeType } from '../shapes/Shape';
import { ConvertPhaser } from './ConvertPhaser';

interface iRectangleDatum {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const FileHandler = {
    download: (scene: Phaser.Scene, data: Shape[], fileName: string, contentType: string = 'text/json') => {
        const exportedShapes: any = [];

        data.forEach(shape => {
            switch (shape.type) {
                case ShapeType.DOT: {
                    const dot = shape as Dot;
                    exportedShapes.push({
                        type: ShapeType.DOT,
                        x: ConvertPhaser.xToGame(dot.circ.x, scene),
                        y: ConvertPhaser.yToGame(dot.circ.y, scene)
                    });
                    break;
                }
                case ShapeType.RECTANGLE: {
                    const rect = shape as Rectangle;
                    const bl = rect.rect.getBottomLeft();
                    if (bl && bl.x && bl.y) {
                        exportedShapes.push({
                            type: ShapeType.RECTANGLE,
                            x: ConvertPhaser.xToGame(bl.x, scene),
                            y: ConvertPhaser.yToGame(bl.y, scene),
                            width: rect.width,
                            height: rect.height
                        });
                    }
                    break;
                }
            }
        })



        // const rects: iRectangleDatum[] = [];
        // const rectData = data as Rectangle[];
        // rectData.map((r: Rectangle) => {
        //     const bl = r.rect.getBottomLeft();
        //     if (bl && bl.x && bl.y) {
        //         rects.push({
        //             x: ConvertPhaser.xToGame(bl.x, scene),
        //             y: ConvertPhaser.yToGame(bl.y, scene),
        //             width: r.width,
        //             height: r.height
        //         });
        //     }
        // });

        const strData = JSON.stringify(exportedShapes);
        console.log(strData);
        var a = document.createElement("a");
        var file = new Blob([strData], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
}