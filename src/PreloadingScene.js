
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
        console.log(this.canvas);
        // console.log(this.scene.width/2, this.scene.height/2);
        this.loadingbar_bg   = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_bg");
		this.loadingbar_fill = this.add.sprite(this.canvas.width/2, this.canvas.height/2, "loadingbar_fill");
		this.setPreloadSprite(this.loadingbar_fill);

        this.load.image('type1', 'assets/symbol_1.png');
        this.load.image('type2', 'assets/symbol_2.png');
        this.load.image('type3', 'assets/symbol_3.png');
        this.load.image('type4', 'assets/symbol_4.png');
        this.load.image('type5', 'assets/symbol_5.png');
        this.load.image('type6', 'assets/symbol_6.png');
        this.load.image('type7', 'assets/symbol_7.png');
        this.load.image('type8', 'assets/symbol_8.png');
        this.load.image('type9', 'assets/symbol_9.png');
        this.load.image('type10', 'assets/symbol_10.png');
        this.load.image('typeSp1', 'assets/symbol_sp1.png');
        
        this.load.image("btnSpin01", 'assets/btn_spin.png');

        this.load.image("shelfBg", 'assets/shelf_bg.png');
        this.load.image("shelfBottom", 'assets/shelf_bottom.png');
        this.load.image("shelfTop", 'assets/shelf_top.png');

        this.load.image("btnMax", 'assets/btn_max.png');
        this.load.image("btnMinus", 'assets/btn_minus.png');
        this.load.image("btnPlus", 'assets/btn_plus.png');

        this.load.image("panelBet", 'assets/panel_bet.png');
        this.load.image("panelWin", 'assets/panel_win.png');
        this.load.image("panelTotalCoin", 'assets/panel_total_coin.png');
        
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