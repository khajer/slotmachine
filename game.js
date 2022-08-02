import {MainScene} from './src/MainScene.js';
import {PreloadingScene} from './src/PreloadingScene.js';

const WIDTH = screen.width; //980 
const HEIGHT = 540; //1200

var config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.WEBGL,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {}
    },        
    scene:[ PreloadingScene, MainScene ],
    parent: 'content',
};
var game = new Phaser.Game(config);    
