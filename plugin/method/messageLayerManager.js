var GhostpiaMessageManager;
(function(){
/*

	messageLayerManager.js
	メッセージレイヤーと文字表示系に関するメソッド集

*/

	GhostpiaMessageManager = function(config){
		this.config = config;
		this.current = {
			layer : 'message0',
			row : undefined,
			frame : undefined,
			type : undefined,
			disp : undefined,
			npDiff : undefined,
			visible : true,
			top : 420,
			silent : undefined,
			fontSize : undefined,
			textSpeed : undefined,
			voice : undefined,
			endMessage : undefined,
			speaking : undefined
		};
		this.before = {
			frame : undefined,
			disp : undefined,
			type : undefined,
			top : undefined
		};
		this.list = {
			'文' : {
				defaultRow : 3,
				defaultFrame : 'textwindow',
				status : {
					color : '0xffffff',
					o2_shadow : true,
					o2_shadowblur : 5,
					o2_shadowoffsetx : 0,
					o2_shadowoffsety : 0,
					o2_shadowcolor : "0x000000",
					speakText : false,
					ignoreSkip : false,
					nameplate : false,
					layer : 'message0',
					page : 'fore',
					top : this.config.getValue('displayHeight') - this.config.getValue('messageLayerHeight'),
					left : 0,
					width : this.config.getValue('messageLayerWidth'),
					height : this.config.getValue('messageLayerHeight'),
					opacity	: 0,
					margint : Number(80 - this.current.row * 20),
					marginr	: 100,
					marginb	: 40,
					marginl	: 100,
					vertical : false,
					visible : true
				}
			},
			'声' : {
				defaultRow : 3,
				defaultFrame : 'balloon_normal',
				status : {
					color : '0x000000',
					o2_shadow : false,
					o2_shadowblur : 0,
					o2_shadowoffsetx : 0,
					o2_shadowoffsety : 0,
					o2_shadowcolor : "0xffffff",
					speakText : true,
					ignoreSkip : true,
					nameplate : true,
					layer : 'message1',
					page : 'fore',
					top : 420,
					left : 0,
					width : this.config.getValue('messageLayerWidth'),
					height : this.config.getValue('messageLayerHeight'),
					opacity	: 0,
					margint	: 0,
					marginr	: 100,
					marginb	: 40,
					marginl	: 100,
					widthBack : 736,
					widthHeight : 220,
					marginBack : 8,
					vertical : false,
					visible : true
				}
			}

		};
	}
	/* Number(80 - current.row * 20), */

	GhostpiaMessageManager.prototype = {
		initializer : "GhostpiaMessageManager",
		settingOptions : function(type){
			if (type == 'current'){
				return this.current;
			}else if (type == 'before'){
				return this.before;
			}
		},
		getBeforeType : function(boolean){
			if (this.before.type) {
				return this.before.type;
			}else{
				if (boolean){
					//引数にtrueがある時は、正直に返させる
					return undefined;
				}else{
				//before.type が undefined であれば current.type を返す
					return this.current.type;
				}
			}
		},
		getBeforeDisp : function(){
			return this.before.disp;
		},

		getCurrentValue : function(key){
			return this.current[key];
		},

		getTextColor : function(){
			return this.list[this.current.type].status.color;
		},
		getCenteringLeft : function(txt){
			var leftValue = parseInt(this.config.getValue('displayWidth')/2-Number(o2.currentMessageLayer.measureText(String(txt)).width)/2-this.list[this.current.type].status.marginl);
			return leftValue;
		},
		getFontSize : function(size){
			if (this.current.type == '文') {
				if (!isNaN(size)){
					return this.config.getDefaultFontSize(size);
				}
				switch(size){
					case '最大':
					case 'biggest':
						return this.config.getDefaultFontSize(2.4);
					case '大':
					case 'big':
						return this.config.getDefaultFontSize(1.8);
					case '小':
					case 'small':
						return this.config.getDefaultFontSize(0.6);
					case '中':
					case 'normal':
					default:
						return this.config.getDefaultFontSize();
				}
			} else if (this.current.type == '声') {
				if (!isNaN(size)){
					return this.config.getDefaultFontSize(size);
				}
				switch(size){
					case '最大':
					case 'biggest':
						return this.config.getDefaultFontSize(2.4);
					case '大':
					case 'big':
						return this.config.getDefaultFontSize(1.8);
					case '小':
					case 'small':
						return this.config.getDefaultFontSize(0.6);
					case '中':
					case 'normal':
					default:
						return this.config.getDefaultFontSize();
				}
			}
		},
		getChSpeed : function(speed){
			switch (speed){
				case '速':
				case '速い':
				case 'fast':
					if (this.current.type == '文'){
						var scale = 0.2;
					}else{
						var scale = 0.5;
					}
					break;
				case '遅':
				case '遅い':
				case 'slow':
					if (this.current.type == '文'){
						var scale = 1;
					}else{
						var scale = 2;
					}
					break;
				case '中':
				case '普通':
				case 'normal':
				default:
					if (this.current.type == '文'){
						var scale = 0.4;
					}else{
						var scale = 1;
					}
					break;
				}
				return this.config.getDefaultFontSpeed(scale);
		},
		getTextShadow : function(key,type){
			if (type){
				return this.list[type].status[key];
			}else{
				return this.list[this.current.type].status[key];
			}
		},


		getSpeakText : function(){
			if (this.current.silent){
				return false;
			}else{
				return this.list[this.current.type].status.speakText;
			}
		},
		getIgnoreSkip : function(){
			return this.list[this.current.type].status.ignoreSkip;
		},
		getNameplateEnable : function(){
			if (f.ghostpia.charManager.getCharNameAscii(this.current.disp) == 'none'){
				return 'none';
			}else{
				return this.list[this.current.type].status.nameplate;
			}
		},
		getFrame : function(subtype,boolean){
			if (boolean){
				switch (this.current.frame) {
					case 'cry':
						return 'balloon_cry';
					case 'shout':
						return 'balloon_shout';
					case 'thinking':
						return 'balloon_thinking';
					case 'normal':
					default :
						return this.list[this.current.type].defaultFrame;
				}
			}else{
				if (this.current.type == '文') {
					switch (subtype) {
						case 'none':
							return '';
						case 'white':
							return 'textwindow_white';
						case 'textwindow':
						case 'normal':
						case 'undefined':
						default:
							return 'textwindow';
					}
				} else if (this.current.type == '声') {
					switch (subtype) {
						case 'cry':
							return 'balloon_'+subtype;
						case 'shout':
							return 'balloon_'+subtype;
						case 'thinking':
							return 'balloon_'+subtype;
						case 'normal':
						default :
							return this.list[this.current.type].defaultFrame;
					}
				}
			}
		},
		getLayer : function(type){
			if (type == '声' || type == '文'){
				return this.list[type].status.layer;
			}else{
				if (this.current.type){
					return this.list[this.current.type].status.layer;
				}else{
					return this.list['文'].status.layer;
				}

			}
		},
		getPage : function(){
			return this.list[this.current.type].status.page;
		},
		getTop : function(){
			return this.current.top;
				//	return list[current.type].status.top;
		},
		getLeft : function(){
			return this.list[this.current.type].status.left;
		},
		getWidth : function(page){
			if (page == 'back'){
				return this.list[this.current.type].status.widthBack;
			}else{
				return this.list[this.current.type].status.width;
			}
		},
		getHeight : function(page){
			if (page == 'back'){
				return this.list[this.current.type].status.widthHeight;
			}else{
				return this.list[this.current.type].status.height;
			}
		},
		getOpacity : function(){
			return this.list[this.current.type].status.opacity;
		},
		getVisible : function(){
			return this.current.visible;
		},
		getMargin : function(duration){
			if (duration == 't'){
				if (this.current.type == '声'){
					return 0;
				}else{
					return 80 - this.current.row * 20;
				}
			}else if (duration == 'back'){
					return this.list['声'].status.marginBack;
			}else{
				return this.list[this.current.type].status['margin'+duration];
			}
		},
		getMovePath : function(subtype,left,top,zoom){
			if (this.current.type == '文') {
				return "(0,"+this.current.top+",0,100)(0,"+this.current.top+",255,100)";
			} else if (this.current.type == '声') {
				switch (subtype) {
					case 'cry':
						return "("+left+","+(top+20)+",0,0)("+left+","+top+",255,"+zoom+")";
					case 'shout':
						return "("+(left-10)+","+(top+10)+",0,"+zoom+")("+(left+10)+","+(top-10)+",255,"+zoom+")("+(left-10)+","+top+",255,"+zoom+")("+(left+10)+","+(top+10)+",255,"+zoom+")("+(left-10)+","+(top-10)+",255,"+zoom+")("+left+","+top+",255,"+zoom+")";
					case 'thinking':
						return "("+left+","+(top-10)+",0,0)("+left+","+top+",255,"+zoom+")";
					case 'normal':
					default:
						return "("+left+","+top+",0,0)("+left+","+top+",255,"+zoom+")";
				}
			}
		},
		getMoveTime : function(subtype){
			if (this.current.type == '文') {
				return 120;
			} else if (this.current.type == '声') {
				switch (subtype) {
					case '文':
					case 'cry':
						return 120;
					case 'shout':
						return 30;
					case 'thinking':
						return 150;
					case 'normal':
					default :
						return 80;
				}
			}
		},
		getMoveAccel : function(){
			if (this.current.type == '文') {
				return 0;
			} else if (this.current.type == '声') {
				return -3;
			}
		},

				//メッセージレイヤが再度定義された時、前回とframe等同じであれば上書きしない
		getDecideTrans : function(){
			if (this.current.type == '文' && this.current.type == this.before.type && this.current.frame == this.before.frame && this.current.top == this.before.top ){
				return false;
			}else{
				return true;
			}
		},


		setRow : function(num){
			if (typeof num === 'undefined'){
				this.current.row = this.list[this.current.type].defaultRow;
			}else{
				this.current.row = num;
	//					console.log("currentRow : "+current.row);
			}
		},
		setFrame : function(subtype){
			this.before.frame = this.current.frame;
			this.current.frame = subtype;
		},
		setVisible : function(visible){
			this.current.visible = visible;
		},
		setSilent : function(silent){
			if (typeof silent == 'undefined'){
				this.current.silent = false;
			}else{
				this.current.silent = true;
			}
		},
		setVoice : function(voicename,charname){
			if (typeof voicename == 'undefined'){
				this.current.voice = f.ghostpia.charManager.getCharVoice(charname);
			}else if (voicename == 'noise'){
				this.current.voice = 'noise';
			}else{
				this.current.voice = f.ghostpia.charManager.getCharVoice(voicename);
			}
		},
		setNameplateDiff : function(name){
			if (typeof name != 'undefined' && f.ghostpia.charManager.getNameplateDiff(name)){
				this.current.npDiff = '_' + f.ghostpia.charManager.getNameplateDiff(name);
			}else{
				this.current.npDiff = '';
			}
		},
		setDisp : function(name){
			this.before.disp = this.current.disp;
			if (name == 'none'){
				this.current.disp = name;
			}else if (name == '？'){
				this.current.disp = 'unknown';
			}else if (typeof name == 'undefined'){
				this.current.disp = f.ghostpia.charManager.getCurrentChar();
			}else{
				this.current.disp = name;
			}
		},
		setFontSize : function(size){
			this.current.fontSize = size;
		},
		setChSpeed : function(speed){
			this.current.textSpeed = speed;
		},
		setType : function(type){
			this.before.type = this.current.type;
			this.current.type = type;
	//				console.log("currentType : "+current.type+" , beforeType : "+before.type);
		},
		setTop : function(position){
			this.before.top = this.current.top;
			if (position == 'center'){
				this.current.top = this.config.getValue('displayHeight')/2 - (this.config.getDefaultFontSize()+this.config.getValue('linespacing'));
			}else if (!isNaN(Number(position))){
				this.current.top = this.config.getValue('displayHeight') - this.config.getValue('messageLayerHeight') + Number(position);
			}else{
				this.current.top = this.config.getValue('displayHeight') - this.config.getValue('messageLayerHeight');
			}
	//				console.log("current ypos : "+this.current.top+" (position : "+position+") , before ypos : "+before.top);
		},
		setEndMessage : function(boolean){
			this.current.endMessage = boolean;
		},
		setSpeaking : function(boolean){
			this.current.speaking = boolean;
		},
		serifSplit : function(){
			if (!arguments[0]){
				return {
					text: "",
					ruby: arguments[1]
				}
			}else{
				return {
					text: arguments[0],
					ruby: arguments[1]
				}
			}
		}
	}

	f.ghostpia.messageLayerManager = new GhostpiaMessageManager(f.ghostpia.constant);
	f.ghostpia.messageLayerManager.current = f.ghostpia.messageLayerManager.settingOptions('current');
	f.ghostpia.messageLayerManager.before = f.ghostpia.messageLayerManager.settingOptions('before');

})();