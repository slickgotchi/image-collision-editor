import Phaser from "phaser";
import { GlobalData } from "./GlobalData";

export const ConvertPhaser = {
    // screen ratio
    screen: {
        width: 10 * 1920 / 1080,
        height: 10,
        origin: {
            x: 0.5,
            y: 0.5
        }
    },

    // functions
    xToGame: (x: number, scene: Phaser.Scene) => {
        const { width } = scene.scale;
        return (x - ConvertPhaser.screen.origin.x*width)*ConvertPhaser.screen.width/width;
    },

    yToGame: (y: number, scene: Phaser.Scene) => {
        const { height } = scene.scale;
        return (ConvertPhaser.screen.height * (height - ConvertPhaser.screen.origin.y*height - y)) / height;
    },

    // xToGame: (x: number, scene: Phaser.Scene) => {
    //     const { width } = scene.scale;
    //     return ((x - ConvertPhaser.screen.origin.x*width)*ConvertPhaser.screen.width/width) / scene.cameras.main.zoom + ConvertPhaser.dimToGame(scene.cameras.main.scrollX, scene);
    // },

    // yToGame: (y: number, scene: Phaser.Scene) => {
    //     const { height } = scene.scale;
    //     return ((ConvertPhaser.screen.height * (height - ConvertPhaser.screen.origin.y*height - y)) / height) / scene.cameras.main.zoom + ConvertPhaser.dimToGame(scene.cameras.main.scrollY, scene);
    // },

    // yInvertToPhaser: (y: number, scene: Phaser.Scene) => {
    //     const zoom = scene.cameras.main.zoom;
    //     return (scene.scale.height - y * scene.scale.height / ConvertGui.ratio.y * zoom);
    // },

    dimToGame: (dim: number, scene: Phaser.Scene) => {
        const { height } = scene.scale;
        return dim * ConvertPhaser.screen.height / height;
    },

    // radToPhaserAngle: (p2_rad: number) => {
    //     p2_rad = p2_rad % (2*Math.PI);
    //     if (p2_rad < 0) {
    //         p2_rad += (2*Math.PI);
    //     }
    //     return Phaser.Math.RadToDeg(-p2_rad);
    // }
}