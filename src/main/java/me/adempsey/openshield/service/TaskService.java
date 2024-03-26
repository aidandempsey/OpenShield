package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.TaskRepository;
import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.enums.TaskStatus;
import me.adempsey.openshield.requestmodels.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
@Transactional
public class TaskService {
    private final TaskRepository taskRepository;
    @Autowired
    public TaskService(TaskRepository taskRepository){
        this.taskRepository = taskRepository;}

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
        task.setAssignerUserId(createdBy);

        if(taskRequest.getAssignedUserId() != null && taskRequest.getAssignedUserId().isPresent()){
            task.setAssignedUserId(taskRequest.getAssignedUserId().orElse(null));
        }

        task.setCreatedBy(createdBy);
        task.setAssignDate(LocalDateTime.now(ZoneId.of("UTC")));

        taskRepository.save(task);
        return task;
    }

    public boolean isTaskAssigned(Long taskId){
        Task task = taskRepository.findByTaskId(taskId);
        return task != null && task.getAssignedUserId() != null;
    }

    public boolean isTaskAssignedToUser(String assignedUserId, Long taskId) {
        Task task = taskRepository.findByTaskId(taskId);
        return task != null && assignedUserId.equals(task.getAssignedUserId());
    }

    public boolean isTaskOpen(Long taskId){
        Task task = taskRepository.findByTaskId(taskId);
        return task != null && task.getTaskStatus().equals(TaskStatus.open);
    }

    public void changeAssignedUserId(Long taskId, String assignedUserId, String assignerUserId) throws Exception {
        Optional<Task> task = Optional.ofNullable(taskRepository.findByTaskId(taskId));
        if(task.isEmpty()){
            throw new Exception("Task not found");
        }

        task.get().setAssignedUserId(assignedUserId);
        task.get().setAssignerUserId(assignerUserId);
        taskRepository.save(task.get());
    }

    public void changeStatus(Long taskId, TaskStatus taskStatus) throws Exception {
        Optional<Task> task = Optional.ofNullable(taskRepository.findByTaskId(taskId));
        if(task.isEmpty()){
            throw new Exception("Task not found");
        }

        task.get().setTaskStatus(taskStatus);
        taskRepository.save(task.get());
    }
}