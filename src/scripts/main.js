jQuery(document).ready(function ($) {
	
		$.fn.toggleText = function(t1, t2){
		  if (this.text() == t1) this.text(t2);
		  else                   this.text(t1);
		  return this;
		};

	    $('.show-btn').click(function () {
		    
		    $('.show-btn span').toggleText('Show all', 'Show less');
        	$('.birthdays ul li').toggleClass('show');
        	$(this).toggleClass('showall');
	    });
			
		if($(".birthday-wrapper").hasClass('birthtoday') ){
			$(".birthdays").addClass('got-birthdaytoday');
			$(".birthtoday").parent().addClass('today');
			$("h2").replaceWith( "<h2>yay,<br> look whos birthday it is today..</h2>" );
		}

});