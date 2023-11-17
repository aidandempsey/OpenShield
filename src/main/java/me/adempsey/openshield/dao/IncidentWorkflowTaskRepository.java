package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.IncidentWorkflowTask;
import me.adempsey.openshield.entity.compositeKeys.IncidentWorkflowTaskId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface IncidentWorkflowTaskRepository extends JpaRepository<IncidentWorkflowTask, IncidentWorkflowTaskId> {
    Page<IncidentWorkflowTask> findByIncidentWorkflowTaskId(@RequestParam("incident_workflow_task_id")IncidentWorkflowTaskId incidentWorkflowTaskId, Pageable pageable);
}