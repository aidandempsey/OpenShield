package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
