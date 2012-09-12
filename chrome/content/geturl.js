(function(){
	'use strict';
	var urlChangeListener = {
		onLocationChange: function(aWebProgress, aRequest, aLocation) {
			var url,tag,sites,s,win;
			if (aLocation) {
				url = aLocation.spec;
				tag = null;
				sites = {
							amazon:     { rx: /^http.*?\.amazon.com.*?(\/dp\/|obidos.tg.detail|.gp.product)/i, tag:"tag=thelinactsho-20"},
							amazonuk:   { rx: /^http.*?\.amazon.co.uk.*?(\/dp\/|obidos.tg.detail|.gp.product)/i, tag:"tag=jupitebroadc-21"}, 
							amazonde:   { rx: /^http.*?\.amazon.de.*?(\/dp\/|obidos.tg.detail|.gp.product)/i, tag:"tag=jupitebroad02-21"}, 
							audible:    { rx: /^http.*?\.audible.com/i, tag:"source_code=COMA0230WS012110&AID=10298646&PID=4897915"}, 
							mint:       { rx: /^http.*?\.mint.com/i, tag:"PID=4897915&priorityCode=4216102399&source=cj_pfm"},
							bestbuy:    { rx: /^http.*?\.bestbuy.com.site.*?\?id=/i, tag:"AID=10483113&PID=4897915&ref=39&CJPID=4897915&loc=01"},
							thinkgeek:  { rx: /^http.*?\.thinkgeek.com/i, tag:"cpg=cj&ref=&CJURL=&CJID=3282554"},
							neweggcom:  { rx: /^http.*?\.newegg.com.(product.product.aspx\?item=|special.shellshocker.aspx\?)/i, tag:"nm_mc=AFC-C8Junction&cm_mmc=AFC-C8Junction-_-Branding-_-na-_-na&AID=10440554&PID=4897915"},
							neweggca:	{ rx: /^http.*?\.newegg.ca.(product.product.aspx\?item=|special.shellshocker.aspx\?)/i, tag:"nm_mc=AFC-C8junctionCA&cm_mmc=AFC-C8JunctionCA-_-homepage-_-na-_-na&AID=10606701&PID=4897915" },
							guitarcenter:   { rx: /^http.*?\.guitarcenter.com/i, tag:"CJAID=10453836&CJPID=4897915"}
                            
				};			
				for(s in sites) {
					if (url.match(sites[s].rx)) {
						if (url.indexOf(sites[s].tag) === -1) {
							win = aWebProgress.DOMWindow; 
							
							win.document.location.replace(url+(url.indexOf("?") >=0 ? "&" : "?")+sites[s].tag);
							
							break;
						}
					}
				}
			}
		},
		//onProgressChange: function(webProgress, request, curSelfProgress,maxSelfProgress, curTotalProgress, maxTotalProgress) {},
		//onSecurityChange: function(webProgress, request, state) {},
		//OnStateChange: function(webProgress, request, stateFlags, status) {},
		//onStatusChange: function(webProgress, request, status, message) {},
		QueryInterface: function(iid) {
			if (!iid.equals (Components.interfaces.nsISupports) && !Iid.equals (Components.interfaces.nsIWebProgressListener)) {
				throw Components.results.NS_ERROR_NO_INTERFACE;
			}
			
			return this;
		}
	};

	window.getBrowser().addProgressListener(urlChangeListener,Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
})();