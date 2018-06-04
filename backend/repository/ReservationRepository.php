<?php

class ReservationRepository {
	//get day reservations for view in web's table
	function getReservationsForDay($day) {
		$sql = "select date, time, people, duration 
				from reservations r, service s, contactinfo c
				where r.serviceid = s.serviceid and r.contactinfoid = c.contactinfoid and date=:day
				order by r.time;";
		try {
			$db = $this->getConnection();
			$stmt = $db->prepare($sql);  
			$stmt->bindParam("day", $day);
			$stmt->execute();
			$resrv = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			return $resrv;
		} catch(PDOException $e) {
			return $e->getMessage(); 
		}
	}

	function getConnection() {
		$dbhost="127.0.0.1";
		$dbuser="";
		$dbpass="";
		$dbname="";
		$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $dbh;
	}
}

?>