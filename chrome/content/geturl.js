(function () {
    'use strict';
    var urlChangeListener = {
            onLocationChange: function (aWebProgress, aRequest, aLocation) {
                var url, tag, win;
                var configurations = {
                        amazon : {
                            rx: /^http.*?\.amazon\.com.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "thelinactsho-20" }
                            ]
                        },
                        amazonuk : {
                            rx: /^http.*?\.amazon\.co\.uk.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "jupitebroadc-21" }
                            ]
                        },
                        amazonde : { 
                            rx: /^http.*?\.amazon\.de.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "jupitebroad02-21" }
                            ]
                        },
                        amazonca : { 
                            rx: /^http.*?\.amazon\.ca.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "jbcanada-20" }
                            ]
                        },
                        audible : {
                            rx: /^http.*?\.audible\.com.*?\/pd.*/i,
                            params: [
                                { param: "source_code", paramValue: "COMA0230WS012110" },
                                { param: "AID", paramValue: "10298646" },
                                { param: "PID", paramValue: "4897915" }
                            ]
                        },
                        mint : {
                            rx: /^http.*?\.mint\.com/i,
                            params: [
                                { param: "PID", paramValue: "4897915" },
                                { param: "priorityCode", paramValue: "4216102399" },
                                { param: "source", paramValue: "cj_pfm" }
                            ]
                        },
                        bestbuy : {
                            rx: /^http.*?\.bestbuy\.com.*?site.*?\?id=/i, 
                            params: [
                                { param: "AID", paramValue: "10483113" },
                                { param: "PID", paramValue: "4897915" },
                                { param: "ref", paramValue: "39" },
                                { param: "CJPID", paramValue: "4897915" },
                                { param: "loc", paramValue: "01" }
                            ]
                        },
                        thinkgeek : {
                            rx: /^http.*?\.thinkgeek\.com\/product\//i,
                            params: [
                                { param: "cpg", paramValue: "cj" },
                                { param: "ref", paramValue: "" },
                                { param: "CJURL", paramValue: "" },
                                { param: "CJID", paramValue: "3282554"}
                            ]
                        },
                        neweggcom : {
                            rx: /^http.*?\.newegg\.com.*?(product.product\.aspx\?item=|special.shellshocker\.aspx\?)/i,
                            params: [
                                { param: "nm_mc", paramValue: "AFC-C8Junction" },
                                { param: "cm_mmc", paramValue: "AFC-C8Junction-_-Branding-_-na-_-na" },
                                { param: "AID", paramValue: "10440554" },
                                { param: "PID", paramValue: "4897915" }
                            ]
                        },
                        neweggca : {
                            rx: /^http.*?\.newegg\.ca.*?(product.product\.aspx\?item=|special.shellshocker\.aspx\?)/i,
                            params: [
                                { param: "nm_mc", paramValue: "AFC-C8junctionCA" },
                                { param: "cm_mmc", paramValue: "AFC-C8JunctionCA-_-homepage-_-na-_-na" },
                                { param: "AID", paramValue: "10606701" },
                                { param: "PID", paramValue: "4897915" }
                            ]
                        },
                        woot : {
                           rx: /^http.*?\.woot\.com.*?\/offers\/.*/i,
                           params: [
                                { param: "utm_campaign", paramValue: "Commission+Junction+-+10848750" },
                                { param: "utm_source", paramValue: "Commission+Junction+Publisher+-+4897915" },
                                { param: "utm_medium", paramValue: "affiliate+-+Woot%21+Logo" }
                           ]
                        },
                        guitarcenter : {
                            rx: /^http.*?\.guitarcenter\.com\/.*[a-z0-9]{9}-i[a-z0-9]{7}\.gc/i,
                            params: [
                                { param: "CJAID", paramValue: "10453836" },
                                { param: "CJPID", paramValue: "4897915" }
                            ]
                        }
                    };

                function createTag(params) {
                    var result = "", i;
                    for (i = 0; i < params.length; i++) {
                        result = result + params[i].param + "=" + params[i].paramValue;
                        if (i >= 0 && i < params.length - 1) {
                            result = result + "&";
                        }
                    }
                    return result;
                }
                
                if (aLocation) {
                    url = aLocation.spec;
                    tag = null;
                    var config;
                    for (config in configurations) {
                        if (configurations.hasOwnProperty(config)) {
                            if (url.match(configurations[config].rx)) {
                                //gracefully acknowledge existing affiliate tags
                                if (url.indexOf(configurations[config].params[0].param) === -1) {
                                    win = aWebProgress.DOMWindow;
                                    win.document.location.replace(url + (url.indexOf("?") >= 0 ? "&" : "?") + createTag(configurations[config].params));
                                    break;
                                }
                            }
                        }
                    }
                }
            },
            //onProgressChange: function(webProgress, request, curSelfProgress,maxSelfProgress, curTotalProgress, maxTotalProgress) {},
            //onSecurityChange: function(webProgress, request, state) {},
            //OnStateChange: function(webProgress, request, stateFlags, status) {},
            //onStatusChange: function(webProgress, request, status, message) {},
            QueryInterface: function (iid) {
                if (!iid.equals(Components.interfaces.nsISupports) && !Iid.equals(Components.interfaces.nsIWebProgressListener)) {
                    throw Components.results.NS_ERROR_NO_INTERFACE;
                }
                return this;
            }
    };

    window.getBrowser().addProgressListener(urlChangeListener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
}());