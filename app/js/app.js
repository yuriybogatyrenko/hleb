'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LHCOIN = function () {
    function LHCOIN(doc) {
        _classCallCheck(this, LHCOIN);

        var _self = this;
        this.doc = doc;
        this.window = window;
        this.html = this.doc.querySelector('html');
        this.body = this.doc.body;
        this.location = location;
        this.lang = this.html.hasAttribute('lang') ? this.html.getAttribute('lang') : 'en';
        this.hash = location.hash;
        this.Object = Object;
        this.scrollWidth = 0;
        _self.localization = null;

        this.scrollWidth = this.scrollBarWidth();
    }

    // Window load types (loading, dom, full)


    _createClass(LHCOIN, [{
        key: 'appLoad',
        value: function appLoad(type, callback) {
            var _self = this;

            switch (type) {
                case 'loading':
                    if (_self.doc.readyState === 'loading') {
                        callback();
                    }

                    break;
                case 'dom':
                    _self.doc.onreadystatechange = function () {
                        if (_self.doc.readyState === 'complete') {
                            callback();
                        }
                    };

                    break;
                case 'full':
                    _self.window.onload = function (e) {
                        callback(e);
                    };

                    break;
                default:
                    callback();
            }
        }

        // Detect scroll default scrollBar width (return a number)

    }, {
        key: 'scrollBarWidth',
        value: function scrollBarWidth() {
            var _self = this;
            var outer = _self.doc.createElement("div");

            outer.style.visibility = "hidden";
            outer.style.width = "100px";
            outer.style.msOverflowStyle = "scrollbar";

            _self.body.appendChild(outer);

            var widthNoScroll = outer.offsetWidth;

            outer.style.overflow = "scroll";

            var inner = _self.doc.createElement("div");

            inner.style.width = "100%";
            outer.appendChild(inner);

            var widthWithScroll = inner.offsetWidth;

            outer.parentNode.removeChild(outer);

            return widthNoScroll - widthWithScroll;
        }
    }, {
        key: 'initSwitcher',
        value: function initSwitcher() {
            var _self = this;

            var switchers = _self.doc.querySelectorAll('[data-switcher]');

            if (switchers && switchers.length > 0) {
                for (var i = 0; i < switchers.length; i++) {
                    var switcher = switchers[i],
                        switcherOptions = _self.options(switcher.dataset["switcher"]),
                        switcherElems = switcher.children,
                        switcherTargets = _self.doc.querySelector('[data-switcher-target="' + switcherOptions.target + '"]').children,
                        switchersActive = [];

                    for (var y = 0; y < switcherElems.length; y++) {
                        var switcherElem = switcherElems[y],
                            parentNode = switcher.children,
                            switcherTrigger = switcherElem.children.length ? switcherElem.children[0] : switcherElem,
                            switcherTarget = switcherTargets[y];

                        if (switcherElem.classList.contains('active')) {
                            for (var z = 0; z < parentNode.length; z++) {
                                parentNode[z].classList.remove('active');
                                switcherTargets[z].classList.remove('active');
                            }
                            switcherElem.classList.add('active');
                            switcherTarget.classList.add('active');
                        } else switchersActive.push(0);

                        switcherTrigger.addEventListener('click', function (elem, target, parent, targets) {
                            return function (e) {
                                e.preventDefault();

                                if (!elem.classList.contains('active')) {
                                    for (var _z = 0; _z < elem.parentNode.children.length; _z++) {
                                        elem.parentNode.children[_z].classList.remove('active');
                                        targets[_z].classList.remove('active');
                                    }
                                    elem.classList.add('active');
                                    target.classList.add('active');
                                }
                            };
                        }(switcherElem, switcherTarget, parentNode, switcherTargets));
                    }

                    if (switchersActive.length === switcherElems.length) {
                        switcherElems[0].classList.add('active');
                        switcherTargets[0].classList.add('active');
                    }
                }
            }
        }
    }, {
        key: 'str2json',
        value: function str2json(str, notevil) {
            try {
                if (notevil) {
                    return JSON.parse(str.replace(/([\$\w]+)\s*:/g, function (_, $1) {
                        return '"' + $1 + '":';
                    }).replace(/'([^']+)'/g, function (_, $1) {
                        return '"' + $1 + '"';
                    }));
                } else {
                    return new Function("", "const json = " + str + "; return JSON.parse(JSON.stringify(json));")();
                }
            } catch (e) {
                return false;
            }
        }
    }, {
        key: 'options',
        value: function options(string) {
            var _self = this;

            if (typeof string !== 'string') return string;

            if (string.indexOf(':') !== -1 && string.trim().substr(-1) !== '}') {
                string = '{' + string + '}';
            }

            var start = string ? string.indexOf("{") : -1;
            var options = {};

            if (start !== -1) {
                try {
                    options = _self.str2json(string.substr(start));
                } catch (e) {}
            }

            return options;
        }
    }, {
        key: 'popups',
        value: function popups(options) {
            var _self = this;

            var defaults = {
                reachElementClass: '.js-popup',
                closePopupClass: '.js-close-popup',
                currentElementClass: '.js-open-popup',
                changePopupClass: '.js-change-popup'
            };

            options = $.extend({}, options, defaults);

            var plugin = {
                reachPopups: $(options.reachElementClass),
                bodyEl: $('body'),
                topPanelEl: $('.top-panel-wrapper'),
                htmlEl: $('html'),
                closePopupEl: $(options.closePopupClass),
                openPopupEl: $(options.currentElementClass),
                changePopupEl: $(options.changePopupClass),
                bodyPos: 0
            };

            plugin.openPopup = function (popupName) {
                plugin.reachPopups.filter('[data-popup="' + popupName + '"]').addClass('opened');
                plugin.bodyEl.css('overflow-y', 'scroll');
                // plugin.topPanelEl.css('padding-right', scrollSettings.width);
                plugin.htmlEl.addClass('popup-opened');
            };

            plugin.closePopup = function (popupName) {
                plugin.reachPopups.filter('[data-popup="' + popupName + '"]').removeClass('opened');
                setTimeout(function () {
                    plugin.bodyEl.removeAttr('style');
                    plugin.htmlEl.removeClass('popup-opened');
                    plugin.topPanelEl.removeAttr('style');
                }, 300);
            };

            plugin.changePopup = function (closingPopup, openingPopup) {
                plugin.reachPopups.filter('[data-popup="' + closingPopup + '"]').removeClass('opened');
                plugin.reachPopups.filter('[data-popup="' + openingPopup + '"]').addClass('opened');
            };

            plugin.init = function () {
                plugin.bindings();
            };

            plugin.bindings = function () {
                plugin.openPopupEl.on('click', function (e) {
                    e.preventDefault();
                    var pop = $(this).attr('data-popup-target');
                    plugin.openPopup(pop);
                });

                plugin.closePopupEl.on('click', function (e) {
                    var pop = void 0;
                    if (this.hasAttribute('data-popup-target')) {
                        pop = $(this).attr('data-popup-target');
                    } else {
                        pop = $(this).closest(options.reachElementClass).attr('data-popup');
                    }

                    plugin.closePopup(pop);
                });

                plugin.changePopupEl.on('click', function (e) {
                    var closingPop = $(this).attr('data-closing-popup');
                    var openingPop = $(this).attr('data-opening-popup');

                    plugin.changePopup(closingPop, openingPop);
                });

                plugin.reachPopups.on('click', function (e) {
                    var target = $(e.target);
                    var className = options.reachElementClass.replace('.', '');
                    if (target.hasClass(className)) {
                        plugin.closePopup($(e.target).attr('data-popup'));
                    }
                });
            };

            if (options) {
                plugin.init();
            }

            return plugin;
        }
    }, {
        key: 'tabSwitcher',
        value: function tabSwitcher() {
            $(document).on('click', '.js-tab-trigger', function (e) {
                e.preventDefault();

                var $this = $(this),
                    $tabListItem = $this.parent(),
                    $tabTarget = $('#' + $this.closest('.js-tab').data('target')),
                    $tabTargetListItems = $tabTarget.find('>li'),
                    tabListIndex = $tabListItem.index();

                if (!$tabListItem.hasClass('active')) {
                    $tabListItem.siblings('li').removeClass('active');
                    $tabListItem.addClass('active');

                    $tabTargetListItems.not(':eq(' + tabListIndex + ')').addClass('fw-hidden');
                    $tabTargetListItems.eq(tabListIndex).removeClass('fw-hidden');
                }
            });
        }
    }, {
        key: 'toggletrigger',
        value: function toggletrigger() {
            $('.toggle__trigger').on("click", function (e) {
                e.preventDefault();
                var t = $(this),
                    n = t.closest(".toggle"),
                    a = n.find(".toggle__content");
                if (n.hasClass("toggle--active")) {
                    n.removeClass("toggle--active");
                    a.slideUp(300);
                } else {
                    n.addClass("toggle--active");
                    a.slideDown(300);
                }
            });
        }
    }, {
        key: 'accordion',
        value: function accordion() {
            var vars = {
                container: '[data-accordion]',
                item: '[data-accordion-item]',
                label: '[data-accordion-label]',
                content: '[data-accordion-content]'
            };

            var accordion = {
                init: function init() {
                    accordion.bindings();
                },
                bindings: function bindings() {
                    $(vars.container).each(function () {
                        var $container = $(this);
                        var autoClose = this.hasAttribute('data-auto-close') ? $container.data('auto-close') : true;
                        $container.find(vars.label).on('click', function (e) {
                            e.preventDefault();
                            accordion.toggle($(this).closest(vars.item), autoClose);
                        });
                    });
                },
                toggle: function toggle($this) {
                    var autoClose = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

                    if (autoClose) {
                        if ($this.hasClass('active')) {
                            $this.closest(vars.container).find(vars.content).removeClass('active').slideUp(300);
                        } else {
                            $this.closest(vars.container).find(vars.item).filter('.active').removeClass('active').find(vars.content).stop().slideUp(300);
                            $this.closest(vars.item).addClass('active').find(vars.content).stop().slideDown(300);
                        }
                    } else {
                        if (!$this.hasClass('active')) {
                            $this.closest(vars.item).addClass('active').find(vars.content).stop().slideDown(300);
                        } else {
                            $this.closest(vars.item).removeClass('active').find(vars.content).stop().slideUp(300);
                        }
                    }
                }
            };

            accordion.init();

            return accordion;
        }
    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var $header = $('.header');
            var HH = $header.outerHeight();

            $(window).resize(function () {
                HH = $header.outerHeight();
            });

            $('.js-scroll-to').on('click', function (e) {
                e.preventDefault();
                var $el = $($(this).attr('href'));

                if (!!$el[0]) {
                    if ($(this).hasClass('header-menu__link')) {
                        $(this).closest('.header-menu__item').siblings().removeClass('active').end().addClass('active');
                    }

                    $('body, html').animate({ scrollTop: $el.offset().top - HH }, 1000);
                }
            });
        }
    }, {
        key: 'headerAnimation',
        value: function headerAnimation() {
            // let WH = $(window).height();
            var $header = $('.header');
            checkHeader();
            $(window).scroll(function () {
                checkHeader();
            });

            /*$(window).resize(() => {
                WH = $(window).height();
            });*/

            function checkHeader() {
                if ($(window).scrollTop() >= 10) {
                    $header.addClass('visible-xs-header');
                } else {
                    $header.removeClass('visible-xs-header');
                }
            }
        }
    }, {
        key: 'menuActualization',
        value: function menuActualization() {
            var $sections = $('section');

            var sectionParams = [];

            setSettingsParams();
            detectActive();

            $(window).resize(function () {
                setSettingsParams();
            });

            $(window).scroll(function () {
                detectActive();
            });

            function detectActive() {
                var window_pos = $(window).scrollTop() + $(window).height() / 2;

                sectionParams.forEach(function (value, key) {
                    for (var _key in value) {
                        if (value[_key].top < window_pos && value[_key].bottom > window_pos) {
                            $('.header-menu__link').parent('.header-menu__item').removeClass('active');
                            $('.header-menu__link[href="#' + _key + '"]').parent('.header-menu__item').addClass('active');
                        }
                    }
                });
            }

            function setSettingsParams() {
                sectionParams = [];
                $sections.each(function () {
                    var $id = $(this).attr('id');
                    var obj = {};

                    if ($id) {
                        obj[$id] = {
                            top: $(this).offset().top,
                            bottom: $(this).offset().top + $(this).outerHeight()
                        };

                        sectionParams.push(obj);
                    }
                });

                console.log(sectionParams);
            }
        }
    }, {
        key: 'responsiveSvg',
        value: function responsiveSvg() {
            $('.js-responsive-svg').each(function (e) {
                var $svg = $(this).find('svg:eq(0)');
                var height = parseInt($svg.attr('height'));
                var width = parseInt($svg.attr('width'));

                $(this).append('<div style="padding-top: ' + height / width * 100 + '%"></div>');
            });
        }
    }]);

    return LHCOIN;
}();