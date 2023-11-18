package me.adempsey.openshield.entity;
import jakarta.persistence.*;
import lombok.Data;
import me.adempsey.openshield.entity.enums.TaskStatus;

import java.time.LocalDate;

@Entity
@Table(name="task")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id")
    private long taskId;

    @Column(name="task_name")
    private String taskName;

    @Column(name="task_description")
    private String taskDescription;

    @Column(name="incident_id")
    private long incidentId;

    @Enumerated(EnumType.STRING)
    @Column(name="task_status")
    private TaskStatus taskStatus;

    @Column(name="assigner_user_id")
    private long assignerUserId;

    @Column(name="assigned_user_id")
    private long assignedUserId;

    @Column(name="assign_date")
    private LocalDate assignDate;
}