jQuery(document).ready(function( $ ) {

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $('#intro').css({ height: $(window).height() });
  }

  $(window).resize(function () {
    $('#intro').css({ height: $(window).height() });
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $('.venobox').venobox({
    bgcolor: '',
    overlayColor: 'rgba(6, 12, 34, 0.85)',
    closeBackground: '',
    closeColor: '#fff'
  });

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if( ! $('#header').hasClass('header-fixed') ) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1000, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center:true,
    responsive: { 0: { items: 1 }, 768: { items: 3 }, 992: { items: 4 }, 1200: {items: 5}
    }
  });

  // Buy tickets select the ticket type on click
  $('#buy-ticket-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data('ticket-type');
    var modal = $(this);
    modal.find('#ticket-type').val(ticketType);
  })


  //add active class for nav li on scroll

  $(window).scroll(function () {
    $('.sblock').each(function () {
        if ($(window).scrollTop() > $(this).offset().top - $('#header').innerHeight() - 100) {
            var blockID = $(this).attr('id');
            $('.nav-menu li').removeClass('menu-active');
            $('.nav-menu li a[href = #' + blockID + ']').parent('li').addClass('menu-active');
        }
    });
  });

  if ($(window).height() < 500) {
    $('.play-btn').hide();
  }

  $(window).resize(function () {
    if ($(window).height() < 500) {
      $('.play-btn').hide();
    } else {
      $('.play-btn').show();
    }
  });
  
  $("html").niceScroll({
    cursorcolor: '#f82249',
    cursorborder: 'none',
    cursorwidth: '8px',
    scrollspeed: '100',
    zindex: '999',
    cursoropacitymin:0.2,
  });


});

$(window).on('load', function () {
    
    'use strict';
    
    $('.loading .sk-folding-cube').fadeOut(500, function () {
        $('body').css("overflow", "auto");
        $('.loading').fadeOut(100, function () {
            $(this).remove();
        });
    });
    
});

//copy email address

var clipboard = new ClipboardJS('.clone');

$('.clone').click(function () {
  $('.tooltiptext').text('Copied');
}).mouseleave(function () {
  $('.tooltiptext').text('Copy');
});

// count down function

const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('dec 12, 2020 00:00:00').getTime(),
    x = setInterval(function() {    

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / (day)),
      document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
      document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
      document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

      // If the count down is over, write some text 
      if (distance < 0) {
          clearInterval(x);
          document.getElementById("count_down").innerHTML = "<p style='margin-bottom:10px; color:#f82249'>EXPIRED</p>";
      }

    }, second)


