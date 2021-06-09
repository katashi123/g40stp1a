var ua = {
	"device": null,			/* 'pc', 'mac', 'iphone', 'ipad', 'ipod', 'android', 'other' */
	"os": null,				/* 'win', 'osx', 'ios', 'android', 'other' */
	"osver": null,			/* float value */
	"browser": null,		/* 'novelsphere', 'o2wrapper', 'ie', 'firefox', 'chrome', 'safari', 'other' */
	"browserver": null,		/* float value */
	
	"isCompatible": null,			/* 'yes', 'maybe', 'no' */
	"canPlayVideo": null,			/* 'yes', 'maybe', 'no' */
	"canPlayMultiAudio": null,		/* 'yes', 'maybe', 'no' */
	"canControlVolume": null,		/* 'yes', 'maybe', 'no' */
	"hasHighSpeedConnection": null	/* 'yes', 'maybe', 'no' */
};

(function () {
	var text = navigator.userAgent;
	
	if (text.indexOf('iPad') != -1) {
		ua.device = 'ipad';
		ua.os = 'ios';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	} else if (text.indexOf('iPod') != -1) {
		ua.device = 'ipod';
		ua.os = 'ios';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	} else if (text.indexOf('iPhone') != -1) {
		ua.device = 'iphone';
		ua.os = 'ios';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	} else if (text.indexOf('Android') != -1) {
		ua.device = 'android';
		ua.os = 'android';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	} else if (text.indexOf('Mac OS X') != -1) {
		ua.device = 'mac';
		ua.os = 'osx';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	} else if (text.indexOf('Windows NT') != -1 && text.indexOf('Xbox') == -1) {
		ua.device = 'pc';
		ua.os = 'win';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	} else {
		ua.device = 'other';
		ua.os = 'other';
		ua.osver = inspectOsVer(ua.os);
		ua.browser = inspectBrowser(ua.os);
		ua.browserver = inspectBrowserVer(ua.os, ua.browser);
	}
	
	function inspectOsVer(os) {
		var m;
		var ver;
		if (os == 'ios') {
			m = text.match(/\sOS\s([0-9]+?)_([0-9]+?).*?\s/);
			if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
			
			if (isNaN(ver))	return 0;
			else			return ver;
		} else if (os == 'android') {
			m = text.match(/\sAndroid\s([0-9]+?)\.([0-9]+?).*?\s/);
			if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
			
			if (isNaN(ver))	return 0;
			else			return ver;
		} else if (os == 'osx') {
			m = text.match(/\sMac\sOS\sX\s10_([0-9]+?).*?\s/);
			if (m == null) m = text.match(/\sMac OS X\s10\.([0-9]+?).*?\s/);
			if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
			
			if (isNaN(ver))	return 0;
			else			return ver;
		} else if (os == 'win') {
			m = text.match(/Windows\sNT\s([0-9]+?\.[0-9]+?).*?\s/);
			if (m != null) ver = parseFloat(m[1]);
			
			if (m == null)	return 0;
			else			return ver;
		} else {
			return 0;
		}
	}
	
	function inspectBrowser(os) {
		if (os == 'ios') {
			if (text.indexOf('CriOS') != -1)		return 'chrome';
			else if (text.indexOf('Safari') != -1)	return 'safari';
			else									return 'other';
		} else if (os == 'android') {
			if (text.indexOf('Chrome') != -1)		return 'chrome';
			else 									return 'other';
		} else if (os == 'osx' || os == 'win') {
			if (text.indexOf('Chrome') != -1)		return 'chrome';
			else if (text.indexOf('Firefox') != -1)	return 'firefox';
			else if (text.indexOf('Safari') != -1)	return 'safari';
			else if (text.indexOf('Trident') != -1)	return 'ie';
			else									return 'other';
		} else {
			if (text.indexOf('Novelsphere Native') != -1) return 'novelsphere';
			else if (text.indexOf('O2 Wrapper') != -1)			return 'o2wrapper';
			else											return 'other';
		}
	}
	
	function inspectBrowserVer(os, browser) {
		var m;
		var ver;
		if (os == 'ios') {
			if (browser == 'safari') {
				m = text.match(/Version\/([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else if (browser == 'chrome') {
				m = text.match(/CriOS\/([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else {
				return 0;
			}
		} else if (os == 'android') {
			if (browser == 'chrome') {
				m = text.match(/Chrome\/([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else {
				return 0;
			}
		} else if (os == 'osx' || os == 'win') {
			if (browser == 'chrome') {
				m = text.match(/Chrome\/([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else if (browser == 'firefox') {
				m = text.match(/Firefox\/([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else if (browser == 'safari') {
				m = text.match(/Version\/([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else if (browser == 'ie') {
				m = text.match(/rv:([0-9]+?)\.([0-9]+?).*?\s/);
				if (m == null) m = text.match(/MSIE\s([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else {
				return 0;
			}
		} else {
			if (browser == 'novelsphere' || browser == 'o2wrapper') {
				m = text.match(/Version\s([0-9]+?)\.([0-9]+?).*?/);
				if (m != null) ver = parseFloat(m[1] + '.' + m[2]);
				
				if (isNaN(ver))	return 0;
				else			return ver;
			} else {
				return 0;
			}
		}
	}
})();