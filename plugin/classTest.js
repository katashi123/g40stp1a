(function(){

	var constant = function(){

		var defaultFontSize = 36;
		var defaultLinespacing = 20;
		var defaultFontSpeed = 80;
		var displayWidth = config.scWidth;
		var displayHeight = config.scHeight;
		var defaultMessageLayerWidth = 1136;
		var defaultMessageLayerHeight = 220;
		var nameplateWidth = 95;
		var nameplateHeight = 220;


		this.getDefaultFontSize = function(scale){
			if (!scale){
				scale = 1
			}
			return Math.round(defaultFontSize*scale);
		};
		this.getDefaultLinespacing = function(){
			return defaultLinespacing;
		};		
		this.getDefaultFontSpeed = function(scale){
			if (!scale){
				scale = 1
			}
			return Math.round(defaultFontSpeed*scale);
		};
		this.getDisplayWidth = function(){
			return displayWidth;
		};
		this.getDisplayHeight = function(){
			return displayHeight;
		};
		this.getDefaultMessageLayerWidth = function(){
			return defaultMessageLayerWidth;
		};
		this.getDefaultMessageLayerHeight = function(){
			return defaultMessageLayerHeight;
		};
		this.getNameplateSize = function(direction){
			if (direction == 'x'){
				return defaultMessageLayerWidth - nameplateWidth;
			}else if (direction == 'y'){
				return displayHeight - nameplateHeight;
			}else{
				alert('getNameplateSize : 縦横どっち');
				return 0;
			}
		};
		this.getNameplatePosition = function(direction){
			if (direction == 'x'){
				return defaultMessageLayerWidth - nameplateWidth;
			}else if (direction == 'y'){
				return displayHeight - nameplateHeight;
			}else{
				alert('getNameplatePosition : 縦横どっち');
				return 0;
			}
		};
		this.getAspectRatio = function(){
			var hoge = defaultMessageLayerWidth / defaultMessageLayerHeight;
			if (typeof hoge == 'number') {
				return hoge;
			} else {
				alert('yabaidesu');
				return 0;
			}
		};

	}

	ghostpia = new constant();

})();