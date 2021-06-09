var GhostpiaSounds;
(function(){
/*

	soundManager.js
	BGM・SEを扱う系メソッド

*/

	GhostpiaSounds = function(){
		this._buf = [
			{ storage : undefined, volume : 100, fadeTime : 0, loop : false },
			{ storage : undefined, volume : 100, fadeTime : 0, loop : false },
			{ storage : undefined, volume : 100, fadeTime : 0, loop : false }
		];
	}

	GhostpiaSounds.prototype = {
		initializer : "GhostpiaSounds",
		checkBuf : function(buf){
			if (!isNaN(Number(buf))){
				return Number(buf);
			}else{
				return 0;
			}
		},
		getBuf : function(buf){
			return this.checkBuf(buf);
		},
		getValue : function(key,buf){
			var bufId = this.checkBuf(buf);
			return this._buf[bufId][key];
		},
		setStorage : function(storage,buf){
			var bufId = this.checkBuf(buf);
			this._buf[bufId].storage = storage;
		},
		setVolume : function(vol,buf){
			var bufId = this.checkBuf(buf);
			if (typeof vol == 'undefined' || vol.length == 0){
				this._buf[bufId].volume = 100;
			}else{
				this._buf[bufId].volume = vol;
			}
		},
		setFadeTime : function(num,type,buf){
			var bufId = this.checkBuf(buf);
			if (typeof num == 'undefined' || num.length == 0){
				switch (type){
					case 'stop':
						this._buf[bufId].fadeTime = 500;
						break;
					case 'xfade':
						this._buf[bufId].fadeTime = 3000;
						break;
					case 'play':
						this._buf[bufId].fadeTime = 0;
						break;
					default:
						this._buf[bufId].fadeTime = 500;
						break;
				}
			}else{
				this._buf[bufId].fadeTime = num;
			}
		},
		setLoop : function(boolean,buf){
			var bufId = this.checkBuf(buf);
			if (typeof boolean == 'undefined' || boolean.length == 0){
				this._buf[bufId].loop = false;
			}else{
				this._buf[bufId].loop = boolean;
			}
		}
	}


f.ghostpia.soundManager = new GhostpiaSounds();
f.ghostpia.seManager = new GhostpiaSounds();

})();