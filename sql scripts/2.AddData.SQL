-- Inserting data into 'user' table
INSERT INTO `user` (`display_name`, `team_id`, `user_role`, `user_manager`) VALUES
('John Doe', 1, 'securityAnalyst', 4),
('Jane Smith', 2, 'securityEngineer', 4),
('Alice Johnson', 3, 'socManager', NULL),
('Bob Williams', 1, 'threatIntelligenceAnalyst', 3),
('Charlie Brown', 2, 'securityArchitect', 3),
('Eve Davis', 3, 'automationEngineer', 4),
('Grace Miller', 1, 'complianceAnalyst', 5),
('David Wilson', 2, 'userAndAccessManagementSpecialist', 5),
('Olivia Taylor', 3, 'trainingAndAwarenessSpecialist', 6),
('William Moore', 1, 'dataPrivacyOfficer', 6),
('Sophia Anderson', 2, 'vendorManagementSpecialist', 6),
('Michael Garcia', 3, 'qualityAssuranceTester', 7),
('Emily Davis', 1, 'projectManager', 7),
('Benjamin Martinez', 2, 'communicationsSpecialist', 7);

-- Inserting data into 'organization' table
INSERT INTO `organization` (`organization_name`, `organization_description`, `organization_leader`) VALUES
('Tech Solutions', 'Providing cutting-edge security solutions', 3),
('Cyber Guardians', 'Defenders of the digital realm', 5),
('Secure Innovations', 'Innovating security for a safer world', 7);

-- Inserting data into 'team' table
INSERT INTO `team` (`team_name`, `team_description`, `team_leader`, `organization_id`) VALUES
('Blue Team', 'Focused on defense', 1, 1),
('Red Team', 'Simulating attacks for improvement', 2, 2),
('Green Team', 'Innovating security processes', 3, 3);

-- Inserting data into 'incident' table
INSERT INTO `incident` (`incident_name`, `incident_description`, `team_id`, `incident_severity`, `incident_start_date`, `incident_detection_date`, `incident_closure_date`, `assigner_user_id`) VALUES
('Incident A', 'Security breach in the network', 1, 'high', '2023-01-10', '2023-01-12', '2023-01-15', 3),
('Incident B', 'Malware outbreak in systems', 2, 'critical', '2023-02-05', '2023-02-07', '2023-02-10', 3),
('Incident C', 'Unauthorized access attempt', 3, 'medium', '2023-03-20', '2023-03-22', '2023-03-25', 5);

-- Inserting data into 'task' table
INSERT INTO `task` (`task_name`, `task_description`, `incident_id`, `task_status`, `assigner_user_id`, `assigned_user_id`, `assign_date`) VALUES
('Investigate Network Logs', 'Analyze logs for signs of intrusion', 1, 'open', 3, 1, '2023-01-11'),
('Deploy Antivirus Updates', 'Ensure all systems are updated', 2, 'inProgress', 3, 2, '2023-02-08'),
('Review Access Logs', 'Identify the source of unauthorized access', 3, 'closed', 5, 3, '2023-03-23');

-- Inserting data into 'comments' table
INSERT INTO `comments` (`incident_id`, `comment`, `comment_author`, `comment_date`) VALUES
(1, 'Great progress on the investigation!', 1, '2023-01-13'),
(2, 'Antivirus updates applied successfully.', 2, '2023-02-09'),
(3, 'Access logs reviewed and secured.', 3, '2023-03-24');
