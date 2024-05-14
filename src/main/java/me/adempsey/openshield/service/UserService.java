package me.adempsey.openshield.service;

import com.google.firebase.auth.FirebaseAuthException;
import me.adempsey.openshield.dao.UserRepository;
import me.adempsey.openshield.entity.User;
import me.adempsey.openshield.entity.enums.UserRole;
import me.adempsey.openshield.requestmodels.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

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
        user.setAccountCreatedDate(LocalDateTime.now(ZoneId.of("GMT+1")));

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

    public void deleteUser(String userId){
        User user = userRepository.findUserByUserId(userId);
        userRepository.delete(user);
    }

    public boolean userHasOrganization(String userId) {
        return userRepository.findUserByUserId(userId).getOrganizationId() != null;
    }

    public Long getOrganizationIdFromUserId(String userId) {
        return userRepository.findUserByUserId(userId).getOrganizationId();
    }

    public void changeOrganizationAndRole(String userId, Long organizationId, UserRole userRole) throws Exception {
        Optional<User> user = Optional.ofNullable(userRepository.findUserByUserId(userId));
        if(user.isEmpty()){
            throw new Exception("User not found");
        }

        user.get().setOrganizationId(organizationId);
        user.get().setUserRole(userRole);
        userRepository.save(user.get());
    }

    public List<User> findByOrganizationId(String userId) throws FirebaseAuthException {
        User user = userRepository.findUserByUserId(userId);
        return userRepository.findUsersByOrganizationId(user.getOrganizationId());
    }

    public User getUserByUser(String userId){
        return userRepository.findUserByUserId(userId);
    }

    public User updateUser(String userId, String displayName, Long organizationId, UserRole userRole) {
        User user = userRepository.findUserByUserId(userId);
        user.setDisplayName(displayName);
        user.setOrganizationId(organizationId);
        user.setUserRole(userRole);

        return userRepository.save(user);
    }
}
