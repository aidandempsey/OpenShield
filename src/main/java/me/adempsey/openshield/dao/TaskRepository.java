package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Task;
import me.adempsey.openshield.entity.keys.TaskID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, TaskID> {
}
