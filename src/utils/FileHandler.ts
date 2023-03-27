import * as fs from 'fs';
import { Rectangle } from '../shapes/Rectangle';
import { Shape } from '../shapes/Shape';
import { ConvertPhaser } from './ConvertPhaser';

interface iRectangleDatum {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const FileHandler = {
    // writeRectangleData: (filename: string, data: Rectangle[], scene: Phaser.Scene) => {
    //     const rects: iRectangleDatum[] = [];
    //     data.map(r => {
    //         const bl = r.phaserRectangle.getBottomLeft();
    //         if (bl && bl.x && bl.y) {
    //             rects.push({
    //                 x: ConvertPhaser.xToGame(bl.x, scene),
    //                 y: ConvertPhaser.yToGame(bl.y, scene),
    //                 width: ConvertPhaser.dimToGame(r.phaserRectangle.width, scene),
    //                 height: ConvertPhaser.dimToGame(r.phaserRectangle.height, scene)
    //             });
    //         }
    //     });

    //     const strData = JSON.stringify(rects);
    //     const output = document.getElementById('output');
    //     if (output) {
    //         output.innerHTML = strData;
    //     }
    // },
    download: (scene: Phaser.Scene, data: Shape[], fileName: string, contentType: string = 'text/json') => {
        const rects: iRectangleDatum[] = [];
        const rectData = data as Rectangle[];
        rectData.map((r: Rectangle) => {
            const bl = r.rect.getBottomLeft();
            if (bl && bl.x && bl.y) {
                rects.push({
                    x: ConvertPhaser.xToGame(bl.x, scene),
                    y: ConvertPhaser.yToGame(bl.y, scene),
                    width: r.width,
                    height: r.height
                });
            }
        });

        const strData = JSON.stringify(rects);
        console.log(strData);
        var a = document.createElement("a");
        var file = new Blob([strData], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
}


// function download(content: any, fileName: string, contentType: string = 'text/json') {
//     var a = document.createElement("a");
//     var file = new Blob([content], {type: contentType});
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
// }
// download(jsonData, 'json.txt', 'text/plain');