package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.IncidentWorkflow;
import me.adempsey.openshield.entity.compositeKeys.IncidentWorkflowId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentWorkflowRepository extends JpaRepository<IncidentWorkflow, IncidentWorkflowId> {
}
