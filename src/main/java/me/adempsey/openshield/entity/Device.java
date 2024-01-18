package me.adempsey.openshield.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="device")
@Data
@NoArgsConstructor
public class Device {
    public Device(String deviceName, String operatingSystem, Long cpuCores, Long cpuThreads, Long memoryTotal, Long memoryUsed, float memoryPercent, Long diskTotal, Long diskUsed, float diskPercent, Long organizationId){
        this.deviceName = deviceName;
        this.operatingSystem = operatingSystem;
        this.cpuCores = cpuCores;
        this.cpuThreads = cpuThreads;
        this.memoryTotal = memoryTotal;
        this.memoryUsed = memoryUsed;
        this.memoryPercent = memoryPercent;
        this.diskTotal = diskTotal;
        this.diskUsed = diskUsed;
        this.diskPercent = diskPercent;
        this.organizationId = organizationId;
    }

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