package me.adempsey.openshield.controller;

import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.entity.enums.UserRole;
import me.adempsey.openshield.requestmodels.UserRequest;
import me.adempsey.openshield.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/createUser")
    public User createUser() throws Exception {
        String userId = "ABC123";
        String userDisplayName = "Aidan";
        String emailAddress = "aidandempsey13@gmail.com";
        LocalDate accountCreatedDate = LocalDate.now();
        Long teamId = 1L;
        UserRole userRole = UserRole.securityAnalyst;
        String userManager = "1";

        return userService.createUser(userId, userDisplayName, emailAddress, accountCreatedDate, teamId, userRole, userManager);
    }

//    @PostMapping("/secure")
//    public void postUser(@RequestHeader(value="Authorization")String token,
//                         @RequestBody UserRequest userRequest) throws Exception{
//        String userEmail = ExtractJwt
//
//    }
}
