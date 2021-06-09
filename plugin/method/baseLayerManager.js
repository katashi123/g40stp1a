var GhostpiaBaseManager;
(function(){
/*

	baseLayerManager.js
	背景画像を扱う系メソッド

*/

	GhostpiaBaseManager = function(){

		this.current = {
			storage : undefined,
			page : undefined,
			visible : undefined,
			left : undefined,
			top : undefined,
			opacity : undefined,
			o2_zoom : undefined,
			o2_rotate : undefined,
			o2_orx : undefined,
			o2_ory : undefined,
			o2_blur : undefined,
			o2_blurX : undefined,
			o2_blurY : undefined,
			o2_blurMode : undefined,
			transTime : 200,
			transType : undefined,
			transRule : undefined,
			diff : undefined
		};

		//dawn = 明け方 , night = 夜
		//それぞれ true なら storage名の後ろに "_dawn" , "_night" をつける
		this.bgList = {
			'ロスコ' : {
				storage : 'rothko',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'キー' : {
				storage : 'keyVisual',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'キー２' : {
				storage : '2_23_19',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'キー３' : {
				storage : '3_4_4',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'キー４' : {
				storage : '4_71',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'キーblur' : {
				storage : 'keyVisual_blur',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'クレジット' : {
				storage : 'credit',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'ブラックアウト' : {
				storage : 'blackout',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'ホワイトアウト' : {
				storage : 'whiteout',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'白' : {
				storage : 'white',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'暗闇' : {
				storage : 'darkness',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'小夜子の部屋' : {
				storage : 'sayoko_room',
				default : 'night',
				dawn : true,
				night : true,
				normal : true
			},
			'小夜子の部屋２' : {
				storage : 'sayoko_room2',
				default : 'night',
				dawn : true,
				night : true,
				normal : true
			},
			'アパート廊下' : {
				storage : 'apartment_passage',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'アパート中庭' : {
				storage : 'apartment_courtyard',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'町の遠景' : {
				storage : 'town_view',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'メインストリート' : {
				storage : 'main_street',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'広場' : {
				storage : 'public_square',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'裏路地' : {
				storage : 'back_alley',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'裏路地２' : {
				storage : 'back_alley2',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'廃駅' : {
				storage : 'ghost_station',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'廃駅過去' : {
				storage : 'lost_station',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'シャワールーム' : {
				storage : 'shower_room',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'ゴミ捨て場' : {
				storage : 'garbage_dump',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'ゴミ捨て場フェンス' : {
				storage : 'garbage_dump_fence',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'雪の砂漠' : {
				storage : 'snow_desert',
				default : 'night',
				dawn : false,
				night : true,
				normal : false
			},
			'修理屋' : {
				storage : 'anya_garage',
				default : 'night',
				dawn : true,
				night : true,
				normal : false
			},
			'パシフィカの部屋' : {
				storage : 'pacifica_house_living',
				default : 'night',
				dawn : false,
				night : true,
				normal : false,
				party : true,
				party_crash : true
			},
			'教会礼拝堂' : {
				storage : 'chapel',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'教会礼拝堂扉' : {
				storage : 'chapel2',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'教会応接間' : {
				storage : 'church_drawing_room',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'カフェ' : {
				storage : 'cafe',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'コスプレショップ' : {
				storage : 'cosplay_shop_backyard',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'マーガレット家リビング' : {
				storage : 'margaret_house_living',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'小夜子部屋一望' : {
				storage : 'sayoko_room_panorama',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			},
			'レーニャ部屋' : {
				storage : 'lenya_room',
				default : undefined,
				dawn : false,
				night : false,
				normal : false
			}
		}

		this.nameArray = this.generateArrayFromObject(this.bgList);
	}

	GhostpiaBaseManager.prototype = {
		initializer : "GhostpiaBaseManager",
		generateArrayFromObject : function(obj) {
			var arr = [];
			for (var key in obj) {
			arr.push(key);
			}
			return arr;
		},
		getBgName : function(num){
			return this.nameArray[num];
		},
		getBgStorage : function(name){
			return this.bgList[name].storage;
		},
		getBgListlength : function(){
			return this.nameArray.length;
		},

		getStorage : function(sto){
			if (sto){
				if (typeof this.current.diff == 'undefined'){
					return sto;
				}else{
					return sto + '_' + this.current.diff;
				}
			}else{
				return this.current.storage;
			}
		},
		getCurrentValue : function(key){
			return this.current[key];
		},

		getOpacity : function(num,start,set){
			if (!set){
				if (typeof num == 'undefined'){
					if (typeof this.current.opacity == 'undefined'){
						num = num+":"+num;
					}else{
						num = this.current.opacity+":"+this.current.opacity;
					}
				}else{
					if (num.indexOf(':') == -1){
						if (typeof this.current.opacity == 'undefined'){
							num = num+":"+num;
						}else{
							num = num+":"+this.current.opacity;
						}
					}
				}
			}
			num = this.checkMoving(num,start);
			if (typeof num == 'undefined' || num === "undefined"){
				if (this.getCurrentValue('transTime') > 0){
					if (typeof this.current.opacity == 'undefined'){
						if (start == 'from'){
							return "0";
						}else if (start == 'to'){
							return "255";
						}else{
							return "0";
						}
					}else{
						if (start == 'from'){
							return this.current.opacity;
						}else if (start == 'to'){
							return "255";
						}else{
							return this.current.opacity;
						}
					}

				}else if (this.getCurrentValue('transTime') == 0){
					return "255";
				}else{
					return "255";
				}
			}else{
				return num;
			}
		},
		checkMoving : function(a,b){
			if (typeof a == 'undefined'){
				return a;
			}
			var checkMoving = a.indexOf(':');
				if (checkMoving != -1){
					if (b == 'to'){
						return a.substr(0,checkMoving)
					}else if(b == 'from'){
						return a.substr(checkMoving+1);
					}else{
						return true;
					}
				}else{
					return a;
				}
		},
		getLeft : function(position,start,set){
			if (!set){
				if (typeof position == 'undefined'){
					if (typeof this.current.left == 'undefined'){
						position = position+":"+position;
					}else{
						position = this.current.left+":"+this.current.left;
					}
				}else{
					if (position.indexOf(':') == -1){
						if (typeof this.current.left == 'undefined'){
							position = position+":"+position;
						}else{
							position = position+":"+this.current.left;
						}
					}
				}
			}
			position = this.checkMoving(position,start);
			if (!isNaN(position)){
				//数値なら直接位置指定
				return position;
			}else{
				var layers = this.getCurrentValue('page')+'Layers';
				switch (position){
					case '左外' :
						return Math.round((0 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '左奥' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '左' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*2 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '左中' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*3 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '中' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth') - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '右中' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*5 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '右' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*6 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '右奥' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*7 - o2[layers].baseLayer.getImageRect(0).width)/2);
					case '右外' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*8 - o2[layers].baseLayer.getImageRect(0).width)/2);
					default :
						if (typeof this.current.left == 'undefined'){
							return Math.round((f.ghostpia.constant.getValue('displayWidth') - o2[layers].baseLayer.getImageRect(0).width)/2);
						}else{
							return Math.round(this.current.left);
						}
				}
			}
		},
		getTop : function(position,start,set){
			if (!set){
				if (typeof position == 'undefined'){
					if (typeof this.current.top == 'undefined'){
						position = position+":"+position;
					}else{
						position = this.current.top+":"+this.current.top;
					}
				}else{
					if (position.indexOf(':') == -1){
						if (typeof this.current.top == 'undefined'){
							position = position+":"+position;
						}else{
							position = position+":"+this.current.top;
						}
					}
				}
			}
			position = this.checkMoving(position,start);
			if (!isNaN(position)){
				//数値なら直接位置指定
				return position;
			}else{
				var layers = this.getCurrentValue('page')+'Layers';
				switch (position){
					case '上端' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*-2 - o2[layers].baseLayer.getImageRect(0).height)/2);
					case '上' :
						return Math.round((0 - o2[layers].baseLayer.getImageRect(0).height)/2);
					case '上中' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*2 - o2[layers].baseLayer.getImageRect(0).height)/2);
					case '中' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight') - o2[layers].baseLayer.getImageRect(0).height)/2);
					case '下中' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*4 - o2[layers].baseLayer.getImageRect(0).height)/2);
					case '下' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*6 - o2[layers].baseLayer.getImageRect(0).height)/2);
					case '下端' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*8 - o2[layers].baseLayer.getImageRect(0).height)/2);
					default :
						if (typeof this.current.top == 'undefined'){
							return Math.round((f.ghostpia.constant.getValue('displayHeight') - o2[layers].baseLayer.getImageRect(0).height)/2);
						}else{
							return Math.round(this.current.top);
						}
				}
			}
		},
		getMovePath : function(x,y,opacity){
			var x1 = Math.round(this.getLeft(x,'from'));
			var x2 = Math.round(this.getLeft(x,'to'));
			var y1 = Math.round(this.getTop(y,'from'));
			var y2 = Math.round(this.getTop(y,'to'));
			var opa1 = this.getOpacity(opacity,'from');
			var opa2 = this.getOpacity(opacity,'to');
			return "("+x1+","+y1+","+opa1+")("+x2+","+y2+","+opa2+")";
		},
		getAccel : function(num){
			if (typeof num == 'undefined'){
				return 0;
			}else{
				return num;
			}
		},


		setStorage : function(sto){
			if (!sto){
				if (typeof this.current.storage == 'undefined'){
	//						console.warn("setStorage : storage属性の指定がありません");
				}
			}else{
				if (typeof this.current.diff == 'undefined'){
					return sto;
				}else{
					return sto + '_' + this.current.diff;
				}
			}
		},
		setDiff : function(timezone,name){
			switch (timezone){
				case 'dawn':
				case '明け方':
					if (this.bgList[name].dawn){
						this.current.diff = 'dawn';
					}else{
						this.current.diff = this.bgList[name].default;
					}
					break;
				case 'night':
				case '夜':
					if (this.bgList[name].night){
						this.current.diff = 'night';
					}else{
						this.current.diff = this.bgList[name].default;
					}
					break;
				case 'normal':
				case '電気':
					if (this.bgList[name].normal){
						this.current.diff = 'normal';
					}else{
						this.current.diff = this.bgList[name].default;
					}
					break;
				default:
					if (this.bgList[name][timezone]){
						this.current.diff = timezone;
					}else{
						this.current.diff = this.bgList[name].default;
					}
					break;
			}
		},
		setTransTime : function(time){
			if (typeof time == 'undefined'){
				this.current.transTime = f.ghostpia.constant.getValue('transTime');
			}else{
				this.current.transTime = time;
			}
		},
		setTransType : function(type){
			if (typeof type == 'undefined'){
				this.current.transType = 'crossfade';
			}else{
				switch (type) {
					case 'noise':
					case 'ノイズ':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noise';
						break;
					case 'noiseline':
					case '走査線':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noiseline';
						break;
					case '左から右':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noiseline_left';
						break;
					case '右から左':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noiseline_right';
						break;
					case 'pastel':
					case 'パステル':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_pastel';
						break;
					case 'circleout':
					case '円外から':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noizecircle_out';
						break;
					case 'circlein':
					case '円内から':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noizecircle_in';
						break;
					case 'circleright':
					case '円右回転':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noizecircle_right';
						break;
					case 'circleleft':
					case '円左回転':
						this.current.transType = 'universal';
						this.current.transRule = 'rule_noizecircle_left';
						break;
					case 'crossfade':
					case 'クロス':
					default:
						this.current.transType = 'crossfade';
						break;
				}
			}
		},
		setPage : function(page,storage){
			if (!page){
				if (typeof storage == 'undefined'){
					this.current.page = 'fore';
				}else{
					this.current.page = 'back';
				}
			}else{
				this.current.page = page;
			}
		},
		setVisible : function(visible){
			if (!visible){
				this.current.visible = true;
			}else{
				this.current.visible = visible;
			}
		},
		setTop : function(y){
			this.current.top = y;
		},
		setLeft : function(x){
			this.current.left = x;
		},
		setOpacity : function(opacity){
			if (typeof opacity == 'undefined'){
				this.current.opacity = 0;
			}else{
				this.current.opacity = opacity;
			}
		},
		setBlur : function(blur,blurX,blurY,blurMode){
			if (typeof blur == 'undefined'){
				this.current.o2_blur = undefined;
			}else{
				this.current.o2_blur = blur;
			}
			if (typeof blurX == 'undefined'){
				this.current.o2_blurX = blur;
			}else{
				this.current.o2_blurX = blurX;
			}
			if (typeof blurY == 'undefined'){
				this.current.o2_blurY = blur;
			}else{
				this.current.o2_blurY = blurY;
			}
			if (typeof blurMode == 'undefined'){
				this.current.o2_blurMode = 'constantalpha';
			}else{
				this.current.o2_blurMode = blurMode;
			}
		}
	}

	f.ghostpia.baseLayerManager = new GhostpiaBaseManager();

})();