<?php
require 'viewmodel/Day.php';

class ViewReservations {

	function getReservations() {
		$start = 14;
		$end = 22;

		$for_days = 7;

		$duration = 2;

		$days = array();

		for($day=0; $day<$for_days; $day++) {
			$days[] = new Day(date('Y-m-d', strtotime('+' . $day .' day')), $start, $end, $duration);
		}
	
		echo '{"games":'. json_encode($days) .'}';
	}

	function saveReservation() {

	}

	function deleteReservation($id) {

	}
}

?>
