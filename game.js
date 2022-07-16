import {MainScene} from './src/MainScene.js';

const WIDTH = 375; //980 
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
    scene:[ MainScene ],
    parent: 'content',
};
var game = new Phaser.Game(config);    
