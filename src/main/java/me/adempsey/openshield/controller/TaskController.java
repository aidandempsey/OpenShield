package me.adempsey.openshield.controller;

import com.google.firebase.auth.FirebaseAuthException;
import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.enums.TaskStatus;
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
    public boolean isTaskAssignedToUser(@RequestHeader(value = "Authorization")String token, @RequestParam Long taskId) throws FirebaseAuthException {
        return taskService.isTaskAssignedToUser(GetUidFromJWT.validateToken(token),taskId);
    }

    @GetMapping("/isTaskOpen")
    public boolean isTaskOpen(@RequestParam Long taskId){
        return taskService.isTaskOpen(taskId);
    }

    @PatchMapping("/updateAssignedUser")
    public void updateAssignedUser(@RequestHeader(value = "Authorization")String token, @RequestParam Long taskId, @RequestParam String assignedUserId) throws Exception {
        taskService.changeAssignedUserId(taskId, assignedUserId, GetUidFromJWT.validateToken(token));
    }

    @PatchMapping("/changeStatus")
    public void changeStatus(@RequestParam Long taskId, @RequestParam TaskStatus taskStatus) throws Exception {
        taskService.changeStatus(taskId, taskStatus);
    }
}