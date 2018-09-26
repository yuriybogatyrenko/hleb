$(document).ready(function () {

    ymaps.ready(init);

    function init(){
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
    // about maps init
    var aboutMapsInit = function (mapType, id) {
        AmCharts.makeChart(id, {
            "type": "map",
            "theme": "none",
            "projection": "mercator",
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

    // ________________________________________
    $(window).on("load", function () {
        $(".map-city-select .list").mCustomScrollbar();
    });

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

    // send form
    $("#footer-theme-form").submit(function () {
        $.ajax({
            method: "POST",
            url: "",
            data: "",
            contentType: 'application/json',
            success: function () {
                $(this).hide();
                $('.js-send-status').text('Спасибо! Ваше сообщение отправлено');
                $('.js-send-status').addClass('success');

                setTimeout(function () {
                    $('.select-theme-form').removeClass('active');
                }, 3000);
            },
            error: function () {
                $('#footer-theme-form').fadeOut();
                $('.js-send-status').text('Произошла ошибка');
                $('.js-send-status').addClass('error');

                setTimeout(function () {
                    $('.select-theme-form').removeClass('active');
                }, 3000);
            }
        });
        return false;
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

});