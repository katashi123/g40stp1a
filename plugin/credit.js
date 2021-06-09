(function(){

	var GhostpiaCredit = function(){
		this.genan = {
			role : '原案',
			name : ['ミタヒツヒト']
		};
		this.characterDesign = {
			role : 'キャラクターデザイン',
			name : ['山本すずめ']
		};
		this.scenario = {
			role : 'シナリオ',
			name : ['ミタヒツヒト']
		};
		this.kousei = {
			role : '校正',
			name : ['蜂八憲']
		};
		this.graphic = {
			role : 'グラフィック',
			name : ['山本すずめ']
		};
		this.graphicAssistant = {
			role : 'グラフィックアシスタント',
			name : ['斑']
		};
		this.composer = {
			role : '音楽',
			name : ['高野大夢']
		};
		this.vocal = {
			role : '歌',
			name : ['Meno']
		};
		this.script = {
			role : 'スクリプト',
			name : ['山本すずめ', 'ミタヒツヒト', '斑', '蜂八憲']
		};
		this.soundEffect = {
			role : '効果音',
			name : ['斑', '山本すずめ']
		};
		this.director = {
			role : 'ディレクター',
			name : ['蜂八憲']
		};
		this.specialThanks = {
			role : 'スペシャルサンクス',
			name : ['佐々木ケイ',	 'ノベルスフィア']
		};
		this.crowdfunding = {
			role : '応援してくださった方々',
			name : [
				'まさしさん',
				'keito',
				'雪うさぎ',
				'みなみ＠おすすめ同人紹介',
				'amaginoboru',
				'pyc255',
				'Yujiro Nakamura',
				'平和台シャベッターズ',
				'hatch2',
				'魚住雨',
				'めいけふ',
				'なぎさ',
				'あゃせ',
				'冬野氷夜',
				'もっちー',
				'西園寺 秋耀',
				'白霧',
				'あおみかん',
				'もっさ猫',
				'＠1natsu172',
				'イマ＆ムラ',
				'とくもり',
				'rods skyfish',
				'天王子 景虎',
				'リュウ',
				'しねコナちゃん',
				'Beat of blues'
			]
		};
		this.chosuido = {
			role : '制作・著作',
			name : ['超水道']
		};
		this.queue = [
			['genan', 'characterDesign'],
			['scenario', 'kousei'],
			['graphic', 'graphicAssistant'],
			['composer', 'vocal'],
			['script', 'soundEffect'],
			['director', 'specialThanks'],
			['crowdfunding'],
			['chosuido']
		];
		this.imageQueue = [
			''
		];

		this.filltext = function(text){
			//12文字に足りない場合は空白追加
			var fill = '';
			for (var i = text.length; i < 12; i++) {
				fill += '　';
			}
			return fill+text;
		}
		this.drawCredit = function(creditText){
			var value = this.eval(creditText);

			var newTag = new Tag('text', {
				text : value
			});
			this.conductor.queue.push(newTag);

			o2.currentMessageLayer.linebreak();

			if (o2.currentMessageLayerWithBack) {
				o2.currentMessageLayer.getCorrespondingLayer().linebreak();
			}

			o2.historyLayer.recorder.addCell(true);

			return 0;
		}
	}

	var tagArray = [];
	function tag(tagName, options){
		tagArray.push( new Tag( tagName, options ) );
	}

	// stream-builder では上手く動かないので注意
	function dynamicCredit(mp){
		tagArray = [];
		var imageNum = 0;
		var imageFlag = 0;
		// var linelength = 0;

		tag("nowait");

		creditStory = tf.credit['story'+mp.story];

		for (var viewNum = 0; viewNum <= creditStory.queue.length-1; viewNum++){
			creditQueueView = creditStory.queue[viewNum];

			// linelength = 0;

			for (var roleNum = 0; roleNum <= creditQueueView.length-1; roleNum++){
				creditQueueRole = creditQueueView[roleNum];
				creditText='';

				for (var nameNum=0; nameNum <= creditStory[creditQueueRole].name.length-1; nameNum++){
					if (nameNum == 0){
						if (creditQueueRole == "chosuido"){
							var role = '　' + creditStory.filltext(creditStory[creditQueueRole].role);
						}else{
							var role = creditStory.filltext(creditStory[creditQueueRole].role);
						}
					}else if (nameNum % 8 == 0){
						// tag("layopt", {layer:"message1", top:(640-f.ghostpia.constant.getDefaultFontSize()*linelength-1)/2});
						tag("image", {layer: 'base', page:'back', storage: creditStory.imageQueue[imageNum]});
						imageFlag++;
						if (imageFlag % 2 == 0){
							imageNum++;
						}
						tag("trans", {time: 1000});
						tag("wt", {canskip: false});
						tag("wait", {time: 3000, canskip: false});
						tag("er");
						var role = creditStory.filltext(creditStory[creditQueueRole].role);
						linelength = 0;
					}else{
						var role = '　　　　　　　　　　　　';
					}
					creditText = role + '　' + creditStory[creditQueueRole].name[nameNum];

					tag("text", {text: creditText});
					// linelength++;
					tag("r");
				}
			}

			if (creditQueueRole == "chosuido"){
				tag("layopt", {layer:"message0", page:"back", top:(640-f.ghostpia.constant.getDefaultFontSize())/2-90});
			}
			// console.log((640-f.ghostpia.constant.getDefaultFontSize()*linelength-1)/2);

			tag("image", {layer: 'base', page:'back', storage: creditStory.imageQueue[imageNum]});
			imageFlag++;
			if (imageFlag % 2 == 0){
				imageNum++;
			}

			tag("trans", {time: 1000});
			tag("wt", {canskip: false});
			tag("wait", {time: 3000, canskip: false});
			tag("er");
		}

		tag("fadeoutbgm", {time: 3000});
		tag("er");
		tag("image", {layer: 'base', page:'back', storage: 'blackout'});
		tag("trans", {time: 1000});
		tag("wt", {canskip: false});
		tag("wait", {time: 3000, canskip: false});

		tag("endnowait");

		return tagArray;
	}

	conductor.macros["drawcredit"] = new DynamicMacroDefinition("drawcredit", (args)=>
		dynamicCredit(args)
	);

	tf.credit = {};
	tf.credit.story1 = new GhostpiaCredit();
	tf.credit.story1.graphicAssistant.name = ['斑', '新生すずし眉毛'];
	tf.credit.story1.imageQueue = [
		'sayoko_room_night',
		'main_street_night',
		'anya_garage_night',
		'ghost_station_night',
		'town_view_night',
		'keyVisual'
	];

	tf.credit.story2 = new GhostpiaCredit();
	tf.credit.story2.graphicAssistant.name = ['斑', '新生すずし眉毛', '田端みひら'];
	tf.credit.story2.imageQueue = [
		'2_1_8-3',
		'2_10_7',
		'2_13_11',
		'pacifica_house_living_party_crash',
		'chapel',
		'2_23_20'
	];

	tf.credit.story3 = new GhostpiaCredit();
	tf.credit.story3.graphicAssistant.name = ['斑', '中村ふみ'];
	tf.credit.story3.imageQueue = [
		'3_1_2',
		'cafe',
		'3_4_4',
		'3_6_9',
		'3_6_14',
		'3_16_3'
	];

	tf.credit.story4 = new GhostpiaCredit();
	tf.credit.story4.graphicAssistant.name = ['斑'];
	tf.credit.story4.script.name = ['蜂八憲', '山本すずめ', '斑', 'ミタヒツヒト']
	tf.credit.story4.imageQueue = [
		'4_endroll_1',
		'4_endroll_2',
		'4_71',
		'4_108',
		'4_116',
		'4_146'
	];

})();