-- Fake Inserts for Organization Table
INSERT INTO `organization` (`organization_name`, `organization_description`, `organization_leader`, `organization_creation_date`)
VALUES 
  ('Tech Solutions', 'IT Services Company', 'nYh9pVokzuYlFboCvfWOpSj2or53', '2023-01-01'),
  ('Security Experts', 'Cybersecurity Firm', '2idqwEcnsoOC9wuTaE6s9wYNfHX2', '2023-01-01'),
  ('Data Innovators', 'Big Data Solutions', 'E7aPLqp3EGOR3t9Pg0QyKlj3pDJ3', '2023-01-01');

-- Fake Inserts for Incident Table
INSERT INTO `incident` (`incident_name`, `incident_description`, `organization_id`, `incident_severity`, `incident_start_date`, `incident_closure_date`, `created_by`)
VALUES 
  ('Security Breach', 'Unauthorized Access', 1, 'critical', '2023-01-01','2023-01-05', 'nYh9pVokzuYlFboCvfWOpSj2or53'),
  ('Data Leak', 'Confidential Data Exposure', 1, 'high', '2023-02-01', '2023-02-10', '2idqwEcnsoOC9wuTaE6s9wYNfHX2'),
  ('Software Bug', 'Critical Bug in System', 1, 'medium', '2023-03-01', '2023-03-07', 'E7aPLqp3EGOR3t9Pg0QyKlj3pDJ3');
  
-- Fake Inserts for Task Table
INSERT INTO `task` (`task_name`, `task_description`, `incident_id`, `task_status`, `assigner_user_id`, `assigned_user_id`, `assign_date`, `order_number`)
VALUES 
  ('Fix Authentication', 'Resolve login issues', 1, 'open', 'nYh9pVokzuYlFboCvfWOpSj2or53', 'PAhSDU6EcpatliKeqLNlTmfl5Hp1', '2023-01-03', 1),
  ('Data Cleanup', 'Remove exposed data', 2, 'closed', '2idqwEcnsoOC9wuTaE6s9wYNfHX2', 'jGGNow03o7OAJ1gCPSbpWbtjDw93', '2023-02-05', 1),
  ('Code Review', 'Review and fix code', 3, 'closed', 'RiNBaSBgvwWmSKaxYdmrZBv7vN13', 'pzYRBTKQp4Y4hJYUqr73AiaA5kF3', '2023-03-03', 1),
  ('Demo task', 'Demo task description', 2, 'open', 'LYt1ohqu4Ef4TNypIykYNkDUeDR2', 'pWbQIRa8qqSswH4h9PYao8DOyAL2', '2024-01-08', 2);


-- Fake Inserts for Comments Table
INSERT INTO `comment` (`incident_id`, `comment_content`, `comment_author`, `comment_date`)
VALUES 
  (1, 'Critical issue. Immediate action required.', 'Xn8m2mGWJcVKOAQu2K73IHuCnfT2', '2023-01-04'),
  (2, 'Investigating the source of the leak.', 'WkfErdSQI9OgB1k9VvdG6Yt2i3f2', '2023-02-07'),
  (3, 'Code fix implemented successfully.', 'E7aPLqp3EGOR3t9Pg0QyKlj3pDJ3', '2023-03-04');

-- Fake Inserts for User Table
INSERT INTO `user` (`user_id`, `display_name`, `email_address`, `account_created_date`, `organization_id`, `user_role`)
VALUES 
  ('LYt1ohqu4Ef4TNypIykYNkDUeDR2', 'Alice Security', 'aidandempsey13@gmail.com', '2023-01-02 00:00:00', 1, 'securityEngineer'),
  ('pWbQIRa8qqSswH4h9PYao8DOyAL2', 'Aidan', 'aidandempsey2019@gmail.com', '2024-02-08 13:49:37', 1, 'securityAnalyst'),
  ('RiNBaSBgvwWmSKaxYdmrZBv7vN13', 'Bob Data Scientist', 'bob.data@example.com', '2024-03-26 01:04:19', 1, 'dataPrivacyOfficer'),
  ('PAhSDU6EcpatliKeqLNlTmfl5Hp1', 'Charlie Manager', 'charlie.manager@example.com', '2024-03-26 01:07:47', 1, 'socManager'),
 ('WkfErdSQI9OgB1k9VvdG6Yt2i3f2', 'Eve Security Lead', 'eve.security@example.com', '2024-03-26 01:08:50', 1, 'securityArchitect'),
   ('E7aPLqp3EGOR3t9Pg0QyKlj3pDJ3', 'Grace Data Analyst', 'grace.data@example.com', '2024-03-26 01:09:34', 1, 'threatIntelligenceAnalyst'),
   ('Xn8m2mGWJcVKOAQu2K73IHuCnfT2', 'Dave Task Assigner', 'dave.task@example.com', '2024-03-26 01:14:09', 1, 'projectManager'),
  ('2idqwEcnsoOC9wuTaE6s9wYNfHX2', 'Frank Comment Author', 'frank.comment@example.com', '2024-03-26 01:15:34', 1, 'communicationsSpecialist'),
   ('pzYRBTKQp4Y4hJYUqr73AiaA5kF3', 'Helen Team Leader', 'helen.team@example.com', '2024-03-26 01:16:22', 1, 'automationEngineer'),
   ('Xd2p3q7cOOPkrAltlkSVRSVi9tP2', 'Isaac Quality Tester', 'isaac.quality@example.com', '2024-03-26 01:16:59', 1, 'qualityAssuranceTester'),
   ('jGGNow03o7OAJ1gCPSbpWbtjDw93', 'Jill Access Specialist', 'jill.access@example.com', '2024-03-26 01:17:56', 1, 'userAndAccessManagementSpecialist'),
   ('n6qxLqVJzuaW5n2pkLsqJjZDrW63', 'Kevin Training Specialist', 'kevin.training@example.com', '2024-03-26 01:18:46', 1, 'trainingAndAwarenessSpecialist'),
   ('TRA1bQQ0CuQXONGTo5w61Qmu52A3', 'Mia Compliance Analyst', 'mia.compliance@example.com', '2024-03-26 01:19:41', 1, 'complianceAnalyst'),
   ('qT2b8Fe0jAWeZ8LaF9Bje03wHoX2', 'Oscar Vendor Manager', 'oscar.vendor@example.com', '2024-03-26 01:20:28', 1, 'vendorManagementSpecialist'),
   ('H7i8pUS00sbC5DDmAhAycp2p4RR2', 'Pam Data Officer', 'pam.data@example.com', '2024-03-26 01:21:03', 1, 'dataPrivacyOfficer'),
   ('nYh9pVokzuYlFboCvfWOpSj2or53', 'Quinn Project Manager', 'quinn.project@example.com', '2024-03-26 01:22:01', 1, 'projectManager');