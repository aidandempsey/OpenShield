package me.adempsey.openshield.controller;

import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.requestmodels.IncidentRequest;
import me.adempsey.openshield.service.IncidentService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/incidents")
public class IncidentController {
    private final IncidentService incidentService;

    public IncidentController(IncidentService incidentService){this.incidentService = incidentService;}

    @PostMapping("/createIncident")
    public Incident createIncident(@RequestHeader(value = "Authorization")String token, @RequestBody IncidentRequest incidentRequest) throws Exception{
        return incidentService.createIncident(GetUidFromJWT.validateToken(token), incidentRequest);
    }

    @GetMapping("/getIncidentProgress")
    public float getIncidentProgress(@RequestParam Long incidentId){
        return incidentService.getIncidentProgress(incidentId);
    }
}