-- Fake Inserts for Organization Table
INSERT INTO `organization` (`organization_name`, `organization_description`, `organization_leader`)
VALUES 
  ('Tech Solutions', 'IT Services Company', 1),
  ('Security Experts', 'Cybersecurity Firm', 2),
  ('Data Innovators', 'Big Data Solutions', 3);

-- Fake Inserts for Team Table
INSERT INTO `team` (`team_name`, `team_description`, `team_leader`, `organization_id`)
VALUES 
  ('Development Team', 'Software Development', 4, 1),
  ('Security Team', 'Cybersecurity Operations', 5, 2),
  ('Data Science Team', 'Advanced Analytics', 6, 3);

-- Fake Inserts for Incident Table
INSERT INTO `incident` (`incident_name`, `incident_description`, `team_id`, `incident_severity`, `incident_start_date`, `incident_detection_date`, `incident_closure_date`, `assigner_user_id`)
VALUES 
  ('Security Breach', 'Unauthorized Access', 1, 'critical', '2023-01-01', '2023-01-02', '2023-01-05', 7),
  ('Data Leak', 'Confidential Data Exposure', 2, 'high', '2023-02-01', '2023-02-02', '2023-02-10', 8),
  ('Software Bug', 'Critical Bug in System', 3, 'medium', '2023-03-01', '2023-03-02', '2023-03-07', 9);

-- Fake Inserts for Task Table
INSERT INTO `task` (`task_name`, `task_description`, `incident_id`, `task_status`, `assigner_user_id`, `assigned_user_id`, `assign_date`)
VALUES 
  ('Fix Authentication', 'Resolve login issues', 1, 'open', 10, 11, '2023-01-03'),
  ('Data Cleanup', 'Remove exposed data', 2, 'inProgress', 11, 12, '2023-02-05'),
  ('Code Review', 'Review and fix code', 3, 'closed', 12, 13, '2023-03-03');

-- Fake Inserts for Comments Table
INSERT INTO `comments` (`incident_id`, `comment`, `comment_author`, `comment_date`)
VALUES 
  (1, 'Critical issue. Immediate action required.', 14, '2023-01-04'),
  (2, 'Investigating the source of the leak.', 15, '2023-02-07'),
  (3, 'Code fix implemented successfully.', 16, '2023-03-04');

-- Fake Inserts for User Table
INSERT INTO `user` (`display_name`, `team_id`, `user_role`, `user_manager`)
VALUES 
  ('John Developer', 1, 'securityAnalyst', 4),
  ('Alice Security', 2, 'securityEngineer', 5),
  ('Bob Data Scientist', 3, 'dataPrivacyOfficer', 6),
  ('Charlie Manager', 1, 'socManager', NULL),
  ('Eve Security Lead', 2, 'securityArchitect', 5),
  ('Grace Data Analyst', 3, 'threatIntelligenceAnalyst', 6),
  ('Dave Task Assigner', 1, 'projectManager', 4),
  ('Frank Comment Author', 2, 'communicationsSpecialist', 5),
  ('Helen Team Leader', 3, 'automationEngineer', 6),
  ('Isaac Quality Tester', 1, 'qualityAssuranceTester', 4),
  ('Jill Access Specialist', 2, 'userAndAccessManagementSpecialist', 5),
  ('Kevin Training Specialist', 3, 'trainingAndAwarenessSpecialist', 6),
  ('Mia Compliance Analyst', 1, 'complianceAnalyst', 4),
  ('Oscar Vendor Manager', 2, 'vendorManagementSpecialist', 5),
  ('Pam Data Officer', 3, 'dataPrivacyOfficer', 6),
  ('Quinn Project Manager', 1, 'projectManager', 4);

-- Fake Inserts for Device Table
INSERT INTO `device` 
  (`device_name`, `operating_system`, `cpu_cores`, `cpu_threads`, 
   `memory_total`, `memory_used`, `memory_percent`, 
   `disk_total`, `disk_used`, `disk_percent`, `organization_id`) 
VALUES 
  ('Laptop1', 'Windows 10', 4, 8, 8192, 4096, 50.0, 51200, 20480, 40.0, 1),
  ('Server2', 'Linux', 8, 16, 16384, 8192, 50.0, 102400, 51200, 50.0, 1),
  ('Desktop3', 'MacOS', 6, 12, 12288, 6144, 50.0, 76800, 30720, 60.0, 2),
  ('Mobile4', 'Android', 2, 4, 2048, 1024, 50.0, 20480, 10240, 50.0, 2),
  ('Server5', 'Ubuntu', 16, 32, 32768, 16384, 50.0, 204800, 102400, 70.0, 3);
