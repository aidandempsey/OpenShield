package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.IncidentRepository;
import me.adempsey.openshield.dao.TaskRepository;
import me.adempsey.openshield.dao.UserRepository;
import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import me.adempsey.openshield.entity.enums.TaskStatus;
import me.adempsey.openshield.entity.enums.UserRole;
import me.adempsey.openshield.requestmodels.IncidentRequest;
import me.adempsey.openshield.requestmodels.IncidentTemplates.SshBruteforceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Service
@Transactional
public class IncidentService {
    private final IncidentRepository incidentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public IncidentService(IncidentRepository incidentRepository, TaskRepository taskRepository, UserRepository userRepository){
        this.incidentRepository = incidentRepository;
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Incident createIncident(String createdBy, IncidentRequest incidentRequest) throws Exception{
        Incident incident = new Incident();
        incident.setCreatedBy(createdBy);
        incident.setIncidentName(incidentRequest.getIncidentName());

        if(incidentRequest.getIncidentDescription() != null && incidentRequest.getIncidentDescription().isPresent()){
            incident.setIncidentDescription(incidentRequest.getIncidentDescription().map(
                    Object::toString
            ).orElse(null));
        }

        incident.setOrganizationId(userRepository.findUserByUserId(createdBy).getOrganizationId());

        incident.setIncidentSeverity(incidentRequest.getIncidentSeverity());
        incident.setIncidentStartDate(LocalDateTime.now(ZoneId.of("GMT+1")));

        if(incidentRequest.getClosureDate() != null && incidentRequest.getClosureDate().isPresent()){
            incident.setClosureDate(incidentRequest.getClosureDate().orElse(null));
        }

        incidentRepository.save(incident);
        return incident;
    }

    public Incident createSshBruteforceIncident(String createdBy, SshBruteforceRequest sshBruteforceRequest) throws Exception{
        Incident incident = new Incident();
        Long organizationId = userRepository.findUserByUserId(createdBy).getOrganizationId();

        Long portNumber = sshBruteforceRequest.getPortNumber();
        String ipAddress = sshBruteforceRequest.getIpAddress();
        String compromisedUsername = sshBruteforceRequest.getCompromisedUsername();
        String compromisedPassword = sshBruteforceRequest.getCompromisedPassword();
        String device = sshBruteforceRequest.getDevice();
        String sshVersion = sshBruteforceRequest.getSshVersion();

        incident.setCreatedBy(createdBy);
        incident.setIncidentName("SSH Brute Force Attack Detected");

        String incidentDescription = String.format(
                "During a penetration test, it was found that your %s device is vulnerable to an SSH brute force attack\n" +
                        "IP Address: %s\n" +
                        "Username: %s\n" +
                        "Password: %s\n" +
                        "OpenSSH Version: %s",
                device, ipAddress, compromisedUsername, compromisedPassword, sshVersion);

        incident.setIncidentDescription(incidentDescription);
        incident.setOrganizationId(organizationId);
        incident.setIncidentSeverity(IncidentSeverity.medium);
        incident.setIncidentStartDate(LocalDateTime.now(ZoneId.of("GMT+1")));

        incidentRepository.save(incident);

        String taskTitle1 = "Change SSH Port";
        String taskTitle2 = "Generate SSH Key";
        String taskTitle3 = "Copy SSH Key to Another Device";
        String taskTitle4 = "Add Public Key to Pi's Authorized Keys";
        String taskTitle5 = "Disable Password Logins";
        String taskTitle6 = "Verify Connection";

        String taskDescription1 = String.format("Modify the SSH port to enhance security. Open the SSH configuration file using \"sudo nano /etc/ssh/sshd_config\", change the port from Port %s to Port 8123, save the file, and restart the SSH service with \"sudo service ssh restart\"", portNumber);
        String taskDescription2 = "Generate a 5120-bit SSH key for secure authentication. Run \"ssh-keygen -b 5120\" and save the key to /home/pi/mypi.pem.";
        String taskDescription3 = String.format("Transfer the SSH key to the %s device for authentication. Copy the key with \"scp -P 8123 /home/pi/mypi.pem %s@%s:/home/pi/.ssh\" (password: %s) and change key permissions with \"chmod 400 /home/pi/.ssh/mypi.pem\"", device, compromisedUsername, ipAddress, compromisedPassword);
        String taskDescription4 = String.format("Add the generated public key to the %s's list of authorized keys with \"ssh-copy-id -i /home/pi/.ssh/mypi.pem.pub -p 8123 %s (password: %s)", device, String.format("%s@%s", compromisedUsername, ipAddress), compromisedPassword);
        String taskDescription5 = "Disable password logins for SSH access. Open the SSH configuration file with \"sudo nano /etc/ssh/sshd_config\", set ChallengeResponseAuthentication, PasswordAuthentication, and UsePAM to no, save the file, and restart the SSH service with \"sudo service ssh restart\"";
        String taskDescription6 = String.format("Ensure successful SSH login using the configured settings. Use SSH to log in with \"ssh -i /home/pi/mypi.pem -p 8123 %s\" (password: %s).", String.format("%s@%s", compromisedUsername, ipAddress), compromisedPassword);

        String securityEngineerId = userRepository.findUsersByOrganizationIdAndUserRole(organizationId, UserRole.securityEngineer).get(0).getUserId();
        String securityAnalystId = userRepository.findUsersByOrganizationIdAndUserRole(organizationId, UserRole.securityAnalyst).get(0).getUserId();
        String automationEngineerId = userRepository.findUsersByOrganizationIdAndUserRole(organizationId, UserRole.automationEngineer).get(0).getUserId();
        String securityArchitectId = userRepository.findUsersByOrganizationIdAndUserRole(organizationId, UserRole.securityArchitect).get(0).getUserId();
        String qualityAssuranceEngineerId = userRepository.findUsersByOrganizationIdAndUserRole(organizationId, UserRole.qualityAssuranceTester).get(0).getUserId();

        Task task1 = new Task(taskTitle1, taskDescription1, incident.getIncidentId(), TaskStatus.open, createdBy, securityEngineerId, createdBy, LocalDateTime.now(ZoneId.of("GMT+1")), 1L);
        Task task2 = new Task(taskTitle2, taskDescription2, incident.getIncidentId(), TaskStatus.open, createdBy, securityAnalystId, createdBy, LocalDateTime.now(ZoneId.of("GMT+1")),2L);
        Task task3 = new Task(taskTitle3, taskDescription3, incident.getIncidentId(), TaskStatus.open, createdBy, automationEngineerId, createdBy, LocalDateTime.now(ZoneId.of("GMT+1")), 3L);
        Task task4 = new Task(taskTitle4, taskDescription4, incident.getIncidentId(), TaskStatus.open, createdBy, securityEngineerId, createdBy, LocalDateTime.now(ZoneId.of("GMT+1")), 4L);
        Task task5 = new Task(taskTitle5, taskDescription5, incident.getIncidentId(), TaskStatus.open, createdBy, securityArchitectId, createdBy, LocalDateTime.now(ZoneId.of("GMT+1")), 5L);
        Task task6 = new Task(taskTitle6, taskDescription6, incident.getIncidentId(), TaskStatus.open, createdBy, qualityAssuranceEngineerId, createdBy, LocalDateTime.now(ZoneId.of("GMT+1")),6L);

        taskRepository.save(task1);
        taskRepository.save(task2);
        taskRepository.save(task3);
        taskRepository.save(task4);
        taskRepository.save(task5);
        taskRepository.save(task6);

        return incident;
    }

    public int getIncidentProgress(Long incidentId) {
        List<Task> tasks = taskRepository.findTasksByIncidentId(incidentId);

        long completedTasks = tasks.stream()
                .filter(task -> task.getTaskStatus() == TaskStatus.closed)
                .count();

        double totalTasks = tasks.size();

        return (int) ((completedTasks / totalTasks) * 100);
    }

    public List<Incident> findIncidentsByUser(String userId) {
        User user = userRepository.findUserByUserId(userId);
        return incidentRepository.findIncidentsByOrganizationId(user.getOrganizationId());
    }

    public List<Incident> findIncidentsByUserAndSeverity(String userId, IncidentSeverity incidentSeverity)  {
        User user = userRepository.findUserByUserId(userId);
        return incidentRepository.findIncidentsByOrganizationIdAndIncidentSeverity(user.getOrganizationId(), incidentSeverity);
    }

}
