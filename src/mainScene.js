const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 0.6;

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
            this.physics.add.sprite(50, (BLOCK_HEIGHT/2) + (BLOCK_HEIGHT * 1), "type4"),
            this.physics.add.sprite(50, (BLOCK_HEIGHT/2) + (BLOCK_HEIGHT * 2), "type4"),
            this.physics.add.sprite(50, (BLOCK_HEIGHT/2) + (BLOCK_HEIGHT * 3), "type4"),
        ];
        this.layer.add(this.groupBlock);

        var btnSpin = this.physics.add.sprite(400, 400, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{                                 
                this.groupBlock.forEach(e=>{
                    var dy = BLOCK_HEIGHT * 3;
                    this.tweens.add({
                        targets: [e],
                        y: "+=" + dy,
                        duration: dy / VELOCITY,
                        ease: 'Linear',
                        repeat: 0,
                        onComplete:()=>{
                            e.destroy();
                        }                      
                    })
                });
                                
                var cnt = 3;
                this.addRandomBox(4);
                
                // var timeInterval = 400; // v = s/t , time = 80/0.2
                var timeInterval = BLOCK_HEIGHT / VELOCITY;
                var intervalId = setInterval(() => {                      
                    if(cnt === 0){
                        clearInterval(intervalId);
                        this.addLast3Gen([4, 4, 4]);
                    }else{
                        this.addRandomBox(4);
                    }                    
                    cnt -= 1;                                     
                }, timeInterval); 
        });
    }    
    addRandomBox(typeId){
        var box = this.physics.add.sprite(
            50, (BLOCK_HEIGHT/2) + (BLOCK_HEIGHT * 0), 
            "type" + typeId);
            
        this.layer.add(box);
        var dy = BLOCK_HEIGHT*4;
        
        this.tweens.add({
            targets: [box],
            y: "+="+dy,
            duration: dy/VELOCITY,
            ease: 'Linear',
            repeat: 0,
            onComplete:()=>{
                box.destroy();
            }                    
        })
    }
    addLast3Gen(dataCols){
        var typeId = 4;                
        var dy = BLOCK_HEIGHT * 3;
        this.groupBlock = [];
        for (var i = 0; i < 3; i++){            
            var box = this.physics.add.sprite( 
                50, 
                (BLOCK_HEIGHT/2) + (BLOCK_HEIGHT * -i), 
                "type" + dataCols[i]);
            this.layer.add(box);
            this.groupBlock.push(box);
            this.tweens.add({
                targets: [box],
                y: "+="+dy,
                duration: dy/VELOCITY,
                ease: 'Linear',
                repeat: 0,
                onComplete:()=>{
                }                    
            });
        }            
    }
}