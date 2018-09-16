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
        $(".burger-menu").toggleClass("burger-menu--opened");
        $(".burger-menu").toggleClass("burger-menu--closed");
        $('.menu').toggleClass('menu_active');
    });
});