package me.adempsey.openshield.entity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.adempsey.openshield.entity.enums.TaskStatus;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="task")
@Data
@NoArgsConstructor
public class Task {
    public Task(String taskName, String taskDescription, Long incidentId, TaskStatus taskStatus, String assignerUserId, String assignedUserId, String createdBy, LocalDateTime assignDate){
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.incidentId = incidentId;
        this.taskStatus = taskStatus;
        this.assignerUserId = assignerUserId;
        this.assignedUserId = assignedUserId;
        this.createdBy = createdBy;
        this.assignDate = assignDate;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id")
    private Long taskId;

    @Column(name="task_name")
    private String taskName;

    @Column(name="task_description")
    private String taskDescription;

    @Column(name="incident_id")
    private Long incidentId;

    @Enumerated(EnumType.STRING)
    @Column(name="task_status")
    private TaskStatus taskStatus;

    @Column(name="assigner_user_id")
    private String assignerUserId;

    @Column(name="assigned_user_id")
    private String assignedUserId;

    @Column(name="created_by")
    private String createdBy;

    @Column(name="assign_date")
    private LocalDateTime assignDate;
}