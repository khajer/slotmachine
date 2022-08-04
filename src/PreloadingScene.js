
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
        console.log("init");
    }
    preload(){  

        console.log("preloading");
        this.canvas = this.sys.game.canvas;
        this.loadingbar_bg   = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);

        this.load.image('type1', 'assets/img/symbols/1.png');
        this.load.image('type2', 'assets/img/symbols/2.png');
        this.load.image('type3', 'assets/img/symbols/3.png');
        this.load.image('type4', 'assets/img/symbols/4.png');
        this.load.image('type5', 'assets/img/symbols/5.png');
        this.load.image('type6', 'assets/img/symbols/6.png');
        this.load.image('type7', 'assets/img/symbols/7.png');
        this.load.image('type8', 'assets/img/symbols/8.png');
        this.load.image('type9', 'assets/img/symbols/9.png');
        this.load.image('type10', 'assets/img/symbols/10.png');
        this.load.image('typeSp1', 'assets/img/symbols/sp1.png');
        
        
        this.load.image("shelfBg", 'assets/img/shelfs/bg.png');
        this.load.image("shelfBottom", 'assets/img/shelfs/bottom.png');
        this.load.image("shelfTop", 'assets/img/shelfs/top.png');

        this.load.image("btnSpin01", 'assets/img/buttons/spin.png');
        this.load.image("btnMax", 'assets/img/buttons/max.png');
        this.load.image("btnMinus", 'assets/img/buttons/minus.png');
        this.load.image("btnPlus", 'assets/img/buttons/plus.png');

        this.load.image("panelBet", 'assets/img/panels/bet.png');
        this.load.image("panelWin", 'assets/img/panels/win.png');
        this.load.image("panelTotalCoin", 'assets/img/panels/total_coin.png');
        
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