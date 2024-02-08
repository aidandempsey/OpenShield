package me.adempsey.openshield.controller;

import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.requestmodels.UserRequest;
import me.adempsey.openshield.service.UserService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public User createUser(@RequestHeader(value = "Authorization") String token, @RequestBody UserRequest userRequest)
            throws Exception {
        return userService.createUser(GetUidFromJWT.validateToken(token), userRequest);
    }

    @GetMapping("/getDisplayNameFromUserId")
    public String getDisplayNameFromUserId(@RequestParam String userId) {
        return userService.getDisplayNameFromUserId(userId);
    }
}
