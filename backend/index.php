<?php
require 'lib/Slim/Slim.php';
require 'viewmodel/Day.php';

$app = new Slim();

//get reservations
$app->get('/reservations', 'getReservations');

//post reservation
$app->post('/reservations', 'saveReservation');

//delete reservation
$app->delete('/reservations/:id', 'deleteReservation');

$app->run();


function getReservations() {
	$day = new Day(date('Y-m-d'), 10, 18);
	$nextDay = new Day(date('Y-m-d', strtotime('+1 day')), 10, 18);
	
	echo '{"games":'. json_encode(array($day, $nextDay)) .'}';
}

function saveReservations() {

}

function deleteReservation() {

}

?>
