var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
  var currentWidth = $('body').outerWidth();
  resizeByWidth = prevWidth !== currentWidth;
  if (resizeByWidth) {
    $(window).trigger('resizeByWidth');
    prevWidth = currentWidth;
  }
});

var debouncedresizeByWidth = true;

var debouncedPrevWidth = -1;
$(window).on('debouncedresize', function () {
  var currentWidth = $('body').outerWidth();
  debouncedresizeByWidth = debouncedPrevWidth !== currentWidth;
  if (resizeByWidth) {
    $(window).trigger('debouncedresizeByWidth');
    debouncedPrevWidth = currentWidth;
  }
});

var DESKTOP = device.desktop();
var MOBILE = device.mobile();
var TABLET = device.tablet();
var thisIsHomePage = $('.home-page').length;
var mediaTablet = 992;
var prodCardMediaWidth = 992;

(function () {
  function lazyLoadPCard() {
    return new LazyLoad({
      elements_selector: ".p-card-lazy-js"
    });
  }

  var pCardLazy = lazyLoadPCard();
  pCardLazy.destroy();
  var destroyed = true;

  $(window).on('debouncedresize', function () {
    if (window.innerWidth < prodCardMediaWidth) {
      destroyed || pCardLazy.destroy();
      destroyed = true;
    } else {
      destroyed && (pCardLazy = lazyLoadPCard());
      destroyed = false;
    }
  }).resize();
})();

function placeholderInit() {
  $('[placeholder]').placeholder();
}

function printShow() {
  $('.view-print').on('click', function (e) {
    e.preventDefault();
    window.print();
  })
}

function inputToggleFocusClass() {
  var $inputs = $('.field-effects-js');

  if ($inputs.length) {
    var $fieldWrap = $('.input-wrap');
    var $selectWrap = $('.select');
    var classFocus = 'input--focus';

    $inputs.focus(function () {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      $currentField.addClass(classFocus);
      $currentField.prev('label').addClass(classFocus);
      $currentField.closest($selectWrap).prev('label').addClass(classFocus);
      $currentFieldWrap.addClass(classFocus);
      $currentFieldWrap.find('label').addClass(classFocus);

    }).blur(function () {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      $currentField.removeClass(classFocus);
      $currentField.prev('label').removeClass(classFocus);
      $currentField.closest($selectWrap).prev('label').removeClass(classFocus);
      $currentFieldWrap.removeClass(classFocus);
      $currentFieldWrap.find('label').removeClass(classFocus);

    });
  }
}

function inputHasValueClass() {
  var $inputs = $('.field-effects-js');

  if ($inputs.length) {
    var $fieldWrap = $('.input-wrap');
    var $selectWrap = $('.select');
    var classHasValue = 'input--has-value';

    $.each($inputs, function () {
      switchHasValue.call(this);
    });

    $inputs.on('keyup change', function () {
      switchHasValue.call(this);
    });

    function switchHasValue() {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      if ($currentField.val().length === 0) {
        $currentField.removeClass(classHasValue);
        $currentField.prev('label').removeClass(classHasValue);
        $currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
        $currentFieldWrap.removeClass(classHasValue);
        $currentFieldWrap.find('label').removeClass(classHasValue);
      } else if (!$currentField.hasClass(classHasValue)) {
        $currentField.addClass(classHasValue);
        $currentField.prev('label').addClass(classHasValue);
        $currentField.closest($selectWrap).prev('label').addClass(classHasValue);
        $currentFieldWrap.addClass(classHasValue);
        $currentFieldWrap.find('label').addClass(classHasValue);
      }
    }
  }
}

function inputFilledClass() {
  var $fieldWrap = $('.field-effects-js');

  if ($fieldWrap.length) {
    var $inputsAll = $fieldWrap.find('input[type="email"], input[type="search"], :text, textarea, select');
    var _classFilled = 'input--filled';

    $inputsAll.focus(function () {
      var $thisField = $(this);

      $thisField
        .closest($fieldWrap)
        .addClass(_classFilled);

    }).blur(function () {
      var $thisField = $(this);

      if ($thisField.val() === '') {
        $thisField
          .closest($fieldWrap)
          .removeClass(_classFilled);
      }
    });

    function switchHasValue() {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      $currentFieldWrap.removeClass(_classFilled);

      if ($currentField.val() !== '') {
        $currentFieldWrap.addClass(_classFilled);
      }
    }

    $.each($inputsAll, function () {
      switchHasValue.call(this);
    });

    $inputsAll.on('change', function () {
      switchHasValue.call(this);
    });
  }
}


function customSelect(select) {
  $.each(select, function () {
    var $thisSelect = $(this);
    $thisSelect.select2({
      language: "ru",
      width: '100%',
      containerCssClass: 'cselect-head',
      dropdownCssClass: 'cselect-drop'
    });
  })
}

function fileInput() {
  $('.upload-file').each(function () {
    $(this).filer({
      changeInput: '' +
        '<div class="jFiler-input-dragDrop">' +
        '<div class="jFiler-input-inner">' +
        '<div class="jFiler-input-icon">' +
        '<i class="icon-jfi-cloud-up-o"></i>' +
        '</div>' +
        '<div class="jFiler-input-text">' +
        '<strong>Кликните по полю <br> или перетащите сюда файл</strong>' +
        '</div>' +
        '</div>' +
        '</div>',
      showThumbs: true,
      theme: "dragdropbox",
      captions: {
        button: "Выберите файлы",
        feedback: "Выберите файлы для загрузки",
        feedback2: "Файлы выбраны",
        drop: "Чтобы добавить файл, перетащите его сюда",
        removeConfirmation: "Вы уверены, что хотите удалить этот файл?",
        errors: {
          filesLimit: "Максиальное количество файлов: {{fi-limit}}",
          filesType: "Загружать можно только изображения!",
          filesSize: "{{fi-name}} слишком велик! Пожалуйста, загрузите файл до {{fi-maxSize}} MB.",
          filesSizeAll: "Файлы, которые Вы выбрали слишком велики! Пожалуйста, загружайте файлы до {{fi-maxSize}} MB."
        }
      },
      templates: {
        box: '<ul class="jFiler-items-list jFiler-items-default list-reset"></ul>'
      },
      addMore: true,
      allowDuplicates: false,
      clipBoardPaste: true,
      dragDrop: {
        dragEnter: null,
        dragLeave: null,
        drop: null,
        dragContainer: null
      }
    });
  });
}

function fullPageInitial() {

  var $mainSections = $('.main-sections-js');
  if ($mainSections.length) {
    $mainSections.fullpage({
      verticalCentered: false,
      sectionSelector: '.main-section-js',
      scrollingSpeed: 600,
      recordHistory: true,
      responsiveWidth: 1200, // and add css rule .fp-enabled
      responsiveHeight: 400, // and add css rule .fp-enabled

      navigation: true,
      navigationPosition: null
      , onLeave: function (index, nextIndex, direction) {
        $('html').toggleClass('scroll-is-bottom', (direction === "down" && index === 4))
      }
    });
  }

  $('.move-next-section-js').on('click', function (e) {
    e.preventDefault();

    if ($mainSections.length) {
      $.fn.fullpage.moveSectionDown();
    }
  });

}


function bottoming() {
  $('html').toggleClass('scroll-is-bottom', ($(window).scrollTop() === $(document).height() - $(window).height()))
}

$(window).on('load debouncedresize scroll', function () {
  bottoming();
});

(function ($) {
  var HoverClass = function (settings) {
    var options = $.extend({
      container: 'ul',
      item: 'li',
      drop: 'ul'
    }, settings || {});

    var self = this;
    self.options = options;

    var container = $(options.container);
    self.$container = container;
    self.$item = $(options.item, container);
    self.$drop = $(options.drop, container);
    self.$html = $('html');

    self.modifiers = {
      hover: 'hover',
      hoverNext: 'hover_next',
      hoverPrev: 'hover_prev'
    };

    self.addClassHover();

    if (!DESKTOP) {
      $(window).on('debouncedresize', function () {
        self.removeClassHover();
      });
    }
  };

  HoverClass.prototype.addClassHover = function () {
    var self = this,
      _hover = this.modifiers.hover,
      _hoverNext = this.modifiers.hoverNext,
      _hoverPrev = this.modifiers.hoverPrev,
      $item = self.$item,
      item = self.options.item,
      $container = self.$container;

    if (!DESKTOP) {

      $container.on('click', '' + item + '', function (e) {
        var $currentAnchor = $(this);
        var currentItem = $currentAnchor.closest($item);

        if (!currentItem.has(self.$drop).length) {
          return;
        }

        e.stopPropagation();

        if (currentItem.hasClass(_hover)) {


          currentItem.removeClass(_hover).find('.' + _hover + '').removeClass(_hover);

          return;
        }


        $('.' + _hover + '').not($currentAnchor.parents('.' + _hover + ''))
          .removeClass(_hover)
          .find('.' + _hover + '')
          .removeClass(_hover);
        currentItem.addClass(_hover);

        e.preventDefault();
      });

      $container.on('click', '' + self.options.drop + '', function (e) {
        e.stopPropagation();
      });

      $(document).on('click', function () {
        $item.removeClass(_hover);
      });

    } else {
      $container.on('mouseenter', '' + item + '', function () {

        var currentItem = $(this);

        if (currentItem.prop('hoverTimeout')) {
          currentItem.prop('hoverTimeout', clearTimeout(currentItem.prop('hoverTimeout')));
        }

        currentItem.prop('hoverIntent', setTimeout(function () {

          currentItem.addClass(_hover);
          currentItem.next().addClass(_hoverNext);
          currentItem.prev().addClass(_hoverPrev);

        }, 50));

      }).on('mouseleave', '' + item + '', function () {

        var currentItem = $(this);

        if (currentItem.prop('hoverIntent')) {
          currentItem.prop('hoverIntent', clearTimeout(currentItem.prop('hoverIntent')));
        }

        currentItem.prop('hoverTimeout', setTimeout(function () {

          currentItem.removeClass(_hover);
          currentItem.next().removeClass(_hoverNext);
          currentItem.prev().removeClass(_hoverPrev);
        }, 50));

      });

    }
  };

  HoverClass.prototype.removeClassHover = function () {
    var self = this;
    self.$item.removeClass(self.modifiers.hover);
  };

  window.HoverClass = HoverClass;

}(jQuery));

function initHoverClass() {
  if ($('.menu-list').length) {
    new HoverClass({
      container: '.menu-list',
      drop: '.js-nav-drop'
    });
  }
}


