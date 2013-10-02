CREATE DATABASE  IF NOT EXISTS `hh` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `hh`;
-- MySQL dump 10.13  Distrib 5.5.16, for osx10.5 (i386)
--
-- Host: 127.0.0.1    Database: hh
-- ------------------------------------------------------
-- Server version	5.5.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `LOCATION`
--

DROP TABLE IF EXISTS `LOCATION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LOCATION` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `address3` varchar(100) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `country` varchar(70) NOT NULL,
  `county` varchar(70) DEFAULT NULL,
  `createdDate` datetime NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `eventDate` datetime DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `postalCode` varchar(30) DEFAULT NULL,
  `state` varchar(100) NOT NULL,
  `type` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `area_CityId` int(11) NOT NULL,
  `hotspot_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`location_id`),
  UNIQUE KEY `name` (`name`,`address1`,`address2`,`country`,`state`,`city`,`type`),
  KEY `FK9FF58FB518CDA2C6` (`area_CityId`),
  KEY `FK9FF58FB512C6156E` (`hotspot_id`),
  CONSTRAINT `FK9FF58FB512C6156E` FOREIGN KEY (`hotspot_id`) REFERENCES `HOTSPOT` (`hotspot_id`),
  CONSTRAINT `FK9FF58FB518CDA2C6` FOREIGN KEY (`area_CityId`) REFERENCES `GEOCities` (`CityId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LOCATION`
--

LOCK TABLES `LOCATION` WRITE;
/*!40000 ALTER TABLE `LOCATION` DISABLE KEYS */;
INSERT INTO `LOCATION` (`location_id`, `address1`, `address2`, `address3`, `city`, `country`, `county`, `createdDate`, `description`, `eventDate`, `latitude`, `longitude`, `name`, `phone`, `postalCode`, `state`, `type`, `url`, `area_CityId`, `hotspot_id`) VALUES (1,'62 Merrow Rd','',NULL,'Tolland','United States',NULL,'2011-10-01 19:45:41',NULL,NULL,'41.86405','-72.361157','Electric Blue Cafe','(860) 870-7710','','Connecticut','Place','',39240,1);
/*!40000 ALTER TABLE `LOCATION` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2011-10-01 19:52:18
