class LHCOIN {

    constructor(doc) {
        const _self = this;
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
    appLoad(type, callback) {
        const _self = this;

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
    scrollBarWidth() {
        const _self = this;
        const outer = _self.doc.createElement("div");

        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";

        _self.body.appendChild(outer);

        const widthNoScroll = outer.offsetWidth;

        outer.style.overflow = "scroll";

        const inner = _self.doc.createElement("div");

        inner.style.width = "100%";
        outer.appendChild(inner);

        const widthWithScroll = inner.offsetWidth;

        outer.parentNode.removeChild(outer);

        return widthNoScroll - widthWithScroll;
    }

    initSwitcher() {
        const _self = this;

        const switchers = _self.doc.querySelectorAll('[data-switcher]');

        if (switchers && switchers.length > 0) {
            for (let i = 0; i < switchers.length; i++) {
                const switcher = switchers[i],
                    switcherOptions = _self.options(switcher.dataset["switcher"]),
                    switcherElems = switcher.children,
                    switcherTargets = _self.doc.querySelector('[data-switcher-target="' + switcherOptions.target + '"]').children,
                    switchersActive = [];

                for (let y = 0; y < switcherElems.length; y++) {
                    const switcherElem = switcherElems[y],
                        parentNode = switcher.children,
                        switcherTrigger = (switcherElem.children.length) ? switcherElem.children[0] : switcherElem,
                        switcherTarget = switcherTargets[y];


                    if (switcherElem.classList.contains('active')) {
                        for (let z = 0; z < parentNode.length; z++) {
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
                                for (let z = 0; z < elem.parentNode.children.length; z++) {
                                    elem.parentNode.children[z].classList.remove('active');
                                    targets[z].classList.remove('active');
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

    str2json(str, notevil) {
        try {
            if (notevil) {
                return JSON.parse(str
                    .replace(/([\$\w]+)\s*:/g, function (_, $1) {
                        return '"' + $1 + '":';
                    })
                    .replace(/'([^']+)'/g, function (_, $1) {
                        return '"' + $1 + '"';
                    })
                );
            } else {
                return (new Function("", "const json = " + str + "; return JSON.parse(JSON.stringify(json));"))();
            }
        } catch (e) {
            return false;
        }
    }

    options(string) {
        const _self = this;

        if (typeof string !== 'string') return string;

        if (string.indexOf(':') !== -1 && string.trim().substr(-1) !== '}') {
            string = '{' + string + '}';
        }

        const start = (string ? string.indexOf("{") : -1);
        let options = {};

        if (start !== -1) {
            try {
                options = _self.str2json(string.substr(start));
            } catch (e) {
            }
        }

        return options;
    }

    popups(options) {
        const _self = this;

        const defaults = {
            reachElementClass: '.js-popup',
            closePopupClass: '.js-close-popup',
            currentElementClass: '.js-open-popup',
            changePopupClass: '.js-change-popup'
        };

        options = $.extend({}, options, defaults);

        const plugin = {
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
                const pop = $(this).attr('data-popup-target');
                plugin.openPopup(pop);
            });

            plugin.closePopupEl.on('click', function (e) {
                let pop;
                if (this.hasAttribute('data-popup-target')) {
                    pop = $(this).attr('data-popup-target');
                } else {
                    pop = $(this).closest(options.reachElementClass).attr('data-popup');
                }

                plugin.closePopup(pop);
            });

            plugin.changePopupEl.on('click', function (e) {
                const closingPop = $(this).attr('data-closing-popup');
                const openingPop = $(this).attr('data-opening-popup');

                plugin.changePopup(closingPop, openingPop);
            });

            plugin.reachPopups.on('click', function (e) {
                const target = $(e.target);
                const className = options.reachElementClass.replace('.', '');
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

    tabSwitcher() {
        $(document).on('click', '.js-tab-trigger', function (e) {
            e.preventDefault();

            const $this = $(this),
                $tabListItem = $this.parent(),
                $tabTarget = $(`#${$this.closest('.js-tab').data('target')}`),
                $tabTargetListItems = $tabTarget.find('>li'),
                tabListIndex = $tabListItem.index();

            if (!$tabListItem.hasClass('active')) {
                $tabListItem.siblings('li').removeClass('active');
                $tabListItem.addClass('active');

                $tabTargetListItems.not(`:eq(${tabListIndex})`).addClass('fw-hidden');
                $tabTargetListItems.eq(tabListIndex).removeClass('fw-hidden');
            }
        });
    }

    toggletrigger() {
        $('.toggle__trigger').on("click", function (e) {
                e.preventDefault();
                let t = $(this),
                    n = t.closest(".toggle"),
                    a = n.find(".toggle__content");
                if (n.hasClass("toggle--active")) {
                    n.removeClass("toggle--active");
                    a.slideUp(300);
                } else {
                    n.addClass("toggle--active");
                    a.slideDown(300);
                }
            }
        )
    }

    accordion() {
        const vars = {
            container: '[data-accordion]',
            item: '[data-accordion-item]',
            label: '[data-accordion-label]',
            content: '[data-accordion-content]',
        };

        const accordion = {
            init: () => {
                accordion.bindings();
            },
            bindings: () => {
                $(vars.container).each(function () {
                    const $container = $(this);
                    const autoClose = this.hasAttribute('data-auto-close') ? $container.data('auto-close') : true;
                    $container.find(vars.label).on('click', function (e) {
                        e.preventDefault();
                        accordion.toggle($(this).closest(vars.item), autoClose);
                    });
                });
            },
            toggle: ($this, autoClose = true) => {
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

    scrollTo() {
        const $header = $('.header');
        let HH = $header.outerHeight();

        $(window).resize(() => {
            HH = $header.outerHeight();
        });

        $('.js-scroll-to').on('click', function (e) {
            e.preventDefault();
            let $el = $($(this).attr('href'));

            if (!!$el[0]) {
                if ($(this).hasClass('header-menu__link')) {
                    $(this).closest('.header-menu__item').siblings().removeClass('active').end().addClass('active');
                }

                $('body, html').animate({scrollTop: $el.offset().top - HH}, 1000);
            }
        });
    }

    headerAnimation() {
        // let WH = $(window).height();
        const $header = $('.header');
        checkHeader();
        $(window).scroll(() => {
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

    menuActualization() {
        let $sections = $('section');

        let sectionParams = [];

        setSettingsParams();
        detectActive();

        $(window).resize(() => {
            setSettingsParams();
        });

        $(window).scroll(() => {
            detectActive();
        });

        function detectActive() {
            let window_pos = $(window).scrollTop() + $(window).height() / 2;

            sectionParams.forEach(function (value, key) {
                for (let key in value) {
                    if(value[key].top < window_pos && value[key].bottom > window_pos) {
                        $('.header-menu__link').parent('.header-menu__item').removeClass('active');
                        $(`.header-menu__link[href="#${key}"]`).parent('.header-menu__item').addClass('active');
                    }
                }
            });
        }

        function setSettingsParams() {
            sectionParams = [];
            $sections.each(function () {
                let $id = $(this).attr('id');
                let obj = {};

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

    responsiveSvg() {
        $('.js-responsive-svg').each(function (e) {
            const $svg = $(this).find('svg:eq(0)');
            const height = parseInt($svg.attr('height'));
            const width = parseInt($svg.attr('width'));

            $(this).append(`<div style="padding-top: ${height/width*100}%"></div>`);
        });
    }
}