(function ($) {
  var defaults = {
    mainContainer: 'html', // container wrapping all elements
    navContainer: null, // main navigation container
    navMenu: null, // menu
    btnMenu: null, // element which opens or switches menu
    btnClose: null, // element which closes a menu
    navMenuItem: null,
    navMenuAnchor: 'a',
    staggerElement: null,
    overlayClass: 'popup-overlay', // overlay's class
    overlayAppendTo: 'body', // where to place overlay
    overlayAlpha: 0.8,
    overlayIndex: 997,
    classReturn: null,
    overlayBoolean: true,
    animationType: 'ltr', // rtl or ltr, ttb
    animationScale: 0.85, // default scale for animation
    animationSpeed: 300, // animation speed of the main element
    animationSpeedOverlay: null, // animation speed of the overlay
    alpha: 1,
    ease: Cubic.easeOut, // animation (gsap) https://greensock.com/customease
    minWidthItem: 100,
    mediaWidth: null,
    closeOnResize: true,
    cssScrollBlocked: false, // add class to body for blocked scroll
    closeEsc: true, // close popup on click Esc,
    closeOutside: true, // close popup on click Outside,
    activeClass: 'active',
    openedClass: 'extra-popup-opened',
    beforeOpenClass: 'extra-popup-before-open',
    extraPopupBeforeOpen: null
  };

  var ExtraPopup = function (settings) {
    var options = $.extend(defaults, settings || {});

    var container = $(options.navContainer),
      _animateSpeed = options.animationSpeed;

    var self = this;
    self.options = options;
    self.$mainContainer = $(options.mainContainer);            // . по умолчанию <html></html>
    self.$navMenu = $(options.navMenu);
    self.$btnMenu = $(options.btnMenu);
    self.$btnClose = $(options.btnClose);
    self.$navContainer = container;
    self.$navMenuItem = $(options.navMenuItem, container);     // Пункты навигации;
    self.$navMenuAnchor = $(options.navMenuAnchor, container); // Элемент, по которому производится событие (клик);
    self.$staggerElement = options.staggerElement;  //Элементы в стеке, к которым применяется анимация. По умолчанию null;

    self._animationType = options.animationType;
    self._animationScale = options.animationScale;
    self._animateSpeed = _animateSpeed;
    self.ease = options.ease;
    self.alpha = options.alpha;

    self.overlayBoolean = options.overlayBoolean;
    self.overlayAppendTo = options.overlayAppendTo;
    self.$overlay = $('<div class="' + options.overlayClass.substring(0) + '"></div>'); // Темплейт оверлея;
    self._overlayAlpha = options.overlayAlpha;
    self._overlayIndex = options.overlayIndex;
    self._animateSpeedOverlay = options.animationSpeedOverlay || _animateSpeed;
    self._minWidthItem = options.minWidthItem;
    self._mediaWidth = options.mediaWidth;
    self.closeOnResize = options.closeOnResize;
    self.cssScrollBlocked = options.cssScrollBlocked;
    self.closeEsc = options.closeEsc;
    self.closeOutside = options.closeOutside;

    self.desktop = device.desktop();

    self.modifiers = {
      active: options.activeClass,
      opened: options.openedClass,
      beforeOpen: options.beforeOpenClass
    };

    self.outsideClick();
    if (self._mediaWidth === null || window.innerWidth < self._mediaWidth) {
      self.preparationAnimation();
    }
    self.toggleMenu();
    self.eventsbtnClose();
    self.clearStyles();
    self.closeNavOnEsc();
    self.closeNavMethod();
  };

  ExtraPopup.prototype.navIsOpened = false;

  ExtraPopup.prototype.createOverlay = function () {
    var self = this,
      $overlay = self.$overlay;

    $overlay.appendTo(self.overlayAppendTo);

    TweenMax.set($overlay, {
      autoAlpha: 0,
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      background: '#000',
      'z-index': self._overlayIndex,
      onComplete: function () {
        TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {autoAlpha: self._overlayAlpha});
      }
    });
  };

  ExtraPopup.prototype.toggleOverlay = function (close) {
    var self = this,
      $overlay = self.$overlay,
      ease = self.ease;

    if (close === false) {
      TweenMax.to($overlay, self._animateSpeedOverlay / 1000, {
        autoAlpha: 0,
        ease: ease,
        onComplete: function () {
          $overlay.remove();
        }
      });
      return false;
    }

    self.createOverlay();
  };

  ExtraPopup.prototype.toggleMenu = function () {
    var self = this,
      $buttonMenu = self.$btnMenu;

    $buttonMenu.on('click', function (e) {

      if (self.navIsOpened) {
        self.closeNav();
      } else {
        self.openNav();
      }

      e.preventDefault();
      e.stopPropagation();
    });
  };

  ExtraPopup.prototype.eventsbtnClose = function () {

    var self = this;

    self.$btnClose.on('click', function (e) {
      e.preventDefault();

      if (self.navIsOpened) {
        self.closeNav();
      }

      e.stopPropagation();
    });
  };

  ExtraPopup.prototype.outsideClick = function () {
    var self = this;

    if (!self.closeOutside) {
      return;
    }

    $(document).on('click', function () {
      if (self.navIsOpened) {
        self.closeNav();
      }
    });

    self.$navContainer.on('click', function (e) {
      if (self.navIsOpened) {
        e.stopPropagation();
      }
    })
  };

  ExtraPopup.prototype.closeNavOnEsc = function () {
    var self = this;

    $(document).keyup(function (e) {
      if (self.navIsOpened && self.closeEsc && e.keyCode === 27) {
        self.closeNav();
      }
    });
  };

  ExtraPopup.prototype.closeNavMethod = function () {
    var self = this;

    self.$navContainer.on('extraPopupClose', function () {
      if (self.navIsOpened) {
        self.closeNav();
      }
    })
  };

  ExtraPopup.prototype.openNav = function () {
    var self = this,
      $html = self.$mainContainer,
      $navContainer = self.$navContainer,
      $buttonMenu = self.$btnMenu,
      $buttonClose = self.$btnClose,
      _animationSpeed = self._animateSpeedOverlay,
      $staggerElement = self.$staggerElement,
      ease = self.ease;

    var modifiers = self.modifiers;
    var classBeforeOpen = modifiers.beforeOpen;
    var classAfterOpen = modifiers.opened;

    $navContainer.trigger('extraPopupBeforeOpen');

    $html.addClass(classBeforeOpen);
    $buttonMenu.addClass(modifiers.active);
    $buttonClose.addClass(classBeforeOpen);

    if (self.cssScrollBlocked) {
      self.cssScrollFixed();
    }

    $navContainer.css({
      '-webkit-transition-duration': '0s',
      'transition-duration': '0s'
    });

    if ($staggerElement) {
      TweenMax.staggerTo($staggerElement, 0.85, {
        autoAlpha: 1,
        scale: 1,
        y: 0,
        yPercent: 0,
        xPercent: 0,
        ease: ease
      }, 0.1);
    }

    TweenMax.to($navContainer, _animationSpeed / 1000, {
      yPercent: 0,
      xPercent: 0,
      scale: 1,
      autoAlpha: 1,
      ease: ease,
      onComplete: function () {
        $html.addClass(classAfterOpen);
        $buttonClose.addClass(classAfterOpen);

      }
    });

    if (self.overlayBoolean) {
      self.toggleOverlay();
    }

    self.navIsOpened = true;
  };

  ExtraPopup.prototype.closeNav = function () {
    var self = this,
      $html = self.$mainContainer,
      $navContainer = self.$navContainer,
      $buttonMenu = self.$btnMenu,
      $buttonClose = self.$btnClose,
      $staggerElement = self.$staggerElement,
      _animationSpeed = self._animateSpeedOverlay,
      _mediaWidth = self._mediaWidth,
      _animationType = self._animationType,
      ease = self.ease,
      alpha = self.alpha;

    var modifiers = self.modifiers;
    var classAfterOpen = modifiers.opened;
    var classBeforeOpen = modifiers.beforeOpen;

    $html.removeClass(classAfterOpen);
    $html.removeClass(classBeforeOpen);
    $buttonMenu.removeClass(modifiers.active);
    $buttonClose.removeClass(classAfterOpen);
    $buttonClose.removeClass(classBeforeOpen);

    if (self.overlayBoolean) {
      self.toggleOverlay(false);
    }

    var duration = _animationSpeed / 1000;

    if ($staggerElement) {
      TweenMax.staggerTo($staggerElement, 0.85, {
        autoAlpha: alpha,
        xPercent: -100
      }, 0.1);
    }

    if (_animationType === 'ltr') {
      TweenMax.to($navContainer, duration, {
        xPercent: -100,
        ease: ease,
        onComplete: function () {
          if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
            self.preparationAnimation();
          }

          TweenMax.set($navContainer, {
            autoAlpha: alpha
          });


          if (self.cssScrollBlocked) {
            self.cssScrollUnfixed();
          }
        }
      });

    } else if (_animationType === 'rtl') {
      TweenMax.to($navContainer, duration, {
        xPercent: 100,
        ease: ease,
        onComplete: function () {
          if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
            self.preparationAnimation();
          }

          TweenMax.set($navContainer, {
            autoAlpha: alpha
          });


          if (self.cssScrollBlocked) {
            self.cssScrollUnfixed();
          }
        }
      });

    } else if (_animationType === 'ttb') {
      TweenMax.to($navContainer, duration, {
        yPercent: -100,
        ease: ease,
        onComplete: function () {
          if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
            self.preparationAnimation();
          }

          TweenMax.set($navContainer, {
            autoAlpha: alpha
          });

          if (self.cssScrollBlocked) {
            self.cssScrollUnfixed();
          }
        }
      });

    } else if (_animationType === 'surface') {
      TweenMax.to($navContainer, duration, {
        scale: self._animationScale,
        autoAlpha: alpha,
        ease: ease,
        onComplete: function () {
          if (_mediaWidth === null || window.innerWidth < _mediaWidth) {
            self.preparationAnimation();
          }


          if (self.cssScrollBlocked) {
            self.cssScrollUnfixed();
          }
        }
      });

    } else {
      console.error('Type animation "' + _animationType + '" is wrong!');
      return;
    }

    self.navIsOpened = false;
  };

  ExtraPopup.prototype.preparationAnimation = function () {
    var self = this;

    var $navContainer = self.$navContainer,
      $staggerElement = self.$staggerElement,
      _animationType = self._animationType,
      alpha = self.alpha;

    if ($staggerElement) {
      TweenMax.set($staggerElement, {
        autoAlpha: alpha,
        xPercent: -100
      });
    }

    if (_animationType === 'ltr') {
      TweenMax.set($navContainer, {
        xPercent: -100,
        autoAlpha: alpha,
        onComplete: function () {
          $navContainer.show(0);
        }
      });

    } else if (_animationType === 'rtl') {
      TweenMax.set($navContainer, {
        xPercent: 100,
        autoAlpha: alpha,
        onComplete: function () {
          $navContainer.show(0);
        }
      });

    } else if (_animationType === 'ttb') {
      TweenMax.set($navContainer, {
        yPercent: -100,
        autoAlpha: alpha,
        onComplete: function () {
          $navContainer.show(0);
        }
      });

    } else if (_animationType === 'surface') {
      TweenMax.set($navContainer, {
        scale: self._animationScale,
        autoAlpha: alpha,
        onComplete: function () {
          $navContainer.show(0);
        }
      });

    } else {
      console.error('Type animation "' + _animationType + '" is wrong!');
    }
  };

  ExtraPopup.prototype.cssScrollFixed = function () {
    $('html').addClass('css-scroll-fixed');
    $(document).trigger('extraPopupScrollFixed');
  };

  ExtraPopup.prototype.cssScrollUnfixed = function () {
    $('html').removeClass('css-scroll-fixed');
    $(document).trigger('extraPopupScrollUnfixed');
  };

  ExtraPopup.prototype.clearStyles = function () {
    var self = this,
      $btnMenu = self.$btnMenu,
      $navContainer = self.$navContainer,
      $staggerElement = self.$staggerElement;

    if (self.closeOnResize === true) {

      $(window).on('resizeByWidth', function () {
        if (self.navIsOpened) {
          if (!$btnMenu.is(':visible')) {
            $navContainer.attr('style', '');
            $staggerElement.attr('style', '');
            self.closeNav();
          } else {
            self.closeNav();
          }
        }
      });

    }
  };

  window.ExtraPopup = ExtraPopup;

}(jQuery));

