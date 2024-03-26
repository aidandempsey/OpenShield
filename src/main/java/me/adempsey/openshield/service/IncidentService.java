package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.IncidentRepository;
import me.adempsey.openshield.dao.TaskRepository;
import me.adempsey.openshield.dao.UserRepository;
import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.enums.TaskStatus;
import me.adempsey.openshield.requestmodels.IncidentRequest;
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

        if(incidentRequest.getOrganizationId() != null && incidentRequest.getOrganizationId().isPresent()){
            incident.setOrganizationId(incidentRequest.getOrganizationId().orElse(null));
        }

        incident.setIncidentSeverity(incidentRequest.getIncidentSeverity());
        incident.setIncidentStartDate(LocalDateTime.now(ZoneId.of("UTC")));

        if(incidentRequest.getClosureDate() != null && incidentRequest.getClosureDate().isPresent()){
            incident.setClosureDate(incidentRequest.getClosureDate().orElse(null));
        }

        incidentRepository.save(incident);
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

}
