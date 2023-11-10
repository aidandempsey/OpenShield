package me.adempsey.openshield.entity.compositeKeys;

import lombok.*;
import java.io.Serializable;
import jakarta.persistence.*;

@Embeddable
@Data
public class WorkflowTaskId implements Serializable {
    @Column(name="workflow_id")
    private Long workflowId;

    @Column(name="task_id")
    private Long taskId;
}
