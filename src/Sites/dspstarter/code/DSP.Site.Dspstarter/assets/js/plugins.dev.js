// ==========================================================================
// Plugins
// ==========================================================================











;
/*! grunt-grunticon Stylesheet Loader - v2.1.6 | https://github.com/filamentgroup/grunticon | (c) 2015 Scott Jehl, Filament Group, Inc. | MIT license. */


!function(){function e(e,n,t){"use strict";var o=window.document.createElement("link"),r=n||window.document.getElementsByTagName("script")[0],a=window.document.styleSheets;return o.rel="stylesheet",o.href=e,o.media="only x",r.parentNode.insertBefore(o,r),o.onloadcssdefined=function(e){for(var n,t=0;t<a.length;t++)a[t].href&&a[t].href===o.href&&(n=!0);n?e():setTimeout(function(){o.onloadcssdefined(e)})},o.onloadcssdefined(function(){o.media=t||"all"}),o}function n(e,n){e.onload=function(){e.onload=null,n&&n.call(e)},"isApplicationInstalled"in navigator&&"onloadcssdefined"in e&&e.onloadcssdefined(n)}!function(t){var o=function(r,a){"use strict";if(r&&3===r.length){var i=t.navigator,c=t.document,s=t.Image,d=!(!c.createElementNS||!c.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect||!c.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")||t.opera&&-1===i.userAgent.indexOf("Chrome")||-1!==i.userAgent.indexOf("Series40")),l=new s;l.onerror=function(){o.method="png",o.href=r[2],e(r[2])},l.onload=function(){var t=1===l.width&&1===l.height,i=r[t&&d?0:t?1:2];t&&d?o.method="svg":t?o.method="datapng":o.method="png",o.href=i,n(e(i),a)},l.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",c.documentElement.className+=" grunticon"}};o.loadCSS=e,o.onloadCSS=n,t.grunticon=o}(this),function(e,n){"use strict";var t=n.document,o="grunticon:",r=function(e){if(t.attachEvent?"complete"===t.readyState:"loading"!==t.readyState)e();else{var n=!1;t.addEventListener("readystatechange",function(){n||(n=!0,e())},!1)}},a=function(e){return n.document.querySelector('link[href$="'+e+'"]')},i=function(e){var n,t,r,a,i,c,s={};if(n=e.sheet,!n)return s;t=n.cssRules?n.cssRules:n.rules;for(var d=0;d<t.length;d++)r=t[d].cssText,a=o+t[d].selectorText,i=r.split(");")[0].match(/US\-ASCII\,([^"']+)/),i&&i[1]&&(c=decodeURIComponent(i[1]),s[a]=c);return s},c=function(e){var n,r,a,i;a="data-grunticon-embed";for(var c in e){i=c.slice(o.length);try{n=t.querySelectorAll(i)}catch(s){continue}r=[];for(var d=0;d<n.length;d++)null!==n[d].getAttribute(a)&&r.push(n[d]);if(r.length)for(d=0;d<r.length;d++)r[d].innerHTML=e[c],r[d].style.backgroundImage="none",r[d].removeAttribute(a)}return r},s=function(n){"svg"===e.method&&r(function(){c(i(a(e.href))),"function"==typeof n&&n()})};e.embedIcons=c,e.getCSS=a,e.getIcons=i,e.ready=r,e.svgLoadedCallback=s,e.embedSVG=s}(grunticon,this)}();
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */


window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());

/*! matchMedia() polyfill addListener/removeListener extension. Author & copyright (c) 2012: Scott Jehl. Dual MIT/BSD license */
(function(){
	// monkeypatch unsupported addListener/removeListener with polling
	if( !window.matchMedia( "all" ).addListener ){
		var oldMM = window.matchMedia;

		window.matchMedia = function( q ){
			var ret = oldMM( q ),
				listeners = [],
				last = ret.matches,
				timer,
				check = function(){
					var list = oldMM( q ),
						unmatchToMatch = list.matches && !last,
						matchToUnmatch = !list.matches && last;

                                        //fire callbacks only if transitioning to or from matched state
					if( unmatchToMatch || matchToUnmatch ){
						for( var i =0, il = listeners.length; i< il; i++ ){
							listeners[ i ].call( ret, list );
						}
					}
					last = list.matches;
				};

			ret.addListener = function( cb ){
				listeners.push( cb );
				if( !timer ){
					timer = setInterval( check, 1000 );
				}
			};

			ret.removeListener = function( cb ){
				for( var i =0, il = listeners.length; i< il; i++ ){
					if( listeners[ i ] === cb ){
						listeners.splice( i, 1 );
					}
				}
				if( !listeners.length && timer ){
					clearInterval( timer );
				}
			};

			return ret;
		};
	}
}());
/*!
 * enquire.js v2.1.1 - Awesome Media Queries in JavaScript
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */


;(function (name, context, factory) {
	var matchMedia = window.matchMedia;

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory(matchMedia);
	}
	else if (typeof define === 'function' && define.amd) {
		define(function() {
			return (context[name] = factory(matchMedia));
		});
	}
	else {
		context[name] = factory(matchMedia);
	}
}('enquire', this, function (matchMedia) {

	'use strict';

    /*jshint unused:false */
    /**
     * Helper function for iterating over a collection
     *
     * @param collection
     * @param fn
     */
    function each(collection, fn) {
        var i      = 0,
            length = collection.length,
            cont;

        for(i; i < length; i++) {
            cont = fn(collection[i], i);
            if(cont === false) {
                break; //allow early exit
            }
        }
    }

    /**
     * Helper function for determining whether target object is an array
     *
     * @param target the object under test
     * @return {Boolean} true if array, false otherwise
     */
    function isArray(target) {
        return Object.prototype.toString.apply(target) === '[object Array]';
    }

    /**
     * Helper function for determining whether target object is a function
     *
     * @param target the object under test
     * @return {Boolean} true if function, false otherwise
     */
    function isFunction(target) {
        return typeof target === 'function';
    }

    /**
     * Delegate to handle a media query being matched and unmatched.
     *
     * @param {object} options
     * @param {function} options.match callback for when the media query is matched
     * @param {function} [options.unmatch] callback for when the media query is unmatched
     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
     * @constructor
     */
    function QueryHandler(options) {
        this.options = options;
        !options.deferSetup && this.setup();
    }
    QueryHandler.prototype = {

        /**
         * coordinates setup of the handler
         *
         * @function
         */
        setup : function() {
            if(this.options.setup) {
                this.options.setup();
            }
            this.initialised = true;
        },

        /**
         * coordinates setup and triggering of the handler
         *
         * @function
         */
        on : function() {
            !this.initialised && this.setup();
            this.options.match && this.options.match();
        },

        /**
         * coordinates the unmatch event for the handler
         *
         * @function
         */
        off : function() {
            this.options.unmatch && this.options.unmatch();
        },

        /**
         * called when a handler is to be destroyed.
         * delegates to the destroy or unmatch callbacks, depending on availability.
         *
         * @function
         */
        destroy : function() {
            this.options.destroy ? this.options.destroy() : this.off();
        },

        /**
         * determines equality by reference.
         * if object is supplied compare options, if function, compare match callback
         *
         * @function
         * @param {object || function} [target] the target for comparison
         */
        equals : function(target) {
            return this.options === target || this.options.match === target;
        }

    };
    /**
     * Represents a single media query, manages it's state and registered handlers for this query
     *
     * @constructor
     * @param {string} query the media query string
     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
     */
    function MediaQuery(query, isUnconditional) {
        this.query = query;
        this.isUnconditional = isUnconditional;
        this.handlers = [];
        this.mql = matchMedia(query);

        var self = this;
        this.listener = function(mql) {
            self.mql = mql;
            self.assess();
        };
        this.mql.addListener(this.listener);
    }
    MediaQuery.prototype = {

        /**
         * add a handler for this query, triggering if already active
         *
         * @param {object} handler
         * @param {function} handler.match callback for when query is activated
         * @param {function} [handler.unmatch] callback for when query is deactivated
         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
         */
        addHandler : function(handler) {
            var qh = new QueryHandler(handler);
            this.handlers.push(qh);

            this.matches() && qh.on();
        },

        /**
         * removes the given handler from the collection, and calls it's destroy methods
         * 
         * @param {object || function} handler the handler to remove
         */
        removeHandler : function(handler) {
            var handlers = this.handlers;
            each(handlers, function(h, i) {
                if(h.equals(handler)) {
                    h.destroy();
                    return !handlers.splice(i,1); //remove from array and exit each early
                }
            });
        },

        /**
         * Determine whether the media query should be considered a match
         * 
         * @return {Boolean} true if media query can be considered a match, false otherwise
         */
        matches : function() {
            return this.mql.matches || this.isUnconditional;
        },

        /**
         * Clears all handlers and unbinds events
         */
        clear : function() {
            each(this.handlers, function(handler) {
                handler.destroy();
            });
            this.mql.removeListener(this.listener);
            this.handlers.length = 0; //clear array
        },

        /*
         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
         */
        assess : function() {
            var action = this.matches() ? 'on' : 'off';

            each(this.handlers, function(handler) {
                handler[action]();
            });
        }
    };
    /**
     * Allows for registration of query handlers.
     * Manages the query handler's state and is responsible for wiring up browser events
     *
     * @constructor
     */
    function MediaQueryDispatch () {
        if(!matchMedia) {
            throw new Error('matchMedia not present, legacy browsers require a polyfill');
        }

        this.queries = {};
        this.browserIsIncapable = !matchMedia('only all').matches;
    }

    MediaQueryDispatch.prototype = {

        /**
         * Registers a handler for the given media query
         *
         * @param {string} q the media query
         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
         * @param {function} options.match fired when query matched
         * @param {function} [options.unmatch] fired when a query is no longer matched
         * @param {function} [options.setup] fired when handler first triggered
         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
         */
        register : function(q, options, shouldDegrade) {
            var queries         = this.queries,
                isUnconditional = shouldDegrade && this.browserIsIncapable;

            if(!queries[q]) {
                queries[q] = new MediaQuery(q, isUnconditional);
            }

            //normalise to object in an array
            if(isFunction(options)) {
                options = { match : options };
            }
            if(!isArray(options)) {
                options = [options];
            }
            each(options, function(handler) {
                queries[q].addHandler(handler);
            });

            return this;
        },

        /**
         * unregisters a query and all it's handlers, or a specific handler for a query
         *
         * @param {string} q the media query to target
         * @param {object || function} [handler] specific handler to unregister
         */
        unregister : function(q, handler) {
            var query = this.queries[q];

            if(query) {
                if(handler) {
                    query.removeHandler(handler);
                }
                else {
                    query.clear();
                    delete this.queries[q];
                }
            }

            return this;
        }
    };

	return new MediaQueryDispatch();

}));
/**
 * Deloitte Digital global namespace for modules
 * @namespace DD
 */

;(function() {
	'use strict';

	window.DD = window.DD || {};

	/**
	 * Breakpoints for JavaScript. Works with the Deloitte Digital SCSS @bp mixin
	 *
	 * @namespace bp
	 * @memberof DD
	 * @version 1.0.0
	 * @copyright 2012-2014 Deloitte Digital Australia - http://www.deloittedigital.com/au
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 * @license BSD 3-Clause (http://opensource.org/licenses/BSD-3-Clause)
	 */
	window.DD.bp = (function() {
		var _minBreakpoints,
			_maxBreakpoints,
			_options = {
				isResponsive: true,
				baseFontSize: 16,
				breakpoints: [
					{
						name: 'xxs',
						px: 359
					},
					{
						name: 'xs',
						px: 480
					},
					{
						name: 's',
						px: 640
					},
					{
						name: 'm',
						px: 768
					},
					{
						name: 'l',
						px: 1024
					},
					{
						name: 'xl',
						px: 1244
					},
					{
						name: 'xxl',
						px: 1410
					}
				],
				staticRange: {
					min: 0,
					max: 'xl'
				}
			},
			_initBreakpoints,
			_parseMinMaxInputs,
			_pxToEms,
			_bpToEms,
			_bpIsValidForStatic,
			_bpMin,
			_bpMax,
			_bpBetween,
			get,
			getHeight,
			is,
			isHeight,
			options;

		/**
		 * Sorts the breakpoints and assigns them to an associative array for more efficient lookup.
		 * Immediately invoked on initialisation
		 *
		 * @memberof DD.bp
		 * @private
		 */
		_initBreakpoints = function() {
			//sort the breakpoints into order of smallest to largest
			var sortedBreakpoints = _options.breakpoints.sort(function(a, b) {
				// only sort if the correct objects are present
				if (a.px < b.px) {
					return -1;
				}

				if (a.px > b.px) {
					return 1;
				}

				return 0;
			});

			// reset the breakpoints
			_minBreakpoints = {};
			_maxBreakpoints = {};

			// loop through sorted breakpoints to generate a quick lookup object using the name as a key
			for (var i = 0, len = sortedBreakpoints.length, last = len - 1; i < len; i += 1) {
				_minBreakpoints[sortedBreakpoints[i].name] = parseInt(sortedBreakpoints[i].px, 10);

				// skip the last item in the list as we assume there is no maximum for the last
				if (i < last) {
					// the max breakpoint of the current size is the next breakpoints
					// width minus 1px so there is no overlap between breakpoints
					_maxBreakpoints[sortedBreakpoints[i].name] = parseInt(sortedBreakpoints[i + 1].px - 1, 10);
				}
			}
		};
		_initBreakpoints();

		/**
		 * Splits string syntax 'xs,m' into separate values 'xs' and 'm'
		 * Converts string '5' to numeric 5
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {String|Number} min Number in pixels or string notation
		 * @param  {String|Number} max Number in pixels or string notation
		 * @return {Object} Object containing the min and max values parsed as a number
		 */
		_parseMinMaxInputs = function(min, max) {
			var parseValue = function(val) {
					if (typeof (val) === 'string') {
						// Strip whitespace
						val = val.replace(/\s/g, '');

						// If val only contains digits, convert it to a number
						if (/^\d+$/.test(val)) {
							val = parseInt(val, 10);
						}
					}

					return val;
				},
				bpArray,
				resultMin = min,
				resultMax = max || 0;

			// check if it's using the string syntax, if so - split it
			if (typeof (min) === 'string' && min.indexOf(',') !== -1 && resultMax === 0) {
				bpArray = min.split(',');
				if (bpArray.length === 2) {
					resultMin = bpArray[0];
					resultMax = bpArray[1];
				}
			}

			return {
				min: parseValue(resultMin),
				max: parseValue(resultMax)
			};
		};

		/**
		 * Converts a number of pixels into em
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {Number} px Number in pixels
		 * @return {String} The converted number in em as a string
		 */
		_pxToEms = function(px) {
			return px / _options.baseFontSize;
		};

		/**
		 * Converts a breakpoint name/value (e.g. l) to the px variable then to ems
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {String|Number} breakpoint Breakpoint name as a string, or as a number in pixels
		 * @param  {Boolean} [isMax=false] Flag to determine if the min or max of the breakpoint needs to be used
		 * @return {String} The converted number in em as a string
		 */
		_bpToEms = function(breakpoint, isMax) {
			if (typeof (breakpoint) === 'number') {
				return _pxToEms(breakpoint);
			}

			var list = (isMax === true) ? _maxBreakpoints : _minBreakpoints,
				ems = '0';

			for (var key in list) {
				if (list.hasOwnProperty(key)) {
					if (breakpoint === key.toLowerCase()) {
						ems = _pxToEms(list[key]);
					}
				}
			}

			if (ems === '0') {
				console.warn('DD.bp: Breakpoint \'' + breakpoint + '\' doesn\'t exist - replacing with 0');
			}

			return ems;
		};

		/**
		 * Checks if the breakpoint provided falls inside the valid static min/max region
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {String|Number} min Breakpoint name as a string, as a number in pixels, or as string notation containing both breakpoints
		 * @param  {String|Number} max Breakpoint name as a string, or as a number in pixels
		 * @param  {Boolean} [property='width'] which property to check for (e.g. width or height)
		 * @return {Boolean} If the breakpoint fits inside the static range or not
		 */
		_bpIsValidForStatic = function(min, max, property) {
			if (typeof (property) !== 'string') {
				property = 'width'; //default to width based media query
			}

			if (property !== 'width') {
				return false;
			}

			var bpValidMin = _bpToEms(_options.staticRange.min),
				bpValidMax = _bpToEms(_options.staticRange.max, true),
				parsed = _parseMinMaxInputs(min, max),
				bpMin = _bpToEms(parsed.min),
				bpMax = _bpToEms(parsed.max);

			// if max is 0 we have a min-and-above situation
			if (parsed.max === 0) {
				// need to check that the min is greater than the valid min,
				// AND also that the min is less than the valid maximum
				if (bpMin >= bpValidMin && bpMin < bpValidMax) {
					return true;
				}

				return false;
			}

			// if min is 0 we have a max-and-below situation
			if (parsed.min === 0) {
				if (bpMax >= bpValidMax) {
					return true;
				}

				return false;
			}

			// if the min is above the valid max, or the max is below the valid min
			if (bpMin > bpValidMax || bpMax < bpValidMin) {
				return false;
			}

			// if the breakpoint is a bp-between (assumed because $max and $min aren't 0)
			// don't show if the max isn't above the valid max
			if (bpMax < bpValidMax) {
				return false;
			}

			return true;
		};

		/**
		 * Returns a min-width media query based on bp name or px
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {String|Number} min Breakpoint name as a string, or as a number in pixels
		 * @param  {String} [property='width'] Property to check using a media query. e.g. width or height
		 * @return {String} Media query string
		 */
		_bpMin = function(min, property) {
			var bpMin = _bpToEms(min),
				bpType = (typeof (property) === 'string') ? property : 'width';

			return '(min-' + bpType + ': ' + bpMin + 'em)';
		};

		/**
		 * Returns a max-width media query based on bp name or px
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {String|Number} max Breakpoint name as a string, or as a number in pixels
		 * @param  {String} [property='width'] Property to check using a media query. e.g. width or height
		 * @return {String} Media query string
		 */
		_bpMax = function(max, property) {
			var bpMax = _bpToEms(max, true),
				bpType = (typeof (property) === 'string') ? property : 'width';

			return '(max-' + bpType + ': ' + bpMax + 'em)';
		};

		/**
		 * Returns a min-width and max-width media query based on bp name (can be the same bp name) or px
		 *
		 * @memberof DD.bp
		 * @private
		 * @param  {String|Number} min Breakpoint name as a string, or as a number in pixels
		 * @param  {String|Number} max Breakpoint name as a string, or as a number in pixels
		 * @param  {String} [property='width'] Property to check using a media query. e.g. width or height
		 * @return {String} Media query string
		 */
		_bpBetween = function(min, max, property) {
			var bpMin = _bpToEms(min),
				bpMax = _bpToEms(max, true),
				bpType = (typeof (property) === 'string') ? property : 'width';

			return '(min-' + bpType + ': ' + bpMin + 'em) and (max-' + bpType + ': ' + bpMax + 'em)';
		};

		/**
		 * Breakpoint function that can take the input of a min and max
		 * breakpoint by name or number (in px) along with a property
		 * (like width or height) and returns the media query as a string
		 *
		 * @memberof DD.bp
		 * @example
		 * // large and above
		 * DD.bp.get('l');
		 *
		 * @example
		 * // 300px and above
		 * DD.bp.get(300);
		 *
		 * @example
		 * // large and below
		 * DD.bp.get(0, 'l');
		 *
		 * @example
		 * // 300px and below
		 * DD.bp.get(0, 300);
		 *
		 * @example
		 * // Between small and large
		 * DD.bp.get('s', 'l');
		 *
		 * @example
		 * // Between 100px and 300px
		 * DD.bp.get(100, 300);
		 *
		 * @example
		 * // High resolution displays (can use 'hdpi' as well)
		 * DD.bp.get('retina');
		 *
		 * @example
		 * // Can mix and match names and numbers - between 200px and xlarge
		 * DD.bp.get(200, 'xl');
		 *
		 * @example
		 * // Between small and 960px
		 * DD.bp.get('s', 960);
		 *
		 * @example
		 * // Can use a single string (no spaces) - useful for passing through from HTML to JS
		 * DD.bp.get('m,l');
		 *
		 * @example
		 * // Can also mix names and numbers
		 * DD.bp.get('xs,1000');
		 *
		 * @param  {String|Number} min Breakpoint name as a string, or as a number in pixels, or in comma separated string notation
		 * @param  {String|Number} [max=0] Breakpoint name as a string, or as a number in pixels
		 * @param  {String} [property='width'] Property to check using a media query. e.g. width or height
		 * @return {String} Media query string
		 */
		get = function(min, max, property) {
			var parsed = _parseMinMaxInputs(min, max),
				bpMin = parsed.min,
				bpMax = parsed.max;

			if (typeof (property) !== 'string') {
				property = 'width'; //default to width based media query
			}

			//check what type of bp it is
			if (bpMin === 'retina' || bpMin === 'hdpi') {
				return '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-device-pixel-ratio: 1.5)';
			} else if (bpMax === 0) {
				return _bpMin(bpMin, property);
			} else if (bpMin === 0) {
				return _bpMax(bpMax, property);
			} else {
				return _bpBetween(bpMin, bpMax, property);
			}
		};

		/**
		 * Shortcut for the get() function that returns a height
		 * based media query and returns the media query as a string
		 *
		 * @memberof DD.bp
		 * @example
		 * // Height of 300px and above
		 * DD.bp.getHeight(300);
		 *
		 * @example
		 * // Height of 300px and below
		 * DD.bp.getHeight(0, 300);
		 *
		 * @example
		 * // Between 100px and 300px high
		 * DD.bp.getHeight(100, 300);
		 *
		 * @param  {String|Number} min Breakpoint name as a string, or as a number in pixels, or in comma separated string notation
		 * @param  {String|Number} [max=0] Breakpoint name as a string, or as a number in pixels
		 * @return {String} Media query string
		 */
		getHeight = function(min, max) {
			return get(min, max, 'height');
		};

		/**
		 * Breakpoint function that takes the same inputs as get() but
		 * instead of returning the media query as a string returns
		 * if the current page matches that query as a boolean using
		 * window.matchMedia(mq).matches
		 *
		 * @memberof DD.bp
		 * @example
		 * // returns true if the page is between xs and s
		 * DD.bp.is('xs,s');
		 * DD.bp.is('xs','s');
		 *
		 * @example
		 * // returns true if the page is between 0 and 300px wide
		 * DD.bp.is('0,300');
		 * DD.bp.is(0, 300);
		 *
		 * @param  {String|Number} min Breakpoint name as a string, or as a number in pixels, or in comma separated string notation
		 * @param  {String|Number} [max=0] Breakpoint name as a string, or as a number in pixels
		 * @param  {String} [property='width'] Property to check using a media query. e.g. width or height
		 * @return {Boolean}
		 */
		is = function(min, max, property) {
			if (_options.isResponsive === false) {
				return _bpIsValidForStatic(min, max, property);
			}

			if (window.matchMedia) {
				return window.matchMedia(get(min, max, property)).matches;
			}

			console.warn('DD.bp: Match Media not supported by this browser. Consider adding a polyfill.');

			return false;
		};

		/**
		 * Shortcut for the is() function that returns a height
		 * based media query and returns the media query as a boolean
		 *
		 * @memberof DD.bp
		 * @example
		 * // returns true if the page is between 0 and 300px high
		 * DD.bp.isHeight('0,300');
		 * DD.bp.isHeight(0, 300);
		 *
		 * @param  {String|Number} min Breakpoint name as a string, or as a number in pixels, or in comma separated string notation
		 * @param  {String|Number} [max=0] Breakpoint name as a string, or as a number in pixels
		 * @return {Boolean}
		 */
		isHeight = function(min, max) {
			return is(min, max, 'height');
		};

		/**
		 * Valid options for the Breakpoints array
		 *
		 * @typedef  {Object} DD.bp.BreakpointOptions
		 * @property {String} name Name of the breakpoint e.g. 's', 'm', 'l'
		 * @property {Number} px Number in px for the size of the breakpoint
		 */

		/**
		 * Valid options for the Breakpoints library
		 *
		 * @typedef  {Object} DD.bp.Options
		 * @property {Number} [baseFontSize] Number in px to be used as a base font size in order to calculate em values
		 * @property {DD.bp.BreakpointOptions[]} [breakpoints]
		 */

		/**
		 * User updatable options
		 *
		 * @memberof DD.bp
		 * @example
		 * // update the base font size only
		 * DD.bp.options({
		 *   baseFontSize: 14
		 * });
		 *
		 * @example
		 * // update the breakpoints
		 * DD.bp.options({
		 *   breakpoints: [
		 *     { name: 'small', px: 400 },
		 *     { name: 'medium', px: 800 },
		 *     { name: 'large', px: 1200 }
		 *   ]
		 * });
		 *
		 * @param  {DD.bp.Options} opts Options inside the library to be updated
		 * @return {Boolean}
		 */
		options = function(opts) {
			if (typeof (opts.isResponsive) === 'boolean') {
				_options.isResponsive = opts.isResponsive;
			}

			if (typeof (opts.baseFontSize) === 'number') {
				_options.baseFontSize = opts.baseFontSize;
			}

			if (typeof (opts.breakpoints) === 'object' && opts.breakpoints.length > 0) {
				var isValid = true,
					bps = opts.breakpoints;

				// loop through the breakpoints to check validity
				for (var i = 0, len = bps.length; i < len; i += 1) {
					if ((bps[i].hasOwnProperty('name') && bps[i].hasOwnProperty('px')) === false) {
						isValid = false;
					}
				}

				if (isValid) {
					_options.breakpoints = opts.breakpoints;
					_initBreakpoints();
				} else {
					console.warn('DD.bp: Invalid breakpoints array entered. Please use the format {name: \'string\', px: number}');
					return false;
				}
			}

			return true;
		};

		return {
			get: get,
			getHeight: getHeight,
			is: is,
			isHeight: isHeight,
			options: options
		};
	}());

}());
/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

/*************************
   Velocity jQuery Shim
*************************/

/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */


;(function (window) {
    /***************
         Setup
    ***************/

    /* If jQuery is already loaded, there's no point in loading this shim. */
    if (window.jQuery) {
        return;
    }

    /* jQuery base. */
    var $ = function (selector, context) {
        return new $.fn.init(selector, context);
    };

    /********************
       Private Methods
    ********************/

    /* jQuery */
    $.isWindow = function (obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    };

    /* jQuery */
    $.type = function (obj) {
        if (obj == null) {
            return obj + "";
        }

        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };

    /* jQuery */
    $.isArray = Array.isArray || function (obj) {
        return $.type(obj) === "array";
    };

    /* jQuery */
    function isArraylike (obj) {
        var length = obj.length,
            type = $.type(obj);

        if (type === "function" || $.isWindow(obj)) {
            return false;
        }

        if (obj.nodeType === 1 && length) {
            return true;
        }

        return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
    }

    /***************
       $ Methods
    ***************/

    /* jQuery: Support removed for IE<9. */
    $.isPlainObject = function (obj) {
        var key;

        if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
            return false;
        }

        try {
            if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {
            return false;
        }

        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    };

    /* jQuery */
    $.each = function(obj, callback, args) {
        var value,
            i = 0,
            length = obj.length,
            isArray = isArraylike(obj);

        if (args) {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.apply(obj[i], args);

                    if (value === false) {
                        break;
                    }
                }
            }

        } else {
            if (isArray) {
                for (; i < length; i++) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    value = callback.call(obj[i], i, obj[i]);

                    if (value === false) {
                        break;
                    }
                }
            }
        }

        return obj;
    };

    /* Custom */
    $.data = function (node, key, value) {
        /* $.getData() */
        if (value === undefined) {
            var id = node[$.expando],
                store = id && cache[id];

            if (key === undefined) {
                return store;
            } else if (store) {
                if (key in store) {
                    return store[key];
                }
            }
        /* $.setData() */
        } else if (key !== undefined) {
            var id = node[$.expando] || (node[$.expando] = ++$.uuid);

            cache[id] = cache[id] || {};
            cache[id][key] = value;

            return value;
        }
    };

    /* Custom */
    $.removeData = function (node, keys) {
        var id = node[$.expando],
            store = id && cache[id];

        if (store) {
            $.each(keys, function(_, key) {
                delete store[key];
            });
        }
    };

    /* jQuery */
    $.extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        if (typeof target === "boolean") {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== "object" && $.type(target) !== "function") {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && $.isArray(src) ? src : [];

                        } else {
                            clone = src && $.isPlainObject(src) ? src : {};
                        }

                        target[name] = $.extend(deep, clone, copy);

                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    };

    /* jQuery 1.4.3 */
    $.queue = function (elem, type, data) {
        function $makeArray (arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArraylike(Object(arr))) {
                    /* $.merge */
                    (function(first, second) {
                        var len = +second.length,
                            j = 0,
                            i = first.length;

                        while (j < len) {
                            first[i++] = second[j++];
                        }

                        if (len !== len) {
                            while (second[j] !== undefined) {
                                first[i++] = second[j++];
                            }
                        }

                        first.length = i;

                        return first;
                    })(ret, typeof arr === "string" ? [arr] : arr);
                } else {
                    [].push.call(ret, arr);
                }
            }

            return ret;
        }

        if (!elem) {
            return;
        }

        type = (type || "fx") + "queue";

        var q = $.data(elem, type);

        if (!data) {
            return q || [];
        }

        if (!q || $.isArray(data)) {
            q = $.data(elem, type, $makeArray(data));
        } else {
            q.push(data);
        }

        return q;
    };

    /* jQuery 1.4.3 */
    $.dequeue = function (elems, type) {
        /* Custom: Embed element iteration. */
        $.each(elems.nodeType ? [ elems ] : elems, function(i, elem) {
            type = type || "fx";

            var queue = $.queue(elem, type),
                fn = queue.shift();

            if (fn === "inprogress") {
                fn = queue.shift();
            }

            if (fn) {
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                fn.call(elem, function() {
                    $.dequeue(elem, type);
                });
            }
        });
    };

    /******************
       $.fn Methods
    ******************/

    /* jQuery */
    $.fn = $.prototype = {
        init: function (selector) {
            /* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
            if (selector.nodeType) {
                this[0] = selector;

                return this;
            } else {
                throw new Error("Not a DOM node.");
            }
        },

        offset: function () {
            /* jQuery altered code: Dropped disconnected DOM node checking. */
            var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };

            return {
                top: box.top + (window.pageYOffset || document.scrollTop  || 0)  - (document.clientTop  || 0),
                left: box.left + (window.pageXOffset || document.scrollLeft  || 0) - (document.clientLeft || 0)
            };
        },

        position: function () {
            /* jQuery */
            function offsetParent() {
                var offsetParent = this.offsetParent || document;

                while (offsetParent && (!offsetParent.nodeType.toLowerCase === "html" && offsetParent.style.position === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }

                return offsetParent || document;
            }

            /* Zepto */
            var elem = this[0],
                offsetParent = offsetParent.apply(elem),
                offset = this.offset(),
                parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? { top: 0, left: 0 } : $(offsetParent).offset()

            offset.top -= parseFloat(elem.style.marginTop) || 0;
            offset.left -= parseFloat(elem.style.marginLeft) || 0;

            if (offsetParent.style) {
                parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0
                parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0
            }

            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        }
    };

    /**********************
       Private Variables
    **********************/

    /* For $.data() */
    var cache = {};
    $.expando = "velocity" + (new Date().getTime());
    $.uuid = 0;

    /* For $.queue() */
    var class2type = {},
        hasOwn = class2type.hasOwnProperty,
        toString = class2type.toString;

    var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var i = 0; i < types.length; i++) {
        class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
    }

    /* Makes $(node) possible, without having to call init. */
    $.fn.init.prototype = $.fn;

    /* Globalize Velocity onto the window, and assign its Utilities property. */
    window.Velocity = { Utilities: $ };
})(window);

/******************
    Velocity.js
******************/

