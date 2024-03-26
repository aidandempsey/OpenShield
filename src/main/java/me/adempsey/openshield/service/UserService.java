package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.UserRepository;
import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.requestmodels.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;

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
        user.setAccountCreatedDate(LocalDateTime.now(ZoneId.of("UTC")));

        if(userRequest.getOrganizationId() != null && userRequest.getOrganizationId().isPresent()){
            user.setOrganizationId(userRequest.getOrganizationId().orElse(null));
        }

        if(userRequest.getUserRole() != null && userRequest.getUserRole().isPresent()){
            user.setUserRole(userRequest.getUserRole().orElse(null));
        }

        userRepository.save(user);
        return user;
    }

    public String getDisplayNameFromUserId(String userId){
        return userRepository.findUserByUserId(userId).getDisplayName();
    }
}
