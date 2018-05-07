$(document).ready(function(){	
	/*
	*	starting parameters
	*/
	$('.day-container').attr('style', 'left: 0px;');

	/*
	*	event listener : onclick
	*/
	$('.day-container').on('click', function(event) {
		/*
		*	do something only if day is free
		*/
		if($(event.target).hasClass('available peak') 
									|| $(event.target).hasClass('available')
														|| $(event.target).hasClass('day-title')) {
			/*
			*	the same day
			*/
			if ($(this).hasClass('selected')) {

				if(!$(event.target).hasClass('time-slot selected')) {	
					$(event.target).siblings('.time-slot').removeClass('selected');
					$(event.target).addClass('selected');
				}
			}

			/*
			*	different day
			*/
			if (!$(this).hasClass('selected')) {
				//remove old selection
				$(this).siblings('.selected').children('.time-slot').removeClass('selected');
				$(this).siblings('.selected').removeClass('selected');

				//add new selection
				$(this).addClass('selected');
				if($(event.target).hasClass('time-slot')) {
					$(event.target).addClass('selected');
				}

				//change pixels of elements to make animation
				var pixels = $('.day-container').index(this) * 200;
	      		$('.day-container').attr('style', 'left: -' + pixels + 'px;');
			}
		}
	});
});