;(function (factory) {
    /* CommonJS module. */
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
    /* AMD module. */
    } else if (typeof define === "function" && define.amd) {
        define(factory);
    /* Browser globals. */
    } else {
        factory();
    }
}(function() {
return function (global, window, document, undefined) {

    /***************
        Summary
    ***************/

    /*
    - CSS: CSS stack that works independently from the rest of Velocity.
    - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
      - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
      - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
                  Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
      - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
    - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
    - completeCall(): Handles the cleanup process for each Velocity call.
    */

    /*********************
       Helper Functions
    *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = (function() {
        if (document.documentMode) {
            return document.documentMode;
        } else {
            for (var i = 7; i > 4; i--) {
                var div = document.createElement("div");

                div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

                if (div.getElementsByTagName("span").length) {
                    div = null;

                    return i;
                }
            }
        }

        return undefined;
    })();

    /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
    var rAFShim = (function() {
        var timeLast = 0;

        return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
            var timeCurrent = (new Date()).getTime(),
                timeDelta;

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
            timeLast = timeCurrent + timeDelta;

            return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
        };
    })();

    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
    function compactSparseArray (array) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];

        while (++index < length) {
            var value = array[index];

            if (value) {
                result.push(value);
            }
        }

        return result;
    }

    function sanitizeElements (elements) {
        /* Unwrap jQuery/Zepto objects. */
        if (Type.isWrapped(elements)) {
            elements = [].slice.call(elements);
        /* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
        } else if (Type.isNode(elements)) {
            elements = [ elements ];
        }

        return elements;
    }

    var Type = {
        isString: function (variable) {
            return (typeof variable === "string");
        },
        isArray: Array.isArray || function (variable) {
            return Object.prototype.toString.call(variable) === "[object Array]";
        },
        isFunction: function (variable) {
            return Object.prototype.toString.call(variable) === "[object Function]";
        },
        isNode: function (variable) {
            return variable && variable.nodeType;
        },
        /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
        isNodeList: function (variable) {
            return typeof variable === "object" &&
                /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
                variable.length !== undefined &&
                (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
        },
        /* Determine if variable is a wrapped jQuery or Zepto element. */
        isWrapped: function (variable) {
            return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
        },
        isSVG: function (variable) {
            return window.SVGElement && (variable instanceof window.SVGElement);
        },
        isEmptyObject: function (variable) {
            for (var name in variable) {
                return false;
            }

            return true;
        }
    };

    /*****************
       Dependencies
    *****************/

    var $,
        isJQuery = false;

    if (global.fn && global.fn.jquery) {
        $ = global;
        isJQuery = true;
    } else {
        $ = window.Velocity.Utilities;
    }

    if (IE <= 8 && !isJQuery) {
        throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    } else if (IE <= 7) {
        /* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
        jQuery.fn.velocity = jQuery.fn.animate;

        /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
        return;
    }

    /*****************
        Constants
    *****************/

    var DURATION_DEFAULT = 400,
        EASING_DEFAULT = "swing";

    /*************
        State
    *************/

    var Velocity = {
        /* Container for page-wide Velocity state data. */
        State: {
            /* Detect mobile devices to determine if mobileHA should be turned on. */
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
            isAndroid: /Android/i.test(navigator.userAgent),
            isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
            isChrome: window.chrome,
            isFirefox: /Firefox/i.test(navigator.userAgent),
            /* Create a cached element for re-use when checking for CSS property prefixes. */
            prefixElement: document.createElement("div"),
            /* Cache every prefix match to avoid repeating lookups. */
            prefixMatches: {},
            /* Cache the anchor used for animating window scrolling. */
            scrollAnchor: null,
            /* Cache the browser-specific property names associated with the scroll anchor. */
            scrollPropertyLeft: null,
            scrollPropertyTop: null,
            /* Keep track of whether our RAF tick is running. */
            isTicking: false,
            /* Container for every in-progress call to Velocity. */
            calls: []
        },
        /* Velocity's custom CSS stack. Made global for unit testing. */
        CSS: { /* Defined below. */ },
        /* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
        Utilities: $,
        /* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
        Redirects: { /* Manually registered by the user. */ },
        Easings: { /* Defined below. */ },
        /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
        Promise: window.Promise,
        /* Velocity option defaults, which can be overriden by the user. */
        defaults: {
            queue: "",
            duration: DURATION_DEFAULT,
            easing: EASING_DEFAULT,
            begin: undefined,
            complete: undefined,
            progress: undefined,
            display: undefined,
            visibility: undefined,
            loop: false,
            delay: false,
            mobileHA: true,
            /* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
            _cacheValues: true
        },
        /* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
        init: function (element) {
            $.data(element, "velocity", {
                /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
                isSVG: Type.isSVG(element),
                /* Keep track of whether the element is currently being animated by Velocity.
                   This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
                isAnimating: false,
                /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
                computedStyle: null,
                /* Tween data is cached for each animation on the element so that data can be passed across calls --
                   in particular, end values are used as subsequent start values in consecutive Velocity calls. */
                tweensContainer: null,
                /* The full root property values of each CSS hook being animated on this element are cached so that:
                   1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
                   2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
                rootPropertyValueCache: {},
                /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
                transformCache: {}
            });
        },
        /* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
        hook: null, /* Defined below. */
        /* Velocity-wide animation time remapping for testing purposes. */
        mock: false,
        version: { major: 1, minor: 2, patch: 2 },
        /* Set to 1 or 2 (most verbose) to output debug info to console. */
        debug: false
    };

    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
    if (window.pageYOffset !== undefined) {
        Velocity.State.scrollAnchor = window;
        Velocity.State.scrollPropertyLeft = "pageXOffset";
        Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
        Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
        Velocity.State.scrollPropertyLeft = "scrollLeft";
        Velocity.State.scrollPropertyTop = "scrollTop";
    }

    /* Shorthand alias for jQuery's $.data() utility. */
    function Data (element) {
        /* Hardcode a reference to the plugin name. */
        var response = $.data(element, "velocity");

        /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
        return response === null ? undefined : response;
    };

    /**************
        Easing
    **************/

    /* Step easing generator. */
    function generateStep (steps) {
        return function (p) {
            return Math.round(p * steps) * (1 / steps);
        };
    }

    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    function generateBezier (mX1, mY1, mX2, mY2) {
        var NEWTON_ITERATIONS = 4,
            NEWTON_MIN_SLOPE = 0.001,
            SUBDIVISION_PRECISION = 0.0000001,
            SUBDIVISION_MAX_ITERATIONS = 10,
            kSplineTableSize = 11,
            kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
            float32ArraySupported = "Float32Array" in window;

        /* Must contain four arguments. */
        if (arguments.length !== 4) {
            return false;
        }

        /* Arguments must be numbers. */
        for (var i = 0; i < 4; ++i) {
            if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
                return false;
            }
        }

        /* X values must be in the [0, 1] range. */
        mX1 = Math.min(mX1, 1);
        mX2 = Math.min(mX2, 1);
        mX1 = Math.max(mX1, 0);
        mX2 = Math.max(mX2, 0);

        var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

        function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
        function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
        function C (aA1)      { return 3.0 * aA1; }

        function calcBezier (aT, aA1, aA2) {
            return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
        }

        function getSlope (aT, aA1, aA2) {
            return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
        }

        function newtonRaphsonIterate (aX, aGuessT) {
            for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
                var currentSlope = getSlope(aGuessT, mX1, mX2);

                if (currentSlope === 0.0) return aGuessT;

                var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
                aGuessT -= currentX / currentSlope;
            }

            return aGuessT;
        }

        function calcSampleValues () {
            for (var i = 0; i < kSplineTableSize; ++i) {
                mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
            }
        }

        function binarySubdivide (aX, aA, aB) {
            var currentX, currentT, i = 0;

            do {
                currentT = aA + (aB - aA) / 2.0;
                currentX = calcBezier(currentT, mX1, mX2) - aX;
                if (currentX > 0.0) {
                  aB = currentT;
                } else {
                  aA = currentT;
                }
            } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

            return currentT;
        }

        function getTForX (aX) {
            var intervalStart = 0.0,
                currentSample = 1,
                lastSample = kSplineTableSize - 1;

            for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += kSampleStepSize;
            }

            --currentSample;

            var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample+1] - mSampleValues[currentSample]),
                guessForT = intervalStart + dist * kSampleStepSize,
                initialSlope = getSlope(guessForT, mX1, mX2);

            if (initialSlope >= NEWTON_MIN_SLOPE) {
                return newtonRaphsonIterate(aX, guessForT);
            } else if (initialSlope == 0.0) {
                return guessForT;
            } else {
                return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
            }
        }

        var _precomputed = false;

        function precompute() {
            _precomputed = true;
            if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
        }

        var f = function (aX) {
            if (!_precomputed) precompute();
            if (mX1 === mY1 && mX2 === mY2) return aX;
            if (aX === 0) return 0;
            if (aX === 1) return 1;

            return calcBezier(getTForX(aX), mY1, mY2);
        };

        f.getControlPoints = function() { return [{ x: mX1, y: mY1 }, { x: mX2, y: mY2 }]; };

        var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
        f.toString = function () { return str; };

        return f;
    }

    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
    var generateSpringRK4 = (function () {
        function springAccelerationForState (state) {
            return (-state.tension * state.x) - (state.friction * state.v);
        }

        function springEvaluateStateWithDerivative (initialState, dt, derivative) {
            var state = {
                x: initialState.x + derivative.dx * dt,
                v: initialState.v + derivative.dv * dt,
                tension: initialState.tension,
                friction: initialState.friction
            };

            return { dx: state.v, dv: springAccelerationForState(state) };
        }

        function springIntegrateState (state, dt) {
            var a = {
                    dx: state.v,
                    dv: springAccelerationForState(state)
                },
                b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
                c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
                d = springEvaluateStateWithDerivative(state, dt, c),
                dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
                dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

            state.x = state.x + dxdt * dt;
            state.v = state.v + dvdt * dt;

            return state;
        }

        return function springRK4Factory (tension, friction, duration) {

            var initState = {
                    x: -1,
                    v: 0,
                    tension: null,
                    friction: null
                },
                path = [0],
                time_lapsed = 0,
                tolerance = 1 / 10000,
                DT = 16 / 1000,
                have_duration, dt, last_state;

            tension = parseFloat(tension) || 500;
            friction = parseFloat(friction) || 20;
            duration = duration || null;

            initState.tension = tension;
            initState.friction = friction;

            have_duration = duration !== null;

            /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
            if (have_duration) {
                /* Run the simulation without a duration. */
                time_lapsed = springRK4Factory(tension, friction);
                /* Compute the adjusted time delta. */
                dt = time_lapsed / duration * DT;
            } else {
                dt = DT;
            }

            while (true) {
                /* Next/step function .*/
                last_state = springIntegrateState(last_state || initState, dt);
                /* Store the position. */
                path.push(1 + last_state.x);
                time_lapsed += 16;
                /* If the change threshold is reached, break. */
                if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
                    break;
                }
            }

            /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
               computed path and returns a snapshot of the position according to a given percentComplete. */
            return !have_duration ? time_lapsed : function(percentComplete) { return path[ (percentComplete * (path.length - 1)) | 0 ]; };
        };
    }());

    /* jQuery easings. */
    Velocity.Easings = {
        linear: function(p) { return p; },
        swing: function(p) { return 0.5 - Math.cos( p * Math.PI ) / 2 },
        /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
        spring: function(p) { return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6)); }
    };

    /* CSS3 and Robert Penner easings. */
    $.each(
        [
            [ "ease", [ 0.25, 0.1, 0.25, 1.0 ] ],
            [ "ease-in", [ 0.42, 0.0, 1.00, 1.0 ] ],
            [ "ease-out", [ 0.00, 0.0, 0.58, 1.0 ] ],
            [ "ease-in-out", [ 0.42, 0.0, 0.58, 1.0 ] ],
            [ "easeInSine", [ 0.47, 0, 0.745, 0.715 ] ],
            [ "easeOutSine", [ 0.39, 0.575, 0.565, 1 ] ],
            [ "easeInOutSine", [ 0.445, 0.05, 0.55, 0.95 ] ],
            [ "easeInQuad", [ 0.55, 0.085, 0.68, 0.53 ] ],
            [ "easeOutQuad", [ 0.25, 0.46, 0.45, 0.94 ] ],
            [ "easeInOutQuad", [ 0.455, 0.03, 0.515, 0.955 ] ],
            [ "easeInCubic", [ 0.55, 0.055, 0.675, 0.19 ] ],
            [ "easeOutCubic", [ 0.215, 0.61, 0.355, 1 ] ],
            [ "easeInOutCubic", [ 0.645, 0.045, 0.355, 1 ] ],
            [ "easeInQuart", [ 0.895, 0.03, 0.685, 0.22 ] ],
            [ "easeOutQuart", [ 0.165, 0.84, 0.44, 1 ] ],
            [ "easeInOutQuart", [ 0.77, 0, 0.175, 1 ] ],
            [ "easeInQuint", [ 0.755, 0.05, 0.855, 0.06 ] ],
            [ "easeOutQuint", [ 0.23, 1, 0.32, 1 ] ],
            [ "easeInOutQuint", [ 0.86, 0, 0.07, 1 ] ],
            [ "easeInExpo", [ 0.95, 0.05, 0.795, 0.035 ] ],
            [ "easeOutExpo", [ 0.19, 1, 0.22, 1 ] ],
            [ "easeInOutExpo", [ 1, 0, 0, 1 ] ],
            [ "easeInCirc", [ 0.6, 0.04, 0.98, 0.335 ] ],
            [ "easeOutCirc", [ 0.075, 0.82, 0.165, 1 ] ],
            [ "easeInOutCirc", [ 0.785, 0.135, 0.15, 0.86 ] ]
        ], function(i, easingArray) {
            Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
        });

    /* Determine the appropriate easing type given an easing input. */
    function getEasing(value, duration) {
        var easing = value;

        /* The easing option can either be a string that references a pre-registered easing,
           or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
        if (Type.isString(value)) {
            /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
            if (!Velocity.Easings[value]) {
                easing = false;
            }
        } else if (Type.isArray(value) && value.length === 1) {
            easing = generateStep.apply(null, value);
        } else if (Type.isArray(value) && value.length === 2) {
            /* springRK4 must be passed the animation's duration. */
            /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
               function generated with default tension and friction values. */
            easing = generateSpringRK4.apply(null, value.concat([ duration ]));
        } else if (Type.isArray(value) && value.length === 4) {
            /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
            easing = generateBezier.apply(null, value);
        } else {
            easing = false;
        }

        /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
           if the Velocity-wide default has been incorrectly modified. */
        if (easing === false) {
            if (Velocity.Easings[Velocity.defaults.easing]) {
                easing = Velocity.defaults.easing;
            } else {
                easing = EASING_DEFAULT;
            }
        }

        return easing;
    }

    /*****************
        CSS Stack
    *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
       It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
    var CSS = Velocity.CSS = {

        /*************
            RegEx
        *************/

        RegEx: {
            isHex: /^#([A-f\d]{3}){1,2}$/i,
            /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
            valueUnwrap: /^[A-z]+\((.*)\)$/i,
            wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
            /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
            valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
        },

        /************
            Lists
        ************/

        Lists: {
            colors: [ "fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor" ],
            transformsBase: [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ],
            transforms3D: [ "transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY" ]
        },

        /************
            Hooks
        ************/

        /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
           (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
        /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
           tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
        Hooks: {
            /********************
                Registration
            ********************/

            /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
            /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
            templates: {
                "textShadow": [ "Color X Y Blur", "black 0px 0px 0px" ],
                "boxShadow": [ "Color X Y Blur Spread", "black 0px 0px 0px 0px" ],
                "clip": [ "Top Right Bottom Left", "0px 0px 0px 0px" ],
                "backgroundPosition": [ "X Y", "0% 0%" ],
                "transformOrigin": [ "X Y Z", "50% 50% 0px" ],
                "perspectiveOrigin": [ "X Y", "50% 50%" ]
            },

            /* A "registered" hook is one that has been converted from its template form into a live,
               tweenable property. It contains data to associate it with its root property. */
            registered: {
                /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
                   which consists of the subproperty's name, the associated root property's name,
                   and the subproperty's position in the root's value. */
            },
            /* Convert the templates into individual hooks then append them to the registered object above. */
            register: function () {
                /* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
                   currently set to "transparent" default to their respective template below when color-animated,
                   and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
                   which is almost always set closer to black than white. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
                    CSS.Hooks.templates[CSS.Lists.colors[i]] = [ "Red Green Blue Alpha", rgbComponents ];
                }

                var rootProperty,
                    hookTemplate,
                    hookNames;

                /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
                   Thus, we re-arrange the templates accordingly. */
                if (IE) {
                    for (rootProperty in CSS.Hooks.templates) {
                        hookTemplate = CSS.Hooks.templates[rootProperty];
                        hookNames = hookTemplate[0].split(" ");

                        var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

                        if (hookNames[0] === "Color") {
                            /* Reposition both the hook's name and its default value to the end of their respective strings. */
                            hookNames.push(hookNames.shift());
                            defaultValues.push(defaultValues.shift());

                            /* Replace the existing template for the hook's root property. */
                            CSS.Hooks.templates[rootProperty] = [ hookNames.join(" "), defaultValues.join(" ") ];
                        }
                    }
                }

                /* Hook registration. */
                for (rootProperty in CSS.Hooks.templates) {
                    hookTemplate = CSS.Hooks.templates[rootProperty];
                    hookNames = hookTemplate[0].split(" ");

                    for (var i in hookNames) {
                        var fullHookName = rootProperty + hookNames[i],
                            hookPosition = i;

                        /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
                           and the hook's position in its template's default value string. */
                        CSS.Hooks.registered[fullHookName] = [ rootProperty, hookPosition ];
                    }
                }
            },

            /*****************************
               Injection and Extraction
            *****************************/

            /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
            /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
            getRoot: function (property) {
                var hookData = CSS.Hooks.registered[property];

                if (hookData) {
                    return hookData[0];
                } else {
                    /* If there was no hook match, return the property name untouched. */
                    return property;
                }
            },
            /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
               the targeted hook can be injected or extracted at its standard position. */
            cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
                /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
                if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
                    rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
                }

                /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
                   default to the root's default value as defined in CSS.Hooks.templates. */
                /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
                   zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
                if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                }

                return rootPropertyValue;
            },
            /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
            extractValue: function (fullHookName, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1];

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
                    return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            },
            /* Inject the hook's value into its root property's value. This is used to piece back together the root property
               once Velocity has updated one of its individually hooked values through tweening. */
            injectValue: function (fullHookName, hookValue, rootPropertyValue) {
                var hookData = CSS.Hooks.registered[fullHookName];

                if (hookData) {
                    var hookRoot = hookData[0],
                        hookPosition = hookData[1],
                        rootPropertyValueParts,
                        rootPropertyValueUpdated;

                    rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

                    /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
                       then reconstruct the rootPropertyValue string. */
                    rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
                    rootPropertyValueParts[hookPosition] = hookValue;
                    rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

                    return rootPropertyValueUpdated;
                } else {
                    /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
                    return rootPropertyValue;
                }
            }
        },

        /*******************
           Normalizations
        *******************/

        /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
           and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
        Normalizations: {
            /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
               the targeted element (which may need to be queried), and the targeted property value. */
            registered: {
                clip: function (type, element, propertyValue) {
                    switch (type) {
                        case "name":
                            return "clip";
                        /* Clip needs to be unwrapped and stripped of its commas during extraction. */
                        case "extract":
                            var extracted;

                            /* If Velocity also extracted this value, skip extraction. */
                            if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                extracted = propertyValue;
                            } else {
                                /* Remove the "rect()" wrapper. */
                                extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

                                /* Strip off commas. */
                                extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                            }

                            return extracted;
                        /* Clip needs to be re-wrapped during injection. */
                        case "inject":
                            return "rect(" + propertyValue + ")";
                    }
                },

                blur: function(type, element, propertyValue) {
                    switch (type) {
                        case "name":
                            return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
                        case "extract":
                            var extracted = parseFloat(propertyValue);

                            /* If extracted is NaN, meaning the value isn't already extracted. */
                            if (!(extracted || extracted === 0)) {
                                var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

                                /* If the filter string had a blur component, return just the blur value and unit type. */
                                if (blurComponent) {
                                    extracted = blurComponent[1];
                                /* If the component doesn't exist, default blur to 0. */
                                } else {
                                    extracted = 0;
                                }
                            }

                            return extracted;
                        /* Blur needs to be re-wrapped during injection. */
                        case "inject":
                            /* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
                            if (!parseFloat(propertyValue)) {
                                return "none";
                            } else {
                                return "blur(" + propertyValue + ")";
                            }
                    }
                },

                /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
                opacity: function (type, element, propertyValue) {
                    if (IE <= 8) {
                        switch (type) {
                            case "name":
                                return "filter";
                            case "extract":
                                /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                                   Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                                var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                                if (extracted) {
                                    /* Convert to decimal value. */
                                    propertyValue = extracted[1] / 100;
                                } else {
                                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                                    propertyValue = 1;
                                }

                                return propertyValue;
                            case "inject":
                                /* Opacified elements are required to have their zoom property set to a non-zero value. */
                                element.style.zoom = 1;

                                /* Setting the filter property on elements with certain font property combinations can result in a
                                   highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                                   value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
                                if (parseFloat(propertyValue) >= 1) {
                                    return "";
                                } else {
                                  /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                                  return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                                }
                        }
                    /* With all other browsers, normalization is not required; return the same values that were passed in. */
                    } else {
                        switch (type) {
                            case "name":
                                return "opacity";
                            case "extract":
                                return propertyValue;
                            case "inject":
                                return propertyValue;
                        }
                    }
                }
            },

            /*****************************
                Batched Registrations
            *****************************/

            /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
            register: function () {

                /*****************
                    Transforms
                *****************/

                /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
                   so that they can be referenced in a properties map by their individual names. */
                /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
                   setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
                   Transform setting is batched in this way to improve performance: the transform style only needs to be updated
                   once when multiple transform subproperties are being animated simultaneously. */
                /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
                   transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
                   from being normalized for these browsers so that tweening skips these properties altogether
                   (since it will ignore them as being unsupported by the browser.) */
                if (!(IE <= 9) && !Velocity.State.isGingerbread) {
                    /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
                    share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
                    CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
                }

                for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
                    paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
                    (function() {
                        var transformName = CSS.Lists.transformsBase[i];

                        CSS.Normalizations.registered[transformName] = function (type, element, propertyValue) {
                            switch (type) {
                                /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                                case "name":
                                    return "transform";
                                /* Transform values are cached onto a per-element transformCache object. */
                                case "extract":
                                    /* If this transform has yet to be assigned a value, return its null value. */
                                    if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                                        /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                                        return /^scale/i.test(transformName) ? 1 : 0;
                                    /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                                       Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                                    } else {
                                        return Data(element).transformCache[transformName].replace(/[()]/g, "");
                                    }
                                case "inject":
                                    var invalid = false;

                                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                                       Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
                                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
                                    switch (transformName.substr(0, transformName.length - 1)) {
                                        /* Whitelist unit types for each transform. */
                                        case "translate":
                                            invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                                            break;
                                        /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
                                        case "scal":
                                        case "scale":
                                            /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                                               value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                                               and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                                            if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                                                propertyValue = 1;
                                            }

                                            invalid = !/(\d)$/i.test(propertyValue);
                                            break;
                                        case "skew":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                        case "rotate":
                                            invalid = !/(deg|\d)$/i.test(propertyValue);
                                            break;
                                    }

                                    if (!invalid) {
                                        /* As per the CSS spec, wrap the value in parentheses. */
                                        Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                                    }

                                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
                                    return Data(element).transformCache[transformName];
                            }
                        };
                    })();
                }

                /*************
                    Colors
                *************/

                /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
                   Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
                for (var i = 0; i < CSS.Lists.colors.length; i++) {
                    /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
                       (Otherwise, all functions would take the final for loop's colorName.) */
                    (function () {
                        var colorName = CSS.Lists.colors[i];

                        /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
                        CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                            switch (type) {
                                case "name":
                                    return colorName;
                                /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                                case "extract":
                                    var extracted;

                                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
                                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                                        extracted = propertyValue;
                                    } else {
                                        var converted,
                                            colorNames = {
                                                black: "rgb(0, 0, 0)",
                                                blue: "rgb(0, 0, 255)",
                                                gray: "rgb(128, 128, 128)",
                                                green: "rgb(0, 128, 0)",
                                                red: "rgb(255, 0, 0)",
                                                white: "rgb(255, 255, 255)"
                                            };

                                        /* Convert color names to rgb. */
                                        if (/^[A-z]+$/i.test(propertyValue)) {
                                            if (colorNames[propertyValue] !== undefined) {
                                                converted = colorNames[propertyValue]
                                            } else {
                                                /* If an unmatched color name is provided, default to black. */
                                                converted = colorNames.black;
                                            }
                                        /* Convert hex values to rgb. */
                                        } else if (CSS.RegEx.isHex.test(propertyValue)) {
                                            converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                                        /* If the provided color doesn't match any of the accepted color formats, default to black. */
                                        } else if (!(/^rgba?\(/i.test(propertyValue))) {
                                            converted = colorNames.black;
                                        }

                                        /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                                           repeated spaces (in case the value included spaces to begin with). */
                                        extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                                    }

                                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    if (!(IE <= 8) && extracted.split(" ").length === 3) {
                                        extracted += " 1";
                                    }

                                    return extracted;
                                case "inject":
                                    /* If this is IE<=8 and an alpha component exists, strip it off. */
                                    if (IE <= 8) {
                                        if (propertyValue.split(" ").length === 4) {
                                            propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                                        }
                                    /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                                    } else if (propertyValue.split(" ").length === 3) {
                                        propertyValue += " 1";
                                    }

                                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                                       on all values but the fourth (R, G, and B only accept whole numbers). */
                                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                            }
                        };
                    })();
                }
            }
        },

        /************************
           CSS Property Names
        ************************/

        Names: {
            /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
               Camelcasing is used to normalize property names between and across calls. */
            camelCase: function (property) {
                return property.replace(/-(\w)/g, function (match, subMatch) {
                    return subMatch.toUpperCase();
                });
            },

            /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
            SVGAttribute: function (property) {
                var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

                /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
                if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
                    SVGAttributes += "|transform";
                }

                return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
            },

            /* Determine whether a property should be set with a vendor prefix. */
            /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
               If the property is not at all supported by the browser, return a false flag. */
            prefixCheck: function (property) {
                /* If this property has already been checked, return the cached value. */
                if (Velocity.State.prefixMatches[property]) {
                    return [ Velocity.State.prefixMatches[property], true ];
                } else {
                    var vendors = [ "", "Webkit", "Moz", "ms", "O" ];

                    for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
                        var propertyPrefixed;

                        if (i === 0) {
                            propertyPrefixed = property;
                        } else {
                            /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                            propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) { return match.toUpperCase(); });
                        }

                        /* Check if the browser supports this property as prefixed. */
                        if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                            /* Cache the match. */
                            Velocity.State.prefixMatches[property] = propertyPrefixed;

                            return [ propertyPrefixed, true ];
                        }
                    }

                    /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
                    return [ property, false ];
                }
            }
        },

        /************************
           CSS Property Values
        ************************/

        Values: {
            /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
            hexToRgb: function (hex) {
                var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
                    longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
                    rgbParts;

                hex = hex.replace(shortformRegex, function (m, r, g, b) {
                    return r + r + g + g + b + b;
                });

                rgbParts = longformRegex.exec(hex);

                return rgbParts ? [ parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16) ] : [ 0, 0, 0 ];
            },

            isCSSNullValue: function (value) {
                /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
                   Thus, we check for both falsiness and these special strings. */
                /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
                   templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
                /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
                return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
            },

            /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
            getUnitType: function (property) {
                if (/^(rotate|skew)/i.test(property)) {
                    return "deg";
                } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
                    /* The above properties are unitless. */
                    return "";
                } else {
                    /* Default to px for all other properties. */
                    return "px";
                }
            },

            /* HTML elements default to an associated display type when they're not set to display:none. */
            /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
            getDisplayType: function (element) {
                var tagName = element && element.tagName.toString().toLowerCase();

                if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
                    return "inline";
                } else if (/^(li)$/i.test(tagName)) {
                    return "list-item";
                } else if (/^(tr)$/i.test(tagName)) {
                    return "table-row";
                } else if (/^(table)$/i.test(tagName)) {
                    return "table";
                } else if (/^(tbody)$/i.test(tagName)) {
                    return "table-row-group";
                /* Default to "block" when no match is found. */
                } else {
                    return "block";
                }
            },

            /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
            addClass: function (element, className) {
                if (element.classList) {
                    element.classList.add(className);
                } else {
                    element.className += (element.className.length ? " " : "") + className;
                }
            },

            removeClass: function (element, className) {
                if (element.classList) {
                    element.classList.remove(className);
                } else {
                    element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
                }
            }
        },

        /****************************
           Style Getting & Setting
        ****************************/

        /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        getPropertyValue: function (element, property, rootPropertyValue, forceStyleLookup) {
            /* Get an element's computed property value. */
            /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
               style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
               *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
            function computePropertyValue (element, property) {
                /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
                   element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
                   offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
                   We subtract border and padding to get the sum of interior + scrollbar. */
                var computedValue = 0;

                /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
                   of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
                   codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
                   Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
                if (IE <= 8) {
                    computedValue = $.css(element, property); /* GET */
                /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
                   associated element so that it does not need to be refetched upon every GET. */
                } else {
                    /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
                       toggle display to the element type's default value. */
                    var toggleDisplay = false;

                    if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
                        toggleDisplay = true;
                        CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
                    }

                    function revertDisplay () {
                        if (toggleDisplay) {
                            CSS.setPropertyValue(element, "display", "none");
                        }
                    }

                    if (!forceStyleLookup) {
                        if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                            revertDisplay();

                            return contentBoxHeight;
                        } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                            var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                            revertDisplay();

                            return contentBoxWidth;
                        }
                    }

                    var computedStyle;

                    /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
                       of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
                    if (Data(element) === undefined) {
                        computedStyle = window.getComputedStyle(element, null); /* GET */
                    /* If the computedStyle object has yet to be cached, do so now. */
                    } else if (!Data(element).computedStyle) {
                        computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
                    /* If computedStyle is cached, use it. */
                    } else {
                        computedStyle = Data(element).computedStyle;
                    }

                    /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
                       Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
                       So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
                    if (property === "borderColor") {
                        property = "borderTopColor";
                    }

                    /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
                       instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
                    if (IE === 9 && property === "filter") {
                        computedValue = computedStyle.getPropertyValue(property); /* GET */
                    } else {
                        computedValue = computedStyle[property];
                    }

                    /* Fall back to the property's style value (if defined) when computedValue returns nothing,
                       which can happen when the element hasn't been painted. */
                    if (computedValue === "" || computedValue === null) {
                        computedValue = element.style[property];
                    }

                    revertDisplay();
                }

                /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
                   defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
                   effect as being set to 0, so no conversion is necessary.) */
                /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
                   property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
                   to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
                if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
                    var position = computePropertyValue(element, "position"); /* GET */

                    /* For absolute positioning, jQuery's $.position() only returns values for top and left;
                       right and bottom will have their "auto" value reverted to 0. */
                    /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
                       Not a big deal since we're currently in a GET batch anyway. */
                    if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
                        /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
                        computedValue = $(element).position()[property] + "px"; /* GET */
                    }
                }

                return computedValue;
            }

            var propertyValue;

            /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
               extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
            if (CSS.Hooks.registered[property]) {
                var hook = property,
                    hookRoot = CSS.Hooks.getRoot(hook);

                /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
                   query the DOM for the root property's value. */
                if (rootPropertyValue === undefined) {
                    /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
                    rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
                }

                /* If this root has a normalization registered, peform the associated normalization extraction. */
                if (CSS.Normalizations.registered[hookRoot]) {
                    rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
                }

                /* Extract the hook's value. */
                propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

            /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
               normalize the property's name and value, and handle the special case of transforms. */
            /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
               numerical and therefore do not require normalization extraction. */
            } else if (CSS.Normalizations.registered[property]) {
                var normalizedPropertyName,
                    normalizedPropertyValue;

                normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

                /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
                   At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
                   This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
                   thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
                if (normalizedPropertyName !== "transform") {
                    normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

                    /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
                    if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
                        normalizedPropertyValue = CSS.Hooks.templates[property][1];
                    }
                }

                propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
            }

            /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
            if (!/^[\d-]/.test(propertyValue)) {
                /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
                   their HTML attribute values instead of their CSS style values. */
                if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                    /* Since the height/width attribute values must be set manually, they don't reflect computed values.
                       Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
                    if (/^(height|width)$/i.test(property)) {
                        /* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
                        try {
                            propertyValue = element.getBBox()[property];
                        } catch (error) {
                            propertyValue = 0;
                        }
                    /* Otherwise, access the attribute value directly. */
                    } else {
                        propertyValue = element.getAttribute(property);
                    }
                } else {
                    propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
                }
            }

            /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
               convert CSS null-values to an integer of value 0. */
            if (CSS.Values.isCSSNullValue(propertyValue)) {
                propertyValue = 0;
            }

            if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

            return propertyValue;
        },

        /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
        setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
            var propertyName = property;

            /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
            if (property === "scroll") {
                /* If a container option is present, scroll the container instead of the browser window. */
                if (scrollData.container) {
                    scrollData.container["scroll" + scrollData.direction] = propertyValue;
                /* Otherwise, Velocity defaults to scrolling the browser window. */
                } else {
                    if (scrollData.direction === "Left") {
                        window.scrollTo(propertyValue, scrollData.alternateValue);
                    } else {
                        window.scrollTo(scrollData.alternateValue, propertyValue);
                    }
                }
            } else {
                /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
                   Thus, for now, we merely cache transforms being SET. */
                if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
                    /* Perform a normalization injection. */
                    /* Note: The normalization logic handles the transformCache updating. */
                    CSS.Normalizations.registered[property]("inject", element, propertyValue);

                    propertyName = "transform";
                    propertyValue = Data(element).transformCache[property];
                } else {
                    /* Inject hooks. */
                    if (CSS.Hooks.registered[property]) {
                        var hookName = property,
                            hookRoot = CSS.Hooks.getRoot(property);

                        /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
                        rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

                        propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
                        property = hookRoot;
                    }

                    /* Normalize names and values. */
                    if (CSS.Normalizations.registered[property]) {
                        propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
                        property = CSS.Normalizations.registered[property]("name", element);
                    }

                    /* Assign the appropriate vendor prefix before performing an official style update. */
                    propertyName = CSS.Names.prefixCheck(property)[0];

                    /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
                       Try/catch is avoided for other browsers since it incurs a performance overhead. */
                    if (IE <= 8) {
                        try {
                            element.style[propertyName] = propertyValue;
                        } catch (error) { if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]"); }
                    /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
                    /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
                    } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
                        /* Note: For SVG attributes, vendor-prefixed property names are never used. */
                        /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
                        element.setAttribute(property, propertyValue);
                    } else {
                        element.style[propertyName] = propertyValue;
                    }

                    if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
                }
            }

            /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
            return [ propertyName, propertyValue ];
        },

        /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
        /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
        flushTransformCache: function(element) {
            var transformString = "";

            /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
               (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
            if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
                /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
                   Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
                function getTransformFloat (transformProperty) {
                    return parseFloat(CSS.getPropertyValue(element, transformProperty));
                }

                /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
                   we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
                var SVGTransforms = {
                    translate: [ getTransformFloat("translateX"), getTransformFloat("translateY") ],
                    skewX: [ getTransformFloat("skewX") ], skewY: [ getTransformFloat("skewY") ],
                    /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
                       (this behavior mimics the result of animating all these properties at once on HTML elements). */
                    scale: getTransformFloat("scale") !== 1 ? [ getTransformFloat("scale"), getTransformFloat("scale") ] : [ getTransformFloat("scaleX"), getTransformFloat("scaleY") ],
                    /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
                       defining the rotation's origin point. We ignore the origin values (default them to 0). */
                    rotate: [ getTransformFloat("rotateZ"), 0, 0 ]
                };

                /* Iterate through the transform properties in the user-defined property map order.
                   (This mimics the behavior of non-SVG transform animation.) */
                $.each(Data(element).transformCache, function(transformName) {
                    /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
                       properties so that they match up with SVG's accepted transform properties. */
                    if (/^translate/i.test(transformName)) {
                        transformName = "translate";
                    } else if (/^scale/i.test(transformName)) {
                        transformName = "scale";
                    } else if (/^rotate/i.test(transformName)) {
                        transformName = "rotate";
                    }

                    /* Check that we haven't yet deleted the property from the SVGTransforms container. */
                    if (SVGTransforms[transformName]) {
                        /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
                        transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

                        /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
                           re-insert the same master property if we encounter another one of its axis-specific properties. */
                        delete SVGTransforms[transformName];
                    }
                });
            } else {
                var transformValue,
                    perspective;

                /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
                $.each(Data(element).transformCache, function(transformName) {
                    transformValue = Data(element).transformCache[transformName];

                    /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
                    if (transformName === "transformPerspective") {
                        perspective = transformValue;
                        return true;
                    }

                    /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
                    if (IE === 9 && transformName === "rotateZ") {
                        transformName = "rotate";
                    }

                    transformString += transformName + transformValue + " ";
                });

                /* If present, set the perspective subproperty first. */
                if (perspective) {
                    transformString = "perspective" + perspective + " " + transformString;
                }
            }

            CSS.setPropertyValue(element, "transform", transformString);
        }
    };

    /* Register hooks and normalizations. */
    CSS.Hooks.register();
    CSS.Normalizations.register();

    /* Allow hook setting in the same fashion as jQuery's $.css(). */
    Velocity.hook = function (elements, arg2, arg3) {
        var value = undefined;

        elements = sanitizeElements(elements);

        $.each(elements, function(i, element) {
            /* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
            if (Data(element) === undefined) {
                Velocity.init(element);
            }

            /* Get property value. If an element set was passed in, only return the value for the first element. */
            if (arg3 === undefined) {
                if (value === undefined) {
                    value = Velocity.CSS.getPropertyValue(element, arg2);
                }
            /* Set property value. */
            } else {
                /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
                var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);

                /* Transform properties don't automatically set. They have to be flushed to the DOM. */
                if (adjustedSet[0] === "transform") {
                    Velocity.CSS.flushTransformCache(element);
                }

                value = adjustedSet;
            }
        });

        return value;
    };

    /*****************
        Animation
    *****************/

    var animate = function() {

        /******************
            Call Chain
        ******************/

        /* Logic for determining what to return to the call stack when exiting out of Velocity. */
        function getChain () {
            /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
               default to null instead of returning the targeted elements so that utility function's return value is standardized. */
            if (isUtility) {
                return promiseData.promise || null;
            /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
            } else {
                return elementsWrapped;
            }
        }

        /*************************
           Arguments Assignment
        *************************/

        /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
           objects are defined on a container object that's passed in as Velocity's sole argument. */
        /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
        var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
            /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
            isUtility,
            /* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
               passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
            elementsWrapped,
            argumentIndex;

        var elements,
            propertiesMap,
            options;

        /* Detect jQuery/Zepto elements being animated via the $.fn method. */
        if (Type.isWrapped(this)) {
            isUtility = false;

            argumentIndex = 0;
            elements = this;
            elementsWrapped = this;
        /* Otherwise, raw elements are being animated via the utility function. */
        } else {
            isUtility = true;

            argumentIndex = 1;
            elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
        }

        elements = sanitizeElements(elements);

        if (!elements) {
            return;
        }

        if (syntacticSugar) {
            propertiesMap = arguments[0].properties || arguments[0].p;
            options = arguments[0].options || arguments[0].o;
        } else {
            propertiesMap = arguments[argumentIndex];
            options = arguments[argumentIndex + 1];
        }

        /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
           single raw DOM element is passed in (which doesn't contain a length property). */
        var elementsLength = elements.length,
            elementsIndex = 0;

        /***************************
            Argument Overloading
        ***************************/

        /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
           Overloading is detected by checking for the absence of an object being passed into options. */
        /* Note: The stop and finish actions do not accept animation options, and are therefore excluded from this check. */
        if (!/^(stop|finish|finishAll)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
            /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
            var startingArgumentPosition = argumentIndex + 1;

            options = {};

            /* Iterate through all options arguments */
            for (var i = startingArgumentPosition; i < arguments.length; i++) {
                /* Treat a number as a duration. Parse it out. */
                /* Note: The following RegEx will return true if passed an array with a number as its first item.
                   Thus, arrays are skipped from this check. */
                if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
                    options.duration = arguments[i];
                /* Treat strings and arrays as easings. */
                } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
                    options.easing = arguments[i];
                /* Treat a function as a complete callback. */
                } else if (Type.isFunction(arguments[i])) {
                    options.complete = arguments[i];
                }
            }
        }

        /***************
            Promises
        ***************/

        var promiseData = {
                promise: null,
                resolver: null,
                rejecter: null
            };

        /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
           promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
           method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
           call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
        /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
           triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
           grouped together for the purposes of resolving and rejecting a promise. */
        if (isUtility && Velocity.Promise) {
            promiseData.promise = new Velocity.Promise(function (resolve, reject) {
                promiseData.resolver = resolve;
                promiseData.rejecter = reject;
            });
        }

        /*********************
           Action Detection
        *********************/

        /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
           or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
           first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
        var action;

        switch (propertiesMap) {
            case "scroll":
                action = "scroll";
                break;

            case "reverse":
                action = "reverse";
                break;

            case "finish":
            case "finishAll":
            case "stop":
                /*******************
                    Action: Stop
                *******************/

                /* Clear the currently-active delay on each targeted element. */
                $.each(elements, function(i, element) {
                    if (Data(element) && Data(element).delayTimer) {
                        /* Stop the timer from triggering its cached next() function. */
                        clearTimeout(Data(element).delayTimer.setTimeout);

                        /* Manually call the next() function so that the subsequent queue items can progress. */
                        if (Data(element).delayTimer.next) {
                            Data(element).delayTimer.next();
                        }

                        delete Data(element).delayTimer;
                    }

                    /* If we want to finish everything in the queue, we have to iterate through it
                       and call each function. This will make them active calls below, which will
                       cause them to be applied via the duration setting. */
                    if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
                        /* Iterate through the items in the element's queue. */
                        $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                            /* The queue array can contain an "inprogress" string, which we skip. */
                            if (Type.isFunction(item)) {
                                item();
                            }
                        });

                        /* Clearing the $.queue() array is achieved by resetting it to []. */
                        $.queue(element, Type.isString(options) ? options : "", []);
                    }
                });

                var callsToStop = [];

                /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
                   been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
                   is stopped, the next item in its animation queue is immediately triggered. */
                /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
                   or a custom queue string can be passed in. */
                /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
                   regardless of the element's current queue state. */

                /* Iterate through every active call. */
                $.each(Velocity.State.calls, function(i, activeCall) {
                    /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
                    if (activeCall) {
                        /* Iterate through the active call's targeted elements. */
                        $.each(activeCall[1], function(k, activeElement) {
                            /* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
                               clear calls associated with the relevant queue. */
                            /* Call stopping logic works as follows:
                               - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
                               - options === undefined --> stop current queue:"" call and all queue:false calls.
                               - options === false --> stop only queue:false calls.
                               - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
                            var queueName = (options === undefined) ? "" : options;

                            if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                                return true;
                            }

                            /* Iterate through the calls targeted by the stop command. */
                            $.each(elements, function(l, element) {
                                /* Check that this call was applied to the target element. */
                                if (element === activeElement) {
                                    /* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
                                       due to the queue-clearing above. */
                                    if (options === true || Type.isString(options)) {
                                        /* Iterate through the items in the element's queue. */
                                        $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                                            /* The queue array can contain an "inprogress" string, which we skip. */
                                            if (Type.isFunction(item)) {
                                                /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                                                   (Specifically, the queue will resolve the call's associated promise then abort.)  */
                                                item(null, true);
                                            }
                                        });

                                        /* Clearing the $.queue() array is achieved by resetting it to []. */
                                        $.queue(element, Type.isString(options) ? options : "", []);
                                    }

                                    if (propertiesMap === "stop") {
                                        /* Since "reverse" uses cached start values (the previous call's endValues), these values must be
                                           changed to reflect the final value that the elements were actually tweened to. */
                                        /* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
                                           object. Also, queue:false animations can't be reversed. */
                                        if (Data(element) && Data(element).tweensContainer && queueName !== false) {
                                            $.each(Data(element).tweensContainer, function(m, activeTween) {
                                                activeTween.endValue = activeTween.currentValue;
                                            });
                                        }

                                        callsToStop.push(i);
                                    } else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
                                        /* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
                                        they finish upon the next rAf tick then proceed with normal call completion logic. */
                                        activeCall[2].duration = 1;
                                    }
                                }
                            });
                        });
                    }
                });

                /* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
                   that the complete callback and display:none setting should be skipped since we're completing prematurely. */
                if (propertiesMap === "stop") {
                    $.each(callsToStop, function(i, j) {
                        completeCall(j, true);
                    });

                    if (promiseData.promise) {
                        /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
                        promiseData.resolver(elements);
                    }
                }

                /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
                return getChain();

            default:
                /* Treat a non-empty plain object as a literal properties map. */
                if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
                    action = "start";

                /****************
                    Redirects
                ****************/

                /* Check if a string matches a registered redirect (see Redirects above). */
                } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
                    var opts = $.extend({}, options),
                        durationOriginal = opts.duration,
                        delayOriginal = opts.delay || 0;

                    /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
                    if (opts.backwards === true) {
                        elements = $.extend(true, [], elements).reverse();
                    }

                    /* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
                    $.each(elements, function(elementIndex, element) {
                        /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
                        if (parseFloat(opts.stagger)) {
                            opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
                        } else if (Type.isFunction(opts.stagger)) {
                            opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
                        }

                        /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
                           the duration of each element's animation, using floors to prevent producing very short durations. */
                        if (opts.drag) {
                            /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                            opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

                            /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                               B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                               The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
                            opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex/elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
                        }

                        /* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
                           reduce the opts checking logic required inside the redirect. */
                        Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
                    });

                    /* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
                       (The performance overhead up to this point is virtually non-existant.) */
                    /* Note: The jQuery call chain is kept intact by returning the complete element set. */
                    return getChain();
                } else {
                    var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

                    if (promiseData.promise) {
                        promiseData.rejecter(new Error(abortError));
                    } else {
                        console.log(abortError);
                    }

                    return getChain();
                }
        }

        /**************************
            Call-Wide Variables
        **************************/

        /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
           being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
           avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
           conversion metrics across Velocity animations that are not immediately consecutively chained. */
        var callUnitConversionData = {
                lastParent: null,
                lastPosition: null,
                lastFontSize: null,
                lastPercentToPxWidth: null,
                lastPercentToPxHeight: null,
                lastEmToPx: null,
                remToPx: null,
                vwToPx: null,
                vhToPx: null
            };

        /* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
           Velocity.State.calls array that is processed during animation ticking. */
        var call = [];

        /************************
           Element Processing
        ************************/

        /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
           1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
           2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
           3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
        */

        function processElement () {

            /*************************
               Part I: Pre-Queueing
            *************************/

            /***************************
               Element-Wide Variables
            ***************************/

            var element = this,
                /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
                opts = $.extend({}, Velocity.defaults, options),
                /* A container for the processed data associated with each property in the propertyMap.
                   (Each property in the map produces its own "tween".) */
                tweensContainer = {},
                elementUnitConversionData;

            /******************
               Element Init
            ******************/

            if (Data(element) === undefined) {
                Velocity.init(element);
            }

            /******************
               Option: Delay
            ******************/

            /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
            /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
               (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
            if (parseFloat(opts.delay) && opts.queue !== false) {
                $.queue(element, opts.queue, function(next) {
                    /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
                       The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
                    Data(element).delayTimer = {
                        setTimeout: setTimeout(next, parseFloat(opts.delay)),
                        next: next
                    };
                });
            }

            /*********************
               Option: Duration
            *********************/

            /* Support for jQuery's named durations. */
            switch (opts.duration.toString().toLowerCase()) {
                case "fast":
                    opts.duration = 200;
                    break;

                case "normal":
                    opts.duration = DURATION_DEFAULT;
                    break;

                case "slow":
                    opts.duration = 600;
                    break;

                default:
                    /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
                    opts.duration = parseFloat(opts.duration) || 1;
            }

            /************************
               Global Option: Mock
            ************************/

            if (Velocity.mock !== false) {
                /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
                   Alternatively, a multiplier can be passed in to time remap all delays and durations. */
                if (Velocity.mock === true) {
                    opts.duration = opts.delay = 1;
                } else {
                    opts.duration *= parseFloat(Velocity.mock) || 1;
                    opts.delay *= parseFloat(Velocity.mock) || 1;
                }
            }

            /*******************
               Option: Easing
            *******************/

            opts.easing = getEasing(opts.easing, opts.duration);

            /**********************
               Option: Callbacks
            **********************/

            /* Callbacks must functions. Otherwise, default to null. */
            if (opts.begin && !Type.isFunction(opts.begin)) {
                opts.begin = null;
            }

            if (opts.progress && !Type.isFunction(opts.progress)) {
                opts.progress = null;
            }

            if (opts.complete && !Type.isFunction(opts.complete)) {
                opts.complete = null;
            }

            /*********************************
               Option: Display & Visibility
            *********************************/

            /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
            /* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
            if (opts.display !== undefined && opts.display !== null) {
                opts.display = opts.display.toString().toLowerCase();

                /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
                if (opts.display === "auto") {
                    opts.display = Velocity.CSS.Values.getDisplayType(element);
                }
            }

            if (opts.visibility !== undefined && opts.visibility !== null) {
                opts.visibility = opts.visibility.toString().toLowerCase();
            }

            /**********************
               Option: mobileHA
            **********************/

            /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
               on animating elements. HA is removed from the element at the completion of its animation. */
            /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
            /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
            opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

            /***********************
               Part II: Queueing
            ***********************/

            /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
               In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
            /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
               the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
            function buildQueue (next) {

                /*******************
                   Option: Begin
                *******************/

                /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
                if (opts.begin && elementsIndex === 0) {
                    /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                    try {
                        opts.begin.call(elements, elements);
                    } catch (error) {
                        setTimeout(function() { throw error; }, 1);
                    }
                }

                /*****************************************
                   Tween Data Construction (for Scroll)
                *****************************************/

                /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
                if (action === "scroll") {
                    /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
                    var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
                        scrollOffset = parseFloat(opts.offset) || 0,
                        scrollPositionCurrent,
                        scrollPositionCurrentAlternate,
                        scrollPositionEnd;

                    /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
                       as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
                    if (opts.container) {
                        /* Ensure that either a jQuery object or a raw DOM element was passed in. */
                        if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
                            /* Extract the raw DOM element from the jQuery wrapper. */
                            opts.container = opts.container[0] || opts.container;
                            /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                               (due to the user's natural interaction with the page). */
                            scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

                            /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                               -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                               the scroll container's current scroll position. */
                            scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
                        /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
                        } else {
                            opts.container = null;
                        }
                    } else {
                        /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
                           the appropriate cached property names (which differ based on browser type). */
                        scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
                        /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
                        scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

                        /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
                           and therefore end values do not need to be compounded onto current values. */
                        scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
                    }

                    /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
                    tweensContainer = {
                        scroll: {
                            rootPropertyValue: false,
                            startValue: scrollPositionCurrent,
                            currentValue: scrollPositionCurrent,
                            endValue: scrollPositionEnd,
                            unitType: "",
                            easing: opts.easing,
                            scrollData: {
                                container: opts.container,
                                direction: scrollDirection,
                                alternateValue: scrollPositionCurrentAlternate
                            }
                        },
                        element: element
                    };

                    if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

                /******************************************
                   Tween Data Construction (for Reverse)
                ******************************************/

                /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
                   that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
                   the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
                /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
                /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
                   there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
                   as reverting to the element's values as they were prior to the previous *Velocity* call. */
                } else if (action === "reverse") {
                    /* Abort if there is no prior animation data to reverse to. */
                    if (!Data(element).tweensContainer) {
                        /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
                        $.dequeue(element, opts.queue);

                        return;
                    } else {
                        /*********************
                           Options Parsing
                        *********************/

                        /* If the element was hidden via the display option in the previous call,
                           revert display to "auto" prior to reversal so that the element is visible again. */
                        if (Data(element).opts.display === "none") {
                            Data(element).opts.display = "auto";
                        }

                        if (Data(element).opts.visibility === "hidden") {
                            Data(element).opts.visibility = "visible";
                        }

                        /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
                           Further, remove the previous call's callback options; typically, users do not want these to be refired. */
                        Data(element).opts.loop = false;
                        Data(element).opts.begin = null;
                        Data(element).opts.complete = null;

                        /* Since we're extending an opts object that has already been extended with the defaults options object,
                           we remove non-explicitly-defined properties that are auto-assigned values. */
                        if (!options.easing) {
                            delete opts.easing;
                        }

                        if (!options.duration) {
                            delete opts.duration;
                        }

                        /* The opts object used for reversal is an extension of the options object optionally passed into this
                           reverse call plus the options used in the previous Velocity call. */
                        opts = $.extend({}, Data(element).opts, opts);

                        /*************************************
                           Tweens Container Reconstruction
                        *************************************/

                        /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
                        var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);

                        /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
                        for (var lastTween in lastTweensContainer) {
                            /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                            if (lastTween !== "element") {
                                var lastStartValue = lastTweensContainer[lastTween].startValue;

                                lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                                lastTweensContainer[lastTween].endValue = lastStartValue;

                                /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                                   Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                                   The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
                                if (!Type.isEmptyObject(options)) {
                                    lastTweensContainer[lastTween].easing = opts.easing;
                                }

                                if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                            }
                        }

                        tweensContainer = lastTweensContainer;
                    }

                /*****************************************
                   Tween Data Construction (for Start)
                *****************************************/

                } else if (action === "start") {

                    /*************************
                        Value Transferring
                    *************************/

                    /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
                       while the element was in the process of being animated by Velocity, then this current call is safe to use
                       the end values from the prior call as its start values. Velocity attempts to perform this value transfer
                       process whenever possible in order to avoid requerying the DOM. */
                    /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
                       then the DOM is queried for the element's current values as a last resort. */
                    /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
                    var lastTweensContainer;

                    /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
                       to transfer over end values to use as start values. If it's set to true and there is a previous
                       Velocity call to pull values from, do so. */
                    if (Data(element).tweensContainer && Data(element).isAnimating === true) {
                        lastTweensContainer = Data(element).tweensContainer;
                    }

                    /***************************
                       Tween Data Calculation
                    ***************************/

                    /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
                    /* Property map values can either take the form of 1) a single value representing the end value,
                       or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
                       The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
                       the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
                    function parsePropertyValue (valueData, skipResolvingEasing) {
                        var endValue = undefined,
                            easing = undefined,
                            startValue = undefined;

                        /* Handle the array format, which can be structured as one of three potential overloads:
                           A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
                        if (Type.isArray(valueData)) {
                            /* endValue is always the first item in the array. Don't bother validating endValue's value now
                               since the ensuing property cycling logic does that. */
                            endValue = valueData[0];

                            /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                               start value since easings can only be non-hex strings or arrays. */
                            if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                                startValue = valueData[1];
                            /* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
                            } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                                easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

                                /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
                                if (valueData[2] !== undefined) {
                                    startValue = valueData[2];
                                }
                            }
                        /* Handle the single-value format. */
                        } else {
                            endValue = valueData;
                        }

                        /* Default to the call's easing if a per-property easing type was not defined. */
                        if (!skipResolvingEasing) {
                            easing = easing || opts.easing;
                        }

                        /* If functions were passed in as values, pass the function the current element as its context,
                           plus the element's index and the element set's size as arguments. Then, assign the returned value. */
                        if (Type.isFunction(endValue)) {
                            endValue = endValue.call(element, elementsIndex, elementsLength);
                        }

                        if (Type.isFunction(startValue)) {
                            startValue = startValue.call(element, elementsIndex, elementsLength);
                        }

                        /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
                        return [ endValue || 0, easing, startValue ];
                    }

                    /* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
                       colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
                    $.each(propertiesMap, function(property, value) {
                        /* Find shorthand color properties that have been passed a hex string. */
                        if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
                            /* Parse the value data for each shorthand. */
                            var valueData = parsePropertyValue(value, true),
                                endValue = valueData[0],
                                easing = valueData[1],
                                startValue = valueData[2];

                            if (CSS.RegEx.isHex.test(endValue)) {
                                /* Convert the hex strings into their RGB component arrays. */
                                var colorComponents = [ "Red", "Green", "Blue" ],
                                    endValueRGB = CSS.Values.hexToRgb(endValue),
                                    startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

                                /* Inject the RGB component tweens into propertiesMap. */
                                for (var i = 0; i < colorComponents.length; i++) {
                                    var dataArray = [ endValueRGB[i] ];

                                    if (easing) {
                                        dataArray.push(easing);
                                    }

                                    if (startValueRGB !== undefined) {
                                        dataArray.push(startValueRGB[i]);
                                    }

                                    propertiesMap[property + colorComponents[i]] = dataArray;
                                }

                                /* Remove the intermediary shorthand property entry now that we've processed it. */
                                delete propertiesMap[property];
                            }
                        }
                    });

                    /* Create a tween out of each property, and append its associated data to tweensContainer. */
                    for (var property in propertiesMap) {

                        /**************************
                           Start Value Sourcing
                        **************************/

                        /* Parse out endValue, easing, and startValue from the property's data. */
                        var valueData = parsePropertyValue(propertiesMap[property]),
                            endValue = valueData[0],
                            easing = valueData[1],
                            startValue = valueData[2];

                        /* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
                           we force the property to its camelCase styling to normalize it for manipulation. */
                        property = CSS.Names.camelCase(property);

                        /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
                        var rootProperty = CSS.Hooks.getRoot(property),
                            rootPropertyValue = false;

                        /* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
                           inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
                           Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
                        /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
                           there is no way to check for their explicit browser support, and so we skip skip this check for them. */
                        if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                            if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

                            continue;
                        }

                        /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
                           animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
                           a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
                        if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                            startValue = 0;
                        }

                        /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                           for all of the current call's properties that were *also* animated in the previous call. */
                        /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
                        if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                            if (startValue === undefined) {
                                startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                            }

                            /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                               instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                               attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
                            rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
                        /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
                        } else {
                            /* Handle hooked properties. */
                            if (CSS.Hooks.registered[property]) {
                               if (startValue === undefined) {
                                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
                                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                                       getPropertyValue() will extract the hook from rootPropertyValue. */
                                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                                /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                                   just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                                   root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                                   to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                                } else {
                                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                                }
                            /* Handle non-hooked properties that haven't already been defined via forcefeeding. */
                            } else if (startValue === undefined) {
                                startValue = CSS.getPropertyValue(element, property); /* GET */
                            }
                        }

                        /**************************
                           Value Data Extraction
                        **************************/

                        var separatedValue,
                            endValueUnitType,
                            startValueUnitType,
                            operator = false;

                        /* Separates a property value into its numeric value and its unit type. */
                        function separateValue (property, value) {
                            var unitType,
                                numericValue;

                            numericValue = (value || "0")
                                .toString()
                                .toLowerCase()
                                /* Match the unit type at the end of the value. */
                                .replace(/[%A-z]+$/, function(match) {
                                    /* Grab the unit type. */
                                    unitType = match;

                                    /* Strip the unit type off of value. */
                                    return "";
                                });

                            /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
                            if (!unitType) {
                                unitType = CSS.Values.getUnitType(property);
                            }

                            return [ numericValue, unitType ];
                        }

                        /* Separate startValue. */
                        separatedValue = separateValue(property, startValue);
                        startValue = separatedValue[0];
                        startValueUnitType = separatedValue[1];

                        /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
                        separatedValue = separateValue(property, endValue);
                        endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                            operator = subMatch;

                            /* Strip the operator off of the value. */
                            return "";
                        });
                        endValueUnitType = separatedValue[1];

                        /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
                        startValue = parseFloat(startValue) || 0;
                        endValue = parseFloat(endValue) || 0;

                        /***************************************
                           Property-Specific Value Conversion
                        ***************************************/

                        /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
                        if (endValueUnitType === "%") {
                            /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                               which is identical to the em unit's behavior, so we piggyback off of that. */
                            if (/^(fontSize|lineHeight)$/.test(property)) {
                                /* Convert % into an em decimal value. */
                                endValue = endValue / 100;
                                endValueUnitType = "em";
                            /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                            } else if (/^scale/.test(property)) {
                                endValue = endValue / 100;
                                endValueUnitType = "";
                            /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                            } else if (/(Red|Green|Blue)$/i.test(property)) {
                                endValue = (endValue / 100) * 255;
                                endValueUnitType = "";
                            }
                        }

                        /***************************
                           Unit Ratio Calculation
                        ***************************/

                        /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                           %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                           for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                           from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                           1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
                           2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
                        /* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
                           setting values with the target unit type then comparing the returned pixel value. */
                        /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
                           of batching the SETs and GETs together upfront outweights the potential overhead
                           of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
                        /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
                        function calculateUnitRatios () {

                            /************************
                                Same Ratio Checks
                            ************************/

                            /* The properties below are used to determine whether the element differs sufficiently from this call's
                               previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
                               of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
                               this is done to minimize DOM querying. */
                            var sameRatioIndicators = {
                                    myParent: element.parentNode || document.body, /* GET */
                                    position: CSS.getPropertyValue(element, "position"), /* GET */
                                    fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
                                },
                                /* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
                                samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
                                /* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
                                sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);

                            /* Store these ratio indicators call-wide for the next element to compare against. */
                            callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                            callUnitConversionData.lastPosition = sameRatioIndicators.position;
                            callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

                            /***************************
                               Element-Specific Units
                            ***************************/

                            /* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                               of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
                            var measurement = 100,
                                unitRatios = {};

                            if (!sameEmRatio || !samePercentRatio) {
                                var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

                                Velocity.init(dummy);
                                sameRatioIndicators.myParent.appendChild(dummy);

                                /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                                   Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
                                /* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
                                $.each([ "overflow", "overflowX", "overflowY" ], function(i, property) {
                                    Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                                });
                                Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                                Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                                Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

                                /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
                                $.each([ "minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height" ], function(i, property) {
                                    Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                                });
                                /* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
                                Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

                                /* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
                                unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
                                unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
                                unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

                                sameRatioIndicators.myParent.removeChild(dummy);
                            } else {
                                unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                                unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                                unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                            }

                            /***************************
                               Element-Agnostic Units
                            ***************************/

                            /* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
                               once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
                               that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
                               so we calculate it now. */
                            if (callUnitConversionData.remToPx === null) {
                                /* Default to browsers' default fontSize of 16px in the case of 0. */
                                callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
                            }

                            /* Similarly, viewport units are %-relative to the window's inner dimensions. */
                            if (callUnitConversionData.vwToPx === null) {
                                callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
                                callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
                            }

                            unitRatios.remToPx = callUnitConversionData.remToPx;
                            unitRatios.vwToPx = callUnitConversionData.vwToPx;
                            unitRatios.vhToPx = callUnitConversionData.vhToPx;

                            if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(unitRatios), element);

                            return unitRatios;
                        }

                        /********************
                           Unit Conversion
                        ********************/

                        /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
                        if (/[\/*]/.test(operator)) {
                            endValueUnitType = startValueUnitType;
                        /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                           is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                           on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                           would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
                        /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
                        } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                            /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
                            /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                               match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                               which remains past the point of the animation's completion. */
                            if (endValue === 0) {
                                endValueUnitType = startValueUnitType;
                            } else {
                                /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                                   If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                                elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

                                /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
                                /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                                var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";

                                /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                                   1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
                                switch (startValueUnitType) {
                                    case "%":
                                        /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                                           Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                                           to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                                        startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                        break;

                                    case "px":
                                        /* px acts as our midpoint in the unit conversion process; do nothing. */
                                        break;

                                    default:
                                        startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                                }

                                /* Invert the px ratios to convert into to the target unit. */
                                switch (endValueUnitType) {
                                    case "%":
                                        startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                                        break;

                                    case "px":
                                        /* startValue is already in px, do nothing; we're done. */
                                        break;

                                    default:
                                        startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                                }
                            }
                        }

                        /*********************
                           Relative Values
                        *********************/

                        /* Operator logic must be performed last since it requires unit-normalized start and end values. */
                        /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                           to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                           50 points is added on top of the current % value. */
                        switch (operator) {
                            case "+":
                                endValue = startValue + endValue;
                                break;

                            case "-":
                                endValue = startValue - endValue;
                                break;

                            case "*":
                                endValue = startValue * endValue;
                                break;

                            case "/":
                                endValue = startValue / endValue;
                                break;
                        }

                        /**************************
                           tweensContainer Push
                        **************************/

                        /* Construct the per-property tween object, and push it to the element's tweensContainer. */
                        tweensContainer[property] = {
                            rootPropertyValue: rootPropertyValue,
                            startValue: startValue,
                            currentValue: startValue,
                            endValue: endValue,
                            unitType: endValueUnitType,
                            easing: easing
                        };

                        if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
                    }

                    /* Along with its property data, store a reference to the element itself onto tweensContainer. */
                    tweensContainer.element = element;
                }

                /*****************
                    Call Push
                *****************/

                /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
                   being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
                if (tweensContainer.element) {
                    /* Apply the "velocity-animating" indicator class. */
                    CSS.Values.addClass(element, "velocity-animating");

                    /* The call array houses the tweensContainers for each element being animated in the current call. */
                    call.push(tweensContainer);

                    /* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
                    if (opts.queue === "") {
                        Data(element).tweensContainer = tweensContainer;
                        Data(element).opts = opts;
                    }

                    /* Switch on the element's animating flag. */
                    Data(element).isAnimating = true;

                    /* Once the final element in this call's element set has been processed, push the call array onto
                       Velocity.State.calls for the animation tick to immediately begin processing. */
                    if (elementsIndex === elementsLength - 1) {
                        /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
                           Anything on this call container is subjected to tick() processing. */
                        Velocity.State.calls.push([ call, elements, opts, null, promiseData.resolver ]);

                        /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
                        if (Velocity.State.isTicking === false) {
                            Velocity.State.isTicking = true;

                            /* Start the tick loop. */
                            tick();
                        }
                    } else {
                        elementsIndex++;
                    }
                }
            }

            /* When the queue option is set to false, the call skips the element's queue and fires immediately. */
            if (opts.queue === false) {
                /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
                   we manually inject the delay property here with an explicit setTimeout. */
                if (opts.delay) {
                    setTimeout(buildQueue, opts.delay);
                } else {
                    buildQueue();
                }
            /* Otherwise, the call undergoes element queueing as normal. */
            /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
            } else {
                $.queue(element, opts.queue, function(next, clearQueue) {
                    /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
                       so it's fine if this is repeatedly triggered for each element in the associated call.) */
                    if (clearQueue === true) {
                        if (promiseData.promise) {
                            promiseData.resolver(elements);
                        }

                        /* Do not continue with animation queueing. */
                        return true;
                    }

                    /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
                       See completeCall() for further details. */
                    Velocity.velocityQueueEntryFlag = true;

                    buildQueue(next);
                });
            }

            /*********************
                Auto-Dequeuing
            *********************/

            /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
               must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
               for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
               queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
               first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
            /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
               each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
            /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
               Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
            if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
                $.dequeue(element);
            }
        }

        /**************************
           Element Set Iteration
        **************************/

        /* If the "nodeType" property exists on the elements variable, we're animating a single element.
           Place it in an array so that $.each() can iterate over it. */
        $.each(elements, function(i, element) {
            /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
            if (Type.isNode(element)) {
                processElement.call(element);
            }
        });

        /******************
           Option: Loop
        ******************/

        /* The loop option accepts an integer indicating how many times the element should loop between the values in the
           current call's properties map and the element's property values prior to this call. */
        /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
           to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
           which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
        var opts = $.extend({}, Velocity.defaults, options),
            reverseCallsCount;

        opts.loop = parseInt(opts.loop);
        reverseCallsCount = (opts.loop * 2) - 1;

        if (opts.loop) {
            /* Double the loop count to convert it into its appropriate number of "reverse" calls.
               Subtract 1 from the resulting value since the current call is included in the total alternation count. */
            for (var x = 0; x < reverseCallsCount; x++) {
                /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
                   isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
                   call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
                var reverseOptions = {
                    delay: opts.delay,
                    progress: opts.progress
                };

                /* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
                   so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
                if (x === reverseCallsCount - 1) {
                    reverseOptions.display = opts.display;
                    reverseOptions.visibility = opts.visibility;
                    reverseOptions.complete = opts.complete;
                }

                animate(elements, "reverse", reverseOptions);
            }
        }

        /***************
            Chaining
        ***************/

        /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
        return getChain();
    };

    /* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
    Velocity = $.extend(animate, Velocity);
    /* For legacy support, also expose the literal animate method. */
    Velocity.animate = animate;

    /**************
        Timing
    **************/

    /* Ticker function. */
    var ticker = window.requestAnimationFrame || rAFShim;

    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
       To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
       devices to avoid wasting battery power on inactive tabs. */
    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
    if (!Velocity.State.isMobile && document.hidden !== undefined) {
        document.addEventListener("visibilitychange", function() {
            /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
            if (document.hidden) {
                ticker = function(callback) {
                    /* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
                    return setTimeout(function() { callback(true) }, 16);
                };

                /* The rAF loop has been paused by the browser, so we manually restart the tick. */
                tick();
            } else {
                ticker = window.requestAnimationFrame || rAFShim;
            }
        });
    }

    /************
        Tick
    ************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
    function tick (timestamp) {
        /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
           We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
           the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
           calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
           the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
           by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
        if (timestamp) {
            /* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
               under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
            var timeCurrent = (new Date).getTime();

            /********************
               Call Iteration
            ********************/

            var callsLength = Velocity.State.calls.length;

            /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
               when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
               has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
            if (callsLength > 10000) {
                Velocity.State.calls = compactSparseArray(Velocity.State.calls);
            }

            /* Iterate through each active call. */
            for (var i = 0; i < callsLength; i++) {
                /* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
                if (!Velocity.State.calls[i]) {
                    continue;
                }

                /************************
                   Call-Wide Variables
                ************************/

                var callContainer = Velocity.State.calls[i],
                    call = callContainer[0],
                    opts = callContainer[2],
                    timeStart = callContainer[3],
                    firstTick = !!timeStart,
                    tweenDummyValue = null;

                /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
                   We assign timeStart now so that its value is as close to the real animation start time as possible.
                   (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
                   between that time and now would cause the first few frames of the tween to be skipped since
                   percentComplete is calculated relative to timeStart.) */
                /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
                   first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
                   same style value as the element's current value. */
                if (!timeStart) {
                    timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
                }

                /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
                   (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
                   Accordingly, we ensure that percentComplete does not exceed 1. */
                var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

                /**********************
                   Element Iteration
                **********************/

                /* For every call, iterate through each of the elements in its set. */
                for (var j = 0, callLength = call.length; j < callLength; j++) {
                    var tweensContainer = call[j],
                        element = tweensContainer.element;

                    /* Check to see if this element has been deleted midway through the animation by checking for the
                       continued existence of its data cache. If it's gone, skip animating this element. */
                    if (!Data(element)) {
                        continue;
                    }

                    var transformPropertyExists = false;

                    /**********************************
                       Display & Visibility Toggling
                    **********************************/

                    /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
                       (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
                    if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
                        if (opts.display === "flex") {
                            var flexValues = [ "-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex" ];

                            $.each(flexValues, function(i, flexValue) {
                                CSS.setPropertyValue(element, "display", flexValue);
                            });
                        }

                        CSS.setPropertyValue(element, "display", opts.display);
                    }

                    /* Same goes with the visibility option, but its "none" equivalent is "hidden". */
                    if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                        CSS.setPropertyValue(element, "visibility", opts.visibility);
                    }

                    /************************
                       Property Iteration
                    ************************/

                    /* For every element, iterate through each property. */
                    for (var property in tweensContainer) {
                        /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
                        if (property !== "element") {
                            var tween = tweensContainer[property],
                                currentValue,
                                /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                                   on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                                easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                            /******************************
                               Current Value Calculation
                            ******************************/

                            /* If this is the last tick pass (if we've reached 100% completion for this tween),
                               ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                            if (percentComplete === 1) {
                                currentValue = tween.endValue;
                            /* Otherwise, calculate currentValue based on the current delta from startValue. */
                            } else {
                                var tweenDelta = tween.endValue - tween.startValue;
                                currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));

                                /* If no value change is occurring, don't proceed with DOM updating. */
                                if (!firstTick && (currentValue === tween.currentValue)) {
                                    continue;
                                }
                            }

                            tween.currentValue = currentValue;

                            /* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
                               it can be passed into the progress callback. */
                            if (property === "tween") {
                                tweenDummyValue = currentValue;
                            } else {
                                /******************
                                   Hooks: Part I
                                ******************/

                                /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                                   for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                                   rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                                   updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                                   subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
                                if (CSS.Hooks.registered[property]) {
                                    var hookRoot = CSS.Hooks.getRoot(property),
                                        rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                                    if (rootPropertyValueCache) {
                                        tween.rootPropertyValue = rootPropertyValueCache;
                                    }
                                }

                                /*****************
                                    DOM Update
                                *****************/

                                /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
                                /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
                                var adjustedSetData = CSS.setPropertyValue(element, /* SET */
                                                                           property,
                                                                           tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
                                                                           tween.rootPropertyValue,
                                                                           tween.scrollData);

                                /*******************
                                   Hooks: Part II
                                *******************/

                                /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
                                if (CSS.Hooks.registered[property]) {
                                    /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                                    if (CSS.Normalizations.registered[hookRoot]) {
                                        Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                                    } else {
                                        Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                                    }
                                }

                                /***************
                                   Transforms
                                ***************/

                                /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
                                if (adjustedSetData[0] === "transform") {
                                    transformPropertyExists = true;
                                }

                            }
                        }
                    }

                    /****************
                        mobileHA
                    ****************/

                    /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
                       It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
                    if (opts.mobileHA) {
                        /* Don't set the null transform hack if we've already done so. */
                        if (Data(element).transformCache.translate3d === undefined) {
                            /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                            Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                            transformPropertyExists = true;
                        }
                    }

                    if (transformPropertyExists) {
                        CSS.flushTransformCache(element);
                    }
                }

                /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
                   Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
                if (opts.display !== undefined && opts.display !== "none") {
                    Velocity.State.calls[i][2].display = false;
                }
                if (opts.visibility !== undefined && opts.visibility !== "hidden") {
                    Velocity.State.calls[i][2].visibility = false;
                }

                /* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
                if (opts.progress) {
                    opts.progress.call(callContainer[1],
                                       callContainer[1],
                                       percentComplete,
                                       Math.max(0, (timeStart + opts.duration) - timeCurrent),
                                       timeStart,
                                       tweenDummyValue);
                }

                /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
                if (percentComplete === 1) {
                    completeCall(i);
                }
            }
        }

        /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
        if (Velocity.State.isTicking) {
            ticker(tick);
        }
    }

    /**********************
        Call Completion
    **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
    function completeCall (callIndex, isStopped) {
        /* Ensure the call exists. */
        if (!Velocity.State.calls[callIndex]) {
            return false;
        }

        /* Pull the metadata from the call. */
        var call = Velocity.State.calls[callIndex][0],
            elements = Velocity.State.calls[callIndex][1],
            opts = Velocity.State.calls[callIndex][2],
            resolver = Velocity.State.calls[callIndex][4];

        var remainingCallsExist = false;

        /*************************
           Element Finalization
        *************************/

        for (var i = 0, callLength = call.length; i < callLength; i++) {
            var element = call[i].element;

            /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
            /* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
            /* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
            if (!isStopped && !opts.loop) {
                if (opts.display === "none") {
                    CSS.setPropertyValue(element, "display", opts.display);
                }

                if (opts.visibility === "hidden") {
                    CSS.setPropertyValue(element, "visibility", opts.visibility);
                }
            }

            /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
               a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
               an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
               we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
               is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
            if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
                /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
                if (Data(element)) {
                    Data(element).isAnimating = false;
                    /* Clear the element's rootPropertyValueCache, which will become stale. */
                    Data(element).rootPropertyValueCache = {};

                    var transformHAPropertyExists = false;
                    /* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
                    $.each(CSS.Lists.transforms3D, function(i, transformName) {
                        var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                            currentValue = Data(element).transformCache[transformName];

                        if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                            transformHAPropertyExists = true;

                            delete Data(element).transformCache[transformName];
                        }
                    });

                    /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
                    if (opts.mobileHA) {
                        transformHAPropertyExists = true;
                        delete Data(element).transformCache.translate3d;
                    }

                    /* Flush the subproperty removals to the DOM. */
                    if (transformHAPropertyExists) {
                        CSS.flushTransformCache(element);
                    }

                    /* Remove the "velocity-animating" indicator class. */
                    CSS.Values.removeClass(element, "velocity-animating");
                }
            }

            /*********************
               Option: Complete
            *********************/

            /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
            /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
            if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
                /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
                try {
                    opts.complete.call(elements, elements);
                } catch (error) {
                    setTimeout(function() { throw error; }, 1);
                }
            }

            /**********************
               Promise Resolving
            **********************/

            /* Note: Infinite loops don't return promises. */
            if (resolver && opts.loop !== true) {
                resolver(elements);
            }

            /****************************
               Option: Loop (Infinite)
            ****************************/

            if (Data(element) && opts.loop === true && !isStopped) {
                /* If a rotateX/Y/Z property is being animated to 360 deg with loop:true, swap tween start/end values to enable
                   continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
                $.each(Data(element).tweensContainer, function(propertyName, tweenContainer) {
                    if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
                        tweenContainer.endValue = 0;
                        tweenContainer.startValue = 360;
                    }

                    if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
                        tweenContainer.endValue = 0;
                        tweenContainer.startValue = 100;
                    }
                });

                Velocity(element, "reverse", { loop: true, delay: opts.delay });
            }

            /***************
               Dequeueing
            ***************/

            /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
               which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
               $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
            if (opts.queue !== false) {
                $.dequeue(element, opts.queue);
            }
        }

        /************************
           Calls Array Cleanup
        ************************/

        /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
          (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
        Velocity.State.calls[callIndex] = false;

        /* Iterate through the calls array to determine if this was the final in-progress animation.
           If so, set a flag to end ticking and clear the calls array. */
        for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
            if (Velocity.State.calls[j] !== false) {
                remainingCallsExist = true;

                break;
            }
        }

        if (remainingCallsExist === false) {
            /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
            Velocity.State.isTicking = false;

            /* Clear the calls array so that its length is reset. */
            delete Velocity.State.calls;
            Velocity.State.calls = [];
        }
    }

    /******************
        Frameworks
    ******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
       If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
       also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
       accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
       (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
    global.Velocity = Velocity;

    if (global !== window) {
        /* Assign the element function to Velocity's core animate() method. */
        global.fn.velocity = animate;
        /* Assign the object function's defaults to Velocity's global defaults object. */
        global.fn.velocity.defaults = Velocity.defaults;
    }

    /***********************
       Packaged Redirects
    ***********************/

    /* slideUp, slideDown */
    $.each([ "Down", "Up" ], function(i, direction) {
        Velocity.Redirects["slide" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
            var opts = $.extend({}, options),
                begin = opts.begin,
                complete = opts.complete,
                computedValues = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
                inlineValues = {};

            if (opts.display === undefined) {
                /* Show the element before slideDown begins and hide the element after slideUp completes. */
                /* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
                opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
            }

            opts.begin = function() {
                /* If the user passed in a begin callback, fire it now. */
                begin && begin.call(elements, elements);

                /* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
                for (var property in computedValues) {
                    inlineValues[property] = element.style[property];

                    /* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
                       use forcefeeding to start from computed values and animate down to 0. */
                    var propertyValue = Velocity.CSS.getPropertyValue(element, property);
                    computedValues[property] = (direction === "Down") ? [ propertyValue, 0 ] : [ 0, propertyValue ];
                }

                /* Force vertical overflow content to clip so that sliding works as expected. */
                inlineValues.overflow = element.style.overflow;
                element.style.overflow = "hidden";
            }

            opts.complete = function() {
                /* Reset element to its pre-slide inline values once its slide animation is complete. */
                for (var property in inlineValues) {
                    element.style[property] = inlineValues[property];
                }

                /* If the user passed in a complete callback, fire it now. */
                complete && complete.call(elements, elements);
                promiseData && promiseData.resolver(elements);
            };

            Velocity(element, computedValues, opts);
        };
    });

    /* fadeIn, fadeOut */
    $.each([ "In", "Out" ], function(i, direction) {
        Velocity.Redirects["fade" + direction] = function (element, options, elementsIndex, elementsSize, elements, promiseData) {
            var opts = $.extend({}, options),
                propertiesMap = { opacity: (direction === "In") ? 1 : 0 },
                originalComplete = opts.complete;

            /* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
               callbacks by firing them only when the final element has been reached. */
            if (elementsIndex !== elementsSize - 1) {
                opts.complete = opts.begin = null;
            } else {
                opts.complete = function() {
                    if (originalComplete) {
                        originalComplete.call(elements, elements);
                    }

                    promiseData && promiseData.resolver(elements);
                }
            }

            /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
            /* Note: We allow users to pass in "null" to skip display setting altogether. */
            if (opts.display === undefined) {
                opts.display = (direction === "In" ? "auto" : "none");
            }

            Velocity(this, propertiesMap, opts);
        };
    });

    return Velocity;
}((window.jQuery || window.Zepto || window), window, document);
}));

