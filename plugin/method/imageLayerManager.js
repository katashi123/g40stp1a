var GhostpiaImageManager;
(function(){
/*

	imageLayerManager.js
	画像を扱う系メソッド

*/

	GhostpiaImageManager = function(){

		this.current = {
			layerNum : config.numImageLayers,
			layer : [],
			beginTrans : undefined,
			transType : undefined,
			transRule : undefined,
			activeLayer : undefined
		};
		this.layer = [];
		f.current = this.current;
	}

	GhostpiaImageManager.prototype = {
		initializer : "GhostpiaImageManager",
		//各レイヤーで操作できる属性を追加
		addOptions : function(num){
			return this.layer[num] = {
				id : undefined,
				index : undefined,
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
				transTime : undefined
			};
		},
		//一番大きい番号にレイヤーを追加
		addLayer : function(){
			this.addOptions(this.current.layerNum);
			this.current.layerNum++;
		},
		removeLayer : function(start,option){
			this.layer.splice(start,1);
			this.current.layerNum--;
			o2.foreLayers.imageLayers.splice( start, 1 );
			o2.backLayers.imageLayers.splice( start, 1 );
			if (option){
				this.addOptions(this.current.layerNum);
				this.current.layerNum++;
				o2.foreLayers.imageLayers.push( new ImageLayer() );
				o2.backLayers.imageLayers.push( new ImageLayer() );
			}else{
			}
			o2.refreshRendererLayers();
			renderer.animator.requestFrame();
		},

		getCurrentValue : function(key){
			return this.current[key];
		},
		getLayerValue : function(key,num){
			return this.layer[num][key];
		},

		getBlur : function(key){
			return this.layer[this.current.activeLayer][key];
		},


		//使われていないレイヤー（visible != true）を検出
		getNotUsingLayer : function(){
			for (var i = 0; i < this.current.layerNum-3; i++) {
				if (!this.layer[i+3].visible){
					//検出した時点でリターン
					return i+3;
				}
			};
			//全部使われてたら、自動的にレイヤーを追加する
			this.addLayer();
			return this.current.layerNum-1;
		},
		getLayCountNumCheck : function(sign){
			switch (sign){
				case '<':
					//計算上のレイヤー数と、実際のレイヤー数が合ってるか照らしあわせる
					if (o2.foreLayers.imageLayers.length < this.current.layerNum){
						//計算上のほうが多い場合は[laycount]を行ってレイヤー数増やす
						return true;
					}else{
						return false;
					}
				case '>':
					//計算上のレイヤー数と、実際のレイヤー数が合ってるか照らしあわせる…けど、ずれるおそれはないので、
					//最低値を下回っていなければレイヤー数減らす true
					if (this.current.layerNum > config.numImageLayers){
						return true;
					}else{
						return false;
					}
			}
		},
		getLayerIndex : function(){
			return this.layer[this.current.activeLayer].index;
		},
		//IDを元にレイヤー番号を割り出す
		getLayerNumById : function(num){
			for (var i = 0; i < this.current.layerNum-3; i++) {
			//	console.log('[getLayerNumById('+num+') >>> i:'+i+', layer['+(i+3)+'].ID:'+this.layer[i+3].id+', current.layerNum-3:'+(current.layerNum-3)+']')
				if (this.layer[i+3].id == num){
					//検出した時点でリターン
			//		console.log('return '+(i+3));
					return i+3;
				}
			};
			//console.log('return undefined');
			return undefined;
		},
		//渡された引数（ID）が現在使われているかをチェック　返り値はtrue or false
		checkUsingId : function(num){
			for (var i = 0; i < this.current.layerNum-3; i++) {
				if (this.layer[i+3].id == num){
					//検出した時点でリターン
					return true;
				}
			};
			return false;
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
					if (typeof this.layer[this.current.activeLayer].left == 'undefined'){
						position = position+":"+position;
					}else{
						position = this.layer[this.current.activeLayer].left+":"+this.layer[this.current.activeLayer].left;
					}
				}else{
					if (position.indexOf(':') == -1){
						if (typeof this.layer[this.current.activeLayer].left == 'undefined'){
							position = position+":"+position;
						}else{
							position = position+":"+this.layer[this.current.activeLayer].left;
						}
					}
				}
			}
			position = this.checkMoving(position,start);
			if (!isNaN(position)){
				//数値なら直接位置指定
				return position;
			}else{
				var layers = this.getLayerValue('page',this.current.activeLayer)+'Layers';
				switch (position){
					case '左外' :
						return Math.round((0 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '左奥' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '左' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*2 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '左中' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*3 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '中' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth') - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '右中' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*5 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '右' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*6 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '右奥' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*7 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					case '右外' :
						return Math.round((f.ghostpia.constant.getValue('displayWidth')/4*8 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
					default :
						if (typeof this.layer[this.current.activeLayer].left == 'undefined'){
							return Math.round((f.ghostpia.constant.getValue('displayWidth') - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).width)/2);
						}else{
							return Math.round(this.layer[this.current.activeLayer].left);
						}
				}
			}
		},
		getTop : function(position,start,set){
			if (!set){
				if (typeof position == 'undefined'){
					if (typeof this.layer[this.current.activeLayer].top == 'undefined'){
						position = position+":"+position;
					}else{
						position = this.layer[this.current.activeLayer].top+":"+this.layer[this.current.activeLayer].top;
					}
				}else{
					if (position.indexOf(':') == -1){
						if (typeof this.layer[this.current.activeLayer].top == 'undefined'){
							position = position+":"+position;
						}else{
							position = position+":"+this.layer[this.current.activeLayer].top;
						}
					}
				}
			}
			position = this.checkMoving(position,start);
			if (!isNaN(position)){
				//数値なら直接位置指定
				return position;
			}else{
				var layers = this.getLayerValue('page',this.current.activeLayer)+'Layers';
				switch (position){
					case '上端' :
						return Math.round((0 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height)/2);
					case '上' :
						return 0;
					case '上中' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*2 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height)/2);
					case '中' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight') - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height)/2);
					case '下中' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*4 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height)/2);
					case '下' :
						return Math.round(f.ghostpia.constant.getValue('displayHeight') - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height);
					case '下端' :
						return Math.round((f.ghostpia.constant.getValue('displayHeight')/3*6 - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height)/2);
					default :
						if (typeof this.layer[this.current.activeLayer].top == 'undefined'){
							return Math.round((f.ghostpia.constant.getValue('displayHeight') - o2[layers].imageLayers[this.current.activeLayer].getImageRect(0).height)/2);
						}else{
							return Math.round(this.layer[this.current.activeLayer].top);
						}
				}
			}
		},
		getZoom : function(position,start,set){
			if (!set){
				if (typeof position == 'undefined'){
					if (typeof this.layer[this.current.activeLayer].o2_zoom == 'undefined'){
						position = position+":"+position;
					}else{
						position = this.layer[this.current.activeLayer].o2_zoom+":"+this.layer[this.current.activeLayer].o2_zoom;
					}
				}else{
					if (position.indexOf(':') == -1){
						if (typeof this.layer[this.current.activeLayer].o2_zoom == 'undefined'){
							position = position+":"+position;
						}else{
							position = position+":"+this.layer[this.current.activeLayer].o2_zoom;
						}
					}
				}
			}
			position = this.checkMoving(position,start);
			if (!isNaN(position)){
				//数値なら直接位置指定
				return position;
			}else{
				return "100";
			}
		},

		getOpacity : function(num,start,set){
			if (!set){
				if (typeof num == 'undefined'){
					if (typeof this.layer[this.current.activeLayer].opacity == 'undefined'){
						num = num+":"+num;
					}else{
						num = this.layer[this.current.activeLayer].opacity+":"+this.layer[this.current.activeLayer].opacity;
					}
				}else{
					if (num.indexOf(':') == -1){
						if (typeof this.layer[this.current.activeLayer].opacity == 'undefined'){
							num = num+":"+num;
						}else{
							num = num+":"+this.layer[this.current.activeLayer].opacity;
						}
					}
				}
			}
			num = this.checkMoving(num,start);
			if (typeof num == 'undefined' || num === "undefined"){
				if (this.getLayerValue('transTime',this.current.activeLayer) > 0){
					if (typeof this.layer[this.current.activeLayer].opacity == 'undefined'){
						if (start == 'from'){
							if (this.current.beginTrans){
								return "255";
							}else{
								if (typeof this.current.transType == 'undefined'){
									return "0";
								}else{
									return "255";
								}
							}
						}else if (start == 'to'){
							return "255";
						}else{
							return "0";
						}
					}else{
						if (start == 'from'){
							return this.layer[this.current.activeLayer].opacity;
						}else if (start == 'to'){
							return "255";
						}else{
							return this.layer[this.current.activeLayer].opacity;
						}
					}

				}else if (this.getLayerValue('transTime',this.current.activeLayer) == 0){
					return "255";
				}else{
					return "255";
				}
			}else{
				return num;
			}
		},
		getMovePath : function(x,y,opacity,z,r){
			var x1 = Math.round(this.getLeft(x,'from'));
			var x2 = Math.round(this.getLeft(x,'to'));
			var y1 = Math.round(this.getTop(y,'from'));
			var y2 = Math.round(this.getTop(y,'to'));
			var opa1 = this.getOpacity(opacity,'from');
			var opa2 = this.getOpacity(opacity,'to');
			var z1 = Math.round(this.getZoom(z,'from'));
			var z2 = Math.round(this.getZoom(z,'to'));
			var rotate = typeof r == 'undefined' ? 0 : r;
			return "("+x1+","+y1+","+opa1+","+z1+")("+x2+","+y2+","+opa2+","+z2+","+rotate+")";
		},
		getAccel : function(num,start){
			if (typeof num == 'undefined'){
				return 0;
			}else{
				return num;
			}
		},



		setActiveLayer : function(num){
			this.current.activeLayer = num;
		},
		setId : function(num){
			if (!num){
	//					console.warn("setId : id属性の指定がありません");
			}else{
				this.layer[this.current.activeLayer].id = num;
			}
		},
		setLayerIndex : function(num){
			this.layer[this.current.activeLayer].index = (Number(num)+1)*1000;
		},
		setStorage : function(storage){
			if (!storage){
				if (typeof this.layer[this.current.activeLayer].storage == 'undefined'){
	//						console.warn("setStorage : storage属性の指定がありません");
				}
			}else{
				this.layer[this.current.activeLayer].storage = storage;
			}
		},
		setTransTime : function(time){
			if (typeof time == 'undefined'){
				this.layer[this.current.activeLayer].transTime = f.ghostpia.constant.getValue('transTime');
			}else{
				this.layer[this.current.activeLayer].transTime = time;
			}
		},
		setTransType : function(type){
			if (typeof type == 'undefined'){
				this.current.transType = undefined;
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
						this.current.transType = undefined;
						break;
				}
			}
		},
		setPage : function(page,type,transtype){
			if (typeof page == 'undefined'){
				if (type == 'new'){
					this.layer[this.current.activeLayer].page = 'back';
				}else if (type == 'move'){
					this.layer[this.current.activeLayer].page = 'fore';
				}else if (type == 'del'){
					this.layer[this.current.activeLayer].page = 'back';
				}else{
					this.layer[this.current.activeLayer].page = 'fore';
				}
			}else{
				this.layer[this.current.activeLayer].page = page;
			}
		},
		setVisible : function(visible){
			if (!visible){
				this.layer[this.current.activeLayer].visible = true;
			}else{
				this.layer[this.current.activeLayer].visible = visible;
			}
		},
		setTop : function(y){
			this.layer[this.current.activeLayer].top = y;
		},
		setLeft : function(x){
			this.layer[this.current.activeLayer].left = x;
		},
		setZoom : function(z){
			this.layer[this.current.activeLayer].o2_zoom = z;
		},
		setOpacity : function(opacity){
			if (typeof opacity == 'undefined'){
				this.layer[this.current.activeLayer].opacity = 0;
			}else{
				this.layer[this.current.activeLayer].opacity = opacity;
			}
		},
		setBacklay : function(num){
			if (this.layer[this.current.activeLayer].page == 'back'){
				this.layer[this.current.activeLayer].page = 'fore';
			}
		},
		setBeginTrans : function(boolean){
			this.current.beginTrans = boolean;
		},
		//レイヤー初期化…レイヤー数分だけoptionの配列を作成
		setUpLayers : function(){
			for (var i = 3; i <= this.current.layerNum-1; i++) {
				this.addOptions(i);
			};
		},
		setBlur : function(blur,blurX,blurY,blurMode){
			if (typeof blur == 'undefined'){
				this.layer[this.current.activeLayer].o2_blur = undefined;
			}else{
				this.layer[this.current.activeLayer].o2_blur = blur;
			}
			if (typeof blurX == 'undefined'){
				this.layer[this.current.activeLayer].o2_blurX = blur;
			}else{
				this.layer[this.current.activeLayer].o2_blurX = blurX;
			}
			if (typeof blurY == 'undefined'){
				this.layer[this.current.activeLayer].o2_blurY = blur;
			}else{
				this.layer[this.current.activeLayer].o2_blurY = blurY;
			}
			if (typeof blurMode == 'undefined'){
				this.layer[this.current.activeLayer].o2_blurMode = 'constantalpha';
			}else{
				this.layer[this.current.activeLayer].o2_blurMode = blurMode;
			}
		}
	}
	// f.current を使わなくてもいいはずなんだけど、セーブの互換性を取るためには、importfromsavedata() でf.currentの値を拾ってこなきゃいけないかも？
	// GhostpiaImageManager.prototype.importFromSaveData = function(data){
	// 	var _this = this;
	// 	return $.when(data)
	// 		.then(function(current){
	// 			// _this.current = f.current;
	// 			// delete f.current;
	// 		})
	// 		.then(function(){
	// 			return Object.prototype.importFromSaveData.call(_this, data);
	// 		})
	// }


	f.ghostpia.imageLayerManager = new GhostpiaImageManager();
	// f.ghostpia.imageLayerManager.layer = [];
	f.ghostpia.imageLayerManager.setUpLayers();

})();
