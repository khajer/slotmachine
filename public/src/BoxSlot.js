const BLOCK_WIDTH = 60;
const BLOCK_HEIGHT = 60;
const SHOW_MAX_BOX = 3;
const MAX_TYPE = 10;
const MAX_COL = 5;

let gVelocity = 1;
let scene = null;

export class BoxSlot {
    layer = null;
    startX = 0;
    startY = 0;
    paddingX = 0;
    paddingY = 0;
    maxSpinCnt = 0;
    groupBlock = [];
    constructor (s, maxSpinCnt, velocity, startX, startY, paddingX, paddingY){  
        gVelocity = velocity;      
        scene = s;
        this.maxSpinCnt = maxSpinCnt
        this.startX = startX + paddingX;
        this.startY = startY + paddingY;

        this.paddingX = paddingX;
        this.paddingY = paddingY;
    }
    preload(){
    }
    create (data){         
        this.setStart(data);
        this.addMask();
        
    }
    addMask(){
        this.layer = scene.add.layer();          
        const graphics = scene.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(this.startX - (BLOCK_WIDTH/2), this.paddingY+BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT * SHOW_MAX_BOX);
        const mask = graphics.createGeometryMask();
        this.layer.setMask(mask);

        this.layer.add(this.groupBlock);
    }
    setStart(data){
        this.groupBlock = [];                
        var typeId = (Math.floor(Math.random() * 100) % MAX_TYPE) + 1;
        this.groupBlock.push(scene.physics.add.sprite(this.startX, this.startY + (BLOCK_HEIGHT * 0), "symbols", "type" + typeId));
        
        data.forEach((v, idx)=>{
            var typeId = "type" + v;
            if(v === -10){
                typeId = "typeSp1"
            }
            this.groupBlock.push(scene.physics.add.sprite(this.startX, this.startY + (BLOCK_HEIGHT * (idx+1)), "symbols", typeId));
        });               
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
        var typeName = "type" + typeId;
        if (Math.floor(Math.random() * 10) % 10 === 1 ){
            typeName = "typeSp1";
        }

        var box = scene.physics.add.sprite(
            this.startX, 
            this.startY + (BLOCK_HEIGHT * -1), 
            "symbols", 
            typeName);
            
        this.layer.add(box);
        var dy = BLOCK_HEIGHT * MAX_COL;
        
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
                var startY = this.startY - (BLOCK_HEIGHT*(3-i));

                if (i === SHOW_MAX_BOX){
                    typebox = 2;
                    startY = this.startY - (BLOCK_HEIGHT*4);
                }            
                var typeName = "type" + typebox;
                if (typebox === -10){
                    typeName = "typeSp1";
                }
                var box = scene.physics.add.sprite( 
                    this.startX, 
                    startY,
                    "symbols",                    
                    typeName);
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
        });            
    }
    setRuleBoxAnimate(rows, blinkTime, repeat){
        var slots = [];
        rows.forEach(v=>{
            var box = this.groupBlock[v];
            box.alpha = 0.2;
            slots.push(box);
        });
        scene.tweens.add({
            targets: slots, 
            duration: 1000,
            ease: 'Cubic.easeOut',
            alpha: 1,
            repeat: repeat,
        });
        
    }
}