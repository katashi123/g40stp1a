(function(){
	var keyframes =
	    "<style> \n" +
	    "@-webkit-keyframes tapev { \n" +
	        "0% { opacity: 0; border-radius: 25px; -webkit-transform: scale(1);} \n" +
	        "50% { opacity: 1; } \n" +
	        "100% {opacity: 0; border-radius: 50px; -webkit-transform: scale(2);} \n" +
	    "} \n" +
		"@keyframes tapev { \n" +
			"0% { opacity: 0; border-radius: 25px; transform: scale(1);} \n" +
			"50% { opacity: 1; } \n" +
			"100% {opacity: 0; border-radius: 50px; transform: scale(2);} \n" +
		"} \n" +
		".locatedPoint { \n" +
		"display: none; \n" +
		"color:white; \n" +
		"width:50px; \n" +
		"height:50px; \n" +
		"border-radius: 25px; \n" +
		"border: solid 2px #fff; \n" +
		"} \n" +
		".anim { \n" +
		"-webkit-animation: tapev 0.5s ease-out; \n" +
		"animation: tapev 0.5s ease-out; \n" +
		"} \n" +
		"</style>";

	var div3 = document.createElement("div");
	div3.innerHTML = keyframes;
	document.body.appendChild(div3);
	$('#main-wrapper').append('<div id="ripple"><div></div><div></div><div></div></div>')


	var GhostpiaRipple = function(){

		if (ua.os == 'ios' || ua.os == 'android'){

			if (ua.device == 'ipad' || ua.device == 'ipod' || ua.device == 'android' || ua.device == 'other'){
			}else{
				$('#main-wrapper').on('touchend.ripple', function() {
					var z = $('#main-wrapper').css('transform');
					z = z.slice(7);
					z = Number(z.split(",",1));
				    var x = (event.changedTouches[0].pageX-Number($('#main-wrapper').css('left').split("p",1)))/z; // X 座標の位置
				    var y = (event.changedTouches[0].pageY-Number($('#main-wrapper').css('top').split("p",1)))/z; // Y 座標の位置
					if ($('#ripple div').not('.locatedPoint').size()==0) {
						$('#ripple .locatedPoint:first').removeClass('locatedPoint').removeClass('anim').css({'top':0,'left':0,'display':'none'});
					}
					$('#ripple div').not('.locatedPoint').first().addClass('locatedPoint')
						.css({position:'fixed','top':(y)-25,'left':(x)-25,display:'block','z-index':999})
						.addClass('anim').delay(500).queue(function(){
							$(this).removeClass('locatedPoint').removeClass('anim').css({'top':0,'left':0,'display':'none'}).dequeue();
						});
					});
			}

		}else{
			$('#main-wrapper').on('click.ripple', function(e){
				var z = $('#main-wrapper').css('transform');
				z = z.slice(7);
				z = Number(z.split(",",1));
				var x = (e.pageX-Number($('#main-wrapper').css('left').split("p",1)))/z;
				var y = (e.pageY-Number($('#main-wrapper').css('top').split("p",1)))/z;
				if ($('#ripple div').not('.locatedPoint').size()==0) {
					$('#ripple .locatedPoint:first').removeClass('locatedPoint').removeClass('anim').css({'top':0,'left':0,'display':'none'});
				}
				$('#ripple div').not('.locatedPoint').first().addClass('locatedPoint')
					.css({position:'fixed','top':(y)-25,'left':(x)-25,display:'block','z-index':999})
					.addClass('anim').delay(500).queue(function(){
						$(this).removeClass('locatedPoint').removeClass('anim').css({'top':0,'left':0,'display':'none'}).dequeue();
					});
			});
		}
	}

	var GhostpiaRippleStop = function(){
		if (ua.os == 'ios' || ua.os == 'android'){
			if (ua.device == 'ipad' || ua.device == 'ipod' || ua.device == 'android' || ua.device == 'other'){
			}else{
				$('#main-wrapper').off('touchend.ripple');
			}
		}else{
			$('#main-wrapper').off('click.ripple');
		}
	}


	Tag.actions.ripple = new TagAction({
		rules : {
			enable : {type:"BOOLEAN"}
		},
		action : function(args){
			if( 'enable' in args ){
				if( args.enable ){
					GhostpiaRipple();
				} else {
					GhostpiaRippleStop();
				}
			}
			return 0;
		}
	});

})();
