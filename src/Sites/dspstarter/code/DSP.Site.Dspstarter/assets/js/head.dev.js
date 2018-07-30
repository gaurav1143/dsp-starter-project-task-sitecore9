// ==========================================================================
// DDIGITAL - HEAD.JS
// ==========================================================================






window.DDIGITAL = window.DDIGITAL || {};
(function() {
	var ie = (function() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');

			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

			return v > 4 ? v : undef;
		}()),
		htmlElement = document.documentElement;

	if (ie) { htmlElement.className += ' is-ie'; }
	if (ie < 8) { htmlElement.className += ' lt-ie8'; }
	if (ie < 9) { htmlElement.className += ' lt-ie9'; }
	if (ie < 10) { htmlElement.className += ' lt-ie10'; }

	if (/MSIE 10/i.test(navigator.userAgent)) {
		htmlElement.className += ' is-ie is-ie10';
	}

	if (/rv:11.0/i.test(navigator.userAgent)) {
		htmlElement.className += ' is-ie is-ie11';
	}
}());
// DDIGITAL.ready() is very similar to $(document).ready() except it waits until our main JavaScript has run
(function(NAMESPACE) {
	var stack = [],
		isReady = false;

	NAMESPACE.ready = function(callback) {
		if (typeof callback === 'function') {
			if (isReady) {
				callback();
			} else {
				stack.push(callback);
			}
		}
	};

	NAMESPACE.triggerReady = function() {
		isReady = true;

		while (stack.length) {
			stack.shift().call();
		}
	};

}(DDIGITAL));
// https://github.com/typekit/webfontloader

window.WebFontConfig = {
	typekit: { id: 'lex4rvx' },
	google: {
		families: ['Roboto:400,700,400italic,700italic,500']
	}
};

(function(d) {
	var wf = d.createElement('script'), s = d.scripts[0];
	wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
	s.parentNode.insertBefore(wf, s);
})(document);
;/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-cssanimations-input-opacity-placeholder-pointerevents-target-touchevents-setclasses-cssclassprefix:supports- !*/
!function(e,t,n){function r(e,t){return typeof e===t}function o(){var e,t,n,o,i,s,a;for(var l in g)if(g.hasOwnProperty(l)){if(e=[],t=g[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(o=r(t.fn,"function")?t.fn():t.fn,i=0;i<e.length;i++)s=e[i],a=s.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),w.push((o?"":"no-")+a.join("-"))}}function i(e){var t=x.className,n=Modernizr._config.classPrefix||"";if(_&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),_?x.className.baseVal=t:x.className=t)}function s(e,t){return!!~(""+e).indexOf(t)}function a(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):_?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function l(){var e=t.body;return e||(e=a(_?"svg":"body"),e.fake=!0),e}function u(e,n,r,o){var i,s,u,f,c="modernizr",d=a("div"),p=l();if(parseInt(r,10))for(;r--;)u=a("div"),u.id=o?o[r]:c+(r+1),d.appendChild(u);return i=a("style"),i.type="text/css",i.id="s"+c,(p.fake?p:d).appendChild(i),p.appendChild(d),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(t.createTextNode(e)),d.id=c,p.fake&&(p.style.background="",p.style.overflow="hidden",f=x.style.overflow,x.style.overflow="hidden",x.appendChild(p)),s=n(d,e),p.fake?(p.parentNode.removeChild(p),x.style.overflow=f,x.offsetHeight):d.parentNode.removeChild(d),!!s}function f(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(t,r){var o=t.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(f(t[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var i=[];o--;)i.push("("+f(t[o])+":"+r+")");return i=i.join(" or "),u("@supports ("+i+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function d(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function p(e,t,o,i){function l(){f&&(delete E.style,delete E.modElem)}if(i=r(i,"undefined")?!1:i,!r(o,"undefined")){var u=c(e,o);if(!r(u,"undefined"))return u}for(var f,p,m,v,h,y=["modernizr","tspan"];!E.style;)f=!0,E.modElem=a(y.shift()),E.style=E.modElem.style;for(m=e.length,p=0;m>p;p++)if(v=e[p],h=E.style[v],s(v,"-")&&(v=d(v)),E.style[v]!==n){if(i||r(o,"undefined"))return l(),"pfx"==t?v:!0;try{E.style[v]=o}catch(g){}if(E.style[v]!=h)return l(),"pfx"==t?v:!0}return l(),!1}function m(e,t){return function(){return e.apply(t,arguments)}}function v(e,t,n){var o;for(var i in e)if(e[i]in t)return n===!1?e[i]:(o=t[e[i]],r(o,"function")?m(o,n||t):o);return!1}function h(e,t,n,o,i){var s=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+S.join(s+" ")+s).split(" ");return r(t,"string")||r(t,"undefined")?p(a,t,o,i):(a=(e+" "+z.join(s+" ")+s).split(" "),v(a,t,n))}function y(e,t,r){return h(e,n,n,t,r)}var g=[],C={_version:"3.3.1",_config:{classPrefix:"supports-",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){g.push({name:e,fn:t,options:n})},addAsyncTest:function(e){g.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var w=[],x=t.documentElement,_="svg"===x.nodeName.toLowerCase(),b="Moz O ms Webkit",S=C._config.usePrefixes?b.split(" "):[];C._cssomPrefixes=S;var T={elem:a("modernizr")};Modernizr._q.push(function(){delete T.elem});var E={style:T.elem.style};Modernizr._q.unshift(function(){delete E.style});var z=C._config.usePrefixes?b.toLowerCase().split(" "):[];C._domPrefixes=z,C.testAllProps=h,C.testAllProps=y,Modernizr.addTest("cssanimations",y("animationName","a",!0));var A=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):[];C._prefixes=A;var P=C.testStyles=u;Modernizr.addTest("touchevents",function(){var n;if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var r=["@media (",A.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");P(r,function(e){n=9===e.offsetTop})}return n}),Modernizr.addTest("opacity",function(){var e=a("a").style;return e.cssText=A.join("opacity:.55;"),/^0.55$/.test(e.opacity)}),Modernizr.addTest("target",function(){var t=e.document;if(!("querySelectorAll"in t))return!1;try{return t.querySelectorAll(":target"),!0}catch(n){return!1}});var j=a("input"),N="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),q={};Modernizr.input=function(t){for(var n=0,r=t.length;r>n;n++)q[t[n]]=!!(t[n]in j);return q.list&&(q.list=!(!a("datalist")||!e.HTMLDataListElement)),q}(N),Modernizr.addTest("placeholder","placeholder"in a("input")&&"placeholder"in a("textarea"));var k=function(){function e(e,t){var o;return e?(t&&"string"!=typeof t||(t=a(t||"div")),e="on"+e,o=e in t,!o&&r&&(t.setAttribute||(t=a("div")),t.setAttribute(e,""),o="function"==typeof t[e],t[e]!==n&&(t[e]=n),t.removeAttribute(e)),o):!1}var r=!("onblur"in t.documentElement);return e}();C.hasEvent=k,Modernizr.addTest("pointerevents",function(){var e=!1,t=z.length;for(e=Modernizr.hasEvent("pointerdown");t--&&!e;)k(z[t]+"pointerdown")&&(e=!0);return e}),o(),i(w),delete C.addTest,delete C.addAsyncTest;for(var L=0;L<Modernizr._q.length;L++)Modernizr._q[L]();e.Modernizr=Modernizr}(window,document);