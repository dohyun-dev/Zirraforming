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
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campaign` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `url` text NOT NULL,
  `character_type_id` bigint NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campaign_fk_character_type_id_idx` (`character_type_id`),
  CONSTRAINT `campaign_fk_character_type_id` FOREIGN KEY (`character_type_id`) REFERENCES `character_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (1,'그린피스 자원봉사 모집 캠페인','https://cloud.greensk.greenpeace.org/petitions-supporter-volunteer?_ga=2.47736039.1101791036.1664407782-1649317148.1662468593',1,'https://j7d107.p.ssafy.io/images/greensk.png'),(2,'KOICA-NGO 봉사단 파견 단원 모집','https://www.kidc.or.kr/18/?q=YToxOntzOjEyOiJrZXl3b3JkX3R5cGUiO3M6MzoiYWxsIjt9&bmode=view&idx=12858480&t=board',1,'https://j7d107.p.ssafy.io/images/kidc.png'),(3,'대학생 연합 환경동아리','https://docs.google.com/forms/d/e/1FAIpQLSfMEJCk4QlrF2mb8RStNBjdvcflfAzKC2zCAfMgPTYwNpbTiw/viewform',1,'https://j7d107.p.ssafy.io/images/green.png'),(4,'그린피스 제로해 캠페인','https://cloud.greensk.greenpeace.org/petitions-ce-gozero?_ga=2.7046514.1101791036.1664407782-1649317148.1662468593',2,'https://j7d107.p.ssafy.io/images/zero.png'),(5,'환경운동연합 플라스틱제로 캠페인','http://plasticzero.net/?gclid=CjwKCAjw4c-ZBhAEEiwAZ105RQ2DENKMFRiDIbytLNbEqA-ivC-fhDtTYo4pz8oZ5zvjGzUbxSp_jxoCAHgQAvD_BwE',2,'https://j7d107.p.ssafy.io/images/pet.png'),(6,'그린피스 해양보호구역 지정 지지 서명 캠페인','https://cloud.greensk.greenpeace.org/petitions-ocean-plasticV3?_ga=2.73549010.1101791036.1664407782-1649317148.1662468593',3,'https://j7d107.p.ssafy.io/images/ocean.png'),(7,'그린피스 탈원전 서명 캠페인','https://cloud.greensk.greenpeace.org/petitions-ce-endingnuke?_ga=2.15287670.1101791036.1664407782-1649317148.1662468593',3,'https://j7d107.p.ssafy.io/images/act.png'),(8,'2022년도 환경데이터 분석 활용 공모전','http://www.edc2022.or.kr/',4,'https://j7d107.p.ssafy.io/images/edc.png'),(9,'ESG+혁신 아이디어 공모전','https://kcpi-idea.com/',4,'https://j7d107.p.ssafy.io/images/kcpi.png'),(10,'그린피스 강력한 국제 플라스틱 조약 체결 서명 캠페인','https://cloud.greensk.greenpeace.org/petitions-ocean-plasticV3?_ga=2.73549010.1101791036.1664407782-1649317148.1662468593',5,'https://j7d107.p.ssafy.io/images/plastic.png'),(11,'환경재단 방사능오염수방류는 핵테러다 캠페인','http://greenfund.org/board/board.php?bo_table=campaign&idx=5&tab=1',5,'https://j7d107.p.ssafy.io/images/greenfund.png'),(12,'초록우산 어린이재단 기후환경변화 캠페인 후원','https://www.childfund.or.kr/camp/cpView20000452_main.do?pageNo=1&pageRows=12&displayYn=Y&statusCd=03&delYn=N&cpId=20000452&classCd=&cpClassArr=running&searchVal=&sortOrder=',6,'https://j7d107.p.ssafy.io/images/childfund.png'),(13,'WWF 기후변화 캠페인 후원','https://campaign.wwfkorea.or.kr/FY21climate_emforce?utm_source=google_pc&utm_medium=cpc&utm_campaign=fy21climate&utm_term=환경캠페인&gclid=CjwKCAjw4c-ZBhAEEiwAZ105RU0_XUvgZOb5OKEoVhpkX9-5mYPBHyc_kPdoXGHWLRtBJsdm6tIatxoCOpQQAvD_BwE',6,'https://j7d107.p.ssafy.io/images/wwfkorea.png'),(14,'환경교육센터 해양쓰레기 캠페인 워크숍','http://www.edutopia.or.kr/node/2800',7,'https://j7d107.p.ssafy.io/images/edutopia12.png'),(15,'굿네이버스','http://wseoul.goodneighbors.kr/gnwseoul/board/cd103101100/info/43175',7,'https://j7d107.p.ssafy.io/images/goodneighbors.png'),(16,'환경교육센터 기후위기&에너지 보드게임 크라우드 펀딩','http://www.edutopia.or.kr/node/2800',8,'https://j7d107.p.ssafy.io/images/edutopia.png'),(17,'플라스틱방앗간 업사이클 티코스터 제작 체험','https://booking.naver.com/booking/12/bizes/218253/items/4619174',8,'https://j7d107.p.ssafy.io/images/bizes.png');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
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
