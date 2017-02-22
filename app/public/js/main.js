$(document).ready(function () {
  var winWidth = $(window).innerWidth();
  var winHeight = $(window).innerHeight();

  //  Resize Overlays
  function overlaySizer() {
    var overlayWidth = winWidth - 40;
    var overlayHeight = winHeight - 40;
    $('.overlay').css({
      display: 'none',
      position: 'fixed',
      width: overlayWidth + 'px',
      height: overlayHeight + 'px',
      left: 20 + 'px',
      top: 20 + 'px',
      'z-index': 1000
    });
    $('.overlay-inner').css({
      position: 'absolute',
      width: overlayWidth - 40 + 'px',
      height: overlayHeight - 40 + 'px',
      left: 15 + 'px',
      top: 15 + 'px',
      'overflow-y': 'scroll'
    });
  }
  overlaySizer();

  function carouselInit() {
    var caroHeight = $('.portfolio-container').innerHeight();
    var caroMargin = '-' + (caroHeight / 2);

    $('#portfolioCarousel').css({
      top: 50 + '%',
      'margin-top':  caroMargin + 'px'
    });

  }
  carouselInit();

  //  Side Menu Animate
  $('.full-brand, .side-menu-contain .close').on('click', function () {
    $('.header').toggle('fade', 300);
    $('.side-menu-contain').toggle('slide', 300, 'swing');
    $('.main-contain').animate({
      'margin-left': $('.main-contain').css('margin-left') === '0px' ? '375px' : '0px'
    }, 300, 'swing');
    setTimeout(function() {
      uiSubMenuAffix();
    },300);
  });

  //  Overlay css
  $('.overlay .close').css({
    opacity: 1
  });

  //  Close Overlay
  $('.main-contain .close').click(function () {
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
  $('.contact-link').on('click', function (e) {
    e.preventDefault();
    $('#contact').toggle('slide', {
      direction: 'down'
    }, 400);
    $('body').css('overflow', 'hidden');
  });

  //  Open Info Overlay
  $('.info-link').on('click', function (e) {
    e.preventDefault();
    $('#info').toggle('slide', {
      direction: 'up'
    }, 400);
    $('body').css('overflow', 'hidden');
  });

  $(window).resize(function () {
    overlaySizer();
  });

  // view portfolio

  $('#portfolio-link').on('click', function(e) {
    e.preventDefault();
    $('#portfolio').show('scale', 300);
  });

  // portfolio carousel




});
