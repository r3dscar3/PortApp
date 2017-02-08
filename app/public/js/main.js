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

  var uiSubMenuW = $('.ui-sub-menu').innerWidth();
  var uiSubMenuML = uiSubMenuW / 2;
  
  function uiSubMenuAffix() {
    // Sub Menu Attach
    var wS = $(window).scrollTop();
    var subMenuS = $('.ui-sub-menu').offset().top - 20;
    var uiS = $('.ui-header').offset().top;
    var uiHeaderH = $('.ui-header').innerHeight();

    if (wS > subMenuS && $('.main-contain').css('margin-left') === '0px') {
      $('.ui-sub-menu').addClass('attached');
      $('.ui-sub-menu').css({
        'margin-left': -uiSubMenuML,
        width: uiSubMenuW
      });
      $('.ui-header').addClass('clearspace');
    } else if (wS > subMenuS && $('.main-contain').css('margin-left') === '375px') {
      $('.ui-sub-menu').addClass('attached');
      $('.ui-sub-menu').css({
        'margin-left': -(uiSubMenuML - 375),
        width: uiSubMenuW - 375
      });
      $('.ui-header').addClass('clearspace');
    }
    if (wS < (uiS + uiHeaderH)) {
      $('.ui-sub-menu').removeClass('attached');
      $('.ui-header').removeClass('clearspace');
      $('.ui-sub-menu').removeAttr('style');
    }
  }
  uiSubMenuAffix();
  
  $(window).scroll(function () {
    uiSubMenuAffix();
  });

});
