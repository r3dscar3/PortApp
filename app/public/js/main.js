$(document).ready(function() {
  var sideMenu = false;
  $('.full-brand, .side-menu-contain .close').on('click', function() {
    $('.header').toggle('fade', 300);
    $('.side-menu-contain').toggle('slide', 300, 'swing');
    $( '.main-contain' ).animate({
      'margin-left' : $('.main-contain').css('margin-left') == '0px' ? '25%' : '0px'
    }, 300, 'swing');
  });
  
  $('a.section-navi').on('click', function(e) {
    e.preventDefault();
    $(this).parent('section').toggleClass('collapsed', 600, 'easeOutElastic');
  });
});