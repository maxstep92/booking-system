<?php
require 'viewmodel/Hour.php';

class Day {

	var $date;
	var $hours = array();

	function __construct($date) {
		$this->getDate($date);
	}

	function addHour($hour, $type) {
		$this->hours[] = new Hour($this->getHour($hour), $type);
	}

	function getDate($date) {
		$date = strtotime($date);
		$this->date = date('j F', $date);
	}

	function getHour($hour) {
		switch ($hour) {
			case 8:
				return '8:00';
				break;
			case 9:
				return '9:00';
				break;
			case 10:
				return '10:00';
				break;
			case 11:
				return '11:00';
				break;
			case 12:
				return '12:00';
				break;
			case 13:
				return '13:00';
				break;
			case 14:
				return '14:00';
				break;
			case 15:
				return '15:00';
				break;
			case 16:
				return '16:00';
				break;
			case 17:
				return '17:00';
				break;
			case 18:
				return '18:00';
				break;
			case 19:
				return '19:00';
				break;
			case 20:
				return '20:00';
				break;
			case 21:
				return '21:00';
				break;
			case 22:
				return '22:00';
				break;
			case 23:
				return '23:00';
				break;
			default:
				return 'not work hour';
				break;
		}
	}
}

?>