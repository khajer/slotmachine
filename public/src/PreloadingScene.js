
export class PreloadingScene extends Phaser.Scene {    

    constructor (){
        super({
            key: "PreloadingScene",
            pack: {
				files: [
					{ type: 'image', key: 'loadingbar_bg', url: 'assets/img/loading/loadingbar_bg.png' },
					{ type: 'image', key: 'loadingbar_fill', url: 'assets/img/loading/loadingbar_fill.png' }
				]
			}
        });                
    }

    init(){
        // console.log("init");
    }
    preload(){  
        
        // console.log("preloading");
        this.canvas = this.sys.game.canvas;
        this.loadingbar_bg   = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);

        this.load.atlas('symbols', 'assets/img/symbols/spritesheet.png', 'assets/img/symbols/sprites.json');
        
        
        this.load.image("shelfBg", 'assets/img/shelfs/bg.png');
        this.load.image("shelfBottom", 'assets/img/shelfs/bottom.png');
        this.load.image("shelfTop", 'assets/img/shelfs/top.png');

        this.load.image("btnSpin01", 'assets/img/buttons/spin.png');
        this.load.image("btnSpin01Pressed", 'assets/img/buttons/spinPressed.png');
        this.load.image("btnMax", 'assets/img/buttons/max.png');
        this.load.image("btnMinus", 'assets/img/buttons/minus.png');
        this.load.image("btnPlus", 'assets/img/buttons/plus.png');

        this.load.image("panelBet", 'assets/img/panels/bet.png');
        this.load.image("panelWin", 'assets/img/panels/win.png');
        this.load.image("panelGameover", 'assets/img/panels/gameover.png');

        this.load.atlas('panelHeads', 'assets/img/panels/panelHeadSprite.png', 'assets/img/panels/panelHeadSprite.json');
        this.load.image("panelTotalPointMain", 'assets/img/panels/totalPointMain.png');
        
        this.load.audio('coin', ['assets/snd/coin.mp3', 'snd/coin.ogg']);
        this.load.audio('btn', ['assets/snd/btn.mp3', 'snd/btn.ogg']);
        this.load.audio('btn1', ['assets/snd/btn1.mp3', 'snd/btn1.ogg']);
        this.load.audio('error', ['assets/snd/error.mp3', 'snd/error.ogg']);
        this.load.audio('spin', ['assets/snd/spin.mp3', 'snd/spin.ogg']);

        // this.load.bitmapFont('fontwhite', 'assets/img/font/fontwhite.png', 'assets/img/font/fontwhite.xml');
        this.load.bitmapFont('fontblack', 'assets/img/font/fontblack.png', 'assets/img/font/fontblack.xml');

        
    }
    setPreloadSprite(sprite){
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height };
		sprite.visible = true;

		// set callback for loading progress updates
		this.load.on('progress', this.onProgress, this );
		this.load.on('fileprogress', this.onFileProgress, this );
	}
    onProgress(value) {
		if (this.preloadSprite)
		{
			// calculate width based on value=0.0 .. 1.0
			var w = Math.floor(this.preloadSprite.width * value);
			// console.log('onProgress: value=' + value + " w=" + w);
			
			// sprite.frame.width cannot be zero
			//w = (w <= 0 ? 1 : w);
			
			// set width of sprite			
			this.preloadSprite.sprite.frame.width    = (w <= 0 ? 1 : w);
			this.preloadSprite.sprite.frame.cutWidth = w;

			// update screen
			this.preloadSprite.sprite.frame.updateUVs();
		}
	}
	
	onFileProgress(file) {
		// console.log('onFileProgress: file.key=' + file.key);
	}

    create(){
        
        this.loadingbar_bg.destroy();
		this.loadingbar_fill.destroy();
		this.preloadSprite = null;
        this.scene.start('MainScene');
    }

}