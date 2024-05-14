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

DROP TABLE IF EXISTS `organization`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `organization` (
  `organization_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `organization_name` VARCHAR(45) DEFAULT NULL,
  `organization_description` VARCHAR(45) DEFAULT NULL,
  `organization_leader` VARCHAR(255) DEFAULT NULL,
  `organization_creation_date` DATETIME  DEFAULT NULL,
  FOREIGN KEY (organization_leader) REFERENCES user(user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `incident`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `incident` (
  `incident_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `incident_name` VARCHAR(45) DEFAULT NULL,
  `incident_description` VARCHAR(300) DEFAULT NULL,
  `organization_id` BIGINT(20) DEFAULT NULL,
  `incident_severity` ENUM('low', 'medium', 'high', 'critical') DEFAULT NULL,
  `incident_start_date` DATETIME  DEFAULT NULL,
  `incident_closure_date` DATETIME  DEFAULT NULL,
  `created_by` VARCHAR(255) DEFAULT NULL,
  FOREIGN KEY (organization_id) REFERENCES organization(organization_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `task` (
  `task_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `task_name` VARCHAR(60) DEFAULT NULL,
  `task_description` varchar(350) DEFAULT NULL,
  `incident_id` BIGINT(20) NOT NULL,
  `task_status` ENUM('open', 'inProgress', 'closed') NOT NULL,
  `assigner_user_id` VARCHAR(255) DEFAULT NULL,
  `assigned_user_id` VARCHAR(255) DEFAULT NULL,
  `created_by` VARCHAR(255) DEFAULT NULL,
  `assign_date` DATETIME  DEFAULT NULL,
  `order_number` BIGINT(20) NOT NULL,
  FOREIGN KEY (incident_id) REFERENCES incident(incident_id),
  FOREIGN KEY (assigner_user_id) REFERENCES user(user_id), 
  FOREIGN KEY (assigned_user_id) REFERENCES user(user_id),
  FOREIGN KEY (created_by) REFERENCES user(user_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `comment` (
  `comment_id` BIGINT(20) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `incident_id` BIGINT(20) DEFAULT NULL,
  `comment_content` VARCHAR(45) DEFAULT NULL,
  `comment_author` VARCHAR(255) DEFAULT NULL,
  `comment_date` DATETIME  DEFAULT NULL,
  FOREIGN KEY (comment_author) REFERENCES user(user_id), 
  FOREIGN KEY (incident_id) REFERENCES incident(incident_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;

CREATE TABLE `user` (
  `user_id` VARCHAR(255) PRIMARY KEY NOT NULL,
  `display_name` VARCHAR(45) DEFAULT NULL,
  `email_address` VARCHAR(45) DEFAULT NULL,
  `account_created_date` DATETIME  DEFAULT NULL,
  `user_role` ENUM("securityAnalyst","securityEngineer","socManager","threatIntelligenceAnalyst","securityArchitect","automationEngineer","complianceAnalyst","userAndAccessManagementSpecialist","trainingAndAwarenessSpecialist","dataPrivacyOfficer","vendorManagementSpecialist","qualityAssuranceTester","projectManager","communicationsSpecialist") DEFAULT NULL,
  `organization_id` BIGINT(20) DEFAULT NULL,
  FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;