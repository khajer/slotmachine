const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

let gVelocity = 0;
let scene = null;

export class BoxSlot {
    layer = null;
    maxSpinCnt = 0;
    groupBlock = [];
    constructor (s, maxSpinCnt, velocity){  
        gVelocity = velocity;      
        scene = s;
        this.maxSpinCnt = maxSpinCnt
    }
    preload(){
        scene.load.image('type1', 'assets/symbol_1.png');
        scene.load.image('type2', 'assets/symbol_2.png');
        scene.load.image('type3', 'assets/symbol_3.png');
        scene.load.image('type4', 'assets/symbol_4.png');
    }
    create (){           
        this.groupBlock =[
            scene.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 0), "type3"),
            scene.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 1), "type3"),
            scene.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 2), "type3"),
            scene.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 3), "type3"),
        ];

        this.layer = scene.add.layer();          
        const graphics = scene.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT * 3);
        const mask = graphics.createGeometryMask();
        this.layer.setMask(mask);

        this.layer.add(this.groupBlock);
    }
    spin(){
        console.log("Spin");
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
                    var dataGen = [2, 2, 2];
                    await this.addLast3Gen(dataGen);
                    resolve();
                }else{
                    this.addRandomBox();
                }                    
                pinRollCnt -= 1;                                     
            }, timeInterval); 
        })
    }
    addRandomBox(){
        var maxType = 4;
        var typeId = (Math.floor(Math.random() * 10) % maxType) + 1;
        var box = scene.physics.add.sprite(
            50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * -1), 
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
            var dy = BLOCK_HEIGHT * 4;
            var difYLast = 5;
            var lastDurationTime = 400;

            this.groupBlock = [];
            for (var i = 0; i < 4; i++){            
                var typebox = dataCols[i];
                if (i === 3) typebox = 1;            
                var box = scene.physics.add.sprite( 
                    50, 
                    (BLOCK_HEIGHT / 2) - (BLOCK_HEIGHT * + (i + 1)), 
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
                    onComplete:(e)=>{                    
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
}