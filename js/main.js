$(document).ready(function () {

    if ($('#my-slider').length) {
        $('#my-slider').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            items: 1,
            dotsEach: true
        });
    }
    $(document).on('click', 'a[href^="#"]', function (e) {
        // target element id
        var id = $(this).attr('href');
        console.log(id)
        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();
        // top position relative to the document
        var pos = $id.offset().top;
        // animated top scrolling
        $('body, html').animate({scrollTop: pos});
    });
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
    $('.disabled').click(function () {
        return false;
    });
    if ($('.wp-block-table').length) {
        $('.wp-block-table').each(function () {
            $(this).addClass('table').addClass('table-bordered')
        })
    }

    $('#menu-btn').click(function () {
        $(this).toggleClass('active');
        $('#main-menu').toggleClass('active');
    });

    $('#navbar .dropdowns').click(function () {
        if ($(window).width() < 768) {
            $(this).toggleClass('active');
        }
    });

/*    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if ($(window).width() > 767) {
            if (scroll >= 300) {
                $("header").addClass("scrolled");
            } else {
                $("header").removeClass("scrolled");
            }
            if (scroll >= 500) {
                $("header").addClass("sticky");
                $("body").addClass("scrolled");
            } else {
                $("header").removeClass("sticky");
                $("body").removeClass("scrolled");
            }
        } else {
            $("header").removeClass("sticky");
            $("body").removeClass("scrolled");
        }
    });*/

});


/*
* This function will be use to check either the target has filter expression items as a parent or not
*/
function checkRequiredParent(target, filterExpression) {
    //parents function return true if current element is child of any
    var res = filterExpression.split(',');
    var itemHasClass = false;
    var itemHasId = false;
    //search for either clicked item is required item
    for (var i = 0; i < res.length; i++) {
        //if found any one class than skip others
        if (!itemHasClass) {
            //remove . and # from string
            var className = res[i].replace('.', '').replace('#', '');
            itemHasClass = target.hasClass(className);
        }
        //if found a single id then skip others
        if (!itemHasId) {
            itemHasId = target.is(res[i]);
        }
    }
    //search for clicked item has required item as parent
    if (target.parents(filterExpression).length || itemHasClass || itemHasId) {
        return true;
    } else {
        return false;
    }
}