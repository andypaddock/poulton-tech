//@prepros-prepend fullpage.min.js
//@prepros-prepend scrolloverflow.min.js



const animations = [


	{ name : 'introducing', setup : () => {

		// show PT1
		// rotate PT1
		var scene = window.scene;

	}}

];

window.setup_and_run_fullpage = () => {

	const $ = jQuery;

	const see_section = $('#see_applications--section');


	const be_responsive = (item) => {

		if(window.is_mobile){
			
			$('.text_details').hide();
		}
		//$(item).find('.text_details').show()

	}

	const case_introducing = () => {
		see_section.hide();
		viewer
		.reset_Flange()
		.reset_PT1()
		.scale_out()
		.set_anchor('introducing');
	}
	case_introducing();

    window.FullPage = new fullpage('#fullpage', {
		//licenseKey:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',//???needed with this version
    	verticalCentered: false,
    	scrollOverflow: true,
        onLeave: function(origin, destination, direction){

			var viewer = window.viewer;

			console.log('origin' , origin );
			console.log('destination', destination); //destination, direction);

			window.destination = destination;

		//	if(viewer) viewer.set_anchor(destination.anchor);

			if(viewer) switch (destination.anchor) {

					case 'introducing': case_introducing();
					break;
					case 'size': 		see_section.hide();
										viewer
										.side_by_side()
									    .scale_size()	
										.autoRotateDirection(1)
										.set_anchor(destination.anchor);
					break;
					case 'rugged': 		see_section.hide();
										viewer
										.reset_Flange()
										.rugged_PT1()
										.scale_out()
										.scale_rugged()
										.autoRotateDirection(0)
										.set_anchor(destination.anchor);
										break;
					case 'fireproof': 	see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(-1)
										.set_anchor(destination.anchor);
					break;
					case 'metal': 		see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(1)
										.set_anchor(destination.anchor);
					break;
					case 'welding': 	see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(-1)
										.set_anchor(destination.anchor);
					break;
					case 'pressure': 	see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(1)
										.set_anchor(destination.anchor);
					break;
					case 'integrity': 	see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(-1)
										.set_anchor(destination.anchor);
					break;
					case 'cost': 		see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(1)
										.set_anchor(destination.anchor);
					break;
					case 'type': 		see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.autoRotateDirection(-1)
										.scale_out();
					break;
					case 'patented': 	see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(1)
										.set_anchor(destination.anchor);
					break;
					case 'installation': see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(-1)
										.set_anchor(destination.anchor);
					break;
					case 'safer': 		see_section.hide();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(1)
										.set_anchor(destination.anchor);
					break;
					case 'benefits': 	see_section.show();
										viewer
										.reset_Flange()
										.reset_PT1()
										.scale_out()
										.autoRotateDirection(-1)
										.set_anchor(destination.anchor);
					break;


				default:
					case_introducing();
			}
			
    		// if(direction =='down') window?.viewer?.scale_out(); //	window?.viewer?.scale_to_bottom();
			// else window?.viewer?.scale_to_top();

    		var leavingSection = this;
    		//after leaving section 1
    		if(origin.index == 0 && direction =='down'){

    		}
    	},
    	afterLoad: function (origin, anchorLink, index){
    		var currentId = $(anchorLink.item).attr('data-link');
    		var linkContainer = $('#myMenu li');

			// console.warn('fgt', origin, anchorLink, index);

    		$(linkContainer).removeClass('active');
    		$('#' + currentId).addClass('active');

    		$('.image-frame').attr('id', currentId + 'Animation');

    		if(anchorLink.isLast === true) {
    			$('#nextSection').fadeOut();
    		} else {
    			$('#nextSection').fadeIn();
    		}

    		if((anchorLink.index == 1) && (index == 'down')){
    			$('.image-frame').removeClass('completeAnimation').addClass('active');
    		} else if ( (anchorLink.index == 2) && (index == 'down')){
    			$('.image-frame').removeClass('completeAnimation').addClass('activeRugged');
    		}
    		if(anchorLink.isLast == true){
    			$('.image-frame').hide();
    			$('.image-frame').removeClass('active activeRugged').addClass('completeAnimation');
    		} else {
    			$('.image-frame').show()
    		}
    	}
    });

	$(document).on('click', '#prevSection', function(){
		fullpage_api.moveSectionUp();
	  });
  
	  $(document).on('click', '#nextSection', function(e){
	  e.preventDefault();
		fullpage_api.moveSectionDown();
	  });

	//  window.FullPage.getActiveSection()?.anchor === 'introducing' ? case_introducing() : window.FullPage.moveTo('introducing');

	  document.getElementById('c').style.visibility = 'visible';
}



