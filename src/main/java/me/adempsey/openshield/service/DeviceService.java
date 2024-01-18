package me.adempsey.openshield.service;

import me.adempsey.openshield.dao.DeviceRepository;
import me.adempsey.openshield.entity.Device;
import me.adempsey.openshield.requestmodels.DeviceRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DeviceService {
    private final DeviceRepository deviceRepository;

    @Autowired
    public DeviceService(DeviceRepository deviceRepository){this.deviceRepository = deviceRepository; }

    public Device createDevice(DeviceRequest deviceRequest) throws Exception{
        Device device = new Device();
        device.setDeviceName(deviceRequest.getDeviceName());
        device.setDeviceName(deviceRequest.getOperatingSystem());
        device.setCpuCores(deviceRequest.getCpuCores());
        device.setCpuThreads(deviceRequest.getCpuThreads());
        device.setMemoryTotal(deviceRequest.getMemoryTotal());
        device.setMemoryUsed(deviceRequest.getMemoryUsed());
        device.setMemoryPercent(deviceRequest.getMemoryPercent());
        device.setDiskTotal(deviceRequest.getDiskTotal());
        device.setDiskUsed(deviceRequest.getDiskUsed());
        device.setDiskPercent(deviceRequest.getDiskPercent());
        device.setOrganizationId(deviceRequest.getOrganizationId());

        deviceRepository.save(device);
        return device;
   }
}