var Overlay;
(function(){

	function addOverlay(filename, loadCallback, triggerCallback, extraData){
		var overlay = $('<div>').css({
			left       : '0',
			top        : '0',
			width      : '100%',
			height     : '100%',
			position   : 'absolute',
			zIndex     : 20
		}).attr('class','overlay');
		overlay.appendTo('body');

		var loaded = false, called = false, overlayCallback;
		Overlay = function(callback){
			Overlay = undefined
			called = true;
			overlayCallback = callback;
			checkOverlayDone();
		}
		function checkOverlayDone(){
			if( loaded && called ){
				overlayCallback.call(overlay, triggerCallback, extraData);
				loadCallback();
			}
		}
		overlay.load( filename, function(){
			loaded = true;
			checkOverlayDone();
		});
		return overlay;
	}

	Tag.actions.showoverlay = new TagAction({
		rules : {
			filename : {type:"STRING", required:true},
			'event' : {type:/fullscreen|element|none/, defaultValue:"none"},
			autoresize : {type:"BOOLEAN", defaultValue:false}
		},
		action : function(args){
			var _this = this;

			// Block mode = block until html closes
			var isBlockMode = this.isOpen();

			this.isOverlayOpen = false;
			this.isPerformingCallback = false;

			var close = Tag.actions.showoverlay.showOverlay.call(
				this,
				args,
				// after load
				function (){
					if (!isBlockMode) {
						_this.done();
					}
				},
				function () {
					if (!isBlockMode) {
						// callback means close in non-blocking mode
						close();
						return;
					}
					var args = [];
					for (var i = 0; i < arguments.length; i++) {
						args.push(arguments[i])
					}
					return Tag.actions.showoverlay.performCallback.call(_this, close, args);
				}
			);

			// close when scope is exited.
			this.exitScope = close;

			this.conductor.wait("overlay callback");

			return 1;
		},
		closeAction : function(openTag) {
			if (!openTag.isOverlayOpen) {
				return 0;
			}
			openTag.isPerformingCallback = false;
			this.conductor.wait("overlay callback");
			this.keepStack();
			return 1;
		},
		performCallback : function(closeOverlay, args) {
			// `this` in this scope is the `this` of open tag action
			var _this = this;

			if (this.isPerformingCallback) return false;
			this.isPerformingCallback = true;

			var originalClose = this.conductor.tagActions['close'];

			function reset() {
				_this.conductor.tagActions['close'] = originalClose;
			}

			this.conductor.tagActions['close'] = new TagAction({
				action : function(){
					closeOverlay();
					reset();
					_this.jumpToTag(_this.getCloseTag());
					return 0;
				}
			});
			// the tag next to open tag
			this.jumpToTag(this, true);

			var customScope = this.makeScopeVars(args);
			this.setScopeVars(customScope);

			this.conductor.trigger("overlay callback");
			return true;
		},

		showOverlay: function(args, loadedCallback, tagCallback) {

			if (this.isOverlayOpen) return;
			this.isOverlayOpen = true;

			var overlayLoaded = function(){
				// overlay added
				blockMouseEvents();
				loadedCallback();
			};

			var overlay = addOverlay( 'plugin/html_overlay/html/'+args.filename,overlayLoaded, tagCallback, args);

			// blocking event
			function blockEvent(e){
				if( args.event === "fullscreen" ||
					(args.event === "element" &&
						( $.contains(overlay[0], e.target)) || overlay.is(e.target)) ){

					e.stopPropagation();
				}
			}

			var eventsToBlock = 'touchstart touchmove touchcancel touchend mousemove mouseup mousedown mouseleave'.split(' ');
			function blockMouseEvents(element){
				// block mouse event
				$(o2).bindFirst('click',blockEvent);
				$(o2).bindFirst('rclick',blockEvent);
				eventsToBlock.forEach(function (thisEventName){
					overlay.on(thisEventName,blockEvent);
				});
			}

			function unblockMouseEvents(){
				$(o2).off('click',blockEvent);
				$(o2).off('rclick',blockEvent);
				eventsToBlock.forEach(function (thisEventName){
					overlay.off(thisEventName, blockEvent);
				});
			}

			function scaleElement(){
				overlay.css({
					transform : $('#main-wrapper').css('transform'),
					left : $('#main-wrapper').css('left'),
					top : $('#main-wrapper').css('top'),
					"transformOrigin": $('#main-wrapper').css('transformOrigin'),
					bottom : "",
					right : ""
				});
			}

			if( args.autoresize ){
				$(window).on('resize',scaleElement);
				scaleElement();
			}

			return function() {
				overlay.remove();
				unblockMouseEvents();
				if( args.autoresize ){
					$(window).off('resize', scaleElement);
				}
				this.isOverlayOpen = false;
			}.bind(this);
		}
	});
})();