(function ($) {
    "use strict";
    $(document).ready(function () {
        function sliderAnimations(elements) {
            var animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data("delay");
                var $animationDuration = $this.data("duration");
                var $animationType = "runok-animation " + $this.data("animation");
                $this.css({
                    "animation-delay": $animationDelay,
                    "-webkit-animation-delay": $animationDelay,
                    "animation-duration": $animationDuration,
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }
        var sliderOptions = {
            speed: 1500,
            autoplay: {
                delay: 7000,
            },
            disableOnInteraction: false,
            initialSlide: 0,
            parallax: false,
            mousewheel: false,
            loop: true,
            grabCursor: true,
            effect: "fade",
            navigation: {
                nextEl: ".slider-arrow .slider-next",
                prevEl: ".slider-arrow .slider-prev",
            },
            pagination: {
                el: ".runok-swiper-pagination",
                clickable: true,
            },
        };
        sliderOptions.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find("[data-animation]");
                sliderAnimations(animatingElements);
            },

            resize: function () {
                this.update();
            },
        };

        var swiper = new Swiper(".runok-slider-2", sliderOptions);


        // Slider 1
        
        // Sliderthumb
        var sliderThumb = new Swiper(".slider-tab", {
            spaceBetween: 20,
            slidesPerView: 3,
        });
        var slider2Options = {
            speed: 1500,
            autoplay: {
                delay: 7000,
            },
            disableOnInteraction: false,
            initialSlide: 0,
            parallax: false,
            mousewheel: false,
            loop: true,
            grabCursor: true,
            effect: "fade",
            navigation: {
                nextEl: ".slider-arrow .slider-next",
                prevEl: ".slider-arrow .slider-prev",
            },
            thumbs: {
                swiper: sliderThumb,
            },
        };
        slider2Options.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find("[data-animation]");
                sliderAnimations(animatingElements);
            },

            resize: function () {
                this.update();
            },
        };

        var swiper2 = new Swiper(".runok-slider", slider2Options);

        
    });
})(jQuery);
