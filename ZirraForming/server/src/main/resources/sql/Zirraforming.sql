drop database zirraforming;
create database zirraforming;
use zirraforming;

DROP TABLE IF EXISTS `hibernate_sequence`;
CREATE TABLE hibernate_sequence (
       next_val bigint
    ) ENGINE=InnoDB;
INSERT INTO hibernate_sequence VALUES ( 1 );

DROP TABLE IF EXISTS `character_type`;
CREATE TABLE `character_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `members`;
CREATE TABLE `members` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `env_score` int DEFAULT NULL,
  `character_type_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  KEY `members_fk_character_type_id_idx` (`character_type_id`),
  CONSTRAINT `members_fk_character_type_id` FOREIGN KEY (`character_type_id`) REFERENCES `character_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `badge`;
CREATE TABLE `badge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `member_badge`;
CREATE TABLE `member_badge` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `badge_id` bigint NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `member_badge_member_id_idx` (`member_id`),
  KEY `member_badge_badge_id_idx` (`badge_id`),
  CONSTRAINT `member_badge_fk_badge_id` FOREIGN KEY (`badge_id`) REFERENCES `badge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `member_badge_fk_member_id` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `star`;
CREATE TABLE `star` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `co2` double NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `star_fk_member_id_idx` (`member_id`),
  CONSTRAINT `star_fk_member_id` FOREIGN KEY (`member_id`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `campaign`;
CREATE TABLE `campaign` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `url` text NOT NULL,
  `character_type_id` bigint NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_fk_character_type_id_idx` (`character_type_id`),
  CONSTRAINT `campaign_fk_character_type_id` FOREIGN KEY (`character_type_id`) REFERENCES `character_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `survey`;
CREATE TABLE `survey` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) NOT NULL,
  `answer1` varchar(2000) NOT NULL,
  `answer2` varchar(2000) NOT NULL,
  `weight1` varchar(100) NOT NULL,
  `weight2` varchar(100) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `co2_emission`;
CREATE TABLE `co2_emission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` smallint NOT NULL,
  `month` smallint NOT NULL,
  `emission` double NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `surface_temperature`;
CREATE TABLE `surface_temperature` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` smallint NOT NULL,
  `temperature` double NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `air_pollution`;
CREATE TABLE `air_pollution` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` smallint NOT NULL,
  `kind` varchar(20) NOT NULL,
  `emission` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `climate_change`;
CREATE TABLE `climate_change` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `country` varchar(50) NOT NULL,
  `year` smallint NOT NULL,
  `temperature` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `air_pollution_emission`;
CREATE TABLE `air_pollution_emission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `country` varchar(30) NOT NULL,
  `year` smallint NOT NULL,
  `no` double NOT NULL,
  `so` double NOT NULL,
  `ultra_particular` double NOT NULL,
  `particular` double NOT NULL,
  `co` double NOT NULL,
  `nmvoc` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `air_polution_death`;
CREATE TABLE `air_polution_death` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `country` varchar(30) NOT NULL,
  `year` smallint NOT NULL,
  `death` bigint NOT NULL,
  `total_death` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `arctic_sea_ice`;
CREATE TABLE `arctic_sea_ice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` smallint NOT NULL,
  `extent` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `ice_sheets`;
CREATE TABLE `ice_sheets` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` smallint NOT NULL,
  `mass` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
