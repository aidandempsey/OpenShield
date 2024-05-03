package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    Page<Incident> findByOrganizationId(@RequestParam("organization_id") Long organizationId, Pageable pageable);
    Page<Incident> findByOrganizationIdAndIncidentNameContaining(@RequestParam("organization_id") Long organizationId, @RequestParam("incident_name") String incidentName, Pageable pageable);

    List<Incident> findIncidentsByOrganizationId(@RequestParam Long organizationId);

    List<Incident> findIncidentsByOrganizationIdAndIncidentSeverity(Long organizationId, IncidentSeverity incidentSeverity);
}