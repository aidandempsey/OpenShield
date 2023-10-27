package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Incident;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
}
