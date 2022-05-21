const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;
const SHOW_MAX_BOX = 3;
const MAX_TYPE = 4;

let gVelocity = 0;
let scene = null;

export class BoxSlot {
    layer = null;
    startX = 0;
    startY = 0;
    maxSpinCnt = 0;
    groupBlock = [];
    constructor (s, maxSpinCnt, velocity, startX, startY){  
        gVelocity = velocity;      
        scene = s;
        this.maxSpinCnt = maxSpinCnt
        this.startX = startX;
        this.startY = startY;

    }
    preload(){
        scene.load.image('type1', 'assets/symbol_1.png');
        scene.load.image('type2', 'assets/symbol_2.png');
        scene.load.image('type3', 'assets/symbol_3.png');
        scene.load.image('type4', 'assets/symbol_4.png');
    }
    create (){         
        for(var i=0; i< 4; i++){
            var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
            this.groupBlock.push(scene.physics.add.sprite(this.startX, this.startY + (BLOCK_HEIGHT * i), "type" + typeId));
        }

        this.layer = scene.add.layer();          
        const graphics = scene.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(this.startX - (BLOCK_WIDTH/2), BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT * SHOW_MAX_BOX);
        const mask = graphics.createGeometryMask();
        this.layer.setMask(mask);

        this.layer.add(this.groupBlock);
    }
    spin(data){
        return new Promise((resolve, reject)=>{            
            this.groupBlock.forEach(e=>{
                var dy = BLOCK_HEIGHT * 4;
                scene.tweens.add({
                    targets: [e],
                    y: "+=" + dy,
                    duration: dy / gVelocity,
                    ease: 'Linear',
                    repeat: 0,
                    onComplete: () => {
                        e.destroy();                    
                    }                      
                })
            });                                
            var pinRollCnt = this.maxSpinCnt;
            this.addRandomBox();                
            var timeInterval = BLOCK_HEIGHT / gVelocity;
            var intervalId = setInterval(async () => {                      
                if(pinRollCnt === 0){
                    clearInterval(intervalId);
                    await this.addLast3Gen(data);
                    resolve();
                }else{
                    this.addRandomBox();
                }                    
                pinRollCnt -= 1;                                     
            }, timeInterval); 
        })
    }
    addRandomBox(){        
        var typeId = (Math.floor(Math.random() * 10) % MAX_TYPE) + 1;
        var box = scene.physics.add.sprite(
            this.startX, this.startY + (BLOCK_HEIGHT * -1), 
            "type" + typeId);
            
        this.layer.add(box);
        var dy = BLOCK_HEIGHT * 5;
        
        scene.tweens.add({
            targets: [box],
            y: "+=" + dy,
            duration: dy / gVelocity,
            ease: 'Linear',
            repeat: 0,
            onComplete:()=>{
                box.destroy();
            }                    
        })
    }
    addLast3Gen(dataCols){     
        return new Promise((resolve, reject)=>{
            var dy = BLOCK_HEIGHT * (SHOW_MAX_BOX + 1);
            var difYLast = 20;
            var lastDurationTime = 400;

            this.groupBlock = [];
            for (var i = 0; i < (SHOW_MAX_BOX+1); i++){            
                var typebox = dataCols[i];
                if (i === 3) typebox = 1;            
                var box = scene.physics.add.sprite( 
                    this.startX, 
                    this.startY - (BLOCK_HEIGHT * + (i + 1)), 
                    "type" + typebox);
                box.name = "box_" + i;
                this.layer.add(box);
                this.groupBlock.push(box);
                scene.tweens.add({
                    targets: [box],
                    y: "+=" + dy,
                    duration: dy / gVelocity,
                    ease: 'Linear',
                    repeat: 0,
                    onComplete:(e) => {                    
                        e.targets[0].y += difYLast;
                        scene.tweens.add({
                            targets:[e.targets[0]],
                            y: "-=" + difYLast,
                            duration: lastDurationTime,
                            ease: 'Bounce',
                            repeat: 0,
                            onComplete:() => {
                                resolve();
                            }
                        });
                    }                    
                });
            }
        } );            
    }
    setRuleBoxAnimate(rows, blinkTime){   
        var repeat = (blinkTime/1000) - 1;
        var slots = [];
        rows.forEach(v=>{
            var box = this.groupBlock[v];
            box.alpha = 0.5;
            slots.push(box);
        });
        scene.tweens.add({
            targets: slots, 
            duration: 1000,
            ease: 'Sine.easeInOut',
            alpha: 1,
            repeat: repeat,
        });
        
    }
}