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
    private long deviceId;

    @Column(name="device_name")
    private String deviceName;

    @Column(name="operating_system")
    private String operatingSystem;

    @Column(name="cpu_cores")
    private long cpuCores;

    @Column(name="cpu_threads")
    private long cpuThreads;

    @Column(name="memory_total")
    private long memoryTotal;

    @Column(name="memory_used")
    private long memoryUsed;

    @Column(name="memory_percent")
    private float memoryPercent;

    @Column(name="disk_total")
    private long diskTotal;

    @Column(name="disk_used")
    private long diskUsed;

    @Column(name="disk_percent")
    private float diskPercent;

    @Column(name="organization_id")
    private long organizationId;
}