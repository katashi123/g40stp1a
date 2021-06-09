var GhostpiaChar;
(function(){
/*

	char.js
	ボイスデータやネームプレート等を扱うためのキャラクター系メソッド

*/

	GhostpiaChar = function(){

		this.current = {
			char : undefined
		};
		this.before = {
			char : undefined
		};
		this.charList = {
			'小夜子' : {
				ascii : 'sayoko',
				voice : 'sayoko',
				npDiff : {
					'コート' : 'coat',
					'防護服' : 'bougo',
					'名前のみ' : 'name_only'
				}
			},
			'ヨル' : {
				ascii : 'yoru',
				voice : 'yoru',
				npDiff : {
					'防護服' : 'bougo',
					'ジャージ' : 'jersey',
					'白衣' : 'hakui',
					'パジャマ' : 'pajama',
					'名前のみ' : 'name_only'
				}
			},
			'名前はまだない' : {
				ascii : 'nanashi',
				voice : 'yoru'
			},
			'アーニャ' : {
				ascii : 'anya',
				voice : 'anya',
				npDiff : {
					'セーター' : 'sweater',
					'モッズ' : 'mods'
				}
			},
			'パシフィカ' : {
				ascii : 'pacifica',
				voice : 'pacifica',
				npDiff : {
					'Aライン' : 'alinecoat',
					'Ａライン' : 'alinecoat',
					'タートルネック' : 'turtleneck'
				}
			},
			'みんな' : {
				ascii : 'none',
				voice : '3nin'
			},
			'ノンナ' : {
				ascii : 'nonna',
				voice : 'nonna'
			},
			'アレックス' : {
				ascii : 'alex',
				voice : 'alex'
			},
			'神父' : {
				ascii : 'priest',
				voice : 'priest'
			},
			'クラーラ' : {
				ascii : 'klara',
				voice : 'klara',
				npDiff : {
					'コート' : 'coat'
				}
				//voice : 'voice0'
			},
			'女の子' : {
				ascii : 'girl',
				voice : 'klara',
				npDiff : {
					'レーニャ' : 'lenya'
				}
			},
			'じじい' : {
				ascii : 'madoldman',
				voice : 'jijii',
				npDiff : {
					'キャストオフ' : 'castoff'
				}
			},
			'マーガレット' : {
				ascii : 'margaret',
				voice : 'jijii'
			},
			'警察官' : {
				ascii : 'policeman',
				voice : 'man_b'
			},
			'警部' : {
				ascii : 'policecaptain',
				voice : 'man_a'
			},
			'パテル' : {
				ascii : 'patel',
				// ascii : 'man',
				voice : 'patel'
				// voice : 'man_b'
			},
			'ロゥ' : {
				ascii : 'lauren',
				// ascii : 'girl',
				voice : 'lauren'
				// voice : 'klara'
			},
			'ゴミ回収屋１' : {
				ascii : 'kaishuya1',
				voice : 'man_a'
			},
			'ゴミ回収屋２' : {
				ascii : 'kaishuya2',
				voice : 'man_b'
			},
			'ゴミ回収屋３' : {
				ascii : 'kaishuya3',
				voice : 'man_c'
			},
			'ゴミ回収屋たち' : {
				ascii : 'kaishuyatachi',
				voice : 'man_a'
			},
			'ザコ' : {
				ascii : 'zako0',
				voice : 'man_c'
			},
			'ザコ１' : {
				ascii : 'zako1',
				voice : 'man_c'
			},
			'ザコ２' : {
				ascii : 'zako2',
				voice : 'man_b'
			},
			'ならず者' : {
				ascii : 'narazu',
				voice : 'man_c'
			},
			'モート' : {
				ascii : 'moto',
				voice : 'man_c'
			},
			'男' : {
				ascii : 'man',
				// voice : 'man'
				voice : 'man_c'
			},
			'謎の女' : {
				ascii : 'none',
				voice : 'mysterywomen'
			},
			'少年' : {
				ascii : 'boy',
				// voice : 'boy'
				voice : 'voice0'
			},
			'患者１' : {
				ascii : 'kanjya1',
				voice : 'man_c'
			},
			'患者２' : {
				ascii : 'kanjya2',
				voice : 'man_b'
			},
			'？' : {
				ascii : 'unknown',
				voice : 'unknown'
			},
			'none' : {
				ascii : 'none',
				voice : 'none'
			},
			'レーニャ' : {
				ascii : 'lenya',
				voice : 'lenya'
			},
			'ミェト' : {
				ascii : 'mieto',
				voice : 'mieto'
			},
		}
		this.nameArray = this.generateArrayFromObject(this.charList);
	}

	GhostpiaChar.prototype = {
		initializer : "GhostpiaChar",
		generateArrayFromObject : function(obj){
			var arr = [];
			for (var key in obj) {
			arr.push(key);
			}
			return arr;
		},
		getCharVoice : function(name){
			return this.charList[name].voice;
		},
		getCharName : function(num){
			return this.nameArray[num];
		},
		getCharNameAscii : function(name){
			if (!this.charList[name]){
				return "none";
			}
			return this.charList[name].ascii;
		},
		getCharListlength : function(){
			return this.nameArray.length;
		},
		getNameplateDiff : function(npname){
			if (this.charList[this.getCurrentChar()].npDiff[npname]){
				return this.charList[this.getCurrentChar()].npDiff[npname];
			}else{
		//				console.error("[ghostpia] キャラ指定 : ["+getCurrentChar()+" np="+npname+"] -> "+npname+" という差分は存在しません。");
				return undefined;
			}
		},
		getHistoryCharName : function(name){
			switch (name){
				case 'none':
					return "";
					break;
				case 'unknown':
					return "？ : ";
					break;
				default:
					return ""+name+" : ";
			}
		},
		getCurrentChar : function(){
			return this.current.char;
		},
		getBeforeChar : function(){
			return this.before.char;
		},
		setCurrentChar : function(name){
			this.before.char = this.current.char;
			this.current.char = name;
		}
	}

	f.ghostpia.charManager = new GhostpiaChar();

})();