jQuery(document).ready(function ($) {
	

	    $('.show-all').click(function () {
        	$('.birthdays ul li').toggleClass('show');
	    });
			
		 if($(".birthdays ul li").hasClass('birthToday') ){
	        // Standard grid drawer hovers
	        $(".birthdays").addClass('got-birthdaytoday');
	        $("h1").replaceWith( "<h1>yay, look who's birthday it is..</h1>" );
	     }
			
});