package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.TaskRepository;
import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.enums.TaskStatus;
import me.adempsey.openshield.requestmodels.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository){this.taskRepository = taskRepository;}

    public Task createTask(String createdBy, TaskRequest taskRequest){
        Task task = new Task();
        task.setTaskName(taskRequest.getTaskName());

        if(taskRequest.getTaskDescription() != null && taskRequest.getTaskDescription().isPresent()){
            task.setTaskDescription(taskRequest.getTaskDescription().map(
                    Object::toString
            ).orElse(null));
        }

        task.setIncidentId(taskRequest.getIncidentId());
        task.setTaskStatus(TaskStatus.open);

        if(taskRequest.getAssignerUserId() != null && taskRequest.getAssignerUserId().isPresent()){
            task.setAssignerUserId(taskRequest.getAssignerUserId().orElse(null));
        }

        if(taskRequest.getAssignedUserId() != null && taskRequest.getAssignedUserId().isPresent()){
            task.setAssignedUserId(taskRequest.getAssignedUserId().orElse(null));
        }

        task.setCreatedBy(createdBy);

        if(taskRequest.getAssignDate() != null && taskRequest.getAssignDate().isPresent()){
            task.setAssignDate(taskRequest.getAssignDate().orElse(null));
        }

        taskRepository.save(task);
        return task;
    }

    public boolean isTaskAssigned(Long taskId){
        Task task = taskRepository.findTaskByTaskId(taskId);
        return task != null && task.getAssignedUserId() != null;
    }

    public boolean isTaskAssignedToUser(String assignedUserId, Long taskId) {
        Task task = taskRepository.findTaskByTaskId(taskId);
        return task != null && assignedUserId.equals(task.getAssignedUserId());
    }
}