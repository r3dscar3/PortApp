$(document).ready(function () {

    $(window).resize(function () {
        setHeight();
        imageResizer();
    });

    function setHeight() {
        var windowHeight = $(window).innerHeight(),
            windowWidth = $(window).innerWidth(),
            adjustedHeight = windowHeight - 100;

        if (windowWidth < 768) {
            $('#mainCarousel .item, #mainCarousel .carousel-inner').css({
                'max-height': windowHeight - 30,
                'height': windowHeight - 30,
                'max-width': windowWidth
            });
            $('.info-wrap, .theContacter').css({
                'padding-bottom': 10
            });
        } else {
            $('#mainCarousel .item, #mainCarousel .carousel-inner').css({
                'max-height': windowHeight - 60,
                'height': windowHeight - 60,
                'max-width': windowWidth - 10
            });
            $('.info-wrap, .theContacter').css({
                'padding-bottom': 'inherit'
            });
        }
        $('.container-fluid').css('height', windowHeight);
        $('.herotron').css('height', windowHeight);
        $('#mainCarousel').css('height', windowHeight);
        $('.info-wrap, .theContacter, .middle-align-table, .info-content').css({
            height: windowHeight
        });
    }
    setHeight();

    function imageResizer() {
        var $img = $(".item img"),
            pic_real_width = $img.prop("naturalWidth"),
            pic_real_height = $img.prop("naturalHeight"),
            ratio = pic_real_height / pic_real_width,
            iw = $img.width(),
            ih = $img.height(),
            ww = $('.item').width(),
            wh = $('.item').height(),
            newh = ww * ratio,
            neww = wh / ratio;

        if (ww < pic_real_width && wh > newh) {
            $('.item img').css({
                'margin-left': -(neww / 2) + 'px',
                'min-height': wh,
                'min-width': neww,
                left: '50%'
            });
        } else {
            $img.removeAttr('style');
        }
    }
    imageResizer();

    //Preloader
    //<![CDATA[
    $(window).load(function () { // makes sure the whole site is loaded
        $('#status').delay(3000).fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(3350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(3350).css({
            'overflow': 'visible'
        });
    });
    //]]>

    //    $(' section.page-1, section.page-1 .herotron').delay(2000).animate({
    //        height: [herotronHeight, "swing"]
    //    }, 300)



    $('.infoer').click(function () {
        if ($('.info-wrap').is(':visible')) {
            $('.info-wrap').toggle('slide', {
                direction: 'right'
            }, 400);
        } else {
            $('.info-wrap').toggle('slide', {
                direction: 'right'
            }, 400);
        }
    });

    $('.contacter').click(function () {
        if ($('.theContacter').is(':visible')) {
            $('.theContacter').toggle('slide', {
                direction: 'left'
            }, 400);
        } else {
            $('.theContacter').toggle('slide', {
                direction: 'left'
            }, 400);
        }
    });

    $('a.close').click(function () {
        var d = 'left';
        if ($('.info-wrap').is(':visible')) {
            d = 'right';
        } else {
            d = 'left';
        }
        $(this).parent('div').toggle('slide', {
            direction: d
        }, 400);
    });

    $('.contactMe').on('click', function () {
        $('.info-wrap').slideToggle(400, function () {
            $('.theContacter').show('slide', 400);
        });
    });

    //        if ($('.info-wrap').is(':visible')) {
    //            $('.info-wrap').toggle('slide', {
    //                direction: 'right'
    //            }, 400);
    //        } else {
    //            $('.theContactor').toggle('slide', {
    //                direction: 'left'
    //            }, 400);
    //        }

    function startCarousel() {
        $('#mainCarousel').carousel({
            interval: 10000,
            pause: false
        });
    }

    function fadeIntro() {
        $('#mainCarousel').removeClass('fadeOut').addClass('fadeIn', function () {
            startCarousel();
            $('.brander').removeClass('fadeOut').addClass('fadeIn');
        });
        $('.carousel .item.active .carousel-caption').removeClass('fadeOut').addClass('fadeIn');
    }

    $('.startButton').on('click', function () {
        $('.introduction').removeClass('fadeIn').addClass('fadeOut', function () {
            setTimeout(function () {
                $('.introduction').css('display', 'none');
                fadeIntro();
            }, 1000);
        });
    });

    function captionSizer() {
        var windowWidth = $(window).innerWidth();
        if (windowWidth > 768) {
            var divWidth = $('.item.active .caption-wrap').width();
            var divHeight = $('.item.active .caption-wrap').height();
            var posx = ((Math.random() * ($('#mainCarousel').width() - divWidth)) / 1.5).toFixed();
            var posy = ((Math.random() * ($('#mainCarousel').height() - divHeight)) / 3).toFixed();

            if (posy < 100) {
                posy = 150;
            }

            $('.outer-pad-wrap').css({
                'position': 'absolute',
                'left': posx + 'px',
                'top': posy + 'px'
            });
        }

    }
    captionSizer();

    $('#mainCarousel').on('slid.bs.carousel', function () {
        $('.carousel .item.active .carousel-caption').addClass('fadeIn').removeClass('fadeOut');
        captionSizer();
    });

    $('#mainCarousel').on('slide.bs.carousel', function () {
        $('.carousel .item.active .carousel-caption').addClass('fadeOut').removeClass('fadeIn');
    });

    var randomColor = function () {
        var colors = ['rgba(124, 108, 212, 0.9)', 'rgba(16, 198, 39, 0.9)', 'rgba(11, 173, 242, 0.9)', 'rgba(234, 169, 13, 0.9)', 'rgba(203, 48, 137, 0.9)'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    $('.carousel-caption').css('background-color', randomColor);

    $('.thank-you .close').on('click', function () {
        window.open('http://pgdbend.com');
    });

    $(function () {
        $('.error').hide();
        $("#submit_btn").click(function () {
            // validate and process form here

            $('.error').hide();
            var name = $("input#name").val();
            if (name === "") {
                $("label#name_error").show();
                $("input#name").focus();
                return false;
            }
            var email = $("input#email").val();
            if (email === "") {
                $("label#email_error").show();
                $("input#email").focus();
                return false;
            }
            var message = $("textarea#message").val();
            
            var dataString = 'name=' + name + '&email=' + email + '&message=' + message;
            //alert (dataString);return false;
            $.ajax({
                type: "POST",
                url: "php/form_mailer.php",
                data: dataString,
                success: function () {
                    $('#contactForm').html("<div id='returnMessage'></div>");
                    $('#returnMessage').html("<h2>Contact Form Submitted!</h2>")
                        .append("<p>We will be in touch soon.</p>")
                        .append("<div id='returnMessagecheck'></div>")
                        .hide()
                        .fadeIn(1500, function () {
                            $('#returnMessagecheck').html("<i class='fa fa-check fa-2x text-success'></i>");
                        });
                }
            });
            return false;

        });
    });



    // Scroll mMnu

    //    $(function () {
    //        var lastScrollTop = 0,
    //            delta = 200;
    //        $(window).scroll(function (event) {
    //            var st = $(this).scrollTop();
    //
    //            if (Math.abs(lastScrollTop - st) <= delta)
    //                return;
    //
    //            if (st < lastScrollTop) {
    //
    //                $('.main-nav-wrap').show('slide', {
    //                    direction: 'right'
    //                }, 200);
    //
    //
    //            } else {
    //                if ($('.main-nav-wrap').is(':visible')) {
    //                    $('.main-nav-wrap').hide('slide', {
    //                        direction: 'right'
    //                    }, 200);
    //                }
    //            }
    //            lastScrollTop = st;
    //        });
    //    });


});