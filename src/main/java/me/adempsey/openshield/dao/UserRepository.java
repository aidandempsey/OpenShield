package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