function shuttersInit() {

  $(document).on('extraPopupScrollFixed', function () {
    if ($('.main-sections-js').length) {
      $.fn.fullpage.setAllowScrolling(false); // blocked fullpage scroll
    }
  });

  $(document).on('extraPopupScrollUnfixed', function () {
    if ($('.main-sections-js').length) {
      $.fn.fullpage.setAllowScrolling(true); // unblocked fullpage scroll
    }
  });

  var navShutterClass = '.nav-shutter-js';
  var $navShutter = $(navShutterClass);

  if ($navShutter.length) {

    new ExtraPopup({
      navContainer: navShutterClass,
      navMenu: '.nav__list',
      btnMenu: '.btn-nav-js',
      btnClose: '.btn-shutter-close-js',
      overlayClass: 'shutter-overlay shutter-overlay--nav',
      overlayAppendTo: 'body',
      closeOnResize: false,
      animationSpeed: 200,
      overlayAlpha: 0.35,
      overlayIndex: 999,
      cssScrollBlocked: true,
      openedClass: 'shutter--opened',
      beforeOpenClass: 'shutter--before-open',
      ease: 'Power2.easeInOut'
    });
  }

  var searchShutterClass = '.search-shutter-js';
  var $searchShutter = $(searchShutterClass);

  if ($searchShutter.length) {

    new ExtraPopup({
      navContainer: searchShutterClass,
      btnMenu: '.btn-search-open-js',
      btnClose: '.btn-shutter-close-js',
      overlayClass: 'shutter-overlay shutter-overlay--search',
      overlayAppendTo: 'body',
      closeOnResize: false,
      animationType: 'ttb',
      animationSpeed: 200,
      overlayAlpha: 0.35,
      overlayIndex: 999,
      cssScrollBlocked: true,
      openedClass: 'shutter--opened',
      beforeOpenClass: 'shutter--before-open',
      ease: 'Power2.easeInOut'
    });
  }

  var bagShutterClass = '.bag-shutter-js';
  var $bagShutter = $(bagShutterClass);

  if ($bagShutter.length) {

    new ExtraPopup({
      navContainer: bagShutterClass,
      btnMenu: '.btn-bag-open-js',
      btnClose: '.btn-shutter-close-js',
      overlayClass: 'shutter-overlay shutter-overlay--bag',
      overlayAppendTo: 'body',
      closeOnResize: false,
      animationType: 'rtl',
      animationSpeed: 200,
      overlayAlpha: 0.35,
      overlayIndex: 999,
      cssScrollBlocked: true,
      openedClass: 'shutter--opened',
      beforeOpenClass: 'shutter--before-open',
      ease: 'Power2.easeInOut'
    });
  }

  var mAsideShutterClass = '.m-aside-shutter-js';
  var $mAsideShutter = $(mAsideShutterClass);

  if ($mAsideShutter.length) {

    new ExtraPopup({
      navContainer: mAsideShutterClass,
      btnMenu: '.btn-m-aside-open-js',
      btnClose: '.btn-shutter-close-js',
      overlayClass: 'shutter-overlay shutter-overlay--m-aside',
      overlayAppendTo: '.m-container',
      overlayAlpha: 0.35,
      overlayIndex: 999,
      closeOnResize: false,
      animationType: 'rtl',
      animationSpeed: 200,
      cssScrollBlocked: true,
      openedClass: 'shutter--opened',
      beforeOpenClass: 'shutter--before-open',
      ease: 'Power2.easeInOut'
    });
  }

  $searchShutter.on('extraPopupBeforeOpen', function () {
    $navShutter.trigger('extraPopupClose');
    $bagShutter.trigger('extraPopupClose');
    $mAsideShutter.trigger('extraPopupClose');

    $(this).find('.search-form__input').focus();
  });

  $navShutter.on('extraPopupBeforeOpen', function () {
    $searchShutter.trigger('extraPopupClose');
    $bagShutter.trigger('extraPopupClose');
    $mAsideShutter.trigger('extraPopupClose');
  });

  $bagShutter.on('extraPopupBeforeOpen', function () {
    $searchShutter.trigger('extraPopupClose');
    $navShutter.trigger('extraPopupClose');
    $mAsideShutter.trigger('extraPopupClose');
  });

  $mAsideShutter.on('extraPopupBeforeOpen', function () {
    $searchShutter.trigger('extraPopupClose');
    $navShutter.trigger('extraPopupClose');
    $bagShutter.trigger('extraPopupClose');
  });
}

function tabSwitcher() {


  var $tabWrapper = $('.tabs-js');
  var $container = $('.tab-container-js');

  if (!$container.length) return false;

  if ($tabWrapper.length) {
    var $anchor = $('.tab-anchor-js'),
      $content = $('.tab-content-js'),
      $simpleAccordionHand = $('.tab-link-js'),
      activeClass = 'active-tab',
      collapseAllClass = 'collapsed-all-tab',
      idPrefix = 'activeIs',
      animationSpeed = 0.2,
      animationHeightSpeed = 0.08;

    $.each($tabWrapper, function () {
      var $currentContainer = $(this),
        $currentAnchor = $currentContainer.find($anchor),
        $thisContainer = $currentContainer.find($container),
        $currentContent = $currentContainer.find($content);


      if ($currentContainer.find('.' + activeClass).length > 0) {
        var initialTab = $currentContainer.find('.' + activeClass).attr('href').substring(1);
      }
      if ($currentContainer.data('collapsed') === true) {
        $currentContainer.addClass(collapseAllClass);
      }
      var valDataAutoHeight = $currentContainer.data('auto-height');
      var thisAutoHeight = valDataAutoHeight !== false;
      var activeTab = false;

      function prepareTabsContent() {
        $thisContainer.css({
          'display': 'block',
          'position': 'relative',
          'overflow': 'hidden'
        });

        $currentContent.css({
          'position': 'absolute',
          'left': 0,
          'top': 0,
          'width': '100%',
          'z-index': -1
        });

        switchContent();
      }

      prepareTabsContent();

      $currentAnchor.on('click', function (e) {
        e.preventDefault();

        var $self = $(this),
          selfTab = $self.attr('href').substring(1);

        if ($currentContainer.data('collapsed') === true && activeTab === selfTab) {

          toggleActiveClass();
          toggleContent(false);
          changeHeightContainer(false);

          return;
        }

        if (activeTab === selfTab) return false;

        initialTab = selfTab;

        switchContent();
      });

      $currentAnchor.eq(0).on('tabSwitcherCollapse', function () {
        var $self = $(this);
        var selfTab = $self.attr('href').substring(1);

        if (activeTab === selfTab) {
          toggleActiveClass();
          toggleContent(false);
          changeHeightContainer(false);
        }
      });

      function switchContent() {
        if (initialTab) {
          toggleContent();
          changeHeightContainer();
          toggleActiveClass();
        }
      }

      function toggleContent() {

        thisAutoHeight && $thisContainer.css('height', $thisContainer.outerHeight());

        $currentContent.css({
          'position': 'absolute',
          'left': 0,
          'top': 0
        });

        TweenMax.to($currentContent, animationSpeed, {
          autoAlpha: 0
        });

        if (arguments[0] === false) return;

        var $initialContent = $currentContent.filter('[id="' + initialTab + '"]');

        $initialContent.css('z-index', 2);

        TweenMax.to($initialContent, animationSpeed, {
          autoAlpha: 1
        });
      }

      function changeHeightContainer() {
        var $initialContent = $currentContent.filter('[id="' + initialTab + '"]');

        if (arguments[0] === false) {
          TweenMax.to($thisContainer, animationHeightSpeed, {
            'height': 0
          });

          return;
        }

        if (thisAutoHeight) {
          TweenMax.to($thisContainer, animationHeightSpeed, {
            'height': $initialContent.outerHeight(),
            onComplete: function () {

              thisAutoHeight && $thisContainer.css('height', '');

              $initialContent.css({
                'position': 'relative',
                'left': 'auto',
                'right': 'auto'
              });

              $tabWrapper.trigger('afterChange.tabSwitcher');
            }
          });
        }

        $initialContent.css({
          'position': 'relative',
          'left': 'auto',
          'right': 'auto'
        })
      }

      function toggleActiveClass() {
        $currentAnchor.removeClass(activeClass);
        $currentContent.removeClass(activeClass);
        if ($currentContainer.data('collapsed') === true) {
          $currentContainer.addClass(collapseAllClass);
        }

        if (activeTab) {
          $currentContainer.removeClass(idPrefix + '-' + activeTab);
        }

        if (initialTab !== activeTab) {

          $currentAnchor.filter('[href="#' + initialTab + '"]').addClass(activeClass);
          $currentContent.filter('[id="' + initialTab + '"]').addClass(activeClass);
          $currentContainer.addClass(idPrefix + '-' + initialTab);
          $currentContainer.removeClass(collapseAllClass);

          activeTab = initialTab;

          return false;
        }

        activeTab = false;
      }


    });

    $(window).on('debouncedresizeByWidth', function () {
      $simpleAccordionHand.each(function () {
        var $thisHand = $(this);

        if ($thisHand.hasClass(activeClass)) {
          $thisHand.next().children().show();
        }
      });
    });

    if ($simpleAccordionHand.length) {

      $simpleAccordionHand.on('click', function (e) {
        e.preventDefault();

        var $curHand = $(this),
          $curPanel = $curHand.next().children();

        if ($curHand.hasClass(activeClass)) {
          $curHand.removeClass(activeClass);
          $curPanel.css({
            'overflow': 'hidden'
          });
          TweenMax.to($curPanel, animationHeightSpeed, {
            autoAlpha: 0,
            height: 0
          });
        } else {
          $curHand.addClass(activeClass);
          TweenMax.to($curPanel, animationHeightSpeed, {
            autoAlpha: 1,
            height: '',
            onComplete: function () {
              $curPanel.css({
                'overflow': '',
                'visibility': '',
                'opacity': ''
              });
            }
          });
        }

      });

      $(window).on('debouncedresizeByWidth', function () {
        $simpleAccordionHand.each(function () {
          var $curHand = $(this),
            $curPanel = $curHand.next().children().show();

          if (!$curHand.hasClass(activeClass)) {
            $curHand.addClass(activeClass);
            $curPanel.css({
              'height': '',
              'overflow': '',
              'visibility': '',
              'opacity': ''
            });
          }
        });
        $('#shops-map').trigger('yMapRedraw');
      });
    }
  }
}

