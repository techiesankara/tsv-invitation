(function ($) {
	"use strict";
	
	// Hero slider
	$('.js-hero-slider').slick({
		autoplay: false,
		autoplaySpeed: 2000,
		infinite: true,
		arrows: false,
		fade: true,
		speed: 800
	});

	/* COUNTDOWN*/
	var $countdown = $('.js-countdown');
	var $date = $countdown.attr('data-date');

	$countdown.countdown($date, function(event) {
		$('.js-countdown-days').html(event.strftime('%D'));
		$('.js-countdown-hours').html(event.strftime('%H'));
		$('.js-countdown-minutes').html(event.strftime('%M'));
		$('.js-countdown-seconds').html(event.strftime('%S'));
	});

	/* ANIMASI */
	AOS.init({
		disable: false,
		easing: 'ease', 
		once: false,
		mirror: true,
		duration: 900
	});
	
    /* SLIDE GALERY */
	var $slider = $('.js-slider').slick({
		centerMode: true,
		centerPadding: '5%',
		slidesToShow: 2,
		autoplay: true,
		autoplaySpeed: 1800,
		prevArrow: '.js-arrow-prev',
		nextArrow: '.js-arrow-next',
		focusOnSelect: true,
		responsive: [
			{
			breakpoint: 1200,
			settings: {
				arrows: false,
				slidesToShow: 2
			}
			},
			{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1
				}
			}
		]
	});

	/* MASONRY GRID */
	var $grid = $('.grid').masonry({
		itemSelector: '.grid-item',
		//columnWidth: '.grid-sizer',
		gutter: '.gutter-sizer',
	});

	$grid.imagesLoaded().progress( function() {
		$grid.masonry('layout');
	});


	/* ACTIVE LINK */
	function getSectionsOffset() {
		var sections = $('.js-section');
		var sectionsInfo = [];

		sections.each(function() {
			var $self = $(this);
			sectionsInfo.push({
				id: $self.attr('id'),
				offset: $self.offset().top - 100,
			});
		});

		return sectionsInfo;
	}
	
	jQuery('.story-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

	function setActiveNavLink() {
		var scrollPosition = $(window).scrollTop() + 53;
		for ( var i = 0; i < sectionsInfo.length; i++) {
			if( scrollPosition >= sectionsInfo[i].offset ) {
				$( '.js-nav-link' ).removeClass('active');
				$( '.js-nav-link[href="#'+ sectionsInfo[i].id + '"]' ).addClass('active');
			}
		}
	}

	function debounce( func, wait ) {
		var timeout;
		var later = function() {
			timeout = undefined;
			func.call();
		};

		return function() {
			if ( timeout ) {
				clearTimeout( timeout );
			}
			timeout = setTimeout( later, wait );
		};
	};
	
	$('#modal_undangan').modal('show');
	
	/*$(document).ready(function(){
		$(document).bind("contextmenu",function(e){
			return false;
		});
	});*/
	
    $(document).ready(function() {
        loadMessages();
    });
	
	var buttonmodal = document.getElementById("button-modal");
	var button = document.getElementById("buttonmusic");
	var audio = document.getElementById("player");
	var videonya = document.getElementById("videonya");
	
	audio.loop = true;

	button.addEventListener("click", function(){
		if(audio.paused){
			audio.play();
			button.innerHTML = "<ion-icon name='volume-high'></ion-icon>";
		} else {
			audio.pause();
			button.innerHTML = "<ion-icon name='volume-mute'></ion-icon>";
		}
	});

	buttonmodal.addEventListener("click", function(){
	    $('.js-hero-slider').slick('slickPlay');
		if(audio.paused){
			audio.play();
			button.innerHTML = "<ion-icon name='volume-high'></ion-icon>";
		} else {
			audio.pause();
			button.innerHTML = "<ion-icon name='volume-mute'></ion-icon>";
		}
	});
	
	videonya.onplay = function(){
	    audio.pause();
	    button.innerHTML = "<ion-icon name='volume-mute'></ion-icon>";
	};
	videonya.onpause = function(){
	    audio.play();
	    button.innerHTML = "<ion-icon name='volume-high'></ion-icon>";};

}(jQuery));