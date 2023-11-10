package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import java.time.LocalDate;

@Entity
@Table(name="incident")
@Data
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="incident_id")
    private long incidentId;

    @Column(name="incident_name")
    private String incidentName;

    @Column(name="incident_description")
    private String incidentDescription;

    @Column(name="team_id")
    private long teamId;

    @Enumerated(EnumType.STRING)
    @Column(name="incident_severity")
    private IncidentSeverity severity;

    @Column(name="incident_start_date")
    private LocalDate  incidentStartDate;

    @Column(name="incident_detection_date")
    private LocalDate  detectionDate;

    @Column(name="incident_closure_date")
    private LocalDate  closureDate;

    @Column(name="assigner_user_id")
    private long assignerUserId;
}