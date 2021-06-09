/**
 * ページをリロードしてからロードする機能とリロードするプラグインです
 * 
 * 使い方：
 * まずはシナリオに[apply_reload_load]タグを追加します。
 * リロードしたらマクロがなくなりますので、一番いいところはマクロが全部定義されたあと、そしてゲームに入る前です。
 * このタグが実行されたら前回のデータをロードします。
 *
 * loadタグ：
 * loadのreload属性がtrueの時リロードします。
 *
 * reloadタグ：
 * [reload] 属性はないです。
 *
 * セーブタグとロードタグを使ってますので、セーブできない状態では使えないです、
 * 例えばo2.SERVER_MODE_O2SERVERの時で、ログインしてない状態と、private modeのmobile safariとか。
 */
(function(){
	var localStorageTempKey = 'reload_load_temp',
		reloadTempSlot = -1,
		registered = false;

	function setDataAfterReload(data){
		localStorage[ localStorageTempKey ] = JSON.stringify(data);
	}
	function readAndRemoveDataBeforeReload(){
		var data;
		try{
			data = JSON.parse(localStorage[ localStorageTempKey ]);
		}catch(e){}
		delete localStorage[ localStorageTempKey ];
		return data;
	}

	function reloadPage(){
		// node-webkit
		try{
			require('nw.gui').Window.get().reload(3);
			return;
		}catch(e){}
		if( window.GAJavaScript ){
			GAJavaScript.performSelector('reloadWebview:', 1)
		} else {
			location.reload();
		}
	}

	Tag.actions.apply_reload_load = new TagAction({
		rules : {
			data : {defaultValue : readAndRemoveDataBeforeReload()}
		},
		action : function (args) {
			registered = true;

			if( !args.data )return 0;

			if( args.data.slot !== undefined ){
				var loadTag = new Tag('load',{
					place : args.data.slot
				});
				this.conductor.queue.push( loadTag );

				if( args.data.slot == reloadTempSlot ){
					var _conductor = this.conductor;
					$(_conductor).one('ran',function(){
						_conductor.queue.push( new Tag('erasebookmark',{
							place : reloadTempSlot
						}));
						if( args.data.autoMode ){
							_conductor.queue.push( new Tag('o2_enterautomode') );
						}
						if( args.data.skipMode ){
							o2.skipMode = args.data.skipMode;
						}
					});
				}
			}
			return 0;
		}
	});

	Tag.actions.reload = new TagAction({
		action : function (args){

			setDataAfterReload({
				slot : reloadTempSlot,
				autoMode : o2.autoMode,
				skipMode : o2.skipMode
			});

			saveCurrentState();
			var saveTag = new Tag('save',{
				place : reloadTempSlot
			});
			conductor.queue.push( saveTag );
			conductor.queue.push( new Tag('_reload_page') );

			return 0;
		},
		setDataAfterReload : setDataAfterReload
	});

	Tag.actions._reload_page = new TagAction({
		action : function () {
			reloadPage();
			return 1;
		}
	});

	var originalAction = Tag.actions.load.action;
	$.extend(true,Tag.actions.load,{
		rules : {
			reload : {type : "BOOLEAN",defaultValue : false}
		},
		action : function( args ){
			if( args.reload ){
				if( !registered ){
					console.warn('[apply_reload_load]は一回も実行されなかったので、ここは無視させます。');
					return 0;
				}
				setDataAfterReload({
					slot : args.place
				});
				reloadPage();

				return 1;
			}
			return originalAction.apply( this, arguments );
		}
	});
	
})();