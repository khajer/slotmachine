import {MainScene} from '../src/mainScene.js';

const WIDTH = 800;
const HEIGHT = 600;

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {}
    },        
    scene:[MainScene],
    parent: 'content',
};
var game = new Phaser.Game(config);    