/******************
   Known Issues
******************/

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */
;
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.5.9
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */

(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: false,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.hidden = 'hidden';
            _.paused = false;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, dataSettings, settings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);
            _.checkResponsive(true);

        }

        return Slick;

    }());

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

        if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator,
                _.options.autoplaySpeed);
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this;

        if (_.options.infinite === false) {

            if (_.direction === 1) {

                if ((_.currentSlide + 1) === _.slideCount -
                    1) {
                    _.direction = 0;
                }

                _.slideHandler(_.currentSlide + _.options.slidesToScroll);

            } else {

                if ((_.currentSlide - 1 === 0)) {

                    _.direction = 1;

                }

                _.slideHandler(_.currentSlide - _.options.slidesToScroll);

            }

        } else {

            _.slideHandler(_.currentSlide + _.options.slidesToScroll);

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dotString;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            dotString = '<ul class="' + _.options.dotsClass + '">';

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
            }

            dotString += '</ul>';

            _.$dots = $(dotString).appendTo(
                _.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.html(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.target),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots).off('click.slick', _.changeSlide);

            if (_.options.pauseOnDotsHover === true && _.options.autoplay === true) {

                $('li', _.$dots)
                    .off('mouseenter.slick', $.proxy(_.setPaused, _, true))
                    .off('mouseleave.slick', $.proxy(_.setPaused, _, false));

            }

        }

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.$list.off('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.html(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css("display","");

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.on('click.slick', {
                message: 'next'
            }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.setPaused, _, true))
                .on('mouseleave.slick', $.proxy(_.setPaused, _, false));
        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        _.$list.on('mouseenter.slick', $.proxy(_.setPaused, _, true));
        _.$list.on('mouseleave.slick', $.proxy(_.setPaused, _, false));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

        if (_.options.autoplay === true) {

            _.autoPlay();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {
                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                        });
                };

                imageToLoad.src = imageSource;

            });
        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = rangeStart + _.options.slidesToShow;
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.paused = false;
        _.autoPlay();

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        _.$slider.trigger('afterChange', [_, index]);

        _.animating = false;

        _.setPosition();

        _.swipeLeft = null;

        if (_.options.autoplay === true && _.paused === false) {
            _.autoPlay();
        }
        if (_.options.accessibility === true) {
            _.initADA();
        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    };

    Slick.prototype.progressiveLazyLoad = function() {

        var _ = this,
            imgCount, targetImage;

        imgCount = $('img[data-lazy]', _.$slider).length;

        if (imgCount > 0) {
            targetImage = $('img[data-lazy]', _.$slider).first();
            targetImage.attr('src', null);
            targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();

                    if (_.options.adaptiveHeight === true) {
                        _.setPosition();
                    }
                })
                .error(function() {
                    targetImage.removeAttr('data-lazy');
                    _.progressiveLazyLoad();
                });
        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, firstVisible;

        firstVisible = _.slideCount - _.options.slidesToShow;

        // check that the new breakpoint can actually accept the
        // "current slide" as the current slide, otherwise we need
        // to set it to the closest possible value.
        if ( !_.options.infinite ) {
            if ( _.slideCount <= _.options.slidesToShow ) {
                _.currentSlide = 0;
            } else if ( _.currentSlide > firstVisible ) {
                _.currentSlide = firstVisible;
            }
        }

         currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === "array" && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(0);

        _.setPosition();

        _.$slider.trigger('reInit', [_]);

        if (_.options.autoplay === true) {
            _.focusHandler();
        }

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption = Slick.prototype.slickSetOption = function(option, value, refresh) {

        var _ = this, l, item;

        if( option === "responsive" && $.type(value) === "array" ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== "array" ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        } else {
            _.options[option] = value;
        }

        if (refresh === true) {
            _.unload();
            _.reinit();
        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.setPaused = function(paused) {

        var _ = this;

        if (_.options.autoplay === true && _.options.pauseOnHover === true) {
            _.paused = paused;
            if (!paused) {
                _.autoPlay();
            } else {
                _.autoPlayClear();
            }
        }
    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if (_.options.autoplay === true) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'left';
            } else {
                return 'right';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount;

        _.dragging = false;

        _.shouldClick = (_.touchObject.swipeLength > 10) ? false : true;

        if (_.touchObject.curX === undefined) {
            return false;
        }

        if (_.touchObject.edgeHit === true) {
            _.$slider.trigger('edge', [_, _.swipeDirection()]);
        }

        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

            switch (_.swipeDirection()) {
                case 'left':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 0;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'left']);
                    break;

                case 'right':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.slideHandler(slideCount);
                    _.currentDirection = 1;
                    _.touchObject = {};
                    _.$slider.trigger('swipe', [_, 'right']);
                    break;
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {};
            }
        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if (document[_.hidden]) {
            _.paused = true;
            _.autoPlayClear();
        } else {
            if (_.options.autoplay === true) {
                _.paused = false;
                _.autoPlay();
            }
        }

    };
    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.on('focus.slick blur.slick', '*', function(event) {
            event.stopImmediatePropagation();
            var sf = $(this);
            setTimeout(function() {
                if (_.isPlay) {
                    if (sf.is(':focus')) {
                        _.autoPlayClear();
                        _.paused = true;
                    } else {
                        _.paused = false;
                        _.autoPlay();
                    }
                }
            }, 0);
        });
    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
