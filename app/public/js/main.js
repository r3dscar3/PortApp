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
  }
  overlaySizer();

  $(window).resize(function () {
    overlaySizer();
  });

  $('.full-brand, .side-menu-contain .close').on('click', function () {
    $('.header').toggle('fade', 300);
    $('.side-menu-contain').toggle('slide', 300, 'swing');
    $('.main-contain').animate({
      'margin-left': $('.main-contain').css('margin-left') == '0px' ? '375px' : '0px'
    }, 300, 'swing');
  });

  $('.overlay .close').css({
    opacity: 1
  })
  $('.side-menu-contain a.over-link, .jumbotron a').on('click', function (e) {
    e.preventDefault();
    var anchor = $(this).attr('href');
    $(anchor).show('fade', 300);
  });
  $('.overlay a.over-link').on('click', function (e) {
    e.preventDefault();
    var anchor = $(this).attr('href');
    $('.overlay').hide();
    $(anchor).show('fade', 300);
  });
  $('.main-contain .close').on('click', function () {
    $(this).parent('.overlay').hide('fade', 300);
  });
});
