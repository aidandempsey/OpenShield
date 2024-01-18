package me.adempsey.openshield.controller;
import me.adempsey.openshield.entity.Device;
import me.adempsey.openshield.requestmodels.DeviceRequest;
import me.adempsey.openshield.service.DeviceService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/devices")
public class DeviceController {
    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService){this.deviceService = deviceService;}

    @PostMapping("/createDevice")
    public Device createDevice(@RequestBody DeviceRequest deviceRequest) throws Exception {
        return deviceService.createDevice(deviceRequest);
        }
}
