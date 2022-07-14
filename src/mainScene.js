const BLOCK_WIDTH = 170;
const BLOCK_HEIGHT = 170;

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
        var startX = 65; // (980 - 850) /2 
        var startY = 190;
        
        this.boxSlots = [
            new BoxSlot(this, 4, VELOCITY, (BLOCK_WIDTH / 2), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 8, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 1), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 12, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 2), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 16, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 3), (BLOCK_HEIGHT / 2), startX, startY),
            new BoxSlot(this, 20, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 4), (BLOCK_HEIGHT / 2), startX, startY)
        ]
    }
        
    preload(){  
        this.init();          
        this.boxSlots.forEach(boxSlot => {
            boxSlot.preload();
        });

        this.load.image("btnSpin01", 'assets/btn_spin.png');

        this.load.image("shelfBg", 'assets/shelf_bg.png');
        this.load.image("shelfBottom", 'assets/shelf_bottom.png');
        this.load.image("shelfTop", 'assets/shelf_top.png');

        this.load.image("btnMax", 'assets/btn_max.png');
        this.load.image("btnMinus", 'assets/btn_minus.png');
        this.load.image("btnPlus", 'assets/btn_plus.png');

        this.load.image("panelBet", 'assets/panel_bet.png');
        this.load.image("panelWin", 'assets/panel_win.png');
        this.load.image("panelTotalCoin", 'assets/panel_total_coin.png');
        
    }
    create(){   

        this.createShelf();        
        this.createButton();   
    }

    createShelf(){
        this.physics.add.sprite(this.cameras.main.centerX, 720, "shelfBg");
        this.createBoxSlot();
        this.physics.add.sprite(this.cameras.main.centerX, 980, "shelfBottom");
        this.physics.add.sprite(this.cameras.main.centerX, 290, "shelfTop");
        this.createPanel();
    }
    createPanel(){
        this.physics.add.sprite(240, 925, "panelBet");
        this.physics.add.sprite(520, 956, "panelWin");
        this.physics.add.sprite(this.cameras.main.centerX, 180, "panelTotalCoin");
    }
    createBoxSlot(){
        var dataSlot = Logic.splitDataToSlot(Logic.genData());
        this.boxSlots.forEach( (boxSlot, idx) => {
            boxSlot.create(dataSlot[idx]);            
        });
    }
    createButton(){
        var pressed = false;
        this.physics.add.sprite(820, 980, "btnSpin01")
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
        
        this.physics.add.sprite(120, 1025, "btnMinus");
        this.physics.add.sprite(220, 1025, "btnPlus");
        this.physics.add.sprite(340, 1025, "btnMax");
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