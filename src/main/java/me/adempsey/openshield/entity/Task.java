package me.adempsey.openshield.entity;
import jakarta.persistence.*;
import lombok.Data;

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
}