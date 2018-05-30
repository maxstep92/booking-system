-- -----------------------------------------------------
-- db booking
-- -----------------------------------------------------

CREATE DATABASE if NOT EXISTS `booking` DEFAULT CHARACTER SET utf8;
USE `booking`;

-- -----------------------------------------------------
-- CREATE service 
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `booking`.`service` (
	`serviceid` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`max_players` TINYINT UNSIGNED NOT NULL, 
	`duration` SMALLINT UNSIGNED NOT NULL, -- MINUTES
	`image_preview` VARCHAR(50), -- path to image preview
	`description` VARCHAR(400),
	`price` SMALLINT UNSIGNED NOT NULL, -- PER PERSON

	PRIMARY KEY (`serviceid`)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8;

-- -----------------------------------------------------
-- CREATE Language
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `booking`.`language` (
	`langid` TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(20) NOT NULL,
	`serviceid` TINYINT UNSIGNED, -- foreign key to service.serviceid

	PRIMARY KEY (`langid`),

	CONSTRAINT `fk_lang_serviceid`
		FOREIGN KEY (`serviceid`)
		REFERENCES `booking`.`service`(`serviceid`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION

) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8;

-- -----------------------------------------------------
-- CREATE ContactInfo
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `booking`.`contactinfo` (
	`contactinfoid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`firstname` VARCHAR(30) NOT NULL,
	`lastname`  VARCHAR(30) NOT NULL,
	`email`  VARCHAR(30) NOT NULL,
	`phone` VARCHAR(20),

	PRIMARY KEY (`contactinfoid`)

) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8;

-- -----------------------------------------------------
-- CREATE Reservations
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `booking`.`reservations` (
	`reservationid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`date` DATE NOT NULL, -- 'YYYY-MM-DD'
	`time` TIME NOT NULL,
	`timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`people` TINYINT UNSIGNED NOT NULL,
	`total_cost` SMALLINT UNSIGNED,
	`langid` TINYINT UNSIGNED, -- foreign key language.langid
	`contactinfoid` INT UNSIGNED, -- foreign key contactinfo.contactinfoid
	`serviceid` TINYINT UNSIGNED, -- foreign key service.serviceid

	PRIMARY KEY (`reservationid`),

	CONSTRAINT `fk_reserv_langid`
		FOREIGN KEY (`langid`)
		REFERENCES `booking`.`language`(`langid`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,

	CONSTRAINT `fk_reserv_contactinfoid`
		FOREIGN KEY (`contactinfoid`)
		REFERENCES `booking`.`contactinfo`(`contactinfoid`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,

	CONSTRAINT `fk_reserv_serviceid`
		FOREIGN KEY (`serviceid`)
		REFERENCES `booking`.`service`(`serviceid`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION

) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8;

-- -----------------------------------------------------
-- CREATE Vouchers
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `booking`.`vouchers` (
	`voucherid` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`discount`  FLOAT(3,2) NOT NULL,
	`max_using_times` INT UNSIGNED,
	`expiration_date` DATE,

	PRIMARY KEY (`voucherid`)

) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8;

-- -----------------------------------------------------
-- CREATE UsedVouchers
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `booking`.`usedvouchers` (
	`usedvoucherid` INT UNSIGNED NOT NULL AUTO_INCREMENT,
	`voucherid` SMALLINT UNSIGNED, -- vouchers.voucherid
	`reservationid` INT UNSIGNED, -- reservations.reservationid

	PRIMARY KEY (`usedvoucherid`),

	CONSTRAINT `fk_usedvoucher_voucherid`
		FOREIGN KEY (`voucherid`)
		REFERENCES `booking`.`vouchers`(`voucherid`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,

	CONSTRAINT `fk_usedvoucher_reservationid`
		FOREIGN KEY (`reservationid`)
		REFERENCES `booking`.`reservations`(`reservationid`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION	
	
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8;

















