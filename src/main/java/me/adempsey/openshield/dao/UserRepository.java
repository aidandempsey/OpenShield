package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByOrganizationId(@RequestParam("organization_id")Long organizationId, Pageable pageable);

    User findUserByUserId(@RequestParam("user_id")String userId);
}