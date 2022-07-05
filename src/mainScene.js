const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 1;
const MAX_COL = 5;

import {BoxSlot} from './BoxSlot.js';
import {Logic} from './Logic.js';

export class MainScene extends Phaser.Scene {    
    layer = null;    
    boxSlots = [];

    dataSlot = [];
    groupBlock = [];

    point = 0;
    bid = 1;

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

        this.load.image("bg", 'assets/draft_bg.png');
    }
    create(){   
        var btnSpin = this.physics.add.sprite(980/2, 1200/2, "bg")

        var dataSlot = Logic.splitDataToSlot(Logic.genData());
        this.boxSlots.forEach( (boxSlot, idx) => {
            boxSlot.create(dataSlot[idx]);            
        });
        
        var pressed = false;
        var btnSpin = this.physics.add.sprite(400, 400, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{       
                if(pressed){
                    return;
                }
                pressed = true;

                var dataGen = Logic.genData();
                var data = Logic.splitDataToSlot(dataGen);
                this.boxSlots.forEach((boxSlot, idx) => {
                    boxSlot.spin(data[idx]).then(e=>{
                        if(idx===this.boxSlots.length -1 ){
                            console.log("spin all completed");    
                            var dataRule = Logic.checkDataRule(dataGen);
                            var addPoint = Logic.calcPoint(dataRule, this.bid);
                            console.log(addPoint);
                            this.point += addPoint;
                            console.log("POINT : " + this.point);
                            if(dataRule.length > 0){
                                this.animateAcceptRule(dataRule).then(()=>{
                                    console.log("animateAcceptRule Already done");                                    
                                    pressed = false;
                                });
                            }else{
                                console.log("No animateAcceptRule Already done");                                    
                                pressed = false;
                            }
                            
                        }                        
                    });
                });
        });        
    }

    animateAcceptRule(data){

        var dataMergePos = []
        data.forEach( e => {dataMergePos = dataMergePos.concat(e)});
        var posBlinks = (dataMergePos.map((data)=>{return data.pos}));

        var dataRuleSlot = Logic.dataAcceptToSlotMachines(posBlinks);
        
        var blinkTime = 1000;
        var repeat = 5;
        dataRuleSlot.forEach((e, idx)=>{
            this.boxSlots[idx].setRuleBoxAnimate(e, blinkTime, repeat);
        });
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve();   
            },
            blinkTime);
        });
    }
}