package me.adempsey.openshield.controller;

import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.enums.TaskStatus;
import me.adempsey.openshield.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){this.taskService = taskService;}

    @PostMapping("/createTask")
    public Task createTask() throws Exception{
        String taskName = "New task";
        String taskDescription = "Description";
        Long incidentId = 1L;
        TaskStatus taskStatus = TaskStatus.open;
        Long assignerUserId = 1L;
        Long assignedUserId = 2L;
        LocalDate assignDate = LocalDate.now();

        return taskService.createTask(taskName,taskDescription,incidentId,taskStatus,assignerUserId,assignedUserId, assignDate);
    }
}