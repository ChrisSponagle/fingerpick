$(document).ready(function () {

    //gnb
    $(".nav_box").on('mouseenter focusin', function () {
        $(".twoDBg").slideDown(300);
        $(".nav_box li .twoD").slideDown(300);
    })
    $(".nav_box").on('mouseleave', function () {
        $(".twoDBg").stop().slideUp(300);
        $(".nav_box li .twoD").stop().slideUp(300);
    })

    //모바일메뉴
    $('.mobile_gnb_open_btn').click(function () {
        if ($(this).is('.is-active')) {
            $(this).removeClass('is-active');
            $(".mobile_gnb_list").removeClass('on');
            $(".family_link_m").removeClass('on');
            $(".header_wrap .header h1").removeClass('on');
            $("html, body").css({
                "height": "auto",
                "overflow-y": "auto"
            });
            $(".mobile_gnb_list .gnb_area .oneD.depth").eq(mOneDNum).removeClass("on");
            $(".mobile_gnb_list .gnb_area .twoD").eq(mOneDNum).hide();
            mOneDNum = -1;
        } else {
            $(this).addClass('is-active');
            $(".mobile_gnb_list").addClass('on');
            $(".family_link_m").addClass('on');
            $(".header_wrap .header h1").addClass('on');
            $("html, body").css({
                "height": $(window).height(),
                "overflow-y": "hidden"
            });
        };
    });

    var mOneDNum = -1;
    $(".mobile_gnb_list .gnb_area .oneD.depth").each(function (i) {
        $(this).click(function () {
            if (mOneDNum != i) {
                $(".mobile_gnb_list .gnb_area .oneD.depth").eq(mOneDNum).removeClass("on");
                $(".mobile_gnb_list .gnb_area .twoD").eq(mOneDNum).slideUp(300);
                mOneDNum = i;
                $(".mobile_gnb_list .gnb_area .oneD.depth").eq(mOneDNum).addClass("on");
                $(".mobile_gnb_list .gnb_area .twoD").eq(mOneDNum).slideDown(300);
            } else {
                $(".mobile_gnb_list .gnb_area .oneD.depth").eq(mOneDNum).removeClass("on");
                $(".mobile_gnb_list .gnb_area .twoD").eq(mOneDNum).slideUp(300);
                mOneDNum = -1;
            }
        });
    });
    

    /*메인비주얼슬라이드*/
    var owl = $('.main_visual_slide');
    owl.owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        smartSpeed: 400,
        mouseDrag:false,
        animateOut: 'fadeOut'
    })
    owl.on('changed.owl.carousel', function(event) {
      var item = event.item.index - 2;     // Position of the current item
      $('.main_visual_slide .in_box').removeClass('on');
      $('.owl-item').not('.cloned').eq(item).find('.txt .box_wrap .in_box').addClass('on');
  });
    
    
  /*사업소개 대표실적 갤러리*/
  var slider = $('.bis_slide');
  var thumbnailSlider = $('#thumbnailSlider');
  var duration = 500;
  slider.owlCarousel({
      loop: false, 
      dots:false,
      nav: false, 
      items: 1
  }).on('changed.owl.carousel', function (e) {
      thumbnailSlider.trigger('to.owl.carousel', [e.item.index, duration, true]);
  });
  thumbnailSlider.owlCarousel({
      loop: false, 
      nav: false, 
      dots:false,
      touchDrag: false, 
      mouseDrag: false, 
      responsive: {
          0: {
              items: 3
          }
          , 600: {
              items: 4
          }
          , 1000: {
              items: 6
          }
      }
  }).on('click', '.owl-item', function () {
      slider.trigger('to.owl.carousel', [$(this).index(), duration, true]);
      
  }).on('changed.owl.carousel', function (e) {
      slider.trigger('to.owl.carousel', [e.item.index, duration, true]);
  });
  $('.control1 .slider-right').click(function () {
      slider.trigger('next.owl.carousel');
  });
  $('.control1 .slider-left').click(function () {
      slider.trigger('prev.owl.carousel');
  });
    
    /*패밀리사이트*/
    $('.family_site button').on('click', function () {
        $(this).toggleClass('on');
        $('.family_site ul').slideToggle(300);
    });
    $('.lang_link button').on('click', function () {
        $(this).toggleClass('on');
        $('.lang_link ul').slideToggle(300);
    });

    /*서브메뉴*/
    $('.sub_nav ul li').each(function () {
        $(this).on("click", function () {
            $(this).find('.sub_oneD').toggleClass('on');
            $(this).find('.sub_twoD').slideToggle(200);
        });
    });
    
    /*서브탭메뉴*/
    $('.sub_tab.inpage a').each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var currentClick = $(this).attr('href');
            $(this).addClass('on');
            $(this).siblings().removeClass('on')
            $('.sub_tab_content > div').removeClass('on');
            $(currentClick).addClass('on');
        });
    });
    
    /*카테고리메뉴*/
    $('.category_nav.inpage a').each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var currentClick = $(this).attr('href');
            $(this).addClass('on');
            $(this).siblings().removeClass('on')
            $(this).parent().parent().find('.sub_tab_content > div').removeClass('on');
            $(currentClick).addClass('on');
        });
    });
    
    
    //탑버튼
    $(window).scroll(function(){
        if($(window).scrollTop() > 500){
            $('.go_top').addClass('on');
        } else {
            $('.go_top').removeClass('on');
        }
        $('.go_top').on('click', function () {
            $('html, body').stop().animate({
                scrollTop: 0
            }, 500);
        });
    });  
    
    /*팝업*/
    $(".modal_button").on("click", function () {
        var modal = $(this).data("modal");
        $(modal).show();
        $('body').css('overflow', 'hidden')
    });
    $(".modal_wrap").on("click", function (e) {
        var className = e.target;
        if ($(className).hasClass('modal_wrap') || $(className).hasClass('close')) {
            $(this).closest(".modal_wrap").hide();
            $('body').css('overflow', 'auto')
        }
    });

    
    
    /*아코디언*/
    $('.accordian > ul > li .tit').on('click', function () {
        if ($(this).parent().hasClass('on')) {
            $(this).parent().removeClass('on')
            $(this).parent().children('.txt').slideUp(200);
        } else {
            $(this).parent().addClass('on')
            $(this).parent().siblings().removeClass('on')
            $(this).parent().children('.txt').slideDown(200);
            $(this).parent().siblings().children('.txt').slideUp(200);
        };
    });
    
    /*섬네일사이즈*/
    $(window).on("load resize scroll", function (e) {
        var thumbSize = $('.thumbnail .centered > img');
        for (var i = 0; i < thumbSize.length; ++i) {
            var div = thumbSize[i];
            var divWidth = div.clientWidth;
            var divHeight = div.clientHeight;
            if (divWidth >= div.clientWidth && divHeight <= div.clientHeight) {
                if (div.clientWidth < div.clientHeight) {
                    $(div).addClass('portrait')
                } else if (div.clientWidth > div.clientHeight) {
                    $(div).addClass('landscape')
                }
            }
        }
    });
    
    
    /*애니메이션*/
    var $window = $(window);
    var $ani_elements = $('.ani');

    function check_ani() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);
        $ani_elements.each(function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
                $element.addClass('on');
                setTimeout(function(){
                    $element.parents('.txt').addClass('on');
                },2000);
            } else {
                //$element.removeClass('ani_view');
            };
        });
    };
    $window.on('load scroll', function () {
        check_ani();
    });

    /*윤리경영faq*/
    function faqSelect() {
        $('#faqSelect').change(function(){
            var selectItem = $('#faqSelect option:selected').val();
            var selectTarget = $("#"+selectItem);
            $('.sust_faq .btn-search').on('click',function(){
                $('.sust_faq .faq-list li').removeClass('content-visible')
                $('.sust_faq .faq-content').hide();
                selectTarget.siblings().removeClass('on');
                selectTarget.addClass('on');
            });
        });
    };
    faqSelect();
    
    /*개인정보약관*/
    function privacySelect() {
        $('#privacySelect').change(function(){
            var selectItem = $('#privacySelect option:selected').val();
            var selectTarget = $("#"+selectItem);
            $('.privacy_wrap .date_search button').on('click',function(){
                selectTarget.siblings().removeClass('on');
                selectTarget.addClass('on');
            });
        });
    };
    privacySelect();

    
});

