package me.adempsey.openshield.controller;

import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.requestmodels.TaskRequest;
import me.adempsey.openshield.service.TaskService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService){this.taskService = taskService;}

    @PostMapping("/createTask")
    public Task createTask(@RequestHeader(value = "Authorization")String token, @RequestBody TaskRequest taskRequest) throws Exception{
        return taskService.createTask(GetUidFromJWT.validateToken(token),taskRequest);
    }

    @GetMapping("/isTaskAssigned")
    public boolean isTaskAssigned(@RequestParam Long taskId){
        return taskService.isTaskAssigned(taskId);
    }

    @GetMapping("/isTaskAssignedToUser")
    public boolean isTaskAssignedToUser(@RequestParam String assignedUserId, @RequestParam Long taskId){
        return taskService.isTaskAssignedToUser(assignedUserId,taskId);
    }
}