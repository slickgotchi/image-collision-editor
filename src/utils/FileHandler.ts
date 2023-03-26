import * as fs from 'fs';
import { Rectangle } from '../shapes/Rectangle';
import { ConvertPhaser } from './ConvertPhaser';

interface iRectangleDatum {
    x: number;
    y: number;
    width: number;
    height: number;
}

export const FileHandler = {
    writeRectangleData: (filename: string, data: Rectangle[], scene: Phaser.Scene) => {
        const rects: iRectangleDatum[] = [];
        data.map(r => {
            const bl = r.phaserRectangle.getBottomLeft();
            if (bl && bl.x && bl.y) {
                rects.push({
                    x: ConvertPhaser.xToGame(bl.x, scene),
                    y: ConvertPhaser.yToGame(bl.y, scene),
                    width: ConvertPhaser.dimToGame(r.phaserRectangle.width, scene),
                    height: ConvertPhaser.dimToGame(r.phaserRectangle.height, scene)
                });
            }
        });

        const strData = JSON.stringify(rects);
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML = strData;
        }
        // fs.writeFile('../files/'+filename, strData, (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        // });
    }
}