;(function ($) {
  var defaults = {
    opener: '.ms-drop__opener-js',
    openerText: 'span',
    drop: '.ms-drop__drop-js',
    dropOption: '.ms-drop__drop-js a',
    dropOptionText: 'span',
    initClass: 'ms-drop--initialized',
    outsideClick: true, // Close all if outside click
    closeAfterSelect: true, // Close drop after selected option
    preventOption: false, // Add preventDefault on click to option
    selectValue: true, // Display the selected value in the opener
    modifiers: {
      isOpen: 'is-open',
      activeItem: 'active-item'
    }
  };

  function MsDrop(element, options) {
    var self = this;

    self.config = $.extend(true, {}, defaults, options);

    self.element = element;

    self.callbacks();
    self.event();
    if (self.config.outsideClick) {
      self.clickOutside();
    }
    self.eventDropItems();
    self.init();
  }

  MsDrop.prototype.callbacks = function () {
    var self = this;
    $.each(self.config, function (key, value) {
      if (typeof value === 'function') {
        self.element.on(key + '.msDrop', function (e, param) {
          return value(e, self.element, param);
        });
      }
    });
  };

  MsDrop.prototype.event = function () {
    var self = this;
    self.element.on('click', self.config.opener, function (event) {
      event.preventDefault();
      var curContainer = $(this).closest(self.element);

      if (curContainer.hasClass(self.config.modifiers.isOpen)) {
        curContainer.removeClass(self.config.modifiers.isOpen);

        self.element.trigger('afterChange.msDrop');
        return;
      }

      self.element.removeClass(self.config.modifiers.isOpen);

      curContainer.addClass(self.config.modifiers.isOpen);

      self.element.trigger('afterChange.msDrop');
    });
  };

  MsDrop.prototype.clickOutside = function () {

    var self = this;
    $(document).on('click', function (event) {
      if ($(event.target).closest(self.element).length) {
        return;
      }

      self.closeDrop();
      event.stopPropagation();
    });

  };

  MsDrop.prototype.closeDrop = function (container) {

    var self = this,
      $element = $(container || self.element);

    if ($element.hasClass(self.config.modifiers.isOpen)) {
      $element.removeClass(self.config.modifiers.isOpen);
    }

  };

  MsDrop.prototype.eventDropItems = function () {

    var self = this;

    self.element.on('click', self.config.dropOption, function (e) {
      var cur = $(this);
      var curParent = cur.parent();

      if (curParent.hasClass(self.config.modifiers.activeItem)) {
        e.preventDefault();
        return;
      }
      if (self.config.preventOption) {
        e.preventDefault();
      }

      var curContainer = cur.closest(self.element);

      curContainer.find(self.config.dropOption).parent().removeClass(self.config.modifiers.activeItem);

      curParent
        .addClass(self.config.modifiers.activeItem);

      if (self.config.selectValue) {
        curContainer
          .find(self.config.opener).find(self.config.openerText)
          .text(cur.find(self.config.dropOptionText).text());
      }

      if (self.config.closeAfterSelect) {
        self.closeDrop();
      }

    });

  };

  MsDrop.prototype.init = function () {

    this.element.addClass(this.config.initClass);

    this.element.trigger('afterInit.msDrop');

  };

  $.fn.msDrop = function (options) {
    'use strict';

    return this.each(function () {
      new MsDrop($(this), options);
    });

  };
})(jQuery);

function toggleDropInit() {
  var $shareContainer = $('.social-share__container-js');
  if ($shareContainer.length) {
    $shareContainer.msDrop({
      opener: '.social-share__opener-js',
      drop: 'social-share__drop-js',
      selectValue: false
    })
  }
}

function menuSwitcher() {
  var $switcher = $('.menu-switcher-js'),
    activeClass = 'active';

  if ($switcher.length) {
    $switcher.find('a').on('click', function (event) {
      var $currentToggleItem = $(this);
      $currentToggleItem.addClass(activeClass).siblings().removeClass(activeClass);
      $switcher.closest('.menu-container-js').find('.menu-panel-js').removeClass(activeClass);
      $('#' + $currentToggleItem.attr('href').substring(1)).addClass(activeClass);

      event.preventDefault();
    });
  }
}

function cardGallery() {

  var $cardGallery = $('.card-gallery-js');

  if ($cardGallery.length) {
    $cardGallery.each(function () {
      var $thisSlider = $(this);
      var $thisBtnNext = $('.swiper-button-next', $thisSlider),
        $thisBtnPrev = $('.swiper-button-prev', $thisSlider),
        $thisFractPag = $('.swiper-pagination', $thisSlider);
      var detach, mediaTablet = 992;

      var params = {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        keyboardControl: false,
        longSwipesRatio: 0.1,
        longSwipesMs: 200,

        nextButton: $thisBtnNext,
        prevButton: $thisBtnPrev,

        pagination: $thisFractPag,
        paginationType: 'fraction',

        onInit: function (swiper) {
        }
      };

      var slider = new Swiper($thisSlider, params);

      var attachTimeout;
      $(window).on('debouncedresize', function () {
        if (window.innerWidth >= prodCardMediaWidth) {
          detach || slider.detachEvents();

          detach = true;
        } else {

          clearTimeout(attachTimeout);

          attachTimeout = setTimeout(function () {
            detach && slider.attachEvents();
            detach && slider.update();

            detach = false;
          }, 200);
        }

      }).resize();
    })
  }
}

function addDataLengthChildren() {
  var $list = $('.list-counter-js');

  $.each($list, function () {
    var $currentList = $(this);

    $currentList.attr('data-length', $currentList.children().length)
  })
}

function equalHeight() {
  var $equalHeight = $('.equal-height-js');

  if ($equalHeight.length) {
    $equalHeight.children().matchHeight({
      byRow: true, property: 'height', target: null, remove: false
    });
  }
}


(function ($) {

  var defaults = {
    anchor: 'a',
    active: 0,
    containerClass: 'toggle-view-initialized',
    dataAttrSwitcher: 'data-toggle-view-switcher',
    dataAttrPanels: 'data-toggle-view-panels',

    activeClass: 'tv-active',
    viewClass: 'tv-alt-view'

  };

  function ToggleView(element, options) {
    var self = this;

    self.config = $.extend(true, {}, defaults, options);

    self.element = element;
    self.anchor = self.element.find(self.config.anchor);
    self.panels = $('[' + self.config.dataAttrPanels + '="' + self.element.attr(self.config.dataAttrSwitcher) + '"]');

    self.callbacks();
    self.event(); // example event
    self.init(); // create DOM structure of the plugins
  }

  ToggleView.prototype.callbacks = function () {
    var self = this;
    $.each(self.config, function (key, value) {
      if (typeof value === 'function') {
        self.element.on(key + '.toggleView', function (e, param) {
          return value(e, self.element, param);
        });
      }
    });
  };

  ToggleView.prototype.event = function () {
    var self = this;

    self.anchor.on('click', function (e) {
      e.preventDefault();
      var currentAnchor = $(this);

      if (currentAnchor.hasClass(self.config.activeClass)) return;

      self.anchor.removeClass(self.config.activeClass);

      currentAnchor.addClass(self.config.activeClass);

      var currentSwitcherAttr = currentAnchor.closest(self.element).attr(self.config.dataAttrSwitcher);

      $('[' + self.config.dataAttrPanels + '="' + currentSwitcherAttr + '"]').toggleClass(self.config.viewClass);

      self.element.trigger('changed.toggleView');
    });
  };

  ToggleView.prototype.init = function () {
    var self = this;

    self.element.addClass(self.config.containerClass);
    var currentSwitcherAttr = self.element.attr(self.config.dataAttrSwitcher);
    $('[' + self.config.dataAttrPanels + '="' + currentSwitcherAttr + '"]').addClass(self.config.containerClass);

    self.element.trigger('created.toggleView');

  };

  $.fn.toggleView = function (options) {
    'use strict';

    new ToggleView(this, options);

    return this;
  };
})(jQuery);

function toggleViewInit() {
  var $toggleViewSwitcherNews = $('.view-switcher-news-js');

  if ($toggleViewSwitcherNews.length) {

    $toggleViewSwitcherNews.toggleView({
      activeClass: 'active',
      viewClass: 'row-view-activated'
    })
  }

}



function sortingOrder() {
  var $sortingContainer = $('.sorting-js');
  var _ascending = 'order-asc',
    _descending = 'order-desc';
  var activeClass = 'active';

  var $sortingItems = $('.sorting-thumbs-js a');
  var $sortingItemParent = $sortingItems.parent();

  $sortingItems.on('click', function (e) {

    var $this = $(this);
    var $thisParent = $this.parent();
    if (!$thisParent.hasClass(activeClass)) {
      $sortingItemParent.removeClass(activeClass);
      $thisParent.addClass(activeClass);

      return;
    }

    var $thisSortingContainer = $this.closest($sortingContainer);

    $thisSortingContainer.toggleClass(_ascending + ' ' + _descending)
  })
}

