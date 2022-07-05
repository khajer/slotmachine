import {MainScene} from './src/MainScene.js';

const WIDTH = 980; 
const HEIGHT = 1200;

var config = {
    mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {}
    },        
    scene:[ MainScene ],
    parent: 'content',
};
var game = new Phaser.Game(config);    
