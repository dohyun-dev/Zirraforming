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
-- Table structure for table `character_type`
--

DROP TABLE IF EXISTS `character_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_type` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `display_name` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_type`
--

LOCK TABLES `character_type` WRITE;
/*!40000 ALTER TABLE `character_type` DISABLE KEYS */;
INSERT INTO `character_type` VALUES (1,'환경지킴이 주디','누구보다 자연을 사랑하는','환경을 지키기 위한 방안을 아주 잘 알고 있는 당신! <br>\n\n누구보다도 환경을 위한 실천을 잘 수행하고 있는 환경 지킴이 주디 유형입니다.<br>\n\n당신은 지구가 더 이상 아프지 않도록 많은 노력을 하고 있군요!\n\n쓰레기 종류에 따라 어떻게 분리수거해야하는지 완벽하게 알고 있고, 개인적으로 어떻게 노력해야 환경을 지킬 수 있는지 잘 알고 있습니다. <br>\n\n개인적으로 환경을 지킬 수 있는 활동은 매우 잘 실천하고 있으니 사람들과 모여서 환경을 지킬 수 있는 방법을 실천해보는 건 어떨까요?','https://j7d107.p.ssafy.io/images/judi.png'),(2,'환경 어린이 진구','환경을 위한 실천이 필요한','어떻게 하면 환경을 아낄 수 있는지에 대한 정보가 부족한 당신!<br>\n\n환경을 지키기 위해 실천이 필요한 것으로 보이는 환경 어린이 진구 유형이군요.<br>\n\n시간이 지날수록 아파지는 지구를 위해서 개인적인 실천이 필요할 것으로 보입니다.\n\n당장 실천하기가 어렵다면, 개인 텀블러를 가지고 다니며 일회용품을 줄이는 사소한 것부터 시작해보면 어떨까요? 조금씩 환경을 위한 행동을 하다보면 어느샌가 환경을 지키기위해 봉사활동을 다니며 적극적으로 환경을 아끼는 사람이 되어 있는 나의 모습을 볼 수 있을거에요!<br>\n\n조금씩 천천히 지구를 아끼려는 노력을 진행해봅시다.','https://j7d107.p.ssafy.io/images/no.png'),(3,'환경 애호가 곰돌이 푸','따뜻한 마음을 가진','문제에 처한 상황에 대해서 공감할 줄 아는 따듯한 당신! <br>\n\n감수성이 풍부하고 배려심을 가진 곰돌이 푸 유형이군요.<br>\n\n세계 곳곳에 있는 환경 문제에 대해서 관심을 가지고 문제를 개선하려고 하는 의지가 충분합니다.\n\n상황에 공감하고 슬퍼하는 것으로 그치지말고 어떻게하면 이 문제를 해결할 수 있을 지, 어떤 원인으로 이런 일들이 발생했는지 더 관심을 가지고 살펴보면 어떨까요?<br>환경을 위해 실천할 수 있는 일들이 많을거에요!','https://j7d107.p.ssafy.io/images/poo.png'),(4,'환경분석관 코난','냉철하고 철두철미한','환경 문제의 원인을 먼저 찾는 당신! <br>\n\n냉철하고 철두철미한 환경분석관 코난 유형이군요! <br>\n\n당신은 환경 문제를 면밀히 분석하여 원인을 찾고 해결방법을 모색하는 방법으로 환경문제에 관심을 갖고 해결할려고 노력합니다. <br>\n\n당신의 분석력을 보태어 지구의 모든 환경문제를 해결할 수 있게 보탬을 주세요.','https://j7d107.p.ssafy.io/images/conan.png'),(5,'환경 지도자 펭수','쓸데 없는 낭비를 싫어하는','환경을 지키기 위해서는 타인과 뜨거운 논쟁도 마다 하지 않는 당신!<br>\n\n뜨거운 논쟁을 즐기는 열정 가득 펭수 유형이군요! <br>\n\n당신은 자신뿐만 아니라 다른 사람들도 환경을 아끼고 사랑하도록 환경문제에 관심을 갖고 적극적으로 문제를 해결하려고 노력합니다. <br>\n\n당신 같은 사람들이 많아질수록 지구가 더욱 살기 좋게 바뀌겠죠?','https://j7d107.p.ssafy.io/images/peng.png'),(6,'완벽주의 살림꾼 보노보노','알뜰살뜰한','묵묵히 환경을 위해 자신만의 방식으로 노력을 하는 당신!<br>\n\n환경에 관심은 많지만 다른 사람과 같이 하는 것에 부담을 느끼는 보노보노 유형이군요!<br>\n\n남들이 보기에는 환경에 무심한 이미지이지만, 개인적으로 환경을 지키기위해 열심히 노력을 합니다. <br>\n\n당신의 노력을 주변에 알리며 환경 문제에 대한 관심을 이끌어보는건 어떨까요?','https://j7d107.p.ssafy.io/images/bono.png'),(7,'환경수호자 다람이','환경에 최선을 다하는 청렴 결백한','그 누구보다 환경에 대해서 철저한 당신! <br>\n\n환경 보호에도 계획을 세워 최선을 다해 실천하는 당신!!<br>\n\n체계적이고 철저한 사전계획을 가지는 다람이 유형이군요! <br>\n\n당신은 환경보호를 위해 쓰레기 종류를 정확히 파악해 분류한 뒤 재활용를 하는 스타일입니다. <br>\n\n앞으로도 계획적으로 환경보호 해주세요!','https://j7d107.p.ssafy.io/images/daram.png'),(8,'모험가 짱구','호기심 가득한','즐거운 마음으로 환경을 지키는 것에 앞장 서는 당신!<br>\n\n결과가 조금 아쉽더라도 과정이 즐겁다면 만족할 수 있는 장난꾸러기 짱구 유형이군요!<br>\n\n장난꾸러기 짱구유형은 결과가 명확하지 않더라도 보람차다면 환경을 위해 행동하는 타입이지만 그 행동을 꾸준히 실천하지는 못하는 유형입니다.\n\n환경문제에 대해서 당신의 작은 행동이 바로 결과로 보이지 않겠지만, 그런 행동 하나하나가 모인다면 지구에 큰 도움이 됩니다. <br>\n\n조금더 계획적이고 꾸준한 환경운동으로 지라포밍에 힘을 보태주세요!','https://j7d107.p.ssafy.io/images/jjang.png');
/*!40000 ALTER TABLE `character_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-07  4:21:03