(function ($) {
  var JsAccordion = function (settings) {
    var options = $.extend(true, {
      accordionContainer: null,
      accordionItem: null,
      accordionHeader: null, // wrap for accordion's switcher
      accordionHand: null, // accordion's switcher
      accordionContent: null,
      indexInit: 0, // if "false", all accordion are closed
      showFromHash: true, // if "false", all accordion are closed
      animateSpeed: 300,
      scrollToTop: false, // if true, scroll to current accordion;
      scrollToTopSpeed: 300,
      scrollToTopOffset: 0,
      clickOutside: false, // if true, close current accordion's content on click outside accordion;
      collapseInside: true, // collapse attachments,
      modifiers: {
        activeItem: 'is-open',
        activeHeader: 'is-open',
        activeHand: 'is-open',
        activeContent: 'is-open',
        noHoverClass: 'is-open'
      }
    }, settings || {});

    this.options = options;
    var container = $(options.accordionContainer);

    this.$accordionContainer = container;
    this.$accordionItem = $(options.accordionItem, container);
    this.$accordionHeader = $(options.accordionHeader, container);
    this.$accordionHand = $(options.accordionHand, container);
    this.$accordionContent = options.accordionContent ?
      $(options.accordionContent, container) :
      this.$accordionHeader.next();

    this.scrollToTop = options.scrollToTop;
    this._scrollToTopSpeed = options.scrollToTopSpeed;
    this._scrollToTopOffset = options.scrollToTopOffset;
    this.clickOutside = options.clickOutside;
    this._indexInit = options.indexInit;
    this._animateSpeed = options.animateSpeed;
    this._collapseInside = options.collapseInside;

    this.modifiers = options.modifiers;

    this.bindEvents();
    if (options.indexInit !== false) {
      this.activeAccordion();
    }
    this.hashAccordion();
  };

  JsAccordion.prototype.bindEvents = function () {
    var self = this,
      $accordionContent = self.$accordionContent,
      animateSpeed = self._animateSpeed,
      modifiers = self.modifiers;

    self.$accordionHand.on('click', 'a', function (e) {
      e.stopPropagation();
    });

    self.$accordionHand.on('mouseenter', 'a', function () {
      $(this).closest(self.$accordionHand).addClass(modifiers.noHoverClass);
    }).on('mouseleave', 'a', function () {
      $(this).closest(self.$accordionHand).removeClass(modifiers.noHoverClass);
    });

    self.$accordionHand.on('click', function (e) {
      e.preventDefault();

      var $currentHand = $(this),
        $currentHeader = $currentHand.closest(self.$accordionHeader),
        $currentItem = $currentHand.closest(self.$accordionItem),
        $currentItemContent = $currentHeader.next();

      if ($accordionContent.is(':animated')) return;

      if ($currentHeader.hasClass(modifiers.activeHeader)) {

        $currentItem.removeClass(modifiers.activeItem);
        $currentHeader.removeClass(modifiers.activeHeader);
        $currentHand.removeClass(modifiers.activeHand);
        $currentItemContent.removeClass(modifiers.activeContent);

        $currentItemContent.slideUp(animateSpeed, function () {

          if (self._collapseInside) {
            var $internalContent = $currentItem.find(self.$accordionHeader).next();

            $.each($internalContent, function () {
              if ($(this).hasClass(self.modifiers.activeContent)) {


                $(this).slideUp(self._animateSpeed, function () {
                  self.scrollPosition($currentItem);
                });
              }
            });


            $currentItem.find(self.$accordionItem).removeClass(self.modifiers.activeItem);
            $currentItem.find(self.$accordionHeader).removeClass(self.modifiers.activeHeader);
            $currentItem.find(self.$accordionHand).removeClass(self.modifiers.activeHand);
            $internalContent.removeClass(self.modifiers.activeContent);
          }
        });

        return;
      }

      var $siblings = $currentItem.siblings();

      $siblings.find(self.$accordionHeader).next().slideUp(self._animateSpeed);

      $siblings.removeClass(modifiers.activeItem);
      $siblings.find(self.$accordionHeader).removeClass(modifiers.activeHeader);
      $siblings.find(self.$accordionHand).removeClass(modifiers.activeHand);
      $siblings.find(self.$accordionHeader).next().removeClass(modifiers.activeContent);

      $currentItemContent.slideDown(animateSpeed, function () {
        self.scrollPosition($currentItem);
      });

      $currentItem.addClass(modifiers.activeItem);
      $currentHeader.addClass(modifiers.activeHeader);
      $currentHand.addClass(modifiers.activeHand);
      $currentItemContent.addClass(modifiers.activeContent);

      e.stopPropagation();
    });

    $(document).click(function () {
      if (self.clickOutside) {
        self.closeAllAccordions();
      }
    });

    $accordionContent.on('click', function (e) {
      e.stopPropagation();
    });
  };

  JsAccordion.prototype.hashAccordion = function () {
    var self = this;
    var modifiers = self.modifiers,
      hashTag = window.location.hash;

    if (!hashTag) return false;

    var activeItemClass = modifiers.activeItem;
    var activeHeaderClass = modifiers.activeHeader;
    var activeHandClass = modifiers.activeHand;
    var activeContentClass = modifiers.activeContent;

    var $accordionHeader = self.$accordionHeader;
    var $accordionItem = self.$accordionItem;

    var $currentItem = $(hashTag);
    var $currentItemParents = $currentItem.parents().filter($accordionItem);


    if ($currentItemParents.length) {
      var $currentHeaderParents = $currentItemParents.children($accordionHeader),
        $currentHandParents = $currentItemParents.children($accordionItem),
        $currentItemContentParents = $currentHeaderParents.next();

      $currentItemContentParents.slideDown(0);

      $currentItemParents.addClass(activeItemClass);
      $currentHeaderParents.addClass(activeHeaderClass);
      $currentHandParents.addClass(activeHandClass);
      $currentItemContentParents.addClass(activeContentClass);
    }


    var $currentHeader = $currentItem.children($accordionHeader),
      $currentHand = $currentHeader.children($accordionItem),
      $currentItemContent = $currentHeader.next();

    $currentItemContent.slideDown(0, function () {
      self.scrollPosition($currentItem);
    });

    $currentItem.addClass(activeItemClass);
    $currentHeader.addClass(activeHeaderClass);
    $currentHand.addClass(activeHandClass);
    $currentItemContent.addClass(activeContentClass);
  };

  JsAccordion.prototype.activeAccordion = function () {
    var self = this;
    var indexInit = self._indexInit;

    if (indexInit === false) return false;

    $.each(self.$accordionContainer, function () {
      var $currentItem = $(this).children().eq(indexInit);

      $currentItem.addClass(self.modifiers.activeItem);
      $currentItem.children(self.$accordionHeader).addClass(self.modifiers.activeHeader);
      $currentItem.children(self.$accordionHeader).find(self.$accordionHand).addClass(self.modifiers.activeHand);


      $currentItem.children(self.$accordionHeader).next().addClass(self.modifiers.activeContent).slideDown(self._animateSpeed);
    });
  };

  JsAccordion.prototype.closeAllAccordions = function () {
    var self = this;

    self.$accordionHeader.next().slideUp(self._animateSpeed);

    var modifiers = self.modifiers;

    self.$accordionItem.removeClass(modifiers.activeItem);
    self.$accordionHeader.removeClass(modifiers.activeHeader);
    self.$accordionHand.removeClass(modifiers.activeHand);
    self.$accordionHeader.next().removeClass(modifiers.activeContent);
  };

  JsAccordion.prototype.openAllAccordions = function () {
    var self = this;

    self.$accordionHeader.next().slideDown(self._animateSpeed);

    var modifiers = self.modifiers;

    self.$accordionItem.addClass(modifiers.activeItem);
    self.$accordionHeader.addClass(modifiers.activeHeader);
    self.$accordionHand.addClass(modifiers.activeHand);
    self.$accordionHeader.next().addClass(modifiers.activeContent);
  };

  JsAccordion.prototype.scrollPosition = function (element) {
    var self = this;
    if (self.scrollToTop && !$('html, body').is('animated')) {
      $('html, body').animate({scrollTop: element.offset().top - self._scrollToTopOffset}, self._scrollToTopSpeed);
    }
  };

  window.JsAccordion = JsAccordion;
}(jQuery));

function accordionInit() {
  var $accordion = $('.accordion__container-js');

  if ($accordion.length) {
    new JsAccordion({
      accordionContainer: '.accordion__container-js',
      accordionItem: '.accordion__item-js',
      accordionHeader: '.accordion__header-js',
      accordionHand: '.accordion__hand-js',
      indexInit: false,
      clickOutside: false,
      animateSpeed: 200
    });
  }

  var $accordionOrder = $('.order-accordion__container-js');

  if ($accordionOrder.length) {
    new JsAccordion({
      accordionContainer: '.order-accordion__container-js',
      accordionItem: '.order-accordion__item-js',
      accordionHeader: '.order-accordion__header-js',
      accordionHand: '.order-accordion__hand-js',
      indexInit: false,
      clickOutside: false,
      animateSpeed: 200
    });
  }
}