//사업소개 대표실적 갤러리_ 팝업
var fnOwlSlider = (function($){
	var create, destroy;

	//var slider2 = $('.bis_slide2');
	//var thumbnailSlider2 = $('#thumbnailSlider2');
	var duration = 500;
	
	create = function(bisSlider, thumbSlider){
		$(bisSlider).owlCarousel({
			loop: false, 
			dots:false,
			nav: false, 
			items: 1
		}).on('changed.owl.carousel', function (e) {
			$(thumbSlider).trigger('to.owl.carousel', [e.item.index, duration, true]);
		});

		$(thumbSlider).owlCarousel({
			loop: false, 
			nav: false, 
			dots:false,
			touchDrag: false, 
			mouseDrag: false, 
			responsive: {
				0: {
					items: 3
				}
				, 600: {
					items: 4
				}
				, 1000: {
					items: 6
				}
			}
		}).on('click', '.owl-item', function () {
			$(bisSlider).trigger('to.owl.carousel', [$(this).index(), duration, true]);
		}).on('changed.owl.carousel', function (e) {
			$(bisSlider).trigger('to.owl.carousel', [e.item.index, duration, true]);
		});
		$('.control2 .slider-right').click(function () {
			$(bisSlider).trigger('next.owl.carousel');
		});
		$('.control2 .slider-left').click(function () {
			$(bisSlider).trigger('prev.owl.carousel');
		});   
	};

	destroy = function(bisSlider, thumbSlider){
		if($('.bis_slide2').hasClass("owl-loaded")){
			$(bisSlider).trigger('destroy.owl.carousel');
			$(thumbSlider).trigger('destroy.owl.carousel');
		}
	};

	return{
		create: create,
		destroy: destroy
	}
})(jQuery);