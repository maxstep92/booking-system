<?php
require 'viewmodel/Day.php';
require 'repository/Repository.php';

class Json {

	var $rep;

	function __construct() {
		$this->rep = new Repository();
	}

	function getReservations($game, $amountPlayers) {
		//this is connection from database -> create table InternalInfo
		date_default_timezone_set('Europe/Prague');
		
		$start = 10;
		$end = 17; //time of the end of last game	
		$period = 7;	

		//minimal players
		if($amountPlayers < 2) {
			//min amount of players
			$amountPlayers = 2;
		}

		//get some information about this service
		$service = $this->rep->getServiceByName($game);
		$max_players=(int)$service->max_players;
		$game_duration = ((int)$service->duration)/60;

		$days = array();

		//construct days array for some period
		for($i=0; $i < $period; $i++) {
			$date = date('Y-m-d', strtotime('+' . $i .' day'));

			$days[] = new Day($date);

 			$offset = (($end+1)-$start) % $game_duration;

			if ($offset != 0) {
				$end--;
			}

			$reservDay = $this->getArrayReservationsForDay($date, $start, $end);

			//construct time hours for this day
			for($t = $start; $t <= $end; $t++) {

				$state = $this->isTimeAvailable($reservDay, $t, $game_duration, $max_players, $amountPlayers);

				for($delta=0; $delta < $game_duration; $delta++) {
					$t += $delta;
					if ($delta == 0) {
						$days[$i]->addHour($t, $state);
					} else {
						$days[$i]->addHour($t, 'peak');
					}
				}
			}
		}
	
		return '{"games":'. json_encode($days) .'}';
	}

	function saveReservation() {

	}

	function deleteReservation($id) {

	}

	//get structure array(hour=>how_many_people)
	function getArrayReservationsForDay($day, $start, $end) {
		$reserv = $this->rep->getReservationsForDay($day);
		$workingHours = $this->getWorkingHoursArray($start, $end);

		if(isset($reserv)) {
			for($i=0; $i < sizeof($reserv); $i++) {
				$time = (int)$reserv[$i]->time;
				$people = (int)$reserv[$i]->people;
				$duration = (int)$reserv[$i]->duration/60;

				for($t=0; $t < $duration; $t++) {
					$workingHours[$time+$t] += $people;
				}
			}
		}

		return $workingHours;
	}

	function getWorkingHoursArray($start, $end) {
		$workingHours = array();
		for($t=$start; $t <= $end; $t++) {
			$workingHours[$t] = 0; 
		}

		return $workingHours;
	}

	function isTimeAvailable($reservDay, $time, $game_duration, $max_players, $amountPlayers) {
		$delta = 0;

		while($delta < $game_duration) {
			$time += $delta;
			$free_places = $max_players-$reservDay[$time];

			if (($free_places % 2) != 0) {
				$free_places -= 1;
			}

			if ($free_places >= $amountPlayers) {
				$delta++;
			} else {
				return 'peak';
			}
		}

		return 'available';
	}
}
?>




