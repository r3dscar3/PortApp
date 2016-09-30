$(document).ready(function () {
  //  Resize Overlays
  function overlaySizer() {
    var winWidth = $(window).innerWidth();
    var winHeight = $(window).innerHeight();
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

  // Scroll to Link w/ smoothScroll.js
  $('.ui-link, .gd-link').click(function (event) {
    event.preventDefault();
    var link = this;
    $.smoothScroll({
      scrollTarget: link.hash,
      speed: 'auto',
      autoCoefficient: 4
    });
  });

  //  Side Menu Animate
  $('.full-brand, .side-menu-contain .close').on('click', function () {
    $('.header').toggle('fade', 300);
    $('.side-menu-contain').toggle('slide', 300, 'swing');
    $('.main-contain').animate({
      'margin-left': $('.main-contain').css('margin-left') === '0px' ? '375px' : '0px'
    }, 300, 'swing');
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
  });

  //  Open Contact Overlay
  $('.contact-link').on('click', function (e) {
    e.preventDefault();
    $('#contact').toggle('slide', {
      direction: 'down'
    }, 400);
  });

  //  Open Info Overlay
  $('.info-link').on('click', function (e) {
    e.preventDefault();
    $('#info').toggle('slide', {
      direction: 'up'
    }, 400);
  });
  
  // top margin for centering carousel indicators
  function topCenter() {
    var halfHeight =  $('.carousel-indicators').innerHeight() / 2;
    $('.carousel-indicators').css('margin-top', -halfHeight);
  }
  topCenter();
  
  $(window).resize(function () {
    overlaySizer();
    topCenter();
  });

  function startCarousel() {
    $('#mainCarousel').carousel({
      interval: 10000,
      pause: false
    });
  }

});
