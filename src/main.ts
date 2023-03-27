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



const file = document.getElementById('file');
if (file) {
    file.addEventListener('change', readFile, false);
}

function readFile(evt: any) {
    var files = evt.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.onload = function(event: any) {
      console.log(event.target.result);
    }
    reader.readAsText(file)
  }