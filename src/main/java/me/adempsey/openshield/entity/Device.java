package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="device")
@Data
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="device_id")
    private Long deviceId;

    @Column(name="device_name")
    private String deviceName;

    @Column(name="operating_system")
    private String operatingSystem;

    @Column(name="cpu_cores")
    private Long cpuCores;

    @Column(name="cpu_threads")
    private Long cpuThreads;

    @Column(name="memory_total")
    private Long memoryTotal;

    @Column(name="memory_used")
    private Long memoryUsed;

    @Column(name="memory_percent")
    private float memoryPercent;

    @Column(name="disk_total")
    private Long diskTotal;

    @Column(name="disk_used")
    private Long diskUsed;

    @Column(name="disk_percent")
    private float diskPercent;

    @Column(name="organization_id")
    private Long organizationId;
}