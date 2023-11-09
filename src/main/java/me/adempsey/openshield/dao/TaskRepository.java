package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
