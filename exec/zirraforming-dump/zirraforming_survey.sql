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
-- Table structure for table `survey`
--

DROP TABLE IF EXISTS `survey`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) NOT NULL,
  `answer1` varchar(2000) NOT NULL,
  `answer2` varchar(2000) NOT NULL,
  `weight1` varchar(100) NOT NULL,
  `weight2` varchar(100) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey`
--

LOCK TABLES `survey` WRITE;
/*!40000 ALTER TABLE `survey` DISABLE KEYS */;
INSERT INTO `survey` VALUES (1,'커피를 마시기 위해 카페에 방문한 나는','가게에서 주는 일회용컵에 담아간다.','“이럴줄 알고 준비했지!” 라며 <br> 개인 텀블러에 담아간다.','0,1,0,0,0,0,0,0','2,0,1,1,1,1,1,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C1.png'),(2,'빙하가 녹아 북극곰이 보금자리를 잃은 <br> 뉴스 기사를 보면 나는','빙하가 왜 녹았는지 이유를 분석한다.','“북극곰 맘 아파 ㅠㅠ” 하며 슬퍼한다.','0,0,0,3,0,1,0,0','0,0,3,0,0,0,0,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C2.png'),(3,'내용물을 다 뺀 후 택배박스를 버릴 때 나는','송장과 테이프를 다 뜯고, <br> 박스를 접어서 버린다.','매직으로 택배송장의 개인정보를 지우고 <br> 박스를 접어서 버린다.','1,0,1,1,0,1,0,0','0,1,0,1,0,1,0,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C3.png'),(4,'식재료 구입을 위해 장을 볼 때 나는','주 1-2회 장보는 날을 정한다.','필요한게 생길 때마다 장을 보러간다.','1,0,1,1,0,1,3,0','0,1,0,0,0,0,0,3','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C4.png'),(5,'약속 장소에 향하기 위해서 나는 ','자가용을 타고 이동한다.','자전거나 대중교통을 이용해서 이동한다.','0,1,0,0,0,0,0,0','2,0,1,1,0,1,0,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C5.png'),(6,'길거리에 종량제 봉투 없이 생활 쓰레기를<br> 무단 투기하는 것을 목격한다면 나는','직접가서 여기에 버리면 안된다고 이야기한다.','“개념이 없네”라며 혼자 속으로 흉을 본다.','1,0,1,1,3,0,0,0','1,0,1,1,0,3,0,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C6.png'),(7,'생수병, 음료병을 버릴 때 나는','일반쓰레기와 분리하여 분리수거를 한다.','페트병의 라벨을 뜯고<br> 병뚜껑을 분리하여 분리수거를 한다.','1,0,1,1,0,1,0,0','2,0,1,1,0,1,0,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C7.png'),(8,'환경을 지킬 수 있는 활동을<br> 신청하려고 할 때 나는','직접 방문하여 활동할 수 있는 <br>프로그램을 신청한다.','기부 활동을 통해 실천할 수 있는<br> 프로그램을 신청한다.','1,0,1,1,2,0,0,3','1,0,1,1,0,2,3,0','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C8.png'),(9,'평소에 제품을 구매할 때 나는','가격이 비싸도 친환경 마크가 있는<br> 제품을 구매한다.','자주 구매하는 제품으로 구매한다.','2,0,1,1,0,1,1,0','0,1,0,0,0,0,0,1','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C9.png'),(10,'제로웨이스트 친환경 상점을 나는','0-2개 알고 있다.','3개 이상 알고 있다.','0,1,0,0,0,0,0,0','1,0,1,0,0,1,0,1','https://j7d107.p.ssafy.io/images/%EB%AC%B8%EC%A0%9C10.png');
/*!40000 ALTER TABLE `survey` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  4:20:59
