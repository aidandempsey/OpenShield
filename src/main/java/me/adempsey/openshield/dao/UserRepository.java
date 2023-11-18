package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface UserRepository extends JpaRepository<User, Long> {
    Page<User> findByTeamId(@RequestParam("team_id")Long teamId, Pageable pageable);
}