package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.TaskRepository;
import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.enums.TaskStatus;
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

    public Task createTask(String taskName, String taskDescription, Long incidentId, TaskStatus taskStatus, Long assignerUserId, Long assignedUserId, LocalDate assignDate){
        Task task = new Task(taskName, taskDescription, incidentId, taskStatus, assignerUserId, assignedUserId, assignDate);
        taskRepository.save(task);
        return task;
    }
}