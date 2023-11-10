package me.adempsey.openshield.entity;

import lombok.Data;

import jakarta.persistence.*;
import me.adempsey.openshield.entity.compositeKeys.IncidentWorkflowId;

@Entity
@Table(name = "incident_workflow")
@Data
public class IncidentWorkflow {

    @EmbeddedId
    private IncidentWorkflowId incidentWorkflowId;
}
