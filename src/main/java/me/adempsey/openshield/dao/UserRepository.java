package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUserId(@RequestParam("user_id")String userId);
    List<User> findUsersByOrganizationId(@RequestParam Long organizationId);
}