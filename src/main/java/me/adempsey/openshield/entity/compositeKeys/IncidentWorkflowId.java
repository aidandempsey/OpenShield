package me.adempsey.openshield.entity.compositeKeys;

import lombok.*;
import java.io.Serializable;
import jakarta.persistence.*;

@Embeddable
@Data
public class IncidentWorkflowId implements Serializable {
    @Column(name="incident_id")
    private Long incidentId;

    @Column(name="workflow_id")
    private Long workflowId;
}
