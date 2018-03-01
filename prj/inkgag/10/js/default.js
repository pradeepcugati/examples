 $(document).ready(function() {
        (function($) {
            $('.modal').modal(); // initialize modal
            $('#modalNewsletter').modal('open');
            $('.tooltipped').tooltip({delay: 50});
            var windowUrl = window.location.href;
            var lastSlash = windowUrl.lastIndexOf('/');
            var pageName = windowUrl.substring(lastSlash + 1);
            if(pageName == "category_listing.html"){
                var slider = document.getElementById('test5');
                noUiSlider.create(slider, {
                    start: [20, 80],
                    connect: true,
                    step: 1,
                    range: {
                        'min': 0,
                        'max': 100
                    },
                    format: wNumb({
                        decimals: 0
                    })
                });
            }

            
        })(jQuery);

        $('a').on('click', function() {
            customfunc.hrefEmpty(event);
        })
        $('.dropdown-button').dropdown({
            constrainWidth: false,
            hover: true,
            belowOrigin: true,
            stopPropagation: false
        })
        var headerWrap = $('.header-wrap');
        var header = $('.page-header');

        
        
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            var headerHeight = $(header).outerHeight(true)
            if(scrollTop > headerHeight){
                $(header).addClass('header-active')
                //$(header).css({'position':'fixed','top':'-50px','background-color':'rgba(255,255,255,0.8)'})
            } else{
                //$(header).css({'position':'absolute','top':'auto','background-color':'transparent'})
                $(header).removeClass('header-active')
            }    
        })
        

        $(header).css({'width': $(headerWrap).width()})

        

        /*$('#search').on('click',function(){
            $('#search').addClass('active');
        })*/

        $('header .input-field').on({
            click: function(event) {
                $(this).addClass('active');
            },
            focusout: function(event) {
                $(this).removeClass('active');
                $(this).find('input').val('');
            }
        })
    })

    var CustomFunction = function() {
        this.hrefEmpty = function(event) {
            var linkVal = $('a').attr('href');
            console.log(linkVal);
            if ((linkVal == "") || (linkVal == "#")) {
                event.preventDefault();
            }
        }
    }

    var customfunc = new CustomFunction();
