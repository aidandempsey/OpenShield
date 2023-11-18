package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Incident;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    Page<Incident> findByTeamId(@RequestParam("team_id")Long teamId, Pageable pageable);
    Page<Incident> findByAssignerUserId(@RequestParam("assigner_user_id")Long assignerUserId, Pageable pageable);
}