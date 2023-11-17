INSERT INTO `organization` (`organization_name`, `organization_description`, `organization_leader`) VALUES
('Tech Solutions', 'Providing innovative solutions', 1);

INSERT INTO `team` (`team_name`, `team_description`, `team_leader`, `organization_id`) VALUES
('Incident Response', 'Dealing with security incidents', 2, 1),
('Threat Intelligence', 'Analyzing and monitoring threats', 3, 1),
('Data Protection', 'Ensuring data privacy and compliance', 4, 1);

INSERT INTO `user` (`display_name`, `team_id`, `user_role`) VALUES
('John Doe', 1, 'socManager'),
('Aidan Dempsey', 1, 'securityAnalyst'),
('Eoin Disney', 2, 'securityEngineer'),
('Oran ODonnell', 3, 'threatIntelligenceAnalyst'),
('Sean Og', 1, 'securityArchitect'),
('Peter Dobey', 2, 'automationEngineer'),
('Mikey Burke', 3, 'complianceAnalyst');

INSERT INTO `incident` (`incident_name`, `incident_description`, `team_id`, `incident_severity`, `incident_start_date`, `incident_detection_date`, `incident_closure_date`, `assigner_user_id`) VALUES
('Security Breach', 'Unauthorized access detected', 1, 'critical', '2023-01-01', '2023-01-02', '2023-01-10', 5),
('Malware Attack', 'Malicious software detected', 2, 'high', '2023-02-05', '2023-02-06', '2023-02-15', 6),
('Data Leak', 'Sensitive data exposed', 3, 'medium', '2023-03-10', '2023-03-11', '2023-03-20', 7);

INSERT INTO `workflow` (`workflow_name`, `workflow_description`) VALUES
('Investigation Workflow', 'Workflow for incident investigation'),
('Threat Analysis Workflow', 'Workflow for analyzing threats'),
('Data Privacy Workflow', 'Workflow for ensuring data privacy');

INSERT INTO `task` (`task_name`, `task_description`) VALUES
('Gather Evidence', 'Collect evidence for the incident'),
('Malware Analysis', 'Analyze the detected malware'),
('Privacy Impact Assessment', 'Assess the impact on data privacy');

INSERT INTO `incident_workflow` (`incident_id`, `workflow_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO `workflow_task` (`workflow_id`, `task_id`) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO `incident_workflow_task` (`incident_id`, `workflow_id`, `task_id`, `task_status`, `assigner_user_id`, `assigned_user_id`) VALUES
(1, 1, 1, 'open', 2, 5),
(2, 2, 2, 'inProgress', 3, 6),
(3, 3, 3, 'closed', 4, 7);

INSERT INTO `incident_comments` (`incident_id`, `comment`, `comment_author`, `comment_date`) VALUES
(1, 'This is a critical incident. Please act swiftly!', 5, '2023-01-02'),
(2, 'Malware analysis in progress.', 6, '2023-02-07'),
(3, 'Data leak contained and resolved.', 7, '2023-03-15');
