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