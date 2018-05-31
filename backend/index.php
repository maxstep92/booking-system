<?php
require 'lib/Slim/Slim.php';
require 'view/ViewReservations.php';

$app = new Slim();
$view = new ViewReservations();

//get reservations
$app->get('/reservations', $view->getReservations());

//post reservation
$app->post('/reservations', 'saveReservation');

//delete reservation
$app->delete('/reservations/:id', 'deleteReservation');

$app->run();

?>
