const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 1.0;

export class MainScene extends Phaser.Scene {    
    layer = null;
    groupBlock = [];
    constructor (){
        super();        
    }
    
    preload (){    
        this.load.image('type1', 'assets/symbol_1.png');
        this.load.image('type2', 'assets/symbol_2.png');
        this.load.image('type3', 'assets/symbol_3.png');
        this.load.image('type4', 'assets/symbol_4.png');

        this.load.image("btnSpin01", 'assets/spin_0.png');
        this.load.image("btnSpin02", 'assets/spin_1.png');
                    
    }
    create (){   
        this.layer = this.add.layer();  
        
        const graphics = this.make.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillRect(0, BLOCK_HEIGHT, BLOCK_WIDTH, BLOCK_HEIGHT * 3);
        const mask = graphics.createGeometryMask();
        this.layer.setMask(mask);

        this.groupBlock =[
            this.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 0), "type3"),
            this.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 1), "type3"),
            this.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 2), "type3"),
            this.physics.add.sprite(50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * 3), "type3"),
        ];
        this.layer.add(this.groupBlock);

        var btnSpin = this.physics.add.sprite(400, 400, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{                                 
                this.groupBlock.forEach(e=>{
                    var dy = BLOCK_HEIGHT * 4;
                    this.tweens.add({
                        targets: [e],
                        y: "+=" + dy,
                        duration: dy / VELOCITY,
                        ease: 'Linear',
                        repeat: 0,
                        onComplete: () => {
                            e.destroy();
                        }                      
                    })
                });                                
                var pinRollCnt = 20;
                this.addRandomBox();                
                var timeInterval = BLOCK_HEIGHT / VELOCITY;
                var intervalId = setInterval(() => {                      
                    if(pinRollCnt === 0){
                        clearInterval(intervalId);
                        this.addLast3Gen([2, 2, 2]);
                    }else{
                        this.addRandomBox();
                    }                    
                    pinRollCnt -= 1;                                     
                }, timeInterval); 
        });
    }    
    addRandomBox(){
        var maxType = 4;
        var typeId = (Math.floor(Math.random() * 10) % maxType) + 1;
        var box = this.physics.add.sprite(
            50, (BLOCK_HEIGHT / 2) + (BLOCK_HEIGHT * -1), 
            "type" + typeId);
            
        this.layer.add(box);
        var dy = BLOCK_HEIGHT * 5;
        
        this.tweens.add({
            targets: [box],
            y: "+=" + dy,
            duration: dy / VELOCITY,
            ease: 'Linear',
            repeat: 0,
            onComplete:()=>{
                box.destroy();
            }                    
        })
    }
    addLast3Gen(dataCols){            
        var dy = BLOCK_HEIGHT * 4;
        var difYLast = 10;
        var lastDurationTime = 100;

        this.groupBlock = [];
        for (var i = 0; i < 4; i++){            
            var typebox = dataCols[i];
            if (i === 3) typebox = 1;            
            var box = this.physics.add.sprite( 
                50, 
                (BLOCK_HEIGHT / 2) - (BLOCK_HEIGHT * + (i + 1)), 
                "type" + typebox);
            box.name = "box_" + i;
            this.layer.add(box);
            this.groupBlock.push(box);
            this.tweens.add({
                targets: [box],
                y: "+=" + dy,
                duration: dy / VELOCITY,
                ease: 'Linear',
                repeat: 0,
                onComplete:(e)=>{                    
                    e.targets[0].y += difYLast;
                    this.tweens.add({
                        targets:[e.targets[0]],
                        y: "-=" + difYLast,
                        duration: lastDurationTime,
                        ease: 'Linear',
                        repeat: 0,
                        onComplete:() => {
                            console.log("complete");
                        }
                    });
                }                    
            });
        }
    }
}