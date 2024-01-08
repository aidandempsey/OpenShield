package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.UserRepository;
import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.entity.enums.UserRole;
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

    public User createUser(String userId, String displayName, String emailAddress, LocalDate accountCreatedDate, Long teamId, UserRole userRole, String userManager) throws Exception {
        User validateUser = userRepository.findUserByUserId(userId);

        if(validateUser != null){
            System.out.println();
            throw new Exception("User has already been created" + " " + validateUser.getDisplayName());
        }

        User user = new User(userId, displayName, emailAddress, accountCreatedDate, teamId, userRole, userManager);
        userRepository.save(user);
        return user;
    }
}
