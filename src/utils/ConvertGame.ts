import Phaser from "phaser";

export const ConvertGame = {
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
    xToPhaser: (x: number, scene: Phaser.Scene) => {
        const { width } = scene.scale;
        return x * width / ConvertGame.screen.width + ConvertGame.screen.origin.x * width;
    },

    yToPhaser: (y: number, scene: Phaser.Scene) => {
        const { height } = scene.scale;
        return height - y * height / ConvertGame.screen.height - ConvertGame.screen.origin.y * height;
    },

    // yInvertToPhaser: (y: number, scene: Phaser.Scene) => {
    //     const zoom = scene.cameras.main.zoom;
    //     return (scene.scale.height - y * scene.scale.height / ConvertGui.ratio.y * zoom);
    // },

    dimToPhaser: (dim: number, scene: Phaser.Scene) => {
        const { height } = scene.scale;
        return dim * height / ConvertGame.screen.height;
    },

    radToPhaserAngle: (p2_rad: number) => {
    p2_rad = p2_rad % (2*Math.PI);
    if (p2_rad < 0) {
        p2_rad += (2*Math.PI);
    }
    return Phaser.Math.RadToDeg(-p2_rad);
}
}