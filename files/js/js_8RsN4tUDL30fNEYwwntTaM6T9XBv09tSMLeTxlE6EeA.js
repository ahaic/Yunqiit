/*!
  Tinycon - A small library for manipulating the Favicon
  Tom Moor, http://tommoor.com
  Copyright (c) 2012 Tom Moor
  MIT Licensed
  @version 0.5
*/
(function(){var Tinycon={};var currentFavicon=null;var originalFavicon=null;var originalTitle=document.title;var faviconImage=null;var canvas=null;var options={};var defaults={width:7,height:9,font:'10px arial',colour:'#ffffff',background:'#F03D25',fallback:true,abbreviate:true};var ua=(function(){var agent=navigator.userAgent.toLowerCase();return function(browser){return agent.indexOf(browser)!==-1}}());var browser={ie:ua('msie'),chrome:ua('chrome'),webkit:ua('chrome')||ua('safari'),safari:ua('safari')&&!ua('chrome'),mozilla:ua('mozilla')&&!ua('chrome')&&!ua('safari')};var getFaviconTag=function(){var links=document.getElementsByTagName('link');for(var i=0,len=links.length;i<len;i++){if((links[i].getAttribute('rel')||'').match(/\bicon\b/)){return links[i]}}return false};var removeFaviconTag=function(){var links=document.getElementsByTagName('link');var head=document.getElementsByTagName('head')[0];for(var i=0,len=links.length;i<len;i++){var exists=(typeof(links[i])!=='undefined');if(exists&&(links[i].getAttribute('rel')||'').match(/\bicon\b/)){head.removeChild(links[i])}}};var getCurrentFavicon=function(){if(!originalFavicon||!currentFavicon){var tag=getFaviconTag();originalFavicon=currentFavicon=tag?tag.getAttribute('href'):'/favicon.ico'}return currentFavicon};var getCanvas=function(){if(!canvas){canvas=document.createElement("canvas");canvas.width=16;canvas.height=16}return canvas};var setFaviconTag=function(url){removeFaviconTag();var link=document.createElement('link');link.type='image/x-icon';link.rel='icon';link.href=url;document.getElementsByTagName('head')[0].appendChild(link)};var log=function(message){if(window.console)window.console.log(message)};var drawFavicon=function(label,colour){if(!getCanvas().getContext||browser.ie||browser.safari||options.fallback==='force'){return updateTitle(label)}var context=getCanvas().getContext("2d");var colour=colour||'#000000';var src=getCurrentFavicon();faviconImage=new Image();faviconImage.onload=function(){context.clearRect(0,0,16,16);context.drawImage(faviconImage,0,0,faviconImage.width,faviconImage.height,0,0,16,16);if((label+'').length>0)drawBubble(context,label,colour);refreshFavicon()};if(!src.match(/^data/)){faviconImage.crossOrigin='anonymous'}faviconImage.src=src};var updateTitle=function(label){if(options.fallback){if((label+'').length>0){document.title='('+label+') '+originalTitle}else{document.title=originalTitle}}};var drawBubble=function(context,label,colour){if(typeof label=='number'&&label>99&&options.abbreviate){label=abbreviateNumber(label)}var len=(label+'').length-1;var width=options.width+(6*len);var w=16-width;var h=16-options.height;context.font=(browser.webkit?'bold ':'')+options.font;context.fillStyle=options.background;context.strokeStyle=options.background;context.lineWidth=1;context.fillRect(w,h,width-1,options.height);context.beginPath();context.moveTo(w-0.5,h+1);context.lineTo(w-0.5,15);context.stroke();context.beginPath();context.moveTo(15.5,h+1);context.lineTo(15.5,15);context.stroke();context.beginPath();context.strokeStyle="rgba(0,0,0,0.3)";context.moveTo(w,16);context.lineTo(15,16);context.stroke();context.fillStyle=options.colour;context.textAlign="right";context.textBaseline="top";context.fillText(label,15,browser.mozilla?7:6)};var refreshFavicon=function(){if(!getCanvas().getContext)return;setFaviconTag(getCanvas().toDataURL())};var abbreviateNumber=function(label){var metricPrefixes=[['G',1000000000],['M',1000000],['k',1000]];for(var i=0;i<metricPrefixes.length;++i){if(label>=metricPrefixes[i][1]){label=round(label/metricPrefixes[i][1])+metricPrefixes[i][0];break}}return label};var round=function(value,precision){var number=new Number(value);return number.toFixed(precision)};Tinycon.setOptions=function(custom){options={};for(var key in defaults){options[key]=custom.hasOwnProperty(key)?custom[key]:defaults[key]}return this};Tinycon.setImage=function(url){currentFavicon=url;refreshFavicon();return this};Tinycon.setBubble=function(label,colour){label=label||'';drawFavicon(label,colour);return this};Tinycon.reset=function(){setFaviconTag(originalFavicon)};Tinycon.setOptions(defaults);window.Tinycon=Tinycon})();
;
(function ($) {

  Drupal.behaviors.environment_indicatorToolbar = {
    attach: function (context, settings) {
      if (typeof(settings.environment_indicator) != 'undefined' && typeof(settings.environment_indicator['toolbar-color']) != 'undefined') {
        var environment_name = settings.environment_indicator['environment-indicator-name'],
          environment_color = settings.environment_indicator['toolbar-color'],
          environment_text_color = settings.environment_indicator['toolbar-text-color'],
          $name = $('<div>').addClass('environment-indicator-name-wrapper').html(environment_name),
          $toolbar = $('#toolbar, #navbar-bar', context);
        $('div.toolbar-menu', $toolbar).once('environment_indicator').prepend($name);
        $('div.toolbar-menu', $toolbar).css('background-color', environment_color);
        $('div.toolbar-menu .item-list', $toolbar).css('background-color', changeColor(environment_color, 0.15, true));
        $('div.toolbar-menu ul li:not(.environment-switcher) a', $toolbar).css('background-color', environment_color).css('color', environment_text_color);
        $('div.toolbar-drawer', $toolbar).css('background-color', changeColor(environment_color, 0.25)).find('ul li a').css('color', changeColor(environment_text_color, 0.25));
        $('div.toolbar-menu ul li a', $toolbar).hover(function () {
          $(this).css('background-color', changeColor(environment_color, 0.1)).css('color', changeColor(environment_text_color, 0.1));
        }, function () {
          $(this).css('background-color', environment_color).css('color', environment_text_color);
          $('div.toolbar-menu ul li.active-trail a', $toolbar).css('background-color', changeColor(environment_color, 0.1)).css('color', changeColor(environment_text_color, 0.1));
        });
        $('div.toolbar-menu ul li.active-trail a', $toolbar).css('background-image', 'none').css('background-color', changeColor(environment_color, 0.1)).css('color', changeColor(environment_text_color, 0.1));
        $('div.toolbar-drawer ul li a', $toolbar).hover(function () {
          $(this).css('background-color', changeColor(environment_color, 0.1, true)).css('color', changeColor(environment_text_color, 0.1, true));
        }, function () {
          $(this).css('background-color', changeColor(environment_color, 0.25)).css('color', changeColor(environment_text_color, 0.25));
          $('div.toolbar-drawer ul li.active-trail a', $toolbar).css('background-color', changeColor(environment_color, 0.1, true)).css('color', changeColor(environment_text_color, 0.1, true));
        });
        $('div.toolbar-drawer ul li.active-trail a', $toolbar).css('background-image', 'none').css('background-color', changeColor(environment_color, 0.1, true)).css('color', changeColor(environment_text_color, 0.1, true));
        // Move switcher bar to the top
        var $switcher_container = $('.environment-switcher-container', $toolbar);
        var $switcher = $switcher_container.parent().clone();
        $switcher_container.parent().remove();
        $toolbar.prepend($switcher);
        // Add a margin if the Shortcut module toggle button is present.
        if ($('div.toolbar-menu a.toggle', $toolbar).length > 0) {
          $('div.toolbar-menu', $toolbar).css('padding-right', 40);
        }
      };
    }
  };

  Drupal.behaviors.environment_indicatorTinycon = {
    attach: function (context, settings) {
      if (typeof(settings.environment_indicator) != 'undefined' &&
          typeof(settings.environment_indicator.addFavicon) != 'undefined' &&
          settings.environment_indicator.addFavicon) {
        //Draw favicon label
        Tinycon.setBubble(settings.environment_indicator.faviconLabel);
        Tinycon.setOptions({
          background: settings.environment_indicator.faviconColor,
          colour: settings.environment_indicator.faviconTextColor
        });
      }
    }
  }

  Drupal.behaviors.environment_indicatorAdminMenu = {
    attach: function (context, settings) {
      if (typeof(Drupal.admin) != 'undefined' && typeof(settings.environment_indicator) != 'undefined' && typeof(settings.environment_indicator['toolbar-color']) != 'undefined') {
        // Add the restyling behavior to the admin menu behaviors.
        Drupal.admin.behaviors['environment_indicator'] = function (context, settings) {
          $('#admin-menu, #admin-menu-wrapper', context).css('background-color', settings.environment_indicator['toolbar-color']);
          $('#admin-menu, #admin-menu-wrapper > ul > li:not(.admin-menu-account) > a', context).css('color', settings.environment_indicator['toolbar-text-color']);
          $('#admin-menu .item-list', context).css('background-color', changeColor(settings.environment_indicator['toolbar-color'], 0.15, true));
          $('#admin-menu .item-list ul li:not(.environment-switcher) a', context).css('background-color', settings.environment_indicator['toolbar-color']).css('color', settings.environment_indicator['toolbar-text-color']);
        };
      };
    }
  };

  Drupal.behaviors.environment_indicatorNavbar = {
    attach: function (context, settings) {
      if (typeof(settings.navbar) != 'undefined' && typeof(settings.environment_indicator) != 'undefined' && typeof(settings.environment_indicator['toolbar-color']) != 'undefined') {
        $('#navbar-administration .navbar-bar', context).css('background-color', settings.environment_indicator['toolbar-color']);
        $('#navbar-administration .navbar-tab *:not(select)', context).css('color', settings.environment_indicator['toolbar-text-color']);
      }
    }
  };

  Drupal.behaviors.environment_indicatorSwitcher = {
    attach: function (context, settings) {
      // Check that the links actually point to the current path, if not, fix them
      $('.environment-switcher a', context).click(function (e) {
        e.preventDefault();
        var current_location = window.location;
        window.location.href = current_location.protocol + '//' + e.currentTarget.hostname + current_location.pathname + current_location.search + current_location.hash;
      });
      $('#environment-indicator .environment-indicator-name, #toolbar .environment-indicator-name-wrapper, #navbar-bar .environment-indicator-name-wrapper', context).click(function () {
        $('#environment-indicator .item-list, #toolbar .item-list, #navbar-bar .item-list', context).slideToggle('fast');
      });
      $('#environment-indicator.position-top.fixed-yes').once(function () {
        $('body').css('margin-top', $('#environment-indicator.position-top.fixed-yes').height() + 'px');
      });
      $('#environment-indicator.position-bottom.fixed-yes').once(function () {
        $('body').css('margin-bottom', $('#environment-indicator.position-bottom.fixed-yes').height() + 'px');
      });
    }
  }

  Drupal.behaviors.environment_indicator_admin = {
    attach: function(context, settings) {
      var $picker = $('#environment-indicator-color-picker');
      // Add the farbtastic tie-in
      if ($.isFunction($.farbtastic) && $picker.length > 0) {
        settings.environment_indicator_color_picker = $picker.farbtastic('#ctools-export-ui-edit-item-form #edit-color');
        settings.environment_indicator_text_color_picker = $('#environment-indicator-text-color-picker').farbtastic('#ctools-export-ui-edit-item-form #edit-text-color');
      }
    }
  }

})(jQuery);
;
var pad = function(num, totalChars) {
    var pad = '0';
    num = num + '';
    while (num.length < totalChars) {
        num = pad + num;
    }
    return num;
};

