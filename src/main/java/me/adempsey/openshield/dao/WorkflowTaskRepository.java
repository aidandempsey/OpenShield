package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.WorkflowTask;
import me.adempsey.openshield.entity.compositeKeys.WorkflowTaskId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface WorkflowTaskRepository extends JpaRepository<WorkflowTask, WorkflowTaskId> {
    Page<WorkflowTask> findByWorkflowTaskId(@RequestParam("workflow_task_id")WorkflowTaskId workflowTaskId, Pageable pageable);
}