/*!
 * jQuery Validation Plugin v1.15.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Jörn Zaefferer
 * Released under the MIT license
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {

							// Insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			return;
		}

		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr[ ":" ], {

	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {
				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable]", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = result && v.check( cleanElement );
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				if ( obj[ i ] ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( this.hasAttribute( "contenteditable" ) ) {
					this.form = $( this ).closest( "form" )[ 0 ];
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( element.hasAttribute( "contenteditable" ) ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			// If a normalizer is defined for this element, then
			// call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( typeof rules.normalizer === "function" ) {
				val = rules.normalizer.call( element, val );

				if ( typeof val !== "string" ) {
					throw new TypeError( "The normalizer should return a string value." );
				}

				// Delete the normalizer from rules to avoid treating
				// it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, rule ) {
			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement( place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value.length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() );

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}
			return this.optional( element ) || ( value % param === 0 );
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}

}));
(function (jQuery, window, undefined) {
	//"use strict";
	var matched, browser;

	jQuery.uaMatch = function (ua) {
		ua = ua.toLowerCase();

		var match = /(yabrowser)[ \/]([\w.]+)/.exec(ua) ||
			/(opr)[ \/]([\w.]+)/.exec(ua) ||
			/(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			/(trident)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
			ua.indexOf('compatible') < 0 && /(firefox)[ \/]([\w.]+)/.exec(ua) || [];
		return {
			browser: match[1] || '',
			version: match[2] || '0'
		};
	};

	// Don't clobber any existing jQuery.browser in case it's different
	if (!jQuery.browser) {
		matched = jQuery.uaMatch(window.navigator.userAgent);
		browser = {};

		if (matched.browser) {
			browser[matched.browser] = true;
			browser.version = matched.version;
		}

		// Chrome is Webkit, but Webkit is also Safari.
		if (browser.chrome) {
			browser.webkit = true;
		} else if (browser.yabrowser) {
			browser.webkit = true;
		}else if (browser.opr) {
			browser.webkit = true;
		} else if (browser.webkit) {
			browser.safari = true;
		}

		jQuery.browser = browser;
	}

})(jQuery, window);
/**
 * Deloitte Digital global namespace for modules
 * @namespace DD
 */

;(function($, window, document, undefined) {
	'use strict';

	window.DD = window.DD || {};

	/*
		Add ability to check if an element is focusable or tabbable to jQuery selectors.
		Taken from jQuery UI
	*/

	var _visible,
		_focusable;

	// helper functions
	_visible = function(element) {
		return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
			return $.css(this, 'visibility') === 'hidden';
		}).length;
	};

	_focusable = function(element, isTabIndexNotNaN) {
		var map, mapName, img, nodeName = element.nodeName.toLowerCase();
		if (nodeName === 'area') {
			map = element.parentNode;
			mapName = map.name;
			if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
				return false;
			}
			img = $('img[usemap=#' + mapName + ']')[0];
			return !!img && _visible(img);
		}
		return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled :
			nodeName === 'a' ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		_visible(element);
	};

	$.extend($.expr[':'], {
		data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
			return function(elem) {
				return !!$.data(elem, dataName);
			};
		}) :
		// support: jQuery <1.8
		function(elem, i, match) {
			return !!$.data(elem, match[3]);
		},

		focusable: function(element) {
			return _focusable(element, !isNaN($.attr(element, 'tabindex')));
		},

		tabbable: function(element) {
			var tabIndex = $.attr(element, 'tabindex'),
				isTabIndexNaN = isNaN(tabIndex);
			return (isTabIndexNaN || tabIndex >= 0) && _focusable(element, !isTabIndexNaN);
		}
	});

	/**
	 * Accessibility (abbreviated to a11y) for Deloitte Digital projects
	 *
	 * @namespace a11y
	 * @memberof DD
	 * @version 1.0.0
	 * @copyright 2015 Deloitte Digital Australia - http://www.deloittedigital.com/au
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	window.DD.a11y = (function() {
		var KEYCODE,
			onEscape,
			onClickOutside,
			tabInsideContainer,
			ariaHideOthers;

		KEYCODE = {
			TAB: 9,
			ESC: 27
		};

		/**
		 * Bind an event to the ESC keypress - useful for modal windows,
		 * or panels that need to be closed with ESC
		 *
		 * @namespace onEscape
		 * @memberof DD.a11y
		 */
		onEscape = (function() {
			var _callback = null,
				_runCallbackOnEscape,
				set,
				unset;

			/**
			 * Checks for the ESC keypress and validates and runs the callback.
			 *
			 * @memberof DD.a11y.onEscape
			 * @param  {Object} event jQuery Event passed through from the keyup event
			 * @private
			 */
			_runCallbackOnEscape = function(event) {
				if (!event.isDefaultPrevented() && event.keyCode && event.keyCode === KEYCODE.ESC) {
					if (typeof (_callback) === 'function') {
						_callback();
					}
				}
			};

			/**
			 * Sets a callback and the event listeners for the keyup event. Only one
			 * event can be registered at the one time. Unset is automatically run before
			 * setting a new event.
			 *
			 * @memberof DD.a11y.onEscape
			 * @param  {Function} callback Function to be run
			 */
			set = function(callback) {
				unset();

				_callback = callback;
				$(document).on('keyup.accessibleOnEscape', _runCallbackOnEscape);
			};

			/**
			 * Unset the event listener, recommended to call this event inside the callback
			 * that is passed through to the `set` function.
			 *
			 * @memberof DD.a11y.onEscape
			 */
			unset = function() {
				_callback = null;
				$(document).off('keyup.accessibleOnEscape', _runCallbackOnEscape);
			};

			return {
				set: set,
				unset: unset
			};

		}());

		/**
		 * Bind an event to when you click outside of a specified area
		 *
		 * @namespace onClickOutside
		 * @memberof DD.a11y
		 */
		onClickOutside = (function() {
			var _container = null,
				_callback = null,
				_runCallbackOnClickOutside,
				set,
				unset;

			/**
			 * Checks for the ESC keypress and validates and runs the callback.
			 *
			 * @memberof DD.a11y.onClickOutside
			 * @param  {Object} event jQuery Event passed through from the keyup event
			 * @private
			 */
			_runCallbackOnClickOutside = function(event) {
				var origEvent = event.originalEvent;
				origEvent.stopPropagation();

				if ($(event.target).closest(_container).length === 0) {
					event.preventDefault();
					origEvent.preventDefault();

					if (typeof (_callback) === 'function') {
						_callback();
					}
				}
			};

			/**
			 * Sets a callback and the event listeners for the document click event. Only one
			 * event can be registered at the one time. Unset is automatically run before
			 * setting a new event.
			 *
			 * @memberof DD.a11y.onClickOutside
			 * @param  {String|Object} container DOM Element, jQuery Element or selector of the element to click outside of
			 * @param  {Function} callback Function to be run
			 */
			set = function(container, callback) {
				unset();

				_callback = callback;
				_container = container;

				$(document).on('click.accessibleOnClickOutside', _runCallbackOnClickOutside);
			};

			/**
			 * Unset the event listener, recommended to call this event inside the callback
			 * that is passed through to the `set` function.
			 *
			 * @memberof DD.a11y.onClickOutside
			 */
			unset = function() {
				_callback = null;
				$(document).off('click.accessibleOnClickOutside', _runCallbackOnClickOutside);
			};

			return {
				set: set,
				unset: unset
			};

		}());

		/**
		 * Force the keyboard tabbing to only be able to take place inside the
		 * specific container. This is useful for modal windows or when you
		 * need to lock user tabbing inside an area where they shouldn't be
		 * able to interact outside of it.
		 *
		 * @namespace tabInsideContainer
		 * @memberof DD.a11y
		 */
		tabInsideContainer = (function() {
			var _isSet = false,
				_$container,
				set,
				unset;

			/**
			 * Sets `keydown` event listeners on the first and last tabbable element
			 * in the container to tab to each other instead of the default action of
			 * tabbing outside of the container entirely.
			 *
			 * @memberof DD.a11y.tabInsideContainer
			 * @param  {String|Object} container DOM Element, jQuery Element or selector to be used as the bounding container
			 * @param  {Boolean} tabToContainer Determine if we should automatically tab to the first item or not
			 */
			set = function(container, tabToContainer) {
				if (_isSet) {
					console.warn('DD.a11y: tabInsideContainer has already been set. Unsetting now');
					unset();
				}

				_$container = $(container);

				// keyboard binding for accessibility
				var $firstFocusable = _$container.find(':tabbable:first').eq(0),
					$lastFocusable = _$container.find(':tabbable:last').eq(0),
					autoTabTo = (tabToContainer === true) || false;

				// if on the first item with SHIFT+TAB go to the last item
				$firstFocusable.off('keydown.accessibleTabInsideContainer').on('keydown.accessibleTabInsideContainer', function(event) {
					if (event.shiftKey && event.keyCode === KEYCODE.TAB) {
						event.preventDefault();
						$lastFocusable.get(0).focus();
					}
				});

				// if on the last item and TAB go to the first item
				$lastFocusable.off('keydown.accessibleTabInsideContainer').on('keydown.accessibleTabInsideContainer', function(event) {
					if (!event.shiftKey && event.keyCode === KEYCODE.TAB) {
						event.preventDefault();
						$firstFocusable.get(0).focus();
					}
				});

				if (autoTabTo) {
					_$container.get(0).focus();
				}

				_isSet = true;
			};

			/**
			 * Unsets the `keydown` event listeners on the first and last tabbable element
			 * in the container
			 *
			 * @memberof DD.a11y.tabInsideContainer
			 */
			unset = function() {
				if (!_isSet) {
					console.warn('DD.a11y: tabInsideContainer hasn\'t been set yet.');
					return;
				}

				var $firstFocusable = _$container.find(':tabbable:first').eq(0),
					$lastFocusable = _$container.find(':tabbable:last').eq(0);

				$firstFocusable.off('keydown.accessibleTabInsideContainer');
				$lastFocusable.off('keydown.accessibleTabInsideContainer');

				_$container = null;
				_isSet = false;
			};

			return {
				set: set,
				unset: unset
			};
		}());

		ariaHideOthers = (function() {
			var _elements = [],
				_validateElements,
				_checkIfShouldBeHidden,
				set,
				unset;

			_validateElements = function(elements) {
				var validated = [];

				for (var i = 0, len = elements.length; i < len; i += 1) {
					var el = $(elements[i]).get(0),
						ignoreBlock = false;

					if (el.nodeName.toLowerCase() === 'script' || el.nodeName.toLowerCase() === 'link') {
						ignoreBlock = true;
					}

					if ($(el).attr('aria-hidden') === 'true') {
						ignoreBlock = true;
					}

					if (!ignoreBlock) {
						validated.push(el);
					}
				}

				return validated;
			};

			_checkIfShouldBeHidden = function(container, scope) {
				$(scope).find('> *').each(function(i, el) {
					if ($(el).get(0) === $(container).get(0)) {
						_elements = _elements.concat(_validateElements($(el).siblings()));
					} else if ($(el).find(container).length > 0) {
						_elements = _elements.concat(_validateElements($(el).siblings()));
						_checkIfShouldBeHidden(container, el);
					}
				});
			};

			set = function(container, scope) {
				unset();

				scope = scope || 'body';

				_elements = [];
				_checkIfShouldBeHidden(container, scope);

				$(_elements).attr({
					'aria-hidden': true
				});
			};

			unset = function() {
				if (_elements && _elements.length > 0) {
					$(_elements).removeAttr('aria-hidden');
					_elements = [];
				}
			};

			return {
				set: set,
				unset: unset
			};
		}());

		return {
			onEscape: onEscape,
			onClickOutside: onClickOutside,
			tabInsideContainer: tabInsideContainer,
			ariaHideOthers: ariaHideOthers
		};
	}());

}(jQuery, window, document));
/**
 * Deloitte Digital global namespace for modules
 * @namespace DD
 */

;(function() {
	'use strict';

	window.DD = window.DD || {};

	/**
	 * Breakpoints for JavaScript. Works with the Deloitte Digital SCSS @bp mixin
	 *
	 * @namespace bpAttach
	 * @memberof DD
	 * @version 1.0.0
	 * @copyright 2015 Deloitte Digital Australia - http://www.deloittedigital.com/au
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	window.DD.bpAttach = (function() {
		var at;

		/**
		 * Run specific functionality at a certain breakpoint and
		 * use enquire.js to trigger the attach or detach functions
		 * as expected when the breakpoint is matched/unmatched
		 *
		 * @memberof DD.bpAttach
		 * @example
		 * // returns true if the page is between 0 and 300px high
		 * DD.bpAttach.at('m,l', doWhenAttached, doWhenNotAttached);
		 * DD.bpAttach.at('0,l', function(init) {
		 *     console.log('fire when the screen is between 0 and l');
		 *     console.log('if init === true, you can change the required code to stop inital screen flicker', init);
		 * }, function(init) {
		 *     console.log('fire when the screen is NOT between 0 and l');
		 *     console.log('if init === true, you can change the required code to stop inital screen flicker', init);
		 * });
		 *
		 * @param  {String} bp Breakpoint name as a string
		 * @param  {Function} attach Function to call on match of the included breakpoint
		 * @param  {Function} detach Function to call on unmatch of the included breakpoint
		 */
		at = function(bp, attach, detach) {
			if (!enquire) {
				console.error('DD.bpAttach: enquire.js is required to use DD.bpAttach.at()');
				return;
			}

			if (!DD.bp) {
				console.error('DD.bpAttach: DD.bp is required to use DD.bpAttach.at()');
				return;
			}

			var onAttach,
				onDetach;

			onAttach = function(init) {
				init = (typeof (init) === 'boolean' && init);

				if (typeof (attach) === 'function') {
					attach(init);
				}
			};

			onDetach = function(init) {
				init = (typeof (init) === 'boolean' && init);

				if (typeof (detach) === 'function') {
					detach(init);
				}
			};

			if (DD.bp.is(bp)) {
				onAttach(true);
			} else {
				onDetach(true);
			}

			enquire.register(DD.bp.get(bp), {
				match: onAttach,
				unmatch: onDetach
			});
		};

		return {
			at: at
		};
	}());

}());
// ==========================================================================
// NO SCROLL - Stops the page from scrolling
// ==========================================================================
/**
 * Deloitte Digital global namespace for modules
 * @namespace DD
 */

;(function($, window, document, undefined) {
	'use strict';

	window.DD = window.DD || {};

	/**
	 * Allows for the ability to disable/enable scrolling of the page
	 *
	 * @namespace noScroll
	 * @memberof DD
	 * @version 1.0.0
	 * @copyright 2015 Deloitte Digital Australia - http://www.deloittedigital.com/au
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	window.DD.noScroll = (function() {
		var CLASSES,
			$body = $('body'),
			set,
			unset,
			refresh;

		CLASSES = {
			NO_SCROLL: 'has-no-scroll'
		};

		/**
		 * Stops the page from scrolling
		 *
		 * @memberof DD.noScroll
		 */
		set = function() {
			if ($body.hasClass(CLASSES.NO_SCROLL) === false) {
				var scrollTop = $(window).scrollTop();

				$body.addClass(CLASSES.NO_SCROLL).css({
					top: -scrollTop
				});
			}
		};

		/**
		 * Allows the page to start scrolling again
		 *
		 * @memberof DD.noScroll
		 */
		unset = function() {
			if ($body.hasClass(CLASSES.NO_SCROLL)) {
				var top = parseInt($body.css('top'), 10);

				$body.css({
					top: ''
				}).removeClass(CLASSES.NO_SCROLL);

				$(window).scrollTop(-top);
			}
		};

		/**
		 * On change of the scroll height of the page, update the scroll position
		 *
		 * @memberof DD.noScroll
		 */
		refresh = function() {
			if ($body.hasClass(CLASSES.NO_SCROLL)) {
				// If the page has gotten shorter, make sure we aren't scrolled past the footer
				if ($body.height() > $(window).height()) {
					if ($body.offset().top - $(window).height() < -$body.height()) {
						$body.css({
							top: -($body.height() - $(window).height())
						});
					}
				}
			}
		};

		return {
			set: set,
			unset: unset,
			refresh: refresh
		};
	}());

}(jQuery, window, document));
/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
// 
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
// 
// About: Release History
// 
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
// 
// Topic: Note for non-jQuery users
// 
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
// 
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

(function(window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Since jQuery really isn't required for this plugin, use `jQuery` as the
  // namespace only if it already exists, otherwise use the `Cowboy` namespace,
  // creating it if necessary.
  var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),
    
    // Internal method reference.
    jq_throttle;
  
  // Method: jQuery.throttle
  // 
  // Throttle execution of a function. Especially useful for rate limiting
  // execution of handlers on events like resize and scroll. If you want to
  // rate-limit execution of a function to a single time, see the
  // <jQuery.debounce> method.
  // 
  // In this visualization, | is a throttled-function call and X is the actual
  // callback execution:
  // 
  // > Throttled with `no_trailing` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X    X        X    X    X    X    X    X
  // > 
  // > Throttled with `no_trailing` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X             X    X    X    X    X
  // 
  // Usage:
  // 
  // > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', throttled );
  // > jQuery('selector').unbind( 'someevent', throttled );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
  //    true, callback will only execute every `delay` milliseconds while the
  //    throttled-function is being called. If no_trailing is false or
  //    unspecified, callback will be executed one final time after the last
  //    throttled-function call. (After the throttled-function has not been
  //    called for `delay` milliseconds, the internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the throttled-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, throttled, function.
  
  $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,
      
      // Keep track of the last time `callback` was executed.
      last_exec = 0;
    
    // `no_trailing` defaults to falsy.
    if ( typeof no_trailing !== 'boolean' ) {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }
    
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
      var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;
      
      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply( that, args );
      };
      
      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      };
      
      if ( debounce_mode && !timeout_id ) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }
      
      // Clear any existing timeout.
      timeout_id && clearTimeout( timeout_id );
      
      if ( debounce_mode === undefined && elapsed > delay ) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();
        
      } else if ( no_trailing !== true ) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        // 
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        // 
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
      }
    };
    
    // Set the guid of `wrapper` function to the same of original callback, so
    // it can be removed in jQuery 1.4+ .unbind or .die by using the original
    // callback as a reference.
    if ( $.guid ) {
      wrapper.guid = callback.guid = callback.guid || $.guid++;
    }
    
    // Return the wrapper function.
    return wrapper;
  };
  
  // Method: jQuery.debounce
  // 
  // Debounce execution of a function. Debouncing, unlike throttling,
  // guarantees that a function is only executed a single time, either at the
  // very beginning of a series of calls, or at the very end. If you want to
  // simply rate-limit execution of a function, see the <jQuery.throttle>
  // method.
  // 
  // In this visualization, | is a debounced-function call and X is the actual
  // callback execution:
  // 
  // > Debounced with `at_begin` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // >                          X                                 X
  // > 
  // > Debounced with `at_begin` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X                                 X
  // 
  // Usage:
  // 
  // > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', debounced );
  // > jQuery('selector').unbind( 'someevent', debounced );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
  //    unspecified, callback will only be executed `delay` milliseconds after
  //    the last debounced-function call. If at_begin is true, callback will be
  //    executed only at the first debounced-function call. (After the
  //    throttled-function has not been called for `delay` milliseconds, the
  //    internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the debounced-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, debounced, function.
  
  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };
  
})(this);
/* =============================================================================
   DD AUTOCOMPLETE - A jQuery plugin for autocomplete
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/autocomplete.html */

