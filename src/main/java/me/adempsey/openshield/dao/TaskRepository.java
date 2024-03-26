package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByIncidentId(@RequestParam("incident_id")Long incidentId, Pageable pageable);
    Page<Task> findByAssignerUserId(@RequestParam("assigner_user_id")String assignerUserId, Pageable pageable);
    Page<Task> findByAssignedUserId(@RequestParam("assigned_user_id")String assignedUserId, Pageable pageable);

    Task findByTaskId(@RequestParam("task_id")Long taskId);

    List<Task> findTasksByIncidentId(@RequestParam Long incidentId);

}
