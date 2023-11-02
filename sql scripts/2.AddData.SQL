INSERT INTO `team` VALUES 
	(1,'Red Team', 3, "Response Team"),
    (2,'Green Team', 2, "Triage Team"),
    (3,'Blue Team', 1, "Reporting Team");

INSERT INTO `user` VALUES 
	(1,'Matthew123',2),
	(2,'Mark123', 1),
	(3,'Luke123',3);

INSERT INTO `incident` VALUES 
	(1,'Phishing Attack', 3,'Medium', '2023-10-1', '2023-10-2'),
	(2,'On-site Incident', 1,'Low', '2023-10-3', '2023-10-4'),
	(3,'DDOS Attack', 2, 'Critical', '2023-10-5', '2023-10-6'),
	(4,'Injection Attack', 1, 'High', '2023-10-10', '2023-10-8'),
	(5,'Brute Force Attack', 3, 'Medium', '2023-10-9', '2023-10-10'),
    (6,'Keylogger Attack', 2, 'Low', '2023-10-11', '2023-10-12');

INSERT INTO `task` VALUES 
	(1, 'Turn on firewall', 3, 1, 'Open', '2023-11-01'),
    (2, 'Update antivirus software', 2, 2, 'InProgress', '2023-11-02'),
    (3, 'Scan for malware', 6, 3, 'Open', '2023-11-03'),
    (4, 'Review system logs', 4, 1, 'Closed', '2023-11-04'),
    (5, 'Change access passwords', 5, 2, 'Open', '2023-11-05'),
    (6, 'Patch critical vulnerabilities', 1, 3, 'InProgress', '2023-11-06'),
    (7, 'Isolate compromised system', 3, 1, 'Open', '2023-11-07'),
    (8, 'Investigate breach source', 2, 2, 'Open', '2023-11-08'),
    (9, 'Recover data backups', 5, 3, 'Closed', '2023-11-09'),
    (10, 'Analyze attack patterns', 6, 1, 'InProgress', '2023-11-10'),
    (11, 'Implement intrusion detection', 1, 2, 'Open', '2023-11-11'),
    (12, 'Check for unauthorized access', 4, 3, 'Open', '2023-11-12'),
    (13, 'Close unnecessary ports', 3, 1, 'Open', '2023-11-13'),
    (14, 'Perform security audit', 6, 2, 'InProgress', '2023-11-14'),
    (15, 'Notify stakeholders', 2, 1, 'Open', '2023-11-15'),
    (16, 'Verify user identities', 1, 3, 'InProgress', '2023-11-16'),
    (17, 'Enhance network security', 5, 2, 'Open', '2023-11-17'),
    (18, 'Restore compromised services', 4, 1, 'Closed', '2023-11-18'),
    (19, 'Review incident response plan', 2, 3, 'Open', '2023-11-19'),
    (20, 'Monitor for further attacks', 3, 2, 'Open', '2023-11-20'),
    (21, 'Block malicious IPs', 6, 1, 'InProgress', '2023-11-21'),
    (22, 'Analyze attack vectors', 5, 2, 'Open', '2023-11-22'),
    (23, 'Implement security patches', 1, 3, 'Closed', '2023-11-23'),
    (24, 'Document incident details', 4, 1, 'InProgress', '2023-11-24');
