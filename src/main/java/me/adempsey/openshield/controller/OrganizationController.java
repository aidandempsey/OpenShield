package me.adempsey.openshield.controller;
import me.adempsey.openshield.entity.Organization;
import me.adempsey.openshield.requestmodels.OrganizationRequest;
import me.adempsey.openshield.service.OrganizationService;
import me.adempsey.openshield.utils.GetUidFromJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/secure/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService){this.organizationService = organizationService;}

    @PostMapping("/createOrganization")
    public Organization createOrganization(@RequestHeader(value = "Authorization")String token, @RequestBody OrganizationRequest organizationRequest) throws Exception {
        return organizationService.createOrganization(GetUidFromJWT.validateToken(token),organizationRequest);
    }

    @GetMapping("/getOrganizationNameFromOrganizationId")
    public String getOrganizationNameFromOrganizationId(@RequestParam Long organizationId){
        return organizationService.getOrganizationNameFromOrganizationId(organizationId);
    }
}
