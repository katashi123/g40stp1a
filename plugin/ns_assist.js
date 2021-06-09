Tag.actions.ns_checklogin = new TagAction({
	rules:{
		storage : {type:"STRING"},
		target  : {type:"STRING"}
	},
	action: function( args ){

		var _this = this;

		setTimeout(function(){
			Renderer.askForLogin().fail(function(){

				if( args.storage || args.target ){
					var jumpTag = new Tag('jump',{
						storage : args.storage,
						target  : args.target
					});
					currentConductor.queue.push( jumpTag );
				}

			}).always(function(){
				_this.done();
			});
		});

		return 1;
	}
});

(function(){

	if( o2.serverStat.mode != o2.SERVER_MODE_O2SERVER ){
		return;
	}

	/**
	 * ns_assist_init 
	 * これはscriptを作る時呼ばれるfunctionです。
	 * このfunctionはネイティブアプリのためにあります。
	 * ウェブでscriptをロードするとcookieと一緒にログイン情報が送信されるけど、
	 * アプリはそうではありませんので特別な準備が必要です。
	 * ネイティブアプリはページをロードしたあと独自のwindow.ns_assist_initを作ります。
	 * window.ns_assist_initがすでにあれば上書きしないように注意してます。
	 *
	 * @param {Script tag} tag これからページに追加するつもりの<script>タグ
	 * @param {function} done 準備が終わったら読んでください（非同期用）
	 */
	if( !window.ns_assist_init ){
		window.ns_assist_init = function( tag, done ){
			var gameID = $('meta[name=o2engine_gameID]').attr('content');
			var userServer = $('meta[name=o2engine_userServer]').attr('content') || "http://novelsphere.jp";

			if( gameID ){
				config.gameID = gameID;
			}
			if( userServer ){
				o2.serverStat.userServer = userServer;
			}

			if( config.gameID ){
				tag.src = o2.serverStat.userServer+'/js?id='+config.gameID;
			}else{
				tag.src = o2.serverStat.userServer+'/js';
			}
			done();
		}
	}

	var tag = document.createElement("script");
	tag.onload = function(){
		if( o2.serverStat.skey ){
			setSkeyChecker();
			$(o2).trigger( 'systeminit.loggedin' );
		}else{
			$(o2).on( 'loggedin', function(){
				setSkeyChecker();
			});
		}
	}
	window.ns_assist_init( tag, function(){
		document.getElementsByTagName("head").item(0).appendChild(tag);
	});

	var lastSentTime = 0,
		scheduledTimer = null,
		minimumRequestInterval = 10000,
		disableCheck = false;

	/* 10秒ごとにskeyの有効性を確認 */
	// このほか、ゲームの最中にログインした時にもコールする必要がある

	function setSkeyChecker () {
		$( conductor ).on( 'ran', function( e, mode ){
			if( mode != 0 ){

				if( Date.now() - lastSentTime > minimumRequestInterval ){
					performCheck();
					lastSentTime = Date.now();

				}else{
					if( !scheduledTimer ){
						scheduledTimer = setTimeout(function(){

							performCheck();
							scheduledTimer = null;
							lastSentTime = Date.now();

						}, lastSentTime + minimumRequestInterval - Date.now());
					}
				}
			}
		});
	}

	function performCheck(){

		if( disableCheck )return;

		$.post( o2.serverStat.saveServer + "/api/1.2/skey/check.php",{
			uid    : o2.serverStat.uid,
			novel  : config.gameID,
			key    : o2.serverStat.skey
		},
		function(data){
			if( typeof data == "string"){
				data = JSON.parse(data);
			}
			if( data["result"] != "ok" ){

				disableCheck = true;

				$('body').append(
					$( '<div />' )
					.addClass( 'black-overlay' )
					.css({
						position   : 'absolute',
						width      : '100%',
						height     : '100%',
						cursor     : 'pointer',
						background : 'rgba(0,0,0,0.7)'
					})
					.append(
						$( '<div />' )
						.html("別の場所でこのゲームを起動したためゲームを終了しました。<BR>クリックすると再読み込みします。")
						.css({
							width        : '300px',
							margin       : '0 auto',
							background   : 'rgba(0,0,0,0.7)',
							color        : 'white',
							borderRadius : '5px',
							padding      : '10px',
							fontSize     : '18px',
							fontFamily   : "'Myriad Pro', Arial, sans-serif"
						})
					)
					.click(function(){
						location.reload();
					})
				);

				var stopTag = new Tag('s');
				currentConductor.queue.push( stopTag );
			}
		});
	}

})();