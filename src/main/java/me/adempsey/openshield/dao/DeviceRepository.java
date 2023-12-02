package me.adempsey.openshield.dao;

import me.adempsey.openshield.entity.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    Page<Device> findByOrganizationId(@RequestParam("organization_id")Long organizationId, Pageable pageable);
}