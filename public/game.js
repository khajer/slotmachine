import {MainScene} from './src/MainScene.js';
import {PreloadingScene} from './src/PreloadingScene.js';

const WIDTH = screen.width; //980 
const HEIGHT = 550; //1200

var config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {}
    },        
    // backgroundColor: '#ffffff',
    transparent: true,
    scene:[ PreloadingScene, MainScene ],
    parent: 'content',
};
var game = new Phaser.Game(config);    