;(function($, window, document, undefined) {

	'use strict';

	var	KEYCODE,
		TYPES,
		_checkForProperWord,
		_updateOptionsFromDOM,
		_init;

	KEYCODE = {
		UP: 38,
		DOWN: 40,
		TAB: 9,
		ENTER: 13
	};

	TYPES = {
		SIMPLE: 'simple',
		LINKS: 'links'
	};

	/**
	 * Check the word searched for to ensure that it's a valid search term
	 *
	 * @memberof $.ddAutocomplete
	 * @param {String} searchTerm The search term string to check
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_checkForProperWord = function(searchTerm, options) {
		// Check for a word of 3 characters or more
		var wordArray = searchTerm.split(' ');

		if (wordArray.length > 1) {
			// has more than one word
			var isValid = false;

			for (var i = 0, len = wordArray.length; i < len; i += 1) {
				if (wordArray[i].length >= options.ajaxMinChars) {
					isValid = true;
					break;
				}
			}

			return isValid;
		}

		if (searchTerm.length >= options.ajaxMinChars) {
			return true;
		}

		return false;
	};

	/**
	 * Look at the container to see if there are any DOM attributes that
	 * can override base options
	 *
	 * @memberof $.ddAutocomplete
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_updateOptionsFromDOM = function($container, options) {
		var updatedOptions = $.extend(true, {}, options);

		updatedOptions.url = $container.attr(options.attrs.url) || options.url;
		updatedOptions.type = $container.attr(options.attrs.type) || options.type;

		return updatedOptions;
	};

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddAutocomplete
	 * @param {Object} button The container of the autocomplete
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_init = function(container, options) {
		var $container = $(container),
			_isDisplayed = false,
			_isFirstFocus = true,
			$searchField = $container.find('.' + options.classes.searchField),
			_resultsId = $searchField.attr('id') + options.resultsIdSuffix,
			_previousSearchTerm = '',
			_templates,
			$searchResults,
			$searchResultsList,
			_containerTimeout,
			_ajaxTimeout,
			_jqXHR,
			_selectAndClose,
			_keyboardActions,
			_showResults,
			_clearResults,
			_abortCurrentAjax,
			_hideResults,
			_getDataFromAjax,
			_onSearchFieldFocus,
			_getSearchResults,
			_onSearchFieldKeyup;

		// don't run more than once
		if (typeof ($container.data('ddAutocomplete-isInit')) === 'boolean' && $container.data('ddAutocomplete-isInit') === true) {
			return;
		}

		// update the ec item options based on the DOM
		options = _updateOptionsFromDOM($container, options);

		_templates = options.templates.simple;

		if (options.type === TYPES.LINKS) {
			_templates = options.templates.links;
		}

		var $resultsContainer = _templates.container(_resultsId, options);
		$container.append($resultsContainer);

		$searchResults = $(document.getElementById(_resultsId));
		$searchResultsList = $searchResults.find('.' + options.classes.list);

		// add attributes
		$searchField.attr({
			autocomplete: 'off',
			'aria-controls': _resultsId,
			role: 'combobox'
		});

		$searchResults.attr({
			tabindex: '-1'
		});

		_selectAndClose = function(event) {
			var $selectedItem = $searchResults.find('.' + options.classes.isSelected);

			if (event) {
				event.preventDefault();
				$selectedItem = $(event.target);
			}

			if ($selectedItem.length > 0) {
				$searchField.val($selectedItem.text());
			}

			setTimeout(function() {
				_hideResults(true);
			}, 20);

			$searchField.trigger('selectAndClose.ddAutocomplete', [$selectedItem.text()]);
			$searchField.focus();
		};

		_keyboardActions = function(event) {
			if (_isDisplayed) {
				if (options.type === TYPES.SIMPLE && event.which === KEYCODE.ENTER) {
					if ($searchField.is(':focus')) {
						var resultsLength = $searchResultsList.find('li').length;

						if (resultsLength === 0) {
							// there are no results - just let it behave like normal
							return;
						}
					}

					event.preventDefault();
					_selectAndClose();

					return;
				}

				if ($searchField.is(':focus') && event.which === KEYCODE.TAB && !event.shiftKey) {
					// don't want users to tab into the results panel if it's a simple version
					if (options.type === TYPES.SIMPLE) {
						_hideResults(true);
						return;
					}

					event.preventDefault();
					$searchResults.focus();

					return;
				}

				if (event.which === KEYCODE.UP || event.which === KEYCODE.DOWN) {
					event.preventDefault();

					var $searchResultsItems = $searchResults.find('.' + options.classes.resultsItem),
						maxIndex = $searchResultsItems.length,
						newIndex;

					if (maxIndex === 0) {
						return;
					}

					var $selectedItem = $searchResults.find('.' + options.classes.isSelected);

					if ($selectedItem.length > 0) {
						var currentIndex = 0;

						$searchResultsItems.each(function(i, el) {
							if ($(el).hasClass(options.classes.isSelected)) {
								currentIndex = i;
							}
						});

						if (event.which === KEYCODE.UP) {
							newIndex = (currentIndex === 0) ? maxIndex : currentIndex - 1;
						} else if (event.which === KEYCODE.DOWN) {
							newIndex = (currentIndex === maxIndex) ? 0 : currentIndex + 1;
						}
					} else {
						newIndex = (event.which === KEYCODE.UP) ? maxIndex - 1 : 0;
						$searchField.data('ddAutocomplete-val', $searchField.val());
					}

					$searchResultsItems.removeClass(options.classes.isSelected);
					$selectedItem = $searchResultsItems.eq(newIndex).addClass(options.classes.isSelected);

					if (options.type === TYPES.LINKS) {
						if (newIndex === maxIndex) {
							$searchField.focus();
						} else {
							$selectedItem.focus();
						}
					} else {
						var text = (newIndex === maxIndex) ? $searchField.data('ddAutocomplete-val') : $selectedItem.text();
						$searchField.val(text);
					}
				}
			}
		};

		_showResults = function() {
			_isDisplayed = true;

			clearTimeout(_containerTimeout);

			$container.addClass(options.classes.isActive);

			$(document).off('keydown.ddAutocomplete', _keyboardActions)
				.on('keydown.ddAutocomplete', _keyboardActions);
		};

		_abortCurrentAjax = function() {
			// abort any current ajax timeouts
			clearTimeout(_ajaxTimeout);

			// abort any in progress ajax calls
			if (_jqXHR) {
				_jqXHR.abort();
			}
		};

		_clearResults = function() {
			_abortCurrentAjax();
			$searchResultsList.html('');
			_previousSearchTerm = '';
		};

		_hideResults = function(instant) {
			var hideAfterTimeout = function() {
				_abortCurrentAjax();

				// remove keyboard event listeners
				$(document).off('keydown.ddAutocomplete', _keyboardActions);

				_isDisplayed = false;

				// it's not loading anymore
				$container.removeClass(options.classes.isLoading).removeClass(options.classes.isActive);
			};

			clearTimeout(_containerTimeout);

			if (typeof (instant) === 'boolean' && instant === true) {
				hideAfterTimeout();
			} else {
				_containerTimeout = setTimeout(hideAfterTimeout, options.durations.containerTimeout);
			}
		};

		_getDataFromAjax = function(searchTerm) {
			if (_previousSearchTerm === searchTerm) {
				$container.removeClass(options.classes.isLoading);

				// no need to get new data because it's the same search as last time
				return;
			}

			_abortCurrentAjax();

			var onAjaxDone,
				onAjaxFail;

			onAjaxDone = function(data, textStatus) {
				var results;

				// trigger event for an external listener
				$searchField.trigger('ajaxSuccess.ddAutocomplete', [data]);

				if (textStatus === 'success') {
					_previousSearchTerm = searchTerm;
				}

				$container.removeClass(options.classes.isLoading);

				results = options.parseResults(data);

				if (typeof (options.highlightSearchTerm) === 'function') {
					results = options.highlightSearchTerm(results, searchTerm);
				}

				// load data
				$searchResultsList.html(_templates.list(results, options));

				var $searchResultsInteractions = $searchResults
					.add($searchResults.find('.' + options.classes.searchResultsSubmit))
					.add($searchResults.find('.' + options.classes.resultsItem));

				$searchResultsInteractions.off('.ddAutocomplete')
					.on('focus.ddAutocomplete', function() {
						clearTimeout(_containerTimeout);
					}).on('blur.ddAutocomplete', _hideResults);

				if (options.type === TYPES.SIMPLE) {
					$searchResults.find('.' + options.classes.resultsItem)
						.on('click.ddAutocomplete', function(event) {
							event.stopPropagation();
							_selectAndClose(event);
						});
				}

				_jqXHR = null;
			};

			onAjaxFail = function(jqXHR, textStatus, errorThrown) {
				if (textStatus !== 'abort') {
					console.warn('$.ddAutocomplete: AJAX error', jqXHR, textStatus, errorThrown);
					$container.removeClass(options.classes.isLoading);

					_jqXHR = null;
				}
			};

			// do the AJAX load
			_jqXHR = $.ajax({
				url: options.url,
				data: {
					q: searchTerm
				}
			}).done(onAjaxDone).fail(onAjaxFail);
		};

		_getSearchResults = function(searchTerm) {
			// validate and replace searchTerm string
			searchTerm = searchTerm && $.trim(searchTerm.replace(/</gi, '&lt;').replace(/>/gi, '&gt;'));

			// add the search term to the results panel if required
			$searchResults.find('.' + options.classes.searchResultsTerm).text(searchTerm);

			if (searchTerm && _checkForProperWord(searchTerm, options)) {
				$container.addClass(options.classes.isLoading);

				_abortCurrentAjax();

				clearTimeout(_ajaxTimeout);

				_ajaxTimeout = setTimeout(function() {
					_getDataFromAjax(searchTerm);
				}, options.durations.ajaxTimeout);
			} else {
				_clearResults();
			}
		};

		_onSearchFieldFocus = function() {
			var searchTerm = $searchField.val();

			if (searchTerm.length >= options.showMinChars) {
				if (_isFirstFocus) {
					_getSearchResults(searchTerm);
					_showResults();

					_isFirstFocus = false;
				} else {
					_showResults();
				}
			}
		};

		_onSearchFieldKeyup = function(event) {
			var searchTerm = $searchField.val();

			if (options.type === TYPES.SIMPLE && event.which === KEYCODE.ENTER) {
				_clearResults();
				_hideResults(true);
				return;
			}

			if (_isDisplayed && (event.which === KEYCODE.UP || event.which === KEYCODE.DOWN)) {
				return;
			}

			if (searchTerm.length < options.showMinChars) {
				_clearResults();
				_hideResults(true);
				return;
			}

			_showResults();
			_getSearchResults(searchTerm);
		};

		// add events
		$searchField.off('.ddAutocomplete')
			.on('focus.ddAutocomplete', _onSearchFieldFocus)
			.on('keyup.ddAutocomplete', _onSearchFieldKeyup)
			.on('blur.ddAutocomplete', _hideResults);

		// A links type will sometimes still have a search submit button inside the results
		if (options.type === TYPES.LINKS) {
			var $submitButton = options.$submitButton || $container.find('.' + options.classes.submitButton);

			if ($submitButton.length === 0) {
				return;
			}

			$searchResults.find('.' + options.classes.searchResultsSubmit).on('click.ddAutocomplete', function(event) {
				event.preventDefault();
				$submitButton.trigger('click.ddAutocomplete');
			});
		}

		// on completed initialisation
		$container.data('ddAutocomplete-isInit', true);
	};

	$.extend({
		ddAutocomplete: {
			defaults: {
				showMinChars: 1,
				ajaxMinChars: 3,
				url: null,
				type: 'simple',
				resultsIdSuffix: '-autocomplete-results',
				$submitButton: null,
				attrs: {
					url: 'data-autocomplete-url',
					type: 'data-autocomplete-type'
				},
				durations: {
					containerTimeout: 100,
					ajaxTimeout: 500
				},
				classes: {
					results: 'autocomplete-results',
					list: 'autocomplete-list',
					resultsItem: 'autocomplete-results-item',
					resultsItemTitle: 'autocomplete-results-item-title',
					resultsFooter: 'autocomplete-results-footer',
					searchResultsSubmit: 'js-autocomplete-results-submit',
					searchResultsTerm: 'js-autocomplete-results-searchterm',
					searchField: 'js-autocomplete-input',
					submitButton: 'js-autocomplete-submit',
					isLoading: 'is-loading',
					isActive: 'is-active',
					isSelected: 'is-selected'
				},
				parseResults: function(data) {
					var results = [];

					if (data.autocomplete && typeof (data.autocomplete) === 'object') {
						for (var i = 0, len = data.autocomplete.length; i < len; i += 1) {
							var result = data.autocomplete[i];

							if (typeof (result) === 'string') {
								result = {
									title: result
								};
							}

							results.push(result);
						}
					}

					return results;
				},
				highlightSearchTerm: function(results, searchTerm) {
					var searchTerms = searchTerm.replace(',', '').split(' '),
						isFirstSearchTerm = true,
						searchTermRegEx = '',
						reg,
						highlightMatch;

					for (var i = 0, len = searchTerms.length; i < len; i += 1) {
						var matchedTerm = searchTerms[i];

						// if the item is just spaces or is blank, ignore
						if (matchedTerm.replace(/\s|\./g, '').length > 0) {
							if (isFirstSearchTerm) {
								isFirstSearchTerm = false;
							} else {
								searchTermRegEx += '|';
							}

							searchTermRegEx += '\\b' + matchedTerm;
						}
					}

					reg = new RegExp(searchTermRegEx, 'igm');

					highlightMatch = function(string) {
						// make the search term bold in the results
						if (string.match(reg) !== null) {
							string = string.replace(reg, '<strong>$&</strong>');
						}

						return string;
					};

					for (var j = 0, resultsLen = results.length; j < resultsLen; j += 1) {
						results[j].title = highlightMatch(results[j].title);

						if (results[j].description) {
							results[j].description = highlightMatch(results[j].description);
						}
					}

					return results;
				},
				templates: {
					simple: {
						container: function(id, options) {
							var $container;

							$container = $('<div/>', {
								id: id,
								class: options.classes.results,
								html: $('<div/>', {
									class: options.classes.list
								})
							});

							return $container;
						},
						list: function(results, options) {
							var $list = $('<ul/>');

							for (var i = 0, len = results.length; i < len; i += 1) {
								var item = results[i],
									$listItem;

								$listItem = $('<li/>', {
									html: $('<button/>', {
										role: 'button',
										class: options.classes.resultsItem,
										html: item.title
									})
								});

								$list.append($listItem);
							}

							return $list;
						}
					},
					links: {
						container: function(id, options) {
							var $container;

							$container = $('<div/>', {
								id: id,
								class: options.classes.results,
								html: $('<div/>', {
									class: options.classes.list
								})
							});

							$container.append($('<div/>', {
								class: options.classes.resultsFooter,
								html: $('<button/>', {
									class: options.classes.searchResultsSubmit + ' ' + options.classes.resultsItem,
									html: 'Search for &lsquo;<span class="' + options.classes.searchResultsTerm + '">&nbsp;</span>&rsquo;'
								})
							}));

							return $container;
						},
						list: function(results, options) {
							var $list = $('<ul/>');

							for (var i = 0, len = results.length; i < len; i += 1) {
								var item = results[i],
									$listItem;

								$listItem = $('<li/>', {
									html: $('<a/>', {
										role: 'button',
										href: item.href,
										class: options.classes.resultsItem
									})
								});

								$listItem.find('a').append($('<span/>', {
									class: options.classes.resultsItemTitle,
									html: item.title
								})).append($('<span/>', {
									html: item.description
								}));

								$list.append($listItem);
							}

							return $list;
						}
					}
				}
			}
		}
	}).fn.extend({
		ddAutocomplete: function(options) {
			options = $.extend(true, {}, $.ddAutocomplete.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD EQUAL HEIGHTS - A jQuery plugin to equalise heights
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/equal-heights.html */

;(function($, window, document, undefined) {

	'use strict';

	var _types = [],
		_calculateItemsHeights,
		_bindTo;

	/**
	 * A function that takes items and properties and aligns the items
	 * equally. Used by $.ddEqualHeights
	 *
	 * @memberof $.ddEqualHeights
	 * @param {Object} $items The list of jQuery DOM items to be looped through
	 * @param {Number|String} itemsPerRow The number of items to match together, or a String of "all" to match all
	 * @param {String} sectionSelector CSS Selector for internal sections to match together. Default is ''
	 * @param {Boolean} isEnabled Tells equalHeights to apply or remove as needed
	 * @private
	 * */
	_calculateItemsHeights = function($items, itemsPerRow, sectionSelector, isEnabled) {
		var maxHeights = [],
			$visibleItems = $items.filter(':visible');

		itemsPerRow = (itemsPerRow === 'all') ? $items.length : itemsPerRow;

		$visibleItems.each(function(itemIndex, el) {
			var $item = $(el),
				row = Math.floor(itemIndex / itemsPerRow),
				$sections = (sectionSelector === '') ? $item : $item.find(sectionSelector);

			if (typeof (maxHeights[row]) === 'undefined') {
				maxHeights[row] = [];
			}

			$sections.each(function(sectionIndex, el) {
				var $section = $(el),
					height;

				// Remove the inline height style, so that only heights from the stylesheet are applied
				$section.css('height', '');

				// Calculate greatest height for this section
				if (isEnabled) {
					height = $section.outerHeight();
					maxHeights[row][sectionIndex] = (!maxHeights[row][sectionIndex] || maxHeights[row][sectionIndex] < height) ? height : maxHeights[row][sectionIndex];
				}
			});
		});

		if (isEnabled) {
			$visibleItems.each(function(itemIndex, el) {
				var $item = $(el),
					row = Math.floor(itemIndex / itemsPerRow),
					$sections = (sectionSelector === '') ? $item : $item.find(sectionSelector),
					sectionIndex = 0;

				$sections.each(function(i, el) {
					var $section = $(el);

					$section.css('height', maxHeights[row][sectionIndex]);

					sectionIndex = sectionIndex + 1;

				});
			});
		}
	};

	/**
	 * Bind the equal heights functionality to a container with a type
	 *
	 * @memberof $.ddEqualHeights
	 * @param {Object} container The DOM element either jQuery or not for the container
	 * @param {String} typeString The equalHeights type to apply to this instance
	 * @private
	 */
	_bindTo = function(container, typeString) {
		var $container = $(container),
			type = typeString || null,
			$items = $([]),
			isEnabled = true,
			config,
			itemsPerRow,
			itemsPerRowAtBp,
			calcHeights,
			resetHeights,
			calcHeightsOnResize,
			registerColumnsAtBP;

		// don't run more than once
		if (typeof ($container.data('ddEqualHeights-isInit')) === 'boolean' && $container.data('ddEqualHeights-isInit') === true) {
			return;
		}

		// get config by looking at the type
		config = $.ddEqualHeights.getType(type);

		// updates the list of items based on the selector in the config
		$items = $container.find(config.itemsSelector);

		// if it's a number  or 'all' use it, if not, assume it's a media query object
		if ((typeof (config.numItemsPerRow) === 'number') || (config.numItemsPerRow === 'all')) {
			itemsPerRow = config.numItemsPerRow;
		} else {
			itemsPerRowAtBp = config.numItemsPerRow;
		}

		if (itemsPerRow === 1) {
			isEnabled = false;
		} else {
			isEnabled = true;
		}

		// calculates the heights for the container's items
		calcHeights = function() {
			$items = $container.find(config.itemsSelector);
			_calculateItemsHeights($items, itemsPerRow, config.sectionSelector, isEnabled);
		};

		// resets the heights - used when only a single item needs to be shown
		resetHeights = function() {
			$items = $container.find(config.itemsSelector);
			_calculateItemsHeights($items, itemsPerRow, config.sectionSelector, false);
		};

		// update the values on resize of the screen - debounced so that it doesn't happen too often
		calcHeightsOnResize = $.debounce(200, function() {
			// Detaching resize event listener while running calcHeights() because IE8 triggers
			// a window.resize event when any element in the DOM is resized
			// http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
			$(window).off('resize.ddEqualHeights orientationchange.ddEqualHeights', calcHeightsOnResize);
			calcHeights();

			setTimeout(function() {
				$(window).on('resize.ddEqualHeights orientationchange.ddEqualHeights', calcHeightsOnResize);
			}, 1);
		});

		// Other JavaScript modules can active and deactive this module by triggering an event on the container
		$container.off('update.ddEqualHeights').on('update.ddEqualHeights', calcHeights);
		$container.off('reset.ddEqualHeights').on('reset.ddEqualHeights', resetHeights);

		// add a listener for the load event to each image inside the equalheights container
		// then on load, update the heights again
		$container.find('img').one('load.ddEqualHeights', calcHeights).each(function() {
			// if the image is already complete, then trigger the load event manually
			// (this normally happens when the image is cached)
			if (this.complete) {
				$(this).trigger('load.ddEqualHeights');
			}
		});

		// recalculate heights on resize
		$(window)
			.off('resize.ddEqualHeights orientationchange.ddEqualHeights', calcHeightsOnResize)
			.on('resize.ddEqualHeights orientationchange.ddEqualHeights', calcHeightsOnResize);

		// calculate the height on page load
		calcHeights();

		// dynamically generate the list of items per row from an object of DD.bp breakpoints
		registerColumnsAtBP = function(key) {
			// only run if DD.bp is available
			if (typeof (DD) === 'undefined' || typeof (DD.bp) === 'undefined') {
				console.warn('$.ddEqualHeights: DD.bp is required to use the itemsPerRow at breakpoints feature');
				return;
			}

			// change the number of items per row depending on the breakpoint
			var updateItemsPerRow = function() {
				itemsPerRow = itemsPerRowAtBp[key];

				if (itemsPerRow === 1) {
					isEnabled = false;
				}  else {
					isEnabled = true;
				}

				$container.trigger('update.ddEqualHeights');
			};

			// bind the breakpoint listener for each key
			enquire.register(DD.bp.get(key), {
				match: updateItemsPerRow
			});

		};

		if (itemsPerRowAtBp !== undefined) {
			for (var key in itemsPerRowAtBp) {
				if (itemsPerRowAtBp.hasOwnProperty(key)) {
					registerColumnsAtBP(key);
				}
			}
		}

		// avoid running twice
		$container.data('ddEqualHeights-isInit', true);
	};

	$.extend({
		ddEqualHeights: {
			defaults: {
				typeAttr: 'data-heights-type'
			},

			typeDefaults: {
				itemsSelector: '> *',
				sectionSelector: '',
				numItemsPerRow: 'all'
			},

			/**
			 * Loops through the config types and finds the appropriate type
			 * if it can't find the type it uses the defaults from
			 * $.ddEqualHeights.typeDefaults instead
			 *
			 * @memberof $.ddEqualHeights
			 * @param {string} name The unique identifier passed through in the data-heights-type attribute
			 */
			getType: function(name) {
				var config = {},
					matchedConfig;

				if (name === null) {
					return $.ddEqualHeights.typeDefaults;
				}

				for (var names in _types) {
					if (_types.hasOwnProperty(names) && names === name) {
						matchedConfig = _types[names];
					}
				}

				// fill out any unfilled options with the defaults
				$.extend(config, $.ddEqualHeights.typeDefaults, matchedConfig);

				if (config) {
					for (var key in config) {
						// if it's a function, convert it to a string instead
						if (config.hasOwnProperty(key) && typeof (config[key]) === 'function') {
							config[key] = config[key]();
						}
					}

					return config;
				}

				console.warn('$.ddEqualHeights: Dynamic heights type "' + name + '" not found. Using defaults.');

				return $.ddEqualHeights.typeDefaults;
			},

			/**
			 * Adds a custom type to the list of types
			 *
			 * @memberof $.ddEqualHeights
			 * @param {string} name The unique identifier of the config
			 * @param {object} config The config object to be used
			 *
			 * @example
			 * $.fn.ddEqualHeights.addType('feature-item', {
			 *     itemsSelector: '.item',
			 *     sectionSelector: '.section',
			 *     numItemsPerRow: 2
			 * });
			 */
			addType: function(name, config) {
				_types[name] = config;
			}
		}
	}).fn.extend({
		/**
		 * @example
		 * $('[data-heights-type]').ddEqualHeights();
		 *
		 * @example
		 * $('[data-ddeqh-type]').ddEqualHeights({
		 *     typeAttr: 'data-ddeqh-type'
		 * });
		 */
		ddEqualHeights: function(options) {
			options = $.extend({}, $.ddEqualHeights.defaults, options);

			return $(this).each(function(i, el) {
				var type = $(el).attr(options.typeAttr);

				_bindTo(this, type);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD EXPAND/COLLAPSE - A jQuery plugin to dynamically hide and show content
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/expandcollapse.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_groups = {},
		_addContainerToGroup,
		_overrideWithDataAttribute,
		_updateOptionsFromDOM,
		_init;

	/**
	 * Adds an expand/collapse container to an array of other containers
	 * that container the same group id. Used by $.ddExpandCollapse
	 *
	 * @memberof $.ddExpandCollapse
	 * @param {Object} $container The jQuery element to group
	 * @param {String} group The unique id for the group
	 * @private
	 * */
	_addContainerToGroup = function($container, group) {
		if (!group) {
			// isn't in a group - can either be undefined or false
			return;
		}

		// if the group doesn't already exist create one
		if (!_groups.hasOwnProperty(group)) {
			_groups[group] = [];
		}

		// add the container to the required group
		_groups[group].push($container);
	};

	/**
	 * Returns the override value if the data attribute exists on the element,
	 * otherwise returns the fallback value provided.
	 *
	 * @memberof $.ddExpandCollapse
	 * @param {Object} $el The jQuery element to check for the data attribute on
	 * @param {Object} attrName The name of the data attribute to check for
	 * @param {Object} attrName The value to return if the attribute isn't set (i.e. the value being potentially overriden)
	 * @private
	 * */
	_overrideWithDataAttribute = function($el, attrName, fallbackValue) {
		var strippedAttrName,
			value;

		// strip 'data-' from beginning of attribute name if it's there
		strippedAttrName = attrName.replace(/^data-/, '');
		value = $el.data(strippedAttrName);

		// Use the original value if there is no data attribute
		if (typeof value === 'undefined') {
			return fallbackValue;
		}

		// return the override value
		return value;
	}

	/**
	 * Look at the container to see if there are any DOM attributes that
	 * can override base options
	 *
	 * @memberof $.ddExpandCollapse
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_updateOptionsFromDOM = function($container, options) {
		var updatedOptions = $.extend(true, {}, options);

		updatedOptions.group = _overrideWithDataAttribute($container, options.attrs.group, options.group);
		updatedOptions.scroll = _overrideWithDataAttribute($container, options.attrs.scroll, options.scroll);
		updatedOptions.at = _overrideWithDataAttribute($container, options.attrs.at, options.at);

		return updatedOptions;
	};

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddExpandCollapse
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_init = function(container, options) {
		var $container = $(container),
			id = $container.attr('id'),
			$links = $('.' + options.classes.links + '[href="#' + id + '"]'),
			_isExpanded = $container.hasClass(options.classes.isExpanded),
			_isDisabled = false,
			_isAnimating = false,
			_aria,
			_updateLinks,
			_onExpand,
			_onCollapse,
			_onToggle,
			_onAttach,
			_onDetach,
			_onDestroy;

		// don't run more than once
		if (typeof ($container.data('ddExpandCollapse-isInit')) === 'boolean' && $container.data('ddExpandCollapse-isInit') === true) {
			return;
		}

		// update the ec item options based on the DOM
		options = _updateOptionsFromDOM($container, options);

		// add the ec item to a group if required
		if (options.group) {
			_addContainerToGroup($container, options.group);
		}

		// aria actions
		_aria = {
			// add the aria attributes when needed
			add: function() {
				$container.attr({
					role: 'region',
					tabindex: '-1'
				});

				$links.attr({
					'aria-controls': id,
					'aria-expanded': _isExpanded
				});
			},
			// remove the aria attributes when not needed
			remove: function() {
				$container.removeAttr('role')
					.removeAttr('tabindex');

				$links.removeAttr('aria-controls')
					.removeAttr('aria-expanded');
			},
			// update the status of the aria-expanded attribute
			update: function() {
				if (!_isDisabled) {
					$links.attr('aria-expanded', _isExpanded);
				}
			}
		};

		// add the aria tags by default
		_aria.add();

		// link actions - applies to all links tied to the container
		_updateLinks = {
			// on init of the links apply the appropriate function and set to expanded if needed
			init: function() {
				options.initLinks($links, options);

				if (_isExpanded) {
					_updateLinks.toExpand();
				}
			},
			// set the link to show the expanded state
			toExpand: function() {
				$links.addClass(options.classes.isExpanded);
				$links.find('.' + options.classes.linkState).text(options.labels.expanded);
				_aria.update();
			},
			// set the link to show the collapsed state
			toCollapse: function() {
				$links.removeClass(options.classes.isExpanded);
				$links.find('.' + options.classes.linkState).text(options.labels.collapsed);
				_aria.update();
			}
		};

		// update the links on init
		_updateLinks.init();

		// check if it should be closed by default
		if (!_isExpanded && options.isAnimated) {
			options.animations.collapseOnInit($container);
		}

		// on expand
		_onExpand = function(event) {
			if (event && event.stopPropagation) {
				event.stopPropagation();
			}

			var expand;

			expand = function(callback) {
				// after expand has completed
				var afterExpand = function() {
					$container.addClass(options.classes.isExpanded);

					if (!_isDisabled) {
						$container.trigger('expanded.ddExpandCollapse');

						if (options.scroll) {
							options.animations.scrollPage($container, options);
						}
					}

					_isAnimating = false;

					if (typeof callback === 'function') {
						callback();
					}
				};

				if (_isDisabled) {
					_isExpanded = true;

					_updateLinks.toExpand();

					afterExpand();

					return;
				}

				if (!_isExpanded) {
					_isExpanded = true;

					_updateLinks.toExpand();

					if (!options.isAnimated) {
						afterExpand();
						return;
					}

					options.animations.expand($container, options, afterExpand);
				}
			};

			// check if there is a group applied
			if (options.group !== false) {
				// check if the group exists, and if there is more than one item in the group
				if (_groups.hasOwnProperty(options.group) && _groups[options.group].length > 1) {
					var groupContainers = _groups[options.group];

					// check all the containers in the group
					for (var i = 0, len = groupContainers.length; i < len; i += 1) {
						var $otherContainer = groupContainers[i];

						// if there is another item in the group that is on the page, and is currently expanded
						if ($otherContainer.length > 0 && $otherContainer.hasClass(options.classes.isExpanded)) {
							// close the container, and on callback it will open the new container
							$otherContainer.trigger('collapse.ddExpandCollapse');
						}
					}
				}
			}

			expand();
		};

		// on collapse
		_onCollapse = function(event, callback) {
			if (event && event.stopPropagation) {
				event.stopPropagation();
			}

			// after collapse has completed
			var afterCollapse = function() {
				$container.removeClass(options.classes.isExpanded);

				if (!_isDisabled) {
					$container.trigger('collapsed.ddExpandCollapse');
				}

				_isAnimating = false;

				if (typeof callback === 'function') {
					callback();
				}
			};

			if (_isDisabled) {
				_isExpanded = false;

				_updateLinks.toCollapse();

				afterCollapse();

				return;
			}

			if (_isExpanded) {
				_isExpanded = false;

				_updateLinks.toCollapse();

				if (!options.isAnimated) {
					afterCollapse();
					return;
				}

				options.animations.collapse($container, options, afterCollapse);
			}
		};

		// on toggle of the container
		_onToggle = function(event) {
			event.preventDefault();

			if (_isDisabled || _isAnimating) {
				return;
			}

			_isAnimating = true;

			if (_isExpanded) {
				$container.trigger('collapse.ddExpandCollapse');
			} else {
				$container.trigger('expand.ddExpandCollapse');
			}
		};

		_onAttach = function() {
			_isDisabled = false;

			if (!_isExpanded) {
				options.animations.collapseOnInit($container);
			}

			$container.removeClass(options.classes.isDisabled);
			$links.removeClass(options.classes.isDisabled);

			_aria.add();
		};

		_onDetach = function() {
			_isDisabled = true;

			options.animations.reset($container);

			$container.addClass(options.classes.isDisabled);
			$links.addClass(options.classes.isDisabled);

			_aria.remove();
		};

		_onDestroy = function() {
			_isDisabled = true;

			options.animations.reset($container);

			$container.off('.ddExpandCollapse');
			$links.off('.ddExpandCollapse');

			$links.find('.' + options.classes.linkState).remove();

			_aria.remove();
		};

		// unbind events to prevent multiple binds, then bind events
		$container.off('.ddExpandCollapse')
			.on('expand.ddExpandCollapse', _onExpand)
			.on('collapse.ddExpandCollapse', _onCollapse)
			.on('toggle.ddExpandCollapse', _onToggle)
			.on('destroy.ddExpandCollapse', _onDestroy);

		// unbind then bind click event to the links
		$links.off('.ddExpandCollapse').on('click.ddExpandCollapse', _onToggle);

		if (typeof (options.at) === 'string') {
			DD.bpAttach.at(options.at, _onAttach, _onDetach);
		}

		$container.data('ddExpandCollapse-isInit', true);
	};

	$.extend({
		ddExpandCollapse: {
			defaults: {
				isAnimated: true,
				scroll: true,
				scrollOffset: -50,
				group: false,
				at: false,
				addLinkState: false,
				labels: {
					expanded: 'Click to collapse',
					collapsed: 'Click to expand'
				},
				attrs: {
					group: 'data-ec-group',
					scroll: 'data-ec-scroll',
					at: 'data-ec-at'
				},
				durations: {
					expand: [250, 200],
					collapse: [100, 250],
					scroll: 400
				},
				classes: {
					links: 'js-ec-link',
					linkState: 'ec-link-state',
					linkIcon: 'ec',
					isExpanded: 'is-expanded',
					isDisabled: 'is-disabled'
				},
				animations: {
					reset: function($container) {
						$container.removeAttr('style');
					},
					collapseOnInit: function($container) {
						$container.css({
							opacity: 0
						});
					},
					collapse: function($container, options, callback) {
						// fade out, then slide in
						$container.velocity('stop').velocity({
							opacity: 0
						}, {
							duration: options.durations.collapse[0],
							complete: function() {
								$container.velocity('slideUp', {
									duration: options.durations.collapse[1],
									easing: 'ease-out',
									complete: callback
								});
							}
						});
					},
					expand: function($container, options, callback) {
						// slide down, then fade in
						$container.velocity('stop').velocity('slideDown', {
							duration: options.durations.expand[0],
							easing: 'ease-out',
							complete: function() {
								$container.velocity({
									opacity: 1
								}, {
									duration: options.durations.expand[1],
									easing: 'ease-out',
									complete: callback
								});
							}
						});
					},
					scrollPage: function($container, options, callback) {
						var pageTop = $(document).scrollTop(),
							pageBottom = pageTop + $(window).height(),
							offset;

						// display the container to get the position
						$container.css({
							display: 'block'
						});

						offset = $container.offset().top + options.scrollOffset;

						// rehide the container
						$container.css({
							display: ''
						});

						if (options.scroll === false || offset > pageTop && offset < pageBottom) {
							if (typeof (callback) === 'function') {
								callback();
							}

							// is currently in the page so don't scroll
							return;
						}

						// scroll the page
						$('html').velocity('stop').velocity('scroll', {
							offset: offset,
							duration: options.durations.scroll,
							complete: callback
						});
					}
				},
				initLinks: function($links, options) {
					var $linkIcon,
						$linkState;

					$linkIcon = $('<div />', {
						class: options.classes.linkIcon
					});

					$links.append($linkIcon);

					// add link state if needed
					if (options.addLinkState) {
						$linkState = $('<div />', {
							class: 'vh ' + options.classes.linkState,
							text: options.labels.collapsed
						});

						$links.append($linkState);
					}
				}
			}
		}
	}).fn.extend({
		ddExpandCollapse: function(options) {
			options = $.extend(true, {}, $.ddExpandCollapse.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD MODALS - A jQuery plugin for making accessible modal windows
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/responsive-table.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_dynamicModalTypes = [],
		_itemThatOpenedTheCurrentModal = null,
		_isOpen = false,
		_debounceTimeout = null,
		$currentModal = null,
		$container,
		_options,
		_checkIfReady,
		_checkIfModalExists,
		_addEventsToModal,
		_removeEventsFromModal,
		_positionCurrentModal,
		_debouncePositionCurrentModal,
		_animateIn,
		_animateOut,
		_closeModal,
		_openModal,
		_dynamicModals,
		_init;

	/**
	 * Check if the modal has be initialised
	 *
	 * @memberof $.ddModals
	 * @private
	 * */
	_checkIfReady = function() {
		if ($container) {
			if ($container.data('ddModals-isInit') === true) {
				return true;
			}
		}

		console.warn('$.ddModals: Please ensure that you\'ve initialised the plugin first.');

		return false;
	};

	/**
	 * Checks if the modal exists on the page
	 *
	 * @memberof $.ddModals
	 * @private
	 * */
	_checkIfModalExists = function(id) {
		return ($container.find(document.getElementById(id)).length > 0);
	};

	/**
	 * Positions the current modal to the center of the screen
	 *
	 * @memberof $.ddModals
	 * @private
	 * */
	_positionCurrentModal = function() {
		if ($currentModal !== null) {
			var $modalContent = $currentModal.find('.' + _options.classes.modalContent),
				$modalContentOverflow = $modalContent.find('.' + _options.classes.modalContentOverflow);

			DD.noScroll.refresh();

			$modalContent.css({
				'max-height': ''
			});

			$modalContentOverflow.css({
				'max-height': '',
				overflow: ''
			});

			// assumes that the body is fixed position and offset
			// to stop background scrolling
			var top = -parseInt($('body').css('top'), 10);

			$currentModal.css({
				top: $(window).scrollTop() + top,
				height: $(window).height()
			});

			var modalContainerHeight = $currentModal.height(),
				modalHeight = $modalContent.height();

			if (modalHeight > modalContainerHeight) {
				$modalContent.css({
					'max-height': modalContainerHeight,
					top: 0
				});

				$modalContentOverflow.css({
					'max-height': modalContainerHeight,
					overflow: 'auto'
				});
			} else {
				$modalContent.css({
					top: (modalContainerHeight - modalHeight) / 2
				});
			}
		}
	};

	/**
	 * Position the modal after a slight timeout (100ms) to stop over thrashing the layout
	 *
	 * @memberof $.ddModals
	 * @private
	 * */
	_debouncePositionCurrentModal = function() {
		clearTimeout(_debounceTimeout);
		_debounceTimeout = setTimeout(_positionCurrentModal, 100);
	};

	/**
	 * Animate the current modal in
	 *
	 * @memberof $.ddModals
	 * @param {Function} callback Callback function to call after the modal is finished animating
	 * @private
	 * */
	_animateIn = function(callback) {
		$currentModal.trigger('modalAnimatingIn.ddModals');

		var scrollY = $(window).scrollTop();

		if (scrollY < 0) {
			scrollY = 0;
		}

		$currentModal.css({
			top: scrollY + 'px'
		});

		DD.noScroll.set();

		_options.animations.modal.reset($currentModal);

		// stop current animations
		$container.velocity('stop');
		$currentModal.velocity('stop');

		_options.animations.container.preShow($container, _options, function() {
			$container.addClass(_options.classes.isActive);

			_options.animations.container.show($container, _options, function() {
				_options.animations.modal.preShow($currentModal, _options, function() {
					$currentModal.addClass(_options.classes.isActive);

					_positionCurrentModal();

					$(window).on('resize.ddModals', _debouncePositionCurrentModal);
					$(window).on('scroll.ddModals', _debouncePositionCurrentModal);

					_options.animations.modal.show($currentModal, _options, function() {
						_isOpen = true;
						_addEventsToModal();
						$currentModal.trigger('modalOpened.ddModals');

						if (typeof (callback) === 'function') {
							return callback();
						}
					});
				});
			});
		});
	};

	/**
	 * Animate the current modal out
	 *
	 * @memberof $.ddModals
	 * @param {Function} callback Callback function to call after the modal is finished animating
	 * @private
	 * */
	_animateOut = function(callback) {
		if (!_isOpen) {
			return;
		}

		$currentModal.trigger('modalAnimatingOut.ddModals');
		$(window).off('resize.modal', _debouncePositionCurrentModal);
		$(window).off('scroll.modal', _debouncePositionCurrentModal);

		// stop current animations
		$container.velocity('stop');
		$currentModal.velocity('stop');

		_options.animations.modal.hide($currentModal, _options, function() {
			$currentModal.removeClass(_options.classes.isActive);

			if ($currentModal.find('.' + _options.classes.modalContent).hasClass(_options.classes.modalVideo)) {
				$currentModal.html('');
			}

			var $lastOpenModal = $currentModal;
			$currentModal = null;

			_options.animations.container.hide($container, _options, function() {
				_isOpen = false;
				$container.removeClass(_options.classes.isActive);
				$lastOpenModal.trigger('modalClosed.ddModals');

				DD.noScroll.unset();

				if (typeof (callback) === 'function') {
					return callback();
				}
			});
		});
	};

	/**
	 * Add events like locking the tabbing inside the modal,
	 * clicking on the outside of the modal to close
	 * and binding the ESC key to closing the modal.
	 * Requires DD.a11y.js
	 *
	 * @memberof $.ddModals
	 * @private
	 * */
	_addEventsToModal = function() {
		DD.a11y.tabInsideContainer.set($currentModal, true);

		if (!$currentModal.find('.' + _options.classes.modalContent).hasClass(_options.triggers.unskippable)) {
			DD.a11y.onClickOutside.set($currentModal.find('.' + _options.classes.modalContentOverflow), _closeModal);
			DD.a11y.onEscape.set(_closeModal);
		}

		// Set all other DOM elements to be aria hidden
		DD.a11y.ariaHideOthers.set($currentModal);

		//resize event
		if (_options.repositionModalOnEvent !== '') {
			$currentModal.on(_options.repositionModalOnEvent, _positionCurrentModal);
		}

		// focus on the first element
		if ($currentModal.find(_options.triggers.dialogStart).length > 0) {
			$currentModal.find(_options.triggers.dialogStart).focus();
		} else {
			$currentModal.focus();
		}
	};

	/**
	 * Remove the events from the current modal
	 * Requires DD.a11y.js
	 *
	 * @memberof $.ddModals
	 * @private
	 * */
	_removeEventsFromModal = function() {
		DD.a11y.tabInsideContainer.unset();

		if (!$currentModal.find('.' + _options.classes.modalContent).hasClass(_options.triggers.unskippable)) {
			DD.a11y.onClickOutside.unset();
			DD.a11y.onEscape.unset();
		}

		// Unset all other DOM elements from being aria hidden
		DD.a11y.ariaHideOthers.unset();

		//resize event
		if (_options.repositionModalOnEvent !== '') {
			$currentModal.off(_options.repositionModalOnEvent, _positionCurrentModal);
		}
	};

	/**
	 * Open a modal
	 *
	 * @memberof $.ddModals
	 * @param {String} id ID of the modal to open
	 * @param {Object} opener Button used to open the modal
	 * @param {Function} callback Callback function to call after the modal is opened
	 * @private
	 * */
	_openModal = function(id, opener, callback) {
		if (_checkIfReady()) {
			// if the opener is a jQuery object and isn't inside another modal
			if (typeof (opener) === 'object' && $(opener).closest($container).length === 0) {
				_itemThatOpenedTheCurrentModal = $(opener);
			}

			//check if already open
			if (_isOpen) {
				//if is self, don't reopen, else swap out
				if ($currentModal.attr('id') === id) {
					return true;
				} else {
					return _closeModal(function() {
						_openModal(id, callback);
					});
				}
			} else {
				if (_checkIfModalExists(id)) {
					_isOpen = true;

					// close on background click
					$currentModal = $(document.getElementById(id));
					_animateIn(callback);

					if (typeof (_options.beforeModalOpen) === 'function') {
						_options.beforeModalOpen();
					}

					return true;
				}
			}
		}

		return false;
	};

	/**
	 * Close the currently open modal
	 *
	 * @memberof $.ddModals
	 * @param {Function} callback Callback function to call after the modal is closed
	 * @private
	 * */
	_closeModal = function(callback) {
		if (_checkIfReady()) {
			_removeEventsFromModal();

			_animateOut(function() {
				if (typeof (callback) === 'function') {
					// if there is a callback we're probably opening another modal
					callback();
				} else {
					// if closing entirely, focus on original element that
					// opened the modal in the first place
					if (_itemThatOpenedTheCurrentModal) {
						$(_itemThatOpenedTheCurrentModal).focus();
						_itemThatOpenedTheCurrentModal = null;
					}
				}
			});
		}
	};

	/**
	 * Dynamic modals
	 *
	 * @memberof $.ddModals
	 */
	_dynamicModals = (function() {
		var _modalMediaQueries = {},
			_bindFormToOriginal,
			_addNewModal,
			_addAtMediaQuery,
			addNewModalFromTemplate,
			init;

		/**
		 * Dynamically add a modal after page load based off a source element
		 *
		 * @memberof $.ddModals
		 * @param {Object} $original Original form element
		 * @param {Object} $modal Form elements contained inside the modal
		 * @private
		 * */
		_bindFormToOriginal = function($original, $modal) {
			// map form elements to each other so only the original form is used
			$modal.find('input:not(:submit), select').each(function(i, el) {
				var $el = $(el),
					originalId = $el.attr('id'),
					originalName = $el.attr('name'),
					$originalEl = $original.find('#' + originalId);

				// update element attribute
				$el.attr({
					id: originalId + _options.dynamicModalFormSuffix,
					name: originalName + _options.dynamicModalFormSuffix
				});

				// update the element's label
				$('label[for="' + originalId + '"]').attr('for', originalId + _options.dynamicModalFormSuffix);

				// bind update events to update the main form
				$el.on('keyup.ddModalForms change.ddModalForms', function() {
					$originalEl.val($(this).val());
				});
			});

			// map submit buttons to each other so only the original submit button is used.
			$modal.find('button, input[type="submit"]').each(function(i, el) {
				var $el = $(el);

				$el.on('click.ddModalForms', function(event) {
					event.preventDefault();

					// close modal first
					_closeModal(function() {
						// fire the proper click event for the main form instead
						$original.find('button, input[type="submit"]').eq(i).trigger('click', [true]);
					});
				});
			});
		};

		/**
		 * Dynamically add a modal after page load based off a source element
		 *
		 * @memberof $.ddModals
		 * @param {String} id Id to be used by the new modal
		 * @param {String} type Additional class applied to the modal to help with custom styling
		 * @param {Object} $elem jQuery object of the DOM element to duplicate
		 * @param {Function} callback Callback function to call when the modal is created
		 * @private
		 * */
		_addNewModal = function(id, type, $elem, callback) {
			if (_checkIfModalExists(id)) {
				// remove old one
				$(document.getElementById(id)).remove();
			}

			$container.prepend(_options.templates.container(id, type, _options));

			var $modal = $(document.getElementById(id));

			$modal.find('.' + _options.classes.modalContentOverflow).html($elem.clone());

			_bindFormToOriginal($elem, $modal.find('.' + _options.classes.modalContentOverflow));

			if (typeof (callback) === 'function') {
				callback($modal);
			}
		};

		/**
		 * Dynamically add a modal after page load at a certain media query size
		 *
		 * @memberof $.ddModals
		 * @param {String} mq DD.bp media query string
		 * @param {String} id Id to be used by the new modal
		 * @param {String} type Additional class applied to the modal to help with custom styling
		 * @param {Object} $elem jQuery object of the DOM element to duplicate
		 * @param {Function} callback Callback function to call when the modal is created
		 * @private
		 * */
		_addAtMediaQuery = function(mq, id, type, $elem, callback) {
			if ($elem.length === 0) {
				return; //element doesn't exist - don't continue
			}

			// loops through all the modals at wach media query and adds them to the page
			var createModal = function() {
				for (var mq in _modalMediaQueries) {
					if (_modalMediaQueries.hasOwnProperty(mq)) {
						var mqHandler = _modalMediaQueries[mq].handler,
							mqModals = _modalMediaQueries[mq].modals;

						while (mqModals.length > 0) {
							var modal = mqModals.pop();
							_addNewModal(modal.id, modal.type, modal.$elem, modal.callback);
						}

						enquire.unregister(DD.bp.get(mq), mqHandler);

						delete _modalMediaQueries[mq];
					}
				}
			};

			if (mq === false || DD.bp.is(mq)) {
				_addNewModal(id, type, $elem, callback);
			} else {
				// only setup the enquire listener once per media query
				// enquire can't unregister multiple listeners that reference the same handler
				// so it's much safer to do it this way if you have multiple modals on the same mq
				if (typeof (_modalMediaQueries[mq]) !== 'object') {
					_modalMediaQueries[mq] = {
						handler: {
							match: createModal
						},
						modals: []
					};
					enquire.register(DD.bp.get(mq), _modalMediaQueries[mq].handler);
				}

				if (_modalMediaQueries[mq] && typeof (_modalMediaQueries[mq].modals) === 'object') {
					_modalMediaQueries[mq].modals.push({
						id: id,
						type: type,
						$elem: $elem,
						callback: callback
					});
				}
			}
		};

		/**
		 * Dynamically add a modal after page load based off a source element
		 *
		 * @memberof $.ddModals
		 * @param {String} id Id to be used by the new modal
		 * @param {String} type Additional class applied to the modal to help with custom styling
		 * @param {Object} template jquery element of templated items to be displayed
		 * @param {Function} callback Callback function to call when the modal is created
		 * */
		addNewModalFromTemplate = function(id, type, template, callback) {
			if (_checkIfModalExists(id)) {
				// remove old one
				$(document.getElementById(id)).remove();
			}

			$container.prepend(_options.templates.container(id, type, _options));

			var $modal = $(document.getElementById(id));

			$modal.find('.' + _options.classes.modalContentOverflow).html(template);

			if (typeof (callback) === 'function') {
				callback($modal);
			}
		};

		/**
		 * Run through the HTML of the page and create dynamic modals based on the
		 * page structure
		 *
		 * @memberof $.ddModals
		 * @private
		 * */
		init = function() {
			// dynamic modals
			$('.' + _options.triggers.dynamicModal).each(function(i, el) {
				var $dynamicContainer = $(el),
					id = $dynamicContainer.attr(_options.attrs.modalId),
					config = $.ddModals.dynamicModal.getConfig(id);

				if (config !== false) {
					_addAtMediaQuery(config.mq, id, config.type, $dynamicContainer, config.callback);
				}
			});
		};

		return {
			addNewModalFromTemplate: addNewModalFromTemplate,
			init: init
		};
	})();

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddModals
	 * @param {Object} container The modal container
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_init = function(container) {
		$container = $(container);

		// don't run more than once
		if (typeof ($container.data('ddModals-isInit')) === 'boolean' && $container.data('ddModals-isInit') === true) {
			return;
		}

		//check if there is currently a modal active
		if ($container.hasClass(_options.classes.isActive)) {
			//if there is no active modal inside, the container shouldn't be active
			if ($container.find('.' + _options.classes.modal + '.' + _options.classes.isActive).length > 0) {
				_isOpen = true;
				$currentModal = $container.find('.' + _options.classes.modal + '.' + _options.classes.isActive);
				_addEventsToModal();

				DD.noScroll.set();
			} else {
				$container.removeClass(_options.classes.isActive);
				_isOpen = false;
			}
		} else {
			// shouldn't have an internal item without the container being active
			$container.find('.' + _options.classes.modal + '.' + _options.classes.isActive).removeClass(_options.classes.isActive);
		}

		$container.on('click.ddModals', '.' + _options.triggers.closeModal, function(event) {
			event.preventDefault();
			_closeModal();
		});

		$(document).on('click.ddModals', '.' + _options.triggers.openModal, function(event) {
			event.preventDefault();

			var $button = $(this),
				id = $button.attr(_options.attrs.modalId);

			_openModal(id, $button);
		});

		$(document).on('click.ddModals', '.' + _options.triggers.modalVideo, function(event) {
			event.preventDefault();

			var $button = $(this),
				videoId = $button.attr(_options.attrs.modalVideoId),
				videoOptions = $button.attr(_options.attrs.modalVideoOptions),
				videoType = $button.attr(_options.attrs.modalVideoType) || 'youtube',
				template = _options.templates.videoPlayer(videoId, videoOptions, videoType);

			_dynamicModals.addNewModalFromTemplate('modal-video', _options.classes.modalVideo, template, function() {
				_openModal('modal-video', $button);
			});
		});

		_dynamicModals.init();

		// the table has been initialised - this will ensure that it can't be run multiple times
		$container.data('ddModals-isInit', true);
	};

	$.extend({
		ddModals: {
			defaults: {
				dynamicModalFormSuffix: '-modal',
				repositionModalOnEvent: '',
				beforeModalOpen: false,
				attrs: {
					modalId: 'data-modal-id',
					modalVideoId: 'data-modal-video-id',
					modalVideoOptions: 'data-modal-video-options',
					modalVideoType: 'data-modal-video-type'
				},
				durations: {
					container: {
						show: 250,
						hide: 250
					},
					modal: {
						show: 250,
						hide: 250,
						reposition: 150
					}
				},
				triggers: {
					dialogStart: 'js-modal-dialog-start',
					openModal: 'js-modal-open',
					closeModal: 'js-modal-close',
					dynamicModal: 'js-modal-dynamic',
					modalVideo: 'js-modal-video',
					unskippable: 'js-modal-unskippable'
				},
				classes: {
					modal: 'modal',
					modalContent: 'modal-content',
					modalContentOverflow: 'modal-content-overflow',
					modalVideo: 'modal-video',
					modalClose: 'modal-close',
					isActive: 'is-active'
				},
				templates: {
					container: function(id, type, options) {
						var $modalContainer,
							$modalContent,
							$modalStart,
							$modalClose;

						$modalContainer = $('<div />', {
							id: id,
							tabindex: '-1',
							class: options.classes.modal,
							html: $('<div/>', {
								class: 'l-padding'
							})
						});

						$modalContent = $('<div />', {
							class: options.classes.modalContent + ' ' + type,
							html: $('<div/>', {
								class: options.classes.modalContentOverflow
							})
						});

						$modalStart = $('<span />', {
							class: options.triggers.dialogStart + ' vh',
							tabindex: '-1',
							html: 'Dialog Start. Use the ESC key to close, or press the close button.'
						});

						$modalClose = $('<button />', {
							role: 'button',
							class: options.classes.modalClose + ' ' + options.triggers.closeModal,
							html: 'Close<span class="vh"> Dialog, Dialog End</span>'
						});

						$modalContent.prepend($modalStart).append($modalClose);
						$modalContainer.find('.l-padding').append($modalContent);

						return $modalContainer;
					},
					videoPlayer: function(videoId, options, videoType) {
						var type = videoType || 'youtube',
							$intrinsic,
							$player,
							videoSource;

						$intrinsic = $('<div />', {
							class: 'intrinsic',
							html: $('<div />', {
								class: 'intrinsic-wrap intrinsic-16x9'
							})
						});

						if (type === 'youtube') {
							videoSource = 'http://www.youtube.com/embed/' + videoId + options;
						}

						$player = $('<iframe />', {
							class: 'intrinsic-el',
							src: videoSource,
							attr: {
								allowfullscreen: true,
								frameborder: '0'
							}
						});

						$intrinsic.find('.intrinsic-wrap').append($player);

						return $intrinsic;
					}
				},
				animations: {
					container: {
						preShow: function($container, options, callback) {
							$container.css({
								opacity: 0
							});

							callback();
						},
						show: function($container, options, callback) {
							$container.velocity({
								opacity: 1,
								translateZ: 0
							}, {
								duration: options.durations.container.show,
								complete: callback
							});
						},
						hide: function($container, options, callback) {
							$container.velocity({
								opacity: 0,
								translateZ: 0
							}, {
								duration: options.durations.container.hide,
								complete: callback
							});
						}
					},
					modal: {
						reset: function($currentModal) {
							$currentModal.css({
								opacity: 0
							});
						},
						preShow: function($currentModal, options, callback) {
							$currentModal.removeAttr('style');
							$currentModal.css({
								opacity: 0,
								scale: 0.9,
								translateZ: 0
							});

							callback();
						},
						show: function($currentModal, options, callback) {
							$currentModal.velocity({
								opacity: 1,
								scale: 1,
								translateZ: 0
							}, {
								duration: options.durations.modal.show,
								complete: function() {
									$currentModal.find('.' + options.classes.modalContent).css({
										transition: options.durations.modal.reposition + 'ms top'
									});

									callback();
								}
							});
						},
						hide: function($currentModal, options, callback) {
							$currentModal.velocity({
								opacity: 0,
								scale: 0.9,
								translateZ: 0
							}, {
								duration: options.durations.modal.hide,
								complete: function() {
									$currentModal.removeAttr('style');
									$currentModal.find('.' + options.classes.modalContent).removeAttr('style');

									callback();
								}
							});
						}
					}
				}
			},

			dynamicModal: {
				defaults: {
					mq: false,
					type: 'modal-type-dynamic',
					callback: function() {}
				},
				getConfig: function(id) {
					var config = {},
						matchedConfig;

					if (id === null) {
						return $.ddModals.dynamicModal.defaults;
					}

					for (var key in _dynamicModalTypes) {
						if (_dynamicModalTypes.hasOwnProperty(key) && key === id) {
							matchedConfig = _dynamicModalTypes[key];
						}
					}

					// fill out any unfilled options with the defaults
					$.extend(config, $.ddModals.dynamicModal.defaults, matchedConfig);

					if (config) {
						return config;
					}

					console.warn('$.ddModals: Dynamic modal of id "' + id + '" not found. Using defaults.');

					return $.ddModals.dynamicModal.defaults;
				},
				addType: function(id, config) {
					_dynamicModalTypes[id] = config;
				}
			},

			open: _openModal,

			close: _closeModal,

			isOpen: function() {
				return _isOpen;
			}
		}
	}).fn.extend({
		ddModals: function(options) {
			_options = $.extend(true, {}, $.ddModals.defaults, options);

			if (window.DD && !window.DD.a11y) {
				console.error('$.ddModals: Please ensure that dd.a11y.js is included in your project.');
				return;
			}

			if (window.DD && !window.DD.noScroll) {
				console.error('$.ddModals: Please ensure that dd.noScroll.js is included in your project.');
				return;
			}

			return $(this).each(function(i, el) {
				_init(el);
			});
		}
	});
})(jQuery, window, document);

/* =============================================================================
   DD OFFSCREEN - A jQuery plugin to offscreen nav
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/tabs.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_pageHasOffscreenOpen = false,
		_$html,
		_$pageWrap,
		_$currentOffscreen,
		_$currentOffscreenOpener,
		_checkDependencies,
		_updateOptionsFromDOM,
		_toggleOffscreen,
		_closeOffscreen,
		_init;

	_checkDependencies = function() {
		if (typeof (DD) === 'undefined') {
			throw new Error('$.ddOffscreen: DD.bp and DD.a11y are required dependencies for this plugin.');
		}

		if (typeof (DD.a11y) === 'undefined') {
			throw new Error('$.ddOffscreen: DD.a11y is a required dependency for this plugin.');
		}

		if (typeof (DD.bp) === 'undefined') {
			throw new Error('$.ddOffscreen: DD.bp is a required dependency for this plugin.');
		}

		if (typeof (enquire) === 'undefined') {
			throw new Error('$.ddOffscreen: enquire.js is a required dependency for this plugin.');
		}
	};

	/**
	 * Look at the container to see if there are any DOM attributes that
	 * can override base options
	 *
	 * @memberof $.ddOffscreen
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_updateOptionsFromDOM = function($container, options) {
		var updatedOptions = $.extend(true, {}, options);

		updatedOptions.at = $container.attr(options.attrs.at) || options.at;

		if ($container.hasClass(options.classes.isRight)) {
			updatedOptions.isRight = true;
		}

		if (updatedOptions.isRight && !$container.hasClass(options.classes.isRight)) {
			$container.addClass(options.classes.isRight);
		}

		return updatedOptions;
	};

	_toggleOffscreen = function(event, options) {
		event.preventDefault();

		var $button = $(event.currentTarget),
			id = $button.attr(options.attrs.id) || $button.attr('href').replace(/[\w\W]*#([\w\W]+)/g, '$1'),
			$container = $(document.getElementById(id));

		if ($container.length === 0) {
			console.warn('$.ddOffscreen: Can\'t find an offscreen panel with id "' + id + '".');
			return;
		}

		_$currentOffscreenOpener = $button;

		if (!_pageHasOffscreenOpen) {
			$container.trigger('open.ddOffscreen');
			return;
		}

		$container.trigger('close.ddOffscreen');
	};

	_closeOffscreen = function(event) {
		event.preventDefault();

		if (_pageHasOffscreenOpen && _$currentOffscreen) {
			_$currentOffscreen.trigger('close.ddOffscreen');
		}
	};

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddOffscreen
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @param {Number} i Index of the item on the page to help generate unique ids
	 * @private
	 * */
	_init = function(container, options) {
		var $container = $(container),
			$content = $container.find('.' + options.classes.content),
			_isDisabled = false,
			_isAnimating = false,
			_isInit = false,
			_isOpen = false,
			_animations,
			_open,
			_close,
			_enable,
			_disable,
			_initOffscreen,
			_initOffscreenAt;

		// don't run more than once
		if (typeof ($container.data('ddOffscreen-isInit')) === 'boolean' && $container.data('ddOffscreen-isInit') === true) {
			return;
		}

		options = _updateOptionsFromDOM($container, options);

		for (var key in options.animations) {
			if (options.animations.hasOwnProperty(key)) {
				if (key === options.animationType) {
					_animations = options.animations[key];
				}
			}
		}

		if (typeof (_animations) === 'undefined') {
			console.warn('$.ddOffscreen: Animation type "' + options.animationType + '" not found. Defaulting to "over" instead.');
			_animations = options.animations.over;
		}

		_open = function() {
			if (_isDisabled) {
				return;
			}

			if (!_isOpen && !_isAnimating) {
				_isAnimating = true;

				var onOpenComplete = function() {
					_$html.addClass(options.classes.isOpen);
					_$html.removeClass(options.classes.isAnimating).removeClass(options.classes.isAnimatingOpen);

					DD.a11y.tabInsideContainer.set($container, true);
					DD.a11y.onEscape.set(_close);
					DD.a11y.onClickOutside.set($container, _close);
					DD.a11y.ariaHideOthers.set($container);

					_animations.reset($container, _$pageWrap, $content);

					_pageHasOffscreenOpen = true;
					_isOpen = true;
					_isAnimating = false;

					_$currentOffscreen = $container;
				};

				$container.attr({
					'aria-hidden': false
				});

				DD.noScroll.set();

				$container.addClass(options.classes.isActive);
				_$html.addClass(options.classes.isAnimating).addClass(options.classes.isAnimatingOpen);
				_animations.show($container, _$pageWrap, $content, options, onOpenComplete);

				if (options.hasBackground) {
					$.ddShade.setActive(true);
					$.ddShade.opacity(options.backgroundOpacity, options.durations.show);
				}
			}
		};

		_close = function() {
			if (_isOpen && !_isAnimating) {
				_isAnimating = true;

				var onCloseComplete = function() {
					_$html.removeClass(options.classes.isOpen);
					_$html.removeClass(options.classes.isAnimating).removeClass(options.classes.isAnimatingClose);
					$container.removeClass(options.classes.isActive);

					DD.a11y.tabInsideContainer.unset();
					DD.a11y.onEscape.unset();
					DD.a11y.onClickOutside.unset();
					DD.a11y.ariaHideOthers.unset();

					if (_$currentOffscreenOpener && _$currentOffscreenOpener.length > 0) {
						_$currentOffscreenOpener.get(0).focus();
					}

					$container.attr({
						'aria-hidden': true
					});

					_$currentOffscreen = null;
					_$currentOffscreenOpener = null;

					_animations.reset($container, _$pageWrap, $content);

					_pageHasOffscreenOpen = false;
					_isOpen = false;
					_isAnimating = false;
				};

				DD.noScroll.unset();

				_$html.addClass(options.classes.isAnimating).addClass(options.classes.isAnimatingClose);
				_animations.hide($container, _$pageWrap, $content, options, onCloseComplete);

				if (options.hasBackground) {
					$.ddShade.opacity(0, options.durations.hide, false, function() {
						$.ddShade.setActive(false);
					});
				}
			}
		};

		_enable = function() {
			_isDisabled = false;

			if (!_isInit) {
				_initOffscreen();
			}
		};

		_disable = function() {
			_isDisabled = true;

			if (_isOpen) {
				_close();
			}
		};

		_initOffscreen = function() {
			$container.on('open.ddOffscreen', _open);
			$container.on('close.ddOffscreen', _close);
			$container.on('enable.ddOffscreen', _enable);
			$container.on('disable.ddOffscreen', _disable);

			_isInit = true;
			_isDisabled = false;
		};

		$container.attr({
			'aria-hidden': true
		});

		if (options.at === true) {
			_initOffscreen();
			return;
		}

		_initOffscreenAt = function() {
			if (!_isInit) {
				_initOffscreen();
			}

			if (DD.bp.is(options.at)) {
				_enable();
			} else {
				_disable();
			}
		};

		enquire.register(DD.bp.get(options.at), {
			match: _initOffscreenAt,
			unmatch: _initOffscreenAt
		});

		$container.data('ddOffscreen-isInit', true);
	};

	$.extend({
		ddOffscreen: {
			defaults: {
				at: true,
				hasBackground: true,
				backgroundOpacity: 0.75,
				useTranslate: true,
				animationType: 'over', // can be 'side', 'over' or 'full'
				isRight: false,
				navWidth: '270px',
				attrs: {
					id: 'data-offscreen-id',
					at: 'data-offscreen-at'
				},
				durations: {
					show: 400,
					hide: 400
				},
				triggers: {
					toggle: 'js-offscreen-toggle',
					close: 'js-offscreen-close'
				},
				classes: {
					pageWrap: 'page-wrap',
					content: 'offscreen-content',
					isOpen: 'offscreen-is-open',
					useTranslate: 'offscreen-use-translate',
					isActive: 'is-active',
					isRight: 'is-right',
					isAnimating: 'is-animating-offscreen',
					isAnimatingOpen: 'is-animating-open-offscreen',
					isAnimatingClose: 'is-animating-close-offscreen'
				},
				animations: {
					side: {
						show: function($container, $pageWrap, $content, options, callback) {
							var containerOptions = {},
								pageWrapOptions = {},
								contentOptions = {};

							if (options.isRight) {
								$pageWrap.addClass(options.classes.isRight);

								containerOptions.right = 0;
								pageWrapOptions.left = '-' + options.navWidth;

								$.Velocity.hook($content, 'translateX', '-50%');
							} else {
								containerOptions.left = 0;
								pageWrapOptions.left = options.navWidth;

								$.Velocity.hook($content, 'translateX', '50%');
							}

							if (options.useTranslate) {
								contentOptions.translateZ = 0;
								contentOptions.translateX = 0;
							} else {
								contentOptions.left = 0;
							}

							$container.velocity('stop').velocity(containerOptions, {
								duration: options.durations.show,
								complete: callback,
								easing: 'ease-in-out'
							});

							$pageWrap.velocity('stop').velocity(pageWrapOptions, {
								duration: options.durations.show,
								easing: 'ease-in-out'
							});

							$content.velocity('stop').velocity(contentOptions, {
								duration: options.durations.show,
								easing: 'ease-in-out'
							});
						},
						hide: function($container, $pageWrap, $content, options, callback) {
							var containerOptions = {},
								pageWrapOptions = {},
								contentOptions = {};

							if (options.isRight) {
								containerOptions.right = '-' + options.navWidth;
							} else {
								containerOptions.left = '-' + options.navWidth;
							}

							pageWrapOptions.left = 0;

							if (options.useTranslate) {
								contentOptions.translateZ = 0;
								contentOptions.translateX = '50%';

								if (options.isRight) {
									contentOptions.translateX = '-50%';
								}
							}

							$container.velocity('stop').velocity(containerOptions, {
								duration: options.durations.hide,
								complete: callback,
								easing: 'ease-in-out'
							});

							$pageWrap.velocity('stop').velocity(pageWrapOptions, {
								duration: options.durations.hide,
								easing: 'ease-in-out'
							});

							$content.velocity('stop').velocity(contentOptions, {
								duration: options.durations.hide,
								easing: 'ease-in-out'
							});
						},
						reset: function($container, $pageWrap, $content) {
							$container.velocity('stop').removeAttr('style');
							$pageWrap.velocity('stop').removeAttr('style');
							$content.velocity('stop').removeAttr('style');
						}
					},
					over: {
						show: function($container, $pageWrap, $content, options, callback) {
							var containerOptions = {};

							if (options.useTranslate) {
								if (options.isRight) {
									$.Velocity.hook($container, 'translateX', options.navWidth);
								} else {
									$.Velocity.hook($container, 'translateX', '-' + options.navWidth);
								}

								containerOptions.translateZ = 0;
								containerOptions.translateX = 0;
							} else {
								if (options.isRight) {
									containerOptions.right = 0;
								} else {
									containerOptions.left = 0;
								}
							}

							$container.velocity(containerOptions, {
								duration: options.durations.show,
								complete: callback,
								easing: 'ease-in-out'
							});
						},
						hide: function($container, $pageWrap, $content, options, callback) {
							var containerOptions = {};

							if (options.useTranslate) {
								if (options.isRight) {
									containerOptions.translateX = options.navWidth;
								} else {
									containerOptions.translateX = '-' + options.navWidth;
								}
							} else {
								if (options.isRight) {
									containerOptions.right = '-' + options.navWidth;
								} else {
									containerOptions.left = '-' + options.navWidth;
								}
							}

							$container.velocity(containerOptions, {
								duration: options.durations.hide,
								complete: callback,
								easing: 'ease-in-out'
							});
						},
						reset: function($container) {
							$container.velocity('stop').removeAttr('style');
						}
					},
					full: {
						show: function($container, $pageWrap, $content, options, callback) {
							$container.css({
								opacity: 0,
								display: 'block',
								left: 0
							});

							$.Velocity.hook($content, 'scale', 0.9);

							setTimeout(function() {
								$container.velocity({
									opacity: 1
								}, {
									duration: options.durations.show,
									complete: callback,
									easing: 'ease-out'
								});

								$content.velocity({
									scale: 1
								}, {
									duration: options.durations.show,
									easing: 'ease-out'
								});
							}, 50);
						},
						hide: function($container, $pageWrap, $content, options, callback) {
							$container.velocity({
								opacity: 0
							}, {
								duration: options.durations.hide,
								complete: callback,
								easing: 'ease-out'
							});

							$content.velocity({
								scale: 0.9
							}, {
								duration: options.durations.hide,
								easing: 'ease-out'
							});
						},
						reset: function($container, $pageWrap, $content) {
							$container.velocity('stop').removeAttr('style');
							$content.velocity('stop').removeAttr('style');
						}
					}
				}
			}
		}
	}).fn.extend({
		ddOffscreen: function(options) {
			if (window.DD && !window.DD.a11y) {
				console.error('$.ddOffscreen: Please ensure that dd.a11y.js is included in your project.');
				return;
			}

			if (window.DD && !window.DD.noScroll) {
				console.error('$.ddOffscreen: Please ensure that dd.noScroll.js is included in your project.');
				return;
			}

			_checkDependencies();

			options = $.extend(true, {}, $.ddOffscreen.defaults, options);

			_$html = $('html');
			_$pageWrap = $('.' + options.classes.pageWrap);

			if (options.useTranslate) {
				_$html.addClass(options.classes.useTranslate);
			}

			// bind a live listener for offscreen toggle buttons
			$(document).on('click.ddOffscreen', '.' + options.triggers.toggle, function(event) {
				_toggleOffscreen(event, options);
			});

			$(document).on('click.ddOffscreen', '.' + options.triggers.close, _closeOffscreen);

			return $(this).each(function(i, el) {
				_init(el, options);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD ONSCREEN - A jQuery plugin for onscreen nav
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/onscreen.html */

;(function($, window, document, undefined) {

	'use strict';

	var _CONST,
		_checkDependencies,
		_updateOptionsFromDOM,
		_overrideWithDataAttribute,
		_resetTimeout,
		_navHoverTimeout,
		_navBlurTimeout,
		_navIdCount,
		_init;

	_navIdCount = 0;

	_CONST = {
		KEYCODE: {
			ENTER: 13,
			SPACE: 32
		}
	};

	/**
	 * Throws an error if a dependency is missing.
	 *
	 * @memberof $.ddOnscreen
	 * @private
	 * */
	_checkDependencies = function() {
		if (typeof (DD) === 'undefined') {
			throw new Error('$.ddOnscreen: DD.bp and DD.a11y are required dependencies for this plugin.');
		}

		if (typeof (DD.a11y) === 'undefined') {
			throw new Error('$.ddOnscreen: DD.a11y is a required dependency for this plugin.');
		}

		if (typeof ($.ddShade) === 'undefined') {
			throw new Error('$.ddOnscreen: $.ddShade is a required dependency for this plugin.');
		}

		if (typeof (DD.bpAttach) === 'undefined') {
			throw new Error('$.ddOnscreen: DD.bpAttach is a required dependency for this plugin.');
		}
	};

	/**
	 * Returns the override value if the data attribute exists on the element,
	 * otherwise returns the fallback value provided.
	 *
	 * @memberof $.ddOnscreen
	 * @param {Object} $el The jQuery element to check for the data attribute on
	 * @param {String} attrName The name of the data attribute to check for
	 * @param {Object} fallbackValue The value to return if the attribute isn't set (i.e. the value being potentially overriden)
	 * @private
	 * */
	_overrideWithDataAttribute = function($el, attrName, fallbackValue) {
		var strippedAttrName,
			value;

		// strip 'data-' from beginning of attribute name if it's there
		strippedAttrName = attrName.replace(/^data-/, '');
		value = $el.data(strippedAttrName);

		// Use the original value if there is no data attribute
		if (typeof value === 'undefined') {
			return fallbackValue;
		}

		// return the override value
		return value;
	};

	/**
	 * Override option values with values from the DOM
	 *
	 * @memberof $.ddOnscreen
	 * @param {Object} $container The jQuery element to check for the data attributes on
	 * @param {Object} options The options to be overridden
	 * @private
	 * */
	_updateOptionsFromDOM = function($container, options) {
		var updatedOptions = $.extend(true, {}, options);

		updatedOptions.at = _overrideWithDataAttribute($container, options.attrs.at, options.at);

		return updatedOptions;
	};

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddOnscreen
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @param {Number} i Index of the item on the page to help generate unique ids
	 * @private
	 * */
	_init = function(container, options) {
		var $container = $(container),
			$nav = $container.find('.nav'),
			$items = $nav.children('.' + options.classes.navItem),
			_navid = $container.attr('id') || (options.navIdPrefix + _navIdCount),
			_openDropdown,
			_closeDropdown,
			_closeCurrentlyOpen,
			_openOnTouchOrKey,
			_handleCloseButtons,
			_focusBackToParentLink,
			_onEscapeDropdown,
			_animations,
			_isEnabled = true,
			_onAttach,
			_onDetach,
			_initNavItem;

		// don't run more than once
		if ($container.data('ddOnscreen-isInit') === true) {
			return;
		}

		// ensure the nav item ids are unique
		_navIdCount = _navIdCount + 1;

		// override options from dom
		options = _updateOptionsFromDOM($container, options);

		// for convenience, populate _animations with the chosen animations
		for (var key in options.animations) {
			if (options.animations.hasOwnProperty(key)) {
				if (key === options.animationType) {
					_animations = options.animations[key];
				}
			}
		}

		if (typeof (_animations) === 'undefined') {
			throw new Error('$.ddOnscreen: There is no animation defined for: \'' + options.animationType + '\'');
		}

		if (!_animations.reset || typeof (_animations.reset) !== 'function') {
			console.warn('$.ddOnscreen: If you\'re using a custom animation, you should implement the reset method too');
		}

		// Handle buttons inside a dropdown which should close it.
		_handleCloseButtons = function(id, $buttons) {
			$buttons
				.off('click.dropdown-close')
				.on('click.dropdown-close', function() {
					_closeDropdown(id);
				});

			// Give keyboard focus back to the parent link if user is navigating
			// using the keyboard
			$buttons
				.off('keydown.dropdown-close')
				.on('keydown.dropdown-close', function() {
					var key = event.which || event.keyCode || 0;

					if (key === _CONST.KEYCODE.ENTER) {
						_closeDropdown(id, false, true, function() {
							_focusBackToParentLink(id);
						});
					}
				});
		};

		_openDropdown = function(id, instantly, currentItemHasDropdown, callback) {
			var $link = $(document.getElementById(id)),
				isOpening = $link.hasClass(options.classes.isOpening),
				$dropdown = $link.find('.' + options.classes.dropdown),
				$closeButtons = $dropdown.find('.' + options.triggers.close),
				onOpenComplete;

			// Only start opening if the nav is enabled and there is definitely a
			// dropdown and it's not already opening.
			if (!_isEnabled || !$dropdown.length || isOpening) {
				return;
			}

			$link.removeClass(options.classes.isClosing);
			$link.addClass(options.classes.isOpening);

			$link.addClass(options.classes.hover);

			// by default the item selected currently doesn't have a dropdown
			currentItemHasDropdown = currentItemHasDropdown || false;

			_handleCloseButtons(id, $closeButtons);

			onOpenComplete = function() {
				$link.removeClass(options.classes.isOpening);

				if (_animations.reset && typeof (_animations.reset) === 'function') {
					_animations.reset($container, $link, $dropdown, options);
				}

				$container.trigger('opened.ddOnscreen', id);

				if (typeof (callback) === 'function') {
					callback();
				}
			};

			// display the background only if there is a menu item with a dropdown selected
			if (!options.disableBackground && options.hasBackground && $dropdown.length > 0) {
				$.ddShade.setActive(true);
				$.ddShade.setBehindHeader(true);
				$.ddShade.opacity(options.backgroundOpacity, options.durations.show, true);
			}

			DD.a11y.onEscape.set(function() {
				_onEscapeDropdown(id);
			});
			DD.a11y.onClickOutside.set($container, function() {
				_closeDropdown(id, false);
			});

			// set a11y attributes
			$link.children('a').attr({
				'aria-expanded': true
			});

			// Remove inline display: none, which is added if quickKeyboard is on
			if (options.quickKeyboard) {
				$dropdown.css({
					visibility: ''
				});
			}

			_animations.show($container, $link, $dropdown, options, (instantly && currentItemHasDropdown), onOpenComplete);
		};

		_closeDropdown = function(id, instantly, newItemHasDropdown, callback) {
			var $link = $('#' + id),
				isClosing = $link.hasClass(options.classes.isClosing),
				$dropdown = $link.find('.' + options.classes.dropdown),
				onCloseComplete;

			// Only start closing if the nav is enabled and there is definitely a
			// dropdown and it's not already closing.
			if (!_isEnabled || !$dropdown.length || isClosing) {
				return;
			}

			$link.removeClass(options.classes.isOpening);
			$link.addClass(options.classes.isClosing);

			onCloseComplete = function() {
				var isOpening = $link.hasClass(options.classes.isOpening);

				$link.removeClass(options.classes.isClosing);

				// If the dropdown has started reopening, don't interfere
				if (!isOpening) {
					if (_animations.reset && typeof (_animations.reset) === 'function') {
						_animations.reset($container, $link, $dropdown, options);
					}

					$link.removeClass(options.classes.hover);

					if (options.quickKeyboard) {
						$dropdown.css({
							visibility: 'hidden'
						});
					}
				}

				$container.trigger('closed.ddOnscreen', id);

				if (typeof (callback) === 'function') {
					callback();
				}
			};

			// by default the new item doesn't have a dropdown
			newItemHasDropdown = newItemHasDropdown || false;

			DD.a11y.onEscape.unset();
			DD.a11y.onClickOutside.unset();

			// set a11y attributes
			$link.find('> a').attr({
				'aria-expanded': false
			});

			// handles the dropdown navigation background fadeout
			if (options.hasBackground && (!instantly || !newItemHasDropdown)) {
				$.ddShade.opacity(0, options.durations.hide, true, function() {
					$.ddShade.setActive(false);
					$.ddShade.setBehindHeader(false);
				});
			}

			_animations.hide($container, $link, $dropdown, options, instantly, onCloseComplete);
		};

		// close the dropdown that's currently open
		_closeCurrentlyOpen = function(callback, instantly, newItemHasDropdown) {
			newItemHasDropdown = newItemHasDropdown || false;

			$nav.find('> .' + options.classes.hover).each(function() {
				_closeDropdown($(this).attr('id'), instantly, newItemHasDropdown);
			});

			if (typeof (callback) === 'function') {
				callback();
			}
		};

		// Put focus back on the parent nav item which matches the id provided
		_focusBackToParentLink = function(id) {
			$('#' + id).find('> a').eq(0).focus();
		};

		// callback for pressing escape inside a dropdown
		_onEscapeDropdown = function(id) {
			_closeCurrentlyOpen(function() {
				_focusBackToParentLink(id);
			}, true);
		};

		// Helper function for resetting a timeout
		_resetTimeout = function(timeout) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
		};

		// Handle touch or keyboard
		_openOnTouchOrKey = function(event, $item, id) {
			var $dropdown = $item.find('.' + options.classes.dropdown);

			// only allow if the navigation is enabled
			if (!_isEnabled) {
				return;
			}

			if ($item.hasClass(options.classes.hover)) {
				// allow touch devices to click through to the link
				return true;
			} else {
				event.preventDefault();
				event.originalEvent.preventDefault();

				// check if the previous and next items have a dropdown (used for the background blockout transition)
				var fromAnotherNavItem = ($nav.find('> .' + options.classes.hover).length > 0),
					currentItemHasDropdown = ($nav.find('> .' + options.classes.hover).find('.' + options.classes.dropdown).length > 0),
					newItemHasDropdown = ($item.find('.' + options.classes.dropdown).length > 0);

				$item.addClass(options.classes.hovering);

				// close the currently open item
				_closeCurrentlyOpen(function() {
					_openDropdown(id, fromAnotherNavItem, currentItemHasDropdown, function() {
						// when opening a dropdown with the keyboard focus:
						var $takeFocus = $dropdown.find('.' + options.classes.takeFocus);

						if ($takeFocus.length > 0) {
							// focus on the first item with the takeFocus class
							$takeFocus.get(0).focus();
						} else {
							// otherwise focus on the first tabbable element
							$dropdown.find(':tabbable').get(0).focus();
						}
					});
				}, fromAnotherNavItem, newItemHasDropdown);
			}
		};

		// Init nav item
		_initNavItem = function(_navid, itemid, $item) {
			var id = _navid + '-item-' + itemid,
				$itemTitle = $item.find('.' + options.classes.navItemTitle),
				$dropdown = $item.find('.' + options.classes.dropdown),
				$tabbable = $dropdown.find(':tabbable');

			// Fallback to finding the first a tag if there was nothing with the
			// navItemTitle class
			if (!$itemTitle.length) {
				$itemTitle = $item.find('> a');
			}

			// assign a unique ID to the navigation
			$item.attr('id', id);

			if ($dropdown.length) {
				$itemTitle.attr({
					'aria-expanded': false
				});
			}

			if (options.quickKeyboard) {
				$dropdown.css({
					visibility: 'hidden'
				});
			}

			if (Modernizr.touchevents) {
				// touch screens should be able to click to open the navigation,
				// then click again to be taken to the navigation link
				if ($dropdown.length) {
					$itemTitle.on('touchstart.navdropdown', function(event) {
						_openOnTouchOrKey(event, $item, id);
					});
				}
			} else {
				// Show hover state on menu item instantly on hover
				$item.on('mouseenter.navdropdown', function(e) {
					var isNavTitle = $(e.target).hasClass(options.classes.navItemTitle),
						_onHover,
						fromAnotherNavItem = ($nav.find(e.relatedTarget).length > 0);

					// add hovering classes immediately
					$item.addClass(options.classes.hovering);

					if (!_isEnabled) {
						return;
					}

					_onHover = function() {
						// check if the previous and next items have a dropdown
						// (used for the background blockout transition)
						var currentItemHasDropdown = ($nav.find('> .' + options.classes.hover).find('.' + options.classes.dropdown).length > 0),
							newItemHasDropdown = ($item.find('.' + options.classes.dropdown).length > 0);

						if (fromAnotherNavItem) {
							_closeCurrentlyOpen(function() {
								_openDropdown(id, true, currentItemHasDropdown);
							}, true, newItemHasDropdown);
						} else {
							_openDropdown(id, false, currentItemHasDropdown);
						}
					};

					if ($item.hasClass(options.classes.hover)) {
						if (!isNavTitle || (isNavTitle && !$item.hasClass(options.classes.isClosing))) {
							_resetTimeout(_navBlurTimeout);
							return;
						}
					}

					_navHoverTimeout = setTimeout(_onHover, options.durations.hoverTimeout);
				});

				// Cancel hover timeout on mouseleave of main nav links.
				$item.on('mouseleave.navdropdown', '.' + options.classes.navItemTitle, function() {
					_resetTimeout(_navHoverTimeout);
				});

				// Remove hover state on menu item when rolled off
				$item.on('mouseleave.navdropdown', function(e) {
					$item.removeClass(options.classes.hovering);

					// check if the user has moved from one to another navigation item
					var toAnotherNavItem = ($nav.find(e.relatedTarget).length > 0);
					if (!toAnotherNavItem) {
						_navBlurTimeout = setTimeout(function() {
							_closeCurrentlyOpen(null, false);
						}, options.durations.blurTimeout);
					}
				});

				if ($dropdown.length) {
					// Handle enter and space bar
					$item.on('click.navdropdown keydown.navdropdown', '.' + options.classes.navItemTitle, function(event) {
						if (event.type === 'click' && !$item.hasClass(options.classes.hovering)) {
							// assume that they keyboard has clicked this
							_openOnTouchOrKey(event, $item, id);
							return;
						}

						var key = event.which || event.keyCode || 0;

						if (key === _CONST.KEYCODE.ENTER || key === _CONST.KEYCODE.SPACE) {
							_openOnTouchOrKey(event, $item, id);
						}
					});

					$tabbable.on('focus.navdropdown', function() {
						if (!_isEnabled) {
							return;
						}

						_resetTimeout(_navBlurTimeout);

						if ($item.hasClass(options.classes.hover)) {
							return;
						}

						var currentItemHasDropdown = ($nav.find('> .' + options.classes.hover).find('.' + options.classes.dropdown).length > 0),
							newItemHasDropdown = ($item.find('.' + options.classes.dropdown).length > 0);


						_closeCurrentlyOpen(function() {
							_openDropdown(id, true, currentItemHasDropdown);
						}, true, newItemHasDropdown);
					});

					$tabbable.on('blur.navdropdown', function() {
						_resetTimeout(_navBlurTimeout);

						_navBlurTimeout = setTimeout(function() {
							_closeDropdown(id, false);
						}, options.durations.hoverTimeout);
					});

					// Clear the blur timeout on click to prevent the dropdown from closing if a link inside the dropdown has focus and then loses focus because the user clicks inside the dropdown
					$item.on('click.navdropdown', function() {
						_resetTimeout(_navBlurTimeout);
					});
				}
			}
		};

		_onAttach = function() {
			_isEnabled = true;
		};

		_onDetach = function() {
			_isEnabled = false;
		};

		if (typeof (options.at) === 'string') {
			DD.bpAttach.at(options.at, _onAttach, _onDetach);
		}

		$items.each(function(i, el) {
			_initNavItem(_navid, i, $(el));
		});

		$container.data('ddOffscreen-isInit', true);
	};
	$.extend({
		ddOnscreen: {
			defaults: {
				at: true,
				hasBackground: true,
				backgroundOpacity: 0.75,
				navIdPrefix: 'dropdown-nav-',
				quickKeyboard: true,
				animationType: 'fade',
				durations: {
					show: 300,
					hide: 300,
					hoverTimeout: 250,
					blurTimeout: 250
				},
				triggers: {
					close: 'js-dropdown-close'
				},
				attrs: {
					at: 'data-onscreen-at'
				},
				animations: {
					fade: {
						show: function($container, $link, $dropdown, options, instantly, callback) {
							$dropdown.css({
								'opacity': 0,
								'margin-left': 0
							});

							$dropdown.velocity({
								opacity: 1
							}, {
								duration: (instantly ? 0 : options.durations.show),
								complete: function() {

									$dropdown.attr('style', '');

									if (typeof (callback) === 'function') {
										callback();
									}
								}
							});
						},
						hide: function($container, $link, $dropdown, options, instantly, callback) {
							$dropdown.css({
								'opacity': 1,
								'margin-left': 0
							});

							$dropdown.velocity({
								opacity: 0
							}, {
								duration: (instantly ? 0 : options.durations.hide),
								complete: function() {
									if (typeof (callback) === 'function') {
										callback();
									}
								}
							});
						},
						reset: function($container, $link, $dropdown, options) {
							$container.velocity('stop').removeAttr('style');
							$link.velocity('stop').removeAttr('style');
							$dropdown.velocity('stop').removeAttr('style');
						}
					}
				},
				classes: {
					navList: 'nav',
					navItem: 'nav-item',
					navItemTitle: 'nav-item-title',
					takeFocus: 'js-dropdown-focus',
					dropdown: 'dropdown',
					hover: 'is-hover', // Used to show the dropdown
					hovering: 'is-hovering', // Used to apply style to the link
					isOpening: 'is-opening',
					isClosing: 'is-closing'
				}
			}
		}
	}).fn.extend({
		ddOnscreen: function(options) {

			_checkDependencies();

			options = $.extend(true, {}, $.ddOnscreen.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD RESPONSIVE TABLE - A jQuery plugin for making tables responsive
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/responsive-table.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_init;

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddResponsiveTable
	 * @param {Object} table The original table to be enhanced
	 * @param {Object} options The options passed to the plugin
	 * @param {Number} tableIndex Index of the item on the page to help generate unique ids
	 * @private
	 * */
	_init = function(table, options, tableIndex) {
		var $table = $(table),
			$responsiveTable,
			$scrollableContainer,
			_scrollable,
			_columnToggle,
			_handleResize;

		// don't run more than once
		if (typeof ($table.data('ddResponsiveTable-isInit')) === 'boolean' && $table.data('ddResponsiveTable-isInit') === true) {
			return;
		}

		// allow the table to scroll left/right with shadows appearing/disappearing
		// depending on how close to the edge of the table the scrollable window is.
		_scrollable = (function() {
			var init,
				onScrollHandler,
				checkIfHasScroll;

			// display or hide the shadows when the scroll is close to the edge
			onScrollHandler = function() {
				var scrollableWidth = $table.outerWidth() - $scrollableContainer.outerWidth(),
					amountScrolled = Math.floor(($scrollableContainer.scrollLeft() / scrollableWidth) * 100);

				// scroll left shadow depending how close it is to the start of the table
				if (amountScrolled < 10) {
					$scrollableContainer.find('.' + options.classes.scrollable.shadowBefore).css({
						'margin-left': parseInt(10 - amountScrolled, 10) * -1 + 'px'
					});
				} else {
					$scrollableContainer.find('.' + options.classes.scrollable.shadowBefore).css({
						'margin-left': 0
					});
				}

				// scroll right shadow depending how close it is to the end of the table
				if (amountScrolled > 90) {
					$scrollableContainer.find('.' + options.classes.scrollable.shadowAfter).css({
						'margin-left': parseInt(90 - amountScrolled, 10) * -1 + 'px'
					});
				} else {
					$scrollableContainer.find('.' + options.classes.scrollable.shadowAfter).css({
						'margin-left': 0
					});
				}
			};

			// the table will only need scrolling if the table inside is
			// larger than the outside container
			checkIfHasScroll = function() {
				if ($table.outerWidth() > $scrollableContainer.outerWidth()) {
					$responsiveTable.addClass(options.classes.scrollable.hasScroll);
					onScrollHandler();
					$scrollableContainer.on('scroll.ddResponsiveTable', onScrollHandler);
				} else {
					$responsiveTable.removeClass(options.classes.scrollable.hasScroll);
					$scrollableContainer.off('scroll.ddResponsiveTable', onScrollHandler);
				}
			};

			// initialiser
			init = function() {
				$scrollableContainer = $('<div/>', {
					class: options.classes.scrollable.container
				});

				$responsiveTable.append($scrollableContainer).insertBefore($table);

				$table.appendTo($scrollableContainer);
				$scrollableContainer.prepend($('<span/>', {
					class: options.classes.scrollable.shadowBefore
				})).append($('<span/>', {
					class: options.classes.scrollable.shadowAfter
				}));
			};

			return {
				onScrollHandler: onScrollHandler,
				checkIfHasScroll: checkIfHasScroll,
				init: init
			};
		})();

		// adds toggleable columns on smaller screens so columns can dynamically be disabled,
		// making the table easier to read
		_columnToggle = (function() {
			var columnIndex = 0,
				$menuList,
				$menuContents,
				$menuButton,
				$menuContainer,
				_parseTable,
				_closeMenu,
				_onMenuButtonClick,
				_getColumnClasses,
				getInputs,
				init;

			// close the popup menu
			_closeMenu = function() {
				$(document).off('click.ddResponsiveTable touchStart.ddResponsiveTable');
				$menuContents.addClass(options.classes.columnToggle.isHidden);
			};

			// when the menu button is clicked
			_onMenuButtonClick = function(event) {
				event.preventDefault();

				if ($menuContents.hasClass(options.classes.columnToggle.isHidden)) {
					$menuContents.removeClass(options.classes.columnToggle.isHidden);

					$(document).on('click.ddResponsiveTable touchStart.ddResponsiveTable', function(event) {
						if ($menuContainer.find(event.target).length === 0) {
							_closeMenu();
						}
					});
				} else {
					_closeMenu();
				}
			};

			// only return classes with the appropriate prefix (by default 'column-')
			_getColumnClasses = function(classes) {
				var classesArray = [];

				if (!classes) {
					return '';
				}

				classesArray = classes.split(' ');
				classesArray = $.grep(classesArray, function(className) {
					return (className.indexOf(options.classes.columnToggle.columns.prefix) === 0);
				});

				return classesArray.join(' ');
			};

			// read through the table and understand what the structure is so we can apply the classes
			// to all of the table columns, add the menu and create the correct list items and add the
			// toggleable functionality
			_parseTable = function() {
				$table.find('thead th').each(function(thIndex, el) {
					var $th = $(el),
						id = $th.attr('id'),
						colspan = parseInt($th.attr('colspan'), 10) || 1,
						classes = _getColumnClasses($th.attr('class'));

					// Assign a unique ID to each <th> that doesn't already have one
					if (!id) {
						id = 'responsive-table-' + tableIndex + '-col-' + thIndex;
						$th.attr('id', id);
					}

					// Loop through each row to assign a 'headers' attribute and any classes
					// (column-persist, column-important, column-optional) to the matching cell
					$table.find('tbody tr, tfoot tr').each(function() {
						// The slice() function is used to select multiple cells if the <th> had a colspan
						var $cells = $(this).find('th, td').slice(columnIndex, columnIndex + colspan);

						$cells.attr('headers', id);

						if (classes) {
							$cells.addClass(classes);
						}
					});

					// Create the menu hide/show toggles
					if (!$th.hasClass(options.classes.columnToggle.columns.prefix + options.classes.columnToggle.columns.persist)) {
						var toggleId = 'responsive-table-' + tableIndex + '-toggle-col-' + thIndex,
							$input;

						$input = $('<input/>', {
							type: 'checkbox',
							name: 'responsive-table-' + tableIndex + '-toggle-cols',
							id: toggleId,
							value: id
						});

						$menuList.append($('<li/>').append($input).append($('<label/>', {
							for: toggleId,
							text: $th.text()
						})));

						// bind events to the inputs to toggle the display of the columns
						$input.on('change.ddResponsiveTable', function() {
							var val = $input.val(),
								$cols = $(document.getElementById(val)).add($('[headers=' + val + ']'));

							if ($input.is(':checked')) {
								$cols.removeClass(options.classes.columnToggle.columns.forceHide)
									.addClass(options.classes.columnToggle.columns.forceShow);
							} else {
								$cols.addClass(options.classes.columnToggle.columns.forceHide)
									.removeClass(options.classes.columnToggle.columns.forceShow);
							}

							if (options.scrollable) {
								_scrollable.checkIfHasScroll();
							}
						});

						// update the menu inputs when the page size changes
						$input.on('updateInputs.ddResponsiveTable', function() {
							if ($th.css('display') === 'table-cell') {
								$input.attr('checked', true);
							} else {
								$input.attr('checked', false);
							}
						});
					}

					columnIndex += colspan;
				});
			};

			// get the inputs from the menu
			getInputs = function() {
				return $menuList.find('input');
			};

			// initialiser
			init = function() {
				// create the dynamic menu
				$menuList = $('<ul/>');
				$menuContents = $('<div/>', {
					class: options.classes.columnToggle.menuContents + ' ' + options.classes.columnToggle.isHidden
				}).append($menuList);

				$menuButton = $('<button/>', {
					class: options.classes.columnToggle.menuButton,
					text: options.columnToggleText
				});

				$menuContainer = $('<div/>', {
					class: options.classes.columnToggle.menu
				}).append($menuButton).append($menuContents);

				// read through the table
				_parseTable();

				// functionality for the menu button
				$menuButton.on('click.ddResponsiveTable touchStart.ddResponsiveTable', _onMenuButtonClick);

				// add to the page
				$responsiveTable.before($menuContainer);
				$responsiveTable.addClass(options.classes.columnToggle.hasColumnToggle);
			};

			return {
				getInputs: getInputs,
				init: init
			};
		})();

		// create the table wrapper for responsive tables
		$responsiveTable = $('<div/>', {
			class: options.classes.container
		});

		if (options.scrollable) {
			// implement scrollable table
			_scrollable.init();
		} else {
			// if the scrollable class doesn't setup the wrapper for us,
			// we'll setup a version of it now
			$table.wrap($responsiveTable);
			$responsiveTable = $table.parent();
		}

		if (options.columnToggle) {
			// implement column toggle table
			_columnToggle.init();
		}

		// on resize of the page check for updates to the table
		_handleResize = function() {
			if (options.scrollable) {
				_scrollable.checkIfHasScroll();
			}

			if (options.columnToggle && _columnToggle.getInputs().length > 0) {
				_columnToggle.getInputs().trigger('updateInputs.ddResponsiveTable');
			}
		};

		// only bind the resize event if it's actually needed
		if (options.scrollable || (options.columnToggle && _columnToggle.getInputs().length > 0)) {
			$(window).on('resize.ddResponsiveTable orientationchange.ddResponsiveTable', $.throttle(100, _handleResize));
			_handleResize();
		}

		// the table has been initialised - this will ensure that it can't be run multiple times
		$table.data('ddResponsiveTable-isInit', true);
	};

	$.extend({
		ddResponsiveTable: {
			defaults: {
				scrollable: true,
				columnToggle: false,
				columnToggleText: 'Show/hide columns',
				classes: {
					container: 'responsive-table',
					scrollable: {
						container: 'table-scrollable',
						shadowBefore: 'shadow-before',
						shadowAfter: 'shadow-after',
						hasScroll: 'has-scroll'
					},
					columnToggle: {
						menu: 'responsive-table-toggle-menu',
						menuContents: 'responsive-table-toggle-menu-list',
						menuButton: 'responsive-table-toggle-menu-btn',
						columns: {
							prefix: 'column-',
							persist: 'persist',
							forceShow: 'column-force-show',
							forceHide: 'column-force-hide'
						},
						isHidden: 'is-hidden',
						hasColumnToggle: 'has-column-toggle'
					}
				}
			}
		}
	}).fn.extend({
		ddResponsiveTable: function(options) {
			options = $.extend(true, {}, $.ddResponsiveTable.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options, i);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD SHADE - A jQuery plugin for a blackout shade over content
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/shade.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_isActive = false,
		_isAnimating = false,
		_$shade,
		_options,
		_triggerClick,
		_setClass,
		_init;

	/**
	 * Add or remove a class to the shade
	 *
	 * @memberof $.ddShade
	 * @param  {Object} event jQuery click event
	 * @private
	 */
	_triggerClick = function(event) {
		event.preventDefault();
		$(window).trigger('clicked.ddShade');
	};

	/**
	 * Add or remove a class to the shade
	 *
	 * @memberof $.ddShade
	 * @param  {Boolean} state Boolean to determine if to add or remove the class required
	 * @param  {String} className The class to add/remove
	 * @return {Boolean} Returns that state of the selected option as a boolean
	 * @private
	 */
	_setClass = function(state, className) {
		state = (typeof (state) === 'boolean' && state === true);

		if (state) {
			_$shade.addClass(className);
		} else {
			_$shade.removeClass(className);
		}

		return state;
	};

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddShade
	 * @param {Object} container The container for the shade to be positioned in
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_init = function(container, options) {
		var $container = $(container);

		// don't run more than once
		if (typeof ($container.data('ddShade-isInit')) === 'boolean' && $container.data('ddShade-isInit') === true) {
			return;
		}

		// save the options globally to be reused in other functions
		_options = options;

		// create the shade DIV if it's not already created.
		if (document.getElementsByClassName(_options.classes.shade).length === 0) {
			$container.append($('<div/>', {
				class: _options.classes.shade,
				html: '&nbsp;'
			}));
		}

		_$shade = $(document.getElementsByClassName(_options.classes.shade));

		$container.data('ddShade-isInit', true);
	};

	$.extend({
		ddShade: {
			defaults: {
				classes: {
					shade: 'shade-bg',
					isActive: 'is-active',
					isBehindHeader: 'is-behind-header'
				}
			},

			/**
			 * Set the shade to go behind the fixed header rather than the default of in front
			 *
			 * @memberof $.ddShade
			 * @param  {Boolean} isBehindHeader Boolean to determine if to add or remove the class required
			 */
			setBehindHeader: function(setToBehind) {
				_setClass(setToBehind, _options.classes.isBehindHeader);
			},

			/**
			 * Set the shade to active (this is required before you set the opacity of it)
			 *
			 * @memberof $.ddShade
			 * @param  {Boolean} isActive Boolean to determine if to activate or deactivate
			 */
			setActive: function(setToState) {
				_setClass(setToState, _options.classes.isActive);
				_isActive = setToState;

				if (_isActive) {
					// .one will unbind the event immediately after it's triggered
					_$shade.one('click.ddShade', _triggerClick);
				}
			},

			/**
			 * Check if the shade is active
			 *
			 * @memberof $.ddShade
			 * @return {Boolean} True if the shade is currently active, False if inactive
			 */
			isActive: function() {
				return _isActive;
			},

			/**
			 * Check if the shade is animating
			 *
			 * @memberof $.ddShade
			 * @return {Boolean} True if the shade is currently animating, False if not
			 */
			isAnimating: function() {
				return _isAnimating;
			},

			/**
			 * Set the opacity of the shade, can be over a duration or immediately
			 *
			 * @memberof $.ddShade
			 * @param {Number} opacity Opacity to go to between 0 and 1. Is converted to a fixed 2 decimal places
			 * @param {Number} duration Duration in milliseconds over which the opacity should be set, use 0 for immediate
			 * @param {Boolean} [setToCurrent=false] Use true to set the opacity to it's current opacity prior to starting the animation. Used to avoid some display issues in IE
			 * @param {Function} [callback=null] Callback function to be called after complete
			 */
			opacity: function(opacity, duration, setToCurrent, callback) {
				var opacityTo = (typeof (opacity) === 'number') ? opacity.toFixed(2) : 1,
					opacityDuration = duration || 0,
					setCurrentOpacity = (setToCurrent === true) || false;

				if (setCurrentOpacity) {
					_$shade.css({
						opacity: _$shade.css('opacity')
					});
				}

				if (opacityDuration === 0) {
					_$shade.velocity('stop');
					_$shade.css({
						opacity: opacityTo
					});

					if (typeof (callback) === 'function') {
						callback();
					}
					return;
				}

				_isAnimating = true;

				_$shade.velocity('stop').velocity({
					opacity: opacityTo
				}, {
					duration: opacityDuration,
					complete: function() {
						_isAnimating = false;

						if (typeof (callback) === 'function') {
							callback();
						}
					}
				});
			}
		}
	}).fn.extend({
		ddShade: function(options) {
			options = $.extend(true, {}, $.ddShade.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD TABS - A jQuery plugin to display accessible tabs
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/tabs.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_formatIdString,
		_overrideWithDataAttribute,
		_updateOptionsFromDOM,
		_setNavListItemToActive,
		_init;

	/**
	 * Formats the ID string to remove the # from the start
	 *
	 * @memberof $.ddTabs
	 * @param {String} id The ID string usually obtained from a href attribute of a link
	 * @private
	 * */
	_formatIdString = function(id) {
		if (id && id.indexOf('#') > -1) {
			return id.substring(id.indexOf('#') + 1, id.length);
		}

		return id;
	};

	/**
	 * Returns the override value if the data attribute exists on the element,
	 * otherwise returns the fallback value provided.
	 *
	 * @memberof $.ddTabs
	 * @param {Object} $el The jQuery element to check for the data attribute on
	 * @param {Object} attrName The name of the data attribute to check for
	 * @param {Object} attrName The value to return if the attribute isn't set (i.e. the value being potentially overriden)
	 * @private
	 * */
	_overrideWithDataAttribute = function($el, attrName, fallbackValue) {
		var strippedAttrName,
			value;

		// strip 'data-' from beginning of attribute name if it's there
		strippedAttrName = attrName.replace(/^data-/, '');
		value = $el.data(strippedAttrName);

		// Use the original value if there is no data attribute
		if (typeof value === 'undefined') {
			return fallbackValue;
		}

		// return the override value
		return value;
	}

	/**
	 * Look at the container to see if there are any DOM attributes that
	 * can override base options
	 *
	 * @memberof $.ddTabs
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @private
	 * */
	_updateOptionsFromDOM = function($container, options) {
		var updatedOptions = $.extend(true, {}, options);

		updatedOptions.updateHash = _overrideWithDataAttribute($container, options.attrs.updateHash, options.updateHash);
		updatedOptions.scroll = _overrideWithDataAttribute($container, options.attrs.scroll, options.scroll);
		updatedOptions.navFullWidth = _overrideWithDataAttribute($container, options.attrs.navFullWidth, options.navFullWidth);
		updatedOptions.at = _overrideWithDataAttribute($container, options.attrs.at, options.at);

		return updatedOptions;
	};

	/**
	 * Set the active state of the navigation list item
	 *
	 * @memberof $.ddTabs
	 * @param {Object} $navListItem The jQuery element of the navigation list item
	 * @private
	 * */
	_setNavListItemToActive = function($navListItem, options) {
		$navListItem.addClass(options.classes.isActive);
	};

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddTabs
	 * @param {Object} $container The jQuery element to group
	 * @param {Object} options The options passed to the plugin
	 * @param {Number} i Index of the item on the page to help generate unique ids
	 * @private
	 * */
	_init = function(container, options, i) {
		var $container = $(container),
			tabsContainerIndex = i,
			$tabsContainer = $container.find('> .' + options.classes.tabs),
			_activeTab = null,
			_isDisabled = false,
			_isAnimating = false,
			$tabsList,
			$navigation,
			_tabLength,
			_activeIsSet,
			_firstActiveIndex,
			_aria,
			_hideActiveTab,
			_onTabChange,
			_onTabTrigger,
			_onAttach,
			_onDetach,
			_onDestroy,
			_initTabs;

		// don't run more than once
		if (typeof ($container.data('ddTabs-isInit')) === 'boolean' && $container.data('ddTabs-isInit') === true) {
			return;
		}

		// update the ec item options based on the DOM
		options = _updateOptionsFromDOM($container, options);

		// add container for the navigation items
		$container.prepend($('<div/>', {
			class: options.classes.navigation,
			html: $('<ul/>', {
				attr: {
					role: 'tablist'
				}
			})
		}));

		// store the navigation item
		$navigation = $container.find('> .' + options.classes.navigation + ' > ul');

		// get a list of tabs and groups
		$tabsList = $tabsContainer.find([
			'> .' + options.classes.tab,
			'> .' + options.classes.tabGroup,
			'> .' + options.classes.tabGroup + ' > .' + options.classes.tab
		].join(', '));

		// get the length of items
		_tabLength = $tabsList.length;

		if (options.navFullWidth) {
			$navigation.addClass(options.classes.hasItems.replace('#', _tabLength));
		}

		// check if a tab has already been set as active
		_activeIsSet = ($tabsContainer.find([
			'> .' + options.classes.tab + '.' + options.classes.isActive,
			'> .' + options.classes.tabGroup + ' > .' + options.classes.tab + '.' + options.classes.isActive
		].join(', ')).length > 0);

		// determine if we've got groups, if so the first active tab index is 1 not 0
		_firstActiveIndex = ($tabsList.eq(0).hasClass(options.classes.tabGroup)) ? 1 : 0;

		// aria actions
		_aria = {
			// add the aria attributes when needed
			add: function() {
				$navigation.find('li').each(function(i, el) {
					var $el = $(el),
						$tabButton = $el.find('button');

					$tabButton.attr({
						role: 'tab',
						'aria-controls': $tabButton.data('ddTabs-controls'),
						'aria-selected': $el.hasClass(options.classes.isActive)
					});
				});

				$tabsList.each(function(i, el) {
					var $tab = $(el);

					$tab.attr({
						role: 'tabpanel',
						'aria-labelledby': $tab.data('ddTabs-labelledby'),
						'aria-hidden': (!$tab.hasClass(options.classes.isActive)),
						tabindex: 0
					});
				});
			},
			// remove the aria attributes when not needed
			remove: function() {
				$tabsList.each(function(i, el) {
					var $tab = $(el);

					$tab.removeAttr('role')
						.removeAttr('aria-labelledby')
						.removeAttr('aria-hidden')
						.removeAttr('tabindex');
				});
			},
			// update the status of the tabs if it's not disabled
			update: function() {
				if (!_isDisabled) {
					$navigation.find('li').each(function(i, el) {
						var $el = $(el),
							$tabButton = $el.find('button');

						$tabButton.attr({
							'aria-selected': $el.hasClass(options.classes.isActive)
						});
					});

					$tabsList.each(function(i, el) {
						var $tab = $(el);

						$tab.attr({
							'aria-hidden': (!$tab.hasClass(options.classes.isActive))
						});
					});
				}
			}
		};

		// hide active tab (must be called before showing the new tab)
		_hideActiveTab = function(id, init, callback) {
			if (!_activeTab) {
				callback();
			} else {
				if (id !== _activeTab.id) {
					var afterHide = function() {
						$(_activeTab.$tab)
							.addClass(options.classes.isHidden)
							.removeClass(options.classes.isActive);

						callback();
					};

					$(_activeTab.$navListItem).removeClass(options.classes.isActive).find('a > .vh').remove();

					if (init) {
						afterHide();
					} else {
						if (_isDisabled) {
							afterHide();
							return;
						}

						$(_activeTab.$tab).velocity('stop').velocity({
							opacity: 0
						}, {
							duration: options.durations.hide,
							complete: afterHide
						});
					}
				} else {
					_isAnimating = false;
				}
			}
		};

		_onTabChange = function(event, id, init) {
			var tabFound = false,
				$nextActiveTab,
				$tabButton,
				$navListItem,
				afterShow,
				showTab;

			if (_isAnimating) {
				return;
			}

			// validate inputted variables
			id = _formatIdString(id);
			init = (typeof (init) === 'boolean') ? init : false;

			// check if the tab can be found
			$tabsList.each(function(i, el) {
				if (id === $(el).attr('id')) {
					$nextActiveTab = $(el);
					tabFound = true;
				}
			});

			// if the tab doesn't exist, no change can happen
			if (!tabFound) {
				return false;
			}

			// check if the link to the tab can be found
			$tabButton = $navigation.find('button[aria-controls="' + id + '"]');

			if ($tabButton.length === 0) {
				return false;
			}

			$navListItem = $tabButton.closest('li');

			// everything is found and works as expected
			_isAnimating = true;

			// function to call after show has completed
			afterShow = function() {
				$nextActiveTab.css({
					opacity: ''
				});

				_isAnimating = false;

				_activeTab = {
					id: id,
					$tab: $nextActiveTab,
					$navListItem: $navListItem
				};

				$nextActiveTab.addClass(options.classes.isActive);

				_aria.update();

				// trigger events so people can listen
				$container.trigger('tabChanged.ddTabs', [id, $nextActiveTab, $tabsList]);

				// set path
				if (options.updateHash) {
					window.location.hash = '#' + options.tabIdPrefix + id;
				}
			};

			showTab = function() {
				if (_isDisabled) {
					$nextActiveTab.css({ opacity: 1 }).removeClass(options.classes.isHidden);
					afterShow();

					return;
				}

				$nextActiveTab.removeClass(options.classes.isHidden).velocity('stop').velocity({
					opacity: 1
				}, {
					duration: options.durations.show,
					complete: afterShow
				});
			};

			_setNavListItemToActive($navListItem, options);

			if (init) {
				_hideActiveTab(id, init, function() {
					$nextActiveTab.css({ opacity: 1 }).removeClass(options.classes.isHidden);
					afterShow();
				});
			} else {
				_hideActiveTab(id, init, showTab);
			}

			if (options.scroll) {
				options.animations.scrollPage($container, options);
			}
		};

		_onTabTrigger = function(event) {
			event.preventDefault();

			var $triggerLink = $(this),
				id = _formatIdString($triggerLink.data('ddTabs-controls')),
				$tabButton = $('.' + options.classes.navigation).find('button[aria-controls="' + id + '"]');

			if ($tabButton.length > 0) {
				$tabButton.trigger('click.ddTabs');
			}
		};

		_onAttach = function() {
			_isDisabled = false;
			_aria.add();

			$tabsList.filter('.' + options.classes.isHidden).css({ opacity: 0 });
			$container.removeClass(options.classes.isDisabled);
		};

		_onDetach = function() {
			_isDisabled = true;
			_aria.remove();

			$tabsList.filter('.' + options.classes.isHidden).css({ opacity: '' });
			$container.addClass(options.classes.isDisabled);
		};

		_onDestroy = function() {
			_onDetach();
			$container.removeClass(options.classes.isDisabled);

			_aria.remove();
			$navigation.closest('.' + options.classes.navigation).remove();

			$tabsList.removeClass(options.classes.isHidden);

			$container.data('ddTabs-isInit', false);

			$container.off('.ddTabs');
			$(window).off('.ddTabs');
			$(document).off('.ddTabs');
		};

		_initTabs = function() {
			var initTabActions;

			initTabActions = function() {
				$navigation.find('li').each(function(i, el) {
					var $navListItem = $(el),
						$tabButton = $navListItem.find('button'),
						id,
						_onClick;

					if ($tabButton.length === 0) {
						// this occurs when a button isn't in the navigation list item because it's a tab group
						return;
					}

					id = $tabButton.data('ddTabs-controls');

					_onClick = function(event) {
						event.preventDefault();
						$container.trigger('tabChange.ddTabs', [id]);
					};

					$tabButton.on('click.ddTabs', _onClick);

					// setup initial show variables -
					if ((_activeIsSet && $(document.getElementById(id)).hasClass(options.classes.isActive)) || (!_activeIsSet && i === _firstActiveIndex)) {
						_activeTab = {
							id: id,
							$tab: $(document.getElementById(id)),
							$navListItem: $navListItem
						};

						_setNavListItemToActive($navListItem, options);
					}
				});

				// after the above so that we can set the active states by default
				_aria.add();

				if (options.updateHash) {
					var onHashChange = function(init) {
						init = (typeof (init) === 'boolean') ? init : false;

						var currentHash = window.location.hash;

						if (!currentHash || currentHash.indexOf(options.tabIdPrefix) < 0) {
							return;
						}

						currentHash = currentHash.replace(options.tabIdPrefix, '');

						$container.trigger('tabChange.ddTabs', [currentHash, init]);
					};

					$(window).on('hashchange.ddTabs', onHashChange);

					onHashChange(true);
				}
			};

			$tabsList.each(function(i, el) {
				var $tab = $(el),
					id = $tab.attr('id') || options.tabIdPrefix + tabsContainerIndex + '-tab-' + i,
					tabButton = options.tabButtonIdPrefix + id,
					title = $tab.attr(options.attrs.tabTitle) || $tab.find('> *').eq(0).text(),
					_activeTab = ((_activeIsSet && $tab.hasClass(options.classes.isActive)) || (!_activeIsSet && i === _firstActiveIndex));

				if ($tab.hasClass(options.classes.tabGroup)) {
					$navigation.append($('<li/>', {
						class: options.classes.tabGroup,
						html: title
					}));
				} else {
					$navigation.append($('<li/>', {
						attr: {
							role: 'presentation'
						},
						html: $('<button/>', {
							id: tabButton,
							html: $('<span/>', {
								class: options.classes.tabLabel,
								html: title
							})
						})
					}));

					$(document.getElementById(tabButton)).data('ddTabs-controls', $tab.attr('id'));
					$tab.data('ddTabs-labelledby', tabButton);

					if (_activeTab) {
						$tab.addClass(options.classes.isActive);
					} else {
						$tab.addClass(options.classes.isHidden).css({ opacity: 0 });
					}
				}

				if (i === _tabLength - 1) {
					initTabActions();
				}
			});
		};

		_initTabs();

		// unbind events to prevent multiple binds, then bind events
		$container.off('.ddTabs')
			.on('tabChange.ddTabs', _onTabChange)
			.on('destroy.ddTabs', _onDestroy);

		if (typeof (options.at) === 'string') {
			DD.bpAttach.at(options.at, _onAttach, _onDetach);
		}

		$(document).on('click.ddTabs', options.classes.tabsTrigger, _onTabTrigger);

		$container.data('ddTabs-isInit', true);
	};

	$.extend({
		ddTabs: {
			defaults: {
				updateHash: true,
				scroll: true,
				scrollOffset: -50,
				at: false,
				navFullWidth: false,
				tabIdPrefix: 'tab-',
				tabButtonIdPrefix: 'tabbutton-',
				attrs: {
					updateHash: 'data-tabs-update-hash',
					scroll: 'data-tabs-scroll',
					at: 'data-tabs-at',
					navFullWidth: 'data-tabs-nav-fullwidth',
					tabTitle: 'data-tab-title'
				},
				durations: {
					show: 200,
					hide: 200,
					scroll: 200
				},
				classes: {
					tabsTrigger: 'js-tabs-trigger',
					tabs: 'tabs',
					tab: 'tab',
					navigation: 'tabs-nav',
					hasItems: 'has-#-items',
					tabGroup: 'tab-group',
					tabLabel: 'tab-label',
					isActive: 'is-active',
					isDisabled: 'is-disabled',
					isHidden: 'is-hidden'
				},
				animations: {
					scrollPage: function($container, options, callback) {
						var pageTop = $(document).scrollTop(),
							pageBottom = pageTop + $(window).height(),
							offset;

						offset = $container.offset().top + options.scrollOffset;

						if (options.scroll === false || offset > pageTop && offset < pageBottom) {
							if (typeof (callback) === 'function') {
								callback();
							}

							// is currently in the page so don't scroll
							return;
						}

						// scroll the page
						$('html').velocity('stop').velocity('scroll', {
							offset: offset,
							duration: options.durations.scroll,
							complete: callback
						});
					}
				}
			}
		}
	}).fn.extend({
		ddTabs: function(options) {
			options = $.extend(true, {}, $.ddTabs.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options, i);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DD TOOLTIP - A jQuery plugin for accessible tooltips
   ========================================================================== */

/* http://fed.donlineclients.com/demo/modules/plugins/tooltip.html */

;(function($, window, document, undefined) {

	'use strict';

	var	_init;

	/**
	 * The initaliser for the module
	 *
	 * @memberof $.ddTooltip
	 * @param {Object} button The original button to be enhanced
	 * @param {Object} options The options passed to the plugin
	 * @param {Number} i Index of the item on the page to help generate unique ids
	 * @private
	 * */
	_init = function(button, options, i) {
		var $button = $(button),
			content = $button.attr(options.attrs.text) || '',
			htmlContent = $button.attr(options.attrs.html) || '',
			id = options.tooltipIdPrefix + i,
			_isClicked = false,
			_isDisplayed = false,
			$container,
			$tooltip,
			_setWidth,
			_setPosition,
			_showTooltip,
			_hideTooltip,
			_hideOnClickOutside,
			_repositionOnResize,
			_onClick,
			_onOver,
			_onOut;

		// don't run more than once
		if (typeof ($button.data('ddTooltip-isInit')) === 'boolean' && $button.data('ddTooltip-isInit') === true) {
			return;
		}

		// keep the existing button
		$button.attr({
			role: 'button',
			type: 'button',
			'aria-controls': id
		}).removeAttr(options.attrs.text).removeAttr(options.attrs.html);

		// Disable if the content is supplied
		if ((!options.allowHTMLContent && content === '') || (options.allowHTMLContent && content === '' && htmlContent === '')) {
			console.warn('$.ddTooltip: No content supplied for tooltip. Ensure that tooltip content is supplied in the ' + options.attrs.text + ' attribute');
			return;
		}

		// generate a wrapper around the tooltip
		$container = $('<span/>', {
			class: options.classes.container
		});

		$button.wrap($container);

		// redefine the container in its new position
		$container = $button.closest('.' + options.classes.container);

		var $contentForTooltip;

		if (htmlContent !== '' && options.allowHTMLContent) {
			$contentForTooltip = htmlContent;
		} else {
			$contentForTooltip = $('<p/>', {
				html: content
			});
		}

		// create the tooltip content
		$tooltip = $('<div/>', {
			id: id,
			class: options.classes.tooltip,
			role: 'tooltip',
			attr: {
				'aria-hidden': true
			},
			html: $('<div/>', {
				class: options.classes.content,
				html: $contentForTooltip
			})
		});

		// insert the tooltip after the button (which is now inside the container)
		$button.after($tooltip);

		// set the width of the tooltip - used to ensure that weird widths aren't experienced
		_setWidth = function() {
			var tooltipWidth;

			$tooltip.css({
				position: 'static',
				display: 'inline-block',
				width: ''
			}).addClass(options.classes.isActive);

			tooltipWidth = $tooltip.width();

			tooltipWidth = (tooltipWidth < options.minWidth) ? options.minWidth : tooltipWidth;
			tooltipWidth = parseInt(tooltipWidth / 2, 10) * 2; //resolve rounding issues

			$tooltip.removeClass(options.classes.isActive).css({
				position: '',
				display: ''
			}).width(tooltipWidth);
		};

		// set the position of the tooltip
		_setPosition = function() {
			var $tooltipContent = $tooltip.find('.' + options.classes.content),
				buttonWidth,
				buttonHeight,
				tooltipWidth,
				tooltipHeight,
				tooltipBaseLeft,
				tooltipBaseTop,
				viewportTop,
				viewportBottom,
				viewportLeft,
				viewportRight,
				tooltipTop,
				tooltipBottom,
				tooltipLeft,
				tooltipRight,
				maxOffset;

			// temporarily show the tooltip to get accurate positions and calcs
			if (!_isDisplayed) {
				$tooltip.addClass(options.classes.isActive);
			}

			// reset the content position
			$tooltipContent.css({
				left: '',
				right: ''
			});

			// get the base widths of the tooltip and tooltip button
			buttonWidth = $button.width();
			buttonHeight = $button.height();
			tooltipWidth = $tooltip.width();
			tooltipHeight = $tooltip.height();

			// position the tooltip center top of the button
			tooltipBaseLeft = parseInt(-(tooltipWidth / 2) + options.offsets.left + (buttonWidth / 2), 10);
			tooltipBaseTop = parseInt(-tooltipHeight + options.offsets.top, 10);

			// set the tooltip to the default position
			$tooltip.css({
				left: tooltipBaseLeft,
				top: tooltipBaseTop
			});

			// get viewport sizes and pos
			viewportTop = $(window).scrollTop();
			viewportBottom = viewportTop + $(window).height();
			viewportLeft = $(window).scrollLeft();
			viewportRight = viewportLeft + $(window).width();

			// get the current tooltip sizes and pos
			tooltipTop = $tooltip.offset().top;
			tooltipBottom = tooltipTop + $tooltip.height();
			tooltipLeft = $tooltip.offset().left;
			tooltipRight = tooltipLeft + $tooltip.width();

			// top/bottom alignment check
			if (tooltipTop >= viewportTop && tooltipBottom <= viewportBottom) {
				// by default the tooltip is positioned to the top - so remove the bottom class
				$tooltip.removeClass(options.classes.isBelow);
			} else {
				$tooltip.addClass(options.classes.isBelow).css({
					top: buttonHeight + (options.offsets.top * -1)
				});
			}

			// check if the tooltip is going to be cut off sideways
			maxOffset = parseInt((tooltipWidth / 2) - (options.offsets.sides * 2), 10);

			if (tooltipLeft >= viewportLeft && tooltipRight <= viewportRight) {
				// tooltip is centered as expected
				$tooltipContent.css({
					left: '',
					right: ''
				});
			} else if (tooltipLeft <= viewportLeft) {
				// tooltip is too far left
				var offsetLeft = parseInt((tooltipLeft + viewportLeft) * -1 + options.offsets.sides, 10);
				offsetLeft = (offsetLeft > maxOffset) ? maxOffset : offsetLeft;

				$tooltipContent.css({
					left: offsetLeft
				});
			} else if (tooltipRight >= viewportRight) {
				// tooltip is too far right
				var offsetRight = parseInt((tooltipRight - viewportRight) + options.offsets.sides, 10);
				offsetRight = (offsetRight > maxOffset) ? maxOffset : offsetRight;

				$tooltipContent.css({
					right: offsetRight
				});
			}

			// remove the active class if it shouldn't be visible
			if (!_isDisplayed) {
				$tooltip.removeClass(options.classes.isActive);
			}
		};

		// show the tooltip
		_showTooltip = function() {
			var afterShow = function() {};

			_setWidth();
			_setPosition();

			$tooltip.attr('aria-hidden', false);

			_isDisplayed = true;

			if (options.durations.show === 0) {
				$tooltip.addClass(options.classes.isActive);
				afterShow();
			} else {
				options.animations.show($tooltip, options, afterShow);
			}
		};

		// hide the tooltip
		_hideTooltip = function() {
			var afterHide = function() {
				if (_isClicked) {
					$(window).off('resize.ddTooltip', $.throttle(200, _repositionOnResize));
					$(document).off('click.ddTooltip', _hideOnClickOutside);

					_isClicked = false;
				}
			};

			$container.removeClass(options.classes.isActive);
			$tooltip.attr('aria-hidden', true);

			_isDisplayed = false;

			if (options.durations.hide === 0) {
				$tooltip.removeClass(options.classes.isActive);
				afterHide();
			} else {
				options.animations.hide($tooltip, options, afterHide);
			}
		};

		// hide the tooltip when clicked outside of it
		_hideOnClickOutside = function(event) {
			if ($(event.target).closest(document.getElementById(id)).length === 0) {
				_hideTooltip();
			}
		};

		// reposition the tooltip when open
		_repositionOnResize = function() {
			if (_isClicked && _isDisplayed) {
				_setPosition();
			}
		};

		// variation for on click so that it doesn't get hidden on blur
		_onClick = function(event) {
			event.preventDefault();

			if (_isClicked === false) {
				_isClicked = true;

				$container.addClass(options.classes.isActive);

				if (!_isDisplayed) {
					$container.trigger('show.ddTooltip');
				}

				$(window).on('resize.ddTooltip', $.throttle(200, _repositionOnResize));

				setTimeout(function() {
					$(document).on('click.ddTooltip', _hideOnClickOutside);
				}, 10);
			} else {
				$container.trigger('hide.ddTooltip');
			}
		};

		_onOver = function() {
			if (!_isClicked && !_isDisplayed) {
				_showTooltip();
			}
		};

		_onOut = function() {
			if (!_isClicked && _isDisplayed) {
				_hideTooltip();
			}
		};

		// make sure there is no double up of events
		$button.off('.ddTooltip');

		// for hover and focus events
		if (options.showOnHover || options.showOnFocus) {
			var overEvents = [],
				outEvents = [];

			if (options.showOnHover) {
				overEvents.push('mouseover.ddTooltip');
				outEvents.push('mouseout.ddTooltip');
			}

			if (options.showOnFocus) {
				overEvents.push('focus.ddTooltip');
				outEvents.push('blur.ddTooltip');
			}

			$button.on(overEvents.join(' '), _onOver)
				.on(outEvents.join(' '), _onOut);
		}

		// for click events
		if (options.showOnClick) {
			$button.on('click.ddTooltip', _onClick);
		}

		// for default container events which can be triggered externally
		$container.off('.ddTooltip')
			.on('show.ddTooltip', _showTooltip)
			.on('hide.ddTooltip', _hideTooltip);

		$button.data('ddTooltip-isInit', true);
	};

	$.extend({
		ddTooltip: {
			defaults: {
				minWidth: 176,
				tooltipIdPrefix: 'tooltip-',
				showOnHover: true,
				showOnFocus: true,
				showOnClick: true,
				allowHTMLContent: true,
				offsets: {
					left: 0,
					top: -10,
					sides: 10
				},
				attrs: {
					text: 'title',
					html: 'data-tooltip-html'
				},
				durations: {
					show: 200,
					hide: 200
				},
				classes: {
					container: 'tooltip-container',
					tooltip: 'tooltip',
					content: 'tooltip-content',
					visuallyhidden: 'vh',
					isActive: 'is-active',
					isBelow: 'is-below'
				},
				animations: {
					show: function($tooltip, options, callback) {
						$tooltip.velocity('stop').velocity({
							opacity: 0,
							translateY: ($tooltip.hasClass(options.classes.isBelow)) ? '-5px' : '5px'
						}, {
							duration: 0
						}).addClass(options.classes.isActive).velocity({
							opacity: 1,
							translateY: 0
						}, {
							duration: options.durations.show,
							complete: callback
						});
					},
					hide: function($tooltip, options, callback) {
						$tooltip.velocity('stop').velocity({
							opacity: 0,
							translateY: ($tooltip.hasClass(options.classes.isBelow)) ? '-5px' : '5px'
						}, {
							duration: options.durations.hide,
							complete: function() {
								$tooltip.removeClass(options.classes.isActive);
								callback();
							}
						});
					}
				}
			}
		}
	}).fn.extend({
		ddTooltip: function(options) {
			options = $.extend(true, {}, $.ddTooltip.defaults, options);

			return $(this).each(function(i, el) {
				_init(el, options, i);
			});
		}
	});
})(jQuery, window, document);
/* =============================================================================
   DO WHEN - A jQuery plugin to do stuff when you want
   https://github.com/dkeeghan/jQuery-doWhen
   ========================================================================== */


;(function($, window, document, undefined) {

	'use strict';

	var _options,
		_fields = [],
		_getActionByName,
		_getValidActions,
		_parseAndSaveData,
		_doesFieldMatch,
		_onStateMatched,
		_onStateUnmatched,
		_checkDoState,
		_checkFieldDoState,
		_actionEnableDisable;

	_getValidActions = function() {
		var validActions = [];

		for (var action in $.doWhen.actions) {
			if ($.doWhen.actions.hasOwnProperty(action)) {
				validActions.push(action);
			}
		}

		return validActions.join(', ');
	};

	_getActionByName = function(action) {
		var config = {},
			matchedConfig = false;

		if (action === null) {
			throw new SyntaxError('$.doWhen: Action must be specified. Valid options are: [' + _getValidActions() + ']');
		}

		for (var possibleAction in $.doWhen.actions) {
			if ($.doWhen.actions.hasOwnProperty(possibleAction) && possibleAction === action) {
				matchedConfig = $.doWhen.actions[possibleAction];
			}
		}

		if (matchedConfig === false) {
			throw new SyntaxError('$.doWhen: Invalid action "' + action + '". Valid options are: [' + _getValidActions() + ']');
		}

		// fill out any unfilled options with the defaults
		$.extend(config, $.doWhen.actions.blank, matchedConfig);

		return config;
	};

	_parseAndSaveData = function(el) {
		var $el = $(el),
			when = $el.attr('data-' + _options.doWhenAttr),
			action = $el.data(_options.doActionAttr),
			actions = _getActionByName(action),
			parsed = [],
			jsonObject = false,
			convertToJSON;

		convertToJSON = function(str) {
			var json = false;

			try {
				json = $.parseJSON(str);
			} catch (e) {
				throw new Error('$.doWhen: Invalid JSON \'do-when\' command. Ensure that single quotes are used for the attribute, and double quotes are used inside the JSON string.');
			}

			return json;
		};

		if (when.indexOf('||')) {
			var arrWhen = when.split('||');

			for (var i = 0, len = arrWhen.length; i < len; i += 1) {
				jsonObject = convertToJSON(arrWhen[i]);

				if (jsonObject !== false) {
					parsed.push(jsonObject);
				}
			}
		} else {
			jsonObject = convertToJSON(when);

			if (jsonObject !== false) {
				parsed.push(jsonObject);
			}
		}

		for (var j = 0, parsedLen = parsed.length; j < parsedLen; j += 1) {
			var parsedItem = parsed[j];

			for (var key in parsedItem) {
				if (parsedItem.hasOwnProperty(key)) {
					// if the data is an empty array it means we can ignore it
					if (parsedItem[key].length === 0) {
						delete parsedItem[key];
					} else {
						// store all the form fields that impact conditional functionality
						if (!_fields.hasOwnProperty(key)) {
							_fields[key] = [];
						}

						// store all the elements related to the specific form field
						_fields[key].push(el);
					}
				}
			}
		}

		$el.data(_options.doActionAttr + '-parsed', actions);
		$el.data(_options.doWhenAttr + '-parsed', parsed);
	};

	_doesFieldMatch = function(idOrName, value) {
		var $field = $('[id="' + idOrName + '"]'),
			isMatched = false,
			fieldValue = [],
			nodeName = ($field.length > 0) ? $field.get(0).nodeName.toUpperCase() : '';

		// find the field based on the id or name and get the value(s)
		if ($field.length === 0 || (nodeName === 'INPUT' && ($field.attr('type') === 'checkbox' || $field.attr('type') === 'radio'))) {
			$field = ($field.length > 0) ? $field : $('[name="' + idOrName + '"]');

			if ($field.length === 0) {
				throw new Error('$.doWhen: The field "' + idOrName + '" doesn\'t exist.');
			}

			$field.each(function(i, el) {
				if ($(el).prop('checked')) {
					fieldValue.push($(el).val());
				}
			});
		} else {
			fieldValue.push($field.val());
		}

		if (typeof (value) === 'boolean') {
			for (var fvI = 0, fvLen = fieldValue.length; fvI < fvLen; fvI += 1) {
				if (fieldValue[fvI] === '') {
					fieldValue.splice(fvI, 1);
				}
			}

			if ((value === true && fieldValue.length > 0) || (value === false && fieldValue.length === 0)) {
				isMatched = true;
			}
		} else {
			for (var i = 0, len = value.length; i < len; i += 1) {
				for (var fvI2 = 0, fvLen2 = fieldValue.length; fvI2 < fvLen2; fvI2 += 1) {
					if (value[i] === fieldValue[fvI2]) {
						isMatched = true;
					}
				}
			}
		}

		return isMatched;
	};

	_onStateMatched = function($el) {
		var action = $el.data(_options.doActionAttr).toLowerCase(),
			actions = $el.data(_options.doActionAttr + '-parsed');

		actions.match($el, function() {
			$el.trigger('updated.doWhen').trigger('matched.' + action + '.doWhen');
		});
	};

	_onStateUnmatched = function($el) {
		var action = $el.data(_options.doActionAttr).toLowerCase(),
			actions = $el.data(_options.doActionAttr + '-parsed');

		actions.unmatch($el, function() {
			$el.trigger('updated.doWhen').trigger('unmatched.' + action + '.doWhen');
		});
	};

	_checkDoState = function($filteredItems) {
		var $items;

		if ($filteredItems) {
			$items = $filteredItems;
		} else {
			$items = $('[data-' + _options.doWhenAttr + ']');
		}

		$items.each(function(i, el) {
			var $el = $(el),
				conditions = $el.data(_options.doWhenAttr + '-parsed'),
				toDo = false;

			for (var j = 0, len = conditions.length; j < len; j += 1) {
				var condition = conditions[j],
					conditionMet = true;

				for (var key in condition) {

					if (condition.hasOwnProperty(key) && conditionMet) {
						conditionMet = _doesFieldMatch(key, condition[key]);
					}
				}

				if (conditionMet) {
					toDo = true;
				}
			}

			if (toDo) {
				_onStateMatched($el);
			} else {
				_onStateUnmatched($el);
			}
		});
	};

	_checkFieldDoState = function() {
		var $field = $(this),
			idOrName = $field.attr('id'),
			nodeName = this.nodeName.toUpperCase();

		if (nodeName === 'INPUT' && ($field.attr('type') === 'radio' || $field.attr('type') === 'checkbox')) {
			idOrName = $field.attr('name');
		}

		if (_fields.hasOwnProperty(idOrName)) {
			// only check the items which will change
			var $filteredItems = $(_fields[idOrName]);
			_checkDoState($filteredItems);
			return;
		}

		// can't detect which items are impacted so check all
		_checkDoState();
	};

	_actionEnableDisable = function(enable, $el, callback) {
		$el.prop('disabled', !enable);

		if ($el.get(0).tagName.toLowerCase() === 'option') {
			var $select = $el.parent(),
				$enabledOptions = $select.find('option:not(:disabled)');

			if (enable) {
				if ($enabledOptions.length > 1) {
					$select.prop('disabled', false);
				}
			} else {
				if ($el.prop('selected')) {
					$enabledOptions.eq(0).prop('selected', true);
				}

				if ($enabledOptions.length <= 1) {
					$select.prop('disabled', true);
				}
			}
		}

		callback();
	};

	$.extend({
		doWhen: {
			defaults: {
				doWhenAttr: 'do-when',
				doActionAttr: 'do-action'
			},

			actions: {
				blank: {
					match: function($el, callback) {
						callback();
					},
					unmatch: function($el, callback) {
						callback();
					}
				},
				show: {
					match: function($el, callback) {
						$el.show();
						callback();
					},
					unmatch: function($el, callback) {
						$el.hide();
						callback();
					}
				},
				hide: {
					match: function($el, callback) {
						$el.hide();
						callback();
					},
					unmatch: function($el, callback) {
						$el.show();
						callback();
					}
				},
				click: {
					match: function($el, callback) {
						$el.get(0).click();
						callback();
					},
					unmatch: function($el, callback) {
						callback();
					}
				},
				enable: {
					match: function($el, callback) {
						_actionEnableDisable(true, $el, callback);
					},
					unmatch: function($el, callback) {
						_actionEnableDisable(false, $el, callback);
					}
				},
				disable: {
					match: function($el, callback) {
						_actionEnableDisable(false, $el, callback);
					},
					unmatch: function($el, callback) {
						_actionEnableDisable(true, $el, callback);
					}
				}
			},

			addAction: function(name, match, unmatch) {
				$.doWhen.actions[name] = {
					match: match,
					unmatch: unmatch
				};
			}
		}
	}).fn.extend({
		doWhen: function(options) {
			_options = $.extend(true, {}, $.doWhen.defaults, options);

			_fields = [];

			$(this).find('[data-' + _options.doWhenAttr + ']').each(function(i, el) {
				// format and save the data
				_parseAndSaveData(el);
			});

			for (var key in _fields) {
				if (_fields.hasOwnProperty(key)) {
					var $field = $('[id="' + key + '"]'),
						nodeName;

					if ($field.length === 0) {
						$field = $('[name="' + key + '"]');
					}

					nodeName = $field.get(0).nodeName.toUpperCase();

					if ((nodeName === 'SELECT' || nodeName === 'INPUT') === false) {
						$field = $('[name="' + key + '"]');
					}

					$field.off('change.doWhen', _checkFieldDoState)
						.on('change.doWhen', _checkFieldDoState);
				}
			}

			// check all fields
			_checkDoState();

			return this;
		}
	});

})(jQuery, window, document);
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
*
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/

(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);
/*! http://mths.be/placeholder v2.0.7 by @mathias */

;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input');
	var isTextareaSupported = 'placeholder' in document.createElement('textarea');
	var prototype = $.fn;
	var valHooks = $.valHooks;
	var propHooks = $.propHooks;
	var hooks;
	var placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.is-placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value;
				}

				return $element.data('placeholder-enabled') && $element.hasClass('is-placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);

				var $passwordInput = $element.data('placeholder-password');
				if ($passwordInput) {
					return $passwordInput[0].value = value;
				}

				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != safeActiveElement()) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('is-placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		if (!isInputSupported) {
			valHooks.input = hooks;
			propHooks.value = hooks;
		}
		if (!isTextareaSupported) {
			valHooks.textarea = hooks;
			propHooks.value = hooks;
		}

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.is-placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.is-placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {};
		var rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this;
		var $input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('is-placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('is-placeholder');
				input == safeActiveElement() && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement;
		var input = this;
		var $input = $(input);
		var id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': $input,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('is-placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('is-placeholder');
		}
	}

	function safeActiveElement() {
		// Avoid IE9 `document.activeElement` of death
		// https://github.com/mathiasbynens/jquery-placeholder/pull/99
		try {
			return document.activeElement;
		} catch (err) {}
	}

}(this, document, jQuery));
$.fn.serializeObject = function() {

	var form = this,
		o = {},
		a;

	// Remove non-numeric characters from numeric fields
	$(form).find('input[pattern="[0-9]*"]').each(function() {
		var $field = $(this);
		$field.val($field.val().replace(/\D/g, ''));
	});

	a = form.serializeArray();

	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});

	return o;
};
!(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}
})(this, function($) {

	'use strict';

	/**
	 * Name of the plugin
	 * @private
	 * @const
	 * @type {String}
	 */
	var PLUGIN_NAME = 'vide';

	/**
	 * Default settings
	 * @private
	 * @const
	 * @type {Object}
	 */
	var DEFAULTS = {
		volume: 1,
		playbackRate: 1,
		muted: true,
		loop: true,
		autoplay: true,
		position: '50% 50%',
		posterType: 'detect',
		resizing: true
	};

	/**
	 * Not implemented error message
	 * @private
	 * @const
	 * @type {String}
	 */
	var NOT_IMPLEMENTED_MSG = 'Not implemented';

	/**
	 * Parse a string with options
	 * @private
	 * @param {String} str
	 * @returns {Object|String}
	 */
	function parseOptions(str) {
		var obj = {};
		var delimiterIndex;
		var option;
		var prop;
		var val;
		var arr;
		var len;
		var i;

		// Remove spaces around delimiters and split
		arr = str.replace(/\s*:\s*/g, ':').replace(/\s*,\s*/g, ',').split(',');

		// Parse a string
		for (i = 0, len = arr.length; i < len; i++) {
			option = arr[i];

			// Ignore urls and a string without colon delimiters
			if (
				option.search(/^(http|https|ftp):\/\//) !== -1 ||
				option.search(':') === -1
			) {
				break;
			}

			delimiterIndex = option.indexOf(':');
			prop = option.substring(0, delimiterIndex);
			val = option.substring(delimiterIndex + 1);

			// If val is an empty string, make it undefined
			if (!val) {
				val = undefined;
			}

			// Convert a string value if it is like a boolean
			if (typeof val === 'string') {
				val = val === 'true' || (val === 'false' ? false : val);
			}

			// Convert a string value if it is like a number
			if (typeof val === 'string') {
				val = !isNaN(val) ? +val : val;
			}

			obj[prop] = val;
		}

		// If nothing is parsed
		if (prop == null && val == null) {
			return str;
		}

		return obj;
	}

	/**
	 * Parse a position option
	 * @private
	 * @param {String} str
	 * @returns {Object}
	 */
	function parsePosition(str) {
		str = '' + str;

		// Default value is a center
		var args = str.split(/\s+/);
		var x = '50%';
		var y = '50%';
		var len;
		var arg;
		var i;

		for (i = 0, len = args.length; i < len; i++) {
			arg = args[i];

			// Convert values
			if (arg === 'left') {
				x = '0%';
			} else if (arg === 'right') {
				x = '100%';
			} else if (arg === 'top') {
				y = '0%';
			} else if (arg === 'bottom') {
				y = '100%';
			} else if (arg === 'center') {
				if (i === 0) {
					x = '50%';
				} else {
					y = '50%';
				}
			} else {
				if (i === 0) {
					x = arg;
				} else {
					y = arg;
				}
			}
		}

		return { x: x, y: y };
	}

	/**
	 * Search a poster
	 * @private
	 * @param {String} path
	 * @param {Function} callback
	 */
	function findPoster(path, callback) {
		var onLoad = function() {
			callback(this.src);
		};

		$('<img src="' + path + '.gif">').load(onLoad);
		$('<img src="' + path + '.jpg">').load(onLoad);
		$('<img src="' + path + '.jpeg">').load(onLoad);
		$('<img src="' + path + '.png">').load(onLoad);
	}

	/**
	 * Vide constructor
	 * @param {HTMLElement} element
	 * @param {Object|String} path
	 * @param {Object|String} options
	 * @constructor
	 */
	function Vide(element, path, options) {
		this.$element = $(element);

		// Parse path
		if (typeof path === 'string') {
			path = parseOptions(path);
		}

		// Parse options
		if (!options) {
			options = {};
		} else if (typeof options === 'string') {
			options = parseOptions(options);
		}

		// Remove an extension
		if (typeof path === 'string') {
			path = path.replace(/\.\w*$/, '');
		} else if (typeof path === 'object') {
			for (var i in path) {
				if (path.hasOwnProperty(i)) {
					path[i] = path[i].replace(/\.\w*$/, '');
				}
			}
		}

		this.settings = $.extend({}, DEFAULTS, options);
		this.path = path;

		// https://github.com/VodkaBears/Vide/issues/110
		try {
			this.init();
		} catch (e) {
			if (e.message !== NOT_IMPLEMENTED_MSG) {
				throw e;
			}
		}
	}

	/**
	 * Initialization
	 * @public
	 */
	Vide.prototype.init = function() {
		var vide = this;
		var path = vide.path;
		var poster = path;
		var sources = '';
		var $element = vide.$element;
		var settings = vide.settings;
		var position = parsePosition(settings.position);
		var posterType = settings.posterType;
		var $video;
		var $wrapper;

		// Set styles of a video wrapper
		$wrapper = vide.$wrapper = $('<div>').css({
			position: 'absolute',
			'z-index': -1,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0,
			overflow: 'hidden',
			'-webkit-background-size': 'cover',
			'-moz-background-size': 'cover',
			'-o-background-size': 'cover',
			'background-size': 'cover',
			'background-repeat': 'no-repeat',
			'background-position': position.x + ' ' + position.y
		});

		// Get a poster path
		if (typeof path === 'object') {
			if (path.poster) {
				poster = path.poster;
			} else {
				if (path.mp4) {
					poster = path.mp4;
				} else if (path.webm) {
					poster = path.webm;
				} else if (path.ogv) {
					poster = path.ogv;
				}
			}
		}

		// Set a video poster
		if (posterType === 'detect') {
			findPoster(poster, function(url) {
				$wrapper.css('background-image', 'url(' + url + ')');
			});
		} else if (posterType !== 'none') {
			$wrapper.css('background-image', 'url(' + poster + '.' + posterType + ')');
		}

		// If a parent element has a static position, make it relative
		if ($element.css('position') === 'static') {
			$element.css('position', 'relative');
		}

		$element.prepend($wrapper);

		if (typeof path === 'object') {
			if (path.mp4) {
				sources += '<source src="' + path.mp4 + '.mp4" type="video/mp4">';
			}

			if (path.webm) {
				sources += '<source src="' + path.webm + '.webm" type="video/webm">';
			}

			if (path.ogv) {
				sources += '<source src="' + path.ogv + '.ogv" type="video/ogg">';
			}

			$video = vide.$video = $('<video>' + sources + '</video>');
		} else {
			$video = vide.$video = $('<video>' +
				'<source src="' + path + '.mp4" type="video/mp4">' +
				'<source src="' + path + '.webm" type="video/webm">' +
				'<source src="' + path + '.ogv" type="video/ogg">' +
				'</video>');
		}

		// https://github.com/VodkaBears/Vide/issues/110
		try {
			$video

				// Set video properties
				.prop({
					autoplay: settings.autoplay,
					loop: settings.loop,
					volume: settings.volume,
					muted: settings.muted,
					defaultMuted: settings.muted,
					playbackRate: settings.playbackRate,
					defaultPlaybackRate: settings.playbackRate
				});
		} catch (e) {
			throw new Error(NOT_IMPLEMENTED_MSG);
		}

		// Video alignment
		$video.css({
			margin: 'auto',
			position: 'absolute',
			'z-index': -1,
			top: position.y,
			left: position.x,
			'-webkit-transform': 'translate(-' + position.x + ', -' + position.y + ')',
			'-ms-transform': 'translate(-' + position.x + ', -' + position.y + ')',
			'-moz-transform': 'translate(-' + position.x + ', -' + position.y + ')',
			transform: 'translate(-' + position.x + ', -' + position.y + ')',

			// Disable visibility, while loading
			visibility: 'hidden'
		})

		// Resize a video, when it's loaded
		.one('canplaythrough.' + PLUGIN_NAME, function() {
			vide.resize();
		})

		// Make it visible, when it's already playing
		.one('playing.' + PLUGIN_NAME, function() {
			$video.css('visibility', 'visible');
			$wrapper.css('background-image', 'none');
		});

		// Resize event is available only for 'window'
		// Use another code solutions to detect DOM elements resizing
		$element.on('resize.' + PLUGIN_NAME, function() {
			if (settings.resizing) {
				vide.resize();
			}
		});

		// Append a video
		$wrapper.append($video);
	};

	/**
	 * Get a video element
	 * @public
	 * @returns {HTMLVideoElement}
	 */
	Vide.prototype.getVideoObject = function() {
		return this.$video[0];
	};

	/**
	 * Resize a video background
	 * @public
	 */
	Vide.prototype.resize = function() {
		if (!this.$video) {
			return;
		}

		var $wrapper = this.$wrapper;
		var $video = this.$video;
		var video = $video[0];

		// Get a native video size
		var videoHeight = video.videoHeight;
		var videoWidth = video.videoWidth;

		// Get a wrapper size
		var wrapperHeight = $wrapper.height();
		var wrapperWidth = $wrapper.width();

		if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
			$video.css({

				// +2 pixels to prevent an empty space after transformation
				width: wrapperWidth + 2,
				height: 'auto'
			});
		} else {
			$video.css({
				width: 'auto',

				// +2 pixels to prevent an empty space after transformation
				height: wrapperHeight + 2
			});
		}
	};

	/**
	 * Destroy a video background
	 * @public
	 */
	Vide.prototype.destroy = function() {
		delete $[PLUGIN_NAME].lookup[this.index];
		this.$video && this.$video.off(PLUGIN_NAME);
		this.$element.off(PLUGIN_NAME).removeData(PLUGIN_NAME);
		this.$wrapper.remove();
	};

	/**
	 * Special plugin object for instances.
	 * @public
	 * @type {Object}
	 */
	$[PLUGIN_NAME] = {
		lookup: []
	};

	/**
	 * Plugin constructor
	 * @param {Object|String} path
	 * @param {Object|String} options
	 * @returns {JQuery}
	 * @constructor
	 */
	$.fn[PLUGIN_NAME] = function(path, options) {
		var instance;

		this.each(function() {
			instance = $.data(this, PLUGIN_NAME);

			// Destroy the plugin instance if exists
			instance && instance.destroy();

			// Create the plugin instance
			instance = new Vide(this, path, options);
			instance.index = $[PLUGIN_NAME].lookup.push(instance) - 1;
			$.data(this, PLUGIN_NAME, instance);
		});

		return this;
	};

	$(document).ready(function() {
		var $window = $(window);

		// Window resize event listener
		$window.on('resize.' + PLUGIN_NAME, function() {
			for (var len = $[PLUGIN_NAME].lookup.length, i = 0, instance; i < len; i++) {
				instance = $[PLUGIN_NAME].lookup[i];

				if (instance && instance.settings.resizing) {
					instance.resize();
				}
			}
		});

		// https://github.com/VodkaBears/Vide/issues/68
		$window.on('unload.' + PLUGIN_NAME, function() {
			return false;
		});

		// Auto initialization
		// Add 'data-vide-bg' attribute with a path to the video without extension
		// Also you can pass options throw the 'data-vide-options' attribute
		// 'data-vide-options' must be like 'muted: false, volume: 0.5'
		$(document).find('[data-' + PLUGIN_NAME + '-bg]').each(function(i, element) {
			var $element = $(element);
			var options = $element.data(PLUGIN_NAME + '-options');
			var path = $element.data(PLUGIN_NAME + '-bg');

			$element[PLUGIN_NAME](path, options);
		});
	});

});
/* =============================================================================
   POLYFILL FOR REQUESTANIMATIONFRAME
   http://paulirish.com/2011/requestanimationframe-for-smart-animating/
   ========================================================================== */


(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());
