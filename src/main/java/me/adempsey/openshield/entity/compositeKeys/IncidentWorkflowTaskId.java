package me.adempsey.openshield.entity.compositeKeys;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class IncidentWorkflowTaskId {
    @Column(name="incident_id")
    private Long incidentId;

    @Column(name="workflow_id")
    private Long workflowId;

    @Column(name="task_id")
    private Long taskId;
}