(function ($) {
  var MultiAccordion = function (settings) {
    var options = $.extend({
      collapsibleAll: false, // если установить значение true, сворачиваются идентичные панели НА СТРАНИЦЕ, кроме текущего
      resizeCollapsible: false, // если установить значение true, при ресайзе будут соворачиваться все элементы
      container: null, // общий контейнер
      item: null, // непосредственный родитель открывающегося элемента
      handler: null, // открывающий элемента
      handlerWrap: null, // если открывающий элемент не является непосредственным соседом открывающегося элемента, нужно указать элемент, короный является оберткой открывающего элемета и лежит непосредственно перед открывающимся элементом (условно, является табом)
      panel: null, // открывающийся элемент
      openClass: 'active', // класс, который добавляется при открытии
      currentClass: 'current', // класс текущего элемента
      animateSpeed: 300, // скорость анимации
      collapsible: false // сворачивать соседние панели
    }, settings || {});

    this.options = options;
    var container = $(options.container);
    this.$container = container;
    this.$item = $(options.item, container);
    this.$handler = $(options.handler, container);
    this.$handlerWrap = $(options.handlerWrap, container);
    this._animateSpeed = options.animateSpeed;
    this.$totalCollapsible = $(options.totalCollapsible);
    this._resizeCollapsible = options.resizeCollapsible;

    this.modifiers = {
      active: options.openClass,
      current: options.currentClass
    };

    this.bindEvents();
    this.totalCollapsible();
    this.totalCollapsibleOnResize();

  };

  MultiAccordion.prototype.totalCollapsible = function () {
    var self = this;
    self.$totalCollapsible.on('click', function () {
      self.$panel.slideUp(self._animateSpeed, function () {
        self.$container.trigger('accordionChange');
      });
      self.$item.removeClass(self.modifiers.active);
    })
  };

  MultiAccordion.prototype.totalCollapsibleOnResize = function () {
    var self = this;
    $(window).on('resize', function () {
      if (self._resizeCollapsible) {
        self.$panel.slideUp(self._animateSpeed, function () {
          self.$container.trigger('accordionChange');
        });
        self.$item.removeClass(self.modifiers.active);
      }
    });
  };

  MultiAccordion.prototype.bindEvents = function () {
    var self = this;
    var $container = this.$container;
    var $item = this.$item;
    var panel = this.options.panel;

    $container.on('click', self.options.handler, function (e) {
      var $currentHandler = self.options.handlerWrap ? $(this).closest(self.options.handlerWrap) : $(this);
      var $currentItem = $currentHandler.closest($item);

      if ($currentItem.has($(panel)).length) {
        e.preventDefault();

        if ($currentHandler.next(panel).is(':visible')) {
          self.closePanel($currentItem);

          return;
        }

        if (self.options.collapsibleAll) {
          self.closePanel($($container).not($currentHandler.closest($container)).find($item));
        }

        if (self.options.collapsible) {
          self.closePanel($currentItem.siblings());
        }

        self.openPanel($currentItem, $currentHandler);
      }
    })
  };

  MultiAccordion.prototype.closePanel = function ($currentItem) {
    var self = this;
    var panel = self.options.panel;
    var openClass = self.modifiers.active;

    $currentItem.removeClass(openClass).find(panel).filter(':visible').slideUp(self._animateSpeed, function () {
      self.$container.trigger('mAccordionAfterClose').trigger('mAccordionAfterChange');
    });

    $currentItem
      .find(self.$item)
      .removeClass(openClass);
  };

  MultiAccordion.prototype.openPanel = function ($currentItem, $currentHandler) {
    var self = this;
    var panel = self.options.panel;

    $currentItem.addClass(self.modifiers.active);

    $currentHandler.next(panel).slideDown(self._animateSpeed, function () {
      self.$container.trigger('mAccordionAfterOpened').trigger('mAccordionAfterChange');
    });
  };

  window.MultiAccordion = MultiAccordion;
}(jQuery));

function initNavAccordion() {

  var navMenu = '.nav-js';

  if ($(navMenu).length) {
    new MultiAccordion({
      container: navMenu,
      item: 'li',
      handler: '.nav-handler-js',
      handlerWrap: '.nav__tab-js',
      panel: '.nav-drop-js',
      openClass: 'is-open',
      animateSpeed: 200,
      collapsible: true
    });
  }
}

function popupInitial() {

  var $html = $('html');
  var scrollFixedClass = 'css-scroll-fixed';
  var btnCloseTpl = '<button title="%title%" type="button" class="mfp-close"><svg class="svg-ico-close" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 57.2 57.2"><path d="M34.3 28.6L56 6.9c1.6-1.6 1.6-4.1 0-5.7 -1.6-1.6-4.1-1.6-5.7 0L28.6 22.9 6.9 1.3c-1.6-1.6-4.1-1.6-5.7 0 -1.6 1.6-1.6 4.1 0 5.7l21.7 21.6L1.3 50.3c-1.6 1.5-1.6 4.1 0 5.6 0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2l21.7-21.6L50.3 56c0.8 0.8 1.8 1.2 2.8 1.2s2-0.4 2.8-1.2c1.6-1.6 1.6-4.1 0-5.7L34.3 28.6z"></path></svg></button>';

  $('.btn-order-js').magnificPopup({
    type: 'ajax',
    midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    mainClass: 'mfp-zoom-in ',
    removalDelay: 500,
    fixedContentPos: 'auto',
    overflowY: 'auto',
    closeMarkup: btnCloseTpl,
    callbacks: {
      open: function () {
        $html.addClass(scrollFixedClass);
      },
      close: function () {
        $html.removeClass(scrollFixedClass);
      },
      ajaxContentAdded: function () {
        spinnerInit(this.content.find('.spinner-js'));
        this.content.find('.order-calc-js').msOrderCalc(orderCalcOptions);
      }
    }
  });

  $('.btn-popup-js').magnificPopup({
    type: 'inline',
    midClick: true, // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.,
    mainClass: 'mfp-zoom-in',
    removalDelay: 500,
    fixedContentPos: 'auto',
    overflowY: 'auto',
    closeMarkup: btnCloseTpl,
    callbacks: {
      open: function () {
        $('.shutter-js').trigger('extraPopupClose');
        $html.addClass(scrollFixedClass);
      },
      close: function () {
        $html.removeClass(scrollFixedClass);
      }
    }
  });
}

$.widget("custom.superSpinner", $.ui.spinner, {
  _buttonHtml: function () {
    return '<a data-entity="basket-item-quantity-plus"></a>' +
      '<a data-entity="basket-item-quantity-minus"></a>'
  }
});


;(function ($) {
  var defaults = {
    spinnerLength: '.order-calc__spin-length-js',
    price: '.order-calc__price-js',
    priceSum: '.order-calc__price-sum-js',
    btnRemove: '.order-calc__remove-js',
    row: '.order-calc__item-js',
    headOfGroup: '.order-calc__head-js',
    spinnerPacks: '.order-calc__spin-packs-js',
    lengthInPacks: '.order-calc__length-in-pack-js',
    lengthSum: '.order-calc__length-sum-js',
    packsInGroup: '.order-calc__packs-in-group-js',
    lengthInGroup: '.order-calc__length-in-group-js',
    priceSumInGroup: '.order-calc__price-sum-in-group-js',
    btnRemoveGroup: '.order-calc__remove-group-js',
    totalResult: '.order-calc__total-results-js',
    totalPacks: '.order-calc__packs-total-js',
    totalCount: '.order-calc__counts-total-js',
    totalPrice: '.order-calc__price-total-js',

    classes: {
      init: 'ms-order-calc--initialized',
      hasNotItems: 'order-calc__hasnt-items'
    }
  };

  function MsOrderCalc(element, options) {
    var self = this;

    self.config = $.extend(true, {}, defaults, options);

    self.element = element;

    self.callbacks();

    self.objParams = {};

    self.calcAll();
    self.changeLength();

    self.removeItem();
    self.removeGroup();

    self.init(); // create DOM structure of the plugins
  }

  MsOrderCalc.prototype.callbacks = function () {
    var self = this;
    $.each(self.config, function (key, value) {
      if (typeof value === 'function') {
        self.element.on(key + '.msOrderCalc', function (e, param) {
          return value(e, self.element, param);
        });
      }
    });
  };

  MsOrderCalc.prototype.calcAll = function () {
    var self = this;

    var $item = $(self.config.row, self.element);

    $.each($item, function () {
      var $curItem = $(this);
      var spinnerVal = +$(self.config.spinnerPacks, $curItem).val();

      if (!spinnerVal) {
        return;
      }

      self.createObjParams($curItem, spinnerVal);
    });

    self.calcTotalResult();
    self.calcTotalResultInGroup();
  };

  MsOrderCalc.prototype.changeLength = function () {
    var self = this;

    self.element.on('change spin keyup', self.config.spinnerPacks, function (e, ui) {
      var $curSpinner = $(this);

      var curSpinnerVal = ui ? ui.value : +$curSpinner.val();

      self.createObjParams($curSpinner.closest(self.config.row), curSpinnerVal);

      self.calcTotalResult();
      self.calcTotalResultInGroup();
    });
  };

  MsOrderCalc.prototype.removeItem = function () {
    var self = this;

    self.element.on('click', self.config.btnRemove, function (e) {

      var $curRow = $(this).closest(self.config.row);

      self.deleteItem($curRow);

      e.preventDefault();

    });
  };

  MsOrderCalc.prototype.removeGroup = function () {
    var self = this;

    self.element.on('click', self.config.btnRemoveGroup, function (e) {

      var $head = $(this).closest(self.config.row),
        $children = $('[data-group-id=' + $head.attr('id') + ']', self.element);

      self.deleteItem($children);

      e.preventDefault();

    });
  };

  MsOrderCalc.prototype.deleteItem = function (row) {
    var self = this;
    var $row = row;

    $.each($row, function () {
      var itemId = $(this).attr('data-id');


      delete self.objParams[itemId];
    });

    self.calcTotalResult();// пересчет общего результата по корзине

    $row.remove();// удаление строки из корзины

    self.calcTotalResultInGroup();// пересчет результатов в группах

    var $head = $(self.config.headOfGroup, self.element);

    $.each($head, function () {
      var $curHead = $(this),
        groupId = $curHead.attr('id'),
        $curChildren = $('[data-group-id=' + groupId + ']', self.element);

      if (!$curChildren.length) {
        $curHead.remove();

      }
    });

    var rowsLength = self.countLengthRow();

    self.element.trigger('removedItem.msOrderCalc');

    if (!rowsLength) {
      self.element.trigger('removedAllItems.msOrderCalc');
    }
  };

  MsOrderCalc.prototype.createObjParams = function (element, length) {
    var self = this;

    var id = element.attr('data-id'),// id товара
      $curRow = element,// элемент dom содержащий один товар
      $curPrice = $curRow.find(self.config.price),// елемент с ценой за единицу товара
      lengthInPack = +$curRow.find(self.config.lengthInPacks).data('length-in-pack'),// количество товаров в одной упаковке
      lengthSum = length * lengthInPack,// всего товаров
      priceVal = +$curPrice.attr('data-price'),// цена товара (в дата-атрибуте)
      priceValSum = self.round(priceVal * lengthSum),// общая цена одного товара
      groupId = $curRow.attr('data-group-id') || null;

    if (id) {
      self.objParams[id] = {
        'group': groupId,
        'packsLength': length,
        'lengthInPack': lengthInPack,
        'lengthSum': lengthSum,
        'price': priceVal,
        'priceSum': priceValSum
      };
      $curRow.find(self.config.lengthSum).html(lengthSum).attr('data-val', lengthSum);

      $curRow.find(self.config.priceSum).html(priceValSum).attr('data-val', priceValSum);
    }
  };

  MsOrderCalc.prototype.calcTotalResultInGroup = function () {
    var self = this,
      $head = $(self.config.headOfGroup, self.element);

    $.each($head, function () {
      var $curHead = $(this),
        groupId = $curHead.attr('id'),
        $curChildren = $('[data-group-id=' + groupId + ']', self.element);


      var packsSumToGroup = 0,
        lengthSumToGroup = 0,
        priceSumToGroup = 0;

      $.each($curChildren, function () {
        var packsSum = $(this).find(self.config.spinnerPacks).val();
        packsSumToGroup = packsSumToGroup + +packsSum;

        var lengthSum = $(this).find(self.config.lengthSum).attr('data-val');
        lengthSumToGroup = lengthSumToGroup + +lengthSum;

        var priceSum = $(this).find(self.config.priceSum).attr('data-val');
        priceSumToGroup = priceSumToGroup + +priceSum;
      });


      packsSumToGroup = self.round(packsSumToGroup);
      lengthSumToGroup = self.round(lengthSumToGroup);
      priceSumToGroup = self.round(priceSumToGroup);

      $(self.config.packsInGroup, $curHead).html(packsSumToGroup).attr('data-val', packsSumToGroup);
      $(self.config.lengthInGroup, $curHead).html(lengthSumToGroup).attr('data-val', lengthSumToGroup);
      $(self.config.priceSumInGroup, $curHead).html(priceSumToGroup).attr('data-val', priceSumToGroup);
    });

    self.countLengthRow();
  };

  MsOrderCalc.prototype.calcTotalResult = function () {
    var self = this;


    var totalPacks = self.sumParam(self.objParams, 'packsLength');
    var totalCount = self.sumParam(self.objParams, 'lengthSum');
    var totalPrice = self.sumParam(self.objParams, 'priceSum');

    self.element.trigger('getTotalResults.msOrderCalc', {
      'totalPacks': totalPacks,
      'totalCount': totalCount,
      'totalPrice': totalPrice
    });

    self.element.find(self.config.totalPacks).text(totalPacks);
    self.element.find(self.config.totalCount).text(totalCount);
    self.element.find(self.config.totalPrice).text(totalPrice);

    self.countLengthRow();
  };

  MsOrderCalc.prototype.countLengthRow = function () {
    var self = this;

    var rowsLength = $(self.config.row, self.element).length;

    self.element.trigger('afterChangedLengthItem.msOrderCalc', rowsLength);

    if (!rowsLength) {
      self.element.addClass(self.config.classes.hasNotItems);
    }

    return rowsLength;
  };

  MsOrderCalc.prototype.sumParam = function (obj, param) {

    var result = 0,
      prop;

    for (prop in obj) {
      result += obj[prop][param];
    }

    return this.round(result);

  };

  MsOrderCalc.prototype.round = function (val) {

    return Math.round(+val * 100) / 100;

  };

  MsOrderCalc.prototype.init = function () {

    this.element.addClass(this.config.classes.init);

    this.element.trigger('created.msOrderCalc');

  };

  $.fn.msOrderCalc = function (options) {
    'use strict';

    return this.each(function () {
      new MsOrderCalc($(this), options);
    });

  };
})(jQuery);

