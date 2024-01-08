package me.adempsey.openshield.controller;

import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import me.adempsey.openshield.service.IncidentService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/incidents")
public class IncidentController {
    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService){this.incidentService = incidentService;}

    @PostMapping("/createIncident")
    public Incident createIncident() throws Exception{
        String incidentName = "Test Incident";
        String incidentDescription = "Test incident description";
        Long teamId = 1L;
        IncidentSeverity incidentSeverity = IncidentSeverity.critical;
        LocalDate incidentStartDate = LocalDate.now();
        LocalDate closureDate= LocalDate.now();
        Long assignerUserId = 1L;

        return incidentService.createIncident(incidentName, incidentDescription, teamId, incidentSeverity, incidentStartDate, closureDate, assignerUserId);
    }
}
