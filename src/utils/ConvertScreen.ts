import Phaser from "phaser";

export const ConvertScreen = {
    // screen ratios
    config: {
        width: 10 * 1920 / 1080,
        height: 10,
        origin: {
            x: 0.5,
            y: 0.5
        }
    },

    xToGame: (x: number, scene: Phaser.Scene) => {
        const { width } = scene.scale;
        return ((x - ConvertScreen.config.origin.x*width)*ConvertScreen.config.width/width) / scene.cameras.main.zoom + ConvertScreen.dimToGame(scene.cameras.main.scrollX, scene);
    },

    yToGame: (y: number, scene: Phaser.Scene) => {
        const { height } = scene.scale;
        return ((ConvertScreen.config.height * (height - ConvertScreen.config.origin.y*height - y)) / height) / scene.cameras.main.zoom - ConvertScreen.dimToGame(scene.cameras.main.scrollY, scene);
    },

    dimToGame: (dim: number, scene: Phaser.Scene) => {
        const { height } = scene.scale;
        return dim * ConvertScreen.config.height / height;
    },

    // radToPhaserAngle: (p2_rad: number) => {
    //     p2_rad = p2_rad % (2*Math.PI);
    //     if (p2_rad < 0) {
    //         p2_rad += (2*Math.PI);
    //     }
    //     return Phaser.Math.RadToDeg(-p2_rad);
    // }
}