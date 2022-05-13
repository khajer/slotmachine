const BLOCK_WIDTH = 100;
const BLOCK_HEIGHT = 80;

const VELOCITY = 1;

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
        graphics.fillRect(0, 80, 100, 80*3);
        const mask = graphics.createGeometryMask();
        this.layer.setMask(mask);

        this.groupBlock =[
            this.physics.add.sprite(50, 40+BLOCK_HEIGHT*1, "type4"),
            this.physics.add.sprite(50, 40+BLOCK_HEIGHT*2, "type4"),
            this.physics.add.sprite(50, 40+BLOCK_HEIGHT*3, "type4"),
        ];
        this.layer.add(this.groupBlock);

        var btnSpin = this.physics.add.sprite(400, 400, "btnSpin01")
            .setInteractive()
            .on('pointerdown', ()=>{                                 
                this.groupBlock.forEach(e=>{
                    var dy = 240;
                    this.tweens.add({
                        targets: [e],
                        y: "+="+dy,
                        duration: dy/VELOCITY,
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
                var timeInterval = BLOCK_HEIGHT/VELOCITY;
                var intervalId = setInterval(()=>{                      
                    if(cnt === 0){
                        clearInterval(intervalId);
                        this.addLast3Gen();
                    }else{
                        this.addRandomBox(4);
                    }                    
                    cnt -= 1;                 
                    
                }, timeInterval); 
        });
    }    
    addRandomBox(typeId){
        var box = this.physics.add.sprite(50, 40+BLOCK_HEIGHT*0, "type"+typeId)
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
    addLast3Gen(){
        var typeId = 4;        
        var box = this.physics.add.sprite(50, 40+BLOCK_HEIGHT*0, "type"+typeId)
        this.layer.add(box);
        var dy = 240;
        this.tweens.add({
            targets: [box],
            y: "+="+dy,
            duration: dy/VELOCITY,
            ease: 'Linear',
            repeat: 0,
            onComplete:()=>{
            }                    
        });
            
        var box1 = this.physics.add.sprite(50, 40+BLOCK_HEIGHT*-1, "type"+typeId)
        this.layer.add(box1);
        this.tweens.add({
            targets: [box1],
            y: "+="+dy,
            duration: dy/VELOCITY,
            ease: 'Linear',
            repeat: 0,
            onComplete:()=>{
            }                    
        });    
        var box2 = this.physics.add.sprite(50, 40+BLOCK_HEIGHT*-2, "type"+typeId)
        this.layer.add(box2);
        this.tweens.add({
            targets: [box2],
            y: "+="+dy,
            duration: dy/VELOCITY,
            ease: 'Linear',
            repeat: 0,
            onComplete:()=>{

            }                    
        });    
        this.groupBlock = [box, box1, box2];
            
    }
}