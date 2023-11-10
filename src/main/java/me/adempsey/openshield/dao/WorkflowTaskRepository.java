package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.WorkflowTask;
import me.adempsey.openshield.entity.compositeKeys.WorkflowTaskId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkflowTaskRepository extends JpaRepository<WorkflowTask, WorkflowTaskId> {
}
