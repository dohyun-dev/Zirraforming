DROP database IF EXISTS zirraforming;
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

--  환경유형 검사 데이터 삽입
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (1, '가게에서 주는 일회용컵에 담아간다.', '“이럴줄 알고 준비했지!” 라며 개인 텀블러에 담아간다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C0.png', '커피를 마시기 위해 카페에 방문한 나는', '0,1,0,0,0,0,0,0', '2,0,1,1,1,1,1,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (2, '빙하가 왜 녹았는지 이유를 분석한다.', '“북극곰 맘 아파 ㅠㅠ” 하며 슬퍼한다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C1.png', '(환경오염 관련 기사) 빙하가 녹아 북극곰이 보금자리를 잃은 뉴스 기사를 보면 나는', '0,0,0,3,0,1,0,0', '0,0,3,0,0,0,0,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (3, '송장과 테이프를 다 뜯고, 박스를 접어서 버린다.', '매직으로 택배송장의 개인정보를 지우고 박스를 접어서 버린다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C2.png', '(택배 박스 버릴 때) 내용물을 다 뺀 후 택배박스를 버릴 때 나는', '1,0,1,1,0,1,0,0', '0,1,0,1,0,1,0,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (4, '주 1-2회 장보는 날을 정한다.', '필요한게 생길 때마다 장을 보러간다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C3.png', '(장바구니) 식재료 구입을 위해 장을 볼 때 나는', '1,0,1,1,0,1,3,0', '0,1,0,0,0,0,0,3');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (5, '자가용을 타고 이동한다.', '자전거나 대중교통을 이용해서 이동한다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C4.png', '(교통수단) 약속 장소에 향하기 위해서 나는 ', '0,1,0,0,0,0,0,0', '2,0,1,1,0,1,0,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (6, '직접가서 여기에 버리면 안된다고 이야기한다.', '“개념이 없네”라며 혼자 속으로 흉을 본다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C5.png', '(쓰레기를 함부로 버리는 거 목격) 길거리에 종량제 봉투 없이 생활 쓰레기를 무단 투기하는 것을 목격한다면 나는', '1,0,1,1,3,0,0,0', '1,0,1,1,0,3,0,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (7, '일반쓰레기와 분리하여 분리수거를 한다.', '페트병의 라벨을 뜯고 병뚜껑을 분리하여 분리수거를 한다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C6.png', '(페트병 라벨 뜯고, 병뚜껑 분리)  생수병, 음료병을 버릴 때 나는', '1,0,1,1,0,1,0,0', '2,0,1,1,0,1,0,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (8, '직접 방문하여 활동할 수 있는 프로그램을 신청한다.', '기부 활동을 통해 실천할 수 있는 프로그램을 신청한다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C7.png', '(환경 관련 봉사활동) 환경을 지킬 수 있는 활동을 신청하려고 할 때 나는', '1,0,1,1,2,0,0,3', '1,0,1,1,0,2,3,0');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (9, '가격이 비싸도 친환경 마크가 있는 제품을 구매한다.', '자주 구매하는 제품으로 구매한다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C8.png', '(식품 살 때 친환경 마크) 평소에 제품을 구매할 때 나는', '2,0,1,1,0,1,1,0', '0,1,0,0,0,0,0,1');
INSERT INTO zirraforming.survey (id, answer1, answer2, img_url, question, weight1, weight2) VALUES (10, '0-2개 알고 있다.', '3개 이상 알고 있다.', 'http://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C9.png', '(친환경 상점) 제로웨이스트 친환경 상점을 나는', '0,1,0,0,0,0,0,0', '1,0,1,0,0,1,0,1');