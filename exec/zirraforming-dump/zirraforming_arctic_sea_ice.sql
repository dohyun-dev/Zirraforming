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
-- Table structure for table `arctic_sea_ice`
--

DROP TABLE IF EXISTS `arctic_sea_ice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arctic_sea_ice` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `year` smallint NOT NULL,
  `extent` double NOT NULL,
  `img_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arctic_sea_ice`
--

LOCK TABLES `arctic_sea_ice` WRITE;
/*!40000 ALTER TABLE `arctic_sea_ice` DISABLE KEYS */;
INSERT INTO `arctic_sea_ice` VALUES (1,1979,7.05,'http://j7d107.p.ssafy.io/images/2e75317b-3e92-11ed-bb61-001a7dda7103.png'),(2,1980,7.67,'http://j7d107.p.ssafy.io/images/2f17246f-3e92-11ed-8eea-001a7dda7103.png'),(3,1981,7.14,'http://j7d107.p.ssafy.io/images/2fb899f5-3e92-11ed-b331-001a7dda7103.png'),(4,1982,7.3,'http://j7d107.p.ssafy.io/images/305a0ff4-3e92-11ed-9fe0-001a7dda7103.png'),(5,1983,7.39,'http://j7d107.p.ssafy.io/images/30ff11e4-3e92-11ed-aa40-001a7dda7103.png'),(6,1984,6.81,'http://j7d107.p.ssafy.io/images/31a13bdf-3e92-11ed-9f91-001a7dda7103.png'),(7,1985,6.7,'http://j7d107.p.ssafy.io/images/32438bd2-3e92-11ed-90aa-001a7dda7103.png'),(8,1986,7.41,'http://j7d107.p.ssafy.io/images/32dfc7c6-3e92-11ed-9904-001a7dda7103.png'),(9,1987,7.28,'http://j7d107.p.ssafy.io/images/33839aca-3e92-11ed-9cd0-001a7dda7103.png'),(10,1988,7.37,'http://j7d107.p.ssafy.io/images/342709cc-3e92-11ed-b443-001a7dda7103.png'),(11,1989,7.01,'http://j7d107.p.ssafy.io/images/34c49c6e-3e92-11ed-aaa3-001a7dda7103.png'),(12,1990,6.14,'http://j7d107.p.ssafy.io/images/35616595-3e92-11ed-ab46-001a7dda7103.png'),(13,1991,6.47,'http://j7d107.p.ssafy.io/images/360069e9-3e92-11ed-9b19-001a7dda7103.png'),(14,1992,7.47,'http://j7d107.p.ssafy.io/images/36a12c84-3e92-11ed-8dcb-001a7dda7103.png'),(15,1993,6.4,'http://j7d107.p.ssafy.io/images/373b9b00-3e92-11ed-83b7-001a7dda7103.png'),(16,1994,7.14,'http://j7d107.p.ssafy.io/images/37dd0257-3e92-11ed-bff9-001a7dda7103.png'),(17,1995,6.08,'http://j7d107.p.ssafy.io/images/38833e79-3e92-11ed-8d09-001a7dda7103.png'),(18,1996,7.58,'http://j7d107.p.ssafy.io/images/39353bc9-3e92-11ed-91b7-001a7dda7103.png'),(19,1997,6.69,'http://j7d107.p.ssafy.io/images/39e2a145-3e92-11ed-935b-001a7dda7103.png'),(20,1998,6.54,'http://j7d107.p.ssafy.io/images/3aab4558-3e92-11ed-8f17-001a7dda7103.png'),(21,1999,6.12,'http://j7d107.p.ssafy.io/images/3b55cbdd-3e92-11ed-ba7f-001a7dda7103.png'),(22,2000,6.25,'http://j7d107.p.ssafy.io/images/3c030f68-3e92-11ed-af5a-001a7dda7103.png'),(23,2001,6.73,'http://j7d107.p.ssafy.io/images/3caa8e1b-3e92-11ed-bab9-001a7dda7103.png'),(24,2002,5.83,'http://j7d107.p.ssafy.io/images/3d5540b5-3e92-11ed-a82c-001a7dda7103.png'),(25,2003,6.12,'http://j7d107.p.ssafy.io/images/3e070985-3e92-11ed-b6a9-001a7dda7103.png'),(26,2004,5.98,'http://j7d107.p.ssafy.io/images/3eb6bf66-3e92-11ed-9841-001a7dda7103.png'),(27,2005,5.5,'http://j7d107.p.ssafy.io/images/3f5f32b8-3e92-11ed-9a13-001a7dda7103.png'),(28,2006,5.86,'http://j7d107.p.ssafy.io/images/400bc2b4-3e92-11ed-b842-001a7dda7103.png'),(29,2007,4.27,'http://j7d107.p.ssafy.io/images/40b6cb47-3e92-11ed-b8d1-001a7dda7103.png'),(30,2008,4.69,'http://j7d107.p.ssafy.io/images/416172e2-3e92-11ed-a9a3-001a7dda7103.png'),(31,2009,5.26,'http://j7d107.p.ssafy.io/images/42195bc6-3e92-11ed-a678-001a7dda7103.png'),(32,2010,4.87,'http://j7d107.p.ssafy.io/images/42c1dd67-3e92-11ed-a1ab-001a7dda7103.png'),(33,2011,4.56,'http://j7d107.p.ssafy.io/images/436aa997-3e92-11ed-9213-001a7dda7103.png'),(34,2012,3.57,'http://j7d107.p.ssafy.io/images/4413a431-3e92-11ed-bcdf-001a7dda7103.png'),(35,2013,5.21,'http://j7d107.p.ssafy.io/images/44c10c27-3e92-11ed-8b31-001a7dda7103.png'),(36,2014,5.22,'http://j7d107.p.ssafy.io/images/4568f8a0-3e92-11ed-82f5-001a7dda7103.png'),(37,2015,4.62,'http://j7d107.p.ssafy.io/images/461189a0-3e92-11ed-8693-001a7dda7103.png'),(38,2016,4.53,'http://j7d107.p.ssafy.io/images/46bc4630-3e92-11ed-a655-001a7dda7103.png'),(39,2017,4.82,'http://j7d107.p.ssafy.io/images/476a4f2b-3e92-11ed-9c58-001a7dda7103.png'),(40,2018,4.79,'http://j7d107.p.ssafy.io/images/48176632-3e92-11ed-969e-001a7dda7103.png'),(41,2019,4.36,'http://j7d107.p.ssafy.io/images/48cb269a-3e92-11ed-83d5-001a7dda7103.png'),(42,2020,4,'http://j7d107.p.ssafy.io/images/4979c201-3e92-11ed-ac08-001a7dda7103.png'),(43,2021,4.92,'http://j7d107.p.ssafy.io/images/4a299397-3e92-11ed-9677-001a7dda7103.png');
/*!40000 ALTER TABLE `arctic_sea_ice` ENABLE KEYS */;
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