// Ratio is between 0 and 1
var changeColor = function(color, ratio, darker) {
    // Trim trailing/leading whitespace
    color = color.replace(/^\s*|\s*$/, '');

    // Expand three-digit hex
    color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
    );

    // Calculate ratio
    var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '\\s*,\\s*' +
            '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
            '(?:\\s*,\\s*' +
            '(0|1|0?\\.\\d+))?' +
            '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
            /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
            function() {
                return parseInt(arguments[1], 16) + ',' +
                    parseInt(arguments[2], 16) + ',' +
                    parseInt(arguments[3], 16);
            }
        ).split(/,/),
        returnValue;

    // Return RGB(A)
    return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ) + ', ' +
            Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ) +
            (alpha !== null ? ', ' + alpha : '') +
            ')' :
        // Return hex
        [
            '#',
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[0], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[1], 10) + difference, darker ? 0 : 255
            ).toString(16), 2),
            pad(Math[darker ? 'max' : 'min'](
                parseInt(decimal[2], 10) + difference, darker ? 0 : 255
            ).toString(16), 2)
        ].join('');
};
var lighterColor = function(color, ratio) {
    return changeColor(color, ratio, false);
};
var darkerColor = function(color, ratio) {
    return changeColor(color, ratio, true);
};
;
(function ($) {

Drupal.extlink = Drupal.extlink || {};

Drupal.extlink.attach = function (context, settings) {
  if (!settings.hasOwnProperty('extlink')) {
    return;
  }

  // Strip the host name down, removing ports, subdomains, or www.
  var pattern = /^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;
  var host = window.location.host.replace(pattern, '$3$4');
  var subdomain = window.location.host.replace(pattern, '$1');

  // Determine what subdomains are considered internal.
  var subdomains;
  if (settings.extlink.extSubdomains) {
    subdomains = "([^/]*\\.)?";
  }
  else if (subdomain == 'www.' || subdomain == '') {
    subdomains = "(www\\.)?";
  }
  else {
    subdomains = subdomain.replace(".", "\\.");
  }

  // Build regular expressions that define an internal link.
  var internal_link = new RegExp("^https?://" + subdomains + host, "i");

  // Extra internal link matching.
  var extInclude = false;
  if (settings.extlink.extInclude) {
    extInclude = new RegExp(settings.extlink.extInclude.replace(/\\/, '\\'), "i");
  }

  // Extra external link matching.
  var extExclude = false;
  if (settings.extlink.extExclude) {
    extExclude = new RegExp(settings.extlink.extExclude.replace(/\\/, '\\'), "i");
  }

  // Extra external link CSS selector exclusion.
  var extCssExclude = false;
  if (settings.extlink.extCssExclude) {
    extCssExclude = settings.extlink.extCssExclude;
  }

  // Extra external link CSS selector explicit.
  var extCssExplicit = false;
  if (settings.extlink.extCssExplicit) {
    extCssExplicit = settings.extlink.extCssExplicit;
  }

  // Find all links which are NOT internal and begin with http as opposed
  // to ftp://, javascript:, etc. other kinds of links.
  // When operating on the 'this' variable, the host has been appended to
  // all links by the browser, even local ones.
  // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
  // available in jQuery 1.0 (Drupal 5 default).
  var external_links = new Array();
  var mailto_links = new Array();
  $("a:not(." + settings.extlink.extClass + ", ." + settings.extlink.mailtoClass + "), area:not(." + settings.extlink.extClass + ", ." + settings.extlink.mailtoClass + ")", context).each(function(el) {
    try {
      var url = this.href.toLowerCase();
      if (url.indexOf('http') == 0
        && ((!url.match(internal_link) && !(extExclude && url.match(extExclude))) || (extInclude && url.match(extInclude)))
        && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
        && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
        external_links.push(this);
      }
      // Do not include area tags with begin with mailto: (this prohibits
      // icons from being added to image-maps).
      else if (this.tagName != 'AREA' 
        && url.indexOf('mailto:') == 0 
        && !(extCssExclude && $(this).parents(extCssExclude).length > 0)
        && !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
        mailto_links.push(this);
      }
    }
    // IE7 throws errors often when dealing with irregular links, such as:
    // <a href="node/10"></a> Empty tags.
    // <a href="http://user:pass@example.com">example</a> User:pass syntax.
    catch (error) {
      return false;
    }
  });

  if (settings.extlink.extClass) {
    Drupal.extlink.applyClassAndSpan(external_links, settings.extlink.extClass);
  }

  if (settings.extlink.mailtoClass) {
    Drupal.extlink.applyClassAndSpan(mailto_links, settings.extlink.mailtoClass);
  }

  if (settings.extlink.extTarget) {
    // Apply the target attribute to all links.
    $(external_links).attr('target', settings.extlink.extTarget);
  }

  Drupal.extlink = Drupal.extlink || {};

  // Set up default click function for the external links popup. This should be
  // overridden by modules wanting to alter the popup.
  Drupal.extlink.popupClickHandler = Drupal.extlink.popupClickHandler || function() {
    if (settings.extlink.extAlert) {
      return confirm(settings.extlink.extAlertText);
    }
   }

  $(external_links).click(function(e) {
    return Drupal.extlink.popupClickHandler(e);
  });
};

/**
 * Apply a class and a trailing <span> to all links not containing images.
 *
 * @param links
 *   An array of DOM elements representing the links.
 * @param class_name
 *   The class to apply to the links.
 */
Drupal.extlink.applyClassAndSpan = function (links, class_name) {
  var $links_to_process;
  if (Drupal.settings.extlink.extImgClass){
    $links_to_process = $(links);
  }
  else {
    var links_with_images = $(links).find('img').parents('a');
    $links_to_process = $(links).not(links_with_images);
  }
  $links_to_process.addClass(class_name);
  var i;
  var length = $links_to_process.length;
  for (i = 0; i < length; i++) {
    var $link = $($links_to_process[i]);
    if ($link.css('display') == 'inline' || $link.css('display') == 'inline-block') {
      if (class_name == Drupal.settings.extlink.mailtoClass) {
        $link.append('<span class="' + class_name + '"><span class="element-invisible"> ' + Drupal.settings.extlink.mailtoLabel + '</span></span>');
      }
      else {
        $link.append('<span class="' + class_name + '"><span class="element-invisible"> ' + Drupal.settings.extlink.extLabel + '</span></span>');
      }
    }
  }
};

Drupal.behaviors.extlink = Drupal.behaviors.extlink || {};
Drupal.behaviors.extlink.attach = function (context, settings) {
  // Backwards compatibility, for the benefit of modules overriding extlink
  // functionality by defining an "extlinkAttach" global function.
  if (typeof extlinkAttach === 'function') {
    extlinkAttach(context);
  }
  else {
    Drupal.extlink.attach(context, settings);
  }
};

})(jQuery);
;
