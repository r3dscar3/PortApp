$(document).ready(function () {
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

  $(window).resize(function () {
    overlaySizer();
  });

  $('.full-brand, .side-menu-contain .close').on('click', function () {
    $('.header').toggle('fade', 300);
    $('.side-menu-contain').toggle('slide', 300, 'swing');
    $('.main-contain').animate({
      'margin-left': $('.main-contain').css('margin-left') === '0px' ? '375px' : '0px'
    }, 300, 'swing');
  });

  $('.overlay .close').css({
    opacity: 1
  });

  $('.contact-link').on('click', function (e) {
    e.preventDefault();
    $('#contact').toggle('slide', {
      direction: 'down'
    }, 400);
  });

  $('.ui-link').on('click', function (e) {
    e.preventDefault();
    if ($('#graphic').is(':visible')) {
      $('#graphic').toggle('slide', {
        direction: 'up'
      }, 400);
      setTimeout(function () {
        $('#ui').toggle('slide', {
          direction: 'right'
        }, 400);
      }, 400);
    } else {
      $('#ui').toggle('slide', {
        direction: 'right'
      }, 400);
    }
  });

  $('.gd-link').click(function (e) {
    e.preventDefault();
    if ($('#ui').is(':visible')) {
      $('#ui').toggle('slide', {
        direction: 'up'
      }, 400);
      setTimeout(function () {
        $('#graphic').toggle('slide', {
          direction: 'left'
        }, 400);
      }, 400);
    } else {
      $('#graphic').toggle('slide', {
        direction: 'left'
      }, 400);
    }
  });

  $('.main-contain .close').click(function () {
    var d = 'left';
    if ($('#ui').is(':visible')) {
      d = 'right';
    } else {
      d = 'left';
    }
    $(this).parent('div').toggle('slide', {
      direction: d
    }, 400);
  });

  function startCarousel() {
    $('#mainCarousel').carousel({
      interval: 10000,
      pause: false
    });
  }

});
