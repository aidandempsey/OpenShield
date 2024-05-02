package me.adempsey.openshield.controller;

import com.google.firebase.auth.FirebaseAuthException;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import me.adempsey.openshield.entity.Incident;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import me.adempsey.openshield.requestmodels.IncidentRequest;
import me.adempsey.openshield.service.IncidentService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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

    @GetMapping("/findIncidentsByUser")
    public List<Incident> findIncidentsByUser(@RequestHeader(value = "Authorization")String token) throws FirebaseAuthException {
        return incidentService.findIncidentsByUser(GetUidFromJWT.validateToken(token));
    }

    @GetMapping("/findIncidentsByUserAndSeverity")
    public List<Incident> findIncidentsByUserAndSeverity(@RequestHeader(value = "Authorization")String token, @RequestParam String incidentSeverity) throws FirebaseAuthException {
        return incidentService.findIncidentsByUserAndSeverity(GetUidFromJWT.validateToken(token), IncidentSeverity.valueOf(incidentSeverity));
    }
}