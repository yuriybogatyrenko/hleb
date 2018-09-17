$(document).ready(function() {
    $('select').niceSelect();

     //owl
    $('.header-slider ').owlCarousel({
        items: 1,
        dots: true,
        smartSpeed: 350,
        animateOut: 'fadeOut',
        dotsContainer: '#carousel-custom-dots'
    });

    $( '.owl-dot' ).on( 'click', function() {
        $('.owl-carousel').trigger('to.owl.carousel', [$(this).index(), 300]);
        $( '.owl-dot' ).removeClass( 'active' );
        $(this).addClass( 'active' );
    });

//     burger menu
    $('.main-menu-link').on('click', function() {
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
        // $(".fixed-menu-tab-content").hide();
        // $(".fixed-menu-tab-content:first").show();

        /* if in tab mode */
        $("ul.fixed-menu-tabs-navigation li").on('click', function() {
            var activeTab = $(this).attr("rel");
            $('.js-fixed-menu-right').addClass('fixed-menu-right-active');
            $('.js-fixed-menu-tab-content').removeClass('fixed-menu-tab-content-active');

            $("#"+activeTab).fadeIn(function () {
                $(this).addClass('fixed-menu-tab-content-active');
            });

            $("ul.fixed-menu-tabs-navigation li").removeClass("active");
            $(this).addClass("active");

        });

    });

});