(function(pgdBend) {
  pgdBend(window.jQuery, window, document);
}(function($, window, document) {

  $(function() {

    $('input, textarea').on('focus', function() {
      $(this).siblings('label').css('opacity', 1);
    });

    $('input, textarea').on('blur', function() {
      $(this).siblings('label').css('opacity', 0);
    });

    var winWidth = $(window).innerWidth();
    var winHeight = $(window).innerHeight();

    // initially hide overlays
    $('.overlay').css('display', 'none');

    //  Resize Overlays
    function overlaySizer() {
      winWidth = $(window).innerWidth();
      winHeight = $(window).innerHeight();
      var overlayWidth = winWidth - 40;
      var overlayHeight = winHeight - 40;

      $('.overlay').css({
        position: 'fixed',
        width: overlayWidth + 'px',
        height: overlayHeight + 'px',
        left: 20 + 'px',
        top: 20 + 'px',
        'z-index': 99999
      });

      $('.overlay-inner').css({
        position: 'absolute',
        width: overlayWidth - 40 + 'px',
        height: overlayHeight - 40 + 'px',
        left: 15 + 'px',
        top: 15 + 'px',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden'
      });
    }
    overlaySizer();

    $(window).resize(function() {
      overlaySizer();

      if (!isPortfolioActive) {
        carouselResize();
        bg3();
      }

    });

    var isSideMenuVisible = false;

    //  Side Menu Animate
    $('.menu-bars, .side-menu-contain .close').on('click', function() {
      var portfolio = $(".portfolio-container.fixie");
      var top = portfolio.scrollTop();
      isSideMenuVisible = !isSideMenuVisible
        ? true
        : false;
      $('.header').toggle('fade', 300);
      $('.side-menu-contain').toggle('slide', 300, 'swing');

      if (winWidth < 768) {
        portfolio.toggleClass('no-scroll');
      }

      if (isPortfolioActive && top > 100) {
        $('#portfolio .brand').hide('fade', 300);
      } else {
        $('#portfolio .brand').toggle('fade', 300);
      }

      adjustPort();

      function adjustPort() {

        if (isSideMenuVisible) {

          $('.main-contain').animate({
            'margin-left': '300px'
          }, 300, 'swing', function() {
            if (!isPortfolioActive) {
              carouselInit();
            }
          });

        } else {

          $('.main-contain').animate({
            'margin-left': '0px'
          }, 300, 'swing', function() {
            if (!isPortfolioActive) {
              carouselInit();
            }
          });

        }

      }

      hidePrevOrNext();

    });

    //  Overlay css
    $('.overlay .close').css({opacity: 1});

    //  Close Overlay
    $('.overlay .close').click(function() {
      isOverlayActive = false;
      var d = 'left';
      if ($('#contact').is(':visible')) {
        d = 'right';
      } else {
        d = 'left';
      }
      $(this).parent('div').toggle('slide', {
        direction: d
      }, 400);

      $('body').css('overflow-y', 'scroll');
    });

    //  Open Contact Overlay
    $('.contact-link').on('click', function(e) {
      e.preventDefault();
      $('#contact').toggle('slide', {
        direction: 'down'
      }, 400);
      isOverlayActive = isOverlayActive
        ? false
        : true;
    });

    //  Open Info Overlay
    $('.info-link').on('click', function(e) {
      e.preventDefault();
      $('#info').toggle('slide', {
        direction: 'up'
      }, 400);
      isOverlayActive = isOverlayActive
        ? false
        : true;
    });

    $('.contactMe').on('click', function(e) {
      e.preventDefault();
      $('#info').toggle('slide', {
        direction: 'up'
      }, 400, function() {
        $('#contact').toggle('slide', {
          direction: 'right'
        }, 400);
      });
    });

    // view portfolio

    $('#portfolio-link').on('click', function(e) {
      e.preventDefault();
      carouselInit();
      showCarousel();
    });

    // portfolio carousel

    function carouselInit() {
      var portContW = $("#portfolio").outerWidth();

      if (winWidth < 768) {
        var caroWidth = portContW * 0.8;
        var caroHeight = winHeight * 0.8;
        $('.portfolio-container').animate({
          width: caroWidth + "px",
          height: caroHeight + "px",
          top: (winHeight - caroHeight) / 2 + "px",
          left: (portContW - caroWidth) / 2 + "px"
        }, 100, 'swing', bg3);
      } else {
        var caroWidth = portContW * 0.55;
        var caroHeight = winHeight * 0.65;
        $('.portfolio-container').animate({
          width: caroWidth + "px",
          height: caroHeight + "px",
          top: (winHeight - caroHeight) / 2 + "px",
          left: (portContW - caroWidth) / 2 + "px"
        }, 100, 'swing', bg3);
      }

      return false;

    }

    function showCarousel() {
      $('#portfolio').show('scale', 300, function() {
        $('.brand').show('fade', 300);
      });
    }

    function bg3() {
      $('.bg-3').animate({
        top: (winHeight * 0.65) - 150 + "px"
      }, 200, "swing");
    }

    function carouselResize() {
      winHeight = $(window).innerHeight();
      var portContW = $("#portfolio").outerWidth();
      var caroWidth = portContW * 0.55;
      var caroHeight = winHeight * 0.65;
      var oW = $(this).outerWidth();

      $('.portfolio-container').css({
        width: caroWidth + "px",
        height: caroHeight + "px",
        top: (winHeight - caroHeight) / 2 + "px",
        left: (portContW - caroWidth) / 2 + "px"
      });
      bg3();
    }

    //Hide prev next depending on slide position

    function hidePrevOrNext() {
      if (isSideMenuVisible && winWidth < 768) {
        $('.carousel-control-prev').hide();
        $('.carousel-control-next').hide();
      } else if ($('.carousel-item').first().hasClass('active')) {
        $('.carousel-control-next').show();
        $('.carousel-control-prev').hide();
      } else if ($('.carousel-item').last().hasClass('active')) {
        $('.carousel-control-prev').show();
        $('.carousel-control-next').hide();
      } else {
        $('.carousel-control-prev').show();
        $('.carousel-control-next').show();
      }
    }
    hidePrevOrNext();

    $('#portfolioCarousel').on('slid.bs.carousel', function() {
      hidePrevOrNext();
    });

    //Side menu Links
    $('.side-menu-wrap .nav-link').on('click', function() {
      if (isPortfolioActive) {
        isPortfolioActive = false;
        $('.header .close').hide();
        $('.portfolio-container').scrollTop(0);
        $('.portfolio-bg').css('height', '100%');
        $(".portfolio-container").removeClass('fixie');
        $(".portfolio-container").parent().removeClass('fixie')
        carouselInit();
      } else if (!$('#portfolio').is(":visible")) {
        carouselInit();
        showCarousel();
      }

      $('.side-menu-wrap .nav-link').removeClass('active');
      $(this).addClass('active');
      $(".side-menu-contain .close").triggerHandler('click');

    });

    var scrollEvent = (/Firefox/i.test(navigator.userAgent))
      ? "DOMMouseScroll"
      : "mousewheel";
    var isPortfolioActive = false;
    var isOverlayActive = false;
    $(window).bind(scrollEvent, function(e) {
      var portfolio = $(".portfolio-container.fixie");
      var top = portfolio.scrollTop();

      if (isPortfolioActive && !isSideMenuVisible && top > 100) {
        $('.brand').hide('fade', 300);
      } else if (isPortfolioActive && !isSideMenuVisible && top < 100) {
        $('.brand').show('fade', 300);
      }

      if (!isSideMenuVisible && winWidth > 768) {
        if ($('#portfolio').is(":visible") && !isPortfolioActive && !isOverlayActive) {
          var evt = window.event || e;
          evt = evt.originalEvent
            ? evt.originalEvent
            : evt;
          var delta = evt.detail
            ? evt.detail
            : evt.wheelDelta;

          if (timer > 1500) {
            timer = 0;
            if (delta / 120 > 0) {
              $('#portfolioCarousel').carousel('prev');
            } else {
              $('#portfolioCarousel').carousel('next');
            }
          }
        }
      }

    });

    $("#portfolioCarousel").on("slid.bs.carousel", function() {
      checkSlideLinks();
    });

    function checkSlideLinks() {
      var slidesIndex = $(".carousel-item");
      slidesIndex.each(function(i) {
        var activeSlide = i;
        if ($(this).hasClass('active')) {
          var sideMenuLinks = $(".side-menu-wrap .nav-pills .nav-link");
          sideMenuLinks.removeClass('active');
          sideMenuLinks.eq(activeSlide).addClass('active');
        }
      });
    }

    var timer = 0;
    setInterval(function() {
      timer += 50;
    }, 50);

    var elements = $(".portfolio-container");
    elements.on('mouseenter', function() {
      if (!isPortfolioActive) {
        $(this).animate({
          width: '+=6%',
          height: '+=6%',
          top: '-=3%',
          left: '-=3%'
        }, 200, "swing");
      }
    });
    elements.on('mouseleave', function() {
      if (!isPortfolioActive) {
        $(this).animate({
          width: '-=6%',
          height: '-=6%',
          top: '+=3%',
          left: '+=3%'
        }, 200, "swing");
      }
    });

    elements.on("click", function(e) {
      e.stopPropagation();
      var element = $(this);
      var bg3 = element.children('.portfolio-bg').find('.bg-3');
      var eSh = element.prop("scrollHeight");

      if (!isPortfolioActive) {
        isPortfolioActive = true;

        bg3.animate({
          top: "+=200px"
        }, 300, "swing");

        if (!element.hasClass("fixie")) {
          element.addClass("fixie");
          element.parent().addClass('fixie');
          element.animate({
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }, 300, 'swing');

          element.children('.portfolio-bg').css({height: eSh});

        }
        setTimeout(function() {
          $('.header .close').show('fade', 300);
        }, 300);
      }

    });

    $('.header .close').on('click', function(e) {
      e.stopPropagation();
      $(this).hide();
      isPortfolioActive = false;
      $('.portfolio-container').removeClass("fixie");
      $('.portfolio-container').parent().removeClass("fixie");

      $('.portfolio-container').scrollTop(0);
      $('.portfolio-bg').css('height', '100%');
      carouselInit();
    });

  });
}));
