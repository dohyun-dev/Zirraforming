-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: j7d107.p.ssafy.io    Database: zirraforming
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `env_score` int DEFAULT NULL,
  `character_type_id` bigint DEFAULT NULL,
  `continuity` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`),
  KEY `members_fk_character_type_id_idx` (`character_type_id`),
  CONSTRAINT `members_fk_character_type_id` FOREIGN KEY (`character_type_id`) REFERENCES `character_type` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (10,'KAKAO_mine53@daum.net','이츠마인','2022-09-23 21:04:07','2022-10-06 14:56:46',6,4,1),(11,'GOOGLE_sawol634@gmail.com','지구방위대','2022-09-23 21:41:14','2022-10-07 03:59:29',5,6,1),(12,'KAKAO_qkslffkab@hanmail.net','사월코천2','2022-09-23 22:49:24','2022-10-03 02:17:07',10,NULL,1),(13,'GOOGLE_su980323@gmail.com','수갬','2022-09-24 11:07:23','2022-10-01 23:23:46',10,NULL,1),(14,'test@naver.com','안녕하세요1','2022-09-24 11:47:00','2022-10-01 23:23:42',NULL,NULL,1),(15,'test1@naver.com','안녕하세요2','2022-09-24 14:31:52','2022-10-01 23:23:38',NULL,NULL,1),(17,'KAKAO_spy03128@naver.com','지구뿌셔','2022-09-26 02:06:17','2022-10-06 22:51:33',7,6,1),(18,'GOOGLE_spy03128@gmail.com','첼시맛있어','2022-09-26 14:09:51','2022-10-07 03:39:25',3,4,1),(19,'NAVER_spy03128@naver.com','천사팀장','2022-09-26 14:13:34','2022-10-07 00:25:14',4,6,1),(20,'KAKAO_heo3793@naver.com','안녕ccc','2022-10-02 01:10:14','2022-10-05 17:21:35',6,4,1),(21,'GOOGLE_tobeykwon@gmail.com','외계인탐사선','2022-10-03 18:11:02','2022-10-07 02:58:20',6,4,1),(22,'KAKAO_mstkang@gmail.com','지구사랑','2022-10-04 09:15:40','2022-10-05 11:05:06',8,6,1),(23,'KAKAO_null','널이에요','2022-10-04 17:06:31','2022-10-06 03:27:05',NULL,NULL,1),(25,'NAVER_workcom0@naver.com','수경이짱','2022-10-05 09:36:26','2022-10-06 22:25:58',7,4,1),(26,'GOOGLE_mstkang@gmail.com','User26','2022-10-05 10:18:28','2022-10-05 10:18:29',NULL,NULL,0),(27,'GOOGLE_whdgur1068@gmail.com','정종혁','2022-10-05 10:55:19','2022-10-05 13:39:55',NULL,4,1),(28,'KAKAO_dnjsvltm425@naver.com','User28','2022-10-05 12:41:08','2022-10-05 12:41:08',NULL,NULL,0),(29,'KAKAO_zmstjftk@nate.com','멋쟁이동욱이','2022-10-05 23:55:26','2022-10-07 02:46:06',NULL,NULL,1),(30,'GOOGLE_hannabaek101@gmail.com','User30','2022-10-06 10:13:11','2022-10-06 10:13:11',NULL,NULL,0),(31,'GOOGLE_siryeongchoi@gmail.com','최시령','2022-10-06 14:52:34','2022-10-06 15:00:13',8,4,1);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  4:21:00
