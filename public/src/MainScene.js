const BLOCK_WIDTH = 60;
const BLOCK_HEIGHT = 60;

const VELOCITY = 1;

import {BoxSlot} from './BoxSlot.js';
import {Logic} from './Logic.js';

export class MainScene extends Phaser.Scene {    
    layer = null;    
    boxSlots = [];

    panelHead = null;

    dataSlot = [];
    groupBlock = [];

    point = 0;
    bid = 0;
    totalPoint = 1000;
    
    txtPoint = null;
    txtBid = null;
    txtTotalPoint = null;

    sfxCoin = null;
    sfxBtn = null;
    sfxBtn1 = null;
    sfxError = null;
    sfxSpin = null;

    constructor (){
        super({
            key: "MainScene"
        }); 
               
    }
    init(){        
        var canvas = this.sys.game.canvas;
        
        const boxStartX = (canvas.width - (BLOCK_WIDTH*5))/2;
        const boxStartY = 120;

        this.boxSlots = [
            new BoxSlot(this, 4, VELOCITY, (BLOCK_WIDTH / 2), (BLOCK_HEIGHT / 2), boxStartX, boxStartY),
            new BoxSlot(this, 8, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 1), (BLOCK_HEIGHT / 2), boxStartX, boxStartY),
            new BoxSlot(this, 12, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 2), (BLOCK_HEIGHT / 2), boxStartX, boxStartY),
            new BoxSlot(this, 16, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 3), (BLOCK_HEIGHT / 2), boxStartX, boxStartY),
            new BoxSlot(this, 20, VELOCITY, (BLOCK_WIDTH / 2) + (BLOCK_WIDTH * 4), (BLOCK_HEIGHT / 2), boxStartX, boxStartY)
        ]
    }
        
    preload(){

    }
    create(){   
        this.init();
        this.createShelf();        
        this.createButton();   
        this.createSfx();
    }
    
    createSfx(){
        this.sfxCoin = this.sound.add('coin');
        this.sfxBtn = this.sound.add('btn');
        this.sfxBtn1 = this.sound.add('btn1', {volume:0.6});
        this.sfxError = this.sound.add('error');
        this.sfxSpin = this.sound.add('spin', {volume:0.2});
    }

    createShelf(){
        this.panelHead = this.physics.add.sprite(this.cameras.main.centerX, 24, "panelHeads", "head1");        
                
        this.anims.create({
            key: 'normal',
            frames: [
                { key: 'panelHeads', frame: 'head1' , duration: 4000},
                { key: 'panelHeads', frame: 'head2'}                
            ],
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'lose',
            frames: [
                { key: 'panelHeads', frame: 'head3',},                                
            ],
            frameRate: 1,
            repeat: 0
        });

        this.panelHead.play("normal");

        this.physics.add.sprite(this.cameras.main.centerX, 81, "panelTotalPointMain");        
        this.txtTotalPoint = this.add.bitmapText(this.cameras.main.centerX, 70, 'fontblack', this.point+'');
        this.txtTotalPoint.fontSize = 24;
		this.txtTotalPoint.setOrigin(0.5).setRightAlign();
        this.txtTotalPoint.setText(this.totalPoint + '');
                
        this.physics.add.sprite(this.cameras.main.centerX, 320, "shelfBg");
        this.createBoxSlot();
        this.physics.add.sprite(this.cameras.main.centerX, 412, "shelfBottom");
        this.physics.add.sprite(this.cameras.main.centerX, 142, "shelfTop");

        this.createPanel();
    }
    createPanel(){
        this.physics.add.sprite(this.cameras.main.centerX-110, 402, "panelBet");
        this.txtBid = this.add.bitmapText(this.cameras.main.centerX-85, 400, 'fontblack', this.point+'');
        this.txtBid.fontSize = 14;
		this.txtBid.setOrigin(0.5).setRightAlign();
        this.txtBid.setText(this.bid + '');

        this.physics.add.sprite(this.cameras.main.centerX+30, 420, "panelWin");
        this.txtPoint = this.add.bitmapText(this.cameras.main.centerX+40, 426, 'fontblack', this.point+'');
        this.txtPoint.fontSize = 20;
		this.txtPoint.setOrigin(0.5).setRightAlign();
        
    }
    createBoxSlot(){
        var dataSlot = Logic.splitDataToSlot(Logic.genData());
        this.boxSlots.forEach( (boxSlot, idx) => {
            boxSlot.create(dataSlot[idx]);            
        });
    }
    createButton(){
        var pressed = false;
        var btnSpin = this.physics.add.sprite(this.cameras.main.centerX + 140, 420, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{
                if(pressed){
                    return;
                }
                btnSpin.setTexture("btnSpin01Pressed")
            })
            .on('pointerup', ()=>{       
                if(pressed){
                    return;
                }
                pressed = true;
                this.spinFunc(btnSpin, (result)=>{
                    pressed = false;
                });                
            });        
        var btnMinus = this.physics.add.sprite(this.cameras.main.centerX-155, 440, "btnMinus")
            .setInteractive()
            .on('pointerdown', ()=>{          
                btnMinus.setAlpha(0.5);
                
            })
            .on('pointerup', ()=>{
                this.sfxBtn1.play();
                btnMinus.setAlpha(1);
                if(this.bid >= 10){
                    this.bid -= 10;
                    this.txtBid.text = this.bid + '';
                }                
            });
        
        var btnPlus = this.physics.add.sprite(this.cameras.main.centerX-115, 440, "btnPlus")
            .setInteractive()
            .on('pointerdown', ()=>{         
                btnPlus.setAlpha(0.5);                       
            })
            .on('pointerup', ()=>{
                this.sfxBtn1.play();
                btnPlus.setAlpha(1);
                if(this.bid < 100){
                    this.bid += 10;
                    this.txtBid.text = this.bid + '';
                }                
            });
        var btnMax = this.physics.add.sprite(this.cameras.main.centerX-70, 440, "btnMax")
            .setInteractive()
            .on('pointerdown', ()=>{     
                btnMax.setAlpha(0.5);            
            })
            .on('pointerup', ()=>{
                this.sfxBtn1.play();
                btnMax.setAlpha(1);         
                this.bid = 100;
                this.txtBid.text = this.bid + '';                   
            });
    }
    spinFunc(btnSpin, cb){
        this.panelHead.play("normal");
        this.totalPoint -= this.bid;
        this.txtTotalPoint.setText(this.totalPoint+ '');
        this.txtPoint.setText("");

        btnSpin.setTexture("btnSpin01")
        this.sfxBtn.play();
        this.sfxSpin.play();

        var dataGen = Logic.genData();
        var data = Logic.splitDataToSlot(dataGen);
        this.boxSlots.forEach((boxSlot, idx) => {
            boxSlot.spin(data[idx]).then(e=>{
                if(idx===this.boxSlots.length -1 ){
                    this.sfxSpin.stop();

                    this.checkEveryThinkWhenSpinTop(dataGen, cb);                                           
                }                        
            });
        });
    }
    checkEveryThinkWhenSpinTop(dataGen, cb){
        console.log("all spin completed");    
        var dataRule = Logic.checkDataRule(dataGen);
        var addPoint = Logic.calcPoint(dataRule, this.bid);
        
        if(dataRule.length > 0){
            this.acceptRuleAction(addPoint);
            this.animateAcceptRule(dataRule).then(()=>{
                console.log("animateAcceptRule Already done");                                    
                cb(false);
            });
        }else{
            this.panelHead.play("lose");
            this.txtPoint.setText("0");
            this.sfxError.play();
            console.log("No animateAcceptRule Already done");         
            cb(false);                           
        } 
    }
    
    acceptRuleAction(addPoint){
        this.sfxCoin.play();
        this.totalPoint += addPoint;        
        this.txtTotalPoint.setText(this.totalPoint+ '');        
        this.txtPoint.setText(addPoint+"");

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
    }
}