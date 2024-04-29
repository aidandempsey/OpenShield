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
    Page<Incident> findByOrganizationId(@RequestParam("organization_id") Long organizationId, Pageable pageable);

    @Enumerated(EnumType.STRING)
    Page<Incident> findByOrganizationIdAndIncidentSeverity(@RequestParam("organization_id") Long organizationId, @RequestParam("incident_severity") IncidentSeverity incidentSeverity, Pageable pageable);

    // attributes
    Page<Incident> findByOrganizationIdAndIncidentNameContaining(@RequestParam("organization_id") Long organizationId, @RequestParam("incident_name") String incidentName, Pageable pageable);
    Page<Incident> findByIncidentNameContaining(@RequestParam("incident_name") String incidentName, Pageable pageable);

    @Enumerated(EnumType.STRING)
    Page<Incident> findByIncidentSeverity(@RequestParam("incident_severity") IncidentSeverity incidentSeverity, Pageable pageable);

    Incident findIncidentByIncidentId(@RequestParam("incident_id") Long incidentId);

}