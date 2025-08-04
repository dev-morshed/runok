
(function ($) {
    "use strict";

    // Get Device width
    var device_width = window.innerWidth;

        //Toggle Js
		$('.rr-checkout-login-form-reveal-btn').on('click', function () {
			$('#rrReturnCustomerLoginForm').slideToggle(400);
		});

        $('.rr-checkout-coupon-form-reveal-btn').on('click', function () {
			$('#rrCheckoutCouponForm').slideToggle(400);
		});
    
    // Color Scheme Swithcer
    const storageKey = 'theme-preference';

    const onClick = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
        setPreference();
    }

    const getColorPreference = () => {
        if (localStorage.getItem(storageKey)){
            return localStorage.getItem(storageKey);
        }else{
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
    }

    const setPreference = () => {
        localStorage.setItem(storageKey, theme.value);
        reflectPreference();
    }

    const reflectPreference = () => {
        document.firstElementChild.setAttribute('data-theme', theme.value);
        document.querySelector('#theme-toogle')?.setAttribute('aria-label', theme.value);
    }

    const theme = {
        value: getColorPreference(),
    }

    // set early so no page flashes / CSS is made aware
    reflectPreference();
        
    $(window).on("load", function (event) {
        // set on load so screen readers can see latest value on the button
        reflectPreference();

        // now this script can find and listen for clicks on the control
        document.querySelector('#theme-toogle').addEventListener('click', onClick);
    });

    /*======================================
        Preloader activation
    ========================================*/
    $(window).on("load", function (event) {
        
        $("#preloader").delay(1000).fadeOut(500);
        // Text Animation
        setTimeout(() => {
        var hasAnim = $(".anim-text");
            hasAnim.each(function () {
                var $this = $(this);
                var splitto = new SplitType($this, {
                types: "lines, chars",
                className: "char",
                });
                var chars = $this.find(".char");
                gsap.fromTo(
                chars,
                { y: "100%" },
                {
                    y: "0%",
                    duration: 0.9,
                    stagger: 0.03,
                    ease: "power2.out",
                }
                );
            });
        }, 1000);
    });

    $(".preloader-close").on("click", function () {
        $("#preloader").delay(0).fadeOut(500);
    });

    $(document).ready(function () {

        if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
            $('body').addClass('firefox');
        }
        
        var header = $(".header"),
            stickyHeader = $(".primary-header");

        function menuSticky(w) {
            if (w.matches) {
                
                $(window).on("scroll", function () {
                    var scroll = $(window).scrollTop();
                    if (scroll >= 10) {
                        header.addClass("fixed");
                    } else {
                        header.removeClass("fixed");
                    }
                });
            }
        }

        var minWidth = window.matchMedia("(min-width: 992px)");
        if (header.hasClass("sticky-active")) {
            menuSticky(minWidth);
        }

        //Mobile Menu Js
        $(".mobile-menu-items").meanmenu({
            meanMenuContainer: ".side-menu-wrap",
            meanScreenWidth: "992",
            meanMenuCloseSize: "30px",
            meanRemoveAttrs: true,
            meanExpand: ['<i class="fa-solid fa-caret-down"></i>'],
        });

        // Mobile Sidemenu
        $(".mobile-side-menu-toggle").on("click", function () {
            $(".mobile-side-menu, .mobile-side-menu-overlay").toggleClass("is-open");
        });

        $(".mobile-side-menu-close, .mobile-side-menu-overlay").on("click", function () {
            $(".mobile-side-menu, .mobile-side-menu-overlay").removeClass("is-open");
        });

        // Popup Search Box
        $(function () {
            $("#popup-search-box").removeClass("toggled");

            $(".dl-search-icon").on("click", function (e) {
                e.stopPropagation();
                $("#popup-search-box").toggleClass("toggled");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });

            $("#popup-search-box, body").on("click", function () {
                $("#popup-search-box").removeClass("toggled");
            });
        });

        // Popup Sidebox
        function sideBox() {
            $("body").removeClass("open-sidebar");
            $(document).on("click", ".sidebar-trigger", function (e) {
                e.preventDefault();
                $("body").toggleClass("open-sidebar");
            });
            $(document).on("click", ".sidebar-trigger.close, #sidebar-overlay", function (e) {
                e.preventDefault();
                $("body.open-sidebar").removeClass("open-sidebar");
            });
        }

        sideBox();

        // Venobox Video
        new VenoBox({
            selector: ".video-popup, .img-popup",
            bgcolor: "transparent",
            numeration: true,
            infinigall: true,
            spinner: "plane",
        });

        // Data Background
        $("[data-background").each(function () {
            $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
        });

        // Custom Cursor
        $("body").append('<div class="mt-cursor"></div>');
        var cursor = $(".mt-cursor"),
            linksCursor = $("a, .swiper-nav, button, .cursor-effect"),
            crossCursor = $(".cross-cursor");

        $(window).on("mousemove", function (e) {
            cursor.css({
                transform: "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)",
                visibility: "inherit",
            });
        });

        /* Odometer */
        $(".odometer").waypoint(
            function () {
                var odo = $(".odometer");
                odo.each(function () {
                    var countNumber = $(this).attr("data-count");
                    $(this).html(countNumber);
                });
            },
            {
                offset: "80%",
                triggerOnce: true,
            }
        );

        // Wow JS Active
        new WOW().init();

        // Nice Select Js
        $("select").niceSelect();

        // Isotop
        $(".filter-items").imagesLoaded(function () {
            // Add isotope click function
            $(".project-filter li").on("click", function () {
                $(".project-filter li").removeClass("active");
                $(this).addClass("active");

                var selector = $(this).attr("data-filter");
                $(".filter-items").isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 750,
                        easing: "linear",
                        queue: false,
                    },
                });
                return false;
            });

            $(".filter-items").isotope({
                itemSelector: ".single-item",
                layoutMode: "fitRows",
                fitRows: {
                    gutter: 0,
                },
            });
        });

        // Sponsor Carousel
        var swiperSponsor = new Swiper(".sponsor-carousel", {
            slidesPerView: 5,
            spaceBetween: 50,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 400,
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25,
                },
                767: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 5,
                    slidesPerGroup: 1,
                },
            },
        });

        // Testimonial Carousel
        var swiperTesti = new Swiper(".testi-carousel", {
            slidesPerView: 3,
            spaceBetween: 24,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 400,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25,
                },
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 1,
                },
            },
        });

        // Testimonial Carousel 2
        var swiperTesti = new Swiper(".testi-carousel-2", {
            slidesPerView: 1,
            spaceBetween: 24,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 400,
            navigation: {
                nextEl: ".testi-top .swiper-prev",
                prevEl: ".testi-top .swiper-next",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25,
                },
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
            },
        });

        // Testimonial Carousel 3
        var testimonialThumb = new Swiper(".thumb-carousel", {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 0,
            loop: false,
            autoplay: true,
            centerSlides: true,
            speed: 600,
        });
        var testimonials = new Swiper(".content-carousel", {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
            loop: true,
            autoplay: true,
            speed: 600,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            thumbs: {
                swiper: testimonialThumb,
            },
        });

        // Project Carousel
        var swiperProject = new Swiper(".project-carousel", {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            grabcursor: true,
            initialSlide: -1,
            speed: 600,
            navigation: {
                nextEl: ".project-section .swiper-prev",
                prevEl: ".project-section .swiper-next",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
        });

        // Service Carousel
        var swiperService = new Swiper(".service-carousel", {
            slidesPerView: 4,
            spaceBetween: 24,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 600,
            navigation: {
                nextEl: ".service-section .swiper-prev",
                prevEl: ".service-section .swiper-next",
            },
            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25,
                },
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                },
            },
        });

        // Sponsor Carousel
        var swiperBlog = new Swiper(".sponsor-carousel-2", {
            slidesPerView: 6,
            spaceBetween: 24,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 600,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 25,
                },
                767: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 6,
                    slidesPerGroup: 1,
                },
            },
        });

        // Project Carousel
        var swiperProject = new Swiper(".project-carousel-2", {
            slidesPerView: 1,
            spaceBetween: 24,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 600,
            centerSlides: true,
            navigation: {
                nextEl: ".project-carousel-2 .swiper-prev",
                prevEl: ".project-carousel-2 .swiper-next",
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25,
                },
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
            },
        });

        // Sponsor Carousel
        var swiperSponsor = new Swiper(".sponsor-carousel-3", {
            slidesPerView: 6,
            spaceBetween: 40,
            slidesPerGroup: 1,
            loop: true,
            autoplay: true,
            grabcursor: true,
            speed: 600,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                },
                767: {
                    slidesPerView: 4,
                    slidesPerGroup: 1,
                },
                1024: {
                    slidesPerView: 6,
                    slidesPerGroup: 1,
                },
            },
        });

        //Swiper Slider For Shop
        var swiper = new Swiper(".product-gallary-thumb", {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
        });
        var swiper2 = new Swiper(".product-gallary", {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: ".swiper-nav-next",
                prevEl: ".swiper-nav-prev",
            },
            thumbs: {
                swiper: swiper,
            },
        });

        // carouselTicker initail 
        $('.carouselTicker-nav').carouselTicker({
        });
        $(".carouselTicker-start").carouselTicker({
            direction: "next",
        });

        // Stroke Text

        $(function(){
            let container_svg = $('.container-svg');
            let that, svg, text, bbox, width, height, calc_ratio, stroke_dasharray, new_value_stroke;
            let is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            let is_retina = false;
            if (matchMedia("(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)").matches){
                is_retina = true;
            }
            container_svg.each(function(){
                that = $(this);
                // Set viewBox size
                svg = $('svg', that);
                text = $('text', that);
                bbox = text[0].getBBox();
                width = that.width();
                height = bbox.height;
                svg.attr('viewBox', '0 0 '+width+' '+height);
                // Set container height with ratio
                calc_ratio = (height*100/width);
                that.css('padding-bottom', calc_ratio+'%');
                if(is_safari){ // Safari fix
                    text.attr('y', '1em');
                }
                    if(is_retina){
                    stroke_dasharray = text.css('stroke-dasharray');
                    new_value_stroke = retina_stroke_dasharray(stroke_dasharray);
                    text.css('stroke-dasharray', new_value_stroke);
                }
            })
        })
        
        function retina_stroke_dasharray(value){
            let array = value.split(",");
            for(let i = 0; i < array.length; i++){
                array[i] = (parseInt(array[i])*2)+'px';
            }
            return array.join(', ');
        }

        //Running Animated Text
        const scrollers = document.querySelectorAll(".scroller");

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }

        function addAnimation() {
            scrollers.forEach((scroller) => {
                scroller.setAttribute("data-animated", true);

                const scrollerInner = scroller.querySelector(".scroller__inner");
                const scrollerContent = Array.from(scrollerInner.children);

                scrollerContent.forEach((item) => {
                    const duplicatedItem = item.cloneNode(true);
                    duplicatedItem.setAttribute("aria-hidden", true);
                    scrollerInner.appendChild(duplicatedItem);
                });
            });
        }


        // Animation

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        ScrollTrigger.normalizeScroll(true);

        let revealContainers = document.querySelectorAll(".reveal");

        revealContainers.forEach((container) => {
        let image = container.querySelector("img");
        let tl = gsap.timeline({
            scrollTrigger: {
            trigger: container,
            toggleActions: "restart none none reset"
            }
        });

        tl.set(container, { autoAlpha: 1 });
        tl.from(container, 1.5, {
            xPercent: -100,
            ease: Power2.out
        });
        tl.from(image, 1.5, {
            xPercent: 100,
            scale: 1.3,
            delay: -1.5,
            ease: Power2.out
        });
        });

        // Scroll Animation

        let typeSplit = new SplitType("[data-text-animation]", {
            types: "lines,words, chars",
            className: "line",
        });
        var text_animations = document.querySelectorAll(
            "[data-text-animation]"
            );
            
            function createScrollTrigger(triggerElement, timeline) {
            // Play tl when scrolled into view (60% from top of screen)
            ScrollTrigger.create({
                trigger: triggerElement,
                start: "top 80%",
                onEnter: () => timeline.play(),
                toggleClass: {targets: triggerElement, className: "active"} 
            });
        }

            text_animations.forEach((animation) => {
            let type = "slide-up",
            duration = 0.75,
            offset = 80,
            stagger = 0.6,
            delay = 0,
            scroll = 1,
            split = "line",
            ease = "power2.out";
        // Set attribute
        if (animation.getAttribute("data-stagger")) {
            stagger = animation.getAttribute("data-stagger");
        }
        if (animation.getAttribute("data-duration")) {
            duration = animation.getAttribute("data-duration");
        }
        if (animation.getAttribute("data-text-animation")) {
            type = animation.getAttribute("data-text-animation");
        }
        if (animation.getAttribute("data-delay")) {
            delay = animation.getAttribute("data-delay");
        }
        if (animation.getAttribute("data-ease")) {
            ease = animation.getAttribute("data-ease");
        }
        if (animation.getAttribute("data-scroll")) {
            scroll = animation.getAttribute("data-scroll");
        }
        if (animation.getAttribute("data-offset")) {
            offset = animation.getAttribute("data-offset");
        }
        if (animation.getAttribute("data-split")) {
            split = animation.getAttribute("data-split");
        }
        if (scroll == 1) {
            if (type == "slide-up") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                yPercent: offset,
                duration,
                ease,
                opacity: 0,
                stagger: { amount: stagger },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "slide-down") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                yPercent: -offset,
                duration,
                ease,
                opacity: 0,
                stagger: { amount: stagger },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "rotate-in") {
            let tl = gsap.timeline({ paused: true });
            tl.set(animation.querySelectorAll(`.${split}`), {
                transformPerspective: 400,
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
                rotationX: -offset,
                duration,
                ease,
                force3D: true,
                opacity: 0,
                transformOrigin: "top center -50",
                stagger: { amount: stagger },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "slide-from-left") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                xPercent: -offset,
                duration,
                opacity: 0,
                ease,
                stagger: { amount: stagger },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "slide-from-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                xPercent: offset,
                duration,
                opacity: 0,
                ease,
                stagger: { amount: stagger },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                duration,
                ease,
                opacity: 0,
                stagger: { amount: stagger },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "fade-in-random") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                duration,
                ease,
                opacity: 0,
                stagger: { amount: stagger, from: "random" },
            });
            createScrollTrigger(animation, tl);
            }
            if (type == "scrub") {
            let tl = gsap.timeline({
                scrollTrigger: {
                trigger: animation,
                start: "top 90%",
                end: "top center",
                scrub: true,
                },
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0.2,
                duration,
                ease,
                stagger: { amount: stagger },
            });
            }

            // Avoid flash of unstyled content
            gsap.set("[data-text-animation]", { opacity: 1 });
        } else {
            if (type == "slide-up") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                yPercent: offset,
                duration,
                ease,
                opacity: 0,
            });
            }
            if (type == "slide-down") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                yPercent: -offset,
                duration,
                ease,
                opacity: 0,
            });
            }
            if (type == "rotate-in") {
            let tl = gsap.timeline({ paused: true });
            tl.set(animation.querySelectorAll(`.${split}`), {
                transformPerspective: 400,
            });
            tl.from(animation.querySelectorAll(`.${split}`), {
                rotationX: -offset,
                duration,
                ease,
                force3D: true,
                opacity: 0,
                transformOrigin: "top center -50",
            });
            }
            if (type == "slide-from-right") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                xPercent: offset,
                duration,
                opacity: 0,
                ease,
            });
            }
            if (type == "fade-in") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                duration,
                ease,
                opacity: 0,
            });
            }
            if (type == "fade-in-random") {
            let tl = gsap.timeline({ paused: true });
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0,
                duration,
                ease,
                opacity: 0,
                stagger: { amount: stagger, from: "random" },
            });
            }
            if (type == "scrub") {
            tl.from(animation.querySelectorAll(`.${split}`), {
                opacity: 0.2,
                duration,
                ease,
            });
            }
        }
        });

        if ($(".fade-wrapper").length > 0) {
            $(".fade-wrapper").each(function () {
                var section = $(this);
                var fadeItems = section.find(".fade-top");
        
                fadeItems.each(function (index, element) {
                var delay = index * 0.15;
        
                gsap.set(element, {
                    opacity: 0,
                    y: 100,
                });
        
                ScrollTrigger.create({
                    trigger: element,
                    start: "top 100%",
                    end: "bottom 20%",
                    scrub: 0.5,
                    onEnter: function () {
                    gsap.to(element, {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        delay: delay,
                    });
                    },
                    once: true,
                });
                });
            });
        }

        // Page Scroll Percentage
        function scrollTopPercentage() {
            const scrollPercentage = () => {
                const scrollTopPos = document.documentElement.scrollTop;
                const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrollValue = Math.round((scrollTopPos / calcHeight) * 100);
                const scrollElementWrap = $("#scroll-percentage");

                scrollElementWrap.css("background", `conic-gradient( var(--rr-color-theme-primary) ${scrollValue}%, var(--rr-color-common-white) ${scrollValue}%)`);
                
                // ScrollProgress
                if ( scrollTopPos > 100 ) {
                    scrollElementWrap.addClass("active");
                } else {
                    scrollElementWrap.removeClass("active");
                }

                if( scrollValue < 96 ) {
                    $("#scroll-percentage-value").text(`${scrollValue}%`);
                } else {
                    $("#scroll-percentage-value").html('<i class="fa-sharp fa-regular fa-arrow-up-long"></i>');
                }
            }
            window.onscroll = scrollPercentage;
            window.onload = scrollPercentage;

            // Back to Top
            function scrollToTop() {
                document.documentElement.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
            
            $("#scroll-percentage").on("click", scrollToTop);
        }

        scrollTopPercentage();

    });

    

    // create the smooth scroller FIRST!
    let smoother = ScrollSmoother.create({
        smooth: 2,
        effects: device_width < 1025 ? false : true,
        smoothTouch: false,
        normalizeScroll: true,
        ignoreMobileResize: true,
    });

})(jQuery);
