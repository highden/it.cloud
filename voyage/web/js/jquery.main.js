jQuery(function(){
	initTypeahead();
	initColorPicker();
	initSlickCarousel();
	initCustomForms();
  initFancybox();
	initPopups();
	initMobileNav();
	initWidget();
  initSameHeight();
  initTouchNav();
  initDropDownClasses();
});

// slick init
function initSlickCarousel() {
	jQuery('.images-slider').slick({
    slidesToScroll: 1,
    rows: 0,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
    dots: true,
    dotsClass: 'slick-dots'
  });

  jQuery('.testimonials-slider').slick({
    slidesToScroll: 1,
    rows: 0,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
    dots: true,
    dotsClass: 'slick-dots',
    variableWidth: true
  });
}

// initialize custom form elements
function initCustomForms() {
	jcf.replaceAll();
}

// lightbox init
function initFancybox() {
  jQuery('a.lightbox, [data-fancybox]').fancybox({
    parentEl: 'body',
    margin: [50, 0]
  });
}

// popups init
function initPopups() {
	jQuery('.popup-search').contentPopup({
		mode: 'click',
		popup: '.popup-holder',
		btnOpen: '.open-search'
	});

	jQuery('.popup-user').contentPopup({
		mode: 'hover',
		popup: '.popup-holder',
		btnOpen: '.open-user'
	});

	jQuery('.popup-login').contentPopup({
		mode: 'hover',
		popup: '.popup-holder',
		btnOpen: '.open-login'
	});
}

// mobile menu init
function initMobileNav() {
	ResponsiveHelper.addRange({
		'..767': {
			on: function() {
				jQuery('body').mobileNav({
					menuActiveClass: 'nav-active',
					menuOpener: '.nav-opener',
					hideOnClickOutside: true,
					menuDrop: 'ul'
				});
			},
			off: function() {
				jQuery('body').mobileNav('destroy');
			}
		}
	});
}

// align blocks height
function initSameHeight() {
  jQuery('.images-slider').sameHeight({
    elements: '.text-block',
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });

  jQuery('.section-gallery').sameHeight({
    elements: '.text-same-height, .form-panel',
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });

  jQuery('.testimonials-slider').sameHeight({
    elements: '.slider-holder',
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });

  jQuery('.two-equal-blocks').sameHeight({
    elements: '.panel, .slider-holder',
    flexible: true,
    multiLine: true,
    biggestHeight: true
  });
}

// spectrum color picker init
function initColorPicker(){
	jQuery('.input-color').spectrum({
		allowEmpty: false,
		showAlpha: false,
		showInitial: true,
		preferredFormat: 'hex'
	});
}

// typeahead init
function initTypeahead() {
	function  highlighter(suggestion, query) {
		query = query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
		return suggestion.replace(new RegExp('(' + query + ')', 'ig'), function ($1, suggestion) {
			return '<strong>' + suggestion + '</strong>';
		});
	}

	// term search
	jQuery('.term-search.typeahead').each(function() {
		var input = jQuery(this);
		var url = input.data('url') || '/';

		var search_results = new Bloodhound({
			datumTokenizer: function (datum) {
				var search_term_result = Bloodhound.tokenizers.whitespace(datum.search_term);
				return search_term_result;
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: url
		});

		search_results.clearPrefetchCache();
		search_results.initialize();

		input.typeahead(null, {
			minLength: 2,
			displayKey: Handlebars.compile('{{search_term}}'),
			highlight: true,
			source: search_results.ttAdapter(),
			templates: {
				empty: [
					'<div class="suggestion-container">No results.</div>'
				].join('\n'),
				suggestion: function(data) {
					return '<div class="suggestion-container">' + highlighter(data.search_term, data._query) + '</div>';
				}
			}
		});
	});
}

// init widget generator
function initWidget() {
	jQuery('.js-qwikvid-widget-generator').each(function() {
		var holder = jQuery(this);
		var widgetHolder = holder.find('.js-qwikvid-widget');
		var widgetId = widgetHolder.data('qwikvid').id || 'qwikvid-large-search-box-widget';
		var widgetJsUrl = widgetHolder.data('qwikvid').widgetJsUrl || '/widget/widget.js';
		var widgetTemplateHtml = '<div id="' + widgetId + '" data-qwikvid-params=' + "'{}'" + '></div>';
		var widgetTemplateScript = '<script src="' + widgetJsUrl + '" defer></script> \n <script type="text/javascript"> \n var QWIKVID_id_array = window.QWIKVID_id_array || []; \n QWIKVID_id_array.push("' + widgetId + '"); \n </script>';
		var widgetPlaceholder = holder.find('#' + widgetId);
		var form = holder.find('.js-qwikvid-options');
		var inputCode = holder.find('.input-code');

		function refreshCode() {
			inputCode.val(widgetTemplateHtml.replace('{}', widgetPlaceholder.attr('data-qwikvid-params')) + widgetTemplateScript);
		}

		refreshCode();

		form.on('submit', function(e) {
			e.preventDefault();
		});

		form.on('change submit changeOpts', function(e) {
			var paramsArray = form.serializeArray();
			var paramsObj = {};

			for (var i = 0; i < paramsArray.length; i++) {
				paramsObj[paramsArray[i]['name']] = paramsArray[i]['value'];
			}

			widgetPlaceholder.attr('data-qwikvid-params', JSON.stringify(paramsObj));

			refreshCode();

			window.QWIKVID_WIDGET && window.QWIKVID_WIDGET.refresh(widgetPlaceholder.attr('id'));
		}).trigger('changeOpts');
	});
}

// add classes if item has dropdown
function initDropDownClasses() {
  jQuery('#nav li').each(function() {
    var item = jQuery(this);
    var drop = item.find('ul');
    var link = item.find('a').eq(0);
    if (drop.length) {
      item.addClass('has-drop-down');
      if (link.length) link.addClass('has-drop-down-a');
    }
  });
}

// handle dropdowns on mobile devices
function initTouchNav() {
  jQuery('#nav').each(function() {
    new TouchNav({
      navBlock: this
    });
  });
}

/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.8.1
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues

 */
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots&&o.slideCount>o.options.slidesToShow){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>0){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>0&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);if(i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s){var n="slick-slide-control"+e.instanceUid+s;i("#"+n).length&&i(this).attr({"aria-describedby":n})}}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.options.focusOnChange?e.$slides.eq(s).attr({tabindex:"0"}):e.$slides.eq(s).removeAttr("tabindex");e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&e.slideCount>e.options.slidesToShow&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&e.slideCount>e.options.slidesToShow&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t&&a.slideCount>a.options.slidesToShow?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t&&a.slideCount>a.options.slidesToShow?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

// ==================================================
// fancyBox v3.2.10
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
!function(t,e,n,o){"use strict";function i(t){var e=n(t.currentTarget),o=t.data?t.data.options:{},i=e.attr("data-fancybox")||"",a=0,s=[];t.isDefaultPrevented()||(t.preventDefault(),i?(s=o.selector?n(o.selector):t.data?t.data.items:[],s=s.length?s.filter('[data-fancybox="'+i+'"]'):n('[data-fancybox="'+i+'"]'),a=s.index(e),a<0&&(a=0)):s=[e],n.fancybox.open(s,o,a))}if(n){if(n.fn.fancybox)return void("console"in t&&console.log("fancyBox already initialized"));var a={loop:!1,margin:[44,0],gutter:50,keyboard:!0,arrows:!0,infobar:!0,toolbar:!0,buttons:["slideShow","fullScreen","thumbs","share","close"],idleTime:3,smallBtn:"auto",protect:!1,modal:!1,image:{preload:"auto"},ajax:{settings:{data:{fancybox:!0}}},iframe:{tpl:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',preload:!0,css:{},attr:{scrolling:"auto"}},defaultType:"image",animationEffect:"zoom",animationDuration:500,zoomOpacity:"auto",transitionEffect:"fade",transitionDuration:366,slideClass:"",baseClass:"",baseTpl:'<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',spinnerTpl:'<div class="fancybox-loading"></div>',errorTpl:'<div class="fancybox-error"><p>{{ERROR}}<p></div>',btnTpl:{download:'<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" /></svg></a>',zoom:'<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" /></svg></button>',close:'<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',smallBtn:'<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',arrowLeft:'<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',arrowRight:'<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'},parentEl:"body",autoFocus:!1,backFocus:!0,trapFocus:!0,fullScreen:{autoStart:!1},touch:{vertical:!0,momentum:!0},hash:null,media:{},slideShow:{autoStart:!1,speed:4e3},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"},wheel:"auto",onInit:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeClose:n.noop,afterClose:n.noop,onActivate:n.noop,onDeactivate:n.noop,clickContent:function(t,e){return"image"===t.type&&"zoom"},clickSlide:"close",clickOutside:"close",dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1,mobile:{idleTime:!1,margin:0,clickContent:function(t,e){return"image"===t.type&&"toggleControls"},clickSlide:function(t,e){return"image"===t.type?"toggleControls":"close"},dblclickContent:function(t,e){return"image"===t.type&&"zoom"},dblclickSlide:function(t,e){return"image"===t.type&&"zoom"}},lang:"en",i18n:{en:{CLOSE:"Close",NEXT:"Next",PREV:"Previous",ERROR:"The requested content cannot be loaded. <br/> Please try again later.",PLAY_START:"Start slideshow",PLAY_STOP:"Pause slideshow",FULL_SCREEN:"Full screen",THUMBS:"Thumbnails",DOWNLOAD:"Download",SHARE:"Share",ZOOM:"Zoom"},de:{CLOSE:"Schliessen",NEXT:"Weiter",PREV:"Zurück",ERROR:"Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",PLAY_START:"Diaschau starten",PLAY_STOP:"Diaschau beenden",FULL_SCREEN:"Vollbild",THUMBS:"Vorschaubilder",DOWNLOAD:"Herunterladen",SHARE:"Teilen",ZOOM:"Maßstab"}}},s=n(t),r=n(e),c=0,l=function(t){return t&&t.hasOwnProperty&&t instanceof n},u=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),d=function(){var t,n=e.createElement("fakeelement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(t in i)if(n.style[t]!==o)return i[t];return"transitionend"}(),f=function(t){return t&&t.length&&t[0].offsetHeight},p=function(t,o,i){var a=this;a.opts=n.extend(!0,{index:i},n.fancybox.defaults,o||{}),n.fancybox.isMobile&&(a.opts=n.extend(!0,{},a.opts,a.opts.mobile)),o&&n.isArray(o.buttons)&&(a.opts.buttons=o.buttons),a.id=a.opts.id||++c,a.group=[],a.currIndex=parseInt(a.opts.index,10)||0,a.prevIndex=null,a.prevPos=null,a.currPos=0,a.firstRun=null,a.createGroup(t),a.group.length&&(a.$lastFocus=n(e.activeElement).blur(),a.slides={},a.init())};n.extend(p.prototype,{init:function(){var i,a,s,c=this,l=c.group[c.currIndex],u=l.opts,d=n.fancybox.scrollbarWidth;c.scrollTop=r.scrollTop(),c.scrollLeft=r.scrollLeft(),n.fancybox.getInstance()||(n("body").addClass("fancybox-active"),/iPad|iPhone|iPod/.test(navigator.userAgent)&&!t.MSStream?"image"!==l.type&&n("body").css("top",n("body").scrollTop()*-1).addClass("fancybox-iosfix"):!n.fancybox.isMobile&&e.body.scrollHeight>t.innerHeight&&(d===o&&(i=n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"),d=n.fancybox.scrollbarWidth=i[0].offsetWidth-i[0].clientWidth,i.remove()),n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: '+d+"px; }</style>"),n("body").addClass("compensate-for-scrollbar"))),s="",n.each(u.buttons,function(t,e){s+=u.btnTpl[e]||""}),a=n(c.translate(c,u.baseTpl.replace("{{buttons}}",s).replace("{{arrows}}",u.btnTpl.arrowLeft+u.btnTpl.arrowRight))).attr("id","fancybox-container-"+c.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox",c).appendTo(u.parentEl),c.$refs={container:a},["bg","inner","infobar","toolbar","stage","caption","navigation"].forEach(function(t){c.$refs[t]=a.find(".fancybox-"+t)}),c.trigger("onInit"),c.activate(),c.jumpTo(c.currIndex)},translate:function(t,e){var n=t.opts.i18n[t.opts.lang];return e.replace(/\{\{(\w+)\}\}/g,function(t,e){var i=n[e];return i===o?t:i})},createGroup:function(t){var e=this,i=n.makeArray(t);n.each(i,function(t,i){var a,s,r,c,l,u={},d={};n.isPlainObject(i)?(u=i,d=i.opts||i):"object"===n.type(i)&&n(i).length?(a=n(i),d=a.data(),d=n.extend({},d,d.options||{}),d.$orig=a,u.src=d.src||a.attr("href"),u.type||u.src||(u.type="inline",u.src=i)):u={type:"html",src:i+""},u.opts=n.extend(!0,{},e.opts,d),n.isArray(d.buttons)&&(u.opts.buttons=d.buttons),s=u.type||u.opts.type,c=u.src||"",!s&&c&&(c.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)?s="image":c.match(/\.(pdf)((\?|#).*)?$/i)?s="pdf":(r=c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i))?(s="video",u.opts.videoFormat||(u.opts.videoFormat="video/"+("ogv"===r[1]?"ogg":r[1]))):"#"===c.charAt(0)&&(s="inline")),s?u.type=s:e.trigger("objectNeedsType",u),u.index=e.group.length,u.opts.$orig&&!u.opts.$orig.length&&delete u.opts.$orig,!u.opts.$thumb&&u.opts.$orig&&(u.opts.$thumb=u.opts.$orig.find("img:first")),u.opts.$thumb&&!u.opts.$thumb.length&&delete u.opts.$thumb,"function"===n.type(u.opts.caption)&&(u.opts.caption=u.opts.caption.apply(i,[e,u])),"function"===n.type(e.opts.caption)&&(u.opts.caption=e.opts.caption.apply(i,[e,u])),u.opts.caption instanceof n||(u.opts.caption=u.opts.caption===o?"":u.opts.caption+""),"ajax"===s&&(l=c.split(/\s+/,2),l.length>1&&(u.src=l.shift(),u.opts.filter=l.shift())),"auto"==u.opts.smallBtn&&(n.inArray(s,["html","inline","ajax"])>-1?(u.opts.toolbar=!1,u.opts.smallBtn=!0):u.opts.smallBtn=!1),"pdf"===s&&(u.type="iframe",u.opts.iframe.preload=!1),u.opts.modal&&(u.opts=n.extend(!0,u.opts,{infobar:0,toolbar:0,smallBtn:0,keyboard:0,slideShow:0,fullScreen:0,thumbs:0,touch:0,clickContent:!1,clickSlide:!1,clickOutside:!1,dblclickContent:!1,dblclickSlide:!1,dblclickOutside:!1})),e.group.push(u)})},addEvents:function(){var o=this;o.removeEvents(),o.$refs.container.on("click.fb-close","[data-fancybox-close]",function(t){t.stopPropagation(),t.preventDefault(),o.close(t)}).on("click.fb-prev touchend.fb-prev","[data-fancybox-prev]",function(t){t.stopPropagation(),t.preventDefault(),o.previous()}).on("click.fb-next touchend.fb-next","[data-fancybox-next]",function(t){t.stopPropagation(),t.preventDefault(),o.next()}).on("click.fb","[data-fancybox-zoom]",function(t){o[o.isScaledDown()?"scaleToActual":"scaleToFit"]()}),s.on("orientationchange.fb resize.fb",function(t){t&&t.originalEvent&&"resize"===t.originalEvent.type?u(function(){o.update()}):(o.$refs.stage.hide(),setTimeout(function(){o.$refs.stage.show(),o.update()},600))}),r.on("focusin.fb",function(t){var i=n.fancybox?n.fancybox.getInstance():null;i.isClosing||!i.current||!i.current.opts.trapFocus||n(t.target).hasClass("fancybox-container")||n(t.target).is(e)||i&&"fixed"!==n(t.target).css("position")&&!i.$refs.container.has(t.target).length&&(t.stopPropagation(),i.focus(),s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft))}),r.on("keydown.fb",function(t){var e=o.current,i=t.keyCode||t.which;if(e&&e.opts.keyboard&&!n(t.target).is("input")&&!n(t.target).is("textarea"))return 8===i||27===i?(t.preventDefault(),void o.close(t)):37===i||38===i?(t.preventDefault(),void o.previous()):39===i||40===i?(t.preventDefault(),void o.next()):void o.trigger("afterKeydown",t,i)}),o.group[o.currIndex].opts.idleTime&&(o.idleSecondsCounter=0,r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",function(t){o.idleSecondsCounter=0,o.isIdle&&o.showControls(),o.isIdle=!1}),o.idleInterval=t.setInterval(function(){o.idleSecondsCounter++,o.idleSecondsCounter>=o.group[o.currIndex].opts.idleTime&&!o.isDragging&&(o.isIdle=!0,o.idleSecondsCounter=0,o.hideControls())},1e3))},removeEvents:function(){var e=this;s.off("orientationchange.fb resize.fb"),r.off("focusin.fb keydown.fb .fb-idle"),this.$refs.container.off(".fb-close .fb-prev .fb-next"),e.idleInterval&&(t.clearInterval(e.idleInterval),e.idleInterval=null)},previous:function(t){return this.jumpTo(this.currPos-1,t)},next:function(t){return this.jumpTo(this.currPos+1,t)},jumpTo:function(t,e,i){var a,s,r,c,l,u,d,p=this,h=p.group.length;if(!(p.isDragging||p.isClosing||p.isAnimating&&p.firstRun)){if(t=parseInt(t,10),s=p.current?p.current.opts.loop:p.opts.loop,!s&&(t<0||t>=h))return!1;if(a=p.firstRun=null===p.firstRun,!(h<2&&!a&&p.isDragging)){if(c=p.current,p.prevIndex=p.currIndex,p.prevPos=p.currPos,r=p.createSlide(t),h>1&&((s||r.index>0)&&p.createSlide(t-1),(s||r.index<h-1)&&p.createSlide(t+1)),p.current=r,p.currIndex=r.index,p.currPos=r.pos,p.trigger("beforeShow",a),p.updateControls(),u=n.fancybox.getTranslate(r.$slide),r.isMoved=(0!==u.left||0!==u.top)&&!r.$slide.hasClass("fancybox-animated"),r.forcedDuration=o,n.isNumeric(e)?r.forcedDuration=e:e=r.opts[a?"animationDuration":"transitionDuration"],e=parseInt(e,10),a)return r.opts.animationEffect&&e&&p.$refs.container.css("transition-duration",e+"ms"),p.$refs.container.removeClass("fancybox-is-hidden"),f(p.$refs.container),p.$refs.container.addClass("fancybox-is-open"),r.$slide.addClass("fancybox-slide--current"),p.loadSlide(r),void p.preload("image");n.each(p.slides,function(t,e){n.fancybox.stop(e.$slide)}),r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"),r.isMoved?(l=Math.round(r.$slide.width()),n.each(p.slides,function(t,o){var i=o.pos-r.pos;n.fancybox.animate(o.$slide,{top:0,left:i*l+i*o.opts.gutter},e,function(){o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"),o.pos===p.currPos&&(r.isMoved=!1,p.complete())})})):p.$refs.stage.children().removeAttr("style"),r.isLoaded?p.revealContent(r):p.loadSlide(r),p.preload("image"),c.pos!==r.pos&&(d="fancybox-slide--"+(c.pos>r.pos?"next":"previous"),c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"),c.isComplete=!1,e&&(r.isMoved||r.opts.transitionEffect)&&(r.isMoved?c.$slide.addClass(d):(d="fancybox-animated "+d+" fancybox-fx-"+r.opts.transitionEffect,n.fancybox.animate(c.$slide,d,e,function(){c.$slide.removeClass(d).removeAttr("style")}))))}}},createSlide:function(t){var e,o,i=this;return o=t%i.group.length,o=o<0?i.group.length+o:o,!i.slides[t]&&i.group[o]&&(e=n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage),i.slides[t]=n.extend(!0,{},i.group[o],{pos:t,$slide:e,isLoaded:!1}),i.updateSlide(i.slides[t])),i.slides[t]},scaleToActual:function(t,e,i){var a,s,r,c,l,u=this,d=u.current,f=d.$content,p=parseInt(d.$slide.width(),10),h=parseInt(d.$slide.height(),10),g=d.width,b=d.height;"image"!=d.type||d.hasError||!f||u.isAnimating||(n.fancybox.stop(f),u.isAnimating=!0,t=t===o?.5*p:t,e=e===o?.5*h:e,a=n.fancybox.getTranslate(f),c=g/a.width,l=b/a.height,s=.5*p-.5*g,r=.5*h-.5*b,g>p&&(s=a.left*c-(t*c-t),s>0&&(s=0),s<p-g&&(s=p-g)),b>h&&(r=a.top*l-(e*l-e),r>0&&(r=0),r<h-b&&(r=h-b)),u.updateCursor(g,b),n.fancybox.animate(f,{top:r,left:s,scaleX:c,scaleY:l},i||330,function(){u.isAnimating=!1}),u.SlideShow&&u.SlideShow.isActive&&u.SlideShow.stop())},scaleToFit:function(t){var e,o=this,i=o.current,a=i.$content;"image"!=i.type||i.hasError||!a||o.isAnimating||(n.fancybox.stop(a),o.isAnimating=!0,e=o.getFitPos(i),o.updateCursor(e.width,e.height),n.fancybox.animate(a,{top:e.top,left:e.left,scaleX:e.width/a.width(),scaleY:e.height/a.height()},t||330,function(){o.isAnimating=!1}))},getFitPos:function(t){var e,o,i,a,s,r=this,c=t.$content,l=t.width,u=t.height,d=t.opts.margin;return!(!c||!c.length||!l&&!u)&&("number"===n.type(d)&&(d=[d,d]),2==d.length&&(d=[d[0],d[1],d[0],d[1]]),e=parseInt(r.$refs.stage.width(),10)-(d[1]+d[3]),o=parseInt(r.$refs.stage.height(),10)-(d[0]+d[2]),i=Math.min(1,e/l,o/u),a=Math.floor(i*l),s=Math.floor(i*u),{top:Math.floor(.5*(o-s))+d[0],left:Math.floor(.5*(e-a))+d[3],width:a,height:s})},update:function(){var t=this;n.each(t.slides,function(e,n){t.updateSlide(n)})},updateSlide:function(t,e){var o=this,i=t&&t.$content;i&&(t.width||t.height)&&(o.isAnimating=!1,n.fancybox.stop(i),n.fancybox.setTranslate(i,o.getFitPos(t)),t.pos===o.currPos&&o.updateCursor()),t.$slide.trigger("refresh"),o.trigger("onUpdate",t)},centerSlide:function(t,e){var i,a,s=this;s.current&&(i=Math.round(t.$slide.width()),a=t.pos-s.current.pos,n.fancybox.animate(t.$slide,{top:0,left:a*i+a*t.opts.gutter,opacity:1},e===o?0:e,null,!1))},updateCursor:function(t,e){var n,i=this,a=i.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");i.current&&!i.isClosing&&(i.isZoomable()?(a.addClass("fancybox-is-zoomable"),n=t!==o&&e!==o?t<i.current.width&&e<i.current.height:i.isScaledDown(),n?a.addClass("fancybox-can-zoomIn"):i.current.opts.touch?a.addClass("fancybox-can-drag"):a.addClass("fancybox-can-zoomOut")):i.current.opts.touch&&a.addClass("fancybox-can-drag"))},isZoomable:function(){var t,e=this,o=e.current;if(o&&!e.isClosing)return!!("image"===o.type&&o.isLoaded&&!o.hasError&&("zoom"===o.opts.clickContent||n.isFunction(o.opts.clickContent)&&"zoom"===o.opts.clickContent(o))&&(t=e.getFitPos(o),o.width>t.width||o.height>t.height))},isScaledDown:function(){var t=this,e=t.current,o=e.$content,i=!1;return o&&(i=n.fancybox.getTranslate(o),i=i.width<e.width||i.height<e.height),i},canPan:function(){var t=this,e=t.current,n=e.$content,o=!1;return n&&(o=t.getFitPos(e),o=Math.abs(n.width()-o.width)>1||Math.abs(n.height()-o.height)>1),o},loadSlide:function(t){var e,o,i,a=this;if(!t.isLoading&&!t.isLoaded){switch(t.isLoading=!0,a.trigger("beforeLoad",t),e=t.type,o=t.$slide,o.off("refresh").trigger("onReset").addClass("fancybox-slide--"+(e||"unknown")).addClass(t.opts.slideClass),e){case"image":a.setImage(t);break;case"iframe":a.setIframe(t);break;case"html":a.setContent(t,t.src||t.content);break;case"inline":n(t.src).length?a.setContent(t,n(t.src)):a.setError(t);break;case"ajax":a.showLoading(t),i=n.ajax(n.extend({},t.opts.ajax.settings,{url:t.src,success:function(e,n){"success"===n&&a.setContent(t,e)},error:function(e,n){e&&"abort"!==n&&a.setError(t)}})),o.one("onReset",function(){i.abort()});break;case"video":a.setContent(t,'<video controls><source src="'+t.src+'" type="'+t.opts.videoFormat+"\">Your browser doesn't support HTML5 video</video>");break;default:a.setError(t)}return!0}},setImage:function(e){var o,i,a,s,r=this,c=e.opts.srcset||e.opts.image.srcset;if(c){a=t.devicePixelRatio||1,s=t.innerWidth*a,i=c.split(",").map(function(t){var e={};return t.trim().split(/\s+/).forEach(function(t,n){var o=parseInt(t.substring(0,t.length-1),10);return 0===n?e.url=t:void(o&&(e.value=o,e.postfix=t[t.length-1]))}),e}),i.sort(function(t,e){return t.value-e.value});for(var l=0;l<i.length;l++){var u=i[l];if("w"===u.postfix&&u.value>=s||"x"===u.postfix&&u.value>=a){o=u;break}}!o&&i.length&&(o=i[i.length-1]),o&&(e.src=o.url,e.width&&e.height&&"w"==o.postfix&&(e.height=e.width/e.height*o.value,e.width=o.value))}e.$content=n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide),e.opts.preload!==!1&&e.opts.width&&e.opts.height&&(e.opts.thumb||e.opts.$thumb)?(e.width=e.opts.width,e.height=e.opts.height,e.$ghost=n("<img />").one("error",function(){n(this).remove(),e.$ghost=null,r.setBigImage(e)}).one("load",function(){r.afterLoad(e),r.setBigImage(e)}).addClass("fancybox-image").appendTo(e.$content).attr("src",e.opts.thumb||e.opts.$thumb.attr("src"))):r.setBigImage(e)},setBigImage:function(t){var e=this,o=n("<img />");t.$image=o.one("error",function(){e.setError(t)}).one("load",function(){clearTimeout(t.timouts),t.timouts=null,e.isClosing||(t.width=t.opts.width||this.naturalWidth,t.height=t.opts.height||this.naturalHeight,t.opts.image.srcset&&o.attr("sizes","100vw").attr("srcset",t.opts.image.srcset),e.hideLoading(t),t.$ghost?t.timouts=setTimeout(function(){t.timouts=null,t.$ghost.hide()},Math.min(300,Math.max(1e3,t.height/1600))):e.afterLoad(t))}).addClass("fancybox-image").attr("src",t.src).appendTo(t.$content),(o[0].complete||"complete"==o[0].readyState)&&o[0].naturalWidth&&o[0].naturalHeight?o.trigger("load"):o[0].error?o.trigger("error"):t.timouts=setTimeout(function(){o[0].complete||t.hasError||e.showLoading(t)},100)},setIframe:function(t){var e,i=this,a=t.opts.iframe,s=t.$slide;t.$content=n('<div class="fancybox-content'+(a.preload?" fancybox-is-hidden":"")+'"></div>').css(a.css).appendTo(s),e=n(a.tpl.replace(/\{rnd\}/g,(new Date).getTime())).attr(a.attr).appendTo(t.$content),a.preload?(i.showLoading(t),e.on("load.fb error.fb",function(e){this.isReady=1,t.$slide.trigger("refresh"),i.afterLoad(t)}),s.on("refresh.fb",function(){var n,i,s,r=t.$content,c=a.css.width,l=a.css.height;if(1===e[0].isReady){try{i=e.contents(),s=i.find("body")}catch(t){}s&&s.length&&(c===o&&(n=e[0].contentWindow.document.documentElement.scrollWidth,c=Math.ceil(s.outerWidth(!0)+(r.width()-n)),c+=r.outerWidth()-r.innerWidth()),l===o&&(l=Math.ceil(s.outerHeight(!0)),l+=r.outerHeight()-r.innerHeight()),c&&r.width(c),l&&r.height(l)),r.removeClass("fancybox-is-hidden")}})):this.afterLoad(t),e.attr("src",t.src),t.opts.smallBtn===!0&&t.$content.prepend(i.translate(t,t.opts.btnTpl.smallBtn)),s.one("onReset",function(){try{n(this).find("iframe").hide().attr("src","//about:blank")}catch(t){}n(this).empty(),t.isLoaded=!1})},setContent:function(t,e){var o=this;o.isClosing||(o.hideLoading(t),t.$slide.empty(),l(e)&&e.parent().length?(e.parent(".fancybox-slide--inline").trigger("onReset"),t.$placeholder=n("<div></div>").hide().insertAfter(e),e.css("display","inline-block")):t.hasError||("string"===n.type(e)&&(e=n("<div>").append(n.trim(e)).contents(),3===e[0].nodeType&&(e=n("<div>").html(e))),t.opts.filter&&(e=n("<div>").html(e).find(t.opts.filter))),t.$slide.one("onReset",function(){n(this).find("video,audio").trigger("pause"),t.$placeholder&&(t.$placeholder.after(e.hide()).remove(),t.$placeholder=null),t.$smallBtn&&(t.$smallBtn.remove(),t.$smallBtn=null),t.hasError||(n(this).empty(),t.isLoaded=!1)}),t.$content=n(e).appendTo(t.$slide),this.afterLoad(t))},setError:function(t){t.hasError=!0,t.$slide.removeClass("fancybox-slide--"+t.type),this.setContent(t,this.translate(t,t.opts.errorTpl))},showLoading:function(t){var e=this;t=t||e.current,t&&!t.$spinner&&(t.$spinner=n(e.opts.spinnerTpl).appendTo(t.$slide))},hideLoading:function(t){var e=this;t=t||e.current,t&&t.$spinner&&(t.$spinner.remove(),delete t.$spinner)},afterLoad:function(t){var e=this;e.isClosing||(t.isLoading=!1,t.isLoaded=!0,e.trigger("afterLoad",t),e.hideLoading(t),t.opts.smallBtn&&!t.$smallBtn&&(t.$smallBtn=n(e.translate(t,t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first())),t.opts.protect&&t.$content&&!t.hasError&&(t.$content.on("contextmenu.fb",function(t){return 2==t.button&&t.preventDefault(),!0}),"image"===t.type&&n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),e.revealContent(t))},revealContent:function(t){var e,i,a,s,r,c=this,l=t.$slide,u=!1;return e=t.opts[c.firstRun?"animationEffect":"transitionEffect"],a=t.opts[c.firstRun?"animationDuration":"transitionDuration"],a=parseInt(t.forcedDuration===o?a:t.forcedDuration,10),!t.isMoved&&t.pos===c.currPos&&a||(e=!1),"zoom"!==e||t.pos===c.currPos&&a&&"image"===t.type&&!t.hasError&&(u=c.getThumbPos(t))||(e="fade"),"zoom"===e?(r=c.getFitPos(t),r.scaleX=r.width/u.width,r.scaleY=r.height/u.height,delete r.width,delete r.height,s=t.opts.zoomOpacity,"auto"==s&&(s=Math.abs(t.width/t.height-u.width/u.height)>.1),s&&(u.opacity=.1,r.opacity=1),n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"),u),f(t.$content),void n.fancybox.animate(t.$content,r,a,function(){c.complete()})):(c.updateSlide(t),e?(n.fancybox.stop(l),i="fancybox-animated fancybox-slide--"+(t.pos>=c.prevPos?"next":"previous")+" fancybox-fx-"+e,l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(i),t.$content.removeClass("fancybox-is-hidden"),f(l),void n.fancybox.animate(l,"fancybox-slide--current",a,function(e){l.removeClass(i).removeAttr("style"),t.pos===c.currPos&&c.complete()},!0)):(f(l),t.$content.removeClass("fancybox-is-hidden"),void(t.pos===c.currPos&&c.complete())))},getThumbPos:function(o){var i,a=this,s=!1,r=function(e){for(var o,i=e[0],a=i.getBoundingClientRect(),s=[];null!==i.parentElement;)"hidden"!==n(i.parentElement).css("overflow")&&"auto"!==n(i.parentElement).css("overflow")||s.push(i.parentElement.getBoundingClientRect()),i=i.parentElement;return o=s.every(function(t){var e=Math.min(a.right,t.right)-Math.max(a.left,t.left),n=Math.min(a.bottom,t.bottom)-Math.max(a.top,t.top);return e>0&&n>0}),o&&a.bottom>0&&a.right>0&&a.left<n(t).width()&&a.top<n(t).height()},c=o.opts.$thumb,l=c?c.offset():0;return l&&c[0].ownerDocument===e&&r(c)&&(i=a.$refs.stage.offset(),s={top:l.top-i.top+parseFloat(c.css("border-top-width")||0),left:l.left-i.left+parseFloat(c.css("border-left-width")||0),width:c.width(),height:c.height(),scaleX:1,scaleY:1}),s},complete:function(){var t=this,o=t.current,i={};o.isMoved||!o.isLoaded||o.isComplete||(o.isComplete=!0,o.$slide.siblings().trigger("onReset"),t.preload("inline"),f(o.$slide),o.$slide.addClass("fancybox-slide--complete"),n.each(t.slides,function(e,o){o.pos>=t.currPos-1&&o.pos<=t.currPos+1?i[o.pos]=o:o&&(n.fancybox.stop(o.$slide),o.$slide.off().remove())}),t.slides=i,t.updateCursor(),t.trigger("afterShow"),o.$slide.find("video,audio").first().trigger("play"),(n(e.activeElement).is("[disabled]")||o.opts.autoFocus&&"image"!=o.type&&"iframe"!==o.type)&&t.focus())},preload:function(t){var e=this,n=e.slides[e.currPos+1],o=e.slides[e.currPos-1];n&&n.type===t&&e.loadSlide(n),o&&o.type===t&&e.loadSlide(o)},focus:function(){var t,e=this.current;this.isClosing||(e&&e.isComplete&&(t=e.$slide.find("input[autofocus]:enabled:visible:first"),t.length||(t=e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))),t=t&&t.length?t:this.$refs.container,t.focus())},activate:function(){var t=this;n(".fancybox-container").each(function(){var e=n(this).data("FancyBox");e&&e.id!==t.id&&!e.isClosing&&(e.trigger("onDeactivate"),e.removeEvents(),e.isVisible=!1)}),t.isVisible=!0,(t.current||t.isIdle)&&(t.update(),t.updateControls()),t.trigger("onActivate"),t.addEvents()},close:function(t,e){var o,i,a,s,r,c,l=this,p=l.current,h=function(){l.cleanUp(t)};return!l.isClosing&&(l.isClosing=!0,l.trigger("beforeClose",t)===!1?(l.isClosing=!1,u(function(){l.update()}),!1):(l.removeEvents(),p.timouts&&clearTimeout(p.timouts),a=p.$content,o=p.opts.animationEffect,i=n.isNumeric(e)?e:o?p.opts.animationDuration:0,p.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"),p.$slide.siblings().trigger("onReset").remove(),i&&l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"),l.hideLoading(p),l.hideControls(),l.updateCursor(),"zoom"!==o||t!==!0&&a&&i&&"image"===p.type&&!p.hasError&&(c=l.getThumbPos(p))||(o="fade"),"zoom"===o?(n.fancybox.stop(a),r=n.fancybox.getTranslate(a),r.width=r.width*r.scaleX,r.height=r.height*r.scaleY,s=p.opts.zoomOpacity,"auto"==s&&(s=Math.abs(p.width/p.height-c.width/c.height)>.1),s&&(c.opacity=0),r.scaleX=r.width/c.width,r.scaleY=r.height/c.height,r.width=c.width,r.height=c.height,n.fancybox.setTranslate(p.$content,r),f(p.$content),n.fancybox.animate(p.$content,c,i,h),!0):(o&&i?t===!0?setTimeout(h,i):n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"),"fancybox-animated fancybox-slide--previous fancybox-fx-"+o,i,h):h(),!0)))},cleanUp:function(t){var o,i,a=this,r=n("body");a.current.$slide.trigger("onReset"),a.$refs.container.empty().remove(),a.trigger("afterClose",t),a.$lastFocus&&a.current.opts.backFocus&&a.$lastFocus.focus(),a.current=null,o=n.fancybox.getInstance(),o?o.activate():(s.scrollTop(a.scrollTop).scrollLeft(a.scrollLeft),r.removeClass("fancybox-active compensate-for-scrollbar"),r.hasClass("fancybox-iosfix")&&(i=parseInt(e.body.style.top,10),r.removeClass("fancybox-iosfix").css("top","").scrollTop(i*-1)),n("#fancybox-style-noscroll").remove())},trigger:function(t,e){var o,i=Array.prototype.slice.call(arguments,1),a=this,s=e&&e.opts?e:a.current;return s?i.unshift(s):s=a,i.unshift(a),n.isFunction(s.opts[t])&&(o=s.opts[t].apply(s,i)),o===!1?o:void("afterClose"!==t&&a.$refs?a.$refs.container.trigger(t+".fb",i):r.trigger(t+".fb",i))},updateControls:function(t){var e=this,n=e.current,o=n.index,i=n.opts.caption,a=e.$refs.container,s=e.$refs.caption;n.$slide.trigger("refresh"),e.$caption=i&&i.length?s.html(i):null,e.isHiddenControls||e.isIdle||e.showControls(),a.find("[data-fancybox-count]").html(e.group.length),a.find("[data-fancybox-index]").html(o+1),a.find("[data-fancybox-prev]").prop("disabled",!n.opts.loop&&o<=0),a.find("[data-fancybox-next]").prop("disabled",!n.opts.loop&&o>=e.group.length-1),"image"===n.type?a.find("[data-fancybox-download]").attr("href",n.opts.image.src||n.src).show():a.find("[data-fancybox-download],[data-fancybox-zoom]").hide()},hideControls:function(){this.isHiddenControls=!0,this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav")},showControls:function(){var t=this,e=t.current?t.current.opts:t.opts,n=t.$refs.container;t.isHiddenControls=!1,t.idleSecondsCounter=0,n.toggleClass("fancybox-show-toolbar",!(!e.toolbar||!e.buttons)).toggleClass("fancybox-show-infobar",!!(e.infobar&&t.group.length>1)).toggleClass("fancybox-show-nav",!!(e.arrows&&t.group.length>1)).toggleClass("fancybox-is-modal",!!e.modal),t.$caption?n.addClass("fancybox-show-caption "):n.removeClass("fancybox-show-caption")},toggleControls:function(){this.isHiddenControls?this.showControls():this.hideControls()}}),n.fancybox={version:"3.2.10",defaults:a,getInstance:function(t){var e=n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),o=Array.prototype.slice.call(arguments,1);return e instanceof p&&("string"===n.type(t)?e[t].apply(e,o):"function"===n.type(t)&&t.apply(e,o),e)},open:function(t,e,n){return new p(t,e,n)},close:function(t){var e=this.getInstance();e&&(e.close(),t===!0&&this.close())},destroy:function(){this.close(!0),r.off("click.fb-start")},isMobile:e.createTouch!==o&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),use3d:function(){var n=e.createElement("div");return t.getComputedStyle&&t.getComputedStyle(n).getPropertyValue("transform")&&!(e.documentMode&&e.documentMode<11)}(),getTranslate:function(t){var e;if(!t||!t.length)return!1;if(e=t.eq(0).css("transform"),e&&e.indexOf("matrix")!==-1?(e=e.split("(")[1],e=e.split(")")[0],e=e.split(",")):e=[],e.length)e=e.length>10?[e[13],e[12],e[0],e[5]]:[e[5],e[4],e[0],e[3]],e=e.map(parseFloat);else{e=[0,0,1,1];var n=/\.*translate\((.*)px,(.*)px\)/i,o=n.exec(t.eq(0).attr("style"));o&&(e[0]=parseFloat(o[2]),e[1]=parseFloat(o[1]))}return{top:e[0],left:e[1],scaleX:e[2],scaleY:e[3],opacity:parseFloat(t.css("opacity")),width:t.width(),height:t.height()}},setTranslate:function(t,e){var n="",i={};if(t&&e)return e.left===o&&e.top===o||(n=(e.left===o?t.position().left:e.left)+"px, "+(e.top===o?t.position().top:e.top)+"px",n=this.use3d?"translate3d("+n+", 0px)":"translate("+n+")"),e.scaleX!==o&&e.scaleY!==o&&(n=(n.length?n+" ":"")+"scale("+e.scaleX+", "+e.scaleY+")"),n.length&&(i.transform=n),e.opacity!==o&&(i.opacity=e.opacity),e.width!==o&&(i.width=e.width),e.height!==o&&(i.height=e.height),t.css(i)},animate:function(t,e,i,a,s){n.isFunction(i)&&(a=i,i=null),n.isPlainObject(e)||t.removeAttr("style"),t.on(d,function(i){(!i||!i.originalEvent||t.is(i.originalEvent.target)&&"z-index"!=i.originalEvent.propertyName)&&(n.fancybox.stop(t),n.isPlainObject(e)?(e.scaleX!==o&&e.scaleY!==o&&(t.css("transition-duration",""),e.width=Math.round(t.width()*e.scaleX),e.height=Math.round(t.height()*e.scaleY),e.scaleX=1,e.scaleY=1,n.fancybox.setTranslate(t,e)),s===!1&&t.removeAttr("style")):s!==!0&&t.removeClass(e),n.isFunction(a)&&a(i))}),n.isNumeric(i)&&t.css("transition-duration",i+"ms"),n.isPlainObject(e)?n.fancybox.setTranslate(t,e):t.addClass(e),e.scaleX&&t.hasClass("fancybox-image-wrap")&&t.parent().addClass("fancybox-is-scaling"),t.data("timer",setTimeout(function(){t.trigger("transitionend")},i+16))},stop:function(t){clearTimeout(t.data("timer")),t.off("transitionend").css("transition-duration",""),t.hasClass("fancybox-image-wrap")&&t.parent().removeClass("fancybox-is-scaling")}},n.fn.fancybox=function(t){var e;return t=t||{},e=t.selector||!1,e?n("body").off("click.fb-start",e).on("click.fb-start",e,{options:t},i):this.off("click.fb-start").on("click.fb-start",{items:this,options:t},i),this},r.on("click.fb-start","[data-fancybox]",i)}}(window,document,window.jQuery||jQuery),function(t){"use strict";var e=function(e,n,o){if(e)return o=o||"","object"===t.type(o)&&(o=t.param(o,!0)),t.each(n,function(t,n){e=e.replace("$"+t,n||"")}),o.length&&(e+=(e.indexOf("?")>0?"&":"?")+o),e},n={youtube:{matcher:/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"transparent",enablejsapi:1,html5:1},paramPlace:8,type:"iframe",url:"//www.youtube.com/embed/$4",thumb:"//img.youtube.com/vi/$4/hqdefault.jpg"
  },vimeo:{matcher:/^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1,api:1},paramPlace:3,type:"iframe",url:"//player.vimeo.com/video/$2"},metacafe:{matcher:/metacafe.com\/watch\/(\d+)\/(.*)?/,type:"iframe",url:"//www.metacafe.com/embed/$1/?ap=1"},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},type:"iframe",url:"//www.dailymotion.com/embed/video/$1"},vine:{matcher:/vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,type:"iframe",url:"//vine.co/v/$1/embed/simple"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},gmap_place:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/?ll="+(t[9]?t[9]+"&z="+Math.floor(t[10])+(t[12]?t[12].replace(/^\//,"&"):""):t[12])+"&output="+(t[12]&&t[12].indexOf("layer=c")>0?"svembed":"embed")}},gmap_search:{matcher:/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,type:"iframe",url:function(t){return"//maps.google."+t[2]+"/maps?q="+t[5].replace("query=","q=").replace("api=1","")+"&output=embed"}}};t(document).on("objectNeedsType.fb",function(o,i,a){var s,r,c,l,u,d,f,p=a.src||"",h=!1;s=t.extend(!0,{},n,a.opts.media),t.each(s,function(n,o){if(c=p.match(o.matcher)){if(h=o.type,d={},o.paramPlace&&c[o.paramPlace]){u=c[o.paramPlace],"?"==u[0]&&(u=u.substring(1)),u=u.split("&");for(var i=0;i<u.length;++i){var s=u[i].split("=",2);2==s.length&&(d[s[0]]=decodeURIComponent(s[1].replace(/\+/g," ")))}}return l=t.extend(!0,{},o.params,a.opts[n],d),p="function"===t.type(o.url)?o.url.call(this,c,l,a):e(o.url,c,l),r="function"===t.type(o.thumb)?o.thumb.call(this,c,l,a):e(o.thumb,c),"vimeo"===n&&(p=p.replace("&%23","#")),!1}}),h?(a.src=p,a.type=h,a.opts.thumb||a.opts.$thumb&&a.opts.$thumb.length||(a.opts.thumb=r),"iframe"===h&&(t.extend(!0,a.opts,{iframe:{preload:!1,attr:{scrolling:"no"}}}),a.contentProvider=f,a.opts.slideClass+=" fancybox-slide--"+("gmap_place"==f||"gmap_search"==f?"map":"video"))):p&&(a.type=a.opts.defaultType)})}(window.jQuery||jQuery),function(t,e,n){"use strict";var o=function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}}(),i=function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||function(e){t.clearTimeout(e)}}(),a=function(e){var n=[];e=e.originalEvent||e||t.e,e=e.touches&&e.touches.length?e.touches:e.changedTouches&&e.changedTouches.length?e.changedTouches:[e];for(var o in e)e[o].pageX?n.push({x:e[o].pageX,y:e[o].pageY}):e[o].clientX&&n.push({x:e[o].clientX,y:e[o].clientY});return n},s=function(t,e,n){return e&&t?"x"===n?t.x-e.x:"y"===n?t.y-e.y:Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)):0},r=function(t){if(t.is('a,area,button,[role="button"],input,label,select,summary,textarea')||n.isFunction(t.get(0).onclick)||t.data("selectable"))return!0;for(var e=0,o=t[0].attributes,i=o.length;e<i;e++)if("data-fancybox-"===o[e].nodeName.substr(0,14))return!0;return!1},c=function(e){var n=t.getComputedStyle(e)["overflow-y"],o=t.getComputedStyle(e)["overflow-x"],i=("scroll"===n||"auto"===n)&&e.scrollHeight>e.clientHeight,a=("scroll"===o||"auto"===o)&&e.scrollWidth>e.clientWidth;return i||a},l=function(t){for(var e=!1;;){if(e=c(t.get(0)))break;if(t=t.parent(),!t.length||t.hasClass("fancybox-stage")||t.is("body"))break}return e},u=function(t){var e=this;e.instance=t,e.$bg=t.$refs.bg,e.$stage=t.$refs.stage,e.$container=t.$refs.container,e.destroy(),e.$container.on("touchstart.fb.touch mousedown.fb.touch",n.proxy(e,"ontouchstart"))};u.prototype.destroy=function(){this.$container.off(".fb.touch")},u.prototype.ontouchstart=function(o){var i=this,c=n(o.target),u=i.instance,d=u.current,f=d.$content,p="touchstart"==o.type;if(p&&i.$container.off("mousedown.fb.touch"),(!o.originalEvent||2!=o.originalEvent.button)&&c.length&&!r(c)&&!r(c.parent())&&(c.is("img")||!(o.originalEvent.clientX>c[0].clientWidth+c.offset().left))){if(!d||i.instance.isAnimating||i.instance.isClosing)return o.stopPropagation(),void o.preventDefault();if(i.realPoints=i.startPoints=a(o),i.startPoints){if(o.stopPropagation(),i.startEvent=o,i.canTap=!0,i.$target=c,i.$content=f,i.opts=d.opts.touch,i.isPanning=!1,i.isSwiping=!1,i.isZooming=!1,i.isScrolling=!1,i.sliderStartPos=i.sliderLastPos||{top:0,left:0},i.contentStartPos=n.fancybox.getTranslate(i.$content),i.contentLastPos=null,i.startTime=(new Date).getTime(),i.distanceX=i.distanceY=i.distance=0,i.canvasWidth=Math.round(d.$slide[0].clientWidth),i.canvasHeight=Math.round(d.$slide[0].clientHeight),n(e).off(".fb.touch").on(p?"touchend.fb.touch touchcancel.fb.touch":"mouseup.fb.touch mouseleave.fb.touch",n.proxy(i,"ontouchend")).on(p?"touchmove.fb.touch":"mousemove.fb.touch",n.proxy(i,"ontouchmove")),n.fancybox.isMobile&&e.addEventListener("scroll",i.onscroll,!0),!i.opts&&!u.canPan()||!c.is(i.$stage)&&!i.$stage.find(c).length)return void(c.is("img")&&o.preventDefault());n.fancybox.isMobile&&(l(c)||l(c.parent()))||o.preventDefault(),1===i.startPoints.length&&("image"===d.type&&(i.contentStartPos.width>i.canvasWidth+1||i.contentStartPos.height>i.canvasHeight+1)?(n.fancybox.stop(i.$content),i.$content.css("transition-duration",""),i.isPanning=!0):i.isSwiping=!0,i.$container.addClass("fancybox-controls--isGrabbing")),2!==i.startPoints.length||u.isAnimating||d.hasError||"image"!==d.type||!d.isLoaded&&!d.$ghost||(i.canTap=!1,i.isSwiping=!1,i.isPanning=!1,i.isZooming=!0,n.fancybox.stop(i.$content),i.$content.css("transition-duration",""),i.centerPointStartX=.5*(i.startPoints[0].x+i.startPoints[1].x)-n(t).scrollLeft(),i.centerPointStartY=.5*(i.startPoints[0].y+i.startPoints[1].y)-n(t).scrollTop(),i.percentageOfImageAtPinchPointX=(i.centerPointStartX-i.contentStartPos.left)/i.contentStartPos.width,i.percentageOfImageAtPinchPointY=(i.centerPointStartY-i.contentStartPos.top)/i.contentStartPos.height,i.startDistanceBetweenFingers=s(i.startPoints[0],i.startPoints[1]))}}},u.prototype.onscroll=function(t){self.isScrolling=!0},u.prototype.ontouchmove=function(t){var e=this,o=n(t.target);return e.isScrolling||!o.is(e.$stage)&&!e.$stage.find(o).length?void(e.canTap=!1):(e.newPoints=a(t),void((e.opts||e.instance.canPan())&&e.newPoints&&e.newPoints.length&&(e.isSwiping&&e.isSwiping===!0||t.preventDefault(),e.distanceX=s(e.newPoints[0],e.startPoints[0],"x"),e.distanceY=s(e.newPoints[0],e.startPoints[0],"y"),e.distance=s(e.newPoints[0],e.startPoints[0]),e.distance>0&&(e.isSwiping?e.onSwipe(t):e.isPanning?e.onPan():e.isZooming&&e.onZoom()))))},u.prototype.onSwipe=function(e){var a,s=this,r=s.isSwiping,c=s.sliderStartPos.left||0;if(r!==!0)"x"==r&&(s.distanceX>0&&(s.instance.group.length<2||0===s.instance.current.index&&!s.instance.current.opts.loop)?c+=Math.pow(s.distanceX,.8):s.distanceX<0&&(s.instance.group.length<2||s.instance.current.index===s.instance.group.length-1&&!s.instance.current.opts.loop)?c-=Math.pow(-s.distanceX,.8):c+=s.distanceX),s.sliderLastPos={top:"x"==r?0:s.sliderStartPos.top+s.distanceY,left:c},s.requestId&&(i(s.requestId),s.requestId=null),s.requestId=o(function(){s.sliderLastPos&&(n.each(s.instance.slides,function(t,e){var o=e.pos-s.instance.currPos;n.fancybox.setTranslate(e.$slide,{top:s.sliderLastPos.top,left:s.sliderLastPos.left+o*s.canvasWidth+o*e.opts.gutter})}),s.$container.addClass("fancybox-is-sliding"))});else if(Math.abs(s.distance)>10){if(s.canTap=!1,s.instance.group.length<2&&s.opts.vertical?s.isSwiping="y":s.instance.isDragging||s.opts.vertical===!1||"auto"===s.opts.vertical&&n(t).width()>800?s.isSwiping="x":(a=Math.abs(180*Math.atan2(s.distanceY,s.distanceX)/Math.PI),s.isSwiping=a>45&&a<135?"y":"x"),s.canTap=!1,"y"===s.isSwiping&&n.fancybox.isMobile&&(l(s.$target)||l(s.$target.parent())))return void(s.isScrolling=!0);s.instance.isDragging=s.isSwiping,s.startPoints=s.newPoints,n.each(s.instance.slides,function(t,e){n.fancybox.stop(e.$slide),e.$slide.css("transition-duration",""),e.inTransition=!1,e.pos===s.instance.current.pos&&(s.sliderStartPos.left=n.fancybox.getTranslate(e.$slide).left)}),s.instance.SlideShow&&s.instance.SlideShow.isActive&&s.instance.SlideShow.stop()}},u.prototype.onPan=function(){var t=this;return s(t.newPoints[0],t.realPoints[0])<(n.fancybox.isMobile?10:5)?void(t.startPoints=t.newPoints):(t.canTap=!1,t.contentLastPos=t.limitMovement(),t.requestId&&(i(t.requestId),t.requestId=null),void(t.requestId=o(function(){n.fancybox.setTranslate(t.$content,t.contentLastPos)})))},u.prototype.limitMovement=function(){var t,e,n,o,i,a,s=this,r=s.canvasWidth,c=s.canvasHeight,l=s.distanceX,u=s.distanceY,d=s.contentStartPos,f=d.left,p=d.top,h=d.width,g=d.height;return i=h>r?f+l:f,a=p+u,t=Math.max(0,.5*r-.5*h),e=Math.max(0,.5*c-.5*g),n=Math.min(r-h,.5*r-.5*h),o=Math.min(c-g,.5*c-.5*g),h>r&&(l>0&&i>t&&(i=t-1+Math.pow(-t+f+l,.8)||0),l<0&&i<n&&(i=n+1-Math.pow(n-f-l,.8)||0)),g>c&&(u>0&&a>e&&(a=e-1+Math.pow(-e+p+u,.8)||0),u<0&&a<o&&(a=o+1-Math.pow(o-p-u,.8)||0)),{top:a,left:i,scaleX:d.scaleX,scaleY:d.scaleY}},u.prototype.limitPosition=function(t,e,n,o){var i=this,a=i.canvasWidth,s=i.canvasHeight;return n>a?(t=t>0?0:t,t=t<a-n?a-n:t):t=Math.max(0,a/2-n/2),o>s?(e=e>0?0:e,e=e<s-o?s-o:e):e=Math.max(0,s/2-o/2),{top:e,left:t}},u.prototype.onZoom=function(){var e=this,a=e.contentStartPos.width,r=e.contentStartPos.height,c=e.contentStartPos.left,l=e.contentStartPos.top,u=s(e.newPoints[0],e.newPoints[1]),d=u/e.startDistanceBetweenFingers,f=Math.floor(a*d),p=Math.floor(r*d),h=(a-f)*e.percentageOfImageAtPinchPointX,g=(r-p)*e.percentageOfImageAtPinchPointY,b=(e.newPoints[0].x+e.newPoints[1].x)/2-n(t).scrollLeft(),m=(e.newPoints[0].y+e.newPoints[1].y)/2-n(t).scrollTop(),y=b-e.centerPointStartX,v=m-e.centerPointStartY,x=c+(h+y),w=l+(g+v),$={top:w,left:x,scaleX:e.contentStartPos.scaleX*d,scaleY:e.contentStartPos.scaleY*d};e.canTap=!1,e.newWidth=f,e.newHeight=p,e.contentLastPos=$,e.requestId&&(i(e.requestId),e.requestId=null),e.requestId=o(function(){n.fancybox.setTranslate(e.$content,e.contentLastPos)})},u.prototype.ontouchend=function(t){var o=this,s=Math.max((new Date).getTime()-o.startTime,1),r=o.isSwiping,c=o.isPanning,l=o.isZooming,u=o.isScrolling;return o.endPoints=a(t),o.$container.removeClass("fancybox-controls--isGrabbing"),n(e).off(".fb.touch"),e.removeEventListener("scroll",o.onscroll,!0),o.requestId&&(i(o.requestId),o.requestId=null),o.isSwiping=!1,o.isPanning=!1,o.isZooming=!1,o.isScrolling=!1,o.instance.isDragging=!1,o.canTap?o.onTap(t):(o.speed=366,o.velocityX=o.distanceX/s*.5,o.velocityY=o.distanceY/s*.5,o.speedX=Math.max(.5*o.speed,Math.min(1.5*o.speed,1/Math.abs(o.velocityX)*o.speed)),void(c?o.endPanning():l?o.endZooming():o.endSwiping(r,u)))},u.prototype.endSwiping=function(t,e){var o=this,i=!1,a=o.instance.group.length;o.sliderLastPos=null,"y"==t&&!e&&Math.abs(o.distanceY)>50?(n.fancybox.animate(o.instance.current.$slide,{top:o.sliderStartPos.top+o.distanceY+150*o.velocityY,opacity:0},150),i=o.instance.close(!0,300)):"x"==t&&o.distanceX>50&&a>1?i=o.instance.previous(o.speedX):"x"==t&&o.distanceX<-50&&a>1&&(i=o.instance.next(o.speedX)),i!==!1||"x"!=t&&"y"!=t||(e||a<2?o.instance.centerSlide(o.instance.current,150):o.instance.jumpTo(o.instance.current.index)),o.$container.removeClass("fancybox-is-sliding")},u.prototype.endPanning=function(){var t,e,o,i=this;i.contentLastPos&&(i.opts.momentum===!1?(t=i.contentLastPos.left,e=i.contentLastPos.top):(t=i.contentLastPos.left+i.velocityX*i.speed,e=i.contentLastPos.top+i.velocityY*i.speed),o=i.limitPosition(t,e,i.contentStartPos.width,i.contentStartPos.height),o.width=i.contentStartPos.width,o.height=i.contentStartPos.height,n.fancybox.animate(i.$content,o,330))},u.prototype.endZooming=function(){var t,e,o,i,a=this,s=a.instance.current,r=a.newWidth,c=a.newHeight;a.contentLastPos&&(t=a.contentLastPos.left,e=a.contentLastPos.top,i={top:e,left:t,width:r,height:c,scaleX:1,scaleY:1},n.fancybox.setTranslate(a.$content,i),r<a.canvasWidth&&c<a.canvasHeight?a.instance.scaleToFit(150):r>s.width||c>s.height?a.instance.scaleToActual(a.centerPointStartX,a.centerPointStartY,150):(o=a.limitPosition(t,e,r,c),n.fancybox.setTranslate(a.content,n.fancybox.getTranslate(a.$content)),n.fancybox.animate(a.$content,o,150)))},u.prototype.onTap=function(t){var e,o=this,i=n(t.target),s=o.instance,r=s.current,c=t&&a(t)||o.startPoints,l=c[0]?c[0].x-o.$stage.offset().left:0,u=c[0]?c[0].y-o.$stage.offset().top:0,d=function(e){var i=r.opts[e];if(n.isFunction(i)&&(i=i.apply(s,[r,t])),i)switch(i){case"close":s.close(o.startEvent);break;case"toggleControls":s.toggleControls(!0);break;case"next":s.next();break;case"nextOrClose":s.group.length>1?s.next():s.close(o.startEvent);break;case"zoom":"image"==r.type&&(r.isLoaded||r.$ghost)&&(s.canPan()?s.scaleToFit():s.isScaledDown()?s.scaleToActual(l,u):s.group.length<2&&s.close(o.startEvent))}};if((!t.originalEvent||2!=t.originalEvent.button)&&(i.is("img")||!(l>i[0].clientWidth+i.offset().left))){if(i.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"))e="Outside";else if(i.is(".fancybox-slide"))e="Slide";else{if(!s.current.$content||!s.current.$content.find(i).addBack().filter(i).length)return;e="Content"}if(o.tapped){if(clearTimeout(o.tapped),o.tapped=null,Math.abs(l-o.tapX)>50||Math.abs(u-o.tapY)>50)return this;d("dblclick"+e)}else o.tapX=l,o.tapY=u,r.opts["dblclick"+e]&&r.opts["dblclick"+e]!==r.opts["click"+e]?o.tapped=setTimeout(function(){o.tapped=null,d("click"+e)},500):d("click"+e);return this}},n(e).on("onActivate.fb",function(t,e){e&&!e.Guestures&&(e.Guestures=new u(e))})}(window,document,window.jQuery||jQuery),function(t,e){"use strict";e.extend(!0,e.fancybox.defaults,{btnTpl:{slideShow:'<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'},slideShow:{autoStart:!1,speed:3e3}});var n=function(t){this.instance=t,this.init()};e.extend(n.prototype,{timer:null,isActive:!1,$button:null,init:function(){var t=this;t.$button=t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click",function(){t.toggle()}),(t.instance.group.length<2||!t.instance.group[t.instance.currIndex].opts.slideShow)&&t.$button.hide()},set:function(t){var e=this;e.instance&&e.instance.current&&(t===!0||e.instance.current.opts.loop||e.instance.currIndex<e.instance.group.length-1)?e.timer=setTimeout(function(){e.isActive&&e.instance.jumpTo((e.instance.currIndex+1)%e.instance.group.length)},e.instance.current.opts.slideShow.speed):(e.stop(),e.instance.idleSecondsCounter=0,e.instance.showControls())},clear:function(){var t=this;clearTimeout(t.timer),t.timer=null},start:function(){var t=this,e=t.instance.current;e&&(t.isActive=!0,t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"),t.set(!0))},stop:function(){var t=this,e=t.instance.current;t.clear(),t.$button.attr("title",e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),t.isActive=!1},toggle:function(){var t=this;t.isActive?t.stop():t.start()}}),e(t).on({"onInit.fb":function(t,e){e&&!e.SlideShow&&(e.SlideShow=new n(e))},"beforeShow.fb":function(t,e,n,o){var i=e&&e.SlideShow;o?i&&n.opts.slideShow.autoStart&&i.start():i&&i.isActive&&i.clear()},"afterShow.fb":function(t,e,n){var o=e&&e.SlideShow;o&&o.isActive&&o.set()},"afterKeydown.fb":function(n,o,i,a,s){var r=o&&o.SlideShow;!r||!i.opts.slideShow||80!==s&&32!==s||e(t.activeElement).is("button,a,input")||(a.preventDefault(),r.toggle())},"beforeClose.fb onDeactivate.fb":function(t,e){var n=e&&e.SlideShow;n&&n.stop()}}),e(t).on("visibilitychange",function(){var n=e.fancybox.getInstance(),o=n&&n.SlideShow;o&&o.isActive&&(t.hidden?o.clear():o.set())})}(document,window.jQuery||jQuery),function(t,e){"use strict";var n=function(){var e,n,o,i=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],a={};for(n=0;n<i.length;n++)if(e=i[n],e&&e[1]in t){for(o=0;o<e.length;o++)a[i[0][o]]=e[o];return a}return!1}();if(!n)return void(e&&e.fancybox&&(e.fancybox.defaults.btnTpl.fullScreen=!1));var o={request:function(e){e=e||t.documentElement,e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)},exit:function(){t[n.exitFullscreen]()},toggle:function(e){e=e||t.documentElement,this.isFullscreen()?this.exit():this.request(e)},isFullscreen:function(){return Boolean(t[n.fullscreenElement])},enabled:function(){return Boolean(t[n.fullscreenEnabled])}};e.extend(!0,e.fancybox.defaults,{btnTpl:{fullScreen:'<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'},fullScreen:{autoStart:!1}}),e(t).on({"onInit.fb":function(t,e){var n;e&&e.group[e.currIndex].opts.fullScreen?(n=e.$refs.container,n.on("click.fb-fullscreen","[data-fancybox-fullscreen]",function(t){t.stopPropagation(),t.preventDefault(),o.toggle(n[0])}),e.opts.fullScreen&&e.opts.fullScreen.autoStart===!0&&o.request(n[0]),e.FullScreen=o):e&&e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()},"afterKeydown.fb":function(t,e,n,o,i){e&&e.FullScreen&&70===i&&(o.preventDefault(),e.FullScreen.toggle(e.$refs.container[0]))},"beforeClose.fb":function(t){t&&t.FullScreen&&o.exit()}}),e(t).on(n.fullscreenchange,function(){var t=o.isFullscreen(),n=e.fancybox.getInstance();n&&(n.current&&"image"===n.current.type&&n.isAnimating&&(n.current.$content.css("transition","none"),n.isAnimating=!1,n.update(!0,!0,0)),n.trigger("onFullscreenChange",t),n.$refs.container.toggleClass("fancybox-is-fullscreen",t))})}(document,window.jQuery||jQuery),function(t,e){"use strict";e.fancybox.defaults=e.extend(!0,{btnTpl:{thumbs:'<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'},thumbs:{autoStart:!1,hideOnClose:!0,parentEl:".fancybox-container",axis:"y"}},e.fancybox.defaults);var n=function(t){this.init(t)};e.extend(n.prototype,{$button:null,$grid:null,$list:null,isVisible:!1,isActive:!1,init:function(t){var e=this;e.instance=t,t.Thumbs=e;var n=t.group[0],o=t.group[1];e.opts=t.group[t.currIndex].opts.thumbs,e.$button=t.$refs.toolbar.find("[data-fancybox-thumbs]"),e.opts&&n&&o&&("image"==n.type||n.opts.thumb||n.opts.$thumb)&&("image"==o.type||o.opts.thumb||o.opts.$thumb)?(e.$button.show().on("click",function(){e.toggle()}),e.isActive=!0):e.$button.hide()},create:function(){var t,n,o=this,i=o.instance,a=o.opts.parentEl;o.$grid=e('<div class="fancybox-thumbs fancybox-thumbs-'+o.opts.axis+'"></div>').appendTo(i.$refs.container.find(a).addBack().filter(a)),t="<ul>",e.each(i.group,function(e,o){n=o.opts.thumb||(o.opts.$thumb?o.opts.$thumb.attr("src"):null),n||"image"!==o.type||(n=o.src),n&&n.length&&(t+='<li data-index="'+e+'"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="'+n+'" /></li>')}),t+="</ul>",o.$list=e(t).appendTo(o.$grid).on("click","li",function(){i.jumpTo(e(this).data("index"))}),o.$list.find("img").hide().one("load",function(){var t,n,o,i,a=e(this).parent().removeClass("fancybox-thumbs-loading"),s=a.outerWidth(),r=a.outerHeight();t=this.naturalWidth||this.width,n=this.naturalHeight||this.height,o=t/s,i=n/r,o>=1&&i>=1&&(o>i?(t/=i,n=r):(t=s,n/=o)),e(this).css({width:Math.floor(t),height:Math.floor(n),"margin-top":n>r?Math.floor(.3*r-.3*n):Math.floor(.5*r-.5*n),"margin-left":Math.floor(.5*s-.5*t)}).show()}).each(function(){this.src=e(this).data("src")}),"x"===o.opts.axis&&o.$list.width(parseInt(o.$grid.css("padding-right"))+i.group.length*o.$list.children().eq(0).outerWidth(!0)+"px")},focus:function(t){var e,n,o=this,i=o.$list;o.instance.current&&(e=i.children().removeClass("fancybox-thumbs-active").filter('[data-index="'+o.instance.current.index+'"]').addClass("fancybox-thumbs-active"),n=e.position(),"y"===o.opts.axis&&(n.top<0||n.top>i.height()-e.outerHeight())?i.stop().animate({scrollTop:i.scrollTop()+n.top},t):"x"===o.opts.axis&&(n.left<i.parent().scrollLeft()||n.left>i.parent().scrollLeft()+(i.parent().width()-e.outerWidth()))&&i.parent().stop().animate({scrollLeft:n.left},t))},update:function(){this.instance.$refs.container.toggleClass("fancybox-show-thumbs",this.isVisible),this.isVisible?(this.$grid||this.create(),this.instance.trigger("onThumbsShow"),this.focus(0)):this.$grid&&this.instance.trigger("onThumbsHide"),this.instance.update()},hide:function(){this.isVisible=!1,this.update()},show:function(){this.isVisible=!0,this.update()},toggle:function(){this.isVisible=!this.isVisible,this.update()}}),e(t).on({"onInit.fb":function(t,e){var o;e&&!e.Thumbs&&(o=new n(e),o.isActive&&o.opts.autoStart===!0&&o.show())},"beforeShow.fb":function(t,e,n,o){var i=e&&e.Thumbs;i&&i.isVisible&&i.focus(o?0:250)},"afterKeydown.fb":function(t,e,n,o,i){var a=e&&e.Thumbs;a&&a.isActive&&71===i&&(o.preventDefault(),a.toggle())},"beforeClose.fb":function(t,e){var n=e&&e.Thumbs;n&&n.isVisible&&n.opts.hideOnClose!==!1&&n.$grid.hide()}})}(document,window.jQuery),function(t,e){"use strict";function n(t){var e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};return String(t).replace(/[&<>"'`=\/]/g,function(t){return e[t]})}e.extend(!0,e.fancybox.defaults,{btnTpl:{share:'<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'},share:{tpl:'<div class="fancybox-share"><h1>{{SHARE}}</h1><p class="fancybox-share__links"><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'}}),e(t).on("click","[data-fancybox-share]",function(){var t,o,i=e.fancybox.getInstance();i&&(t=i.current.opts.hash===!1?i.current.src:window.location,o=i.current.opts.share.tpl.replace(/\{\{media\}\}/g,"image"===i.current.type?encodeURIComponent(i.current.src):"").replace(/\{\{url\}\}/g,encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g,n(t)).replace(/\{\{descr\}\}/g,i.$caption?encodeURIComponent(i.$caption.text()):""),e.fancybox.open({src:i.translate(i,o),type:"html",opts:{animationEffect:"fade",animationDuration:250,afterLoad:function(t,e){e.$content.find(".fancybox-share__links a").click(function(){return window.open(this.href,"Share","width=550, height=450"),!1})}}}))})}(document,window.jQuery||jQuery),function(t,e,n){"use strict";function o(){var t=e.location.hash.substr(1),n=t.split("-"),o=n.length>1&&/^\+?\d+$/.test(n[n.length-1])?parseInt(n.pop(-1),10)||1:1,i=n.join("-");return o<1&&(o=1),{hash:t,index:o,gallery:i}}function i(t){var e;""!==t.gallery&&(e=n("[data-fancybox='"+n.escapeSelector(t.gallery)+"']").eq(t.index-1),e.length||(e=n("#"+n.escapeSelector(t.gallery))),e.length&&(s=!1,e.trigger("click")))}function a(t){var e;return!!t&&(e=t.current?t.current.opts:t.opts,e.hash||(e.$orig?e.$orig.data("fancybox"):""))}n.escapeSelector||(n.escapeSelector=function(t){var e=/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,n=function(t,e){return e?"\0"===t?"�":t.slice(0,-1)+"\\"+t.charCodeAt(t.length-1).toString(16)+" ":"\\"+t};return(t+"").replace(e,n)});var s=!0,r=null,c=null;n(function(){n.fancybox.defaults.hash!==!1&&(n(t).on({"onInit.fb":function(t,e){var n,i;e.group[e.currIndex].opts.hash!==!1&&(n=o(),i=a(e),i&&n.gallery&&i==n.gallery&&(e.currIndex=n.index-1))},"beforeShow.fb":function(n,o,i){var l;i&&i.opts.hash!==!1&&(l=a(o),l&&""!==l&&(e.location.hash.indexOf(l)<0&&(o.opts.origHash=e.location.hash),r=l+(o.group.length>1?"-"+(i.index+1):""),"replaceState"in e.history?(c&&clearTimeout(c),c=setTimeout(function(){e.history[s?"pushState":"replaceState"]({},t.title,e.location.pathname+e.location.search+"#"+r),c=null,s=!1},300)):e.location.hash=r))},"beforeClose.fb":function(o,i,s){var l,u;c&&clearTimeout(c),s.opts.hash!==!1&&(l=a(i),u=i&&i.opts.origHash?i.opts.origHash:"",l&&""!==l&&("replaceState"in history?e.history.replaceState({},t.title,e.location.pathname+e.location.search+u):(e.location.hash=u,n(e).scrollTop(i.scrollTop).scrollLeft(i.scrollLeft))),r=null)}}),n(e).on("hashchange.fb",function(){var t=o();n.fancybox.getInstance()?!r||r===t.gallery+"-"+t.index||1===t.index&&r==t.gallery||(r=null,n.fancybox.close()):""!==t.gallery&&i(t)}),setTimeout(function(){i(o())},50))})}(document,window,window.jQuery||jQuery),function(t,e){"use strict";var n=(new Date).getTime();e(t).on({"onInit.fb":function(t,e,o){e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll",function(t){var o=e.current,i=(new Date).getTime();e.group.length<1||o.opts.wheel===!1||"auto"===o.opts.wheel&&"image"!==o.type||(t.preventDefault(),t.stopPropagation(),o.$slide.hasClass("fancybox-animated")||(t=t.originalEvent||t,i-n<250||(n=i,e[(-t.deltaY||-t.deltaX||t.wheelDelta||-t.detail)<0?"next":"previous"]())))})}})}(document,window.jQuery||jQuery);

/*
 * Popups plugin
 */
;(function($) {
  function ContentPopup(opt) {
	this.options = $.extend({
	  holder: null,
	  popup: '.popup',
	  btnOpen: '.open',
	  btnClose: '.close',
	  openClass: 'popup-active',
	  clickEvent: 'click',
	  mode: 'click',
	  hideOnClickLink: true,
	  hideOnClickOutside: true,
	  delay: 50
	}, opt);
	if (this.options.holder) {
	  this.holder = $(this.options.holder);
	  this.init();
	}
  }
  ContentPopup.prototype = {
	init: function() {
	  this.findElements();
	  this.attachEvents();
	},
	findElements: function() {
	  this.popup = this.holder.find(this.options.popup);
	  this.btnOpen = this.holder.find(this.options.btnOpen);
	  this.btnClose = this.holder.find(this.options.btnClose);
	},
	attachEvents: function() {
	  // handle popup openers
	  var self = this;
	  this.clickMode = isTouchDevice || (self.options.mode === self.options.clickEvent);

	  if (this.clickMode) {
		// handle click mode
		this.btnOpen.bind(self.options.clickEvent + '.popup', function(e) {
		  if (self.holder.hasClass(self.options.openClass)) {
			if (self.options.hideOnClickLink) {
			  self.hidePopup();
			}
		  } else {
			self.showPopup();
		  }
		  e.preventDefault();
		});

		// prepare outside click handler
		this.outsideClickHandler = this.bind(this.outsideClickHandler, this);
	  } else {
		// handle hover mode
		var timer, delayedFunc = function(func) {
		  clearTimeout(timer);
		  timer = setTimeout(function() {
			func.call(self);
		  }, self.options.delay);
		};
		this.btnOpen.on('mouseover.popup', function() {
		  delayedFunc(self.showPopup);
		}).on('mouseout.popup', function() {
		  delayedFunc(self.hidePopup);
		});
		this.popup.on('mouseover.popup', function() {
		  delayedFunc(self.showPopup);
		}).on('mouseout.popup', function() {
		  delayedFunc(self.hidePopup);
		});
	  }

	  // handle close buttons
	  this.btnClose.on(self.options.clickEvent + '.popup', function(e) {
		self.hidePopup();
		e.preventDefault();
	  });
	},
	outsideClickHandler: function(e) {
	  // hide popup if clicked outside
	  var targetNode = $((e.changedTouches ? e.changedTouches[0] : e).target);
	  if (!targetNode.closest(this.popup).length && !targetNode.closest(this.btnOpen).length) {
		this.hidePopup();
	  }
	},
	showPopup: function() {
	  // reveal popup
	  this.holder.addClass(this.options.openClass);
	  this.popup.css({
		display: 'block'
	  });

	  // outside click handler
	  if (this.clickMode && this.options.hideOnClickOutside && !this.outsideHandlerActive) {
		this.outsideHandlerActive = true;
		$(document).on('click touchstart', this.outsideClickHandler);
	  }
	},
	hidePopup: function() {
	  // hide popup
	  this.holder.removeClass(this.options.openClass);
	  this.popup.css({
		display: 'none'
	  });

	  // outside click handler
	  if (this.clickMode && this.options.hideOnClickOutside && this.outsideHandlerActive) {
		this.outsideHandlerActive = false;
		$(document).off('click touchstart', this.outsideClickHandler);
	  }
	},
	bind: function(f, scope, forceArgs) {
	  return function() {
		return f.apply(scope, forceArgs ? [forceArgs] : arguments);
	  };
	},
	destroy: function() {
	  this.popup.removeAttr('style');
	  this.holder.removeClass(this.options.openClass);
	  this.btnOpen.add(this.btnClose).add(this.popup).off('.popup');
	  $(document).off('click touchstart', this.outsideClickHandler);
	}
  };

  // detect touch devices
  var isTouchDevice = /Windows Phone/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;

  // jQuery plugin interface
  $.fn.contentPopup = function(opt) {
	var args = Array.prototype.slice.call(arguments);
	var method = args[0];

	return this.each(function() {
	  var $holder = jQuery(this);
	  var instance = $holder.data('ContentPopup');

	  if (typeof opt === 'object' || typeof opt === 'undefined') {
		$holder.data('ContentPopup', new ContentPopup($.extend({
		  holder: this
		}, opt)));
	  } else if (typeof method === 'string' && instance) {
		if (typeof instance[method] === 'function') {
		  args.shift();
		  instance[method].apply(instance, args);
		}
	  }
	});
  };
}(jQuery));

/*
 * Simple Mobile Navigation
 */
;(function($) {
  function MobileNav(options) {
	this.options = $.extend({
	  container: null,
	  hideOnClickOutside: false,
	  menuActiveClass: 'nav-active',
	  menuOpener: '.nav-opener',
	  menuDrop: '.nav-drop',
	  toggleEvent: 'click',
	  outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
	}, options);
	this.initStructure();
	this.attachEvents();
  }
  MobileNav.prototype = {
	initStructure: function() {
	  this.page = $('html');
	  this.container = $(this.options.container);
	  this.opener = this.container.find(this.options.menuOpener);
	  this.drop = this.container.find(this.options.menuDrop);
	},
	attachEvents: function() {
	  var self = this;

	  if(activateResizeHandler) {
		activateResizeHandler();
		activateResizeHandler = null;
	  }

	  this.outsideClickHandler = function(e) {
		if(self.isOpened()) {
		  var target = $(e.target);
		  if(!target.closest(self.opener).length && !target.closest(self.drop).length) {
			self.hide();
		  }
		}
	  };

	  this.openerClickHandler = function(e) {
		e.preventDefault();
		self.toggle();
	  };

	  this.opener.on(this.options.toggleEvent, this.openerClickHandler);
	},
	isOpened: function() {
	  return this.container.hasClass(this.options.menuActiveClass);
	},
	show: function() {
	  this.container.addClass(this.options.menuActiveClass);
	  if(this.options.hideOnClickOutside) {
		this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
	  }
	},
	hide: function() {
	  this.container.removeClass(this.options.menuActiveClass);
	  if(this.options.hideOnClickOutside) {
		this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
	  }
	},
	toggle: function() {
	  if(this.isOpened()) {
		this.hide();
	  } else {
		this.show();
	  }
	},
	destroy: function() {
	  this.container.removeClass(this.options.menuActiveClass);
	  this.opener.off(this.options.toggleEvent, this.clickHandler);
	  this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
	}
  };

  var activateResizeHandler = function() {
	var win = $(window),
	  doc = $('html'),
	  resizeClass = 'resize-active',
	  flag, timer;
	var removeClassHandler = function() {
	  flag = false;
	  doc.removeClass(resizeClass);
	};
	var resizeHandler = function() {
	  if(!flag) {
		flag = true;
		doc.addClass(resizeClass);
	  }
	  clearTimeout(timer);
	  timer = setTimeout(removeClassHandler, 500);
	};
	win.on('resize orientationchange', resizeHandler);
  };

  $.fn.mobileNav = function(opt) {
	var args = Array.prototype.slice.call(arguments);
	var method = args[0];

	return this.each(function() {
	  var $container = jQuery(this);
	  var instance = $container.data('MobileNav');

	  if (typeof opt === 'object' || typeof opt === 'undefined') {
		$container.data('MobileNav', new MobileNav($.extend({
		  container: this
		}, opt)));
	  } else if (typeof method === 'string' && instance) {
		if (typeof instance[method] === 'function') {
		  args.shift();
		  instance[method].apply(instance, args);
		}
	  }
	});
  };
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;(function($){
  $.fn.sameHeight = function(opt) {
    var options = $.extend({
      skipClass: 'same-height-ignore',
      leftEdgeClass: 'same-height-left',
      rightEdgeClass: 'same-height-right',
      elements: '>*',
      flexible: false,
      multiLine: false,
      useMinHeight: false,
      biggestHeight: false
    },opt);
    return this.each(function(){
      var holder = $(this), postResizeTimer, ignoreResize;
      var elements = holder.find(options.elements).not('.' + options.skipClass);
      if(!elements.length) return;

      // resize handler
      function doResize() {
        elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
        if(options.multiLine) {
          // resize elements row by row
          resizeElementsByRows(elements, options);
        } else {
          // resize elements by holder
          resizeElements(elements, holder, options);
        }
      }
      doResize();

      // handle flexible layout / font resize
      var delayedResizeHandler = function() {
        if(!ignoreResize) {
          ignoreResize = true;
          doResize();
          clearTimeout(postResizeTimer);
          postResizeTimer = setTimeout(function() {
            doResize();
            setTimeout(function(){
              ignoreResize = false;
            }, 10);
          }, 100);
        }
      };

      // handle flexible/responsive layout
      if(options.flexible) {
        $(window).bind('resize orientationchange fontresize', delayedResizeHandler);
      }

      // handle complete page load including images and fonts
      $(window).bind('load', delayedResizeHandler);
    });
  };

  // detect css min-height support
  var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';

  // get elements by rows
  function resizeElementsByRows(boxes, options) {
    var currentRow = $(), maxHeight, maxCalcHeight = 0, firstOffset = boxes.eq(0).offset().top;
    boxes.each(function(ind){
      var curItem = $(this);
      if(curItem.offset().top === firstOffset) {
        currentRow = currentRow.add(this);
      } else {
        maxHeight = getMaxHeight(currentRow);
        maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
        currentRow = curItem;
        firstOffset = curItem.offset().top;
      }
    });
    if(currentRow.length) {
      maxHeight = getMaxHeight(currentRow);
      maxCalcHeight = Math.max(maxCalcHeight, resizeElements(currentRow, maxHeight, options));
    }
    if(options.biggestHeight) {
      boxes.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', maxCalcHeight);
    }
  }

  // calculate max element height
  function getMaxHeight(boxes) {
    var maxHeight = 0;
    boxes.each(function(){
      maxHeight = Math.max(maxHeight, $(this).outerHeight());
    });
    return maxHeight;
  }

  // resize helper function
  function resizeElements(boxes, parent, options) {
    var calcHeight;
    var parentHeight = typeof parent === 'number' ? parent : parent.height();
    boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
      var element = $(this);
      var depthDiffHeight = 0;
      var isBorderBox = element.css('boxSizing') === 'border-box' || element.css('-moz-box-sizing') === 'border-box' || element.css('-webkit-box-sizing') === 'border-box';

      if(typeof parent !== 'number') {
        element.parents().each(function(){
          var tmpParent = $(this);
          if(parent.is(this)) {
            return false;
          } else {
            depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
          }
        });
      }
      calcHeight = parentHeight - depthDiffHeight;
      calcHeight -= isBorderBox ? 0 : element.outerHeight() - element.height();

      if(calcHeight > 0) {
        element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
      }
    });
    boxes.filter(':first').addClass(options.leftEdgeClass);
    boxes.filter(':last').addClass(options.rightEdgeClass);
    return calcHeight;
  }
}(jQuery));

// navigation accesibility module
function TouchNav(opt) {
  this.options = {
    hoverClass: 'hover',
    menuItems: 'li',
    menuOpener: 'a',
    menuDrop: 'ul',
    navBlock: null
  };
  for (var p in opt) {
    if (opt.hasOwnProperty(p)) {
      this.options[p] = opt[p];
    }
  }
  this.init();
}
TouchNav.isActiveOn = function(elem) {
  return elem && elem.touchNavActive;
};
TouchNav.prototype = {
  init: function() {
    if (typeof this.options.navBlock === 'string') {
      this.menu = document.getElementById(this.options.navBlock);
    } else if (typeof this.options.navBlock === 'object') {
      this.menu = this.options.navBlock;
    }
    if (this.menu) {
      this.addEvents();
    }
  },
  addEvents: function() {
    // attach event handlers
    var self = this;
    var touchEvent = (navigator.pointerEnabled && 'pointerdown') || (navigator.msPointerEnabled && 'MSPointerDown') || (this.isTouchDevice && 'touchstart');
    this.menuItems = lib.queryElementsBySelector(this.options.menuItems, this.menu);

    var initMenuItem = function(item) {
      var currentDrop = lib.queryElementsBySelector(self.options.menuDrop, item)[0],
        currentOpener = lib.queryElementsBySelector(self.options.menuOpener, item)[0];

      // only for touch input devices
      if (currentDrop && currentOpener && (self.isTouchDevice || self.isPointerDevice)) {
        lib.event.add(currentOpener, 'click', lib.bind(self.clickHandler, self));
        lib.event.add(currentOpener, 'mousedown', lib.bind(self.mousedownHandler, self));
        lib.event.add(currentOpener, touchEvent, function(e) {
          if (!self.isTouchPointerEvent(e)) {
            self.preventCurrentClick = false;
            return;
          }
          self.touchFlag = true;
          self.currentItem = item;
          self.currentLink = currentOpener;
          self.pressHandler.apply(self, arguments);
        });
      }
      // for desktop computers and touch devices
      jQuery(item)
        .bind('mouseenter', function() {
          if (!self.touchFlag) {
            self.currentItem = item;
            self.mouseoverHandler();
          }
        });
      jQuery(item)
        .bind('mouseleave', function() {
          if (!self.touchFlag) {
            self.currentItem = item;
            self.mouseoutHandler();
          }
        });
      item.touchNavActive = true;
    };

    // addd handlers for all menu items
    for (var i = 0; i < this.menuItems.length; i++) {
      initMenuItem(self.menuItems[i]);
    }

    // hide dropdowns when clicking outside navigation
    if (this.isTouchDevice || this.isPointerDevice) {
      lib.event.add(document.documentElement, 'mousedown', lib.bind(this.clickOutsideHandler, this));
      lib.event.add(document.documentElement, touchEvent, lib.bind(this.clickOutsideHandler, this));
    }
  },
  mousedownHandler: function(e) {
    if (this.touchFlag) {
      e.preventDefault();
      this.touchFlag = false;
      this.preventCurrentClick = false;
    }
  },
  mouseoverHandler: function() {
    lib.addClass(this.currentItem, this.options.hoverClass);
    jQuery(this.currentItem)
      .trigger('itemhover');
  },
  mouseoutHandler: function() {
    lib.removeClass(this.currentItem, this.options.hoverClass);
    jQuery(this.currentItem)
      .trigger('itemleave');
  },
  hideActiveDropdown: function() {
    for (var i = 0; i < this.menuItems.length; i++) {
      if (lib.hasClass(this.menuItems[i], this.options.hoverClass)) {
        lib.removeClass(this.menuItems[i], this.options.hoverClass);
        jQuery(this.menuItems[i])
          .trigger('itemleave');
      }
    }
    this.activeParent = null;
  },
  pressHandler: function(e) {
    // hide previous drop (if active)
    if (this.currentItem !== this.activeParent) {
      if (this.activeParent && this.currentItem.parentNode === this.activeParent.parentNode) {
        lib.removeClass(this.activeParent, this.options.hoverClass);
      } else if (!this.isParent(this.activeParent, this.currentLink)) {
        this.hideActiveDropdown();
      }
    }
    // handle current drop
    this.activeParent = this.currentItem;
    if (lib.hasClass(this.currentItem, this.options.hoverClass)) {
      this.preventCurrentClick = false;
    } else {
      e.preventDefault();
      this.preventCurrentClick = true;
      lib.addClass(this.currentItem, this.options.hoverClass);
      jQuery(this.currentItem)
        .trigger('itemhover');
    }
  },
  clickHandler: function(e) {
    // prevent first click on link
    if (this.preventCurrentClick) {
      e.preventDefault();
    }
  },
  clickOutsideHandler: function(event) {
    var e = event.changedTouches ? event.changedTouches[0] : event;
    if (this.activeParent && !this.isParent(this.menu, e.target)) {
      this.hideActiveDropdown();
      this.touchFlag = false;
    }
  },
  isParent: function(parent, child) {
    while (child.parentNode) {
      if (child.parentNode == parent) {
        return true;
      }
      child = child.parentNode;
    }
    return false;
  },
  isTouchPointerEvent: function(e) {
    return (e.type.indexOf('touch') > -1) ||
      (navigator.pointerEnabled && e.pointerType === 'touch') ||
      (navigator.msPointerEnabled && e.pointerType == e.MSPOINTER_TYPE_TOUCH);
  },
  isPointerDevice: (function() {
    return !!(navigator.pointerEnabled || navigator.msPointerEnabled);
  }()),
  isTouchDevice: (function() {
    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  }())
};

/*
 * Utility module
 */
lib = {
  hasClass: function(el,cls) {
    return el && el.className ? el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')) : false;
  },
  addClass: function(el,cls) {
    if (el && !this.hasClass(el,cls)) el.className += " "+cls;
  },
  removeClass: function(el,cls) {
    if (el && this.hasClass(el,cls)) {el.className=el.className.replace(new RegExp('(\\s|^)'+cls+'(\\s|$)'),' ');}
  },
  extend: function(obj) {
    for(var i = 1; i < arguments.length; i++) {
      for(var p in arguments[i]) {
        if(arguments[i].hasOwnProperty(p)) {
          obj[p] = arguments[i][p];
        }
      }
    }
    return obj;
  },
  each: function(obj, callback) {
    var property, len;
    if(typeof obj.length === 'number') {
      for(property = 0, len = obj.length; property < len; property++) {
        if(callback.call(obj[property], property, obj[property]) === false) {
          break;
        }
      }
    } else {
      for(property in obj) {
        if(obj.hasOwnProperty(property)) {
          if(callback.call(obj[property], property, obj[property]) === false) {
            break;
          }
        }
      }
    }
  },
  event: (function() {
    var fixEvent = function(e) {
      e = e || window.event;
      if(e.isFixed) return e; else e.isFixed = true;
      if(!e.target) e.target = e.srcElement;
      e.preventDefault = e.preventDefault || function() {this.returnValue = false;};
      e.stopPropagation = e.stopPropagation || function() {this.cancelBubble = true;};
      return e;
    };
    return {
      add: function(elem, event, handler) {
        if(!elem.events) {
          elem.events = {};
          elem.handle = function(e) {
            var ret, handlers = elem.events[e.type];
            e = fixEvent(e);
            for(var i = 0, len = handlers.length; i < len; i++) {
              if(handlers[i]) {
                ret = handlers[i].call(elem, e);
                if(ret === false) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
            }
          };
        }
        if(!elem.events[event]) {
          elem.events[event] = [];
          if(elem.addEventListener) elem.addEventListener(event, elem.handle, false);
          else if(elem.attachEvent) elem.attachEvent('on'+event, elem.handle);
        }
        elem.events[event].push(handler);
      },
      remove: function(elem, event, handler) {
        var handlers = elem.events[event];
        for(var i = handlers.length - 1; i >= 0; i--) {
          if(handlers[i] === handler) {
            handlers.splice(i,1);
          }
        }
        if(!handlers.length) {
          delete elem.events[event];
          if(elem.removeEventListener) elem.removeEventListener(event, elem.handle, false);
          else if(elem.detachEvent) elem.detachEvent('on'+event, elem.handle);
        }
      }
    };
  }()),
  queryElementsBySelector: function(selector, scope) {
    scope = scope || document;
    if(!selector) return [];
    if(selector === '>*') return scope.children;
    if(typeof document.querySelectorAll === 'function') {
      return scope.querySelectorAll(selector);
    }
    var selectors = selector.split(',');
    var resultList = [];
    for(var s = 0; s < selectors.length; s++) {
      var currentContext = [scope || document];
      var tokens = selectors[s].replace(/^\s+/,'').replace(/\s+$/,'').split(' ');
      for (var i = 0; i < tokens.length; i++) {
        token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');
        if (token.indexOf('#') > -1) {
          var bits = token.split('#'), tagName = bits[0], id = bits[1];
          var element = document.getElementById(id);
          if (element && tagName && element.nodeName.toLowerCase() != tagName) {
            return [];
          }
          currentContext = element ? [element] : [];
          continue;
        }
        if (token.indexOf('.') > -1) {
          var bits = token.split('.'), tagName = bits[0] || '*', className = bits[1], found = [], foundCount = 0;
          for (var h = 0; h < currentContext.length; h++) {
            var elements;
            if (tagName == '*') {
              elements = currentContext[h].getElementsByTagName('*');
            } else {
              elements = currentContext[h].getElementsByTagName(tagName);
            }
            for (var j = 0; j < elements.length; j++) {
              found[foundCount++] = elements[j];
            }
          }
          currentContext = [];
          var currentContextIndex = 0;
          for (var k = 0; k < found.length; k++) {
            if (found[k].className && found[k].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))) {
              currentContext[currentContextIndex++] = found[k];
            }
          }
          continue;
        }
        if (token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/)) {
          var tagName = RegExp.$1 || '*', attrName = RegExp.$2, attrOperator = RegExp.$3, attrValue = RegExp.$4;
          if(attrName.toLowerCase() == 'for' && this.browser.msie && this.browser.version < 8) {
            attrName = 'htmlFor';
          }
          var found = [], foundCount = 0;
          for (var h = 0; h < currentContext.length; h++) {
            var elements;
            if (tagName == '*') {
              elements = currentContext[h].getElementsByTagName('*');
            } else {
              elements = currentContext[h].getElementsByTagName(tagName);
            }
            for (var j = 0; elements[j]; j++) {
              found[foundCount++] = elements[j];
            }
          }
          currentContext = [];
          var currentContextIndex = 0, checkFunction;
          switch (attrOperator) {
            case '=': checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue) }; break;
            case '~': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('(\\s|^)'+attrValue+'(\\s|$)'))) }; break;
            case '|': checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))) }; break;
            case '^': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0) }; break;
            case '$': checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length) }; break;
            case '*': checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1) }; break;
            default : checkFunction = function(e) { return e.getAttribute(attrName) };
          }
          currentContext = [];
          var currentContextIndex = 0;
          for (var k = 0; k < found.length; k++) {
            if (checkFunction(found[k])) {
              currentContext[currentContextIndex++] = found[k];
            }
          }
          continue;
        }
        tagName = token;
        var found = [], foundCount = 0;
        for (var h = 0; h < currentContext.length; h++) {
          var elements = currentContext[h].getElementsByTagName(tagName);
          for (var j = 0; j < elements.length; j++) {
            found[foundCount++] = elements[j];
          }
        }
        currentContext = found;
      }
      resultList = [].concat(resultList,currentContext);
    }
    return resultList;
  },
  trim: function (str) {
    return str.replace(/^\s+/, '').replace(/\s+$/, '');
  },
  bind: function(f, scope, forceArgs){
    return function() {return f.apply(scope, typeof forceArgs !== 'undefined' ? [forceArgs] : arguments);};
  }
};

/*
 * Responsive Layout helper
 */
window.ResponsiveHelper = (function($){
  // init variables
  var handlers = [],
	prevWinWidth,
	win = $(window),
	nativeMatchMedia = false;

  // detect match media support
  if(window.matchMedia) {
	if(window.Window && window.matchMedia === Window.prototype.matchMedia) {
	  nativeMatchMedia = true;
	} else if(window.matchMedia.toString().indexOf('native') > -1) {
	  nativeMatchMedia = true;
	}
  }

  // prepare resize handler
  function resizeHandler() {
	var winWidth = win.width();
	if(winWidth !== prevWinWidth) {
	  prevWinWidth = winWidth;

	  // loop through range groups
	  $.each(handlers, function(index, rangeObject){
		// disable current active area if needed
		$.each(rangeObject.data, function(property, item) {
		  if(item.currentActive && !matchRange(item.range[0], item.range[1])) {
			item.currentActive = false;
			if(typeof item.disableCallback === 'function') {
			  item.disableCallback();
			}
		  }
		});

		// enable areas that match current width
		$.each(rangeObject.data, function(property, item) {
		  if(!item.currentActive && matchRange(item.range[0], item.range[1])) {
			// make callback
			item.currentActive = true;
			if(typeof item.enableCallback === 'function') {
			  item.enableCallback();
			}
		  }
		});
	  });
	}
  }
  win.bind('load resize orientationchange', resizeHandler);

  // test range
  function matchRange(r1, r2) {
	var mediaQueryString = '';
	if(r1 > 0) {
	  mediaQueryString += '(min-width: ' + r1 + 'px)';
	}
	if(r2 < Infinity) {
	  mediaQueryString += (mediaQueryString ? ' and ' : '') + '(max-width: ' + r2 + 'px)';
	}
	return matchQuery(mediaQueryString, r1, r2);
  }

  // media query function
  function matchQuery(query, r1, r2) {
	if(window.matchMedia && nativeMatchMedia) {
	  return matchMedia(query).matches;
	} else if(window.styleMedia) {
	  return styleMedia.matchMedium(query);
	} else if(window.media) {
	  return media.matchMedium(query);
	} else {
	  return prevWinWidth >= r1 && prevWinWidth <= r2;
	}
  }

  // range parser
  function parseRange(rangeStr) {
	var rangeData = rangeStr.split('..');
	var x1 = parseInt(rangeData[0], 10) || -Infinity;
	var x2 = parseInt(rangeData[1], 10) || Infinity;
	return [x1, x2].sort(function(a, b){
	  return a - b;
	});
  }

  // export public functions
  return {
	addRange: function(ranges) {
	  // parse data and add items to collection
	  var result = {data:{}};
	  $.each(ranges, function(property, data){
		result.data[property] = {
		  range: parseRange(property),
		  enableCallback: data.on,
		  disableCallback: data.off
		};
	  });
	  handlers.push(result);

	  // call resizeHandler to recalculate all events
	  prevWinWidth = null;
	  resizeHandler();
	}
  };
}(jQuery));

/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function(root, factory) {

  'use strict';
  if (typeof define === 'function' && define.amd) {
	define(['jquery'], factory);
  } else if (typeof exports === 'object') {
	module.exports = factory(require('jquery'));
  } else {
	root.jcf = factory(jQuery);
  }
}(this, function($) {

  'use strict';

  // define version
  var version = '1.1.3';

  // private variables
  var customInstances = [];

  // default global options
  var commonOptions = {
	optionsKey: 'jcf',
	dataKey: 'jcf-instance',
	rtlClass: 'jcf-rtl',
	focusClass: 'jcf-focus',
	pressedClass: 'jcf-pressed',
	disabledClass: 'jcf-disabled',
	hiddenClass: 'jcf-hidden',
	resetAppearanceClass: 'jcf-reset-appearance',
	unselectableClass: 'jcf-unselectable'
  };

  // detect device type
  var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
	isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  commonOptions.isMobileDevice = !!(isTouchDevice || isWinPhoneDevice);

  var isIOS = /(iPad|iPhone).*OS ([0-9_]*) .*/.exec(navigator.userAgent);
  if(isIOS) isIOS = parseFloat(isIOS[2].replace(/_/g, '.'));
  commonOptions.ios = isIOS;

  // create global stylesheet if custom forms are used
  var createStyleSheet = function() {
	var styleTag = $('<style>').appendTo('head'),
	  styleSheet = styleTag.prop('sheet') || styleTag.prop('styleSheet');

	// crossbrowser style handling
	var addCSSRule = function(selector, rules, index) {
	  if (styleSheet.insertRule) {
		styleSheet.insertRule(selector + '{' + rules + '}', index);
	  } else {
		styleSheet.addRule(selector, rules, index);
	  }
	};

	// add special rules
	addCSSRule('.' + commonOptions.hiddenClass, 'position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none');
	addCSSRule('.' + commonOptions.rtlClass + ' .' + commonOptions.hiddenClass, 'right:-9999px !important; left: auto !important');
	addCSSRule('.' + commonOptions.unselectableClass, '-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);');
	addCSSRule('.' + commonOptions.resetAppearanceClass, 'background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);');

	// detect rtl pages
	var html = $('html'), body = $('body');
	if (html.css('direction') === 'rtl' || body.css('direction') === 'rtl') {
	  html.addClass(commonOptions.rtlClass);
	}

	// handle form reset event
	html.on('reset', function() {
	  setTimeout(function() {
		api.refreshAll();
	  }, 0);
	});

	// mark stylesheet as created
	commonOptions.styleSheetCreated = true;
  };

  // simplified pointer events handler
  (function() {
	var pointerEventsSupported = navigator.pointerEnabled || navigator.msPointerEnabled,
	  touchEventsSupported = ('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch,
	  eventList, eventMap = {}, eventPrefix = 'jcf-';

	// detect events to attach
	if (pointerEventsSupported) {
	  eventList = {
		pointerover: navigator.pointerEnabled ? 'pointerover' : 'MSPointerOver',
		pointerdown: navigator.pointerEnabled ? 'pointerdown' : 'MSPointerDown',
		pointermove: navigator.pointerEnabled ? 'pointermove' : 'MSPointerMove',
		pointerup: navigator.pointerEnabled ? 'pointerup' : 'MSPointerUp'
	  };
	} else {
	  eventList = {
		pointerover: 'mouseover',
		pointerdown: 'mousedown' + (touchEventsSupported ? ' touchstart' : ''),
		pointermove: 'mousemove' + (touchEventsSupported ? ' touchmove' : ''),
		pointerup: 'mouseup' + (touchEventsSupported ? ' touchend' : '')
	  };
	}

	// create event map
	$.each(eventList, function(targetEventName, fakeEventList) {
	  $.each(fakeEventList.split(' '), function(index, fakeEventName) {
		eventMap[fakeEventName] = targetEventName;
	  });
	});

	// jQuery event hooks
	$.each(eventList, function(eventName, eventHandlers) {
	  eventHandlers = eventHandlers.split(' ');
	  $.event.special[eventPrefix + eventName] = {
		setup: function() {
		  var self = this;
		  $.each(eventHandlers, function(index, fallbackEvent) {
			if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
			else self['on' + fallbackEvent] = fixEvent;
		  });
		},
		teardown: function() {
		  var self = this;
		  $.each(eventHandlers, function(index, fallbackEvent) {
			if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
			else self['on' + fallbackEvent] = null;
		  });
		}
	  };
	});

	// check that mouse event are not simulated by mobile browsers
	var lastTouch = null;
	var mouseEventSimulated = function(e) {
	  var dx = Math.abs(e.pageX - lastTouch.x),
		dy = Math.abs(e.pageY - lastTouch.y),
		rangeDistance = 25;

	  if (dx <= rangeDistance && dy <= rangeDistance) {
		return true;
	  }
	};

	// normalize event
	var fixEvent = function(e) {
	  var origEvent = e || window.event,
		touchEventData = null,
		targetEventName = eventMap[origEvent.type];

	  e = $.event.fix(origEvent);
	  e.type = eventPrefix + targetEventName;

	  if (origEvent.pointerType) {
		switch (origEvent.pointerType) {
		  case 2: e.pointerType = 'touch'; break;
		  case 3: e.pointerType = 'pen'; break;
		  case 4: e.pointerType = 'mouse'; break;
		  default: e.pointerType = origEvent.pointerType;
		}
	  } else {
		e.pointerType = origEvent.type.substr(0, 5); // "mouse" or "touch" word length
	  }

	  if (!e.pageX && !e.pageY) {
		touchEventData = origEvent.changedTouches ? origEvent.changedTouches[0] : origEvent;
		e.pageX = touchEventData.pageX;
		e.pageY = touchEventData.pageY;
	  }

	  if (origEvent.type === 'touchend') {
		lastTouch = { x: e.pageX, y: e.pageY };
	  }
	  if (e.pointerType === 'mouse' && lastTouch && mouseEventSimulated(e)) {
		return;
	  } else {
		return ($.event.dispatch || $.event.handle).call(this, e);
	  }
	};
  }());

  // custom mousewheel/trackpad handler
  (function() {
	var wheelEvents = ('onwheel' in document || document.documentMode >= 9 ? 'wheel' : 'mousewheel DOMMouseScroll').split(' '),
	  shimEventName = 'jcf-mousewheel';

	$.event.special[shimEventName] = {
	  setup: function() {
		var self = this;
		$.each(wheelEvents, function(index, fallbackEvent) {
		  if (self.addEventListener) self.addEventListener(fallbackEvent, fixEvent, false);
		  else self['on' + fallbackEvent] = fixEvent;
		});
	  },
	  teardown: function() {
		var self = this;
		$.each(wheelEvents, function(index, fallbackEvent) {
		  if (self.addEventListener) self.removeEventListener(fallbackEvent, fixEvent, false);
		  else self['on' + fallbackEvent] = null;
		});
	  }
	};

	var fixEvent = function(e) {
	  var origEvent = e || window.event;
	  e = $.event.fix(origEvent);
	  e.type = shimEventName;

	  // old wheel events handler
	  if ('detail'      in origEvent) { e.deltaY = -origEvent.detail;      }
	  if ('wheelDelta'  in origEvent) { e.deltaY = -origEvent.wheelDelta;  }
	  if ('wheelDeltaY' in origEvent) { e.deltaY = -origEvent.wheelDeltaY; }
	  if ('wheelDeltaX' in origEvent) { e.deltaX = -origEvent.wheelDeltaX; }

	  // modern wheel event handler
	  if ('deltaY' in origEvent) {
		e.deltaY = origEvent.deltaY;
	  }
	  if ('deltaX' in origEvent) {
		e.deltaX = origEvent.deltaX;
	  }

	  // handle deltaMode for mouse wheel
	  e.delta = e.deltaY || e.deltaX;
	  if (origEvent.deltaMode === 1) {
		var lineHeight = 16;
		e.delta *= lineHeight;
		e.deltaY *= lineHeight;
		e.deltaX *= lineHeight;
	  }

	  return ($.event.dispatch || $.event.handle).call(this, e);
	};
  }());

  // extra module methods
  var moduleMixin = {
	// provide function for firing native events
	fireNativeEvent: function(elements, eventName) {
	  $(elements).each(function() {
		var element = this, eventObject;
		if (element.dispatchEvent) {
		  eventObject = document.createEvent('HTMLEvents');
		  eventObject.initEvent(eventName, true, true);
		  element.dispatchEvent(eventObject);
		} else if (document.createEventObject) {
		  eventObject = document.createEventObject();
		  eventObject.target = element;
		  element.fireEvent('on' + eventName, eventObject);
		}
	  });
	},
	// bind event handlers for module instance (functions beggining with "on")
	bindHandlers: function() {
	  var self = this;
	  $.each(self, function(propName, propValue) {
		if (propName.indexOf('on') === 0 && $.isFunction(propValue)) {
		  // dont use $.proxy here because it doesn't create unique handler
		  self[propName] = function() {
			return propValue.apply(self, arguments);
		  };
		}
	  });
	}
  };

  // public API
  var api = {
	version: version,
	modules: {},
	getOptions: function() {
	  return $.extend({}, commonOptions);
	},
	setOptions: function(moduleName, moduleOptions) {
	  if (arguments.length > 1) {
		// set module options
		if (this.modules[moduleName]) {
		  $.extend(this.modules[moduleName].prototype.options, moduleOptions);
		}
	  } else {
		// set common options
		$.extend(commonOptions, moduleName);
	  }
	},
	addModule: function(proto) {
	  // add module to list
	  var Module = function(options) {
		// save instance to collection
		if (!options.element.data(commonOptions.dataKey)) {
		  options.element.data(commonOptions.dataKey, this);
		}
		customInstances.push(this);

		// save options
		this.options = $.extend({}, commonOptions, this.options, getInlineOptions(options.element), options);

		// bind event handlers to instance
		this.bindHandlers();

		// call constructor
		this.init.apply(this, arguments);
	  };

	  // parse options from HTML attribute
	  var getInlineOptions = function(element) {
		var dataOptions = element.data(commonOptions.optionsKey),
		  attrOptions = element.attr(commonOptions.optionsKey);

		if (dataOptions) {
		  return dataOptions;
		} else if (attrOptions) {
		  try {
			return $.parseJSON(attrOptions);
		  } catch (e) {
			// ignore invalid attributes
		  }
		}
	  };

	  // set proto as prototype for new module
	  Module.prototype = proto;

	  // add mixin methods to module proto
	  $.extend(proto, moduleMixin);
	  if (proto.plugins) {
		$.each(proto.plugins, function(pluginName, plugin) {
		  $.extend(plugin.prototype, moduleMixin);
		});
	  }

	  // override destroy method
	  var originalDestroy = Module.prototype.destroy;
	  Module.prototype.destroy = function() {
		this.options.element.removeData(this.options.dataKey);

		for (var i = customInstances.length - 1; i >= 0; i--) {
		  if (customInstances[i] === this) {
			customInstances.splice(i, 1);
			break;
		  }
		}

		if (originalDestroy) {
		  originalDestroy.apply(this, arguments);
		}
	  };

	  // save module to list
	  this.modules[proto.name] = Module;
	},
	getInstance: function(element) {
	  return $(element).data(commonOptions.dataKey);
	},
	replace: function(elements, moduleName, customOptions) {
	  var self = this,
		instance;

	  if (!commonOptions.styleSheetCreated) {
		createStyleSheet();
	  }

	  $(elements).each(function() {
		var moduleOptions,
		  element = $(this);

		instance = element.data(commonOptions.dataKey);
		if (instance) {
		  instance.refresh();
		} else {
		  if (!moduleName) {
			$.each(self.modules, function(currentModuleName, module) {
			  if (module.prototype.matchElement.call(module.prototype, element)) {
				moduleName = currentModuleName;
				return false;
			  }
			});
		  }
		  if (moduleName) {
			moduleOptions = $.extend({ element: element }, customOptions);
			instance = new self.modules[moduleName](moduleOptions);
		  }
		}
	  });
	  return instance;
	},
	refresh: function(elements) {
	  $(elements).each(function() {
		var instance = $(this).data(commonOptions.dataKey);
		if (instance) {
		  instance.refresh();
		}
	  });
	},
	destroy: function(elements) {
	  $(elements).each(function() {
		var instance = $(this).data(commonOptions.dataKey);
		if (instance) {
		  instance.destroy();
		}
	  });
	},
	replaceAll: function(context) {
	  var self = this;
	  $.each(this.modules, function(moduleName, module) {
		$(module.prototype.selector, context).each(function() {
		  if (this.className.indexOf('jcf-ignore') < 0) {
			self.replace(this, moduleName);
		  }
		});
	  });
	},
	refreshAll: function(context) {
	  if (context) {
		$.each(this.modules, function(moduleName, module) {
		  $(module.prototype.selector, context).each(function() {
			var instance = $(this).data(commonOptions.dataKey);
			if (instance) {
			  instance.refresh();
			}
		  });
		});
	  } else {
		for (var i = customInstances.length - 1; i >= 0; i--) {
		  customInstances[i].refresh();
		}
	  }
	},
	destroyAll: function(context) {
	  if (context) {
		$.each(this.modules, function(moduleName, module) {
		  $(module.prototype.selector, context).each(function(index, element) {
			var instance = $(element).data(commonOptions.dataKey);
			if (instance) {
			  instance.destroy();
			}
		  });
		});
	  } else {
		while (customInstances.length) {
		  customInstances[0].destroy();
		}
	  }
	}
  };

  // always export API to the global window object
  window.jcf = api;

  return api;
}));

 /*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($, window) {

  'use strict';

  jcf.addModule({
	name: 'Select',
	selector: 'select',
	options: {
	  element: null,
	  multipleCompactStyle: false
	},
	plugins: {
	  ListBox: ListBox,
	  ComboBox: ComboBox,
	  SelectList: SelectList
	},
	matchElement: function(element) {
	  return element.is('select');
	},
	init: function() {
	  this.element = $(this.options.element);
	  this.createInstance();
	},
	isListBox: function() {
	  return this.element.is('[size]:not([jcf-size]), [multiple]');
	},
	createInstance: function() {
	  if (this.instance) {
		this.instance.destroy();
	  }
	  if (this.isListBox() && !this.options.multipleCompactStyle) {
		this.instance = new ListBox(this.options);
	  } else {
		this.instance = new ComboBox(this.options);
	  }
	},
	refresh: function() {
	  var typeMismatch = (this.isListBox() && this.instance instanceof ComboBox) ||
				(!this.isListBox() && this.instance instanceof ListBox);

	  if (typeMismatch) {
		this.createInstance();
	  } else {
		this.instance.refresh();
	  }
	},
	destroy: function() {
	  this.instance.destroy();
	}
  });

  // combobox module
  function ComboBox(options) {
	this.options = $.extend({
	  wrapNative: true,
	  wrapNativeOnMobile: true,
	  fakeDropInBody: true,
	  useCustomScroll: true,
	  flipDropToFit: true,
	  maxVisibleItems: 10,
	  fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
	  fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
	  optionClassPrefix: 'jcf-option-',
	  selectClassPrefix: 'jcf-select-',
	  dropContentSelector: '.jcf-select-drop-content',
	  selectTextSelector: '.jcf-select-text',
	  dropActiveClass: 'jcf-drop-active',
	  flipDropClass: 'jcf-drop-flipped'
	}, options);
	this.init();
  }
  $.extend(ComboBox.prototype, {
	init: function() {
	  this.initStructure();
	  this.bindHandlers();
	  this.attachEvents();
	  this.refresh();
	},
	initStructure: function() {
	  // prepare structure
	  this.win = $(window);
	  this.doc = $(document);
	  this.realElement = $(this.options.element);
	  this.fakeElement = $(this.options.fakeAreaStructure).insertAfter(this.realElement);
	  this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector);
	  this.selectText = $('<span></span>').appendTo(this.selectTextContainer);
	  makeUnselectable(this.fakeElement);

	  // copy classes from original select
	  this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));

	  // handle compact multiple style
	  if (this.realElement.prop('multiple')) {
		this.fakeElement.addClass('jcf-compact-multiple');
	  }

	  // detect device type and dropdown behavior
	  if (this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative) {
		this.options.wrapNative = true;
	  }

	  if (this.options.wrapNative) {
		// wrap native select inside fake block
		this.realElement.prependTo(this.fakeElement).css({
		  position: 'absolute',
		  height: '100%',
		  width: '100%'
		}).addClass(this.options.resetAppearanceClass);
	  } else {
		// just hide native select
		this.realElement.addClass(this.options.hiddenClass);
		this.fakeElement.attr('title', this.realElement.attr('title'));
		this.fakeDropTarget = this.options.fakeDropInBody ? $('body') : this.fakeElement;
	  }
	},
	attachEvents: function() {
	  // delayed refresh handler
	  var self = this;
	  this.delayedRefresh = function() {
		setTimeout(function() {
		  self.refresh();
		  if (self.list) {
			self.list.refresh();
			self.list.scrollToActiveOption();
		  }
		}, 1);
	  };

	  // native dropdown event handlers
	  if (this.options.wrapNative) {
		this.realElement.on({
		  focus: this.onFocus,
		  change: this.onChange,
		  click: this.onChange,
		  keydown: this.onChange
		});
	  } else {
		// custom dropdown event handlers
		this.realElement.on({
		  focus: this.onFocus,
		  change: this.onChange,
		  keydown: this.onKeyDown
		});
		this.fakeElement.on({
		  'jcf-pointerdown': this.onSelectAreaPress
		});
	  }
	},
	onKeyDown: function(e) {
	  if (e.which === 13) {
		this.toggleDropdown();
	  } else if (this.dropActive) {
		this.delayedRefresh();
	  }
	},
	onChange: function() {
	  this.refresh();
	},
	onFocus: function() {
	  if (!this.pressedFlag || !this.focusedFlag) {
		this.fakeElement.addClass(this.options.focusClass);
		this.realElement.on('blur', this.onBlur);
		this.toggleListMode(true);
		this.focusedFlag = true;
	  }
	},
	onBlur: function() {
	  if (!this.pressedFlag) {
		this.fakeElement.removeClass(this.options.focusClass);
		this.realElement.off('blur', this.onBlur);
		this.toggleListMode(false);
		this.focusedFlag = false;
	  }
	},
	onResize: function() {
	  if (this.dropActive) {
		this.hideDropdown();
	  }
	},
	onSelectDropPress: function() {
	  this.pressedFlag = true;
	},
	onSelectDropRelease: function(e, pointerEvent) {
	  this.pressedFlag = false;
	  if (pointerEvent.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	},
	onSelectAreaPress: function(e) {
	  // skip click if drop inside fake element or real select is disabled
	  var dropClickedInsideFakeElement = !this.options.fakeDropInBody && $(e.target).closest(this.dropdown).length;
	  if (dropClickedInsideFakeElement || e.button > 1 || this.realElement.is(':disabled')) {
		return;
	  }

	  // toggle dropdown visibility
	  this.selectOpenedByEvent = e.pointerType;
	  this.toggleDropdown();

	  // misc handlers
	  if (!this.focusedFlag) {
		if (e.pointerType === 'mouse') {
		  this.realElement.focus();
		} else {
		  this.onFocus(e);
		}
	  }
	  this.pressedFlag = true;
	  this.fakeElement.addClass(this.options.pressedClass);
	  this.doc.on('jcf-pointerup', this.onSelectAreaRelease);
	},
	onSelectAreaRelease: function(e) {
	  if (this.focusedFlag && e.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	  this.pressedFlag = false;
	  this.fakeElement.removeClass(this.options.pressedClass);
	  this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
	},
	onOutsideClick: function(e) {
	  var target = $(e.target),
		clickedInsideSelect = target.closest(this.fakeElement).length || target.closest(this.dropdown).length;

	  if (!clickedInsideSelect) {
		this.hideDropdown();
	  }
	},
	onSelect: function() {
	  this.refresh();

	  if (this.realElement.prop('multiple')) {
		this.repositionDropdown();
	  } else {
		this.hideDropdown();
	  }

	  this.fireNativeEvent(this.realElement, 'change');
	},
	toggleListMode: function(state) {
	  if (!this.options.wrapNative) {
		if (state) {
		  // temporary change select to list to avoid appearing of native dropdown
		  this.realElement.attr({
			size: 4,
			'jcf-size': ''
		  });
		} else {
		  // restore select from list mode to dropdown select
		  if (!this.options.wrapNative) {
			this.realElement.removeAttr('size jcf-size');
		  }
		}
	  }
	},
	createDropdown: function() {
	  // destroy previous dropdown if needed
	  if (this.dropdown) {
		this.list.destroy();
		this.dropdown.remove();
	  }

	  // create new drop container
	  this.dropdown = $(this.options.fakeDropStructure).appendTo(this.fakeDropTarget);
	  this.dropdown.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
	  makeUnselectable(this.dropdown);

	  // handle compact multiple style
	  if (this.realElement.prop('multiple')) {
		this.dropdown.addClass('jcf-compact-multiple');
	  }

	  // set initial styles for dropdown in body
	  if (this.options.fakeDropInBody) {
		this.dropdown.css({
		  position: 'absolute',
		  top: -9999
		});
	  }

	  // create new select list instance
	  this.list = new SelectList({
		useHoverClass: true,
		handleResize: false,
		alwaysPreventMouseWheel: true,
		maxVisibleItems: this.options.maxVisibleItems,
		useCustomScroll: this.options.useCustomScroll,
		holder: this.dropdown.find(this.options.dropContentSelector),
		multipleSelectWithoutKey: this.realElement.prop('multiple'),
		element: this.realElement
	  });
	  $(this.list).on({
		select: this.onSelect,
		press: this.onSelectDropPress,
		release: this.onSelectDropRelease
	  });
	},
	repositionDropdown: function() {
	  var selectOffset = this.fakeElement.offset(),
		selectWidth = this.fakeElement.outerWidth(),
		selectHeight = this.fakeElement.outerHeight(),
		dropHeight = this.dropdown.css('width', selectWidth).outerHeight(),
		winScrollTop = this.win.scrollTop(),
		winHeight = this.win.height(),
		calcTop, calcLeft, bodyOffset, needFlipDrop = false;

	  // check flip drop position
	  if (selectOffset.top + selectHeight + dropHeight > winScrollTop + winHeight && selectOffset.top - dropHeight > winScrollTop) {
		needFlipDrop = true;
	  }

	  if (this.options.fakeDropInBody) {
		bodyOffset = this.fakeDropTarget.css('position') !== 'static' ? this.fakeDropTarget.offset().top : 0;
		if (this.options.flipDropToFit && needFlipDrop) {
		  // calculate flipped dropdown position
		  calcLeft = selectOffset.left;
		  calcTop = selectOffset.top - dropHeight - bodyOffset;
		} else {
		  // calculate default drop position
		  calcLeft = selectOffset.left;
		  calcTop = selectOffset.top + selectHeight - bodyOffset;
		}

		// update drop styles
		this.dropdown.css({
		  width: selectWidth,
		  left: calcLeft,
		  top: calcTop
		});
	  }

	  // refresh flipped class
	  this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && needFlipDrop);
	},
	showDropdown: function() {
	  // do not show empty custom dropdown
	  if (!this.realElement.prop('options').length) {
		return;
	  }

	  // create options list if not created
	  if (!this.dropdown) {
		this.createDropdown();
	  }

	  // show dropdown
	  this.dropActive = true;
	  this.dropdown.appendTo(this.fakeDropTarget);
	  this.fakeElement.addClass(this.options.dropActiveClass);
	  this.refreshSelectedText();
	  this.repositionDropdown();
	  this.list.setScrollTop(this.savedScrollTop);
	  this.list.refresh();

	  // add temporary event handlers
	  this.win.on('resize', this.onResize);
	  this.doc.on('jcf-pointerdown', this.onOutsideClick);
	},
	hideDropdown: function() {
	  if (this.dropdown) {
		this.savedScrollTop = this.list.getScrollTop();
		this.fakeElement.removeClass(this.options.dropActiveClass + ' ' + this.options.flipDropClass);
		this.dropdown.removeClass(this.options.flipDropClass).detach();
		this.doc.off('jcf-pointerdown', this.onOutsideClick);
		this.win.off('resize', this.onResize);
		this.dropActive = false;
		if (this.selectOpenedByEvent === 'touch') {
		  this.onBlur();
		}
	  }
	},
	toggleDropdown: function() {
	  if (this.dropActive) {
		this.hideDropdown();
	  } else {
		this.showDropdown();
	  }
	},
	refreshSelectedText: function() {
	  // redraw selected area
	  var selectedIndex = this.realElement.prop('selectedIndex'),
		selectedOption = this.realElement.prop('options')[selectedIndex],
		selectedOptionImage = selectedOption ? selectedOption.getAttribute('data-image') : null,
		selectedOptionText = '',
		selectedOptionClasses,
		self = this;

	  if (this.realElement.prop('multiple')) {
		$.each(this.realElement.prop('options'), function(index, option) {
		  if (option.selected) {
			selectedOptionText += (selectedOptionText ? ', ' : '') + option.innerHTML;
		  }
		});
		if (!selectedOptionText) {
		  selectedOptionText = self.realElement.attr('placeholder') || '';
		}
		this.selectText.removeAttr('class').html(selectedOptionText);
	  } else if (!selectedOption) {
		if (this.selectImage) {
		  this.selectImage.hide();
		}
		this.selectText.removeAttr('class').empty();
	  } else if (this.currentSelectedText !== selectedOption.innerHTML || this.currentSelectedImage !== selectedOptionImage) {
		selectedOptionClasses = getPrefixedClasses(selectedOption.className, this.options.optionClassPrefix);
		this.selectText.attr('class', selectedOptionClasses).html(selectedOption.innerHTML);

		if (selectedOptionImage) {
		  if (!this.selectImage) {
			this.selectImage = $('<img>').prependTo(this.selectTextContainer).hide();
		  }
		  this.selectImage.attr('src', selectedOptionImage).show();
		} else if (this.selectImage) {
		  this.selectImage.hide();
		}

		this.currentSelectedText = selectedOption.innerHTML;
		this.currentSelectedImage = selectedOptionImage;
	  }
	},
	refresh: function() {
	  // refresh fake select visibility
	  if (this.realElement.prop('style').display === 'none') {
		this.fakeElement.hide();
	  } else {
		this.fakeElement.show();
	  }

	  // refresh selected text
	  this.refreshSelectedText();

	  // handle disabled state
	  this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
	},
	destroy: function() {
	  // restore structure
	  if (this.options.wrapNative) {
		this.realElement.insertBefore(this.fakeElement).css({
		  position: '',
		  height: '',
		  width: ''
		}).removeClass(this.options.resetAppearanceClass);
	  } else {
		this.realElement.removeClass(this.options.hiddenClass);
		if (this.realElement.is('[jcf-size]')) {
		  this.realElement.removeAttr('size jcf-size');
		}
	  }

	  // removing element will also remove its event handlers
	  this.fakeElement.remove();

	  // remove other event handlers
	  this.doc.off('jcf-pointerup', this.onSelectAreaRelease);
	  this.realElement.off({
		focus: this.onFocus
	  });
	}
  });

  // listbox module
  function ListBox(options) {
	this.options = $.extend({
	  wrapNative: true,
	  useCustomScroll: true,
	  fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
	  selectClassPrefix: 'jcf-select-',
	  listHolder: '.jcf-list-wrapper'
	}, options);
	this.init();
  }
  $.extend(ListBox.prototype, {
	init: function() {
	  this.bindHandlers();
	  this.initStructure();
	  this.attachEvents();
	},
	initStructure: function() {
	  this.realElement = $(this.options.element);
	  this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
	  this.listHolder = this.fakeElement.find(this.options.listHolder);
	  makeUnselectable(this.fakeElement);

	  // copy classes from original select
	  this.fakeElement.addClass(getPrefixedClasses(this.realElement.prop('className'), this.options.selectClassPrefix));
	  this.realElement.addClass(this.options.hiddenClass);

	  this.list = new SelectList({
		useCustomScroll: this.options.useCustomScroll,
		holder: this.listHolder,
		selectOnClick: false,
		element: this.realElement
	  });
	},
	attachEvents: function() {
	  // delayed refresh handler
	  var self = this;
	  this.delayedRefresh = function(e) {
		if (e && e.which === 16) {
		  // ignore SHIFT key
		  return;
		} else {
		  clearTimeout(self.refreshTimer);
		  self.refreshTimer = setTimeout(function() {
			self.refresh();
			self.list.scrollToActiveOption();
		  }, 1);
		}
	  };

	  // other event handlers
	  this.realElement.on({
		focus: this.onFocus,
		click: this.delayedRefresh,
		keydown: this.delayedRefresh
	  });

	  // select list event handlers
	  $(this.list).on({
		select: this.onSelect,
		press: this.onFakeOptionsPress,
		release: this.onFakeOptionsRelease
	  });
	},
	onFakeOptionsPress: function(e, pointerEvent) {
	  this.pressedFlag = true;
	  if (pointerEvent.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	},
	onFakeOptionsRelease: function(e, pointerEvent) {
	  this.pressedFlag = false;
	  if (pointerEvent.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	},
	onSelect: function() {
	  this.fireNativeEvent(this.realElement, 'change');
	  this.fireNativeEvent(this.realElement, 'click');
	},
	onFocus: function() {
	  if (!this.pressedFlag || !this.focusedFlag) {
		this.fakeElement.addClass(this.options.focusClass);
		this.realElement.on('blur', this.onBlur);
		this.focusedFlag = true;
	  }
	},
	onBlur: function() {
	  if (!this.pressedFlag) {
		this.fakeElement.removeClass(this.options.focusClass);
		this.realElement.off('blur', this.onBlur);
		this.focusedFlag = false;
	  }
	},
	refresh: function() {
	  this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(':disabled'));
	  this.list.refresh();
	},
	destroy: function() {
	  this.list.destroy();
	  this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass);
	  this.fakeElement.remove();
	}
  });

  // options list module
  function SelectList(options) {
	this.options = $.extend({
	  holder: null,
	  maxVisibleItems: 10,
	  selectOnClick: true,
	  useHoverClass: false,
	  useCustomScroll: false,
	  handleResize: true,
	  multipleSelectWithoutKey: false,
	  alwaysPreventMouseWheel: false,
	  indexAttribute: 'data-index',
	  cloneClassPrefix: 'jcf-option-',
	  containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
	  containerSelector: '.jcf-list-content',
	  captionClass: 'jcf-optgroup-caption',
	  disabledClass: 'jcf-disabled',
	  optionClass: 'jcf-option',
	  groupClass: 'jcf-optgroup',
	  hoverClass: 'jcf-hover',
	  selectedClass: 'jcf-selected',
	  scrollClass: 'jcf-scroll-active'
	}, options);
	this.init();
  }
  $.extend(SelectList.prototype, {
	init: function() {
	  this.initStructure();
	  this.refreshSelectedClass();
	  this.attachEvents();
	},
	initStructure: function() {
	  this.element = $(this.options.element);
	  this.indexSelector = '[' + this.options.indexAttribute + ']';
	  this.container = $(this.options.containerStructure).appendTo(this.options.holder);
	  this.listHolder = this.container.find(this.options.containerSelector);
	  this.lastClickedIndex = this.element.prop('selectedIndex');
	  this.rebuildList();
	},
	attachEvents: function() {
	  this.bindHandlers();
	  this.listHolder.on('jcf-pointerdown', this.indexSelector, this.onItemPress);
	  this.listHolder.on('jcf-pointerdown', this.onPress);

	  if (this.options.useHoverClass) {
		this.listHolder.on('jcf-pointerover', this.indexSelector, this.onHoverItem);
	  }
	},
	onPress: function(e) {
	  $(this).trigger('press', e);
	  this.listHolder.on('jcf-pointerup', this.onRelease);
	},
	onRelease: function(e) {
	  $(this).trigger('release', e);
	  this.listHolder.off('jcf-pointerup', this.onRelease);
	},
	onHoverItem: function(e) {
	  var hoverIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
	  this.fakeOptions.removeClass(this.options.hoverClass).eq(hoverIndex).addClass(this.options.hoverClass);
	},
	onItemPress: function(e) {
	  if (e.pointerType === 'touch' || this.options.selectOnClick) {
		// select option after "click"
		this.tmpListOffsetTop = this.list.offset().top;
		this.listHolder.on('jcf-pointerup', this.indexSelector, this.onItemRelease);
	  } else {
		// select option immediately
		this.onSelectItem(e);
	  }
	},
	onItemRelease: function(e) {
	  // remove event handlers and temporary data
	  this.listHolder.off('jcf-pointerup', this.indexSelector, this.onItemRelease);

	  // simulate item selection
	  if (this.tmpListOffsetTop === this.list.offset().top) {
		this.listHolder.on('click', this.indexSelector, { savedPointerType: e.pointerType }, this.onSelectItem);
	  }
	  delete this.tmpListOffsetTop;
	},
	onSelectItem: function(e) {
	  var clickedIndex = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
		pointerType = e.data && e.data.savedPointerType || e.pointerType || 'mouse',
		range;

	  // remove click event handler
	  this.listHolder.off('click', this.indexSelector, this.onSelectItem);

	  // ignore clicks on disabled options
	  if (e.button > 1 || this.realOptions[clickedIndex].disabled) {
		return;
	  }

	  if (this.element.prop('multiple')) {
		if (e.metaKey || e.ctrlKey || pointerType === 'touch' || this.options.multipleSelectWithoutKey) {
		  // if CTRL/CMD pressed or touch devices - toggle selected option
		  this.realOptions[clickedIndex].selected = !this.realOptions[clickedIndex].selected;
		} else if (e.shiftKey) {
		  // if SHIFT pressed - update selection
		  range = [this.lastClickedIndex, clickedIndex].sort(function(a, b) {
			return a - b;
		  });
		  this.realOptions.each(function(index, option) {
			option.selected = (index >= range[0] && index <= range[1]);
		  });
		} else {
		  // set single selected index
		  this.element.prop('selectedIndex', clickedIndex);
		}
	  } else {
		this.element.prop('selectedIndex', clickedIndex);
	  }

	  // save last clicked option
	  if (!e.shiftKey) {
		this.lastClickedIndex = clickedIndex;
	  }

	  // refresh classes
	  this.refreshSelectedClass();

	  // scroll to active item in desktop browsers
	  if (pointerType === 'mouse') {
		this.scrollToActiveOption();
	  }

	  // make callback when item selected
	  $(this).trigger('select');
	},
	rebuildList: function() {
	  // rebuild options
	  var self = this,
		rootElement = this.element[0];

	  // recursively create fake options
	  this.storedSelectHTML = rootElement.innerHTML;
	  this.optionIndex = 0;
	  this.list = $(this.createOptionsList(rootElement));
	  this.listHolder.empty().append(this.list);
	  this.realOptions = this.element.find('option');
	  this.fakeOptions = this.list.find(this.indexSelector);
	  this.fakeListItems = this.list.find('.' + this.options.captionClass + ',' + this.indexSelector);
	  delete this.optionIndex;

	  // detect max visible items
	  var maxCount = this.options.maxVisibleItems,
		sizeValue = this.element.prop('size');
	  if (sizeValue > 1 && !this.element.is('[jcf-size]')) {
		maxCount = sizeValue;
	  }

	  // handle scrollbar
	  var needScrollBar = this.fakeOptions.length > maxCount;
	  this.container.toggleClass(this.options.scrollClass, needScrollBar);
	  if (needScrollBar) {
		// change max-height
		this.listHolder.css({
		  maxHeight: this.getOverflowHeight(maxCount),
		  overflow: 'auto'
		});

		if (this.options.useCustomScroll && jcf.modules.Scrollable) {
		  // add custom scrollbar if specified in options
		  jcf.replace(this.listHolder, 'Scrollable', {
			handleResize: this.options.handleResize,
			alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
		  });
		  return;
		}
	  }

	  // disable edge wheel scrolling
	  if (this.options.alwaysPreventMouseWheel) {
		this.preventWheelHandler = function(e) {
		  var currentScrollTop = self.listHolder.scrollTop(),
			maxScrollTop = self.listHolder.prop('scrollHeight') - self.listHolder.innerHeight();

		  // check edge cases
		  if ((currentScrollTop <= 0 && e.deltaY < 0) || (currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
			e.preventDefault();
		  }
		};
		this.listHolder.on('jcf-mousewheel', this.preventWheelHandler);
	  }
	},
	refreshSelectedClass: function() {
	  var self = this,
		selectedItem,
		isMultiple = this.element.prop('multiple'),
		selectedIndex = this.element.prop('selectedIndex');

	  if (isMultiple) {
		this.realOptions.each(function(index, option) {
		  self.fakeOptions.eq(index).toggleClass(self.options.selectedClass, !!option.selected);
		});
	  } else {
		this.fakeOptions.removeClass(this.options.selectedClass + ' ' + this.options.hoverClass);
		selectedItem = this.fakeOptions.eq(selectedIndex).addClass(this.options.selectedClass);
		if (this.options.useHoverClass) {
		  selectedItem.addClass(this.options.hoverClass);
		}
	  }
	},
	scrollToActiveOption: function() {
	  // scroll to target option
	  var targetOffset = this.getActiveOptionOffset();
	  if (typeof targetOffset === 'number') {
		this.listHolder.prop('scrollTop', targetOffset);
	  }
	},
	getSelectedIndexRange: function() {
	  var firstSelected = -1, lastSelected = -1;
	  this.realOptions.each(function(index, option) {
		if (option.selected) {
		  if (firstSelected < 0) {
			firstSelected = index;
		  }
		  lastSelected = index;
		}
	  });
	  return [firstSelected, lastSelected];
	},
	getChangedSelectedIndex: function() {
	  var selectedIndex = this.element.prop('selectedIndex'),
		targetIndex;

	  if (this.element.prop('multiple')) {
		// multiple selects handling
		if (!this.previousRange) {
		  this.previousRange = [selectedIndex, selectedIndex];
		}
		this.currentRange = this.getSelectedIndexRange();
		targetIndex = this.currentRange[this.currentRange[0] !== this.previousRange[0] ? 0 : 1];
		this.previousRange = this.currentRange;
		return targetIndex;
	  } else {
		// single choice selects handling
		return selectedIndex;
	  }
	},
	getActiveOptionOffset: function() {
	  // calc values
	  var dropHeight = this.listHolder.height(),
		dropScrollTop = this.listHolder.prop('scrollTop'),
		currentIndex = this.getChangedSelectedIndex(),
		fakeOption = this.fakeOptions.eq(currentIndex),
		fakeOptionOffset = fakeOption.offset().top - this.list.offset().top,
		fakeOptionHeight = fakeOption.innerHeight();

	  // scroll list
	  if (fakeOptionOffset + fakeOptionHeight >= dropScrollTop + dropHeight) {
		// scroll down (always scroll to option)
		return fakeOptionOffset - dropHeight + fakeOptionHeight;
	  } else if (fakeOptionOffset < dropScrollTop) {
		// scroll up to option
		return fakeOptionOffset;
	  }
	},
	getOverflowHeight: function(sizeValue) {
	  var item = this.fakeListItems.eq(sizeValue - 1),
		listOffset = this.list.offset().top,
		itemOffset = item.offset().top,
		itemHeight = item.innerHeight();

	  return itemOffset + itemHeight - listOffset;
	},
	getScrollTop: function() {
	  return this.listHolder.scrollTop();
	},
	setScrollTop: function(value) {
	  this.listHolder.scrollTop(value);
	},
	createOption: function(option) {
	  var newOption = document.createElement('span');
	  newOption.className = this.options.optionClass;
	  newOption.innerHTML = option.innerHTML;
	  newOption.setAttribute(this.options.indexAttribute, this.optionIndex++);

	  var optionImage, optionImageSrc = option.getAttribute('data-image');
	  if (optionImageSrc) {
		optionImage = document.createElement('img');
		optionImage.src = optionImageSrc;
		newOption.insertBefore(optionImage, newOption.childNodes[0]);
	  }
	  if (option.disabled) {
		newOption.className += ' ' + this.options.disabledClass;
	  }
	  if (option.className) {
		newOption.className += ' ' + getPrefixedClasses(option.className, this.options.cloneClassPrefix);
	  }
	  return newOption;
	},
	createOptGroup: function(optgroup) {
	  var optGroupContainer = document.createElement('span'),
		optGroupName = optgroup.getAttribute('label'),
		optGroupCaption, optGroupList;

	  // create caption
	  optGroupCaption = document.createElement('span');
	  optGroupCaption.className = this.options.captionClass;
	  optGroupCaption.innerHTML = optGroupName;
	  optGroupContainer.appendChild(optGroupCaption);

	  // create list of options
	  if (optgroup.children.length) {
		optGroupList = this.createOptionsList(optgroup);
		optGroupContainer.appendChild(optGroupList);
	  }

	  optGroupContainer.className = this.options.groupClass;
	  return optGroupContainer;
	},
	createOptionContainer: function() {
	  var optionContainer = document.createElement('li');
	  return optionContainer;
	},
	createOptionsList: function(container) {
	  var self = this,
		list = document.createElement('ul');

	  $.each(container.children, function(index, currentNode) {
		var item = self.createOptionContainer(currentNode),
		  newNode;

		switch (currentNode.tagName.toLowerCase()) {
		  case 'option': newNode = self.createOption(currentNode); break;
		  case 'optgroup': newNode = self.createOptGroup(currentNode); break;
		}
		list.appendChild(item).appendChild(newNode);
	  });
	  return list;
	},
	refresh: function() {
	  // check for select innerHTML changes
	  if (this.storedSelectHTML !== this.element.prop('innerHTML')) {
		this.rebuildList();
	  }

	  // refresh custom scrollbar
	  var scrollInstance = jcf.getInstance(this.listHolder);
	  if (scrollInstance) {
		scrollInstance.refresh();
	  }

	  // refresh selectes classes
	  this.refreshSelectedClass();
	},
	destroy: function() {
	  this.listHolder.off('jcf-mousewheel', this.preventWheelHandler);
	  this.listHolder.off('jcf-pointerdown', this.indexSelector, this.onSelectItem);
	  this.listHolder.off('jcf-pointerover', this.indexSelector, this.onHoverItem);
	  this.listHolder.off('jcf-pointerdown', this.onPress);
	}
  });

  // helper functions
  var getPrefixedClasses = function(className, prefixToAdd) {
	return className ? className.replace(/[\s]*([\S]+)+[\s]*/gi, prefixToAdd + '$1 ') : '';
  };
  var makeUnselectable = (function() {
	var unselectableClass = jcf.getOptions().unselectableClass;
	function preventHandler(e) {
	  e.preventDefault();
	}
	return function(node) {
	  node.addClass(unselectableClass).on('selectstart', preventHandler);
	};
  }());

}(jQuery, this));


 /*!
 * JavaScript Custom Forms : Radio Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($) {

  'use strict';

  jcf.addModule({
	name: 'Radio',
	selector: 'input[type="radio"]',
	options: {
	  wrapNative: true,
	  checkedClass: 'jcf-checked',
	  uncheckedClass: 'jcf-unchecked',
	  labelActiveClass: 'jcf-label-active',
	  fakeStructure: '<span class="jcf-radio"><span></span></span>'
	},
	matchElement: function(element) {
	  return element.is(':radio');
	},
	init: function() {
	  this.initStructure();
	  this.attachEvents();
	  this.refresh();
	},
	initStructure: function() {
	  // prepare structure
	  this.doc = $(document);
	  this.realElement = $(this.options.element);
	  this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
	  this.labelElement = this.getLabelFor();

	  if (this.options.wrapNative) {
		// wrap native radio inside fake block
		this.realElement.prependTo(this.fakeElement).css({
		  position: 'absolute',
		  opacity: 0
		});
	  } else {
		// just hide native radio
		this.realElement.addClass(this.options.hiddenClass);
	  }
	},
	attachEvents: function() {
	  // add event handlers
	  this.realElement.on({
		focus: this.onFocus,
		click: this.onRealClick
	  });
	  this.fakeElement.on('click', this.onFakeClick);
	  this.fakeElement.on('jcf-pointerdown', this.onPress);
	},
	onRealClick: function(e) {
	  // redraw current radio and its group (setTimeout handles click that might be prevented)
	  var self = this;
	  this.savedEventObject = e;
	  setTimeout(function() {
		self.refreshRadioGroup();
	  }, 0);
	},
	onFakeClick: function(e) {
	  // skip event if clicked on real element inside wrapper
	  if (this.options.wrapNative && this.realElement.is(e.target)) {
		return;
	  }

	  // toggle checked class
	  if (!this.realElement.is(':disabled')) {
		delete this.savedEventObject;
		this.currentActiveRadio = this.getCurrentActiveRadio();
		this.stateChecked = this.realElement.prop('checked');
		this.realElement.prop('checked', true);
		this.fireNativeEvent(this.realElement, 'click');
		if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
		  this.realElement.prop('checked', this.stateChecked);
		  this.currentActiveRadio.prop('checked', true);
		} else {
		  this.fireNativeEvent(this.realElement, 'change');
		}
		delete this.savedEventObject;
	  }
	},
	onFocus: function() {
	  if (!this.pressedFlag || !this.focusedFlag) {
		this.focusedFlag = true;
		this.fakeElement.addClass(this.options.focusClass);
		this.realElement.on('blur', this.onBlur);
	  }
	},
	onBlur: function() {
	  if (!this.pressedFlag) {
		this.focusedFlag = false;
		this.fakeElement.removeClass(this.options.focusClass);
		this.realElement.off('blur', this.onBlur);
	  }
	},
	onPress: function(e) {
	  if (!this.focusedFlag && e.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	  this.pressedFlag = true;
	  this.fakeElement.addClass(this.options.pressedClass);
	  this.doc.on('jcf-pointerup', this.onRelease);
	},
	onRelease: function(e) {
	  if (this.focusedFlag && e.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	  this.pressedFlag = false;
	  this.fakeElement.removeClass(this.options.pressedClass);
	  this.doc.off('jcf-pointerup', this.onRelease);
	},
	getCurrentActiveRadio: function() {
	  return this.getRadioGroup(this.realElement).filter(':checked');
	},
	getRadioGroup: function(radio) {
	  // find radio group for specified radio button
	  var name = radio.attr('name'),
		parentForm = radio.parents('form');

	  if (name) {
		if (parentForm.length) {
		  return parentForm.find('input[name="' + name + '"]');
		} else {
		  return $('input[name="' + name + '"]:not(form input)');
		}
	  } else {
		return radio;
	  }
	},
	getLabelFor: function() {
	  var parentLabel = this.realElement.closest('label'),
		elementId = this.realElement.prop('id');

	  if (!parentLabel.length && elementId) {
		parentLabel = $('label[for="' + elementId + '"]');
	  }
	  return parentLabel.length ? parentLabel : null;
	},
	refreshRadioGroup: function() {
	  // redraw current radio and its group
	  this.getRadioGroup(this.realElement).each(function() {
		jcf.refresh(this);
	  });
	},
	refresh: function() {
	  // redraw current radio button
	  var isChecked = this.realElement.is(':checked'),
		isDisabled = this.realElement.is(':disabled');

	  this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
			  .toggleClass(this.options.uncheckedClass, !isChecked)
			  .toggleClass(this.options.disabledClass, isDisabled);

	  if (this.labelElement) {
		this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
	  }
	},
	destroy: function() {
	  // restore structure
	  if (this.options.wrapNative) {
		this.realElement.insertBefore(this.fakeElement).css({
		  position: '',
		  width: '',
		  height: '',
		  opacity: '',
		  margin: ''
		});
	  } else {
		this.realElement.removeClass(this.options.hiddenClass);
	  }

	  // removing element will also remove its event handlers
	  this.fakeElement.off('jcf-pointerdown', this.onPress);
	  this.fakeElement.remove();

	  // remove other event handlers
	  this.doc.off('jcf-pointerup', this.onRelease);
	  this.realElement.off({
		blur: this.onBlur,
		focus: this.onFocus,
		click: this.onRealClick
	  });
	}
  });

}(jQuery));


 /*!
 * JavaScript Custom Forms : Checkbox Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($) {

  'use strict';

  jcf.addModule({
	name: 'Checkbox',
	selector: 'input[type="checkbox"]',
	options: {
	  wrapNative: true,
	  checkedClass: 'jcf-checked',
	  uncheckedClass: 'jcf-unchecked',
	  labelActiveClass: 'jcf-label-active',
	  fakeStructure: '<span class="jcf-checkbox"><span></span></span>'
	},
	matchElement: function(element) {
	  return element.is(':checkbox');
	},
	init: function() {
	  this.initStructure();
	  this.attachEvents();
	  this.refresh();
	},
	initStructure: function() {
	  // prepare structure
	  this.doc = $(document);
	  this.realElement = $(this.options.element);
	  this.fakeElement = $(this.options.fakeStructure).insertAfter(this.realElement);
	  this.labelElement = this.getLabelFor();

	  if (this.options.wrapNative) {
		// wrap native checkbox inside fake block
		this.realElement.appendTo(this.fakeElement).css({
		  position: 'absolute',
		  height: '100%',
		  width: '100%',
		  opacity: 0,
		  margin: 0
		});
	  } else {
		// just hide native checkbox
		this.realElement.addClass(this.options.hiddenClass);
	  }
	},
	attachEvents: function() {
	  // add event handlers
	  this.realElement.on({
		focus: this.onFocus,
		click: this.onRealClick
	  });
	  this.fakeElement.on('click', this.onFakeClick);
	  this.fakeElement.on('jcf-pointerdown', this.onPress);
	},
	onRealClick: function(e) {
	  // just redraw fake element (setTimeout handles click that might be prevented)
	  var self = this;
	  this.savedEventObject = e;
	  setTimeout(function() {
		self.refresh();
	  }, 0);
	},
	onFakeClick: function(e) {
	  // skip event if clicked on real element inside wrapper
	  if (this.options.wrapNative && this.realElement.is(e.target)) {
		return;
	  }

	  // toggle checked class
	  if (!this.realElement.is(':disabled')) {
		delete this.savedEventObject;
		this.stateChecked = this.realElement.prop('checked');
		this.realElement.prop('checked', !this.stateChecked);
		this.fireNativeEvent(this.realElement, 'click');
		if (this.savedEventObject && this.savedEventObject.isDefaultPrevented()) {
		  this.realElement.prop('checked', this.stateChecked);
		} else {
		  this.fireNativeEvent(this.realElement, 'change');
		}
		delete this.savedEventObject;
	  }
	},
	onFocus: function() {
	  if (!this.pressedFlag || !this.focusedFlag) {
		this.focusedFlag = true;
		this.fakeElement.addClass(this.options.focusClass);
		this.realElement.on('blur', this.onBlur);
	  }
	},
	onBlur: function() {
	  if (!this.pressedFlag) {
		this.focusedFlag = false;
		this.fakeElement.removeClass(this.options.focusClass);
		this.realElement.off('blur', this.onBlur);
	  }
	},
	onPress: function(e) {
	  if (!this.focusedFlag && e.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	  this.pressedFlag = true;
	  this.fakeElement.addClass(this.options.pressedClass);
	  this.doc.on('jcf-pointerup', this.onRelease);
	},
	onRelease: function(e) {
	  if (this.focusedFlag && e.pointerType === 'mouse') {
		this.realElement.focus();
	  }
	  this.pressedFlag = false;
	  this.fakeElement.removeClass(this.options.pressedClass);
	  this.doc.off('jcf-pointerup', this.onRelease);
	},
	getLabelFor: function() {
	  var parentLabel = this.realElement.closest('label'),
		elementId = this.realElement.prop('id');

	  if (!parentLabel.length && elementId) {
		parentLabel = $('label[for="' + elementId + '"]');
	  }
	  return parentLabel.length ? parentLabel : null;
	},
	refresh: function() {
	  // redraw custom checkbox
	  var isChecked = this.realElement.is(':checked'),
		isDisabled = this.realElement.is(':disabled');

	  this.fakeElement.toggleClass(this.options.checkedClass, isChecked)
			  .toggleClass(this.options.uncheckedClass, !isChecked)
			  .toggleClass(this.options.disabledClass, isDisabled);

	  if (this.labelElement) {
		this.labelElement.toggleClass(this.options.labelActiveClass, isChecked);
	  }
	},
	destroy: function() {
	  // restore structure
	  if (this.options.wrapNative) {
		this.realElement.insertBefore(this.fakeElement).css({
		  position: '',
		  width: '',
		  height: '',
		  opacity: '',
		  margin: ''
		});
	  } else {
		this.realElement.removeClass(this.options.hiddenClass);
	  }

	  // removing element will also remove its event handlers
	  this.fakeElement.off('jcf-pointerdown', this.onPress);
	  this.fakeElement.remove();

	  // remove other event handlers
	  this.doc.off('jcf-pointerup', this.onRelease);
	  this.realElement.off({
		focus: this.onFocus,
		click: this.onRealClick
	  });
	}
  });

}(jQuery));


 /*!
 * JavaScript Custom Forms : Scrollbar Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.1.3
 */
;(function($, window) {

  'use strict';

  jcf.addModule({
	name: 'Scrollable',
	selector: '.jcf-scrollable',
	plugins: {
	  ScrollBar: ScrollBar
	},
	options: {
	  mouseWheelStep: 150,
	  handleResize: true,
	  alwaysShowScrollbars: false,
	  alwaysPreventMouseWheel: false,
	  scrollAreaStructure: '<div class="jcf-scrollable-wrapper"></div>'
	},
	matchElement: function(element) {
	  return element.is('.jcf-scrollable');
	},
	init: function() {
	  this.initStructure();
	  this.attachEvents();
	  this.rebuildScrollbars();
	},
	initStructure: function() {
	  // prepare structure
	  this.doc = $(document);
	  this.win = $(window);
	  this.realElement = $(this.options.element);
	  this.scrollWrapper = $(this.options.scrollAreaStructure).insertAfter(this.realElement);

	  // set initial styles
	  this.scrollWrapper.css('position', 'relative');
	  // this.realElement.css('overflow', 'hidden');
	  this.realElement.css('overflow', this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden');
	  this.vBarEdge = 0;
	},
	attachEvents: function() {
	  // create scrollbars
	  var self = this;
	  this.vBar = new ScrollBar({
		holder: this.scrollWrapper,
		vertical: true,
		onScroll: function(scrollTop) {
		  self.realElement.scrollTop(scrollTop);
		}
	  });
	  this.hBar = new ScrollBar({
		holder: this.scrollWrapper,
		vertical: false,
		onScroll: function(scrollLeft) {
		  self.realElement.scrollLeft(scrollLeft);
		}
	  });

	  // add event handlers
	  this.realElement.on('scroll', this.onScroll);
	  if (this.options.handleResize) {
		this.win.on('resize orientationchange load', this.onResize);
	  }

	  // add pointer/wheel event handlers
	  this.realElement.on('jcf-mousewheel', this.onMouseWheel);
	  this.realElement.on('jcf-pointerdown', this.onTouchBody);
	},
	onScroll: function() {
	  this.redrawScrollbars();
	},
	onResize: function() {
	  // do not rebuild scrollbars if form field is in focus
	  if (!$(document.activeElement).is(':input')) {
		this.rebuildScrollbars();
	  }
	},
	onTouchBody: function(e) {
	  if (e.pointerType === 'touch') {
		this.touchData = {
		  scrollTop: this.realElement.scrollTop(),
		  scrollLeft: this.realElement.scrollLeft(),
		  left: e.pageX,
		  top: e.pageY
		};
		this.doc.on({
		  'jcf-pointermove': this.onMoveBody,
		  'jcf-pointerup': this.onReleaseBody
		});
	  }
	},
	onMoveBody: function(e) {
	  var targetScrollTop,
		targetScrollLeft,
		verticalScrollAllowed = this.verticalScrollActive,
		horizontalScrollAllowed = this.horizontalScrollActive;

	  if (e.pointerType === 'touch') {
		targetScrollTop = this.touchData.scrollTop - e.pageY + this.touchData.top;
		targetScrollLeft = this.touchData.scrollLeft - e.pageX + this.touchData.left;

		// check that scrolling is ended and release outer scrolling
		if (this.verticalScrollActive && (targetScrollTop < 0 || targetScrollTop > this.vBar.maxValue)) {
		  verticalScrollAllowed = false;
		}
		if (this.horizontalScrollActive && (targetScrollLeft < 0 || targetScrollLeft > this.hBar.maxValue)) {
		  horizontalScrollAllowed = false;
		}

		this.realElement.scrollTop(targetScrollTop);
		this.realElement.scrollLeft(targetScrollLeft);

		if (verticalScrollAllowed || horizontalScrollAllowed) {
		  e.preventDefault();
		} else {
		  this.onReleaseBody(e);
		}
	  }
	},
	onReleaseBody: function(e) {
	  if (e.pointerType === 'touch') {
		delete this.touchData;
		this.doc.off({
		  'jcf-pointermove': this.onMoveBody,
		  'jcf-pointerup': this.onReleaseBody
		});
	  }
	},
	onMouseWheel: function(e) {
	  var currentScrollTop = this.realElement.scrollTop(),
		currentScrollLeft = this.realElement.scrollLeft(),
		maxScrollTop = this.realElement.prop('scrollHeight') - this.embeddedDimensions.innerHeight,
		maxScrollLeft = this.realElement.prop('scrollWidth') - this.embeddedDimensions.innerWidth,
		extraLeft, extraTop, preventFlag;

	  // check edge cases
	  if (!this.options.alwaysPreventMouseWheel) {
		if (this.verticalScrollActive && e.deltaY) {
		  if (!(currentScrollTop <= 0 && e.deltaY < 0) && !(currentScrollTop >= maxScrollTop && e.deltaY > 0)) {
			preventFlag = true;
		  }
		}
		if (this.horizontalScrollActive && e.deltaX) {
		  if (!(currentScrollLeft <= 0 && e.deltaX < 0) && !(currentScrollLeft >= maxScrollLeft && e.deltaX > 0)) {
			preventFlag = true;
		  }
		}
		if (!this.verticalScrollActive && !this.horizontalScrollActive) {
		  return;
		}
	  }

	  // prevent default action and scroll item
	  if (preventFlag || this.options.alwaysPreventMouseWheel) {
		e.preventDefault();
	  } else {
		return;
	  }

	  extraLeft = e.deltaX / 100 * this.options.mouseWheelStep;
	  extraTop = e.deltaY / 100 * this.options.mouseWheelStep;

	  this.realElement.scrollTop(currentScrollTop + extraTop);
	  this.realElement.scrollLeft(currentScrollLeft + extraLeft);
	},
	setScrollBarEdge: function(edgeSize) {
	  this.vBarEdge = edgeSize || 0;
	  this.redrawScrollbars();
	},
	saveElementDimensions: function() {
	  this.savedDimensions = {
		top: this.realElement.width(),
		left: this.realElement.height()
	  };
	  return this;
	},
	restoreElementDimensions: function() {
	  if (this.savedDimensions) {
		this.realElement.css({
		  width: this.savedDimensions.width,
		  height: this.savedDimensions.height
		});
	  }
	  return this;
	},
	saveScrollOffsets: function() {
	  this.savedOffsets = {
		top: this.realElement.scrollTop(),
		left: this.realElement.scrollLeft()
	  };
	  return this;
	},
	restoreScrollOffsets: function() {
	  if (this.savedOffsets) {
		this.realElement.scrollTop(this.savedOffsets.top);
		this.realElement.scrollLeft(this.savedOffsets.left);
	  }
	  return this;
	},
	getContainerDimensions: function() {
	  // save current styles
	  var desiredDimensions,
		currentStyles,
		currentHeight,
		currentWidth;

	  if (this.isModifiedStyles) {
		desiredDimensions = {
		  width: this.realElement.innerWidth() + this.vBar.getThickness(),
		  height: this.realElement.innerHeight() + this.hBar.getThickness()
		};
	  } else {
		// unwrap real element and measure it according to CSS
		this.saveElementDimensions().saveScrollOffsets();
		this.realElement.insertAfter(this.scrollWrapper);
		this.scrollWrapper.detach();

		// measure element
		currentStyles = this.realElement.prop('style');
		currentWidth = parseFloat(currentStyles.width);
		currentHeight = parseFloat(currentStyles.height);

		// reset styles if needed
		if (this.embeddedDimensions && currentWidth && currentHeight) {
		  this.isModifiedStyles |= (currentWidth !== this.embeddedDimensions.width || currentHeight !== this.embeddedDimensions.height);
		  this.realElement.css({
			overflow: '',
			width: '',
			height: ''
		  });
		}

		// calculate desired dimensions for real element
		desiredDimensions = {
		  width: this.realElement.outerWidth(),
		  height: this.realElement.outerHeight()
		};

		// restore structure and original scroll offsets
		this.scrollWrapper.insertAfter(this.realElement);
		this.realElement.css('overflow', this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden').prependTo(this.scrollWrapper);
		this.restoreElementDimensions().restoreScrollOffsets();
	  }

	  return desiredDimensions;
	},
	getEmbeddedDimensions: function(dimensions) {
	  // handle scrollbars cropping
	  var fakeBarWidth = this.vBar.getThickness(),
		fakeBarHeight = this.hBar.getThickness(),
		paddingWidth = this.realElement.outerWidth() - this.realElement.width(),
		paddingHeight = this.realElement.outerHeight() - this.realElement.height(),
		resultDimensions;

	  if (this.options.alwaysShowScrollbars) {
		// simply return dimensions without custom scrollbars
		this.verticalScrollActive = true;
		this.horizontalScrollActive = true;
		resultDimensions = {
		  innerWidth: dimensions.width - fakeBarWidth,
		  innerHeight: dimensions.height - fakeBarHeight
		};
	  } else {
		// detect when to display each scrollbar
		this.saveElementDimensions();
		this.verticalScrollActive = false;
		this.horizontalScrollActive = false;

		// fill container with full size
		this.realElement.css({
		  width: dimensions.width - paddingWidth,
		  height: dimensions.height - paddingHeight
		});

		this.horizontalScrollActive = this.realElement.prop('scrollWidth') > this.containerDimensions.width;
		this.verticalScrollActive = this.realElement.prop('scrollHeight') > this.containerDimensions.height;

		this.restoreElementDimensions();
		resultDimensions = {
		  innerWidth: dimensions.width - (this.verticalScrollActive ? fakeBarWidth : 0),
		  innerHeight: dimensions.height - (this.horizontalScrollActive ? fakeBarHeight : 0)
		};
	  }
	  $.extend(resultDimensions, {
		width: resultDimensions.innerWidth - paddingWidth,
		height: resultDimensions.innerHeight - paddingHeight
	  });
	  return resultDimensions;
	},
	rebuildScrollbars: function() {
	  // resize wrapper according to real element styles
	  this.containerDimensions = this.getContainerDimensions();
	  this.embeddedDimensions = this.getEmbeddedDimensions(this.containerDimensions);

	  // resize wrapper to desired dimensions
	  this.scrollWrapper.css({
		width: this.containerDimensions.width,
		height: this.containerDimensions.height
	  });

	  // resize element inside wrapper excluding scrollbar size
	  this.realElement.css({
		overflow: this.options.ios && this.options.ios >= 10 ? 'auto' : 'hidden',
		width: this.embeddedDimensions.width,
		height: this.embeddedDimensions.height
	  });

	  // redraw scrollbar offset
	  this.redrawScrollbars();
	},
	redrawScrollbars: function() {
	  var viewSize, maxScrollValue;

	  // redraw vertical scrollbar
	  if (this.verticalScrollActive) {
		viewSize = this.vBarEdge ? this.containerDimensions.height - this.vBarEdge : this.embeddedDimensions.innerHeight;
		maxScrollValue = Math.max(this.realElement.prop('offsetHeight'), this.realElement.prop('scrollHeight')) - this.vBarEdge;

		this.vBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
		this.vBar.setValue(this.realElement.scrollTop());
	  } else {
		this.vBar.hide();
	  }

	  // redraw horizontal scrollbar
	  if (this.horizontalScrollActive) {
		viewSize = this.embeddedDimensions.innerWidth;
		maxScrollValue = this.realElement.prop('scrollWidth');

		if (maxScrollValue === viewSize) {
		  this.horizontalScrollActive = false;
		}
		this.hBar.show().setMaxValue(maxScrollValue - viewSize).setRatio(viewSize / maxScrollValue).setSize(viewSize);
		this.hBar.setValue(this.realElement.scrollLeft());
	  } else {
		this.hBar.hide();
	  }

	  // set "touch-action" style rule
	  var touchAction = '';
	  if (this.verticalScrollActive && this.horizontalScrollActive) {
		touchAction = 'none';
	  } else if (this.verticalScrollActive) {
		touchAction = 'pan-x';
	  } else if (this.horizontalScrollActive) {
		touchAction = 'pan-y';
	  }
	  this.realElement.css('touchAction', touchAction);
	},
	refresh: function() {
	  this.rebuildScrollbars();
	},
	destroy: function() {
	  // remove event listeners
	  this.win.off('resize orientationchange load', this.onResize);
	  this.realElement.off({
		'jcf-mousewheel': this.onMouseWheel,
		'jcf-pointerdown': this.onTouchBody
	  });
	  this.doc.off({
		'jcf-pointermove': this.onMoveBody,
		'jcf-pointerup': this.onReleaseBody
	  });

	  // restore structure
	  this.saveScrollOffsets();
	  this.vBar.destroy();
	  this.hBar.destroy();
	  this.realElement.insertAfter(this.scrollWrapper).css({
		touchAction: '',
		overflow: '',
		width: '',
		height: ''
	  });
	  this.scrollWrapper.remove();
	  this.restoreScrollOffsets();
	}
  });

  // custom scrollbar
  function ScrollBar(options) {
	this.options = $.extend({
	  holder: null,
	  vertical: true,
	  inactiveClass: 'jcf-inactive',
	  verticalClass: 'jcf-scrollbar-vertical',
	  horizontalClass: 'jcf-scrollbar-horizontal',
	  scrollbarStructure: '<div class="jcf-scrollbar"><div class="jcf-scrollbar-dec"></div><div class="jcf-scrollbar-slider"><div class="jcf-scrollbar-handle"></div></div><div class="jcf-scrollbar-inc"></div></div>',
	  btnDecSelector: '.jcf-scrollbar-dec',
	  btnIncSelector: '.jcf-scrollbar-inc',
	  sliderSelector: '.jcf-scrollbar-slider',
	  handleSelector: '.jcf-scrollbar-handle',
	  scrollInterval: 300,
	  scrollStep: 400 // px/sec
	}, options);
	this.init();
  }
  $.extend(ScrollBar.prototype, {
	init: function() {
	  this.initStructure();
	  this.attachEvents();
	},
	initStructure: function() {
	  // define proporties
	  this.doc = $(document);
	  this.isVertical = !!this.options.vertical;
	  this.sizeProperty = this.isVertical ? 'height' : 'width';
	  this.fullSizeProperty = this.isVertical ? 'outerHeight' : 'outerWidth';
	  this.invertedSizeProperty = this.isVertical ? 'width' : 'height';
	  this.thicknessMeasureMethod = 'outer' + this.invertedSizeProperty.charAt(0).toUpperCase() + this.invertedSizeProperty.substr(1);
	  this.offsetProperty = this.isVertical ? 'top' : 'left';
	  this.offsetEventProperty = this.isVertical ? 'pageY' : 'pageX';

	  // initialize variables
	  this.value = this.options.value || 0;
	  this.maxValue = this.options.maxValue || 0;
	  this.currentSliderSize = 0;
	  this.handleSize = 0;

	  // find elements
	  this.holder = $(this.options.holder);
	  this.scrollbar = $(this.options.scrollbarStructure).appendTo(this.holder);
	  this.btnDec = this.scrollbar.find(this.options.btnDecSelector);
	  this.btnInc = this.scrollbar.find(this.options.btnIncSelector);
	  this.slider = this.scrollbar.find(this.options.sliderSelector);
	  this.handle = this.slider.find(this.options.handleSelector);

	  // set initial styles
	  this.scrollbar.addClass(this.isVertical ? this.options.verticalClass : this.options.horizontalClass).css({
		touchAction: this.isVertical ? 'pan-x' : 'pan-y',
		position: 'absolute'
	  });
	  this.slider.css({
		position: 'relative'
	  });
	  this.handle.css({
		touchAction: 'none',
		position: 'absolute'
	  });
	},
	attachEvents: function() {
	  this.bindHandlers();
	  this.handle.on('jcf-pointerdown', this.onHandlePress);
	  this.slider.add(this.btnDec).add(this.btnInc).on('jcf-pointerdown', this.onButtonPress);
	},
	onHandlePress: function(e) {
	  if (e.pointerType === 'mouse' && e.button > 1) {
		return;
	  } else {
		e.preventDefault();
		this.handleDragActive = true;
		this.sliderOffset = this.slider.offset()[this.offsetProperty];
		this.innerHandleOffset = e[this.offsetEventProperty] - this.handle.offset()[this.offsetProperty];

		this.doc.on('jcf-pointermove', this.onHandleDrag);
		this.doc.on('jcf-pointerup', this.onHandleRelease);
	  }
	},
	onHandleDrag: function(e) {
	  e.preventDefault();
	  this.calcOffset = e[this.offsetEventProperty] - this.sliderOffset - this.innerHandleOffset;
	  this.setValue(this.calcOffset / (this.currentSliderSize - this.handleSize) * this.maxValue);
	  this.triggerScrollEvent(this.value);
	},
	onHandleRelease: function() {
	  this.handleDragActive = false;
	  this.doc.off('jcf-pointermove', this.onHandleDrag);
	  this.doc.off('jcf-pointerup', this.onHandleRelease);
	},
	onButtonPress: function(e) {
	  var direction, clickOffset;
	  if (e.pointerType === 'mouse' && e.button > 1) {
		return;
	  } else {
		e.preventDefault();
		if (!this.handleDragActive) {
		  if (this.slider.is(e.currentTarget)) {
			// slider pressed
			direction = this.handle.offset()[this.offsetProperty] > e[this.offsetEventProperty] ? -1 : 1;
			clickOffset = e[this.offsetEventProperty] - this.slider.offset()[this.offsetProperty];
			this.startPageScrolling(direction, clickOffset);
		  } else {
			// scrollbar buttons pressed
			direction = this.btnDec.is(e.currentTarget) ? -1 : 1;
			this.startSmoothScrolling(direction);
		  }
		  this.doc.on('jcf-pointerup', this.onButtonRelease);
		}
	  }
	},
	onButtonRelease: function() {
	  this.stopPageScrolling();
	  this.stopSmoothScrolling();
	  this.doc.off('jcf-pointerup', this.onButtonRelease);
	},
	startPageScrolling: function(direction, clickOffset) {
	  var self = this,
		stepValue = direction * self.currentSize;

	  // limit checker
	  var isFinishedScrolling = function() {
		var handleTop = (self.value / self.maxValue) * (self.currentSliderSize - self.handleSize);

		if (direction > 0) {
		  return handleTop + self.handleSize >= clickOffset;
		} else {
		  return handleTop <= clickOffset;
		}
	  };

	  // scroll by page when track is pressed
	  var doPageScroll = function() {
		self.value += stepValue;
		self.setValue(self.value);
		self.triggerScrollEvent(self.value);

		if (isFinishedScrolling()) {
		  clearInterval(self.pageScrollTimer);
		}
	  };

	  // start scrolling
	  this.pageScrollTimer = setInterval(doPageScroll, this.options.scrollInterval);
	  doPageScroll();
	},
	stopPageScrolling: function() {
	  clearInterval(this.pageScrollTimer);
	},
	startSmoothScrolling: function(direction) {
	  var self = this, dt;
	  this.stopSmoothScrolling();

	  // simple animation functions
	  var raf = window.requestAnimationFrame || function(func) {
		setTimeout(func, 16);
	  };
	  var getTimestamp = function() {
		return Date.now ? Date.now() : new Date().getTime();
	  };

	  // set animation limit
	  var isFinishedScrolling = function() {
		if (direction > 0) {
		  return self.value >= self.maxValue;
		} else {
		  return self.value <= 0;
		}
	  };

	  // animation step
	  var doScrollAnimation = function() {
		var stepValue = (getTimestamp() - dt) / 1000 * self.options.scrollStep;

		if (self.smoothScrollActive) {
		  self.value += stepValue * direction;
		  self.setValue(self.value);
		  self.triggerScrollEvent(self.value);

		  if (!isFinishedScrolling()) {
			dt = getTimestamp();
			raf(doScrollAnimation);
		  }
		}
	  };

	  // start animation
	  self.smoothScrollActive = true;
	  dt = getTimestamp();
	  raf(doScrollAnimation);
	},
	stopSmoothScrolling: function() {
	  this.smoothScrollActive = false;
	},
	triggerScrollEvent: function(scrollValue) {
	  if (this.options.onScroll) {
		this.options.onScroll(scrollValue);
	  }
	},
	getThickness: function() {
	  return this.scrollbar[this.thicknessMeasureMethod]();
	},
	setSize: function(size) {
	  // resize scrollbar
	  var btnDecSize = this.btnDec[this.fullSizeProperty](),
		btnIncSize = this.btnInc[this.fullSizeProperty]();

	  // resize slider
	  this.currentSize = size;
	  this.currentSliderSize = size - btnDecSize - btnIncSize;
	  this.scrollbar.css(this.sizeProperty, size);
	  this.slider.css(this.sizeProperty, this.currentSliderSize);
	  this.currentSliderSize = this.slider[this.sizeProperty]();

	  // resize handle
	  this.handleSize = Math.round(this.currentSliderSize * this.ratio);
	  this.handle.css(this.sizeProperty, this.handleSize);
	  this.handleSize = this.handle[this.fullSizeProperty]();

	  return this;
	},
	setRatio: function(ratio) {
	  this.ratio = ratio;
	  return this;
	},
	setMaxValue: function(maxValue) {
	  this.maxValue = maxValue;
	  this.setValue(Math.min(this.value, this.maxValue));
	  return this;
	},
	setValue: function(value) {
	  this.value = value;
	  if (this.value < 0) {
		this.value = 0;
	  } else if (this.value > this.maxValue) {
		this.value = this.maxValue;
	  }
	  this.refresh();
	},
	setPosition: function(styles) {
	  this.scrollbar.css(styles);
	  return this;
	},
	hide: function() {
	  this.scrollbar.detach();
	  return this;
	},
	show: function() {
	  this.scrollbar.appendTo(this.holder);
	  return this;
	},
	refresh: function() {
	  // recalculate handle position
	  if (this.value === 0 || this.maxValue === 0) {
		this.calcOffset = 0;
	  } else {
		this.calcOffset = (this.value / this.maxValue) * (this.currentSliderSize - this.handleSize);
	  }
	  this.handle.css(this.offsetProperty, this.calcOffset);

	  // toggle inactive classes
	  this.btnDec.toggleClass(this.options.inactiveClass, this.value === 0);
	  this.btnInc.toggleClass(this.options.inactiveClass, this.value === this.maxValue);
	  this.scrollbar.toggleClass(this.options.inactiveClass, this.maxValue === 0);
	},
	destroy: function() {
	  // remove event handlers and scrollbar block itself
	  this.btnDec.add(this.btnInc).off('jcf-pointerdown', this.onButtonPress);
	  this.handle.off('jcf-pointerdown', this.onHandlePress);
	  this.doc.off('jcf-pointermove', this.onHandleDrag);
	  this.doc.off('jcf-pointerup', this.onHandleRelease);
	  this.doc.off('jcf-pointerup', this.onButtonRelease);
	  this.stopSmoothScrolling();
	  this.stopPageScrolling();
	  this.scrollbar.remove();
	}
  });

}(jQuery, this));


// Spectrum Colorpicker v1.8.0
// https://github.com/bgrins/spectrum
// Author: Brian Grinstead
// License: MIT

;(function (factory) {
	"use strict";

	if (typeof define === 'function' && define.amd) { // AMD
		define(['jquery'], factory);
	}
	else if (typeof exports == "object" && typeof module == "object") { // CommonJS
		module.exports = factory(require('jquery'));
	}
	else { // Browser
		factory(jQuery);
	}
})(function($, undefined) {
	"use strict";

	var defaultOpts = {

		// Callbacks
		beforeShow: noop,
		move: noop,
		change: noop,
		show: noop,
		hide: noop,

		// Options
		color: false,
		flat: false,
		showInput: false,
		allowEmpty: false,
		showButtons: true,
		clickoutFiresChange: true,
		showInitial: false,
		showPalette: false,
		showPaletteOnly: false,
		hideAfterPaletteSelect: false,
		togglePaletteOnly: false,
		showSelectionPalette: true,
		localStorageKey: false,
		appendTo: "body",
		maxSelectionSize: 7,
		cancelText: "cancel",
		chooseText: "choose",
		togglePaletteMoreText: "more",
		togglePaletteLessText: "less",
		clearText: "Clear Color Selection",
		noColorSelectedText: "No Color Selected",
		preferredFormat: false,
		className: "", // Deprecated - use containerClassName and replacerClassName instead.
		containerClassName: "",
		replacerClassName: "",
		showAlpha: false,
		theme: "sp-light",
		palette: [["#ffffff", "#000000", "#ff0000", "#ff8000", "#ffff00", "#008000", "#0000ff", "#4b0082", "#9400d3"]],
		selectionPalette: [],
		disabled: false,
		offset: null
	},
	spectrums = [],
	IE = !!/msie/i.exec( window.navigator.userAgent ),
	rgbaSupport = (function() {
		function contains( str, substr ) {
			return !!~('' + str).indexOf(substr);
		}

		var elem = document.createElement('div');
		var style = elem.style;
		style.cssText = 'background-color:rgba(0,0,0,.5)';
		return contains(style.backgroundColor, 'rgba') || contains(style.backgroundColor, 'hsla');
	})(),
	replaceInput = [
		"<div class='sp-replacer'>",
			"<div class='sp-preview'><div class='sp-preview-inner'></div></div>",
			"<div class='sp-dd'>&#9660;</div>",
		"</div>"
	].join(''),
	markup = (function () {

		// IE does not support gradients with multiple stops, so we need to simulate
		//  that for the rainbow slider with 8 divs that each have a single gradient
		var gradientFix = "";
		if (IE) {
			for (var i = 1; i <= 6; i++) {
				gradientFix += "<div class='sp-" + i + "'></div>";
			}
		}

		return [
			"<div class='sp-container sp-hidden'>",
				"<div class='sp-palette-container'>",
					"<div class='sp-palette sp-thumb sp-cf'></div>",
					"<div class='sp-palette-button-container sp-cf'>",
						"<button type='button' class='sp-palette-toggle'></button>",
					"</div>",
				"</div>",
				"<div class='sp-picker-container'>",
					"<div class='sp-top sp-cf'>",
						"<div class='sp-fill'></div>",
						"<div class='sp-top-inner'>",
							"<div class='sp-color'>",
								"<div class='sp-sat'>",
									"<div class='sp-val'>",
										"<div class='sp-dragger'></div>",
									"</div>",
								"</div>",
							"</div>",
							"<div class='sp-clear sp-clear-display'>",
							"</div>",
							"<div class='sp-hue'>",
								"<div class='sp-slider'></div>",
								gradientFix,
							"</div>",
						"</div>",
						"<div class='sp-alpha'><div class='sp-alpha-inner'><div class='sp-alpha-handle'></div></div></div>",
					"</div>",
					"<div class='sp-input-container sp-cf'>",
						"<input class='sp-input' type='text' spellcheck='false'  />",
					"</div>",
					"<div class='sp-initial sp-thumb sp-cf'></div>",
					"<div class='sp-button-container sp-cf'>",
						"<a class='sp-cancel' href='#'></a>",
						"<button type='button' class='sp-choose'></button>",
					"</div>",
				"</div>",
			"</div>"
		].join("");
	})();

	function paletteTemplate (p, color, className, opts) {
		var html = [];
		for (var i = 0; i < p.length; i++) {
			var current = p[i];
			if(current) {
				var tiny = tinycolor(current);
				var c = tiny.toHsl().l < 0.5 ? "sp-thumb-el sp-thumb-dark" : "sp-thumb-el sp-thumb-light";
				c += (tinycolor.equals(color, current)) ? " sp-thumb-active" : "";
				var formattedString = tiny.toString(opts.preferredFormat || "rgb");
				var swatchStyle = rgbaSupport ? ("background-color:" + tiny.toRgbString()) : "filter:" + tiny.toFilter();
				html.push('<span title="' + formattedString + '" data-color="' + tiny.toRgbString() + '" class="' + c + '"><span class="sp-thumb-inner" style="' + swatchStyle + ';" /></span>');
			} else {
				var cls = 'sp-clear-display';
				html.push($('<div />')
					.append($('<span data-color="" style="background-color:transparent;" class="' + cls + '"></span>')
						.attr('title', opts.noColorSelectedText)
					)
					.html()
				);
			}
		}
		return "<div class='sp-cf " + className + "'>" + html.join('') + "</div>";
	}

	function hideAll() {
		for (var i = 0; i < spectrums.length; i++) {
			if (spectrums[i]) {
				spectrums[i].hide();
			}
		}
	}

	function instanceOptions(o, callbackContext) {
		var opts = $.extend({}, defaultOpts, o);
		opts.callbacks = {
			'move': bind(opts.move, callbackContext),
			'change': bind(opts.change, callbackContext),
			'show': bind(opts.show, callbackContext),
			'hide': bind(opts.hide, callbackContext),
			'beforeShow': bind(opts.beforeShow, callbackContext)
		};

		return opts;
	}

	function spectrum(element, o) {

		var opts = instanceOptions(o, element),
			flat = opts.flat,
			showSelectionPalette = opts.showSelectionPalette,
			localStorageKey = opts.localStorageKey,
			theme = opts.theme,
			callbacks = opts.callbacks,
			resize = throttle(reflow, 10),
			visible = false,
			isDragging = false,
			dragWidth = 0,
			dragHeight = 0,
			dragHelperHeight = 0,
			slideHeight = 0,
			slideWidth = 0,
			alphaWidth = 0,
			alphaSlideHelperWidth = 0,
			slideHelperHeight = 0,
			currentHue = 0,
			currentSaturation = 0,
			currentValue = 0,
			currentAlpha = 1,
			palette = [],
			paletteArray = [],
			paletteLookup = {},
			selectionPalette = opts.selectionPalette.slice(0),
			maxSelectionSize = opts.maxSelectionSize,
			draggingClass = "sp-dragging",
			shiftMovementDirection = null;

		var doc = element.ownerDocument,
			body = doc.body,
			boundElement = $(element),
			disabled = false,
			container = $(markup, doc).addClass(theme),
			pickerContainer = container.find(".sp-picker-container"),
			dragger = container.find(".sp-color"),
			dragHelper = container.find(".sp-dragger"),
			slider = container.find(".sp-hue"),
			slideHelper = container.find(".sp-slider"),
			alphaSliderInner = container.find(".sp-alpha-inner"),
			alphaSlider = container.find(".sp-alpha"),
			alphaSlideHelper = container.find(".sp-alpha-handle"),
			textInput = container.find(".sp-input"),
			paletteContainer = container.find(".sp-palette"),
			initialColorContainer = container.find(".sp-initial"),
			cancelButton = container.find(".sp-cancel"),
			clearButton = container.find(".sp-clear"),
			chooseButton = container.find(".sp-choose"),
			toggleButton = container.find(".sp-palette-toggle"),
			isInput = boundElement.is("input"),
			isInputTypeColor = isInput && boundElement.attr("type") === "color" && inputTypeColorSupport(),
			shouldReplace = isInput && !flat,
			replacer = (shouldReplace) ? $(replaceInput).addClass(theme).addClass(opts.className).addClass(opts.replacerClassName) : $([]),
			offsetElement = (shouldReplace) ? replacer : boundElement,
			previewElement = replacer.find(".sp-preview-inner"),
			initialColor = opts.color || (isInput && boundElement.val()),
			colorOnShow = false,
			currentPreferredFormat = opts.preferredFormat,
			clickoutFiresChange = !opts.showButtons || opts.clickoutFiresChange,
			isEmpty = !initialColor,
			allowEmpty = opts.allowEmpty && !isInputTypeColor;

		function applyOptions() {

			if (opts.showPaletteOnly) {
				opts.showPalette = true;
			}

			toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);

			if (opts.palette) {
				palette = opts.palette.slice(0);
				paletteArray = $.isArray(palette[0]) ? palette : [palette];
				paletteLookup = {};
				for (var i = 0; i < paletteArray.length; i++) {
					for (var j = 0; j < paletteArray[i].length; j++) {
						var rgb = tinycolor(paletteArray[i][j]).toRgbString();
						paletteLookup[rgb] = true;
					}
				}
			}

			container.toggleClass("sp-flat", flat);
			container.toggleClass("sp-input-disabled", !opts.showInput);
			container.toggleClass("sp-alpha-enabled", opts.showAlpha);
			container.toggleClass("sp-clear-enabled", allowEmpty);
			container.toggleClass("sp-buttons-disabled", !opts.showButtons);
			container.toggleClass("sp-palette-buttons-disabled", !opts.togglePaletteOnly);
			container.toggleClass("sp-palette-disabled", !opts.showPalette);
			container.toggleClass("sp-palette-only", opts.showPaletteOnly);
			container.toggleClass("sp-initial-disabled", !opts.showInitial);
			container.addClass(opts.className).addClass(opts.containerClassName);

			reflow();
		}

		function initialize() {

			if (IE) {
				container.find("*:not(input)").attr("unselectable", "on");
			}

			applyOptions();

			if (shouldReplace) {
				boundElement.after(replacer).hide();
			}

			if (!allowEmpty) {
				clearButton.hide();
			}

			if (flat) {
				boundElement.after(container).hide();
			}
			else {

				var appendTo = opts.appendTo === "parent" ? boundElement.parent() : $(opts.appendTo);
				if (appendTo.length !== 1) {
					appendTo = $("body");
				}

				appendTo.append(container);
			}

			updateSelectionPaletteFromStorage();

			offsetElement.on("click.spectrum touchstart.spectrum", function (e) {
				if (!disabled) {
					toggle();
				}

				e.stopPropagation();

				if (!$(e.target).is("input")) {
					e.preventDefault();
				}
			});

			if(boundElement.is(":disabled") || (opts.disabled === true)) {
				disable();
			}

			// Prevent clicks from bubbling up to document.  This would cause it to be hidden.
			container.click(stopPropagation);

			// Handle user typed input
			textInput.change(setFromTextInput);
			textInput.on("paste", function () {
				setTimeout(setFromTextInput, 1);
			});
			textInput.keydown(function (e) { if (e.keyCode == 13) { setFromTextInput(); } });

			cancelButton.text(opts.cancelText);
			cancelButton.on("click.spectrum", function (e) {
				e.stopPropagation();
				e.preventDefault();
				revert();
				hide();
			});

			clearButton.attr("title", opts.clearText);
			clearButton.on("click.spectrum", function (e) {
				e.stopPropagation();
				e.preventDefault();
				isEmpty = true;
				move();

				if(flat) {
					//for the flat style, this is a change event
					updateOriginalInput(true);
				}
			});

			chooseButton.text(opts.chooseText);
			chooseButton.on("click.spectrum", function (e) {
				e.stopPropagation();
				e.preventDefault();

				if (IE && textInput.is(":focus")) {
					textInput.trigger('change');
				}

				if (isValid()) {
					updateOriginalInput(true);
					hide();
				}
			});

			toggleButton.text(opts.showPaletteOnly ? opts.togglePaletteMoreText : opts.togglePaletteLessText);
			toggleButton.on("click.spectrum", function (e) {
				e.stopPropagation();
				e.preventDefault();

				opts.showPaletteOnly = !opts.showPaletteOnly;

				// To make sure the Picker area is drawn on the right, next to the
				// Palette area (and not below the palette), first move the Palette
				// to the left to make space for the picker, plus 5px extra.
				// The 'applyOptions' function puts the whole container back into place
				// and takes care of the button-text and the sp-palette-only CSS class.
				if (!opts.showPaletteOnly && !flat) {
					container.css('left', '-=' + (pickerContainer.outerWidth(true) + 5));
				}
				applyOptions();
			});

			draggable(alphaSlider, function (dragX, dragY, e) {
				currentAlpha = (dragX / alphaWidth);
				isEmpty = false;
				if (e.shiftKey) {
					currentAlpha = Math.round(currentAlpha * 10) / 10;
				}

				move();
			}, dragStart, dragStop);

			draggable(slider, function (dragX, dragY) {
				currentHue = parseFloat(dragY / slideHeight);
				isEmpty = false;
				if (!opts.showAlpha) {
					currentAlpha = 1;
				}
				move();
			}, dragStart, dragStop);

			draggable(dragger, function (dragX, dragY, e) {

				// shift+drag should snap the movement to either the x or y axis.
				if (!e.shiftKey) {
					shiftMovementDirection = null;
				}
				else if (!shiftMovementDirection) {
					var oldDragX = currentSaturation * dragWidth;
					var oldDragY = dragHeight - (currentValue * dragHeight);
					var furtherFromX = Math.abs(dragX - oldDragX) > Math.abs(dragY - oldDragY);

					shiftMovementDirection = furtherFromX ? "x" : "y";
				}

				var setSaturation = !shiftMovementDirection || shiftMovementDirection === "x";
				var setValue = !shiftMovementDirection || shiftMovementDirection === "y";

				if (setSaturation) {
					currentSaturation = parseFloat(dragX / dragWidth);
				}
				if (setValue) {
					currentValue = parseFloat((dragHeight - dragY) / dragHeight);
				}

				isEmpty = false;
				if (!opts.showAlpha) {
					currentAlpha = 1;
				}

				move();

			}, dragStart, dragStop);

			if (!!initialColor) {
				set(initialColor);

				// In case color was black - update the preview UI and set the format
				// since the set function will not run (default color is black).
				updateUI();
				currentPreferredFormat = opts.preferredFormat || tinycolor(initialColor).format;

				addColorToSelectionPalette(initialColor);
			}
			else {
				updateUI();
			}

			if (flat) {
				show();
			}

			function paletteElementClick(e) {
				if (e.data && e.data.ignore) {
					set($(e.target).closest(".sp-thumb-el").data("color"));
					move();
				}
				else {
					set($(e.target).closest(".sp-thumb-el").data("color"));
					move();

					// If the picker is going to close immediately, a palette selection
					// is a change.  Otherwise, it's a move only.
					if (opts.hideAfterPaletteSelect) {
						updateOriginalInput(true);
						hide();
					} else {
						updateOriginalInput();
					}
				}

				return false;
			}

			var paletteEvent = IE ? "mousedown.spectrum" : "click.spectrum touchstart.spectrum";
			paletteContainer.on(paletteEvent, ".sp-thumb-el", paletteElementClick);
			initialColorContainer.on(paletteEvent, ".sp-thumb-el:nth-child(1)", { ignore: true }, paletteElementClick);
		}

		function updateSelectionPaletteFromStorage() {

			if (localStorageKey && window.localStorage) {

				// Migrate old palettes over to new format.  May want to remove this eventually.
				try {
					var oldPalette = window.localStorage[localStorageKey].split(",#");
					if (oldPalette.length > 1) {
						delete window.localStorage[localStorageKey];
						$.each(oldPalette, function(i, c) {
							 addColorToSelectionPalette(c);
						});
					}
				}
				catch(e) { }

				try {
					selectionPalette = window.localStorage[localStorageKey].split(";");
				}
				catch (e) { }
			}
		}

		function addColorToSelectionPalette(color) {
			if (showSelectionPalette) {
				var rgb = tinycolor(color).toRgbString();
				if (!paletteLookup[rgb] && $.inArray(rgb, selectionPalette) === -1) {
					selectionPalette.push(rgb);
					while(selectionPalette.length > maxSelectionSize) {
						selectionPalette.shift();
					}
				}

				if (localStorageKey && window.localStorage) {
					try {
						window.localStorage[localStorageKey] = selectionPalette.join(";");
					}
					catch(e) { }
				}
			}
		}

		function getUniqueSelectionPalette() {
			var unique = [];
			if (opts.showPalette) {
				for (var i = 0; i < selectionPalette.length; i++) {
					var rgb = tinycolor(selectionPalette[i]).toRgbString();

					if (!paletteLookup[rgb]) {
						unique.push(selectionPalette[i]);
					}
				}
			}

			return unique.reverse().slice(0, opts.maxSelectionSize);
		}

		function drawPalette() {

			var currentColor = get();

			var html = $.map(paletteArray, function (palette, i) {
				return paletteTemplate(palette, currentColor, "sp-palette-row sp-palette-row-" + i, opts);
			});

			updateSelectionPaletteFromStorage();

			if (selectionPalette) {
				html.push(paletteTemplate(getUniqueSelectionPalette(), currentColor, "sp-palette-row sp-palette-row-selection", opts));
			}

			paletteContainer.html(html.join(""));
		}

		function drawInitial() {
			if (opts.showInitial) {
				var initial = colorOnShow;
				var current = get();
				initialColorContainer.html(paletteTemplate([initial, current], current, "sp-palette-row-initial", opts));
			}
		}

		function dragStart() {
			if (dragHeight <= 0 || dragWidth <= 0 || slideHeight <= 0) {
				reflow();
			}
			isDragging = true;
			container.addClass(draggingClass);
			shiftMovementDirection = null;
			boundElement.trigger('dragstart.spectrum', [ get() ]);
		}

		function dragStop() {
			isDragging = false;
			container.removeClass(draggingClass);
			boundElement.trigger('dragstop.spectrum', [ get() ]);
		}

		function setFromTextInput() {

			var value = textInput.val();

			if ((value === null || value === "") && allowEmpty) {
				set(null);
				move();
				updateOriginalInput();
			}
			else {
				var tiny = tinycolor(value);
				if (tiny.isValid()) {
					set(tiny);
					move();
					updateOriginalInput();
				}
				else {
					textInput.addClass("sp-validation-error");
				}
			}
		}

		function toggle() {
			if (visible) {
				hide();
			}
			else {
				show();
			}
		}

		function show() {
			var event = $.Event('beforeShow.spectrum');

			if (visible) {
				reflow();
				return;
			}

			boundElement.trigger(event, [ get() ]);

			if (callbacks.beforeShow(get()) === false || event.isDefaultPrevented()) {
				return;
			}

			hideAll();
			visible = true;

			$(doc).on("keydown.spectrum", onkeydown);
			$(doc).on("click.spectrum", clickout);
			$(window).on("resize.spectrum", resize);
			replacer.addClass("sp-active");
			container.removeClass("sp-hidden");

			reflow();
			updateUI();

			colorOnShow = get();

			drawInitial();
			callbacks.show(colorOnShow);
			boundElement.trigger('show.spectrum', [ colorOnShow ]);
		}

		function onkeydown(e) {
			// Close on ESC
			if (e.keyCode === 27) {
				hide();
			}
		}

		function clickout(e) {
			// Return on right click.
			if (e.button == 2) { return; }

			// If a drag event was happening during the mouseup, don't hide
			// on click.
			if (isDragging) { return; }

			if (clickoutFiresChange) {
				updateOriginalInput(true);
			}
			else {
				revert();
			}
			hide();
		}

		function hide() {
			// Return if hiding is unnecessary
			if (!visible || flat) { return; }
			visible = false;

			$(doc).off("keydown.spectrum", onkeydown);
			$(doc).off("click.spectrum", clickout);
			$(window).off("resize.spectrum", resize);

			replacer.removeClass("sp-active");
			container.addClass("sp-hidden");

			callbacks.hide(get());
			boundElement.trigger('hide.spectrum', [ get() ]);
		}

		function revert() {
			set(colorOnShow, true);
			updateOriginalInput(true);
		}

		function set(color, ignoreFormatChange) {
			if (tinycolor.equals(color, get())) {
				// Update UI just in case a validation error needs
				// to be cleared.
				updateUI();
				return;
			}

			var newColor, newHsv;
			if (!color && allowEmpty) {
				isEmpty = true;
			} else {
				isEmpty = false;
				newColor = tinycolor(color);
				newHsv = newColor.toHsv();

				currentHue = (newHsv.h % 360) / 360;
				currentSaturation = newHsv.s;
				currentValue = newHsv.v;
				currentAlpha = newHsv.a;
			}
			updateUI();

			if (newColor && newColor.isValid() && !ignoreFormatChange) {
				currentPreferredFormat = opts.preferredFormat || newColor.getFormat();
			}
		}

		function get(opts) {
			opts = opts || { };

			if (allowEmpty && isEmpty) {
				return null;
			}

			return tinycolor.fromRatio({
				h: currentHue,
				s: currentSaturation,
				v: currentValue,
				a: Math.round(currentAlpha * 1000) / 1000
			}, { format: opts.format || currentPreferredFormat });
		}

		function isValid() {
			return !textInput.hasClass("sp-validation-error");
		}

		function move() {
			updateUI();

			callbacks.move(get());
			boundElement.trigger('move.spectrum', [ get() ]);
		}

		function updateUI() {

			textInput.removeClass("sp-validation-error");

			updateHelperLocations();

			// Update dragger background color (gradients take care of saturation and value).
			var flatColor = tinycolor.fromRatio({ h: currentHue, s: 1, v: 1 });
			dragger.css("background-color", flatColor.toHexString());

			// Get a format that alpha will be included in (hex and names ignore alpha)
			var format = currentPreferredFormat;
			if (currentAlpha < 1 && !(currentAlpha === 0 && format === "name")) {
				if (format === "hex" || format === "hex3" || format === "hex6" || format === "name") {
					format = "rgb";
				}
			}

			var realColor = get({ format: format }),
				displayColor = '';

			 //reset background info for preview element
			previewElement.removeClass("sp-clear-display");
			previewElement.css('background-color', 'transparent');

			if (!realColor && allowEmpty) {
				// Update the replaced elements background with icon indicating no color selection
				previewElement.addClass("sp-clear-display");
			}
			else {
				var realHex = realColor.toHexString(),
					realRgb = realColor.toRgbString();

				// Update the replaced elements background color (with actual selected color)
				if (rgbaSupport || realColor.alpha === 1) {
					previewElement.css("background-color", realRgb);
				}
				else {
					previewElement.css("background-color", "transparent");
					previewElement.css("filter", realColor.toFilter());
				}

				if (opts.showAlpha) {
					var rgb = realColor.toRgb();
					rgb.a = 0;
					var realAlpha = tinycolor(rgb).toRgbString();
					var gradient = "linear-gradient(left, " + realAlpha + ", " + realHex + ")";

					if (IE) {
						alphaSliderInner.css("filter", tinycolor(realAlpha).toFilter({ gradientType: 1 }, realHex));
					}
					else {
						alphaSliderInner.css("background", "-webkit-" + gradient);
						alphaSliderInner.css("background", "-moz-" + gradient);
						alphaSliderInner.css("background", "-ms-" + gradient);
						// Use current syntax gradient on unprefixed property.
						alphaSliderInner.css("background",
							"linear-gradient(to right, " + realAlpha + ", " + realHex + ")");
					}
				}

				displayColor = realColor.toString(format);
			}

			// Update the text entry input as it changes happen
			if (opts.showInput) {
				textInput.val(displayColor);
			}

			if (opts.showPalette) {
				drawPalette();
			}

			drawInitial();
		}

		function updateHelperLocations() {
			var s = currentSaturation;
			var v = currentValue;

			if(allowEmpty && isEmpty) {
				//if selected color is empty, hide the helpers
				alphaSlideHelper.hide();
				slideHelper.hide();
				dragHelper.hide();
			}
			else {
				//make sure helpers are visible
				alphaSlideHelper.show();
				slideHelper.show();
				dragHelper.show();

				// Where to show the little circle in that displays your current selected color
				var dragX = s * dragWidth;
				var dragY = dragHeight - (v * dragHeight);
				dragX = Math.max(
					-dragHelperHeight,
					Math.min(dragWidth - dragHelperHeight, dragX - dragHelperHeight)
				);
				dragY = Math.max(
					-dragHelperHeight,
					Math.min(dragHeight - dragHelperHeight, dragY - dragHelperHeight)
				);
				dragHelper.css({
					"top": dragY + "px",
					"left": dragX + "px"
				});

				var alphaX = currentAlpha * alphaWidth;
				alphaSlideHelper.css({
					"left": (alphaX - (alphaSlideHelperWidth / 2)) + "px"
				});

				// Where to show the bar that displays your current selected hue
				var slideY = (currentHue) * slideHeight;
				slideHelper.css({
					"top": (slideY - slideHelperHeight) + "px"
				});
			}
		}

		function updateOriginalInput(fireCallback) {
			var color = get(),
				displayColor = '',
				hasChanged = !tinycolor.equals(color, colorOnShow);

			if (color) {
				displayColor = color.toString(currentPreferredFormat);
				// Update the selection palette with the current color
				addColorToSelectionPalette(color);
			}

			if (isInput) {
				boundElement.val(displayColor);
			}

			if (fireCallback && hasChanged) {
				callbacks.change(color);
				boundElement.trigger('change', [ color ]);
			}
		}

		function reflow() {
			if (!visible) {
				return; // Calculations would be useless and wouldn't be reliable anyways
			}
			dragWidth = dragger.width();
			dragHeight = dragger.height();
			dragHelperHeight = dragHelper.height();
			slideWidth = slider.width();
			slideHeight = slider.height();
			slideHelperHeight = slideHelper.height();
			alphaWidth = alphaSlider.width();
			alphaSlideHelperWidth = alphaSlideHelper.width();

			if (!flat) {
				container.css("position", "absolute");
				if (opts.offset) {
					container.offset(opts.offset);
				} else {
					container.offset(getOffset(container, offsetElement));
				}
			}

			updateHelperLocations();

			if (opts.showPalette) {
				drawPalette();
			}

			boundElement.trigger('reflow.spectrum');
		}

		function destroy() {
			boundElement.show();
			offsetElement.off("click.spectrum touchstart.spectrum");
			container.remove();
			replacer.remove();
			spectrums[spect.id] = null;
		}

		function option(optionName, optionValue) {
			if (optionName === undefined) {
				return $.extend({}, opts);
			}
			if (optionValue === undefined) {
				return opts[optionName];
			}

			opts[optionName] = optionValue;

			if (optionName === "preferredFormat") {
				currentPreferredFormat = opts.preferredFormat;
			}
			applyOptions();
		}

		function enable() {
			disabled = false;
			boundElement.attr("disabled", false);
			offsetElement.removeClass("sp-disabled");
		}

		function disable() {
			hide();
			disabled = true;
			boundElement.attr("disabled", true);
			offsetElement.addClass("sp-disabled");
		}

		function setOffset(coord) {
			opts.offset = coord;
			reflow();
		}

		initialize();

		var spect = {
			show: show,
			hide: hide,
			toggle: toggle,
			reflow: reflow,
			option: option,
			enable: enable,
			disable: disable,
			offset: setOffset,
			set: function (c) {
				set(c);
				updateOriginalInput();
			},
			get: get,
			destroy: destroy,
			container: container
		};

		spect.id = spectrums.push(spect) - 1;

		return spect;
	}

	/**
	* checkOffset - get the offset below/above and left/right element depending on screen position
	* Thanks https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.datepicker.js
	*/
	function getOffset(picker, input) {
		var extraY = 0;
		var dpWidth = picker.outerWidth();
		var dpHeight = picker.outerHeight();
		var inputHeight = input.outerHeight();
		var doc = picker[0].ownerDocument;
		var docElem = doc.documentElement;
		var viewWidth = docElem.clientWidth + $(doc).scrollLeft();
		var viewHeight = docElem.clientHeight + $(doc).scrollTop();
		var offset = input.offset();
		var offsetLeft = offset.left;
		var offsetTop = offset.top;

		offsetTop += inputHeight;

		offsetLeft -=
			Math.min(offsetLeft, (offsetLeft + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offsetLeft + dpWidth - viewWidth) : 0);

		offsetTop -=
			Math.min(offsetTop, ((offsetTop + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight - extraY) : extraY));

		return {
			top: offsetTop,
			bottom: offset.bottom,
			left: offsetLeft,
			right: offset.right,
			width: offset.width,
			height: offset.height
		};
	}

	/**
	* noop - do nothing
	*/
	function noop() {

	}

	/**
	* stopPropagation - makes the code only doing this a little easier to read in line
	*/
	function stopPropagation(e) {
		e.stopPropagation();
	}

	/**
	* Create a function bound to a given object
	* Thanks to underscore.js
	*/
	function bind(func, obj) {
		var slice = Array.prototype.slice;
		var args = slice.call(arguments, 2);
		return function () {
			return func.apply(obj, args.concat(slice.call(arguments)));
		};
	}

	/**
	* Lightweight drag helper.  Handles containment within the element, so that
	* when dragging, the x is within [0,element.width] and y is within [0,element.height]
	*/
	function draggable(element, onmove, onstart, onstop) {
		onmove = onmove || function () { };
		onstart = onstart || function () { };
		onstop = onstop || function () { };
		var doc = document;
		var dragging = false;
		var offset = {};
		var maxHeight = 0;
		var maxWidth = 0;
		var hasTouch = ('ontouchstart' in window);

		var duringDragEvents = {};
		duringDragEvents["selectstart"] = prevent;
		duringDragEvents["dragstart"] = prevent;
		duringDragEvents["touchmove mousemove"] = move;
		duringDragEvents["touchend mouseup"] = stop;

		function prevent(e) {
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.preventDefault) {
				e.preventDefault();
			}
			e.returnValue = false;
		}

		function move(e) {
			if (dragging) {
				// Mouseup happened outside of window
				if (IE && doc.documentMode < 9 && !e.button) {
					return stop();
				}

				var t0 = e.originalEvent && e.originalEvent.touches && e.originalEvent.touches[0];
				var pageX = t0 && t0.pageX || e.pageX;
				var pageY = t0 && t0.pageY || e.pageY;

				var dragX = Math.max(0, Math.min(pageX - offset.left, maxWidth));
				var dragY = Math.max(0, Math.min(pageY - offset.top, maxHeight));

				if (hasTouch) {
					// Stop scrolling in iOS
					prevent(e);
				}

				onmove.apply(element, [dragX, dragY, e]);
			}
		}

		function start(e) {
			var rightclick = (e.which) ? (e.which == 3) : (e.button == 2);

			if (!rightclick && !dragging) {
				if (onstart.apply(element, arguments) !== false) {
					dragging = true;
					maxHeight = $(element).height();
					maxWidth = $(element).width();
					offset = $(element).offset();

					$(doc).on(duringDragEvents);
					$(doc.body).addClass("sp-dragging");

					move(e);

					prevent(e);
				}
			}
		}

		function stop() {
			if (dragging) {
				$(doc).off(duringDragEvents);
				$(doc.body).removeClass("sp-dragging");

				// Wait a tick before notifying observers to allow the click event
				// to fire in Chrome.
				setTimeout(function() {
					onstop.apply(element, arguments);
				}, 0);
			}
			dragging = false;
		}

		$(element).on("touchstart mousedown", start);
	}

	function throttle(func, wait, debounce) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var throttler = function () {
				timeout = null;
				func.apply(context, args);
			};
			if (debounce) clearTimeout(timeout);
			if (debounce || !timeout) timeout = setTimeout(throttler, wait);
		};
	}

	function inputTypeColorSupport() {
		return $.fn.spectrum.inputTypeColorSupport();
	}

	/**
	* Define a jQuery plugin
	*/
	var dataID = "spectrum.id";
	$.fn.spectrum = function (opts, extra) {

		if (typeof opts == "string") {

			var returnValue = this;
			var args = Array.prototype.slice.call( arguments, 1 );

			this.each(function () {
				var spect = spectrums[$(this).data(dataID)];
				if (spect) {
					var method = spect[opts];
					if (!method) {
						throw new Error( "Spectrum: no such method: '" + opts + "'" );
					}

					if (opts == "get") {
						returnValue = spect.get();
					}
					else if (opts == "container") {
						returnValue = spect.container;
					}
					else if (opts == "option") {
						returnValue = spect.option.apply(spect, args);
					}
					else if (opts == "destroy") {
						spect.destroy();
						$(this).removeData(dataID);
					}
					else {
						method.apply(spect, args);
					}
				}
			});

			return returnValue;
		}

		// Initializing a new instance of spectrum
		return this.spectrum("destroy").each(function () {
			var options = $.extend({}, $(this).data(), opts);
			var spect = spectrum(this, options);
			$(this).data(dataID, spect.id);
		});
	};

	$.fn.spectrum.load = true;
	$.fn.spectrum.loadOpts = {};
	$.fn.spectrum.draggable = draggable;
	$.fn.spectrum.defaults = defaultOpts;
	$.fn.spectrum.inputTypeColorSupport = function inputTypeColorSupport() {
		if (typeof inputTypeColorSupport._cachedResult === "undefined") {
			var colorInput = $("<input type='color'/>")[0]; // if color element is supported, value will default to not null
			inputTypeColorSupport._cachedResult = colorInput.type === "color" && colorInput.value !== "";
		}
		return inputTypeColorSupport._cachedResult;
	};

	$.spectrum = { };
	$.spectrum.localization = { };
	$.spectrum.palettes = { };

	$.fn.spectrum.processNativeColorInputs = function () {
		var colorInputs = $("input[type=color]");
		if (colorInputs.length && !inputTypeColorSupport()) {
			colorInputs.spectrum({
				preferredFormat: "hex6"
			});
		}
	};

	// TinyColor v1.1.2
	// https://github.com/bgrins/TinyColor
	// Brian Grinstead, MIT License

	(function() {

	var trimLeft = /^[\s,#]+/,
		trimRight = /\s+$/,
		tinyCounter = 0,
		math = Math,
		mathRound = math.round,
		mathMin = math.min,
		mathMax = math.max,
		mathRandom = math.random;

	var tinycolor = function(color, opts) {

		color = (color) ? color : '';
		opts = opts || { };

		// If input is already a tinycolor, return itself
		if (color instanceof tinycolor) {
		   return color;
		}
		// If we are called as a function, call using new instead
		if (!(this instanceof tinycolor)) {
			return new tinycolor(color, opts);
		}

		var rgb = inputToRGB(color);
		this._originalInput = color,
		this._r = rgb.r,
		this._g = rgb.g,
		this._b = rgb.b,
		this._a = rgb.a,
		this._roundA = mathRound(1000 * this._a) / 1000,
		this._format = opts.format || rgb.format;
		this._gradientType = opts.gradientType;

		// Don't let the range of [0,255] come back in [0,1].
		// Potentially lose a little bit of precision here, but will fix issues where
		// .5 gets interpreted as half of the total, instead of half of 1
		// If it was supposed to be 128, this was already taken care of by `inputToRgb`
		if (this._r < 1) { this._r = mathRound(this._r); }
		if (this._g < 1) { this._g = mathRound(this._g); }
		if (this._b < 1) { this._b = mathRound(this._b); }

		this._ok = rgb.ok;
		this._tc_id = tinyCounter++;
	};

	tinycolor.prototype = {
		isDark: function() {
			return this.getBrightness() < 128;
		},
		isLight: function() {
			return !this.isDark();
		},
		isValid: function() {
			return this._ok;
		},
		getOriginalInput: function() {
		  return this._originalInput;
		},
		getFormat: function() {
			return this._format;
		},
		getAlpha: function() {
			return this._a;
		},
		getBrightness: function() {
			var rgb = this.toRgb();
			return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
		},
		setAlpha: function(value) {
			this._a = boundAlpha(value);
			this._roundA = mathRound(1000 * this._a) / 1000;
			return this;
		},
		toHsv: function() {
			var hsv = rgbToHsv(this._r, this._g, this._b);
			return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
		},
		toHsvString: function() {
			var hsv = rgbToHsv(this._r, this._g, this._b);
			var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
			return (this._a == 1) ?
			  "hsv("  + h + ", " + s + "%, " + v + "%)" :
			  "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
		},
		toHsl: function() {
			var hsl = rgbToHsl(this._r, this._g, this._b);
			return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
		},
		toHslString: function() {
			var hsl = rgbToHsl(this._r, this._g, this._b);
			var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
			return (this._a == 1) ?
			  "hsl("  + h + ", " + s + "%, " + l + "%)" :
			  "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
		},
		toHex: function(allow3Char) {
			return rgbToHex(this._r, this._g, this._b, allow3Char);
		},
		toHexString: function(allow3Char) {
			return '#' + this.toHex(allow3Char);
		},
		toHex8: function() {
			return rgbaToHex(this._r, this._g, this._b, this._a);
		},
		toHex8String: function() {
			return '#' + this.toHex8();
		},
		toRgb: function() {
			return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
		},
		toRgbString: function() {
			return (this._a == 1) ?
			  "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
			  "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
		},
		toPercentageRgb: function() {
			return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
		},
		toPercentageRgbString: function() {
			return (this._a == 1) ?
			  "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
			  "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
		},
		toName: function() {
			if (this._a === 0) {
				return "transparent";
			}

			if (this._a < 1) {
				return false;
			}

			return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
		},
		toFilter: function(secondColor) {
			var hex8String = '#' + rgbaToHex(this._r, this._g, this._b, this._a);
			var secondHex8String = hex8String;
			var gradientType = this._gradientType ? "GradientType = 1, " : "";

			if (secondColor) {
				var s = tinycolor(secondColor);
				secondHex8String = s.toHex8String();
			}

			return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
		},
		toString: function(format) {
			var formatSet = !!format;
			format = format || this._format;

			var formattedString = false;
			var hasAlpha = this._a < 1 && this._a >= 0;
			var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "name");

			if (needsAlphaFormat) {
				// Special case for "transparent", all other non-alpha formats
				// will return rgba when there is transparency.
				if (format === "name" && this._a === 0) {
					return this.toName();
				}
				return this.toRgbString();
			}
			if (format === "rgb") {
				formattedString = this.toRgbString();
			}
			if (format === "prgb") {
				formattedString = this.toPercentageRgbString();
			}
			if (format === "hex" || format === "hex6") {
				formattedString = this.toHexString();
			}
			if (format === "hex3") {
				formattedString = this.toHexString(true);
			}
			if (format === "hex8") {
				formattedString = this.toHex8String();
			}
			if (format === "name") {
				formattedString = this.toName();
			}
			if (format === "hsl") {
				formattedString = this.toHslString();
			}
			if (format === "hsv") {
				formattedString = this.toHsvString();
			}

			return formattedString || this.toHexString();
		},

		_applyModification: function(fn, args) {
			var color = fn.apply(null, [this].concat([].slice.call(args)));
			this._r = color._r;
			this._g = color._g;
			this._b = color._b;
			this.setAlpha(color._a);
			return this;
		},
		lighten: function() {
			return this._applyModification(lighten, arguments);
		},
		brighten: function() {
			return this._applyModification(brighten, arguments);
		},
		darken: function() {
			return this._applyModification(darken, arguments);
		},
		desaturate: function() {
			return this._applyModification(desaturate, arguments);
		},
		saturate: function() {
			return this._applyModification(saturate, arguments);
		},
		greyscale: function() {
			return this._applyModification(greyscale, arguments);
		},
		spin: function() {
			return this._applyModification(spin, arguments);
		},

		_applyCombination: function(fn, args) {
			return fn.apply(null, [this].concat([].slice.call(args)));
		},
		analogous: function() {
			return this._applyCombination(analogous, arguments);
		},
		complement: function() {
			return this._applyCombination(complement, arguments);
		},
		monochromatic: function() {
			return this._applyCombination(monochromatic, arguments);
		},
		splitcomplement: function() {
			return this._applyCombination(splitcomplement, arguments);
		},
		triad: function() {
			return this._applyCombination(triad, arguments);
		},
		tetrad: function() {
			return this._applyCombination(tetrad, arguments);
		}
	};

	// If input is an object, force 1 into "1.0" to handle ratios properly
	// String input requires "1.0" as input, so 1 will be treated as 1
	tinycolor.fromRatio = function(color, opts) {
		if (typeof color == "object") {
			var newColor = {};
			for (var i in color) {
				if (color.hasOwnProperty(i)) {
					if (i === "a") {
						newColor[i] = color[i];
					}
					else {
						newColor[i] = convertToPercentage(color[i]);
					}
				}
			}
			color = newColor;
		}

		return tinycolor(color, opts);
	};

	// Given a string or object, convert that input to RGB
	// Possible string inputs:
	//
	//     "red"
	//     "#f00" or "f00"
	//     "#ff0000" or "ff0000"
	//     "#ff000000" or "ff000000"
	//     "rgb 255 0 0" or "rgb (255, 0, 0)"
	//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	//
	function inputToRGB(color) {

		var rgb = { r: 0, g: 0, b: 0 };
		var a = 1;
		var ok = false;
		var format = false;

		if (typeof color == "string") {
			color = stringInputToObject(color);
		}

		if (typeof color == "object") {
			if (color.hasOwnProperty("r") && color.hasOwnProperty("g") && color.hasOwnProperty("b")) {
				rgb = rgbToRgb(color.r, color.g, color.b);
				ok = true;
				format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
			}
			else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("v")) {
				color.s = convertToPercentage(color.s);
				color.v = convertToPercentage(color.v);
				rgb = hsvToRgb(color.h, color.s, color.v);
				ok = true;
				format = "hsv";
			}
			else if (color.hasOwnProperty("h") && color.hasOwnProperty("s") && color.hasOwnProperty("l")) {
				color.s = convertToPercentage(color.s);
				color.l = convertToPercentage(color.l);
				rgb = hslToRgb(color.h, color.s, color.l);
				ok = true;
				format = "hsl";
			}

			if (color.hasOwnProperty("a")) {
				a = color.a;
			}
		}

		a = boundAlpha(a);

		return {
			ok: ok,
			format: color.format || format,
			r: mathMin(255, mathMax(rgb.r, 0)),
			g: mathMin(255, mathMax(rgb.g, 0)),
			b: mathMin(255, mathMax(rgb.b, 0)),
			a: a
		};
	}


	// Conversion Functions
	// --------------------

	// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

	// `rgbToRgb`
	// Handle bounds / percentage checking to conform to CSS color spec
	// <http://www.w3.org/TR/css3-color/>
	// *Assumes:* r, g, b in [0, 255] or [0, 1]
	// *Returns:* { r, g, b } in [0, 255]
	function rgbToRgb(r, g, b){
		return {
			r: bound01(r, 255) * 255,
			g: bound01(g, 255) * 255,
			b: bound01(b, 255) * 255
		};
	}

	// `rgbToHsl`
	// Converts an RGB color value to HSL.
	// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	// *Returns:* { h, s, l } in [0,1]
	function rgbToHsl(r, g, b) {

		r = bound01(r, 255);
		g = bound01(g, 255);
		b = bound01(b, 255);

		var max = mathMax(r, g, b), min = mathMin(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min) {
			h = s = 0; // achromatic
		}
		else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}

			h /= 6;
		}

		return { h: h, s: s, l: l };
	}

	// `hslToRgb`
	// Converts an HSL color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	function hslToRgb(h, s, l) {
		var r, g, b;

		h = bound01(h, 360);
		s = bound01(s, 100);
		l = bound01(l, 100);

		function hue2rgb(p, q, t) {
			if(t < 0) t += 1;
			if(t > 1) t -= 1;
			if(t < 1/6) return p + (q - p) * 6 * t;
			if(t < 1/2) return q;
			if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
			return p;
		}

		if(s === 0) {
			r = g = b = l; // achromatic
		}
		else {
			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHsv`
	// Converts an RGB color value to HSV
	// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	// *Returns:* { h, s, v } in [0,1]
	function rgbToHsv(r, g, b) {

		r = bound01(r, 255);
		g = bound01(g, 255);
		b = bound01(b, 255);

		var max = mathMax(r, g, b), min = mathMin(r, g, b);
		var h, s, v = max;

		var d = max - min;
		s = max === 0 ? 0 : d / max;

		if(max == min) {
			h = 0; // achromatic
		}
		else {
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}
		return { h: h, s: s, v: v };
	}

	// `hsvToRgb`
	// Converts an HSV color value to RGB.
	// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	// *Returns:* { r, g, b } in the set [0, 255]
	 function hsvToRgb(h, s, v) {

		h = bound01(h, 360) * 6;
		s = bound01(s, 100);
		v = bound01(v, 100);

		var i = math.floor(h),
			f = h - i,
			p = v * (1 - s),
			q = v * (1 - f * s),
			t = v * (1 - (1 - f) * s),
			mod = i % 6,
			r = [v, q, p, p, t, v][mod],
			g = [t, v, v, q, p, p][mod],
			b = [p, p, t, v, v, q][mod];

		return { r: r * 255, g: g * 255, b: b * 255 };
	}

	// `rgbToHex`
	// Converts an RGB color to hex
	// Assumes r, g, and b are contained in the set [0, 255]
	// Returns a 3 or 6 character hex
	function rgbToHex(r, g, b, allow3Char) {

		var hex = [
			pad2(mathRound(r).toString(16)),
			pad2(mathRound(g).toString(16)),
			pad2(mathRound(b).toString(16))
		];

		// Return a 3 character hex if possible
		if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
			return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
		}

		return hex.join("");
	}
		// `rgbaToHex`
		// Converts an RGBA color plus alpha transparency to hex
		// Assumes r, g, b and a are contained in the set [0, 255]
		// Returns an 8 character hex
		function rgbaToHex(r, g, b, a) {

			var hex = [
				pad2(convertDecimalToHex(a)),
				pad2(mathRound(r).toString(16)),
				pad2(mathRound(g).toString(16)),
				pad2(mathRound(b).toString(16))
			];

			return hex.join("");
		}

	// `equals`
	// Can be called with any tinycolor input
	tinycolor.equals = function (color1, color2) {
		if (!color1 || !color2) { return false; }
		return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
	};
	tinycolor.random = function() {
		return tinycolor.fromRatio({
			r: mathRandom(),
			g: mathRandom(),
			b: mathRandom()
		});
	};


	// Modification Functions
	// ----------------------
	// Thanks to less.js for some of the basics here
	// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

	function desaturate(color, amount) {
		amount = (amount === 0) ? 0 : (amount || 10);
		var hsl = tinycolor(color).toHsl();
		hsl.s -= amount / 100;
		hsl.s = clamp01(hsl.s);
		return tinycolor(hsl);
	}

	function saturate(color, amount) {
		amount = (amount === 0) ? 0 : (amount || 10);
		var hsl = tinycolor(color).toHsl();
		hsl.s += amount / 100;
		hsl.s = clamp01(hsl.s);
		return tinycolor(hsl);
	}

	function greyscale(color) {
		return tinycolor(color).desaturate(100);
	}

	function lighten (color, amount) {
		amount = (amount === 0) ? 0 : (amount || 10);
		var hsl = tinycolor(color).toHsl();
		hsl.l += amount / 100;
		hsl.l = clamp01(hsl.l);
		return tinycolor(hsl);
	}

	function brighten(color, amount) {
		amount = (amount === 0) ? 0 : (amount || 10);
		var rgb = tinycolor(color).toRgb();
		rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
		rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
		rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
		return tinycolor(rgb);
	}

	function darken (color, amount) {
		amount = (amount === 0) ? 0 : (amount || 10);
		var hsl = tinycolor(color).toHsl();
		hsl.l -= amount / 100;
		hsl.l = clamp01(hsl.l);
		return tinycolor(hsl);
	}

	// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	// Values outside of this range will be wrapped into this range.
	function spin(color, amount) {
		var hsl = tinycolor(color).toHsl();
		var hue = (mathRound(hsl.h) + amount) % 360;
		hsl.h = hue < 0 ? 360 + hue : hue;
		return tinycolor(hsl);
	}

	// Combination Functions
	// ---------------------
	// Thanks to jQuery xColor for some of the ideas behind these
	// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

	function complement(color) {
		var hsl = tinycolor(color).toHsl();
		hsl.h = (hsl.h + 180) % 360;
		return tinycolor(hsl);
	}

	function triad(color) {
		var hsl = tinycolor(color).toHsl();
		var h = hsl.h;
		return [
			tinycolor(color),
			tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
			tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
		];
	}

	function tetrad(color) {
		var hsl = tinycolor(color).toHsl();
		var h = hsl.h;
		return [
			tinycolor(color),
			tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
			tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
			tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
		];
	}

	function splitcomplement(color) {
		var hsl = tinycolor(color).toHsl();
		var h = hsl.h;
		return [
			tinycolor(color),
			tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
			tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
		];
	}

	function analogous(color, results, slices) {
		results = results || 6;
		slices = slices || 30;

		var hsl = tinycolor(color).toHsl();
		var part = 360 / slices;
		var ret = [tinycolor(color)];

		for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
			hsl.h = (hsl.h + part) % 360;
			ret.push(tinycolor(hsl));
		}
		return ret;
	}

	function monochromatic(color, results) {
		results = results || 6;
		var hsv = tinycolor(color).toHsv();
		var h = hsv.h, s = hsv.s, v = hsv.v;
		var ret = [];
		var modification = 1 / results;

		while (results--) {
			ret.push(tinycolor({ h: h, s: s, v: v}));
			v = (v + modification) % 1;
		}

		return ret;
	}

	// Utility Functions
	// ---------------------

	tinycolor.mix = function(color1, color2, amount) {
		amount = (amount === 0) ? 0 : (amount || 50);

		var rgb1 = tinycolor(color1).toRgb();
		var rgb2 = tinycolor(color2).toRgb();

		var p = amount / 100;
		var w = p * 2 - 1;
		var a = rgb2.a - rgb1.a;

		var w1;

		if (w * a == -1) {
			w1 = w;
		} else {
			w1 = (w + a) / (1 + w * a);
		}

		w1 = (w1 + 1) / 2;

		var w2 = 1 - w1;

		var rgba = {
			r: rgb2.r * w1 + rgb1.r * w2,
			g: rgb2.g * w1 + rgb1.g * w2,
			b: rgb2.b * w1 + rgb1.b * w2,
			a: rgb2.a * p  + rgb1.a * (1 - p)
		};

		return tinycolor(rgba);
	};


	// Readability Functions
	// ---------------------
	// <http://www.w3.org/TR/AERT#color-contrast>

	// `readability`
	// Analyze the 2 colors and returns an object with the following properties:
	//    `brightness`: difference in brightness between the two colors
	//    `color`: difference in color/hue between the two colors
	tinycolor.readability = function(color1, color2) {
		var c1 = tinycolor(color1);
		var c2 = tinycolor(color2);
		var rgb1 = c1.toRgb();
		var rgb2 = c2.toRgb();
		var brightnessA = c1.getBrightness();
		var brightnessB = c2.getBrightness();
		var colorDiff = (
			Math.max(rgb1.r, rgb2.r) - Math.min(rgb1.r, rgb2.r) +
			Math.max(rgb1.g, rgb2.g) - Math.min(rgb1.g, rgb2.g) +
			Math.max(rgb1.b, rgb2.b) - Math.min(rgb1.b, rgb2.b)
		);

		return {
			brightness: Math.abs(brightnessA - brightnessB),
			color: colorDiff
		};
	};

	// `readable`
	// http://www.w3.org/TR/AERT#color-contrast
	// Ensure that foreground and background color combinations provide sufficient contrast.
	// *Example*
	//    tinycolor.isReadable("#000", "#111") => false
	tinycolor.isReadable = function(color1, color2) {
		var readability = tinycolor.readability(color1, color2);
		return readability.brightness > 125 && readability.color > 500;
	};

	// `mostReadable`
	// Given a base color and a list of possible foreground or background
	// colors for that base, returns the most readable color.
	// *Example*
	//    tinycolor.mostReadable("#123", ["#fff", "#000"]) => "#000"
	tinycolor.mostReadable = function(baseColor, colorList) {
		var bestColor = null;
		var bestScore = 0;
		var bestIsReadable = false;
		for (var i=0; i < colorList.length; i++) {

			// We normalize both around the "acceptable" breaking point,
			// but rank brightness constrast higher than hue.

			var readability = tinycolor.readability(baseColor, colorList[i]);
			var readable = readability.brightness > 125 && readability.color > 500;
			var score = 3 * (readability.brightness / 125) + (readability.color / 500);

			if ((readable && ! bestIsReadable) ||
				(readable && bestIsReadable && score > bestScore) ||
				((! readable) && (! bestIsReadable) && score > bestScore)) {
				bestIsReadable = readable;
				bestScore = score;
				bestColor = tinycolor(colorList[i]);
			}
		}
		return bestColor;
	};


	// Big List of Colors
	// ------------------
	// <http://www.w3.org/TR/css3-color/#svg-color>
	var names = tinycolor.names = {
		aliceblue: "f0f8ff",
		antiquewhite: "faebd7",
		aqua: "0ff",
		aquamarine: "7fffd4",
		azure: "f0ffff",
		beige: "f5f5dc",
		bisque: "ffe4c4",
		black: "000",
		blanchedalmond: "ffebcd",
		blue: "00f",
		blueviolet: "8a2be2",
		brown: "a52a2a",
		burlywood: "deb887",
		burntsienna: "ea7e5d",
		cadetblue: "5f9ea0",
		chartreuse: "7fff00",
		chocolate: "d2691e",
		coral: "ff7f50",
		cornflowerblue: "6495ed",
		cornsilk: "fff8dc",
		crimson: "dc143c",
		cyan: "0ff",
		darkblue: "00008b",
		darkcyan: "008b8b",
		darkgoldenrod: "b8860b",
		darkgray: "a9a9a9",
		darkgreen: "006400",
		darkgrey: "a9a9a9",
		darkkhaki: "bdb76b",
		darkmagenta: "8b008b",
		darkolivegreen: "556b2f",
		darkorange: "ff8c00",
		darkorchid: "9932cc",
		darkred: "8b0000",
		darksalmon: "e9967a",
		darkseagreen: "8fbc8f",
		darkslateblue: "483d8b",
		darkslategray: "2f4f4f",
		darkslategrey: "2f4f4f",
		darkturquoise: "00ced1",
		darkviolet: "9400d3",
		deeppink: "ff1493",
		deepskyblue: "00bfff",
		dimgray: "696969",
		dimgrey: "696969",
		dodgerblue: "1e90ff",
		firebrick: "b22222",
		floralwhite: "fffaf0",
		forestgreen: "228b22",
		fuchsia: "f0f",
		gainsboro: "dcdcdc",
		ghostwhite: "f8f8ff",
		gold: "ffd700",
		goldenrod: "daa520",
		gray: "808080",
		green: "008000",
		greenyellow: "adff2f",
		grey: "808080",
		honeydew: "f0fff0",
		hotpink: "ff69b4",
		indianred: "cd5c5c",
		indigo: "4b0082",
		ivory: "fffff0",
		khaki: "f0e68c",
		lavender: "e6e6fa",
		lavenderblush: "fff0f5",
		lawngreen: "7cfc00",
		lemonchiffon: "fffacd",
		lightblue: "add8e6",
		lightcoral: "f08080",
		lightcyan: "e0ffff",
		lightgoldenrodyellow: "fafad2",
		lightgray: "d3d3d3",
		lightgreen: "90ee90",
		lightgrey: "d3d3d3",
		lightpink: "ffb6c1",
		lightsalmon: "ffa07a",
		lightseagreen: "20b2aa",
		lightskyblue: "87cefa",
		lightslategray: "789",
		lightslategrey: "789",
		lightsteelblue: "b0c4de",
		lightyellow: "ffffe0",
		lime: "0f0",
		limegreen: "32cd32",
		linen: "faf0e6",
		magenta: "f0f",
		maroon: "800000",
		mediumaquamarine: "66cdaa",
		mediumblue: "0000cd",
		mediumorchid: "ba55d3",
		mediumpurple: "9370db",
		mediumseagreen: "3cb371",
		mediumslateblue: "7b68ee",
		mediumspringgreen: "00fa9a",
		mediumturquoise: "48d1cc",
		mediumvioletred: "c71585",
		midnightblue: "191970",
		mintcream: "f5fffa",
		mistyrose: "ffe4e1",
		moccasin: "ffe4b5",
		navajowhite: "ffdead",
		navy: "000080",
		oldlace: "fdf5e6",
		olive: "808000",
		olivedrab: "6b8e23",
		orange: "ffa500",
		orangered: "ff4500",
		orchid: "da70d6",
		palegoldenrod: "eee8aa",
		palegreen: "98fb98",
		paleturquoise: "afeeee",
		palevioletred: "db7093",
		papayawhip: "ffefd5",
		peachpuff: "ffdab9",
		peru: "cd853f",
		pink: "ffc0cb",
		plum: "dda0dd",
		powderblue: "b0e0e6",
		purple: "800080",
		rebeccapurple: "663399",
		red: "f00",
		rosybrown: "bc8f8f",
		royalblue: "4169e1",
		saddlebrown: "8b4513",
		salmon: "fa8072",
		sandybrown: "f4a460",
		seagreen: "2e8b57",
		seashell: "fff5ee",
		sienna: "a0522d",
		silver: "c0c0c0",
		skyblue: "87ceeb",
		slateblue: "6a5acd",
		slategray: "708090",
		slategrey: "708090",
		snow: "fffafa",
		springgreen: "00ff7f",
		steelblue: "4682b4",
		tan: "d2b48c",
		teal: "008080",
		thistle: "d8bfd8",
		tomato: "ff6347",
		turquoise: "40e0d0",
		violet: "ee82ee",
		wheat: "f5deb3",
		white: "fff",
		whitesmoke: "f5f5f5",
		yellow: "ff0",
		yellowgreen: "9acd32"
	};

	// Make it easy to access colors via `hexNames[hex]`
	var hexNames = tinycolor.hexNames = flip(names);


	// Utilities
	// ---------

	// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
	function flip(o) {
		var flipped = { };
		for (var i in o) {
			if (o.hasOwnProperty(i)) {
				flipped[o[i]] = i;
			}
		}
		return flipped;
	}

	// Return a valid alpha value [0,1] with all invalid values being set to 1
	function boundAlpha(a) {
		a = parseFloat(a);

		if (isNaN(a) || a < 0 || a > 1) {
			a = 1;
		}

		return a;
	}

	// Take input from [0, n] and return it as [0, 1]
	function bound01(n, max) {
		if (isOnePointZero(n)) { n = "100%"; }

		var processPercent = isPercentage(n);
		n = mathMin(max, mathMax(0, parseFloat(n)));

		// Automatically convert percentage into number
		if (processPercent) {
			n = parseInt(n * max, 10) / 100;
		}

		// Handle floating point rounding errors
		if ((math.abs(n - max) < 0.000001)) {
			return 1;
		}

		// Convert into [0, 1] range if it isn't already
		return (n % max) / parseFloat(max);
	}

	// Force a number between 0 and 1
	function clamp01(val) {
		return mathMin(1, mathMax(0, val));
	}

	// Parse a base-16 hex value into a base-10 integer
	function parseIntFromHex(val) {
		return parseInt(val, 16);
	}

	// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	function isOnePointZero(n) {
		return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
	}

	// Check to see if string passed in is a percentage
	function isPercentage(n) {
		return typeof n === "string" && n.indexOf('%') != -1;
	}

	// Force a hex value to have 2 characters
	function pad2(c) {
		return c.length == 1 ? '0' + c : '' + c;
	}

	// Replace a decimal with it's percentage value
	function convertToPercentage(n) {
		if (n <= 1) {
			n = (n * 100) + "%";
		}

		return n;
	}

	// Converts a decimal to a hex value
	function convertDecimalToHex(d) {
		return Math.round(parseFloat(d) * 255).toString(16);
	}
	// Converts a hex value to a decimal
	function convertHexToDecimal(h) {
		return (parseIntFromHex(h) / 255);
	}

	var matchers = (function() {

		// <http://www.w3.org/TR/css3-values/#integers>
		var CSS_INTEGER = "[-\\+]?\\d+%?";

		// <http://www.w3.org/TR/css3-values/#number-value>
		var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

		// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
		var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

		// Actual matching.
		// Parentheses and commas are optional, but not required.
		// Whitespace can take the place of commas or opening paren
		var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
		var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

		return {
			rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
			rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
			hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
			hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
			hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
			hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
			hex3: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
			hex6: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
			hex8: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
		};
	})();

	// `stringInputToObject`
	// Permissive string parsing.  Take in a number of formats, and output an object
	// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	function stringInputToObject(color) {

		color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
		var named = false;
		if (names[color]) {
			color = names[color];
			named = true;
		}
		else if (color == 'transparent') {
			return { r: 0, g: 0, b: 0, a: 0, format: "name" };
		}

		// Try to match string input using regular expressions.
		// Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
		// Just return an object and let the conversion functions handle that.
		// This way the result will be the same whether the tinycolor is initialized with string or object.
		var match;
		if ((match = matchers.rgb.exec(color))) {
			return { r: match[1], g: match[2], b: match[3] };
		}
		if ((match = matchers.rgba.exec(color))) {
			return { r: match[1], g: match[2], b: match[3], a: match[4] };
		}
		if ((match = matchers.hsl.exec(color))) {
			return { h: match[1], s: match[2], l: match[3] };
		}
		if ((match = matchers.hsla.exec(color))) {
			return { h: match[1], s: match[2], l: match[3], a: match[4] };
		}
		if ((match = matchers.hsv.exec(color))) {
			return { h: match[1], s: match[2], v: match[3] };
		}
		if ((match = matchers.hsva.exec(color))) {
			return { h: match[1], s: match[2], v: match[3], a: match[4] };
		}
		if ((match = matchers.hex8.exec(color))) {
			return {
				a: convertHexToDecimal(match[1]),
				r: parseIntFromHex(match[2]),
				g: parseIntFromHex(match[3]),
				b: parseIntFromHex(match[4]),
				format: named ? "name" : "hex8"
			};
		}
		if ((match = matchers.hex6.exec(color))) {
			return {
				r: parseIntFromHex(match[1]),
				g: parseIntFromHex(match[2]),
				b: parseIntFromHex(match[3]),
				format: named ? "name" : "hex"
			};
		}
		if ((match = matchers.hex3.exec(color))) {
			return {
				r: parseIntFromHex(match[1] + '' + match[1]),
				g: parseIntFromHex(match[2] + '' + match[2]),
				b: parseIntFromHex(match[3] + '' + match[3]),
				format: named ? "name" : "hex"
			};
		}

		return false;
	}

	window.tinycolor = tinycolor;
	})();

	$(function () {
		if ($.fn.spectrum.load) {
			$.fn.spectrum.processNativeColorInputs();
		}
	});

});

/**!

 @license
 handlebars v4.0.11

Copyright (C) 2011-2017 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Handlebars=e():t.Handlebars=e()}(this,function(){return function(t){var e={};function r(s){if(e[s])return e[s].exports;var i=e[s]={exports:{},id:s,loaded:!1};return t[s].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}return r.m=t,r.c=e,r.p="",r(0)}([function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(2)),n=s(r(35)),a=r(36),o=r(41),c=s(r(42)),l=s(r(39)),h=s(r(34)),p=i.default.create;function u(){var t=p();return t.compile=function(e,r){return o.compile(e,r,t)},t.precompile=function(e,r){return o.precompile(e,r,t)},t.AST=n.default,t.Compiler=o.Compiler,t.JavaScriptCompiler=c.default,t.Parser=a.parser,t.parse=a.parse,t}var f=u();f.create=u,h.default(f),f.Visitor=l.default,f.default=f,e.default=f,t.exports=e.default},function(t,e){"use strict";e.default=function(t){return t&&t.__esModule?t:{default:t}},e.__esModule=!0},function(t,e,r){"use strict";var s=r(3).default,i=r(1).default;e.__esModule=!0;var n=s(r(4)),a=i(r(21)),o=i(r(6)),c=s(r(5)),l=s(r(22)),h=i(r(34));function p(){var t=new n.HandlebarsEnvironment;return c.extend(t,n),t.SafeString=a.default,t.Exception=o.default,t.Utils=c,t.escapeExpression=c.escapeExpression,t.VM=l,t.template=function(e){return l.template(e,t)},t}var u=p();u.create=p,h.default(u),u.default=u,e.default=u,t.exports=e.default},function(t,e){"use strict";e.default=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e},e.__esModule=!0},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.HandlebarsEnvironment=h;var i=r(5),n=s(r(6)),a=r(10),o=r(18),c=s(r(20));e.VERSION="4.0.11";e.COMPILER_REVISION=7;e.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};var l="[object Object]";function h(t,e,r){this.helpers=t||{},this.partials=e||{},this.decorators=r||{},a.registerDefaultHelpers(this),o.registerDefaultDecorators(this)}h.prototype={constructor:h,logger:c.default,log:c.default.log,registerHelper:function(t,e){if(i.toString.call(t)===l){if(e)throw new n.default("Arg not supported with multiple helpers");i.extend(this.helpers,t)}else this.helpers[t]=e},unregisterHelper:function(t){delete this.helpers[t]},registerPartial:function(t,e){if(i.toString.call(t)===l)i.extend(this.partials,t);else{if(void 0===e)throw new n.default('Attempting to register a partial called "'+t+'" as undefined');this.partials[t]=e}},unregisterPartial:function(t){delete this.partials[t]},registerDecorator:function(t,e){if(i.toString.call(t)===l){if(e)throw new n.default("Arg not supported with multiple decorators");i.extend(this.decorators,t)}else this.decorators[t]=e},unregisterDecorator:function(t){delete this.decorators[t]}};var p=c.default.log;e.log=p,e.createFrame=i.createFrame,e.logger=c.default},function(t,e){"use strict";e.__esModule=!0,e.extend=a,e.indexOf=function(t,e){for(var r=0,s=t.length;r<s;r++)if(t[r]===e)return r;return-1},e.escapeExpression=function(t){if("string"!=typeof t){if(t&&t.toHTML)return t.toHTML();if(null==t)return"";if(!t)return t+"";t=""+t}if(!i.test(t))return t;return t.replace(s,n)},e.isEmpty=function(t){return!t&&0!==t||!(!l(t)||0!==t.length)},e.createFrame=function(t){var e=a({},t);return e._parent=t,e},e.blockParams=function(t,e){return t.path=e,t},e.appendContextPath=function(t,e){return(t?t+".":"")+e};var r={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},s=/[&<>"'`=]/g,i=/[&<>"'`=]/;function n(t){return r[t]}function a(t){for(var e=1;e<arguments.length;e++)for(var r in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],r)&&(t[r]=arguments[e][r]);return t}var o=Object.prototype.toString;e.toString=o;var c=function(t){return"function"==typeof t};c(/x/)&&(e.isFunction=c=function(t){return"function"==typeof t&&"[object Function]"===o.call(t)}),e.isFunction=c;var l=Array.isArray||function(t){return!(!t||"object"!=typeof t)&&"[object Array]"===o.call(t)};e.isArray=l},function(t,e,r){"use strict";var s=r(7).default;e.__esModule=!0;var i=["description","fileName","lineNumber","message","name","number","stack"];function n(t,e){var r=e&&e.loc,a=void 0,o=void 0;r&&(t+=" - "+(a=r.start.line)+":"+(o=r.start.column));for(var c=Error.prototype.constructor.call(this,t),l=0;l<i.length;l++)this[i[l]]=c[i[l]];Error.captureStackTrace&&Error.captureStackTrace(this,n);try{r&&(this.lineNumber=a,s?Object.defineProperty(this,"column",{value:o,enumerable:!0}):this.column=o)}catch(t){}}n.prototype=new Error,e.default=n,t.exports=e.default},function(t,e,r){t.exports={default:r(8),__esModule:!0}},function(t,e,r){var s=r(9);t.exports=function(t,e,r){return s.setDesc(t,e,r)}},function(t,e){var r=Object;t.exports={create:r.create,getProto:r.getPrototypeOf,isEnum:{}.propertyIsEnumerable,getDesc:r.getOwnPropertyDescriptor,setDesc:r.defineProperty,setDescs:r.defineProperties,getKeys:r.keys,getNames:r.getOwnPropertyNames,getSymbols:r.getOwnPropertySymbols,each:[].forEach}},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.registerDefaultHelpers=function(t){i.default(t),n.default(t),a.default(t),o.default(t),c.default(t),l.default(t),h.default(t)};var i=s(r(11)),n=s(r(12)),a=s(r(13)),o=s(r(14)),c=s(r(15)),l=s(r(16)),h=s(r(17))},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5);e.default=function(t){t.registerHelper("blockHelperMissing",function(e,r){var i=r.inverse,n=r.fn;if(!0===e)return n(this);if(!1===e||null==e)return i(this);if(s.isArray(e))return e.length>0?(r.ids&&(r.ids=[r.name]),t.helpers.each(e,r)):i(this);if(r.data&&r.ids){var a=s.createFrame(r.data);a.contextPath=s.appendContextPath(r.data.contextPath,r.name),r={data:a}}return n(e,r)})},t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=r(5),n=s(r(6));e.default=function(t){t.registerHelper("each",function(t,e){if(!e)throw new n.default("Must pass iterator to #each");var r=e.fn,s=e.inverse,a=0,o="",c=void 0,l=void 0;function h(e,s,n){c&&(c.key=e,c.index=s,c.first=0===s,c.last=!!n,l&&(c.contextPath=l+e)),o+=r(t[e],{data:c,blockParams:i.blockParams([t[e],e],[l+e,null])})}if(e.data&&e.ids&&(l=i.appendContextPath(e.data.contextPath,e.ids[0])+"."),i.isFunction(t)&&(t=t.call(this)),e.data&&(c=i.createFrame(e.data)),t&&"object"==typeof t)if(i.isArray(t))for(var p=t.length;a<p;a++)a in t&&h(a,a,a===t.length-1);else{var u=void 0;for(var f in t)t.hasOwnProperty(f)&&(void 0!==u&&h(u,a-1),u=f,a++);void 0!==u&&h(u,a-1,!0)}return 0===a&&(o=s(this)),o})},t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(6));e.default=function(t){t.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new i.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5);e.default=function(t){t.registerHelper("if",function(t,e){return s.isFunction(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||s.isEmpty(t)?e.inverse(this):e.fn(this)}),t.registerHelper("unless",function(e,r){return t.helpers.if.call(this,e,{fn:r.inverse,inverse:r.fn,hash:r.hash})})},t.exports=e.default},function(t,e){"use strict";e.__esModule=!0,e.default=function(t){t.registerHelper("log",function(){for(var e=[void 0],r=arguments[arguments.length-1],s=0;s<arguments.length-1;s++)e.push(arguments[s]);var i=1;null!=r.hash.level?i=r.hash.level:r.data&&null!=r.data.level&&(i=r.data.level),e[0]=i,t.log.apply(t,e)})},t.exports=e.default},function(t,e){"use strict";e.__esModule=!0,e.default=function(t){t.registerHelper("lookup",function(t,e){return t&&t[e]})},t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5);e.default=function(t){t.registerHelper("with",function(t,e){s.isFunction(t)&&(t=t.call(this));var r=e.fn;if(s.isEmpty(t))return e.inverse(this);var i=e.data;return e.data&&e.ids&&((i=s.createFrame(e.data)).contextPath=s.appendContextPath(e.data.contextPath,e.ids[0])),r(t,{data:i,blockParams:s.blockParams([t],[i&&i.contextPath])})})},t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.registerDefaultDecorators=function(t){i.default(t)};var i=s(r(19))},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5);e.default=function(t){t.registerDecorator("inline",function(t,e,r,i){var n=t;return e.partials||(e.partials={},n=function(i,n){var a=r.partials;r.partials=s.extend({},a,e.partials);var o=t(i,n);return r.partials=a,o}),e.partials[i.args[0]]=i.fn,n})},t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5),i={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(t){if("string"==typeof t){var e=s.indexOf(i.methodMap,t.toLowerCase());t=e>=0?e:parseInt(t,10)}return t},log:function(t){if(t=i.lookupLevel(t),"undefined"!=typeof console&&i.lookupLevel(i.level)<=t){var e=i.methodMap[t];console[e]||(e="log");for(var r=arguments.length,s=Array(r>1?r-1:0),n=1;n<r;n++)s[n-1]=arguments[n];console[e].apply(console,s)}}};e.default=i,t.exports=e.default},function(t,e){"use strict";function r(t){this.string=t}e.__esModule=!0,r.prototype.toString=r.prototype.toHTML=function(){return""+this.string},e.default=r,t.exports=e.default},function(t,e,r){"use strict";var s=r(23).default,i=r(3).default,n=r(1).default;e.__esModule=!0,e.checkRevision=function(t){var e=t&&t[0]||1,r=c.COMPILER_REVISION;if(e!==r){if(e<r){var s=c.REVISION_CHANGES[r],i=c.REVISION_CHANGES[e];throw new o.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+s+") or downgrade your runtime to an older version ("+i+").")}throw new o.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}},e.template=function(t,e){if(!e)throw new o.default("No environment passed to template");if(!t||!t.main)throw new o.default("Unknown template object: "+typeof t);t.main.decorator=t.main_d,e.VM.checkRevision(t.compiler);var r={strict:function(t,e){if(!(e in t))throw new o.default('"'+e+'" not defined in '+t);return t[e]},lookup:function(t,e){for(var r=t.length,s=0;s<r;s++)if(t[s]&&null!=t[s][e])return t[s][e]},lambda:function(t,e){return"function"==typeof t?t.call(e):t},escapeExpression:a.escapeExpression,invokePartial:function(r,s,i){i.hash&&(s=a.extend({},s,i.hash),i.ids&&(i.ids[0]=!0));r=e.VM.resolvePartial.call(this,r,s,i);var n=e.VM.invokePartial.call(this,r,s,i);null==n&&e.compile&&(i.partials[i.name]=e.compile(r,t.compilerOptions,e),n=i.partials[i.name](s,i));{if(null!=n){if(i.indent){for(var c=n.split("\n"),l=0,h=c.length;l<h&&(c[l]||l+1!==h);l++)c[l]=i.indent+c[l];n=c.join("\n")}return n}throw new o.default("The partial "+i.name+" could not be compiled when running in runtime-only mode")}},fn:function(e){var r=t[e];return r.decorator=t[e+"_d"],r},programs:[],program:function(t,e,r,s,i){var n=this.programs[t],a=this.fn(t);return e||i||s||r?n=l(this,t,a,e,r,s,i):n||(n=this.programs[t]=l(this,t,a)),n},data:function(t,e){for(;t&&e--;)t=t._parent;return t},merge:function(t,e){var r=t||e;return t&&e&&t!==e&&(r=a.extend({},e,t)),r},nullContext:s({}),noop:e.VM.noop,compilerInfo:t.compiler};function i(e){var s=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],n=s.data;i._setup(s),!s.partial&&t.useData&&(n=function(t,e){e&&"root"in e||((e=e?c.createFrame(e):{}).root=t);return e}(e,n));var a=void 0,o=t.useBlockParams?[]:void 0;function l(e){return""+t.main(r,e,r.helpers,r.partials,n,o,a)}return t.useDepths&&(a=s.depths?e!=s.depths[0]?[e].concat(s.depths):s.depths:[e]),(l=p(t.main,l,r,s.depths||[],n,o))(e,s)}return i.isTop=!0,i._setup=function(s){s.partial?(r.helpers=s.helpers,r.partials=s.partials,r.decorators=s.decorators):(r.helpers=r.merge(s.helpers,e.helpers),t.usePartial&&(r.partials=r.merge(s.partials,e.partials)),(t.usePartial||t.useDecorators)&&(r.decorators=r.merge(s.decorators,e.decorators)))},i._child=function(e,s,i,n){if(t.useBlockParams&&!i)throw new o.default("must pass block params");if(t.useDepths&&!n)throw new o.default("must pass parent depths");return l(r,e,t[e],s,0,i,n)},i},e.wrapProgram=l,e.resolvePartial=function(t,e,r){t?t.call||r.name||(r.name=t,t=r.partials[t]):t="@partial-block"===r.name?r.data["partial-block"]:r.partials[r.name];return t},e.invokePartial=function(t,e,r){var s=r.data&&r.data["partial-block"];r.partial=!0,r.ids&&(r.data.contextPath=r.ids[0]||r.data.contextPath);var i=void 0;r.fn&&r.fn!==h&&function(){r.data=c.createFrame(r.data);var t=r.fn;i=r.data["partial-block"]=function(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return r.data=c.createFrame(r.data),r.data["partial-block"]=s,t(e,r)},t.partials&&(r.partials=a.extend({},r.partials,t.partials))}();void 0===t&&i&&(t=i);{if(void 0===t)throw new o.default("The partial "+r.name+" could not be found");if(t instanceof Function)return t(e,r)}},e.noop=h;var a=i(r(5)),o=n(r(6)),c=r(4);function l(t,e,r,s,i,n,a){function o(e){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],o=a;return!a||e==a[0]||e===t.nullContext&&null===a[0]||(o=[e].concat(a)),r(t,e,t.helpers,t.partials,i.data||s,n&&[i.blockParams].concat(n),o)}return(o=p(r,o,t,a,s,n)).program=e,o.depth=a?a.length:0,o.blockParams=i||0,o}function h(){return""}function p(t,e,r,s,i,n){if(t.decorator){var o={};e=t.decorator(e,o,r,s&&s[0],i,n,s),a.extend(e,o)}return e}},function(t,e,r){t.exports={default:r(24),__esModule:!0}},function(t,e,r){r(25),t.exports=r(30).Object.seal},function(t,e,r){var s=r(26);r(27)("seal",function(t){return function(e){return t&&s(e)?t(e):e}})},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,r){var s=r(28),i=r(30),n=r(33);t.exports=function(t,e){var r=(i.Object||{})[t]||Object[t],a={};a[t]=e(r),s(s.S+s.F*n(function(){r(1)}),"Object",a)}},function(t,e,r){var s=r(29),i=r(30),n=r(31),a="prototype",o=function(t,e,r){var c,l,h,p=t&o.F,u=t&o.G,f=t&o.S,d=t&o.P,m=t&o.B,g=t&o.W,v=u?i:i[e]||(i[e]={}),y=u?s:f?s[e]:(s[e]||{})[a];for(c in u&&(r=e),r)(l=!p&&y&&c in y)&&c in v||(h=l?y[c]:r[c],v[c]=u&&"function"!=typeof y[c]?r[c]:m&&l?n(h,s):g&&y[c]==h?function(t){var e=function(e){return this instanceof t?new t(e):t(e)};return e[a]=t[a],e}(h):d&&"function"==typeof h?n(Function.call,h):h,d&&((v[a]||(v[a]={}))[c]=h))};o.F=1,o.G=2,o.S=4,o.P=8,o.B=16,o.W=32,t.exports=o},function(t,e){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e){var r=t.exports={version:"1.2.6"};"number"==typeof __e&&(__e=r)},function(t,e,r){var s=r(32);t.exports=function(t,e,r){if(s(t),void 0===e)return t;switch(r){case 1:return function(r){return t.call(e,r)};case 2:return function(r,s){return t.call(e,r,s)};case 3:return function(r,s,i){return t.call(e,r,s,i)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){(function(r){"use strict";e.__esModule=!0,e.default=function(t){var e=void 0!==r?r:window,s=e.Handlebars;t.noConflict=function(){return e.Handlebars===t&&(e.Handlebars=s),t}},t.exports=e.default}).call(e,function(){return this}())},function(t,e){"use strict";e.__esModule=!0;var r={helpers:{helperExpression:function(t){return"SubExpression"===t.type||("MustacheStatement"===t.type||"BlockStatement"===t.type)&&!!(t.params&&t.params.length||t.hash)},scopedId:function(t){return/^\.|this\b/.test(t.original)},simpleId:function(t){return 1===t.parts.length&&!r.helpers.scopedId(t)&&!t.depth}}};e.default=r,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default,i=r(3).default;e.__esModule=!0,e.parse=function(t,e){if("Program"===t.type)return t;return n.default.yy=l,l.locInfo=function(t){return new l.SourceLocation(e&&e.srcName,t)},new a.default(e).accept(n.default.parse(t))};var n=s(r(37)),a=s(r(38)),o=i(r(40)),c=r(5);e.parser=n.default;var l={};c.extend(l,o)},function(t,e){"use strict";e.__esModule=!0;var r=function(){var t={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition_plus0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,mustache_repetition0:49,mustache_option0:50,OPEN_UNESCAPED:51,mustache_repetition1:52,mustache_option1:53,CLOSE_UNESCAPED:54,OPEN_PARTIAL:55,partialName:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,param:63,sexpr:64,OPEN_SEXPR:65,sexpr_repetition0:66,sexpr_option0:67,CLOSE_SEXPR:68,hash:69,hash_repetition_plus0:70,hashSegment:71,ID:72,EQUALS:73,blockParams:74,OPEN_BLOCK_PARAMS:75,blockParams_repetition_plus0:76,CLOSE_BLOCK_PARAMS:77,path:78,dataName:79,STRING:80,NUMBER:81,BOOLEAN:82,UNDEFINED:83,NULL:84,DATA:85,pathSegments:86,SEP:87,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",51:"OPEN_UNESCAPED",54:"CLOSE_UNESCAPED",55:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",65:"OPEN_SEXPR",68:"CLOSE_SEXPR",72:"ID",73:"EQUALS",75:"OPEN_BLOCK_PARAMS",77:"CLOSE_BLOCK_PARAMS",80:"STRING",81:"NUMBER",82:"BOOLEAN",83:"UNDEFINED",84:"NULL",85:"DATA",87:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[63,1],[63,1],[64,5],[69,1],[71,3],[74,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[56,1],[56,1],[79,2],[78,1],[86,3],[86,1],[6,0],[6,2],[17,1],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[49,0],[49,2],[50,0],[50,1],[52,0],[52,2],[53,0],[53,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[66,0],[66,2],[67,0],[67,1],[70,1],[70,2],[76,1],[76,2]],performAction:function(t,e,r,s,i,n,a){var o=n.length-1;switch(i){case 1:return n[o-1];case 2:this.$=s.prepareProgram(n[o]);break;case 3:case 4:case 5:case 6:case 7:case 8:this.$=n[o];break;case 9:this.$={type:"CommentStatement",value:s.stripComment(n[o]),strip:s.stripFlags(n[o],n[o]),loc:s.locInfo(this._$)};break;case 10:this.$={type:"ContentStatement",original:n[o],value:n[o],loc:s.locInfo(this._$)};break;case 11:this.$=s.prepareRawBlock(n[o-2],n[o-1],n[o],this._$);break;case 12:this.$={path:n[o-3],params:n[o-2],hash:n[o-1]};break;case 13:this.$=s.prepareBlock(n[o-3],n[o-2],n[o-1],n[o],!1,this._$);break;case 14:this.$=s.prepareBlock(n[o-3],n[o-2],n[o-1],n[o],!0,this._$);break;case 15:this.$={open:n[o-5],path:n[o-4],params:n[o-3],hash:n[o-2],blockParams:n[o-1],strip:s.stripFlags(n[o-5],n[o])};break;case 16:case 17:this.$={path:n[o-4],params:n[o-3],hash:n[o-2],blockParams:n[o-1],strip:s.stripFlags(n[o-5],n[o])};break;case 18:this.$={strip:s.stripFlags(n[o-1],n[o-1]),program:n[o]};break;case 19:var c=s.prepareBlock(n[o-2],n[o-1],n[o],n[o],!1,this._$),l=s.prepareProgram([c],n[o-1].loc);l.chained=!0,this.$={strip:n[o-2].strip,program:l,chain:!0};break;case 20:this.$=n[o];break;case 21:this.$={path:n[o-1],strip:s.stripFlags(n[o-2],n[o])};break;case 22:case 23:this.$=s.prepareMustache(n[o-3],n[o-2],n[o-1],n[o-4],s.stripFlags(n[o-4],n[o]),this._$);break;case 24:this.$={type:"PartialStatement",name:n[o-3],params:n[o-2],hash:n[o-1],indent:"",strip:s.stripFlags(n[o-4],n[o]),loc:s.locInfo(this._$)};break;case 25:this.$=s.preparePartialBlock(n[o-2],n[o-1],n[o],this._$);break;case 26:this.$={path:n[o-3],params:n[o-2],hash:n[o-1],strip:s.stripFlags(n[o-4],n[o])};break;case 27:case 28:this.$=n[o];break;case 29:this.$={type:"SubExpression",path:n[o-3],params:n[o-2],hash:n[o-1],loc:s.locInfo(this._$)};break;case 30:this.$={type:"Hash",pairs:n[o],loc:s.locInfo(this._$)};break;case 31:this.$={type:"HashPair",key:s.id(n[o-2]),value:n[o],loc:s.locInfo(this._$)};break;case 32:this.$=s.id(n[o-1]);break;case 33:case 34:this.$=n[o];break;case 35:this.$={type:"StringLiteral",value:n[o],original:n[o],loc:s.locInfo(this._$)};break;case 36:this.$={type:"NumberLiteral",value:Number(n[o]),original:Number(n[o]),loc:s.locInfo(this._$)};break;case 37:this.$={type:"BooleanLiteral",value:"true"===n[o],original:"true"===n[o],loc:s.locInfo(this._$)};break;case 38:this.$={type:"UndefinedLiteral",original:void 0,value:void 0,loc:s.locInfo(this._$)};break;case 39:this.$={type:"NullLiteral",original:null,value:null,loc:s.locInfo(this._$)};break;case 40:case 41:this.$=n[o];break;case 42:this.$=s.preparePath(!0,n[o],this._$);break;case 43:this.$=s.preparePath(!1,n[o],this._$);break;case 44:n[o-2].push({part:s.id(n[o]),original:n[o],separator:n[o-1]}),this.$=n[o-2];break;case 45:this.$=[{part:s.id(n[o]),original:n[o]}];break;case 46:this.$=[];break;case 47:n[o-1].push(n[o]);break;case 48:this.$=[n[o]];break;case 49:n[o-1].push(n[o]);break;case 50:this.$=[];break;case 51:n[o-1].push(n[o]);break;case 58:this.$=[];break;case 59:n[o-1].push(n[o]);break;case 64:this.$=[];break;case 65:n[o-1].push(n[o]);break;case 70:this.$=[];break;case 71:n[o-1].push(n[o]);break;case 78:this.$=[];break;case 79:n[o-1].push(n[o]);break;case 82:this.$=[];break;case 83:n[o-1].push(n[o]);break;case 86:this.$=[];break;case 87:n[o-1].push(n[o]);break;case 90:this.$=[];break;case 91:n[o-1].push(n[o]);break;case 94:this.$=[];break;case 95:n[o-1].push(n[o]);break;case 98:this.$=[n[o]];break;case 99:n[o-1].push(n[o]);break;case 100:this.$=[n[o]];break;case 101:n[o-1].push(n[o])}},table:[{3:1,4:2,5:[2,46],6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:10,13:11,14:[1,12],15:[1,20],16:17,19:[1,23],24:15,27:16,29:[1,21],34:[1,22],39:[2,2],44:[2,2],47:[2,2],48:[1,13],51:[1,14],55:[1,18],59:19,60:[1,24]},{1:[2,1]},{5:[2,47],14:[2,47],15:[2,47],19:[2,47],29:[2,47],34:[2,47],39:[2,47],44:[2,47],47:[2,47],48:[2,47],51:[2,47],55:[2,47],60:[2,47]},{5:[2,3],14:[2,3],15:[2,3],19:[2,3],29:[2,3],34:[2,3],39:[2,3],44:[2,3],47:[2,3],48:[2,3],51:[2,3],55:[2,3],60:[2,3]},{5:[2,4],14:[2,4],15:[2,4],19:[2,4],29:[2,4],34:[2,4],39:[2,4],44:[2,4],47:[2,4],48:[2,4],51:[2,4],55:[2,4],60:[2,4]},{5:[2,5],14:[2,5],15:[2,5],19:[2,5],29:[2,5],34:[2,5],39:[2,5],44:[2,5],47:[2,5],48:[2,5],51:[2,5],55:[2,5],60:[2,5]},{5:[2,6],14:[2,6],15:[2,6],19:[2,6],29:[2,6],34:[2,6],39:[2,6],44:[2,6],47:[2,6],48:[2,6],51:[2,6],55:[2,6],60:[2,6]},{5:[2,7],14:[2,7],15:[2,7],19:[2,7],29:[2,7],34:[2,7],39:[2,7],44:[2,7],47:[2,7],48:[2,7],51:[2,7],55:[2,7],60:[2,7]},{5:[2,8],14:[2,8],15:[2,8],19:[2,8],29:[2,8],34:[2,8],39:[2,8],44:[2,8],47:[2,8],48:[2,8],51:[2,8],55:[2,8],60:[2,8]},{5:[2,9],14:[2,9],15:[2,9],19:[2,9],29:[2,9],34:[2,9],39:[2,9],44:[2,9],47:[2,9],48:[2,9],51:[2,9],55:[2,9],60:[2,9]},{20:25,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:36,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:37,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{4:38,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{13:40,15:[1,20],17:39},{20:42,56:41,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:45,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{5:[2,10],14:[2,10],15:[2,10],18:[2,10],19:[2,10],29:[2,10],34:[2,10],39:[2,10],44:[2,10],47:[2,10],48:[2,10],51:[2,10],55:[2,10],60:[2,10]},{20:46,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:47,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:48,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:42,56:49,64:43,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[2,78],49:50,65:[2,78],72:[2,78],80:[2,78],81:[2,78],82:[2,78],83:[2,78],84:[2,78],85:[2,78]},{23:[2,33],33:[2,33],54:[2,33],65:[2,33],68:[2,33],72:[2,33],75:[2,33],80:[2,33],81:[2,33],82:[2,33],83:[2,33],84:[2,33],85:[2,33]},{23:[2,34],33:[2,34],54:[2,34],65:[2,34],68:[2,34],72:[2,34],75:[2,34],80:[2,34],81:[2,34],82:[2,34],83:[2,34],84:[2,34],85:[2,34]},{23:[2,35],33:[2,35],54:[2,35],65:[2,35],68:[2,35],72:[2,35],75:[2,35],80:[2,35],81:[2,35],82:[2,35],83:[2,35],84:[2,35],85:[2,35]},{23:[2,36],33:[2,36],54:[2,36],65:[2,36],68:[2,36],72:[2,36],75:[2,36],80:[2,36],81:[2,36],82:[2,36],83:[2,36],84:[2,36],85:[2,36]},{23:[2,37],33:[2,37],54:[2,37],65:[2,37],68:[2,37],72:[2,37],75:[2,37],80:[2,37],81:[2,37],82:[2,37],83:[2,37],84:[2,37],85:[2,37]},{23:[2,38],33:[2,38],54:[2,38],65:[2,38],68:[2,38],72:[2,38],75:[2,38],80:[2,38],81:[2,38],82:[2,38],83:[2,38],84:[2,38],85:[2,38]},{23:[2,39],33:[2,39],54:[2,39],65:[2,39],68:[2,39],72:[2,39],75:[2,39],80:[2,39],81:[2,39],82:[2,39],83:[2,39],84:[2,39],85:[2,39]},{23:[2,43],33:[2,43],54:[2,43],65:[2,43],68:[2,43],72:[2,43],75:[2,43],80:[2,43],81:[2,43],82:[2,43],83:[2,43],84:[2,43],85:[2,43],87:[1,51]},{72:[1,35],86:52},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{52:53,54:[2,82],65:[2,82],72:[2,82],80:[2,82],81:[2,82],82:[2,82],83:[2,82],84:[2,82],85:[2,82]},{25:54,38:56,39:[1,58],43:57,44:[1,59],45:55,47:[2,54]},{28:60,43:61,44:[1,59],47:[2,56]},{13:63,15:[1,20],18:[1,62]},{15:[2,48],18:[2,48]},{33:[2,86],57:64,65:[2,86],72:[2,86],80:[2,86],81:[2,86],82:[2,86],83:[2,86],84:[2,86],85:[2,86]},{33:[2,40],65:[2,40],72:[2,40],80:[2,40],81:[2,40],82:[2,40],83:[2,40],84:[2,40],85:[2,40]},{33:[2,41],65:[2,41],72:[2,41],80:[2,41],81:[2,41],82:[2,41],83:[2,41],84:[2,41],85:[2,41]},{20:65,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:66,47:[1,67]},{30:68,33:[2,58],65:[2,58],72:[2,58],75:[2,58],80:[2,58],81:[2,58],82:[2,58],83:[2,58],84:[2,58],85:[2,58]},{33:[2,64],35:69,65:[2,64],72:[2,64],75:[2,64],80:[2,64],81:[2,64],82:[2,64],83:[2,64],84:[2,64],85:[2,64]},{21:70,23:[2,50],65:[2,50],72:[2,50],80:[2,50],81:[2,50],82:[2,50],83:[2,50],84:[2,50],85:[2,50]},{33:[2,90],61:71,65:[2,90],72:[2,90],80:[2,90],81:[2,90],82:[2,90],83:[2,90],84:[2,90],85:[2,90]},{20:75,33:[2,80],50:72,63:73,64:76,65:[1,44],69:74,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{72:[1,80]},{23:[2,42],33:[2,42],54:[2,42],65:[2,42],68:[2,42],72:[2,42],75:[2,42],80:[2,42],81:[2,42],82:[2,42],83:[2,42],84:[2,42],85:[2,42],87:[1,51]},{20:75,53:81,54:[2,84],63:82,64:76,65:[1,44],69:83,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{26:84,47:[1,67]},{47:[2,55]},{4:85,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],39:[2,46],44:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{47:[2,20]},{20:86,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{4:87,6:3,14:[2,46],15:[2,46],19:[2,46],29:[2,46],34:[2,46],47:[2,46],48:[2,46],51:[2,46],55:[2,46],60:[2,46]},{26:88,47:[1,67]},{47:[2,57]},{5:[2,11],14:[2,11],15:[2,11],19:[2,11],29:[2,11],34:[2,11],39:[2,11],44:[2,11],47:[2,11],48:[2,11],51:[2,11],55:[2,11],60:[2,11]},{15:[2,49],18:[2,49]},{20:75,33:[2,88],58:89,63:90,64:76,65:[1,44],69:91,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{65:[2,94],66:92,68:[2,94],72:[2,94],80:[2,94],81:[2,94],82:[2,94],83:[2,94],84:[2,94],85:[2,94]},{5:[2,25],14:[2,25],15:[2,25],19:[2,25],29:[2,25],34:[2,25],39:[2,25],44:[2,25],47:[2,25],48:[2,25],51:[2,25],55:[2,25],60:[2,25]},{20:93,72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,31:94,33:[2,60],63:95,64:76,65:[1,44],69:96,70:77,71:78,72:[1,79],75:[2,60],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,66],36:97,63:98,64:76,65:[1,44],69:99,70:77,71:78,72:[1,79],75:[2,66],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,22:100,23:[2,52],63:101,64:76,65:[1,44],69:102,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{20:75,33:[2,92],62:103,63:104,64:76,65:[1,44],69:105,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,106]},{33:[2,79],65:[2,79],72:[2,79],80:[2,79],81:[2,79],82:[2,79],83:[2,79],84:[2,79],85:[2,79]},{33:[2,81]},{23:[2,27],33:[2,27],54:[2,27],65:[2,27],68:[2,27],72:[2,27],75:[2,27],80:[2,27],81:[2,27],82:[2,27],83:[2,27],84:[2,27],85:[2,27]},{23:[2,28],33:[2,28],54:[2,28],65:[2,28],68:[2,28],72:[2,28],75:[2,28],80:[2,28],81:[2,28],82:[2,28],83:[2,28],84:[2,28],85:[2,28]},{23:[2,30],33:[2,30],54:[2,30],68:[2,30],71:107,72:[1,108],75:[2,30]},{23:[2,98],33:[2,98],54:[2,98],68:[2,98],72:[2,98],75:[2,98]},{23:[2,45],33:[2,45],54:[2,45],65:[2,45],68:[2,45],72:[2,45],73:[1,109],75:[2,45],80:[2,45],81:[2,45],82:[2,45],83:[2,45],84:[2,45],85:[2,45],87:[2,45]},{23:[2,44],33:[2,44],54:[2,44],65:[2,44],68:[2,44],72:[2,44],75:[2,44],80:[2,44],81:[2,44],82:[2,44],83:[2,44],84:[2,44],85:[2,44],87:[2,44]},{54:[1,110]},{54:[2,83],65:[2,83],72:[2,83],80:[2,83],81:[2,83],82:[2,83],83:[2,83],84:[2,83],85:[2,83]},{54:[2,85]},{5:[2,13],14:[2,13],15:[2,13],19:[2,13],29:[2,13],34:[2,13],39:[2,13],44:[2,13],47:[2,13],48:[2,13],51:[2,13],55:[2,13],60:[2,13]},{38:56,39:[1,58],43:57,44:[1,59],45:112,46:111,47:[2,76]},{33:[2,70],40:113,65:[2,70],72:[2,70],75:[2,70],80:[2,70],81:[2,70],82:[2,70],83:[2,70],84:[2,70],85:[2,70]},{47:[2,18]},{5:[2,14],14:[2,14],15:[2,14],19:[2,14],29:[2,14],34:[2,14],39:[2,14],44:[2,14],47:[2,14],48:[2,14],51:[2,14],55:[2,14],60:[2,14]},{33:[1,114]},{33:[2,87],65:[2,87],72:[2,87],80:[2,87],81:[2,87],82:[2,87],83:[2,87],84:[2,87],85:[2,87]},{33:[2,89]},{20:75,63:116,64:76,65:[1,44],67:115,68:[2,96],69:117,70:77,71:78,72:[1,79],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{33:[1,118]},{32:119,33:[2,62],74:120,75:[1,121]},{33:[2,59],65:[2,59],72:[2,59],75:[2,59],80:[2,59],81:[2,59],82:[2,59],83:[2,59],84:[2,59],85:[2,59]},{33:[2,61],75:[2,61]},{33:[2,68],37:122,74:123,75:[1,121]},{33:[2,65],65:[2,65],72:[2,65],75:[2,65],80:[2,65],81:[2,65],82:[2,65],83:[2,65],84:[2,65],85:[2,65]},{33:[2,67],75:[2,67]},{23:[1,124]},{23:[2,51],65:[2,51],72:[2,51],80:[2,51],81:[2,51],82:[2,51],83:[2,51],84:[2,51],85:[2,51]},{23:[2,53]},{33:[1,125]},{33:[2,91],65:[2,91],72:[2,91],80:[2,91],81:[2,91],82:[2,91],83:[2,91],84:[2,91],85:[2,91]},{33:[2,93]},{5:[2,22],14:[2,22],15:[2,22],19:[2,22],29:[2,22],34:[2,22],39:[2,22],44:[2,22],47:[2,22],48:[2,22],51:[2,22],55:[2,22],60:[2,22]},{23:[2,99],33:[2,99],54:[2,99],68:[2,99],72:[2,99],75:[2,99]},{73:[1,109]},{20:75,63:126,64:76,65:[1,44],72:[1,35],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,23],14:[2,23],15:[2,23],19:[2,23],29:[2,23],34:[2,23],39:[2,23],44:[2,23],47:[2,23],48:[2,23],51:[2,23],55:[2,23],60:[2,23]},{47:[2,19]},{47:[2,77]},{20:75,33:[2,72],41:127,63:128,64:76,65:[1,44],69:129,70:77,71:78,72:[1,79],75:[2,72],78:26,79:27,80:[1,28],81:[1,29],82:[1,30],83:[1,31],84:[1,32],85:[1,34],86:33},{5:[2,24],14:[2,24],15:[2,24],19:[2,24],29:[2,24],34:[2,24],39:[2,24],44:[2,24],47:[2,24],48:[2,24],51:[2,24],55:[2,24],60:[2,24]},{68:[1,130]},{65:[2,95],68:[2,95],72:[2,95],80:[2,95],81:[2,95],82:[2,95],83:[2,95],84:[2,95],85:[2,95]},{68:[2,97]},{5:[2,21],14:[2,21],15:[2,21],19:[2,21],29:[2,21],34:[2,21],39:[2,21],44:[2,21],47:[2,21],48:[2,21],51:[2,21],55:[2,21],60:[2,21]},{33:[1,131]},{33:[2,63]},{72:[1,133],76:132},{33:[1,134]},{33:[2,69]},{15:[2,12]},{14:[2,26],15:[2,26],19:[2,26],29:[2,26],34:[2,26],47:[2,26],48:[2,26],51:[2,26],55:[2,26],60:[2,26]},{23:[2,31],33:[2,31],54:[2,31],68:[2,31],72:[2,31],75:[2,31]},{33:[2,74],42:135,74:136,75:[1,121]},{33:[2,71],65:[2,71],72:[2,71],75:[2,71],80:[2,71],81:[2,71],82:[2,71],83:[2,71],84:[2,71],85:[2,71]},{33:[2,73],75:[2,73]},{23:[2,29],33:[2,29],54:[2,29],65:[2,29],68:[2,29],72:[2,29],75:[2,29],80:[2,29],81:[2,29],82:[2,29],83:[2,29],84:[2,29],85:[2,29]},{14:[2,15],15:[2,15],19:[2,15],29:[2,15],34:[2,15],39:[2,15],44:[2,15],47:[2,15],48:[2,15],51:[2,15],55:[2,15],60:[2,15]},{72:[1,138],77:[1,137]},{72:[2,100],77:[2,100]},{14:[2,16],15:[2,16],19:[2,16],29:[2,16],34:[2,16],44:[2,16],47:[2,16],48:[2,16],51:[2,16],55:[2,16],60:[2,16]},{33:[1,139]},{33:[2,75]},{33:[2,32]},{72:[2,101],77:[2,101]},{14:[2,17],15:[2,17],19:[2,17],29:[2,17],34:[2,17],39:[2,17],44:[2,17],47:[2,17],48:[2,17],51:[2,17],55:[2,17],60:[2,17]}],defaultActions:{4:[2,1],55:[2,55],57:[2,20],61:[2,57],74:[2,81],83:[2,85],87:[2,18],91:[2,89],102:[2,53],105:[2,93],111:[2,19],112:[2,77],117:[2,97],120:[2,63],123:[2,69],124:[2,12],136:[2,75],137:[2,32]},parseError:function(t,e){throw new Error(t)},parse:function(t){var e=this,r=[0],s=[null],i=[],n=this.table,a="",o=0,c=0,l=0;this.lexer.setInput(t),this.lexer.yy=this.yy,this.yy.lexer=this.lexer,this.yy.parser=this,void 0===this.lexer.yylloc&&(this.lexer.yylloc={});var h=this.lexer.yylloc;i.push(h);var p=this.lexer.options&&this.lexer.options.ranges;"function"==typeof this.yy.parseError&&(this.parseError=this.yy.parseError);for(var u,f,d,m,g,v,y,k,S,b,_={};;){if(d=r[r.length-1],this.defaultActions[d]?m=this.defaultActions[d]:(null==u&&(b=void 0,"number"!=typeof(b=e.lexer.lex()||1)&&(b=e.symbols_[b]||b),u=b),m=n[d]&&n[d][u]),void 0===m||!m.length||!m[0]){var P="";if(!l){for(v in S=[],n[d])this.terminals_[v]&&v>2&&S.push("'"+this.terminals_[v]+"'");P=this.lexer.showPosition?"Parse error on line "+(o+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+S.join(", ")+", got '"+(this.terminals_[u]||u)+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==u?"end of input":"'"+(this.terminals_[u]||u)+"'"),this.parseError(P,{text:this.lexer.match,token:this.terminals_[u]||u,line:this.lexer.yylineno,loc:h,expected:S})}}if(m[0]instanceof Array&&m.length>1)throw new Error("Parse Error: multiple actions possible at state: "+d+", token: "+u);switch(m[0]){case 1:r.push(u),s.push(this.lexer.yytext),i.push(this.lexer.yylloc),r.push(m[1]),u=null,f?(u=f,f=null):(c=this.lexer.yyleng,a=this.lexer.yytext,o=this.lexer.yylineno,h=this.lexer.yylloc,l>0&&l--);break;case 2:if(y=this.productions_[m[1]][1],_.$=s[s.length-y],_._$={first_line:i[i.length-(y||1)].first_line,last_line:i[i.length-1].last_line,first_column:i[i.length-(y||1)].first_column,last_column:i[i.length-1].last_column},p&&(_._$.range=[i[i.length-(y||1)].range[0],i[i.length-1].range[1]]),void 0!==(g=this.performAction.call(_,a,c,o,this.yy,m[1],s,i)))return g;y&&(r=r.slice(0,-1*y*2),s=s.slice(0,-1*y),i=i.slice(0,-1*y)),r.push(this.productions_[m[1]][0]),s.push(_.$),i.push(_._$),k=n[r[r.length-2]][r[r.length-1]],r.push(k);break;case 3:return!0}}return!0}},e={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t){return this._input=t,this._more=this._less=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,r=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e-1),this.offset-=e;var s=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),r.length-1&&(this.yylineno-=r.length-1);var i=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:r?(r.length===s.length?this.yylloc.first_column:0)+s[s.length-r.length].length-r[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-e]),this},more:function(){return this._more=!0,this},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},next:function(){if(this.done)return this.EOF;var t,e,r,s,i;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var n=this._currentRules(),a=0;a<n.length&&(!(r=this._input.match(this.rules[n[a]]))||e&&!(r[0].length>e[0].length)||(e=r,s=a,this.options.flex));a++);return e?((i=e[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],t=this.performAction.call(this,this.yy,this,n[s],this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),t||void 0):""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return void 0!==t?t:this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.pop()},_currentRules:function(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules},topState:function(){return this.conditionStack[this.conditionStack.length-2]},pushState:function(t){this.begin(t)},options:{},performAction:function(t,e,r,s){function i(t,r){return e.yytext=e.yytext.substr(t,e.yyleng-r)}switch(r){case 0:if("\\\\"===e.yytext.slice(-2)?(i(0,1),this.begin("mu")):"\\"===e.yytext.slice(-1)?(i(0,1),this.begin("emu")):this.begin("mu"),e.yytext)return 15;break;case 1:return 15;case 2:return this.popState(),15;case 3:return this.begin("raw"),15;case 4:return this.popState(),"raw"===this.conditionStack[this.conditionStack.length-1]?15:(e.yytext=e.yytext.substr(5,e.yyleng-9),"END_RAW_BLOCK");case 5:return 15;case 6:return this.popState(),14;case 7:return 65;case 8:return 68;case 9:return 19;case 10:return this.popState(),this.begin("raw"),23;case 11:return 55;case 12:return 60;case 13:return 29;case 14:return 47;case 15:case 16:return this.popState(),44;case 17:return 34;case 18:return 39;case 19:return 51;case 20:return 48;case 21:this.unput(e.yytext),this.popState(),this.begin("com");break;case 22:return this.popState(),14;case 23:return 48;case 24:return 73;case 25:case 26:return 72;case 27:return 87;case 28:break;case 29:return this.popState(),54;case 30:return this.popState(),33;case 31:return e.yytext=i(1,2).replace(/\\"/g,'"'),80;case 32:return e.yytext=i(1,2).replace(/\\'/g,"'"),80;case 33:return 85;case 34:case 35:return 82;case 36:return 83;case 37:return 84;case 38:return 81;case 39:return 75;case 40:return 77;case 41:return 72;case 42:return e.yytext=e.yytext.replace(/\\([\\\]])/g,"$1"),72;case 43:return"INVALID";case 44:return 5}},rules:[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^\/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/],conditions:{mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[6],inclusive:!1},raw:{rules:[3,4,5],inclusive:!1},INITIAL:{rules:[0,1,44],inclusive:!0}}};function r(){this.yy={}}return t.lexer=e,r.prototype=t,t.Parser=r,new r}();e.default=r,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(39));function n(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.options=t}function a(t,e,r){void 0===e&&(e=t.length);var s=t[e-1],i=t[e-2];return s?"ContentStatement"===s.type?(i||!r?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(s.original):void 0:r}function o(t,e,r){void 0===e&&(e=-1);var s=t[e+1],i=t[e+2];return s?"ContentStatement"===s.type?(i||!r?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(s.original):void 0:r}function c(t,e,r){var s=t[null==e?0:e+1];if(s&&"ContentStatement"===s.type&&(r||!s.rightStripped)){var i=s.value;s.value=s.value.replace(r?/^\s+/:/^[ \t]*\r?\n?/,""),s.rightStripped=s.value!==i}}function l(t,e,r){var s=t[null==e?t.length-1:e-1];if(s&&"ContentStatement"===s.type&&(r||!s.leftStripped)){var i=s.value;return s.value=s.value.replace(r?/\s+$/:/[ \t]+$/,""),s.leftStripped=s.value!==i,s.leftStripped}}n.prototype=new i.default,n.prototype.Program=function(t){var e=!this.options.ignoreStandalone,r=!this.isRootSeen;this.isRootSeen=!0;for(var s=t.body,i=0,n=s.length;i<n;i++){var h=s[i],p=this.accept(h);if(p){var u=a(s,i,r),f=o(s,i,r),d=p.openStandalone&&u,m=p.closeStandalone&&f,g=p.inlineStandalone&&u&&f;p.close&&c(s,i,!0),p.open&&l(s,i,!0),e&&g&&(c(s,i),l(s,i)&&"PartialStatement"===h.type&&(h.indent=/([ \t]+$)/.exec(s[i-1].original)[1])),e&&d&&(c((h.program||h.inverse).body),l(s,i)),e&&m&&(c(s,i),l((h.inverse||h.program).body))}}return t},n.prototype.BlockStatement=n.prototype.DecoratorBlock=n.prototype.PartialBlockStatement=function(t){this.accept(t.program),this.accept(t.inverse);var e=t.program||t.inverse,r=t.program&&t.inverse,s=r,i=r;if(r&&r.chained)for(s=r.body[0].program;i.chained;)i=i.body[i.body.length-1].program;var n={open:t.openStrip.open,close:t.closeStrip.close,openStandalone:o(e.body),closeStandalone:a((s||e).body)};if(t.openStrip.close&&c(e.body,null,!0),r){var h=t.inverseStrip;h.open&&l(e.body,null,!0),h.close&&c(s.body,null,!0),t.closeStrip.open&&l(i.body,null,!0),!this.options.ignoreStandalone&&a(e.body)&&o(s.body)&&(l(e.body),c(s.body))}else t.closeStrip.open&&l(e.body,null,!0);return n},n.prototype.Decorator=n.prototype.MustacheStatement=function(t){return t.strip},n.prototype.PartialStatement=n.prototype.CommentStatement=function(t){var e=t.strip||{};return{inlineStandalone:!0,open:e.open,close:e.close}},e.default=n,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=s(r(6));function n(){this.parents=[]}function a(t){this.acceptRequired(t,"path"),this.acceptArray(t.params),this.acceptKey(t,"hash")}function o(t){a.call(this,t),this.acceptKey(t,"program"),this.acceptKey(t,"inverse")}function c(t){this.acceptRequired(t,"name"),this.acceptArray(t.params),this.acceptKey(t,"hash")}n.prototype={constructor:n,mutating:!1,acceptKey:function(t,e){var r=this.accept(t[e]);if(this.mutating){if(r&&!n.prototype[r.type])throw new i.default('Unexpected node type "'+r.type+'" found when accepting '+e+" on "+t.type);t[e]=r}},acceptRequired:function(t,e){if(this.acceptKey(t,e),!t[e])throw new i.default(t.type+" requires "+e)},acceptArray:function(t){for(var e=0,r=t.length;e<r;e++)this.acceptKey(t,e),t[e]||(t.splice(e,1),e--,r--)},accept:function(t){if(t){if(!this[t.type])throw new i.default("Unknown type: "+t.type,t);this.current&&this.parents.unshift(this.current),this.current=t;var e=this[t.type](t);return this.current=this.parents.shift(),!this.mutating||e?e:!1!==e?t:void 0}},Program:function(t){this.acceptArray(t.body)},MustacheStatement:a,Decorator:a,BlockStatement:o,DecoratorBlock:o,PartialStatement:c,PartialBlockStatement:function(t){c.call(this,t),this.acceptKey(t,"program")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:a,PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(t){this.acceptArray(t.pairs)},HashPair:function(t){this.acceptRequired(t,"value")}},e.default=n,t.exports=e.default},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.SourceLocation=function(t,e){this.source=t,this.start={line:e.first_line,column:e.first_column},this.end={line:e.last_line,column:e.last_column}},e.id=function(t){return/^\[.*\]$/.test(t)?t.substr(1,t.length-2):t},e.stripFlags=function(t,e){return{open:"~"===t.charAt(2),close:"~"===e.charAt(e.length-3)}},e.stripComment=function(t){return t.replace(/^\{\{~?\!-?-?/,"").replace(/-?-?~?\}\}$/,"")},e.preparePath=function(t,e,r){r=this.locInfo(r);for(var s=t?"@":"",n=[],a=0,o=0,c=e.length;o<c;o++){var l=e[o].part,h=e[o].original!==l;if(s+=(e[o].separator||"")+l,h||".."!==l&&"."!==l&&"this"!==l)n.push(l);else{if(n.length>0)throw new i.default("Invalid path: "+s,{loc:r});".."===l&&(a++,"../")}}return{type:"PathExpression",data:t,depth:a,parts:n,original:s,loc:r}},e.prepareMustache=function(t,e,r,s,i,n){var a=s.charAt(3)||s.charAt(2),o="{"!==a&&"&"!==a;return{type:/\*/.test(s)?"Decorator":"MustacheStatement",path:t,params:e,hash:r,escaped:o,strip:i,loc:this.locInfo(n)}},e.prepareRawBlock=function(t,e,r,s){n(t,r),s=this.locInfo(s);var i={type:"Program",body:e,strip:{},loc:s};return{type:"BlockStatement",path:t.path,params:t.params,hash:t.hash,program:i,openStrip:{},inverseStrip:{},closeStrip:{},loc:s}},e.prepareBlock=function(t,e,r,s,a,o){s&&s.path&&n(t,s);var c=/\*/.test(t.open);e.blockParams=t.blockParams;var l=void 0,h=void 0;if(r){if(c)throw new i.default("Unexpected inverse block on decorator",r);r.chain&&(r.program.body[0].closeStrip=s.strip),h=r.strip,l=r.program}a&&(a=l,l=e,e=a);return{type:c?"DecoratorBlock":"BlockStatement",path:t.path,params:t.params,hash:t.hash,program:e,inverse:l,openStrip:t.strip,inverseStrip:h,closeStrip:s&&s.strip,loc:this.locInfo(o)}},e.prepareProgram=function(t,e){if(!e&&t.length){var r=t[0].loc,s=t[t.length-1].loc;r&&s&&(e={source:r.source,start:{line:r.start.line,column:r.start.column},end:{line:s.end.line,column:s.end.column}})}return{type:"Program",body:t,strip:{},loc:e}},e.preparePartialBlock=function(t,e,r,s){return n(t,r),{type:"PartialBlockStatement",name:t.path,params:t.params,hash:t.hash,program:e,openStrip:t.strip,closeStrip:r&&r.strip,loc:this.locInfo(s)}};var i=s(r(6));function n(t,e){if(e=e.path?e.path.original:e,t.path.original!==e){var r={loc:t.path.loc};throw new i.default(t.path.original+" doesn't match "+e,r)}}},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0,e.Compiler=c,e.precompile=function(t,e,r){if(null==t||"string"!=typeof t&&"Program"!==t.type)throw new i.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+t);"data"in(e=e||{})||(e.data=!0);e.compat&&(e.useDepths=!0);var s=r.parse(t,e),n=(new r.Compiler).compile(s,e);return(new r.JavaScriptCompiler).compile(n,e)},e.compile=function(t,e,r){void 0===e&&(e={});if(null==t||"string"!=typeof t&&"Program"!==t.type)throw new i.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+t);"data"in(e=n.extend({},e))||(e.data=!0);e.compat&&(e.useDepths=!0);var s=void 0;function a(){var s=r.parse(t,e),i=(new r.Compiler).compile(s,e),n=(new r.JavaScriptCompiler).compile(i,e,void 0,!0);return r.template(n)}function o(t,e){return s||(s=a()),s.call(this,t,e)}return o._setup=function(t){return s||(s=a()),s._setup(t)},o._child=function(t,e,r,i){return s||(s=a()),s._child(t,e,r,i)},o};var i=s(r(6)),n=r(5),a=s(r(35)),o=[].slice;function c(){}function l(t,e){if(t===e)return!0;if(n.isArray(t)&&n.isArray(e)&&t.length===e.length){for(var r=0;r<t.length;r++)if(!l(t[r],e[r]))return!1;return!0}}function h(t){if(!t.path.parts){var e=t.path;t.path={type:"PathExpression",data:!1,depth:0,parts:[e.original+""],original:e.original+"",loc:e.loc}}}c.prototype={compiler:c,equals:function(t){var e=this.opcodes.length;if(t.opcodes.length!==e)return!1;for(var r=0;r<e;r++){var s=this.opcodes[r],i=t.opcodes[r];if(s.opcode!==i.opcode||!l(s.args,i.args))return!1}e=this.children.length;for(r=0;r<e;r++)if(!this.children[r].equals(t.children[r]))return!1;return!0},guid:0,compile:function(t,e){this.sourceNode=[],this.opcodes=[],this.children=[],this.options=e,this.stringParams=e.stringParams,this.trackIds=e.trackIds,e.blockParams=e.blockParams||[];var r=e.knownHelpers;if(e.knownHelpers={helperMissing:!0,blockHelperMissing:!0,each:!0,if:!0,unless:!0,with:!0,log:!0,lookup:!0},r)for(var s in r)s in r&&(this.options.knownHelpers[s]=r[s]);return this.accept(t)},compileProgram:function(t){var e=(new this.compiler).compile(t,this.options),r=this.guid++;return this.usePartial=this.usePartial||e.usePartial,this.children[r]=e,this.useDepths=this.useDepths||e.useDepths,r},accept:function(t){if(!this[t.type])throw new i.default("Unknown type: "+t.type,t);this.sourceNode.unshift(t);var e=this[t.type](t);return this.sourceNode.shift(),e},Program:function(t){this.options.blockParams.unshift(t.blockParams);for(var e=t.body,r=e.length,s=0;s<r;s++)this.accept(e[s]);return this.options.blockParams.shift(),this.isSimple=1===r,this.blockParams=t.blockParams?t.blockParams.length:0,this},BlockStatement:function(t){h(t);var e=t.program,r=t.inverse;e=e&&this.compileProgram(e),r=r&&this.compileProgram(r);var s=this.classifySexpr(t);"helper"===s?this.helperSexpr(t,e,r):"simple"===s?(this.simpleSexpr(t),this.opcode("pushProgram",e),this.opcode("pushProgram",r),this.opcode("emptyHash"),this.opcode("blockValue",t.path.original)):(this.ambiguousSexpr(t,e,r),this.opcode("pushProgram",e),this.opcode("pushProgram",r),this.opcode("emptyHash"),this.opcode("ambiguousBlockValue")),this.opcode("append")},DecoratorBlock:function(t){var e=t.program&&this.compileProgram(t.program),r=this.setupFullMustacheParams(t,e,void 0),s=t.path;this.useDecorators=!0,this.opcode("registerDecorator",r.length,s.original)},PartialStatement:function(t){this.usePartial=!0;var e=t.program;e&&(e=this.compileProgram(t.program));var r=t.params;if(r.length>1)throw new i.default("Unsupported number of partial arguments: "+r.length,t);r.length||(this.options.explicitPartialContext?this.opcode("pushLiteral","undefined"):r.push({type:"PathExpression",parts:[],depth:0}));var s=t.name.original,n="SubExpression"===t.name.type;n&&this.accept(t.name),this.setupFullMustacheParams(t,e,void 0,!0);var a=t.indent||"";this.options.preventIndent&&a&&(this.opcode("appendContent",a),a=""),this.opcode("invokePartial",n,s,a),this.opcode("append")},PartialBlockStatement:function(t){this.PartialStatement(t)},MustacheStatement:function(t){this.SubExpression(t),t.escaped&&!this.options.noEscape?this.opcode("appendEscaped"):this.opcode("append")},Decorator:function(t){this.DecoratorBlock(t)},ContentStatement:function(t){t.value&&this.opcode("appendContent",t.value)},CommentStatement:function(){},SubExpression:function(t){h(t);var e=this.classifySexpr(t);"simple"===e?this.simpleSexpr(t):"helper"===e?this.helperSexpr(t):this.ambiguousSexpr(t)},ambiguousSexpr:function(t,e,r){var s=t.path,i=s.parts[0],n=null!=e||null!=r;this.opcode("getContext",s.depth),this.opcode("pushProgram",e),this.opcode("pushProgram",r),s.strict=!0,this.accept(s),this.opcode("invokeAmbiguous",i,n)},simpleSexpr:function(t){var e=t.path;e.strict=!0,this.accept(e),this.opcode("resolvePossibleLambda")},helperSexpr:function(t,e,r){var s=this.setupFullMustacheParams(t,e,r),n=t.path,o=n.parts[0];if(this.options.knownHelpers[o])this.opcode("invokeKnownHelper",s.length,o);else{if(this.options.knownHelpersOnly)throw new i.default("You specified knownHelpersOnly, but used the unknown helper "+o,t);n.strict=!0,n.falsy=!0,this.accept(n),this.opcode("invokeHelper",s.length,n.original,a.default.helpers.simpleId(n))}},PathExpression:function(t){this.addDepth(t.depth),this.opcode("getContext",t.depth);var e=t.parts[0],r=a.default.helpers.scopedId(t),s=!t.depth&&!r&&this.blockParamIndex(e);s?this.opcode("lookupBlockParam",s,t.parts):e?t.data?(this.options.data=!0,this.opcode("lookupData",t.depth,t.parts,t.strict)):this.opcode("lookupOnContext",t.parts,t.falsy,t.strict,r):this.opcode("pushContext")},StringLiteral:function(t){this.opcode("pushString",t.value)},NumberLiteral:function(t){this.opcode("pushLiteral",t.value)},BooleanLiteral:function(t){this.opcode("pushLiteral",t.value)},UndefinedLiteral:function(){this.opcode("pushLiteral","undefined")},NullLiteral:function(){this.opcode("pushLiteral","null")},Hash:function(t){var e=t.pairs,r=0,s=e.length;for(this.opcode("pushHash");r<s;r++)this.pushParam(e[r].value);for(;r--;)this.opcode("assignToHash",e[r].key);this.opcode("popHash")},opcode:function(t){this.opcodes.push({opcode:t,args:o.call(arguments,1),loc:this.sourceNode[0].loc})},addDepth:function(t){t&&(this.useDepths=!0)},classifySexpr:function(t){var e=a.default.helpers.simpleId(t.path),r=e&&!!this.blockParamIndex(t.path.parts[0]),s=!r&&a.default.helpers.helperExpression(t),i=!r&&(s||e);if(i&&!s){var n=t.path.parts[0],o=this.options;o.knownHelpers[n]?s=!0:o.knownHelpersOnly&&(i=!1)}return s?"helper":i?"ambiguous":"simple"},pushParams:function(t){for(var e=0,r=t.length;e<r;e++)this.pushParam(t[e])},pushParam:function(t){var e=null!=t.value?t.value:t.original||"";if(this.stringParams)e.replace&&(e=e.replace(/^(\.?\.\/)*/g,"").replace(/\//g,".")),t.depth&&this.addDepth(t.depth),this.opcode("getContext",t.depth||0),this.opcode("pushStringParam",e,t.type),"SubExpression"===t.type&&this.accept(t);else{if(this.trackIds){var r=void 0;if(!t.parts||a.default.helpers.scopedId(t)||t.depth||(r=this.blockParamIndex(t.parts[0])),r){var s=t.parts.slice(1).join(".");this.opcode("pushId","BlockParam",r,s)}else(e=t.original||e).replace&&(e=e.replace(/^this(?:\.|$)/,"").replace(/^\.\//,"").replace(/^\.$/,"")),this.opcode("pushId",t.type,e)}this.accept(t)}},setupFullMustacheParams:function(t,e,r,s){var i=t.params;return this.pushParams(i),this.opcode("pushProgram",e),this.opcode("pushProgram",r),t.hash?this.accept(t.hash):this.opcode("emptyHash",s),i},blockParamIndex:function(t){for(var e=0,r=this.options.blockParams.length;e<r;e++){var s=this.options.blockParams[e],i=s&&n.indexOf(s,t);if(s&&i>=0)return[e,i]}}}},function(t,e,r){"use strict";var s=r(1).default;e.__esModule=!0;var i=r(4),n=s(r(6)),a=r(5),o=s(r(43));function c(t){this.value=t}function l(){}l.prototype={nameLookup:function(t,e){return l.isValidJavaScriptVariableName(e)?[t,".",e]:[t,"[",JSON.stringify(e),"]"]},depthedLookup:function(t){return[this.aliasable("container.lookup"),'(depths, "',t,'")']},compilerInfo:function(){var t=i.COMPILER_REVISION;return[t,i.REVISION_CHANGES[t]]},appendToBuffer:function(t,e,r){return a.isArray(t)||(t=[t]),t=this.source.wrap(t,e),this.environment.isSimple?["return ",t,";"]:r?["buffer += ",t,";"]:(t.appendToBuffer=!0,t)},initializeBuffer:function(){return this.quotedString("")},compile:function(t,e,r,s){this.environment=t,this.options=e,this.stringParams=this.options.stringParams,this.trackIds=this.options.trackIds,this.precompile=!s,this.name=this.environment.name,this.isChild=!!r,this.context=r||{decorators:[],programs:[],environments:[]},this.preamble(),this.stackSlot=0,this.stackVars=[],this.aliases={},this.registers={list:[]},this.hashes=[],this.compileStack=[],this.inlineStack=[],this.blockParams=[],this.compileChildren(t,e),this.useDepths=this.useDepths||t.useDepths||t.useDecorators||this.options.compat,this.useBlockParams=this.useBlockParams||t.useBlockParams;var i=t.opcodes,a=void 0,o=void 0,c=void 0,l=void 0;for(c=0,l=i.length;c<l;c++)a=i[c],this.source.currentLocation=a.loc,o=o||a.loc,this[a.opcode].apply(this,a.args);if(this.source.currentLocation=o,this.pushSource(""),this.stackSlot||this.inlineStack.length||this.compileStack.length)throw new n.default("Compile completed with content left on stack");this.decorators.isEmpty()?this.decorators=void 0:(this.useDecorators=!0,this.decorators.prepend("var decorators = container.decorators;\n"),this.decorators.push("return fn;"),s?this.decorators=Function.apply(this,["fn","props","container","depth0","data","blockParams","depths",this.decorators.merge()]):(this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"),this.decorators.push("}\n"),this.decorators=this.decorators.merge()));var h=this.createFunctionContext(s);if(this.isChild)return h;var p={compiler:this.compilerInfo(),main:h};this.decorators&&(p.main_d=this.decorators,p.useDecorators=!0);var u=this.context,f=u.programs,d=u.decorators;for(c=0,l=f.length;c<l;c++)f[c]&&(p[c]=f[c],d[c]&&(p[c+"_d"]=d[c],p.useDecorators=!0));return this.environment.usePartial&&(p.usePartial=!0),this.options.data&&(p.useData=!0),this.useDepths&&(p.useDepths=!0),this.useBlockParams&&(p.useBlockParams=!0),this.options.compat&&(p.compat=!0),s?p.compilerOptions=this.options:(p.compiler=JSON.stringify(p.compiler),this.source.currentLocation={start:{line:1,column:0}},p=this.objectLiteral(p),e.srcName?(p=p.toStringWithSourceMap({file:e.destName})).map=p.map&&p.map.toString():p=p.toString()),p},preamble:function(){this.lastContext=0,this.source=new o.default(this.options.srcName),this.decorators=new o.default(this.options.srcName)},createFunctionContext:function(t){var e="",r=this.stackVars.concat(this.registers.list);r.length>0&&(e+=", "+r.join(", "));var s=0;for(var i in this.aliases){var n=this.aliases[i];this.aliases.hasOwnProperty(i)&&n.children&&n.referenceCount>1&&(e+=", alias"+ ++s+"="+i,n.children[0]="alias"+s)}var a=["container","depth0","helpers","partials","data"];(this.useBlockParams||this.useDepths)&&a.push("blockParams"),this.useDepths&&a.push("depths");var o=this.mergeSource(e);return t?(a.push(o),Function.apply(this,a)):this.source.wrap(["function(",a.join(","),") {\n  ",o,"}"])},mergeSource:function(t){var e=this.environment.isSimple,r=!this.forceBuffer,s=void 0,i=void 0,n=void 0,a=void 0;return this.source.each(function(t){t.appendToBuffer?(n?t.prepend("  + "):n=t,a=t):(n&&(i?n.prepend("buffer += "):s=!0,a.add(";"),n=a=void 0),i=!0,e||(r=!1))}),r?n?(n.prepend("return "),a.add(";")):i||this.source.push('return "";'):(t+=", buffer = "+(s?"":this.initializeBuffer()),n?(n.prepend("return buffer + "),a.add(";")):this.source.push("return buffer;")),t&&this.source.prepend("var "+t.substring(2)+(s?"":";\n")),this.source.merge()},blockValue:function(t){var e=this.aliasable("helpers.blockHelperMissing"),r=[this.contextName(0)];this.setupHelperArgs(t,0,r);var s=this.popStack();r.splice(1,0,s),this.push(this.source.functionCall(e,"call",r))},ambiguousBlockValue:function(){var t=this.aliasable("helpers.blockHelperMissing"),e=[this.contextName(0)];this.setupHelperArgs("",0,e,!0),this.flushInline();var r=this.topStack();e.splice(1,0,r),this.pushSource(["if (!",this.lastHelper,") { ",r," = ",this.source.functionCall(t,"call",e),"}"])},appendContent:function(t){this.pendingContent?t=this.pendingContent+t:this.pendingLocation=this.source.currentLocation,this.pendingContent=t},append:function(){if(this.isInline())this.replaceStack(function(t){return[" != null ? ",t,' : ""']}),this.pushSource(this.appendToBuffer(this.popStack()));else{var t=this.popStack();this.pushSource(["if (",t," != null) { ",this.appendToBuffer(t,void 0,!0)," }"]),this.environment.isSimple&&this.pushSource(["else { ",this.appendToBuffer("''",void 0,!0)," }"])}},appendEscaped:function(){this.pushSource(this.appendToBuffer([this.aliasable("container.escapeExpression"),"(",this.popStack(),")"]))},getContext:function(t){this.lastContext=t},pushContext:function(){this.pushStackLiteral(this.contextName(this.lastContext))},lookupOnContext:function(t,e,r,s){var i=0;s||!this.options.compat||this.lastContext?this.pushContext():this.push(this.depthedLookup(t[i++])),this.resolvePath("context",t,i,e,r)},lookupBlockParam:function(t,e){this.useBlockParams=!0,this.push(["blockParams[",t[0],"][",t[1],"]"]),this.resolvePath("context",e,1)},lookupData:function(t,e,r){t?this.pushStackLiteral("container.data(data, "+t+")"):this.pushStackLiteral("data"),this.resolvePath("data",e,0,!0,r)},resolvePath:function(t,e,r,s,i){var n=this;if(this.options.strict||this.options.assumeObjects)this.push(function(t,e,r,s){var i=e.popStack(),n=0,a=r.length;t&&a--;for(;n<a;n++)i=e.nameLookup(i,r[n],s);return t?[e.aliasable("container.strict"),"(",i,", ",e.quotedString(r[n]),")"]:i}(this.options.strict&&i,this,e,t));else for(var a=e.length;r<a;r++)this.replaceStack(function(i){var a=n.nameLookup(i,e[r],t);return s?[" && ",a]:[" != null ? ",a," : ",i]})},resolvePossibleLambda:function(){this.push([this.aliasable("container.lambda"),"(",this.popStack(),", ",this.contextName(0),")"])},pushStringParam:function(t,e){this.pushContext(),this.pushString(e),"SubExpression"!==e&&("string"==typeof t?this.pushString(t):this.pushStackLiteral(t))},emptyHash:function(t){this.trackIds&&this.push("{}"),this.stringParams&&(this.push("{}"),this.push("{}")),this.pushStackLiteral(t?"undefined":"{}")},pushHash:function(){this.hash&&this.hashes.push(this.hash),this.hash={values:[],types:[],contexts:[],ids:[]}},popHash:function(){var t=this.hash;this.hash=this.hashes.pop(),this.trackIds&&this.push(this.objectLiteral(t.ids)),this.stringParams&&(this.push(this.objectLiteral(t.contexts)),this.push(this.objectLiteral(t.types))),this.push(this.objectLiteral(t.values))},pushString:function(t){this.pushStackLiteral(this.quotedString(t))},pushLiteral:function(t){this.pushStackLiteral(t)},pushProgram:function(t){null!=t?this.pushStackLiteral(this.programExpression(t)):this.pushStackLiteral(null)},registerDecorator:function(t,e){var r=this.nameLookup("decorators",e,"decorator"),s=this.setupHelperArgs(e,t);this.decorators.push(["fn = ",this.decorators.functionCall(r,"",["fn","props","container",s])," || fn;"])},invokeHelper:function(t,e,r){var s=this.popStack(),i=this.setupHelper(t,e),n=r?[i.name," || "]:"",a=["("].concat(n,s);this.options.strict||a.push(" || ",this.aliasable("helpers.helperMissing")),a.push(")"),this.push(this.source.functionCall(a,"call",i.callParams))},invokeKnownHelper:function(t,e){var r=this.setupHelper(t,e);this.push(this.source.functionCall(r.name,"call",r.callParams))},invokeAmbiguous:function(t,e){this.useRegister("helper");var r=this.popStack();this.emptyHash();var s=this.setupHelper(0,t,e),i=["(","(helper = ",this.lastHelper=this.nameLookup("helpers",t,"helper")," || ",r,")"];this.options.strict||(i[0]="(helper = ",i.push(" != null ? helper : ",this.aliasable("helpers.helperMissing"))),this.push(["(",i,s.paramsInit?["),(",s.paramsInit]:[],"),","(typeof helper === ",this.aliasable('"function"')," ? ",this.source.functionCall("helper","call",s.callParams)," : helper))"])},invokePartial:function(t,e,r){var s=[],i=this.setupParams(e,1,s);t&&(e=this.popStack(),delete i.name),r&&(i.indent=JSON.stringify(r)),i.helpers="helpers",i.partials="partials",i.decorators="container.decorators",t?s.unshift(e):s.unshift(this.nameLookup("partials",e,"partial")),this.options.compat&&(i.depths="depths"),i=this.objectLiteral(i),s.push(i),this.push(this.source.functionCall("container.invokePartial","",s))},assignToHash:function(t){var e=this.popStack(),r=void 0,s=void 0,i=void 0;this.trackIds&&(i=this.popStack()),this.stringParams&&(s=this.popStack(),r=this.popStack());var n=this.hash;r&&(n.contexts[t]=r),s&&(n.types[t]=s),i&&(n.ids[t]=i),n.values[t]=e},pushId:function(t,e,r){"BlockParam"===t?this.pushStackLiteral("blockParams["+e[0]+"].path["+e[1]+"]"+(r?" + "+JSON.stringify("."+r):"")):"PathExpression"===t?this.pushString(e):"SubExpression"===t?this.pushStackLiteral("true"):this.pushStackLiteral("null")},compiler:l,compileChildren:function(t,e){for(var r=t.children,s=void 0,i=void 0,n=0,a=r.length;n<a;n++){s=r[n],i=new this.compiler;var o=this.matchExistingProgram(s);if(null==o){this.context.programs.push("");var c=this.context.programs.length;s.index=c,s.name="program"+c,this.context.programs[c]=i.compile(s,e,this.context,!this.precompile),this.context.decorators[c]=i.decorators,this.context.environments[c]=s,this.useDepths=this.useDepths||i.useDepths,this.useBlockParams=this.useBlockParams||i.useBlockParams,s.useDepths=this.useDepths,s.useBlockParams=this.useBlockParams}else s.index=o.index,s.name="program"+o.index,this.useDepths=this.useDepths||o.useDepths,this.useBlockParams=this.useBlockParams||o.useBlockParams}},matchExistingProgram:function(t){for(var e=0,r=this.context.environments.length;e<r;e++){var s=this.context.environments[e];if(s&&s.equals(t))return s}},programExpression:function(t){var e=this.environment.children[t],r=[e.index,"data",e.blockParams];return(this.useBlockParams||this.useDepths)&&r.push("blockParams"),this.useDepths&&r.push("depths"),"container.program("+r.join(", ")+")"},useRegister:function(t){this.registers[t]||(this.registers[t]=!0,this.registers.list.push(t))},push:function(t){return t instanceof c||(t=this.source.wrap(t)),this.inlineStack.push(t),t},pushStackLiteral:function(t){this.push(new c(t))},pushSource:function(t){this.pendingContent&&(this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent),this.pendingLocation)),this.pendingContent=void 0),t&&this.source.push(t)},replaceStack:function(t){var e=["("],r=void 0,s=void 0,i=void 0;if(!this.isInline())throw new n.default("replaceStack on non-inline");var a=this.popStack(!0);if(a instanceof c)e=["(",r=[a.value]],i=!0;else{s=!0;var o=this.incrStack();e=["((",this.push(o)," = ",a,")"],r=this.topStack()}var l=t.call(this,r);i||this.popStack(),s&&this.stackSlot--,this.push(e.concat(l,")"))},incrStack:function(){return this.stackSlot++,this.stackSlot>this.stackVars.length&&this.stackVars.push("stack"+this.stackSlot),this.topStackName()},topStackName:function(){return"stack"+this.stackSlot},flushInline:function(){var t=this.inlineStack;this.inlineStack=[];for(var e=0,r=t.length;e<r;e++){var s=t[e];if(s instanceof c)this.compileStack.push(s);else{var i=this.incrStack();this.pushSource([i," = ",s,";"]),this.compileStack.push(i)}}},isInline:function(){return this.inlineStack.length},popStack:function(t){var e=this.isInline(),r=(e?this.inlineStack:this.compileStack).pop();if(!t&&r instanceof c)return r.value;if(!e){if(!this.stackSlot)throw new n.default("Invalid stack pop");this.stackSlot--}return r},topStack:function(){var t=this.isInline()?this.inlineStack:this.compileStack,e=t[t.length-1];return e instanceof c?e.value:e},contextName:function(t){return this.useDepths&&t?"depths["+t+"]":"depth"+t},quotedString:function(t){return this.source.quotedString(t)},objectLiteral:function(t){return this.source.objectLiteral(t)},aliasable:function(t){var e=this.aliases[t];return e?(e.referenceCount++,e):((e=this.aliases[t]=this.source.wrap(t)).aliasable=!0,e.referenceCount=1,e)},setupHelper:function(t,e,r){var s=[];return{params:s,paramsInit:this.setupHelperArgs(e,t,s,r),name:this.nameLookup("helpers",e,"helper"),callParams:[this.aliasable(this.contextName(0)+" != null ? "+this.contextName(0)+" : (container.nullContext || {})")].concat(s)}},setupParams:function(t,e,r){var s={},i=[],n=[],a=[],o=!r,c=void 0;o&&(r=[]),s.name=this.quotedString(t),s.hash=this.popStack(),this.trackIds&&(s.hashIds=this.popStack()),this.stringParams&&(s.hashTypes=this.popStack(),s.hashContexts=this.popStack());var l=this.popStack(),h=this.popStack();(h||l)&&(s.fn=h||"container.noop",s.inverse=l||"container.noop");for(var p=e;p--;)c=this.popStack(),r[p]=c,this.trackIds&&(a[p]=this.popStack()),this.stringParams&&(n[p]=this.popStack(),i[p]=this.popStack());return o&&(s.args=this.source.generateArray(r)),this.trackIds&&(s.ids=this.source.generateArray(a)),this.stringParams&&(s.types=this.source.generateArray(n),s.contexts=this.source.generateArray(i)),this.options.data&&(s.data="data"),this.useBlockParams&&(s.blockParams="blockParams"),s},setupHelperArgs:function(t,e,r,s){var i=this.setupParams(t,e,r);return i=this.objectLiteral(i),s?(this.useRegister("options"),r.push("options"),["options=",i]):r?(r.push(i),""):i}},function(){for(var t="break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "),e=l.RESERVED_WORDS={},r=0,s=t.length;r<s;r++)e[t[r]]=!0}(),l.isValidJavaScriptVariableName=function(t){return!l.RESERVED_WORDS[t]&&/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t)},e.default=l,t.exports=e.default},function(t,e,r){"use strict";e.__esModule=!0;var s=r(5),i=void 0;try{}catch(t){}function n(t,e,r){if(s.isArray(t)){for(var i=[],n=0,a=t.length;n<a;n++)i.push(e.wrap(t[n],r));return i}return"boolean"==typeof t||"number"==typeof t?t+"":t}function a(t){this.srcFile=t,this.source=[]}i||((i=function(t,e,r,s){this.src="",s&&this.add(s)}).prototype={add:function(t){s.isArray(t)&&(t=t.join("")),this.src+=t},prepend:function(t){s.isArray(t)&&(t=t.join("")),this.src=t+this.src},toStringWithSourceMap:function(){return{code:this.toString()}},toString:function(){return this.src}}),a.prototype={isEmpty:function(){return!this.source.length},prepend:function(t,e){this.source.unshift(this.wrap(t,e))},push:function(t,e){this.source.push(this.wrap(t,e))},merge:function(){var t=this.empty();return this.each(function(e){t.add(["  ",e,"\n"])}),t},each:function(t){for(var e=0,r=this.source.length;e<r;e++)t(this.source[e])},empty:function(){var t=this.currentLocation||{start:{}};return new i(t.start.line,t.start.column,this.srcFile)},wrap:function(t){var e=arguments.length<=1||void 0===arguments[1]?this.currentLocation||{start:{}}:arguments[1];return t instanceof i?t:(t=n(t,this,e),new i(e.start.line,e.start.column,this.srcFile,t))},functionCall:function(t,e,r){return r=this.generateList(r),this.wrap([t,e?"."+e+"(":"(",r,")"])},quotedString:function(t){return'"'+(t+"").replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")+'"'},objectLiteral:function(t){var e=[];for(var r in t)if(t.hasOwnProperty(r)){var s=n(t[r],this);"undefined"!==s&&e.push([this.quotedString(r),":",s])}var i=this.generateList(e);return i.prepend("{"),i.add("}"),i},generateList:function(t){for(var e=this.empty(),r=0,s=t.length;r<s;r++)r&&e.add(","),e.add(n(t[r],this));return e},generateArray:function(t){var e=this.generateList(t);return e.prepend("["),e.add("]"),e}},e.default=a,t.exports=e.default}])});

/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */

!function(a,b){"function"==typeof define&&define.amd?define("bloodhound",["jquery"],function(c){return a.Bloodhound=b(c)}):"object"==typeof exports?module.exports=b(require("jquery")):a.Bloodhound=b(jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},noop:function(){}}}(),c="0.11.1",d=function(){"use strict";function a(a){return a=b.toStr(a),a?a.split(/\s+/):[]}function c(a){return a=b.toStr(a),a?a.split(/\W+/):[]}function d(a){return function(c){return c=b.isArray(c)?c:[].slice.call(arguments,0),function(d){var e=[];return b.each(c,function(c){e=e.concat(a(b.toStr(d[c])))}),e}}}return{nonword:c,whitespace:a,obj:{nonword:d(c),whitespace:d(a)}}}(),e=function(){"use strict";function c(c){this.maxSize=b.isNumber(c)?c:100,this.reset(),this.maxSize<=0&&(this.set=this.get=a.noop)}function d(){this.head=this.tail=null}function e(a,b){this.key=a,this.val=b,this.prev=this.next=null}return b.mixin(c.prototype,{set:function(a,b){var c,d=this.list.tail;this.size>=this.maxSize&&(this.list.remove(d),delete this.hash[d.key],this.size--),(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new e(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){var b=this.hash[a];return b?(this.list.moveToFront(b),b.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new d}}),b.mixin(d.prototype,{add:function(a){this.head&&(a.next=this.head,this.head.prev=a),this.head=a,this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next,a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a),this.add(a)}}),c}(),f=function(){"use strict";function c(a,c){this.prefix=["__",a,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+b.escapeRegExChars(this.prefix)),this.ls=c||h,!this.ls&&this._noop()}function d(){return(new Date).getTime()}function e(a){return JSON.stringify(b.isUndefined(a)?null:a)}function f(b){return a.parseJSON(b)}function g(a){var b,c,d=[],e=h.length;for(b=0;e>b;b++)(c=h.key(b)).match(a)&&d.push(c.replace(a,""));return d}var h;try{h=window.localStorage,h.setItem("~~~","!"),h.removeItem("~~~")}catch(i){h=null}return b.mixin(c.prototype,{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=b.noop},_safeSet:function(a,b){try{this.ls.setItem(a,b)}catch(c){"QuotaExceededError"===c.name&&(this.clear(),this._noop())}},get:function(a){return this.isExpired(a)&&this.remove(a),f(this.ls.getItem(this._prefix(a)))},set:function(a,c,f){return b.isNumber(f)?this._safeSet(this._ttlKey(a),e(d()+f)):this.ls.removeItem(this._ttlKey(a)),this._safeSet(this._prefix(a),e(c))},remove:function(a){return this.ls.removeItem(this._ttlKey(a)),this.ls.removeItem(this._prefix(a)),this},clear:function(){var a,b=g(this.keyMatcher);for(a=b.length;a--;)this.remove(b[a]);return this},isExpired:function(a){var c=f(this.ls.getItem(this._ttlKey(a)));return b.isNumber(c)&&d()>c?!0:!1}}),c}(),g=function(){"use strict";function c(a){a=a||{},this.cancelled=!1,this.lastReq=null,this._send=a.transport,this._get=a.limiter?a.limiter(this._get):this._get,this._cache=a.cache===!1?new e(0):h}var d=0,f={},g=6,h=new e(10);return c.setMaxPendingRequests=function(a){g=a},c.resetCache=function(){h.reset()},b.mixin(c.prototype,{_fingerprint:function(b){return b=b||{},b.url+b.type+a.param(b.data||{})},_get:function(a,b){function c(a){b(null,a),k._cache.set(i,a)}function e(){b(!0)}function h(){d--,delete f[i],k.onDeckRequestArgs&&(k._get.apply(k,k.onDeckRequestArgs),k.onDeckRequestArgs=null)}var i,j,k=this;i=this._fingerprint(a),this.cancelled||i!==this.lastReq||((j=f[i])?j.done(c).fail(e):g>d?(d++,f[i]=this._send(a).done(c).fail(e).always(h)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(c,d){var e,f;d=d||a.noop,c=b.isString(c)?{url:c}:c||{},f=this._fingerprint(c),this.cancelled=!1,this.lastReq=f,(e=this._cache.get(f))?d(null,e):this._get(c,d)},cancel:function(){this.cancelled=!0}}),c}(),h=window.SearchIndex=function(){"use strict";function c(c){c=c||{},c.datumTokenizer&&c.queryTokenizer||a.error("datumTokenizer and queryTokenizer are both required"),this.identify=c.identify||b.stringify,this.datumTokenizer=c.datumTokenizer,this.queryTokenizer=c.queryTokenizer,this.reset()}function d(a){return a=b.filter(a,function(a){return!!a}),a=b.map(a,function(a){return a.toLowerCase()})}function e(){var a={};return a[i]=[],a[h]={},a}function f(a){for(var b={},c=[],d=0,e=a.length;e>d;d++)b[a[d]]||(b[a[d]]=!0,c.push(a[d]));return c}function g(a,b){var c=0,d=0,e=[];a=a.sort(),b=b.sort();for(var f=a.length,g=b.length;f>c&&g>d;)a[c]<b[d]?c++:a[c]>b[d]?d++:(e.push(a[c]),c++,d++);return e}var h="c",i="i";return b.mixin(c.prototype,{bootstrap:function(a){this.datums=a.datums,this.trie=a.trie},add:function(a){var c=this;a=b.isArray(a)?a:[a],b.each(a,function(a){var f,g;c.datums[f=c.identify(a)]=a,g=d(c.datumTokenizer(a)),b.each(g,function(a){var b,d,g;for(b=c.trie,d=a.split("");g=d.shift();)b=b[h][g]||(b[h][g]=e()),b[i].push(f)})})},get:function(a){var c=this;return b.map(a,function(a){return c.datums[a]})},search:function(a){var c,e,j=this;return c=d(this.queryTokenizer(a)),b.each(c,function(a){var b,c,d,f;if(e&&0===e.length)return!1;for(b=j.trie,c=a.split("");b&&(d=c.shift());)b=b[h][d];return b&&0===c.length?(f=b[i].slice(0),void(e=e?g(e,f):f)):(e=[],!1)}),e?b.map(f(e),function(a){return j.datums[a]}):[]},all:function(){var a=[];for(var b in this.datums)a.push(this.datums[b]);return a},reset:function(){this.datums={},this.trie=e()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),c}(),i=function(){"use strict";function a(a){this.url=a.url,this.ttl=a.ttl,this.cache=a.cache,this.prepare=a.prepare,this.transform=a.transform,this.transport=a.transport,this.thumbprint=a.thumbprint,this.storage=new f(a.cacheKey)}var c;return c={data:"data",protocol:"protocol",thumbprint:"thumbprint"},b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(a){this.cache&&(this.storage.set(c.data,a,this.ttl),this.storage.set(c.protocol,location.protocol,this.ttl),this.storage.set(c.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var a,b={};return this.cache?(b.data=this.storage.get(c.data),b.protocol=this.storage.get(c.protocol),b.thumbprint=this.storage.get(c.thumbprint),a=b.thumbprint!==this.thumbprint||b.protocol!==location.protocol,b.data&&!a?b.data:null):null},fromNetwork:function(a){function b(){a(!0)}function c(b){a(null,e.transform(b))}var d,e=this;a&&(d=this.prepare(this._settings()),this.transport(d).fail(b).done(c))},clear:function(){return this.storage.clear(),this}}),a}(),j=function(){"use strict";function a(a){this.url=a.url,this.prepare=a.prepare,this.transform=a.transform,this.transport=new g({cache:a.cache,limiter:a.limiter,transport:a.transport})}return b.mixin(a.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(a,b){function c(a,c){b(a?[]:e.transform(c))}var d,e=this;if(b)return a=a||"",d=this.prepare(a,this._settings()),this.transport.get(d,c)},cancelLastRequest:function(){this.transport.cancel()}}),a}(),k=function(){"use strict";function d(d){var e;return d?(e={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:b.identity,transform:b.identity,transport:null},d=b.isString(d)?{url:d}:d,d=b.mixin(e,d),!d.url&&a.error("prefetch requires url to be set"),d.transform=d.filter||d.transform,d.cacheKey=d.cacheKey||d.url,d.thumbprint=c+d.thumbprint,d.transport=d.transport?h(d.transport):a.ajax,d):null}function e(c){var d;if(c)return d={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:b.identity,transport:null},c=b.isString(c)?{url:c}:c,c=b.mixin(d,c),!c.url&&a.error("remote requires url to be set"),c.transform=c.filter||c.transform,c.prepare=f(c),c.limiter=g(c),c.transport=c.transport?h(c.transport):a.ajax,delete c.replace,delete c.wildcard,delete c.rateLimitBy,delete c.rateLimitWait,c}function f(a){function b(a,b){return b.url=f(b.url,a),b}function c(a,b){return b.url=b.url.replace(g,encodeURIComponent(a)),b}function d(a,b){return b}var e,f,g;return e=a.prepare,f=a.replace,g=a.wildcard,e?e:e=f?b:a.wildcard?c:d}function g(a){function c(a){return function(c){return b.debounce(c,a)}}function d(a){return function(c){return b.throttle(c,a)}}var e,f,g;return e=a.limiter,f=a.rateLimitBy,g=a.rateLimitWait,e||(e=/^throttle$/i.test(f)?d(g):c(g)),e}function h(c){return function(d){function e(a){b.defer(function(){g.resolve(a)})}function f(a){b.defer(function(){g.reject(a)})}var g=a.Deferred();return c(d,e,f),g}}return function(c){var f,g;return f={initialize:!0,identify:b.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null},c=b.mixin(f,c||{}),!c.datumTokenizer&&a.error("datumTokenizer is required"),!c.queryTokenizer&&a.error("queryTokenizer is required"),g=c.sorter,c.sorter=g?function(a){return a.sort(g)}:b.identity,c.local=b.isFunction(c.local)?c.local():c.local,c.prefetch=d(c.prefetch),c.remote=e(c.remote),c}}(),l=function(){"use strict";function c(a){a=k(a),this.sorter=a.sorter,this.identify=a.identify,this.sufficient=a.sufficient,this.local=a.local,this.remote=a.remote?new j(a.remote):null,this.prefetch=a.prefetch?new i(a.prefetch):null,this.index=new h({identify:this.identify,datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer}),a.initialize!==!1&&this.initialize()}var e;return e=window&&window.Bloodhound,c.noConflict=function(){return window&&(window.Bloodhound=e),c},c.tokenizers=d,b.mixin(c.prototype,{__ttAdapter:function(){function a(a,b,d){return c.search(a,b,d)}function b(a,b){return c.search(a,b)}var c=this;return this.remote?a:b},_loadPrefetch:function(){function b(a,b){return a?c.reject():(e.add(b),e.prefetch.store(e.index.serialize()),void c.resolve())}var c,d,e=this;return c=a.Deferred(),this.prefetch?(d=this.prefetch.fromCache())?(this.index.bootstrap(d),c.resolve()):this.prefetch.fromNetwork(b):c.resolve(),c.promise()},_initialize:function(){function a(){b.add(b.local)}var b=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(a),this.initPromise},initialize:function(a){return!this.initPromise||a?this._initialize():this.initPromise},add:function(a){return this.index.add(a),this},get:function(a){return a=b.isArray(a)?a:[].slice.call(arguments),this.index.get(a)},search:function(a,c,d){function e(a){var c=[];b.each(a,function(a){!b.some(f,function(b){return g.identify(a)===g.identify(b)})&&c.push(a)}),d&&d(c)}var f,g=this;return f=this.sorter(this.index.search(a)),c(this.remote?f.slice():f),this.remote&&f.length<this.sufficient?this.remote.get(a,e):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return g.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),c}();return l}),function(a,b){"function"==typeof define&&define.amd?define("typeahead.js",["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){var b=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"==typeof a},isNumber:function(a){return"number"==typeof a},isArray:a.isArray,isFunction:a.isFunction,isObject:a.isPlainObject,isUndefined:function(a){return"undefined"==typeof a},isElement:function(a){return!(!a||1!==a.nodeType)},isJQuery:function(b){return b instanceof a},toStr:function(a){return b.isUndefined(a)||null===a?"":a+""},bind:a.proxy,each:function(b,c){function d(a,b){return c(b,a)}a.each(b,d)},map:a.map,filter:a.grep,every:function(b,c){var d=!0;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?void 0:!1}),!!d):d},some:function(b,c){var d=!1;return b?(a.each(b,function(a,e){return(d=c.call(null,e,a,b))?!1:void 0}),!!d):d},mixin:a.extend,identity:function(a){return a},clone:function(b){return a.extend(!0,{},b)},getIdGenerator:function(){var a=0;return function(){return a++}},templatify:function(b){function c(){return String(b)}return a.isFunction(b)?b:c},defer:function(a){setTimeout(a,0)},debounce:function(a,b,c){var d,e;return function(){var f,g,h=this,i=arguments;return f=function(){d=null,c||(e=a.apply(h,i))},g=c&&!d,clearTimeout(d),d=setTimeout(f,b),g&&(e=a.apply(h,i)),e}},throttle:function(a,b){var c,d,e,f,g,h;return g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)},function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},stringify:function(a){return b.isString(a)?a:JSON.stringify(a)},noop:function(){}}}(),c=function(){"use strict";function a(a){var g,h;return h=b.mixin({},f,a),g={css:e(),classes:h,html:c(h),selectors:d(h)},{css:g.css,html:g.html,classes:g.classes,selectors:g.selectors,mixin:function(a){b.mixin(a,g)}}}function c(a){return{wrapper:'<span class="'+a.wrapper+'"></span>',menu:'<div class="'+a.menu+'"></div>'}}function d(a){var c={};return b.each(a,function(a,b){c[b]="."+a}),c}function e(){var a={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return b.isMsie()&&b.mixin(a.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),a}var f={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return a}(),d=function(){"use strict";function c(b){b&&b.el||a.error("EventBus initialized without el"),this.$el=a(b.el)}var d,e;return d="typeahead:",e={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},b.mixin(c.prototype,{_trigger:function(b,c){var e;return e=a.Event(d+b),(c=c||[]).unshift(e),this.$el.trigger.apply(this.$el,c),e},before:function(a){var b,c;return b=[].slice.call(arguments,1),c=this._trigger("before"+a,b),c.isDefaultPrevented()},trigger:function(a){var b;this._trigger(a,[].slice.call(arguments,1)),(b=e[a])&&this._trigger(b,[].slice.call(arguments,1))}}),c}(),e=function(){"use strict";function a(a,b,c,d){var e;if(!c)return this;for(b=b.split(i),c=d?h(c,d):c,this._callbacks=this._callbacks||{};e=b.shift();)this._callbacks[e]=this._callbacks[e]||{sync:[],async:[]},this._callbacks[e][a].push(c);return this}function b(b,c,d){return a.call(this,"async",b,c,d)}function c(b,c,d){return a.call(this,"sync",b,c,d)}function d(a){var b;if(!this._callbacks)return this;for(a=a.split(i);b=a.shift();)delete this._callbacks[b];return this}function e(a){var b,c,d,e,g;if(!this._callbacks)return this;for(a=a.split(i),d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)e=f(c.sync,this,[b].concat(d)),g=f(c.async,this,[b].concat(d)),e()&&j(g);return this}function f(a,b,c){function d(){for(var d,e=0,f=a.length;!d&&f>e;e+=1)d=a[e].apply(b,c)===!1;return!d}return d}function g(){var a;return a=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)}}function h(a,b){return a.bind?a.bind(b):function(){a.apply(b,[].slice.call(arguments,0))}}var i=/\s+/,j=g();return{onSync:c,onAsync:b,off:d,trigger:e}}(),f=function(a){"use strict";function c(a,c,d){for(var e,f=[],g=0,h=a.length;h>g;g++)f.push(b.escapeRegExChars(a[g]));return e=d?"\\b("+f.join("|")+")\\b":"("+f.join("|")+")",c?new RegExp(e):new RegExp(e,"i")}var d={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(e){function f(b){var c,d,f;return(c=h.exec(b.data))&&(f=a.createElement(e.tagName),e.className&&(f.className=e.className),d=b.splitText(c.index),d.splitText(c[0].length),f.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(f,d)),!!c}function g(a,b){for(var c,d=3,e=0;e<a.childNodes.length;e++)c=a.childNodes[e],c.nodeType===d?e+=b(c)?1:0:g(c,b)}var h;e=b.mixin({},d,e),e.node&&e.pattern&&(e.pattern=b.isArray(e.pattern)?e.pattern:[e.pattern],h=c(e.pattern,e.caseSensitive,e.wordsOnly),g(e.node,f))}}(window.document),g=function(){"use strict";function c(c,e){c=c||{},c.input||a.error("input is missing"),e.mixin(this),this.$hint=a(c.hint),this.$input=a(c.input),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=d(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=b.noop)}function d(b){return a('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:b.css("font-family"),fontSize:b.css("font-size"),fontStyle:b.css("font-style"),fontVariant:b.css("font-variant"),fontWeight:b.css("font-weight"),wordSpacing:b.css("word-spacing"),letterSpacing:b.css("letter-spacing"),textIndent:b.css("text-indent"),textRendering:b.css("text-rendering"),textTransform:b.css("text-transform")}).insertAfter(b)}function f(a,b){return c.normalizeQuery(a)===c.normalizeQuery(b)}function g(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey}var h;return h={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},c.normalizeQuery=function(a){return b.toStr(a).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},b.mixin(c.prototype,e,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(a){var b=h[a.which||a.keyCode];this._managePreventDefault(b,a),b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(a,b){var c;switch(a){case"up":case"down":c=!g(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case"tab":c=!g(b);break;default:c=!0}return c},_checkLanguageDirection:function(){var a=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==a&&(this.dir=a,this.$hint.attr("dir",a),this.trigger("langDirChanged",a))},_setQuery:function(a,b){var c,d;c=f(a,this.query),d=c?this.query.length!==a.length:!1,this.query=a,b||c?!b&&d&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},bind:function(){var a,c,d,e,f=this;return a=b.bind(this._onBlur,this),c=b.bind(this._onFocus,this),d=b.bind(this._onKeydown,this),e=b.bind(this._onInput,this),this.$input.on("blur.tt",a).on("focus.tt",c).on("keydown.tt",d),!b.isMsie()||b.isMsie()>9?this.$input.on("input.tt",e):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){h[a.which||a.keyCode]||b.defer(b.bind(f._onInput,f,a))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(a,b){this.setInputValue(a),this._setQuery(a,b)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(a){this.$input.val(a),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(a){this.$hint.val(a)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var a,b,c,d;a=this.getInputValue(),b=this.getHint(),c=a!==b&&0===b.indexOf(a),d=""!==a&&c&&!this.hasOverflow(),!d&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var a=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,c,d;return a=this.$input.val().length,c=this.$input[0].selectionStart,b.isNumber(c)?c===a:document.selection?(d=document.selection.createRange(),d.moveStart("character",-a),a===d.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=a("<div>")}}),c}(),h=function(){"use strict";function c(c,e){c=c||{},c.templates=c.templates||{},c.templates.notFound=c.templates.notFound||c.templates.empty,c.source||a.error("missing source"),c.node||a.error("missing node"),c.name&&!h(c.name)&&a.error("invalid dataset name: "+c.name),e.mixin(this),this.highlight=!!c.highlight,this.name=c.name||j(),this.limit=c.limit||5,this.displayFn=d(c.display||c.displayKey),this.templates=g(c.templates,this.displayFn),this.source=c.source.__ttAdapter?c.source.__ttAdapter():c.source,this.async=b.isUndefined(c.async)?this.source.length>2:!!c.async,this._resetLastSuggestion(),this.$el=a(c.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function d(a){function c(b){return b[a]}return a=a||b.stringify,b.isFunction(a)?a:c}function g(c,d){function e(b){return a("<div>").text(d(b))}return{notFound:c.notFound&&b.templatify(c.notFound),pending:c.pending&&b.templatify(c.pending),header:c.header&&b.templatify(c.header),footer:c.footer&&b.templatify(c.footer),suggestion:c.suggestion||e}}function h(a){return/^[_a-zA-Z0-9-]+$/.test(a)}var i,j;return i={val:"tt-selectable-display",obj:"tt-selectable-object"},j=b.getIdGenerator(),c.extractData=function(b){var c=a(b);return c.data(i.obj)?{val:c.data(i.val)||"",obj:c.data(i.obj)||null}:null},b.mixin(c.prototype,e,{_overwrite:function(a,b){b=b||[],b.length?this._renderSuggestions(a,b):this.async&&this.templates.pending?this._renderPending(a):!this.async&&this.templates.notFound?this._renderNotFound(a):this._empty(),this.trigger("rendered",this.name,b,!1)},_append:function(a,b){b=b||[],b.length&&this.$lastSuggestion.length?this._appendSuggestions(a,b):b.length?this._renderSuggestions(a,b):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(a),this.trigger("rendered",this.name,b,!0)},_renderSuggestions:function(a,b){var c;c=this._getSuggestionsFragment(a,b),this.$lastSuggestion=c.children().last(),this.$el.html(c).prepend(this._getHeader(a,b)).append(this._getFooter(a,b))},_appendSuggestions:function(a,b){var c,d;c=this._getSuggestionsFragment(a,b),d=c.children().last(),this.$lastSuggestion.after(c),this.$lastSuggestion=d},_renderPending:function(a){var b=this.templates.pending;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_renderNotFound:function(a){var b=this.templates.notFound;this._resetLastSuggestion(),b&&this.$el.html(b({query:a,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(c,d){var e,g=this;return e=document.createDocumentFragment(),b.each(d,function(b){var d,f;f=g._injectQuery(c,b),d=a(g.templates.suggestion(f)).data(i.obj,b).data(i.val,g.displayFn(b)).addClass(g.classes.suggestion+" "+g.classes.selectable),e.appendChild(d[0])}),this.highlight&&f({className:this.classes.highlight,node:e,pattern:c}),a(e)},_getFooter:function(a,b){return this.templates.footer?this.templates.footer({query:a,suggestions:b,dataset:this.name}):null},_getHeader:function(a,b){return this.templates.header?this.templates.header({query:a,suggestions:b,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=a()},_injectQuery:function(a,c){return b.isObject(c)?b.mixin({_query:a},c):c},update:function(b){function c(a){g||(g=!0,a=(a||[]).slice(0,e.limit),h=a.length,e._overwrite(b,a),h<e.limit&&e.async&&e.trigger("asyncRequested",b))}function d(c){c=c||[],!f&&h<e.limit&&(e.cancel=a.noop,h+=c.length,e._append(b,c.slice(0,e.limit-h)),e.async&&e.trigger("asyncReceived",b))}var e=this,f=!1,g=!1,h=0;this.cancel(),this.cancel=function(){f=!0,e.cancel=a.noop,e.async&&e.trigger("asyncCanceled",b)},this.source(b,c,d),!g&&c([])},cancel:a.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=a("<div>")}}),c}(),i=function(){"use strict";function c(c,d){function e(b){var c=f.$node.find(b.node).first();return b.node=c.length?c:a("<div>").appendTo(f.$node),new h(b,d)}var f=this;c=c||{},c.node||a.error("node is required"),d.mixin(this),this.$node=a(c.node),this.query=null,this.datasets=b.map(c.datasets,e)}return b.mixin(c.prototype,e,{_onSelectableClick:function(b){this.trigger("selectableClicked",a(b.currentTarget))},_onRendered:function(a,b,c,d){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",b,c,d)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){function a(a){return a.isEmpty()}return b.every(this.datasets,a)},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var a=this.getActiveSelectable();a&&a.removeClass(this.classes.cursor)},_ensureVisible:function(a){var b,c,d,e;b=a.position().top,c=b+a.outerHeight(!0),d=this.$node.scrollTop(),e=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),0>b?this.$node.scrollTop(d+b):c>e&&this.$node.scrollTop(d+(c-e))},bind:function(){var a,c=this;return a=b.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,a),b.each(this.datasets,function(a){a.onSync("asyncRequested",c._propagate,c).onSync("asyncCanceled",c._propagate,c).onSync("asyncReceived",c._propagate,c).onSync("rendered",c._onRendered,c).onSync("cleared",c._onCleared,c)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.addClass(this.classes.open)},close:function(){this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(a){this.$node.attr("dir",a)},selectableRelativeToCursor:function(a){var b,c,d,e;return c=this.getActiveSelectable(),b=this._getSelectables(),d=c?b.index(c):-1,e=d+a,e=(e+1)%(b.length+1)-1,e=-1>e?b.length-1:e,-1===e?null:b.eq(e)},setCursor:function(a){this._removeCursor(),(a=a&&a.first())&&(a.addClass(this.classes.cursor),this._ensureVisible(a))},getSelectableData:function(a){return a&&a.length?h.extractData(a):null},getActiveSelectable:function(){var a=this._getSelectables().filter(this.selectors.cursor).first();return a.length?a:null},getTopSelectable:function(){var a=this._getSelectables().first();return a.length?a:null},update:function(a){function c(b){b.update(a)}var d=a!==this.query;return d&&(this.query=a,b.each(this.datasets,c)),d},empty:function(){function a(a){a.clear()}b.each(this.datasets,a),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function c(a){a.destroy()}this.$node.off(".tt"),this.$node=a("<div>"),b.each(this.datasets,c)}}),c}(),j=function(){"use strict";function a(){i.apply(this,[].slice.call(arguments,0))}var c=i.prototype;return b.mixin(a.prototype,i.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),c.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),c.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),c._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(a){return this.$node.css("ltr"===a?this.css.ltr:this.css.rtl),c.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),a}(),k=function(){"use strict";function c(c,e){var f,g,h,i,j,k,l,m,n,o,p;c=c||{},c.input||a.error("missing input"),c.menu||a.error("missing menu"),c.eventBus||a.error("missing event bus"),e.mixin(this),this.eventBus=c.eventBus,this.minLength=b.isNumber(c.minLength)?c.minLength:1,this.input=c.input,this.menu=c.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),f=d(this,"activate","open","_onFocused"),g=d(this,"deactivate","_onBlurred"),h=d(this,"isActive","isOpen","_onEnterKeyed"),i=d(this,"isActive","isOpen","_onTabKeyed"),j=d(this,"isActive","_onEscKeyed"),k=d(this,"isActive","open","_onUpKeyed"),l=d(this,"isActive","open","_onDownKeyed"),m=d(this,"isActive","isOpen","_onLeftKeyed"),n=d(this,"isActive","isOpen","_onRightKeyed"),o=d(this,"_openIfActive","_onQueryChanged"),p=d(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",f,this).onSync("blurred",g,this).onSync("enterKeyed",h,this).onSync("tabKeyed",i,this).onSync("escKeyed",j,this).onSync("upKeyed",k,this).onSync("downKeyed",l,this).onSync("leftKeyed",m,this).onSync("rightKeyed",n,this).onSync("queryChanged",o,this).onSync("whitespaceChanged",p,this).onSync("langDirChanged",this._onLangDirChanged,this)}function d(a){var c=[].slice.call(arguments,1);return function(){var d=[].slice.call(arguments);b.each(c,function(b){return a[b].apply(a,d)})}}return b.mixin(c.prototype,{_hacks:function(){var c,d;c=this.input.$input||a("<div>"),d=this.menu.$node||a("<div>"),c.on("blur.tt",function(a){var e,f,g;
e=document.activeElement,f=d.is(e),g=d.has(e).length>0,b.isMsie()&&(f||g)&&(a.preventDefault(),a.stopImmediatePropagation(),b.defer(function(){c.focus()}))}),d.on("mousedown.tt",function(a){a.preventDefault()})},_onSelectableClicked:function(a,b){this.select(b)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(a,b,c,d){this._updateHint(),this.eventBus.trigger("render",c,d,b)},_onAsyncRequested:function(a,b,c){this.eventBus.trigger("asyncrequest",c,b)},_onAsyncCanceled:function(a,b,c){this.eventBus.trigger("asynccancel",c,b)},_onAsyncReceived:function(a,b,c){this.eventBus.trigger("asyncreceive",c,b)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())&&this.select(c)&&b.preventDefault()},_onTabKeyed:function(a,b){var c;(c=this.menu.getActiveSelectable())?this.select(c)&&b.preventDefault():(c=this.menu.getTopSelectable())&&this.autocomplete(c)&&b.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onQueryChanged:function(a,b){this._minLengthMet(b)?this.menu.update(b):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(a,b){this.dir!==b&&(this.dir=b,this.menu.setLanguageDirection(b))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(a){return a=b.isString(a)?a:this.input.getQuery()||"",a.length>=this.minLength},_updateHint:function(){var a,c,d,e,f,h,i;a=this.menu.getTopSelectable(),c=this.menu.getSelectableData(a),d=this.input.getInputValue(),!c||b.isBlankString(d)||this.input.hasOverflow()?this.input.clearHint():(e=g.normalizeQuery(d),f=b.escapeRegExChars(e),h=new RegExp("^(?:"+f+")(.+$)","i"),i=h.exec(c.val),i&&this.input.setHint(d+i[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return this.isActive()?!0:!this.isEnabled()||this.eventBus.before("active")?!1:(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return this.isActive()?this.eventBus.before("idle")?!1:(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0):!0},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(a){this.input.setQuery(b.toStr(a))},getVal:function(){return this.input.getQuery()},select:function(a){var b=this.menu.getSelectableData(a);return b&&!this.eventBus.before("select",b.obj)?(this.input.setQuery(b.val,!0),this.eventBus.trigger("select",b.obj),this.close(),!0):!1},autocomplete:function(a){var b,c,d;return b=this.input.getQuery(),c=this.menu.getSelectableData(a),d=c&&b!==c.val,d&&!this.eventBus.before("autocomplete",c.obj)?(this.input.setQuery(c.val),this.eventBus.trigger("autocomplete",c.obj),!0):!1},moveCursor:function(a){var b,c,d,e,f;return b=this.input.getQuery(),c=this.menu.selectableRelativeToCursor(a),d=this.menu.getSelectableData(c),e=d?d.obj:null,f=this._minLengthMet()&&this.menu.update(b),f||this.eventBus.before("cursorchange",e)?!1:(this.menu.setCursor(c),d?this.input.setInputValue(d.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",e),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),c}();!function(){"use strict";function e(b,c){b.each(function(){var b,d=a(this);(b=d.data(p.typeahead))&&c(b,d)})}function f(a,b){return a.clone().addClass(b.classes.hint).removeData().css(b.css.hint).css(l(a)).prop("readonly",!0).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1})}function h(a,b){a.data(p.attrs,{dir:a.attr("dir"),autocomplete:a.attr("autocomplete"),spellcheck:a.attr("spellcheck"),style:a.attr("style")}),a.addClass(b.classes.input).attr({autocomplete:"off",spellcheck:!1});try{!a.attr("dir")&&a.attr("dir","auto")}catch(c){}return a}function l(a){return{backgroundAttachment:a.css("background-attachment"),backgroundClip:a.css("background-clip"),backgroundColor:a.css("background-color"),backgroundImage:a.css("background-image"),backgroundOrigin:a.css("background-origin"),backgroundPosition:a.css("background-position"),backgroundRepeat:a.css("background-repeat"),backgroundSize:a.css("background-size")}}function m(a){var c,d;c=a.data(p.www),d=a.parent().filter(c.selectors.wrapper),b.each(a.data(p.attrs),function(c,d){b.isUndefined(c)?a.removeAttr(d):a.attr(d,c)}),a.removeData(p.typeahead).removeData(p.www).removeData(p.attr).removeClass(c.classes.input),d.length&&(a.detach().insertAfter(d),d.remove())}function n(c){var d,e;return d=b.isJQuery(c)||b.isElement(c),e=d?a(c).first():[],e.length?e:null}var o,p,q;o=a.fn.typeahead,p={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},q={initialize:function(e,l){function m(){var c,m,q,r,s,t,u,v,w,x,y;b.each(l,function(a){a.highlight=!!e.highlight}),c=a(this),m=a(o.html.wrapper),q=n(e.hint),r=n(e.menu),s=e.hint!==!1&&!q,t=e.menu!==!1&&!r,s&&(q=f(c,o)),t&&(r=a(o.html.menu).css(o.css.menu)),q&&q.val(""),c=h(c,o),(s||t)&&(m.css(o.css.wrapper),c.css(s?o.css.input:o.css.inputWithNoHint),c.wrap(m).parent().prepend(s?q:null).append(t?r:null)),y=t?j:i,u=new d({el:c}),v=new g({hint:q,input:c},o),w=new y({node:r,datasets:l},o),x=new k({input:v,menu:w,eventBus:u,minLength:e.minLength},o),c.data(p.www,o),c.data(p.typeahead,x)}var o;return l=b.isArray(l)?l:[].slice.call(arguments,1),e=e||{},o=c(e.classNames),this.each(m)},isEnabled:function(){var a;return e(this.first(),function(b){a=b.isEnabled()}),a},enable:function(){return e(this,function(a){a.enable()}),this},disable:function(){return e(this,function(a){a.disable()}),this},isActive:function(){var a;return e(this.first(),function(b){a=b.isActive()}),a},activate:function(){return e(this,function(a){a.activate()}),this},deactivate:function(){return e(this,function(a){a.deactivate()}),this},isOpen:function(){var a;return e(this.first(),function(b){a=b.isOpen()}),a},open:function(){return e(this,function(a){a.open()}),this},close:function(){return e(this,function(a){a.close()}),this},select:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.select(d)}),c},autocomplete:function(b){var c=!1,d=a(b);return e(this.first(),function(a){c=a.autocomplete(d)}),c},moveCursor:function(a){var b=!1;return e(this.first(),function(c){b=c.moveCursor(a)}),b},val:function(a){var b;return arguments.length?(e(this,function(b){b.setVal(a)}),this):(e(this.first(),function(a){b=a.getVal()}),b)},destroy:function(){return e(this,function(a,b){m(b),a.destroy()}),this}},a.fn.typeahead=function(a){return q[a]?q[a].apply(this,[].slice.call(arguments,1)):q.initialize.apply(this,arguments)},a.fn.typeahead.noConflict=function(){return a.fn.typeahead=o,this}}()});

