<?php

class Reservation {
	var $name;
	var $date;

	function __construct($name, $date) {
		$this->name = $name;
		$this->date = $date;
	}
}

?>