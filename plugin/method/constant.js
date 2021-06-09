var GhostpiaConstant
(function(){
/*

	constant.js
	定数設定ファイル　methodの中では一番最初に読み込むこと

*/

	GhostpiaConstant = function(){
		this.list = {
			fontSize: 36,
			linespacing: 18,
			pitch: 4,
			fontSpeed: config.chSpeeds,
			slide: true,
			slideoffsetx: 0,
			slideoffsety: 4,
			slideduration: 20,
			slidefadeduration: 80,
			displayWidth: config.scWidth,
			displayHeight: config.scHeight,
			messageLayerWidth: 1136,
			messageLayerHeight: 220,
			nameplateWidth: 95,
			nameplateHeight: 220,
			transTime: 250,
			bgmGVolume: 0.5,
			chapters: [14,25],
			novelsphere: tf.tmp.novelsphere
		};
	}

	GhostpiaConstant.prototype = {
		initializer: "GhostpiaConstant",
		getDefaultFontSize: function(scale){
			if (!scale){
				scale = 1
			}
			return Math.round(this.list.fontSize*scale);
		},
		getValue: function(valueName){
			return this.list[valueName];
		},
		getDefaultFontSpeed: function(scale){
			if (!scale){
				scale = 1
			}
			return Math.round(this.list.fontSpeed*scale);
		},
		getNameplateSize: function(direction){
			if (direction == 'x'){
				return this.list.messageLayerWidth - this.list.nameplateWidth;
			}else if (direction == 'y'){
				return this.list.displayHeight - this.list.nameplateHeight;
			}else{
				alert('getNameplateSize: 縦横どっち');
				return 0;
			}
		},
		getNameplatePosition: function(direction){
			if (direction == 'x'){
				return this.list.messageLayerWidth - 40 - this.list.nameplateWidth;
			}else if (direction == 'y'){
				return this.list.displayHeight - this.list.nameplateHeight;
			}else{
				alert('getNameplatePosition: 縦横どっち');
				return 0;
			}
		},
		getAspectRatio: function(){
			var hoge = this.list.messageLayerWidth / this.list.messageLayerHeight;
			if (typeof hoge == 'number') {
				return hoge;
			} else {
				alert('yabaidesu');
				return 0;
			}
		}
	}


	f.ghostpia.constant = new GhostpiaConstant();

})();