
export class PreloadingScene extends Phaser.Scene {    

    constructor (){
        super({
            key: "PreloadingScene",
            pack: {
				files: [
					{ type: 'image', key: 'loadingbar_bg', url: 'assets/loading/loadingbar_bg.png' },
					{ type: 'image', key: 'loadingbar_fill', url: 'assets/loading/loadingbar_fill.png' }
				]
			}
        }); 
               
    }

    init(){
        console.log("init");
    }
    preload(){  

        console.log("preloading");
        this.canvas = this.sys.game.canvas;
        this.loadingbar_bg   = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);

        this.load.image('type1', 'assets/symbols/1.png');
        this.load.image('type2', 'assets/symbols/2.png');
        this.load.image('type3', 'assets/symbols/3.png');
        this.load.image('type4', 'assets/symbols/4.png');
        this.load.image('type5', 'assets/symbols/5.png');
        this.load.image('type6', 'assets/symbols/6.png');
        this.load.image('type7', 'assets/symbols/7.png');
        this.load.image('type8', 'assets/symbols/8.png');
        this.load.image('type9', 'assets/symbols/9.png');
        this.load.image('type10', 'assets/symbols/10.png');
        this.load.image('typeSp1', 'assets/symbols/sp1.png');
        
        
        this.load.image("shelfBg", 'assets/shelfs/bg.png');
        this.load.image("shelfBottom", 'assets/shelfs/bottom.png');
        this.load.image("shelfTop", 'assets/shelfs/top.png');

        this.load.image("btnSpin01", 'assets/buttons/spin.png');
        this.load.image("btnMax", 'assets/buttons/max.png');
        this.load.image("btnMinus", 'assets/buttons/minus.png');
        this.load.image("btnPlus", 'assets/buttons/plus.png');

        this.load.image("panelBet", 'assets/panels/bet.png');
        this.load.image("panelWin", 'assets/panels/win.png');
        this.load.image("panelTotalCoin", 'assets/panels/total_coin.png');
        
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
			console.log('onProgress: value=' + value + " w=" + w);
			
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
		console.log('onFileProgress: file.key=' + file.key);
	}

    create(){
        console.log("create");
        this.scene.start('MainScene');
    }

}