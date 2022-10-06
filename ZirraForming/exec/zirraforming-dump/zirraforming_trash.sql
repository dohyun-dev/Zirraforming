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
-- Table structure for table `trash`
--

DROP TABLE IF EXISTS `trash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trash` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `type` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `co2` double NOT NULL,
  `ice` double NOT NULL,
  `comment` varchar(2000) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trash`
--

LOCK TABLES `trash` WRITE;
/*!40000 ALTER TABLE `trash` DISABLE KEYS */;
INSERT INTO `trash` VALUES (1,'paper','종이',84000,0.8999999761581421,'비닐코팅된 종이와 영수증 등은 일반쓰레기로 버려주시고 그 외의 종이류는 모아서 재활용 해주세요.','https://j7d107.p.ssafy.io/images/paper.png'),(2,'cardboard','박스',960000,10.699999809265137,'골판지 박스는 종이와 분리해 재활용 해주세요.','https://j7d107.p.ssafy.io/images/cardboard.png'),(3,'metal','철',1740000,19.5,'캔은 분리 배출시 캔속에 들어있는 내용물을 깨끗이 비우고 물로 헹군 후 압축해서 분리해 재활용 해주세요.','https://j7d107.p.ssafy.io/images/metal.png'),(4,'plastic','플라스틱',522000,5.800000190734863,'페트병 플라스틱은 분리 배출시 병에 붙은 라벨을 모두 뜯고 병뚜겅을 분리하여서 버려주세요.','https://j7d107.p.ssafy.io/images/plastic.jpg'),(5,'trash','일반쓰레기',300000,3.299999952316284,'재활용 불가능한 쓰레기는 종량제 봉투에 모아서 버려주세요.','https://j7d107.p.ssafy.io/images/trash.png'),(6,'glass','유리',1650000,18.5,'내열유리는 종량제 봉투나 특수규격마대를 이용해서 버려주시고 일반 유리는 내용물을 깨끗이 비우고 물로 헹군 후 분리해 재활용 해주세요.','https://j7d107.p.ssafy.io/images/glass.png'),(7,'null','인식불가',480000,5.300000190734863,'AI가 인식하지 못한 쓰레기 입니다. 추후 이미지를 추가하겠습니다.','https://j7d107.p.ssafy.io/images/null.png');
/*!40000 ALTER TABLE `trash` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  4:20:57
