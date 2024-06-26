package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Organization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Organization findOrganizationByOrganizationId(@RequestParam("organization_id")Long organizationId);

    Page<Organization> findByOrganizationNameContaining(@RequestParam("organization_name") String organizationName, Pageable pageable);
}
