const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 1;
const MAX_COL = 5;
const MAX_TYPE = 4;

import {BoxSlot} from './BoxSlot.js';

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
                this.dataSlot = this.genData();                   
                var data = this.splitDataToSlot(this.dataSlot);
                this.boxSlots.forEach((boxSlot, idx) => {
                    boxSlot.spin(data[idx]).then(e=>{
                        if(idx===this.boxSlots.length -1 ){
                            console.log("spin all completed");    
                            var dataRule = this.checkRule();
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
    splitDataToSlot(dataSlot){        
        var data = [];
        for(var i=0; i< MAX_COL; i++){
            data[i] = [
                dataSlot[(MAX_COL*2)+i], 
                dataSlot[MAX_COL+i],
                dataSlot[i]
            ];
        }
        return data;
    }    
    genData(){
        // return [
        //     3, 1, 3, 2, 3,
        //     1, 1, 2, 1, 1,
        //     1, 2, 2, 4, 2, 
        // ];
        var data = [];
        for(var i = 0; i < (MAX_COL*3); i++){
            var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
            data.push(typeId);
        }
        return data;

    }
    checkRule(){
        console.log("check rule");
        
            // [
            //     3, 1, 3, 2, 3,
            //     1, 1, 2, 1, 1,
            //     1, 2, 2, 4, 2, 
            // ];

        
        // >= 3
        // line - - - - -

        // line - - ^ - -
        // line - - ^

        // line - - v - -
        var data = [];
        data[0] = [0];
        data[1] = [0];
        data[2] = [0];

        return data;

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