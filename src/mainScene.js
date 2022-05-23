const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 1;
const MAX_COL = 5;
const MAX_TYPE = 4;

import {BoxSlot} from './BoxSlot.js';
import {Logic} from './Logic.js';

export class MainScene extends Phaser.Scene {    
    layer = null;    
    boxSlots = [];

    dataSlot = [];
    groupBlock = [];
    constructor (){
        super(); 
               
    }
    init(){
        this.boxSlots = [
            new BoxSlot(this, 4, VELOCITY, BLOCK_WIDTH / 2, BLOCK_HEIGHT / 2),
            new BoxSlot(this, 8, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 1), BLOCK_HEIGHT / 2),
            new BoxSlot(this, 12, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 2), BLOCK_HEIGHT / 2),
            new BoxSlot(this, 16, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 3), BLOCK_HEIGHT / 2),
            new BoxSlot(this, 20, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 4), BLOCK_HEIGHT / 2)
        ]
    }
        
    preload(){  
        this.init();          
        this.boxSlots.forEach(boxSlot => {
            boxSlot.preload();
        });

        this.load.image("btnSpin01", 'assets/spin_0.png');
        this.load.image("btnSpin02", 'assets/spin_1.png');
    }
    create(){   
        var dataSlot = Logic.splitDataToSlot(Logic.genData());
        this.boxSlots.forEach( (boxSlot, idx) => {
            boxSlot.create(dataSlot[idx]);            
        });
        
        var btnSpin = this.physics.add.sprite(400, 400, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{                   
                var data = Logic.splitDataToSlot(Logic.genData());
                this.boxSlots.forEach((boxSlot, idx) => {
                    boxSlot.spin(data[idx]).then(e=>{
                        if(idx===this.boxSlots.length -1 ){
                            console.log("spin all completed");    
                            var dataRule = Logic.checkDataRule(dataSlot);
                            if(dataRule.length > 0){
                                this.animateAcceptRule(dataRule).then(()=>{
                                    console.log("Already done");
                                });
                            }
                        }                        
                    });
                });
        });        
    }

    animateAcceptRule(dataRule){
        var blinkTime = 4000;
        dataRule.forEach((e, idx)=>{
            this.boxSlots[idx].setRuleBoxAnimate(e, blinkTime);
        });
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                console.log("!!!!!!!! COMPLETED !!!!!!!!")
                resolve();   
            },
            blinkTime)
        });
    }
}