jQuery(document).ready(function( $ ) {
	
	var check = false;
	const a = navigator.userAgent||navigator.vendor||window.opera;
	
	window.mobileCheck = function() {
		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	  };
	
	
	console.warn('Loading', 'is mobile:' , window.is_mobile);

	if(window.mobileCheck()){
			
		$('.text_details').hide();
	}

/* ADD CLASS ON LOAD*/

    $("html").delay(1500).queue(function(next) {
        $(this).addClass("loaded");

        next();
    });

//Smooth Scroll

    $('nav a, a.button, a.next-section').click(function(){
	    if($(this).attr('href') != "#") {
	        $('html, body').animate({
	            scrollTop: $( $(this).attr('href') ).offset().top -100
	        }, 500);
	        return false;
	    }
    });

/* LOAD MAP */

	if($("#bell-map-contact").length > 0 && JSON.parse($("#bell-map-contact").attr("points"))) {
	    var points = JSON.parse($("#bell-map-contact").attr("points"));

        mapboxgl.accessTpoultonn = 'pk.eyJ1Ijoic2lsdmVybGVzcyIsImEiOiJjaXNibDlmM2gwMDB2Mm9tazV5YWRmZTVoIn0.ilTX0t72N3P3XbzGFhUKcg';

		var map = new mapboxgl.Map({
		    container:  'bell-map-contact',
		    style:      'mapbox://styles/poulton/cjvnw465y0bl91cmionu5nqmo',
		    center:     points.geometry.coordinates,
		    zoom:       11,
		    scrollZoom: false
		});

		map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

		var geocoder = new MapboxGeocoder({
			accessTpoultonn: mapboxgl.accessTpoultonn,
			marker: {
				color: 'grey'
			},
			countries: 'gb',
			mapboxgl: mapboxgl,
			flyTo: false
		});

		map.addControl(geocoder, 'top-left');

		var geojson = {
			type: 'FeatureCollection',
			features: [points]
		};

		var coorPoints = [];

		geojson.features.forEach(function(marker) {

			var el = document.createElement('div');
			el.className = 'marker';

			new mapboxgl.Marker(el)
				.setLngLat(marker.geometry.coordinates)
				.setPopup(new mapboxgl.Popup({ offset: 25 })
				.setHTML(
			    	'<div class="title">The Bell <span>at</span> Ramsbury</div>' +
			    	'<div class="address">' + marker.properties.address  + '</div>' +
			    	'<div class="phone">'   + marker.properties.phone    + '</div>' +
			    	'<div class="email">'   + marker.properties.email    + '</div>'))
				.addTo(map);

			el.addEventListener('click', function(e){
				position = marker.geometry.coordinates[1] - 0.0200;
				map.flyTo({
				    center: [marker.geometry.coordinates[0], position],
				    zoom: 11
			    });
			});

			coorPoints.push(new mapboxgl.LngLat(marker.geometry.coordinates[0], marker.geometry.coordinates[1]));
		});

		geocoder.on("result", function(e) {
			var distance = [];
			var searchPoint = new mapboxgl.LngLat(e.result.geometry.coordinates[0], e.result.geometry.coordinates[1]);

			coorPoints.forEach(function(markerPoint) {
				distance.push({
					'point': markerPoint,
					'distance': distanceBetweenPoints(searchPoint, markerPoint)
				});
			});

			var minDistance = distance.reduce(function(prev, curr) {
			    return prev.distance < curr.distance ? prev : curr;
			});

			var bounds = new mapboxgl.LngLatBounds();

			bounds.extend(minDistance.point);
			bounds.extend(searchPoint);

			map.fitBounds(bounds, { padding: 100 });
		});

		$(window).bind('mousewheel DOMMouseScroll', function(event) {
		    if(event.ctrlKey == true) {
		        map['scrollZoom'].enable();
		    }
		    else {
		        map['scrollZoom'].disable();
		    }
		});

		function distanceBetweenPoints(point1, point2) {
			var R = 6371e3; // metres
			var φ1 = point1.lat.toRadians();
			var φ2 = point2.lat.toRadians();
			var Δφ = (point2.lat-point1.lat).toRadians();
			var Δλ = (point2.lng-point1.lng).toRadians();

			var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
			        Math.cos(φ1) * Math.cos(φ2) *
			        Math.sin(Δλ/2) * Math.sin(Δλ/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

			var d = R * c;
			return d;
		}

		function getMiddlePoint(point1, point2) {
			var lat = (point1.lat + point2.lat) / 2;
			var lng = (point1.lng + point2.lng) / 2;
			return [lng, lat];
		}

		Number.prototype.toRadians = function() {
			return this * Math.PI / 180;
		};
	}

/* CLASS AND FOCUS ON CLICK */

    $(".menu-trigger").on('click', function() {
	    $(this).toggleClass("clicked");
	    $('.hamburger').toggleClass('is-active');
	    $('.menuText').toggleClass('hideItem');
	    $(".offscreen-nav").toggleClass("show");
	    $('.on-page-nav').toggleClass('hideMenu');
    });

    $(".read-more").click(function() {
	    $(this).prev().slideToggle();
	    $(this).text($(this).text() == "Read more" ? "Read less" : "Read more");
    });

// ========== Add class if in viewport on page load

	$.fn.isOnScreen = function(){

	    var win = $(window);

	    var viewport = {
	        top : win.scrollTop(),
	        left : win.scrollLeft()
	    };
	    viewport.right = viewport.left + win.width();
	    viewport.bottom = viewport.top + win.height();

	    var bounds = this.offset();
	    bounds.right = bounds.left + this.outerWidth();
	    bounds.bottom = bounds.top + this.outerHeight();

	    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

	};

	$('.slide-up, .slide-down, .slide-right, .slow-fade').each(function() {
		if ($(this).isOnScreen()) {
			$(this).addClass('active');
		}
	});

// ========== Add class on entering viewport

	$.fn.isInViewport = function() {
	var elementTop = $(this).offset().top;
	var elementBottom = elementTop + $(this).outerHeight();
	var viewportTop = $(window).scrollTop();
	var viewportBottom = viewportTop + $(window).height();
	return elementBottom > viewportTop && elementTop < viewportBottom;
	};

	$(window).on('resize scroll', function() {

		$('.slide-up, .slide-down, .slide-right, .slow-fade').each(function() {
			if ($(this).isInViewport()) {
				$(this).addClass('active');
			}
		});

	});

});//Don't remove ---- end of jQuery wrapper
