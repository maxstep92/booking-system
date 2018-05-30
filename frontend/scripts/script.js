$(document).ready(function(){
	// starting parameters
	init();

	//add some additional logic
	addEventsForGames();
});

function init() {
	//game
	$('.mission-container').attr('style', 'left: 0px;');
	$('.mission-container').first().addClass('selected');
	$('.game.scroll-arrow-right').addClass('active');

	$('.mission-container.selected').find('.price').css(
		{"visibility" : "visible"}
	);

	//initial data
	var game_name = $('.mission-container.selected').attr('id');

	getTemplateDays('./backend/data/' + game_name + '.json');
};

function checkReservationButton() {
	if ($('.time-slot').hasClass('selected')) {
		$('.book-button').addClass('enabled');
	} else {
		$('.book-button').removeClass('enabled');
	}
};

function checkArrows(container, index, type) {
	
	if (index == 0) 
	{
		$('.' + type + '.scroll-arrow-left').removeClass('active');
		$('.' + type + '.scroll-arrow-right').addClass('active');
	} 

	if (index == ($('.' + container).length-1)) 
	{
		$('.' + type + '.scroll-arrow-right').removeClass('active');
		$('.' + type + '.scroll-arrow-left').addClass('active');
	}

	if (index > 0 && index < ($('.' + container).length-1)) 
	{	
		if (!$('.' + type + '.scroll-arrow-left').hasClass('active')) {
			$('.' + type + '.scroll-arrow-left').addClass('active');
		}

		if (!$('.' + type + '.scroll-arrow-right').hasClass('active')) {
			$('.' + type + '.scroll-arrow-right').addClass('active');
		}
	}
};

function addEventsForGames() {
	//event listener : onclick-scroll by click on element
	$('.mission-container').on('click', function(event) {
		//this -> clicked object with class '.mission-container'
		if (!$(this).hasClass('selected')) {

			var i = $('.mission-container').index(this);
			var pixels = i * 300;
			var game_name = $(this).attr('id');

			$('.mission-container').attr('style', 'left: -' + pixels + 'px;');

			$(this).siblings('.selected').find('.price').css(
				{ "visibility" : "hidden" }
			);

			$(this).siblings('.selected').removeClass('selected');
			$(this).addClass('selected');

			$('.mission-container.selected').find('.price').css(
				{"visibility" : "visible"}
			);

			//change days and times to selected game
			getTemplateDays('./backend/data/' + game_name + '.json');

			checkArrows('mission-container', i, 'game');
			$('.book-button').removeClass('enabled');
		}
	});

	//event listener : onclick-scroll by click on arrows
	$('.mission-carousel').on('click', function(event) {
		if ($(event.target).hasClass('scroll-arrow')) {
			var selected_game_onfocus = $(this).find('.mission-container.selected');
			
			//remove old selection
			var i = $('.mission-container').index(selected_game_onfocus);

			//press the left arrow
			if($(event.target).hasClass('scroll-arrow-left') && (i-1) >= 0) {
				$('.mission-container').siblings('.selected').find('.price').css(
					{ "visibility" : "hidden" }
				);

				selected_game_onfocus.removeClass('selected');

				var pixels = (i-1) * 300;
				selected_game_onfocus = $('.mission-container').get(i-1);

				var game_name = $(selected_game_onfocus).attr('id');
				$(selected_game_onfocus).addClass('selected');

				$('.mission-container').attr('style', 'left: -' + pixels + 'px;');

				//change days and times to selected game
				getTemplateDays('./backend/data/' + game_name + '.json');

				checkArrows('mission-container', (i-1), 'game');
				$('.book-button').removeClass('enabled');
			}

			//press the right arrow
			if($(event.target).hasClass('scroll-arrow-right') && (i+1) < $('.mission-container').length) {
				$('.mission-container').siblings('.selected').find('.price').css(
					{ "visibility" : "hidden" }
				);

				selected_game_onfocus.removeClass('selected');

				var pixels = (i+1) * 300;
				selected_game_onfocus = $('.mission-container').get(i+1);

				var game_name = $(selected_game_onfocus).attr('id');
				$(selected_game_onfocus).addClass('selected');

				$('.mission-container').attr('style', 'left: -' + pixels + 'px;');

				//change days and times to selected game
				getTemplateDays('./backend/data/' + game_name + '.json');

				checkArrows('mission-container', (i+1), 'game');
				$('.book-button').removeClass('enabled');
			}

			$('.mission-container.selected').find('.price').css(
				{"visibility" : "visible"}
			);
		}
	});
};

