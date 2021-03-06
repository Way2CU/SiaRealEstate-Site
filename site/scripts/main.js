/**
 * Main JavaScript
 * Site Name
 *
 * Copyright (c) 2015. by Way2CU, http://way2cu.com
 * Authors:
 */

// create or use existing site scope
var Site = Site || {};

// make sure variable cache exists
Site.variable_cache = Site.variable_cache || {};


/**
 * Check if site is being displayed on mobile.
 * @return boolean
 */
Site.is_mobile = function() {
	var result = false;

	// check for cached value
	if ('mobile_version' in Site.variable_cache) {
		result = Site.variable_cache['mobile_version'];

	} else {
		// detect if site is mobile
		var elements = document.getElementsByName('viewport');

		// check all tags and find `meta`
		for (var i=0, count=elements.length; i<count; i++) {
			var tag = elements[i];

			if (tag.tagName == 'META') {
				result = true;
				break;
			}
		}

		// cache value so next time we are faster
		Site.variable_cache['mobile_version'] = result;
	}

	return result;
};

/**
 * Function called when document and images have been completely loaded.
 */
Site.on_load = function() {
	if (Site.is_mobile()) {
		Site.mobile_menu = new Caracal.MobileMenu();
		Site.mobile_title = $('.mobile_title');
	}
	
	testimonial = new PageControl('div.testimonail_wrap','article')
	testimonial.attachControls($('div.btn_controls a'))
	.setInterval(6000)
	.setWrapAround(true);

	//Function Displaying Asset Big Image in Asset detail page
	function showImage() {
		var item = $(this);
		var myurl = item.data('image');
		var bImage = $('div.product_gallery figure img').attr('src',myurl);
	}

	var images = $('div.product_gallery a');
	images.on('click',showImage);

	// function for displaying drop down menu on tablets
	var drop_down_links = $('li.sub-menu');
	var drop_menu = $('ul.drop');

	drop_down_links.on('click',function(){
		var item = $(this);
		item.find('ul.drop').addClass('active');
		drop_down_links.not(item).find('ul.drop').removeClass('active');	

	})
	
	// handle analytics event
	$('form').on('analytics-event', function(event, data) {
		if (!data.error)
			dataLayer.push({
            	'event':'leadSent'
            });
	});
};


// connect document `load` event with handler function
$(Site.on_load);
