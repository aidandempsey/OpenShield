package me.adempsey.openshield.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import me.adempsey.openshield.entity.compositeKeys.WorkflowTaskId;

@Entity
@Table(name = "workflow_task")
@Data
public class WorkflowTask {
    @EmbeddedId
    private WorkflowTaskId workflowTaskId;
}
