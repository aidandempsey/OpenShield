package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
}
