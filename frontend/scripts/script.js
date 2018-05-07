$(document).ready(function(){	

	/* time selection */
	//TO DO set default values
	var selected_time = '';
	var selected_time_onfocus = '';

	/*
	*	starting parameters
	*/
	$('.day-container').attr('style', 'left: 0px;');

	/*
	*	event listener : onclick-scroll by day-time
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
					selected_time = $(event.target).addClass('selected');
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
					selected_time = $(event.target).addClass('selected');
				}

				//change pixels of elements to make animation
				var pixels = $('.day-container').index(this) * 200;
	      		$('.day-container').attr('style', 'left: -' + pixels + 'px;');
			}
		}
	});

	/*
	*	event listener : onclick-scroll by arrows
	*/
	$('.day-carousel').on('click', function(event) {

		if ($(event.target).hasClass('scroll-arrow')) {
			selected_time_onfocus = $(this).find('.day-container.selected');
			//remove old selection
			var i = $('.day-container').index(selected_time_onfocus);

			if($(event.target).hasClass('scroll-arrow-left') && (i-1) >= 0) {
				selected_time_onfocus.children('.time-slot').removeClass('selected');
				selected_time_onfocus.removeClass('selected');
				selected_time = '';

				var pixels = (i-1) * 200;
				selected_time_onfocus = $('.day-container').get(i-1);

				$(selected_time_onfocus).addClass('selected');

				$('.day-container').attr('style', 'left: -' + pixels + 'px;');
				
			}

			if($(event.target).hasClass('scroll-arrow-right') && (i+1) < $('.day-container').length) {
				selected_time_onfocus.children('.time-slot').removeClass('selected');
				selected_time_onfocus.removeClass('selected');
				selected_time = '';

				var pixels = (i+1) * 200;
				
				selected_time_onfocus = $('.day-container').get(i+1);
				$(selected_time_onfocus).addClass('selected');

				$('.day-container').attr('style', 'left: -' + pixels + 'px;');
			}
		}
	});
});

























