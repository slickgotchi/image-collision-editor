import Phaser from 'phaser';
import { Editor } from './scenes/Editor';

// create game config
const config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [Editor],
}

// create the phaser game
const game = new Phaser.Game(config);

// listen for fullscreen toggle
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        game.scale.toggleFullscreen();
    }
}, false);