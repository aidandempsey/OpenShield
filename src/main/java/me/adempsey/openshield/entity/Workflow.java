package me.adempsey.openshield.entity;
import lombok.Data;
import jakarta.persistence.*;
@Entity
@Table(name="Workflow")
@Data
public class Workflow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="workflow_id")
    private long workflowId;

    @Column(name="workflow_name")
    private long workflowName;

    @Column(name="workflow_description")
    private long workflowDescription;
}
