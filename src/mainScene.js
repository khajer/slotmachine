const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 1;

import {BoxSlot} from './BoxSlot.js';

export class MainScene extends Phaser.Scene {    
    layer = null;

    boxSlots = [];

    groupBlock = [];
    constructor (){
        super(); 
               
    }
    init(){
        this.boxSlots = [
            new BoxSlot(this, 8, VELOCITY, BLOCK_WIDTH / 2, BLOCK_HEIGHT / 2),
            new BoxSlot(this, 10, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 1), BLOCK_HEIGHT / 2),
            new BoxSlot(this, 12, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 2), BLOCK_HEIGHT / 2),
            new BoxSlot(this, 14, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 3), BLOCK_HEIGHT / 2),
            new BoxSlot(this, 16, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 4), BLOCK_HEIGHT / 2)
        ]
    }
        
    preload (){  
        this.init();          
        this.boxSlots.forEach(boxSlot => {
            boxSlot.preload();
        });

        this.load.image("btnSpin01", 'assets/spin_0.png');
        this.load.image("btnSpin02", 'assets/spin_1.png');
    }
    create (){   
        this.boxSlots.forEach(boxSlot => {
            boxSlot.create();
        });
        
        var btnSpin = this.physics.add.sprite(400, 400, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{     
                var data = [2, 2, 2];
                this.boxSlots.forEach(boxSlot => {
                    boxSlot.spin(data).then(e=>{
                        console.log("spin completed");
                    });
                });
        });
        
    }    
}