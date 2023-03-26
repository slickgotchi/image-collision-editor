import Phaser from 'phaser';
import { BootStrap } from './scenes/BootStrap';
import { Editor } from './scenes/Editor';
import { UI } from './scenes/UI';

// create game config
const config = {
    type: Phaser.CANVAS,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    scene: [BootStrap, Editor, UI],
}

// create the phaser game
const game = new Phaser.Game(config);

// listen for fullscreen toggle
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        game.scale.toggleFullscreen();
    }
}, false);