var orderCalcOptions = {
  getTotalResults: function (e, el, results) {
    $(el).find('.order-calc__total-results-js').toggleClass('show', results.totalCount > 0);
    $(el).find('.order-calc-btn').prop('disabled', !results.totalCount > 0).toggleClass('disabled', !results.totalCount > 0);
  }
  , afterChangedLengthItem: function (e, el, length) {
    var itemsLength = $('.order-calc__item-js').length;
    var $btn = $('.order-calc__clear-cart-js');
    $btn.prop('disabled', !itemsLength);
    $btn.toggleClass('disabled', !itemsLength);
  }
};

function orderCalculation() {
  $('.order-calc-js').msOrderCalc(orderCalcOptions);

  var removeCandidateClass = 'remove-candidate-js';
  $('.order-calc__remove-group-js').on('mouseenter', function () {
    var $curBtn = $(this),
      $curId = $curBtn.closest('.c-tr').attr('id');

    $('[data-group-id=' + $curId + ']').addClass(removeCandidateClass);
  }).on('mouseleave', function () {
    $('.c-tr').removeClass(removeCandidateClass);
  });

  $('form').on('click', '.order-calc__clear-cart-js', function (e) {

    $('.order-calc__remove-js').trigger('click');

    e.preventDefault();

  });
}

function order() {
  var $container = $('.order');
  if ($container.length) {
    var $item = $('.order-item-js', $container),
      $select = $('.order-select-js', $container),
      $spin = $('.spinner'),
      $totalLengthElem = $('.order-total-length-js'),
      $totalPriceElem = $('.order-total-price-js'),
      $totalBtn = $('.order-total-btn-js'),
      $groupLengthElem = $('.order-group-length-js'),
      $groupPriceElem = $('.order-group-price-js'),
      $groupBtn = $('.order-group-btn-js'),
      totalLength, totalPrice, groupLength, groupPrice;

    function totalResultCount() {
      totalLength = 0;
      totalPrice = 0;

      $.each($item, function () {
        groupLength = 0;
        groupPrice = 0;

        var $thisItem = $(this),
          $thisSelect = $('.order-select-js', $thisItem);

        $.each($thisSelect, function () {
          var $curSelect = $(this),
            $curSpin = $curSelect.find($spin),
            length = +$curSpin.val(),
            price = +$curSpin.closest($item).find('[data-price]').data('price');

          groupLength = Math.round((groupLength + length) * 100) / 100;
          groupPrice = Math.round((groupPrice + price * length) * 100) / 100;

          totalLength = Math.round((totalLength + length) * 100) / 100;
          totalPrice = Math.round((totalPrice + price * length) * 100) / 100;
        });

        $thisItem.find($groupLengthElem).html(groupLength);
        $thisItem.find($groupPriceElem).html(groupPrice);

        $totalBtn.prop('disabled', !totalLength);
      });

      $totalLengthElem.html(totalLength);
      $totalPriceElem.html(totalPrice);

      $groupBtn.prop('disabled', !groupLength);
    }

    totalResultCount();

    $container.on('change spin keyup', '.spinner', function () {
      totalResultCount();
    });
  }
}

function onlyNumberInput() {
  $("[data-only-number]").keydown(function (e) {
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      (e.keyCode >= 35 && e.keyCode <= 40)) {
      return;
    }
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  });
}

function textSlide() {

  var $textSlide = $('.text-slide-js');

  if (!$textSlide.length) return false;

  var $window = $(window),
    prefix = 'text-slide',
    textFull = $textSlide.attr('data-btn-text-full') || 'Подробнее',
    textShort = $textSlide.attr('data-btn-text-short') || 'Свернуть',
    maxLines = 3,
    $tplSlideFull = $('<div class="' + prefix + '__button" style="display: none;"><a href="#" class="btn-arrow btn-arrow--bottom ' + prefix + '__switcher ' + prefix + '__switcher-js"><span>' + textFull + '</span></a></div>'),
    $tplTextSlideInner = $('<div class="' + prefix + '__inner ' + prefix + '__inner-js" />'),
    $tplShadow = $('<div class="' + prefix + '__shadow ' + prefix + '__shadow-js" >'),
    textSlideHeight = $textSlide.outerHeight(),
    isTextFull = false,
    minHeight = parseInt($textSlide.css('line-height'), 10) * maxLines;

  TweenMax.set($tplShadow, {autoAlpha: 0});
  $textSlide
    .wrapInner($tplTextSlideInner)
    .after($tplSlideFull)
    .append($tplShadow);

  $window.on('debouncedresize', function () {
    init();
  });

  init();

  function init() {
    var wrapInnerHeight = $('.' + prefix + '__inner-js').outerHeight();

    $textSlide.css('max-height', 'none');

    if (wrapInnerHeight <= minHeight) {
      TweenMax.set($textSlide, {height: 'auto'});
      TweenMax.set($tplShadow, {autoAlpha: 0});
      $tplSlideFull.hide(0);
    } else if (!isTextFull) {
      TweenMax.set($textSlide, {height: minHeight});
      TweenMax.set($tplShadow, {autoAlpha: 1});
      $tplSlideFull.show(0);

      textSlideHeight = $textSlide.outerHeight();
    }
  }

  $textSlide.parent().on('click', '.' + prefix + '__switcher-js', function (e) {
    e.preventDefault();

    var wrapInnerHeight = $('.' + prefix + '__inner-js').outerHeight();

    if (wrapInnerHeight <= minHeight) return false;

    var $this = $(this);

    if (isTextFull) {
      TweenMax.to($textSlide, 0.5, {
        height: textSlideHeight,
        ease: Power3.easeInOut,
        onComplete: function () {
          $textSlide.trigger('heightHeightChange');
        }
      });
      TweenMax.to($tplShadow, 0.5, {autoAlpha: 1});

      $this.removeClass('active').children('span').text(textFull);

      isTextFull = false;
    } else {
      TweenMax.to($textSlide, 0.5, {
        height: wrapInnerHeight,
        ease: Power3.easeInOut,
        onComplete: function () {
          TweenMax.set($textSlide, {height: 'auto'});
          $textSlide.trigger('afterHeightChange');

          isTextFull = true;
        }
      });

      TweenMax.to($tplShadow, 0.5, {autoAlpha: 0});
      $this.addClass('active').children('span').text(textShort);
    }
  });

}

function contactsMap() {

  var mapId = "#contacts-map",
    $mapId = $(mapId);

  if ($mapId.length) {

    var myMap,
      myPlacemark,
      contactsMapCoord = contactMapInfo.coord,
      center = contactsMapCoord;


    ymaps.ready(init);

    var balloonContent = '' +
      '<div class="map-popup">' +
      '<div class="map-popup__title">' + contactMapInfo.title + '</div>' +
      '<div class="map-popup__subtitle">' + contactMapInfo.subtitle + '</div>' +
      '<div class="map-popup__list">' +
      '<div class="map-popup__row"><div>' + contactMapInfo.address + '</div></div>' +
      '<div class="map-popup__row"><div>' + contactMapInfo.phones + '</div></div>' +
      '</div>';

    function init() {
      myMap = new ymaps.Map(mapId.substring(1), {
        center: center,
        zoom: 17,
        controls: ['fullscreenControl', 'zoomControl']
      });

      myPlacemark = new ymaps.Placemark(contactsMapCoord, {
        balloonContentBody: balloonContent,
        hintContent: contactMapInfo.title
      }, {
        iconLayout: 'default#image',
        iconImageHref: contactsMapBaseImageURL + 'pin-map.png',
        iconImageSize: [83, 80],
        iconImageOffset: [-32, -81]
      });

      myMap.geoObjects.add(myPlacemark);

      myMap.behaviors.disable('scrollZoom');
    }
  }
}