function getTemplateDays(path, callback) {
	//get data from URL and render template
    $.ajax({
    	type: 'GET',
        url: path,
        dataType: 'json',
        success: function(data) {
        	renderTemplate(data, callback); 
        }
    });
};

function renderTemplate(data, callback) {
	var source = $('#dayTemplate').html();
	var template = Handlebars.compile(source);
	//add rendered template
	$('.handlebar').html(template(data));

	// day
	$('.day-container').attr('style', 'left: 0px;');
	$('.day-container').first().addClass('selected');
	//arrow
	$('.day.scroll-arrow-right').addClass('active');

	//$('.day-container.selected').children().css({"zoom": "130%"});

	addEventsForTemplateDays();

	//add some aditional logic after rendering template days
	if (callback) callback();
};

function addEventsForTemplateDays() {
	//event listener : onclick-scroll by click on element
	$('.day-container').on('click', function(event) {
		
		// do something only if day is free
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
		}

		/*
		*	different day
		*/
		if (!$(this).hasClass('selected')) {
			//$('.day-container.selected').children().animate({"zoom": "100%"}, 80);
			//remove old selection
			$(this).siblings('.selected').children('.time-slot').removeClass('selected');
			$(this).siblings('.selected').removeClass('selected');

			//add new selection
			$(this).addClass('selected');
			if($(event.target).hasClass('available')) {
				$(event.target).addClass('selected');
			}

			var i = $('.day-container').index(this);

			//change pixels of elements to make animation
			var pixels = i * 200;
			//$('.day-container.selected').children().animate({"zoom": "130%"}, 300);
      		$('.day-container').attr('style', 'left: -' + pixels + 'px;');
 			checkArrows('day-container', i, 'day');
		}

		checkReservationButton();
		//}
	});

	//event listener : onclick-scroll by click on arrows
	$('.day-carousel').on('click', function(event) {

		if ($(event.target).hasClass('scroll-arrow')) {
			var selected_time_onfocus = $(this).find('.day-container.selected');
			//$(selected_time_onfocus).children().animate({"zoom": "100%"}, 70);

			var i = $('.day-container').index(selected_time_onfocus);

			//press the left arrow
			if($(event.target).hasClass('scroll-arrow-left') && (i-1) >= 0) {
				selected_time_onfocus.children('.time-slot').removeClass('selected');
				selected_time_onfocus.removeClass('selected');

				var pixels = (i-1) * 200;

				selected_time_onfocus = $('.day-container').get(i-1);
				$(selected_time_onfocus).addClass('selected');

				//$('.day-container.selected').children().animate({"zoom": "130%"}, 180);
				$('.day-container').attr('style', 'left: -' + pixels + 'px;');

				checkArrows('day-container', (i-1), 'day');
			}

			//press the right arrow
			if($(event.target).hasClass('scroll-arrow-right') && (i+1) < $('.day-container').length) {
				//console.log(selected_time);

				selected_time_onfocus.children('.time-slot').removeClass('selected');
				selected_time_onfocus.removeClass('selected');

				var pixels = (i+1) * 200;
				
				selected_time_onfocus = $('.day-container').get(i+1);
				$(selected_time_onfocus).addClass('selected');

				//$('.day-container.selected').children().animate({"zoom": "130%"}, 180);
				$('.day-container').attr('style', 'left: -' + pixels + 'px;');

				checkArrows('day-container', (i+1), 'day');
			}

			checkReservationButton();
		}
	});
};






















