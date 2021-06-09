var Ghostpia;
(function(){
/*

	┌─┐┬ ┬┌─┐┌─┐┌┬┐┌─┐┬┌─┐  ┬┌─┐
	│ ┬├─┤│ │└─┐ │ ├─┘│├─┤  │└─┐
	└─┘┴ ┴└─┘└─┘ ┴ ┴  ┴┴ ┴o└┘└─┘

	初期設定等してます

*/
	Ghostpia = function(){};
	Ghostpia.prototype = {
		initializer: "Ghostpia",
		importFromSaveData: function(data) {
			var _this = this;
			return $.when(data.constant.restore())
			.then(function(constant){
				_this.constant = constant;
				delete data.constant;
			})
			.then(function(messageLayerManager){
				_this.messageLayerManager = new GhostpiaMessageManager(_this.constant);
				_this.messageLayerManager.importFromSaveData(data.GhostpiaMessageManager);
			})
			.then(function(){
				return Object.prototype.importFromSaveData.call(_this, data);
			})
		}
	};

	f.ghostpia = new Ghostpia();

	tf.tmp = {
		//ghostpia version
		version : "4.0.1",
		//最新話の番号
		newer_story : 4,
		//tweet用URL
		twiurl : "http://ghostpia.xyz/",
		//tweet用ゲームアドレス
		twiurl_ns : "http://novelsphere.jp/"+config.gameID+"/",
		itunesurl : "https://itunes.apple.com/jp/album/terminus-collected-pieces/id1017609025?app=itunes",
		//novelsphereで公開する章の番号。
		storyopen : 0,
		//novelsphereでチャプターを最初からオープンにしとく場合の、オープンにしておく数。
		//-1が指定されるとstoryopenで指定された章の全チャプターがオープンになる。
		chapopen : 0,
		//2.33333話など、メニュー画面を挟まずにスタートする場合は、直接始めるファイル名
		//falseを指定すれば通常どおり始まる
		direct_start : false,
		//デバッグ時に指定のファイルをいきなり始めるショートカット。
		//falseを指定すれば通常どおり始まる
		//例： tf.tmp.debug_skip_file = false;
		debug_skip_file : false,
		//指定のラベルから始めたい時はこっちも。
		//ファイルの冒頭から始めたい時は "*start" を指定すること。
		debug_skip_target : "*start",
		//reload機能を使用する場合はtrue
		reload : false,
		tagInSpeak : {},
		//[ls]タグでのsave機能をオンにするかしないかの設定
		save_mode : true,
		//novelsphereで公開する場合はここをtrueに
		novelsphere : false,
		//debugモードをオンにすると、openingなど時間のかかる処理を飛ばします
		debug_mode : false
	};

	//debug 用 3話から始めたい場合はコメントアウトをはずす
	// sf.ghostpia_chapter = [14,25,18];
	// sf.ghostpia_finish_story = 3;
	// sf.ghostpia_story = 3;

	o2.se[0].setVolume(1)
	o2.se[1].setVolume(1)
	o2.se[2].setVolume(1)

// ----------------------------------------
// sf.ghostpia_story
// 現在どの話まで解放したかという情報を保持する。
// 読了とは違うので注意。
// 一度繰り上がったら下がることはない（story3の後にstory1を見ても値は3のまま）

	//定義されていなければ定義する
	if (typeof sf.ghostpia_story == 'undefined'){
		sf.ghostpia_story = 0;
	}

// ----------------------------------------
// sf.ghostpia_chapter
// どのチャプターまで解放したかという情報を保持する。
// 一話から最新話までの配列。
// 一度繰り上がったら下がることはない（chapter3の後にchapter1を見ても値は3のまま）

	//定義されていなければ定義する
	if (typeof sf.ghostpia_chapter == 'undefined'){
		sf.ghostpia_chapter = [];
		for (var i = 0; i < tf.tmp.newer_story; i++) {
			sf.ghostpia_chapter[i] = 0;
		}
	}
	//まだ配列でないのであれば配列にする（初期版との互換性のため）
	if (sf.ghostpia_chapter instanceof Array == false) {
		sf.ghostpia_chapter = [sf.ghostpia_chapter];
		for (var i = 1; i < tf.tmp.newer_story; i++) {
			sf.ghostpia_chapter[i] = 0;
		}
	}
	// 最新話分の配列が足りなければ追加する
	if (sf.ghostpia_chapter.length != tf.tmp.newer_story) {
		sf.ghostpia_chapter[tf.tmp.newer_story-1] = 0;
	}

// ----------------------------------------
// sf.ghostpia_finish_story
// 何話まで「読了したか」という情報を保持する。

	//定義されていなければ定義する
	if (typeof sf.ghostpia_finish_story == 'undefined'){
		sf.ghostpia_finish_story = 0;
	}

// ----------------------------------------
// f.ghostpia_reading
// セーブデータ毎に見たときに、そのセーブデータ上で
// 現在どの話を読んでいるかという情報を保持する。

	//定義されていなければ定義する
	if (typeof f.ghostpia_reading == 'undefined'){
		if (tf.tmp.novelsphere == true){
			f.ghostpia_reading_story = tf.tmp.storyopen;
		}else{
			f.ghostpia_reading_story = 0;
		}
	}

// sf.ghostpia_reading_story
// アプリ全体として、現在どの話を読んでいるかという情報を保持する。
// タイトル画面でどの章のKVを表示するかの判定に使ったりする。
// （タイトル画面は、今読んでいる章 or 次に読むべき章のKVが表示される仕様）

	//app用今読んでいる章　メニュー画面などで使用
	// if (typeof sf.ghostpia_reading_story == 'undefined'){
	if (tf.tmp.novelsphere == true){
		sf.ghostpia_reading_story = tf.tmp.storyopen;
	}else{

		// まだひとつも読了していない場合は、1章だけ表示
		if (sf.ghostpia_finish_story == 0){
			sf.ghostpia_reading_story = 1;

		// １つ以上読了しているなら、次の話を読んでいることと見做す
		}else{

			// 現在配信中の最新話を読了していない場合は、次の話を読んでいることと見做す
			if (sf.ghostpia_finish_story != tf.tmp.newer_story) {
				sf.ghostpia_reading_story = sf.ghostpia_finish_story+1;

			// 最新話を読了している場合は、最新話のままとする
			}else{
				sf.ghostpia_reading_story = sf.ghostpia_finish_story;
			}
		}
	}
	// }

// ----------------------------------------
// sf.ghostpia_dontload_autosave
//起動時にautosaveを読み込むかを判定するフラグ

	if (typeof sf.ghostpia_dontload_autosave == 'undefined'){
		sf.ghostpia_dontload_autosave = false;
	}

// ----------------------------------------
//savedata_check
	tf.tmp.qsavedataCheck = ev.save.date[0];
	tf.tmp.savedataCheck = ev.save.date[1];

// ----------------------------------------
//debug_modeがtrueならconsoleを吐き出す

	if (tf.tmp.debug_mode){
		o2.debugLevel=4;
	}

})();