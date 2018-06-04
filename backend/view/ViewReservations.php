<?php
require 'viewmodel/Day.php';
require 'repository/ReservationRepository.php';

class ViewReservations {

	function getReservationsJSON() {
		//this is connection from database -> create table InternalInfo
		$start = 10;
		$end = 17; //time of last game
		$max_places=6;
		$game_duration = 60/60;
		//this is connection from client
		$date = '2018-05-31';
		$amountPlayers = 2;
		$game_name;

		// $for_days = 1;
		// $days = array();
		// for($day=0; $day<$for_days; $day++) {
		// 	$days[] = new Day(date('Y-m-d', strtotime('+' . $day .' day')), $start, $end, $duration);
		// }

		$days = array();
		$days[] = new Day(date($date));
		$offset = (($end+1)-$start) % $game_duration;

		if ($offset != 0) {
			$end--;
		}

		$reservDay = $this->getArrayReservationsForDay($date, $start, $end);

		for($t = $start; $t <= $end; $t++) {

			$state = $this->isTimeAvailable($reservDay, $t, $game_duration, $max_places, $amountPlayers);

			for($delta=0; $delta < $game_duration; $delta++) {
				$t += $delta;
				if ($delta == 0) {
					$days[0]->addHour($t, $state);
				} else {
					$days[0]->addHour($t, 'peak');
				}
			}
		}
	
		echo '{"games":'. json_encode($days) .'}';
	}

	function saveReservation() {

	}

	function deleteReservation($id) {

	}

	//get structure array(hour=>how_many_people)
	function getArrayReservationsForDay($day, $start, $end) {
		$rep = new ReservationRepository();
		$reserv = $rep->getReservationsForDay($day);
		$workingHours = $this->getWorkingHoursArray($start, $end);

		for($i=0; $i < sizeof($reserv); $i++) {
			$time = (int)$reserv[$i]->time;
			$people = (int)$reserv[$i]->people;
			$duration = (int)$reserv[$i]->duration/60;

			for($t=0; $t < $duration; $t++) {
				$workingHours[$time+$t] += $people;
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

	function isTimeAvailable($reservDay, $time, $game_duration, $max_places, $amountPlayers) {
		$delta = 0;

		while($delta < $game_duration) {
			$time += $delta;
			$free_places = $max_places-$reservDay[$time];

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




