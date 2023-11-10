-- Insert data for organizations
INSERT INTO organization (organization_name, organization_description) VALUES
('Tech Solutions', 'Providing cutting-edge technology solutions'),
('Data Innovators', 'Leading the way in data innovation');

-- Insert data for teams
INSERT INTO team (team_name, team_description, team_leader, organization_id) VALUES
-- Tech Solutions Teams
('Tech Team 1', 'Responsible for software development', 1, 1),
('Tech Team 2', 'Focus on network security', 2, 1),
('Tech Team 3', 'Handle system administration', 3, 1),
-- Data Innovators Teams
('Data Team 1', 'Data analysis and visualization', 4, 2),
('Data Team 2', 'Big data processing', 5, 2),
('Data Team 3', 'Data governance and compliance', 6, 2);

-- Insert data for users
INSERT INTO user (user_name, team_id) VALUES
-- Tech Solutions Users
('Alice Tech', 1),
('Bob Tech', 1),
('Charlie Tech', 2),
('David Tech', 2),
('Eva Tech', 3),
-- Data Innovators Users
('Frank Data', 4),
('Grace Data', 4),
('Hank Data', 5),
('Ivy Data', 5),
('Jack Data', 6);

-- Insert data for incidents
INSERT INTO incident (incident_name, incident_description, team_id, incident_severity, incident_start_date, incident_detection_date, incident_closure_date, assigner_user_id) VALUES
-- Tech Solutions Incidents
('Tech Incident 1', 'Software bug affecting production', 1, 'high', '2023-01-01', '2023-01-02', '2023-01-03', 1),
('Tech Incident 2', 'Network outage in data center', 2, 'medium', '2023-02-01', '2023-02-02', '2023-02-03', 2),
('Tech Incident 3', 'Server performance degradation', 3, 'low', '2023-03-01', '2023-03-02', '2023-03-03', 3),
-- Data Innovators Incidents
('Data Incident 1', 'Data breach in customer database', 4, 'critical', '2023-04-01', '2023-04-02', '2023-04-03', 4),
('Data Incident 2', 'Data processing pipeline failure', 5, 'medium', '2023-05-01', '2023-05-02', '2023-05-03', 5),
('Data Incident 3', 'Non-compliance with data regulations', 6, 'low', '2023-06-01', '2023-06-02', '2023-06-03', 6);

-- Insert data for workflows
INSERT INTO workflow (workflow_name, workflow_description) VALUES
('Bug Fix Workflow', 'Workflow for fixing software bugs'),
('Incident Response Workflow', 'Workflow for responding to incidents'),
('Data Analysis Workflow', 'Workflow for analyzing data');

-- Insert data for tasks
INSERT INTO task (task_name, task_description) VALUES
('Investigate Bug', 'Investigate the reported software bug'),
('Implement Fix', 'Implement the bug fix in the codebase'),
('Notify Stakeholders', 'Notify relevant stakeholders about the incident'),
('Review Code', 'Review the code changes made for bug fix'),
('Notify Users', 'Notify affected users about the incident'),
('Data Analysis', 'Perform in-depth analysis of the data'),
('Data Processing', 'Initiate data processing pipeline');

-- Insert data for workflow_task
INSERT INTO workflow_task (workflow_id, task_id) VALUES
-- Bug Fix Workflow Tasks
(1, 1),
(1, 2),
(1, 6), -- Added Review Code task
-- Incident Response Workflow Tasks
(2, 3),
(2, 7), -- Added Notify Users task
-- Data Analysis Workflow Tasks
(3, 4),
(3, 8); -- Added Data Processing task

-- Insert data for incident_workflow
INSERT INTO incident_workflow (incident_id, workflow_id) VALUES
-- Tech Solutions Incident 1 Bug Fix Workflow Tasks
(1, 1),
(1, 2),
(1, 3), -- Added Data Analysis Workflow
-- Tech Solutions Incident 2 Incident Response Workflow Task
(2, 2),
(2, 3),
-- Tech Solutions Incident 3 Bug Fix Workflow Tasks
(3, 1),
(3, 3),
-- Data Innovators Incident 4 Bug Fix Workflow Tasks
(4, 1),
(4, 2),
-- Data Innovators Incident 5 Incident Response Workflow Tasks
(5, 2),
(5, 3),
-- Data Innovators Incident 6 Bug Fix Workflow Task
(6, 1),
(6, 3);

-- Insert data for incident_workflow_task
INSERT INTO incident_workflow_task (incident_id, workflow_id, task_id, task_status) VALUES
-- Tech Solutions Incident 1 Bug Fix Workflow Tasks
(1, 1, 1, 'open'),
(1, 1, 2, 'inProgress'),
(1, 1, 6, 'open'),
-- Tech Solutions Incident 1 Incident Response Workflow Task
(1, 2, 3, 'open'),
(1, 2, 7, 'open'),

-- Tech Solutions Incident 2 Incident Response Workflow Task
(2, 2, 3, 'inProgress'),
(2, 2, 7, 'open'),

-- Tech Solutions Incident 3 Bug Fix Workflow Tasks
(3, 1, 1, 'closed'),
(3, 1, 3, 'open'),

-- Data Innovators Incident 4 Bug Fix Workflow Tasks
(4, 1, 1, 'closed'),
(4, 1, 2, 'closed'),

-- Data Innovators Incident 5 Incident Response Workflow Tasks
(5, 2, 3, 'closed'),
(5, 2, 7, 'inProgress'),

-- Data Innovators Incident 6 Bug Fix Workflow Task
(6, 1, 3, 'closed'),
(6, 1, 6, 'closed');
