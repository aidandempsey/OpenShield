package me.adempsey.openshield.entity;

import lombok.Data;
import jakarta.persistence.*;
import me.adempsey.openshield.entity.enums.Severity;
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
    @Column(name="team_id")
    private long teamId;
    @Enumerated(EnumType.STRING)
    @Column(name="severity")
    private Severity severity;
    @Column(name="detection_date")
    private LocalDate  detectionDate;
    @Column(name="closure_date")
    private LocalDate  closureDate;
}
