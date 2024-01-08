package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import me.adempsey.openshield.entity.enums.IncidentSeverity;

import java.time.LocalDate;

@Entity
@Table(name="incident")
@NoArgsConstructor
@Data
public class Incident {

    public Incident(String incidentName, String incidentDescription, Long teamId, IncidentSeverity incidentSeverity, LocalDate  incidentStartDate, LocalDate closureDate, Long assignerUserId){
        this.incidentName = incidentName;
        this.incidentDescription = incidentDescription;
        this.teamId = teamId;
        this.incidentSeverity = incidentSeverity;
        this.incidentStartDate = incidentStartDate;
        this.closureDate = closureDate;
        this.assignerUserId = assignerUserId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="incident_id")
    private Long incidentId;

    @Column(name="incident_name")
    private String incidentName;

    @Column(name="incident_description")
    private String incidentDescription;

    @Column(name="team_id")
    private Long teamId;

    @Enumerated(EnumType.STRING)
    @Column(name="incident_severity")
    private IncidentSeverity incidentSeverity;

    @Column(name="incident_start_date")
    private LocalDate  incidentStartDate;

    @Column(name="incident_closure_date")
    private LocalDate closureDate;

    @Column(name="assigner_user_id")
    private Long assignerUserId;
}