function shopsLocation() {
  var $shopsContainer = $('.shops');

  if (!$shopsContainer.length) return false;

  var $page = $('html, body'),
    myMap,
    myClusterer,
    myPlacemark = [],
    mapId = "#shops-map",
    $mapId = $(mapId),
    baseImageURL = 'img/',
    jsonPath = shopsJsonPath, // объявить на странице html,
    $selectCountry = $('select', '.shops-select-country'),
    $shopsItem = $('.shops-item'),
    shopsItemActiveClass = 'is-active',
    shopsItemHideClass = 'item-hide',
    filterNoItemClass = '.filter-no-item',
    noShopsItemClass = 'no-shops-items',
    $shopsFilters = $('.shops-filters-js'),
    fullscreenControl,
    duration = 300;

  var jsonResult;
  $.get(jsonPath + "/shops.json", {ajax: '1', action: 'json'}, function (data) {
    jsonResult = data;
  }, "json").done(function () {
    shopLocationInit();
  }).fail(function () {
  });

  function shopLocationInit() {
    if ($mapId.length) {

      var init = function () {
        var clusterIcons = [
            {
              href: baseImageURL + 'map-cluster-2x.png',
              size: [46, 46],
              offset: [-23, -23]
            },
            {
              href: baseImageURL + 'map-cluster-2x.png',
              size: [60, 60],
              offset: [-30, -30],
              shape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 30
              }
            }],
          clusterNumbers = [20],
          MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: normal; font-family: Arial, sans-serif;">{{ properties.geoObjects.length }}</div>'
          );

        myClusterer = new ymaps.Clusterer({
          clusterIcons: clusterIcons,
          clusterNumbers: clusterNumbers,
          clusterIconContentLayout: MyIconContentLayout,
          maxZoom: 11
        });

        myMap = new ymaps.Map(mapId.substring(1), {
          center: [51.9071097, 27.4923474],
          zoom: 11,
          controls: []
        });

        var zoomControl = new ymaps.control.ZoomControl({
          options: {
            size: "small",
            position: {right: 10, bottom: 50}
          }
        });
        myMap.controls.add(zoomControl);

        fullscreenControl = new ymaps.control.FullscreenControl();
        myMap.controls.add(fullscreenControl);

        myMap.behaviors.disable('scrollZoom');

        $mapId.on('yMapRedraw', function () {
          myMap.container.fitToViewport();
        });

        reDrawNewCitiesMarks(jsonResult);
        searchShopsByTag();
      };

      ymaps.ready(init);
    } else {
    }

    var $noItemTemplate = $('<div />', {
      class: filterNoItemClass.substring(1),
      text: 'Извините, магазинов с выбранными параметрами не найдено'
    });

    function reDrawNewCitiesMarks(jsonResult) {

      if (myClusterer) {
        myClusterer.removeAll();
      }

      $($shopsItem, '.shops-list-js').addClass(shopsItemHideClass);

      $(filterNoItemClass).remove();
      $shopsContainer.removeClass(noShopsItemClass);

      if (!jsonResult.length) {
        $shopsContainer.addClass(noShopsItemClass).append($noItemTemplate.clone());

        return false;
      }

      var myGeoObjects = [];

      $.each(jsonResult, function (i, item) {

        var coordStr = item.coord,
          id = item.id,
          cityId = item.city[0].id;

        $('[data-location-index = ' + id + ']').removeClass(shopsItemHideClass);

        if ($mapId.length) {

          var includeTime = "", includePhone = "";
          if (item.time) includeTime = '<div class="map-popup__row work-time">Время работы:' + item.time + '</div>';
          if (item.phones) includePhone = '<div class="map-popup__row">' + item.phones + '</div>';

          var balloonContent = '' +
            '<div class="map-popup">' +
            '<div class="map-popup__title">' + item.address + '</div>' +
            '<div class="map-popup__list">' +
            includeTime +
            includePhone +
            '</div>' +
            '</div>';

          if (coordStr !== null) {
            var coordArray = coordStr.split(', ');

            myPlacemark[id] = new ymaps.Placemark([coordArray[0], coordArray[1]], {
              balloonContentBody: balloonContent,
              hintContent: item.name
            }, {
              iconLayout: 'default#image',
              iconImageHref: baseImageURL + 'pin-map.png',
              iconImageSize: [83, 80],
              iconImageOffset: [-32, -81],
              hideIconOnBalloonOpen: false,
              balloonOffset: [0, -80],
              balloonPosition: ['center', 'top']
            });

            myGeoObjects[id] = new ymaps.GeoObject({});

            myClusterer.add(myPlacemark[id]);
          }

        }
      });

      if ($mapId.length) {
        myMap.geoObjects.add(myClusterer);

        setBoundsMap();
      }

    }

    function setBoundsMap() {
      myMap.setBounds(myClusterer.getBounds(), {checkZoomRange: false}).then(function () {
        if (myMap.getZoom() > 11) myMap.setZoom(11);
      });
    }

    var moveFlag;

    var prevPosition = 0;

    $('.shops-item').on('click', '.btn-to-map-js', function (e) {
      var $currentlink = $(this),
        $currentItem = $currentlink.closest($shopsItem);

      if (window.innerWidth > 991) {
        $currentlink.closest('.tabs-js').find('[href*="#shopsMapView"]').trigger('click');
        if (!$page.is(':animated')) {
          $page.stop().animate({scrollTop: $currentlink.closest('.tabs-js').offset().top - $('.header').outerHeight()}, duration);
        }
      }

      if (window.innerWidth > 991) {
        $shopsItem.removeClass(shopsItemActiveClass);
        $currentItem.addClass(shopsItemActiveClass);

        var index = $(this).closest($shopsItem).data('location-index');

        if (moveFlag === index) return false;
        moveFlag = index;

        var coord = myPlacemark[index].geometry.getCoordinates();

        myMap.setCenter(coord, 16, {
          duration: 100,
          checkZoomRange: true
        }).then(function () {
          myPlacemark[index].balloon.open();
        });
      }

      e.preventDefault();
    });

    function addCountLoader() {
      var countLoader = $('<div />', {
        class: 'count-loader'
      });

      $('.shops-append-loader-js').append(countLoader.clone());
    }

    function removeCountLoader() {
      var $countLoader = $('.count-loader');
      $countLoader.fadeOut(700, function () {
        $countLoader.remove();
      });
    }


    function clearBtnState() {
      $('.btn-clear-form-js').prop('disabled', !$shopsFilters.find(':checked').length);
    }

    function clearFilterTags() {
      $(':checked', $shopsFilters).prop("checked", false);
      clearBtnState();
    }
  }
}


function stickyInit() {
  var contactsMap = '.contacts__map';
  if ($(contactsMap).length) {

    var contactsMapSticky = new StickySidebar(contactsMap, {
      containerSelector: '.contacts',
      innerWrapperSelector: '.contacts__map__holder',
      topSpacing: $('.header').outerHeight(),
      resizeSensor: true, // recalculation sticky on change size of elements
      minWidth: prodCardMediaWidth - 1

    });

    var contactsMapTimeout;

    $('.tabs-js').on('afterChange.tabSwitcher', function () {
      clearTimeout(contactsMapTimeout);

      contactsMapTimeout = setTimeout(function () {
        contactsMapSticky.updateSticky();
      }, 50);
    });
  }

  var cardInfo = '.card-info-js';
  var $cardInfo = $(cardInfo);
  if ($cardInfo.length) {

    var cardInfoSticky = new StickySidebar(cardInfo, {
      containerSelector: '.p-card',
      innerWrapperSelector: '.p-card__content__holder',
      topSpacing: $('.header').outerHeight() + 40,
      resizeSensor: true, // recalculation sticky on change size of elements
      minWidth: prodCardMediaWidth - 1
    });

    var shareDropTimeout;
    $('.social-share__container-js').on('afterChange.msDrop', function () {
      clearTimeout(shareDropTimeout);

      shareDropTimeout = setTimeout(function () {
        cardInfoSticky.updateSticky();
      }, 100);
    });

    var cardInfoTimeout;
    $('.p-card').on('change.cardGallery', function () {
      clearTimeout(cardInfoTimeout);

      cardInfoTimeout = setTimeout(function () {
        cardInfoSticky.updateSticky();
      }, 500);
    });
  }
}

(function () {
  var $container = $('.group-js'),
    $body = $('.group__body-js'),
    $spacer = $('.group__spacer-js');

  $(window).on('load debouncedresize', function (e) {

    $.each($container, function () {

      var $curContainer = $(this);
      var $curSpacer = $curContainer.find($spacer);
      var containerHeight = $curContainer.outerHeight();

      var spacersHeight = 0;
      $.each($curSpacer, function () {
        var $thisSpacer = $(this);
        spacersHeight = spacersHeight + $thisSpacer.outerHeight();
      });

      $curContainer.find($body).height(containerHeight - spacersHeight);
    });

  });
})();

(function () {
  var $footer = $('.footer__holder');

  if ($footer.length) {
    $('.main__holder').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page
    $('.wrapper').append($('<div class="spacer"></div>')); // need for sidebar's element sticky of bottom page (for responsive)

    layoutFooter();
    $($footer).addClass('isBottoming');

    $(window).on('resizeByWidth', function () {
      layoutFooter();
    });

    function layoutFooter() {
      var footerHeight = $($footer).outerHeight();

      $('.spacer').css({
        'height': footerHeight,
        'pointer-events': 'none', 'float': 'left',
        'width': '100%'
      });
    }
  }
})();

function imgZoom() {
  var thumbs = document.querySelectorAll('.p-card__gallery__item img'),
    pane = document.querySelector('.pane-container-js');

  if (window.innerWidth > 992) {
    for (var i = 0, len = thumbs.length; i < len; i++) {
      var thumb = thumbs[i];

      new Drift(thumb, {
        paneContainer: pane,
        hoverBoundingBox: true,
        touchBoundingBox: true,
        onShow: function () {
          $(pane).css('visibility', 'visible');
        },
        onHide: function () {
          $(pane).css('visibility', 'hidden');
        }
      });
    }
  }
}



$(document).ready(function () {
  placeholderInit();
  printShow();
  inputToggleFocusClass();
  inputHasValueClass();
  customSelect($('select.cselect'));
  fileInput();
  fullPageInitial();
  initHoverClass();
  objectFitImages(); // object-fit-images initial
  shuttersInit();
  tabSwitcher();
  toggleDropInit();
  menuSwitcher();
  cardGallery();
  addDataLengthChildren();
  equalHeight();
  toggleViewInit();
  sortingOrder();
  accordionInit();
  initNavAccordion();
  popupInitial();
  orderCalculation();
  order();
  onlyNumberInput();
  textSlide();
  contactsMap();

  shopsLocation();

  stickyInit();

  imgZoom();

  var llength = 120;
  $.each($('.news-preview__text'), function () {
    var $this = $(this);
    var val = $this.text();
    var letterLength = val.length,
      shortVal = val.substring(llength, 0),
      hideVal = val.substring(llength);
    if (letterLength > llength) {
      $this.html(shortVal + '<span class="character"> ...</span><span style="display: none">' + hideVal + '</span>');
    }
    $this.addClass('trimmed');
  });
});
