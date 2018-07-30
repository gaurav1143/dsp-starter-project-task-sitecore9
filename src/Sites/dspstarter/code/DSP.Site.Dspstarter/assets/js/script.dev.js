// ==========================================================================
// Deloitte Digital
// ==========================================================================





window.DDIGITAL = window.DDIGITAL || {};
DDIGITAL.IS_RESPONSIVE = true;
DDIGITAL.IS_EDIT = DDIGITAL.IS_EDIT || false;

(function(NAMESPACE, $) {

	'use strict';

	/* Stop console.log errors */
	if (typeof console === 'undefined') {
		window.console = {};
		console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = console.table = function() {};
	}

	// Overrides for the default breakpoints in the DDBreakpoints SCSS Mixin and
	// JavaScript library.
	// TODO: Remove the below section if the defaults are unchanged.
	DD.bp.options({
		breakpoints: [
			{name: 'xxs', px: 359},
			{name: 'xs', px: 480},
			{name: 's', px: 640},
			{name: 'm', px: 768},
			{name: 'l', px: 1024},
			{name: 'xl', px: 1244},
			{name: 'xxl', px: 1410}
		]
	});

	var $defaultScope = $('body');

	NAMESPACE.INIT = {
		visual: function($scope) {
			$scope = $scope || $defaultScope;

			NAMESPACE.contentModules.init();

			NAMESPACE.util.helpers.init();
			NAMESPACE.util.device.init();

			NAMESPACE.navOffscreen.init();
			NAMESPACE.navOnscreen.init();

			NAMESPACE.expandCollapse.init($scope);
			NAMESPACE.modal.init();

			NAMESPACE.tooltip.init();

			NAMESPACE.carousel.init();

			NAMESPACE.tabs.init();

			NAMESPACE.linkIcons.init($scope);

			NAMESPACE.responsiveTable.init();

			NAMESPACE.doWhen.init();

			NAMESPACE.video.init();
			NAMESPACE.bgVideo.init();
			NAMESPACE.map.init();

			NAMESPACE.equalHeights.init($scope);
		},
		functional: function($scope) {
			$scope = $scope || $defaultScope;

			NAMESPACE.forms.validate.init($scope);
			NAMESPACE.forms.sync.init();
			NAMESPACE.forms.multiStep.init($scope);

			NAMESPACE.togglePopover.init();
			NAMESPACE.autocomplete.init();

			NAMESPACE.util.print.init();
			NAMESPACE.util.scroll.init();

			// if you need the shade to slide with the page
			// (e.g. if the page uses the offscreen nav in "side" position)
			// put the shade inside the '.page-wrap' instead
			$('.page-wrap').ddShade();

			NAMESPACE.buildInfo.init();

			if (NAMESPACE.IS_EDIT) {
				$('html').addClass('is-edit');
			}
		}
	};

	NAMESPACE.init = function() {
		NAMESPACE.INIT.visual();
		NAMESPACE.INIT.functional();
		NAMESPACE.triggerReady();

		// Any DOM element can trigger the 're-init-all' event to have all modules re-initialise
		$(window.document)
			.on('re-init-all', function(evt) {
				var $scope = $(evt.target);

				NAMESPACE.INIT.visual($scope);
				NAMESPACE.INIT.functional($scope);
			});
	};

	$(document).ready(function() {
		NAMESPACE.init();
	});

}(DDIGITAL, jQuery));
// ==========================================================================
// BUILD INFORMATION
// ==========================================================================

window.DD_BUILD = window.DD_BUILD || {};

