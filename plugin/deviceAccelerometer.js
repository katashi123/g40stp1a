/*
# ghostpiaAccelerometer

指定したIDのレイヤーについて、スマホの傾き検知によってレイヤー移動をさせる。

## メソッド
- setHandler(array, int)
  - 指定したレイヤーにイベントを設定する

- removeListener(key)
  - イベントを解除する

## 使い方

### イベントを設定する

[o2_iscript]
var hoge = ghostpiaAccelerometer.setHandler([
	{id:1, ratio:0.2},
	{id:2, ratio:0.7},
	{id:3, ratio:0.9},
	{id:4, ratio:0.2}
]);
[o2_endscript]

hoge は傾き検知のイベントを終了させる時に必要になるため、初期化されたりしないように注意する。
アプリを終了＆再起動すると変数は初期化されてしまうので、
この機能を使う場合は、なるべくセーブラベルを跨がないようにする。

setHandlerにわたす配列の中にはオブジェクトを入れる。
idはレイヤー番号、ratioは傾きの値に対して、どのくらいの倍率動かすかを指定する。
ratio:1 の場合は傾き値がそのまま影響するし、
ratio:0.5 の場合は傾き値の1/2の量だけ影響する。


### イベントを解除する

[o2_iscript]
ghostpiaAccelerometer.removeListener(hoge);
[o2_endscript]

イベントを設定する時に定義した hoge を引数に渡す。

*/
(function(){
	deviceAccelerometerHandler = function(){
		this.events = {};
		this.key = 0;

		// directionチェックの振り分け
		if (ua.os == 'ios'){
			window.onorientationchange = this.directionCheck;
		} else if (ua.os == 'android'){
			window.onresize = this.directionCheck;
		} else {
			window.onmousemove = this.handleMouseMove;
		}
		// directionチェック
		this.directionCheck = function() {
			var direction = '';
			switch (window.orientation) {
				case 90:
					// 横持ち　ホームボタンが右
					direction = 1
					break;
				case -90:
					// 横持ち　ホームボタンが左
					direction = -1
					break;
				default:
					// 縦持ち
					direction = 0;
			}
			return direction;
		}
		this.handleMouseMove = function(e) {
			console.log(event.clientX);
      return event.clientX;
		}

		// layers にはobjectを渡す
		// ratio は diveceorient の値にかける割合
		// 例：　layers = [{id:0, ratio:1.4, offset: -68}, {id:1, ratio:1, offset: -50}]
		this.eventListener = function (e, layers){
			// 横持ちのどちら持ちか
			var direction = this.directionCheck();
			// 傾きの量（ホームボタン側に傾けると＋の値）にdirectionを掛ける
			// 縦持ちだと 0 になる
			if ((ua.os != 'ios')&&(ua.os != 'android')) {
				// PCの場合
				var deviceorient = this.handleMouseMove(e);
			}else{
				var deviceorient = e.beta * direction;
			}

			var offset;
			// レイヤー操作
			for (var i = 0; i < layers.length; i++) {
				// 画像左右の余分幅（移動可能最大量）
				offset = typeof layers[i].offset !== 'undefined' ?  layers[i].offset : -68;
				if (Math.abs(deviceorient) + offset >= 0){
					if (deviceorient < 0){
						deviceorient = offset;
					}else{
						deviceorient = offset*-1;
					}
				}
				o2.foreLayers.imageLayers[f.ghostpia.imageLayerManager.getLayerNumById(layers[i].id)].rect.x = offset + deviceorient*layers[i].ratio
				o2.backLayers.imageLayers[f.ghostpia.imageLayerManager.getLayerNumById(layers[i].id)].rect.x = offset + deviceorient*layers[i].ratio
			}
		}
		this.addListener = function(target, type, listener, capture) {
			// var target = typeof target !== 'undefined' ? target : eventTarget;
			// var type = typeof type !== 'undefined' ? type : eventType;
			// var listener = typeof listener !== 'undefined' ? listener : eventListener;
			// var capture = typeof capture !== 'undefined' ? capture : eventCapture;

			target.addEventListener(type, listener, capture);
			this.events[this.key] = {
					target: target,
					type: type,
					listener: listener,
					capture: capture
			};
			return this.key++;
		}
		this.removeListener = function(key) {
			if(key in this.events) {
					var e = this.events[key];
					e.target.removeEventListener(e.type, e.listener, e.capture);
			}
		}
		this.setHandler = function(layers, imageOffset) {
			var _this = this;
			return this.addListener(window, 'deviceorientation', function(e) {
				_this.eventListener(e, layers, imageOffset)
			}, false);
		}
	}

	ghostpiaAccelerometer = new deviceAccelerometerHandler();
})();