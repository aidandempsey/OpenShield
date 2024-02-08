package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import me.adempsey.openshield.entity.enums.IncidentSeverity;

import java.time.LocalDateTime;

@Entity
@Table(name="incident")
@NoArgsConstructor
@Data
public class Incident {

    public Incident(String incidentName, String incidentDescription, Long organizationId, IncidentSeverity incidentSeverity, LocalDateTime  incidentStartDate, LocalDateTime closureDate, String assignerUserId, String createdBy){
        this.incidentName = incidentName;
        this.incidentDescription = incidentDescription;
        this.organizationId = organizationId;
        this.incidentSeverity = incidentSeverity;
        this.incidentStartDate = incidentStartDate;
        this.closureDate = closureDate;
        this.assignerUserId = assignerUserId;
        this.createdBy = createdBy;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="incident_id")
    private Long incidentId;

    @Column(name="incident_name")
    private String incidentName;

    @Column(name="incident_description")
    private String incidentDescription;

    @Column(name="organization_id")
    private Long organizationId;

    @Enumerated(EnumType.STRING)
    @Column(name="incident_severity")
    private IncidentSeverity incidentSeverity;

    @Column(name="incident_start_date")
    private LocalDateTime  incidentStartDate;

    @Column(name="incident_closure_date")
    private LocalDateTime closureDate;

    @Column(name="assigner_user_id")
    private String assignerUserId;

    @Column(name="created_by")
    private String createdBy;
}