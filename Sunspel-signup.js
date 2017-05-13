//
// CGIT Optimizely Boilerplate - version 0.1.4
// Wrap the experiment code in an IIFE, this creates a local scope and allows us to
// pass in jQuery to use as $. Other globals could be passed in if required.
var exp = (function($) {

	// Initialise the experiment object
	var exp = {};

	// Wrapper for console.log, to prevent the exp breaking on browsers which don't
	// (always) have 'console' set (e.g. IE9)
	exp.log = function (str) {
	    if (typeof window.console !== 'undefined') {
	        console.log(str);
	    }
	};

	// Log the experiment, useful when multiple experiments are running
	exp.log('AWA - Sunspel Checkout Sign Up - v1');

	// Variables
	// Object containing variables, generally these would be strings or jQuery objects
	exp.vars = {
		telephoneMicrocopy: '<span class="AWA-microcopy">(For delivery updates)</span>',
		passwordMicrocopy: '<span class="AWA-microcopy">Please enter a password for your Sunspel account</span><br>',
		enterAddress: '<div class="AWA-enterAddress"><a href="javascript:void(0);">Enter Address Manually</a><br><br></div>',
		postCodeMicrocopy: '<span class="AWA-microcopy AWA-microcopy-grey">Please use your post code to find your address</span>'
	};

	// Styles
	// String containing the CSS for the experiment
	exp.css = '\
		.minibasket__item .thumb {\
			width: 54px !important;\
		}\
		.AWA-microcopy {\
			font-family: "Gill Sans W01", "Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif;\
			font-size: .875rem;\
			color: #7e8083;\
			letter-spacing: .025em;\
			text-transform: none;\
		}\
		.AWA-microcopy-grey {\
			background: #f2f2f2;\
			padding: 3.75px 7.5px;\
			border-left: 3.75px solid #3c3;\
			display: block;\
			width: 480px;\
			margin-bottom: 7px;\
		}\
		@media only screen and (max-width: 599px) {\
			.AWA-microcopy-grey {\
				width: 100%;\
			}\
		}\
	';

	// Init function
	// Called to run the actual experiment, DOM manipulation, event listeners, etc
	exp.init = function() {
		// Add styles
		$('head').append('<style>' + exp.css + '</style>');

		//Hide Middle Initial and Date of Birth forms
		$('.name-middlename').hide();
		$('.field .input-combined').siblings('label').hide();
		$('.field .input-combined').hide();

		// Move Post Code Div up to beneath E-mail Div
		var $postCodeField = $('.field label:contains("Post Code")').first().parent();
		var $emailField = $('#billing-new-address-form .field label:contains("Email")').first().parent();
		if ($emailField.length) {
			$emailField.after($postCodeField);
		}

		// Add microcopy to Telephone label
		var $telephoneField = $('.field label:contains("Telephone")');
		$telephoneField.append(exp.vars.telephoneMicrocopy);

		// Add microcopy to Password label
		var $passwordField = $('#billing-new-address-form .field label:contains("Password")').first();
		$passwordField.prepend(exp.vars.passwordMicrocopy);

		// Add microcopy to Post Code label
		$('.field label:contains("Post Code")').prepend(exp.vars.postCodeMicrocopy);

		// Hide address fields
		$('.field label:contains("Company")').parent().hide();
		$('.field label:contains("Street Address")').parent().hide();
		$('.field label:contains("Town")').parent().hide();
		$('.field label:contains("Count")').parent().hide();
		$('.field label:contains("Post Code")').parent().after(exp.vars.enterAddress);
		$('.AWA-enterAddress').on('click', function() {
			$('.field label:contains("Company")').parent().show();
			$('.field label:contains("Street Address")').parent().show();
			$('.field label:contains("Town")').parent().show();
			$('.field label:contains("Count")').parent().show();
			$('.AWA-microcopy-grey').hide();
			$(this).remove();
		})
	};

	exp.init();
	// Return the experiment object so we can access it later if required
	return exp;

	// Close the IIFE, passing in jQuery and any other global variables as required
	// if jQuery is not already used on the site use optimizely.$ instead
})(window.jQuery);