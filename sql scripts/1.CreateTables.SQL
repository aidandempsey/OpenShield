CREATE DATABASE  IF NOT EXISTS `openshield` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `openshield`;

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

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (

  `team_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `team_name` VARCHAR(45) DEFAULT NULL,
  `team_leader` BIGINT(20) DEFAULT NULL, 
  `team_description` varchar(45) DEFAULT NULL,

  FOREIGN KEY (team_leader) REFERENCES user(user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (

  `user_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) DEFAULT NULL,
  `team_id` BIGINT(20) DEFAULT NULL,

  FOREIGN KEY (team_id) REFERENCES team(team_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `incident` (

  `incident_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `incident_name` VARCHAR(45) DEFAULT NULL,
  `team_id` BIGINT(20) DEFAULT NULL,
  `severity` ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT NULL,
  `detection_date` DATE DEFAULT NULL,
  `closure_date` DATE DEFAULT NULL,

  FOREIGN KEY (team_id) REFERENCES team(team_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `task` (

  `task_id` BIGINT(20)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `task_name` VARCHAR(45) DEFAULT NULL,
  `incident_id` BIGINT(20) NOT NULL,
  `assigned_user_id` BIGINT(20) DEFAULT NULL,
  `assignee_user_id` BIGINT(20) DEFAULT NULL,
  `task_status` ENUM('Open', 'InProgress', 'Closed') NOT NULL,
  `creation_date` DATE DEFAULT NULL,

  FOREIGN KEY (incident_id) REFERENCES incident(incident_id),
  FOREIGN KEY (assigned_user_id) REFERENCES user(user_id),
  FOREIGN KEY (assignee_user_id) REFERENCES user(user_id)

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;