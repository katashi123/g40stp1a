var ChapterList;
var MenuSetting;
(function(){

	// kv ... selectskip.htmlに表示するキービジュアル

	// チャプターリスト
	ChapterList = [
		// 1章
		{
			title: 'ようこそここへこの町へ',
			kv: 'keyVisual',
			list: [
				{
					name: "夢の始まり",
					file: "01",
					label: "*chap1"
				},{
					name: "幽霊の町",
					file: "01",
					label: "*chap2"
				},{
					name: "それはいわゆる",
					file: "01",
					label: "*chap3"
				},{
					name: "溶ける",
					file: "01",
					label: "*chap4"
				},{
					name: "いーい",
					file: "01",
					label: "*chap5"
				},{
					name: "来客",
					file: "01",
					label: "*chap6"
				},{
					name: "やりとり",
					file: "01",
					label: "*chap7"
				},{
					name: "はじめてのはじまる日",
					file: "01",
					label: "*chap8"
				},{
					name: "わたしとみんな",
					file: "01",
					label: "*chap9"
				},{
					name: "ガベージ・コレクション",
					file: "01",
					label: "*chap10"
				},{
					name: "ちゃんとしないと",
					file: "01",
					label: "*chap11"
				},{
					name: "６０点の日",
					file: "01",
					label: "*chap12"
				},{
					name: "＃＃＃の＃",
					file: "01",
					label: "*chap13"
				},{
					name: "思い出",
					file: "01",
					label: "*chap14"
				},
			]
		},

		// 2章
		{
			title: 'なもなき名無しのお誕生日',
			kv: '2_23_19',
			list: [
				{
					name: "夢のつづき",
					file: "02",
					label: "*chap1"
				},{
					name: "身支度",
					file: "02",
					label: "*chap2"
				},{
					name: "町をゆく",
					file: "02",
					label: "*chap3"
				},{
					name: "老人と小夜子",
					file: "02",
					label: "*chap4"
				},{
					name: "外側",
					file: "02",
					label: "*chap5"
				},{
					name: "だれでもいいから",
					file: "02",
					label: "*chap6"
				},{
					name: "救済",
					file: "02",
					label: "*chap7"
				},{
					name: "小夜子補導さる",
					file: "02",
					label: "*chap8"
				},{
					name: "警察沙汰の日",
					file: "02",
					label: "*chap9"
				},{
					name: "容疑者は冤罪を主張",
					file: "02",
					label: "*chap10"
				},{
					name: "友達の家にて",
					file: "02_2",
					label: "*chap11"
				},{
					name: "もっと会話を",
					file: "02_2",
					label: "*chap12"
				},{
					name: "うんこからのうんこ",
					file: "02_2",
					label: "*chap13"
				},{
					name: "まだそこに座れない",
					file: "02_2",
					label: "*chap14"
				},{
					name: "教会へ",
					file: "02_2",
					label: "*chap15"
				},{
					name: "神父",
					file: "02_2",
					label: "*chap16"
				},{
					name: "あなたはいつまで",
					file: "02_2",
					label: "*chap17"
				},{
					name: "造花とシスター",
					file: "02_2",
					label: "*chap18"
				},{
					name: "やっと、",
					file: "02_2",
					label: "*chap19"
				},{
					name: "やっと会えたね",
					file: "02_2",
					label: "*chap20"
				},{
					name: "ハムとシスターと銃",
					file: "02_2",
					label: "*chap21"
				},{
					name: "ニンジャ再始動す",
					file: "02_2",
					label: "*chap22"
				},{
					name: "みがわり",
					file: "02_2",
					label: "*chap23"
				},{
					name: "終了のお知らせ",
					file: "02_2",
					label: "*chap24"
				},{
					name: "思い出",
					file: "02_2",
					label: "*chap25"
				}
			]
		},

		// 3章
		{
			title: 'はたらくしごとをみつける日',
			kv: '3_4_4',
			list: [
				{
					name: "同居人と",
					file: "03",
					label: "*chap1"
				},{
					name: "ゴースト・カフェ",
					file: "03",
					label: "*chap2"
				},{
					name: "性格の不一致",
					file: "03",
					label: "*chap3"
				},{
					name: "楽しい面接",
					file: "03",
					label: "*chap4"
				},{
					name: "たのしいおしごと",
					file: "03",
					label: "*chap5"
				},{
					name: "彼女のお仕事",
					file: "03",
					label: "*chap6"
				},{
					name: "よくないのがいいね！",
					file: "03_2",
					label: "*chap7"
				},{
					name: "サンドイッチガール",
					file: "03_2",
					label: "*chap8"
				},{
					name: "部屋で",
					file: "03_2",
					label: "*chap9"
				},{
					name: "こころはだいじ",
					file: "03_2",
					label: "*chap10"
				},{
					name: "シスター再び",
					file: "03_2",
					label: "*chap11"
				},{
					name: "おいしいピザが来た！",
					file: "03_2",
					label: "*chap12"
				},{
					name: "うんこのお仕事",
					file: "03_3",
					label: "*chap13"
				},{
					name: "銃とコス・プレイ",
					file: "03_3",
					label: "*chap14"
				},{
					name: "荒っぽい交渉ごと",
					file: "03_3",
					label: "*chap15"
				},{
					name: "ただいま",
					file: "03_3",
					label: "*chap16"
				},{
					name: "それは病気かビジネスか",
					file: "03_3",
					label: "*chap17"
				},{
					name: "思い出",
					file: "03_4",
					label: "*chap18"
				}
			]
		},

		// 4章
		{
			title: 'あの子といっしょでひとりの日',
			kv: '4_71',
			list: [
				{
					name: "帰宅のちコイン",
					file: "04_1",
					label: "*chap1"
				},{
					name: "襲撃者対策会議",
					file: "04_1",
					label: "*chap2"
				},{
					name: "みんなが少しずつ",
					file: "04_1",
					label: "*chap3"
				},{
					name: "甘くて赤い出会い",
					file: "04_1",
					label: "*chap4"
				},{
					name: "レーニャという幽霊",
					file: "04_1",
					label: "*chap5"
				},{
					name: "わたしの仲間たちと",
					file: "04_1",
					label: "*chap6"
				},{
					name: "彼女の呼び出し",
					file: "04_1",
					label: "*chap7"
				},{
					name: "熱と炎と破壊",
					file: "04_1",
					label: "*chap8"
				},{
					name: "小夜子、保護さる",
					file: "04_1",
					label: "*chap9"
				},{
					name: "傷跡について",
					file: "04_1",
					label: "*chap10"
				},{
					name: "変わりゆく",
					file: "04_1",
					label: "*chap11"
				},{
					name: "呪詛と沈静",
					file: "04_2",
					label: "*chap12"
				},{
					name: "おいしいお菓子はお楽しみ",
					file: "04_2",
					label: "*chap13"
				},{
					name: "甘い夢のつづき",
					file: "04_2",
					label: "*chap14"
				},{
					name: "いつものわたし",
					file: "04_2",
					label: "*chap15"
				},{
					name: "おかえりとそれからと蜘蛛",
					file: "04_2",
					label: "*chap16"
				},{
					name: "幸せになれますように",
					file: "04_2",
					label: "*chap17"
				}
			]
		}
	]

	MenuSetting = {
		storyOpened: [true],
		firstPlay: 0,
		load: false,
		qload: false,
		isFinished: false,
		run : function(){
			// トップメニューを開いた時、どのメニューボタンが表示されているかの設定。
			// また、どのボタンをフォーカスするかの判定も行う。
			// 1話（i=0）は絶対解放されているため、i=1から始める
			for (var i = 1; i < sf.ghostpia_chapter.length; i++) {
				// はじめてその章をプレイする場合
				if (sf.ghostpia_finish_story == i-1 && sf.ghostpia_chapter[i] < 1 && sf.ghostpia_chapter[i-1] == ChapterList[i-1].list.length){
					this.firstPlay = i
				}
				// チャプターが１つ以上解放されていれば、その章は解放していると見做す
				if (sf.ghostpia_chapter[i] >= 1) {
					this.storyOpened[i] = true;
				} else {
					this.storyOpened[i] = false;
				}
			}

			// 読了ステータスか、章の途中ステータスか検出
			// 読了した章と、到達している章とが一致する　＝　読了
			// そうでなければ、読んでいる最中
			if (sf.ghostpia_finish_story == sf.ghostpia_story) {
				this.isFinished = true;
			}else{
				this.isFinished = false;
			}

			// オートセーブがある場合は「前回の続きから」を表示
			if (!!tf.tmp.savedataCheck) {
				this.load = true;
			}
			// セーブされている場合は「しおりから」を表示
			if (!!tf.tmp.qsavedataCheck) {
				this.qload = true;
			}
		}
	}

	// 最新話リリース時に表示するテキスト
	tf.tmp.selectSkipHeader = "第"+tf.tmp.newer_story+"話「"+ChapterList[tf.tmp.newer_story-1].title+"」が<br>配信開始となりました！<br>第"+tf.tmp.newer_story+"話から読み始めますか？";

})();