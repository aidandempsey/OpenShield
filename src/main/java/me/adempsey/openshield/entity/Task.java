package me.adempsey.openshield.entity;
import jakarta.persistence.*;
import lombok.Data;
import me.adempsey.openshield.entity.enums.Status;

import java.time.LocalDate;

@Entity
@Table(name="task")
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id")
    private long taskId;
    @Column(name="incident_id")
    private long incidentId;
    @Column(name="task_name")
    private String taskName;
    @Column(name="assigned_user_id")
    private long assignedUserId;
    @Column(name="assignee_user_id")
    private long assigneeUserId;
    @Enumerated(EnumType.STRING)
    @Column(name="task_status")
    private Status taskStatus;
    @Column(name="creation_date")
    private LocalDate creationDate;
}
