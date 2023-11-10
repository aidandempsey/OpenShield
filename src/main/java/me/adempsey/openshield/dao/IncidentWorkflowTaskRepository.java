package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.IncidentWorkflowTask;
import me.adempsey.openshield.entity.compositeKeys.IncidentWorkflowTaskId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentWorkflowTaskRepository extends JpaRepository<IncidentWorkflowTask, IncidentWorkflowTaskId> {
}
