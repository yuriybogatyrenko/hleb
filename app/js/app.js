$(document).ready(function () {
    // select
    $('select').niceSelect();

    var $animatedImage = $('.js-first-screen-animated-image');

    if($animatedImage.length) {
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
        $(this).toggleClass('active');
        $(this).next().slideToggle();
    });

    // smooth scroll
    $('.js-go-to').on('click', function () {
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length !== 0) {
            $('html, body').animate({scrollTop: $(scroll_el).offset().top}, 500);
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
        smartSpeed: 350,
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
        $('.js-fixed-menu-right').removeClass('fixed-menu-right-active');
        $("ul.fixed-menu-tabs-navigation li").removeClass("active");
    });


//    tabs

    $(function () {
        $('.priorities-wrap-list-item').on('click', function () {
            var activeTab = $(this).attr("rel");
            $('.js-priorities-wrap-tabs-tab').removeClass('active');
            $("#" + activeTab).fadeIn(function () {
                $(this).addClass('active');
            });

            $(".priorities-wrap-list-item").removeClass("active");
            $(this).addClass("active");
        });

        $("ul.fixed-menu-tabs-navigation li").on('click', function () {
            var activeTab = $(this).attr("rel");
            $('.js-fixed-menu-right').addClass('fixed-menu-right-active');
            $('.js-fixed-menu-tab-content').removeClass('fixed-menu-tab-content-active');

            $("#" + activeTab).fadeIn(function () {
                $(this).addClass('fixed-menu-tab-content-active');
            });

            $("ul.fixed-menu-tabs-navigation li").removeClass("active");
            $(this).addClass("active");

        });

    });

});