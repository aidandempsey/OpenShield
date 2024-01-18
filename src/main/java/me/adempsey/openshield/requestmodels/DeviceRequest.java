package me.adempsey.openshield.requestmodels;

import lombok.Data;

@Data
public class DeviceRequest {
    private String deviceName;
    private String operatingSystem;
    private Long cpuCores;
    private Long cpuThreads;
    private Long memoryTotal;
    private Long memoryUsed;
    private float memoryPercent;
    private Long diskTotal;
    private Long diskUsed;
    private float diskPercent;
    private Long organizationId;
}
