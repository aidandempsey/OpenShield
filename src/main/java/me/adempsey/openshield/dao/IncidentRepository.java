package me.adempsey.openshield.dao;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

    // foreign keys
    Page<Incident> findByTeamId(@RequestParam("team_id")Long teamId, Pageable pageable);
    Page<Incident> findByAssignerUserId(@RequestParam("assigner_user_id")Long assignerUserId, Pageable pageable);

    // attributes
    Page<Incident> findByIncidentNameContaining(@RequestParam("incident_name")String incidentName, Pageable pageable);
    @Enumerated(EnumType.STRING)
    Page<Incident> findByIncidentSeverity(@RequestParam("incident_severity")IncidentSeverity incidentSeverity, Pageable pageable);

}