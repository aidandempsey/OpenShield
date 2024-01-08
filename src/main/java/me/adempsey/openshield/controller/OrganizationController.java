package me.adempsey.openshield.controller;
import me.adempsey.openshield.entity.Organization;
import me.adempsey.openshield.service.OrganizationService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/organizations")
public class OrganizationController {
    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService){this.organizationService = organizationService;}

    @PostMapping("/createOrganization")
    public Organization createUser() throws Exception {
        String organizationName = "organization";
        String organizationDescription = "description";
        Long organizationLeader = 1L;

        return organizationService.createOrganization(organizationName, organizationDescription, organizationLeader);
    }
}
