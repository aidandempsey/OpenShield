package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Organization;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {

    Page<Organization> findByOrganizationLeader(@RequestParam("organization_leader")Long organizationLeader, Pageable pageable);
}
