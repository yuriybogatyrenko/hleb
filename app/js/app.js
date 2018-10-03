$(document).ready(function () {

    ymaps.ready(init);

    function init() {
        // index map
        if ($('#index-map').length) {
            var myMap = new ymaps.Map("index-map", {
                center: [59.905782, 30.364647],
                zoom: 10,
                controls: ['zoomControl', 'fullscreenControl'],
            });

            var myPlacemark = new ymaps.Placemark([59.905782, 30.364647], {
                hintContent: 'Содержимое всплывающей подсказки',
                balloonContent: 'Содержимое балуна'
            }, {
                iconColor: 'darkred'
            });

            myMap.geoObjects.add(myPlacemark);
        }

        // shops map
        if ($("#shops-map").length) {
            var shopsMap = new ymaps.Map("shops-map", {
                center: [59.905782, 30.364647],
                zoom: 10,
                controls: ['zoomControl', 'fullscreenControl'],
            });

            var shopsPlacemark = new ymaps.Placemark([59.905782, 30.364647], {
                hintContent: 'Содержимое всплывающей подсказки',
                balloonContent: 'Содержимое балуна'
            }, {
                iconColor: 'darkred'
            });

            shopsMap.geoObjects.add(shopsPlacemark);
        }
    }

    // about maps init
    var aboutMapsInit = function (mapType, id) {
        AmCharts.makeChart(id, {
            "type": "map",
            "theme": "none",
            "projection": "mercator",
            "zoomControl": {
                homeButtonEnabled: false,
                "zoomControlEnabled": false,
                zoomFactor: 0,
                maxZoomLevel: 1
            },
            "dataProvider": {
                "map": mapType,
                "getAreasFromMap": true
            },
            "areasSettings": {
                "color": "#e5cdb8",
                "autoZoom": true,
                "selectedColor": "#caa98b",
                "rollOverColor": "#a61c35",
                "rollOverOutlineColor": "#FFFFFF",
            },
            "smallMap": {
                enabled: false
            },
            "export": {
                enabled: false,
            }
        });
    };

    aboutMapsInit('russiaLow', 'map-tab1');
    aboutMapsInit('worldLow', 'map-tab2');

    // select
    $('select').niceSelect();

    var $animatedImage = $('.js-first-screen-animated-image');

    if ($animatedImage.length) {
        $animatedImage.each(function () {
            $(this).addClass('first-screen-animated-image--active')
        });
    }

    // modal video
    $(".js-modal-btn").modalVideo();
    // WOW js
    new WOW().init();

    var $windowHeight = $(window).height();
    var $scrollTopBtn = $('.scroll-top-button');
    var $headerPlaceholder = $('.header-placeholder');
    var $header = $('.header');

    $(window).resize(function () {
        $windowHeight = $(window).height();
        $headerPlaceholder.css({height: $header.height()});
    });

    $(window).trigger('resize');

    $(window).scroll(function () {
        if ($(window).scrollTop() > $windowHeight) {
            $scrollTopBtn.addClass('visible');
        } else {
            $scrollTopBtn.removeClass('visible');
        }
    });

    // toggle contacts
    $('.js-toggle-contacts').on('click', function () {
        $(this).parent().hide();
    });

    // smooth scroll
    $('.js-go-to').on('click', function () {
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length !== 0) {
            $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 500);
        } else {

        }
        return false;
    });

    //owl
    $('.js-command-slider').owlCarousel({
        items: 3,
        dots: false,
        nav: true,
        margin: 160,
        smartSpeed: 350,
        navText: ['<i class="icon-arrow fw-fz-16"></i>', '<i class="icon-arrow fw-fz-16"></i>']
    });

    //owl
    $('.js-corporate-life-slider').owlCarousel({
        items: 1,
        dots: true,
        nav: true,
        margin: 0,
        loop: true,
        smartSpeed: 350,
        navText: ['<i class="icon-arrow fw-fz-16"></i>', '<i class="icon-arrow fw-fz-16"></i>']
    });

    $('.header-slider ').owlCarousel({
        items: 1,
        dots: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 7000,
        smartSpeed: 1000,
        animateOut: 'fadeOut',
        dotsContainer: '#carousel-custom-dots'
    });

    $('.owl-dot').on('click', function () {
        $('.owl-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
        $('.owl-dot').removeClass('active');
        $(this).addClass('active');
    });

//     burger menu
    $('.main-menu-link').on('click', function () {
        $('.fixed-menu').toggleClass('fixed-menu-open');
        $(this).toggleClass("main-menu-link-active");
        $(".burger-menu").toggleClass("burger-menu--opened");
        $(".burger-menu").toggleClass("burger-menu--closed");
        $('.menu').toggleClass('menu_active');
        $('.js-fixed-menu-right').removeClass('active');
        $('.js-fixed-menu-tab-content').removeClass('active');
        $("ul.fixed-menu-tabs-navigation li").removeClass("active");
    });

    // footer form
    $('.js-footer-select').on('change', function () {
            $('.js-footer-select option:selected').each(function () {
                $('.select-theme-wrap').addClass('active');
            });
        }
    );

    $('.js-if-theme-selected-list li a').on('click', function (e) {
        e.preventDefault();
        $('.select-theme-wrap').removeClass('active');
        $('.select-theme-form').addClass('active');
    });

    // popups
    $(function () {
        var popupOverlay = $('.popup-overlay');

        function closePopup(popupId) {
            $('.js-app-wrapper').removeClass('popup-blur');
            $('#' + popupId).addClass('fw-hidden');
            $('.popup-overlay').addClass('fw-hidden');
        }

        function openPopup(popupId) {
            $('.js-app-wrapper').addClass('popup-blur');
            $(popupOverlay).removeClass('fw-hidden');
            $('#' + popupId).removeClass('fw-hidden');
        }

        $('.js-open-popup').on('click', function () {
            var dataTargetPopup = $(this).attr('data-target-popup');
            openPopup(dataTargetPopup);
        });

        $('.js-close-popup').on('click', function () {
            var dataTargetClosePopup = $(this).attr('data-target-close-popup');
            closePopup(dataTargetClosePopup);
        });
    });

    // send form
    $("#popup-feedback-form").submit(function () {
        $.ajax({
            method: "POST",
            url: "",
            data: "",
            contentType: 'application/json',
            success: function () {
                $(this).hide();
                $('.js-send-status').text('Спасибо! Ваше сообщение отправлено');

                setTimeout(function () {
                    $('.js-app-wrapper').removeClass('popup-blur');
                    $('#thanks-popup').addClass('fw-hidden');
                    $('.popup-overlay').addClass('fw-hidden');
                }, 3500);
            },
            error: function () {
                $("#feedback-popup").addClass('fw-hidden');
                $("#thanks-popup").removeClass('fw-hidden');

                $('.js-send-status').text('Произошла ошибка');

                setTimeout(function () {
                    $('.js-app-wrapper').removeClass('popup-blur');
                    $('#thanks-popup').addClass('fw-hidden');
                    $('.popup-overlay').addClass('fw-hidden');
                }, 3500);
            }
        });
        return false;
    });

    // toggle
    $('.js-mobile-toggle-menu').on('click', function () {
        $('.js-toggle-footer-menu').slideToggle();
    });
    // tabs
    $(function () {
        $('.js-map-navigation-item').on('click', function () {
            var activeTab = $(this).attr("rel");

            $('.js-map-navigation-item').removeClass('active');
            $('.js-map-tab-wrap').removeClass('active');

            $("#" + activeTab).addClass('active');

            $(".js-priorities-wrap-list-item").removeClass("active");
            $(this).addClass("active");
        });


        $('.js-priorities-wrap-list-item').on('click', function () {
            var activeTab = $(this).attr("rel");
            $('.js-priorities-wrap-tabs-tab').removeClass('active');
            $("#" + activeTab).fadeIn(function () {
                $(this).addClass('active');
            });

            $(".js-priorities-wrap-list-item").removeClass("active");
            $(this).addClass("active");
        });

        $("ul.fixed-menu-tabs-navigation li").on('click', function () {
            var activeTab = $(this).attr("rel");
            $('.js-fixed-menu-right').addClass('active');
            $('.js-fixed-menu-tab-content').removeClass('active');


            $("#" + activeTab).fadeIn(function () {
                $(this).addClass('active');
            });

            $("ul.fixed-menu-tabs-navigation li").removeClass("active");
            $(this).addClass("active");

        });

    });

    $('.js-toggle-item').on('click', function (e) {
        e.preventDefault();

        $(this)
            .toggleClass('active')
            .closest('.js-toggle-item')
            .toggleClass('fw-bg-color-light-pale-yellow')
            .find('.js-toggle-body')
            .toggleClass('fw-hidden');
    });
});

// ________________________________________
$(window).on("load", function () {
    $(".map-city-select .list").mCustomScrollbar();
    console.log('h2')
    setTimeout(function () {
        console.log('hi')
        $('.custom-scrollbar').mCustomScrollbar();
    }, 1000);
});