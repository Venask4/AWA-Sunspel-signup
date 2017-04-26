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
		telephoneMicrocopy: '<span class="AWA-microcopy">(For Delivery Updates)</span>',
		passwordMicrocopy: '<span class="AWA-microcopy">Create a password for quicker checkout</span><br>'
	};

	// Styles
	// String containing the CSS for the experiment
	exp.css = '\
		.minibasket__item .thumb {\
			width: 54px !important;\
		}\
		.AWA-microcopy {\
			font-family: "Gill Sans W01", "Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif;\
			font-size: 10px;\
		}\
	';

	// Init function
	// Called to run the actual experiment, DOM manipulation, event listeners, etc
	exp.init = function() {
		// Add styles
		$('head').append('<style>' + exp.css + '</style>');

		//Hide Middle Initial and Date of Birth forms
		$('#billing-new-address-form .name-middlename').hide();
		$('.field .input-combined').siblings('label').hide();
		$('.field .input-combined').hide();

		// Move Post Code Div up to beneath E-mail Div
		var $postCodeField = $('.field label:contains("Post Code")').first().parent();
		var $emailField = $('#billing-new-address-form .field label:contains("Email")').first().parent();
		$emailField.after($postCodeField);

		// Add microcopy to Telephone label
		var $telephoneField = $('#billing-new-address-form .field label:contains("Telephone")').first();
		$telephoneField.append(exp.vars.telephoneMicrocopy);

		// Add microcopy to Password label
		var $passwordField = $('#billing-new-address-form .field label:contains("Password")').first();
		$passwordField.prepend(exp.vars.passwordMicrocopy);
	};

	exp.init();
	// Return the experiment object so we can access it later if required
	return exp;

	// Close the IIFE, passing in jQuery and any other global variables as required
	// if jQuery is not already used on the site use optimizely.$ instead
})(window.jQuery);