// Uncomment this line to emulate the global variables that are added to build/assets/js/script.js after doing a
// middleman build
//window.DD_BUILD = window.DD_BUILD || {}, window.DD_BUILD.NUMBER = '4', window.DD_BUILD.BRANCH = 'master';

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.buildInfo = (function() {
		var init;

		init =  function() {

			// Very early exit if no build information is at hand
			if (DD_BUILD.NUMBER === undefined || DD_BUILD.BRANCH === undefined) {
				return;
			}

			var $target = $('.js-buildinfo');

			// Early exit if target DOM node is not present
			if ($target.length === 0) {
				return;
			}

			$target.each(function() {
				var $el = $(this);

				$el.removeClass('hidden')
					.find('.middleman.build-number')
					.text(DD_BUILD.NUMBER);

				$el.find('.middleman.datetime')
					.text(DD_BUILD.DATETIME || '');

				$el.find('.middleman.branch')
					.text(DD_BUILD.BRANCH);
			});
		};

		return {
			init: init
		};

	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// DEVICE UTILITIES
// ==========================================================================

/**
 * Deloitte Digital global namespace
 * @namespace DDIGITAL
 */

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Utility namespace
	 * @namespace DDIGITAL.util
	 * @memberof DDIGITAL
	 */
	NAMESPACE.util = NAMESPACE.util || {};

	/**
	 * Breakpoints for JavaScript. Works with the Deloitte Digital SCSS @bp mixin
	 *
	 * @namespace device
	 * @memberof DDIGITAL.util
	 * @version 1.0.0
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */

	NAMESPACE.util.device = (function() {
		var isDevice,
			init;

		/**
		 * Initialiser for the helpers
		 *
		 * @memberof DDIGITAL.util.device
		 */
		isDevice = {
			android: function() {
				return /Android/i.test(navigator.userAgent);
			},
			androidchrome: function() {
				return window.chrome && /Android/i.test(navigator.userAgent);
			},
			blackberry: function() {
				return /BlackBerry/i.test(navigator.userAgent);
			},
			ios: function() {
				return /iPhone|iPad|iPod/i.test(navigator.userAgent);
			},
			opera: function() {
				return /Opera Mini/i.test(navigator.userAgent);
			},
			windows: function() {
				return /IEMobile/i.test(navigator.userAgent);
			},
			any: function() {
				return (isDevice.android() || isDevice.blackberry() || isDevice.ios() || isDevice.opera() || isDevice.windows());
			},
			touch: function() {
				return 'ontouchstart' in window || 'onmsgesturechange' in window;
			}
		};

		/**
		 * Initialiser for the device utilities - auto adds classes to the page.
		 *
		 * @memberof DDIGITAL.util.device
		 * @private
		 */
		init = function() {
			// uses isDevice in local scope, to add classes to the HTML tag
			// this means that we can use CSS to identify (handle) different user agents
			// assumes: jQuery dependancy + only one user-agent is possible

			if (isDevice.android()) {
				$('html').addClass('d-android');
			} else if (isDevice.blackberry()) {
				$('html').addClass('d-blackberry');
			} else if (isDevice.ios()) {
				$('html').addClass('d-ios');
			} else if (isDevice.opera()) {
				$('html').addClass('d-opera');
			} else if (isDevice.windows()) {
				$('html').addClass('d-windows');
			} else {
				$('html').addClass('d-other'); //something we're not checking, maybe desktop?
			}

			if (isDevice.any()) {
				$('html').addClass('d-any');
			}

			if (isDevice.touch()) {
				$('html').addClass('d-touch');
			}
		};

		return {
			is: isDevice,
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// FORMATTER
// ==========================================================================

/**
 * Deloitte Digital global namespace
 * @namespace DDIGITAL
 */

(function(NAMESPACE) {

	'use strict';

	/**
	 * Utility namespace
	 * @namespace DDIGITAL.util
	 * @memberof DDIGITAL
	 */
	NAMESPACE.util = NAMESPACE.util || {};

	/**
	 * Breakpoints for JavaScript. Works with the Deloitte Digital SCSS @bp mixin
	 *
	 * @namespace formatter
	 * @memberof DDIGITAL.util
	 * @version 1.0.0
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	NAMESPACE.util.formatter = (function() {
		var toCurrency,
			abbrNum,
			roundNum,
			isNumber;

		/**
		 * Converts a number to a currency format.
		 *
		 * @memberof DDIGITAL.util.formatter
		 * @param  {Number} number The number to convert to a currency
		 * @param  {Number} [decimals=2] The number of decimals to display
		 * @param  {String} [decimalSep=.] String for the decimal separator
		 * @param  {String} [thousandsSep=,] String for the thousands separator
		 *
		 * @example
		 * NAMESPACE.util.formatter.toCurrency(1400, 2, '.', ','); // returns 1,400.00
		 */
		toCurrency = function(number, decimals, decimalSep, thousandsSep) {
			var c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
				d = decimalSep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

				t = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep, //if you don't want to use a thousands separator you can pass empty string as thousandsSep value

				sign = (number < 0) ? '-' : '',

				//extracting the absolute value of the integer part of the number and converting to string
				i = parseInt(number = Math.abs(number).toFixed(c), 10) + '',

				j;
			j = ((j = i.length) > 3) ? j % 3 : 0;
			return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(number - i).toFixed(c).slice(2) : '');
		};

		/**
		 * Abbreviates a number to use k, m, b or t after it to help shorten the phsyical space taken up by the number
		 *
		 * @memberof DDIGITAL.util.formatter
		 * @param  {Number} number The number to abbreviate
		 * @param  {Number} [decimals=2] The number of decimals to display
		 *
		 * @example
		 * NAMESPACE.util.formatter.abbrNum(1000000, 2); // returns 1m
		 *
		 * @example
		 * DDIGITAL.util.formatter.abbrNum(999999, 0); // returns 1000k
		 *
		 * @example
		 * DDIGITAL.util.formatter.abbrNum(999999, 3); // returns 999.999k
		 *
		 * @example
		 * DDIGITAL.util.formatter.abbrNum(1999999, 5); // returns 2m
		 *
		 * @example
		 * DDIGITAL.util.formatter.abbrNum(1999999, 6); // returns 1.999999m
		 */
		abbrNum = function(number, decimals) {
			// 2 decimal places => 100, 3 => 1000, etc
			decimals = Math.pow(10, decimals);

			// Enumerate number abbreviations
			var abbrev = ['k', 'm', 'b', 't'];

			// Go through the array backwards, so we do the largest first
			for (var i = abbrev.length - 1; i >= 0; i -= 1) {

				// Convert array index to "1000", "1000000", etc
				var size = Math.pow(10, (i + 1) * 3);

				// If the number is bigger or equal do the abbreviation
				if (size <= number) {
					// Here, we multiply by decimals, round, and then divide by decimals.
					// This gives us nice rounding to a particular decimal place.
					number = Math.round(number * decimals / size) / decimals;

					// Add the letter for the abbreviation
					number += abbrev[i];

					break;
				}
			}

			return number;
		};

		/**
		 * Rounds a number to the specified number of decimal places
		 *
		 * @memberof DDIGITAL.util.formatter
		 * @param  {Number} number The number to round
		 * @param  {Number} [decimals=2] The number of decimals to display
		 *
		 * @example
		 * NAMESPACE.util.formatter.roundNum(3.3333, 2); // returns 3.33
		 *
		 * @example
		 * DDIGITAL.util.formatter.roundNum(3.3333, 0); // returns 3
		 *
		 * @example
		 * DDIGITAL.util.formatter.roundNum(666.666, 0); // returns 667
		 *
		 * @example
		 * DDIGITAL.util.formatter.roundNum(666.666, 2); // returns 666.67
		 */
		roundNum = function(number, decimals) {
			return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
		};

		/**
		 * Checks if a value is a number
		 *
		 * @memberof DDIGITAL.util.formatter
		 * @param  {Number} value The value to check if it's a number
		 * @return {Boolean}
		 */
		isNumber = function(value) {
			var isANum = (!isNaN(value - 0) && value !== null && value !== '' && value !== false);
			return isANum;
		};

		return {
			toCurrency: toCurrency,
			abbrNum: abbrNum,
			roundNum: roundNum,
			isNumber: isNumber
		};
	}());

}(DDIGITAL));
// ==========================================================================
// HELPER UTILITIES
// ==========================================================================

/**
 * Deloitte Digital global namespace
 * @namespace DDIGITAL
 */

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Utility namespace
	 * @namespace DDIGITAL.util
	 * @memberof DDIGITAL
	 */
	NAMESPACE.util = NAMESPACE.util || {};

	/**
	 * Helper functions to get older browsers more aligned with newer ones
	 *
	 * @namespace helpers
	 * @memberof DDIGITAL.util
	 * @version 1.0.0
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	NAMESPACE.util.helpers = (function() {
		var _setResponsiveToStatic,
			_polyfillTextAreaMaxlength,
			_polyfillInputSiblingSelectors,
			_polyfillSelectorsForIE8,
			init;

		/**
		 * Set the page options to be static instead of responsive
		 *
		 * @memberof DDIGITAL.util.helpers
		 * @private
		 */
		_setResponsiveToStatic = function() {
			NAMESPACE.IS_RESPONSIVE = false;

			DD.bp.options({
				isResponsive: false
			});
		};

		/**
		 * Text area polyfill to allow maxlength attribute
		 *
		 * @memberof DDIGITAL.util.helpers
		 * @private
		 */
		_polyfillTextAreaMaxlength = function() {
			$('textarea[maxlength]').each(function() {
				var $textarea = $(this),
					maxlength = parseInt($textarea.attr('maxlength'), 10);

				if (isNaN(maxlength) === false) { //make sure it's a number
					$textarea.on('keyup.textareaMaxlength blur.textareaMaxlength', function() {
						var val = $(this).val();
						if (val.length > maxlength) {
							$(this).val(val.substr(0, maxlength));
						}
					});
				}
			});
		};

		/**
		 * Add css classes in replacement for selectors that aren't supported in IE8
		 *
		 * @memberof DDIGITAL.util.helpers
		 * @private
		 */
		_polyfillSelectorsForIE8 = function() {
			$('li:last-child, th:last-child, td:last-child, tr:last-child').addClass('last-child');
			$('tr:nth-child(2n)').addClass('odd');
		};

		/**
		 * Checkbox polyfill for sibling selectors
		 *
		 * @memberof DDIGITAL.util.helpers
		 * @private
		 */
		_polyfillInputSiblingSelectors = function() {
			var checkValue = function($elem) {
				var $label = $('label[for="' + $elem.attr('id') + '"]');
				if ($elem.prop('checked')) {
					$elem.add($label).addClass('is-checked');
				} else {
					$elem.add($label).removeClass('is-checked');
				}

				// We modify the label as well as the input because authors may want to style the labels based on the state of the chebkox, and IE7 and IE8 don't fully support sibling selectors.
				return $elem;
			};

			$('input:radio, input:checkbox').each(function() {
				var $self = $(this);

				if ($self.prop('type') === 'radio') {
					$('input[name="' + $self.prop('name') + '"]').on('change.checkboxPolyfill', function() {
						checkValue($self);
					});
				} else if ($self.prop('type') === 'checkbox') {
					$self.change(function() {
						checkValue($self);
					});
				}

				// Check value when polyfill is first called, in case a value has already been set.
				checkValue($self);
			});
		};

		/**
		 * Initialiser for the helpers
		 *
		 * @memberof DDIGITAL.util.helpers
		 */
		init = function() {
			if ($('.lt-ie10').length) {
				_polyfillTextAreaMaxlength();
			}

			if ($('.lt-ie9').length) {
				_setResponsiveToStatic();
				_polyfillSelectorsForIE8();
				_polyfillInputSiblingSelectors();
			}

			// add placeholder polyfill
			if ($.placeholder && !Modernizr.input.placeholder) {
				$('input, textarea').placeholder();
			}

			// focus on an element without actually scrolling the page to it
			$.fn.noScrollFocus = function() {
				var x = window.scrollX,
					y = window.scrollY;

				this.focus();

				if ($('.lt-ie10').length === 0) {
					window.scrollTo(x, y);
				}

				return this; //chainability
			};
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// HELPER UTILITIES
// ==========================================================================
/**
 * Deloitte Digital global namespace
 * @namespace DDIGITAL
 */

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Utility namespace
	 * @namespace DDIGITAL.util
	 * @memberof DDIGITAL
	 */
	NAMESPACE.util = NAMESPACE.util || {};

	/**
	 * Bind print functionality to the page
	 *
	 * @namespace print
	 * @memberof DDIGITAL.util
	 * @version 1.0.0
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	NAMESPACE.util.print = (function() {
		var SELECTORS,
			init;

		SELECTORS = {
			PRINT: '.js-print'
		};

		/**
		 * On click, open the print dialog
		 *
		 * @memberof DDIGITAL.util.print
		 */
		init = function() {
			$(document).on('click.print', SELECTORS.PRINT, function(e) {
				e.preventDefault();
				window.print();
			});
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// SCROLL TO
// ==========================================================================

/**
 * Deloitte Digital global namespace
 * @namespace DDIGITAL
 */

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Utility namespace
	 * @namespace DDIGITAL.util
	 * @memberof DDIGITAL
	 */
	NAMESPACE.util = NAMESPACE.util || {};

	/**
	 * Breakpoints for JavaScript. Works with the Deloitte Digital SCSS @bp mixin
	 *
	 * @namespace scroll
	 * @memberof DDIGITAL.util
	 * @version 1.0.0
	 * @author Deloitte Digital Australia deloittedigital@deloitte.com.au
	 */
	NAMESPACE.util.scroll = (function() {
		var SELECTORS,
			DATA,
			scrollPage,
			scrollPageOnClick,
			init;

		SELECTORS = {
			SCROLLTO: '.scrollto'
		};

		DATA = {
			OFFSET: 'data-scroll-offset',
			TABTO: 'data-scroll-tabto',
			HASH: 'data-scroll-hash'
		};

		/**
		 * Scrolls the page
		 *
		 * @memberof DDIGITAL.util.scroll
		 * @param  {Number} top Top of the scren in pixels to scroll to.
		 * @param  {String} hash The hash to be updated in the URL upon completion of the scroll. Can be null.
		 * @param  {Number} _duration Time taken to animate to the new location. If null it will automatically determine the speed based on distance.
		 * @param  {Function} callback Callback function that is called on complete of the scroll.
		 */
		scrollPage = function(top, hash, _duration, callback) {
			var duration = _duration,
				isCallbackCalled = false;

			hash = (typeof (hash) === 'string') ? hash.substring(hash.indexOf('#') + 1) : null;

			if (duration === null) {
				var currentTop = $(document).scrollTop(),
					currentDistance = Math.abs(top - currentTop),
					maxDistance = 2000,
					maxDuration = 1000;

				if (currentDistance > maxDistance) {
					duration = maxDuration;
				} else {
					duration = (top > currentTop) ? (1 - currentTop / top) * maxDuration : (1 - top / currentTop) * maxDuration;
				}
			}

			$('html').velocity('stop').velocity('scroll', {
				offset: top,
				duration: duration,
				complete: function() {
					if (!isCallbackCalled) {
						isCallbackCalled = true;

						if (typeof (hash) === 'string') {
							if (window.history && window.history.pushState) {
								window.history.pushState(null, null, '#' + hash);
							} else {
								window.location.hash = hash;
							}
						}

						if (typeof (callback) === 'function') {
							callback();
						}
					}
				}
			});
		};

		/**
		 * Scrolls the page on click of a button
		 *
		 * @memberof DDIGITAL.util.scroll
		 * @private
		 * @param  {Event} top Top of the scren in pixels to scroll to.
		 */
		scrollPageOnClick = function(event) {
			var $btn = $(this),
				target = $btn.attr('href'),
				scrollOffset = parseInt($btn.attr(DATA.OFFSET), 10) || 0,
				tabTo = ($btn.attr(DATA.TABTO) === 'true'),
				updateHash = ($btn.attr(DATA.HASH) === 'false') ? false : true;

			// scroll to location
			target = target.substr(target.indexOf('#') + 1);

			var $target = $('#' + target),
				newHash = (updateHash) ? target : null;

			// we've assumed ID, if we can't find it, assume name attribute instead
			if ($target.length === 0) {
				$target = $('a[name="' + target + '"]');
			}

			// if can't be found, it's invalid - so treat it as a normal link
			if ($target.length === 0) {
				return;
			}

			// if the above checks have all passed, we can definitely scroll
			event.preventDefault();

			if (tabTo) {
				scrollPage($target.offset().top + scrollOffset, newHash, null, function() {
					$target.eq(0).noScrollFocus();
				});
			} else {
				scrollPage($target.offset().top + scrollOffset, newHash);
			}
		};

		/**
		 * Binds the appropriate click events to the appropriate buttons on the page
		 *
		 * @memberof DDIGITAL.util.scroll
		 */
		init = function() {
			$('body').off('click.scrollto').on('click.scrollto', SELECTORS.SCROLLTO, scrollPageOnClick);
		};

		return {
			page: scrollPage,
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// AUTOCOMPLETE
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.autocomplete = (function() {
		var init;

		init = function() {
			var options = {};

			$('.js-autocomplete').each(function(i, el) {
				var $el = $(el);

				// Set a validation delay to allow for the values to have been written to the input
				NAMESPACE.forms.validate.setValidationDelay($el.find('input'), 200);

				$el.ddAutocomplete(options);
			});
		};

		return {
			init: init
		};

	}());

}(DDIGITAL, jQuery));
/* ==========================================================================
 * BACKGROUND VIDEO
 * ========================================================================== */


(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.bgVideo = (function() {
		var SELECTORS,
			DATA,
			init;

		SELECTORS = {
			CONTAINER: '.js-bg-video'
		};

		DATA = {
			MP4: 'data-mp4-video-src',
			WEBM: 'data-webm-video-src',
			POSTER: 'data-poster-src'
		};

		init = function() {
			$(SELECTORS.CONTAINER).each(function(i, el) {
				var $container = $(el),
					src = {
						mp4: $container.attr(DATA.MP4),
						webm: $container.attr(DATA.WEBM),
						poster: $container.attr(DATA.POSTER)
					};

				$container.vide(src, {
					muted: true,
					loop: true,
					autoplay: true,
					posterType: 'jpg'
				});

				if (NAMESPACE.util.device.is.ios()) {
					$container.find('video').remove();
				}
			});
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// CAROUSEL
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Creates a basic carousel slider using slick.js
	 *
	 * @namespace carousel
	 * @memberof DDIGITAL
	 * @version 0.0.1
	 * @author Deloitte Digital Australia
	 */
	NAMESPACE.carousel = (function() {
		var CONST,
			ATTRS,
			CLASSES,
			SELECTORS,
			_tweakDefaultUI,
			_checkCarouselTheme,
			_getCarouselOptions,
			_equaliseHeights,
			_enable,
			_disable,
			init;

		CONST = {
			DEFAULT_OPTIONS: {
				infinite: false,
				cssEase: 'ease-out',
				dots: true,
				speed: 400,
				adaptiveHeight: false
			}
		};

		ATTRS = {
			CAROUSEL_TYPE: 'data-carousel-type',
			HAS_CAROUSEL: 'has-carousel'
		};

		CLASSES = {
			IS_DARK: 'is-dark',
			DOTS_WRAPPER: 'slick-dots-wrapper',
			LAYOUT_PADDING: 'l-padding'
		};

		SELECTORS = {
			CAROUSEL: '.js-carousel',
			CAROUSEL_SLIDE: '.slick-slide',
			CAROUSEL_TRACK: '.slick-track',
			UI: {
				DOTS: '.slick-dots'
			}
		};

		/**
		 * Tweak default UI to suit designs
		 *
		 * @memberof DDIGITAL.carousel
		 * @param  {Object} $carousel jQuery object of the carousel item
		 * @param  {String} type Type of carousel to update - comes from the data attr on the carousel
		 * @private
		 */
		_tweakDefaultUI = function($carousel, type) {
			if (type === 'hero') {
				var $dotsWrap = $('<div />', {
					class: CLASSES.DOTS_WRAPPER,
					html: $('<div />', {
						class: CLASSES.LAYOUT_PADDING
					})
				});

				$carousel.find(SELECTORS.UI.DOTS).wrap($dotsWrap);
			}
		};

		/**
		 * Check the current slide and detect if it's light (default) or dark
		 *
		 * @memberof DDIGITAL.carousel
		 * @param  {Object} $carousel jQuery object of the carousel item
		 * @param  {Object} $currentSlide jQuery object of the currently selected slide
		 * @private
		 */
		_checkCarouselTheme = function($carousel, $currentSlide) {
			if ($currentSlide.hasClass(CLASSES.IS_DARK)) {
				$carousel.addClass(CLASSES.IS_DARK);
			} else {
				$carousel.removeClass(CLASSES.IS_DARK);
			}
		};

		/**
		 * Get the options for the carousel slider
		 *
		 * @memberof DDIGITAL.carousel
		 * @param  {Object} $carousel jQuery object of the carousel item
		 * @return {Object|Boolean} Returns an object of options or if the carousel needs to be disabled returns false
		 * @private
		 */
		_getCarouselOptions = function($carousel) {
			var type = $carousel.attr(ATTRS.CAROUSEL_TYPE) || 'default',
				options = {};

			options = {
				type: type,
				opts: CONST.DEFAULT_OPTIONS,
				events: {
					beforeChange: function(event, slick, currentSlide, nextSlide) {
						var $carousel = $(this),
							$currentSlide = $carousel.find(SELECTORS.CAROUSEL_SLIDE).eq(nextSlide);

						_checkCarouselTheme($carousel, $currentSlide);
					}
				}
			};

			if (type === 'hero' || type === 'default') {
				return options;
			}

			return false;
		};

		/**
		 * If required, equalise the heights of the carousel slides so
		 * it doesn't look weird between slides with various heights
		 *
		 * @memberof DDIGITAL.carousel
		 * @param  {Object} $carousel jQuery object of the carousel item
		 * @private
		 */
		_equaliseHeights = function($carousel) {
			var equaliseSlideHeights;

			equaliseSlideHeights = function() {
				$carousel.find(SELECTORS.CAROUSEL_SLIDE).css('height', '');

				var trackHeight = parseInt($carousel.find(SELECTORS.CAROUSEL_TRACK).height(), 10);

				$carousel.find(SELECTORS.CAROUSEL_SLIDE).css('height', trackHeight + 'px');
			};

			$(window).on('resize.carousel', $.debounce(250, equaliseSlideHeights));
			equaliseSlideHeights();
		};

		/**
		 * Enable the carousel
		 *
		 * @memberof DDIGITAL.carousel
		 * @param  {Object} $carousel jQuery object of the carousel item
		 * @private
		 */
		_enable = function($carousel) {
			var options = _getCarouselOptions($carousel);

			if ($carousel.data(ATTRS.HAS_CAROUSEL)) {
				console.warn('Carousel is already enabled');
				return;
			}

			$.extend(options, CONST.DEFAULT_OPTIONS, options.opts);

			$carousel.slick(options);

			$carousel.data(ATTRS.HAS_CAROUSEL, true);

			// check theme (dark or light) on load
			_checkCarouselTheme($carousel, $carousel.find(SELECTORS.CAROUSEL_SLIDE).eq(0));
			_tweakDefaultUI($carousel, options.type);

			if (options.adaptiveHeight !== true) {
				_equaliseHeights($carousel, options);
			}

			// apply events
			if (options.events) {
				for (var key in options.events) {
					if (options.events.hasOwnProperty(key)) {
						$carousel.on(key, options.events[key]);
					}
				}
			}
		};

		/**
		 * Disable the carousel
		 *
		 * @memberof DDIGITAL.carousel
		 * @param  {Object} $carousel jQuery object of the carousel item
		 * @private
		 */
		_disable = function($carousel) {
			if ($carousel.data(ATTRS.HAS_CAROUSEL)) {
				$carousel.slick('unslick');
			}

			$carousel.data(ATTRS.HAS_CAROUSEL, false);
		};

		/**
		 * Init the carousel with checking code to detect when changes should be made to it on screen resize
		 *
		 * @memberof DDIGITAL.carousel
		 */
		init = function() {
			var check;

			check = function() {
				$(SELECTORS.CAROUSEL).each(function(i, el) {
					var $carousel = $(el),
						options = _getCarouselOptions($carousel);

					if (options === false) {
						_disable($carousel);
						return;
					}

					if ($carousel.data(ATTRS.HAS_CAROUSEL) === false) {
						_enable($carousel);
					}
				});
			};

			$(SELECTORS.CAROUSEL).each(function(i, el) {
				$(el).data(ATTRS.HAS_CAROUSEL, false);
			});

			// add a size check using enquire here and call `check` on size change.
			// in order to change options depending on screensize, use the _getCarouselOptions
			// function to do a size check there. To disable the carousel completely return false
			// from _getCarouselOptions
			check();
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// CONTENT MODULES
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Manages the widths of content modules so instead of
	 * using complicated and very specific CSS to detect which size the
	 * module should be we can do it in JavaScript
	 * Essentially is helping us achieve element media queries
	 *
	 * @namespace contentModules
	 * @memberof DDIGITAL
	 * @version 0.0.5
	 * @author Deloitte Digital Australia
	 */
	NAMESPACE.contentModules = (function() {
		var CONST,
			CLASSES,
			SELECTORS,
			_removeAllWidthClasses,
			_setAllToDefault,
			_checkContentModuleSize,
			init;

		CONST = {
			SMALL_WIDTH: 350,
			MEDIUM_WIDTH: 500,
			LARGE_WIDTH: 800
		};

		CLASSES = {
			IS_SMALL: 'is-small',
			IS_MEDIUM: 'is-medium',
			IS_LARGE: 'is-large'
		};

		SELECTORS = {
			CM: '.cm, .hm'
		};

		/**
		 * Removes all the width classes from a content module
		 *
		 * @memberof DDIGITAL.contentModules
		 * @private
		 */
		_removeAllWidthClasses = function($cm) {
			$cm.removeClass(CLASSES.IS_SMALL)
				.removeClass(CLASSES.IS_MEDIUM)
				.removeClass(CLASSES.IS_LARGE);
		};

		/**
		 * Set all the contentModules to default (small) size
		 *
		 * @memberof DDIGITAL.contentModules
		 * @private
		 */
		_setAllToDefault = function() {
			$(SELECTORS.CM).each(function(i, el) {
				_removeAllWidthClasses($(el));
			});
		};

		/**
		 * Check the size of the content module and apply a class
		 * depending on the size of the module
		 *
		 * @memberof DDIGITAL.contentModules
		 * @private
		 */
		_checkContentModuleSize = function() {
			$(SELECTORS.CM).each(function(i, el) {
				var $cm = $(el),
					cmWidth;

				// remove the classes before checking the width
				_removeAllWidthClasses($cm);

				// get current width
				cmWidth = $cm.width();

				// set width into ranges
				if (cmWidth >= CONST.SMALL_WIDTH && cmWidth < CONST.MEDIUM_WIDTH) {

					$cm.addClass(CLASSES.IS_SMALL);
					$cm.removeClass(CLASSES.IS_MEDIUM)
						.removeClass(CLASSES.IS_LARGE);

				} else if (cmWidth >= CONST.MEDIUM_WIDTH && cmWidth < CONST.LARGE_WIDTH) {

					$cm.addClass(CLASSES.IS_MEDIUM);
					$cm.removeClass(CLASSES.IS_SMALL)
						.removeClass(CLASSES.IS_LARGE);

				} else if (cmWidth >= CONST.LARGE_WIDTH) {

					$cm.addClass(CLASSES.IS_LARGE);
					$cm.removeClass(CLASSES.IS_SMALL)
						.removeClass(CLASSES.IS_MEDIUM);
				}
			});
		};

		/**
		 * Initialise the content module size checking on page load
		 * - Requires enquire.js
		 *
		 * @memberof DDIGITAL.contentModules
		 */
		init = function() {
			if (typeof (enquire) !== 'object') {
				console.error('DDIGITAL.contentModules: enquire.js is required.');
			}

			// register listeners for only the required breakpoints
			// because xs->s is fluid responsive, we need to check on resize
			// else, just need to check at the adaptive responsive breakpoints
			enquire.register(DD.bp.get('0,xxs'), {
				match: _setAllToDefault
			}).register(DD.bp.get('xs,s'), {
				match: function() {
					// use throttle to ensure that it runs ASAP
					$(window).on('resize.cm', $.throttle(200, _checkContentModuleSize));
				},
				unmatch: function() {
					// unbind the throttle event because it's not needed outside of this breakpoint
					$(window).off('resize.cm', $.throttle(200, _checkContentModuleSize));
				}
			}).register(DD.bp.get('m,m'), {
				match: _checkContentModuleSize
			}).register(DD.bp.get('l,l'), {
				match: _checkContentModuleSize
			}).register(DD.bp.get('xl,xl'), {
				match: _checkContentModuleSize
			}).register(DD.bp.get('xxl'), {
				match: _checkContentModuleSize
			});

			// do initial large check because sometimes enquire doesn't run on load
			if (DD.bp.is('xs')) {
				_checkContentModuleSize();
			}
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// DO WHEN - A jQuery plugin to do stuff when you want
// https://github.com/dkeeghan/jQuery-doWhen
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.doWhen = (function() {

		var init;

		init = function() {
			$(document).doWhen();
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// EQUAL HEIGHTS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Manages heights of like items to keep them the same
	 * using the $.ddEqualHeights plugin
	 *
	 * @namespace equalHeights
	 * @memberof DDIGITAL
	 * @version 1.1.0
	 * @author Deloitte Digital Australia
	 */
	NAMESPACE.equalHeights = (function() {
		var init;

		/*
		 * @example
		 *
		 * $.fn.ddEqualHeights.addType('feature-item', {
		 *     itemsSelector: '.item',
		 *     sectionSelector: '.section',
		 *     numItemsPerRow: 2
		 * });
		 */

		// add the eqh-demo type
		$.ddEqualHeights.addType('eqh-demo', {
			numItemsPerRow: function() {
				// you can do tricky things here like look at layouts and check if the site is responsive or not.
				if ($('.l-three-column').length) {
					return (NAMESPACE.IS_RESPONSIVE) ? {'0,xs': 1, 's,l': 2, 'xl': 3} : 2;
				}

				return (NAMESPACE.IS_RESPONSIVE) ? {'0,xs': 1, 's,m': 2, 'l,xl': 3, 'xxl': 4} : 3;
			}
		});

		// add the sl-list types (2 items)
		$.ddEqualHeights.addType('sl-list-has-2-items', {
			itemsSelector: '.cm',
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,m': 1, 'l': 2} : 2;
			}
		});

		// add the sl-list types (3 items)
		$.ddEqualHeights.addType('sl-list-has-3-items', {
			itemsSelector: '.cm',
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,m': 1, 'l': 3} : 3;
			}
		});

		$.ddEqualHeights.addType('sl-list-has-4-items', {
			itemsSelector: '.cm',
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,m': 1, 'l': 4} : 4;
			}
		});

		// add the sl-list-landing type
		$.ddEqualHeights.addType('sl-list-landing', {
			itemsSelector: '.cm',
			sectionSelector: '.title, > ul',
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,m': 1, 'l': 2} : 2;
			}
		});

		// add the nav-onscreen type
		$.ddEqualHeights.addType('nav-onscreen', {
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,m': 1, 'l': 4} : 4;
			}
		});

		// add the site map type
		$.ddEqualHeights.addType('cm-site-map', {
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,xs': 1, 's,m': 2, 'l': 4} : 4;
			}
		});

		// add the homepage hero-links type
		$.ddEqualHeights.addType('hero-links', {
			itemsSelector: '.link-item',
			sectionSelector: '.content',
			numItemsPerRow: function() {
				return (NAMESPACE.IS_RESPONSIVE) ? {'0,xxs': 1, 'xs,m': 2, 'l': 4} : 4;
			}
		});

		init = function(scope) {
			var $scope = (scope) ? $('[data-heights-type]', scope) : $('[data-heights-type]');
			$scope.ddEqualHeights();
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// EXPAND COLLAPSE
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.expandCollapse = (function() {
		var reset,
			init;

		reset = function($container, newIdSuffix) {
			var changeId = (typeof (newIdSuffix) === 'string');

			$container.find('.js-ec').trigger('destroy.ddExpandCollapse');

			if (changeId) {
				$container.find('.js-ec').each(function(i, el) {
					$(el).attr('id', $(el).attr('id') + newIdSuffix);
				});

				$container.find('.js-ec-link').each(function(i, el) {
					var href = $(el).attr('href');
					href = href.substring(href.indexOf('#'));

					$(el).attr('href', href + newIdSuffix);
				});
			}

			init($container);
		};

		init = function(scope) {
			var $ecScope = (scope) ? $('.js-ec', scope) : $('.js-ec');
			$ecScope.ddExpandCollapse();

			// grouped in JS
			var $ecScopeGrouped = (scope) ? $('.js-ec-grouped', scope) : $('.js-ec-grouped');
			$ecScopeGrouped.ddExpandCollapse({
				group: 'group-2'
			});

			// always scroll - even if on screen
			var $ecScopeScroll = (scope) ? $('.js-ec-scroll', scope) : $('.js-ec-scroll');
			$ecScopeScroll.ddExpandCollapse({
				durations: {
					scroll: 1000
				},
				animations: {
					scrollPage: function($container, options, callback) {
						var offset;

						// display the container to get the position
						$container.css({
							display: 'block'
						});

						offset = $container.offset().top + options.scrollOffset;

						// rehide the container
						$container.css({
							display: ''
						});

						// scroll the page
						$('html').velocity('stop').velocity('scroll', {
							offset: offset,
							duration: options.durations.scroll,
							complete: callback
						});
					}
				}
			});
		};

		return {
			reset: reset,
			init: init
		};
	}());

}(DDIGITAL, jQuery));
/* ==========================================================================
 * LINK ICONS
 *
 * Instructions for the client:
 *
 * The JavaScript module that adds external link icons is located at
 * `source/js/modules/_linkIcons.js`. External link icons will be added to
 * any link with target="_blank"
 *
 * After editing source/js/modules/_linkIcons.js, the developer should run
 * `middleman build` to generate the compiled JavaScript file: build/js/script.js.
 * For more information about Middleman, visit: http://middlemanapp.com/
 *
 * There is another option for disabling the external link icons. If there is a
 * section of the page where no link icons should appear, you can add a
 * classname of "link-icons-disabled" to an element and no links inside this
 * element will have a link icon added.
 *
 * ========================================================================== */


(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.linkIcons = (function() {

		// Do not add icons to links that are descendents of elements with the following selector
		var IGNORE_PATTERN = '.link-icons-disabled',
			_addClass,
			init;

		_addClass = function($link, classname, caption, doAlways) {
			var $icon,
				$iconText;

			doAlways = doAlways || false;

			// Do not proceed if one of the parent elements of this link has a classname of "link-icons-disabled"
			// This test is contained in the addClass function so that it is only run on elements with a matching URL because it involved a lot of DOM lookups
			if (!doAlways && ($link.filter(IGNORE_PATTERN).length > 0 || $link.closest(IGNORE_PATTERN).length > 0)) {
				return;
			}
			// If this link contains an image and nothing else, don't add icons to it
			if ($link.children().length === 1 && $link.text() === '' && $link.children('img').length === 1) {
				return;
			}

			$icon = $link.find('.link-icon');

			if ($icon.length === 0) {
				if ($link.hasClass('link-caret-block')) {
					$link.append('<span class="link-icon"></span>');
				} else {
					var justText = $link.clone().children().remove().end().text(),
						linkWords = justText.split(' '),
						lastWord = linkWords.pop();

					// wrap the icon around the last word
					lastWord = '<span class="link-icon">' + lastWord + '<span class="vh"></span></span>';
					linkWords.push(lastWord);
					linkWords = linkWords.join(' ');

					var html = $link.html();
					$link.html(html.replace(justText, linkWords));

					$icon = $link.find('.link-icon');
				}
			}

			$iconText = $icon.find('.vh');

			$iconText.text($iconText.text() + caption);
			$link.addClass(classname);
		};

		init = function(scope) {
			var $scope = (scope) ? $('a', scope) : $('a');

			$scope.each(function() {
				var $link = $(this),
					href = $link.attr('href');

				if (!href) {
					return;
				}

				if ($link.hasClass('link-caret')) {
					_addClass($link, 'link-caret', '', true);
				}

				/*
				if ($link.attr('target') === '_blank') {
					_addClass($link, 'link-external', ' (External link)');
				}
				*/

				/*
				if (href.substr(href.length - 4, 4) === '.pdf') {
					_addClass($link, 'link-pdf', ' (PDF)');
				}
				*/
			});

		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// MAP
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * @namespace map
	 * @memberof DDIGITAL
	 * @version 0.1.0
	 * @author Deloitte Digital Australia
	 */
	NAMESPACE.map = (function() {
		var APIS,
			SELECTORS,
			ATTRIBUTES,
			init,
			createMaps,
			initMapModule,
			insertMapsApiScriptIfNil,
			_addAccessibleMaps,
			markerListData = [];

		APIS = {
			MAPS_API_SRC: 'https://maps.googleapis.com/maps/api/js?callback=DDIGITAL.map.createMaps&key='
		};

		SELECTORS = {
			MARKER_LIST: '.marker-list li',
			MAP_CONTAINER: '.map-container',
			MAP_MODULE: '.cm-map',
			MARKER_LIST_ITEM: {
				GEO_NAME: '.geo-name',
				GEO_LATITUDE: '.p-latitude',
				GEO_LONGITUDE: '.p-longitude'
			},
			MAP_CONTENT: '.content'
		};

		ATTRIBUTES = {
			API_KEY: 'data-map-api-key',
			GEO_HREF: 'data-geo-href'
		};

		insertMapsApiScriptIfNil = function($mapModule) {

			// Update the key to have a key if there isn't one.
			if (!APIS.MAPS_API_SRC.split('key=')[1]) {
				APIS.MAPS_API_SRC += $mapModule.attr(ATTRIBUTES.API_KEY);
			}

			// If there is no google maps API script, insert it.
			if ($('script[src="' + APIS.MAPS_API_SRC + '"]').length === 0) {

				var tag,
					firstScript;

				tag = document.createElement('script');
				tag.src = APIS.MAPS_API_SRC;

				firstScript = document.getElementsByTagName('script')[0];
				firstScript.parentNode.insertBefore(tag, firstScript);

			}
		};

		// This function is called asynchronously by the google maps lib after load completes.
		createMaps = function() {

			var $mapModules = $(SELECTORS.MAP_MODULE);

			$.each(markerListData, function(index, mapData) {

				var $currentMapModule = $($mapModules[index]),
					mapContainer = $currentMapModule.find(SELECTORS.MAP_CONTAINER)[0],
					infoWindow = null,
					initialZoomAttr = $currentMapModule.attr('data-initial-zoom'),
					zoom = initialZoomAttr && initialZoomAttr.length > 0 ? parseInt(initialZoomAttr) : 15,
					mapOptions = {
						zoom: zoom
					},
					map = new google.maps.Map(mapContainer, mapOptions),
					mapMarkers = [];

				mapData.each(function(index) {

					var data = $(this)[0],
						marker = new google.maps.Marker({
							position: new google.maps.LatLng(data.latitude, data.longitude),
							title: data.title
						});

					marker.addListener('click', function(e) {

						if (infoWindow) {
							infoWindow.close();
						}

						var indexOfMatch = -1,
							moduleContent,
							i;

						for (i = 0; i < mapMarkers.length; i += 1) {

							if (e.latLng === mapMarkers[i][0].getPosition()) {
								indexOfMatch = i;
								break;
							}

						}

						moduleContent = $currentMapModule
							.clone()
							.find(SELECTORS.MAP_CONTENT)
							.removeClass('vh')
							.find('span.vh')
							.remove()
							.end()
							[indexOfMatch].outerHTML;

						infoWindow = new google.maps.InfoWindow({
							content: '' + moduleContent,
							maxWidth: 300
						});

						infoWindow.open(map, marker);
					});

					// A 2d array, with a marker and the index of the data it is referring to;
					mapMarkers.push([marker, index]);
					marker.setMap(map);

				});

				// Fit the map around multiple markers
				if (mapMarkers.length !== 1) {

					var bounds = new google.maps.LatLngBounds(),
						i;

					for (i = 0; i < mapMarkers.length; i += 1) {
						bounds.extend(mapMarkers[i][0].getPosition());
					}

					map.fitBounds(bounds);

				} else {

					map.setCenter(mapMarkers[0][0].getPosition());

				}

				// Add accessibility
				if (mapContainer) {

					if ($('.d-touch').length === 0) {
						_addAccessibleMaps(mapContainer, map);
					}

				}

			});

		};

		initMapModule = function($mapModule) {

			insertMapsApiScriptIfNil($mapModule);

			var $markerList = $mapModule.find(SELECTORS.MARKER_LIST),
				moduleMarkerListData = [];

			moduleMarkerListData = $markerList.map(function() {

				var $listLi = $(this);

				return {
					latitude: $listLi.find(SELECTORS.MARKER_LIST_ITEM.GEO_LATITUDE).text(),
					longitude: $listLi.find(SELECTORS.MARKER_LIST_ITEM.GEO_LONGITUDE).text(),
					title: $listLi.find(SELECTORS.MARKER_LIST_ITEM.GEO_NAME).text()
				};

			});

			markerListData.push(moduleMarkerListData);

		};

		_addAccessibleMaps = function(canvas, map) {
			var attemptInterval = 2,
				maxAttempts = 18,
				mA = 0,
				notYet = true,
				addKey,
				titles = {
					'pan up': 1,
					'pan down': 1,
					'pan right': 1,
					'pan left': 1,
					'zoom in': 1,
					'zoom out': 1,
					'show street map': 1,
					'show satellite imagery': 1
				};

			// add keyboard accessibility to Google Maps
			addKey = function() {
				mA += 1;

				// only allow the function to be called a max number of times
				if (mA > maxAttempts) {
					return;
				}

				// for every DIV inside the map container
				$(canvas).find('div').each(function() {

					var title = this.getAttribute('title');

					if (title) {
						title = $.trim(title.toLowerCase());
					}

					// check if the title exists in our object
					if (titles.hasOwnProperty(title)) {
						var $el = $(this),
							hPan = Math.floor(canvas.offsetHeight / 4),
							wPan = Math.floor(canvas.offsetWidth / 4);

						titles[title] = $el;

						// set the DIV element to be clickable
						$el.attr({
							tabindex: '0',
							role: 'button'
						});

						// See http://www.visionaustralia.org/digital-access-googlemap

						$el.on('keydown.visionAusMaps', function(e) {

							var shouldPrevent = true,
								key = e.keyCode || e.which;

							if (key === 13) {
								$(this).trigger('click');
								shouldPrevent = false;
							} else if (key === 40) {//down
								map.panBy(0, wPan);
							} else if (key === 38) {//up
								map.panBy(0, -wPan);
							} else if (key === 37) {//left
								map.panBy(-hPan, 0);
							} else if (key === 39) {//right
								map.panBy(hPan, 0);
							} else {
								return;
							}

							if (shouldPrevent) {
								e.preventDefault();
								e.stopPropagation();
							}

						});

						// styling to give the focus state
						(function() {
							var mo = false,
								bo = $el.css('border'),
								ma = $el.css('margin'),
								bc = $el.css('background-color'),
								op = $el.css('opacity');

							$el.on('mouseover.visionAusMaps', function() {
								mo = true;
							}).on('mouseout.visionAusMaps', function() {
								mo = false;
							}).on('focus.visionAusMaps', function() {
								if (mo) {
									return;
								}

								$el.css({
									'border': '2px solid blue',
									'margin': '-2px',
									'background-color': 'transparent',
									'opacity': '1'
								});

							}).on('blur.visionAusMaps', function() {
								$el.css({
									'border': bo,
									'margin': ma,
									'background-color': bc,
									'opacity': op
								});
							});

							// when set to false, this means it's run and we dont need to run it again
							notYet = false;
						}());


					}
				});

				if (notYet) {
					// run until the maps have been loaded and we're able to bind events to it
					setTimeout(addKey, attemptInterval * 1000);
				}
			};

			addKey();
		};

		init = function() {

			$(SELECTORS.MAP_MODULE).each(function(index) {
				var $mapModule = $(this);
				initMapModule($mapModule, index);
			});

		};

		return {
			init: init,
			createMaps: createMaps
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// MODAL WINDOWS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.modal = (function() {
		var _addDynamicModalConfiguration,
			openModal,
			closeModal,
			isModalOpen,
			init;

		_addDynamicModalConfiguration = function() {
			// DEMO Page example
			$.ddModals.dynamicModal.addType('modal-dynamic-example', {
				mq: '0,s',
				type: 'modal-dynamic-example',
				callback: function($modal) {
					NAMESPACE.expandCollapse.reset($modal, '-inmodal');
				}
			});

			// SEARCH/COLLETION Pages for DSP
			$.ddModals.dynamicModal.addType('modal-collection-header-sort', {
				mq: '0,xl',
				type: 'modal-collection-header-sort',
				callback: function() {}
			});

			// SEARCH/COLLETION Pages for DSP
			$.ddModals.dynamicModal.addType('modal-search-facets', {
				mq: '0,s',
				type: 'modal-search-facets',
				callback: function($modal) {
					NAMESPACE.expandCollapse.reset($modal, '-inmodal');
				}
			});
		};

		openModal = function(id, opener, callback) {
			$.ddModals.open(id, opener, callback);
		};

		closeModal = function(callback) {
			$.ddModals.close(callback);
		};

		isModalOpen = function() {
			return $.ddModals.isOpen();
		};

		init = function() {
			_addDynamicModalConfiguration();

			// Initialiser
			$('.js-modal-container').ddModals({
				repositionModalOnEvent: 'collapsed.ddExpandCollapse expanded.ddExpandCollapse',
				preOpen: function() {
					// close navigation
					$('.js-nav-offscreen').trigger('close.offscreen');
				}
			});
		};

		return {
			open: openModal,
			close: closeModal,
			isOpen: isModalOpen,
			init: init
		};

	}());

}(DDIGITAL, jQuery));
/* ==========================================================================
 * MAGICAL AMAZING RESPONSIVE TABLES
 *
 * This module applies to tables with a classname of "js-responsive-table".
 * By default, it will apply a horizontal scroll to tables.
 * It also has an option to display an interface for toggling table columns.
 *
 * To enable column toggling:
 *  - Add a classname of "responsive-table-column-toggling" to the table
 *  - Add a classname of "column-persist" to any <th> elements for columns that
 *    should never ever be hidden (such as the title column)
 *  - Add a classname of "column-important" to any <th> elements for columns that
 *    will be displayed by default on all breakpoints (including extra small and below)
 *  - Add a classname of "column-optional" to any <th> elements for columns that
 *    will be displayed by default on small-and-above breakpoints
 *  - <th> elements without one of the above classnames will only be displayed
 *    by default on the large-and-above breakpoint
 *
 * Table column toggling supports tables with colspan attributes in the head
 * <th> elements, but not in the body <td> elements.
 *
 * ========================================================================== */


(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.responsiveTable = (function() {
		var CLASSES = {
			MENU_BUTTON: 'responsive-table-toggle-menu-btn cta is-secondary is-small',
			DO_COLUMN_TOGGLE: 'responsive-table-column-toggling'
		};

		var init = function() {
			$('.js-responsive-table').each(function(i, el) {
				var options = {
					classes: {
						columnToggle: {
							menuButton: CLASSES.MENU_BUTTON
						}
					}
				};

				if ($(el).hasClass(CLASSES.DO_COLUMN_TOGGLE)) {
					options.columnToggle = true;
				}

				$(el).ddResponsiveTable(options);
			});
		};

		return {
			init: init
		};

	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// TABS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	// tabs functionality, including the ability to have tabs in tabs
	NAMESPACE.tabs = (function() {

		var SELECTORS,
			init;

		SELECTORS = {
			TABS: '.js-tabs',
			TAB_EC_TITLE: '.tab-ec-title',
			TAB_EC_CONTENT: '.tab-ec-content'
		};

		init = function() {
			$(SELECTORS.TABS).each(function(i, el) {
				var $tabsContainer = $(el);

				$tabsContainer.ddTabs();

				// if the tab has an expand/collapse title, listen for when the tab changes
				if ($tabsContainer.find(SELECTORS.TAB_EC_TITLE).length > 0) {

					$tabsContainer.on('tabChanged.ddTabs', function(event, id, $activeTab, $tabsList) {
						event.stopPropagation();

						$tabsList.find(SELECTORS.TAB_EC_CONTENT).trigger('collapse.ddExpandCollapse');
						$activeTab.find(SELECTORS.TAB_EC_CONTENT).trigger('expand.ddExpandCollapse');
					});

				}
			});

		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
/* ==========================================================================
 * TOGGLE SEARCH BAR
 * ========================================================================== */


(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.togglePopover = (function() {

		var ATTRS,
			CLASSES,
			SELECTORS,
			_togglePopover,
			_showPopover,
			_hidePopover,
			init;

		ATTRS = {
			POPOVER_ID: 'data-popover-id',
			IS_ANIMATING: 'popover-is-animating'
		};

		CLASSES = {
			IS_ACTIVE: 'is-active',
			IS_READY: 'is-ready'
		};

		SELECTORS = {
			TOGGLE: '.js-popover-toggle'
		};

		_hidePopover = function($popover, $button) {
			if ($popover.data(ATTRS.IS_ANIMATING) === true) {
				return;
			}

			$popover.data(ATTRS.IS_ANIMATING, true);

			$button.removeClass(CLASSES.IS_ACTIVE);

			$popover.removeClass(CLASSES.IS_ACTIVE)
				.find('input[type="search"]').val('');

			DD.a11y.tabInsideContainer.unset();
			DD.a11y.onEscape.unset();
			DD.a11y.onClickOutside.unset();

			// focus back on the original button when closing
			$button.focus();

			// hide shade
			if ($.ddShade.isAnimating()) {
				// if the shade is already animating we shouldn't hide it
				$.ddShade.setBehindHeader(false);
				$popover.removeClass(CLASSES.IS_READY);
				$popover.data(ATTRS.IS_ANIMATING, false);
			} else {
				// fade out and hide the shade entirely
				$.ddShade.opacity(0, 150, true, function() {
					$.ddShade.setActive(false);
					$.ddShade.setBehindHeader(false);

					$popover.removeClass(CLASSES.IS_READY);

					$popover.data(ATTRS.IS_ANIMATING, false);
				});
			}
		};

		_showPopover = function($popover, $button) {
			if ($popover.data(ATTRS.IS_ANIMATING) === true) {
				return;
			}

			$popover.data(ATTRS.IS_ANIMATING, true);

			var hideCurrentPopover = function() {
				_hidePopover($popover, $button);
			};

			// add class to toggle display state
			$popover.addClass(CLASSES.IS_READY);
			$button.addClass(CLASSES.IS_ACTIVE);

			// setup shade
			$.ddShade.setBehindHeader(true);
			$.ddShade.setActive(true);

			// bind close to escape button
			DD.a11y.onEscape.set(hideCurrentPopover);

			// bind close on outside click
			DD.a11y.onClickOutside.set($popover, hideCurrentPopover);

			// display shade
			$.ddShade.opacity(0.75, 150, false, function() {
				$popover.addClass(CLASSES.IS_ACTIVE);

				DD.a11y.tabInsideContainer.set($popover, true);
				$popover.find('input[type="search"]').focus();

				$popover.data(ATTRS.IS_ANIMATING, false);
			});
		};

		_togglePopover = function(event) {
			event.preventDefault();

			var $button = $(this),
				popoverId = $button.attr(ATTRS.POPOVER_ID),
				$popover = $(document.getElementById(popoverId));

			if ($popover.hasClass(CLASSES.IS_ACTIVE)) {
				_hidePopover($popover, $button);

				return;
			}

			_showPopover($popover, $button);
		};

		init = function() {
			$(document).on('click.togglePopover', SELECTORS.TOGGLE, _togglePopover);
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// TOOLTIPS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.tooltip = (function() {
		var init;

		init = function() {
			$('.js-tooltip').ddTooltip();
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// VIDEO
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Creates a basic accessible youtube video
	 * Youtube progress events are accessible on the module.
	 * -1 – unstarted
	 *	0 – ended
	 *	1 – playing
	 *	2 – paused
	 *	3 – buffering
	 *	5 – video cued
	 *	The youtubeDictionary is a dict with .video IDs as keys.
	 * You can perform official methods on this from:
	 * https://developers.google.com/youtube/iframe_api_reference
	 *
	 * @namespace video
	 * @memberof DDIGITAL
	 * @version 0.1.0
	 * @author Deloitte Digital Australia
	 */
	NAMESPACE.video = (function() {
		var CONST,
			SELECTORS,
			init;

		CONST = {
			IFRAME_API_SRC: 'https://www.youtube.com/iframe_api'
		};

		SELECTORS = {
			YOUTUBE_VARIANT: '.cm-video.youtube'
		};

		var youtubeDictionary = {};

		init = function() {

			var youtubePlayerArray = [];

			if ($(SELECTORS.YOUTUBE_VARIANT).length === 0) {
				return;
			}

			// Init youtube variant. Other variants may be added later.
			$(SELECTORS.YOUTUBE_VARIANT).each(function(index) {

				var $videoContainer = $(this),
					videoId = $videoContainer.find('.video').attr('data-youtube-id'),
					videoElId,
					contentWrapperStart,
					contentWrapperEnd;

				// Accessibility
				/* eslint-disable quote-props */
				contentWrapperStart = $('<a />', {
					id: 'v-skip-' + index + '-top',
					href: '#v-skip-' + index + '-bot',
					'class': 'vh focusable',
					text: 'Skip to below video'
				});

				contentWrapperEnd = $('<a />', {
					id: 'v-skip-' + index + '-bot',
					href: '#v-skip-' + index + '-top',
					'class': 'vh focusable',
					text: 'Skip to above video'
				});
				/* eslint-enable quote-props */

				$videoContainer.find('.intrinsic-wrap').before(contentWrapperStart);
				$videoContainer.find('.intrinsic-wrap').after(contentWrapperEnd);

				// Set the id on the index;
				$videoContainer.find('.video').attr('id', videoId + '-video-' + index);

				videoElId = $videoContainer.find('.video').attr('id');

				if (!videoId || videoId.length === 0) {
					// No youtube ID attribute or the attribute is blank
					return;
				}

				// If there is no youtube API script, insert it.
				if ($('script[src="' + CONST.IFRAME_API_SRC + '"]').length === 0) {

					var tag,
						firstScript;

					tag = document.createElement('script');
					tag.src = CONST.IFRAME_API_SRC;

					firstScript = document.getElementsByTagName('script')[0];
					firstScript.parentNode.insertBefore(tag, firstScript);

				}

				// Attach a new video object to the array of present youtube videos.
				(function(videoId, videoElId) {

					var playerObject = {
						height: '100%',
						width: '100%',
						videoId: videoId,
						videoElId: videoElId,
						events: {
							// The video has loaded to the page. Modify this function for preloaders etc.
							onReady: function() {
								$(document.getElementById(videoElId)).css('opacity', 1);
							},
							onStateChange: function(event) {
								$(document.getElementById(videoElId))
									.closest(SELECTORS.YOUTUBE_VARIANT)
									.trigger('youtubeStateChange.video', event);
							}
						}
					};

					youtubePlayerArray.push(playerObject);

				}(videoId, videoElId));

			});

			window.onYouTubeIframeAPIReady = function() {

				youtubePlayerArray.forEach(function(obj) {
					youtubeDictionary[obj.videoId] = new YT.Player(obj.videoElId, obj);
				});

			};

		};

		return {
			init: init,
			youtubeDictionary: youtubeDictionary
		};
	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// FORM DECORATOR
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Form validation with jQuery validate
	 *
	 * @namespace DDIGITAL.forms.decorator
	 * @memberOf DDIGITAL.forms
	 */
	NAMESPACE.forms.decorator = (function() {

		var CONST,
			CLASSES,
			SELECTORS,
			_animations,
			getSelectors,
			getFormFromElement,
			getCtrlHolderFromElement,
			getLabelTextFromCtrlHolder,
			getCtrlsInGroup,
			isFirstInGroup,
			formSummary,
			inlineErrors,
			errorPlacement,
			highlight,
			unhighlight,
			addAriaInvalid,
			createErrorMessage,
			setDisabledState,
			setLoadingState;

		CONST = {
			SUMMARY: {
				TYPES: {
					ERROR: 'error',
					WARNING: 'warning',
					INFO: 'info',
					SUCCESS: 'success'
				},
				SCROLL_TO: true
			},
			DATA: {
				DISABLED_ITEMS: 'form-disabled-items'
			}
		};

		CLASSES = {
			IS_VALID: 'is-valid',
			IS_ERROR: 'is-error',
			IS_SUCCESS: 'is-success',
			IS_INFO: 'is-info',
			IS_WARNING: 'is-warning',
			IS_LOADING: 'is-loading',
			SUMMARY: 'form-summary',
			SUMMARY_TITLE: 'form-summary-title',
			ERROR: 'error'
		};

		SELECTORS = {
			FORM: '.js-validate',
			SUMMARY: '.js-validate-summary',
			SUMMARY_INNER: '.form-summary',
			CTRL_HOLDER: '.ctrl-holder',
			CTRLS: '.ctrls',
			LABEL: '> label, > .label',
			LEGEND: 'legend, .legend',
			STATUS_MSG: '.status-msg',
			ELEMENTS: ':input, select'
		};

		_animations = (function() {
			var showSummary;

			showSummary = function($container, callback) {
				$container.css({
					display: 'none',
					opacity: 0
				});

				$container.velocity('slideDown', {
					duration: 150
				}).velocity({
					opacity: 1,
					duration: 200,
					onComplete: callback
				});
			};

			return {
				showSummary: showSummary
			};
		}());

		/**
		 * Returns the SELECTORS constant for use externally.
		 *
		 * @return {Object}
		 * @memberOf DDIGITAL.forms.decorator
		 */
		getSelectors = function() {
			return SELECTORS;
		};

		/**
		 * Returns the form of a particular form element
		 *
		 * @param {DOM} element Current form item
		 * @return {Object}
		 * @memberOf DDIGITAL.forms.decorator
		 */
		getFormFromElement = function(element) {
			return $(element).closest(SELECTORS.FORM);
		};

		/**
		 * Returns the form element's control holder given the form element itself
		 *
		 * @param {DOM} element Current form item
		 * @param {Boolean} ownParentOnly Flag to get it's own parent only
		 * @return {Object}
		 * @memberOf DDIGITAL.forms.decorator
		 */
		getCtrlHolderFromElement = function(element, ownParentOnly) {
			ownParentOnly = ownParentOnly || false;

			if ($(element).closest(SELECTORS.CTRLS).length > 0 && !ownParentOnly) {
				return $(element).closest(SELECTORS.CTRLS).closest(SELECTORS.CTRL_HOLDER);
			}

			return $(element).closest(SELECTORS.CTRL_HOLDER);
		};

		/**
		 * Returns the cleaned label text (removes all child elements and text)
		 *
		 * @param {jQuery} $ctrlHolder The ctrl-holder element
		 * @return {Object} Object returning formLabel and groupLabel text
		 * @memberOf DDIGITAL.forms.decorator
		 */
		getLabelTextFromCtrlHolder = function($ctrlHolder) {
			var $label = $ctrlHolder.find(SELECTORS.LABEL).filter(':visible'),
				groupLabelText = $ctrlHolder.closest('fieldset').find(SELECTORS.LEGEND).text(),
				labelText,
				_getCleanText;

			_getCleanText = function($elem) {
				// remove text from child elements, and whitespace
				return $elem.clone().children().remove().end().text().replace(/^\s+|\s+$/g, '');
			};

			// for options
			if ($ctrlHolder.find(SELECTORS.LABEL).length === 0) {
				if ($ctrlHolder.find('.option').length === 1) {
					$label = $ctrlHolder.find('.option > label');
				}
			}

			// grouped fields
			if ($ctrlHolder.closest(SELECTORS.CTRLS).length > 0) {
				$label = $ctrlHolder.closest(SELECTORS.CTRL_HOLDER).find(SELECTORS.LABEL);
			}

			labelText = _getCleanText($label);

			return {
				formLabel: labelText,
				groupLabel: labelText + '_' + groupLabelText
			};
		};

		/**
		 * Returns the form element's list of controls
		 *
		 * @param {DOM} element Current form item
		 * @return {jQuery}
		 * @memberOf DDIGITAL.forms.decorator
		 */
		getCtrlsInGroup = function(element) {
			var $ctrlHolder = getCtrlHolderFromElement(element);
			return $ctrlHolder.find(SELECTORS.ELEMENTS);
		};

		/**
		 * Returns true if control is the first in a group
		 *
		 * @memberOf DDIGITAL.forms.decorator
		 * @param {object} $ctrl Reference to control element
		 * @return {boolean}
		 */
		isFirstInGroup = function($ctrl) {
			var $ctrls = getCtrlsInGroup($ctrl);
			return $ctrls.first().is($ctrl);
		};

		/**
		 * Creation and placement of the form summary modules
		 *
		 * @namespace DDIGITAL.forms.decorator.formSummary
		 * @memberOf DDIGITAL.forms.decorator
		 */
		formSummary = (function() {
			var _renderListItem,
				_renderList,
				scrollTo,
				add,
				remove,
				_renderSummaryTitle,
				_renderSummaryDescription,
				_renderErrors;

			/**
			 * Renders a list item for an error
			 *
			 * @param {Object} error Error object item
			 * @return {jQuery}
			 * @private
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			_renderListItem = function(error) {
				/*
				Format of error is:
				{
					element: (elem) DOM Element of the input,
					message: (string) Error Message,
					method: (string) Error type e.g. email
				}
				*/

				var ctrl = error.element,
					$ctrl = $(error.element),
					$ctrlHolder = getCtrlHolderFromElement(error.element),
					$li = $('<li />'),
					$link,
					$label,
					labelText;

				// Only render error message once for each group
				if (NAMESPACE.forms.validate.isInGroup(ctrl) && !isFirstInGroup($ctrl)) {
					return;
				}

				labelText = getLabelTextFromCtrlHolder($ctrlHolder);

				$link = $('<a />', {
					href: '#' + $ctrl.attr('id'),
					html: error.message
				});

				$label = $('<strong />', {
					text: labelText.formLabel + ': '
				});

				$link.prepend($label);
				$li.append($link);

				return $li;
			};

			/**
			 * Renders given summary title
			 * @param {String} summaryTitle Title for error summary
			 * @param {Object} $errorContainer Container to inject title into
			 * @private
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			_renderSummaryTitle = function(summaryTitle, $errorContainer) {
				if (summaryTitle !== false) {
					var $summaryTitle = $('<div />', {
						class: CLASSES.SUMMARY_TITLE,
						html: $('<h2 />', {
							text: summaryTitle
						})
					});

					$errorContainer.append($summaryTitle);
				}
			};

			/**
			 * Renders given summary description
			 * @param {String} summaryDescription Description for error summary
			 * @param {Object} $errorContainer Container to inject description into
			 * @private
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			_renderSummaryDescription = function(summaryDescription, $errorContainer) {
				if (summaryDescription !== false) {
					var $summaryDescription = $('<p />', {
						text: summaryDescription
					});

					$errorContainer.append($summaryDescription);
				}
			};

			/**
			 * Renders list of errors
			 * @param {Array} errors List of errors form jQuery validate
			 * @param {Object} $errorContainer Container to inject error list into
			 * @private
			 */
			_renderErrors = function(errors, $errorContainer) {
				if (errors.length === 0) {
					return;
				}

				var $ul,
					$listTitle,
					listIntroText = 'The following',
					errorCount = 0;

				$ul = $('<ul />');

				for (var i = 0, len = errors.length; i < len; i += 1) {
					var $listItem = _renderListItem(errors[i]);

					if (typeof $listItem === 'object') {
						$ul.append($listItem);
						errorCount += 1;
					}
				}

				listIntroText += (errorCount > 1) ? ' ' + errorCount + ' fields contain errors:'
					: ' field contains an error:';

				$listTitle = $('<p />', {
					text: listIntroText
				});

				$errorContainer.append($listTitle);
				$errorContainer.append($ul);
			};

			/**
			 * Renders the list given errors, summaryTitle and summaryDescription
			 *
			 * @param {Object} type Type of summary to render (valid options 'error', 'warning', 'info', 'success')
			 * @param {Array} errors Error object array
			 * @param {String|Boolean} [summaryTitle=false] Optional title text to display
			 * @param {String|Boolean} [summaryDescription=false] Optional description text to display prepended to the list
			 * @return {jQuery}
			 * @private
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			_renderList = function(type, errors, summaryTitle, summaryDescription) {
				summaryTitle = summaryTitle || false;
				summaryDescription = summaryDescription || false;

				// don't render if nothing is passed through
				if (errors.length === 0 && summaryTitle === false && summaryDescription === false) {
					return false;
				}

				var containerClasses = [CLASSES.SUMMARY],
					$errorContainer;

				// types
				if (type === CONST.SUMMARY.TYPES.ERROR) {
					containerClasses.push(CLASSES.IS_ERROR);
				} else if (type === CONST.SUMMARY.TYPES.WARNING) {
					containerClasses.push(CLASSES.IS_WARNING);
				} else if (type === CONST.SUMMARY.TYPES.INFO) {
					containerClasses.push(CLASSES.IS_INFO);
				} else if (type === CONST.SUMMARY.TYPES.SUCCESS) {
					containerClasses.push(CLASSES.IS_SUCCESS);
				}

				$errorContainer = $('<div />', {
					class: containerClasses.join(' '),
					tabindex: '-1'
				});

				_renderSummaryTitle(summaryTitle, $errorContainer);
				_renderSummaryDescription(summaryDescription, $errorContainer);
				_renderErrors(errors, $errorContainer);

				return $errorContainer;
			};

			/**
			 * Scrolls the page to the current form summary
			 *
			 * @param {jQuery} $form Form containing the error summary
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			scrollTo = function($form) {
				var $summaryContainer = $form.find(SELECTORS.SUMMARY),
					pageTop = $(document).scrollTop(),
					pageBottom = pageTop + $(window).height(),
					offset,
					afterScroll;

				afterScroll = function() {
					$summaryContainer.find('.' + CLASSES.SUMMARY).eq(0).focus(); //TODO: REFACTOR THIS ONE
				};

				// display the container to get the position
				offset = $summaryContainer.offset().top - 50;

				if (offset > pageTop && offset < pageBottom) {
					afterScroll();
					// is currently in the page so don't scroll
					return;
				}

				// scroll the page
				NAMESPACE.util.scroll.page(offset, null, 250, afterScroll);
			};

			/**
			 * Renders the list given errors, summaryTitle and summaryDescription
			 *
			 * @param {Object} type Type of summary to render (valid options 'error', 'warning', 'info', 'success')
			 * @param {jQuery} $form Form to add the error summary to
			 * @param {Array} errors Error object array
			 * @param {String=false} summaryTitle Optional title text to display
			 * @param {String=false} summaryDescription Optional description text to display prepended to the list
			 * @param {Boolean=false} scrollToSummary Scroll to the summary message
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			add = function(type, $form, errors, summaryTitle, summaryDescription, scrollToSummary, skipAnimation) {
				summaryTitle = summaryTitle || false;
				summaryDescription = summaryDescription || false;
				scrollToSummary = scrollToSummary || CONST.SUMMARY.SCROLL_TO;
				skipAnimation = skipAnimation || false;

				var $summaryContainer = $form.find(SELECTORS.SUMMARY);

				if ($summaryContainer.length === 0) {
					return;
				}

				errors = errors || [];

				if (errors.length > 0 || summaryTitle || summaryDescription) {
					var $errorContainer = _renderList(type, errors, summaryTitle, summaryDescription);
					$summaryContainer.html($errorContainer);

					if (scrollToSummary) {
						scrollTo($form);
					}

					if (!skipAnimation) {
						_animations.showSummary($summaryContainer);
					}
				} else {
					remove($form);
				}
			};

			/**
			 * Removes the form summary from the page
			 *
			 * @param {jQuery} $form Form containing the error summary
			 * @memberOf DDIGITAL.forms.decorator.formSummary
			 */
			remove = function($form) {
				$form.find(SELECTORS.SUMMARY).empty();
			};

			return {
				scrollTo: scrollTo,
				add: add,
				remove: remove
			};
		}());

		/**
		 * Creation and placement of the inline error items
		 *
		 * @namespace DDIGITAL.forms.decorator.inlineErrors
		 * @memberOf DDIGITAL.forms.decorator
		 */
		inlineErrors = (function() {
			var add;

			/**
			 * Adds inline errors to the page
			 *
			 * @param {Array} errors Array of error objects
			 * @memberOf DDIGITAL.forms.decorator.inlineErrors
			 */
			add = function(errors) {
				if (errors.length > 0) {
					for (var i = 0, len = errors.length; i < len; i += 1) {
						var error = errors[i],
							validator = NAMESPACE.forms.validate.getValidatorFromElement(error.element);

						if (validator) {
							validator.showLabel(error.element, error.message);
						} else {
							errorPlacement(createErrorMessage(error.message), error.element);
						}

						addAriaInvalid(error.element);
						highlight(error.element);
					}
				}
			};

			return {
				add: add
			};
		}());

		/**
		 * Place the error message into the page
		 *
		 * @param {jQuery} $error Error jQuery object
		 * @param {DOM} element Form element on the page
		 * @memberOf DDIGITAL.forms.decorator
		 */
		errorPlacement = function($error, element) {
			var $ctrlHolder = getCtrlHolderFromElement(element),
				$statusContainer = $ctrlHolder.find(SELECTORS.STATUS_MSG);

			$statusContainer.html($error);
		};

		/**
		 * Highlight the ctrl holder when an error has occurred
		 *
		 * @param {DOM} element Form element on the page
		 * @memberOf DDIGITAL.forms.decorator
		 */
		highlight = function(element) {
			var $ctrlHolder = getCtrlHolderFromElement(element);
			$ctrlHolder.removeClass(CLASSES.IS_VALID).addClass(CLASSES.IS_ERROR);
		};

		/**
		 * Unhighlight the ctrl holder when an error has been cleared
		 *
		 * @param {DOM} element Form element on the page
		 * @memberOf DDIGITAL.forms.decorator
		 */
		unhighlight = function(element) {
			var $ctrlHolder = getCtrlHolderFromElement(element);
			$ctrlHolder.addClass(CLASSES.IS_VALID).removeClass(CLASSES.IS_ERROR);
		};

		/**
		 * Adds aria-invalid to an element
		 *
		 * @param {DOM} element Form element on the page
		 * @memberOf DDIGITAL.forms.decorator
		 */
		addAriaInvalid = function(element) {
			$(element).attr('aria-invalid', 'true');
		};

		/**
		 * Create the error message for positioning on the page
		 *
		 * @param {DOM} message Message to be displayed as text
		 * @return {jQuery}
		 * @memberOf DDIGITAL.forms.decorator
		 */
		createErrorMessage = function(message) {
			return $('<div />', {
				class: CLASSES.ERROR,
				html: message
			});
		};

		/**
		 * Enables or Disables all the forms fields in the form. Will not
		 * re-enable form fields that were previously disabled.
		 *
		 * @param {jQuery} $form Form element on the page
		 * @param {Boolean} state Whether to enable or disable the fields
		 * @memberOf DDIGITAL.forms.decorator
		 */
		setDisabledState = function($form, state) {
			var setElementToDisabled = function($items, state) {
				$items.prop('disabled', state);
			};

			if (state) {
				var $itemsToDisable = $form.find(SELECTORS.ELEMENTS).not(':disabled');

				$form.data(CONST.DATA.DISABLED_ITEMS, $itemsToDisable);

				setElementToDisabled($itemsToDisable, true);
			} else {
				var $disabledItems = $form.data(CONST.DATA.DISABLED_ITEMS);

				if ($disabledItems) {
					setElementToDisabled($disabledItems, false);
				}
			}
		};

		/**
		 * Set the form to display or hide the loading state
		 *
		 * @param {jQuery} $form Form element on the page
		 * @param {Boolean} state Whether to enable or disable the loading state
		 * @memberOf DDIGITAL.forms.decorator
		 */
		setLoadingState = function($form, state) {
			$form.attr('aria-busy', state);

			if (state) {
				$form.addClass(CLASSES.IS_LOADING);
			} else {
				$form.removeClass(CLASSES.IS_LOADING);
			}
		};

		return {
			getSelectors: getSelectors,
			getFormFromElement: getFormFromElement,
			getCtrlHolderFromElement: getCtrlHolderFromElement,
			getLabelTextFromCtrlHolder: getLabelTextFromCtrlHolder,
			getCtrlsInGroup: getCtrlsInGroup,
			isFirstInGroup: isFirstInGroup,
			formSummary: formSummary,
			inlineErrors: inlineErrors,
			errorPlacement: errorPlacement,
			highlight: highlight,
			unhighlight: unhighlight,
			addAriaInvalid: addAriaInvalid,
			createErrorMessage: createErrorMessage,
			setDisabledState: setDisabledState,
			setLoadingState: setLoadingState
		};

	}());

}(DDIGITAL));
/* ==========================================================================
 * FORM ELEMENT TRACKER
 * ========================================================================== */

/**
 * Form field Event Tracker.
 * This can be used for analytics purposes as well as determining whether the user made any changes
 * to the form.
 *
 * @todo Consider re-writing this as a jQuery plugin and make isDirty and isValid public methods
 */

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * @class ElementTracker
	 * @memberOf DDIGITAL.forms
	 *
	 * @param {object} $form jQuery reference to the form container
	 * @param {object} $ctrl jQuery reference to the control
	 * @param {object} settings Default settings hash
	 * @constructor
	 */
	var ElementTracker = function($form, $ctrl, settings) {
		this.$form = $form;
		this.validator = this.$form.data('validator');
		this.$ctrl = $ctrl;

		this.defaults = {
			debounce: 100
		};
		this.settings = $.extend(true, this.settings, this.defaults, settings);
	};

	/**
	 * @type {{previousValue: null, $ctrl: null, validator: null, settings: {}, init: DDIGITAL.form.ElementTracker.init, _isValid: DDIGITAL.form.ElementTracker._isValid, _isDirty: DDIGITAL.form.ElementTracker._isDirty, _emitSuccess: DDIGITAL.form.ElementTracker._emitSuccess, _emitError: DDIGITAL.form.ElementTracker._emitError, _trackGeneric: DDIGITAL.form.ElementTracker._trackGeneric, _trackCheckbox: DDIGITAL.form.ElementTracker._trackCheckbox, _trackRadio: DDIGITAL.form.ElementTracker._trackRadio, _trackGroup: DDIGITAL.forms.ElementTracker._trackGroup}}
	 */
	ElementTracker.prototype = {

		previousValue: null,
		validator: null,
		settings: {},

		/**
		 * Initialize form field tracker class
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		init: function() {

			if (this.$ctrl.data('elementTracker.initialised') === true) {
				return false;
			}

			this.isGroup = NAMESPACE.forms.validate.isInGroup(this.$ctrl);

			if (this.isGroup) {

				// If is first in group
				if (NAMESPACE.forms.decorator.getCtrlsInGroup(this.$ctrl).first().is(this.$ctrl)) {
					this._trackGroup();
				}

			} else {

				if (this.$ctrl[0].type === 'text' || this.$ctrl[0].type === 'password' || this.$ctrl[0].tagName === 'SELECT') {
					this._trackGeneric();
				}

				if (this.$ctrl[0].type === 'checkbox') {
					this._trackCheckbox();
				}

				if (this.$ctrl[0].type === 'radio') {
					this._trackRadio();
				}
			}

			this.$ctrl.data('elementTracker.initialised', true);
		},

		/**
		 * Determines if the control is currently valid by inspecting the jQuery validate validator instance
		 * @returns {boolean}
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_isValid: function() {
			var valid = true;

			// Check if the errorMap has a corresponding error
			if (this.validator.errorMap.hasOwnProperty(this.$ctrl[0].name)) {
				valid = false;
			}

			return valid;
		},

		/**
		 * Returns true if a control is dirty
		 * @returns {boolean}
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_isDirty: function() {
			return this.validator.submitted[this.$ctrl[0].name] !== undefined;
		},

		/**
		 * Emits success event to the FormTracker instance that this ElementTracker instance is a child of
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_emitSuccess: function() {
			this.$ctrl.trigger('element-success.track', [this.$ctrl]);
		},

		/**
		 * Emits error event to the FormTracker instance that this ElementTracker instance is a child of
		 * @returns {boolean}
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_emitError: function() {
			var errorMsg = '';

			if (this.isGroup) {
				// Will just have to grab this straight from the DOM :/
				errorMsg = $('#' + this.$ctrl[0].id + '-error').text();
			} else {
				try {
					errorMsg = this.validator.errorMap[this.$ctrl[0].id];
				} catch (e) {
					return false;
				}
			}
			this.$ctrl.trigger('element-error.track', [this.$ctrl, errorMsg]);
		},

		/**
		 * Listens for change events on the following input types:
		 * - input[type="text"]
		 * - input[type="password"]
		 * - select
		 * - select[multiple="multiple"]
		 *
		 * @todo add support for autocomplete and datepicker elements
		 *
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_trackGeneric: function() {
			var _this = this;

			function change() {
				var currentValue = _this.$ctrl.val();

				if (_this.previousValue === currentValue) {
					return false;
				}

				if (_this.$ctrl.val() !== '' && _this._isValid()) {
					_this._emitSuccess();
				}
				if ((_this.$ctrl.val() !== '' || _this._isDirty()) && !_this._isValid()) {
					_this._emitError();
				}

				_this.previousValue = currentValue;
			}

			// Delay change event callback so that validator instance has time to start reflecting the change first
			this.$ctrl.on('change.track', this.settings.debounce !== false ? $.debounce(this.settings.debounce, change) : change);
		},

		/**
		 * Listens for changes events on checkboxes
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_trackCheckbox: function() {
			var _this = this;

			function change() {
				var currentValue = _this.$ctrl.is(':checked');

				if (_this.previousValue === currentValue) {
					return false;
				}

				// If the checkbox is checked and is considered valid
				if (_this.$ctrl.is(':checked') && _this._isValid()) {
					_this._emitSuccess();
				}

				// If the checkbox is not checked and is invalid
				if (!_this.$ctrl.is(':checked') && !_this._isValid()) {
					_this._emitError();
				}

				_this.previousValue = currentValue;
			}

			// Delay change event callback so that validator instance has time to start reflecting the change first
			this.$ctrl.on('change.track', this.settings.debounce !== false ? $.debounce(this.settings.debounce, change) : change);
		},

		/**
		 * Listens for changes events on radio buttons
		 * @inner
		 * @memberOf DDIGITAL.form.ElementTracker
		 * @private
		 */
		_trackRadio: function() {
			var _this = this;

			function change() {
				var $checked = $('input[name="' + _this.$ctrl[0].name + '"]:checked');

				// If the radio is checked and is considered valid
				if ($checked.length && _this._isValid()) {
					_this._emitSuccess();
				}

				// If the radio is not checked and is invalid
				if (!$checked.length && !_this._isValid()) {
					_this._emitError();
				}
			}

			// Delay change event callback so that validator instance has time to start reflecting the change first
			this.$ctrl.on('change.track', this.settings.debounce !== false ? $.debounce(this.settings.debounce, change) : change);
		},

		/**
		 * Tracks a control group marked with the .v_group class
		 * @private
		 */
		_trackGroup: function() {
			var _this = this,
				$ctrls = NAMESPACE.forms.decorator.getCtrlsInGroup(this.$ctrl),
				$ctrlsHolder = NAMESPACE.forms.decorator.getCtrlHolderFromElement(this.$ctrl, false);

			function change() {
				var complete = true,
					checkboxOrRadioInGroup = false,
					anyChecked = false,
					isValid = NAMESPACE.forms.validate.isGroupValid($ctrlsHolder),
					currentValue = '';

				$ctrls.each(function() {
					var _$ctrl = $(this);

					if (_$ctrl.is(':checkbox') || _$ctrl.is(':radio')) {
						checkboxOrRadioInGroup = true;
						if (_$ctrl.is(':checked')) {
							anyChecked = true;
						}

						if (_$ctrl.is(':checkbox') && _$ctrl.is(':checked')) {
							currentValue += _$ctrl[0].name;
						}
						if (_$ctrl.is(':radio')) {
							currentValue += $('input[name="' + _$ctrl[0].name + '"]').val();
						}
					} else {
						// Assume we're dealing with a select or text input
						if (_$ctrl.val() === '' || _$ctrl.val() === null) {
							complete = false;
						}

						currentValue += _$ctrl.val();
					}
				});

				if (_this.previousValue === currentValue) {
					return false;
				}

				// Check if group's fields are complete and without errors
				if (complete === true && isValid) {
					// If there is a checkbox or radio button in the group, one of them must be checked
					if (checkboxOrRadioInGroup) {
						if (anyChecked) {
							_this._emitSuccess();
						}
					} else {
						_this._emitSuccess();
					}
				} else if (!isValid) {
					_this._emitError();
				}

				_this.previousValue = currentValue;
			}

			$ctrls.each(function() {
				var $ctrl = $(this);
				$ctrl.on('change.track', _this.settings.debounce !== false ? $.debounce(_this.settings.debounce, change) : change);
			});
		}
	};

	NAMESPACE.forms.ElementTracker = ElementTracker;

}(DDIGITAL, jQuery));
// ==========================================================================
// MULTI STEP FORM
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * Mixins namespace
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins
	 * @memberof DDIGITAL.forms.multistep
	 */
	NAMESPACE.forms.multistep.mixins = NAMESPACE.forms.multistep.mixins || {};

	/**
	 * Multi step forms
	 *
	 * @namespace DDIGITAL.forms.multiStep
	 * @memberOf DDIGITAL.forms
	 */
	NAMESPACE.forms.multiStep = (function() {
		var init,
			liveForm,
			_initProgressBar;

		_initProgressBar = function($bar, $container, service) {
			var progressBar;

			progressBar = new NAMESPACE.forms.multistep.ProgressBar($bar, {
				onStepClick: function(evt, step) {
					evt.preventDefault();
					liveForm.switchStep(step);
				}
			});
			progressBar.init(service);

			$container.on('step-change.liveform', function(evt, currentStep) {
				progressBar.setState(currentStep);
			});
		};

		init = function($scope) {
			$scope = $scope || $('body');

			$scope.find('.js-multistep').each(function() {
				var $container = $(this),
					formData = $container.data('form-multistep'),
					options = {
						form: formData,
						currentStep: $container.data('form-multistep-current-step')
					},
					service,
					router;

				service = NAMESPACE.forms.multistep.service.init(formData, {});

				router = NAMESPACE.forms.multistep.router.init({
					onStateChange: function(evt) {
						var step = evt.state;
						liveForm.switchStep(step);
					}
				});

				$scope.find('.js-form-progress').each(function() {
					_initProgressBar($(this), $container, service);
				});

				// Should we be loading the current step asynchronously?
				if ($container.data('form-multistep-partial') !== undefined) {
					options.partial = $container.data('form-multistep-partial');
				}

				switch (formData.type) {
					case 'wizard':
						NAMESPACE.forms.multistep.mixins.Wizard.call(NAMESPACE.forms.multistep.LiveForm.prototype);
						break;
					case 'accordion':
						NAMESPACE.forms.multistep.mixins.Accordion.call(NAMESPACE.forms.multistep.LiveForm.prototype);
						break;
					case 'onepage':
						NAMESPACE.forms.multistep.mixins.OnePage.call(NAMESPACE.forms.multistep.LiveForm.prototype);
						break;
					default:
						console.warn('Unsupported form type: \'' + formData.type + '\'');
				}

				// Grab some settings from data attributes and such ..
				liveForm = new NAMESPACE.forms.multistep.LiveForm($container, options);
				liveForm.init(service, router);

			});
		};

		return {
			init: init
		};

	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// LIVE FORMS
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Form validation with jQuery validate
	 *
	 * @namespace DDIGITAL.forms.sync
	 * @memberOf DDIGITAL.forms
	 */
	NAMESPACE.forms.sync = (function() {
		var OPTIONS,
			SELECTORS,
			_parseSyncData,
			_renderSummaryAndErrors,
			_syncForm,
			_handleAjaxRequest,
			_syncFormOnLoad,
			_syncFormOnSubmit,
			handleNetworkError,
			init;

		OPTIONS = {
			AJAX_TIMEOUT: 10000,
			AJAX_MIN_DELAY: 2000,
			DATA: {
				IS_INIT: 'form-sync-is-init',
				SYNC: 'form-sync',
				STATUS: 'form-status',
				FORCE_SUBMIT: 'form-sync-force-submit',
				REQUEST: 'form-sync-request'
			},
			NEXT: {
				ACTIONS: {
					partial: function($form, value) {
						$form.trigger('next-action-partial.sync', value);
					},
					redirect: function($form, value) {
						window.location = value.redirect;
					},
					reset: function($form, value) {
						if (value.reset === true) {
							$form.get(0).reset();
							NAMESPACE.forms.validate.reset($form);
						}
					},
					submit: function($form, value) {
						if (value.submit === true) {
							$form.data(OPTIONS.DATA.FORCE_SUBMIT, true);
							NAMESPACE.forms.decorator.setDisabledState($form, false);

							$form.get(0).submit();
						}
					}
				}
			},
			ERRORS: {
				CONNECTION_ERROR: {
					status: [
						{
							type: 'warning',
							title: 'Connection error',
							description: 'There has been a connection error with the server. Please check your internet connection and try again.'
						}
					]
				}
			}
		};

		SELECTORS = {
			SYNC_FORM: '.js-validate-sync'
		};

		/**
		 * @param {Object} data JSON data as returned from endpoint
		 * @returns {{status: boolean, next: boolean}}
		 * @private
		 * @inner
		 * @memberOf DDIGITAL.forms.sync
		 */
		_parseSyncData = function(data) {
			if (!data.status && !data.next) {
				throw new Error('DDIGITAL.forms.sync: Invalid JSON format. Expected at least a `status` or `next` item.');
			}

			var syncObject = {
				status: false,
				next: false
			};

			if (data.status) {
				syncObject.status = [];

				for (var i = 0, len = data.status.length; i < len; i += 1) {
					var statusData = data.status[i];

					var statusItem = {
						type: statusData.type || '',
						title: statusData.title || false,
						description: statusData.description || false,
						controls: []
					};

					if (statusData.controls) {
						for (var i = 0, len = statusData.controls.length; i < len; i += 1) {
							var control = statusData.controls[i],
								$element = $('#' + control.id);

							if ($element.length === 0) {
								$element = $('[name="' + control.id + '"]');
							}

							if ($element.length > 0) {
								statusItem.controls.push({
									element: $element.get(0),
									message: control.message
								});
							}
						}
					}

					syncObject.status.push(statusItem);
				}
			}

			if (data.next) {
				var found = false;

				for (var type in OPTIONS.NEXT.ACTIONS) {
					if (OPTIONS.NEXT.ACTIONS.hasOwnProperty(type) && data.next.hasOwnProperty(type)) {
						syncObject.next = data.next;
						syncObject.action = OPTIONS.NEXT.ACTIONS[type];
						found = true;
					}
				}

				if (!found) {
					console.warn('DDIGITAL.forms.sync: Invalid next action passed:', data.next);
				}
			}

			return syncObject;
		};

		/**
		 * Triggers error summary and inline error rendering by delegating to the decorator
		 *
		 * @param {Object} $form Reference to the form element
		 * @param {Array} statuses Array of status objects
		 * @param {Boolean} skipAnimation Defaults to false
		 * @private
		 * @inner
		 * @memberOf DDIGITAL.forms.sync
		 */
		_renderSummaryAndErrors = function($form, statuses, skipAnimation) {
			skipAnimation = skipAnimation || false;

			for (var i = 0, len = statuses.length; i < len; i += 1) {
				var status = statuses[i];

				NAMESPACE.forms.decorator.formSummary.add(status.type, $form, status.controls, status.title, status.description, true, skipAnimation);

				if (status.type === 'error') {
					NAMESPACE.forms.decorator.inlineErrors.add(status.controls);
				}
			}
		};

		/**
		 * Takes JSON response data returned from server and triggers a render of the errors
		 * contained in it
		 *
		 * @param {Object} $form Reference to the form element
		 * @param {Object} data The data that was returned form the server
		 * @param {Boolean} skipAnimation Animation of the form summary yes/no
		 * @private
		 * @inner
		 * @memberOf DDIGITAL.forms.sync
		 */
		_syncForm = function($form, data, skipAnimation) {
			skipAnimation = skipAnimation || false;

			var syncObject = _parseSyncData(data);

			if (typeof data.next === 'object') {
				$form.trigger('submit-success.sync', data.next);
			}

			if (typeof (syncObject.action) === 'function') {
				syncObject.action($form, syncObject.next);
			}

			if (syncObject.status !== false && typeof data.next !== 'object') {
				$form.trigger('submit-invalid.sync');
				_renderSummaryAndErrors($form, syncObject.status, skipAnimation);
			}
		};

		/**
		 * Serialises form data and triggers async submission
		 *
		 * @param {HTMLElement} form Reference to unpacked form element
		 * @private
		 */
		_handleAjaxRequest = function(form) {
			var $form = $(form);

			if ($form.data(OPTIONS.DATA.REQUEST)) {
				// abort a request if already running
				$form.data(OPTIONS.DATA.REQUEST).abort();
				$form.data(OPTIONS.DATA.REQUEST, false);
			}

			var url = $form.data(OPTIONS.DATA.SYNC),
				method = $form.attr('method') || 'post',
				data = $form.serialize(),
				isReady = true,
				actionsAfterReady = [];

			$form.trigger('submit-start.sync');

			setTimeout(function() {
				isReady = true;

				while (actionsAfterReady.length) {
					actionsAfterReady.shift().call();
				}
			}, OPTIONS.AJAX_MIN_DELAY);

			// set the form to loading state
			NAMESPACE.forms.decorator.setLoadingState($form, true);
			NAMESPACE.forms.decorator.setDisabledState($form, true);

			// do ajax call
			var request = $.ajax({
				timeout: OPTIONS.AJAX_TIMEOUT,
				type: method,
				dataType: 'json',
				url: url,
				data: data
			});

			// save the request where it can be retrieved
			$form.data(OPTIONS.DATA.REQUEST, request);

			// on success of the sync ajax call
			request.then(function(data) {
				if (isReady) {
					_syncForm($form, data);
				} else {
					actionsAfterReady.push(function() {
						_syncForm($form, data);
					});
				}
			});

			// on fail of the ajax call
			request.fail(function() {
				if (isReady) {
					handleNetworkError($form);
				} else {
					actionsAfterReady.push(function() {
						handleNetworkError($form);
					});
				}
			});

			// on success or failure
			request.always(function() {
				$form.data(OPTIONS.DATA.REQUEST, false);

				if (isReady) {
					NAMESPACE.forms.decorator.setLoadingState($form, false);
					NAMESPACE.forms.decorator.setDisabledState($form, false);
					$form.trigger('submit-end.sync');
				} else {
					actionsAfterReady.push(function() {
						NAMESPACE.forms.decorator.setLoadingState($form, false);
						NAMESPACE.forms.decorator.setDisabledState($form, false);
						$form.trigger('submit-end.sync');
					});
				}
			});
		};

		/**
		 * Handles submit event on form
		 *
		 * @param {Object} event Submit event
		 * @private
		 */
		_syncFormOnSubmit = function(event) {
			var $form = $(this),
				validator = NAMESPACE.forms.validate.getValidatorFromElement(this);

			// allow client side validation to do it's thing.
			if (validator.errorList.length > 0 || validator.pendingRequest > 0) {
				return;
			}

			// force default submission if it's enabled
			if ($form.data(OPTIONS.DATA.FORCE_SUBMIT) === true) {
				return;
			}

			event.preventDefault();

			NAMESPACE.forms.decorator.formSummary.remove($form);

			_handleAjaxRequest(this);
		};

		/**
		 * Grabs JSON string from status attribute and renders errors any contained in it
		 *
		 * @param {Object} $form Reference to form element
		 * @private
		 */
		_syncFormOnLoad = function($form) {
			var json = $form.data(OPTIONS.DATA.STATUS);

			if (typeof (json) === 'undefined') {
				return;
			}

			if (typeof (json) === 'string' && json === '') {
				console.warn('DDIGITAL.forms.sync: Empty string in `data-form-status`, ignoring.');
				return;
			}

			if (typeof (json) === 'string') {
				throw new Error('DDIGITAL.forms.sync: Invalid JSON data entered into the `data-form-status` attribute.');
				return;
			}

			_syncForm($form, json, true);
		};

		/**
		 * Renders error message that tells user a network issue occurred
		 * @param {Object} $form jQuery reference to form element
		 * @memberOf DDIGITAL.forms.sync
		 */
		handleNetworkError = function($form) {
			_syncForm($form, OPTIONS.ERRORS.CONNECTION_ERROR);
			$form.trigger('submit-fail.sync', OPTIONS.ERRORS.CONNECTION_ERROR);
		};

		/**
		 * @memberOf DDIGITAL.forms.sync
		 */
		init = function() {
			$(SELECTORS.SYNC_FORM).each(function(i, el) {
				var $form = $(el);

				// ensure it can't be enabled twice
				if ($form.data(OPTIONS.DATA.IS_INIT) === true) {
					return;
				}

				// is initialised
				$form.data(OPTIONS.DATA.IS_INIT, true);

				// show the error/status on page load
				_syncFormOnLoad($form);

				// don't bind the form submit code if a url endpoint isn't specified
				if (typeof ($form.data(OPTIONS.DATA.SYNC)) !== 'string') {
					console.warn('DDIGITAL.forms.sync: URL not provided, sync on submission not enabled.');
					return;
				}

				$form.on('submit.ddSync', _syncFormOnSubmit);
			});
		};

		return {
			init: init
		};

	}());

}(DDIGITAL));
// ==========================================================================
// FORM VALIDATION
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Form validation with jQuery validate
	 *
	 * @namespace validate
	 * @memberOf DDIGITAL
	 */
	NAMESPACE.forms.validate = (function() {

		var CONST,
			CLASSES,
			SELECTORS,
			getValidatorFromElement,
			_getGroupsInForm,
			isGroupValid,
			isInGroup,
			reset,
			resetScope,
			resetInput,
			isDirty,
			_onFocusOutHandler,
			setValidationDelay,
			init;

		CONST = {
			IS_DEBUG: false,
			SUMMARY: {
				TYPE: 'error',
				TITLE: 'There are some validation issues.'
			}
		};

		CLASSES = {
			ERROR: 'error'
		};

		SELECTORS = {
			FORM: '.js-validate',
			IGNORE: '.v-ignore, :hidden, [disabled]',
			RESET: 'input[type="reset"], button[type="reset"]'
		};

		/**
		 * Gets the validator object from the current element
		 *
		 * @param {DOM Object} element DOM element of a form item
		 * @memberOf DDIGITAL.forms.validate
		 */
		getValidatorFromElement = function(element) {
			return NAMESPACE.forms.decorator.getFormFromElement(element).validate();
		};

		/**
		 * Parses the form object and groups form elements together if they
		 * are in the standard group format.
		 *
		 * @param {jQuery Object} $form jQuery DOM Object of the form
		 * @return {Object}
		 * @private
		 * @memberOf DDIGITAL.forms.validate
		 */
		_getGroupsInForm = function($form) {
			var groups = {};

			// if the form item is inside a .ctrls container, it's a grouped control.
			$form.find(NAMESPACE.forms.decorator.getSelectors().CTRLS).each(function(i, el) {
				var $group = $(el),
					$ctrls = $group.find(NAMESPACE.forms.decorator.getSelectors().ELEMENTS),
					key = $ctrls.first().attr('id'),
					ids = [];

				$ctrls.each(function(i, ctrl) {
					ids.push($(ctrl).attr('id'));
				});

				groups[key] = ids.join(' ');
			});

			return groups;
		};

		/**
		 * Given a single form element, returns true if the group of
		 * fields associated with it are all valid as well.
		 *
		 * @param {DOM Object} element DOM element of a form element
		 * @return {Boolean}
		 * @private
		 * @memberOf DDIGITAL.forms.validate
		 */
		isGroupValid = function(element) {
			var valid = true,
				$ctrls = NAMESPACE.forms.decorator.getCtrlsInGroup(element),
				validator = getValidatorFromElement(element);

			// iterate each control in the group
			$ctrls.each(function(i, ctrl) {
				var id = $(ctrl).attr('id');

				// check if the errorMap has a corresponding error
				if (validator.errorMap.hasOwnProperty(id)) {
					valid = false;
				}
			});

			return valid;
		};

		/**
		 * Detects if the given form element is inside a group or not.
		 *
		 * @param {DOM Object} element DOM element for a form item
		 * @return {Boolean}
		 * @memberOf DDIGITAL.forms.validate
		 */
		isInGroup = function(element) {
			var validator = getValidatorFromElement(element),
				groupsMap;

			// search for the element inside the list of validator groups
			groupsMap = $.map(validator.groups, function(groupName, controlName) {
				return (controlName.indexOf($(element).attr('id')) >= 0);
			});

			return (groupsMap.indexOf(true) !== -1);
		};

		/**
		 * Returns true if a control is dirty, meaning that it holds or has held a value
		 * @returns {boolean}
		 * @param {Element} element HTML input element
		 * @memberOf DDIGITAL.forms.validate
		 */
		isDirty = function(element) {
			var validator = getValidatorFromElement(element);
			return validator.submitted[element.name] !== undefined;
		};

		/**
		 * Resets the form back to it's original state and removes error
		 * messages and summary messages.
		 *
		 * @param {jQuery Object} $form jQuery DOM Object of the form
		 * @memberOf DDIGITAL.forms.validate
		 */
		reset = function($form, removeSummary) {
			removeSummary = removeSummary || false;
			$form.validate().resetForm();

			if (removeSummary) {
				NAMESPACE.forms.decorator.formSummary.remove($form);
			}
		};

		/**
		 * Resets the inputs within container
		 * @param {Object} $container jQuery container object
		 * @memberOf DDIGITAL.forms.validate
		 */
		resetScope = function($container) {
			$container.find('input, select, textarea').each(function(i, el) {
				resetInput(el);
			});
		};

		/**
		 * Resets the input or input group to be empty or unchecked
		 * @param {Element} input Element from within the doWhen scope
		 * @memberOf DDIGITAL.forms.validate
		 */
		resetInput = function(input) {
			var $input = $(input);

			if (NAMESPACE.forms.validate.isInGroup(input)) {
				var $ctrls = NAMESPACE.forms.decorator.getCtrlsInGroup(input);

				$ctrls.each(function(i, el) {
					var $ctrl = $(el);

					if ($ctrl.is(':checkbox') || $ctrl.is(':radio')) {
						$ctrl.prop('checked', false);
					} else {
						$ctrl.val('');
					}
				});
			} else if ($input.is(':radio') || $(input).is(':checkbox')) {
				$input.prop('checked', false);
			} else {
				$input.val('');
			}

			// remove inline validation
			NAMESPACE.forms.decorator.unhighlight(input);
		};

		/**
		 * Checks element type and triggers validate accordingly
		 * @param {Element} element Element to be validated
		 * @inner
		 * @memberOf DDIGITAL.forms.validate
		 * @private
		 */
		_onFocusOutHandler = function(element) {
			// Prevent error state from tabbing through controls in a
			// group when form submission has not been attempted yet.
			if (NAMESPACE.forms.validate.isInGroup(element)) {
				var $ctrls = NAMESPACE.forms.decorator.getCtrlsInGroup(element),
					hasValue = true;

				// Loop through all the controls to check if they have all been filled out
				$ctrls.each(function(i, el) {
					var $ctrl = $(el);

					if (($ctrl.is(':checkbox') || $ctrl.is(':radio')) && !$ctrl.is(':checked')) {
						// if the item is a radio or checkbox and isn't checked don't validate it
						hasValue = false;
					} else {
						// if the value of the non radio/checkbox item is empty/null or 0 don't validate it
						if ($ctrl.val() === '' || $.trim($ctrl.val()) === '0' || $ctrl.val() === null) {
							hasValue = false;
						}
					}
				});

				if (hasValue) {
					// this.element validates the form - not returning this will not validate the element
					this.element(element);
				}

				return;
			}

			if (!this.checkable(element) && (isDirty(element) || !this.optional(element))) {
				this.element(element);
			}
		};

		/**
		 * Set validation delay on element
		 * @param {Element} element HTML element
		 * @param {Number} delay Delay in milliseconds
		 * @memberOf DDIGITAL.forms.validate
		 */
		setValidationDelay = function(element, delay) {
			$(element).data('validation-delay', delay);
		};

		/**
		 * Searches for each form that requires validation and applies the
		 * jQuery Validate plugin to it.
		 *
		 * @memberOf DDIGITAL.forms.validate
		 */
		init = function($scope) {
			$scope = $scope || $('body');

			$scope.find(SELECTORS.FORM).each(function(i, el) {
				var $form = $(el);

				// initialise the form validation plugin
				$form.validate({
					debug: CONST.IS_DEBUG,
					errorClass: CLASSES.ERROR,
					ignore: SELECTORS.IGNORE,
					errorElement: 'span',
					ignoreTitle: true,
					groups: _getGroupsInForm($form),
					focusInvalid: false,
					errorPlacement: function($error, element) {
						NAMESPACE.forms.decorator.errorPlacement($error, element);
					},
					highlight: function(element) {
						NAMESPACE.forms.decorator.highlight(element);
					},
					unhighlight: function(element) {
						NAMESPACE.forms.decorator.unhighlight(element);
					},
					invalidHandler: function(event, validator) {
						NAMESPACE.forms.decorator.formSummary.add(CONST.SUMMARY.TYPE, $(this), validator.errorList, CONST.SUMMARY.TITLE);
					},
					success: function(error, element) {
						// if the element is in a group and the entire group isn't valid
						// don't validate the group at all
						if (isInGroup(element) && !isGroupValid(element)) {
							return;
						}

						NAMESPACE.forms.decorator.unhighlight(error, element);
					},
					onfocusout: function(element) {
						var validationDelay = $(element).data('validation-delay');

						if (validationDelay !== undefined && validationDelay !== false) {
							setTimeout(function() {
								_onFocusOutHandler.call(this, element);
							}.bind(this), validationDelay);
						} else {
							_onFocusOutHandler.call(this, element);
						}
					}
				});

				// reset the form on the reset button click
				$form.on('click.validate', SELECTORS.RESET, function() {
					reset($form, true);
				});
			});
		};

		return {
			getValidatorFromElement: getValidatorFromElement,
			isInGroup: isInGroup,
			isGroupValid: isGroupValid,
			reset: reset,
			resetScope: resetScope,
			resetInput: resetInput,
			isDirty: isDirty,
			setValidationDelay: setValidationDelay,
			init: init
		};

	}());

}(DDIGITAL));
// ==========================================================================
// LIVEFORM - ACCORDION MIXIN
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL.forms
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * Mixins namespace
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins
	 * @memberof DDIGITAL.forms.multistep
	 */
	NAMESPACE.forms.multistep.mixins = NAMESPACE.forms.multistep.mixins || {};

	/**
	 * Mixin for liveForm type accordion
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins.Accordion
	 * @memberOf DDIGITAL.forms.multistep.mixins
	 */
	NAMESPACE.forms.multistep.mixins.Accordion = function() {

		/**
		 * Manipulates step DOM node prior to it being inserted into the DOM
		 *
		 * @param {Object} $step Reference to step DOM node
		 */
		this.beforeInsertStep = function($step) {
			$step.addClass('hidden step-enter');
		};

		//this.afterInsertStep = function($step, step) {};

		/**
		 * Animates a step into view before calling the callback which will trigger the activation
		 * of the step
		 *
		 * @param {Object} $step Reference to step DOM node
		 * @param {Function} callback Should be triggered when step should be activated
		 */
		this.animateStepIn = function($step, callback) {
			$step
				.removeClass('hidden step-leave step-leave-active')
				.addClass('step-enter-active');

			setTimeout(function() {
				callback();
				$step.removeClass('step-enter step-enter-active');
			}, 500);
		};

		/**
		 * Animates a step out of view before calling the callback which will trigger the
		 * animateStepIn sequence
		 *
		 * @param {Object} $step Reference to step DOM node
		 * @param {Function} callback When triggered, the animateStepIn sequence will start
		 */
		this.animateStepOut = function($step, callback) {
			$step
				.removeClass('step-enter step-enter-active')
				.addClass('step-leave step-leave-active');

			setTimeout(function() {
				$step
					.addClass('hidden')
					.removeClass('step-leave step-leave-active');
				callback();
			}, 300);
		};
	};

}(DDIGITAL));
// ==========================================================================
// MULTI STEP FORM LIVEFORM CLASS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL.forms
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * @class LiveForm
	 * @memberOf DDIGITAL.forms.multistep
	 *
	 * @param {object} $LiveForm jQuery reference to the form wrapper
	 * @param {object} settings Default settings hash
	 * @constructor
	 */
	var LiveForm,
		CLASSES;

	CLASSES = {
		STEP: '_step',
		SPINNER: 'spinner',
		IS_LOADING: 'is-loading',
		STEPS_LIST: 'step-list',
		STEPS_LIST_ITEM: '_step-list-item',
		STEP_TITLE: '_step-title',
		EDIT_LINK: '_edit-step'
	};

	/**
	 * @class LiveForm
	 * @memberOf DDIGITAL.forms.multistep
	 *
	 * @param {Object} $container Reference to element that contains the steps
	 * @param {Object} settings Hash of configuration parameters
	 * @constructor
	 */
	LiveForm = function($container, settings) {
		this.$container = $container;
		this.defaults = {};

		this.settings = $.extend(true, this.settings, this.defaults, settings);

		this.currentStep = settings.currentStep;
	};

	LiveForm.prototype = {

		TYPES: [
			'wizard',
			'accordion',
			'stepped'
		],

		TEMPLATES: {
			step: [
				'<div class="' + CLASSES.STEP + '">',
				'</div>'
			].join(''),
			list: '<ul class="' + CLASSES.STEPS_LIST + '" />',
			listItem: '<li class="' + CLASSES.STEPS_LIST_ITEM + '" />',
			stepTitle: [
				'<div class="' + CLASSES.STEP_TITLE + '">',
				'<span>{{step.title}}</span>',
				'</div>'
			].join(''),
			editLink: '<a href="#" class="' + CLASSES.EDIT_LINK + '">Edit</a>'
		},

		/**
		 * @type {Object}
		 */
		settings: {},

		/**
		 * @type {Object}
		 */
		$container: {},

		/**
		 * @type {Boolean}
		 */
		isLoading: false,

		/**
		 * @type {Object}
		 */
		currentStep: {},

		/**
		 * @type {Object}
		 */
		$currentStep: {},

		/**
		 * @type {Boolean}
		 */
		firstRender: true,

		/**
		 * Initialize form tracker classs
		 * @memberOf DDIGITAL.forms.multiStep.LiveForm
		 * @private
		 * @param {Object} service
		 * @param {Object} router
		 */
		init: function(service, router) {

			if (this.TYPES.indexOf(this.settings.form.type) === -1) {
				console.warn('Unsupported liveform form type \'' + this.settings.type + '\'');
				return false;
			}

			this.service = service;
			this.router = router;

			// Create reference to step object
			this.currentStep = this.service.getStep(this.settings.currentStep);

			// If type is accordion we need to stub out all the step DOM nodes in advance
			if (this.settings.form.type === 'accordion') {
				this._stubSteps();
				this._initStubs();
			}

			if (this.currentStep.step === 1) {
				// Store the step object in the browser history
				this.router.replaceState(this.currentStep);
			}

			// For wizards, the first step gets embedded into the DOM from the backend
			if (this.currentStep.step === 1 && this.settings.form.type === 'wizard') {
				// Initialize Step class against existing DOM node
				this.$currentStep = this.$container.find('[data-form-multistep-step="1"]');
				this.$currentStep.data('step', this.currentStep);
				this._initStep(this.$currentStep);
				this._triggerStepChange();
				this.firstRender = false;
			} else {
				// We have to fetch the partial first
				if (this.settings.partial) {
					this._buildStep(this.currentStep);
				} else {
					console.warn('You have not declared a partial to fetch on initialisation.');
				}
			}

			this._listenForEvents();
			this._initLoader();
		},

		/**
		 * Initializes Step class against $step node
		 * @private
		 */
		_initStep: function($step) {
			var step = new NAMESPACE.forms.multistep.Step($step, this.$container, {});

			step.init(this.service);

			// Always start the step in a disabled state
			//if (this.firstRender === false) {
				//$step.trigger('disable.step');
			//}

			// Catch 'go back' link click and trigger step switch
			$step.on('goback.step', function(evt, step) {
				this.loading.start();
				this.switchStep(this.service.getStep(step.step - 1));
			}.bind(this));
		},

		/**
		 * Listens for comms from other modules in the form of events that bubble up from the form
		 * element up to the $container
		 * @private
		 */
		_listenForEvents: function() {

			// Hook into point where the form is being submitted
			this.$container.on('submit-start.sync', function() {
				// Mark container loading event though _sync.js already marks the step that is being
				// submitted as loading as well.
				this.loading.start();

				// Mark container as busy while submitting and preparing the response/next step
				this.$container.attr('aria-busy', true);
			}.bind(this));

			// Submission was considered valid.
			this.$container.on('submit-success.sync', function(evt) {
				var $form = $(evt.target);

				// @todo Determine what key/value pairs to pass here
				// Trigger event for analytics/tracking purposes
				$form.trigger('step-complete.track', {
					'form-id': this.service.getFormId(),
					'form-title': this.service.getFormTitle(),
					'step-title': this.currentStep.title,
					'step': this.currentStep.step
				});

			}.bind(this));

			// Submission returned validation errors
			this.$container.on('submit-invalid.sync', function() {
				this.loading.stop();
				this.$container.attr('aria-busy', false);
			}.bind(this));

			// POST request was not successful in receiving an adequate response
			this.$container.on('submit-fail.sync', function(evt, connectionError) {
				console.log('submit fail', evt, connectionError);
			}.bind(this));

			// This event is always raised when the POST has received a response
			this.$container.on('submit-end.sync', function() {}.bind(this));

			// Execute action after submit completed without validation errors
			this.$container.on('next-action-partial.sync', function() {
				// Get the next step from the server and into the form
				this._nextStep();
			}.bind(this));
		},

		/**
		 * Sets up a loader utility to easily mark the loading state of the form while emitting an
		 * appropriate event to the Step class so it can disable/enable its children
		 *
		 * @private
		 */
		_initLoader: function() {
			var startLoading,
				stopLoading;

			startLoading = function() {
				// Add spinner loading class
				this.$container.addClass(CLASSES.IS_LOADING);
				this.$currentStep.trigger('disable.step');
			}.bind(this);

			// Stop loading; hide loading animation and enable the form
			stopLoading = function() {
				// Remove spinner loading class
				this.$container.removeClass(CLASSES.IS_LOADING);
				this.$currentStep.trigger('enable.step');
			}.bind(this);

			this.loading = {
				start: startLoading,
				stop: stopLoading
			};
		},

		/**
		 * Fetches partial form server on given endpoint
		 *
		 * @param {String} endpoint URL endpoint to query for fetching HTML for step
		 * @returns {Promise}
		 * @inner
		 * @private
		 */
		_fetchPartial: function(endpoint) {
			var request = this.service.getPartial(endpoint);

			// This should only happen when the endpoint is unavailable
			// or a server error occurs.
			request.fail(function() {
				NAMESPACE.forms.sync.handleNetworkError(this.$currentStep.find('form'));
			}.bind(this));

			return request;
		},

		/**
		 * Fetches partial from endpoint and when response has been received it triggers a
		 * render and initialisation for that step
		 *
		 * @param {object} step
		 * @private
		 */
		_buildStep: function(step) {
			var $step;

			this._fetchPartial(step.partial)
				.then(function(html) {
					// Now render the returned HTML in a step template
					$step = this._renderStep(step, html);

					// Make step data on this node available to other parts of the JS framework
					$step.data('step', step);

					// Inject the step into the DOM
					if (this.settings.form.type === 'wizard') {
						this._addStep($step, step);
					} else {
						this._insertStepIntoStub($step, step);
					}

					// Initialize Step class against new DOM node
					this._initStep($step);

					// Animate from current state to the requested step
					this._animate(this.$currentStep, $step);

				}.bind(this));
		},

		/**
		 * Renders step using configured template and executes various hooks to allow for DOM
		 * manipulation from outside of this class.
		 *
		 * @param {Object} step Step object
		 * @param {String} html Partial as fetched from server
		 * @returns {*|HTMLElement}
		 * @private
		 */
		_renderStep: function(step, html) {
			var $tpl = $(this.TEMPLATES.step);

			// Wrap partial in template element
			$tpl.append(html);

			this.beforeInsertStep($tpl, step);

			return $tpl;
		},

		/**
		 * Adds step to container before or after the current step based on index. This is only
		 * used for wizard type forms
		 *
		 * @param {Object} $step
		 * @param {Object} step
		 * @private
		 */
		_addStep: function($step, step) {
			var $steps = this.$container.find('.step');

			if ($steps.length === 0) {
				this.$container.append($step);
			} else {
				// Determine whether we should insert the new step before or after the step
				// currently on stage
				if (this.currentStep.step > step.step) {
					// Insert after
					$step.insertBefore($steps);
				} else {
					// Insert before
					$step.insertAfter($steps);
				}
			}
		},

		/**
		 * Switches to the next step in the collection
		 * @private
		 */
		_nextStep: function() {
			var index = this.service.getIndexFromStep(this.currentStep.step),
				nextStep = this.service.getStepFromIndex(index + 1);

			this._buildStep(nextStep);
		},

		/**
		 * Switches to the given step
		 *
		 * @param {Object} step Step object
		 */
		switchStep: function(step) {
			this._buildStep(step);
		},

		/**
		 * Takes care of moving from one step to the next now that both are in the DOM
		 *
		 * @param {Object} $stepOut Current step which wil be animating out
		 * @param {Object} $stepIn Next step to display
		 * @private
		 */
		_animate: function($stepOut, $stepIn) {
			var aniOut = new jQuery.Deferred(),
				aniIn = new jQuery.Deferred();;

			this.scrollToTop();

			// Do we have a visible step currently?
			if ($stepOut.length) {

				// Yes, animate the current step out of view
				this.animateStepOut($stepOut, function() {
					aniOut.resolve();
				});

			} else {
				// Resolve immediately
				aniOut.resolve();
			}

			// Animate in when aniOut has resolved/completed
			$.when(aniOut)
				.done(function() {

					this.animateStepIn($stepIn, function() {
						aniIn.resolve();
					});

				}.bind(this));

			// Once all animation has completed, we update the state of things
			$.when(aniIn)
				.done(function() {
					if ($stepOut.length) {
						$stepOut.trigger('destroy.step');
					}

					this._activateStep($stepIn);

					this.loading.stop();
					this.$container.attr('aria-busy', false);

				}.bind(this));
		},

		/**
		 * Sets some internal variables pointing to current step node and object. A route is
		 * triggered and a 'step-change' event is triggered as well
		 *
		 * @param {Object} $step The step node to mark as the current one
		 * @returns {boolean}
		 * @private
		 */
		_activateStep: function($step) {
			var path;

			this.currentStep = $step.data('step');
			this.$currentStep = $step;

			this._updateEditLinkStates();
			this._triggerStepChange();

			// If we're rendering the very first step into the DOM we do not want to update
			// the URL path and trigger a 'step-change' event
			if (this.firstRender) {
				this.firstRender = false;
				return false;
			}

			path = this.service.getURLPathFromStep(this.currentStep.step);

			this.router.navigate(path, this.currentStep);
		},

		/**
		 * Makes links visible or hidden depending on the current step
		 * @private
		 */
		_updateEditLinkStates: function() {
			var currentStep = this.currentStep;

			this.$container.find('.' + CLASSES.EDIT_LINK)
				.each(function() {
					var $link = $(this),
						step = $link.data('step');

					if (step.displayAt < currentStep.displayAt) {
						$link.removeClass('hidden');
					} else {
						$link.addClass('hidden');
					}
				});
		},

		/**
		 * Raises 'step-change' event against the container DOM node
		 * @private
		 */
		_triggerStepChange: function() {
			this.$container.trigger('step-change.liveform', this.currentStep);
		},

		/**
		 * Inserts rendered step at the right point in the DOM based on the step index
		 *
		 * @param {Object} $step
		 * @param {Object} step
		 * @private
		 */
		_insertStepIntoStub: function($step, step) {
			this.$container
				.find('.' + CLASSES.STEPS_LIST_ITEM)
				.eq(step.displayAt - 1)
				.append($step);
		},

		/**
		 * Creates an accordion container element in the DOM for each step in this form
		 *
		 * @private
		 */
		_stubSteps: function() {
			var steps = this.service.getSteps(),
				lastStep = 0;

			this.$list = $(this.TEMPLATES.list);

			function renderStub(step) {
				var $listItem,
					$editLink,
					$stepTitle,
					tpl;

				tpl = this.TEMPLATES.stepTitle.replace('{{step.title}}', step.title);
				$stepTitle = $(tpl);
				$listItem = $(this.TEMPLATES.listItem);

				if (step.canEdit !== false) {
					$editLink = $(this.TEMPLATES.editLink);
					$editLink.data('step', step);
					$editLink.appendTo($stepTitle);
				}

				$listItem.append($stepTitle);
				$listItem.appendTo(this.$list);
			}

			for (var i = 0; i < steps.length; i += 1) {
				if (steps[i].displayAt !== lastStep) {
					renderStub.call(this, steps[i]);
				}
				lastStep = steps[i].displayAt;
			}

			this.$list.appendTo(this.$container);
		},

		/**
		 * @todo Add feature that detects if changes were made in the form
		 *
		 * @private
		 */
		_initStubs: function() {
			var $editLinks = this.$container.find('.' + CLASSES.EDIT_LINK);

			$editLinks.on('click', function(evt) {
				evt.preventDefault();
				this.switchStep($(evt.currentTarget).data('step'));
			}.bind(this));
		},

		/**
		 * Scrolls page to top of the form
		 */
		scrollToTop: function() {
			var currentTop = $(document).scrollTop(),
				formToTop = this.$container.offset().top;

			// Only scroll to top if we're beyond the start of the form
			if (currentTop > formToTop) {
				NAMESPACE.util.scroll.page(0, null, 250, function() {});
			}
		},

		// Abstract methods that could/should be implemented by mixins

		/**
		 * @abstract
		 * @param {Object} $step The step node to be inserted
		 * @param {Object} step The step model
		 */
		beforeInsertStep: function() {}

	};

	NAMESPACE.forms.multistep.LiveForm = LiveForm;

}(DDIGITAL, jQuery));
// ==========================================================================
// LIVEFORM - ONEPAGE MIXIN
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL.forms
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * Mixins namespace
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins
	 * @memberof DDIGITAL.forms.multistep
	 */
	NAMESPACE.forms.multistep.mixins = NAMESPACE.forms.multistep.mixins || {};

	/**
	 * Mixin for liveForm type onepage
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins.OnePage
	 * @memberOf DDIGITAL.forms.multistep.mixins
	 */
	NAMESPACE.forms.multistep.mixins.OnePage = function() {

		this.beforeInsertStep = function() {};

		this.animateStepIn = function(/* ... */) {
		};

		this.animateStepOut = function(/* ... */) {
		};
	};

}(DDIGITAL));
// ==========================================================================
// LIVEFORM - WIZARD MIXIN
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL.forms
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * Mixins namespace
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins
	 * @memberof DDIGITAL.forms.multistep
	 */
	NAMESPACE.forms.multistep.mixins = NAMESPACE.forms.multistep.mixins || {};

	/**
	 * Mixin for liveForm type wizard
	 *
	 * @namespace DDIGITAL.forms.multistep.mixins.Wizard
	 * @memberOf DDIGITAL.forms.multistep.mixins
	 */
	NAMESPACE.forms.multistep.mixins.Wizard = function() {

		/**
		 * Manipulates step DOM node prior to it being inserted into the DOM
		 *
		 * @param {Object} $step Reference to step DOM node
		 */
		this.beforeInsertStep = function($step) {
			$step.addClass('hidden');
		};

		/**
		 * Animates a step into view before calling the callback which will trigger the activation
		 * of the step
		 *
		 * @param {Object} $step Reference to step DOM node
		 * @param {Function} callback Should be triggered when step should be activated
		 */
		this.animateStepIn = function($step, callback) {

			$step
				.removeClass('hidden')
				.velocity('stop')
				.velocity({
					opacity: 1
				}, {
					easing: 'easeOutQuart',
					duration: 500,
					complete: callback
				});
		};

		/**
		 * Animates a step out of view before calling the callback which will trigger the
		 * animateStepIn sequence
		 *
		 * @param {Object} $step Reference to step DOM node
		 * @param {Function} callback When triggered, the animateStepIn sequence will start
		 */
		this.animateStepOut = function($step, callback) {

			$step
				.velocity('stop')
				.velocity({
					opacity: 0
				}, {
					easing: 'easeOutQuart',
					duration: 500,
					complete: function() {
						$step.addClass('hidden');
						callback();
					}
				});
		};
	};

}(DDIGITAL));
// ==========================================================================
// MULTI STEP FORM PROGRESS BAR CLASS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * @class ProgressBar
	 * @memberOf DDIGITAL.forms.multistep
	 *
	 * @param {Object} $container jQuery reference to the form wrapper
	 * @param {Object} settings Default settings hash
	 * @constructor
	 */
	var ProgressBar,
		CLASSES;

	CLASSES = {
		IS_COMPLETE: 'is-complete',
		IS_CURRENT: 'is-current'
	};

	/**
	 * @class ProgressBar
	 * @memberOf DDIGITAL.forms.multistep
	 *
	 * @param {Object} $container Reference to progress bar container
	 * @param {Object} settings Hash of configuration parameters
	 * @constructor
	 */
	ProgressBar = function($container, settings) {
		var defaults = {
			onStepClick: function() {},
			titleFormat: 'Step {{step.displayAt}} of {{totalSteps}} : {{step.title}}',
			displayStepTitle: true
		};

		this.$container = $container;
		this.initialState = this.$container.data('formProgressState');

		if (this.initialState.indexOf('%') !== -1) {
			this.type = 'percentage';
		}

		this.settings = $.extend(true, this.settings, defaults, settings);
	};

	ProgressBar.prototype = {

		TYPES: [
			'steps',
			'percentage'
		],

		TEMPLATES: {
			list: '<ul />',
			step: [
				'<li class="_step">',
				'<span class="_step-number">{{step.displayAt}}</span>',
				'<span class="_step-title vh">{{step.title}}</span>',
				'</li>'
			].join(''),
			title: '<p />',
			bar: [
				// Browsers that support HTML5 progress element will ignore the html inside
				// `progress` element. Whereas older browsers will ignore the `progress` element
				// and instead render the html inside it.
				'<progress max="100" value="">',
				'<div class="progress-bar">',
				'<span></span>',
				'</div>',
				'</progress>'
			].join('')
		},

		settings: {},

		type: 'steps',

		$container: null,
		$list: null,

		/**
		 * @type {Number}
		 */
		currentStep: 1,

		/**
		 * Initialize progress bar
		 * @memberOf DDIGITAL.forms.multiStep.ProgressBar
		 * @private
		 */
		init: function(service) {

			this.service = service;

			if (this.type === 'steps') {

				this._renderList();

				if (this.settings.displayStepTitle === true) {
					this._renderTitle();
				}

			} else if (this.type === 'percentage') {

				this._renderBar();

			}
		},

		/**
		 * Renders percentage progress bar
		 * @private
		 */
		_renderBar: function() {
			this.$bar = $(this.TEMPLATES.bar);
			this.$bar.appendTo(this.$container);
		},

		/**
		 * Stubs the nodes of the progress bar
		 * @private
		 */
		_renderList: function() {
			var steps = this.service.getSteps(),
				lastStep = 0;

			this.$list = $(this.TEMPLATES.list);
			this.$list.appendTo(this.$container);

			for (var i = 0; i < steps.length; i += 1) {

				if (steps[i].displayAt !== lastStep) {
					this._renderStep(steps[i]);
				}

				lastStep = steps[i].displayAt;
			}

			this.$steps = this.$list.children();
		},

		/**
		 * Renders the initial state of one node (step) of the progress bar
		 *
		 * @param {{ title: String, partial: String, step: Number, displayAt: Number, slug: String}} stepObject
		 * @private
		 */
		_renderStep: function(stepObject) {
			var template = this.TEMPLATES.step,
				$step;

			template = template.replace('{{step.title}}', stepObject.title);
			template = template.replace('{{step.displayAt}}', stepObject.displayAt.toString());

			$step = $(template);
			$step.data('step', stepObject);

			this.$list.append($step);
		},

		/**
		 * Stubs title element
		 *
		 * @private
		 */
		_renderTitle: function() {
			var template = this.TEMPLATES.title;

			this.$title = $(template);
			this.$title.html('&nbsp;');

			this.$title.appendTo(this.$container);
		},

		/**
		 * Updates progress bar title
		 *
		 * @param {Object} step Step to update the title to
		 * @private
		 */
		_updateTitle: function(step) {
			var title = this.settings.titleFormat;

			title = title.replace('{{step.displayAt}}', step.displayAt.toString())
				.replace('{{totalSteps}}', this.$steps.length)
				.replace('{{step.title}}', step.title);

			this.$title.text(title);
		},

		/**
		 * Updates progress bar to make the given step the current one
		 *
		 * @param {Object} step Step object
		 * @returns {boolean}
		 */
		setState: function(step) {
			var steps;

			if (step.step === this.currentStep && this.currentStep !== 1) {
				return false;
			}

			function updateStatus(_step, idx) {
				if (idx < step.displayAt) {
					if (typeof _step.canEdit === 'undefined' || _step.canEdit === true) {
						this._addLink(_step);
					}
					this._markComplete(_step);
				} else {
					this._removeLink(_step);
					this._markInComplete(_step);
				}
			}

			if (this.type === 'steps') {

				steps = this.service.getSteps();

				for (var i = 1; i <= steps.length; i += 1) {
					var _step = steps[i - 1];
					updateStatus.call(this, _step, i);
				}

				this._makeCurrent(step);
				this._updateTitle(step);

			} else {
				// @todo Write this feature
				console.warn('The progress bar type `percentage` is not yet supported');
			}
		},

		/**
		 * Marks the correct step in the list as the current one while unmarking the others
		 *
		 * @param {Object} step Current step
		 * @private
		 */
		_makeCurrent: function(step) {
			this.$steps
				.removeClass(CLASSES.IS_CURRENT)
				.eq(step.displayAt - 1)
				.addClass(CLASSES.IS_CURRENT);

			this.currentStep = step.step;
		},

		/**
		 * Marks given step as complete by adding a class name
		 *
		 * @param {Object} step Step to mark as complete
		 * @private
		 */
		_markComplete: function(step) {
			this.$steps
				.eq(step.displayAt - 1)
				.addClass(CLASSES.IS_COMPLETE);
		},

		/**
		 * Un-marks given step as complete by removing a class name
		 *
		 * @param {Object} step Step ro mark as incomplete
		 * @private
		 */
		_markInComplete: function(step) {
			this.$steps
				.eq(step.displayAt - 1)
				.removeClass(CLASSES.IS_COMPLETE);
		},

		/**
		 * Makes step clickable
		 *
		 * @param {Object} step
		 * @private
		 */
		_addLink: function(step) {
			var $a = $(document.createElement('a'));

			$a.attr('href', this.service.getURLPathFromStep(step.step))
				.on('click', function(evt) {
					this.settings.onStepClick(evt, step);
				}.bind(this));

			this.$steps
				.eq(step.displayAt - 1)
				.children()
				.wrapAll($a);
		},

		/**
		 * Removes clickable behaviour from step node
		 *
		 * @param {Object} step
		 * @private
		 */
		_removeLink: function(step) {
			this.$steps
				.eq(step.displayAt - 1)
				.find('> a')
				.children()
				.unwrap('a');
		}

	};

	NAMESPACE.forms.multistep.ProgressBar = ProgressBar;

}(DDIGITAL, jQuery));
// ==========================================================================
// MULTI STEP FORM
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * Multi step form service
	 *
	 * @namespace DDIGITAL.forms.multistep.router
	 * @memberOf DDIGITAL.forms.multistep
	 */
	NAMESPACE.forms.multistep.router = (function() {
		var init,
			OPTIONS,
			_listen,
			navigate,
			onStateChange,
			replaceState;

		OPTIONS = {
			onStateChange: function() {}
		};

		/**
		 * @private
		 * @memberOf DDIGITAL.forms.multistep.router
		 */
		_listen = function() {
			$(window).on('popstate.multistep', function(evt) {
				onStateChange(evt);
			});
		};

		/**
		 * @param {String} url URL to navigate to with using pushState
		 * @param {Object} step Step model object
		 * @memberOf DDIGITAL.forms.multistep.router
		 */
		navigate = function(url, step) {
			history.pushState(step, null, url);
		};

		/**
		 * @param {Object} evt State change event object
		 * @memberOf DDIGITAL.forms.multistep.router
		 */
		onStateChange = function(evt) {
			OPTIONS.onStateChange(evt);
		};

		/**
		 * Replace the current history entry with the same URL path but add a step object
		 * @param {Object} step
		 * @memberOf DDIGITAL.forms.multistep.router
		 */
		replaceState = function(step) {
			history.replaceState(step, null, window.location.pathname);
		};

		/**
		 * @param {Object} options Object containing options to override default OPTIONS
		 * @memberOf DDIGITAL.forms.multistep.router
		 */
		init = function(options) {
			OPTIONS = $.extend(true, OPTIONS, options);

			_listen();

			return this;
		};

		return {
			init: init,
			navigate: navigate,
			onStateChange: onStateChange,
			replaceState: replaceState
		};

	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// MULTI STEP FORM
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * Multi step form service
	 *
	 * @namespace DDIGITAL.forms.multistep.service
	 * @memberOf DDIGITAL.forms.multistep
	 */
	NAMESPACE.forms.multistep.service = (function() {
		var init,
			OPTIONS,
			getPartial,
			getStepFromIndex,
			getStep,
			getIndexFromStep,
			getURLPathFromStep,
			getSteps,
			getFormTitle,
			getFormId,
			makeAbsolute,
			_data;

		OPTIONS = {
			timeout: 10000
		};

		/**
		 * Fetches a partial from an endpoint on the server
		 * @returns {Promise}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getPartial = function(endpoint) {
			return $.ajax({
				timeout: OPTIONS.timeout,
				method: 'GET',
				url: makeAbsolute(endpoint)
			});
		};

		/**
		 * Returns step object from 0 based index.
		 * @param {Number} stepIndex
		 * @returns {{title: String, partial: String, Step: Number, displayAt: Number, slug: String}}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getStepFromIndex = function(stepIndex) {
			return _data.steps[stepIndex];
		};

		/**
		 * Returns the step object for the given step number
		 *
		 * @param {Number} step Step number indexed from 1
		 * @returns {{title: String, partial: String, Step: Number, displayAt: Number, slug: String}}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getStep = function(step) {
			var stepObject = {};

			for (var i = 0; i <= _data.steps.length; i += 1) {
				if (_data.steps[i].step === step) {
					stepObject = _data.steps[i];
					break;
				}
			}

			return stepObject;
		};

		/**
		 * Returns 0 based index for given step
		 * @param {Number} step Form step indexed at 1
		 * @returns {Number}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getIndexFromStep = function(step) {
			var idx = -1;

			for (var i = 0; i < _data.steps.length; i += 1) {
				if (_data.steps[i].step === step) {
					idx = i;
					break;
				}
			}

			return idx;
		};

		/**
		 * Ensures that the path starts with a /
		 * @param {String} path URL path
		 * @returns {String}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		makeAbsolute = function(path) {
			if (path.slice(0, 1) !== '/') {
				path = '/' + path;
			}
			return path;
		};

		/**
		 * Returns a URL path for the given step
		 * @param {Number} step Number of step indexed at 1
		 * @returns {String}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getURLPathFromStep = function(step) {
			var stepObject = getStep(step),
				path = _data.basePath,
				newPath = path,
				proxy = false;

			if (step === 1) {
				return makeAbsolute(path);
			}

			if (_data.hasOwnProperty('proxy') && _data.proxy === true) {
				proxy = true;
				newPath = newPath.replace('.html', '');
			}

			if (path.slice(-1) !== '/') {
				newPath += '/';
			}

			newPath += stepObject.slug;

			if (proxy === true) {
				newPath += '.html';
			}

			return makeAbsolute(newPath);
		};

		/**
		 * Returns all steps in this form
		 * @returns {Array<Object>}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getSteps = function() {
			return _data.steps;
		};

		/**
		 * @returns {String}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getFormId = function() {
			return _data.id;
		};

		/**
		 * @returns {String}
		 * @memberOf DDIGITAL.forms.multistep.service
		 * @instance
		 */
		getFormTitle = function() {
			return _data.title;
		};

		/**
		 * @param {Object} data JSON representation of form and steps contained within it
		 * @param {Object} options Hash with options to override default options
		 * @returns {init}
		 * @memberOf DDIGITAL.forms.multistep.service
		 */
		init = function(data, options) {
			OPTIONS = $.extend(true, options, OPTIONS);

			_data = data;

			return this;
		};

		return {
			init: init,
			getPartial: getPartial,
			getStepFromIndex: getStepFromIndex,
			getStep: getStep,
			getIndexFromStep: getIndexFromStep,
			getURLPathFromStep: getURLPathFromStep,
			getSteps: getSteps,
			getFormId: getFormId,
			getFormTitle: getFormTitle,
			makeAbsolute: makeAbsolute
		};

	}());

}(DDIGITAL, jQuery));
// ==========================================================================
// MULTI STEP FORM STEP CLASS
// ==========================================================================

(function(NAMESPACE, $) {

	'use strict';

	/**
	 * Forms namespace
	 *
	 * @namespace DDIGITAL.forms
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms = NAMESPACE.forms || {};

	/**
	 * Multistep namespace
	 *
	 * @namespace DDIGITAL.forms.multistep
	 * @memberof DDIGITAL
	 */
	NAMESPACE.forms.multistep = NAMESPACE.forms.multistep || {};

	/**
	 * @class Step
	 * @memberOf DDIGITAL.forms.multistep
	 *
	 * @param {Object} $container jQuery reference to the form wrapper
	 * @param {Object} settings Default settings hash
	 * @constructor
	 */
	var Step,
		CLASSES;

	CLASSES = {
		BACK: 'js-multistep-back'
	};

	/**
	 * @class MultiStep
	 * @memberOf DDIGITAL.forms.multistep
	 *
	 * @param {Object} $step Reference to element that is wrapped around the <form> element
	 * @param {Object} $container Reference to LiveForm container
	 * @param {Object} settings Hash of configuration parameters
	 * @constructor
	 */
	Step = function($step, $container, settings) {
		this.$step = $step;
		this.step = this.$step.data('step');
		this.$container = $container;
		this.defaults = {
			confirmText: 'Are you sure you want to navigate away from this step of the form? Changes you made will not be saved.'
		};

		this.settings = $.extend(true, this.settings, this.defaults, settings);
	};

	Step.prototype = {

		/**
		 * @type {Object}
		 */
		settings: {},

		/**
		 * @type {Object}
		 */
		$step: null,

		/**
		 * @type {Object}
		 */
		$form: null,

		/**
		 * Will turn true as soon as a control as been successfully validated
		 * @type {Boolean}
		 */
		isDirty: false,

		/**
		 * Initialize step
		 * @memberOf DDIGITAL.forms.multiStep.Step
		 * @private
		 */
		init: function(service) {
			this.service = service;
			this.$form = this.$step.find('form');
			this.$fieldsets = this.$form.find('fieldset');

			// Ensure all JS modules are initialised against this new section of DOM
			this.$step.trigger('re-init-all');

			this._listenForEvents();
			this._initGoBack();
			this._trackElements();
			this._onBeforeUnload();
		},

		/**
		 * Listen for events that get raised ageinst this step node
		 * @private
		 */
		_listenForEvents: function() {

			// Respond to request to disable this step node
			this.$step.on('disable.step', function() {
				this._disable();
			}.bind(this));

			// Respond to request to enable this step node
			this.$step.on('enable.step', function() {
				this._enable();
			}.bind(this));

			// Respond to request to implode and remove this node from the DOM
			this.$step.on('destroy.step', function() {
				this.destroy();
			}.bind(this));
		},

		/**
		 * Catch 'go back' link click and delegate event for LiveForm
		 * @private
		 */
		_initGoBack: function() {
			this.$step.find('.' + CLASSES.BACK)
				.on('click', function(evt) {
					evt.preventDefault();

					if (this.isDirty) {
						if (window.confirm(this.settings.confirmText)) {
							this.$step.trigger('goback.step', this.step);
						}
					} else {
						this.$step.trigger('goback.step', this.step);
					}
				}.bind(this));
		},

		/**
		 * Track elements to determine whether this page can be unloaded without warning the user
		 * @private
		 */
		_trackElements: function() {
			var _this = this;

			function initTracker($element) {
				var elementTracker = new NAMESPACE.forms.ElementTracker(_this.$form, $element, {});

				elementTracker.init();

				$element.on('element-success.track', function() {
					_this.isDirty = true;
				});
			}

			// Initialize ElementTracker instance against each form control withing the scope
			// of this step of the form
			this.$step
				.find('.ctrl-holder input, .ctrl-holder select, .ctrl-holder textarea')
				.each(function() {
					initTracker($(this));
				});
		},

		/**
		 * Prompts user if they really want to navigate away form the page
		 * @private
		 */
		_onBeforeUnload: function() {
			$(window).on('beforeunload.step-' + this.step.step, function() {
				if (this.isDirty) {
					return '';
				}
			}.bind(this));

			// Unbind as soon as the form is considered valid
			this.$form.on('submit-success.sync', function() {
				$(window).off('beforeunload.step-' + this.step.step);
			}.bind(this));
		},

		/**
		 * Disables the form fieldsets/submit button in this step
		 */
		_disable: function() {

			// Disable submit buttons (for cases where the buttons do not appear within the
			// fieldsets).
			this.$step.find('button[type="submit"]').each(function() {
				var $button = $(this),
					state = $button.prop('disabled');

				$button.data('disabled-state', Boolean(state));
				$button.prop('disabled', true);
			});

			// Disable fieldsets
			this.$step.find('fieldset').each(function() {
				var $fieldset = $(this),
					state = $fieldset.prop('disabled');

				$fieldset.data('disabled-state', Boolean(state));
				$fieldset.prop('disabled', true);
			});
		},

		/**
		 * Enables the form fieldsets/submit button in this step
		 */
		_enable: function() {

			// Re-enable submit buttons
			this.$container.find('button[type="submit"]').each(function() {
				var $button = $(this),
					state = $button.data('disabled-state');

				$button.prop('disabled', Boolean(state));
				$button.removeData('disabled-state');
			});

			// Re-enable fieldsets
			this.$fieldsets.each(function() {
				var $fieldset = $(this),
					state = $fieldset.data('disabled-state');

				$fieldset.prop('disabled', Boolean(state));
				$fieldset.removeData('disabled-state');
			});
		},

		/**
		 * Removes the step form the DOM and cleans up after itself
		 */
		destroy: function() {
			$(window).off('beforeunload.step-' + this.step.step);
			this.$step.remove();
		}

	};

	NAMESPACE.forms.multistep.Step = Step;

}(DDIGITAL, jQuery));
(function() {

	'use strict';

	$.validator.addMethod('cc-cvv', function(value, element) {
		var pattern = /^\d{3,4}$/;

		return this.optional(element) || pattern.test(value);
	}, 'Please enter a valid CVV code. For Mastercard or Visa, this is the last three digits in the signature area ' +
		'on the back of your card.');

}());
// ==========================================================================
// EXPIRY DATE VALIDATION RULE
// Expiry date - expects two fields - date must be in the future
// ==========================================================================

(function(NAMESPACE) {

	'use strict';

	$.validator.addMethod('cc-expiry', function(value, ctrl) {
		var valid = false,
			$ctrls = NAMESPACE.forms.decorator.getCtrlsInGroup(ctrl),
			month = parseInt($ctrls.eq(0).val(), 10),
			year = parseInt($ctrls.eq(1).val(), 10),
			currentMonth = parseInt(new Date().getMonth(), 10),
			currentYear = parseInt(new Date().getFullYear().toString().substr(2, 2), 10),
			datesAreValid = false;

		if (!isNaN(month) && !isNaN(year)) {
			datesAreValid = true;
		}

		// if both dates are valid
		if (datesAreValid
			// if the year is greater than current it's valid, or if it's the current year
			// and the month is greater than or equal, then it's valid
			&& (year > currentYear || (year === currentYear && month - 1 >= currentMonth))) {
			valid = true;
		}

		return valid;
	}, 'Please enter a valid expiry date.');

}(DDIGITAL));
(function() {

	'use strict';

	$.validator.addMethod('cc-number', function(value, element) {
		var pattern = /^\d{16}$/;
		return this.optional(element) || pattern.test(value);
	}, 'Please enter a valid credit card number.');

}());
// ==========================================================================
// CUSTOM REQUIRED VALIDATION RULE
// Required - validates grouped controls as one
// ==========================================================================
(function(NAMESPACE) {

	'use strict';

	$.validator.addMethod('required', function(value, ctrl, param) {
		var $ctrl = $(ctrl),
			isGroupValid;

		isGroupValid = function(ctrl) {
			var $ctrls = NAMESPACE.forms.decorator.getCtrlsInGroup(ctrl),
				requirementMet = false;

			// Iterate all controls in the group
			$ctrls.each(function() {
				var _$ctrl = $(this),
					isCheckboxOrRadio = _$ctrl.is(':checkbox') || _$ctrl.is(':radio');

				// Skip iteration if is control that this rule is executed for
				if (_$ctrl.attr('id') === $ctrl.attr('id')) {
					return true;
				}

				// Check if we're dealing with a checkbox/radio button and if so, is it checked?
				requirementMet = isCheckboxOrRadio ? _$ctrl.is(':checked') : _$ctrl.val() !== null && $.trim(_$ctrl.val()) !== '';
			});

			return requirementMet;
		};

		// check if dependency is met
		if (!this.depend(param, ctrl)) {
			return 'dependency-mismatch';
		}

		// Check if is in group, if any of the other elements already has a value, return true
		if (NAMESPACE.forms.validate.isInGroup(ctrl) && isGroupValid(ctrl)) {
			return true;
		}

		if (this.checkable(ctrl)) {
			return this.getLength(value, ctrl) > 0;
		}

		return value !== null &&  $.trim(value).length > 0;

	}, 'This field is required.');

}(DDIGITAL));
/* =============================================================================
   OFFSCREEN NAV
   ========================================================================== */


(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.navOffscreen = (function() {
		var init;

		// initialiser
		init = function() {
			// if you use animationType: 'side' you need to move the shade inside the page wrap
			$('.js-offscreen').ddOffscreen();
		};

		return {
			init: init
		};

	}());

}(DDIGITAL, jQuery));
/* =============================================================================
   HEADER NAV
   ========================================================================== */


(function(NAMESPACE, $) {

	'use strict';

	NAMESPACE.navOnscreen = (function() {
		var init;

		init = function() {
			$('.js-onscreen').ddOnscreen({
				// options here
			});
		};

		return {
			init: init
		};
	}());

}(DDIGITAL, jQuery));
