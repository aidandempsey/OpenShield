package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.IncidentRepository;
import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class IncidentService {
    private final IncidentRepository incidentRepository;

    @Autowired
    public IncidentService(IncidentRepository incidentRepository){this.incidentRepository = incidentRepository;}

    public Incident createIncident(String incidentName, String incidentDescription, Long teamId, IncidentSeverity incidentSeverity, LocalDate  incidentStartDate, LocalDate closureDate, Long assignerUserId) throws Exception{
        Incident incident = new Incident(incidentName, incidentDescription, teamId, incidentSeverity,  incidentStartDate, closureDate, assignerUserId);
        incidentRepository.save(incident);
        return incident;
    }
}
