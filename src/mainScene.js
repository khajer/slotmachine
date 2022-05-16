const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 0.8;

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
            new BoxSlot(this, 5, VELOCITY)
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
                this.boxSlots.forEach(boxSlot => {
                    boxSlot.spin().then(e=>{
                        console.log("spin completed");
                    });
                });
        });
        
    }    
}