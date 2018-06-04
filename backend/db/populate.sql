---------------------------------
-- Add data to SERVICE
---------------------------------

INSERT INTO `service` 
	(`name`,`max_players`,`duration`,`image_preview`,`description`,`price`)
VALUES
	('GAME_2', 6, 60, NULL, 'VERY GOOD SECOND GAME FOR YOU!', 500);

---------------------------------
-- Add data to LANGUAGE
---------------------------------

INSERT INTO `language` 
	(`name` , `serviceid`)
VALUES
	('CZK', (SELECT `serviceid` 
			 FROM `service`
			 WHERE `name` = 'GAME_2')),
	('ENG', (SELECT `serviceid` 
			 FROM `service`
			 WHERE `name` = 'GAME_2'));

---------------------------------
-- Add data to RESERVATIONS
---------------------------------

INSERT INTO reservations 
	(date, time, people, total_cost, contactinfoid, serviceid, langname)
VALUES
	('2018-05-31', '11:00:00', 4, 
		(select price*4 from service where name='GAME_1'),  
		(select contactinfoid from contactinfo where email='developer.stepanov@gmail.com'), 
		(select serviceid from service where name='GAME_1'), 'CZK');


