<?php
require 'lib/vendor/autoload.php';
require 'view/Json.php';
//require 'repository/Repository.php';

$app = new \Slim\App();

// $app->get('/', function ($request, $response, $args) {

// 	$rep = new Repository();

// 	$response->
// 		getBody()->
// 			write($rep->getServiceByName('game_1'));
// });

//get reservations = /reservations?game=1&amount=2
$app->get('/reservations', function ($request, $response, $args) {
	$game_name = $request->getQueryParam('game');
	$amount_players = (int)$request->getQueryParam('amount');

	$json = new Json();

	$response->
		getBody()->
			write($json->getReservations($game_name, $amount_players));
});

$app->run();

//get reservations
// $app->get('/reservations', $view->getReservationsJSON());

//post reservation
// $app->post('/reservations', 'saveReservation');

//delete reservation
// $app->delete('/reservations/:id', 'deleteReservation');

// $app->run();

?>
