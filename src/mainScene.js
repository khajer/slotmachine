const BLOCK_WIDTH = 72;
const BLOCK_HEIGHT = 72;

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
    txtPoint = null;

    sfxCoin = null;
    sfxBtn = null;
    sfxError = null;
    sfxSpin = null;

    constructor (){
        super({
            key: "MainScene"
        }); 
               
    }
    init(){
        var startX = 0; // (980 - 850) /2 
        var startY = 92;
        
        this.boxSlots = [
            new BoxSlot(this, 4, VELOCITY, (BLOCK_WIDTH / 2), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 8, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 1), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 12, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 2), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 16, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 3), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 20, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 4), (BLOCK_HEIGHT / 2), startX, startY)
        ]
    }
        
    preload(){

    }
    create(){   
        this.init();
        this.createShelf();        
        this.createButton();   
        this.createTextPoint();

        this.createSfx();
    }
    
    createTextPoint(){
        this.txtPoint = this.add.bitmapText(220, 420, 'fontwhite', this.point+'');
        this.txtPoint.fontSize = 14;
		this.txtPoint.setOrigin(0.5).setCenterAlign();
    }

    createSfx(){
        this.sfxCoin = this.sound.add('coin');
        this.sfxBtn = this.sound.add('btn');
        this.sfxError = this.sound.add('error');
        this.sfxSpin = this.sound.add('spin', {volume:0.2});

    }

    createShelf(){
        this.physics.add.sprite(this.cameras.main.centerX, 332, "shelfBg");
        this.createBoxSlot();
        this.physics.add.sprite(this.cameras.main.centerX, 420, "shelfBottom");
        this.physics.add.sprite(this.cameras.main.centerX, 98, "shelfTop");
        this.createPanel();
    }
    createPanel(){
        this.physics.add.sprite(85, 400, "panelBet");
        this.physics.add.sprite(200, 410, "panelWin");
        // this.physics.add.sprite(this.cameras.main.centerX, 60, "panelTotalCoin");
    }
    createBoxSlot(){
        var dataSlot = Logic.splitDataToSlot(Logic.genData());
        this.boxSlots.forEach( (boxSlot, idx) => {
            boxSlot.create(dataSlot[idx]);            
        });
    }
    createButton(){
        var pressed = false;
        this.physics.add.sprite(320, 420, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{       
                if(pressed){
                    return;
                }
                pressed = true;
                this.sfxBtn.play();
                this.sfxSpin.play();

                var dataGen = Logic.genData();
                var data = Logic.splitDataToSlot(dataGen);
                this.boxSlots.forEach((boxSlot, idx) => {
                    boxSlot.spin(data[idx]).then(e=>{
                        if(idx===this.boxSlots.length -1 ){
                            this.sfxSpin.stop();
                            console.log("all spin completed");    
                            var dataRule = Logic.checkDataRule(dataGen);
                            var addPoint = Logic.calcPoint(dataRule, this.bid);
                            
                            if(dataRule.length > 0){
                                this.acceptRuleAction(addPoint);
                                this.animateAcceptRule(dataRule).then(()=>{
                                    console.log("animateAcceptRule Already done");                                    
                                    pressed = false;
                                });
                            }else{
                                this.sfxError.play();
                                console.log("No animateAcceptRule Already done");                                    
                                pressed = false;
                            }                            
                        }                        
                    });
                });
        });
        
        this.physics.add.sprite(30, 440, "btnMinus");
        this.physics.add.sprite(70, 440, "btnPlus");
        this.physics.add.sprite(130, 440, "btnMax");
    }

    acceptRuleAction(addPoint){
        this.sfxCoin.play();
        this.point += addPoint;

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

    update(){
        this.txtPoint.text = this.point + '';
    }
}