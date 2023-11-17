package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;
import me.adempsey.openshield.entity.compositeKeys.IncidentWorkflowId;
import me.adempsey.openshield.entity.compositeKeys.IncidentWorkflowTaskId;
import me.adempsey.openshield.entity.enums.IncidentSeverity;
import me.adempsey.openshield.entity.enums.TaskStatus;

@Entity
@Table(name = "incident_workflow_task")
@Data
public class IncidentWorkflowTask {
    @EmbeddedId
    private IncidentWorkflowTaskId incidentWorkflowTaskId;

    @Enumerated(EnumType.STRING)
    @Column(name="task_status")
    private TaskStatus taskStatus;

    @Column(name="assigner_user_id")
    private long assignerUserId;

    @Column(name="assigned_user_id")
    private long assignedUserId;
}
