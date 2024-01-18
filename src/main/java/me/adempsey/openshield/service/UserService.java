package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.UserRepository;
import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.requestmodels.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    public User createUser(String userId, UserRequest userRequest) throws Exception {
        User validateUser = userRepository.findUserByUserId(userId);

        if(validateUser != null){
            throw new Exception("User has already been created" + " " + validateUser.getDisplayName());
        }

        User user = new User();
        user.setUserId(userId);
        user.setDisplayName(userRequest.getDisplayName());
        user.setEmailAddress(userRequest.getEmailAddress());
        user.setAccountCreatedDate(LocalDate.now());

        if(userRequest.getTeamId() != null && userRequest.getTeamId().isPresent()){
            user.setTeamId(userRequest.getTeamId().orElse(null));
        }

        if(userRequest.getUserRole() != null && userRequest.getUserRole().isPresent()){
            user.setUserRole(userRequest.getUserRole().orElse(null));
        }

        if(userRequest.getUserManager() != null && userRequest.getUserManager().isPresent()){
            user.setUserManager(userRequest.getUserManager().orElse(null));
        }

        userRepository.save(user);
        return user;
    }

    public String getDisplayNameFromUserId(String userId){
        return userRepository.findUserByUserId(userId).getDisplayName();
    }
}
